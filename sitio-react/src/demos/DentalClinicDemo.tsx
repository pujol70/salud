import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  CheckCircle, 
  Shield, 
  AlertCircle,
  MessageCircle,
  X,
  Stethoscope
} from 'lucide-react';
import { siteData } from '../siteData';

interface DentalClinicDemoProps {
  onBack: () => void;
}

export const DentalClinicDemo: React.FC<DentalClinicDemoProps> = ({ onBack }) => {
  const [showDemoModal, setShowDemoModal] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    servicio: 'limpieza',
    especialista: 'primero',
    franja: 'manana',
    seguro: ''
  });

  const dental = siteData.dentalClinicData;

  const handleAction = (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    setShowDemoModal(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FB] text-[#191C1E] font-sans">
      
      {/* Top Demo Banner */}
      <div className="sticky top-0 z-50 bg-[#0F3846] text-[#FFFFFF] px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-x-3 gap-y-1 shadow-md">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 font-bold hover:text-[#6EF9E2] transition-colors focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a ECRISTIA</span>
        </button>

        <span className="order-last w-full text-center sm:order-none sm:w-auto uppercase tracking-wider text-[11px] text-[#A6CCDE]">
          Demo de concepto, no es un cliente real
        </span>

        <button
          type="button"
          onClick={onBack}
          className="px-2.5 py-1 rounded bg-[#00222D] text-xs hover:bg-[#164E63] transition-colors"
        >
          Cerrar demo
        </button>
      </div>

      {/* Clinic Header */}
      <header className="bg-white border-b border-[#E2E8F0] shadow-sm">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDFA] border border-[#CCFBF1] flex items-center justify-center text-[#14B8A6]">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg text-[#0F3846] tracking-tight block">
                {dental.name}
              </span>
              <span className="text-xs text-[#006B5F] uppercase tracking-wider font-semibold">
                {dental.zone}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#agendar"
              className="px-4 py-2 rounded-lg bg-[#0F3846] text-white text-xs sm:text-sm font-semibold hover:bg-[#164E63] transition-colors"
            >
              Agendar Turno
            </a>
            <button
              type="button"
              onClick={handleAction}
              className="p-2 rounded-lg bg-[#F0FDFA] text-[#006B5F] border border-[#CCFBF1] hover:bg-[#CCFBF1] transition-colors"
              title="WhatsApp de la clínica"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-10 space-y-16">
        
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FDFA] text-[#006F64] text-xs font-semibold border border-[#CCFBF1]">
              <MapPin className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>Odontología Avanzada en Villa Morra · Asunción</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F3846] tracking-tight leading-tight">
              Cuidamos tu sonrisa con tecnología moderna y <span className="text-[#006B5F]">trato humano</span>
            </h1>

            <p className="text-base text-[#41484B] leading-relaxed max-w-xl">
              Atención odontológica integral en un ambiente diseñado para tu tranquilidad. Diagnóstico digital preciso y planes de tratamiento sin sorpresas.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="#agendar"
                className="px-6 py-3 rounded-lg bg-[#0F3846] text-white font-semibold text-sm shadow-md hover:bg-[#164E63] transition-all"
              >
                Solicitar Turno Online
              </a>
              <button
                type="button"
                onClick={handleAction}
                className="px-5 py-3 rounded-lg bg-white border border-[#E2E8F0] text-[#0F3846] font-semibold text-sm hover:bg-[#F2F4F6] transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#14B8A6]" />
                <span>Consultar por WhatsApp</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-3 rounded-2xl border border-[#E2E8F0] shadow-xl">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[#E2E8F0] flex items-center justify-center">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuABeLx24ADrqG9T9mc2SZ9wScfOVDhNVjuzzSk4tprs01svuJm9CDe3M6C-lkyAD_UZaFAIVlJAEDtUz4w26dVL4dv_I6l1F-vFECVtvEgmd7Hp49Ca_Fnx04nyCpoq9uco59srFEh9FaWoA1G6vfXRYnJLvAMNRe8uIzin3q1D5aGlpFEG-6oBB0nMdrmKl2iGWkH8wdCYU1L6pyFJNLCedIGeQpb7i1ITeLAcbLUGDmMM9mfHQEpI" 
                alt="Consultorio odontológico en Villa Morra" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback container
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-2 rounded-lg shadow-sm border border-[#E2E8F0] flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#006B5F]" />
                <span className="text-xs font-semibold text-[#0F3846]">Tecnología 3D & Escaneo Digital</span>
              </div>
            </div>
          </div>
        </section>

        {/* Servicios */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#006B5F] block mb-1">
              Especialidades Odontológicas
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F3846]">
              Nuestros Servicios Odontológicos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dental.services.map((svc, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-[11px] font-semibold text-[#006F64] bg-[#F0FDFA] px-2 py-0.5 rounded-full mb-3">
                    {svc.badge}
                  </span>
                  <h3 className="font-bold text-base text-[#0F3846] mb-2">
                    {svc.name}
                  </h3>
                  <p className="text-xs text-[#41484B] leading-relaxed mb-4">
                    {svc.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#F2F4F6] flex items-center justify-between text-xs text-[#71787C]">
                  <span>{svc.duration}</span>
                  <a href="#agendar" className="text-[#006B5F] font-semibold hover:underline">
                    Agendar →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Especialistas */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#006B5F] block mb-1">
              Cuerpo Odontológico Titulado
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F3846]">
              Conoce a nuestro equipo médico
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dental.specialists.map((spec, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-[#0F3846]">{spec.name}</h3>
                    <span className="text-xs bg-[#F0FDFA] text-[#006F64] px-2 py-0.5 rounded font-mono">
                      {spec.reg}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#006B5F]">{spec.specialty}</p>
                  <p className="text-xs text-[#41484B] leading-relaxed">{spec.bio}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F2F4F6] flex items-center justify-between text-xs">
                  <span className="text-[#71787C]">{spec.schedule}</span>
                  <a href="#agendar" className="text-[#006B5F] font-bold hover:underline">
                    Agendar consulta →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Horarios y Seguros */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Horarios */}
          <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
            <h3 className="font-bold text-lg text-[#0F3846] mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#006B5F]" />
              <span>Horarios de Atención</span>
            </h3>
            <div className="space-y-3 text-sm">
              {dental.schedules.map((sch, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#F8FAFC] flex items-center justify-between">
                  <span className="font-medium text-[#0F3846]">{sch.days}</span>
                  <span className="font-semibold text-[#006B5F]">{sch.hours}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-[#F0FDFA] text-xs text-[#006F64] flex items-center gap-2">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{dental.address} · Estacionamiento para pacientes</span>
            </div>
          </div>

          {/* Seguros */}
          <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
            <h3 className="font-bold text-lg text-[#0F3846] mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#006B5F]" />
              <span>Seguros y Convenios Médicos</span>
            </h3>
            <p className="text-xs text-[#41484B] mb-4">
              Aceptamos los principales seguros médicos privados con cobertura directa o gestión de reintegros:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {dental.insurances.map((ins, idx) => (
                <div key={idx} className="p-2.5 rounded bg-[#F8FAFC] text-center border border-[#E2E8F0]">
                  <span className="font-bold text-xs text-[#0F3846] block">{ins.name}</span>
                  <span className="text-[10px] text-[#71787C]">{ins.type}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Appointment Form */}
        <section id="agendar" className="bg-white rounded-2xl p-6 sm:p-10 border border-[#E2E8F0] shadow-lg max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDFA] text-[#006F64] text-xs font-semibold mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserva Online</span>
            </div>
            <h2 className="text-2xl font-bold text-[#0F3846]">Solicita tu Turno en Línea</h2>
            <p className="text-xs text-[#41484B] mt-1">
              Completa los datos para coordinar tu horario de atención en Villa Morra.
            </p>
          </div>

          <form onSubmit={handleAction} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F3846] mb-1">Nombre y Apellido *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. María Solís"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full text-xs p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] focus:outline-none focus:border-[#14B8A6]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F3846] mb-1">Teléfono / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="0981 123 456"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full text-xs p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] focus:outline-none focus:border-[#14B8A6]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F3846] mb-1">Servicio *</label>
                <select
                  value={formData.servicio}
                  onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                  className="w-full text-xs p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] focus:outline-none focus:border-[#14B8A6]"
                >
                  <option value="limpieza">Limpieza Dental & Profilaxis</option>
                  <option value="ortodoncia">Ortodoncia Invisible o Brackets</option>
                  <option value="implantes">Implantes Dentales & Rehabilitación</option>
                  <option value="blanqueamiento">Blanqueamiento Dental LED</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F3846] mb-1">Especialista preferido</label>
                <select
                  value={formData.especialista}
                  onChange={(e) => setFormData({ ...formData, especialista: e.target.value })}
                  className="w-full text-xs p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] focus:outline-none focus:border-[#14B8A6]"
                >
                  <option value="primero">Primer profesional disponible (Más rápido)</option>
                  <option value="valeria">Dra. Valeria Benítez Arce</option>
                  <option value="matias">Dr. Matías Gómez Caballero</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-[#0F3846] text-white font-bold text-sm shadow hover:bg-[#164E63] transition-colors"
            >
              Confirmar Solicitud de Turno
            </button>
          </form>
        </section>

      </main>

      {/* Demo notice modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-[#F0FDFA] text-[#006F64] flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[#0F3846]">Es una demo de concepto</h3>
            <p className="text-sm text-[#41484B] leading-relaxed">
              Esta es una pantalla de demostración de arquitectura web para consultorios en Asunción desarrollada por ECRISTIA. No envía mensajes ni turnos reales.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setShowDemoModal(false)}
                className="w-full py-2.5 rounded-lg bg-[#0F3846] text-white font-semibold text-sm hover:bg-[#164E63] transition-colors"
              >
                Continuar navegando la demo
              </button>
              <button
                type="button"
                onClick={onBack}
                className="w-full py-2.5 rounded-lg bg-[#F2F4F6] text-[#0F3846] font-semibold text-sm hover:bg-[#E6E8EA] transition-colors"
              >
                Volver al sitio de ECRISTIA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clinic Footer */}
      <footer className="bg-[#E6E8EA] text-[#41484B] py-8 text-xs text-center border-t border-[#D8DADC]">
        <div className="max-w-6xl mx-auto px-5 space-y-2">
          <p className="font-semibold text-[#0F3846]">
            {dental.name} · Villa Morra · Asunción, Paraguay
          </p>
          <p className="text-[#71787C]">
            Demo de concepto diseñada para demostración de arquitectura web en Asunción por ECRISTIA.
          </p>
        </div>
      </footer>

    </div>
  );
};
