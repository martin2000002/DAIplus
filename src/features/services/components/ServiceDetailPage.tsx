'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen, Sparkles } from 'lucide-react';
import { type Service } from '../data/services';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceDetailPageProps {
  service: Service;
}

export function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const Icon = service.icon;
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
      {/* Hero Section */}
      <section className={`relative py-24 md:py-32 ${
        isAzul ? 'bg-gradient-to-br from-azul-dark via-azul to-azul-light' : 'bg-gradient-to-br from-naranja-dark via-naranja to-naranja-light'
      }`}>
        {/* Decorative Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        <div className="container-custom relative z-10">
          {/* Back Link */}
          <Link 
            href="/#servicios" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white font-medium mb-8 transition-all font-heading text-sm backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Servicios
          </Link>

          <div className="service-hero-content max-w-4xl">
            {/* Icon */}
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
              isAzul ? 'bg-white/20' : 'bg-white/20'
            }`}>
              <Icon className="w-8 h-8 text-white" />
            </div>

            {/* Subtitle */}
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-white/90 bg-white/10 rounded-full font-heading">
              {service.subtitle}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-heading leading-tight">
              {service.title}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl">
              {service.fullDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="service-sections py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-16">

            {/* Pillars Section (for cooperativas) */}
            {service.pillars && (
              <div className="service-section">
                <h2 className="text-2xl md:text-3xl font-bold text-azul mb-8 font-heading">
                  Nuestros Pilares de Servicio
                </h2>
                <div className="grid gap-6">
                  {service.pillars.map((pillar, index) => (
                    <div 
                      key={index}
                      className="card p-6 md:p-8 border-l-4 border-azul"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-azul/10 flex items-center justify-center">
                          <span className="text-azul font-bold font-heading">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-azul mb-2 font-heading">
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
                  <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-azul/5 to-naranja/5 border border-azul/10">
                    <div className="flex items-start gap-4">
                      <Sparkles className="w-6 h-6 text-naranja flex-shrink-0 mt-1" />
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
                <h2 className="text-2xl md:text-3xl font-bold text-azul mb-8 font-heading">
                  Áreas de Acompañamiento
                </h2>
                <div className="grid gap-4">
                  {service.bulletPoints.map((point, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-azul/5 transition-colors"
                    >
                      <CheckCircle2 className={`w-6 h-6 flex-shrink-0 ${
                        isAzul ? 'text-azul' : 'text-naranja'
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
                <h2 className="text-2xl md:text-3xl font-bold text-azul mb-8 font-heading">
                  Áreas de Enfoque
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-4 p-5 rounded-xl bg-naranja/5 border border-naranja/10"
                    >
                      <div className="w-3 h-3 rounded-full bg-naranja" />
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Courses Section (for cursos) */}
            {service.courses && (
              <div className="service-section">
                <h2 className="text-2xl md:text-3xl font-bold text-azul mb-8 font-heading">
                  Portafolio de Cursos
                </h2>
                <div className="grid gap-6">
                  {service.courses.map((course) => (
                    <div 
                      key={course.id}
                      className="card p-6 group hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-azul to-azul-light flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-azul mb-2 font-heading group-hover:text-naranja transition-colors">
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
                <h3 className="text-xl md:text-2xl font-bold text-azul mb-4 font-heading">
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
                    className="btn btn-lg bg-azul/10 text-azul hover:bg-azul hover:text-white transition-colors"
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
