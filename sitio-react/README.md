# ECRISTIA — Diseño Web, Desarrollo y Mantenimiento

Sitio web oficial y plataforma comercial para **ECRISTIA**, servicio freelance de diseño web, desarrollo y mantenimiento continuo en Asunción y Gran Asunción, Paraguay.

---

## 🎨 Sistema visual

- **Tema nórdico claro**. Los colores están definidos en `src/index.css` (`@theme`):
  - `bruma` #F6F4EF (fondo), `arena` #ECE8DF (secciones alternas), `nieve` #FDFCFA (tarjetas), `linea` #DCD6CA (bordes).
  - `grafito` #1F2A33 (texto), `pizarra` #55636D (texto secundario).
  - `fiordo` #2E4A5C y `fiordo-900` #1F3441 (marca y pie de página), `salvia` #7F9784 y `salvia-100` #DDE5DD (iconos y etiquetas).
  - `arcilla` #B5593C y `arcilla-700` #9C4A30 (botones y acentos).
- **Tipografías**: Syne para titulares e Inter para el texto.
- **Formas**: botones en forma de píldora, tarjetas con radio de 24 px y sombras suaves.
- **Movimiento**: se respeta `prefers-reduced-motion`.
- **Respaldo**: el tema oscuro anterior está en `backup-tema-oscuro/` (copia parcial). El respaldo completo es el ZIP descargado antes del cambio de tema.

---

## 📁 Estructura del Código

```text
/
├── index.html                  # Metadatos SEO, OpenGraph, Twitter Cards y Schema.org JSON-LD
├── metadata.json               # Configuración oficial de la aplicación
├── package.json
├── src/
│   ├── siteData.ts             # ÚNICA FUENTE DE VERDAD: precios, contacto, planes, FAQs, demos
│   ├── index.css               # Importación de Tailwind CSS v4, fuentes y variables de color
│   ├── main.tsx                # Punto de entrada de React
│   ├── App.tsx                 # Enrutador cliente (/, /demo/clinica, /demo/inmobiliaria)
│   ├── components/
│   │   ├── Header.tsx          # Menú fijo con blur, detector de sección activa y menú hamburguesa móvil
│   │   ├── Hero.tsx            # Hero con foto fija y sombra flotante
│   │   ├── StatsStrip.tsx      # Cifras reales, sin estadísticas inventadas
│   │   ├── Diagnostic.tsx      # Diagnóstico visual de problemas de negocios sin web
│   │   ├── ServicesBento.tsx   # Bento Grid de servicios y tecnologías
│   │   ├── PricingPackages.tsx # Los 3 tipos de web con precios con IVA incluido y plazos
│   │   ├── MaintenanceSection.tsx # Planes mensuales de mantenimiento y rescate web
│   │   ├── EstimatorCalculator.tsx # Cotizador interactivo con reglas de negocio y cálculo en vivo
│   │   ├── Methodology.tsx     # Cómo trabajo, en 4 pasos
│   │   ├── TargetAudienceAndDemos.tsx # Rubros objetivos y previsualizador de las 2 demos
│   │   ├── PilotProgram.tsx    # Programa piloto (3 cupos con 30% de descuento)
│   │   ├── FAQ.tsx             # Preguntas frecuentes en acordeón accesible con teclado
│   │   ├── AuditForm.tsx       # Formulario con validación en español, honeypot y enlace a WhatsApp
│   │   ├── Footer.tsx          # Pie con texto exacto y enlaces de navegación
│   │   └── FloatingWhatsApp.tsx# Botón flotante accesible en todas las vistas
│   └── demos/
│       ├── DentalClinicDemo.tsx# Demo completa "Clínica Dental Ejemplo" (/demo/clinica)
│       └── RealEstateDemo.tsx  # Demo completa "Inmobiliaria Ejemplo" con filtros funcionales (/demo/inmobiliaria)
```

---

## ⚙️ Funciones Implementadas

1. **Cotizador Interactivo de Inversión**:
   - Selector de tipos de web: *Presencia* (Gs 1.900.000), *Profesional* (Gs 4.200.000), *Catálogo / Tienda* (Gs 7.500.000) o *Rescate de web existente* (Gs 400.000).
   - Selector de planes mensuales: *Sin mantenimiento*, *Esencial* (Gs 250.000/mes), *Pro* (Gs 450.000/mes), *Crecimiento* (Gs 950.000/mes).
   - **Reglas de negocio automáticas**:
     - Si se elige un proyecto nuevo + cualquier plan, se activa el beneficio del **primer mes de mantenimiento 100% gratis**.
     - Si se selecciona *Rescate de web existente* y estaba en *Sin mantenimiento*, se auto-asigna el plan **Pro** obligatorio.
     - Botón directo que redacta en WhatsApp el presupuesto desglosado con IVA.
2. **Formulario de revisión gratuita**:
   - Campos: Nombre, Negocio, Rubro, Web/Instagram (opcional), WhatsApp y Mensaje.
   - Trampa anti-spam oculta (*honeypot*).
   - Validación reactiva con mensajes claros en español.
   - Envío directo a WhatsApp con los datos formateados y confirmación en pantalla.
3. **Navegación Fija y Móvil**:
   - Menú superior tipo cristal (*backdrop-blur*) con indicador de sección activa al hacer scroll.
   - Menú móvil desplegable con icono hamburguesa y cierre al tocar fuera o presionar enlaces.
4. **Demos Conceptuales Aisladas**:
   - `/demo/clinica`: **Clínica Dental Ejemplo** (sin nombres comerciales reales).
   - `/demo/inmobiliaria`: **Inmobiliaria Ejemplo** con **filtros interactivos en tiempo real** por tipo, zona de Asunción (incluyendo Villa Morra, Las Lomas, Recoleta, etc.) y precio máximo, contador dinámico, botón *Limpiar filtros* y estado vacío ilustrado.
   - Barra superior visible en ambas: *"Demo de concepto, no es un cliente real"* y botón de retorno.
   - Todos los botones y formularios dentro de las demos despliegan un aviso modal informando que se trata de un prototipo interactivo.
5. **Accesibilidad**:
   - Compatibilidad con usuarios que tengan activada la opción de reducir movimiento en su sistema operativo.
   - Menú móvil con `aria-expanded`, cierre con Escape y bloqueo del desplazamiento de fondo.

---

## ✏️ Cómo Editar Datos y Precios

Para cambiar cualquier precio, teléfono de WhatsApp, textos de tipos de web, rubros o preguntas frecuentes, edita únicamente el archivo **`src/siteData.ts`**. Toda la aplicación reflejará los cambios automáticamente.
