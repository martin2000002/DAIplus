import { ServiceDetailPage } from '@/src/features/services/components/ServiceDetailPage';
import { getServiceBySlug, getAllServiceSlugs } from '@/src/features/services/data/services';
import { Header } from '@/src/features/header';
import { Footer } from '@/src/features/footer';
import { notFound } from 'next/navigation';

// Genera todas las rutas estáticas en build time
export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({
    slug,
  }));
}

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  // Handle not found case
  if (!service) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <ServiceDetailPage service={service} />
      </main>
      <Footer />
    </>
  );
}
