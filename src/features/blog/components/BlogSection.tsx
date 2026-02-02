'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { getRecentArticles } from '../data/articles';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const articles = getRecentArticles(3);

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

    headerTl.fromTo('.blog-badge',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    )
    .fromTo('.blog-title',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.2'
    )
    .fromTo('.blog-subtitle',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.3'
    );

    // Cards stagger animation
    gsap.fromTo('.blog-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.blog-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

  }, { scope: sectionRef });

  // GSAP hover animation
  const handleCardHover = (index: number, isEntering: boolean) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const image = card.querySelector('.blog-image');

    gsap.to(card, {
      scale: isEntering ? 1.02 : 1,
      y: isEntering ? -8 : 0,
      boxShadow: isEntering 
        ? '0 25px 50px -12px rgba(31, 79, 115, 0.25)' 
        : '0 4px 20px -2px rgba(31, 79, 115, 0.12)',
      duration: 0.4,
      ease: 'power2.out'
    });

    if (image) {
      gsap.to(image, {
        scale: isEntering ? 1.08 : 1,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-EC', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  // Category gradients using theme colors
  const getCategoryGradient = (category: string) => {
    const gradients: Record<string, string> = {
      'Estrategia': 'from-cat-estrategia via-cat-estrategia-light to-cat-estrategia',
      'Sostenibilidad': 'from-cat-sostenibilidad via-cat-sostenibilidad-light to-cat-sostenibilidad',
      'Educación': 'from-cat-educacion via-cat-educacion-light to-cat-educacion',
      'Tecnología': 'from-cat-tecnologia via-cat-tecnologia-light to-cat-tecnologia',
    };
    return gradients[category] || 'from-cat-estrategia to-cat-estrategia-light';
  };

  return (
    <section 
      ref={sectionRef}
      id="articulos" 
      className="section section-warm py-20 md:py-28"
    >

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-16">
          <span className="blog-badge inline-block px-5 py-2 mb-5 text-sm font-semibold text-accent-dark bg-accent/25 rounded-full font-heading">
            Conocimiento Compartido
          </span>
          
          <h2 className="blog-title heading-lg text-primary mb-5 font-heading">
            Artículos y Perspectivas
          </h2>
          
          <p className="blog-subtitle text-body-lg text-gray-700 max-w-2xl mx-auto">
            Reflexiones, análisis y aprendizajes de nuestra experiencia 
            acompañando organizaciones hacia el éxito.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => {
            const Icon = article.icon;
            const gradient = getCategoryGradient(article.category);
            
            return (
              <div
                key={article.id}
                ref={el => { cardsRef.current[index] = el; }}
                onMouseEnter={() => handleCardHover(index, true)}
                onMouseLeave={() => handleCardHover(index, false)}
                className="blog-card card overflow-hidden group cursor-pointer bg-white"
              >
                {/* Image Section */}
                <div className="relative h-44 overflow-hidden">
                  {/* Gradient Background as Image Placeholder */}
                  <div className={`blog-image absolute inset-0 bg-linear-to-br ${gradient}`}>
                    {/* Decorative pattern */}
                    <div 
                      className="absolute inset-0 opacity-15"
                      style={{
                        backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                        backgroundSize: '24px 24px',
                      }}
                    />
                    {/* Center Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="w-16 h-16 text-white/30" />
                    </div>
                  </div>
                  
                  {/* Category Badge - Floating */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1.5 text-xs font-bold text-white bg-black/30 backdrop-blur-sm rounded-full font-heading">
                      {article.category}
                    </span>
                  </div>
                  
                  {/* Read time - Bottom right */}
                  <div className="absolute bottom-4 right-4 z-10">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-white bg-black/30 backdrop-blur-sm rounded-full">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(article.publishedAt)}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-primary mb-3 font-heading group-hover:text-accent transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-accent transition-colors font-heading">
                    Leer artículo
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="#"
            className="btn btn-secondary btn-lg group inline-flex items-center gap-2"
          >
            Ver todos los artículos
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
