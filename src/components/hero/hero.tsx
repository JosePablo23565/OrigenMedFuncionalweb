import { useLanguage } from '../../i18n/LanguageContext';
import { useModal } from '../../context/ModalContext';
import styles from './hero.module.css';

const Hero = () => {
  const { t } = useLanguage();
  const { openModal } = useModal();

  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.heroImage}>
        <img
          src="/Hero.webp"
          alt="Medicina natural y funcional"
          className={styles.image}
          fetchPriority="high"
          loading="eager"
        />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={`${styles.line} ${styles.lineMedium}`}>{t.hero.title}</span>
          <span className={styles.accentGroup}>
            <span className={`${styles.line} ${styles.lineBold}`}>{t.hero.accent}</span>
            <div className={styles.accentBar}></div>
          </span>
        </h1>
        <p className={styles.subtitle}>{t.hero.subtitle}</p>
        <button onClick={openModal} className={styles.cta}>{t.hero.cta1}</button>
      </div>
    </section>
  );
};

export default Hero;
