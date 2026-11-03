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
              <img
                src="/team/doctor.webp"
                alt={t.team.card1Name}
                className={styles.memberImg}
                loading="lazy"
              />
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
