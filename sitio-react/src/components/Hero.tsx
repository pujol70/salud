import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section 
      id="inicio"
      className="relative w-full pt-24 sm:pt-28 min-[901px]:pt-36 pb-20 min-[901px]:pb-28 bg-bruma overflow-hidden"
    >
      {/* Background dot matrix */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 [background-image:radial-gradient(var(--color-linea)_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start z-10 w-full">
            {/* Tag / Etiqueta del hero: píldora con fondo nieve, borde linea y texto pizarra */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nieve border border-linea text-xs text-pizarra shadow-suave mb-6 max-w-full">
              <span className="inline-block w-2 h-2 rounded-full bg-arcilla animate-pulse shrink-0"></span>
              <span className="text-pizarra font-medium truncate">Para clínicas, inmobiliarias y estudios profesionales</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-6xl text-grafito tracking-tight leading-[1.08]">
              Que te encuentren en <span className="text-fiordo">Google</span> y vean todo lo que necesitan antes de escribirte
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-xl text-pizarra leading-relaxed max-w-2xl">
              Hago webs donde tus clientes ven tus servicios, horarios y turnos, y mantengo al día tu ficha de Google. Así dejas de responder las mismas preguntas por WhatsApp todos los días.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="#contacto"
                className="btn-primary text-sm sm:text-base py-3.5 px-4 sm:px-6 w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-5 h-5 fill-none stroke-current shrink-0" />
                <span>Pedir una revisión gratis de mi web</span>
              </a>

              <a
                href="#precios"
                className="btn-secondary text-sm sm:text-base py-3.5 px-4 sm:px-6 w-full sm:w-auto text-center flex items-center justify-center gap-2"
              >
                <span>Ver precios</span>
              </a>
            </div>

            {/* Micro-trust points */}
            <div className="mt-8 pt-6 border-t border-linea flex flex-wrap items-center gap-y-2 gap-x-5 text-sm text-pizarra">
              <div className="flex items-center gap-1.5 shrink-0">
                <CheckCircle2 className="w-4 h-4 text-salvia shrink-0" />
                <span>Precios publicados</span>
              </div>
              <span className="text-linea hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5 shrink-0">
                <CheckCircle2 className="w-4 h-4 text-salvia shrink-0" />
                <span>Entrega en 7 a 20 días hábiles</span>
              </div>
              <span className="text-linea hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5 shrink-0">
                <CheckCircle2 className="w-4 h-4 text-salvia shrink-0" />
                <span>Soporte directo por WhatsApp</span>
              </div>
            </div>
          </div>

          {/* Columna derecha: foto del hero, con sombra para que parezca flotar */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center py-4">
            <img
              src="/images/hero.webp"
              srcSet="/images/hero-650.webp 650w, /images/hero.webp 1086w"
              sizes="(min-width: 1024px) 420px, (min-width: 640px) 400px, 90vw"
              alt="Persona editando en una notebook el sitio web de una clínica"
              width="1086"
              height="1448"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[420px] h-auto max-h-[min(620px,80vh)] object-cover rounded-[24px] select-none"
              style={{
                aspectRatio: '3 / 4',
                boxShadow:
                  '0 2px 4px rgba(31, 42, 51, 0.06), 0 18px 32px -10px rgba(31, 42, 51, 0.25), 0 48px 72px -24px rgba(31, 42, 51, 0.35)',
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
};
