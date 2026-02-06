'use client';

import { Linkedin, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const navLinks = [
  { label: 'Inicio', href: '/#inicio' },
  { label: 'Enfoque', href: '/#enfoque' },
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Biblioteca', href: '/biblioteca' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Contacto', href: '/#contacto' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's a direct route (no hash), let browser navigate normally
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
    // On sub-pages, let the browser navigate to /#section
  };

  return (
    <footer className="bg-primary-dark text-white">
      {/* Main Footer Content */}
      <div className="py-14 md:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              {/* Logo */}
              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold tracking-tight text-white font-heading">
                  DAI
                </span>
                <span className="text-3xl font-bold text-accent font-heading">
                  +
                </span>
              </div>
              
              <p className="text-white/70 mb-7 max-w-md leading-relaxed">
                Desarrollo, Asesoría e Innovación. Acompañamos a organizaciones, 
                cooperativas y personas a tomar decisiones financieras más informadas 
                y sostenibles.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com/in/diego-andrade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com/daiplus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 font-heading">
                Enlaces Rápidos
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-white/70 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6 font-heading">
                Contacto
              </h4>
              
              <div className="space-y-4 mb-7">
                <a
                  href="mailto:dandradei@outlook.es"
                  className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors"
                >
                  <Mail className="w-5 h-5 shrink-0" />
                  <span className="text-sm">dandradei@outlook.es</span>
                </a>
                
                <a
                  href="tel:+593998711386"
                  className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors"
                >
                  <Phone className="w-5 h-5 shrink-0" />
                  <span className="text-sm">+593 998 711 386</span>
                </a>
                
                <div className="flex items-center gap-3 text-white/70">
                  <MapPin className="w-5 h-5 shrink-0" />
                  <span className="text-sm">Quito - Ecuador</span>
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div>
                <p className="text-xs text-white/50 mb-2">
                  Escanea para contacto:
                </p>
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-400">QR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/50 text-center md:text-left">
              © {currentYear} DAI+. Todos los derechos reservados.
            </p>
            
            <div className="flex items-center gap-6 text-sm text-white/50">
              <span className="hover:text-white transition-colors cursor-default">
                Política de Privacidad
              </span>
              <span className="hover:text-white transition-colors cursor-default">
                Términos de Uso
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
