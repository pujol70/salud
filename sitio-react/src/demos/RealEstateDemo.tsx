import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Building, 
  MapPin, 
  Filter, 
  X, 
  MessageCircle, 
  Send, 
  Key, 
  AlertCircle,
  Home,
  CheckCircle2,
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import { siteData, formatUSD } from '../siteData';

interface RealEstateDemoProps {
  onBack: () => void;
}

export const RealEstateDemo: React.FC<RealEstateDemoProps> = ({ onBack }) => {
  const [showDemoModal, setShowDemoModal] = useState<boolean>(false);
  
  // Interactive Filter States
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [filtroZona, setFiltroZona] = useState<string>('todas');
  const [filtroPrecio, setFiltroPrecio] = useState<string>('todos');

  // Dossier form state
  const [dossierName, setDossierName] = useState('');
  const [dossierPhone, setDossierPhone] = useState('');
  const [dossierEmail, setDossierEmail] = useState('');

  const properties = siteData.realEstateProperties;

  // Filter logic
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Filter by type
      if (filtroTipo !== 'todos' && prop.type !== filtroTipo) {
        return false;
      }

      // Filter by zone
      if (filtroZona !== 'todas' && prop.zone !== filtroZona) {
        return false;
      }

      // Filter by price range
      if (filtroPrecio === '100k' && prop.priceUSD > 100000) {
        return false;
      }
      if (filtroPrecio === '100k-200k' && (prop.priceUSD < 100000 || prop.priceUSD > 200000)) {
        return false;
      }
      if (filtroPrecio === '200k-350k' && (prop.priceUSD < 200000 || prop.priceUSD > 350000)) {
        return false;
      }
      if (filtroPrecio === '350k+' && prop.priceUSD < 350000) {
        return false;
      }

      return true;
    });
  }, [properties, filtroTipo, filtroZona, filtroPrecio]);

  const handleResetFilters = () => {
    setFiltroTipo('todos');
    setFiltroZona('todas');
    setFiltroPrecio('todos');
  };

  const handleAction = (e?: React.MouseEvent | React.FormEvent) => {
    if (e) e.preventDefault();
    setShowDemoModal(true);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F6] text-[#201A18] font-sans">
      
      {/* Top Demo Banner */}
      <div className="sticky top-0 z-50 bg-[#2A2421] text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-x-3 gap-y-1 shadow-md">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 font-bold hover:text-[#FFB59A] transition-colors focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a ECRISTIA</span>
        </button>

        <span className="order-last w-full text-center sm:order-none sm:w-auto uppercase tracking-wider text-[11px] text-[#DBC1B8]">
          Demo de concepto, no es un cliente real — Arquitectura de portal inmobiliario Asunción
        </span>

        <button
          type="button"
          onClick={onBack}
          className="px-2.5 py-1 rounded bg-[#B85D38] text-white text-xs hover:bg-[#994522] transition-colors"
        >
          Cerrar demo
        </button>
      </div>

      {/* Inmobiliaria Header */}
      <header className="bg-white border-b border-[#E5DDD0] shadow-sm">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#F8EBE6] border border-[#DBC1B8] flex items-center justify-center text-[#B85D38]">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg text-[#201A18] tracking-tight block uppercase">
                Inmobiliaria Ejemplo
              </span>
              <span className="text-[11px] text-[#825430] uppercase tracking-widest font-semibold">
                Asunción · Paraguay
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleAction}
              className="px-4 py-2 rounded bg-[#994522] text-white text-xs sm:text-sm font-semibold hover:bg-[#B85D38] transition-colors"
            >
              Contactar Asesor
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 py-10 space-y-16">
        
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8EBE6] text-[#825430] text-xs font-semibold border border-[#DBC1B8]">
              <MapPin className="w-3.5 h-3.5 text-[#B85D38]" />
              <span>Curaduría Inmobiliaria Asunción</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#201A18] tracking-tight leading-tight">
              Encuentra tu próximo espacio en las mejores zonas de Asunción
            </h1>

            <p className="text-base text-[#55433C] leading-relaxed max-w-xl">
              Departamentos de autor, residencias exclusivas y proyectos en pozo en Villa Morra, Santa Teresa, Carmelitas y Mburucuyá. Asesoría inmobiliaria transparente.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="#catalogo"
                className="px-6 py-3 rounded bg-[#994522] text-white font-semibold text-sm shadow hover:bg-[#B85D38] transition-all"
              >
                Explorar Catálogo
              </a>
              <button
                type="button"
                onClick={handleAction}
                className="px-5 py-3 rounded bg-[#F8EBE6] text-[#201A18] border border-[#DBC1B8] font-semibold text-sm hover:bg-[#F2E6E1] transition-all"
              >
                Simular Inversión
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-3 rounded-2xl border border-[#E5DDD0] shadow-xl">
            <div className="relative rounded-xl overflow-hidden aspect-[16/11] bg-[#F2E6E1] flex items-center justify-center">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEdr9uUAJ9TKenx4oJRO8lVKSk88gkJ8B9-gK0Z8UMyU2TjhWTOib9qsg7DcNhH1Gt-XqMw4oGWKvbJbfu9sSkNNizHsn-tpnOlEU3wXuYT2Lt748cZt_JYDpqbxcf6-0Ca6eGrc4yFEc4Ca8dijPBb2oQJjiNmC7vdhHG3uLM-2--BBTWfBtlW4pY3xua0FRFB8H7Fqv_l3nd8-FeVZAbJRlEny6jlDHeQMrpt6vnYoSEtrrX1I7z" 
                alt="Fachada residencial en Asunción"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-lg shadow-sm border border-[#E5DDD0]">
                <span className="font-bold text-xs text-[#201A18] block">Edificio Santa Teresa</span>
                <span className="text-[11px] text-[#825430]">Eje Corporativo Asunción</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Bar (Real Functioning) */}
        <section id="catalogo" className="bg-[#F8EBE6] p-6 rounded-2xl border border-[#E5DDD0] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DBC1B8]/60 pb-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#B85D38]" />
              <span className="font-bold text-sm text-[#201A18]">Filtrar residencias disponibles</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-[#55433C]">
                Mostrando <strong className="text-[#994522]">{filteredProperties.length}</strong> de {properties.length} residencias
              </span>
              {(filtroTipo !== 'todos' || filtroZona !== 'todas' || filtroPrecio !== 'todos') && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 text-xs text-[#B85D38] font-bold hover:underline"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Limpiar filtros</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            
            {/* Filter 1: Tipo */}
            <div>
              <label className="block text-xs font-semibold text-[#55433C] mb-1">
                Tipo de Propiedad
              </label>
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="w-full text-xs p-2.5 rounded bg-white border border-[#DBC1B8] text-[#201A18] focus:outline-none focus:border-[#B85D38]"
              >
                <option value="todos">Todos los tipos</option>
                <option value="departamentos">Departamentos</option>
                <option value="casas">Casas & Dúplex</option>
                <option value="penthouse">Penthouses</option>
              </select>
            </div>

            {/* Filter 2: Zona */}
            <div>
              <label className="block text-xs font-semibold text-[#55433C] mb-1">
                Zona de Asunción
              </label>
              <select
                value={filtroZona}
                onChange={(e) => setFiltroZona(e.target.value)}
                className="w-full text-xs p-2.5 rounded bg-white border border-[#DBC1B8] text-[#201A18] focus:outline-none focus:border-[#B85D38]"
              >
                <option value="todas">Todas las zonas</option>
                <option value="villa-morra">Villa Morra</option>
                <option value="santa-teresa">Santa Teresa</option>
                <option value="carmelitas">Las Lomas / Carmelitas</option>
                <option value="mburucuya">Mburucuyá</option>
                <option value="manora">Manorá / Shopping del Sol</option>
                <option value="yykua-sati">Yykua Satî</option>
              </select>
            </div>

            {/* Filter 3: Precio */}
            <div>
              <label className="block text-xs font-semibold text-[#55433C] mb-1">
                Rango de Precio (USD)
              </label>
              <select
                value={filtroPrecio}
                onChange={(e) => setFiltroPrecio(e.target.value)}
                className="w-full text-xs p-2.5 rounded bg-white border border-[#DBC1B8] text-[#201A18] focus:outline-none focus:border-[#B85D38]"
              >
                <option value="todos">Todos los precios</option>
                <option value="100k">Hasta USD 100.000</option>
                <option value="100k-200k">USD 100k - 200k</option>
                <option value="200k-350k">USD 200k - 350k</option>
                <option value="350k+">Más de USD 350.000</option>
              </select>
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleResetFilters}
                className="w-full py-2.5 px-3 rounded bg-white border border-[#DBC1B8] text-xs font-semibold text-[#825430] hover:bg-[#F2E6E1] transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer</span>
              </button>
            </div>

          </div>
        </section>

        {/* Property Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#201A18]">
              Propiedades Destacadas en Asunción
            </h2>
            <span className="text-xs text-[#825430] font-mono">
              {filteredProperties.length} unidades encontradas
            </span>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-[#E5DDD0] space-y-4">
              <Building className="w-12 h-12 text-[#DBC1B8] mx-auto" />
              <h3 className="font-bold text-lg text-[#201A18]">
                No se encontraron propiedades con los filtros seleccionados
              </h3>
              <p className="text-sm text-[#55433C] max-w-md mx-auto">
                Prueba ajustando el rango de precio o cambiando la zona para ver las opciones disponibles en Asunción.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded bg-[#994522] text-white text-xs font-bold hover:bg-[#B85D38] transition-colors"
              >
                Ver todas las propiedades
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((prop) => (
                <article
                  key={prop.id}
                  className="bg-white rounded-xl overflow-hidden border border-[#E5DDD0] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* SVG architectural preview */}
                    <div className="relative aspect-[16/10] bg-[#F8EBE6] p-4 flex flex-col justify-between overflow-hidden">
                      <div className="flex justify-between items-start z-10">
                        <span className="bg-white/95 text-[#994522] text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                          {prop.tag}
                        </span>
                        <span className="bg-[#2A2421]/80 text-white text-[10px] px-2 py-0.5 rounded">
                          {prop.zoneDisplay}
                        </span>
                      </div>

                      {/* Schematic Graphic */}
                      <div className="my-auto opacity-70 flex justify-center items-center">
                        <div className="w-32 h-20 border border-[#DBC1B8] rounded flex flex-col justify-between p-1 bg-[#FFF8F6]">
                          <div className="h-2 w-12 bg-[#B85D38]/40 rounded"></div>
                          <div className="grid grid-cols-2 gap-1">
                            <div className="h-6 bg-[#DBC1B8]/40 rounded"></div>
                            <div className="h-6 bg-[#DBC1B8]/40 rounded"></div>
                          </div>
                        </div>
                      </div>

                      <div className="text-[10px] text-[#825430] z-10 font-mono">
                        {prop.typeDisplay} · {prop.zoneDisplay}
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-xl text-[#994522]">
                          {formatUSD(prop.priceUSD)}
                        </span>
                        {prop.deliveryDate && (
                          <span className="text-[10px] text-[#825430] font-mono">
                            {prop.deliveryDate}
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-base text-[#201A18] leading-tight">
                        {prop.title}
                      </h3>

                      <p className="text-xs text-[#55433C] line-clamp-2">
                        {prop.featureSubtitle}
                      </p>

                      {/* Specs */}
                      <div className="grid grid-cols-3 gap-2 py-2 bg-[#FFF8F6] rounded p-2 text-center text-xs border border-[#E5DDD0]/60">
                        <div>
                          <span className="text-[10px] text-[#825430] block">Dorms</span>
                          <span className="font-bold text-[#201A18]">{prop.dormsDisplay}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#825430] block">Área</span>
                          <span className="font-bold text-[#201A18]">{prop.areaM2} m²</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#825430] block">Detalle</span>
                          <span className="font-bold text-[#201A18] truncate block" title={prop.amenities}>
                            {prop.amenities}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleAction()}
                      className="flex-1 py-2 px-3 rounded bg-[#F8EBE6] text-[#201A18] text-xs font-semibold hover:bg-[#F2E6E1] transition-colors"
                    >
                      Ver ficha completa
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAction()}
                      className="p-2 rounded bg-[#994522] text-white hover:bg-[#B85D38] transition-colors"
                      title="Consultar por WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Featured Project & Dossier Section */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-[#E5DDD0] shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#994522] bg-[#F8EBE6] px-2.5 py-1 rounded">
                Oportunidad Institucional
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#201A18]">
                {siteData.featuredInmoProject.title}
              </h2>
              <p className="text-sm text-[#55433C] leading-relaxed">
                {siteData.featuredInmoProject.description}
              </p>

              <div className="space-y-3 pt-2">
                {siteData.featuredInmoProject.features.map((feat, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-[#FFF8F6] border border-[#E5DDD0] flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#B85D38] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs text-[#201A18]">{feat.title}</h4>
                      <p className="text-xs text-[#55433C] mt-0.5">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-[#825430] font-mono pt-2">
                {siteData.featuredInmoProject.legal}
              </p>
            </div>

            {/* Dossier Form */}
            <div className="lg:col-span-6 bg-[#F8EBE6] p-6 rounded-xl border border-[#DBC1B8]">
              <h3 className="font-bold text-base text-[#201A18] mb-1">
                Solicitud de Dossier & Plan de Pagos
              </h3>
              <p className="text-xs text-[#55433C] mb-4">
                Recibe la memoria descriptiva y tabla financiera en PDF.
              </p>

              <form onSubmit={handleAction} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#55433C] mb-1">Nombre y Apellido *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez"
                    value={dossierName}
                    onChange={(e) => setDossierName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded bg-white border border-[#DBC1B8] focus:outline-none focus:border-[#B85D38]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#55433C] mb-1">WhatsApp / Celular *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+595 981 123 456"
                      value={dossierPhone}
                      onChange={(e) => setDossierPhone(e.target.value)}
                      className="w-full text-xs p-2.5 rounded bg-white border border-[#DBC1B8] focus:outline-none focus:border-[#B85D38]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#55433C] mb-1">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      placeholder="inversor@ejemplo.com"
                      value={dossierEmail}
                      onChange={(e) => setDossierEmail(e.target.value)}
                      className="w-full text-xs p-2.5 rounded bg-white border border-[#DBC1B8] focus:outline-none focus:border-[#B85D38]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#55433C] mb-1">Rango de Capital Estimado</label>
                  <select className="w-full text-xs p-2.5 rounded bg-white border border-[#DBC1B8] focus:outline-none focus:border-[#B85D38]">
                    <option>USD 70.000 — 150.000</option>
                    <option>USD 30.000 — 70.000</option>
                    <option>Más de USD 150.000</option>
                    <option>Portafolio / Múltiples unidades</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded bg-[#994522] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#B85D38] transition-colors mt-2"
                >
                  Solicitar Dossier de Inversión
                </button>
              </form>
            </div>

          </div>
        </section>

      </main>

      {/* Demo notice modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-[#F8EBE6] text-[#994522] flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[#201A18]">Es una demo de concepto</h3>
            <p className="text-sm text-[#55433C] leading-relaxed">
              Esta es una pantalla de demostración de arquitectura de portal inmobiliario para Asunción desarrollada por ECRISTIA. No envía consultas ni reservas reales.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setShowDemoModal(false)}
                className="w-full py-2.5 rounded-lg bg-[#994522] text-white font-semibold text-sm hover:bg-[#B85D38] transition-colors"
              >
                Continuar navegando la demo
              </button>
              <button
                type="button"
                onClick={onBack}
                className="w-full py-2.5 rounded-lg bg-[#F8EBE6] text-[#201A18] font-semibold text-sm hover:bg-[#F2E6E1] transition-colors"
              >
                Volver al sitio de ECRISTIA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inmobiliaria Footer */}
      <footer className="bg-[#2A2421] text-[#DBC1B8] py-8 text-xs text-center">
        <div className="max-w-7xl mx-auto px-5 space-y-2">
          <p className="font-semibold text-white">
            Inmobiliaria Ejemplo · Asunción, Paraguay
          </p>
          <p className="text-[#88726B]">
            Demo de concepto diseñada para demostración de arquitectura web en Asunción por ECRISTIA.
          </p>
        </div>
      </footer>

    </div>
  );
};
