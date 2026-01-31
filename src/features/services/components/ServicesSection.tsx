'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  Users, 
  Calendar, 
  Briefcase, 
  GraduationCap,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    id: 'cooperativas',
    title: 'Consultoría para Cooperativas',
    subtitle: 'Cooperativas de Ahorro y Crédito',
    description: 'Brindamos acompañamiento especializado enfocado en fortalecer la gestión económica, mejorar la toma de decisiones y asegurar la sostenibilidad.',
    benefits: [
      'Análisis financiero integral',
      'Optimización de recursos',
      'Proyección de crecimiento ordenado',
    ],
    icon: Users,
    accent: 'azul',
  },
  {
    id: 'planificacion',
    title: 'Planificación Financiera',
    subtitle: 'Control y Proyección',
    description: 'Acompañamos en el diseño y fortalecimiento de procesos de planificación financiera para anticipar riesgos y optimizar recursos.',
    benefits: [
      'Elaboración de presupuestos',
      'Proyecciones y escenarios',
      'Toma de decisiones estratégicas',
    ],
    icon: Calendar,
    accent: 'naranja',
  },
  {
    id: 'empresarial',
    title: 'Consultoría Empresarial',
    subtitle: 'Empresas y Emprendimientos',
    description: 'Asesoramos a empresas que buscan ordenar sus finanzas, mejorar rentabilidad y fortalecer su gestión económica.',
    benefits: [
      'Claridad financiera',
      'Mejora de rentabilidad',
      'Desarrollo económico sostenible',
    ],
    icon: Briefcase,
    accent: 'azul',
  },
  {
    id: 'educacion',
    title: 'Educación Financiera',
    subtitle: 'Personas Naturales',
    description: 'Ofrecemos espacios de educación y asesoría para comprender mejor las finanzas personales y tomar decisiones más informadas.',
    benefits: [
      'Comprensión de finanzas personales',
      'Organización de recursos',
      'Relación consciente con el dinero',
    ],
    icon: GraduationCap,
    accent: 'naranja',
  },
];

export function ServicesSection() {
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

    headerTl.fromTo('.services-badge',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    )
    .fromTo('.services-title',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.2'
    )
    .fromTo('.services-subtitle',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.3'
    );

    // Cards animation
    gsap.fromTo('.service-card',
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // CTA animation
    gsap.fromTo('.services-cta',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: '.services-cta',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );

  }, { scope: sectionRef });

  const handleContactClick = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="servicios" 
      className="section py-20 md:py-28 bg-white"
    >
      {/* Decorative Elements */}
      <div className="circle-deco circle-deco-accent w-[500px] h-[500px] top-1/4 -right-64" />
      <div className="circle-deco circle-deco-primary w-80 h-80 bottom-20 -left-40" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-20">
          <span className="services-badge inline-block px-5 py-2 mb-5 text-sm font-semibold text-azul bg-azul/10 rounded-full font-heading">
            Lo Que Hacemos
          </span>
          
          <h2 className="services-title heading-lg text-azul mb-5 font-heading">
            Nuestros Servicios
          </h2>
          
          <p className="services-subtitle text-body-lg text-gray-600 max-w-2xl mx-auto">
            Soluciones financieras adaptadas a la realidad de cada organización, 
            desde cooperativas hasta personas naturales.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            const isAzul = service.accent === 'azul';
            
            return (
              <div 
                key={service.id}
                className="service-card card overflow-hidden group"
              >
                {/* Top accent bar */}
                <div className={`h-1.5 w-full ${
                  isAzul 
                    ? 'bg-gradient-to-r from-azul to-azul-light'
                    : 'bg-gradient-to-r from-naranja to-naranja-light'
                }`} />
                
                <div className="p-7 md:p-8">
                  {/* Icon & Title */}
                  <div className="flex items-start gap-5 mb-6">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                      isAzul 
                        ? 'bg-azul/10 text-azul'
                        : 'bg-naranja/10 text-naranja'
                    }`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    
                    <div>
                      <span className={`text-xs font-bold uppercase tracking-wider ${
                        isAzul ? 'text-azul-light' : 'text-naranja'
                      } font-heading`}>
                        {service.subtitle}
                      </span>
                      <h3 className="text-xl font-bold text-azul mt-1 font-heading">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-2.5">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                        <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${
                          isAzul ? 'text-azul' : 'text-naranja'
                        }`} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover overlay */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none ${
                  isAzul 
                    ? 'bg-gradient-to-br from-azul to-transparent'
                    : 'bg-gradient-to-br from-naranja to-transparent'
                }`} />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="services-cta mt-14 md:mt-20 text-center">
          <p className="text-gray-600 mb-6">
            ¿No encuentras lo que buscas? Contáctanos para una solución personalizada.
          </p>
          <button
            onClick={handleContactClick}
            className="btn btn-secondary btn-lg group"
          >
            Solicitar Información
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
