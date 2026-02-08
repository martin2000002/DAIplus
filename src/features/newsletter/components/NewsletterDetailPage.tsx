'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { type Newsletter } from '../data/newsletters';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface NewsletterDetailPageProps {
  newsletter: Newsletter;
}

export function NewsletterDetailPage({ newsletter }: NewsletterDetailPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-EC', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  useGSAP(() => {
    if (!pageRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      '.newsletter-hero-content > *',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }
    );

    gsap.fromTo(
      '.newsletter-body > *',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.newsletter-body',
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
          {newsletter.imageUrl ? (
            <>
              <Image
                src={newsletter.imageUrl}
                alt={newsletter.title}
                fill
                className="object-cover"
                priority
                unoptimized
              />
              <div className="absolute inset-0 img-overlay" />
            </>
          ) : (
            <div className="absolute inset-0 bg-primary" />
          )}
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-primary-dark/95 via-primary-dark/60 to-primary/30" />

        <div className="container-custom relative z-10 h-full flex flex-col pb-20 pt-32">
          {/* Back Link */}
          <Link
            href="/biblioteca"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-sm font-medium transition-all font-heading w-fit mb-5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver a Biblioteca
          </Link>

          <div className="newsletter-hero-content mt-auto">
            {/* Title */}
            <h1 className="heading-lg font-bold font-heading text-white max-w-3xl mb-5">
              {newsletter.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {newsletter.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(newsletter.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {newsletter.readTime} de lectura
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-light py-8 md:py-12 border-b border-gray-100">
        <div className="container-custom">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium border-l-4 border-accent pl-6">
              {newsletter.excerpt}
            </p>
        </div>
      </section>

      {/* Content */}
      <section className="section section-light py-10 md:py-16">
        <div className="container-custom">
            {/* Body paragraphs */}
            <div className="newsletter-body space-y-6">
              {newsletter.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base text-gray-700 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-14 pt-8 border-t border-gray-100 text-center">
              <h3 className="text-lg md:text-xl font-bold text-primary mb-3 font-heading">
                ¿Te resultó útil este contenido?
              </h3>
              <p className="text-sm text-gray-600 mb-6 max-w-lg mx-auto">
                Explora más recursos o contáctanos para conversar sobre cómo
                podemos ayudar a tu organización.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/biblioteca"
                  className="btn btn-primary btn-md group"
                >
                  Ver más publicaciones
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                </Link>
                <Link
                  href="/#contacto"
                  className="btn btn-md bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  Contactar
                </Link>
              </div>
            </div>
        </div>
      </section>
    </div>
  );
}
