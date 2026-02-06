import { NewsletterDetailPage } from '@/src/features/newsletter/components/NewsletterDetailPage';
import {
  getNewsletterBySlug,
  getAllNewsletterSlugs,
} from '@/src/features/newsletter/data/newsletters';
import { Header } from '@/src/features/header';
import { Footer } from '@/src/features/footer';
import { notFound } from 'next/navigation';

// Genera todas las rutas estáticas en build time
export function generateStaticParams() {
  return getAllNewsletterSlugs().map((slug) => ({
    slug,
  }));
}

interface BibliotecaSlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BibliotecaSlugPage({
  params,
}: BibliotecaSlugPageProps) {
  const { slug } = await params;
  const newsletter = getNewsletterBySlug(slug);

  if (!newsletter) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <NewsletterDetailPage newsletter={newsletter} />
      </main>
      <Footer />
    </>
  );
}
