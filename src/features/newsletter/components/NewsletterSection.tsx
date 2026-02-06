'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Send, CheckCircle2 } from 'lucide-react';
import { getRecentNewsletters } from '../data/newsletters';
import { NewsletterCard } from './NewsletterCard';
import { cn } from '@/src/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function NewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const newsletters = getRecentNewsletters(3);

  // Newsletter subscription state
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsSubmitting(false);
      setEmail('');
    }, 800);
  };

  // Entrance animations
  useGSAP(() => {
    if (!sectionRef.current) return;

    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    headerTl
      .fromTo('.newsletter-badge',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
      .fromTo('.newsletter-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.2'
      )
      .fromTo('.newsletter-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.3'
      );

    // Cards stagger
    gsap.fromTo('.newsletter-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.newsletter-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Subscribe CTA animation
    gsap.fromTo('.newsletter-subscribe',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: '.newsletter-subscribe',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="biblioteca"
      className="section section-dark py-20 md:py-28"
    >
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-16">
          <span className="newsletter-badge inline-block px-5 py-2 mb-5 text-sm font-semibold text-accent bg-accent/20 rounded-full font-heading">
            Recursos y Conocimiento
          </span>

          <h2 className="newsletter-title heading-lg text-white mb-5 font-heading">
            Biblioteca
          </h2>

          <p className="newsletter-subtitle text-body-lg text-white/70 max-w-2xl mx-auto">
            Reflexiones, análisis y aprendizajes de nuestra experiencia
            acompañando organizaciones hacia el éxito.
          </p>
        </div>

        {/* Newsletter Grid */}
        <div className="newsletter-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {newsletters.map((newsletter) => (
            <NewsletterCard
              key={newsletter.id}
              newsletter={newsletter}
            />
          ))}
        </div>

        {/* CTA: Subscribe centered + View All below */}
        <div className="newsletter-subscribe mt-12 md:mt-14 max-w-xl mx-auto">
          {/* Subscribe Card */}
          <div className="rounded-2xl overflow-hidden">
            <div className="h-1 bg-linear-to-r from-accent via-accent-light to-accent" />
            <div className="bg-white/[0.07] backdrop-blur-xs border border-white/10 border-t-0 rounded-b-2xl p-7 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                  <Send className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-heading">
                    Newsletter
                  </h3>
                  <p className="text-xs text-white/50">
                    Análisis y tendencias en tu correo
                  </p>
                </div>
              </div>

              {isSubscribed ? (
                <div className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                  <span className="text-sm text-white font-semibold font-heading">
                    ¡Gracias por suscribirte!
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
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/35 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      'btn btn-primary btn-sm inline-flex items-center justify-center gap-2 shrink-0',
                      isSubmitting && 'opacity-70 pointer-events-none'
                    )}
                  >
                    {isSubmitting ? 'Enviando...' : 'Suscribirme'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* View All - centered below */}
          <div className="mt-8 text-center">
            <p className="text-white/50 text-sm mb-4">
              Explora todas nuestras publicaciones, análisis y recursos.
            </p>
            <Link
              href="/biblioteca"
              className="btn btn-primary btn-lg group"
            >
              Ver toda la biblioteca
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
