export interface TranslationKeys {
  nav: {
    inicio: string;
    servicios: string;
    ubicacion: string;
    agendar: string;
    agendarCita: string;
    nuestroEquipo: string;
  };
  hero: {
    title: string;
    accent: string;
    subtitle: string;
    cta1: string;
    officeHoursLine1: string;
    officeHoursLine2: string;
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
      consultasTitle: string;
      procedimientosTitle: string;
      consulta1: string;
      consulta2: string;
      procedimiento1: string;
      procedimiento2: string;
      procedimiento3: string;
      procedimiento4: string;
      procedimiento5: string;
      procedimiento6: string;
      contactTitle: string;
      rights: string;
    };
  modal: {
    signupTitle: string;
    loginTitle: string;
    signupSubtitle: string;
    loginSubtitle: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    signupBtn: string;
    loginBtn: string;
    hasAccount: string;
    noAccount: string;
    loginLink: string;
    signupLink: string;
    or: string;
    googleBtn: string;
    terms: string;
    termsLink: string;
  };
  booking: {
    modalTitle: string;
    stepService: string;
    stepDateTime: string;
    stepDetails: string;
    stepSuccess: string;
    serviceTitle: string;
    serviceSubtitle: string;
    categoryAll: string;
    categoryConsultations: string;
    categoryProcedures: string;
    services: {
      functionalMedicine: { title: string; desc: string; duration: string };
      generalMedicine: { title: string; desc: string; duration: string };
      ivTherapy: { title: string; desc: string; duration: string };
      earCleaning: { title: string; desc: string; duration: string };
      sutureRemoval: { title: string; desc: string; duration: string };
      implanon: { title: string; desc: string; duration: string };
      cauterization: { title: string; desc: string; duration: string };
      minorSurgery: { title: string; desc: string; duration: string };
    };
    dateTimeTitle: string;
    dateTimeSubtitle: string;
    selectDate: string;
    selectTime: string;
    selectedDate: string;
    selectedTime: string;
    noSlotsAvailable: string;
    detailsTitle: string;
    detailsSubtitle: string;
    summaryTitle: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    notes: string;
    notesPlaceholder: string;
    privacyNotice: string;
    btnNext: string;
    btnBack: string;
    btnConfirm: string;
    successTitle: string;
    successSubtitle: string;
    appointmentSummary: string;
    serviceLabel: string;
    dateTimeLabel: string;
    patientLabel: string;
    calendarBtn: string;
    whatsappBtn: string;
    closeBtn: string;
    locale: string;
  };
}

export const translations: Record<Language, TranslationKeys> = {
  es: {
    nav: {
      inicio: 'Inicio',
      servicios: 'Servicios',
      ubicacion: 'Ubicación',
      agendar: 'Agendar',
      agendarCita: 'Agendar Cita',
      nuestroEquipo: 'Nuestro equipo',
    },
    hero: {
      title: 'Medicina',
      accent: 'Funcional',
      subtitle: 'Un enfoque diferente para entender la salud.',
      cta1: 'Agendar Cita',
      officeHoursLine1: 'Horario de atención',
      officeHoursLine2: 'Lun–Vie · 5:00 p. m. – 8:00 p. m.',
    },
    highlights: {
      item1: 'Atención Personalizada',
      item2: 'Basado en Evidencia',
      item3: 'Enfoque Integral',
    },
    heroBridge: {
      item1: 'Atención 100% Personalizada',
      item2: 'Medicina de Causa Raíz',
      item3: 'Enfoque Integral y Preventivo',
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
      consultasTitle: 'Consultas Médicas',
      procedimientosTitle: 'Procedimientos Médicos',
      consulta1: 'Medicina General',
      consulta2: 'Medicina Funcional',
      procedimiento1: 'Lavado de Oído',
      procedimiento2: 'Retiro de Puntos',
      procedimiento3: 'Aplicación y Retiro de Implanon',
      procedimiento4: 'Sueroterapia',
      procedimiento5: 'Cauterización',
      procedimiento6: 'Cirugía Menor',
      contactTitle: 'Contacto',
      rights: 'Todos los derechos reservados.',
    },
    modal: {
      signupTitle: 'Crear Cuenta',
      loginTitle: 'Iniciar Sesión',
      signupSubtitle: 'Completa tus datos para comenzar.',
      loginSubtitle: 'Ingresa tus credenciales para acceder.',
      name: 'Nombre completo',
      namePlaceholder: 'Juan Pérez',
      email: 'Correo electrónico',
      emailPlaceholder: 'correo@ejemplo.com',
      password: 'Contraseña',
      passwordPlaceholder: 'Ingresa tu contraseña',
      signupBtn: 'Crear Cuenta',
      loginBtn: 'Iniciar Sesión',
      hasAccount: '¿Ya tienes una cuenta?',
      noAccount: '¿No tienes una cuenta?',
      loginLink: 'Iniciar Sesión',
      signupLink: 'Crear Cuenta',
      or: 'O',
      googleBtn: 'Continuar con Google',
      terms: 'Al crear una cuenta aceptas nuestros',
      termsLink: 'Términos y Condiciones',
    },
    booking: {
      modalTitle: 'Agendar cita',
      stepService: 'Servicio',
      stepDateTime: 'Fecha y Hora',
      stepDetails: 'Confirmación',
      stepSuccess: 'Cita Lista',
      serviceTitle: 'Selecciona tu Servicio',
      serviceSubtitle: 'Elige la consulta o procedimiento médico que necesitas.',
      categoryAll: 'Todos los servicios',
      categoryConsultations: 'Consulta Médica',
      categoryProcedures: 'Procedimientos',
      services: {
        functionalMedicine: {
          title: 'Medicina Funcional',
          desc: 'Evaluación integral y profunda de causa raíz para condiciones crónicas y bienestar.',
          duration: '60 - 90 min',
        },
        generalMedicine: {
          title: 'Medicina General',
          desc: 'Consulta médica general, chequeo de salud, diagnóstico oportuno y prescripción.',
          duration: '30 - 45 min',
        },
        ivTherapy: {
          title: 'Sueroterapia / Terapia IV',
          desc: 'Infusiones personalizadas de vitaminas, minerales y antioxidantes de alta absorción.',
          duration: '45 - 60 min',
        },
        earCleaning: {
          title: 'Lavado de Oído',
          desc: 'Procedimiento seguro e indoloro de limpieza ótica y remoción de tapones.',
          duration: '20 - 30 min',
        },
        sutureRemoval: {
          title: 'Retiro de Puntos',
          desc: 'Retiro profesional de suturas o grapas con valoración de la cicatrización.',
          duration: '15 - 20 min',
        },
        implanon: {
          title: 'Implanon (Colocación o Retiro)',
          desc: 'Aplicación o extracción de implante anticonceptivo subdérmico con técnica estéril.',
          duration: '30 min',
        },
        cauterization: {
          title: 'Cauterización',
          desc: 'Tratamiento menor seguro para lesiones dérmicas y pequeñas verrugas o puntos.',
          duration: '30 min',
        },
        minorSurgery: {
          title: 'Cirugía Menor',
          desc: 'Procedimientos quirúrgicos ambulatorios bajo anestesia local.',
          duration: '45 - 60 min',
        },
      },
      dateTimeTitle: 'Selecciona Fecha y Horario',
      dateTimeSubtitle: 'Elige el día y la hora que mejor se adapten a tu agenda.',
      selectDate: 'Fecha de la consulta',
      selectTime: 'Horarios disponibles',
      selectedDate: 'Fecha seleccionada',
      selectedTime: 'Hora seleccionada',
      noSlotsAvailable: 'No hay horarios disponibles para esta fecha. Por favor selecciona otro día.',
      detailsTitle: 'Tus Datos de Contacto',
      detailsSubtitle: 'Revisa el resumen y completa tus datos para confirmar tu cita.',
      summaryTitle: 'Resumen de tu Cita',
      fullName: 'Nombre completo',
      fullNamePlaceholder: '',
      email: 'Correo electrónico',
      emailPlaceholder: '',
      phone: 'Teléfono',
      phonePlaceholder: '',
      notes: 'Motivo de consulta o notas (opcional)',
      notesPlaceholder: '',
      privacyNotice: 'Tus datos médicos y personales están protegidos con confidencialidad absoluta.',
      btnNext: 'Continuar',
      btnBack: 'Volver',
      btnConfirm: 'Agendar Cita',
      successTitle: '¡Cita Agendada con Éxito!',
      successSubtitle: 'Hemos reservado tu espacio. Te enviaremos los detalles y recordatorios a tu correo y WhatsApp.',
      appointmentSummary: 'Detalles de tu cita',
      serviceLabel: 'Servicio',
      dateTimeLabel: 'Fecha y Horario',
      patientLabel: 'Paciente',
      calendarBtn: 'Agregar a Google Calendar',
      whatsappBtn: 'Escribir por WhatsApp',
      closeBtn: 'Listo, Finalizar',
      locale: 'es-ES',
    },
  },
  en: {
    nav: {
      inicio: 'Home',
      servicios: 'Services',
      ubicacion: 'Location',
      agendar: 'Book',
      agendarCita: 'Book Appointment',
      nuestroEquipo: 'Our team',
    },
    hero: {
      title: 'Functional',
      accent: 'Medicine',
      subtitle: 'A different approach to understanding health.',
      cta1: 'Book Appointment',
      officeHoursLine1: 'Office hours',
      officeHoursLine2: 'Mon–Fri · 5:00 p.m. – 8:00 p.m.',
    },
    highlights: {
      item1: 'Personalized Care',
      item2: 'Evidence-Based',
      item3: 'Holistic Approach',
    },
    heroBridge: {
      item1: '100% Personalized Care',
      item2: 'Root Cause Medicine',
      item3: 'Holistic & Preventive Approach',
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
      consultasTitle: 'Medical Consultations',
      procedimientosTitle: 'Medical Procedures',
      consulta1: 'General Medicine',
      consulta2: 'Functional Medicine',
      procedimiento1: 'Ear Cleaning',
      procedimiento2: 'Suture Removal',
      procedimiento3: 'Implanon Insertion and Removal',
      procedimiento4: 'IV Therapy',
      procedimiento5: 'Cauterization',
      procedimiento6: 'Minor Surgery',
      contactTitle: 'Contact',
      rights: 'All rights reserved.',
    },
    modal: {
      signupTitle: 'Create Account',
      loginTitle: 'Log In',
      signupSubtitle: 'Fill in your details to get started.',
      loginSubtitle: 'Enter your credentials to log in.',
      name: 'Full name',
      namePlaceholder: 'John Doe',
      email: 'Email',
      emailPlaceholder: 'you@example.com',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      signupBtn: 'Create Account',
      loginBtn: 'Log In',
      hasAccount: 'Already have an account?',
      noAccount: "Don't have an account?",
      loginLink: 'Log In',
      signupLink: 'Sign Up',
      or: 'Or',
      googleBtn: 'Continue with Google',
      terms: 'By signing up you agree to our',
      termsLink: 'Terms & Conditions',
    },
    booking: {
      modalTitle: 'Schedule Appointment',
      stepService: 'Service',
      stepDateTime: 'Date & Time',
      stepDetails: 'Confirmation',
      stepSuccess: 'Appointment Ready',
      serviceTitle: 'Select Your Service',
      serviceSubtitle: 'Choose the medical consultation or procedure you need.',
      categoryAll: 'All Services',
      categoryConsultations: 'Medical Consultations',
      categoryProcedures: 'Procedures',
      services: {
        functionalMedicine: {
          title: 'Functional Medicine',
          desc: 'Comprehensive root-cause evaluation for chronic conditions and overall wellness.',
          duration: '60 - 90 min',
        },
        generalMedicine: {
          title: 'General Medicine',
          desc: 'General clinical consultation, health checkups, timely diagnosis, and prescriptions.',
          duration: '30 - 45 min',
        },
        ivTherapy: {
          title: 'IV Therapy / Suerotherapy',
          desc: 'Custom infusions of vitamins, minerals, and high-absorption antioxidants.',
          duration: '45 - 60 min',
        },
        earCleaning: {
          title: 'Ear Cleaning',
          desc: 'Safe, gentle, and painless ear irrigation and cerumen removal.',
          duration: '20 - 30 min',
        },
        sutureRemoval: {
          title: 'Suture Removal',
          desc: 'Professional removal of stitches or surgical staples with healing evaluation.',
          duration: '15 - 20 min',
        },
        implanon: {
          title: 'Implanon (Insertion or Removal)',
          desc: 'Safe placement or extraction of contraceptive subdermal implant using sterile technique.',
          duration: '30 min',
        },
        cauterization: {
          title: 'Cauterization',
          desc: 'Safe minor dermatological procedure for small skin lesions and tags.',
          duration: '30 min',
        },
        minorSurgery: {
          title: 'Minor Surgery',
          desc: 'Outpatient surgical procedures performed under local anesthesia.',
          duration: '45 - 60 min',
        },
      },
      dateTimeTitle: 'Select Date and Time',
      dateTimeSubtitle: 'Pick the day and time that best fits your schedule.',
      selectDate: 'Appointment date',
      selectTime: 'Available times',
      selectedDate: 'Selected date',
      selectedTime: 'Selected time',
      noSlotsAvailable: 'No available slots for this date. Please select another day.',
      detailsTitle: 'Your Contact Information',
      detailsSubtitle: 'Review the appointment summary and enter your contact details.',
      summaryTitle: 'Appointment Summary',
      fullName: 'Full name',
      fullNamePlaceholder: '',
      email: 'Email address',
      emailPlaceholder: '',
      phone: 'Phone',
      phonePlaceholder: '',
      notes: 'Reason for visit or notes (optional)',
      notesPlaceholder: '',
      privacyNotice: 'Your medical and personal information is strictly protected and kept confidential.',
      btnNext: 'Continue',
      btnBack: 'Back',
      btnConfirm: 'Book Appointment',
      successTitle: 'Appointment Booked Successfully!',
      successSubtitle: 'We have reserved your slot. We will send all confirmation details and reminders to your email and WhatsApp.',
      appointmentSummary: 'Appointment Details',
      serviceLabel: 'Service',
      dateTimeLabel: 'Date & Time',
      patientLabel: 'Patient',
      calendarBtn: 'Add to Google Calendar',
      whatsappBtn: 'Message on WhatsApp',
      closeBtn: 'Done, Close',
      locale: 'en-US',
    },
  },
};

export type Language = 'es' | 'en';
