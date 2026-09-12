import { useState, useEffect } from 'react';
import { es } from 'react-day-picker/locale';
import {
  Plus,
  Trash2,
  RotateCcw,
  Save,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Calendar } from '../Calendar/Calendar';
import {
  getScheduleForDate,
  saveDateSchedule,
  DEFAULT_SLOTS,
} from '../../lib/schedule';
import styles from './AdminSchedule.module.css';

interface AdminScheduleProps {
  onOpenMobileMenu?: () => void;
}

const AdminSchedule = ({ onOpenMobileMenu: _onOpenMobileMenu }: AdminScheduleProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isClosed, setIsClosed] = useState(false);
  const [slots, setSlots] = useState<string[]>(DEFAULT_SLOTS);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // New slot form state
  const [newTimeHour, setNewTimeHour] = useState('8:00');
  const [newTimePeriod, setNewTimePeriod] = useState<'AM' | 'PM'>('AM');

  const formatDateStr = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const loadSchedule = async (date: Date) => {
    const dateStr = formatDateStr(date);
    try {
      const availability = await getScheduleForDate(dateStr);
      setIsClosed(availability.isClosed);
      setSlots(availability.slots);
    } catch {
      setIsClosed(false);
      setSlots([...DEFAULT_SLOTS]);
    }
  };

  useEffect(() => {
    loadSchedule(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const handleAddSlot = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const formatted = `${newTimeHour.trim()} ${newTimePeriod}`;

    if (slots.includes(formatted)) {
      setFeedback({ type: 'error', message: `El horario ${formatted} ya está agregado.` });
      return;
    }

    const updated = [...slots, formatted].sort((a, b) => {
      // Helper sort times
      const parseTime = (str: string) => {
        const [timePart, period] = str.split(' ');
        const [h, m] = timePart.split(':').map(Number);
        let hours = h;
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        return hours * 60 + (m || 0);
      };
      return parseTime(a) - parseTime(b);
    });

    setSlots(updated);
    setFeedback(null);
  };

  const handleRemoveSlot = (slotToRemove: string) => {
    setSlots(slots.filter((s) => s !== slotToRemove));
  };

  const handleSetPreset = (presetSlots: string[]) => {
    setSlots(presetSlots);
    setIsClosed(false);
  };

  const handleSaveDate = async () => {
    const dateStr = formatDateStr(selectedDate);
    setSaving(true);
    setFeedback(null);

    const res = await saveDateSchedule(dateStr, isClosed, slots);
    setSaving(false);

    if (res.success) {
      setFeedback({
        type: 'success',
        message: `Horario guardado correctamente para el ${selectedDate.toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}.`,
      });
      setTimeout(() => setFeedback(null), 5000);
    } else {
      setFeedback({
        type: 'error',
        message: res.error || 'Error al guardar el horario.',
      });
    }
  };

  const handleResetToDefault = () => {
    setIsClosed(false);
    setSlots([...DEFAULT_SLOTS]);
    setFeedback({
      type: 'success',
      message: 'Horarios restablecidos al estándar institucional (5:00 PM – 7:30 PM). Recuerda presionar "Guardar".',
    });
  };

  const formattedDateTitle = selectedDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={styles.container}>
      {/* Top Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Gestión de Horarios y Disponibilidad</h1>
        <p className={styles.subtitle}>
          Selecciona una fecha en el calendario para habilitar, deshabilitar o crear horarios de atención médica.
        </p>
      </div>

      {/* Feedback Alerts */}
      {feedback && feedback.type === 'success' && (
        <div className={styles.alertSuccess}>
          <CheckCircle2 size={18} />
          <span>{feedback.message}</span>
        </div>
      )}

      {feedback && feedback.type === 'error' && (
        <div className={styles.alertError}>
          <AlertCircle size={18} />
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Main Grid: Calendar + Day Schedule Editor */}
      <div className={styles.scheduleLayout}>
        {/* Left: Interactive Calendar */}
        <div className={styles.calendarCard}>
          <h2 className={styles.calendarCardTitle}>Selecciona una Fecha</h2>
          <div className={styles.calendarWrapper}>
            <Calendar
              mode="single"
              required
              selected={selectedDate}
              onSelect={(date) => {
                if (date) setSelectedDate(date);
              }}
              locale={es}
            />
          </div>
          <div className={styles.calendarLegend}>
            <div className={styles.legendItem}>
              <div className={styles.legendDotOpen}></div>
              <span>Día con horas configurables</span>
            </div>
            <div className={styles.legendItem}>
              <div className={styles.legendDotClosed}></div>
              <span>Día marcado como cerrado</span>
            </div>
          </div>
        </div>

        {/* Right: Schedule Editor for Selected Day */}
        <div className={styles.editorCard}>
          <div className={styles.editorHeader}>
            <div className={styles.selectedDateInfo}>
              <span className={styles.selectedDateName}>{formattedDateTitle}</span>
            </div>

            {/* Toggle Closed / Open */}
            <button
              type="button"
              className={`${styles.switchBtn} ${isClosed ? styles.switchBtnActive : ''}`}
              onClick={() => setIsClosed(!isClosed)}
            >
              {isClosed ? 'Habilitar Atención' : 'Marcar Día Cerrado'}
            </button>
          </div>

          {isClosed ? (
            <div className={styles.emptySlotsNotice}>
              <AlertCircle size={28} style={{ color: '#dc2626', marginBottom: '8px' }} />
              <p style={{ margin: 0, fontWeight: 600, color: '#302E2E' }}>
                Este día está configurado como NO DISPONIBLE.
              </p>
              <p style={{ margin: '6px 0 0', fontSize: '0.85rem' }}>
                Los pacientes no podrán agendar ninguna cita en esta fecha.
              </p>
            </div>
          ) : (
            <>
              {/* Active Slots Grid */}
              <div className={styles.slotsSection}>
                <div className={styles.slotsSectionTitle}>
                  <span>Horarios Activos para este Día:</span>
                  <span className={styles.slotsCount}>
                    {slots.length} {slots.length === 1 ? 'hora' : 'horas'}
                  </span>
                </div>

                {slots.length === 0 ? (
                  <div className={styles.emptySlotsNotice}>
                    No hay horarios activos para este día. Agrega uno abajo o carga los horarios predeterminados.
                  </div>
                ) : (
                  <div className={styles.slotsGrid}>
                    {slots.map((slot) => (
                      <div key={slot} className={styles.slotChip} title="Horario habilitado">
                        <span>{slot}</span>
                        <button
                          type="button"
                          className={styles.slotDeleteBtn}
                          onClick={() => handleRemoveSlot(slot)}
                          title={`Quitar horario ${slot}`}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add Custom Time Slot */}
              <form onSubmit={handleAddSlot} className={styles.addSlotRow}>
                <input
                  type="text"
                  placeholder="Ej: 8:00, 9:30, 4:00"
                  value={newTimeHour}
                  onChange={(e) => setNewTimeHour(e.target.value)}
                  className={styles.addSlotInput}
                  style={{ width: '130px' }}
                />
                <select
                  value={newTimePeriod}
                  onChange={(e) => setNewTimePeriod(e.target.value as 'AM' | 'PM')}
                  className={styles.addSlotSelect}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
                <button type="submit" className={styles.addSlotBtn}>
                  <Plus size={15} />
                  Agregar Hora
                </button>
              </form>

              {/* Quick Presets */}
              <div className={styles.presetRow}>
                <span className={styles.presetLabel}>Plantillas rápidas:</span>
                <button type="button" onClick={handleResetToDefault} className={styles.presetBtn}>
                  <RotateCcw size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                  Tarde (5:00 PM – 7:30 PM)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleSetPreset(['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM']);
                  }}
                  className={styles.presetBtn}
                >
                  Mañana (8:00 AM – 12:00 PM)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleSetPreset([
                      '8:00 AM',
                      '9:00 AM',
                      '10:00 AM',
                      '2:00 PM',
                      '3:00 PM',
                      '4:00 PM',
                      '5:00 PM',
                      '6:00 PM',
                      '7:00 PM',
                    ]);
                  }}
                  className={styles.presetBtn}
                >
                  Jornada Completa
                </button>
              </div>
            </>
          )}

          {/* Action Footer */}
          <div className={styles.actionsFooter}>
            <button
              type="button"
              onClick={handleSaveDate}
              disabled={saving}
              className={styles.saveBtn}
            >
              <Save size={16} />
              {saving ? 'Guardando...' : 'Guardar Horario de este Día'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSchedule;
