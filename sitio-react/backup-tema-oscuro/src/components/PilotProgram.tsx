import React from 'react';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { siteData } from '../siteData';

export const PilotProgram: React.FC = () => {
  const waUrl = `${siteData.contact.whatsappLink}?text=${encodeURIComponent(siteData.pilotProgram.whatsappMessage)}`;

  return (
    <section className="w-full py-20 lg:py-24 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="relative rounded-2xl p-8 sm:p-12 lg:p-14 bg-[#374151] border-2 border-[#F97316] shadow-[0_0_40px_rgba(249,115,22,0.18)] overflow-hidden">
          
          {/* Ambient Glow */}
          <div 
            className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#F97316]/10 blur-3xl pointer-events-none" 
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#F97316]/20 text-[#F97316] border border-[#F97316]/30">
                  Oportunidad Estratégica
                </span>
                <span className="text-xs font-mono text-[#9CA3AF]">// Q2 2026</span>
              </div>

              <div className="flex flex-wrap items-baseline gap-4 my-2">
                <span className="font-syne font-extrabold text-4xl sm:text-6xl text-[#F97316] tracking-tight">
                  30% menos
                </span>
                <h3 className="font-syne font-bold text-2xl sm:text-3xl text-white">
                  Programa Piloto para Nuevos Casos de Estudio
                </h3>
              </div>

              <p className="mt-4 text-base sm:text-lg text-[#D1D5DB] leading-relaxed">
                {siteData.pilotProgram.conditions}
              </p>

              {/* Slots Available Counter */}
              <div className="mt-8 flex items-center gap-4 bg-[#1F2937] px-4 py-3 rounded-lg border border-[#4B5563] w-fit">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#4B5563] opacity-60"></span>
                  <span className="w-3.5 h-3.5 rounded-full bg-[#4B5563] opacity-60"></span>
                  <span className="w-3.5 h-3.5 rounded-full bg-[#F97316] animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]"></span>
                </div>
                <span className="text-xs sm:text-sm font-mono text-[#D1D5DB]">
                  Cupos disponibles: <strong className="text-[#F97316] font-bold">1 de 3 restantes</strong>
                </span>
              </div>
            </div>

            {/* CTA Column */}
            <div className="flex flex-col w-full sm:w-auto shrink-0 gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base py-4 px-8 text-center shadow-[0_0_24px_rgba(249,115,22,0.4)]"
              >
                <span>Quiero un cupo</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <span className="text-xs text-[#9CA3AF] text-center flex items-center justify-center gap-1.5 font-mono">
                <Clock className="w-3.5 h-3.5 text-[#F97316]" />
                <span>Respuesta en menos de 2 horas hábiles</span>
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
