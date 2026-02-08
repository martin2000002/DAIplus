'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Linkedin } from 'lucide-react';
import { teamMembers } from '../data/team';
import { cn } from '@/src/lib/utils';
import { CoverflowCarousel } from '@/src/shared/components/ui/CoverflowCarousel';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Entrance animations
  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      '.team-header > *',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      },
    );

    gsap.fromTo(
      '.team-carousel-wrapper',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.7,
        scrollTrigger: {
          trigger: '.team-carousel-wrapper',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      },
    );

    // Rotate dashed rings infinitely
    gsap.to('.photo-ring-spin', {
      rotation: 360,
      duration: 35,
      repeat: -1,
      ease: 'none',
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="section section-dark py-20 md:py-28"
    >
      {/* Decorative */}
      <div className="circle-deco circle-deco-accent w-100 h-100 -top-48 -left-48 opacity-10" />
      <div className="circle-deco circle-deco-primary w-96 h-96 bottom-0 -right-32 opacity-10" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="team-header text-center mb-14 md:mb-16">
          <span className="inline-block px-5 py-2 mb-5 text-sm font-semibold text-accent bg-accent/20 rounded-full font-heading">
            Quiénes Somos
          </span>

          <h2 className="heading-lg text-white mb-5 font-heading">
            Nuestro Equipo
          </h2>

          <p className="text-body-lg text-white/70 max-w-2xl mx-auto">
            Acompañamos a cooperativas de ahorro y crédito, organizaciones y personas a fortalecer su forma de pensar, decidir y actuar, integrando estrategia, innovación y sostenibilidad para generar impacto real y duradero.
          </p>
        </div>

        {/* Carousel */}
        <div className="team-carousel-wrapper">
          <CoverflowCarousel
            items={teamMembers}
            keyExtractor={(m) => m.id}
            autoplayInterval={4}
            dotVariant="light"
            ariaLabel="Carrusel del equipo"
            renderItem={(member) => (
              <div className="w-80 md:w-88 bg-white rounded-2xl p-6 md:p-7 text-center shadow-card">
                {/* Avatar with ring */}
                <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto mb-4">
                  <svg
                    className="photo-ring-spin absolute inset-0 w-full h-full"
                    viewBox="0 0 100 100"
                    style={{ opacity: 0.4 }}
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      fill="none"
                      stroke={member.accentColor === 'accent' ? 'rgba(245,166,35,0.4)' : 'rgba(31,79,115,0.3)'}
                      strokeWidth="1.5"
                      strokeDasharray="12 8"
                      strokeLinecap="round"
                    />
                  </svg>

                  <div className="absolute inset-2.5 md:inset-3 rounded-full overflow-hidden border-3 border-white shadow-lg bg-linear-to-br from-primary-light to-primary flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-bold text-white/90 font-heading select-none">
                      {member.initials}
                    </span>
                  </div>

                  <div
                    className={cn(
                      'absolute -top-1 -right-0.5 w-3.5 h-3.5 rounded-full shadow-sm',
                      member.accentColor === 'accent' ? 'bg-accent' : 'bg-primary-light',
                    )}
                  />

                  <div
                    className={cn(
                      'absolute -bottom-1 -left-0.5 w-2.5 h-2.5 rounded-full shadow-sm',
                      member.accentColor === 'accent' ? 'bg-primary-light' : 'bg-accent',
                    )}
                  />
                </div>

                {/* Info */}
                <h3 className="text-lg font-bold text-primary font-heading mb-1">
                  {member.name}
                </h3>

                <p
                  className={cn(
                    'text-sm font-semibold mb-3 font-heading',
                    member.accentColor === 'accent' ? 'text-accent' : 'text-primary-light',
                  )}
                >
                  {member.role}
                </p>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {member.shortBio}
                </p>

                {/* LinkedIn pill */}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all font-heading',
                    member.accentColor === 'accent'
                      ? 'bg-accent/10 text-accent hover:bg-accent/20'
                      : 'bg-primary/10 text-primary hover:bg-primary/20',
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
              </div>
            )}
          />
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link href="/equipo" className="btn btn-primary btn-lg group">
            Conoce al equipo
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
