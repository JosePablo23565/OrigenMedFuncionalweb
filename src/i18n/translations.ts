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
  heroBridge: {
    category1: string;
    title1: string;
    category2: string;
    title2: string;
    category3: string;
    title3: string;
    approachTitle: string;
    approachP1: string;
    item1Title: string;
    item1Desc: string;
    item2Title: string;
    item2Desc: string;
    item3Title: string;
    item3Desc: string;
    item4Title: string;
    item4Desc: string;
  };
  stats: {
    title: string;
    subtitle: string;
    cta: string;
  };
  team: {
    title: string;
    viewProfile: string;
    card1Name: string;
    card1Specialty: string;
    card2Name: string;
    card2Specialty: string;
  };
  location: {
    title: string;
    clinicName: string;
    description1: string;
    locationCardTitle: string;
    locationCardCity: string;
    locationCardAddress: string;
    hoursCardTitle: string;
    hoursCardDays: string;
    hoursCardTime: string;
    phoneCardTitle: string;
    phoneCardNumber: string;
    whatsappLabel: string;
    whatsappTitle: string;
    openMaps: string;
    openWaze: string;
  };
  faq: {
    title: string;
    q1Question: string;
    q1Answer: string;
    q2Question: string;
    q2Answer: string;
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
    heroBridge: {
      category1: 'Medicina',
      title1: 'FUNCIONAL',
      category2: 'Medicina del',
      title2: 'ESTILO DE VIDA',
      category3: 'Medicina de',
      title3: 'PRECISIÓN',
      approachTitle: 'Un enfoque más completo',
      approachP1: 'Buscamos comprender a fondo el estado de cada persona para crear planes más precisos y personalizados. Evaluamos factores físicos, emocionales, nutricionales, ambientales y de estilo de vida que pueden influir en la salud, la prevención o la recuperación.',
      item1Title: 'Diagnóstico',
      item1Desc: 'Evaluación clínica profunda y herramientas de laboratorio especializadas para analizar el perfil metabólico, digestivo, hormonal, inmunológico y nutricional.',
      item2Title: 'Plan personalizado',
      item2Desc: 'Planes terapéuticos a la medida que integran nutrición clínica, modulación del estilo de vida, suplementación dirigida y prescripción con respaldo científico.',
      item3Title: 'Terapias',
      item3Desc: 'Intervenciones orientadas a optimizar la oxigenación, la energía mitocondrial, la regulación inmunológica y la capacidad natural de detoxificación y reparación de tejidos.',
      item4Title: 'Seguimiento',
      item4Desc: 'Monitoreo médico continuo y ajuste dinámico del plan para evaluar biomarcadores, consolidar hábitos duraderos y asegurar resultados sostenibles a largo plazo.',
    },
    stats: {
      title: '¿Qué es la medicina funcional?',
      subtitle: 'La medicina funcional es un modelo médico que identifica y resuelve el origen profundo de los desequilibrios de salud mediante intervenciones personalizadas basadas en el metabolismo, la nutrición y el estilo de vida.',
      cta: 'Agendar Cita',
    },
    team: {
      title: 'Nuestro equipo',
      viewProfile: 'Ver perfil',
      card1Name: 'Dr. Jose Venegas',
      card1Specialty: 'Médico Funcional',
      card2Name: 'Enf. Daniela Sequeira',
      card2Specialty: 'Enfermera',
    },
    location: {
      title: 'Nuestra Ubicación',
      clinicName: 'Guayabo, Bagaces',
      description1: 'Nuestro consultorio se encuentra ubicado dentro de las instalaciones de Clínica Monserrat, brindando un entorno médico cálido, profesional y de confianza.',
      locationCardTitle: 'Ubicación',
      locationCardCity: 'Guayabo, Bagaces',
      locationCardAddress: '25 m Sur del Banco de Costa Rica',
      hoursCardTitle: 'Horario',
      hoursCardDays: 'Lunes a Viernes',
      hoursCardTime: '5:00 p. m. a 8:00 p. m.',
      phoneCardTitle: 'Teléfono',
      phoneCardNumber: '+506 8877 5126',
      whatsappLabel: 'WhatsApp / Llamadas',
      whatsappTitle: 'Escribir por WhatsApp o Llamar',
      openMaps: 'Abrir en Maps',
      openWaze: 'Abrir en Waze',
    },
    faq: {
      title: 'Preguntas Frecuentes',
      q1Question: '¿Qué es la medicina funcional?',
      q1Answer: 'La medicina funcional se enfoca en identificar y abordar la causa raíz de las enfermedades, en lugar de solo tratar los síntomas. Utiliza un enfoque integral que considera factores genéticos, ambientales y de estilo de vida.',
      q2Question: '¿Cómo funciona la primera consulta?',
      q2Answer: 'En tu primera consulta, realizamos una evaluación completa de tu historia de salud, estilo de vida y síntomas. Esto nos permite crear un plan de tratamiento personalizado.',
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
    heroBridge: {
      category1: 'Medicine',
      title1: 'FUNCTIONAL',
      category2: 'Lifestyle',
      title2: 'MEDICINE',
      category3: 'Medicine',
      title3: 'PRECISION',
      approachTitle: 'A more comprehensive approach',
      approachP1: 'We seek to thoroughly understand each person’s overall health state to create more precise, personalized plans. We evaluate physical, emotional, nutritional, environmental, and lifestyle factors that influence wellness, prevention, and healing.',
      item1Title: 'Diagnosis',
      item1Desc: 'In-depth clinical evaluation and specialized laboratory testing to analyze metabolic, digestive, hormonal, immunological, and nutritional profiles.',
      item2Title: 'Personalized Plan',
      item2Desc: 'Tailored therapeutic protocols integrating clinical nutrition, lifestyle modulation, targeted supplementation, and evidence-based prescriptions.',
      item3Title: 'Therapies',
      item3Desc: 'Interventions focused on optimizing oxygenation, mitochondrial energy, immune regulation, and the natural capacity for tissue detoxification and repair.',
      item4Title: 'Follow-up',
      item4Desc: 'Continuous medical monitoring and dynamic plan adjustments to evaluate biomarkers, build lasting habits, and ensure sustainable long-term outcomes.',
    },
    stats: {
      title: 'What is functional medicine?',
      subtitle: 'Functional medicine is a medical model that identifies and resolves the root causes of health imbalances through personalized interventions based on metabolism, nutrition, and lifestyle.',
      cta: 'Book Appointment',
    },
    team: {
      title: 'Our team',
      viewProfile: 'View profile',
      card1Name: 'Dr. Jose Venegas',
      card1Specialty: 'Functional Medicine Physician',
      card2Name: 'Enf. Daniela Sequeira',
      card2Specialty: 'Nurse',
    },
    location: {
      title: 'Our Location',
      clinicName: 'Guayabo, Bagaces',
      description1: 'Our practice is located inside Clínica Monserrat facilities, providing a warm, professional, and trusted medical environment.',
      locationCardTitle: 'Location',
      locationCardCity: 'Guayabo, Bagaces',
      locationCardAddress: '25 m South of Banco de Costa Rica',
      hoursCardTitle: 'Office Hours',
      hoursCardDays: 'Monday to Friday',
      hoursCardTime: '5:00 p.m. to 8:00 p.m.',
      phoneCardTitle: 'Phone',
      phoneCardNumber: '+506 8877 5126',
      whatsappLabel: 'WhatsApp / Calls',
      whatsappTitle: 'Message on WhatsApp or Call',
      openMaps: 'Open in Maps',
      openWaze: 'Open in Waze',
    },
    faq: {
      title: 'Frequently Asked Questions',
      q1Question: 'What is functional medicine?',
      q1Answer: 'Functional medicine focuses on identifying and addressing the root cause of disease, rather than just treating symptoms. It uses a holistic approach that considers genetic, environmental, and lifestyle factors.',
      q2Question: 'How does the first visit work?',
      q2Answer: 'During your first visit, we conduct a comprehensive evaluation of your health history, lifestyle, and symptoms. This allows us to create a personalized treatment plan.',
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
