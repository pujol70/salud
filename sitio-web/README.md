# Sitio web de diseño y mantenimiento web

HTML, CSS y JavaScript puros. Sin instalación ni dependencias: abre `index.html` en el navegador.
Las fuentes (Fraunces e Inter) se cargan desde Google Fonts; sin conexión se usan fuentes del sistema.

## Qué editar antes de publicar

1. `js/config.js`: nombre, WhatsApp (solo números con código de país, ejemplo `595981123456`), correo, RUC, Instagram y LinkedIn.
   Estos datos se aplican en la barra superior, el hero, el contacto, el footer, los botones de WhatsApp y los demos.
2. `index.html`: busca `[MARCA]` (título de la pestaña), `TU_DOMINIO` (canonical, og:url y datos estructurados), `hola@tudominio.com` y `[COMPLETAR]` (sección "Quién soy").
3. `robots.txt` y `sitemap.xml`: reemplaza `TU_DOMINIO`.
4. `assets/img/yo.svg`: cambia por tu foto (`yo.jpg`) y actualiza la ruta en la sección "Quién soy".

## Precios

Los precios están en las tarjetas de `index.html` (paquetes y planes). El cotizador lee los valores de los atributos `data-price`
de cada tarjeta, así que al cambiar `data-price` y el texto visible, el cotizador se actualiza solo.
El cargo del rescate de webs (Gs 400.000) está en `js/main.js` (busca `rescate`).

## Formulario

- Sin configuración: abre WhatsApp con los datos del formulario ya escritos.
- Con `formEndpoint` en `config.js` (por ejemplo un formulario de Formspree): envía los datos por correo y muestra la confirmación en pantalla.

## Medición

Pon tu ID de Google Analytics 4 en `ga4` (`config.js`). Se registran los clics de WhatsApp, paquetes, planes, demos y el envío del formulario.

## Imágenes

Las ilustraciones son SVG propios en `assets/img/`. Puedes reemplazarlas por fotos con el mismo nombre de archivo o cambiando la ruta en el HTML.

## Publicar gratis

Sube la carpeta completa a Netlify (arrastrar y soltar), Cloudflare Pages o GitHub Pages.
