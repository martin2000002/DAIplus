import { cn } from '@/src/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'dark' | 'light';
  paddingY?: 'sm' | 'md' | 'lg' | 'xl';
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = 'default', paddingY = 'lg', children, id, ...props }, ref) => {
    const paddingStyles = {
      sm: 'py-8 md:py-12',
      md: 'py-12 md:py-16',
      lg: 'py-16 md:py-20',
      xl: 'py-20 md:py-28',
    };

    const variantStyles = {
      default: 'bg-white',
      dark: 'section--dark',
      light: 'section--light',
    };

    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          'relative overflow-hidden',
          paddingStyles[paddingY],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';

export { Section };
