import { useLanguage } from '../../i18n/LanguageContext';
import styles from './pricing.module.css';

const Pricing = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.pricing}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t.pricing.title}</h2>
        <p className={styles.subtitle}>{t.pricing.subtitle}</p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <span className={styles.badge}>{t.pricing.plan1Badge}</span>
            <h3 className={styles.cardTitle}>{t.pricing.plan1Title}</h3>
            <p className={styles.cardDesc}>{t.pricing.plan1Desc}</p>
            <ul className={styles.list}>
              <li>{t.pricing.plan1Item1}</li>
              <li>{t.pricing.plan1Item2}</li>
              <li>{t.pricing.plan1Item3}</li>
            </ul>
            <a href="#cita" className={styles.cta}>{t.pricing.plan1Cta}</a>
          </div>

          <div className={`${styles.card} ${styles.featured}`}>
            <span className={styles.badge}>{t.pricing.plan2Badge}</span>
            <h3 className={styles.cardTitle}>{t.pricing.plan2Title}</h3>
            <p className={styles.cardDesc}>{t.pricing.plan2Desc}</p>
            <ul className={styles.list}>
              <li>{t.pricing.plan2Item1}</li>
              <li>{t.pricing.plan2Item2}</li>
              <li>{t.pricing.plan2Item3}</li>
            </ul>
            <a href="#cita" className={styles.cta}>{t.pricing.plan2Cta}</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
