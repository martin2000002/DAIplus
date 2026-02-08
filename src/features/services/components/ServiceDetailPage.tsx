'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen, Sparkles, Users, Building2, GraduationCap, Rocket } from 'lucide-react';
import { type Service } from '../data/services';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Map icon names to components
const iconMap = {
  Users,
  Building2,
  GraduationCap,
  Rocket,
  BookOpen,
};

interface ServiceDetailPageProps {
  service: Service;
}

export function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const Icon = iconMap[service.iconName];
  const isAzul = service.accent === 'azul';

  useGSAP(() => {
    if (!pageRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.service-hero-content > *',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }
    );

    // Animate sections on scroll
    gsap.fromTo('.service-section',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.service-sections',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

  }, { scope: pageRef });

  return (
    <div ref={pageRef} className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative h-[50vh] min-h-96 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${service.headerImage}')`,
          }}
        />
        
        {/* Dark overlay - ensures title readability */}
        <div className="absolute inset-0 bg-linear-to-t from-primary-dark/95 via-primary-dark/70 to-primary/40" />

        <div className="container-custom relative z-10 h-full flex flex-col pb-20 pt-32">
          {/* Back Link */}
          <Link 
            href="/#servicios" 
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-sm font-medium transition-all font-heading w-fit mb-5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver a Servicios
          </Link>

          <div className="service-hero-content mt-auto">
            <h1 className="heading-lg font-bold font-heading text-white max-w-3xl">
              {service.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="section section-light py-8 md:py-12 border-b border-gray-100">
        <div className="container-custom">
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            {service.fullDescription}
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="service-sections section section-light py-10 md:py-16">
        <div className="container-custom">
          <div className="space-y-12">

            {/* Pillars Section (for cooperativas) */}
            {service.pillars && (
              <div className="service-section">
                <h2 className="heading-md text-primary mb-6 font-heading">
                  Nuestros Pilares de Servicio
                </h2>
                <div className="grid gap-4">
                  {service.pillars.map((pillar, index) => (
                    <div 
                      key={index}
                      className="card p-5 md:p-6 border-l-4 border-primary"
                    >
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm text-primary font-bold font-heading">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-primary mb-1.5 font-heading">
                            {pillar.title}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {pillar.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {service.philosophy && (
                  <div className="mt-6 p-5 rounded-xl bg-linear-to-r from-primary/5 to-accent/5 border border-primary/10">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700 italic leading-relaxed">
                        {service.philosophy}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bullet Points Section (for empresas, personas) */}
            {service.bulletPoints && (
              <div className="service-section">
                <h2 className="heading-md text-primary mb-6 font-heading">
                  Áreas de Acompañamiento
                </h2>
                <div className="grid gap-3">
                  {service.bulletPoints.map((point, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-primary/[0.03] border border-primary/[0.06] hover:bg-primary/[0.06] transition-colors"
                    >
                      <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${
                        isAzul ? 'text-primary' : 'text-accent'
                      }`} />
                      <span className="text-sm text-gray-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits Section (for programas) */}
            {service.benefits && (
              <div className="service-section">
                <h2 className="heading-md text-primary mb-6 font-heading">
                  Áreas de Enfoque
                </h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {service.benefits.map((benefit, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-xl bg-accent/5 border border-accent/10"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-accent shrink-0" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Courses Section (for cursos) */}
            {service.courses && (
              <div className="service-section">
                <h2 className="heading-md text-primary mb-6 font-heading">
                  Portafolio de Cursos
                </h2>
                <div className="grid gap-4">
                  {service.courses.map((course) => (
                    <div 
                      key={course.id}
                      className="card p-5 group hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 w-10 h-10 rounded-xl bg-linear-to-br from-primary to-primary-light flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-primary mb-1 font-heading group-hover:text-accent transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {course.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="service-section pt-8 border-t border-gray-100">
              <div className="text-center">
                <h3 className="text-lg md:text-xl font-bold text-primary mb-3 font-heading">
                  ¿Interesado en este servicio?
                </h3>
                <p className="text-sm text-gray-600 mb-6 max-w-lg mx-auto">
                  Conversemos sobre cómo podemos ayudar a tu organización a alcanzar sus objetivos.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/#contacto"
                    className="btn btn-primary btn-md group"
                  >
                    Solicitar Información
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/#servicios"
                    className="btn btn-md bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    Ver otros servicios
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
