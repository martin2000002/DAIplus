export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  content: string;
  rating: number;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'María García',
    role: 'Gerente General',
    organization: 'Cooperativa de Ahorro del Sur',
    content: 'El acompañamiento de DAI+ nos permitió reestructurar completamente nuestra planificación financiera. Ahora tomamos decisiones con información clara y proyecciones realistas.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Carlos Mendoza',
    role: 'Director Financiero',
    organization: 'Empresa Industrial ABC',
    content: 'La consultoría financiera transformó nuestra forma de gestionar los recursos. Logramos mejorar nuestra rentabilidad en un 25% en el primer año.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Ana Lucía Pérez',
    role: 'Emprendedora',
    organization: 'Startup de Tecnología',
    content: 'Diego nos ayudó a ordenar nuestras finanzas desde cero. Su enfoque práctico y cercano hizo toda la diferencia para nuestro emprendimiento.',
    rating: 5,
  },
];

// Placeholder client logos - replace with actual logos
export const clientLogos = [
  { id: '1', name: 'Cliente 1', logo: '/images/clients/client-1.svg' },
  { id: '2', name: 'Cliente 2', logo: '/images/clients/client-2.svg' },
  { id: '3', name: 'Cliente 3', logo: '/images/clients/client-3.svg' },
  { id: '4', name: 'Cliente 4', logo: '/images/clients/client-4.svg' },
  { id: '5', name: 'Cliente 5', logo: '/images/clients/client-5.svg' },
  { id: '6', name: 'Cliente 6', logo: '/images/clients/client-6.svg' },
];
