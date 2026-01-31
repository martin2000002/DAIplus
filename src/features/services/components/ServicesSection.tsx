'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { services } from '../data/services';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Header animation
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    headerTl.fromTo('.services-badge',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    )
    .fromTo('.services-title',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.2'
    )
    .fromTo('.services-subtitle',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.3'
    );

    // Cards animation
    gsap.fromTo('.service-card',
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // CTA animation
    gsap.fromTo('.services-cta',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: '.services-cta',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );

  }, { scope: sectionRef });

  // GSAP hover animation handler
  const handleCardHover = (index: number, isEntering: boolean) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      scale: isEntering ? 1.03 : 1,
      y: isEntering ? -8 : 0,
      boxShadow: isEntering 
        ? '0 20px 40px -10px rgba(31, 79, 115, 0.25)' 
        : '0 4px 20px -2px rgba(31, 79, 115, 0.12)',
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleContactClick = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get bullet points for each service (use bulletPoints, benefits, or first 3 pillar titles)
  const getServiceBullets = (service: typeof services[0]): string[] => {
    if (service.bulletPoints) return service.bulletPoints.slice(0, 3);
    if (service.benefits) return service.benefits.slice(0, 3);
    if (service.pillars) return service.pillars.slice(0, 3).map(p => p.title);
    if (service.courses) return service.courses.slice(0, 3).map(c => c.title);
    return [];
  };

  return (
    <section 
      ref={sectionRef}
      id="servicios" 
      className="section py-20 md:py-28 bg-amarillo-bg"
    >
      {/* Decorative Elements */}
      <div className="circle-deco circle-deco-accent w-[500px] h-[500px] top-1/4 -right-64 opacity-30" />
      <div className="circle-deco circle-deco-primary w-80 h-80 bottom-20 -left-40 opacity-20" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-20">
          <span className="services-badge inline-block px-5 py-2 mb-5 text-sm font-semibold text-azul bg-azul/15 rounded-full font-heading">
            Lo Que Hacemos
          </span>
          
          <h2 className="services-title heading-lg text-azul mb-5 font-heading">
            Nuestros Servicios
          </h2>
          
          <p className="services-subtitle text-body-lg text-azul-dark/80 max-w-2xl mx-auto">
            Servicios integrales adaptados a la realidad de cada organización, 
            desde cooperativas hasta personas naturales.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isAzul = service.accent === 'azul';
            const bullets = getServiceBullets(service);
            
            return (
              <Link 
                key={service.id}
                href={`/servicios/${service.slug}`}
                ref={el => { cardsRef.current[index] = el; }}
                onMouseEnter={() => handleCardHover(index, true)}
                onMouseLeave={() => handleCardHover(index, false)}
                className="service-card card overflow-hidden group cursor-pointer block bg-white"
              >
                {/* Top accent bar */}
                <div className={`h-1.5 w-full ${
                  isAzul 
                    ? 'bg-gradient-to-r from-azul to-azul-light'
                    : 'bg-gradient-to-r from-naranja to-naranja-light'
                }`} />
                
                <div className="p-6 md:p-7">
                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                      isAzul 
                        ? 'bg-azul/10 text-azul'
                        : 'bg-naranja/10 text-naranja'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <span className={`text-xs font-bold uppercase tracking-wider ${
                        isAzul ? 'text-azul-light' : 'text-naranja'
                      } font-heading`}>
                        {service.subtitle}
                      </span>
                      <h3 className="text-lg font-bold text-azul mt-1 font-heading leading-tight">
                        {service.shortTitle}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-5 leading-relaxed text-sm line-clamp-3">
                    {service.description}
                  </p>

                  {/* Benefits / Bullet Points */}
                  <ul className="space-y-2 mb-5">
                    {bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          isAzul ? 'text-azul' : 'text-naranja'
                        }`} />
                        <span className="line-clamp-1">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* View More Link */}
                  <div className={`flex items-center gap-2 text-sm font-semibold font-heading transition-colors ${
                    isAzul 
                      ? 'text-azul group-hover:text-azul-light' 
                      : 'text-naranja group-hover:text-naranja-dark'
                  }`}>
                    Ver más
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Hover overlay */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none ${
                  isAzul 
                    ? 'bg-gradient-to-br from-azul to-transparent'
                    : 'bg-gradient-to-br from-naranja to-transparent'
                }`} />
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="services-cta mt-14 md:mt-20 text-center">
          <p className="text-azul-dark/80 mb-6">
            ¿No encuentras lo que buscas? Contáctanos para una solución personalizada.
          </p>
          <button
            onClick={handleContactClick}
            className="btn btn-secondary btn-lg group"
          >
            Solicitar Información
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
