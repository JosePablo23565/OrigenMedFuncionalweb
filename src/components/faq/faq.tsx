import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import styles from './faq.module.css';

const faqKeys = ['q1', 'q2'];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className={styles.faq}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t.faq.title}</h2>

        <div className={styles.list}>
          {faqKeys.map((key, i) => (
            <div key={key} className={styles.item}>
              <button
                className={styles.question}
                onClick={() => toggle(i)}
              >
                <span>{t.faq[`${key}Question` as keyof typeof t.faq]}</span>
                <svg
                  className={`${styles.arrow} ${openIndex === i ? styles.open : ''}`}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
              {openIndex === i && (
                <div className={styles.answer}>
                  <p>{t.faq[`${key}Answer` as keyof typeof t.faq]}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
