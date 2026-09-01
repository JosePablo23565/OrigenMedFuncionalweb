import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import logo from '../../assets/logo.png';
import mobileLogo from '../../assets/mobilelogo.png';
import SidePanel from './SidePanel';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { language, setLanguage } = useLanguage();

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

        {/* Selector de idioma ES / EN */}
        <div className={styles.actions}>
          <div className={styles.idioma}>
            <button
              type="button"
              className={`${styles.idiomaBtn} ${language === 'es' ? styles.active : ''}`}
              onClick={() => setLanguage('es')}
            >
              ES
            </button>
            <span className={styles.separador}>/</span>
            <button
              type="button"
              className={`${styles.idiomaBtn} ${language === 'en' ? styles.active : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`${styles.overlay} ${menuAbierto ? styles.active : ''}`}
        onClick={() => setMenuAbierto(false)}
      />

      {/* Panel lateral */}
      <SidePanel
        isOpen={menuAbierto}
        onClose={() => setMenuAbierto(false)}
        mobileLogo={mobileLogo}
      />
    </header>
  );
};

export default Navbar;