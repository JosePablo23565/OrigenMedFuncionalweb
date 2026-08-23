import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import logo from '../../assets/logo.png';
import mobileLogo from '../../assets/mobilelogo.png';
import styles from './navbar.module.css';

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [serviciosAbierto, setServiciosAbierto] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const servicios = [
    { label: t.footer.service1, href: '#servicios' },
    { label: t.footer.service2, href: '#servicios' },
    { label: t.footer.service3, href: '#servicios' },
  ];

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        {/* Hamburguesa */}
        <button
          className={`${styles.hamburger} ${menuAbierto ? styles.open : ''}`}
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Menú"
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>

        {/* Logo */}
        <div className={styles.logo}>
          <img src={logo} alt="Origen Med Funcional" className={styles.logoImg} />
        </div>

        {/* ES/EN + Agendar */}
        <div className={styles.actions}>
          <div className={styles.idioma}>
            <button
              className={`${styles.idiomaBtn} ${language === 'es' ? styles.active : ''}`}
              onClick={() => setLanguage('es')}
            >
              ES
            </button>
            <span className={styles.separador}>/</span>
            <button
              className={`${styles.idiomaBtn} ${language === 'en' ? styles.active : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
          </div>

          <a href="#cita" className={styles.agendar}>
            {t.nav.agendar}
          </a>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`${styles.overlay} ${menuAbierto ? styles.active : ''}`}
        onClick={() => setMenuAbierto(false)}
      />

      {/* Panel lateral */}
      <aside className={`${styles.sidePanel} ${menuAbierto ? styles.active : ''}`}>
        {/* Header del panel */}
        <div className={styles.sidePanelHeader}>
          <a href="#inicio" className={styles.sideLogo} onClick={() => setMenuAbierto(false)}>
            <img src={mobileLogo} alt="Origen Med Funcional" />
          </a>
          <button
            className={styles.panelClose}
            onClick={() => setMenuAbierto(false)}
            aria-label="Cerrar menú"
          >
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Navegación */}
        <nav className={styles.sideNav}>
          <a href="#inicio" onClick={() => setMenuAbierto(false)} className={`${styles.sideNavLink} ${styles.activeLink}`}>
            {t.nav.inicio}
          </a>

          {/* Servicios (acordeón) */}
          <div className={`${styles.menuGroup} ${serviciosAbierto ? styles.groupOpen : ''}`}>
            <button
              className={styles.menuGroupTitle}
              onClick={() => setServiciosAbierto(!serviciosAbierto)}
            >
              <span className={styles.menuGroupLabel}>
                {t.footer.servicesTitle}
                <em>{servicios.length}</em>
              </span>
              <svg
                className={styles.menuArrow}
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3.5 5.25L7 8.75L10.5 5.25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className={styles.menuGroupItems}>
              <div className={styles.menuGroupItemsInner}>
                {servicios.map((item, i) => (
                  <a key={i} href={item.href} onClick={() => setMenuAbierto(false)}>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.menuDivider} />

          <a href="#ubicacion" onClick={() => setMenuAbierto(false)} className={styles.sideNavLink}>
            {t.nav.ubicacion}
          </a>

          <a href="#cita" onClick={() => setMenuAbierto(false)} className={styles.sideNavCta}>
            {t.nav.agendarCita}
          </a>
        </nav>
      </aside>
    </header>
  );
};

export default Navbar;
