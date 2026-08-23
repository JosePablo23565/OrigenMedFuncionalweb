import { useLanguage } from '../../i18n/LanguageContext';
import styles from './hero.module.css';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="inicio" className={styles.hero}>
      <img
        src="/Hero.webp"
        alt="Medicina natural y funcional"
        className={styles.image}
        fetchPriority="high"
        loading="eager"
      />
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={styles.titleWrap}>
          <h1 className={styles.title}>
            <span className={`${styles.line} ${styles.lineMedium}`}>{t.hero.title}</span>
            <span className={`${styles.line} ${styles.lineBold}`}>{t.hero.accent}</span>
          </h1>
          <p className={styles.subtitle}>{t.hero.subtitle}</p>
        </div>
        <a href="#cita" className={styles.cta}>{t.hero.cta1}</a>
      </div>
    </section>
  );
};

export default Hero;
