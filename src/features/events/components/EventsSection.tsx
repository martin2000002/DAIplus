'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Calendar,
  MapPin,
  ArrowRight,
  Bell,
  CheckCircle2,
} from 'lucide-react';
import {
  getRecentEvents,
  categoryConfig,
  formatEventDate,
  isUpcoming,
} from '../data/events';
import { cn } from '@/src/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const events = getRecentEvents(3);

  // Subscribe state
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1200);
  };

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

    headerTl
      .fromTo('.events-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 })
      .fromTo('.events-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
      .fromTo('.events-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');

    // Cards stagger
    gsap.fromTo(
      '.event-card',
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

    // Subscribe animation
    gsap.fromTo(
      '.events-subscribe',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: '.events-subscribe',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, { scope: sectionRef });

  // GSAP hover — same values as services/newsletter (scale 1.02, y -6, duration 0.3)
  const handleCardHover = (index: number, isEntering: boolean) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const image = card.querySelector('.event-image');

    gsap.to(card, {
      scale: isEntering ? 1.02 : 1,
      y: isEntering ? -6 : 0,
      boxShadow: isEntering
        ? '0 20px 40px -10px rgba(31, 79, 115, 0.25)'
        : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      duration: 0.3,
      ease: 'power2.out',
    });

    if (image) {
      gsap.to(image, {
        scale: isEntering ? 1.08 : 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
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
            Eventos
          </h2>

          <p className="events-subtitle text-body-lg text-gray-600 max-w-2xl mx-auto">
            Acompañando organizaciones a través de experiencias de aprendizaje
            transformacionales en todo el Ecuador.
          </p>
        </div>

        {/* Events Grid — 1 large + 2 small (equal half height) */}
        <div className="events-grid grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured Event — Large Card */}
          {events[0] && (() => {
            const featured = events[0];
            const config = categoryConfig[featured.category];
            const upcoming = isUpcoming(featured.date);

            return (
              <Link href={`/eventos/${featured.slug}`} className="block h-full">
                <div
                  ref={(el) => { cardsRef.current[0] = el; }}
                  onMouseEnter={() => handleCardHover(0, true)}
                  onMouseLeave={() => handleCardHover(0, false)}
                  className="event-card overflow-hidden rounded-2xl group cursor-pointer bg-white shadow-sm h-full flex flex-col"
                >
                  {/* Large Image */}
                  <div className={cn('relative h-52 lg:h-60 overflow-hidden', !upcoming && 'grayscale-30')}>
                    <div className="event-image absolute inset-0">
                      <Image
                        src={featured.imageUrl}
                        alt={featured.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        unoptimized
                      />
                      <div className="absolute inset-0 img-overlay" />
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-3 right-4 z-10">
                      {upcoming ? (
                        <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-white bg-accent rounded-full font-heading">
                          <Calendar className="w-3 h-3" />
                          Próximamente
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 text-xs font-bold text-white/90 bg-primary-dark/70 rounded-full font-heading">
                          Realizado
                        </span>
                      )}
                    </div>

                    {/* Category Badge */}
                    <div className="absolute bottom-3 left-4 z-10">
                      <span className="px-3 py-1.5 text-xs font-bold text-white bg-black/30 backdrop-blur-sm rounded-full font-heading">
                        {config?.label}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-7 flex flex-col flex-1">
                    <h3 className="text-lg lg:text-xl font-bold text-primary mb-3 font-heading group-hover:text-accent transition-colors">
                      {featured.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                      {featured.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-accent" />
                        {formatEventDate(featured.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-accent" />
                        {featured.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-accent group-hover:text-accent-light transition-colors font-heading mt-auto">
                      Ver detalles
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })()}

          {/* Side Events — 2 cards stacked, each half height */}
          <div className="flex flex-col gap-6 h-full">
            {events.slice(1, 3).map((event, idx) => {
              const index = idx + 1;
              const config = categoryConfig[event.category];
              const upcoming = isUpcoming(event.date);

              return (
                <Link key={event.id} href={`/eventos/${event.slug}`} className="block flex-1 min-h-0">
                  <div
                    ref={(el) => { cardsRef.current[index] = el; }}
                    onMouseEnter={() => handleCardHover(index, true)}
                    onMouseLeave={() => handleCardHover(index, false)}
                    className="event-card overflow-hidden rounded-2xl group cursor-pointer bg-white shadow-sm h-full"
                  >
                    <div className="flex flex-col md:flex-row h-full">
                      {/* Side Image */}
                      <div className={cn('relative h-32 md:h-auto md:w-40 lg:w-48 shrink-0 overflow-hidden', !upcoming && 'grayscale-30')}>
                        <div className="event-image absolute inset-0">
                          <Image
                            src={event.imageUrl}
                            alt={event.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 200px"
                            unoptimized
                          />
                          <div className="absolute inset-0 img-overlay" />
                        </div>

                        {/* Status Badge */}
                        <div className="absolute top-3 right-3 z-10">
                          {upcoming ? (
                            <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-white bg-accent rounded-full font-heading">
                              <Calendar className="w-2.5 h-2.5" />
                              Próximo
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 text-[10px] font-bold text-white/90 bg-primary-dark/70 rounded-full font-heading">
                              Realizado
                            </span>
                          )}
                        </div>

                        {/* Category Badge */}
                        <div className="absolute bottom-3 left-3 z-10">
                          <span className="px-2.5 py-1 text-xs font-bold text-white bg-black/30 backdrop-blur-sm rounded-full font-heading">
                            {config?.label}
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
                            <Calendar className="w-3.5 h-3.5 text-accent" />
                            {formatEventDate(event.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-accent" />
                            {event.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Subscribe to Events — white bg version */}
        <div className="events-subscribe mt-12 md:mt-14 max-w-xl mx-auto">
          <div className="rounded-2xl overflow-hidden">
            <div className="h-1 bg-linear-to-r from-primary via-primary-light to-primary" />
            <div className="bg-gray-50 border border-gray-200 border-t-0 rounded-b-2xl p-7 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-primary font-heading">
                    Próximos Eventos
                  </h3>
                  <p className="text-xs text-gray-500">
                    Recibe notificaciones de nuevos eventos
                  </p>
                </div>
              </div>

              {isSubscribed ? (
                <div className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-green-50 border border-green-200">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="text-sm text-green-700 font-semibold font-heading">
                    ¡Te notificaremos de próximos eventos!
                  </span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu correo electrónico"
                    required
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-800 placeholder:text-gray-400 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      'btn btn-primary btn-sm inline-flex items-center justify-center gap-2 shrink-0',
                      isSubmitting && 'opacity-70 pointer-events-none'
                    )}
                  >
                    {isSubmitting ? 'Enviando...' : 'Notificarme'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* View All Events — centered below */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm mb-4">
              Explora todos nuestros eventos, talleres y capacitaciones.
            </p>
            <Link
              href="/eventos"
              className="btn btn-secondary btn-lg group"
            >
              Ver todos los eventos
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
