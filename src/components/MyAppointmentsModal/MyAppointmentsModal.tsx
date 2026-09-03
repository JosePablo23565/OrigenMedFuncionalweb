import { useEffect, useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { getUserAppointments, type Appointment } from '../../lib/appointments';
import styles from './MyAppointmentsModal.module.css';

const ITEMS_PER_PAGE = 3;

const MyAppointmentsModal = () => {
  const { isMyAppointmentsOpen, closeMyAppointments, openBookingModal } = useModal();
  const { user } = useAuth();
  const { language } = useLanguage();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchAppointments = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await getUserAppointments(user.id, user.email);
    setAppointments(data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (isMyAppointmentsOpen && user) {
      fetchAppointments();
      setCurrentPage(1);
    }
  }, [isMyAppointmentsOpen, user, fetchAppointments]);

  // Lock body scroll when open
  useEffect(() => {
    if (isMyAppointmentsOpen) {
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');

      return () => {
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
      };
    }
  }, [isMyAppointmentsOpen]);

  if (!isMyAppointmentsOpen) return null;

  const totalPages = Math.ceil(appointments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAppointments = appointments.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const formatDate = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-').map(Number);
      const d = new Date(year, month - 1, day);
      const str = d.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      return str.charAt(0).toUpperCase() + str.slice(1);
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      className={styles.overlay}
      onClick={closeMyAppointments}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header del modal */}
        <div className={styles.topBar}>
          <h2 className={styles.topBarTitle}>
            {language === 'es' ? 'Mis Citas' : 'My Appointments'}
          </h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={closeMyAppointments}
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Contenido */}
        <div className={styles.content}>
          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner} />
              <p>{language === 'es' ? 'Cargando tus citas...' : 'Loading your appointments...'}</p>
            </div>
          ) : appointments.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>
                {language === 'es'
                  ? 'No tienes citas agendadas actualmente.'
                  : 'You currently have no scheduled appointments.'}
              </p>
              <button
                type="button"
                className={styles.bookBtn}
                onClick={() => {
                  closeMyAppointments();
                  openBookingModal();
                }}
              >
                {language === 'es' ? 'Agendar Cita' : 'Book Appointment'}
              </button>
            </div>
          ) : (
            <div className={styles.appointmentList}>
              {paginatedAppointments.map((appt) => (
                <div key={appt.id || appt.booking_ref} className={styles.appointmentCard}>
                  {/* Título directo del servicio sin rótulo de Procedimiento */}
                  <h3 className={styles.serviceName}>{appt.service_name}</h3>

                  <div className={styles.cardDivider} />

                  {/* Fecha y Hora */}
                  <div className={styles.cardGrid}>
                    <div className={styles.gridItem}>
                      <span className={styles.cardLabel}>
                        {language === 'es' ? 'Fecha' : 'Date'}
                      </span>
                      <span className={styles.itemValue}>{formatDate(appt.appointment_date)}</span>
                    </div>

                    <div className={styles.gridItemHora}>
                      <span className={styles.cardLabel}>
                        {language === 'es' ? 'Hora' : 'Time'}
                      </span>
                      <span className={styles.itemValue}>{appt.appointment_time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Paginación sutil en el footer cuando hay más de una página */}
        {!loading && totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              type="button"
              className={styles.pageBtn}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label={language === 'es' ? 'Página anterior' : 'Previous page'}
            >
              ‹
            </button>
            <span className={styles.pageIndicator}>
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              className={styles.pageBtn}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label={language === 'es' ? 'Página siguiente' : 'Next page'}
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointmentsModal;
