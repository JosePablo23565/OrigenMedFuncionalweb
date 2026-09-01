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

type GroupKey = 'consultas' | 'procedimientos' | null;

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
  const [openGroup, setOpenGroup] = useState<GroupKey>(null);
  const [appointmentsCount, setAppointmentsCount] = useState<number>(0);
  const { t, language } = useLanguage();
  const { openModal, openBookingModal, openMyAppointments } = useModal();
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (isOpen && user) {
      getUserAppointments(user.id, user.email).then(({ data }) => {
        setAppointmentsCount(data ? data.length : 0);
      });
    }
  }, [isOpen, user]);

  const consultas = [
    { label: t.footer.consulta1, href: '#medicina-general' },
    { label: t.footer.consulta2, href: '#medicina-funcional' },
  ];

  const procedimientos = [
    { label: t.footer.procedimiento1, href: '#lavado-oido' },
    { label: t.footer.procedimiento2, href: '#retiro-puntos' },
    { label: t.footer.procedimiento3, href: '#implanon' },
    { label: t.footer.procedimiento4, href: '#sueroterapia' },
    { label: t.footer.procedimiento5, href: '#cauterizacion' },
    { label: t.footer.procedimiento6, href: '#cirugia-menor' },
  ];

  const toggleGroup = (group: 'consultas' | 'procedimientos') => {
    setOpenGroup((prev) => (prev === group ? null : group));
  };

  const isGroupOpen = (group: 'consultas' | 'procedimientos') => openGroup === group;

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

  return (
    <aside className={`${styles.sidePanel} ${isOpen ? styles.active : ''}`}>
      {/* Header del panel (Perfil / Cuenta) */}
      <div className={styles.sidePanelHeader}>
        <div className={styles.profileRow}>
          {/* Avatar con ícono SVG solicitado */}
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

      {/* Navegación organizada por secciones con espaciado */}
      <nav className={styles.sideNav}>
        {/* Sección 1: General */}
        <div className={styles.navSection}>
          <a href="#inicio" onClick={onClose} className={`${styles.sideNavLink} ${styles.activeLink}`}>
            {t.nav.inicio}
          </a>

          {user && (
            <button
              type="button"
              onClick={() => {
                openMyAppointments();
                onClose();
              }}
              className={styles.sideNavLink}
            >
              <span>{language === 'en' ? 'Mis Citas' : 'Mis Citas'}</span>
              {appointmentsCount > 0 && (
                <span className={styles.appointmentBadge}>{appointmentsCount}</span>
              )}
            </button>
          )}
        </div>

        {/* Espacio entre secciones */}
        <div className={styles.sectionSpacer} />

        {/* Sección 2: Servicios Médicos */}
        <div className={styles.navSection}>
          {/* Consultas Médicas Accordion */}
          <div className={`${styles.menuGroup} ${isGroupOpen('consultas') ? styles.groupOpen : ''}`}>
            <button
              type="button"
              className={styles.menuGroupTitle}
              onClick={() => toggleGroup('consultas')}
              aria-expanded={isGroupOpen('consultas')}
            >
              <span className={styles.navLabel}>{t.footer.consultasTitle}</span>
              <ChevronRight size={16} className={styles.menuArrow} />
            </button>
            <div className={styles.menuGroupItems}>
              <div className={styles.menuGroupItemsInner}>
                {consultas.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    onClick={onClose}
                    className={styles.menuGroupItem}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Procedimientos Médicos Accordion */}
          <div className={`${styles.menuGroup} ${isGroupOpen('procedimientos') ? styles.groupOpen : ''}`}>
            <button
              type="button"
              className={styles.menuGroupTitle}
              onClick={() => toggleGroup('procedimientos')}
              aria-expanded={isGroupOpen('procedimientos')}
            >
              <span className={styles.navLabel}>{t.footer.procedimientosTitle}</span>
              <ChevronRight size={16} className={styles.menuArrow} />
            </button>
            <div className={styles.menuGroupItems}>
              <div className={styles.menuGroupItemsInner}>
                {procedimientos.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    onClick={onClose}
                    className={styles.menuGroupItem}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Espacio entre secciones */}
        <div className={styles.sectionSpacer} />

        {/* Sección 3: Institucional y Ubicación */}
        <div className={styles.navSection}>
          <a href="#equipo" onClick={onClose} className={styles.sideNavLink}>
            {t.nav.nuestroEquipo}
          </a>

          <a href="#ubicacion" onClick={onClose} className={styles.sideNavLink}>
            {t.nav.ubicacion}
          </a>
        </div>

        {/* Zona de Acción Principal (Agendar Cita y Cerrar sesión / Iniciar Sesión) */}
        <div className={styles.mainCtaSection}>
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

          {user ? (
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
          ) : (
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
          )}
        </div>
      </nav>
    </aside>
  );
};

export default SidePanel;