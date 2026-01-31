import { cn } from '@/src/lib/utils';

interface CircleDecorationProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'primary' | 'accent';
  className?: string;
}

export function CircleDecoration({ 
  size = 'lg', 
  variant = 'primary',
  className 
}: CircleDecorationProps) {
  const sizeStyles = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-72 h-72',
    xl: 'w-96 h-96',
    '2xl': 'w-[32rem] h-[32rem]',
  };

  return (
    <div
      className={cn(
        'circle-decoration',
        variant === 'primary' ? 'circle-decoration--primary' : 'circle-decoration--accent',
        sizeStyles[size],
        className
      )}
      aria-hidden="true"
    />
  );
}
