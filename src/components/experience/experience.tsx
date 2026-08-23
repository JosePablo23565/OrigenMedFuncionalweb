import { useLanguage } from '../../i18n/LanguageContext';
import styles from './experience.module.css';

const steps = [
  { num: '01', key: 'step1' },
  { num: '02', key: 'step2' },
  { num: '03', key: 'step3' },
  { num: '04', key: 'step4' },
  { num: '05', key: 'step5' },
];

const Experience = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.experience}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t.experience.title}</h2>
        <div className={styles.grid}>
          {steps.map((step) => (
            <div key={step.num} className={styles.card}>
              <span className={styles.num}>{step.num}</span>
              <h3 className={styles.cardTitle}>
                {t.experience[`${step.key}Title` as keyof typeof t.experience]}
              </h3>
              <p className={styles.cardText}>
                {t.experience[`${step.key}Text` as keyof typeof t.experience]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
