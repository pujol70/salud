# ECRISTIA — Diseño Web, Desarrollo y Mantenimiento

Sitio web oficial y plataforma comercial para **ECRISTIA**, servicio freelance de diseño web, desarrollo y mantenimiento continuo en Asunción y Gran Asunción, Paraguay.

---

## 🎨 Sistema Visual y Tokens de Diseño

- **Modo Oscuro Principal**:
  - Fondo de lienzo: `#111827` (Dark Canvas)
  - Tarjetas y Contenedores: `#374151` (Card surface) con bordes sutiles `border-[#F97316]/20` y hover con resplandor naranja
  - Acento Principal: `#F97316` (Naranja Energético)
  - Botón principal de llamada a la acción: fondo `#F97316` con texto `#111827` (ratio de contraste 6.3:1 certificado WCAG AA) y esquinas redondeadas de `6px` (`rounded-[6px]`)
- **Tipografías**:
  - Titulares: **Syne** (Google Fonts, peso 800 para H1, 700 para H2 y H3)
  - Cuerpo de texto: **Inter** (Google Fonts, pesos 400 y 500)
  - Párrafos sobre fondo: `#9CA3AF`
  - Párrafos dentro de tarjetas: `#D1D5DB`
- **Accesibilidad y Movimiento**:
  - Soporte para `@media (prefers-reduced-motion: reduce)` en todas las animaciones de conteo, resplandor de cursor y transiciones de scroll.

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
│   │   ├── Hero.tsx            # Hero con luz naranja ambiental interactiva (y automática en móvil)
│   │   ├── StatsStrip.tsx      # Métricas reales sin estadísticas inventadas, con conteo animado
│   │   ├── Diagnostic.tsx      # Diagnóstico visual de problemas de negocios sin web
│   │   ├── ServicesBento.tsx   # Bento Grid de servicios y tecnologías
│   │   ├── PricingPackages.tsx # Los 3 tipos de web con precios con IVA incluido y plazos
│   │   ├── MaintenanceSection.tsx # Planes mensuales de mantenimiento y rescate web
│   │   ├── EstimatorCalculator.tsx # Cotizador interactivo con reglas de negocio y cálculo en vivo
│   │   ├── Methodology.tsx     # Metodología ágil en 4 pasos
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
   - Selector de proyectos: *Presencia* (Gs 1.900.000), *Profesional* (Gs 4.200.000), *Catálogo / Tienda* (Gs 7.500.000) o *Rescate de web existente* (Gs 400.000).
   - Selector de planes mensuales: *Sin mantenimiento*, *Esencial* (Gs 250.000/mes), *Pro* (Gs 450.000/mes), *Crecimiento* (Gs 950.000/mes).
   - **Reglas de negocio automáticas**:
     - Si se elige un proyecto nuevo + cualquier plan, se activa el beneficio del **primer mes de mantenimiento 100% gratis**.
     - Si se selecciona *Rescate de web existente* y estaba en *Sin mantenimiento*, se auto-asigna el plan **Pro** obligatorio.
     - Botón directo que redacta en WhatsApp el presupuesto desglosado con IVA.
2. **Formulario de Auditoría Gratuita**:
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
5. **Animaciones y Resplandor**:
   - Resplandor radial naranja que sigue al cursor en el hero (en dispositivos táctiles o móviles se anima suavemente de forma autónoma).
   - Conteo progresivo numérico con detección por `IntersectionObserver`.
   - Compatibilidad total con usuarios que tengan activada la opción de reducir movimiento en su sistema operativo.

---

## ✏️ Cómo Editar Datos y Precios

Para cambiar cualquier precio, teléfono de WhatsApp, textos de tipos de web, rubros o preguntas frecuentes, edita únicamente el archivo **`src/siteData.ts`**. Toda la aplicación reflejará los cambios automáticamente.
