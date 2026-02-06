'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
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

    const image = card.querySelector('.service-image');

    gsap.to(card, {
      scale: isEntering ? 1.02 : 1,
      y: isEntering ? -6 : 0,
      boxShadow: isEntering 
        ? '0 20px 40px -10px rgba(31, 79, 115, 0.25)' 
        : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      duration: 0.3,
      ease: 'power2.out'
    });

    if (image) {
      gsap.to(image, {
        scale: isEntering ? 1.08 : 1,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  };

  const handleContactClick = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="servicios" 
      className="section section-dark py-20 md:py-28"
    >
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-5 py-2 mb-5 text-sm font-semibold text-accent bg-accent/20 rounded-full font-heading">
            Lo Que Hacemos
          </span>
          
          <h2 className="services-title heading-lg text-white mb-5 font-heading">
            Nuestros Servicios
          </h2>
          
          <p className="services-subtitle text-body-lg text-white/70 max-w-2xl mx-auto">
            Servicios integrales adaptados a la realidad de cada cliente, desde cooperativas y organizaciones hasta personas naturales.
          </p>
        </div>

        {/* Services Grid - Top row 3, bottom row 2 centered */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.slice(0, 3).map((service, index) => (
              <Link 
                key={service.id}
                href={`/servicios/${service.slug}`}
                ref={el => { cardsRef.current[index] = el; }}
                onMouseEnter={() => handleCardHover(index, true)}
                onMouseLeave={() => handleCardHover(index, false)}
                className="service-card flex flex-col overflow-hidden rounded-2xl group cursor-pointer bg-white shadow-sm transition-shadow"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={service.headerImage}
                    alt={service.shortTitle}
                    fill
                    className="service-image object-cover transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                  {/* Brand overlay */}
                  <div className="absolute inset-0 img-overlay" />
                  {/* Accent badge on image */}
                  <span className="absolute bottom-3 left-4 px-3 py-1.5 text-xs font-bold text-white bg-black/30 backdrop-blur-sm rounded-full font-heading">
                    {service.subtitle}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="text-base font-bold text-primary mb-2 font-heading leading-snug">
                    {service.shortTitle}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-sm line-clamp-3 mb-4">
                    {service.description}
                  </p>

                  {/* View More - Always at bottom */}
                  <div className="flex items-center gap-2 text-sm font-semibold font-heading mt-auto text-accent group-hover:text-accent-light transition-colors">
                    Ver más
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
          ))}
        </div>

        {/* Second row - 2 cards centered */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 mt-5 lg:mt-6 max-w-4xl mx-auto">
          {services.slice(3).map((service, index) => {
            const realIndex = index + 3;
            
            return (
              <Link 
                key={service.id}
                href={`/servicios/${service.slug}`}
                ref={el => { cardsRef.current[realIndex] = el; }}
                onMouseEnter={() => handleCardHover(realIndex, true)}
                onMouseLeave={() => handleCardHover(realIndex, false)}
                className="service-card flex flex-col overflow-hidden rounded-2xl group cursor-pointer bg-white shadow-sm transition-shadow"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={service.headerImage}
                    alt={service.shortTitle}
                    fill
                    className="service-image object-cover transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                  {/* Brand overlay */}
                  <div className="absolute inset-0 img-overlay" />
                  <span className="absolute bottom-3 left-4 px-3 py-1.5 text-xs font-bold text-white bg-black/30 backdrop-blur-sm rounded-full font-heading">
                    {service.subtitle}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="text-base font-bold text-primary mb-2 font-heading leading-snug">
                    {service.shortTitle}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-sm line-clamp-3 mb-4">
                    {service.description}
                  </p>

                  {/* View More - Always at bottom */}
                  <div className="flex items-center gap-2 text-sm font-semibold font-heading mt-auto text-accent group-hover:text-accent-light transition-colors">
                    Ver más
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="services-cta mt-12 md:mt-16 text-center">
          <p className="text-white/60 mb-6">
            ¿No encuentras lo que buscas? Contáctanos para una solución personalizada.
          </p>
          <button
            onClick={handleContactClick}
            className="btn btn-primary btn-lg group"
          >
            Solicitar Información
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
