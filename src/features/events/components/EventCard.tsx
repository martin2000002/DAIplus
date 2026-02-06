'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import {
  ArrowRight,
  Calendar,
  MapPin,
} from 'lucide-react';
import { type Event, categoryConfig, formatEventDate, isUpcoming } from '../data/events';
import { cn } from '@/src/lib/utils';

interface EventCardProps {
  event: Event;
  className?: string;
}

export function EventCard({ event, className }: EventCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const config = categoryConfig[event.category];
  const upcoming = isUpcoming(event.date);

  const handleHover = (isEntering: boolean) => {
    const card = cardRef.current;
    if (!card) return;

    const image = card.querySelector('.event-image');

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
    <Link href={`/eventos/${event.slug}`} className={cn('block h-full', className)}>
      <div
        ref={cardRef}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        className="event-card flex flex-col overflow-hidden rounded-2xl group cursor-pointer bg-white shadow-sm transition-shadow h-full"
      >
        {/* Image Section */}
        <div className={cn('relative h-40 overflow-hidden', !upcoming && 'grayscale-30')}>
          <div className="event-image absolute inset-0">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
            <div className="absolute inset-0 img-overlay" />
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 right-4 z-10">
            {upcoming ? (
              <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-white bg-accent rounded-full font-heading">
                <Calendar className="w-3 h-3" />
                Próximamente
              </span>
            ) : (
              <span className="px-2.5 py-1 text-xs font-bold text-white/90 bg-primary-dark/70 rounded-full font-heading">
                Realizado
              </span>
            )}
          </div>

          {/* Category Badge */}
          <div className="absolute bottom-3 left-4 z-10">
            <span className="px-3 py-1.5 text-xs font-bold text-white bg-black/30 backdrop-blur-sm rounded-full font-heading">
              {config?.label ?? event.category}
            </span>
          </div>

          {/* Date Badge */}
          <div className="absolute bottom-3 right-4 z-10">
            <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-white bg-black/30 backdrop-blur-sm rounded-full">
              <Calendar className="w-3 h-3" />
              {formatEventDate(event.date)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Title */}
          <h3 className="text-base font-bold text-primary mb-2 font-heading group-hover:text-accent transition-colors leading-snug line-clamp-2">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed text-sm line-clamp-3 mb-4">
            {event.description}
          </p>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            {event.location}
          </div>

          {/* Read More */}
          <div className="flex items-center gap-2 text-sm font-semibold text-accent group-hover:text-accent-light transition-colors font-heading mt-auto">
            Ver detalles
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
