import React from 'react';
import { MessageCircle } from 'lucide-react';
import { siteData } from '../siteData';

interface FloatingWhatsAppProps {
  customMessage?: string;
  isDemo?: boolean;
  onDemoClick?: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  customMessage,
  isDemo = false,
  onDemoClick
}) => {
  const message = customMessage || "Hola, vi tu web y quiero hacer una consulta.";
  const url = `${siteData.contact.whatsappLink}?text=${encodeURIComponent(message)}`;

  const handleClick = (e: React.MouseEvent) => {
    if (isDemo && onDemoClick) {
      e.preventDefault();
      onDemoClick();
    }
  };

  return (
    <aside 
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center group pointer-events-auto"
      aria-label="Contacto por WhatsApp"
    >
      <a
        href={isDemo ? "#" : url}
        onClick={handleClick}
        target={isDemo ? undefined : "_blank"}
        rel={isDemo ? undefined : "noopener noreferrer"}
        className="flex items-center gap-3 bg-arcilla text-white px-4 py-3 rounded-full font-bold shadow-suave hover:bg-arcilla-700 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#9C4A30] focus:ring-offset-2"
        title="Escribir por WhatsApp"
      >
        <span className="relative flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline text-sm tracking-wide font-extrabold">WhatsApp</span>
      </a>
    </aside>
  );
};
