'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ArrowRight, Clock } from 'lucide-react';
import { type Newsletter } from '../data/newsletters';
import { cn } from '@/src/lib/utils';

interface NewsletterCardProps {
  newsletter: Newsletter;
  className?: string;
}

export function NewsletterCard({ newsletter, className }: NewsletterCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleHover = (isEntering: boolean) => {
    const card = cardRef.current;
    if (!card) return;

    const image = card.querySelector('.newsletter-image');

    gsap.to(card, {
      scale: isEntering ? 1.02 : 1,
      y: isEntering ? -6 : 0,
      boxShadow: isEntering
        ? '0 20px 40px -10px rgba(31, 79, 115, 0.25)'
        : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      duration: 0.3,
      ease: 'power2.out',
    });

    if (image) {
      gsap.to(image, {
        scale: isEntering ? 1.08 : 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };


  return (
    <Link href={`/biblioteca/${newsletter.slug}`} className={cn('block h-full', className)}>
      <div
        ref={cardRef}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        className="newsletter-card flex flex-col overflow-hidden rounded-2xl group cursor-pointer bg-white shadow-sm transition-shadow h-full"
      >
        {/* Image Section */}
        <div className="relative h-40 overflow-hidden">
          {/* Background: real image if exists, gradient fallback */}
          <div className="newsletter-image absolute inset-0">
            {newsletter.imageUrl ? (
              <>
                <Image
                  src={newsletter.imageUrl}
                  alt={newsletter.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized
                />
                <div className="absolute inset-0 img-overlay" />
              </>
            ) : (
              <div className="absolute inset-0 bg-primary" />
            )}
          </div>

          {/* Category Badge */}
          <div className="absolute bottom-3 left-4 z-10">
            <span className="px-3 py-1.5 text-xs font-bold text-white bg-black/30 backdrop-blur-sm rounded-full font-heading">
              {newsletter.category}
            </span>
          </div>

          {/* Read Time */}
          <div className="absolute bottom-3 right-4 z-10">
            <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-white bg-black/30 backdrop-blur-sm rounded-full">
              <Clock className="w-3 h-3" />
              {newsletter.readTime}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Title */}
          <h3 className="text-base font-bold text-primary mb-2 font-heading group-hover:text-accent transition-colors leading-snug line-clamp-2">
            {newsletter.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 leading-relaxed text-sm line-clamp-3 mb-4">
            {newsletter.excerpt}
          </p>

          {/* Read More */}
          <div className="flex items-center gap-2 text-sm font-semibold text-accent group-hover:text-accent-light transition-colors font-heading mt-auto">
            Leer más
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
