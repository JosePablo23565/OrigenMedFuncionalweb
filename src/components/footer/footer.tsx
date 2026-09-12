import { useLanguage } from '../../i18n/LanguageContext';
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
            <a href="mailto:origen.medfuncional@gmail.com" className={styles.contactLink}>origen.medfuncional@gmail.com</a>
            <a
              href="https://wa.me/50688775126"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              +506 8877 5126
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
