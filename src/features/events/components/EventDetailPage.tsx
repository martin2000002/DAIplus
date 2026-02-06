'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  MapPin,
} from 'lucide-react';
import { type Event, categoryConfig, formatEventDate, isUpcoming } from '../data/events';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface EventDetailPageProps {
  event: Event;
}

export function EventDetailPage({ event }: EventDetailPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);

  const config = categoryConfig[event.category];
  const upcoming = isUpcoming(event.date);

  useGSAP(() => {
    if (!pageRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      '.event-hero-content > *',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }
    );

    gsap.fromTo(
      '.event-body > *',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.event-body',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, { scope: pageRef });

  return (
    <div ref={pageRef} className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-96 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 img-overlay" />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-primary-dark/95 via-primary-dark/60 to-primary/30" />

        <div className="container-custom relative z-10 h-full flex flex-col pb-20 pt-32">
          {/* Back Link */}
          <Link
            href="/eventos"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-sm font-medium transition-all font-heading w-fit mb-5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver a Eventos
          </Link>

          <div className="event-hero-content mt-auto">
            {/* Title */}
            <h1 className="heading-lg font-bold font-heading text-white max-w-3xl mb-5">
              {event.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatEventDate(event.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {event.location}
              </span>
              <span className="px-3 py-1 text-xs font-bold text-white bg-white/15 rounded-full font-heading">
                {config?.label ?? event.category}
              </span>
              {upcoming ? (
                <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-white bg-accent rounded-full font-heading">
                  <Calendar className="w-3.5 h-3.5" />
                  Próximamente
                </span>
              ) : (
                <span className="px-3 py-1 text-xs font-bold text-white/90 bg-primary-dark/60 rounded-full font-heading">
                  Realizado
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content — same width as services (full container, no max-w-3xl) */}
      <section className="py-8 md:py-12 bg-white border-b border-gray-100">
        <div className="container-custom">
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            {event.fullDescription}
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-white">
        <div className="container-custom">
          {/* Body paragraphs */}
          <div className="event-body space-y-6">
            {event.content.map((paragraph, index) => (
              <p
                key={index}
                className="text-base text-gray-700 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* CTA */}
          {upcoming ? (
            <div className="mt-14 pt-8 border-t border-gray-100 text-center">
              <h3 className="text-lg md:text-xl font-bold text-primary mb-3 font-heading">
                ¿Interesado en este evento?
              </h3>
              <p className="text-sm text-gray-600 mb-6 max-w-lg mx-auto">
                Contáctanos para reservar tu lugar o conoce más sobre nuestros
                próximos eventos y capacitaciones.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/#contacto"
                  className="btn btn-primary btn-md group"
                >
                  Reservar Lugar
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/eventos"
                  className="btn btn-md bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  Ver más eventos
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-14 pt-8 border-t border-gray-100 text-center">
              <h3 className="text-lg md:text-xl font-bold text-primary mb-3 font-heading">
                Este evento ya se realizó
              </h3>
              <p className="text-sm text-gray-600 mb-6 max-w-lg mx-auto">
                Explora nuestros próximos eventos y capacitaciones para
                encontrar el que mejor se adapte a tus necesidades.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/eventos"
                  className="btn btn-primary btn-md group"
                >
                  Ver próximos eventos
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/#contacto"
                  className="btn btn-md bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  Contactar
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
