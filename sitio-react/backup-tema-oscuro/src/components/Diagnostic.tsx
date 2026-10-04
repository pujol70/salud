import React from 'react';
import { MessageSquare, SearchX, Smartphone, Shield, ArrowRight, HelpCircle } from 'lucide-react';
import { siteData } from '../siteData';

export const Diagnostic: React.FC = () => {
  const icons = [
    <MessageSquare className="w-6 h-6 text-[#F97316]" key="1" />,
    <SearchX className="w-6 h-6 text-[#F97316]" key="2" />,
    <Smartphone className="w-6 h-6 text-[#F97316]" key="3" />,
    <Shield className="w-6 h-6 text-[#F97316]" key="4" />
  ];

  return (
    <section className="w-full py-20 lg:py-24 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-mono text-[#F97316] uppercase tracking-wider font-semibold mb-2">
            // Diagnóstico
          </div>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Lo que le pasa a un negocio sin una <span className="text-[#F97316]">web que trabaje</span> por él
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#9CA3AF]">
            Tener presencia digital improvisada cuesta clientes y tiempo cada semana en Asunción.
          </p>
        </div>

        {/* 4 Diagnostic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteData.diagnosticCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-[#374151] p-6 sm:p-7 rounded-xl border border-[#4B5563] flex flex-col justify-between card-hover-glow group"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#1F2937] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {icons[idx]}
                </div>
                <h3 className="font-syne font-bold text-lg text-white group-hover:text-[#F97316] transition-colors leading-snug">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm text-[#D1D5DB] leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#4B5563]/60 flex items-center gap-1.5 text-xs font-mono text-[#9CA3AF]">
                <span className="text-[#F97316] font-bold">&gt;</span>
                <span>Solución: {card.solution}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Review Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-xl bg-[#1F2937] border border-[#4B5563] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F97316]/20 flex items-center justify-center text-[#F97316] shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="font-syne font-bold text-lg text-white">
                ¿No estás seguro del estado actual de tu web?
              </p>
              <p className="text-sm text-[#9CA3AF] mt-0.5">
                Hacemos un análisis técnico y comercial en menos de 24 horas sin costo ni compromiso.
              </p>
            </div>
          </div>

          <a
            href={`${siteData.contact.whatsappLink}?text=${encodeURIComponent("Hola ECRISTIA, quiero una revisión rápida sin costo de mi web.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full md:w-auto"
          >
            <span>Solicitar revisión rápida</span>
            <ArrowRight className="w-4 h-4 text-[#F97316]" />
          </a>
        </div>

      </div>
    </section>
  );
};
