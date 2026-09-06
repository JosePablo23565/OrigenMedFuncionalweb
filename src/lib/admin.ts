import { supabase } from './supabase';
import type { Appointment } from './appointments';

export const isUserAdmin = async (email?: string | null): Promise<boolean> => {
  if (!email) return false;

  const { data, error } = await supabase
    .from('admin_users')
    .select('email')
    .eq('email', email.toLowerCase().trim())
    .maybeSingle();

  if (error || !data) {
    return false;
  }

  return true;
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