/**
 * Constantes y datos de contacto institucionales de Origen Medicina Funcional.
 * Centralizados para evitar valores quemados y duplicados en el frontend.
 */

export const CLINIC_CONFIG = {
  name: 'Origen Medicina Funcional',
  email: 'origen.medfuncional@gmail.com',
  phone: {
    display: '+506 8877 5126',
    raw: '50688775126',
  },
  whatsapp: {
    url: 'https://wa.me/50688775126',
  },
  social: {
    instagram: 'https://www.instagram.com/origenmedfuncional/',
  },
  maps: {
    googleMapsUrl: 'https://maps.app.goo.gl/oYh6vqAxQ7SCYPAZA',
    wazeUrl: 'https://waze.com/ul?q=Farmacia%20Monserrat%20Guayabo',
    embedUrl:
      'https://maps.google.com/maps?q=Origen+Medicina+Funcional,+Guayabo,+Guanacaste,+Costa+Rica&t=&z=16&ie=UTF8&iwloc=&output=embed',
  },
} as const;
