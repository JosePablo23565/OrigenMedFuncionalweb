import { useState, useEffect, type FormEvent } from 'react';
import { es, enUS } from 'react-day-picker/locale';
import {
  Sparkles,
  Stethoscope,
  Droplets,
  Ear,
  Scissors,
  Activity,
  ShieldCheck,
  HeartPulse,
  Clock,
  Check,
  Calendar as CalendarIcon,
  User as UserIcon,
  Mail,
  Phone,
  FileText,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Calendar } from '../Calendar/Calendar';
import { createAppointment, getBookedSlotsForDate } from '../../lib/appointments';
import type { TranslationKeys } from '../../i18n/translations';
import styles from './BookingModal.module.css';

const BackIcon = ({ size = 20, className }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.75}
    stroke="currentColor"
    width={size}
    height={size}
    className={className}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
    />
  </svg>
);

type ServiceKey = keyof TranslationKeys['booking']['services'];

interface ServiceItem {
  id: ServiceKey;
  category: 'consultas' | 'procedimientos';
  Icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
}

const SERVICES: ServiceItem[] = [
  { id: 'functionalMedicine', category: 'consultas', Icon: Sparkles },
  { id: 'generalMedicine', category: 'consultas', Icon: Stethoscope },
  { id: 'ivTherapy', category: 'procedimientos', Icon: Droplets },
  { id: 'earCleaning', category: 'procedimientos', Icon: Ear },
  { id: 'sutureRemoval', category: 'procedimientos', Icon: Scissors },
  { id: 'implanon', category: 'procedimientos', Icon: Activity },
  { id: 'cauterization', category: 'procedimientos', Icon: ShieldCheck },
  { id: 'minorSurgery', category: 'procedimientos', Icon: HeartPulse },
];

const TIME_SLOTS = [
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
];

const BookingModal = () => {
  const { isBookingModalOpen, closeBookingModal } = useModal();
  const { language, t } = useLanguage();
  const { user } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [activeCategory, setActiveCategory] = useState<'consultas' | 'procedimientos'>('consultas');
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceKey | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; phone?: string; submit?: string }>({});
  const [bookingRef, setBookingRef] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill user email/name when available from AuthContext
  useEffect(() => {
    if (user) {
      if (user.email) setEmail(user.email);
      const metaName = user.user_metadata?.full_name || user.user_metadata?.name;
      if (metaName) {
        setFullName((prev) => (prev ? prev : metaName));
      }
    }
  }, [user]);

  // Fetch booked slots whenever selectedDate changes
  useEffect(() => {
    if (!selectedDate) {
      setBookedSlots([]);
      return;
    }

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    setLoadingSlots(true);
    getBookedSlotsForDate(dateStr).then(({ data }) => {
      const booked = data || [];
      setBookedSlots(booked);
      setLoadingSlots(false);
    });
  }, [selectedDate]);

  // Lock body and html scroll completely when modal is open
  useEffect(() => {
    if (isBookingModalOpen) {
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');

      return () => {
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
      };
    }
  }, [isBookingModalOpen]);

  const selectedService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  const resetAll = () => {
    setStep(1);
    setActiveCategory('consultas');
    setSelectedServiceId(null);
    setSelectedDate(undefined);
    setSelectedTime(null);
    setBookedSlots([]);
    setNotes('');
    setErrors({});
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetAll();
    closeBookingModal();
  };

  if (!isBookingModalOpen) return null;

  const filteredServices = SERVICES.filter((item) => item.category === activeCategory);

  const handleSelectService = (id: ServiceKey) => {
    setSelectedServiceId(id);
  };

  const handleCategorySwitch = (category: 'consultas' | 'procedimientos') => {
    setActiveCategory(category);
  };

  const validateStep3 = () => {
    const errs: { fullName?: string; email?: string; phone?: string } = {};
    if (!fullName.trim()) {
      errs.fullName = language === 'es' ? 'Ingresa tu nombre completo' : 'Please enter your full name';
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      errs.email = language === 'es' ? 'Ingresa un correo electrónico válido' : 'Please enter a valid email';
    }
    if (!phone.trim() || phone.trim().length < 7) {
      errs.phone = language === 'es' ? 'Ingresa un número telefónico válido' : 'Please enter a valid phone number';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleConfirmBooking = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    const ref = `OMF-${Math.floor(100000 + Math.random() * 900000)}`;

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    // Verify slot is still available in real-time
    const { data: latestBooked } = await getBookedSlotsForDate(dateStr);
    if (latestBooked && latestBooked.includes(selectedTime)) {
      setIsSubmitting(false);
      setBookedSlots(latestBooked);
      setSelectedTime(null);
      setStep(2);
      alert(
        language === 'es'
          ? 'Este horario acaba de ser reservado por otro paciente. Por favor selecciona otra hora.'
          : 'This time slot was just booked by another patient. Please choose a different time.'
      );
      return;
    }

    const serviceTitle = t.booking.services[selectedService.id]?.title || selectedService.id;

    const { error } = await createAppointment({
      user_id: user?.id || null,
      booking_ref: ref,
      service_id: selectedService.id,
      service_name: serviceTitle,
      category: activeCategory,
      appointment_date: dateStr,
      appointment_time: selectedTime,
      patient_name: fullName.trim(),
      patient_email: email.trim(),
      patient_phone: phone.trim(),
      notes: notes.trim() || null,
      status: 'confirmed',
    });

    setIsSubmitting(false);

    if (error) {
      console.error('Error creating appointment in database:', error);
    }

    setBookingRef(ref);
    setStep(4);
  };

  const formattedDate = selectedDate
    ? (() => {
        const str = selectedDate.toLocaleDateString(t.booking.locale, {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        });
        return str.charAt(0).toUpperCase() + str.slice(1);
      })()
    : '';

  const serviceData = t.booking.services[selectedService.id];

  return (
    <div
      className={styles.overlay}
      onWheel={(e) => {
        if (e.target === e.currentTarget) e.preventDefault();
      }}
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) e.preventDefault();
      }}
    >
      <div
        className={`${styles.modal} ${step === 4 ? styles.modalSuccess : ''}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Top bar with back button & close button */}
        <div className={styles.topBar}>
          {step < 4 ? (
            <button
              type="button"
              className={styles.backBtn}
              onClick={() => {
                if (step > 1) {
                  setStep((prev) => ((prev - 1) as 1 | 2 | 3));
                } else {
                  handleClose();
                }
              }}
              aria-label="Volver"
            >
              <BackIcon size={20} />
            </button>
          ) : (
            <div className={styles.placeholderBack} />
          )}

          <span className={styles.topBarBrand}>{t.booking.modalTitle}</span>

          <button
            type="button"
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* ================= STEP 1: SELECT SERVICE ================= */}
        {step === 1 && (
          <div className={styles.stepContent}>
            <div className={styles.stepHeader}>
              <h2 className={styles.title}>{t.booking.serviceTitle}</h2>
            </div>

            {/* 2-Category Segmented Filter: Consulta Médica | Procedimientos */}
            <div className={styles.segmentedFilter}>
              <button
                type="button"
                className={`${styles.segmentedBtn} ${activeCategory === 'consultas' ? styles.segmentedBtnActive : ''}`}
                onClick={() => handleCategorySwitch('consultas')}
              >
                <span>{t.booking.categoryConsultations}</span>
              </button>
              <button
                type="button"
                className={`${styles.segmentedBtn} ${activeCategory === 'procedimientos' ? styles.segmentedBtnActive : ''}`}
                onClick={() => handleCategorySwitch('procedimientos')}
              >
                <span>{t.booking.categoryProcedures}</span>
              </button>
            </div>

            {/* Services Grid */}
            <div className={styles.servicesGrid}>
              {filteredServices.map((service) => {
                const info = t.booking.services[service.id];
                const isSelected = selectedServiceId === service.id;
                const ServiceIcon = service.Icon;

                return (
                  <div
                    key={service.id}
                    className={`${styles.serviceCard} ${isSelected ? styles.serviceCardSelected : ''}`}
                    onClick={() => handleSelectService(service.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectService(service.id);
                      }
                    }}
                  >
                    <div className={styles.serviceHeader}>
                      <div className={styles.serviceIconWrap}>
                        <ServiceIcon size={22} strokeWidth={2} />
                      </div>
                      <div className={styles.serviceCheckWrap}>
                        <div className={`${styles.checkCircle} ${isSelected ? styles.checkCircleActive : ''}`}>
                          {isSelected && <Check size={14} strokeWidth={3} />}
                        </div>
                      </div>
                    </div>

                    <h3 className={styles.serviceTitle}>{info.title}</h3>
                    <p className={styles.serviceDesc}>{info.desc}</p>

                    <div className={styles.serviceBadges}>
                      <span className={styles.durationBadge}>
                        <Clock size={13} />
                        {info.duration}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Action */}
            <div className={styles.stepFooter}>
              <button
                type="button"
                className={styles.primaryBtn}
                disabled={!selectedServiceId}
                onClick={() => setStep(2)}
              >
                {t.booking.btnNext}
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: SELECT DATE & TIME ================= */}
        {step === 2 && (
          <div className={styles.stepContent}>
            <div className={styles.stepHeader}>
              <h2 className={styles.title}>{t.booking.dateTimeTitle}</h2>
            </div>

            {/* Selected Service Recap Banner */}
            <div className={styles.selectedServiceBanner}>
              <div className={styles.bannerIcon}>
                <selectedService.Icon size={18} />
              </div>
              <div className={styles.bannerInfo}>
                <strong className={styles.bannerTitle}>{serviceData.title}</strong>
                <span className={styles.bannerDuration}>{serviceData.duration}</span>
              </div>
              <button
                type="button"
                className={styles.changeServiceBtn}
                onClick={() => setStep(1)}
              >
                {language === 'es' ? 'Cambiar' : 'Change'}
              </button>
            </div>

            {/* Calendar & Time Slots Split View */}
            <div className={styles.dateTimeLayout}>
              {/* Calendar Column */}
              <div className={styles.calendarCol}>
                <span className={styles.sectionLabel}>
                  {t.booking.selectDate}
                </span>
                <div className={styles.calendarWrapper}>
                  <Calendar
                    mode="single"
                    required
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (date) {
                        setSelectedDate(date);
                        setSelectedTime(null);
                      }
                    }}
                    locale={language === 'es' ? es : enUS}
                    disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
                  />
                </div>
              </div>

              {/* Time Slots Column */}
              <div className={styles.timeSlotsCol}>
                <span className={styles.sectionLabel}>
                  {t.booking.selectTime}
                </span>

                {loadingSlots ? (
                  <div className={styles.loadingSlotsNotice}>
                    <span>{language === 'es' ? 'Consultando disponibilidad...' : 'Checking availability...'}</span>
                  </div>
                ) : selectedDate && TIME_SLOTS.filter((time) => !bookedSlots.includes(time)).length === 0 ? (
                  <div className={styles.noSlotsNotice}>
                    <span>
                      {language === 'es'
                        ? 'No hay horarios disponibles para esta fecha. Por favor selecciona otro día.'
                        : 'No available times for this date. Please select another day.'}
                    </span>
                  </div>
                ) : (
                  <div className={styles.timeSlotsGrid}>
                    {TIME_SLOTS.filter((time) => !selectedDate || !bookedSlots.includes(time)).map((time) => {
                      const isSelectedTime = selectedTime === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          className={`${styles.timeSlotBtn} ${isSelectedTime ? styles.timeSlotActive : ''}`}
                          onClick={() => {
                            if (selectedDate) setSelectedTime(time);
                          }}
                          disabled={!selectedDate}
                        >
                          <span>{time}</span>
                          {isSelectedTime && <Check size={14} strokeWidth={2.5} />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Footer Action */}
            <div className={styles.stepFooter}>
              <button
                type="button"
                className={styles.primaryBtn}
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(3)}
              >
                {t.booking.btnNext}
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: PATIENT DETAILS & CONFIRMATION ================= */}
        {step === 3 && (
          <form onSubmit={handleConfirmBooking} className={styles.stepContent}>
            <div className={styles.step3Layout}>
              {/* Summary Card */}
              <div className={styles.summaryCard}>
                <div className={styles.summaryCardHeader}>
                  <div className={styles.summaryIconWrap}>
                    <selectedService.Icon size={20} />
                  </div>
                  <div>
                    <h4 className={styles.summaryTitle}>{serviceData.title}</h4>
                  </div>
                </div>

                <div className={styles.summaryDetailsList}>
                  <div className={styles.summaryRow}>
                    <CalendarIcon size={16} className={styles.rowIcon} />
                    <div>
                      <span className={styles.rowLabel}>{t.booking.dateTimeLabel}</span>
                      <strong className={styles.rowValue}>{formattedDate} · {selectedTime}</strong>
                    </div>
                  </div>

                  <div className={styles.summaryRow}>
                    <Clock size={16} className={styles.rowIcon} />
                    <div>
                      <span className={styles.rowLabel}>{language === 'es' ? 'Duración estimada' : 'Estimated Duration'}</span>
                      <strong className={styles.rowValue}>{serviceData.duration}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient Form Fields */}
              <div className={styles.formFields}>
                <div className={styles.inputGroup}>
                  <label htmlFor="fullName" className={styles.inputLabel}>
                    <UserIcon size={15} />
                    <span>{t.booking.fullName} *</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
                    placeholder={t.booking.fullNamePlaceholder}
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                    }}
                  />
                  {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="bookingEmail" className={styles.inputLabel}>
                    <Mail size={15} />
                    <span>{t.booking.email} *</span>
                  </label>
                  <input
                    id="bookingEmail"
                    type="email"
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    placeholder={t.booking.emailPlaceholder}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                  />
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="bookingPhone" className={styles.inputLabel}>
                    <Phone size={15} />
                    <span>{t.booking.phone} *</span>
                  </label>
                  <input
                    id="bookingPhone"
                    type="tel"
                    className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                    placeholder={t.booking.phonePlaceholder}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                  />
                  {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="bookingNotes" className={styles.inputLabel}>
                    <FileText size={15} />
                    <span>{t.booking.notes}</span>
                  </label>
                  <textarea
                    id="bookingNotes"
                    rows={3}
                    className={styles.textarea}
                    placeholder={t.booking.notesPlaceholder}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className={styles.stepFooter}>
              <button
                type="submit"
                className={`${styles.primaryBtn} ${styles.confirmBtn}`}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? (language === 'es' ? 'Guardando Cita...' : 'Saving Appointment...')
                  : t.booking.btnConfirm}
              </button>
            </div>
          </form>
        )}

        {/* ================= STEP 4: SUCCESS CONFIRMATION ================= */}
        {step === 4 && (
          <div className={`${styles.stepContent} ${styles.successContent}`}>
            <div className={styles.successIconBadge}>
              <CheckCircle2 size={46} className={styles.successCheckIcon} />
            </div>

            <h2 className={styles.successTitle}>{t.booking.successTitle}</h2>

            <div className={styles.successTicket}>
              <div className={styles.ticketHeader}>
                <span className={styles.ticketRefLabel}>
                  {language === 'es' ? 'Referencia de Cita' : 'Booking Reference'}
                </span>
                <span className={styles.ticketRefId}>#{bookingRef}</span>
              </div>

              <div className={styles.ticketBody}>
                <div className={styles.ticketItem}>
                  <span className={styles.ticketLabel}>{t.booking.serviceLabel}</span>
                  <strong className={styles.ticketValue}>{serviceData.title}</strong>
                </div>

                <div className={styles.ticketItem}>
                  <span className={styles.ticketLabel}>{t.booking.dateTimeLabel}</span>
                  <strong className={styles.ticketValue}>{formattedDate} · {selectedTime}</strong>
                </div>

                <div className={styles.ticketItem}>
                  <span className={styles.ticketLabel}>{t.booking.patientLabel}</span>
                  <strong className={styles.ticketValue}>{fullName}</strong>
                </div>
              </div>
            </div>

            <div className={styles.successActions}>
              <button
                type="button"
                className={styles.primaryBtn}
                onClick={handleClose}
              >
                {language === 'es' ? 'Finalizar' : 'Finish'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
