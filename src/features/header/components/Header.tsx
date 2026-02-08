'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

// Nav items match the section order in page.tsx (Hero excluded — reached via logo)
const navItems = [
  { label: 'Enfoque', href: '/#enfoque' },
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Respaldo', href: '/#respaldo' },
  { label: 'Biblioteca', href: '/#biblioteca' },
  { label: 'Eventos', href: '/#eventos' },
  { label: 'Nosotros', href: '/#nosotros' },
];

interface HeaderProps {
  forceScrolled?: boolean;
}

export function Header({ forceScrolled = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = [
      ...navItems.map((item) => item.href.replace('/#', '')),
      'contacto',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(
              sectionIds.includes(entry.target.id) ? entry.target.id : '',
            );
          }
        });
      },
      { rootMargin: '-20% 0px -75% 0px', threshold: 0 },
    );

    const timer = setTimeout(() => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
      // Also observe hero to clear indicator when at top
      const hero = document.getElementById('inicio');
      if (hero) observer.observe(hero);
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLElement>, href: string) => {
    const targetId = href.replace('/#', '').replace('#', '');
    const isHome = window.location.pathname === '/';

    // If we're on the homepage, scroll smoothly
    if (isHome) {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, isMobileMenuOpen ? 300 : 0);
      }
    } else {
      // On sub-pages, navigate to home + hash (browser handles the anchor)
      setIsMobileMenuOpen(false);
    }
  };

  // Determina si el header debe tener estilo scrolled
  const showScrolledStyle = isScrolled || forceScrolled;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          showScrolledStyle
            ? 'glass shadow-lg py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="/#inicio" 
              scroll={false}
              onClick={(e) => handleNavClick(e, '/#inicio')}
              className={cn(
                "relative z-10 flex items-center transition-all duration-300",
                showScrolledStyle ? '' : 'pointer-events-none'
              )}
              aria-label="DAI+ - Ir al inicio"
              tabIndex={showScrolledStyle ? 0 : -1}
            >
              <Image
                src="/images/logo-compact.png"
                alt="DAI+ Logo"
                width={120}
                height={40}
                className={cn(
                  "h-8 md:h-10 w-auto transition-all duration-300",
                  showScrolledStyle ? 'opacity-100' : 'opacity-0'
                )}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('/#', '');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    scroll={false}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      'relative px-4 py-2 text-sm font-semibold transition-all duration-300 font-heading',
                      isActive
                        ? showScrolledStyle ? 'text-accent' : 'text-white'
                        : cn(
                            'rounded-full hover:bg-accent/10 hover:text-accent',
                            showScrolledStyle ? 'text-gray-700' : 'text-white/90',
                          ),
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        'absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-accent transition-all duration-300 ease-out',
                        isActive ? 'w-7 opacity-100' : 'w-0 opacity-0',
                      )}
                    />
                  </Link>
                );
              })}
              <Link
                href="/#contacto"
                scroll={false}
                onClick={(e) => handleNavClick(e, '/#contacto')}
                className="relative ml-2 btn btn-primary btn-sm"
              >
                Agendar Cita
                <span
                  className={cn(
                    'absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-accent transition-all duration-300 ease-out',
                    activeSection === 'contacto' ? 'w-7 opacity-100' : 'w-0 opacity-0',
                  )}
                />
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden p-2.5 rounded-xl transition-colors",
                showScrolledStyle 
                  ? 'text-primary hover:bg-primary/10' 
                  : 'text-white hover:bg-white/10'
              )}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300',
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          'fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-40 lg:hidden',
          'transform transition-transform duration-300 ease-out shadow-2xl',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full pt-24 pb-8 px-6">
          <nav className="flex-1">
            <ul className="space-y-1">
              {navItems.map((item, index) => (
                <li 
                  key={item.href}
                  className={cn(
                    'transform transition-all duration-300',
                    isMobileMenuOpen 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-8 opacity-0'
                  )}
                  style={{ 
                    transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms'
                  }}
                >
                  <Link
                    href={item.href}
                    scroll={false}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      'block px-4 py-3.5 text-lg font-semibold rounded-xl transition-colors font-heading',
                      activeSection === item.href.replace('/#', '')
                        ? 'text-accent bg-accent/5'
                        : 'text-gray-700 hover:bg-primary hover:text-white',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile CTA */}
          <div 
            className={cn(
              'pt-6 border-t border-gray-100 transform transition-all duration-300',
              isMobileMenuOpen 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-4 opacity-0'
            )}
            style={{ transitionDelay: isMobileMenuOpen ? '300ms' : '0ms' }}
          >
            <Link
              href="/#contacto"
              scroll={false}
              onClick={(e) => handleNavClick(e, '/#contacto')}
              className={cn(
                'block w-full btn btn-lg text-center',
                activeSection === 'contacto'
                  ? 'btn-accent'
                  : 'btn-primary',
              )}
            >
              Agendar Cita
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
