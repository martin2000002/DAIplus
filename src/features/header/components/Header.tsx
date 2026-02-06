'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const navItems = [
  { label: 'Inicio', href: '/#inicio' },
  { label: 'Enfoque', href: '/#enfoque' },
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Biblioteca', href: '/#biblioteca' },
  { label: 'Eventos', href: '/#eventos' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Contacto', href: '/#contacto' },
];

interface HeaderProps {
  forceScrolled?: boolean;
}

export function Header({ forceScrolled = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                src="/images/logo.png"
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
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  scroll={false}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 font-heading",
                    "hover:bg-accent hover:text-white",
                    showScrolledStyle
                      ? 'text-gray-700'
                      : 'text-white/90'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/#contacto"
                scroll={false}
                onClick={(e) => handleNavClick(e, '/#contacto')}
                className="ml-2 btn btn-primary btn-sm"
              >
                Agendar Cita
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
                    className="block px-4 py-3.5 text-lg font-semibold text-gray-700 rounded-xl 
                             hover:bg-primary hover:text-white transition-colors font-heading"
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
              className="block w-full btn btn-primary btn-lg text-center"
            >
              Agendar Consultoría
            </Link>
          </div>

          {/* Mobile Contact Info */}
          <div 
            className={cn(
              'pt-6 text-center text-sm text-gray-500 transform transition-all duration-300',
              isMobileMenuOpen 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-4 opacity-0'
            )}
            style={{ transitionDelay: isMobileMenuOpen ? '400ms' : '0ms' }}
          >
            <p className="font-medium">+593 998 711 386</p>
            <p>dandradei@outlook.es</p>
          </div>
        </div>
      </div>
    </>
  );
}
