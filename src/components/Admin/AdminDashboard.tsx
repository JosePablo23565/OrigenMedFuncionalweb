import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import {
  Phone,
  Search,
  X,
  Filter,
  Check,
  CircleCheck,
  CircleX,
  CircleDashed,
  CalendarCheck,
  CalendarDays,
  History,
  Copy,
  Menu,
} from 'lucide-react';
import { getAllAppointments } from '../../lib/admin';
import type { Appointment } from '../../lib/appointments';
import styles from './AdminDashboard.module.css';

const WhatsAppIcon = ({ size = 16, className }: { size?: number; className?: string }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <title>WhatsApp</title>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const GmailIcon = ({ size = 16, className }: { size?: number; className?: string }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <title>Gmail</title>
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
  </svg>
);

interface AdminDashboardProps {
  activeTab: 'dashboard' | 'today' | 'appointments';
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenMobileMenu?: () => void;
}

const AdminDashboard = ({
  activeTab,
  searchQuery,
  setSearchQuery,
  onOpenMobileMenu,
}: AdminDashboardProps) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1800);
    }
  };

  // Filter Popover & Active Filters State
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    const { data } = await getAllAppointments();
    setAppointments(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // Close filter popover on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    if (filterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [filterOpen]);

  // Format today YYYY-MM-DD in Costa Rica
  const todayStr = useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  // Filtered List
  const filteredAppointments = useMemo(() => {
    return appointments.filter((item) => {
      // Tab filter
      if (activeTab === 'today' && item.appointment_date !== todayStr) {
        return false;
      }

      // Status Filter
      if (statusFilter.length > 0 && !statusFilter.includes(item.status)) {
        return false;
      }

      // Date Range Filter (today, upcoming, past)
      if (dateFilter.length > 0) {
        const matchesAnyDateRange = dateFilter.some((df) => {
          if (df === 'today') return item.appointment_date === todayStr;
          if (df === 'upcoming') return item.appointment_date > todayStr;
          if (df === 'past') return item.appointment_date < todayStr;
          return false;
        });
        if (!matchesAnyDateRange) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.patient_name.toLowerCase().includes(q);
        const matchesEmail = item.patient_email.toLowerCase().includes(q);
        const matchesPhone = item.patient_phone.toLowerCase().includes(q);
        const matchesRef = item.booking_ref.toLowerCase().includes(q);
        const matchesService = item.service_name.toLowerCase().includes(q);

        if (!matchesName && !matchesEmail && !matchesPhone && !matchesRef && !matchesService) {
          return false;
        }
      }

      return true;
    });
  }, [appointments, activeTab, searchQuery, statusFilter, dateFilter, todayStr]);

  const activeFiltersCount = statusFilter.length + dateFilter.length;

  const toggleStatusFilter = (st: string) => {
    setStatusFilter((prev) =>
      prev.includes(st) ? prev.filter((s) => s !== st) : [...prev, st]
    );
  };

  const toggleDateFilter = (df: string) => {
    setDateFilter((prev) =>
      prev.includes(df) ? prev.filter((d) => d !== df) : [...prev, df]
    );
  };

  const clearAllFilters = () => {
    setStatusFilter([]);
    setDateFilter([]);
  };

  // Compact date: "Vie, 11 sep"
  const formatCompactDate = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-').map(Number);
      const d = new Date(year, month - 1, day);
      const str = d.toLocaleDateString('es-ES', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      });
      // Capitalize first letter (e.g., "vie, 11 sept." -> "Vie, 11 sep")
      const cleaned = str.replace('.', '');
      return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    } catch {
      return dateStr;
    }
  };

  // Modal grouped date: "Viernes, 11 Sep"
  const formatModalDate = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-').map(Number);
      const d = new Date(year, month - 1, day);
      const weekdayLong = d.toLocaleDateString('es-ES', { weekday: 'long' });
      const monthShort = d.toLocaleDateString('es-ES', { month: 'short' }).replace('.', '');
      const capWeekday = weekdayLong.charAt(0).toUpperCase() + weekdayLong.slice(1);
      const capMonth = monthShort.charAt(0).toUpperCase() + monthShort.slice(1, 4);
      return `${capWeekday}, ${day} ${capMonth}`;
    } catch {
      return dateStr;
    }
  };

  const getWhatsAppUrl = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    // Si tiene 8 dígitos (formato estándar Costa Rica), anteponer código de país 506
    const fullNumber = digits.length === 8 ? `506${digits}` : digits;
    return `https://wa.me/${fullNumber}`;
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completada';
      case 'confirmed':
        return 'Confirmada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return 'Pendiente';
    }
  };

  return (
    <div className={styles.dashboard}>
      {/* SEARCH AND FILTERS CONTROLS ROW */}
      <div className={styles.controlsRow}>
        {onOpenMobileMenu && (
          <button
            type="button"
            className={styles.mobileHamburgerBtn}
            onClick={onOpenMobileMenu}
            aria-label="Abrir Menú"
            title="Abrir Menú"
          >
            <Menu size={20} />
          </button>
        )}

        <div className={styles.searchBar}>
          <Search size={17} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Buscar por paciente, servicio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className={styles.clearSearchBtn}
              onClick={() => setSearchQuery('')}
              aria-label="Borrar búsqueda"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* FILTER POPOVER TRIGGER */}
        <div className={styles.filterWrapper} ref={filterRef}>
          <button
            type="button"
            className={`${styles.filterBtn} ${activeFiltersCount > 0 ? styles.filterBtnActive : ''}`}
            onClick={() => setFilterOpen((prev) => !prev)}
            aria-expanded={filterOpen}
            title="Filtrar citas"
            aria-label="Filtrar citas"
          >
            <Filter size={17} />
            {activeFiltersCount > 0 && (
              <span className={styles.filterBadge}>{activeFiltersCount}</span>
            )}
          </button>

          {/* FILTER DROPDOWN / POPOVER */}
          {filterOpen && (
            <div className={styles.filterPopover}>
              <div className={styles.popoverHeader}>
                <span className={styles.popoverTitle}>Filtros</span>
                {activeFiltersCount > 0 && (
                  <button
                    type="button"
                    className={styles.clearFiltersTextBtn}
                    onClick={clearAllFilters}
                  >
                    Limpiar ({activeFiltersCount})
                  </button>
                )}
              </div>

              {/* Status Section */}
              <div className={styles.popoverSection}>
                <span className={styles.sectionHeading}>Estado</span>
                <div className={styles.filterOptionsList}>
                  {[
                    { id: 'confirmed', label: 'Confirmadas', icon: <CircleCheck size={14} className={styles.iconBlue} /> },
                    { id: 'completed', label: 'Completadas', icon: <CircleCheck size={14} className={styles.iconGreen} /> },
                    { id: 'cancelled', label: 'Canceladas', icon: <CircleX size={14} className={styles.iconRed} /> },
                    { id: 'pending', label: 'Pendientes', icon: <CircleDashed size={14} className={styles.iconYellow} /> },
                  ].map((item) => {
                    const isChecked = statusFilter.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`${styles.filterItem} ${isChecked ? styles.filterItemChecked : ''}`}
                        onClick={() => toggleStatusFilter(item.id)}
                      >
                        <span className={styles.itemCheck}>
                          {isChecked ? <Check size={12} /> : null}
                        </span>
                        <span className={styles.itemIcon}>{item.icon}</span>
                        <span className={styles.itemLabel}>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date / Time Section */}
              <div className={styles.popoverSection}>
                <span className={styles.sectionHeading}>Fecha</span>
                <div className={styles.filterOptionsList}>
                  {[
                    { id: 'today', label: 'Hoy', icon: <CalendarCheck size={14} className={styles.iconGreen} /> },
                    { id: 'upcoming', label: 'Próximas', icon: <CalendarDays size={14} className={styles.iconBlue} /> },
                    { id: 'past', label: 'Pasadas', icon: <History size={14} className={styles.iconMuted} /> },
                  ].map((item) => {
                    const isChecked = dateFilter.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`${styles.filterItem} ${isChecked ? styles.filterItemChecked : ''}`}
                        onClick={() => toggleDateFilter(item.id)}
                      >
                        <span className={styles.itemCheck}>
                          {isChecked ? <Check size={12} /> : null}
                        </span>
                        <span className={styles.itemIcon}>{item.icon}</span>
                        <span className={styles.itemLabel}>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DASHBOARD BODY */}
      <div className={styles.dashboardBody}>
        <div className={styles.tableContainer}>
        <div className={styles.tableWrapper}>
          {loading ? (
            <div className={styles.emptyState}>
              <div className={styles.spinner} />
              <p>Cargando agenda de citas...</p>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No se encontraron citas que coincidan con la búsqueda o filtro seleccionado.</p>
            </div>
          ) : (
            <div className={styles.cardsGrid}>
              {filteredAppointments.map((app) => {
                const statusClass =
                  app.status === 'completed'
                    ? styles.borderCompleted
                    : app.status === 'cancelled'
                    ? styles.borderCancelled
                    : styles.borderConfirmed;

                return (
                  <div
                    key={app.id}
                    className={`${styles.compactCard} ${statusClass}`}
                    onClick={() => setSelectedAppt(app)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedAppt(app);
                      }
                    }}
                  >
                    {/* Fila Superior: Servicio + Estado */}
                    <div className={styles.cardTopRow}>
                      <span className={styles.serviceTag}>{app.service_name}</span>
                      <span className={`${styles.statusPill} ${styles[`statusPill_${app.status}`]}`}>
                        {getStatusLabel(app.status)}
                      </span>
                    </div>

                    {/* Cuerpo Principal: Paciente + Horario + Botón llamada */}
                    <div className={styles.cardMainBody}>
                      <div className={styles.patientAndDate}>
                        <h3 className={styles.patientName}>{app.patient_name}</h3>
                        <p className={styles.dateTime}>
                          {formatCompactDate(app.appointment_date)} • {app.appointment_time}
                        </p>
                      </div>

                      {app.patient_phone && (
                        <a
                          href={`tel:${app.patient_phone}`}
                          className={styles.quickCallBtn}
                          onClick={(e) => e.stopPropagation()}
                          title={`Llamar a ${app.patient_name}`}
                          aria-label={`Llamar a ${app.patient_name}`}
                        >
                          <Phone size={15} />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>

      {/* MODAL DETALLE DE CITA AL HACER TAP */}
      {selectedAppt && (
        <div className={styles.modalOverlay} onClick={() => { setSelectedAppt(null); setCopiedField(null); }}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* Top Bar with Divider: Service Tag + Booking Ref Pill & Close Button */}
            <div className={styles.modalTopBar}>
              <div className={styles.modalMetaRow}>
                <span className={styles.modalServiceTag}>{selectedAppt.service_name}</span>
                <span className={styles.bookingRefPill}>{selectedAppt.booking_ref}</span>
              </div>
              <button
                type="button"
                className={styles.closeModalBtn}
                onClick={() => { setSelectedAppt(null); setCopiedField(null); }}
                aria-label="Cerrar detalle"
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Unified Appointment Info Card */}
              <div className={styles.appointmentInfoCard}>
                {/* Paciente */}
                <div className={styles.contactDetailRow}>
                  <div className={styles.contactTextGroup}>
                    <span className={styles.detailLabel}>Paciente</span>
                    <span className={styles.patientNameValue}>{selectedAppt.patient_name}</span>
                  </div>
                </div>

                {/* Fecha */}
                <div className={styles.contactDetailRow}>
                  <div className={styles.contactTextGroup}>
                    <span className={styles.detailLabel}>Fecha</span>
                    <span className={styles.dateTimeValue}>
                      {formatModalDate(selectedAppt.appointment_date)} · {selectedAppt.appointment_time}
                    </span>
                  </div>
                </div>

                {/* Teléfono */}
                <div className={styles.contactDetailRow}>
                  <div className={styles.contactTextGroup}>
                    <span className={styles.detailLabel}>Teléfono</span>
                    {selectedAppt.patient_phone ? (
                      <a href={`tel:${selectedAppt.patient_phone}`} className={styles.contactValueLink}>
                        {selectedAppt.patient_phone}
                      </a>
                    ) : (
                      <span className={styles.contactValueEmpty}>No registrado</span>
                    )}
                  </div>
                  {selectedAppt.patient_phone && (
                    <button
                      type="button"
                      className={styles.copyBtn}
                      onClick={() => handleCopy(selectedAppt.patient_phone, 'modal-phone')}
                      title="Copiar teléfono"
                      aria-label="Copiar teléfono"
                    >
                      {copiedField === 'modal-phone' ? (
                        <>
                          <Check size={13} className={styles.copySuccessIcon} />
                          <span className={styles.copyFeedback}>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Correo Electrónico */}
                <div className={styles.contactDetailRow}>
                  <div className={styles.contactTextGroup}>
                    <span className={styles.detailLabel}>Correo Electrónico</span>
                    <a href={`mailto:${selectedAppt.patient_email}`} className={styles.contactValueLink}>
                      {selectedAppt.patient_email}
                    </a>
                  </div>
                  {selectedAppt.patient_email && (
                    <button
                      type="button"
                      className={styles.copyBtn}
                      onClick={() => handleCopy(selectedAppt.patient_email, 'modal-email')}
                      title="Copiar correo"
                      aria-label="Copiar correo"
                    >
                      {copiedField === 'modal-email' ? (
                        <>
                          <Check size={13} className={styles.copySuccessIcon} />
                          <span className={styles.copyFeedback}>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Balanced Action Footer: WhatsApp & Correo */}
              <div className={styles.modalFooter}>
                {selectedAppt.patient_phone && (
                  <a
                    href={getWhatsAppUrl(selectedAppt.patient_phone)}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.modalPrimaryBtn}
                  >
                    <WhatsAppIcon size={16} /> WhatsApp
                  </a>
                )}
                {selectedAppt.patient_email && (
                  <a
                    href={`mailto:${selectedAppt.patient_email}`}
                    className={styles.modalSecondaryBtn}
                  >
                    <GmailIcon size={16} /> Correo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

