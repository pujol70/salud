# Bisel Digital — Beyond the Screen

Film de marca de **28 segundos**, **1920 × 1080**, **30 fps**, H.264 MP4 con audio original estéreo. Ocho sitios fotográficos salen hacia la derecha de la pantalla del notebook, cruzan planos de profundidad y se reúnen antes del cierre de marca.

## Archivos de entrega

- `../videos/bisel-digital-beyond-the-screen.mp4`: master Full HD.
- `../videos/bisel-digital-beyond-the-screen-preview.mp4`: preview 720p.
- `review/contact-sheet.jpg`: hoja de fotogramas extraídos del master.
- `review/keyframes/`: fotogramas representativos en calidad alta.
- `public/`: placa de dispositivos, ocho fotografías, fuentes con sus licencias y audio.
- `src/`: proyecto editable completo.
- `BRIEF.txt`: instrucciones recibidas.

## Ejecución

Node 24 / npm 11. Desde `/workspace/salud/bisel-beyond-screen`:

```sh
npm_config_cache=/tmp/npm-cache npm ci --no-audit --no-fund
npm run typecheck
npm run check:motion
npm start
```

Studio usa el puerto 3002. El ID de composición es **BiselDigital-BeyondTheScreen**. Remotion no admite guiones bajos en los IDs, por lo que el nombre solicitado `BiselDigital_BeyondTheScreen` se conserva como identificador React en `Root.tsx` y se emplea un guion en el ID registrado.

```sh
npm run render
```

El script `scripts/render-film.cjs` usa Chromium en `/usr/bin/chromium`, concurrencia 2 y un master final CRF 18. El intermedio Remotion se guarda en `out/` y no se versiona. En otra máquina puede ajustarse la concurrencia y quitarse `--browser-executable`. El render no descarga fotos, fuentes ni audio: todos los recursos están en `public/`.

Las interfaces se precalculan como capas transparentes de 1920 × 1240 para conservar nitidez y reducir el coste por fotograma. La fotografía permanece como un plano independiente con parallax. Después de editar los diseños de `Websites.tsx`, regenerar las ocho capas antes del render:

```sh
npm run assets:bake
npm run render
npm run delivery
```

`npm run delivery` verifica el master y prepara preview, keyframes y hoja de contacto con FFmpeg y Sharp.

## Estructura

- `Film.tsx`: SourceScene, ComputerScreenPortal, WebsiteWorld, CinematicLighting y BrandReveal.
- `choreography.ts`: ocho trayectorias diferenciadas, cámara, profundidades, máscaras y homografía de pantalla.
- `Websites.tsx`: ocho sitios con fotografía, navegación, titulares, CTA y secciones; sin marcos de navegador ni diseño de tarjeta comercial.
- `StableImage.tsx`: texturas estáticas con la API nativa Img de Remotion, para evitar repintados de canvas en Chromium.
- `Surfaces.tsx`: fotografía e interfaz transparente en planos separados, con texturas de interfaz a resolución 2x.
- `fonts.ts`: Syne e Inter cargadas localmente con `@remotion/fonts`.
- `scripts/make-soundtrack.py`: composición sonora procedural original, con semilla fija y sin grabaciones de terceros.
- `scripts/check-choreography.cjs`: pruebas contra la implementación real de movimiento y perspectiva.

## Dirección visual y técnica

Se utiliza composición híbrida **2.5D**, autorizada por el brief: homografías CSS 3D para mapear los cuatro vértices de cada sitio a la pantalla, planos de interfaz con separación local, proyección perspectiva, cambios de escala y orden de capas. No se reconstruyen ni se inventan superficies físicas invisibles del hardware. No se usó Three.js: para una sola fotografía, la composición 2.5D es más fiable y conserva mejor la imagen.

Las ocho experiencias son Clínica Dental, Inmobiliaria, Estudio Jurídico, Tienda, Arquitectura, Profesora de Inglés, Valentina Modelo y Martín Concejal. Todos los rubros y personajes son ilustrativos; Martín no representa a un político real y no hay símbolos partidarios.

La foto de los dispositivos se dibuja como base y como una capa de hardware enmascarada. Las experiencias alternan entre capas anteriores y posteriores; cada una tiene altura, amplitud, inclinación y velocidad propias. Al emerger, los vértices coinciden con el cuadrilátero de pantalla configurado. El movimiento usa exclusivamente `useCurrentFrame()`, `useVideoConfig()`, interpolaciones y funciones deterministas.

Desenfoque temporal suave durante las salidas y órbitas: Remotion renderiza los fotogramas 3D compuestos y FFmpeg mezcla dos fotogramas en la codificación final, solamente entre los segundos 3 y 22. Se desactiva en la formación final para conservar la nitidez tipográfica. Esta separación evita el coste y los artefactos de la captura HTML temporal experimental en Chromium. Se incluyen profundidad de campo moderada en planos posteriores, parallax, un barrido dorado, líneas de luz y partículas discretas. El cierre usa texto tipográfico **BISEL DIGITAL**, no un logo inventado.

## Cronología

| Tiempo | Acción |
|---|---|
| 0–3 s | Fotografía de origen, leve acercamiento y barrido sobre la pantalla |
| 3.1–7 s | Salen dental e inmobiliaria |
| 7.3–12 s | Se suman jurídico, tienda y arquitectura |
| 12.1–16 s | Inglés, modelo y concejal |
| 16–23 s | Órbitas y cruces de profundidad |
| 23–26 s | Convergencia y formación de ocho, con dos experiencias protagonistas |
| 26–28 s | Retorno al hardware y cierre Bisel Digital |

## Procedencia y límites de las referencias

Se intentó acceder a `https://biseldigital.com/` antes del diseño. El proxy HTTPS del entorno rechazó el túnel CONNECT con **403 Forbidden**. No fue posible abrir la sección ni los ocho demos. Se utilizó expresamente la alternativa del brief: composiciones ilustrativas originales basadas en los ocho rubros y descripciones facilitados. **No son capturas ni réplicas verificadas de los demos reales.**

Las ocho fotos de `public/photos/` se generaron para este proyecto. Las interfaces se construyeron en React. No se emplearon imágenes de stock ni logotipos de terceros.

En este mensaje se adjuntó texto, pero no un nuevo archivo de imagen de dispositivos. Se reutilizó sin regenerar `remotion-hero/public/devices-plate.png`, la placa del proyecto anterior, que era una recreación de la imagen original mostrada en el chat. `public/source-devices.png` tiene el mismo SHA-256 que esa placa. **No es el archivo fotográfico original.** No se alteró su geometría: solo se aplicaron transformaciones uniformes de cámara, encuadre, luz y composición de pantalla. El fondo difuminado se deriva de la misma placa. Si se aporta el archivo original, puede sustituirse y revisarse la máscara y las coordenadas.

Fuentes: Syne e Inter de Fontsource, distribuidas bajo SIL OFL; las licencias acompañan los binarios. Audio: síntesis original sin samples externos; 28 s, estéreo, transiciones panorámicas, pulso de activación, ambiente armónico y resolución final. El WAV se normalizó a -21 LUFS antes de la ganancia del montaje.

## Validación

Consultar `review/validation.json` para las medidas del master. Se verifica TypeScript, finitud de la animación, ocho salidas iniciales a la derecha, cruces delante/detrás de los ocho sujetos, coincidencia de las esquinas de homografía y formación final dentro del lienzo con dos sujetos de mayor tamaño. Se revisan fotogramas del MP4, fuentes, duración, codecs, conteo de fotogramas, decodificación completa y nivel de audio. No se presenta la referencia inaccesible como validada.
