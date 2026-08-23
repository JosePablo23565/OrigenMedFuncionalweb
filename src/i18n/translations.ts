export interface TranslationKeys {
  nav: {
    inicio: string;
    servicios: string;
    ubicacion: string;
    agendar: string;
    agendarCita: string;
  };
  hero: {
    title: string;
    accent: string;
    subtitle: string;
    cta1: string;
  };
  highlights: {
    item1: string;
    item2: string;
    item3: string;
  };
  heroBridge: {
    item1: string;
    item2: string;
    item3: string;
    item4: string;
    item5: string;
  };
  stats: {
    title: string;
    subtitle: string;
    cta: string;
    stat1: string;
    quote: string;
    author: string;
  };
  experience: {
    title: string;
    step1Title: string;
    step1Text: string;
    step2Title: string;
    step2Text: string;
    step3Title: string;
    step3Text: string;
    step4Title: string;
    step4Text: string;
    step5Title: string;
    step5Text: string;
  };
  conditions: {
    title: string;
    subtitle: string;
    cta: string;
    gutTitle: string;
    gutText: string;
    hormonesTitle: string;
    hormonesText: string;
    autoimmuneTitle: string;
    autoimmuneText: string;
    metabolicTitle: string;
    metabolicText: string;
    mentalTitle: string;
    mentalText: string;
    heartTitle: string;
    heartText: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    plan1Badge: string;
    plan1Title: string;
    plan1Desc: string;
    plan1Item1: string;
    plan1Item2: string;
    plan1Item3: string;
    plan1Cta: string;
    plan2Badge: string;
    plan2Title: string;
    plan2Desc: string;
    plan2Item1: string;
    plan2Item2: string;
    plan2Item3: string;
    plan2Cta: string;
  };
  faq: {
    title: string;
    q1Question: string;
    q1Answer: string;
    q2Question: string;
    q2Answer: string;
    q3Question: string;
    q3Answer: string;
    q4Question: string;
    q4Answer: string;
    q5Question: string;
    q5Answer: string;
  };
  footer: {
    tagline: string;
    navTitle: string;
    servicesTitle: string;
    service1: string;
    service2: string;
    service3: string;
    contactTitle: string;
    rights: string;
  };
}

export const translations: Record<Language, TranslationKeys> = {
  es: {
    nav: {
      inicio: 'Inicio',
      servicios: 'Servicios',
      ubicacion: 'Ubicación',
      agendar: 'Agendar',
      agendarCita: 'Agendar una cita',
    },
    hero: {
      title: 'Medicina',
      accent: 'Funcional',
      subtitle: 'Un enfoque diferente para entender la salud.',
      cta1: 'Agendar Cita',
    },
    highlights: {
      item1: 'Atención Personalizada',
      item2: 'Basado en Evidencia',
      item3: 'Enfoque Integral',
    },
    heroBridge: {
      item1: 'Atención 100% Personalizada',
      item2: 'Medicina de Causa Raíz',
      item3: 'Estudios de Laboratorio Avanzados',
      item4: 'Consultas Presenciales y Online',
      item5: 'Enfoque Integral y Preventivo',
    },
    stats: {
      title: 'Cuidado médico que entrega resultados',
      subtitle: 'Colabora con un experto en medicina funcional para descubrir la causa raíz de tus síntomas y finalmente sentirte mejor.',
      cta: 'Comenzar Ahora',
      stat1: 'de nuestros pacientes mejoran o eliminan sus síntomas en el primer año',
      quote: 'Llevaba años buscando respuestas. Origen Med Funcional me dio un plan claro y por fin me siento como yo misma.',
      author: 'María G.',
    },
    experience: {
      title: 'Tu Experiencia con Origen Med',
      step1Title: 'Agenda tu Consulta',
      step1Text: 'Reserva tu primera cita online o presencial en minutos.',
      step2Title: 'Evaluación Integral',
      step2Text: 'Analizamos tu historia completa de salud y síntomas.',
      step3Title: 'Laboratorios Avanzados',
      step3Text: 'Realizamos estudios profundos para identificar la causa raíz.',
      step4Title: 'Plan Personalizado',
      step4Text: 'Diseñamos un plan de tratamiento único para ti.',
      step5Title: 'Seguimiento Continuo',
      step5Text: 'Te acompañamos en cada paso de tu proceso de sanación.',
    },
    conditions: {
      title: 'Síntomas y condiciones que tratamos',
      subtitle: 'Buscamos la causa raíz de cada condición para restaurar tu salud de forma natural y sostenible.',
      cta: 'Comenzar a Sentirte Mejor',
      gutTitle: 'Salud Digestiva',
      gutText: 'SII, reflujo, SIBO, estreñimiento, hinchazón, intolerancias alimentarias.',
      hormonesTitle: 'Salud Hormonal',
      hormonesText: 'Fatiga, cambios de peso, SOP, ciclos irregulares, resistencia a la insulina.',
      autoimmuneTitle: 'Autoinmunidad',
      autoimmuneText: 'Hashimoto, artritis reumatoide, psoriasis, lupus, inflamación crónica.',
      metabolicTitle: 'Salud Metabólica',
      metabolicText: 'Diabetes tipo 2, síndrome metabólico, resistencia a la insulina, obesidad.',
      mentalTitle: 'Salud Mental',
      mentalText: 'Ansiedad, niebla mental, insomnio, fatiga crónica, bajo estado de ánimo.',
      heartTitle: 'Salud Cardiovascular',
      heartText: 'Colesterol alto, hipertensión, inflamación, riesgo cardiovascular.',
    },
    pricing: {
      title: 'Experimenta la diferencia',
      subtitle: 'Elige el programa que mejor se adapte a tus necesidades.',
      plan1Badge: 'CONSULTA ÚNICA',
      plan1Title: 'Revisión de Laboratorio',
      plan1Desc: 'Consulta con un clínico para revisar tus resultados de laboratorio.',
      plan1Item1: 'Consulta de 60 minutos',
      plan1Item2: 'Revisión completa de laboratorio',
      plan1Item3: 'Plan de acción personalizado',
      plan1Cta: 'Agendar Consulta',
      plan2Badge: 'CUIDADO CONTINUO',
      plan2Title: 'Atención Integral',
      plan2Desc: 'Programa completo con equipo de salud dedicado y plan personalizado.',
      plan2Item1: 'Equipo de salud de 5 personas',
      plan2Item2: 'Laboratorios avanzados incluidos',
      plan2Item3: 'Seguimiento continuo',
      plan2Cta: 'Unirse Ahora',
    },
    faq: {
      title: 'Preguntas Frecuentes',
      q1Question: '¿Qué es la medicina funcional?',
      q1Answer: 'La medicina funcional se enfoca en identificar y abordar la causa raíz de las enfermedades, en lugar de solo tratar los síntomas. Utiliza un enfoque integral que considera factores genéticos, ambientales y de estilo de vida.',
      q2Question: '¿Cómo funciona la primera consulta?',
      q2Answer: 'En tu primera consulta, realizamos una evaluación completa de tu historia de salud, estilo de vida y síntomas. Esto nos permite crear un plan de tratamiento personalizado.',
      q3Question: '¿Cuánto tiempo toma ver resultados?',
      q3Answer: 'Los tiempos varían según la condición, pero muchos pacientes experimentan mejoras significativas en las primeras 8-12 semanas de seguir su plan personalizado.',
      q4Question: '¿Ofrecen consultas online?',
      q4Answer: 'Sí, ofrecemos consultas virtuales para pacientes de todo el país. Nuestro modelo de telemedicina permite la misma calidad de atención que una consulta presencial.',
      q5Question: '¿Cuánto cuesta el servicio?',
      q5Answer: 'Ofrecemos opciones de pago flexibles y aceptamos varios seguros. Contáctenos para una consulta gratuita y personalizada sobre precios.',
    },
    footer: {
      tagline: 'Medicina funcional natural para tu bienestar integral.',
      navTitle: 'Navegación',
      servicesTitle: 'Servicios',
      service1: 'Consulta Integral',
      service2: 'Revisión de Laboratorio',
      service3: 'Acompañamiento Continuo',
      contactTitle: 'Contacto',
      rights: 'Todos los derechos reservados.',
    },
  },
  en: {
    nav: {
      inicio: 'Home',
      servicios: 'Services',
      ubicacion: 'Location',
      agendar: 'Book',
      agendarCita: 'Book an appointment',
    },
    hero: {
      title: 'Functional',
      accent: 'Medicine',
      subtitle: 'A different approach to understanding health.',
      cta1: 'Book Appointment',
    },
    highlights: {
      item1: 'Personalized Care',
      item2: 'Evidence-Based',
      item3: 'Holistic Approach',
    },
    heroBridge: {
      item1: '100% Personalized Care',
      item2: 'Root Cause Medicine',
      item3: 'Advanced Lab Testing',
      item4: 'In-Person & Online Visits',
      item5: 'Holistic & Preventive Approach',
    },
    stats: {
      title: 'Medical care that delivers results',
      subtitle: 'Partner with a functional medicine expert to uncover the root-cause of symptoms and finally feel better.',
      cta: 'Get Started',
      stat1: 'of our patients improve or eliminate their symptoms within the first year',
      quote: 'I had been searching for answers for years. Origen Med Functional gave me a clear plan and I finally feel like myself again.',
      author: 'María G.',
    },
    experience: {
      title: 'Your Experience with Origen Med',
      step1Title: 'Book Your Visit',
      step1Text: 'Schedule your first in-person or online appointment in minutes.',
      step2Title: 'Comprehensive Evaluation',
      step2Text: 'We analyze your complete health history and symptoms.',
      step3Title: 'Advanced Labs',
      step3Text: 'We run deep tests to identify the root cause.',
      step4Title: 'Personalized Plan',
      step4Text: 'We design a unique treatment plan for you.',
      step5Title: 'Ongoing Support',
      step5Text: 'We guide you through every step of your healing process.',
    },
    conditions: {
      title: 'Symptoms and conditions we treat',
      subtitle: 'We seek the root cause of each condition to restore your health naturally and sustainably.',
      cta: 'Start Feeling Better',
      gutTitle: 'Gut Health',
      gutText: 'IBS, acid reflux, SIBO, constipation, bloating, food intolerances.',
      hormonesTitle: 'Hormone Health',
      hormonesText: 'Fatigue, weight changes, PCOS, irregular cycles, insulin resistance.',
      autoimmuneTitle: 'Autoimmunity',
      autoimmuneText: 'Hashimoto\'s, rheumatoid arthritis, psoriasis, lupus, chronic inflammation.',
      metabolicTitle: 'Metabolic Health',
      metabolicText: 'Type 2 diabetes, metabolic syndrome, insulin resistance, obesity.',
      mentalTitle: 'Mental Health',
      mentalText: 'Anxiety, brain fog, insomnia, chronic fatigue, low mood.',
      heartTitle: 'Heart Health',
      heartText: 'High cholesterol, hypertension, inflammation, cardiovascular risk.',
    },
    pricing: {
      title: 'Experience the difference',
      subtitle: 'Choose the program that best fits your needs.',
      plan1Badge: 'ONE-TIME VISIT',
      plan1Title: 'Clinical Lab Review',
      plan1Desc: 'Meet with a clinician to review your lab results in context.',
      plan1Item1: '60-minute consultation',
      plan1Item2: 'Comprehensive lab review',
      plan1Item3: 'Personalized action plan',
      plan1Cta: 'Book a Visit',
      plan2Badge: 'ONGOING CARE',
      plan2Title: 'Complete Care',
      plan2Desc: 'Full program with dedicated care team and personalized plan.',
      plan2Item1: '5-person care team',
      plan2Item2: 'Advanced labs included',
      plan2Item3: 'Ongoing follow-up',
      plan2Cta: 'Join Now',
    },
    faq: {
      title: 'Frequently Asked Questions',
      q1Question: 'What is functional medicine?',
      q1Answer: 'Functional medicine focuses on identifying and addressing the root cause of disease, rather than just treating symptoms. It uses a holistic approach that considers genetic, environmental, and lifestyle factors.',
      q2Question: 'How does the first visit work?',
      q2Answer: 'During your first visit, we conduct a comprehensive evaluation of your health history, lifestyle, and symptoms. This allows us to create a personalized treatment plan.',
      q3Question: 'How long does it take to see results?',
      q3Answer: 'Timeline varies by condition, but many patients experience significant improvements within the first 8-12 weeks of following their personalized plan.',
      q4Question: 'Do you offer online consultations?',
      q4Answer: 'Yes, we offer virtual consultations for patients nationwide. Our telemedicine model delivers the same quality of care as an in-person visit.',
      q5Question: 'How much does it cost?',
      q5Answer: 'We offer flexible payment options and accept several insurance plans. Contact us for a free, personalized consultation about pricing.',
    },
    footer: {
      tagline: 'Natural functional medicine for your holistic well-being.',
      navTitle: 'Navigation',
      servicesTitle: 'Services',
      service1: 'Complete Care',
      service2: 'Lab Review',
      service3: 'Ongoing Support',
      contactTitle: 'Contact',
      rights: 'All rights reserved.',
    },
  },
};

export type Language = 'es' | 'en';
