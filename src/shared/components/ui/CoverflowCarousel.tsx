'use client';

import { useRef, useState, useCallback, useEffect, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

// ── Helpers ──────────────────────────────────────────────────────────
function getOffset(index: number, active: number, total: number): number {
  let diff = index - active;
  if (diff > Math.floor(total / 2)) diff -= total;
  if (diff < -Math.floor(total / 2)) diff += total;
  return diff;
}

// ── Types ────────────────────────────────────────────────────────────
export interface CoverflowCarouselProps<T> {
  /** Array of data items to render */
  items: T[];
  /** Unique key for each item */
  keyExtractor: (item: T, index: number) => string;
  /** Render the card content — receives the item and whether it's active */
  renderItem: (item: T, index: number, isActive: boolean) => ReactNode;
  /** Height class for the cards area (e.g. "h-100 md:h-105") */
  heightClass?: string;
  /** Autoplay interval in seconds (0 = disabled) */
  autoplayInterval?: number;
  /** Dot color variant */
  dotVariant?: 'light' | 'dark';
  /** Optional aria-label for the carousel region */
  ariaLabel?: string;
  /** Max-width class for the outer wrapper (default: 'max-w-lg') */
  containerClass?: string;
  /** X-translation percent for side cards (default: 60) */
  sideOffset?: number;
  /** Width class matching the active card — buttons are positioned relative to this */
  cardWidthClass?: string;
}

// ── Component ────────────────────────────────────────────────────────
export function CoverflowCarousel<T>({
  items,
  keyExtractor,
  renderItem,
  heightClass = 'h-100 md:h-105',
  autoplayInterval = 4,
  dotVariant = 'dark',
  ariaLabel = 'Carrusel',
  containerClass = 'max-w-lg',
  sideOffset = 60,
  cardWidthClass = 'w-80 md:w-88',
}: CoverflowCarouselProps<T>) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const autoplayRef = useRef<gsap.core.Tween | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardMidY, setCardMidY] = useState<number>(0);

  const total = items.length;

  // ── Measure actual card height to center buttons correctly ───────
  useEffect(() => {
    const measure = () => {
      const wrapper = cardsRef.current[activeIndex];
      if (!wrapper) return;
      const card = wrapper.firstElementChild as HTMLElement | null;
      if (!card) return;
      setCardMidY(card.offsetHeight / 2);
    };
    // Delay so card has rendered / GSAP has positioned it
    const timer = setTimeout(measure, 80);
    window.addEventListener('resize', measure);
    return () => { clearTimeout(timer); window.removeEventListener('resize', measure); };
  }, [activeIndex]);

  // ── GSAP hover for nav buttons ───────────────────────────────────
  useEffect(() => {
    if (!wrapperRef.current) return;
    const buttons = wrapperRef.current.querySelectorAll('.carousel-nav-btn');

    const enters: Array<() => void> = [];
    const leaves: Array<() => void> = [];

    buttons.forEach((btn) => {
      const onEnter = () => {
        gsap.to(btn, { y: -3, scale: 1.08, backgroundColor: 'rgba(21,58,87,0.9)', duration: 0.25, ease: 'power2.out' });
      };
      const onLeave = () => {
        gsap.to(btn, { y: 0, scale: 1, backgroundColor: 'rgba(21,58,87,0.7)', duration: 0.25, ease: 'power2.out' });
      };
      enters.push(onEnter);
      leaves.push(onLeave);
      btn.addEventListener('mouseenter', onEnter);
      btn.addEventListener('mouseleave', onLeave);
    });

    return () => {
      buttons.forEach((btn, i) => {
        btn.removeEventListener('mouseenter', enters[i]);
        btn.removeEventListener('mouseleave', leaves[i]);
      });
    };
  }, []);

  // ── Position cards ───────────────────────────────────────────────
  const positionCards = useCallback(
    (active: number, animate = true, duration = 0.55) => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const offset = getOffset(index, active, total);
        const isVisible = Math.abs(offset) <= 1;

        const props = {
          x: offset === 0 ? '0%' : `${offset * sideOffset}%`,
          scale: offset === 0 ? 1 : 0.78,
          y: offset === 0 ? 0 : 12,
          opacity: isVisible ? (offset === 0 ? 1 : 0.45) : 0,
          zIndex: offset === 0 ? 30 : isVisible ? 20 - Math.abs(offset) : 0,
          pointerEvents: offset === 0 ? 'auto' : 'none',
        };

        if (animate) {
          gsap.to(card, { ...props, duration, ease: 'power3.out' });
        } else {
          gsap.set(card, props);
        }
      });
    },
    [total, sideOffset],
  );

  // ── Initial placement ────────────────────────────────────────────
  useGSAP(() => {
    positionCards(activeIndex, false);
  }, { scope: carouselRef, dependencies: [] });

  // ── Navigation ───────────────────────────────────────────────────
  const goToSlide = useCallback(
    (target: number) => {
      if (target === activeIndex || isAnimating) return;
      setIsAnimating(true);
      positionCards(target, true);
      setTimeout(() => {
        setActiveIndex(target);
        setIsAnimating(false);
      }, 570);
    },
    [activeIndex, isAnimating, positionCards],
  );

  const goNext = useCallback(() => {
    goToSlide((activeIndex + 1) % total);
  }, [activeIndex, total, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide((activeIndex - 1 + total) % total);
  }, [activeIndex, total, goToSlide]);

  // ── Autoplay ─────────────────────────────────────────────────────
  useEffect(() => {
    if (autoplayInterval <= 0) return;
    const timer = gsap.delayedCall(autoplayInterval, goNext);
    autoplayRef.current = timer;
    return () => { timer.kill(); };
  }, [activeIndex, goNext, autoplayInterval]);

  const pauseAutoplay = useCallback(() => { autoplayRef.current?.pause(); }, []);
  const resumeAutoplay = useCallback(() => { autoplayRef.current?.resume(); }, []);

  // ── Render ───────────────────────────────────────────────────────
  return (
    <div
      ref={wrapperRef}
      className={cn('relative mx-auto', containerClass)}
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
      role="region"
      aria-label={ariaLabel}
    >
      {/* Cards container */}
      <div ref={carouselRef} className={cn('relative', heightClass)}>
        {items.map((item, index) => (
          <div
            key={keyExtractor(item, index)}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="absolute inset-0 flex items-start justify-center"
            style={{ willChange: 'transform, opacity' }}
          >
            {renderItem(item, index, index === activeIndex)}
          </div>
        ))}

        {/* Nav overlay — sized to card width, vertically centered on actual card height */}
        <div className="absolute inset-x-0 top-0 pointer-events-none flex justify-center z-40" style={{ height: cardMidY ? cardMidY * 2 : '100%' }}>
          <div className={cn('relative h-full', cardWidthClass)}>
            <div className="absolute -left-6 md:-left-9 top-1/2 -translate-y-1/2 pointer-events-auto">
              <button
                onClick={goPrev}
                aria-label="Anterior"
                className="carousel-nav-btn w-11 h-11 rounded-full bg-primary-dark/70 shadow-lg flex items-center justify-center text-white transition-all duration-300 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute -right-6 md:-right-9 top-1/2 -translate-y-1/2 pointer-events-auto">
              <button
                onClick={goNext}
                aria-label="Siguiente"
                className="carousel-nav-btn w-11 h-11 rounded-full bg-primary-dark/70 shadow-lg flex items-center justify-center text-white transition-all duration-300 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            aria-label={`Ir al item ${i + 1}`}
            className={cn(
              'rounded-full transition-all duration-300 cursor-pointer',
              i === activeIndex
                ? 'w-7 h-2.5 bg-accent'
                : dotVariant === 'light'
                  ? 'w-2.5 h-2.5 bg-white/25 hover:bg-white/40'
                  : 'w-2.5 h-2.5 bg-gray-300 hover:bg-primary/40',
            )}
          />
        ))}
      </div>
    </div>
  );
}
