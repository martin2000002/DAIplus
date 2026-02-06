// ============================================
// Types
// ============================================

export interface Newsletter {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  iconName: 'TrendingUp' | 'Lightbulb' | 'Users' | 'BarChart3';
  imageUrl: string;
  content: string[];
}

// ============================================
// Category Config (maps to theme.css tokens)
// ============================================

export const categoryConfig: Record<string, { gradient: string; label: string }> = {
  Estrategia: {
    gradient: 'from-category-strategy via-category-strategy-light to-category-strategy',
    label: 'Estrategia',
  },
  Sostenibilidad: {
    gradient: 'from-category-sustainability via-category-sustainability-light to-category-sustainability',
    label: 'Sostenibilidad',
  },
  Educación: {
    gradient: 'from-category-education via-category-education-light to-category-education',
    label: 'Educación',
  },
  Tecnología: {
    gradient: 'from-category-technology via-category-technology-light to-category-technology',
    label: 'Tecnología',
  },
};

// ============================================
// Newsletter Data
// ============================================

export const newsletters: Newsletter[] = [
  {
    id: '1',
    slug: 'decisiones-estrategicas-cooperativas',
    title: 'Decisiones Estratégicas que Transforman Cooperativas',
    excerpt:
      'Descubre cómo las cooperativas de ahorro y crédito pueden tomar decisiones más efectivas utilizando metodologías probadas y análisis de datos.',
    category: 'Estrategia',
    author: 'Diego Andrade',
    publishedAt: '2026-01-27',
    readTime: '5 min',
    iconName: 'TrendingUp',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    content: [
      'Las cooperativas de ahorro y crédito se enfrentan a un entorno cada vez más competitivo y regulado. La capacidad de tomar decisiones estratégicas informadas se ha convertido en un factor diferenciador clave para las organizaciones que buscan no solo sobrevivir, sino prosperar.',
      'En nuestra experiencia acompañando a más de 40 cooperativas en Ecuador, hemos identificado que las organizaciones que implementan metodologías estructuradas de toma de decisiones logran resultados significativamente superiores en términos de crecimiento sostenible y satisfacción de sus socios.',
      'El primer paso es establecer un marco de análisis que combine datos cuantitativos con insights cualitativos. Esto incluye indicadores financieros clave como la tasa de morosidad, el índice de solvencia y el crecimiento de cartera, complementados con encuestas de satisfacción y análisis de mercado.',
      'La metodología que proponemos se basa en tres pilares: diagnóstico situacional profundo, diseño de escenarios prospectivos y planes de acción con indicadores medibles. Este enfoque permite a los consejos de administración y gerencias tomar decisiones con mayor confianza y respaldo técnico.',
      'Un caso de éxito reciente involucró a una cooperativa del segmento 2 que, tras implementar nuestro modelo de gestión estratégica, logró reducir su morosidad en un 23% y aumentar su base de socios activos en un 15% en apenas 18 meses.',
      'La clave está en no ver la estrategia como un documento estático, sino como un proceso vivo que se alimenta de datos, se adapta al contexto y se ejecuta con disciplina. Las cooperativas que abrazan esta filosofía son las que lideran el sector.',
    ],
  },
  {
    id: '2',
    slug: 'sostenibilidad-sector-financiero',
    title: 'Sostenibilidad en el Sector Financiero Popular',
    excerpt:
      'La integración de criterios ESG en cooperativas no es solo una tendencia, es una necesidad para garantizar la sostenibilidad a largo plazo.',
    category: 'Sostenibilidad',
    author: 'Diego Andrade',
    publishedAt: '2026-01-14',
    readTime: '7 min',
    iconName: 'Lightbulb',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    content: [
      'La sostenibilidad ha dejado de ser un concepto abstracto para convertirse en un imperativo estratégico en el sector financiero popular. Las cooperativas de ahorro y crédito, por su naturaleza social, están en una posición privilegiada para liderar esta transformación.',
      'Los criterios ESG (Environmental, Social, and Governance) ofrecen un marco integral para evaluar y mejorar el impacto de las organizaciones financieras. En el contexto cooperativo ecuatoriano, esto cobra especial relevancia dado el rol que estas instituciones juegan en la inclusión financiera.',
      'Desde la perspectiva ambiental, las cooperativas pueden implementar programas de crédito verde, reducir su huella de carbono operativa y promover prácticas sostenibles entre sus socios. Algunas cooperativas ya están ofreciendo tasas preferenciales para proyectos que demuestren impacto ambiental positivo.',
      'En el eje social, el sector cooperativo tiene una ventaja inherente: su modelo de gobernanza democrática y su enfoque en el bienestar de los socios. Sin embargo, hay oportunidades significativas de mejora en áreas como equidad de género en cargos directivos, programas de educación financiera inclusiva y atención a poblaciones vulnerables.',
      'La gobernanza corporativa es quizás el pilar donde más trabajo queda por hacer. Implementar prácticas de transparencia, gestión de riesgos robusta y rendición de cuentas efectiva no solo mejora la sostenibilidad institucional, sino que genera confianza entre socios y reguladores.',
      'Nuestra recomendación es comenzar con un diagnóstico ESG que identifique brechas y oportunidades, seguido de un plan de implementación gradual con metas claras y medibles. La transformación sostenible no ocurre de la noche a la mañana, pero cada paso cuenta.',
    ],
  },
  {
    id: '3',
    slug: 'educacion-financiera-impacto',
    title: 'El Impacto Real de la Educación Financiera',
    excerpt:
      'Programas de educación financiera bien diseñados pueden transformar la relación de las personas con el dinero y mejorar su calidad de vida.',
    category: 'Educación',
    author: 'Diego Andrade',
    publishedAt: '2026-01-04',
    readTime: '4 min',
    iconName: 'Users',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    content: [
      'La educación financiera es mucho más que enseñar a las personas a ahorrar o hacer un presupuesto. Es una herramienta de transformación social que empodera a individuos y comunidades para tomar el control de su bienestar económico.',
      'En Ecuador, donde la inclusión financiera sigue siendo un desafío, los programas de educación financiera bien diseñados pueden cerrar brechas significativas. Nuestros datos muestran que participantes de programas estructurados mejoran sus hábitos de ahorro en un 35% y reducen su dependencia de crédito informal en un 40%.',
      'Un programa efectivo de educación financiera debe ser contextualizado. No es lo mismo diseñar contenido para jóvenes universitarios que para emprendedores rurales o para socios de cooperativas que buscan su primer crédito productivo. La personalización del mensaje y la metodología es clave.',
      'Las cooperativas de ahorro y crédito tienen una oportunidad única de ser agentes de cambio en este ámbito. Al combinar sus servicios financieros con programas educativos, no solo mejoran la calidad de su cartera, sino que generan un impacto social medible y diferenciador.',
      'Recomendamos un enfoque blended que combine talleres presenciales con contenido digital, gamificación y seguimiento personalizado. Los mejores resultados los hemos visto cuando la educación financiera se integra como parte del journey del socio, no como un evento aislado.',
    ],
  },
  {
    id: '4',
    slug: 'inteligencia-negocios-coac',
    title: 'Inteligencia de Negocios para COACs',
    excerpt:
      'Cómo utilizar datos e indicadores para mejorar la toma de decisiones en cooperativas de ahorro y crédito.',
    category: 'Tecnología',
    author: 'Diego Andrade',
    publishedAt: '2025-12-20',
    readTime: '6 min',
    iconName: 'BarChart3',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    content: [
      'La inteligencia de negocios (BI) está revolucionando la forma en que las cooperativas de ahorro y crédito gestionan su información y toman decisiones. En un sector donde los datos abundan pero los insights escasean, implementar soluciones de BI puede marcar la diferencia entre una gestión reactiva y una proactiva.',
      'El primer paso para cualquier cooperativa que quiera implementar BI es realizar un inventario de sus fuentes de datos. Esto incluye el core bancario, sistemas de gestión de socios, plataformas de canales digitales y fuentes externas como datos del regulador o indicadores macroeconómicos.',
      'Una vez consolidados los datos, el verdadero valor de la inteligencia de negocios radica en la creación de dashboards ejecutivos que permitan a la gerencia y al consejo de administración monitorear indicadores clave en tiempo real. Esto incluye métricas como la evolución de captaciones, el comportamiento de la cartera por segmento y la rentabilidad por producto.',
      'El análisis predictivo es el siguiente nivel. Utilizando modelos estadísticos y machine learning, las cooperativas pueden anticipar comportamientos de sus socios, identificar riesgos de morosidad antes de que se materialicen y optimizar sus estrategias comerciales.',
      'Sin embargo, la tecnología por sí sola no es suficiente. El éxito de una implementación de BI depende en gran medida de la cultura organizacional. Es necesario capacitar a los equipos, establecer procesos de gobierno de datos y fomentar una cultura de decisiones basadas en evidencia.',
      'Nuestra experiencia indica que las cooperativas que invierten en inteligencia de negocios logran reducir tiempos de respuesta en un 60% y mejorar la precisión de sus proyecciones financieras en un 45%. La inversión se recupera típicamente en menos de un año.',
    ],
  },
];

// ============================================
// Helpers
// ============================================

export function getNewsletterBySlug(slug: string): Newsletter | undefined {
  return newsletters.find((n) => n.slug === slug);
}

export function getAllNewsletterSlugs(): string[] {
  return newsletters.map((n) => n.slug);
}

export function getRecentNewsletters(count: number = 3): Newsletter[] {
  return newsletters.slice(0, count);
}
