import { useLanguage } from '../../i18n/LanguageContext';
import styles from './herobridge.module.css';

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v4" />
        <path d="M10 14h4" />
      </svg>
    ),
    key: 'item1',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M11 8v6" />
        <path d="M8 11h6" />
      </svg>
    ),
    key: 'item2',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6v4H9z" />
        <path d="M7 7l-2 12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2L17 7" />
        <path d="M10 12h4" />
      </svg>
    ),
    key: 'item3',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </svg>
    ),
    key: 'item4',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
        <path d="M3 12h3l2-4 4 8 2-4h3" />
      </svg>
    ),
    key: 'item5',
  },
];

const HeroBridge = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.bridge}>
      <div className={styles.grid}>
        {FEATURES.map((item, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.iconBadge}>{item.icon}</div>
            <p className={styles.cardText}>{t.heroBridge[item.key as keyof typeof t.heroBridge]}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroBridge;
