import { supabase } from './supabase';

export interface Appointment {
  id: string;
  user_id: string | null;
  booking_ref: string;
  service_id: string;
  service_name: string;
  category: 'consultas' | 'procedimientos';
  appointment_date: string;
  appointment_time: string;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  notes: string | null;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  created_at: string;
}

export interface CreateAppointmentInput {
  user_id?: string | null;
  booking_ref: string;
  service_id: string;
  service_name: string;
  category: 'consultas' | 'procedimientos';
  appointment_date: string; // YYYY-MM-DD
  appointment_time: string;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  notes?: string | null;
  status?: 'confirmed' | 'pending' | 'cancelled' | 'completed';
}

export const createAppointment = async (
  input: CreateAppointmentInput
): Promise<{ data: Appointment | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .insert([
        {
          user_id: input.user_id || null,
          booking_ref: input.booking_ref,
          service_id: input.service_id,
          service_name: input.service_name,
          category: input.category,
          appointment_date: input.appointment_date,
          appointment_time: input.appointment_time,
          patient_name: input.patient_name,
          patient_email: input.patient_email,
          patient_phone: input.patient_phone,
          notes: input.notes || null,
          status: input.status || 'confirmed',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error inserting appointment into Supabase:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error inesperado al guardar la cita.';
    return { data: null, error: message };
  }
};

export const getUserAppointments = async (
  userId?: string | null,
  email?: string | null
): Promise<{ data: Appointment[]; error: string | null }> => {
  if (!userId && !email) {
    return { data: [], error: null };
  }

  try {
    let query = supabase
      .from('appointments')
      .select('*')
      .order('appointment_date', { ascending: true });

    if (userId) {
      query = query.eq('user_id', userId);
    } else if (email) {
      query = query.eq('patient_email', email);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching user appointments:', error);
      return { data: [], error: error.message };
    }

    return { data: data || [], error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error al consultar las citas.';
    return { data: [], error: message };
  }
};

export const getBookedSlotsForDate = async (
  dateStr: string
): Promise<{ data: string[]; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('appointment_time')
      .eq('appointment_date', dateStr)
      .neq('status', 'cancelled');

    if (error) {
      console.error('Error fetching booked slots:', error);
      return { data: [], error: error.message };
    }

    const booked = (data || []).map((item) => item.appointment_time as string);
    return { data: booked, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error al consultar horarios ocupados.';
    return { data: [], error: message };
  }
};

