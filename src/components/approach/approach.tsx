import { useLanguage } from '../../i18n/LanguageContext';
import styles from './approach.module.css';

const APPROACH_ITEMS = [
  { step: '01', titleKey: 'item1Title' as const, descKey: 'item1Desc' as const },
  { step: '02', titleKey: 'item2Title' as const, descKey: 'item2Desc' as const },
  { step: '03', titleKey: 'item3Title' as const, descKey: 'item3Desc' as const },
  { step: '04', titleKey: 'item4Title' as const, descKey: 'item4Desc' as const },
];

const Approach = () => {
  const { t } = useLanguage();

  return (
    <section id="servicios" className={styles.approachWrapper}>
      <div className={styles.approachContainer}>
        <div className={styles.approachGrid}>
          {/* Columna Izquierda: Encabezado Fijo con Título Original */}
          <div className={`${styles.approachLeft} reveal-on-scroll`}>
            <h2 className={styles.approachHeading}>
              {t.heroBridge.approachTitle}
            </h2>

            <p className={styles.approachParagraph}>
              {t.heroBridge.approachP1}
            </p>
          </div>

          {/* Columna Derecha: Lista Editorial Abierta con líneas de 1px */}
          <div className={styles.approachRight}>
            {APPROACH_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className={`${styles.approachItem} reveal-on-scroll ${
                  idx === 1 ? 'reveal-delay-1' : idx === 2 ? 'reveal-delay-2' : idx === 3 ? 'reveal-delay-3' : ''
                }`}
              >
                <span className={styles.stepNumber} aria-hidden="true">
                  {item.step}
                </span>
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
