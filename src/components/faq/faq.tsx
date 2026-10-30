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
        <div className={`${styles.header} reveal-on-scroll`}>
          <h2 className={styles.title}>
            {t.faq.title}
          </h2>
        </div>

        <div className={styles.list}>
          {faqKeys.map((key, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={key}
                className={`${styles.item} reveal-on-scroll ${i === 1 ? 'reveal-delay-1' : ''}`}
              >
                <button
                  type="button"
                  className={styles.question}
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span>{t.faq[`${key}Question` as keyof typeof t.faq]}</span>
                  <span className={`${styles.arrowIconWrap} ${isOpen ? styles.arrowOpen : ''}`} aria-hidden="true">
                    +
                  </span>
                </button>

                <div className={`${styles.answerWrapper} ${isOpen ? styles.answerWrapperOpen : ''}`}>
                  <div className={styles.answerInner}>
                    <p className={styles.answerContent}>
                      {t.faq[`${key}Answer` as keyof typeof t.faq]}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
