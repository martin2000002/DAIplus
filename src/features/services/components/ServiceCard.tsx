import { Service } from '../data/services';

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon;
  const isEven = index % 2 === 0;
  
  return (
    <div 
      className="group relative bg-white rounded-2xl overflow-hidden
                 shadow-lg hover:shadow-2xl transition-all duration-500
                 border border-gray-100"
    >
      {/* Top accent bar */}
      <div 
        className={`h-1.5 w-full ${
          isEven 
            ? 'bg-gradient-to-r from-[var(--color-azul-dai)] to-[var(--color-azul-light)]'
            : 'bg-gradient-to-r from-[var(--color-naranja-dai)] to-[var(--color-naranja-light)]'
        }`}
      />
      
      <div className="p-6 md:p-8">
        {/* Icon & Title */}
        <div className="flex items-start gap-4 mb-5">
          <div 
            className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center
                       group-hover:scale-110 transition-transform duration-300 ${
              isEven 
                ? 'bg-[var(--color-azul-dai)]/10 text-[var(--color-azul-dai)]'
                : 'bg-[var(--color-naranja-dai)]/10 text-[var(--color-naranja-dai)]'
            }`}
          >
            <Icon className="w-7 h-7" />
          </div>
          
          <div>
            <span 
              className={`text-xs font-semibold uppercase tracking-wider ${
                isEven ? 'text-[var(--color-azul-light)]' : 'text-[var(--color-naranja-dai)]'
              }`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {service.subtitle}
            </span>
            <h3 
              className="text-xl font-bold text-[var(--color-azul-dai)] mt-1"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {service.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p 
          className="text-[var(--color-gray-600)] mb-6 leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {service.description}
        </p>

        {/* Benefits */}
        <ul className="space-y-2">
          {service.benefits.map((benefit, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-[var(--color-gray-700)]">
              <svg 
                className={`w-4 h-4 flex-shrink-0 ${
                  isEven ? 'text-[var(--color-azul-dai)]' : 'text-[var(--color-naranja-dai)]'
                }`}
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span style={{ fontFamily: 'var(--font-body)' }}>{benefit}</span>
            </li>
          ))}
        </ul>

        {/* Hover overlay effect */}
        <div 
          className={`absolute inset-0 opacity-0 group-hover:opacity-5 
                     transition-opacity duration-500 pointer-events-none ${
            isEven 
              ? 'bg-gradient-to-br from-[var(--color-azul-dai)] to-transparent'
              : 'bg-gradient-to-br from-[var(--color-naranja-dai)] to-transparent'
          }`}
        />
      </div>
    </div>
  );
}
