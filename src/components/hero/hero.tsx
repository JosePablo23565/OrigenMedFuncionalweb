import { useState, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useModal } from '../../context/ModalContext';
import { useAuth } from '../../context/AuthContext';
import styles from './hero.module.css';

interface Slide {
  id: string;
  desktop: string;
  mobile: string;
  alt: string;
  slideModifier?: string;
}

const SLIDES: Slide[] = [
  {
    id: 'origen',
    desktop: '/Hero.webp',
    mobile: '/Hero-mobile-framed.webp',
    alt: 'Medicina funcional, bienestar integral y salud de raíz',
    slideModifier: styles.slideMan,
  },
  {
    id: 'nutricion',
    desktop: '/hero-nutrition.webp',
    mobile: '/hero-nutrition-mobile.webp',
    alt: 'Nutrición funcional, salud metabólica y longevidad',
  },
  {
    id: 'longevidad',
    desktop: '/hero-longevity.webp',
    mobile: '/hero-longevity-mobile.webp',
    alt: 'Longevidad activa, bienestar integral y salud preventiva',
  },
];

const SLIDE_DURATION = 6000;

const Hero = () => {
  const { t } = useLanguage();
  const { openModal, openBookingModal } = useModal();
  const { user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, []);

  const handleCtaClick = () => {
    if (user) {
      openBookingModal();
    } else {
      openModal('signup');
    }
  };

  return (
    <section id="inicio" className={styles.hero}>
      {/* Carrusel de fondos en rotación suave editorial */}
      <div className={styles.heroCarousel}>
        {SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`${styles.slide} ${isActive ? styles.active : ''} ${slide.slideModifier || ''}`}
              aria-hidden={!isActive}
            >
              <picture className={styles.slidePicture}>
                <source media="(max-width: 768px)" srcSet={slide.mobile} type="image/webp" />
                <img
                  src={slide.desktop}
                  alt={slide.alt}
                  className={styles.image}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </picture>
            </div>
          );
        })}

        {/* Velo sutil de viñeta para contraste editorial de alto impacto */}
        <div className={styles.overlay} />
      </div>

      {/* Contenido Principal */}
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.titleLine}>{t.hero.title}</span>
          <span className={styles.accentItalic}>{t.hero.accent}</span>
        </h1>

        <p className={styles.subtitle}>
          {t.hero.subtitle}
        </p>

        <div className={styles.ctaWrapper}>
          <button onClick={handleCtaClick} className={styles.cta}>
            {t.hero.cta1}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
