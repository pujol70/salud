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
    { id: 'tienda', name: 'Tienda online', cost: 7500000, desc: 'eCommerce completo' },
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
    <section className="w-full py-20 lg:py-24 bg-[#0F172A] border-t border-[#4B5563]/40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F97316]/10 text-[#F97316] text-xs font-mono uppercase tracking-wider font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>// ESTIMADOR TRANSPARENTE</span>
          </div>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Calcula <span className="text-[#F97316]">tu inversión</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#9CA3AF]">
            Sin cotizaciones misteriosas ni presupuestos inflados. Elige lo que necesitas y obtén el valor exacto al instante.
          </p>
        </div>

        {/* 2 Columns: Selectors + Terminal Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Selectors */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Selector 1: Tipo de Proyecto */}
            <div className="bg-[#374151] p-6 sm:p-7 rounded-xl border border-[#4B5563]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-syne font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#F97316] rounded-sm"></span>
                  1. Selecciona el Tipo de Proyecto
                </span>
                <span className="text-xs font-mono text-[#9CA3AF]">Inversión Base</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projectOptions.map((opt) => {
                  const isSelected = selectedProjectId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectProject(opt.id)}
                      className={`text-left p-4 rounded-lg transition-all flex flex-col justify-between border ${
                        isSelected
                          ? 'bg-[#1F2937] border-[#F97316] shadow-[0_0_16px_rgba(249,115,22,0.2)]'
                          : 'bg-[#374151] hover:bg-[#404b5c] border-[#4B5563]'
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className="font-syne font-bold text-sm sm:text-base text-white">
                          {opt.name}
                        </span>
                        <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-[#F97316]' : 'bg-[#4B5563]'}`}></span>
                      </div>
                      <div className="mt-3 flex items-baseline justify-between w-full">
                        <span className="font-mono text-xs font-semibold text-[#F97316]">
                          {formatGs(opt.cost)}
                          {opt.id === 'rescate' && ' inicial'}
                        </span>
                        <span className="text-[11px] text-[#9CA3AF]">{opt.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selector 2: Plan de Mantenimiento Mensual */}
            <div className="bg-[#374151] p-6 sm:p-7 rounded-xl border border-[#4B5563]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-syne font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#F97316] rounded-sm"></span>
                  2. Plan de Mantenimiento Mensual
                </span>
                <span className="text-xs font-mono text-[#9CA3AF]">Recurrente</span>
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
                      className={`text-left p-4 rounded-lg transition-all flex flex-col justify-between border ${
                        isPlanDisabled
                          ? 'opacity-40 cursor-not-allowed bg-[#1F2937] border-transparent'
                          : isSelected
                            ? 'bg-[#1F2937] border-[#F97316] shadow-[0_0_16px_rgba(249,115,22,0.2)]'
                            : 'bg-[#374151] hover:bg-[#404b5c] border-[#4B5563]'
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className="font-syne font-bold text-sm sm:text-base text-white">
                          {opt.id === 'sin_plan' ? 'Sin plan' : opt.name}
                        </span>
                        <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-[#F97316]' : 'bg-[#4B5563]'}`}></span>
                      </div>
                      <div className="mt-3 flex items-baseline justify-between w-full">
                        <span className="font-mono text-xs font-semibold text-[#F97316]">
                          {formatGs(opt.price)} / mes
                        </span>
                        {opt.isFeatured && (
                          <span className="text-[10px] text-[#F97316] font-bold">RECOMENDADO</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {isRescue && (
                <p className="mt-3 text-xs text-[#9CA3AF] flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                  <span>El servicio de Rescate de webs incluye alta obligatoria en el plan Pro.</span>
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#9CA3AF] px-1">
              <Info className="w-4 h-4 text-[#F97316] shrink-0" />
              <span>Estimación en tiempo real según tarifas oficiales 2026 vigentes para Paraguay con IVA incluido.</span>
            </div>
          </div>

          {/* Right Column: Terminal Quote Summary Card */}
          <div className="lg:col-span-5 bg-[#1F2937] rounded-xl p-6 sm:p-8 border border-[#4B5563] shadow-2xl relative overflow-hidden lg:sticky lg:top-28">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#4B5563]/60">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#EF4444]"></span>
                <span className="w-3 h-3 rounded-full bg-[#F59E0B]"></span>
                <span className="w-3 h-3 rounded-full bg-[#10B981]"></span>
              </div>
              <span className="text-xs font-mono text-[#9CA3AF] uppercase tracking-wider font-semibold">
                // RESUMEN DE COTIZACIÓN
              </span>
            </div>

            <div className="space-y-6">
              
              {/* Inversión inicial */}
              <div>
                <span className="text-xs font-mono text-[#9CA3AF] uppercase tracking-wide block">
                  Inversión Inicial:
                </span>
                <div className="font-syne font-extrabold text-3xl sm:text-4xl text-white mt-1">
                  {formatGs(currentProject.cost)}
                </div>
                <span className="text-xs font-mono text-[#F97316] mt-1 block">
                  Proyecto: {currentProject.name}
                </span>
              </div>

              <div className="h-px bg-[#4B5563]/60 w-full" />

              {/* Mantenimiento mensual */}
              <div>
                <span className="text-xs font-mono text-[#9CA3AF] uppercase tracking-wide block">
                  Mantenimiento mensual:
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-syne font-extrabold text-2xl sm:text-3xl text-[#F97316]">
                    {formatGs(currentPlan.price)}
                  </span>
                  <span className="text-xs font-mono text-[#9CA3AF]">/ mes</span>
                </div>
                <span className="text-xs font-mono text-[#9CA3AF] mt-1 block">
                  {hasPlan ? `Plan ${currentPlan.name} seleccionado` : 'Sin cobertura mensual'}
                </span>
              </div>

              {/* Conditions box */}
              <div className="p-4 rounded-lg bg-[#111827] border border-[#4B5563]/50 text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                  <div>
                    {isRescue ? (
                      <span>
                        <strong className="text-white">Pago del cargo inicial:</strong> {formatGs(currentProject.cost)} contra inicio del diagnóstico técnico + {formatGs(currentPlan.price)}/mes del plan Pro.
                      </span>
                    ) : hasPlan ? (
                      <span>
                        <strong className="text-white">50% de anticipo ({formatGs(deposit)})</strong> al arrancar + <strong className="text-[#F97316]">1er mes de mantenimiento gratis</strong>.
                      </span>
                    ) : (
                      <span>
                        <strong className="text-white">50% de anticipo ({formatGs(deposit)})</strong> al arrancar y 50% al entregar y validar.
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
                className="btn-primary w-full py-4 text-center text-sm shadow-[0_0_20px_rgba(249,115,22,0.35)]"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Enviar esta cotización por WhatsApp</span>
              </a>

              <div className="flex justify-between items-center text-xs font-mono text-[#9CA3AF] pt-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                  Presupuesto cerrado
                </span>
                <span>Sin costos ocultos</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
