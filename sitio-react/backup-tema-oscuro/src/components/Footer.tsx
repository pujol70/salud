import React from 'react';
import { Terminal, MapPin, Mail, MessageCircle } from 'lucide-react';
import { siteData } from '../siteData';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#111827] border-t border-[#4B5563]/60 py-12">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#4B5563]/40">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#374151] flex items-center justify-center text-[#F97316]">
              <Terminal className="w-4 h-4 text-[#F97316]" />
            </div>
            <div>
              <span className="font-syne font-extrabold text-lg text-white tracking-tight">
                {siteData.contact.brand}
              </span>
              <span className="text-xs font-mono text-[#9CA3AF] ml-2">// {siteData.contact.brandSubtitle}</span>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#9CA3AF]">
            <a href="#servicios" className="hover:text-[#F97316] transition-colors">Servicios</a>
            <a href="#precios" className="hover:text-[#F97316] transition-colors">Precios</a>
            <a href="#mantenimiento" className="hover:text-[#F97316] transition-colors">Mantenimiento</a>
            <a href="#demos" className="hover:text-[#F97316] transition-colors">Demos</a>
            <a href="#preguntas" className="hover:text-[#F97316] transition-colors">Preguntas</a>
            <a href="#contacto" className="hover:text-[#F97316] transition-colors">Contacto</a>
          </nav>

          {/* Location & Contact */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-mono text-[#9CA3AF]">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#F97316]" />
              <span>{siteData.contact.location}</span>
            </div>
            <a 
              href={siteData.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#F97316] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#F97316]" />
              <span>{siteData.contact.whatsappDisplay}</span>
            </a>
          </div>

        </div>

        {/* Exact legal footer line required by prompt */}
        <div className="pt-6 text-center text-xs text-[#9CA3AF] leading-relaxed">
          {siteData.contact.footerLegal}
        </div>

      </div>
    </footer>
  );
};
