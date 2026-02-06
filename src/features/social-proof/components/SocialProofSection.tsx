'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import { cn } from '@/src/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Placeholder logos
const logos = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `Cliente ${i + 1}`,
}));

// Helper: get position relative to active (wraps around)
function getOffset(index: number, active: number, total: number): number {
  let diff = index - active;
  if (diff > Math.floor(total / 2)) diff -= total;
  if (diff < -Math.floor(total / 2)) diff += total;
  return diff;
}

export function SocialProofSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const logoTrackRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<gsap.core.Tween | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalSlides = testimonials.length;

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
      }
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
      }
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

  // Position all cards based on their offset from activeIndex
  const positionCards = useCallback((active: number, animate = true, duration = 0.6) => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const offset = getOffset(index, active, totalSlides);
      
      // Only show center + immediate neighbors
      const isVisible = Math.abs(offset) <= 1;
      
      const props = {
        // Center: x=0, sides: ±55% on desktop
        x: offset === 0 ? '0%' : `${offset * 55}%`,
        // Center: full scale, sides: smaller
        scale: offset === 0 ? 1 : 0.82,
        // Center: raised, sides: flat
        y: offset === 0 ? -12 : 8,
        // Center: full opacity, sides: faded
        opacity: isVisible ? (offset === 0 ? 1 : 0.5) : 0,
        // Center on top
        zIndex: offset === 0 ? 30 : (isVisible ? 20 - Math.abs(offset) : 0),
        // Pointer events only on center
        pointerEvents: offset === 0 ? 'auto' : 'none',
      };

      if (animate) {
        gsap.to(card, {
          ...props,
          duration,
          ease: 'power3.out',
        });
      } else {
        gsap.set(card, props);
      }
    });
  }, [totalSlides]);

  // Initial positioning (no animation)
  useGSAP(() => {
    positionCards(activeIndex, false);
  }, { scope: carouselRef, dependencies: [] });

  // Navigate to slide (sequential steps for multi-card jumps)
  const goToSlide = useCallback((targetIndex: number) => {
    if (targetIndex === activeIndex || isAnimating) return;
    setIsAnimating(true);

    // Determine shortest path direction
    const offset = getOffset(targetIndex, activeIndex, totalSlides);
    const steps = Math.abs(offset);
    const direction = offset > 0 ? 1 : -1;

    if (steps === 1) {
      // Single step — normal animation
      positionCards(targetIndex, true, 0.6);
      setTimeout(() => {
        setActiveIndex(targetIndex);
        setIsAnimating(false);
      }, 620);
    } else {
      // Multi-step — animate through each intermediate card
      const perStep = 0.32;
      const overlap = perStep * 0.65;

      // Build sequence of intermediate indices
      const indices: number[] = [];
      let curr = activeIndex;
      for (let i = 0; i < steps; i++) {
        curr = (curr + direction + totalSlides) % totalSlides;
        indices.push(curr);
      }

      indices.forEach((idx, i) => {
        gsap.delayedCall(i * overlap, () => {
          positionCards(idx, true, perStep);
        });
      });

      // Finish after last step completes
      const totalTime = ((steps - 1) * overlap + perStep) * 1000 + 50;
      setTimeout(() => {
        setActiveIndex(targetIndex);
        setIsAnimating(false);
      }, totalTime);
    }
  }, [activeIndex, isAnimating, positionCards, totalSlides]);

  const goNext = useCallback(() => {
    const next = (activeIndex + 1) % totalSlides;
    goToSlide(next);
  }, [activeIndex, totalSlides, goToSlide]);

  const goPrev = useCallback(() => {
    const prev = (activeIndex - 1 + totalSlides) % totalSlides;
    goToSlide(prev);
  }, [activeIndex, totalSlides, goToSlide]);

  // Autoplay
  useEffect(() => {
    const timer = gsap.delayedCall(3.5, () => {
      goNext();
    });
    autoplayTimerRef.current = timer;
    return () => { timer.kill(); };
  }, [activeIndex, goNext]);

  const pauseAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) autoplayTimerRef.current.pause();
  }, []);

  const resumeAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) autoplayTimerRef.current.resume();
  }, []);

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
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-linear-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-linear-to-l from-white to-transparent z-10" />

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

          {/* 3D Coverflow Carousel */}
          <div
            ref={carouselRef}
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
          >
            {/* Cards + Arrows wrapper (arrows center on this) */}
            <div className="relative">
            {/* Cards container - perspective for 3D feel */}
            <div className="relative mx-auto max-w-5xl h-90 md:h-80" style={{ perspective: '1200px' }}>
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  ref={el => { cardsRef.current[index] = el; }}
                  className="absolute top-0 left-1/2 w-[85%] md:w-[55%] -translate-x-1/2 will-change-transform"
                  style={{ transformOrigin: 'center center' }}
                >
                  <div className="card p-7 md:p-9 relative shadow-lg h-70 md:h-65 flex flex-col">
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
                              : 'text-gray-200'
                          )}
                        />
                      ))}
                    </div>

                    {/* Content - flex-1 with overflow */}
                    <blockquote className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base italic flex-1 overflow-hidden">
                      &ldquo;{testimonial.content}&rdquo;
                    </blockquote>

                    {/* Author - pinned to bottom */}
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
                </div>
              ))}
            </div>

            {/* Navigation Arrows - positioned at sides */}
            <button
              onClick={goPrev}
              disabled={isAnimating}
              className="absolute left-2 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-primary hover:text-accent hover:shadow-lg transition-all duration-200 disabled:opacity-40 cursor-pointer"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={goNext}
              disabled={isAnimating}
              className="absolute right-2 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-primary hover:text-accent hover:shadow-lg transition-all duration-200 disabled:opacity-40 cursor-pointer"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            </div>

            {/* Dot Indicators - synced to activeIndex */}
            <div className="flex items-center justify-center gap-2.5 mt-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    'rounded-full transition-all duration-500 cursor-pointer',
                    index === activeIndex
                      ? 'w-8 h-2.5 bg-accent scale-100'
                      : 'w-2.5 h-2.5 bg-gray-300 hover:bg-primary/40 scale-100'
                  )}
                  aria-label={`Ir al testimonio ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
