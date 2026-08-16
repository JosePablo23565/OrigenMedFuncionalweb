import { useLanguage } from '../../i18n/LanguageContext';
import styles from './hero.module.css';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>
          {t.hero.title} <span className={styles.accent}>{t.hero.accent}</span>
        </h1>
        <p className={styles.subtitle}>
          {t.hero.subtitle}
        </p>
      </div>
    </section>
  );
};

export default Hero;
