import { 
  Target,
  Lightbulb,
  BarChart3,
  Sparkles,
  type LucideIcon
} from 'lucide-react';

export interface Insight {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const insights: Insight[] = [
  {
    id: 'estrategia',
    title: 'Estrategia',
    description: 'Diseñamos y construimos soluciones integrales, personalizadas y orientadas a resultados, fortaleciendo la gestión estratégica, institucional y comercial.',
    icon: Target,
  },
  {
    id: 'innovacion',
    title: 'Innovación',
    description: 'Creamos ventajas competitivas sostenibles y resilientes, basadas en innovación, estrategia y desarrollo del talento humano.',
    icon: Lightbulb,
  },
  {
    id: 'sostenibilidad',
    title: 'Sostenibilidad',
    description: 'Impusamos la integración de criterios ambientales y de sostenibilidad, generando valor económico, social y ambiental simultáneamente.',
    icon: BarChart3,
  },
  {
    id: 'personalizacion',
    title: 'Personalización',
    description: 'Impulsamos la transformación de organizaciones e instituciones financieras mediante consultorías, asesorías y capacitaciones personalizadas.',
    icon: Sparkles,
  },
];
