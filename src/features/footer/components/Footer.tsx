'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Facebook } from 'lucide-react';

// Matches navbar items order + extra pages
const footerLinks = [
  { label: 'Enfoque', href: '/#enfoque' },
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Respaldo', href: '/#respaldo' },
  { label: 'Biblioteca', href: '/#biblioteca' },
  { label: 'Eventos', href: '/#eventos' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Contacto', href: '/#contacto' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.includes('#')) return;

    const targetId = href.replace('/#', '').replace('#', '');
    const isHome = window.location.pathname === '/';

    if (isHome) {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-primary-dark text-white">
      {/* Main row: logo + links + social */}
      <div className="py-8 md:py-10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/#inicio" scroll={false} onClick={(e) => handleNavClick(e, '/#inicio')} className="shrink-0">
              <Image
                src="/images/logo-compact.png"
                alt="DAI+ Logo"
                width={120}
                height={40}
                className="h-8 w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                unoptimized
              />
            </Link>

            {/* Horizontal nav links */}
            <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  scroll={false}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm text-white/55 hover:text-accent transition-colors font-heading"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Social */}
            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href="https://linkedin.com/in/diego-andrade"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-accent hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/daiplus"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-accent hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/8 py-4">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-white/30">
              © {currentYear} DAI+. Todos los derechos reservados.
            </p>

            <div className="flex items-center gap-5 text-xs text-white/30">
              <span className="hover:text-white/50 transition-colors cursor-default">
                Política de Privacidad
              </span>
              <span className="hover:text-white/50 transition-colors cursor-default">
                Términos de Uso
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
