'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Quote, Star } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    id: '1',
    name: 'María García',
    role: 'Gerente General',
    organization: 'Cooperativa de Ahorro del Sur',
    content: 'El acompañamiento de DAI+ nos permitió reestructurar completamente nuestra planificación financiera. Ahora tomamos decisiones con información clara y proyecciones realistas.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Carlos Mendoza',
    role: 'Director Financiero',
    organization: 'Empresa Industrial ABC',
    content: 'La consultoría financiera transformó nuestra forma de gestionar los recursos. Logramos mejorar nuestra rentabilidad en un 25% en el primer año.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Ana Lucía Pérez',
    role: 'Emprendedora',
    organization: 'Startup de Tecnología',
    content: 'Diego nos ayudó a ordenar nuestras finanzas desde cero. Su enfoque práctico y cercano hizo toda la diferencia para nuestro emprendimiento.',
    rating: 5,
  },
];

// Placeholder logos
const logos = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: `Cliente ${i + 1}`,
}));

export function SocialProofSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Header animation
    gsap.fromTo('.social-header > *',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Testimonials animation
    gsap.fromTo('.testimonial-card',
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.testimonials-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      id="respaldo" 
      className="section py-20 md:py-28 bg-white"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="social-header text-center mb-12 md:mb-16">
          <span className="inline-block px-5 py-2 mb-5 text-sm font-semibold text-accent bg-accent/10 rounded-full font-heading">
            Resultados Comprobados
          </span>
          
          <h2 className="heading-lg text-primary mb-5 font-heading">
            Organizaciones que Confían en Nosotros
          </h2>
        </div>

        {/* Logo Slider */}
        <div className="w-full overflow-hidden py-8 mb-16">
          <div className="relative">
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-linear-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-linear-to-l from-white to-transparent z-10" />
            
            {/* Scrolling container */}
            <div className="logo-slider-track">
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={`${logo.id}-${index}`}
                  className="shrink-0 mx-6 md:mx-10"
                >
                  <div className="w-32 h-20 md:w-40 md:h-24 flex items-center justify-center rounded-xl bg-white shadow-sm border border-gray-100 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer">
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm font-heading"
                        style={{ backgroundColor: `hsl(${(logo.id * 60) % 360}, 50%, 45%)` }}
                      >
                        {logo.name.charAt(0)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Header */}
        <h3 className="heading-md text-center text-primary mb-10 md:mb-14 font-heading">
          Lo Que Dicen de Nosotros
        </h3>
        
        {/* Testimonials Grid */}
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="testimonial-card card p-7 md:p-8 relative"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 left-7">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-lg">
                  <Quote className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5 pt-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating 
                        ? 'text-accent fill-accent' 
                        : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 leading-relaxed mb-6 italic">
                &quot;{testimonial.content}&quot;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-linear-to-br from-primary to-primary-light text-white font-bold text-lg font-heading">
                  {testimonial.name.charAt(0)}
                </div>
                
                <div>
                  <p className="font-semibold text-primary font-heading">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonial.role}, {testimonial.organization}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
