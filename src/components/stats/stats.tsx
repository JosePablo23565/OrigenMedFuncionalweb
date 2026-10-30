import { useLanguage } from '../../i18n/LanguageContext';
import { useModal } from '../../context/ModalContext';
import { useAuth } from '../../context/AuthContext';
import styles from './stats.module.css';

const Stats = () => {
  const { t } = useLanguage();
  const { openModal, openBookingModal } = useModal();
  const { user } = useAuth();

  const handleCtaClick = () => {
    if (user) {
      openBookingModal();
    } else {
      openModal('signup');
    }
  };

  return (
    <section className={styles.stats}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={`${styles.title} reveal-on-scroll reveal-delay-1`}>
            {t.stats.title}
          </h2>

          <p className={`${styles.subtitle} reveal-on-scroll reveal-delay-2`}>
            {t.stats.subtitle}
          </p>

          <button
            type="button"
            onClick={handleCtaClick}
            className={`${styles.cta} reveal-on-scroll reveal-delay-3`}
          >
            {t.stats.cta}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Stats;
