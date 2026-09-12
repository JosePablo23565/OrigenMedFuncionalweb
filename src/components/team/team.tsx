import { useLanguage } from '../../i18n/LanguageContext';
import styles from './team.module.css';

const Team = () => {
  const { t } = useLanguage();

  return (
    <section id="equipo" className={styles.teamSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t.team.title}</h2>

        <div className={styles.cardsList}>
          {/* Tarjeta 1: Doctor / Médico (Foto vacía / Placeholder a la izquierda, Info a la derecha) */}
          <div className={`${styles.card} ${styles.cardDoctor}`}>
            <div className={styles.photoCol}></div>

            <div className={styles.infoCol}>
              <h3 className={styles.memberName}>{t.team.card1Name}</h3>
              <p className={styles.memberSpecialty}>{t.team.card1Specialty}</p>
              <button type="button" className={styles.viewProfileLink}>
                <span>{t.team.viewProfile}</span>
                <span className={styles.profileIcon} aria-hidden="true">
                  +
                </span>
              </button>
            </div>
          </div>

          {/* Tarjeta 2: Enfermera (Info a la izquierda, Foto de la enfermera a la derecha) */}
          <div className={`${styles.card} ${styles.cardNurse}`}>
            <div className={styles.infoCol}>
              <h3 className={styles.memberName}>{t.team.card2Name}</h3>
              <p className={styles.memberSpecialty}>{t.team.card2Specialty}</p>
              <button type="button" className={styles.viewProfileLink}>
                <span>{t.team.viewProfile}</span>
                <span className={styles.profileIcon} aria-hidden="true">
                  +
                </span>
              </button>
            </div>

            <div className={styles.photoCol}>
              <img
                src="/team/enfermera.webp"
                alt={t.team.card2Name}
                className={styles.memberImg}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
