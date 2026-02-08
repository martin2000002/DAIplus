'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowLeft, Linkedin } from 'lucide-react';
import { Header } from '@/src/features/header';
import { Footer } from '@/src/features/footer';
import { teamMembers } from '@/src/features/team';
import { cn } from '@/src/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EquipoPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!pageRef.current) return;

    gsap.fromTo(
      '.equipo-hero-content > *',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }
    );

    gsap.fromTo(
      '.equipo-member',
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.equipo-list',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Spin all dashed rings (slow)
    gsap.to('.member-ring-spin', {
      rotation: 360,
      duration: 35,
      repeat: -1,
      ease: 'none',
    });
  }, { scope: pageRef });

  return (
    <>
      <Header />
      <main ref={pageRef} className="min-h-screen">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-96 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
              alt="Equipo DAI+"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>

          {/* Brand overlay */}
          <div className="absolute inset-0 img-overlay" />

          {/* Dark gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-primary-dark/95 via-primary-dark/60 to-primary/30" />

          <div className="container-custom relative z-10 h-full flex flex-col pb-20 pt-32">
            <Link
              href="/#nosotros"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-sm font-medium transition-all font-heading w-fit mb-5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Volver al Inicio
            </Link>

            <div className="equipo-hero-content mt-auto">
              <h1 className="heading-lg font-bold font-heading text-white max-w-3xl mb-5">
                Nuestro Equipo
              </h1>

              <p className="text-white/70 text-sm max-w-2xl">
                Profesionales comprometidos con la transformación de
                organizaciones a través de soluciones estratégicas, innovadoras
                y personalizadas.
              </p>
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="section section-light py-14 md:py-20">
          <div className="container-custom">
            <div className="equipo-list space-y-16 md:space-y-20">
              {teamMembers.map((member, index) => {
                const isEven = index % 2 === 0;

                return (
                  <article
                    key={member.id}
                    className="equipo-member"
                  >
                    <div
                      className={cn(
                        'flex flex-col items-center gap-8 md:gap-12',
                        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                      )}
                    >
                      {/* Avatar + Ring */}
                      <div className="relative w-44 h-44 md:w-52 md:h-52 shrink-0">
                        {/* SVG dashed ring */}
                        <svg
                          className="member-ring-spin absolute inset-0 w-full h-full"
                          viewBox="0 0 100 100"
                          style={{ opacity: 0.4 }}
                        >
                          <circle
                            cx="50"
                            cy="50"
                            r="48"
                            fill="none"
                            stroke={member.accentColor === 'accent' ? 'rgba(245,166,35,0.4)' : 'rgba(31,79,115,0.3)'}
                            strokeWidth="1.2"
                            strokeDasharray="12 8"
                            strokeLinecap="round"
                          />
                        </svg>

                        {/* Initials avatar */}
                        <div className="absolute inset-4 md:inset-5 rounded-full overflow-hidden border-4 border-white shadow-lg bg-linear-to-br from-primary-light to-primary flex items-center justify-center">
                          <span className="text-5xl md:text-6xl font-bold text-white/90 font-heading select-none">
                            {member.initials}
                          </span>
                        </div>

                        {/* Top-right dot */}
                        <div
                          className={cn(
                            'absolute -top-1 -right-1 w-5 h-5 rounded-full shadow-sm',
                            member.accentColor === 'accent'
                              ? 'bg-accent'
                              : 'bg-primary-light'
                          )}
                        />

                        {/* Bottom-left dot */}
                        <div
                          className={cn(
                            'absolute -bottom-1 -left-1 w-3.5 h-3.5 rounded-full shadow-sm',
                            member.accentColor === 'accent'
                              ? 'bg-primary-light'
                              : 'bg-accent'
                          )}
                        />
                      </div>

                      {/* Info */}
                      <div className={cn(
                        'text-center md:text-left flex-1',
                        !isEven && 'md:text-right'
                      )}>
                        <h2 className="text-2xl md:text-3xl font-bold text-primary font-heading mb-1">
                          {member.name}
                        </h2>

                        <p
                          className={cn(
                            'text-base font-semibold mb-4 font-heading',
                            member.accentColor === 'accent'
                              ? 'text-accent'
                              : 'text-primary-light'
                          )}
                        >
                          {member.role}
                        </p>

                        <div className="space-y-3 mb-5">
                          {member.fullBio.map((paragraph, i) => (
                            <p
                              key={i}
                              className="text-gray-600 leading-relaxed text-sm md:text-base"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>

                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            'inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-semibold text-sm transition-all font-heading hover:scale-105',
                            member.accentColor === 'accent'
                              ? 'bg-accent hover:bg-accent-dark'
                              : 'bg-primary hover:bg-primary-dark'
                          )}
                        >
                          <Linkedin className="w-4 h-4" />
                          Conectar en LinkedIn
                        </a>
                      </div>
                    </div>

                    {/* Separator */}
                    {index < teamMembers.length - 1 && (
                      <div className="mt-16 md:mt-20 mx-auto w-24 h-px bg-gray-200" />
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
