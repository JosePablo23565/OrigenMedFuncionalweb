import { useLanguage } from '../../i18n/LanguageContext';
import { CLINIC_CONFIG } from '../../config/clinic';
import logo from '../../assets/logo.png';
import styles from './footer.module.css';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <a href="#inicio" className={styles.logoLink} aria-label="Origen Inicio">
              <img src={logo} alt="Origen Med Funcional" className={styles.logoImg} />
            </a>
            <p className={styles.tagline}>{t.footer.tagline}</p>
          </div>

          <div className={styles.links}>
            <h4 className={styles.heading}>{t.footer.navTitle}</h4>
            <a href="#inicio">{t.nav.inicio}</a>
            <a href="#servicios">{t.nav.servicios}</a>
            <a href="#ubicacion">{t.nav.ubicacion}</a>
          </div>

          <div className={styles.links}>
            <h4 className={styles.heading}>{t.footer.servicesTitle}</h4>
            <a href="#servicios">{t.footer.service1}</a>
            <a href="#servicios">{t.footer.service2}</a>
            <a href="#servicios">{t.footer.service3}</a>
          </div>

          <div className={`${styles.links} ${styles.contact}`}>
            <h4 className={styles.heading}>{t.footer.contactTitle}</h4>
            <a href={`mailto:${CLINIC_CONFIG.email}`} className={styles.contactLink}>
              {CLINIC_CONFIG.email}
            </a>
            <a
              href={CLINIC_CONFIG.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              {CLINIC_CONFIG.phone.display}
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>© {new Date().getFullYear()} Origen Med Funcional. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
