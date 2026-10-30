import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useModal } from '../../context/ModalContext';
import { useAuth } from '../../context/AuthContext';
import { getUserAppointments } from '../../lib/appointments';
import styles from './SidePanel.module.css';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  mobileLogo?: string;
}

const UserProfileIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" />
  </svg>
);

const SidePanel = ({ isOpen, onClose }: SidePanelProps) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isProceduresOpen, setIsProceduresOpen] = useState(false);
  const [appointmentsCount, setAppointmentsCount] = useState<number>(0);

  const { t, language, setLanguage } = useLanguage();
  const { openModal, openBookingModal } = useModal();
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (isOpen && user) {
      getUserAppointments(user.id, user.email).then(({ data }) => {
        setAppointmentsCount(data ? data.length : 0);
      });
    }
  }, [isOpen, user]);

  // Servicios principales dentro de "Servicios" (Sentence case en español, Title Case en inglés)
  const serviciosDirectos = [
    {
      label: language === 'en' ? 'Functional Medicine' : 'Medicina funcional',
      href: '#servicios',
    },
    {
      label: language === 'en' ? 'Metabolic & Hormonal Health' : 'Salud metabólica y hormonal',
      href: '#servicios',
    },
    {
      label: language === 'en' ? 'Lifestyle Medicine' : 'Medicina del estilo de vida',
      href: '#servicios',
    },
    {
      label: language === 'en' ? 'Intravenous Therapy' : 'Terapia intravenosa',
      href: '#servicios',
    },
    {
      label: language === 'en' ? "Driver's License Medical Exam" : 'Dictamen de licencia',
      href: '#servicios',
    },
  ];

  // Procedimientos anidados dentro del sub-acordeón
  const procedimientosList = [
    {
      label: language === 'en' ? 'Minor Surgery' : 'Cirugía menor',
      href: '#servicios',
    },
    {
      label: language === 'en' ? 'Implanon Insertion & Removal' : 'Colocación y retiro de Implanon',
      href: '#servicios',
    },
    {
      label: language === 'en' ? 'Cauterization' : 'Cauterización',
      href: '#servicios',
    },
    {
      label: language === 'en' ? 'Suture Removal' : 'Retiro de puntos',
      href: '#servicios',
    },
    {
      label: language === 'en' ? 'Onychoplasty' : 'Onicoplastia',
      href: '#servicios',
    },
  ];

  const getDisplayName = () => {
    if (user?.user_metadata?.full_name) return user.user_metadata.full_name;
    if (user?.user_metadata?.name) return user.user_metadata.name;
    if (user?.email) {
      const namePart = user.email.split('@')[0];
      return namePart.charAt(0).toUpperCase() + namePart.slice(1);
    }
    return 'Paciente';
  };

  const getGreeting = () => {
    try {
      const crFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Costa_Rica',
        hour: 'numeric',
        hour12: false,
      });
      const hour = parseInt(crFormatter.format(new Date()), 10);

      if (language === 'en') {
        if (hour >= 5 && hour < 12) return 'good morning';
        if (hour >= 12 && hour < 19) return 'good afternoon';
        return 'good evening';
      } else {
        if (hour >= 5 && hour < 12) return 'buenos días';
        if (hour >= 12 && hour < 19) return 'buenas tardes';
        return 'buenas noches';
      }
    } catch {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) return language === 'en' ? 'good morning' : 'buenos días';
      if (hour >= 12 && hour < 19) return language === 'en' ? 'good afternoon' : 'buenas tardes';
      return language === 'en' ? 'good evening' : 'buenas noches';
    }
  };

  const handleNavAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (window.location.pathname !== '/' && href.startsWith('#')) {
      e.preventDefault();
      window.history.pushState({}, '', '/' + href);
      window.dispatchEvent(new PopStateEvent('popstate'));
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    onClose();
  };

  return (
    <aside className={`${styles.sidePanel} ${isOpen ? styles.active : ''}`}>
      {/* Header del panel (Perfil / Cuenta) */}
      <div className={styles.sidePanelHeader}>
        <div className={styles.profileRow}>
          {/* Avatar con ícono SVG */}
          <div className={styles.avatarWrap}>
            <div className={styles.avatarLogo}>
              <UserProfileIcon className={styles.userIconSvg} />
            </div>
          </div>

          {/* Información: Saludo según horario de Costa Rica y Subtítulo */}
          <div className={styles.profileInfo}>
            <span className={styles.profileName}>
              {language === 'en'
                ? `Hello, ${getGreeting()}`
                : `Hola, ${getGreeting()}`}
            </span>
            <span className={styles.profileSub}>
              {user
                ? (user.email || getDisplayName())
                : (language === 'en' ? 'My Account' : 'Mi Cuenta')}
            </span>
          </div>

          {/* Botón cerrar */}
          <button
            type="button"
            className={styles.panelClose}
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Navegación organizada por orden jerárquico UX/UI */}
      <nav className={styles.sideNav}>
        <div className={styles.navSection}>
          {/* 1. Inicio */}
          <a
            href="/#inicio"
            onClick={(e) => handleNavAnchor(e, '#inicio')}
            className={`${styles.sideNavLink} ${window.location.pathname === '/' ? styles.activeLink : ''}`}
          >
            {t.nav.inicio}
          </a>

          {/* Mis Citas (si está autenticado) */}
          {user && (
            <a
              href="/mis-citas"
              onClick={(e) => {
                e.preventDefault();
                if (window.location.pathname !== '/mis-citas') {
                  window.history.pushState({}, '', '/mis-citas');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }
                onClose();
              }}
              className={`${styles.sideNavLink} ${window.location.pathname.startsWith('/mis-citas') ? styles.activeLink : ''}`}
            >
              <span>{language === 'en' ? 'My Appointments' : 'Mis Citas'}</span>
              {appointmentsCount > 0 && (
                <span className={styles.appointmentBadge}>{appointmentsCount}</span>
              )}
            </a>
          )}

          {/* 2. Acordeón Principal: Servicios */}
          <div className={`${styles.menuGroup} ${isServicesOpen ? styles.groupOpen : ''}`}>
            <button
              type="button"
              className={styles.menuGroupTitle}
              onClick={() => setIsServicesOpen((prev) => !prev)}
              aria-expanded={isServicesOpen}
            >
              <span className={styles.navLabel}>{t.nav.servicios}</span>
              <ChevronRight size={16} className={styles.menuArrow} />
            </button>

            <div className={styles.menuGroupItems}>
              <div className={styles.menuGroupItemsInner}>
                {/* Servicios directos */}
                {serviciosDirectos.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    onClick={(e) => handleNavAnchor(e, item.href)}
                    className={styles.menuGroupItem}
                  >
                    {item.label}
                  </a>
                ))}

                {/* Sub-acordeón: Procedimientos */}
                <div className={`${styles.subMenuGroup} ${isProceduresOpen ? styles.subGroupOpen : ''}`}>
                  <button
                    type="button"
                    className={styles.subMenuGroupTitle}
                    onClick={() => setIsProceduresOpen((prev) => !prev)}
                    aria-expanded={isProceduresOpen}
                  >
                    <span>{language === 'en' ? 'Procedures' : 'Procedimientos'}</span>
                    <ChevronRight size={15} className={styles.subChevron} />
                  </button>

                  <div className={styles.subMenuGroupItems}>
                    <div className={styles.subMenuGroupItemsInner}>
                      {procedimientosList.map((item, i) => (
                        <a
                          key={i}
                          href={item.href}
                          onClick={(e) => handleNavAnchor(e, item.href)}
                          className={styles.subMenuItem}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Nuestro Equipo */}
          <a
            href="/#equipo"
            onClick={(e) => handleNavAnchor(e, '#equipo')}
            className={styles.sideNavLink}
          >
            {t.nav.nuestroEquipo}
          </a>

          {/* 4. Ubicación */}
          <a
            href="/#ubicacion"
            onClick={(e) => handleNavAnchor(e, '#ubicacion')}
            className={styles.sideNavLink}
          >
            {t.nav.ubicacion}
          </a>
        </div>

        {/* Zona de Acción Principal (Agendar Cita, Cerrar/Iniciar Sesión e Idioma) */}
        <div className={styles.mainCtaSection}>
          {user ? (
            <>
              <button
                type="button"
                onClick={() => {
                  openBookingModal();
                  onClose();
                }}
                className={styles.sideNavCta}
              >
                {t.nav.agendarCita}
              </button>

              <button
                type="button"
                onClick={async () => {
                  await signOut();
                  onClose();
                }}
                className={styles.signOutActionBtn}
              >
                {language === 'en' ? 'Log Out' : 'Cerrar sesión'}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  openModal();
                  onClose();
                }}
                className={styles.authActionBtn}
              >
                {language === 'en' ? 'Log In / Sign Up' : 'Iniciar Sesión / Registro'}
              </button>

              <button
                type="button"
                onClick={() => {
                  openModal('signup');
                  onClose();
                }}
                className={styles.sideNavCta}
              >
                {t.nav.agendarCita}
              </button>
            </>
          )}

          {/* Selector de idioma ES / EN ultra discreto */}
          <div className={styles.languageMinimal}>
            <button
              type="button"
              className={`${styles.langBtnMinimal} ${language === 'es' ? styles.langActiveMinimal : ''}`}
              onClick={() => setLanguage('es')}
              aria-label="Cambiar a Español"
            >
              ES
            </button>
            <span className={styles.langSepMinimal}>/</span>
            <button
              type="button"
              className={`${styles.langBtnMinimal} ${language === 'en' ? styles.langActiveMinimal : ''}`}
              onClick={() => setLanguage('en')}
              aria-label="Switch to English"
            >
              EN
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default SidePanel;
