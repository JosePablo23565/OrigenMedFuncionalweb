import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { CLINIC_CONFIG } from '../../config/clinic';
import logo from '../../assets/logo.png';
import styles from './footer.module.css';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const handleNavAnchor = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (window.location.pathname !== '/') {
      e.preventDefault();
      window.history.pushState({}, '', '/' + targetId);
      window.dispatchEvent(new PopStateEvent('popstate'));
      setTimeout(() => {
        const el = document.querySelector(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* 1. Marca y Propuesta */}
          <div className={styles.brand}>
            <a
              href="/#inicio"
              onClick={(e) => handleNavAnchor(e, '#inicio')}
              className={styles.logoLink}
              aria-label="Origen Medicina Funcional"
            >
              <img src={logo} alt="Origen Med Funcional" className={styles.logoImg} />
            </a>
            <div className={styles.locationBadge}>
              <span>Guayabo, Guanacaste, Costa Rica</span>
            </div>
          </div>

          {/* 2. Navegación Principal */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>{t.footer.navTitle}</h4>
            <nav className={styles.links} aria-label="Navegación del pie de página">
              <a
                href="/#inicio"
                onClick={(e) => handleNavAnchor(e, '#inicio')}
                className={styles.link}
              >
                {t.nav.inicio}
              </a>
              <a
                href="/#servicios"
                onClick={(e) => handleNavAnchor(e, '#servicios')}
                className={styles.link}
              >
                {t.nav.servicios}
              </a>
              <a
                href="/#equipo"
                onClick={(e) => handleNavAnchor(e, '#equipo')}
                className={styles.link}
              >
                {t.nav.nuestroEquipo}
              </a>
              <a
                href="/#ubicacion"
                onClick={(e) => handleNavAnchor(e, '#ubicacion')}
                className={styles.link}
              >
                {t.nav.ubicacion}
              </a>
              <a
                href="/#faq"
                onClick={(e) => handleNavAnchor(e, '#faq')}
                className={styles.link}
              >
                {t.footer.faq}
              </a>
            </nav>
          </div>

          {/* 3. Contacto y Horarios */}
          <div className={`${styles.col} ${styles.contactCol}`}>
            <h4 className={styles.colTitle}>{t.footer.contactTitle}</h4>
            <div className={styles.contactList}>
              <a
                href={CLINIC_CONFIG.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactItem}
                title="WhatsApp / Teléfono"
              >
                <span>{CLINIC_CONFIG.phone.display}</span>
              </a>
              <a
                href={`mailto:${CLINIC_CONFIG.email}`}
                className={styles.contactItem}
                title="Correo electrónico"
              >
                <span>{CLINIC_CONFIG.email}</span>
              </a>
              <div className={styles.hoursItem}>
                <span className={styles.hoursText}>{t.footer.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Cierre: Copyright y Enlaces Legales */}
        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} Origen Med Funcional. {t.footer.rights}
          </p>
          <div className={styles.legalLinks}>
            <a href="#terminos" className={styles.legalLink}>
              {t.footer.terms}
            </a>
            <span className={styles.legalDot} aria-hidden="true">·</span>
            <a href="#privacidad" className={styles.legalLink}>
              {t.footer.privacy}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
