import React, { useState, useEffect, useRef } from 'react';
import { Terminal, MessageCircle, Menu, X } from 'lucide-react';
import { siteData } from '../siteData';

interface HeaderProps {
  onNavigateHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateHome }) => {
  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { label: 'Servicios', href: '#servicios', id: 'servicios' },
    { label: 'Precios', href: '#precios', id: 'precios' },
    { label: 'Mantenimiento', href: '#mantenimiento', id: 'mantenimiento' },
    { label: 'Demos', href: '#demos', id: 'demos' },
    { label: 'Preguntas', href: '#preguntas', id: 'preguntas' },
    { label: 'Contacto', href: '#contacto', id: 'contacto' },
  ];

  // Active section scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const headerHeight = window.innerWidth <= 900 ? 72 : 80;
      const sections = ['contacto', 'preguntas', 'demos', 'mantenimiento', 'precios', 'servicios'];
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - headerHeight - 30;
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

  // Close mobile menu when resizing to desktop (> 900px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close on click outside header
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [mobileMenuOpen]);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (onNavigateHome) {
      onNavigateHome();
    }
    const targetId = href.replace('#', '');
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <header 
      ref={headerRef}
      className="sticky top-0 left-0 w-full z-40 bg-[#F6F4EF]/95 backdrop-blur-md border-b border-[#DCD6CA] shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 min-[901px]:px-8 lg:px-12 h-[68px] min-[901px]:h-20 flex items-center justify-between gap-3 flex-nowrap w-full">
        
        {/* Left: Brand / Logo */}
        <a 
          href="#inicio" 
          onClick={(e) => {
            e.preventDefault();
            if (mobileMenuOpen) setMobileMenuOpen(false);
            if (onNavigateHome) onNavigateHome();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="min-w-0 flex items-center gap-2 group shrink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9C4A30] rounded-lg p-1 -ml-1 transition-colors"
          aria-label={`Ir al inicio - ${siteData.contact.brand}`}
        >
          <div className="w-10 h-10 min-w-10 min-h-10 rounded-full bg-salvia-100 flex items-center justify-center text-salvia shrink-0 group-hover:scale-105 transition-transform">
            <Terminal className="w-5 h-5 text-salvia stroke-current fill-none" />
          </div>
          <span 
            className="font-syne font-extrabold text-grafito tracking-tight truncate select-none leading-none"
            style={{ fontSize: 'clamp(1.05rem, 5vw, 1.4rem)' }}
          >
            {siteData.contact.brand}
          </span>
          <span className="w-2 h-2 rounded-full bg-fiordo animate-pulse shrink-0 hidden sm:inline-block"></span>
        </a>

        {/* Desktop Navigation Links (> 900px) */}
        <nav 
          className="hidden min-[901px]:flex items-center gap-6 lg:gap-8 text-sm" 
          aria-label="Navegación principal"
        >
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
                className={`transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9C4A30] rounded ${
                  isActive 
                    ? 'text-grafito font-bold border-b-2 border-fiordo' 
                    : 'text-pizarra hover:text-grafito'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* WhatsApp Button:
              < 600px: 44x44px round circle with white icon in #B5593C
              600px - 900px: pill with text
              > 900px: desktop styling with text
          */}
          <a
            href={`${siteData.contact.whatsappLink}?text=${encodeURIComponent("Hola, vi tu web y quiero hacer una consulta.")}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribir por WhatsApp"
            className="h-[44px] min-h-[44px] bg-[#B5593C] text-white flex items-center justify-center shrink-0 hover:bg-[#9C4A30] active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#9C4A30] shadow-sm
              w-[44px] min-w-[44px] rounded-full p-0
              min-[600px]:w-auto min-[600px]:px-4 min-[600px]:gap-2
              min-[901px]:h-10 min-[901px]:min-h-10 min-[901px]:py-2 min-[901px]:px-4 min-[901px]:text-sm"
          >
            <MessageCircle className="w-5 h-5 min-[901px]:w-4 min-[901px]:h-4 fill-none stroke-current shrink-0" />
            <span className="hidden min-[600px]:inline font-bold text-xs sm:text-sm">WhatsApp</span>
          </a>

          {/* Mobile Hamburger Button (< 900px) */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-[901px]:hidden w-[44px] h-[44px] min-w-[44px] min-h-[44px] rounded-[12px] bg-[#FDFCFA] border border-[#DCD6CA] text-[#2E4A5C] flex items-center justify-center hover:bg-[#ECE8DF] active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#9C4A30] cursor-pointer"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-dropdown-menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#2E4A5C]" strokeWidth={2.2} />
            ) : (
              <Menu className="w-5 h-5 text-[#2E4A5C]" strokeWidth={2.2} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Panel (< 900px) */}
      {mobileMenuOpen && (
        <div
          id="mobile-dropdown-menu"
          className="min-[901px]:hidden absolute top-full left-0 w-full bg-[#F6F4EF] border-b border-[#DCD6CA] shadow-md z-50 animate-mobile-menu"
          role="region"
          aria-label="Menú de navegación móvil"
        >
          <nav className="w-full flex flex-col" aria-label="Enlaces del menú móvil">
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
                  className={`h-[48px] px-6 flex items-center text-base font-medium text-[#1F2A33] border-b border-[#DCD6CA] transition-colors hover:bg-[#ECE8DF] focus:outline-none focus:ring-2 focus:ring-[#9C4A30] focus:ring-inset ${
                    isActive ? 'bg-[#ECE8DF]/80 font-bold' : ''
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Full-width WhatsApp button in arcilla */}
          <div className="p-4 sm:p-5">
            <a
              href={`${siteData.contact.whatsappLink}?text=${encodeURIComponent("Hola, vi tu web y quiero hacer una consulta.")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full min-h-[48px] py-3.5 px-6 rounded-full bg-[#B5593C] hover:bg-[#9C4A30] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-sm active:scale-[0.99] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#9C4A30]"
            >
              <MessageCircle className="w-5 h-5 fill-none stroke-current shrink-0" />
              <span>Escribir por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
