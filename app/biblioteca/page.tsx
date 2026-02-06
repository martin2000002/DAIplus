'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/src/features/header';
import { Footer } from '@/src/features/footer';
import { NewsletterCard } from '@/src/features/newsletter';
import { newsletters } from '@/src/features/newsletter';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BibliotecaPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!pageRef.current) return;

    gsap.fromTo(
      '.biblioteca-hero-content > *',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }
    );

    gsap.fromTo(
      '.biblioteca-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.biblioteca-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, { scope: pageRef });

  return (
    <>
      <Header />
      <main ref={pageRef} className="min-h-screen">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-96 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1920&q=80"
              alt="Biblioteca DAI+"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>

          {/* Brand overlay */}
          <div className="absolute inset-0 img-overlay" />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-primary-dark/95 via-primary-dark/60 to-primary/30" />

          <div className="container-custom relative z-10 h-full flex flex-col pb-20 pt-32">
            {/* Back Link */}
            <Link
              href="/#biblioteca"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-sm font-medium transition-all font-heading w-fit mb-5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Volver al Inicio
            </Link>

            <div className="biblioteca-hero-content mt-auto">
              <h1 className="heading-lg font-bold font-heading text-white max-w-3xl mb-5">
                Biblioteca
              </h1>

              <p className="text-white/70 text-sm max-w-2xl">
                Todas nuestras publicaciones, análisis y recursos para
                organizaciones que buscan crecer de manera estratégica y sostenible.
              </p>
            </div>
          </div>
        </section>

        {/* All Newsletters */}
        <section className="py-14 md:py-20 bg-gray-50">
          <div className="container-custom">
            <div className="biblioteca-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsletters.map((newsletter) => (
                <div key={newsletter.id} className="biblioteca-card md:h-92">
                  <NewsletterCard
                    newsletter={newsletter}
                  />
                </div>
              ))}
            </div>

            {newsletters.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">
                  Aún no hay publicaciones disponibles.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
