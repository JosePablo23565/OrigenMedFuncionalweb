import { useLanguage } from '../../i18n/LanguageContext';
import styles from './approach.module.css';

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.checkSvg}>
    <path fillRule="evenodd" clipRule="evenodd" d="M24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42ZM24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M34.6709 16.2585C35.0805 16.629 35.1121 17.2614 34.7415 17.6709L21.3858 32.4325L13.3095 24.7234C12.91 24.342 12.8953 23.709 13.2766 23.3095C13.658 22.91 14.291 22.8953 14.6905 23.2767L21.2809 29.5675L33.2585 16.3291C33.629 15.9196 34.2614 15.8879 34.6709 16.2585Z" fill="currentColor"/>
  </svg>
);

const APPROACH_ITEMS = [
  { titleKey: 'item1Title' as const, descKey: 'item1Desc' as const },
  { titleKey: 'item2Title' as const, descKey: 'item2Desc' as const },
  { titleKey: 'item3Title' as const, descKey: 'item3Desc' as const },
  { titleKey: 'item4Title' as const, descKey: 'item4Desc' as const },
];

const Approach = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.approachWrapper}>
      <div className={styles.approachContainer}>
        <div className={styles.approachGrid}>
          {/* Left Column: Title, Paragraph */}
          <div className={styles.approachLeft}>
            <h2 className={styles.approachHeading}>{t.heroBridge.approachTitle}</h2>
            <p className={styles.approachParagraph}>{t.heroBridge.approachP1}</p>
          </div>

          {/* Right Column: 4 Stages with custom Check SVG */}
          <div className={styles.approachRight}>
            {APPROACH_ITEMS.map((item, idx) => (
              <div key={idx} className={styles.approachItem}>
                <div className={styles.checkWrapper}>
                  <CheckIcon />
                </div>
                <div className={styles.itemContent}>
                  <h3 className={styles.itemTitle}>{t.heroBridge[item.titleKey]}</h3>
                  <p className={styles.itemDesc}>{t.heroBridge[item.descKey]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;
