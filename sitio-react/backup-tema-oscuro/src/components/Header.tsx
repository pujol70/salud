import React, { useState, useEffect } from 'react';
import { Terminal, MessageCircle, Menu, X } from 'lucide-react';
import { siteData } from '../siteData';

interface HeaderProps {
  onNavigateHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateHome }) => {
  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navLinks = [
    { label: 'Servicios', href: '#servicios', id: 'servicios' },
    { label: 'Precios', href: '#precios', id: 'precios' },
    { label: 'Mantenimiento', href: '#mantenimiento', id: 'mantenimiento' },
    { label: 'Demos', href: '#demos', id: 'demos' },
    { label: 'Preguntas', href: '#preguntas', id: 'preguntas' },
    { label: 'Contacto', href: '#contacto', id: 'contacto' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = ['contacto', 'preguntas', 'demos', 'mantenimiento', 'precios', 'servicios'];
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 120;
          if (scrollY >= top) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      setActiveSection('inicio');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (onNavigateHome) {
      onNavigateHome();
    }
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#111827]/90 backdrop-blur-md border-b border-[#4B5563]/40 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <a 
          href="#inicio" 
          onClick={(e) => {
            e.preventDefault();
            if (onNavigateHome) onNavigateHome();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group focus-visible:outline-[#F97316]"
        >
          <div className="w-8 h-8 rounded-lg bg-[#374151] flex items-center justify-center text-[#F97316] group-hover:scale-105 transition-transform">
            <Terminal className="w-4 h-4 text-[#F97316]" />
          </div>
          <span className="font-syne font-extrabold text-xl text-white tracking-tight">
            {siteData.contact.brand}
          </span>
          <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse"></span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm" aria-label="Navegación principal">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`transition-colors py-1 ${
                  isActive 
                    ? 'text-[#F97316] font-bold border-b-2 border-[#F97316]' 
                    : 'text-[#9CA3AF] hover:text-[#F97316]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Header Right Action CTA */}
        <div className="flex items-center gap-3">
          <a
            href={`${siteData.contact.whatsappLink}?text=${encodeURIComponent("Hola ECRISTIA, me comunico desde la web.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs sm:text-sm py-2 px-3.5 sm:px-4"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span className="font-bold">WhatsApp</span>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#374151] text-[#D1D5DB] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#F97316]"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#111827] border-b border-[#4B5563] px-5 py-4 space-y-2 shadow-2xl animate-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-[#374151] text-[#F97316] font-bold'
                    : 'text-[#D1D5DB] hover:bg-[#1F2937] hover:text-[#F97316]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <div className="pt-2">
            <a
              href={`${siteData.contact.whatsappLink}?text=${encodeURIComponent("Hola ECRISTIA, quiero consultar por servicios web.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full py-3 text-center text-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chatear por WhatsApp directo</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
