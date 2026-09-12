import { useEffect, useState, useCallback, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { useModal } from '../../context/ModalContext';
import {
  getUserAppointments,
  cancelAppointment,
  clearPastAppointments,
  type Appointment,
} from '../../lib/appointments';
import styles from './MyAppointmentsPage.module.css';

const TrashIcon = ({ size = 18, className }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.8}
    stroke="currentColor"
    width={size}
    height={size}
    className={className}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    />
  </svg>
);

const AlertIcon = ({ size = 32 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 6C24.3788 6 24.725 6.214 24.8944 6.55279L41.8944 40.5528C42.0494 40.8628 42.0329 41.2309 41.8507 41.5257C41.6684 41.8205 41.3466 42 41 42H7C6.65342 42 6.33156 41.8205 6.14935 41.5257C5.96714 41.2309 5.95058 40.8628 6.10557 40.5528L23.1056 6.55279C23.275 6.214 23.6212 6 24 6ZM8.61803 40H39.382L24 9.23607L8.61803 40Z"
      fill="currentColor"
    />
    <path
      d="M22 20C22 18.8954 22.8954 18 24 18C25.1046 18 26 18.8954 26 20V30C26 31.1046 25.1046 32 24 32C22.8954 32 22 31.1046 22 30V20Z"
      fill="currentColor"
    />
    <path
      d="M22.0002 35.9663C22.0002 34.8803 22.8806 34 23.9665 34H24.0339C25.1199 34 26.0002 34.8803 26.0002 35.9663C26.0002 37.0522 25.1199 37.9326 24.0339 37.9326H23.9665C22.8806 37.9326 22.0002 37.0522 22.0002 35.9663Z"
      fill="currentColor"
    />
  </svg>
);

const CloseIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.75}
    stroke="currentColor"
    width={size}
    height={size}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

const CalendarIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.8}
    stroke="currentColor"
    width={size}
    height={size}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
    />
  </svg>
);

const ClockIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.8}
    stroke="currentColor"
    width={size}
    height={size}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

const ITEMS_PER_PAGE = 4;

type TabType = 'upcoming' | 'history';

const MyAppointmentsPage = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const { openBookingModal, openModal } = useModal();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  const [currentPage, setCurrentPage] = useState(1);

  // Estado para el modal de cancelación
  const [appointmentToCancel, setAppointmentToCancel] = useState<Appointment | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  // Estado para el modal de borrar historial de citas pasadas
  const [isClearHistoryModalOpen, setIsClearHistoryModalOpen] = useState(false);
  const [isClearingHistory, setIsClearingHistory] = useState(false);
  const [clearHistoryError, setClearHistoryError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data } = await getUserAppointments(user.id, user.email);
    setAppointments(data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    fetchAppointments();
  }, [fetchAppointments]);

  const getTodayDateString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayStr = getTodayDateString();

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appt) => {
      const isPast = appt.appointment_date < todayStr;
      const isFinished = appt.status === 'completed' || appt.status === 'cancelled';
      if (activeTab === 'upcoming') {
        return !isPast && !isFinished;
      } else {
        return isPast || isFinished;
      }
    });
  }, [appointments, activeTab, todayStr]);

  const upcomingCount = useMemo(() => {
    return appointments.filter((appt) => {
      const isPast = appt.appointment_date < todayStr;
      const isFinished = appt.status === 'completed' || appt.status === 'cancelled';
      return !isPast && !isFinished;
    }).length;
  }, [appointments, todayStr]);

  const historyCount = useMemo(() => {
    return appointments.filter((appt) => {
      const isPast = appt.appointment_date < todayStr;
      const isFinished = appt.status === 'completed' || appt.status === 'cancelled';
      return isPast || isFinished;
    }).length;
  }, [appointments, todayStr]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleOpenCancelModal = (appt: Appointment) => {
    setAppointmentToCancel(appt);
    setCancelError(null);
  };

  const handleCloseCancelModal = () => {
    if (isCancelling) return;
    setAppointmentToCancel(null);
    setCancelError(null);
  };

  const handleConfirmCancel = async () => {
    if (!appointmentToCancel) return;
    setIsCancelling(true);
    setCancelError(null);

    const { error } = await cancelAppointment(appointmentToCancel.id);

    if (error) {
      setCancelError(error);
      setIsCancelling(false);
      return;
    }

    // Actualizar estado local: status -> 'cancelled'
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === appointmentToCancel.id ? { ...appt, status: 'cancelled' } : appt
      )
    );

    setIsCancelling(false);
    setAppointmentToCancel(null);
  };

  const handleOpenClearHistoryModal = () => {
    setIsClearHistoryModalOpen(true);
    setClearHistoryError(null);
  };

  const handleCloseClearHistoryModal = () => {
    if (isClearingHistory) return;
    setIsClearHistoryModalOpen(false);
    setClearHistoryError(null);
  };

  const handleConfirmClearHistory = async () => {
    if (!user) return;
    setIsClearingHistory(true);
    setClearHistoryError(null);

    const { error } = await clearPastAppointments(user.id, user.email);

    if (error) {
      setClearHistoryError(error);
      setIsClearingHistory(false);
      return;
    }

    // Actualizar estado local: eliminar citas pasadas
    setAppointments((prev) =>
      prev.filter((appt) => {
        const isPast = appt.appointment_date < todayStr;
        const isFinished = appt.status === 'completed' || appt.status === 'cancelled';
        return !isPast && !isFinished;
      })
    );

    setIsClearingHistory(false);
    setIsClearHistoryModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (appointmentToCancel && !isCancelling) {
          setAppointmentToCancel(null);
          setCancelError(null);
        }
        if (isClearHistoryModalOpen && !isClearingHistory) {
          setIsClearHistoryModalOpen(false);
          setClearHistoryError(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [appointmentToCancel, isCancelling, isClearHistoryModalOpen, isClearingHistory]);

  const totalPages = Math.ceil(filteredAppointments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAppointments = filteredAppointments.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Fila de controles: Pestañas minimalistas (Izq) y Acción Borrar Historial (Der) */}
        {user && !loading && (
          <div className={styles.controlsRow}>
            {/* Tab Bar Minimalista con Línea Inferior */}
            <div className={styles.tabBar} role="tablist" aria-label="Filtro de citas">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'upcoming'}
                className={`${styles.tabBtn} ${activeTab === 'upcoming' ? styles.tabBtnActive : ''}`}
                onClick={() => handleTabChange('upcoming')}
              >
                <span>{language === 'es' ? 'Próximas' : 'Upcoming'}</span>
                {upcomingCount > 0 && (
                  <span className={styles.tabBadge}>{upcomingCount}</span>
                )}
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'history'}
                className={`${styles.tabBtn} ${activeTab === 'history' ? styles.tabBtnActive : ''}`}
                onClick={() => handleTabChange('history')}
              >
                <span>{language === 'es' ? 'Pasadas' : 'Past'}</span>
                {historyCount > 0 && (
                  <span className={styles.tabBadge}>{historyCount}</span>
                )}
              </button>
            </div>

            {/* Icono de papelera en color rojito en la esquina derecha */}
            {activeTab === 'history' && historyCount > 0 && (
              <button
                type="button"
                className={styles.clearHistoryBtn}
                onClick={handleOpenClearHistoryModal}
                title={language === 'es' ? 'Borrar todas las listas anteriores' : 'Clear past appointment history'}
                aria-label={language === 'es' ? 'Borrar todas las listas anteriores' : 'Clear past appointment history'}
              >
                <TrashIcon size={19} />
              </button>
            )}
          </div>
        )}

        {/* Contenido principal */}
        <main className={styles.mainContent}>
          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner} />
              <p>{language === 'es' ? 'Cargando tus citas...' : 'Loading your appointments...'}</p>
            </div>
          ) : !user ? (
            /* Estado si no está autenticado */
            <div className={styles.emptyCard}>
              <h2 className={styles.emptyTitle}>
                {language === 'es' ? 'Inicia sesión para ver tus citas' : 'Sign in to view your appointments'}
              </h2>
              <p className={styles.emptyText}>
                {language === 'es'
                  ? 'Debes estar autenticado para consultar tu historial de citas médicas.'
                  : 'You must be logged in to view your medical appointment history.'}
              </p>
              <button
                type="button"
                className={styles.primaryActionBtn}
                onClick={() => openModal('login')}
              >
                {language === 'es' ? 'Iniciar Sesión' : 'Sign In'}
              </button>
            </div>
          ) : filteredAppointments.length === 0 ? (
            /* Estado sin citas según pestaña activa */
            <div className={styles.emptyCard}>
              <div className={styles.emptyIconWrap}>
                <CalendarIcon size={32} />
              </div>
              <h2 className={styles.emptyTitle}>
                {activeTab === 'upcoming'
                  ? language === 'es' ? 'No tienes citas próximas' : 'No upcoming appointments'
                  : language === 'es' ? 'No tienes citas pasadas' : 'No past appointments in history'}
              </h2>
              <p className={styles.emptyText}>
                {activeTab === 'upcoming'
                  ? language === 'es'
                    ? 'Actualmente no tienes consultas o procedimientos programados. Agenda tu cita con nuestros especialistas.'
                    : 'You currently have no scheduled visits or procedures. Book an appointment with our specialists.'
                  : language === 'es'
                    ? 'Aquí se mostrarán las citas y procedimientos completados o finalizados.'
                    : 'Your completed and past appointments will appear here.'}
              </p>
              {activeTab === 'upcoming' && (
                <button
                  type="button"
                  className={styles.primaryActionBtn}
                  onClick={openBookingModal}
                >
                  {language === 'es' ? 'Agendar Cita' : 'Book Appointment'}
                </button>
              )}
            </div>
          ) : (
            /* Listado de Citas */
            <div className={styles.appointmentsList}>
              {paginatedAppointments.map((appt) => (
                <article
                  key={appt.id || appt.booking_ref}
                  className={styles.appointmentCard}
                >
                  {/* Encabezado de la tarjeta: Servicio y Código */}
                  <div className={styles.cardHeader}>
                    <div className={styles.serviceInfo}>
                      <span className={styles.serviceTag}>
                        {language === 'es' ? 'SERVICIO' : 'SERVICE'}
                      </span>
                      <h2 className={styles.serviceName}>{appt.service_name}</h2>
                    </div>

                    {appt.booking_ref && (
                      <span className={styles.bookingRef}>
                        #{appt.booking_ref}
                      </span>
                    )}
                  </div>

                  <div className={styles.cardDivider} />

                  {/* Datos de Fecha y Hora */}
                  <div className={styles.cardBody}>
                    <div className={styles.detailBlock}>
                      <div className={styles.detailLabelRow}>
                        <CalendarIcon size={14} />
                        <span className={styles.detailLabel}>
                          {language === 'es' ? 'FECHA' : 'DATE'}
                        </span>
                      </div>
                      <span className={styles.detailValue}>
                        {formatDate(appt.appointment_date)}
                      </span>
                    </div>

                    <div className={styles.detailBlock}>
                      <div className={styles.detailLabelRow}>
                        <ClockIcon size={14} />
                        <span className={styles.detailLabel}>
                          {language === 'es' ? 'HORA' : 'TIME'}
                        </span>
                      </div>
                      <span className={styles.detailValue}>
                        {appt.appointment_time}
                      </span>
                    </div>
                  </div>

                  {/* Espacio para acciones (Cancelar Cita) - Solo en Próximas */}
                  {activeTab === 'upcoming' && (
                    <div className={styles.cardActions}>
                      <button
                        type="button"
                        className={styles.cancelBtn}
                        onClick={() => handleOpenCancelModal(appt)}
                        title={language === 'es' ? 'Cancelar cita médica' : 'Cancel medical appointment'}
                      >
                        {language === 'es' ? 'Cancelar cita' : 'Cancel appointment'}
                      </button>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}

          {/* Control de paginación compacto (< 1 / N >) */}
          {!loading && user && totalPages > 1 && (
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
        </main>
      </div>

      {/* Modal de Confirmación de Cancelación */}
      {appointmentToCancel && (
        <div
          className={styles.modalOverlay}
          onClick={handleCloseCancelModal}
          role="presentation"
        >
          <div
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-modal-title"
          >
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={handleCloseCancelModal}
              disabled={isCancelling}
              aria-label={language === 'es' ? 'Cerrar modal' : 'Close modal'}
            >
              <CloseIcon size={20} />
            </button>

            <div className={styles.modalIconWrap}>
              <AlertIcon size={34} />
            </div>

            <h3 id="cancel-modal-title" className={styles.modalTitle}>
              {language === 'es' ? '¿Cancelar cita médica?' : 'Cancel Medical Appointment?'}
            </h3>

            <p className={styles.modalDesc}>
              {language === 'es' ? (
                <>
                  Estás seguro de que deseas cancelar tu cita del{' '}
                  <strong>{formatDate(appointmentToCancel.appointment_date)}</strong> a las{' '}
                  <strong>{appointmentToCancel.appointment_time}</strong>? Esta acción liberará tu espacio.
                </>
              ) : (
                <>
                  Are you sure you want to cancel your appointment on{' '}
                  <strong>{formatDate(appointmentToCancel.appointment_date)}</strong> at{' '}
                  <strong>{appointmentToCancel.appointment_time}</strong>? This action will release your spot.
                </>
              )}
            </p>

            {cancelError && (
              <div className={styles.modalError}>
                <span>{cancelError}</span>
              </div>
            )}

            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.keepBtn}
                onClick={handleCloseCancelModal}
                disabled={isCancelling}
              >
                {language === 'es' ? 'No, mantener cita' : 'No, keep appointment'}
              </button>

              <button
                type="button"
                className={styles.confirmCancelBtn}
                onClick={handleConfirmCancel}
                disabled={isCancelling}
              >
                {isCancelling ? (
                  <>
                    <span className={styles.btnSpinner} aria-hidden="true" />
                    <span>{language === 'es' ? 'Cancelando...' : 'Cancelling...'}</span>
                  </>
                ) : (
                  <span>{language === 'es' ? 'Sí, cancelar' : 'Yes, cancel'}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación para Borrar Historial de Citas Pasadas */}
      {isClearHistoryModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={handleCloseClearHistoryModal}
          role="presentation"
        >
          <div
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="clear-history-modal-title"
          >
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={handleCloseClearHistoryModal}
              disabled={isClearingHistory}
              aria-label={language === 'es' ? 'Cerrar modal' : 'Close modal'}
            >
              <CloseIcon size={20} />
            </button>

            <div className={`${styles.modalIconWrap} ${styles.modalIconWrapDanger}`}>
              <TrashIcon size={30} />
            </div>

            <h3 id="clear-history-modal-title" className={styles.modalTitle}>
              {language === 'es' ? '¿Borrar historial de citas?' : 'Clear Appointment History?'}
            </h3>

            <p className={styles.modalDesc}>
              {language === 'es' ? (
                <>
                  ¿Estás seguro de que deseas eliminar todas las citas de tu historial de{' '}
                  <strong>citas pasadas ({historyCount})</strong>? Esta acción no se puede deshacer.
                </>
              ) : (
                <>
                  Are you sure you want to delete all appointments from your{' '}
                  <strong>past history ({historyCount})</strong>? This action cannot be undone.
                </>
              )}
            </p>

            {clearHistoryError && (
              <div className={styles.modalError}>
                <span>{clearHistoryError}</span>
              </div>
            )}

            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.keepBtn}
                onClick={handleCloseClearHistoryModal}
                disabled={isClearingHistory}
              >
                {language === 'es' ? 'No, conservar' : 'No, keep'}
              </button>

              <button
                type="button"
                className={styles.confirmCancelBtn}
                onClick={handleConfirmClearHistory}
                disabled={isClearingHistory}
              >
                {isClearingHistory ? (
                  <>
                    <span className={styles.btnSpinner} aria-hidden="true" />
                    <span>{language === 'es' ? 'Borrando...' : 'Deleting...'}</span>
                  </>
                ) : (
                  <span>{language === 'es' ? 'Sí, borrar todo' : 'Yes, delete all'}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointmentsPage;
