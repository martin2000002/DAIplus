import { Insight } from '../data/insights';

interface InsightCardProps {
  insight: Insight;
  index: number;
}

export function InsightCard({ insight, index }: InsightCardProps) {
  const Icon = insight.icon;
  
  return (
    <div 
      className="group relative bg-white rounded-2xl p-6 md:p-8 
                 shadow-md hover:shadow-xl transition-all duration-300
                 hover:-translate-y-1 border border-gray-100"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Icon Container */}
      <div className="mb-5">
        <div 
          className="inline-flex items-center justify-center w-14 h-14 rounded-full
                     bg-gradient-to-br from-[var(--color-azul-dai)] to-[var(--color-azul-light)]
                     group-hover:scale-110 transition-transform duration-300"
        >
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>

      {/* Content */}
      <h3 
        className="text-lg md:text-xl font-bold text-[var(--color-azul-dai)] mb-3"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {insight.title}
      </h3>
      
      <p 
        className="text-[var(--color-gray-600)] leading-relaxed"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {insight.description}
      </p>

      {/* Decorative accent */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl 
                   bg-gradient-to-r from-[var(--color-azul-dai)] to-[var(--color-naranja-dai)]
                   transform scale-x-0 group-hover:scale-x-100 
                   transition-transform duration-300 origin-left"
      />
    </div>
  );
}
