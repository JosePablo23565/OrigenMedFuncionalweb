import { useLanguage } from '../../i18n/LanguageContext';
import styles from './stats.module.css';

const Stats = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.stats}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.left}>
            <h2 className={styles.title}>{t.stats.title}</h2>
            <p className={styles.subtitle}>{t.stats.subtitle}</p>
            <a href="#cita" className={styles.cta}>
              {t.stats.cta}
            </a>
          </div>
          <div className={styles.right}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>87%</span>
              <p className={styles.statText}>{t.stats.stat1}</p>
            </div>
            <div className={styles.testimonial}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.quote}>"{t.stats.quote}"</p>
              <span className={styles.author}>— {t.stats.author}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
