'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';

// Stats data
const stats = [
  { value: '10+', label: 'Años experiencia' },
  { value: '50+', label: 'Organizaciones' },
  { value: '100%', label: 'Compromiso' },
];

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Set initial states
    gsap.set('.hero-video', { scale: 1.2, opacity: 0 });
    gsap.set('.hero-overlay', { opacity: 0 });
    gsap.set('.hero-logo', { y: 80, opacity: 0, scale: 0.8 });
    gsap.set('.hero-description', { y: 30, opacity: 0 });
    gsap.set('.hero-cta', { y: 30, opacity: 0, scale: 0.9 });
    gsap.set('.hero-stat', { y: 40, opacity: 0 });
    gsap.set('.hero-stat-value', { textContent: '0' });
    gsap.set('.hero-scroll', { y: 20, opacity: 0 });
    gsap.set('.hero-line', { scaleX: 0 });

    const master = gsap.timeline({ 
      defaults: { ease: 'power4.out' },
      delay: 0.2
    });

    // Phase 1: Cinematic video reveal (más rápido)
    master.to('.hero-video', {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: 'power2.out'
    })
    .to('.hero-overlay', {
      opacity: 1,
      duration: 1,
    }, '-=1.2')

    // Phase 2: Logo reveal with scale (más rápido)
    .to('.hero-logo', {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power4.out'
    }, '-=0.8')

    // Phase 3: Description fade in (más rápido)
    .to('.hero-description', {
      y: 0,
      opacity: 1,
      duration: 0.6
    }, '-=0.3')

    // Phase 5: CTA buttons with pop (más rápido)
    .to('.hero-cta', {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.7)',
      clearProps: 'transform,scale' // Limpia transform para que CSS hover funcione
    }, '-=0.2')

    // Phase 6: Line animation (más rápido)
    .to('.hero-line', {
      scaleX: 1,
      duration: 0.6,
      ease: 'power2.inOut'
    }, '-=0.15')

    // Phase 7: Stats with counting animation (más rápido y sin stagger)
    .to('.hero-stat', {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0, // Sin stagger para que aparezcan todos juntos
      ease: 'power3.out'
    }, '-=0.3');

    // Animate stat numbers - TODOS AL MISMO TIEMPO
    const statValues = containerRef.current.querySelectorAll('.hero-stat-value');
    statValues.forEach((el, i) => {
      const finalValue = stats[i].value.replace(/[^0-9]/g, '');
      const suffix = stats[i].value.replace(/[0-9]/g, '');
      
      master.to({}, {
        duration: 1,
        ease: 'power2.out',
        onUpdate: function() {
          const progress = this.progress();
          const current = Math.round(parseFloat(finalValue) * progress);
          el.textContent = current + suffix;
        }
      }, '-=1'); // Mismo timing para todos los contadores
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
      className="relative h-screen flex items-center overflow-hidden bg-primary-dark"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className="hero-video absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero-background.png"
      >
        <source src="/videos/header.mp4" type="video/mp4" />
      </video>
      
      {/* linear Overlays */}
      <div className="hero-overlay absolute inset-0 bg-linear-to-r from-primary-dark/95 via-primary-dark/70 to-primary-dark/40" />
      <div className="hero-overlay absolute inset-0 bg-linear-to-t from-primary-dark/80 via-transparent to-primary-dark/30" />
      
      {/* Subtle grain texture for premium feel */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} 
      />

      {/* Main Content - Distribuido con flexbox */}
      <div className="relative z-10 container-custom w-full h-full">
        <div className="flex flex-col items-center justify-between h-full pt-24 pb-20">
          
          {/* Spacer superior para compensar navbar */}
          <div className="shrink-0" />
          
          {/* Contenido Principal - Centrado */}
          <div className="flex flex-col items-center justify-center text-center flex-1">
            {/* Logo - Tamaño dinámico con clamp */}
            <div className="hero-logo mb-6 md:mb-8 will-change-transform w-full flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="DAI+ - Estrategia e Innovación"
                width={400}
                height={160}
                className="w-auto h-auto max-h-[22vh] md:max-h-[25vh] lg:max-h-[28vh] brightness-0 invert object-contain"
                priority
                unoptimized
              />
            </div>

            {/* Description */}
            <p className="hero-description text-sm md:text-base lg:text-lg text-white/90 mb-6 md:mb-8 max-w-xl mx-auto leading-relaxed px-4">
              Impulsamos a personas y organizaciones a construir el futuro que desean liderar, integrando estrategia e innovación.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <button
                onClick={handleCTAClick}
                className="hero-cta btn btn-primary btn-md md:btn-lg group"
              >
                Agendar Cita
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={handleServicesClick}
                className="hero-cta btn btn-outline btn-md md:btn-lg"
              >
                Explorar Servicios
              </button>
            </div>
          </div>

          {/* Stats Section - Parte inferior */}
          <div className="shrink-0 w-full mt-auto pt-6">
            {/* Animated line */}
            <div className="hero-line h-px bg-linear-to-r from-transparent via-white/20 to-transparent max-w-2xl mx-auto mb-4 md:mb-6 origin-center" />
            
            {/*SIMPLE*/}
            {
            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-lg md:max-w-xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="hero-stat text-center">
                  <div className="hero-stat-value text-xl md:text-2xl lg:text-3xl font-bold text-accent font-heading tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-[10px] md:text-xs text-white/80 mt-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            }

            {/*GLASSMORPHISM*/}
            {/*
            <div className="grid grid-cols-3 gap-3 md:gap-5 max-w-xl mx-auto px-4">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="hero-stat relative overflow-hidden rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 px-3 py-4 md:px-4 md:py-5 text-center shadow-lg"
                  style={{ 
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)'
                  }}
                >
                  <div className="relative z-10">
                    <div className="hero-stat-value text-2xl md:text-3xl font-bold text-accent font-heading tabular-nums mb-1.5">
                      {stat.value}
                    </div>
                    <div className="text-[10px] md:text-xs text-white/70 tracking-wide leading-tight">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            */}
          </div>
        </div>
      </div>

      {/* Bottom linear fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-primary-dark to-transparent pointer-events-none" />
    </section>
  );
}
