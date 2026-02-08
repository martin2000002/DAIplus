'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Quote, Star } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import { cn } from '@/src/lib/utils';
import { CoverflowCarousel } from '@/src/shared/components/ui/CoverflowCarousel';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Placeholder logos
const logos = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `Cliente ${i + 1}`,
}));

export function SocialProofSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoTrackRef = useRef<HTMLDivElement>(null);

  // Entrance animations
  useGSAP(() => {
    if (!sectionRef.current) return;

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
      },
    );

    gsap.fromTo('.testimonials-section',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: '.testimonials-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      },
    );
  }, { scope: sectionRef });

  // GSAP-based logo slider
  useGSAP(() => {
    if (!logoTrackRef.current) return;

    const track = logoTrackRef.current;
    const totalWidth = track.scrollWidth / 2;

    gsap.set(track, { x: 0 });

    const tween = gsap.to(track, {
      x: -totalWidth,
      duration: 30,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: number) => {
          return parseFloat(String(x)) % totalWidth;
        }),
      },
    });

    const handleEnter = () => {
      gsap.to(tween, { timeScale: 0.2, duration: 1, ease: 'power2.out' });
    };
    const handleLeave = () => {
      gsap.to(tween, { timeScale: 1, duration: 1, ease: 'power2.in' });
    };

    track.addEventListener('mouseenter', handleEnter);
    track.addEventListener('mouseleave', handleLeave);

    return () => {
      track.removeEventListener('mouseenter', handleEnter);
      track.removeEventListener('mouseleave', handleLeave);
      tween.kill();
    };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="respaldo"
      className="section section-light py-20 md:py-28"
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
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-linear-to-r from-gray-50 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-linear-to-l from-gray-50 to-transparent z-10" />

            <div ref={logoTrackRef} className="flex w-max">
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={`${logo.id}-${index}`}
                  className="shrink-0 mx-6 md:mx-10"
                >
                  <div className="w-32 h-20 md:w-40 md:h-24 flex items-center justify-center rounded-xl bg-white shadow-sm border border-gray-100 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500 cursor-pointer">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm font-heading"
                      style={{ backgroundColor: `hsl(${(logo.id * 45) % 360}, 50%, 45%)` }}
                    >
                      {logo.name.charAt(0)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="testimonials-section">
          <h3 className="heading-md text-center text-primary mb-10 md:mb-14 font-heading">
            Lo Que Dicen de Nosotros
          </h3>

          <CoverflowCarousel
            items={testimonials}
            keyExtractor={(t) => t.id}
            autoplayInterval={3.5}
            dotVariant="dark"
            heightClass="h-90 md:h-80"
            ariaLabel="Carrusel de testimonios"
            containerClass="max-w-5xl"
            sideOffset={30}
            cardWidthClass="w-[85%] md:w-[55%]"
            renderItem={(testimonial) => (
              <div className="w-[85%] md:w-[55%] card p-7 md:p-9 relative shadow-lg flex flex-col h-70 md:h-65">
                {/* Decorative quote */}
                <div className="absolute -top-4 left-7">
                  <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center shadow-md">
                    <Quote className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4 pt-2 shrink-0">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'w-4 h-4',
                        i < testimonial.rating
                          ? 'text-accent fill-accent'
                          : 'text-gray-200',
                      )}
                    />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base italic flex-1 overflow-hidden">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 shrink-0 mt-auto">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center bg-linear-to-br from-primary to-primary-light text-white font-bold text-base font-heading shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-primary font-heading text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {testimonial.role}, {testimonial.organization}
                    </p>
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}
