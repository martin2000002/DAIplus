// ============================================
// Types
// ============================================

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  date: string;
  location: string;
  imageUrl: string;
  category: 'capacitacion' | 'conferencia' | 'taller' | 'networking';
  iconName: 'Users' | 'Presentation' | 'Wrench' | 'Handshake';
  content: string[];
}

// ============================================
// Category Config (maps to theme.css tokens)
// ============================================

export const categoryConfig: Record<string, { gradient: string; label: string }> = {
  capacitacion: {
    gradient: 'from-category-training to-category-training-light',
    label: 'Capacitación',
  },
  conferencia: {
    gradient: 'from-category-conference to-category-conference-light',
    label: 'Conferencia',
  },
  taller: {
    gradient: 'from-category-workshop to-category-workshop-light',
    label: 'Taller',
  },
  networking: {
    gradient: 'from-category-networking to-category-networking-light',
    label: 'Networking',
  },
};

// ============================================
// Events Data
// ============================================

export const events: Event[] = [
  {
    id: '1',
    slug: 'taller-liderazgo-estrategico',
    title: 'Taller de Liderazgo Estratégico',
    description: 'Desarrollo de competencias de liderazgo para jefes de agencia y directivos de cooperativas.',
    fullDescription: 'Un programa intensivo diseñado para fortalecer las capacidades de liderazgo en directivos del sector cooperativo, con enfoque en toma de decisiones estratégicas, gestión de equipos y comunicación efectiva.',
    date: '2026-03-20',
    location: 'Quito, Ecuador',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    category: 'taller',
    iconName: 'Wrench',
    content: [
      'El liderazgo estratégico es una competencia fundamental para quienes dirigen cooperativas de ahorro y crédito en un entorno cada vez más competitivo y regulado. Este taller ofrece herramientas prácticas y marcos conceptuales para fortalecer la toma de decisiones a nivel gerencial.',
      'Durante dos jornadas intensivas, los participantes trabajarán en casos reales del sector cooperativo ecuatoriano, explorando modelos de liderazgo adaptativo, gestión del cambio organizacional y técnicas de comunicación estratégica.',
      'El programa incluye dinámicas grupales, análisis de casos de éxito regionales y sesiones de coaching personalizado. Los facilitadores cuentan con más de 15 años de experiencia en el sector financiero popular y solidario.',
      'Al finalizar, cada participante contará con un plan de acción personalizado para implementar en su cooperativa, con indicadores de seguimiento y acompañamiento posterior durante 30 días.',
    ],
  },
  {
    id: '2',
    slug: 'conferencia-sostenibilidad-financiera',
    title: 'Conferencia: Sostenibilidad Financiera',
    description: 'Integración de criterios ESG en cooperativas de ahorro y crédito.',
    fullDescription: 'Una conferencia magistral sobre cómo las cooperativas pueden integrar criterios ambientales, sociales y de gobernanza para asegurar su sostenibilidad a largo plazo.',
    date: '2026-04-10',
    location: 'Guayaquil, Ecuador',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    category: 'conferencia',
    iconName: 'Presentation',
    content: [
      'La sostenibilidad financiera ya no es solo una tendencia, sino una necesidad estratégica para las cooperativas de ahorro y crédito que buscan mantenerse relevantes y competitivas en el mercado ecuatoriano.',
      'Esta conferencia reunirá a expertos nacionales e internacionales que compartirán experiencias exitosas de integración de criterios ESG en instituciones del sector financiero popular y solidario.',
      'Los asistentes conocerán marcos regulatorios actualizados, herramientas de medición de impacto social y ambiental, y estrategias probadas para comunicar el compromiso de sostenibilidad a socios y stakeholders.',
      'El evento incluye paneles de discusión con líderes del sector, presentación de casos de éxito de cooperativas latinoamericanas y networking con profesionales comprometidos con la sostenibilidad.',
    ],
  },
  {
    id: '3',
    slug: 'capacitacion-cobranzas-inteligentes',
    title: 'Capacitación en Cobranzas Inteligentes',
    description: 'Estrategias efectivas y éticas basadas en comportamiento.',
    fullDescription: 'Un programa especializado que combina psicología del comportamiento con técnicas modernas de cobranza para mejorar la recuperación de cartera de manera ética y sostenible.',
    date: '2025-10-15',
    location: 'Cuenca, Ecuador',
    imageUrl: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=800&q=80',
    category: 'capacitacion',
    iconName: 'Users',
    content: [
      'Las cobranzas inteligentes representan un cambio de paradigma en la gestión de cartera vencida. Este programa capacita a los equipos de cobranza en técnicas basadas en evidencia que mejoran los resultados sin deteriorar la relación con los socios.',
      'Los participantes aprenderán sobre nudges conductuales, segmentación inteligente de deudores, comunicación persuasiva ética y uso de datos para priorizar acciones de recuperación.',
      'El programa incluye simulaciones prácticas, role-playing con escenarios reales del sector cooperativo y desarrollo de scripts de comunicación adaptados a diferentes perfiles de socios.',
      'Al finalizar, los equipos tendrán un toolkit completo de herramientas, templates y protocolos que podrán implementar inmediatamente en sus cooperativas para mejorar los indicadores de recuperación.',
    ],
  },
  {
    id: '4',
    slug: 'networking-innovacion-servicios-financieros',
    title: 'Networking: Innovación en Servicios Financieros',
    description: 'Encuentro con líderes del sector financiero popular.',
    fullDescription: 'Un espacio exclusivo para conectar con los principales actores del sector financiero popular y solidario del Ecuador, compartir experiencias y explorar oportunidades de colaboración.',
    date: '2025-08-05',
    location: 'Ambato, Ecuador',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    category: 'networking',
    iconName: 'Handshake',
    content: [
      'La innovación en servicios financieros requiere colaboración y visión compartida. Este encuentro de networking reúne a directivos, gerentes y profesionales del sector cooperativo para explorar las últimas tendencias en transformación digital y servicios financieros.',
      'El formato combina presentaciones breves de experiencias innovadoras, mesas de trabajo temáticas y espacios de networking estructurado para facilitar conexiones significativas entre los participantes.',
      'Los temas incluyen banca digital cooperativa, fintech y alianzas estratégicas, experiencia del socio digital y regulación e innovación en el sector financiero popular.',
      'Cada participante tendrá la oportunidad de presentar brevemente los retos de innovación de su cooperativa y recibir retroalimentación de pares y expertos en un ambiente colaborativo y constructivo.',
    ],
  },
  {
    id: '5',
    slug: 'taller-educacion-financiera',
    title: 'Taller de Educación Financiera',
    description: 'Programa práctico para organizaciones que buscan decisiones financieras conscientes.',
    fullDescription: 'Un taller diseñado para equipos que desean fortalecer sus competencias en educación financiera y desarrollar programas de formación para sus socios y comunidades.',
    date: '2026-07-28',
    location: 'Ibarra, Ecuador',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    category: 'taller',
    iconName: 'Wrench',
    content: [
      'La educación financiera es un pilar fundamental del modelo cooperativo. Este taller capacita a los equipos para diseñar e implementar programas de educación financiera que generen impacto real en las comunidades a las que sirven.',
      'Los participantes aprenderán metodologías probadas de educación financiera para adultos, técnicas de gamificación, uso de herramientas digitales y estrategias de medición de impacto educativo.',
      'El programa incluye la construcción colaborativa de materiales educativos adaptados al contexto ecuatoriano, con énfasis en inclusión financiera, ahorro programado y uso responsable del crédito.',
      'Al finalizar, cada cooperativa participante contará con un programa de educación financiera listo para implementar, con materiales, cronograma y métricas de evaluación definidas.',
    ],
  },
  {
    id: '6',
    slug: 'conferencia-metodologias-agiles',
    title: 'Conferencia: Metodologías Ágiles',
    description: 'Innovación aplicada y gestión del cambio en organizaciones financieras.',
    fullDescription: 'Una conferencia que explora cómo las metodologías ágiles pueden transformar la gestión organizacional en cooperativas de ahorro y crédito, mejorando la eficiencia y la capacidad de adaptación.',
    date: '2026-08-15',
    location: 'Loja, Ecuador',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    category: 'conferencia',
    iconName: 'Presentation',
    content: [
      'Las metodologías ágiles han demostrado ser una herramienta poderosa para organizaciones que buscan adaptarse rápidamente a los cambios del mercado. Esta conferencia explora su aplicación específica en el contexto cooperativo ecuatoriano.',
      'Los ponentes compartirán experiencias reales de implementación de frameworks ágiles en cooperativas de diferentes tamaños, desde instituciones pequeñas hasta las más grandes del país.',
      'Se abordarán temas como Scrum para gestión de proyectos cooperativos, Kanban para operaciones diarias, Design Thinking para innovación en servicios y Lean Management para eficiencia operativa.',
      'La conferencia incluye workshops prácticos donde los participantes podrán experimentar con herramientas ágiles y diseñar pilotos para implementar en sus organizaciones bajo la guía de facilitadores certificados.',
    ],
  },
];

// ============================================
// Helpers
// ============================================

export function getRecentEvents(count: number = 3): Event[] {
  return events.slice(0, count);
}

export function getEventBySlug(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug);
}

export function getAllEventSlugs(): string[] {
  return events.map((e) => e.slug);
}

export function getCategoryLabel(category: Event['category']): string {
  return categoryConfig[category]?.label ?? category;
}

export function formatEventDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-EC', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function isUpcoming(dateString: string): boolean {
  const eventDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate >= today;
}

/** Sorted: upcoming first (nearest date first), then past (most recent first) */
export function getSortedEvents(): Event[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = events
    .filter((e) => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const past = events
    .filter((e) => new Date(e.date) < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return [...upcoming, ...past];
}
