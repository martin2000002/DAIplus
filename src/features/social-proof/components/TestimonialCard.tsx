import { Testimonial } from '../data/testimonials';
import { IconQuote, IconStar } from '@/src/shared/icons';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <div 
      className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg
                 border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      {/* Quote icon */}
      <div className="absolute -top-4 left-6">
        <div className="w-10 h-10 rounded-full bg-accent 
                       flex items-center justify-center shadow-lg">
          <IconQuote className="w-5 h-5 text-white transform rotate-180" />
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4 pt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <IconStar
            key={i}
            className={`w-5 h-5 ${
              i < testimonial.rating 
                ? 'text-accent' 
                : 'text-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <blockquote 
        className="text-gray-700 leading-relaxed mb-6 italic"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        "{testimonial.content}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4">
        {/* Avatar placeholder */}
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center
                     bg-linear-to-br from-primary to-primary-light
                     text-white font-bold text-lg"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {testimonial.name.charAt(0)}
        </div>
        
        <div>
          <p 
            className="font-semibold text-primary"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {testimonial.name}
          </p>
          <p 
            className="text-sm text-gray-500"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {testimonial.role}, {testimonial.organization}
          </p>
        </div>
      </div>
    </div>
  );
}
