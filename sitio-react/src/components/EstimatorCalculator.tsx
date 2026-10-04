import React, { useState } from 'react';
import { Calculator, MessageCircle, CheckCircle, Info, Lock } from 'lucide-react';
import { siteData, formatGs } from '../siteData';

export const EstimatorCalculator: React.FC = () => {
  // Selectors state
  const [selectedProjectId, setSelectedProjectId] = useState<string>('profesional');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('pro');

  // Available options
  const projectOptions = [
    { id: 'presencia', name: 'Web Presencia', cost: 1900000, desc: '1 a 3 secciones' },
    { id: 'profesional', name: 'Web Profesional', cost: 4200000, desc: 'Hasta 8 páginas' },
    { id: 'tienda', name: 'Tienda online', cost: 7500000, desc: 'Con carrito y pagos en línea' },
    { id: 'rescate', name: 'Rescate de web existente', cost: siteData.rescueWeb.initialFee, desc: 'Auditoría y alta Pro' }
  ];

  const planOptions = siteData.maintenancePlans;

  // Handler for project selection
  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    // Business rule: If Rescate is chosen and no plan was selected, auto-select Pro
    if (projectId === 'rescate' && selectedPlanId === 'sin_plan') {
      setSelectedPlanId('pro');
    }
  };

  // Handler for plan selection
  const handleSelectPlan = (planId: string) => {
    // Business rule: Rescate requires at least Pro plan
    if (selectedProjectId === 'rescate' && planId === 'sin_plan') {
      setSelectedPlanId('pro');
      return;
    }
    setSelectedPlanId(planId);
  };

  // Calculations
  const currentProject = projectOptions.find(p => p.id === selectedProjectId) || projectOptions[1];
  const currentPlan = planOptions.find(p => p.id === selectedPlanId) || planOptions[2];

  const isRescue = selectedProjectId === 'rescate';
  const hasPlan = selectedPlanId !== 'sin_plan';
  const deposit = Math.round(currentProject.cost * 0.5);

  // WhatsApp formatted message per brief:
  // "Hola, quiero cotizar: Profesional (Gs 4.200.000) con el plan de mantenimiento Pro (Gs 450.000/mes). ¿Podemos hablar?"
  let waSummaryMessage = '';
  if (hasPlan) {
    waSummaryMessage = `Hola, quiero cotizar: ${currentProject.name} (${formatGs(currentProject.cost)}) con el plan de mantenimiento ${currentPlan.name} (${formatGs(currentPlan.price)}/mes). ¿Podemos hablar?`;
  } else {
    waSummaryMessage = `Hola, quiero cotizar: ${currentProject.name} (${formatGs(currentProject.cost)}) sin plan de mantenimiento. ¿Podemos hablar?`;
  }

  const waQuoteUrl = `${siteData.contact.whatsappLink}?text=${encodeURIComponent(waSummaryMessage)}`;

  return (
    <section className="w-full py-20 lg:py-24 bg-arena border-t border-linea">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salvia-100 text-fiordo text-xs uppercase tracking-wider font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5 text-fiordo" />
            <span>Cotizador</span>
          </div>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-grafito tracking-tight">
            Calcula <span className="text-fiordo">cuánto cuesta</span> tu web
          </h2>
          <p className="mt-3 text-base sm:text-lg text-pizarra">
            Elige el tipo de web y el plan de mantenimiento, y mira el total al instante.
          </p>
        </div>

        {/* 2 Columns: Selectors + Terminal Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Selectors */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Selector 1: Tipo de Proyecto */}
            <div className="bg-nieve p-6 sm:p-7 rounded-[24px] border border-linea shadow-suave">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-syne font-bold text-grafito uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-fiordo rounded-full"></span>
                  1. Elige el tipo de web
                </span>
                <span className="text-xs text-pizarra">Precio base</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projectOptions.map((opt) => {
                  const isSelected = selectedProjectId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectProject(opt.id)}
                      className={`text-left p-4 rounded-[14px] transition-all flex flex-col justify-between border ${
                        isSelected
                          ? 'bg-arena border-fiordo shadow-suave'
                          : 'bg-nieve hover:bg-arena/60 border-linea'
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className="font-syne font-bold text-sm sm:text-base text-grafito">
                          {opt.name}
                        </span>
                        <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-fiordo' : 'bg-linea'}`}></span>
                      </div>
                      <div className="mt-3 flex items-baseline justify-between w-full">
                        <span className="text-xs font-semibold text-fiordo">
                          {formatGs(opt.cost)}
                          {opt.id === 'rescate' && ' inicial'}
                        </span>
                        <span className="text-[11px] text-pizarra">{opt.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selector 2: Plan de Mantenimiento Mensual */}
            <div className="bg-nieve p-6 sm:p-7 rounded-[24px] border border-linea shadow-suave">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-syne font-bold text-grafito uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-fiordo rounded-full"></span>
                  2. Elige el plan de mantenimiento
                </span>
                <span className="text-xs text-pizarra">Mensual</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {planOptions.map((opt) => {
                  const isSelected = selectedPlanId === opt.id;
                  const isPlanDisabled = isRescue && opt.id === 'sin_plan';

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isPlanDisabled}
                      onClick={() => handleSelectPlan(opt.id)}
                      className={`text-left p-4 rounded-[14px] transition-all flex flex-col justify-between border ${
                        isPlanDisabled
                          ? 'opacity-40 cursor-not-allowed bg-arena/30 border-linea/40'
                          : isSelected
                            ? 'bg-arena border-fiordo shadow-suave'
                            : 'bg-nieve hover:bg-arena/60 border-linea'
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className="font-syne font-bold text-sm sm:text-base text-grafito">
                          {opt.id === 'sin_plan' ? 'Sin plan' : opt.name}
                        </span>
                        <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-fiordo' : 'bg-linea'}`}></span>
                      </div>
                      <div className="mt-3 flex items-baseline justify-between w-full">
                        <span className="text-xs font-semibold text-fiordo">
                          {formatGs(opt.price)} / mes
                        </span>
                        {opt.isFeatured && (
                          <span className="text-[10px] text-fiordo font-bold bg-salvia-100 px-2 py-0.5 rounded-full">RECOMENDADO</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {isRescue && (
                <p className="mt-3 text-xs text-pizarra flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-fiordo shrink-0" />
                  <span>El servicio de Rescate de webs incluye alta obligatoria en el plan Pro.</span>
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-pizarra px-1">
              <Info className="w-4 h-4 text-fiordo shrink-0" />
              <span>Precios en guaraníes con IVA incluido.</span>
            </div>
          </div>

          {/* Right Column: Terminal Quote Summary Card */}
          <div className="lg:col-span-5 bg-nieve rounded-[24px] p-6 sm:p-8 border border-linea shadow-suave relative overflow-hidden lg:sticky lg:top-28">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-linea">
              <span className="text-xs text-pizarra uppercase tracking-wider font-semibold">
                Resumen
              </span>
            </div>

            <div className="space-y-6">
              
              {/* Inversión inicial */}
              <div>
                <span className="text-xs text-pizarra uppercase tracking-wide block">
                  Pago del proyecto
                </span>
                <div className="font-syne font-extrabold text-3xl sm:text-4xl text-grafito mt-1">
                  {formatGs(currentProject.cost)}
                </div>
                <span className="text-xs text-fiordo mt-1 block">
                  {currentProject.name}
                </span>
              </div>

              <div className="h-px bg-linea w-full" />

              {/* Mantenimiento mensual */}
              <div>
                <span className="text-xs text-pizarra uppercase tracking-wide block">
                  Mantenimiento mensual
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-syne font-extrabold text-2xl sm:text-3xl text-fiordo">
                    {formatGs(currentPlan.price)}
                  </span>
                  <span className="text-xs text-pizarra">/ mes</span>
                </div>
                <span className="text-xs text-pizarra mt-1 block">
                  {hasPlan ? `Plan ${currentPlan.name} seleccionado` : 'Sin cobertura mensual'}
                </span>
              </div>

              {/* Conditions box */}
              <div className="p-4 rounded-[14px] bg-arena border border-linea text-xs sm:text-sm text-grafito leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-salvia shrink-0 mt-0.5" />
                  <div>
                    {isRescue ? (
                      <span>
                        Pagas el cargo inicial de <strong className="text-grafito">{formatGs(currentProject.cost)}</strong> al empezar la revisión, más <strong className="text-grafito">{formatGs(currentPlan.price)}</strong> al mes del plan Pro.
                      </span>
                    ) : hasPlan ? (
                      <span>
                        Pagas <strong className="text-grafito">{formatGs(deposit)} (50%)</strong> al empezar y el resto al entregar. <strong className="text-fiordo">El primer mes de mantenimiento es gratis.</strong>
                      </span>
                    ) : (
                      <span>
                        Pagas <strong className="text-grafito">{formatGs(deposit)} (50%)</strong> al empezar y el resto al entregar.
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA Button */}
              <a
                href={waQuoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full py-4 text-center text-sm shadow-suave"
              >
                <MessageCircle className="w-5 h-5 fill-none stroke-current" />
                <span>Enviar esta cotización por WhatsApp</span>
              </a>

              <div className="flex justify-between items-center text-xs text-pizarra pt-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-salvia"></span>
                  Precios con IVA incluido
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
