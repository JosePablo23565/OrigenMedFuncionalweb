import { useEffect } from 'react';

/**
 * Custom hook to automatically observe all elements with scroll-reveal classes
 * and trigger smooth fade-up / scale / fade animations as they enter the viewport.
 */
export const useScrollReveal = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('IntersectionObserver' in window)) {
      // Fallback for very old browsers: reveal immediately
      document
        .querySelectorAll('.reveal-on-scroll, .reveal-fade, .reveal-scale')
        .forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    };

    const isMobile = window.innerWidth <= 768;
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      // En móvil anticipamos la carga 40px antes de entrar para evitar pantallas en blanco durante scroll con pulgar
      rootMargin: isMobile ? '0px 0px 40px 0px' : '0px 0px -30px 0px',
      threshold: isMobile ? 0.02 : 0.1,
    });

    const observeElements = () => {
      const targets = document.querySelectorAll(
        '.reveal-on-scroll:not(.is-revealed), .reveal-fade:not(.is-revealed), .reveal-scale:not(.is-revealed)'
      );
      targets.forEach((target) => observer.observe(target));
    };

    // Initial observe
    observeElements();

    // Observe any delayed/rendered items
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
};

export default useScrollReveal;
