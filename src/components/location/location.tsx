import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { CLINIC_CONFIG } from '../../config/clinic';
import styles from './location.module.css';

const Location: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="ubicacion" className={styles.locationSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t.location.title}</h2>
        </div>

        <div className={styles.grid}>
          {/* Columna Izquierda: Descripción e Imagen */}
          <div className={styles.leftCol}>
            <div className={styles.textBlock}>
              <h3 className={styles.clinicName}>{t.location.clinicName}</h3>
              <p className={styles.description}>{t.location.description1}</p>
            </div>

            <div className={styles.imageWrapper}>
              <img
                src="/clinica-monserrat.webp"
                alt="Clínica Monserrat - Sede Origen Medicina Funcional"
                className={styles.clinicImage}
                loading="lazy"
              />
            </div>
          </div>

          {/* Columna Derecha: Datos con Divisores y Mapa */}
          <div className={styles.rightCol}>
            <div className={styles.infoRow}>
              {/* Ubicación */}
              <div className={styles.infoItem}>
                <div className={styles.iconCircle}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3B8595"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className={styles.infoContent}>
                  <span className={styles.infoValue}>{t.location.locationCardCity}</span>
                  <span className={styles.infoSub}>{t.location.locationCardAddress}</span>
                </div>
              </div>

              {/* Horario */}
              <div className={styles.infoItem}>
                <div className={styles.iconCircle}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3B8595"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div className={styles.infoContent}>
                  <span className={styles.infoValue}>{t.location.hoursCardDays}</span>
                  <span className={styles.infoSub}>{t.location.hoursCardTime}</span>
                </div>
              </div>

              {/* Teléfono */}
              <a
                href={CLINIC_CONFIG.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.infoItem} ${styles.interactiveItem}`}
                title={t.location.whatsappTitle}
              >
                <div className={styles.iconCircle}>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: '#3B8595' }}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M34 4C28.4772 4 24 8.47715 24 14V23C24 23.5523 24.4477 24 25 24H34C39.5228 24 44 19.5228 44 14C44 8.47715 39.5228 4 34 4ZM26 14C26 9.58172 29.5817 6 34 6C38.4183 6 42 9.58172 42 14C42 18.4183 38.4183 22 34 22H26V14ZM7 11.7778C7 11.3523 7.35228 11 7.77778 11H14C14.4255 11 14.7778 11.3523 14.7778 11.7778C14.7778 14.1042 15.1496 16.3405 15.8388 18.4298C15.9251 18.7108 15.8609 19.0093 15.6396 19.2307L11.215 23.6552L11.5443 24.3024C14.201 29.5236 18.479 33.7819 23.6951 36.4544L24.3433 36.7865L28.7693 32.3604C28.9802 32.1496 29.2914 32.0836 29.5512 32.1727L29.5619 32.1762C31.654 32.8673 33.9109 33.24 36.2222 33.24C36.6477 33.24 37 33.5923 37 34.0178V40.2222C37 40.6477 36.6477 41 36.2222 41C20.0812 41 7 27.9188 7 11.7778ZM7.77778 9C6.24772 9 5 10.2477 5 11.7778C5 29.0234 18.9766 43 36.2222 43C37.7523 43 39 41.7523 39 40.2222V34.0178C39 32.4877 37.7523 31.24 36.2222 31.24C34.1263 31.24 32.0827 30.9021 30.1939 30.2787C29.2107 29.9442 28.1027 30.1986 27.3551 30.9462L23.9665 34.3349C19.6228 31.9543 16.0291 28.3731 13.6638 24.0349L17.0538 20.6449C17.8265 19.8721 18.0474 18.7865 17.7451 17.8246L17.7429 17.8177L17.7406 17.8108C17.1161 15.9202 16.7778 13.8927 16.7778 11.7778C16.7778 10.2477 15.5301 9 14 9H7.77778ZM29 13H33V9H35V13H39V15H35V19H33V15H29V13Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className={styles.infoContent}>
                  <span className={styles.infoValue}>{t.location.phoneCardNumber}</span>
                  <span className={styles.infoSub}>{t.location.whatsappLabel}</span>
                </div>
              </a>
            </div>

            {/* Contenedor del Mapa y Botones */}
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

              {/* Botones de Navegación Externa */}
              <div className={styles.mapActions}>
                <a
                  href={CLINIC_CONFIG.maps.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapBtn}
                  title="Abrir en Google Maps"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19.527 4.799c1.212 2.608.937 5.678-.405 8.173-1.101 2.047-2.744 3.74-4.098 5.614-.619.858-1.244 1.75-1.669 2.727-.141.325-.263.658-.383.992-.121.333-.224.673-.34 1.008-.109.314-.236.684-.627.687h-.007c-.466-.001-.579-.53-.695-.887-.284-.874-.581-1.713-1.019-2.525-.51-.944-1.145-1.817-1.79-2.671L19.527 4.799zM8.545 7.705l-3.959 4.707c.724 1.54 1.821 2.863 2.871 4.18.247.31.494.622.737.936l4.984-5.925-.029.01c-1.741.601-3.691-.291-4.392-1.987a3.377 3.377 0 0 1-.209-.716c-.063-.437-.077-.761-.004-1.198l.001-.007zM5.492 3.149l-.003.004c-1.947 2.466-2.281 5.88-1.117 8.77l4.785-5.689-.058-.05-3.607-3.035zM14.661.436l-3.838 4.563a.295.295 0 0 1 .027-.01c1.6-.551 3.403.15 4.22 1.626.176.319.323.683.377 1.045.068.446.085.773.012 1.22l-.003.016 3.836-4.561A8.382 8.382 0 0 0 14.67.439l-.009-.003zM9.466 5.868L14.162.285l-.047-.012A8.31 8.31 0 0 0 11.986 0a8.439 8.439 0 0 0-6.169 2.766l-.016.018 3.665 3.084z"/>
                  </svg>
                  {t.location.openMaps}
                </a>
                <a
                  href={CLINIC_CONFIG.maps.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.mapBtn} ${styles.wazeBtn}`}
                  title="Abrir en Waze"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.218 0C9.915 0 6.835 1.49 4.723 4.148c-1.515 1.913-2.31 4.272-2.31 6.706v1.739c0 .894-.62 1.738-1.862 1.813-.298.025-.547.224-.547.522-.05.82.82 2.31 2.012 3.502.82.844 1.788 1.515 2.832 2.036a3 3 0 0 0 2.955 3.528 2.966 2.966 0 0 0 2.931-2.385h2.509c.323 1.689 2.086 2.856 3.974 2.21 1.64-.546 2.36-2.409 1.763-3.924a12.84 12.84 0 0 0 1.838-1.465 10.73 10.73 0 0 0 3.18-7.65c0-2.882-1.118-5.589-3.155-7.625A10.899 10.899 0 0 0 13.218 0zm0 1.217c2.558 0 4.967.994 6.78 2.807a9.525 9.525 0 0 1 2.807 6.78A9.526 9.526 0 0 1 20 17.585a9.647 9.647 0 0 1-6.78 2.807h-2.46a3.008 3.008 0 0 0-2.93-2.41 3.03 3.03 0 0 0-2.534 1.367v.024a8.945 8.945 0 0 1-2.41-1.788c-.844-.844-1.316-1.614-1.515-2.11a2.858 2.858 0 0 0 1.441-.846 2.959 2.959 0 0 0 .795-2.036v-1.789c0-2.11.696-4.197 2.012-5.861 1.863-2.385 4.62-3.726 7.6-3.726zm-2.41 5.986a1.192 1.192 0 0 0-1.191 1.192 1.192 1.192 0 0 0 1.192 1.193A1.192 1.192 0 0 0 12 8.395a1.192 1.192 0 0 0-1.192-1.192zm7.204 0a1.192 1.192 0 0 0-1.192 1.192 1.192 1.192 0 0 0 1.192 1.193 1.192 1.192 0 0 0 1.192-1.193 1.192 1.192 0 0 0-1.192-1.192zm-7.377 4.769a.596.596 0 0 0-.546.845 4.813 4.813 0 0 0 4.346 2.757 4.77 4.77 0 0 0 4.347-2.757.596.596 0 0 0-.547-.845h-.025a.561.561 0 0 0-.521.348 3.59 3.59 0 0 1-3.254 2.061 3.591 3.591 0 0 1-3.254-2.061.64.64 0 0 0-.546-.348z"/>
                  </svg>
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
