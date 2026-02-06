import { EventDetailPage } from '@/src/features/events/components/EventDetailPage';
import { getEventBySlug, getAllEventSlugs } from '@/src/features/events/data/events';
import { Header } from '@/src/features/header';
import { Footer } from '@/src/features/footer';
import { notFound } from 'next/navigation';

// Genera todas las rutas estáticas en build time
export function generateStaticParams() {
  return getAllEventSlugs().map((slug) => ({
    slug,
  }));
}

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <EventDetailPage event={event} />
      </main>
      <Footer />
    </>
  );
}
