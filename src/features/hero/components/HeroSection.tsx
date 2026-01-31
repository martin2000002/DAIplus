'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Main content animations
    tl.fromTo('.hero-badge',
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6 }
    )
    .fromTo('.hero-title-line',
      { opacity: 0, y: 50, rotateX: -20 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.15 },
      '-=0.3'
    )
    .fromTo('.hero-subtitle',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7 },
      '-=0.4'
    )
    .fromTo('.hero-cta',
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, clearProps: 'transform' },
      '-=0.3'
    )
    .fromTo('.hero-stat',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
      '-=0.2'
    )
    .fromTo('.hero-scroll',
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.1'
    );

    // Floating circles animation
    gsap.to('.hero-circle-1', {
      y: -30,
      x: 10,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to('.hero-circle-2', {
      y: 25,
      x: -15,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to('.hero-circle-3', {
      y: -20,
      x: -10,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

  }, { scope: containerRef });

  const handleCTAClick = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServicesClick = () => {
    const element = document.getElementById('servicios');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="inicio"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero-background.png')`,
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-azul-dark/90 via-azul/85 to-azul-light/80" />
      
      {/* Decorative Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Decorative Circles */}
      <div ref={circlesRef} className="absolute inset-0 pointer-events-none">
        <div 
          className="hero-circle-1 absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
          }}
        />
        <div 
          className="hero-circle-2 absolute bottom-20 -left-32 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(245,166,35,0.25) 0%, transparent 70%)',
          }}
        />
        <div 
          className="hero-circle-3 absolute top-1/3 right-1/4 w-64 h-64 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container-custom pt-20 pb-16 md:pt-24 md:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="w-2 h-2 rounded-full bg-naranja animate-pulse" />
            <span className="text-sm font-medium text-white/90 tracking-wide font-heading">
              Consultoría Financiera Especializada
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-white mb-4" style={{ perspective: '1000px' }}>
            <span className="hero-title-line text-white block text-6xl md:text-7xl lg:text-8xl font-bold font-heading tracking-tight">
              DAI<span>+</span>
            </span>
            <span className="hero-title-line block text-lg md:text-xl lg:text-2xl font-medium text-white/90 mt-3">
              Desarrollo, Asesoría e Innovación
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-base md:text-lg text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed">
            Acompañamos a organizaciones, cooperativas y personas a tomar decisiones 
            financieras más informadas, sostenibles y alineadas con sus objetivos.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <button
              onClick={handleCTAClick}
              className="hero-cta btn btn-primary btn-md group"
            >
              Agendar Consultoría
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            <button
              onClick={handleServicesClick}
              className="hero-cta btn btn-outline btn-md"
            >
              Conocer Servicios
            </button>
          </div>

          {/* Stats */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 md:gap-8 max-w-xl mx-auto">
            <div className="hero-stat text-center">
              <div className="text-2xl md:text-3xl font-bold text-naranja font-heading">
                10+
              </div>
              <div className="text-xs md:text-sm text-white/70 mt-1">Años experiencia</div>
            </div>
            <div className="hero-stat text-center">
              <div className="text-2xl md:text-3xl font-bold text-naranja font-heading">
                50+
              </div>
              <div className="text-xs md:text-sm text-white/70 mt-1">Organizaciones</div>
            </div>
            <div className="hero-stat text-center">
              <div className="text-2xl md:text-3xl font-bold text-naranja font-heading">
                100%
              </div>
              <div className="text-xs md:text-sm text-white/70 mt-1">Compromiso</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-1 text-white/50">
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
