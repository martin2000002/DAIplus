'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { useContactForm } from '../hooks/useContactForm';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { 
    formData, 
    errors, 
    status, 
    errorMessage,
    handleChange, 
    handleSubmit 
  } = useContactForm();

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Header animation
    gsap.fromTo('.contact-header > *',
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

    // Contact info animation
    gsap.fromTo('.contact-info > *',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.contact-info',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Form animation
    gsap.fromTo('.contact-form',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      id="contacto" 
      className="section py-16 md:py-20 bg-white"
    >
      {/* Decorative Elements */}
      <div className="circle-deco circle-deco-primary w-80 h-80 top-20 -right-40" />
      <div className="circle-deco circle-deco-accent w-64 h-64 -bottom-20 -left-32" />

      <div className="container-custom relative z-10 max-w-5xl">
        {/* Section Header */}
        <div className="contact-header text-center mb-10 md:mb-14">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-azul bg-azul/10 rounded-full font-heading">
            Contáctanos
          </span>
          
          <h2 className="heading-md text-azul mb-4 font-heading">
            ¿Listo para Transformar tus Finanzas?
          </h2>
          
          <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto">
            Cuéntanos sobre tu organización y cómo podemos ayudarte a alcanzar 
            tus objetivos financieros.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Contact Info - Now on right */}
          <div className="contact-info lg:col-span-2 lg:order-2 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-azul mb-5 font-heading">
                Información de Contacto
              </h3>
              
              <div className="space-y-4">
                {/* Email */}
                <a
                  href="mailto:dandradei@outlook.es"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-azul/10 flex items-center justify-center flex-shrink-0 group-hover:bg-azul transition-colors">
                    <Mail className="w-4 h-4 text-azul group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">
                      Correo Electrónico
                    </p>
                    <p className="text-sm font-medium text-azul group-hover:text-naranja transition-colors font-heading">
                      dandradei@outlook.es
                    </p>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+593998711386"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-azul/10 flex items-center justify-center flex-shrink-0 group-hover:bg-azul transition-colors">
                    <Phone className="w-4 h-4 text-azul group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">
                      Teléfono / WhatsApp
                    </p>
                    <p className="text-sm font-medium text-azul group-hover:text-naranja transition-colors font-heading">
                      +593 998 711 386
                    </p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-azul/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-azul" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">
                      Ubicación
                    </p>
                    <p className="text-sm font-medium text-azul font-heading">
                      Quito - Ecuador
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Placeholder */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-3">
                Escanea para contacto directo:
              </p>
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <span className="text-xs text-gray-400 text-center px-2">
                  QR Code
                </span>
              </div>
            </div>
          </div>

          {/* Contact Form - Now on left */}
          <div className="contact-form lg:col-span-3 lg:order-1">
            <h3 className="text-lg font-bold text-azul mb-5 font-heading">
              Agendar Consultoría
            </h3>
            <div className="card p-4 md:p-5">
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Success Message */}
                {status === 'success' && (
                  <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-center">
                    <p className="font-semibold font-heading">
                      ¡Mensaje enviado correctamente!
                    </p>
                    <p className="text-sm mt-1">
                      Nos pondremos en contacto contigo pronto.
                    </p>
                  </div>
                )}

                {/* Error Message */}
                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-center">
                    <p className="font-semibold font-heading">Error al enviar</p>
                    <p className="text-sm mt-1">{errorMessage}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="nombre" className="block mb-1 text-sm font-medium text-gray-700 font-heading">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      placeholder="Tu nombre completo"
                      value={formData.nombre}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                      className={`input py-2 text-sm ${errors.nombre ? 'input-error' : ''}`}
                    />
                    {errors.nombre && (
                      <p className="mt-1 text-xs text-red-500">{errors.nombre}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="correo" className="block mb-1 text-sm font-medium text-gray-700 font-heading">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      id="correo"
                      name="correo"
                      placeholder="tu@email.com"
                      value={formData.correo}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                      className={`input py-2 text-sm ${errors.correo ? 'input-error' : ''}`}
                    />
                    {errors.correo && (
                      <p className="mt-1 text-xs text-red-500">{errors.correo}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="organizacion" className="block mb-1 text-sm font-medium text-gray-700 font-heading">
                    Organización
                  </label>
                  <input
                    type="text"
                    id="organizacion"
                    name="organizacion"
                    placeholder="Nombre de tu empresa (opcional)"
                    value={formData.organizacion}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                    className="input py-2 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="mensaje" className="block mb-1 text-sm font-medium text-gray-700 font-heading">
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={2}
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    value={formData.mensaje}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                    className={`input py-2 text-sm resize-none ${errors.mensaje ? 'input-error' : ''}`}
                  />
                  {errors.mensaje && (
                    <p className="mt-1 text-xs text-red-500">{errors.mensaje}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full btn btn-primary btn-sm disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensaje
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-gray-500">
                  * Campos requeridos. Tu información será tratada con confidencialidad.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
