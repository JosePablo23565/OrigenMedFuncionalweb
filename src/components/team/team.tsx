import { useLanguage } from '../../i18n/LanguageContext';
import styles from './team.module.css';

const Team = () => {
  const { t } = useLanguage();

  return (
    <section id="equipo" className={styles.teamSection}>
      <div className={styles.container}>
        <div className={`${styles.header} reveal-on-scroll`}>
          <h2 className={styles.title}>
            {t.team.title}
          </h2>
        </div>

        <div className={styles.cardsList}>
          {/* Perfil 1: Doctor */}
          <div className={`${styles.card} reveal-scale`}>
            <div className={styles.photoCol}>
              <div className={styles.doctorPlaceholder} aria-hidden="true">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </div>

            <div className={styles.infoCol}>
              <h3 className={styles.memberName}>{t.team.card1Name}</h3>
              <p className={styles.memberSpecialty}>{t.team.card1Specialty}</p>
            </div>
          </div>

          {/* Perfil 2: Enfermera */}
          <div className={`${styles.card} reveal-scale reveal-delay-2`}>
            <div className={styles.photoCol}>
              <img
                src="/team/enfermera.webp"
                alt={t.team.card2Name}
                className={styles.memberImg}
                loading="lazy"
              />
            </div>

            <div className={styles.infoCol}>
              <h3 className={styles.memberName}>{t.team.card2Name}</h3>
              <p className={styles.memberSpecialty}>{t.team.card2Specialty}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
