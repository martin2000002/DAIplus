'use client';

import { useEffect } from 'react';
import { cn } from '@/src/lib/utils';
import { Navigation } from './Navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-[calc(var(--z-header)-2)] lg:hidden transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        className={cn(
          'fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-[calc(var(--z-header)-1)] lg:hidden',
          'transform transition-transform duration-300 ease-out',
          'shadow-2xl',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full pt-24 pb-8 px-6">
          {/* Navigation */}
          <nav className="flex-1">
            <ul className="flex flex-col gap-2">
              {[
                { label: 'Inicio', href: '#inicio' },
                { label: 'Insights', href: '#insights' },
                { label: 'Servicios', href: '#servicios' },
                { label: 'Nosotros', href: '#nosotros' },
                { label: 'Contacto', href: '#contacto' },
              ].map((item, index) => (
                <li 
                  key={item.href}
                  className={cn(
                    'opacity-0 transform translate-x-4',
                    isOpen && 'animate-slide-in-right',
                  )}
                  style={{ 
                    animationDelay: isOpen ? `${index * 50}ms` : '0ms',
                    animationFillMode: 'forwards'
                  }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const targetId = item.href.replace('#', '');
                      const element = document.getElementById(targetId);
                      
                      if (element) {
                        onClose();
                        setTimeout(() => {
                          const headerOffset = 80;
                          const elementPosition = element.getBoundingClientRect().top;
                          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                          window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                          });
                        }, 300);
                      }
                    }}
                    className="block px-4 py-3 text-lg font-medium text-[var(--color-gray-700)] rounded-lg 
                             hover:bg-[var(--color-azul-dai)] hover:text-white transition-colors"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button */}
          <div 
            className={cn(
              'pt-6 border-t border-gray-200 opacity-0',
              isOpen && 'animate-fade-in'
            )}
            style={{ 
              animationDelay: isOpen ? '300ms' : '0ms',
              animationFillMode: 'forwards'
            }}
          >
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                setTimeout(() => {
                  const element = document.getElementById('contacto');
                  if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }, 300);
              }}
              className="block w-full py-3 text-center font-semibold text-white 
                       bg-[var(--color-naranja-dai)] rounded-full 
                       hover:bg-[var(--color-naranja-dark)] transition-colors"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Agendar Consultoría
            </a>
          </div>

          {/* Contact Info */}
          <div 
            className={cn(
              'pt-6 text-center text-sm text-[var(--color-gray-500)] opacity-0',
              isOpen && 'animate-fade-in'
            )}
            style={{ 
              animationDelay: isOpen ? '400ms' : '0ms',
              animationFillMode: 'forwards'
            }}
          >
            <p>+593 998 711 386</p>
            <p>dandradei@outlook.es</p>
          </div>
        </div>
      </div>
    </>
  );
}
