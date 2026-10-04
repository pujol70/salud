import React from 'react';
import { Terminal, MapPin, MessageCircle } from 'lucide-react';
import { siteData } from '../siteData';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleContactoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const contactoEl = document.getElementById('contacto');
      if (contactoEl) {
        contactoEl.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState({}, '', '#contacto');
      } else if (onNavigate) {
        onNavigate('/#contacto');
      }
    }
  };

  const handlePoliticasClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('/politicas');
    } else if (typeof window !== 'undefined') {
      window.location.href = '/politicas';
    }
  };

  return (
    <footer className="w-full bg-fiordo-900 border-t border-linea/20 py-12 text-[#C9D4D8]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-linea/20">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-fiordo flex items-center justify-center text-arcilla">
              <Terminal className="w-4 h-4 text-arcilla" />
            </div>
            <div>
              <span className="font-syne font-extrabold text-lg text-bruma tracking-tight">
                {siteData.contact.brand}
              </span>
              <span className="text-xs text-[#C9D4D8]/80 ml-2">{siteData.contact.brandSubtitle}</span>
            </div>
          </div>

          {/* Menú de enlaces: Contacto | Políticas */}
          <nav 
            aria-label="Enlaces del pie de página"
            className="w-full md:w-auto flex items-center justify-center gap-3 text-sm text-[#C9D4D8] whitespace-nowrap"
          >
            <a 
              href="#contacto" 
              onClick={handleContactoClick}
              className="text-[#C9D4D8] hover:text-white hover:underline decoration-1 underline-offset-4 transition-colors"
            >
              Contacto
            </a>
            <span className="text-[#C9D4D8]/40 select-none text-xs" aria-hidden="true">|</span>
            <a 
              href="/politicas" 
              onClick={handlePoliticasClick}
              className="text-[#C9D4D8] hover:text-white hover:underline decoration-1 underline-offset-4 transition-colors"
            >
              Políticas
            </a>
          </nav>

          {/* Location & Contact */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-[#C9D4D8]">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-arcilla" />
              <span>{siteData.contact.location}</span>
            </div>
            <a 
              href={siteData.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-bruma transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-arcilla" />
              <span>{siteData.contact.whatsappDisplay}</span>
            </a>
          </div>

        </div>

        {/* Exact legal footer line required by prompt */}
        <div className="pt-6 text-center text-xs text-[#C9D4D8]/75 leading-relaxed">
          {siteData.contact.footerLegal}
        </div>

      </div>
    </footer>
  );
};
