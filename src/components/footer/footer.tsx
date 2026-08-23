import { useLanguage } from '../../i18n/LanguageContext';
import styles from './footer.module.css';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <span className={styles.logo}>
              {t.hero.title} <span className={styles.accent}>{t.hero.accent}</span>
            </span>
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

          <div className={styles.links}>
            <h4 className={styles.heading}>{t.footer.contactTitle}</h4>
            <a href="mailto:hola@origenmed.com">hola@origenmed.com</a>
            <a href="tel:+521234567890">+52 123 456 7890</a>
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
