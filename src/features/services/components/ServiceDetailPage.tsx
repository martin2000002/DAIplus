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

  const handleContactClick = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen">
      {/* Hero Section with Background Image - Full bleed, overlays behind navbar */}
      <section className="relative h-[55vh] min-h-[400px] max-h-[500px] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${service.headerImage}')`,
          }}
        />
        
        {/* Gradient Overlay - Always dark enough for white text */}
        <div className="absolute inset-0 bg-linear-to-r from-primary-dark/95 via-primary/85 to-primary-dark/80" />

        <div className="container-custom relative z-10 h-full flex flex-col justify-center pt-20">
          {/* Back Link */}
          <Link 
            href="/#servicios" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white font-medium transition-all font-heading text-sm backdrop-blur-sm w-fit mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Servicios
          </Link>

          <div className="service-hero-content">
            {/* Title Only - forced white color */}
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading leading-tight drop-shadow-lg"
              style={{ color: 'white' }}
            >
              {service.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Description Section - First paragraph below hero */}
      <section className="py-10 md:py-14 bg-white border-b border-gray-100">
        <div className="container-custom">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              {service.fullDescription}
            </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="service-sections py-12 md:py-20 bg-white">
        <div className="container-custom">
          <div className="space-y-16">

            {/* Pillars Section (for cooperativas) */}
            {service.pillars && (
              <div className="service-section">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 font-heading">
                  Nuestros Pilares de Servicio
                </h2>
                <div className="grid gap-6">
                  {service.pillars.map((pillar, index) => (
                    <div 
                      key={index}
                      className="card p-6 md:p-8 border-l-4 border-primary"
                    >
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-bold font-heading">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-primary mb-2 font-heading">
                            {pillar.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {pillar.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {service.philosophy && (
                  <div className="mt-8 p-6 rounded-2xl bg-linear-to-r from-primary/5 to-accent/5 border border-primary/10">
                    <div className="flex items-start gap-4">
                      <Sparkles className="w-6 h-6 text-accent shrink-0 mt-1" />
                      <p className="text-gray-700 italic leading-relaxed">
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
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 font-heading">
                  Áreas de Acompañamiento
                </h2>
                <div className="grid gap-4">
                  {service.bulletPoints.map((point, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-primary/5 transition-colors"
                    >
                      <CheckCircle2 className={`w-6 h-6 shrink-0 ${
                        isAzul ? 'text-primary' : 'text-accent'
                      }`} />
                      <span className="text-gray-700 font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits Section (for programas) */}
            {service.benefits && (
              <div className="service-section">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 font-heading">
                  Áreas de Enfoque
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-4 p-5 rounded-xl bg-accent/5 border border-accent/10"
                    >
                      <div className="w-3 h-3 rounded-full bg-accent" />
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Courses Section (for cursos) */}
            {service.courses && (
              <div className="service-section">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 font-heading">
                  Portafolio de Cursos
                </h2>
                <div className="grid gap-6">
                  {service.courses.map((course) => (
                    <div 
                      key={course.id}
                      className="card p-6 group hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-12 h-12 rounded-xl bg-linear-to-br from-primary to-primary-light flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-primary mb-2 font-heading group-hover:text-accent transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
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
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 font-heading">
                  ¿Interesado en este servicio?
                </h3>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                  Conversemos sobre cómo podemos ayudar a tu organización a alcanzar sus objetivos.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/#contacto"
                    className="btn btn-primary btn-lg group"
                  >
                    Solicitar Información
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/#servicios"
                    className="btn btn-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
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
