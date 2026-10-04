import React from 'react';
import { MessageSquare, SearchX, Smartphone, Shield, ArrowRight, HelpCircle } from 'lucide-react';
import { siteData } from '../siteData';

export const Diagnostic: React.FC = () => {
  const icons = [
    <MessageSquare className="w-5 h-5 text-salvia stroke-current fill-none" key="1" />,
    <SearchX className="w-5 h-5 text-salvia stroke-current fill-none" key="2" />,
    <Smartphone className="w-5 h-5 text-salvia stroke-current fill-none" key="3" />,
    <Shield className="w-5 h-5 text-salvia stroke-current fill-none" key="4" />
  ];

  return (
    <section className="w-full py-20 lg:py-24 bg-arena">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salvia-100 text-fiordo text-xs uppercase tracking-wider font-semibold mb-2">
            ¿Te pasa esto?
          </div>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl text-grafito tracking-tight">
            Lo que <span className="text-fiordo">frena</span> a tu negocio en internet
          </h2>
          <p className="mt-3 text-base sm:text-lg text-pizarra">
            Son situaciones habituales en negocios que dependen de WhatsApp e Instagram.
          </p>
        </div>

        {/* 4 Diagnostic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteData.diagnosticCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-nieve p-6 sm:p-7 rounded-[24px] border border-linea flex flex-col justify-between card-hover-glow shadow-suave group"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-salvia-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {icons[idx]}
                </div>
                <h3 className="font-syne font-bold text-lg text-grafito group-hover:text-fiordo transition-colors leading-snug">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm text-pizarra leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-linea text-sm text-pizarra">
                <span className="text-fiordo font-bold">Qué hago: </span>
                <span>{card.solution}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Review Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-[24px] bg-nieve border border-linea flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-suave">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-salvia-100 flex items-center justify-center text-salvia shrink-0">
              <HelpCircle className="w-6 h-6 stroke-current fill-none" />
            </div>
            <div>
              <p className="font-syne font-bold text-lg text-grafito">
                ¿No sabes en qué estado está tu web?
              </p>
              <p className="text-sm text-pizarra mt-0.5">
                Reviso tu web y te cuento qué mejorar. Es gratis y sin compromiso.
              </p>
            </div>
          </div>

          <a
            href={`${siteData.contact.whatsappLink}?text=${encodeURIComponent("Hola, quiero una revisión gratis de mi web.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full md:w-auto"
          >
            <span>Solicitar revisión rápida</span>
            <ArrowRight className="w-4 h-4 text-fiordo" />
          </a>
        </div>

      </div>
    </section>
  );
};
