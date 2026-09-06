import { supabase } from './supabase';
import type { Appointment } from './appointments';

// Authorized Admin Emails (can be extended or checked via DB)
export const AUTHORIZED_ADMIN_EMAILS = [
  'pablose19g@gmail.com',
  'admin@origenmedfuncional.com',
  'enfermeria@origenmedfuncional.com',
];

export const isUserAdmin = (email?: string | null): boolean => {
  if (!email) return false;
  const normalized = email.toLowerCase().trim();
  return AUTHORIZED_ADMIN_EMAILS.some((e) => e.toLowerCase() === normalized) || normalized.includes('admin');
};

export const getAllAppointments = async (): Promise<{
  data: Appointment[];
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('appointment_date', { ascending: false })
      .order('appointment_time', { ascending: true });

    if (error) {
      return { data: [], error: error.message };
    }

    return { data: (data as Appointment[]) || [], error: null };
  } catch {
    return { data: [], error: 'Error al consultar las citas administrativas.' };
  }
};

export const updateAppointmentStatus = async (
  id: string,
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed'
): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id);

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  } catch {
    return { error: 'Error al actualizar el estado de la cita.' };
  }
};

export const deleteAppointment = async (id: string): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase.from('appointments').delete().eq('id', id);

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  } catch {
    return { error: 'Error al eliminar la cita.' };
  }
};
