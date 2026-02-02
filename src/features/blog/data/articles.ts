import { type LucideIcon } from 'lucide-react';
import { 
  FileText,
  TrendingUp,
  Lightbulb,
  Users,
  BarChart3
} from 'lucide-react';

// ============================================
// Types
// ============================================

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  imageUrl?: string;
  icon: LucideIcon;
}

// ============================================
// Sample Articles Data
// ============================================

export const articles: Article[] = [
  {
    id: '1',
    slug: 'decisiones-estrategicas-cooperativas',
    title: 'Decisiones Estratégicas que Transforman Cooperativas',
    excerpt: 'Descubre cómo las cooperativas de ahorro y crédito pueden tomar decisiones más efectivas utilizando metodologías probadas y análisis de datos.',
    category: 'Estrategia',
    author: 'Diego Andrade',
    publishedAt: '2026-01-28',
    readTime: '5 min',
    icon: TrendingUp,
  },
  {
    id: '2',
    slug: 'sostenibilidad-sector-financiero',
    title: 'Sostenibilidad en el Sector Financiero Popular',
    excerpt: 'La integración de criterios ESG en cooperativas no es solo una tendencia, es una necesidad para garantizar la sostenibilidad a largo plazo.',
    category: 'Sostenibilidad',
    author: 'Diego Andrade',
    publishedAt: '2026-01-15',
    readTime: '7 min',
    icon: Lightbulb,
  },
  {
    id: '3',
    slug: 'educacion-financiera-impacto',
    title: 'El Impacto Real de la Educación Financiera',
    excerpt: 'Programas de educación financiera bien diseñados pueden transformar la relación de las personas con el dinero y mejorar su calidad de vida.',
    category: 'Educación',
    author: 'Diego Andrade',
    publishedAt: '2026-01-05',
    readTime: '4 min',
    icon: Users,
  },
  {
    id: '4',
    slug: 'inteligencia-negocios-coac',
    title: 'Inteligencia de Negocios para COACs',
    excerpt: 'Cómo utilizar datos e indicadores para mejorar la toma de decisiones en cooperativas de ahorro y crédito.',
    category: 'Tecnología',
    author: 'Diego Andrade',
    publishedAt: '2025-12-20',
    readTime: '6 min',
    icon: BarChart3,
  },
];

// ============================================
// Helpers
// ============================================

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug);
}

export function getRecentArticles(count: number = 3): Article[] {
  return articles.slice(0, count);
}
