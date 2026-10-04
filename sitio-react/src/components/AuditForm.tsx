import React, { useState } from 'react';
import { Rocket, Send, MessageCircle, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { siteData } from '../siteData';

export const AuditForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    negocio: '',
    rubro: '',
    webInstagram: '',
    whatsapp: '',
    mensaje: '',
    honeypot: '' // Anti-spam hidden field
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const rubroOptions = [
    'Clínica / Salud / Odontología',
    'Inmobiliaria / bienes raíces / construcción',
    'Estudio jurídico / contable / asesoría',
    'Comercio / Tienda / Catálogo',
    'Profesional independiente / consultor',
    'Otro rubro'
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'Escribe tu nombre completo.';
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres.';
    }

    if (!formData.negocio.trim()) {
      newErrors.negocio = 'Escribe el nombre de tu negocio o tu profesión.';
    }

    if (!formData.rubro) {
      newErrors.rubro = 'Selecciona el rubro de tu actividad.';
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'Escribe tu número de WhatsApp para poder responderte.';
    } else if (!/^[0-9+ \-()]{7,20}$/.test(formData.whatsapp.trim())) {
      newErrors.whatsapp = 'Revisa tu número de WhatsApp. Ejemplo: 0982 829 875 o +595 982 829 875.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check anti-spam honeypot
    if (formData.honeypot) {
      console.warn('Bot detected via honeypot.');
      setIsSubmitted(true);
      return;
    }

    if (!validate()) {
      return;
    }

    // Format WhatsApp message
    const messageLines = [
      `Hola, solicito la revisión gratuita de mi web:`,
      `• Nombre: ${formData.nombre.trim()}`,
      `• Negocio: ${formData.negocio.trim()}`,
      `• Rubro: ${formData.rubro}`,
      formData.webInstagram.trim() ? `• Web o Instagram actual: ${formData.webInstagram.trim()}` : null,
      `• WhatsApp: ${formData.whatsapp.trim()}`,
      formData.mensaje.trim() ? `• Mensaje: ${formData.mensaje.trim()}` : null
    ].filter(Boolean);

    const waText = messageLines.join('\n');
    const waUrl = `${siteData.contact.whatsappLink}?text=${encodeURIComponent(waText)}`;

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setIsSubmitted(true);
  };

  return (
    <section id="contacto" className="w-full py-20 lg:py-24 bg-fiordo text-bruma">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fiordo-900 text-bruma text-xs uppercase tracking-wider font-semibold mb-3 border border-linea/20">
            <Rocket className="w-3.5 h-3.5 text-salvia" />
            <span>Contacto</span>
          </div>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-bruma tracking-tight">
            Empecemos por una <span className="text-bruma underline decoration-arcilla decoration-4 underline-offset-8">revisión gratuita</span> de tu web
          </h2>
          <p className="mt-3 text-base sm:text-lg text-bruma/85">
            Te cuento en qué estado está tu web actual o, si todavía no tienes una, definimos juntos qué necesitas. Es gratis y sin compromiso.
          </p>
        </div>

        {/* Form Container: Tarjeta nieve, radio 24px, borde 1px linea, sombra suave */}
        <div className="max-w-3xl mx-auto bg-nieve rounded-[24px] p-6 sm:p-10 border border-linea shadow-suave text-grafito">
          
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-salvia-100 text-salvia flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-salvia" />
              </div>
              <h3 className="font-syne font-bold text-2xl text-grafito">
                Listo, tu mensaje está preparado
              </h3>
              <p className="text-pizarra max-w-md mx-auto text-sm leading-relaxed">
                Se abrió WhatsApp con tus datos. Falta que envíes el mensaje. Si no se abrió, toca el botón de abajo.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href={`${siteData.contact.whatsappLink}?text=${encodeURIComponent(
                    `Hola, solicito la revisión de mi web para ${formData.negocio || 'mi negocio'}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <MessageCircle className="w-4 h-4 fill-none stroke-current" />
                  <span>Abrir WhatsApp nuevamente</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      nombre: '',
                      negocio: '',
                      rubro: '',
                      webInstagram: '',
                      whatsapp: '',
                      mensaje: '',
                      honeypot: ''
                    });
                  }}
                  className="btn-secondary"
                >
                  Nueva consulta
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              
              {/* Anti-spam honeypot (hidden from real users) */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="website_security_field"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                />
              </div>

              {/* Fila 1: Nombre y Negocio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="audit-nombre" className="block text-xs font-semibold text-grafito uppercase mb-1.5">
                    Nombre y apellido *
                  </label>
                  <input
                    id="audit-nombre"
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Ej. María Solís"
                    className={`w-full bg-nieve text-grafito placeholder-pizarra/60 text-sm px-4 py-3 rounded-[14px] border transition-colors focus:outline-none focus:ring-2 ${
                      errors.nombre ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : 'border-linea focus:border-arcilla-700 focus:ring-arcilla-700'
                    }`}
                  />
                  {errors.nombre && (
                    <p className="mt-1 text-xs text-red-700 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.nombre}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="audit-negocio" className="block text-xs font-semibold text-grafito uppercase mb-1.5">
                    Negocio o Profesión *
                  </label>
                  <input
                    id="audit-negocio"
                    type="text"
                    required
                    value={formData.negocio}
                    onChange={(e) => setFormData({ ...formData, negocio: e.target.value })}
                    placeholder="Ej. Consultorio Odontológico o Inmobiliaria"
                    className={`w-full bg-nieve text-grafito placeholder-pizarra/60 text-sm px-4 py-3 rounded-[14px] border transition-colors focus:outline-none focus:ring-2 ${
                      errors.negocio ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : 'border-linea focus:border-arcilla-700 focus:ring-arcilla-700'
                    }`}
                  />
                  {errors.negocio && (
                    <p className="mt-1 text-xs text-red-700 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.negocio}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Fila 2: Rubro y Web o Instagram */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="audit-rubro" className="block text-xs font-semibold text-grafito uppercase mb-1.5">
                    Rubro *
                  </label>
                  <select
                    id="audit-rubro"
                    required
                    value={formData.rubro}
                    onChange={(e) => setFormData({ ...formData, rubro: e.target.value })}
                    className={`w-full bg-nieve text-grafito text-sm px-4 py-3 rounded-[14px] border transition-colors focus:outline-none focus:ring-2 ${
                      errors.rubro ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : 'border-linea focus:border-arcilla-700 focus:ring-arcilla-700'
                    }`}
                  >
                    <option value="">Selecciona tu rubro</option>
                    {rubroOptions.map((r, idx) => (
                      <option key={idx} value={r}>{r}</option>
                    ))}
                  </select>
                  {errors.rubro && (
                    <p className="mt-1 text-xs text-red-700 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.rubro}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="audit-web" className="block text-xs font-semibold text-grafito uppercase mb-1.5">
                    Web o Instagram actual <span className="text-pizarra font-normal">(Opcional)</span>
                  </label>
                  <input
                    id="audit-web"
                    type="text"
                    value={formData.webInstagram}
                    onChange={(e) => setFormData({ ...formData, webInstagram: e.target.value })}
                    placeholder="Ej. @miclinica o midominio.com"
                    className="w-full bg-nieve text-grafito placeholder-pizarra/60 text-sm px-4 py-3 rounded-[14px] border border-linea focus:border-arcilla-700 focus:ring-2 focus:ring-arcilla-700 transition-colors focus:outline-none"
                  />
                </div>
              </div>

              {/* Fila 3: WhatsApp */}
              <div>
                <label htmlFor="audit-whatsapp" className="block text-xs font-semibold text-grafito uppercase mb-1.5">
                  Número de WhatsApp para coordinar *
                </label>
                <input
                  id="audit-whatsapp"
                  type="tel"
                  required
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="Ej. 0982 829 875"
                  className={`w-full bg-nieve text-grafito placeholder-pizarra/60 text-sm px-4 py-3 rounded-[14px] border transition-colors focus:outline-none focus:ring-2 ${
                    errors.whatsapp ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : 'border-linea focus:border-arcilla-700 focus:ring-arcilla-700'
                  }`}
                />
                {errors.whatsapp && (
                  <p className="mt-1 text-xs text-red-700 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.whatsapp}</span>
                  </p>
                )}
              </div>

              {/* Fila 4: Mensaje opcional */}
              <div>
                <label htmlFor="audit-mensaje" className="block text-xs font-semibold text-grafito uppercase mb-1.5">
                  Cuéntame qué necesitas <span className="text-pizarra font-normal">(Opcional)</span>
                </label>
                <textarea
                  id="audit-mensaje"
                  rows={3}
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  placeholder="¿Qué objetivos tienes para tu web o qué problema tiene tu sitio actual?"
                  className="w-full bg-nieve text-grafito placeholder-pizarra/60 text-sm px-4 py-3 rounded-[14px] border border-linea focus:border-arcilla-700 focus:ring-2 focus:ring-arcilla-700 transition-colors focus:outline-none"
                />
              </div>

              {/* Botón de Envío: arcilla píldora con texto blanco */}
              <button
                type="submit"
                className="btn-primary w-full py-4 text-base tracking-wide"
              >
                <Send className="w-4 h-4 fill-none stroke-current" />
                <span>Pedir revisión gratis por WhatsApp</span>
              </button>

              <p className="text-center text-xs text-pizarra">
                Al enviar, se abre WhatsApp con tus datos ya escritos. Solo tienes que mandar el mensaje.
              </p>
            </form>
          )}

          {/* Direct channels footer */}
          <div className="mt-8 pt-6 border-t border-linea flex flex-col sm:flex-row items-center justify-between gap-4">
            <a
              href={`${siteData.contact.whatsappLink}?text=${encodeURIComponent(siteData.contact.auditWhatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-pizarra hover:text-arcilla-700 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-arcilla-700" />
              <span>WhatsApp {siteData.contact.whatsappDisplay}</span>
            </a>

            <a
              href={`mailto:${siteData.contact.email}`}
              className="flex items-center gap-2 text-sm text-pizarra hover:text-arcilla-700 transition-colors"
            >
              <Mail className="w-4 h-4 text-arcilla-700" />
              <span>{siteData.contact.email}</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
