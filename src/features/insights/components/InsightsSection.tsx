'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { insights } from '@/src/features/services/data/services';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function InsightsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Animate section header
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo('.insights-badge',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    )
    .fromTo('.insights-title',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('.insights-subtitle',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    );

    // Animate cards with stagger
    gsap.fromTo('.insight-card',
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      id="enfoque" 
      className="section section-light py-20 md:py-28"
    >
      {/* Decorative Elements */}
      <div className="circle-deco circle-deco-primary w-96 h-96 -top-32 -right-32" />
      <div className="circle-deco circle-deco-accent w-72 h-72 bottom-20 -left-20" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-20">
          <span className="insights-badge inline-block px-5 py-2 mb-5 text-sm font-semibold text-accent bg-accent/10 rounded-full font-heading">
            Nuestro Enfoque
          </span>
          
          <h2 className="insights-title heading-lg text-primary mb-5 font-heading">
            Enfoque Estratégico
          </h2>
          
          <p className="insights-subtitle text-body-lg text-gray-600 max-w-2xl mx-auto">
            Creamos capacidades internas que permanecen en el tiempo y se convierten en 
            motores de crecimiento para tu organización.
          </p>
        </div>

        {/* Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {insights.slice(0, 3).map((insight) => {
            const Icon = insight.icon;
            return (
              <div 
                key={insight.id}
                className="insight-card card card-hover p-7 md:p-8 group"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-primary to-primary-light group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-primary mb-3 font-heading">
                  {insight.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {insight.description}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-linear-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            );
          })}
        </div>
        
        {/* Second row - centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-6 lg:mt-8 max-w-3xl mx-auto">
          {insights.slice(3).map((insight) => {
            const Icon = insight.icon;
            return (
              <div 
                key={insight.id}
                className="insight-card card card-hover p-7 md:p-8 group"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-primary to-primary-light group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-primary mb-3 font-heading">
                  {insight.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {insight.description}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-linear-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
