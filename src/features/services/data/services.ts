import { 
  Users, 
  Building2, 
  GraduationCap, 
  Rocket,
  BookOpen,
  type LucideIcon
} from 'lucide-react';

// ============================================
// Tipos
// ============================================

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ServicePillar {
  title: string;
  description: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  iconName: 'Users' | 'Building2' | 'GraduationCap' | 'Rocket' | 'BookOpen';
  accent: 'azul' | 'naranja';
  headerImage: string;
  benefits?: string[];
  pillars?: ServicePillar[];
  bulletPoints?: string[];
  courses?: Course[];
  philosophy?: string;
}

// ============================================
// Servicios Principales
// ============================================

export const services: Service[] = [
  {
    id: 'cooperativas',
    slug: 'cooperativas',
    title: 'Consultoría de Alto Impacto',
    shortTitle: 'Consultoría de Alto Impacto',
    subtitle: 'Consultoría · Asesoría · Capacitación',
    description: 'Brindamos acompañamiento especializado para fortalecer la gestión organizacional, financiera y comercial de las cooperativas.',
    fullDescription: 'Brindamos acompañamiento especializado para fortalecer la gestión organizacional, financiera y comercial de las cooperativas de ahorro y crédito, mejorar la toma de decisiones y asegurar su sostenibilidad en entornos cada vez más exigentes. Nuestro enfoque es flexible y contextualizado, considerando el tamaño, madurez institucional y entorno de cada cooperativa, con el objetivo de generar soluciones prácticas, aplicables y de alto impacto.',
    iconName: 'Users',
    accent: 'azul',
    headerImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1920&q=80',
    pillars: [
      {
        title: 'Consultoría de alto impacto',
        description: 'Acompañamos desde el diagnóstico hasta la implementación, transferimos capacidades y dejamos equipos preparados para sostener y escalar los cambios.'
      },
      {
        title: 'Asesoría estratégica para la toma de decisiones',
        description: 'Las organizaciones exitosas no toman más decisiones: toman mejores decisiones. Aportamos análisis, metodologías y criterios que fortalecen la calidad y oportunidad de cada decisión clave.'
      },
      {
        title: 'Capacitación transformacional',
        description: 'Formamos equipos que aplican, ejecutan y mejoran. Diseñamos experiencias de aprendizaje orientadas a resultados, no solo a contenidos.'
      }
    ],
    philosophy: 'Nuestra filosofía se basa en la personalización de cada solución, integrando estrategia e innovación como ejes transversales. Porque sin estrategia no hay resultados, y sin innovación no hay crecimiento.'
  },
  {
    id: 'empresas',
    slug: 'empresas',
    title: 'Asesoría Estratégica',
    shortTitle: 'Asesoría Estratégica',
    subtitle: 'Estrategia · Sostenibilidad · Impacto',
    description: 'Servicios orientados a fortalecer la gestión, sostenibilidad, impacto social y desempeño institucional.',
    fullDescription: 'Ofrecemos servicios de consultoría y asesoría orientados a fortalecer la gestión, sostenibilidad, impacto social y desempeño institucional de empresas, organizaciones de la Economía Popular y Solidaria, fundaciones, ONG y organizaciones de la sociedad civil. Aportamos visión estratégica, rigor técnico y enfoque práctico para convertir desafíos en oportunidades de crecimiento.',
    iconName: 'Building2',
    accent: 'naranja',
    headerImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
    bulletPoints: [
      'Definición y ejecución de estrategias organizacionales',
      'Fortalecimiento de modelos de gestión y gobernanza',
      'Diseño e implementación de proyectos de impacto social y económico',
      'Integración de sostenibilidad y criterios ESG en la gestión',
      'Innovación organizacional y mejora continua'
    ]
  },
  {
    id: 'personas',
    slug: 'personas',
    title: 'Capacitación Transformacional',
    shortTitle: 'Capacitación Transformacional',
    subtitle: 'Educación Financiera · Planificación',
    description: 'Espacios de capacitación y asesoría para comprender mejor las finanzas y tomar decisiones económicas más informadas.',
    fullDescription: 'Desarrollamos espacios de capacitación y asesoría dirigidos a personas que desean comprender mejor sus finanzas, organizar sus recursos y tomar decisiones económicas más informadas. Nuestro enfoque es práctico, cercano y adaptado a cada realidad, promoviendo una relación más consciente, responsable y estratégica con el dinero.',
    iconName: 'GraduationCap',
    accent: 'azul',
    headerImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1920&q=80',
    bulletPoints: [
      'Fortalecer la educación financiera personal y familiar',
      'Mejorar la toma de decisiones económicas y de inversión',
      'Desarrollar hábitos financieros sostenibles',
      'Acompañar procesos de emprendimiento y planificación financiera'
    ]
  },
  {
    id: 'programas',
    slug: 'programas',
    title: 'Autonomía Económica',
    shortTitle: 'Autonomía Económica',
    subtitle: 'Desarrollo · Innovación · Sostenibilidad',
    description: 'Diseñamos e implementamos programas de desarrollo económico, fortalecimiento organizacional e innovación.',
    fullDescription: 'Diseñamos e implementamos programas y proyectos de desarrollo económico y ambiental, fortalecimiento organizacional, educación financiera, inclusión económica, innovación y sostenibilidad. Nuestros proyectos se alinean a objetivos estratégicos claros y cuentan con indicadores de impacto que permiten medir resultados, aprendizaje y sostenibilidad en el tiempo.',
    iconName: 'Rocket',
    accent: 'naranja',
    headerImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80',
    benefits: [
      'Desarrollo económico y ambiental',
      'Fortalecimiento organizacional',
      'Educación financiera',
      'Inclusión económica',
      'Innovación y sostenibilidad'
    ]
  },
  {
    id: 'cursos',
    slug: 'cursos',
    title: 'Educación Financiera',
    shortTitle: 'Educación Financiera',
    subtitle: 'Presencial · Virtual · Híbrido',
    description: 'Cursos estructurados que permiten profundizar, reforzar y dar continuidad a los procesos de aprendizaje.',
    fullDescription: 'Además de nuestras capacitaciones corporativas, ofrecemos cursos estructurados y complementarios que permiten profundizar, reforzar y dar continuidad a los procesos de aprendizaje. Estos cursos pueden ser contratados por organizaciones o personas de forma independiente, como una extensión natural de las capacitaciones, en modalidad presencial, virtual o híbrida.',
    iconName: 'BookOpen',
    accent: 'azul',
    headerImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1920&q=80',
    courses: [
      {
        id: 1,
        title: 'Decisiones Estratégicas que Generan Valor',
        description: 'Estrategia aplicada para líderes y directivos que buscan tomar mejores decisiones en contextos complejos.'
      },
      {
        id: 2,
        title: 'Finanzas con Propósito: Sostenibilidad y Rentabilidad',
        description: 'Integración de criterios financieros, sociales y ambientales en la gestión organizacional.'
      },
      {
        id: 3,
        title: 'Inteligencia de Negocios para la Toma de Decisiones',
        description: 'Uso práctico de datos, indicadores y análisis para mejorar resultados.'
      },
      {
        id: 4,
        title: 'Innovar en Servicios Financieros',
        description: 'Diseño de productos centrados en el socio/cliente, inclusión financiera y última milla.'
      },
      {
        id: 5,
        title: 'Cobranzas Inteligentes y Neurocobranzas',
        description: 'Estrategias efectivas, éticas y basadas en comportamiento.'
      },
      {
        id: 6,
        title: 'Liderazgo Estratégico para Jefes de Agencia',
        description: 'Desarrollo de competencias de liderazgo, gestión comercial y equipos de alto desempeño.'
      },
      {
        id: 7,
        title: 'Educación Financiera para la Vida y el Negocio',
        description: 'Curso práctico para personas y organizaciones que buscan tomar decisiones financieras conscientes.'
      },
      {
        id: 8,
        title: 'Metodologías Ágiles para Organizaciones que Evolucionan',
        description: 'Innovación aplicada, pensamiento ágil y gestión del cambio.'
      }
    ]
  }
];

// ============================================
// Helper para obtener servicio por slug
// ============================================

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map(service => service.slug);
}
