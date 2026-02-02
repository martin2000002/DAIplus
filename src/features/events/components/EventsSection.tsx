'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Calendar, MapPin, ArrowRight, Users, Presentation, Wrench, Handshake } from 'lucide-react';
import { getRecentEvents, getCategoryLabel, type Event } from '../data/events';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const categoryIcons: Record<Event['category'], typeof Users> = {
  capacitacion: Users,
  conferencia: Presentation,
  taller: Wrench,
  networking: Handshake,
};

export function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const events = getRecentEvents(3);

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

    headerTl.fromTo('.events-badge',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    )
    .fromTo('.events-title',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.2'
    )
    .fromTo('.events-subtitle',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.3'
    );

    // Cards stagger animation
    gsap.fromTo('.event-card',
      { opacity: 0, y: 50, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.events-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

  }, { scope: sectionRef });

  // GSAP hover animation
  const handleCardHover = (index: number, isEntering: boolean) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const image = card.querySelector('.event-image');

    gsap.to(card, {
      scale: isEntering ? 1.02 : 1,
      y: isEntering ? -8 : 0,
      boxShadow: isEntering 
        ? '0 25px 50px -12px rgba(31, 79, 115, 0.25)' 
        : '0 4px 20px -2px rgba(31, 79, 115, 0.12)',
      duration: 0.4,
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-EC', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Category gradients using centralized theme colors
  const getCategoryGradient = (category: Event['category']) => {
    const gradients: Record<Event['category'], string> = {
      capacitacion: 'from-cat-capacitacion via-cat-capacitacion-light to-cat-capacitacion',
      conferencia: 'from-cat-conferencia via-cat-conferencia-light to-cat-conferencia',
      taller: 'from-cat-taller via-cat-taller-light to-cat-taller',
      networking: 'from-cat-networking via-cat-networking-light to-cat-networking',
    };
    return gradients[category];
  };

  const isAzulAccent = (category: Event['category']): boolean => {
    return category === 'capacitacion' || category === 'taller';
  };

  return (
    <section 
      ref={sectionRef}
      id="eventos" 
      className="section py-20 md:py-28 bg-white"
    >

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-16">
          <span className="events-badge inline-block px-5 py-2 mb-5 text-sm font-semibold text-primary bg-primary/10 rounded-full font-heading">
            Nuestra Actividad
          </span>
          
          <h2 className="events-title heading-lg text-primary mb-5 font-heading">
            Eventos y Capacitaciones
          </h2>
          
          <p className="events-subtitle text-body-lg text-gray-600 max-w-2xl mx-auto">
            Acompañando organizaciones a través de experiencias de aprendizaje 
            transformacionales en todo el Ecuador.
          </p>
        </div>

        {/* Events Grid - Featured Layout: 1 large + 2 small (equal height) */}
        <div className="events-grid grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured Event - Large Card */}
          {events[0] && (
            <div
              ref={el => { cardsRef.current[0] = el; }}
              onMouseEnter={() => handleCardHover(0, true)}
              onMouseLeave={() => handleCardHover(0, false)}
              className="event-card card overflow-hidden group cursor-pointer bg-white h-full"
            >
              {/* Large Image Section */}
              <div className="relative h-56 lg:h-64 overflow-hidden">
                <div className={`event-image absolute inset-0 bg-linear-to-br ${getCategoryGradient(events[0].category)}`}>
                  <div 
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage: `radial-gradient(circle at 40% 40%, rgba(255,255,255,0.3) 2px, transparent 2px)`,
                      backgroundSize: '32px 32px',
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {(() => {
                      const Icon = categoryIcons[events[0].category];
                      return <Icon className="w-24 h-24 text-white/25" />;
                    })()}
                  </div>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-4 py-2 text-sm font-bold text-white bg-black/30 backdrop-blur-sm rounded-full font-heading">
                    {getCategoryLabel(events[0].category)}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 lg:p-8 flex-1">
                <h3 className="text-xl lg:text-2xl font-bold text-primary mb-3 font-heading group-hover:text-accent transition-colors">
                  {events[0].title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {events[0].description}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-accent" />
                    {formatDate(events[0].date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-accent" />
                    {events[0].location}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-accent transition-colors font-heading">
                  Ver detalles
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          )}

          {/* Other Events - 2 Cards stacked, each takes half height */}
          <div className="flex flex-col gap-6 h-full">
            {events.slice(1, 3).map((event, idx) => {
              const index = idx + 1;
              const Icon = categoryIcons[event.category];
              const isAzul = isAzulAccent(event.category);
              
              return (
                <div
                  key={event.id}
                  ref={el => { cardsRef.current[index] = el; }}
                  onMouseEnter={() => handleCardHover(index, true)}
                  onMouseLeave={() => handleCardHover(index, false)}
                  className="event-card card overflow-hidden group cursor-pointer bg-white flex-1 min-h-0"
                >
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Image Section - Side */}
                    <div className="relative h-32 md:h-auto md:w-40 lg:w-48 shrink-0 overflow-hidden">
                      <div className={`event-image absolute inset-0 bg-linear-to-br ${getCategoryGradient(event.category)}`}>
                        <div 
                          className="absolute inset-0 opacity-15"
                          style={{
                            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                            backgroundSize: '20px 20px',
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon className="w-10 h-10 text-white/30" />
                        </div>
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2.5 py-1 text-xs font-bold text-white bg-black/30 backdrop-blur-sm rounded-full font-heading">
                          {getCategoryLabel(event.category)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4 lg:p-5 flex flex-col justify-center flex-1 min-w-0">
                      <h3 className="text-base font-bold text-primary mb-2 font-heading group-hover:text-accent transition-colors line-clamp-2">
                        {event.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2 hidden lg:block">
                        {event.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className={`w-3.5 h-3.5 ${isAzul ? 'text-primary' : 'text-accent'}`} />
                          {formatDate(event.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className={`w-3.5 h-3.5 ${isAzul ? 'text-primary' : 'text-accent'}`} />
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            className="btn btn-secondary btn-lg group inline-flex items-center gap-2"
          >
            Ver todas las actividades
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
