import React from 'react';
import { Smartphone, Code, ShieldCheck, MapPin, Wrench, CheckCircle } from 'lucide-react';
import { siteData, formatGs } from '../siteData';

export const ServicesBento: React.FC = () => {
  return (
    <section id="servicios" className="w-full py-20 lg:py-24 bg-bruma">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salvia-100 text-fiordo text-xs uppercase tracking-wider font-semibold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-fiordo"></span>
              <span>Servicios</span>
            </div>
            <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-grafito tracking-tight">
              Todo lo que necesita tu web, <span className="text-fiordo">en un solo lugar</span>
            </h2>
          </div>
          <p className="text-base text-pizarra max-w-md">
            Del diseño al mantenimiento mensual, con una sola persona a cargo y sin costos ocultos.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card A: Diseño web a medida (Cols 1-7) */}
          <div className="md:col-span-7 bg-nieve rounded-[24px] p-6 sm:p-8 border border-linea flex flex-col justify-between card-hover-glow shadow-suave group">
            <div className="max-w-lg">
              <div className="w-12 h-12 rounded-full bg-salvia-100 flex items-center justify-center text-salvia mb-5 group-hover:scale-105 transition-transform">
                <Smartphone className="w-5 h-5 text-salvia stroke-current fill-none" />
              </div>
              <h3 className="font-syne font-bold text-xl sm:text-2xl text-grafito mb-2">
                Diseño web a medida
              </h3>
              <p className="text-sm sm:text-base text-pizarra mb-6">
                Un diseño pensado para tu rubro y para el celular, no una plantilla genérica.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3.5 py-1 bg-arena border border-linea text-xs text-grafito rounded-full font-medium">
                  Pensado para celular
                </span>
                <span className="px-3.5 py-1 bg-arena border border-linea text-xs text-grafito rounded-full font-medium">
                  Diseño propio
                </span>
                <span className="px-3.5 py-1 bg-arena border border-linea text-xs text-grafito rounded-full font-medium">
                  Con tu logo y tus colores
                </span>
              </div>
            </div>

            {/* Schematic Mobile Viewport Graphic */}
            <div className="w-full bg-arena rounded-[14px] p-4 border border-linea flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-pizarra pb-2 border-b border-linea">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80"></span>
                </div>
                <span>Vista en celular</span>
              </div>
              <div className="grid grid-cols-3 gap-2 my-4">
                <div className="h-16 rounded-[10px] bg-nieve p-2 flex flex-col justify-between border border-linea">
                  <span className="h-2 w-8 bg-fiordo/30 rounded-full"></span>
                  <div className="space-y-1">
                    <span className="block h-1.5 w-full bg-arena rounded-full"></span>
                    <span className="block h-1.5 w-2/3 bg-arena rounded-full"></span>
                  </div>
                </div>
                <div className="h-16 rounded-[10px] bg-salvia-100 p-2 flex flex-col justify-between border border-salvia/40">
                  <span className="h-2 w-10 bg-fiordo rounded-full"></span>
                  <div className="space-y-1">
                    <span className="block h-1.5 w-full bg-fiordo/20 rounded-full"></span>
                    <span className="block h-1.5 w-1/2 bg-fiordo/20 rounded-full"></span>
                  </div>
                </div>
                <div className="h-16 rounded-[10px] bg-nieve p-2 flex flex-col justify-between border border-linea">
                  <span className="h-2 w-7 bg-arena rounded-full"></span>
                  <div className="space-y-1">
                    <span className="block h-1.5 w-full bg-arena rounded-full"></span>
                    <span className="block h-1.5 w-3/4 bg-arena rounded-full"></span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-pizarra">Se adapta a cualquier pantalla</span>
              </div>
            </div>
          </div>

          {/* Card B: Desarrollo (Cols 8-12) */}
          <div className="md:col-span-5 bg-nieve rounded-[24px] p-6 sm:p-8 border border-linea flex flex-col justify-between card-hover-glow shadow-suave group">
            <div>
              <div className="w-12 h-12 rounded-full bg-salvia-100 flex items-center justify-center text-salvia mb-5 group-hover:scale-105 transition-transform">
                <Code className="w-5 h-5 text-salvia stroke-current fill-none" />
              </div>
              <h3 className="font-syne font-bold text-xl sm:text-2xl text-grafito mb-2">
                Desarrollo
              </h3>
              <p className="text-sm sm:text-base text-pizarra mb-6">
                En WordPress, Shopify o código a medida, según lo que necesite tu negocio.
              </p>
            </div>

            {/* Qué uso en cada caso */}
            <ul className="bg-arena rounded-[14px] p-4 text-sm border border-linea text-grafito space-y-2.5">
              <li><span className="font-bold text-fiordo">WordPress:</span> webs que editas tú mismo.</li>
              <li><span className="font-bold text-fiordo">Shopify:</span> tiendas online.</li>
              <li><span className="font-bold text-fiordo">Código a medida:</span> cuando necesitas algo especial.</li>
            </ul>
          </div>

          {/* Card C: Mantenimiento mensual (Cols 1-4) */}
          <div className="md:col-span-4 bg-nieve rounded-[24px] p-6 sm:p-8 border border-linea flex flex-col justify-between card-hover-glow shadow-suave group">
            <div>
              <div className="w-12 h-12 rounded-full bg-salvia-100 flex items-center justify-center text-salvia mb-5 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 text-salvia stroke-current fill-none" />
              </div>
              <h3 className="font-syne font-bold text-lg sm:text-xl text-grafito mb-2">
                Mantenimiento mensual
              </h3>
              <p className="text-sm text-pizarra mb-6">
                Hosting, seguridad, copias de seguridad y cambios, por un monto fijo al mes.
              </p>
            </div>

            <div className="bg-arena rounded-[14px] p-3.5 border border-linea space-y-2">
              <div className="flex items-center justify-between text-xs text-pizarra">
                <span>Copias de seguridad</span>
                <span className="text-fiordo font-bold">Automáticas</span>
              </div>
              <div className="flex items-center justify-between text-xs text-pizarra">
                <span>Soporte por WhatsApp</span>
                <span className="text-fiordo font-bold">Directo</span>
              </div>
            </div>
          </div>

          {/* Card D: Ficha de Google & WhatsApp (Cols 5-8) */}
          <div className="md:col-span-4 bg-nieve rounded-[24px] p-6 sm:p-8 border border-linea flex flex-col justify-between card-hover-glow shadow-suave group">
            <div>
              <div className="w-12 h-12 rounded-full bg-salvia-100 flex items-center justify-center text-salvia mb-5 group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5 text-salvia stroke-current fill-none" />
              </div>
              <h3 className="font-syne font-bold text-lg sm:text-xl text-grafito mb-2">
                Ficha de Google y WhatsApp
              </h3>
              <p className="text-sm text-pizarra mb-6">
                Preparo tu ficha de Google y pongo el botón de WhatsApp en tu web desde el primer día.
              </p>
            </div>

            <div className="bg-arena rounded-[14px] p-3.5 border border-linea flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-salvia-100 flex items-center justify-center text-salvia">
                  <CheckCircle className="w-4 h-4 stroke-current fill-none" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-grafito">Ficha de Google</div>
                  <div className="text-[11px] text-pizarra">Con tus datos y tus horarios</div>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-salvia-100 text-fiordo rounded-full text-[10px] font-bold">
                Incluido
              </span>
            </div>
          </div>

          {/* Card E: Rescate de webs (Cols 9-12) */}
          <div className="md:col-span-4 bg-nieve rounded-[24px] p-6 sm:p-8 border border-linea flex flex-col justify-between card-hover-glow shadow-suave group">
            <div>
              <div className="w-12 h-12 rounded-full bg-salvia-100 flex items-center justify-center text-salvia mb-5 group-hover:scale-105 transition-transform">
                <Wrench className="w-5 h-5 text-salvia stroke-current fill-none" />
              </div>
              <h3 className="font-syne font-bold text-lg sm:text-xl text-grafito mb-2">
                Rescate de webs
              </h3>
              <p className="text-sm text-pizarra mb-6">
                {siteData.rescueWeb.subtitle}
              </p>
            </div>

            <div className="bg-arena rounded-[14px] p-3.5 border border-linea flex items-center justify-between">
              <div>
                <span className="text-[11px] text-pizarra block">Cargo inicial</span>
                <span className="font-syne font-extrabold text-grafito text-base">
                  {formatGs(siteData.rescueWeb.initialFee)}
                </span>
              </div>
              <span className="px-3 py-1 bg-nieve text-fiordo text-xs rounded-full border border-linea">
                Incluye plan Pro
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
