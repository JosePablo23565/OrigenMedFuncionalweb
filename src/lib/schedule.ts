import { supabase } from './supabase';

export interface ScheduleOverride {
  id: string; // 'YYYY-MM-DD' or 'default_weekly'
  is_closed: boolean;
  slots: string[];
  updated_at?: string;
}

export interface DayAvailability {
  isClosed: boolean;
  slots: string[];
}

export interface WeeklySchedule {
  [dayOfWeek: number]: string[]; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
}

export const DEFAULT_SLOTS = [
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
];

// Default weekly schedule: Mon-Fri (1-5) active, Sat (6) & Sun (0) closed
export const DEFAULT_WEEKLY_SCHEDULE: WeeklySchedule = {
  1: [...DEFAULT_SLOTS],
  2: [...DEFAULT_SLOTS],
  3: [...DEFAULT_SLOTS],
  4: [...DEFAULT_SLOTS],
  5: [...DEFAULT_SLOTS],
  6: [],
  0: [],
};

const LOCAL_STORAGE_KEY_OVERRIDES = 'origen_schedule_overrides';

// Helper to get local overrides
const getLocalOverrides = (): Record<string, DayAvailability> => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_OVERRIDES);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

// Helper to save local overrides
const setLocalOverride = (dateStr: string, data: DayAvailability) => {
  try {
    const current = getLocalOverrides();
    current[dateStr] = data;
    localStorage.setItem(LOCAL_STORAGE_KEY_OVERRIDES, JSON.stringify(current));
  } catch {
    // Ignore storage errors
  }
};

/**
 * Get the availability (isClosed, slots) for a specific date (YYYY-MM-DD)
 */
export const getScheduleForDate = async (dateStr: string): Promise<DayAvailability> => {
  // 1. Try fetching date-specific override from Supabase
  try {
    const { data, error } = await supabase
      .from('clinic_schedules')
      .select('is_closed, slots')
      .eq('id', dateStr)
      .maybeSingle();

    if (!error && data) {
      const availability: DayAvailability = {
        isClosed: Boolean(data.is_closed),
        slots: Array.isArray(data.slots) ? data.slots : [],
      };
      setLocalOverride(dateStr, availability);
      return availability;
    }
  } catch (err) {
    console.warn('Error fetching date schedule from Supabase, checking fallback:', err);
  }

  // 2. Check local storage override fallback
  const localOverrides = getLocalOverrides();
  if (localOverrides[dateStr]) {
    return localOverrides[dateStr];
  }

  // 3. Try fetching default weekly schedule from Supabase
  try {
    const { data: weeklyData, error: weeklyError } = await supabase
      .from('clinic_schedules')
      .select('slots')
      .eq('id', 'default_weekly')
      .maybeSingle();

    if (!weeklyError && weeklyData && typeof weeklyData.slots === 'object') {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        const dayOfWeek = d.getDay();
        const slotsForDay = (weeklyData.slots as Record<string, string[]>)[dayOfWeek.toString()];

        if (Array.isArray(slotsForDay)) {
          return {
            isClosed: slotsForDay.length === 0,
            slots: slotsForDay,
          };
        }
      }
    }
  } catch {
    // Fallback to local default
  }

  // 4. Default fallback based on day of week
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    const dayOfWeek = d.getDay();
    const defaultSlots = DEFAULT_WEEKLY_SCHEDULE[dayOfWeek] || [];
    return {
      isClosed: defaultSlots.length === 0,
      slots: defaultSlots,
    };
  }

  return {
    isClosed: false,
    slots: [...DEFAULT_SLOTS],
  };
};

/**
 * Save schedule for a specific date (YYYY-MM-DD)
 */
export const saveDateSchedule = async (
  dateStr: string,
  isClosed: boolean,
  slots: string[]
): Promise<{ success: boolean; error: string | null }> => {
  const availability: DayAvailability = { isClosed, slots };
  setLocalOverride(dateStr, availability);

  try {
    const { error } = await supabase.from('clinic_schedules').upsert(
      {
        id: dateStr,
        is_closed: isClosed,
        slots: isClosed ? [] : slots,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    );

    if (error) {
      console.error('Error saving schedule in Supabase:', error);
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error al guardar el horario.';
    return { success: false, error: msg };
  }
};

/**
 * Save a day's schedule as the default for that day of the week (e.g. all Mondays)
 */
export const saveDayAsWeeklyDefault = async (
  dayOfWeek: number,
  slots: string[]
): Promise<{ success: boolean; error: string | null }> => {
  try {
    // Fetch existing weekly schedule
    let currentWeekly: WeeklySchedule = { ...DEFAULT_WEEKLY_SCHEDULE };

    const { data, error: fetchError } = await supabase
      .from('clinic_schedules')
      .select('slots')
      .eq('id', 'default_weekly')
      .maybeSingle();

    if (!fetchError && data?.slots && typeof data.slots === 'object') {
      currentWeekly = { ...currentWeekly, ...(data.slots as Record<string, string[]>) };
    }

    currentWeekly[dayOfWeek] = slots;

    // Save back
    const { error } = await supabase.from('clinic_schedules').upsert(
      {
        id: 'default_weekly',
        is_closed: false,
        slots: currentWeekly,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    );

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error al guardar horario semanal.';
    return { success: false, error: msg };
  }
};
