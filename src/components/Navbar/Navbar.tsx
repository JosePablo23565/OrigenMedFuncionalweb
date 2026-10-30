import { useState } from 'react';
import logoNav from '../../assets/logo-nav.png';
import mobileLogo from '../../assets/mobilelogo.png';
import SidePanel from './SidePanel';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.container}>
          {/* Logo a la izquierda */}
          <a
            href="/"
            onClick={(e) => {
              if (window.location.pathname !== '/') {
                e.preventDefault();
                window.history.pushState({}, '', '/');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }
            }}
            className={styles.logo}
            aria-label="Ir al inicio"
          >
            <img src={logoNav} alt="Origen Med Funcional" className={styles.logoImg} />
          </a>

          {/* Menú Hamburguesa a la derecha */}
          <button
            className={`${styles.hamburger} ${menuAbierto ? styles.open : ''}`}
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Menú"
            aria-expanded={menuAbierto}
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </div>
      </header>

      {/* Overlay con desenfoque de fondo */}
      <div
        className={`${styles.overlay} ${menuAbierto ? styles.active : ''}`}
        onClick={() => setMenuAbierto(false)}
        aria-hidden="true"
      />

      {/* Panel lateral */}
      <SidePanel
        isOpen={menuAbierto}
        onClose={() => setMenuAbierto(false)}
        mobileLogo={mobileLogo}
      />
    </>
  );
};

export default Navbar;
