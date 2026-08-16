import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import styles from './navbar.module.css';

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        {/* Hamburguesa (solo móvil) */}
        <button 
          className={`${styles.hamburger} ${menuAbierto ? styles.open : ''}`}
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>

        {/* Logo */}
        <div className={styles.logo}>
          <span className={styles.logoText}>
            {t.hero.title} <span className={styles.funcional}>{t.hero.accent}</span>
          </span>
        </div>

        {/* Menú (escritorio) */}
        <nav className={styles.nav}>
          <a href="#inicio">{t.nav.inicio}</a>
          <a href="#servicios">{t.nav.servicios}</a>
          <a href="#ubicacion">{t.nav.ubicacion}</a>
        </nav>

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

        {/* Menú móvil */}
        <div className={`${styles.mobileNav} ${menuAbierto ? styles.active : ''}`}>
          <a href="#inicio" onClick={() => setMenuAbierto(false)}>{t.nav.inicio}</a>
          <a href="#servicios" onClick={() => setMenuAbierto(false)}>{t.nav.servicios}</a>
          <a href="#ubicacion" onClick={() => setMenuAbierto(false)}>{t.nav.ubicacion}</a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
