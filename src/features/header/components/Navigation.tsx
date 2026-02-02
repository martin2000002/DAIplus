'use client';

import { cn } from '@/src/lib/utils';

interface NavigationProps {
  className?: string;
  isScrolled?: boolean;
  onItemClick?: () => void;
}

const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Insights', href: '#insights' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
];

export function Navigation({ className, isScrolled = false, onItemClick }: NavigationProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    onItemClick?.();
  };

  return (
    <nav className={className}>
      <ul className="flex items-center gap-1 md:gap-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                "hover:bg-accent hover:text-white",
                isScrolled
                  ? 'text-gray-700 hover:text-white'
                  : 'text-white/90 hover:text-white'
              )}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
