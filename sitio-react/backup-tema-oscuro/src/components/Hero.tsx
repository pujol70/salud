import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, CheckCircle2, ShieldCheck, Sparkles, RefreshCw, Lock } from 'lucide-react';
import { siteData } from '../siteData';

export const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section 
      id="inicio"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative w-full pt-32 pb-20 lg:pt-36 lg:pb-28 bg-[#111827] overflow-hidden"
    >
      {/* Background dot matrix */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 [background-image:radial-gradient(#4B5563_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      {/* Dynamic or Autonomous Glow Orb */}
      {!prefersReducedMotion && (
        <div
          className="absolute pointer-events-none w-[500px] h-[500px] rounded-full bg-[#F97316]/15 blur-[120px] transition-all duration-300 ease-out hidden md:block"
          style={{
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Autonomous slow-moving glow on mobile */}
      {!prefersReducedMotion && (
        <div 
          className="md:hidden absolute top-1/4 right-0 w-[280px] h-[280px] rounded-full bg-[#F97316]/15 blur-[90px] animate-pulse pointer-events-none"
          aria-hidden="true"
        />
      )}

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Tag / Etiqueta */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F2937] border border-[#4B5563]/50 text-xs text-[#9CA3AF] mb-6">
              <span className="inline-block w-2 h-2 rounded-full bg-[#F97316] animate-pulse"></span>
              <span className="text-[#D1D5DB] font-medium">Para clínicas, inmobiliarias y estudios</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-syne font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
              Que te encuentren en <span className="text-[#F97316]">Google</span> y lo vean todo antes de escribirte
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg sm:text-xl text-[#9CA3AF] leading-relaxed max-w-2xl">
              Hago webs con tus servicios, horarios y turnos a la vista, y tu ficha de Google al día, para que dejes de responder lo mismo por WhatsApp todos los días.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="#contacto"
                className="btn-primary text-base py-3.5 px-6 w-full sm:w-auto shadow-[0_0_24px_rgba(249,115,22,0.4)] flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-5 h-5 fill-current" />
                <span>Pedir auditoría gratis de mi web</span>
              </a>

              <a
                href="#precios"
                className="btn-secondary text-base py-3.5 px-6 w-full sm:w-auto text-center flex items-center justify-center gap-2"
              >
                <span>Ver precios</span>
              </a>
            </div>

            {/* Micro-trust points */}
            <div className="mt-8 pt-6 border-t border-[#4B5563]/40 flex flex-wrap items-center gap-y-2 gap-x-5 text-sm text-[#9CA3AF]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#F97316]" />
                <span>Precios publicados</span>
              </div>
              <span className="text-[#4B5563] hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#F97316]" />
                <span>Entrega en 7 a 20 días hábiles</span>
              </div>
              <span className="text-[#4B5563] hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#F97316]" />
                <span>Soporte directo por WhatsApp</span>
              </div>
            </div>
          </div>

          {/* Right Column: Code & UI Mockup Window */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl bg-[#1F2937] border border-[#4B5563] shadow-2xl overflow-hidden">
              
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#374151]/80 border-b border-[#4B5563]">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#EF4444] inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-[#F59E0B] inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-[#10B981] inline-block"></span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#111827] text-xs font-mono text-[#9CA3AF]">
                  <Lock className="w-3 h-3 text-[#F97316]" />
                  <span className="truncate max-w-[180px]">ecristia.com/preview/clinica-asuncion</span>
                </div>
                <RefreshCw className="w-3.5 h-3.5 text-[#9CA3AF]" />
              </div>

              {/* Window Content: Code + Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#4B5563]/60 bg-[#111827]">
                
                {/* Code Panel */}
                <div className="p-4 font-mono text-[11px] leading-relaxed text-[#9CA3AF] select-none bg-[#0D131F]">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#4B5563]/40 text-xs">
                    <span>deploy_spec.ts</span>
                    <span className="text-[#F97316] font-bold">READY</span>
                  </div>
                  <div className="space-y-1">
                    <div><span className="text-[#6B7280]">01</span> <span className="text-[#6B7280]">// stack: react + tailwind</span></div>
                    <div><span className="text-[#6B7280]">02</span> <span className="text-[#F97316]">const</span> project = &#123;</div>
                    <div><span className="text-[#6B7280]">03</span> &nbsp;&nbsp;city: <span className="text-[#10B981]">'Asunción, PY'</span>,</div>
                    <div><span className="text-[#6B7280]">04</span> &nbsp;&nbsp;pack: <span className="text-[#10B981]">'Profesional'</span>,</div>
                    <div><span className="text-[#6B7280]">05</span> &nbsp;&nbsp;directWhatsapp: <span className="text-[#F97316]">true</span>,</div>
                    <div><span className="text-[#6B7280]">06</span> &nbsp;&nbsp;price: <span className="text-[#F97316]">'Gs. 4.200.000'</span></div>
                    <div><span className="text-[#6B7280]">07</span> &#125;;</div>
                    <div><span className="text-[#6B7280]">08</span> <span className="text-[#F97316]">deploy</span>(project);</div>
                  </div>

                  <div className="mt-4 p-2 rounded bg-[#1F2937]/70 border border-[#4B5563]/40">
                    <div className="flex items-center justify-between text-[10px]">
                      <span>Latency ASU Edge</span>
                      <span className="text-[#10B981] font-bold">14ms</span>
                    </div>
                    <div className="w-full bg-[#111827] rounded-full h-1.5 mt-1 overflow-hidden">
                      <div className="bg-[#F97316] h-full w-[96%] rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Live Preview Card */}
                <div className="p-4 bg-[#1F2937] flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-[#F97316]/20 text-[#F97316] text-[10px] font-bold uppercase tracking-wider">
                        100% Optimizado
                      </span>
                      <span className="text-[#10B981] text-[11px] font-mono">⚡ 0.4s</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">SALUD & BIENESTAR</span>
                      <h2 className="font-syne font-bold text-sm text-white mt-0.5">
                        Clínica Dental Ejemplo
                      </h2>
                      <p className="text-[11px] text-[#9CA3AF] mt-1 line-clamp-2">
                        Atención ambulatoria de primer nivel en Villa Morra. Turnos directos por WhatsApp.
                      </p>
                    </div>

                    <div className="bg-[#111827] p-2.5 rounded-lg border border-[#4B5563]/40 space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-white font-medium">Turnos Online</span>
                        <span className="text-[#F97316] font-mono text-[10px]">Villa Morra</span>
                      </div>
                      <div className="text-[10px] text-[#9CA3AF] bg-[#1F2937] px-2 py-1 rounded">
                        Dra. Valeria Benítez Arce
                      </div>
                      <div className="w-full py-1 bg-[#F97316] text-[#111827] font-bold text-[10px] rounded text-center">
                        Agendar por WhatsApp
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t border-[#4B5563]/40 flex items-center justify-between text-[10px] text-[#9CA3AF] font-mono">
                    <span>SSL ACTIVO</span>
                    <span className="text-[#10B981] font-bold">PROD // LIVE</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
