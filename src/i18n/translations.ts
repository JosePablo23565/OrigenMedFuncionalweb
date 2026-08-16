export interface TranslationKeys {
  nav: {
    inicio: string;
    servicios: string;
    ubicacion: string;
    agendar: string;
  };
  hero: {
    title: string;
    accent: string;
    subtitle: string;
  };
}

export const translations: Record<Language, TranslationKeys> = {
  es: {
    nav: {
      inicio: 'Inicio',
      servicios: 'Servicios',
      ubicacion: 'Ubicación',
      agendar: 'Agendar',
    },
    hero: {
      title: 'Origen Med',
      accent: 'Funcional',
      subtitle: 'Medicina natural y alternativa para tu bienestar. Conectamos la sabiduría ancestral con la ciencia moderna.',
    },
  },
  en: {
    nav: {
      inicio: 'Home',
      servicios: 'Services',
      ubicacion: 'Location',
      agendar: 'Book',
    },
    hero: {
      title: 'Origen Med',
      accent: 'Functional',
      subtitle: 'Natural and alternative medicine for your well-being. We connect ancestral wisdom with modern science.',
    },
  },
};

export type Language = 'es' | 'en';
