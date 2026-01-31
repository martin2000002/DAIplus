'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Linkedin, CheckCircle2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const consultant = {
  name: 'Diego Andrade',
  role: 'Consultor Principal',
  bio: 'Profesional con amplia experiencia en consultoría financiera para organizaciones, cooperativas de ahorro y crédito, y empresas. Especializado en planificación financiera, análisis estratégico y educación financiera. Su enfoque se centra en generar soluciones prácticas, adaptadas a la realidad de cada cliente, promoviendo una gestión financiera responsable y sostenible.',
  credentials: [
    'Especialista en Finanzas Corporativas',
    'Consultor de Cooperativas de Ahorro y Crédito',
    'Educador Financiero Certificado',
    'Más de 10 años de experiencia en el sector',
  ],
  linkedin: 'https://linkedin.com/in/diego-andrade',
};

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);

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

    headerTl.fromTo('.team-header > *',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }
    );

    // Photo animation
    gsap.fromTo('.team-photo',
      { opacity: 0, scale: 0.8, clipPath: 'circle(0% at 50% 50%)' },
      {
        opacity: 1,
        scale: 1,
        clipPath: 'circle(100% at 50% 50%)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.team-content',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Bio animation
    gsap.fromTo('.team-bio > *',
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.team-bio',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Decorative ring animation
    gsap.to('.photo-ring', {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none',
    });

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      id="nosotros" 
      className="section section-dark py-20 md:py-28"
    >
      {/* Decorative Elements */}
      <div className="circle-deco circle-deco-accent w-[400px] h-[400px] -top-48 -left-48 opacity-10" />
      <div className="circle-deco circle-deco-primary w-96 h-96 bottom-0 -right-32 opacity-10" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="team-header text-center mb-14 md:mb-20">
          <span className="inline-block px-5 py-2 mb-5 text-sm font-semibold text-naranja bg-naranja/20 rounded-full font-heading">
            Conócenos
          </span>
          
          <h2 className="heading-lg text-white mb-5 font-heading">
            El Consultor
          </h2>
          
          <p className="text-body-lg text-white/80 max-w-xl mx-auto">
            Experiencia y compromiso al servicio de tu organización.
          </p>
        </div>

        {/* Consultant Card */}
        <div className="team-content max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Photo Container */}
            <div className="team-photo relative flex-shrink-0">
              {/* Outer decorative ring */}
              <div 
                className="photo-ring absolute inset-0 rounded-full border-2 border-dashed border-naranja/30"
                style={{ transform: 'scale(1.15)' }}
              />
              
              {/* Photo container */}
              <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/20 bg-gradient-to-br from-azul-light to-azul flex items-center justify-center">
                {/* Placeholder initials */}
                <span className="text-7xl md:text-8xl font-bold text-white/90 font-heading">
                  DA
                </span>
              </div>

              {/* Small decorative circles */}
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-naranja animate-pulse" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-azul-light" />
            </div>

            {/* Bio Content */}
            <div className="team-bio text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-heading">
                {consultant.name}
              </h3>
              
              <p className="text-naranja font-semibold mb-5 font-heading">
                {consultant.role}
              </p>
              
              <p className="text-white/85 leading-relaxed mb-7">
                {consultant.bio}
              </p>

              {/* Credentials */}
              <ul className="space-y-3 mb-7">
                {consultant.credentials.map((credential, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-naranja flex-shrink-0" />
                    <span>{credential}</span>
                  </li>
                ))}
              </ul>

              {/* LinkedIn Link */}
              <a
                href={consultant.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white font-medium transition-colors font-heading"
              >
                <Linkedin className="w-5 h-5" />
                Conectar en LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
