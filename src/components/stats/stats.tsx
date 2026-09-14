import { useLanguage } from '../../i18n/LanguageContext';
import styles from './stats.module.css';

const Stats = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.stats}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={`${styles.title} reveal-on-scroll`}>{t.stats.title}</h2>
          <p className={`${styles.subtitle} reveal-on-scroll reveal-delay-1`}>{t.stats.subtitle}</p>
          <a href="#cita" className={`${styles.cta} reveal-on-scroll reveal-delay-2`}>
            {t.stats.cta}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Stats;
