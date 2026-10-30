import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { CLINIC_CONFIG } from '../../config/clinic';
import styles from './location.module.css';

const Location: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="ubicacion" className={styles.locationSection}>
      <div className={styles.container}>
        <div className={`${styles.header} reveal-on-scroll`}>
          <h2 className={styles.title}>
            {t.location.title}
          </h2>
        </div>

        <div className={styles.grid}>
          {/* Columna Izquierda: Descripción e Imagen */}
          <div className={`${styles.leftCol} reveal-on-scroll`}>
            <div className={styles.textBlock}>
              <h3 className={styles.clinicName}>{t.location.clinicName}</h3>
              <p className={styles.description}>{t.location.description1}</p>
            </div>

            <div className={styles.imageWrapper}>
              <img
                src="/guayabo-guanacaste.webp"
                alt="Entorno natural de Guayabo, Guanacaste - Sede Origen Medicina Funcional"
                className={styles.clinicImage}
                loading="lazy"
              />
            </div>
          </div>

          {/* Columna Derecha: Lista con líneas 1px y Mapa */}
          <div className={`${styles.rightCol} reveal-on-scroll reveal-delay-1`}>
            <div className={styles.infoList}>
              {/* Ubicación */}
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>{t.location.locationCardTitle}</span>
                <div className={styles.infoContent}>
                  <span className={styles.infoValue}>{t.location.locationCardCity}</span>
                  <span className={styles.infoSub}>{t.location.locationCardAddress}</span>
                </div>
              </div>

              {/* Horario */}
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>{t.location.hoursCardTitle}</span>
                <div className={styles.infoContent}>
                  <span className={styles.infoValue}>{t.location.hoursCardDays}</span>
                  <span className={styles.infoSub}>{t.location.hoursCardTime}</span>
                </div>
              </div>

              {/* Teléfono / WhatsApp */}
              <a
                href={CLINIC_CONFIG.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.infoItem} ${styles.interactiveItem}`}
                title={t.location.whatsappTitle}
              >
                <span className={styles.infoLabel}>{t.location.phoneCardTitle}</span>
                <div className={styles.infoContent}>
                  <span className={styles.infoValue}>{t.location.phoneCardNumber}</span>
                  <span className={styles.infoSub}>{t.location.whatsappLabel}</span>
                </div>
              </a>
            </div>

            {/* Contenedor del Mapa y Enlaces directos */}
            <div className={styles.mapGroup}>
              <div className={styles.mapWrapper}>
                <iframe
                  title="Ubicación Clínica Monserrat - Origen Medicina Funcional"
                  src={CLINIC_CONFIG.maps.embedUrl}
                  className={styles.mapFrame}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              {/* Enlaces estilo texto subrayado limpio, sin flechas */}
              <div className={styles.mapActions}>
                <a
                  href={CLINIC_CONFIG.maps.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapBtn}
                  title="Abrir en Google Maps"
                >
                  {t.location.openMaps}
                </a>
                <a
                  href={CLINIC_CONFIG.maps.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapBtn}
                  title="Abrir en Waze"
                >
                  {t.location.openWaze}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
