/**
 * siteData.ts - Única fuente de verdad editable para ECRISTIA
 * Todos los precios, textos, mensajes de WhatsApp, tipos de web, planes y datos de demos
 */

export interface PackageItem {
  id: string;
  name: string;
  price: number;
  deliveryDays: string;
  revisions: string;
  subtitle: string;
  features: string[];
  isFeatured?: boolean;
  badge?: string;
  whatsappMessage: string;
}

export interface MaintenancePlanItem {
  id: string;
  name: string;
  price: number;
  subtitle: string;
  features: string[];
  isFeatured?: boolean;
  badge?: string;
  whatsappMessage: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface RealEstateProperty {
  id: string;
  title: string;
  zone: string; // 'villa-morra' | 'santa-teresa' | 'carmelitas' | 'mburucuya' | 'manora' | 'yykua-sati'
  zoneDisplay: string;
  type: string; // 'departamentos' | 'casas' | 'penthouse' | 'pozo'
  typeDisplay: string;
  priceUSD: number;
  dorms: number;
  dormsDisplay: string;
  areaM2: number;
  tag: string;
  featureSubtitle: string;
  amenities: string;
  deliveryDate?: string;
}

/** Nombre de la marca: es lo único que hay que cambiar aquí al renombrar (más index.html). */
const BRAND = "ECRISTIA";

export const siteData = {
  // Datos de contacto oficial
  contact: {
    brand: BRAND,
    brandSubtitle: "Diseño y desarrollo web",
    developerName: "Erasmo",
    whatsappNumber: "595982829875",
    whatsappDisplay: "+595 982 829 875",
    whatsappLink: "https://wa.me/595982829875",
    email: "ecristiamz@gmail.com",
    location: "Asunción y Gran Asunción",
    aboutMe: "[COMPLETAR]",
    footerLegal: `© 2026 ${BRAND} · Asunción y Gran Asunción · Todos los precios están en guaraníes e incluyen IVA`,
    auditWhatsappMessage: "Hola, quiero la revisión gratuita de mi web."
  },

  // Tipos de web y precios de diseño y desarrollo (IVA incluido)
  packages: [
    {
      id: "presencia",
      name: "Web Presencia",
      price: 1900000,
      deliveryDays: "7 días hábiles",
      revisions: "1 ronda de cambios",
      subtitle: "Para profesionales y negocios que quieren empezar a estar en internet de forma simple.",
      features: [
        "Una página con hasta 3 secciones",
        "Diseño a medida con tu logo y tus colores",
        "Botón de WhatsApp siempre visible",
        "Ficha de Google configurada",
        "Estadísticas de visitas (Google Analytics)",
        "Hosting por 1 año, y dominio .com si todavía no tienes uno",
        "1 ronda de cambios"
      ],
      whatsappMessage: "Hola, me interesa la web Presencia. ¿Podemos hablar?"
    },
    {
      id: "profesional",
      name: "Web Profesional",
      price: 4200000,
      deliveryDays: "15 días hábiles",
      revisions: "2 rondas de cambios",
      isFeatured: true,
      badge: "Más elegido",
      subtitle: "Para negocios que necesitan aparecer en Google, explicar bien sus servicios y recibir consultas.",
      features: [
        "Hasta 8 páginas en WordPress",
        "Textos redactados por mí a partir de una entrevista",
        "SEO local y ficha de Google completa",
        "Formulario de turnos o consultas que te llega por WhatsApp o correo",
        "Panel para que edites tú mismo los contenidos",
        "Capacitación de 1 hora por videollamada",
        "2 rondas de cambios",
        "Hosting por 1 año, y dominio .com si todavía no tienes uno"
      ],
      whatsappMessage: "Hola, me interesa la web Profesional. ¿Podemos hablar?"
    },
    {
      id: "tienda",
      name: "Tienda online",
      price: 7500000,
      deliveryDays: "20 días hábiles",
      revisions: "2 rondas de cambios",
      subtitle: "Para vender tus productos por internet, con carrito de compra y cobro en línea.",
      features: [
        "Tienda online en WooCommerce o Shopify",
        "Hasta 50 productos cargados",
        "Cobro en línea con Bancard o Pagopar",
        "Pedido por WhatsApp",
        "Costos y zonas de envío configurados",
        "2 rondas de cambios",
        "Capacitación para manejar tu stock y tus pedidos",
        "Hosting por 1 año, y dominio .com si todavía no tienes uno"
      ],
      whatsappMessage: "Hola, me interesa la Tienda online. ¿Podemos hablar?"
    }
  ] as PackageItem[],

  // Servicio de Rescate de webs existentes
  rescueWeb: {
    id: "rescate",
    name: "Rescate de web existente",
    initialFee: 400000,
    requiredPlanId: "pro",
    subtitle: "Auditoría, copia de seguridad y actualización de una web que ya tienes, con alta en el plan Pro.",
    whatsappMessage: "Hola, me interesa el servicio de Rescate de web existente con el plan Pro. ¿Podemos hablar?"
  },

  // Planes de mantenimiento mensual (IVA incluido)
  maintenancePlans: [
    {
      id: "sin_plan",
      name: "Sin mantenimiento",
      price: 0,
      subtitle: "Sin cobertura mensual contratada.",
      features: ["Soporte por demanda con presupuesto por hora"],
      whatsappMessage: "Hola, quiero consultar por servicios de desarrollo web sin plan mensual."
    },
    {
      id: "esencial",
      name: "Esencial",
      price: 250000,
      subtitle: "Lo básico para que tu web siga funcionando y segura.",
      features: [
        "Hosting y certificado de seguridad (SSL)",
        "Actualizaciones de WordPress y plugins",
        "Copia de seguridad semanal",
        "Aviso si tu web se cae",
        "30 minutos de cambios al mes"
      ],
      whatsappMessage: "Hola, me interesa el plan de mantenimiento Esencial. ¿Podemos hablar?"
    },
    {
      id: "pro",
      name: "Pro",
      price: 450000,
      isFeatured: true,
      badge: "Más conveniente",
      subtitle: "Para negocios que reciben consultas todos los días.",
      features: [
        "Todo lo del plan Esencial",
        "Copia de seguridad diaria",
        "Revisión de virus y código malicioso",
        "2 horas de cambios al mes",
        "Informe mensual de visitas y consultas",
        "Actualización de tu ficha de Google"
      ],
      whatsappMessage: "Hola, me interesa el plan de mantenimiento Pro. ¿Podemos hablar?"
    },
    {
      id: "crecimiento",
      name: "Crecimiento",
      price: 950000,
      subtitle: "Para negocios que hacen campañas y piden cambios seguido.",
      features: [
        "Todo lo del plan Pro",
        "5 horas de cambios o nuevas secciones al mes",
        "1 página de campaña (landing) por mes para tus anuncios en Meta o Google",
        "Ajustes de SEO local cada mes"
      ],
      whatsappMessage: "Hola, me interesa el plan de mantenimiento Crecimiento. ¿Podemos hablar?"
    }
  ] as MaintenancePlanItem[],

  // Reglas comerciales transparentes
  commercialRules: {
    paymentTerms: "Se paga en 2 partes: 50% al empezar y 50% al entregar. Los plazos cuentan desde que me envías todos los materiales (textos, logo y fotos).",
    maintenanceMinTerm: "Contrato mínimo de 6 meses",
    billingDay: "Cobro por adelantado el día 5",
    hoursRule: "Las horas no usadas no se acumulan",
    firstMonthFreeCondition: "Primer mes gratis si contratas una web, con el plan que le corresponde"
  },

  // Primer mes de mantenimiento gratis: cada tipo de web va con el plan del mismo orden de precio
  freeMonthPlanByProject: {
    presencia: "esencial",
    profesional: "pro",
    tienda: "crecimiento"
  } as Record<string, string>,

  // Programa piloto
  pilotProgram: {
    discount: "30% de descuento",
    totalSlots: 3,
    remainingSlots: 3,
    title: "Programa piloto para mis primeros proyectos",
    conditions: "Hay 3 cupos con 30% de descuento en el proyecto. A cambio, me das un testimonio (en video o por escrito), me dejas publicar el caso y contratas 6 meses de mantenimiento.",
    whatsappMessage: "Hola, quiero un cupo del programa piloto con 30% de descuento."
  },

  // Diagnóstico
  diagnosticCards: [
    {
      icon: "chat",
      title: "Las mismas preguntas, todos los días",
      description: "Tus clientes te preguntan por WhatsApp lo mismo de siempre: precios, horarios, seguros y ubicación. Con una web clara, ya lo saben antes de escribirte.",
      solution: "una sección de preguntas frecuentes"
    },
    {
      icon: "search_off",
      title: "Invisible en Google",
      description: "En Google no apareces, o tus datos están desactualizados. Quien busca lo que ofreces en Asunción termina llamando a otro.",
      solution: "ordeno tu ficha de Google y los datos de tu negocio"
    },
    {
      icon: "smartphone",
      title: "Una web que no ayuda",
      description: "Tu web es vieja, no se ve bien en el celular o quien la hizo ya no responde cuando necesitas un cambio.",
      solution: "la rediseño para que funcione bien en el celular"
    },
    {
      icon: "verified",
      title: "Solo Instagram",
      description: "Instagram solo no alcanza para quien llega por recomendación y quiere ver una página seria con tus datos.",
      solution: "una web con tus servicios, tu equipo y tus datos de contacto"
    }
  ],

  // Nichos de especialización local
  targetNiches: [
    {
      badge: "Turnos y ficha de Google",
      title: "Clínicas y consultorios",
      description: "Web con servicios, profesionales, turnos y tu ficha de Google al día."
    },
    {
      badge: "Catálogo y una página por proyecto",
      title: "Inmobiliarias y corredores",
      description: "Catálogo propio y una página por cada proyecto, con formulario y WhatsApp."
    },
    {
      badge: "Confianza y marca",
      title: "Abogados y contadores",
      description: "Una web sobria que respalda la recomendación de quien te recomendó."
    },
    {
      badge: "WhatsApp y cobro en línea",
      title: "Comercios con catálogo",
      description: "Catálogo con pedido por WhatsApp o tienda con Pagopar y Bancard."
    }
  ],

  // Metodología ágil en 4 pasos
  methodologySteps: [
    {
      number: "01",
      title: "Entrevista de 30 minutos",
      description: "Me cuentas tu negocio, tus servicios y a qué clientes quieres llegar.",
      channel: "Videollamada o WhatsApp"
    },
    {
      number: "02",
      title: "Propuesta clara",
      description: "Recibes el alcance, el plazo y el precio exactos, por escrito, antes de pagar nada. Si lo apruebas, te envío un contrato simple.",
      channel: "Por escrito, antes de pagar"
    },
    {
      number: "03",
      title: "Diseño y desarrollo",
      description: "Construyo tu web con las rondas de cambios incluidas en el proyecto, en el plazo acordado.",
      channel: "Avances por WhatsApp"
    },
    {
      number: "04",
      title: "Entrega y mantenimiento",
      description: "Te capacito para usar tu web y sigo cuidándola cada mes con el plan que elijas.",
      channel: "Publicación y soporte"
    }
  ],

  // Preguntas frecuentes
  faqs: [
    {
      id: "faq-1",
      question: "¿Tengo que tener los textos listos?",
      answer: "No. Yo redacto los textos a partir de una entrevista de 30 minutos."
    },
    {
      id: "faq-2",
      question: "Ya tengo Instagram, ¿para qué una web?",
      answer: "La web es donde llega quien te busca en Google o quien te recomendaron y quiere ver más información. No reemplaza a Instagram, lo complementa."
    },
    {
      id: "faq-3",
      question: "¿Qué incluye el hosting y el dominio?",
      answer: "Todos los tipos de web incluyen hosting por 1 año. El dominio .com también, si todavía no tienes uno. Si ya tienes dominio, puedes usarlo, pero el precio es el mismo. Pasado el primer año, el hosting sigue con un plan de mantenimiento."
    },
    {
      id: "faq-contrato",
      question: "¿Hay contrato?",
      answer: "Sí, pero es simple. Cuando apruebas el presupuesto te lo envío, y puedes devolverlo firmado o confirmar tu aceptación por WhatsApp."
    },
    {
      id: "faq-4",
      question: "¿Das factura?",
      answer: "Sí, emito factura electrónica y todos los precios incluyen IVA."
    },
    {
      id: "faq-5",
      question: "¿Y si mi web la hizo otra persona que ya no responde?",
      answer: "Puedo hacerme cargo: reviso la web, hago una copia de seguridad, la actualizo y pasa al plan de mantenimiento Pro. El cargo inicial es de Gs 400.000."
    }
  ] as FAQItem[],

  // Demos de concepto
  demosOverview: [
    {
      id: "clinica",
      title: "Clínica Dental Ejemplo",
      subtitle: "Salud & Bienestar en Villa Morra, Asunción",
      path: "/demo/clinica",
      tag: "Ejemplo",
      highlights: ["Turnos en línea", "Pensada para el celular", "Con ficha de Google"]
    },
    {
      id: "inmobiliaria",
      title: "Inmobiliaria Ejemplo",
      subtitle: "Curaduría y desarrollos en Asunción",
      path: "/demo/inmobiliaria",
      tag: "Ejemplo",
      highlights: ["Filtros por zona y precio", "Una página por edificio", "Contacto por WhatsApp"]
    }
  ],

  // Datos para Demo Inmobiliaria Ejemplo
  realEstateProperties: [
    {
      id: "prop-1",
      title: "Edificio Molas López 740",
      zone: "carmelitas",
      zoneDisplay: "Las Lomas / Carmelitas",
      type: "departamentos",
      typeDisplay: "Departamentos",
      priceUSD: 142000,
      dorms: 2,
      dormsDisplay: "2 Suites",
      areaM2: 88,
      tag: "En pozo · Cuotas en Gs/USD",
      featureSubtitle: "Exclusiva torre boutique sobre el corredor Molas López con terrazas verdes y terminaciones de hormigón a la vista.",
      amenities: "1 Cochera incluida",
      deliveryDate: "Entrega Q1 2026"
    },
    {
      id: "prop-2",
      title: "Residencias Central",
      zone: "villa-morra",
      zoneDisplay: "Villa Morra",
      type: "departamentos",
      typeDisplay: "Departamentos",
      priceUSD: 89000,
      dorms: 1,
      dormsDisplay: "1 Dorm",
      areaM2: 54,
      tag: "Alta Rentabilidad Airbnb",
      featureSubtitle: "A pasos del Polo Gastronómico y Shopping Mariscal. Tipología optimizada con balcón y quincho integrado.",
      amenities: "Piscina & Rooftop"
    },
    {
      id: "prop-3",
      title: "Torre Santa Teresa Boulevard",
      zone: "santa-teresa",
      zoneDisplay: "Santa Teresa (Eje Corporativo)",
      type: "departamentos",
      typeDisplay: "Departamentos",
      priceUSD: 295000,
      dorms: 3,
      dormsDisplay: "3 Dorms",
      areaM2: 165,
      tag: "Entrega Inmediata",
      featureSubtitle: "Amplitud y diseño vanguardista. Master suite con vestidor, estar íntimo y 2 cocheras subterráneas contiguas.",
      amenities: "2 Cocheras subterráneas"
    },
    {
      id: "prop-4",
      title: "Terraza Mburucuyá Jardín",
      zone: "mburucuya",
      zoneDisplay: "Mburucuyá",
      type: "casas",
      typeDisplay: "Casas & Dúplex",
      priceUSD: 178000,
      dorms: 2,
      dormsDisplay: "2 Dorms",
      areaM2: 102,
      tag: "Últimas 2 unidades",
      featureSubtitle: "En el corazón arbolado de Mburucuyá. Terraza privada espaciosa con quincho en una calle residencial tranquila.",
      amenities: "Parrilla Propia"
    },
    {
      id: "prop-5",
      title: "Loft Studio Manorá",
      zone: "manora",
      zoneDisplay: "Manorá / Shopping del Sol",
      type: "departamentos",
      typeDisplay: "Departamentos",
      priceUSD: 73500,
      dorms: 1,
      dormsDisplay: "Studio / 1D",
      areaM2: 42,
      tag: "Ideal Primer Inversor",
      featureSubtitle: "Concepto flexible monoambiente/1D amoblado. A 400 metros del Paseo La Galería, ideal ejecutivos corporativos.",
      amenities: "Equipamiento Llave en Mano"
    },
    {
      id: "prop-6",
      title: "Penthouse Parque Guasú",
      zone: "yykua-sati",
      zoneDisplay: "Yykua Satî",
      type: "penthouse",
      typeDisplay: "Penthouses",
      priceUSD: 440000,
      dorms: 3,
      dormsDisplay: "3 + Servicio",
      areaM2: 240,
      tag: "Exclusivo",
      featureSubtitle: "Imponente residencia en doble altura con solárium privado, vista panorámica de 270° y área completa de servicio.",
      amenities: "Piscina Propia en Azotea"
    }
  ] as RealEstateProperty[],

  // Proyecto Destacado Inmobiliario
  featuredInmoProject: {
    title: "Proyecto Destacado: The Lapacho Tower · Eje Santa Teresa",
    description: "Desarrollo boutique de 14 pisos orientado a inversores que buscan renta en dólares y plusvalía en el polo corporativo y financiero de Asunción.",
    features: [
      {
        title: "Rentabilidad proyectada",
        desc: "Aquí se muestra la estimación de renta del proyecto."
      },
      {
        title: "Gestión de Alquiler Llave en Mano",
        desc: "Administración completa de check-in, limpieza y recaudación en dólares para propietarios locales o extranjeros."
      },
      {
        title: "Financiación Directa en Obra",
        desc: "Esquema flexible: 20% entrega inicial, 60% en 24 cuotas sin interés bancario y 20% contra posesión definitiva."
      }
    ],
    legal: "Aquí va la información legal del proyecto."
  },

  // Datos para Demo Clínica Dental Ejemplo
  dentalClinicData: {
    name: "Clínica Dental Ejemplo",
    zone: "Villa Morra · Asunción",
    phone: "+595 981 123 456",
    address: "Avda. Santa Teresa casi Herminio Maldonado, Asunción",
    services: [
      {
        name: "Limpieza Dental & Profilaxis Profunda",
        badge: "Preventivo",
        duration: "45 min",
        desc: "Remoción de sarro con ultrasonido, pulido con pasta fluorada y detección temprana de caries. Ideal cada 6 meses para prevenir patologías periodontales."
      },
      {
        name: "Ortodoncia Invisible y Convencional",
        badge: "Estética y Función",
        duration: "Escaneo 3D incluido",
        desc: "Alineadores transparentes estéticos o brackets autoligables. Corrección funcional y estética adaptada a tu ritmo de vida con simulación digital previa."
      },
      {
        name: "Implantes Dentales & Rehabilitación",
        badge: "Rehabilitación",
        duration: "Garantía clínica",
        desc: "Reposición fija de piezas perdidas con titanio biocompatible de grado quirúrgico y coronas cerámicas de aspecto natural, seguras y duraderas."
      },
      {
        name: "Blanqueamiento Dental LED",
        badge: "Estética Dental",
        duration: "1 sesión rápida",
        desc: "Tratamiento en consultorio en 1 sesión de 45 minutos combinada con férulas personalizadas para mantenimiento en casa sin generar sensibilidad."
      }
    ],
    specialists: [
      {
        name: "Dra. Ana Ejemplo",
        reg: "Reg. profesional (ejemplo)",
        specialty: "Especialista en Ortodoncia y Estética Dental",
        bio: "Aquí van la formación y la experiencia del profesional.",
        schedule: "Atención Martes, Jueves y Sábados"
      },
      {
        name: "Dr. Luis Ejemplo",
        reg: "Reg. profesional (ejemplo)",
        specialty: "Cirujano Dentista e Implantólogo Oral",
        bio: "Aquí van la formación y la experiencia del profesional.",
        schedule: "Atención Lunes, Miércoles y Viernes"
      }
    ],
    schedules: [
      { days: "Lunes a Viernes", hours: "08:00 a 19:30 hs", note: "Horario continuado (mediodía abierto)" },
      { days: "Sábados", hours: "08:30 a 13:00 hs", note: "" },
      { days: "Domingos y feriados", hours: "Guardia telefónica activa", note: "" }
    ],
    insurances: [
      { name: "Seguro 1", type: "Medicina prepaga" },
      { name: "Seguro 2", type: "Convenio activo" },
      { name: "Seguro 3", type: "Planes integrales" },
      { name: "Seguro 4", type: "Planes odontológicos" },
      { name: "Seguro 5", type: "Servicio privado" },
      { name: "Seguro 6", type: "Reembolso / cobertura" }
    ]
  }
};

/**
 * Función auxiliar para formatear montos en Guaraníes paraguayos
 */
export function formatGs(amount: number): string {
  if (amount === 0) return "Gs 0";
  return "Gs " + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * Función auxiliar para formatear montos en Dólares
 */
export function formatUSD(amount: number): string {
  return "USD " + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
