// ============================================
// Types
// ============================================

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
  category: 'capacitacion' | 'conferencia' | 'taller' | 'networking';
}

// ============================================
// Sample Events Data
// ============================================

export const events: Event[] = [
  {
    id: '1',
    title: 'Taller de Liderazgo Estratégico',
    description: 'Desarrollo de competencias de liderazgo para jefes de agencia y directivos de cooperativas.',
    date: '2026-01-20',
    location: 'Quito, Ecuador',
    category: 'taller',
  },
  {
    id: '2',
    title: 'Conferencia: Sostenibilidad Financiera',
    description: 'Integración de criterios ESG en cooperativas de ahorro y crédito.',
    date: '2026-01-10',
    location: 'Guayaquil, Ecuador',
    category: 'conferencia',
  },
  {
    id: '3',
    title: 'Capacitación en Cobranzas Inteligentes',
    description: 'Estrategias efectivas y éticas basadas en comportamiento.',
    date: '2025-12-15',
    location: 'Cuenca, Ecuador',
    category: 'capacitacion',
  },
  {
    id: '4',
    title: 'Networking: Innovación en Servicios Financieros',
    description: 'Encuentro con líderes del sector financiero popular.',
    date: '2025-12-05',
    location: 'Ambato, Ecuador',
    category: 'networking',
  },
  {
    id: '5',
    title: 'Taller de Educación Financiera',
    description: 'Programa práctico para organizaciones que buscan decisiones financieras conscientes.',
    date: '2025-11-28',
    location: 'Ibarra, Ecuador',
    category: 'taller',
  },
  {
    id: '6',
    title: 'Conferencia: Metodologías Ágiles',
    description: 'Innovación aplicada y gestión del cambio en organizaciones financieras.',
    date: '2025-11-15',
    location: 'Loja, Ecuador',
    category: 'conferencia',
  },
];

// ============================================
// Helpers
// ============================================

export function getRecentEvents(count: number = 6): Event[] {
  return events.slice(0, count);
}

export function getCategoryLabel(category: Event['category']): string {
  const labels: Record<Event['category'], string> = {
    capacitacion: 'Capacitación',
    conferencia: 'Conferencia',
    taller: 'Taller',
    networking: 'Networking',
  };
  return labels[category];
}

export function getCategoryColor(category: Event['category']): string {
  const colors: Record<Event['category'], string> = {
    capacitacion: 'bg-azul',
    conferencia: 'bg-naranja',
    taller: 'bg-azul-light',
    networking: 'bg-naranja-dark',
  };
  return colors[category];
}
