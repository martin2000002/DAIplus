// ============================================
// Types
// ============================================

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  initials: string;
  role: string;
  shortBio: string;
  fullBio: string[];
  imageUrl: string;
  linkedin: string;
  accentColor: 'primary' | 'accent';
}

// ============================================
// Team Data
// ============================================

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    slug: 'diego-andrade',
    name: 'Diego Andrade',
    initials: 'DA',
    role: 'CEO & Consultor Principal',
    shortBio:
      'Lidera DAI+ con más de 10 años de experiencia en consultoría estratégica para cooperativas y organizaciones del sector financiero popular.',
    fullBio: [
      'Diego es el fundador y director ejecutivo de DAI+, donde lidera la visión estratégica de la empresa y la relación con clientes clave del sector financiero popular y solidario.',
      'Con más de 10 años de experiencia en consultoría estratégica, se ha especializado en acompañar cooperativas de ahorro y crédito en procesos de transformación organizacional, planificación financiera y desarrollo de capacidades.',
      'Su enfoque se centra en generar soluciones prácticas y personalizadas que permanezcan en las organizaciones mucho después de que la consultoría concluya. Ha trabajado con más de 40 cooperativas en todo Ecuador.',
      'Diego es un firme creyente de que la verdadera transformación ocurre cuando evolucionan la forma de pensar, decidir y actuar de las personas dentro de las organizaciones.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com/in/diego-andrade',
    accentColor: 'primary',
  },
  {
    id: '2',
    slug: 'pablo-ortiz',
    name: 'Pablo Ortiz',
    initials: 'PO',
    role: 'Asistente Ejecutivo',
    shortBio:
      'Coordina la logística operativa y administrativa de DAI+, asegurando que cada proyecto se ejecute con precisión y eficiencia.',
    fullBio: [
      'Pablo es el engranaje operativo de DAI+. Como asistente ejecutivo, se encarga de coordinar la logística de proyectos, gestionar agendas y asegurar que cada entregable llegue a tiempo y con la calidad que define a la empresa.',
      'Su capacidad organizativa y atención al detalle permiten que el equipo de consultoría se enfoque en lo que mejor sabe hacer: generar impacto en las organizaciones cliente.',
      'Pablo también gestiona la comunicación con clientes y proveedores, mantiene actualizada la documentación de proyectos y apoya en la preparación de materiales para talleres y capacitaciones.',
      'Su compromiso con la excelencia operativa ha sido clave para escalar las operaciones de DAI+ manteniendo los estándares de calidad que caracterizan a la firma.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com/in/pablo-ortiz',
    accentColor: 'accent',
  },
  {
    id: '3',
    slug: 'martin-montero',
    name: 'Martín Montero',
    initials: 'MM',
    role: 'Desarrollador Full Stack',
    shortBio:
      'Diseña y desarrolla las soluciones tecnológicas de DAI+, desde plataformas web hasta herramientas digitales para clientes.',
    fullBio: [
      'Martín lidera el desarrollo tecnológico de DAI+, responsable de la arquitectura, diseño y desarrollo de todas las soluciones digitales de la empresa.',
      'Como desarrollador full stack, trabaja con tecnologías modernas como React, Next.js, TypeScript y Node.js para crear experiencias web de alto rendimiento y herramientas digitales que potencian los servicios de consultoría.',
      'Su enfoque combina la excelencia técnica con una profunda comprensión de las necesidades del negocio, asegurando que cada solución tecnológica genere valor real para DAI+ y sus clientes.',
      'Martín también contribuye al desarrollo de dashboards de inteligencia de negocios y plataformas de educación financiera digital para las cooperativas cliente.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com/in/martin-montero',
    accentColor: 'primary',
  },
  {
    id: '4',
    slug: 'carolina-vasquez',
    name: 'Carolina Vásquez',
    initials: 'CV',
    role: 'Consultora de Sostenibilidad',
    shortBio:
      'Especialista en integración de criterios ESG y sostenibilidad financiera para cooperativas del sector popular y solidario.',
    fullBio: [
      'Carolina aporta una perspectiva integral sobre sostenibilidad al equipo de DAI+. Como consultora especializada en criterios ESG, ayuda a las cooperativas a integrar prácticas ambientales, sociales y de gobernanza en su gestión estratégica.',
      'Con formación en economía y desarrollo sostenible, Carolina ha liderado proyectos de diagnóstico ESG, diseño de productos financieros verdes y programas de responsabilidad social en múltiples cooperativas ecuatorianas.',
      'Su trabajo ha sido fundamental para posicionar a DAI+ como referente en sostenibilidad dentro del sector financiero popular, ayudando a los clientes a alinear su misión cooperativa con estándares internacionales de sostenibilidad.',
      'Carolina también facilita talleres sobre finanzas sostenibles y es co-autora de varios artículos publicados en la biblioteca de DAI+.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com/in/carolina-vasquez',
    accentColor: 'accent',
  },
  {
    id: '5',
    slug: 'andres-paredes',
    name: 'Andrés Paredes',
    initials: 'AP',
    role: 'Facilitador & Capacitador',
    shortBio:
      'Diseña y facilita programas de capacitación transformacional para equipos directivos y operativos de organizaciones financieras.',
    fullBio: [
      'Andrés es el corazón de los programas de capacitación de DAI+. Como facilitador certificado, diseña e implementa experiencias de aprendizaje que transforman la forma en que los equipos trabajan y toman decisiones.',
      'Con experiencia en psicología organizacional y educación de adultos, Andrés utiliza metodologías activas, gamificación y aprendizaje experiencial para lograr que los contenidos se conviertan en competencias reales.',
      'Ha facilitado más de 50 talleres y programas de capacitación para cooperativas de todos los segmentos, cubriendo temas como liderazgo, cobranzas inteligentes, servicio al socio y gestión del cambio.',
      'Su pasión por el desarrollo humano y su capacidad para conectar con audiencias diversas lo han convertido en uno de los facilitadores más valorados por los clientes de DAI+.',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com/in/andres-paredes',
    accentColor: 'primary',
  },
];

// ============================================
// Helpers
// ============================================

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find((m) => m.slug === slug);
}

export function getAllTeamSlugs(): string[] {
  return teamMembers.map((m) => m.slug);
}
