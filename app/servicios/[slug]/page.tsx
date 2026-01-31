'use client';

import { use } from 'react';
import { ServiceDetailPage } from '@/src/features/services/components/ServiceDetailPage';
import { getServiceBySlug } from '@/src/features/services/data/services';
import { Header } from '@/src/features/header';
import { Footer } from '@/src/features/footer';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ServicePage({ params }: ServicePageProps) {
  const { slug } = use(params);
  const service = getServiceBySlug(slug);

  // Handle not found case
  if (!service) {
    return (
      <>
        <Header forceScrolled />
        <main className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-azul mb-4 font-heading">
              Servicio no encontrado
            </h1>
            <p className="text-gray-600 mb-8">
              El servicio que buscas no existe.
            </p>
            <a 
              href="/#servicios" 
              className="btn btn-primary btn-md"
            >
              Ver todos los servicios
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header forceScrolled />
      <main className="pt-16">
        <ServiceDetailPage service={service} />
      </main>
      <Footer />
    </>
  );
}
