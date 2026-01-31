import { IconCooperative, IconPlanning, IconBusiness, IconEducation } from '@/src/shared/icons';
import { ComponentType, SVGProps } from 'react';

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const services: Service[] = [
  {
    id: 'cooperativas',
    title: 'Consultoría para Cooperativas',
    subtitle: 'Cooperativas de Ahorro y Crédito',
    description: 'Brindamos acompañamiento especializado enfocado en fortalecer la gestión económica, mejorar la toma de decisiones y asegurar la sostenibilidad.',
    benefits: [
      'Análisis financiero integral',
      'Optimización de recursos',
      'Proyección de crecimiento ordenado',
    ],
    icon: IconCooperative,
  },
  {
    id: 'planificacion',
    title: 'Planificación Financiera',
    subtitle: 'Control y Proyección',
    description: 'Acompañamos en el diseño y fortalecimiento de procesos de planificación financiera para anticipar riesgos y optimizar recursos.',
    benefits: [
      'Elaboración de presupuestos',
      'Proyecciones y escenarios',
      'Toma de decisiones estratégicas',
    ],
    icon: IconPlanning,
  },
  {
    id: 'empresarial',
    title: 'Consultoría Empresarial',
    subtitle: 'Empresas y Emprendimientos',
    description: 'Asesoramos a empresas que buscan ordenar sus finanzas, mejorar rentabilidad y fortalecer su gestión económica.',
    benefits: [
      'Claridad financiera',
      'Mejora de rentabilidad',
      'Desarrollo económico sostenible',
    ],
    icon: IconBusiness,
  },
  {
    id: 'educacion',
    title: 'Educación Financiera',
    subtitle: 'Personas Naturales',
    description: 'Ofrecemos espacios de educación y asesoría para comprender mejor las finanzas personales y tomar decisiones más informadas.',
    benefits: [
      'Comprensión de finanzas personales',
      'Organización de recursos',
      'Relación consciente con el dinero',
    ],
    icon: IconEducation,
  },
];
