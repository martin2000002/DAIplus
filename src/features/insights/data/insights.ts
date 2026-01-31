import { IconDecision, IconTransform, IconStrength, IconSustainability, IconAnalysis } from '@/src/shared/icons';
import { ComponentType, SVGProps } from 'react';

export interface Insight {
  id: string;
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const insights: Insight[] = [
  {
    id: 'decision',
    title: 'Decisiones Informadas',
    description: 'Acompañamos a comprender la realidad organizacional para tomar decisiones más informadas, sostenibles y alineadas a objetivos estratégicos.',
    icon: IconDecision,
  },
  {
    id: 'transform',
    title: 'Transformación Financiera',
    description: 'Transformamos la información financiera en una herramienta de gestión que permite mejorar procesos internos y fortalecer la planificación.',
    icon: IconTransform,
  },
  {
    id: 'strength',
    title: 'Fortalecimiento Económico',
    description: 'Apoyamos la construcción de estructuras económicas más sólidas, eficientes y preparadas para el crecimiento sostenible.',
    icon: IconStrength,
  },
  {
    id: 'sustainability',
    title: 'Gestión Responsable',
    description: 'Impulsamos una gestión enfocada no solo en resultados, sino también en la sostenibilidad y el impacto a largo plazo.',
    icon: IconSustainability,
  },
  {
    id: 'analysis',
    title: 'Análisis Estratégico',
    description: 'Facilitamos la toma de decisiones estratégicas mediante análisis claros, realistas y adaptados a cada organización.',
    icon: IconAnalysis,
  },
];
