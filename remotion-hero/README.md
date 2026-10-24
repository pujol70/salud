# Hero pseudo-3D con Remotion

Composición **HeroOrbitLoop**: 1448 × 1086, **300 fotogramas a 30 fps**, 10 segundos. React + TypeScript + CSS; sin Three.js, WebGL, motores 3D, animaciones CSS ni dependencias de recursos externos durante el render.

## Ejecutar

Desde esta carpeta, con Node 24 / npm 11:

```sh
npm ci
npm run typecheck
npm run check:orbit
npm start
```

Seleccionar `HeroOrbitLoop` en Studio. El servidor usa el puerto 3001. En el entorno Codex se utilizó `npm_config_cache=/tmp/npm-cache` para mantener la caché en un directorio escribible.

## Exportar

```sh
npm run render
```

Crea `../videos/hero-orbita-pseudo3d.mp4` en H.264, sin audio, con 300 fotogramas a 30 fps. El script usa `/usr/bin/chromium`, disponible en este entorno; en otra máquina se puede quitar `--browser-executable` para utilizar el navegador de Remotion.

## Código completo

- `src/Root.tsx`: composición, capas estáticas, perspectiva de 1200 px y las tres tarjetas.
- `src/orbit.ts`: geometría de pantallas, siluetas de oclusión y movimiento periódico.
- `src/PortfolioCard.tsx`: tres demos de páginas con rectángulos, líneas y formas SVG.
- `src/index.ts`: registro de la raíz.
- `scripts/check-loop.cjs`: comprobaciones de periodicidad, velocidad, profundidad y aparición.

## Posiciones y capas

Coordenadas de trabajo sobre el lienzo de 1448 × 1086, estimadas visualmente de la imagen adjunta y alineadas con la placa utilizada:

| Pantalla | Superior izquierda | Superior derecha | Inferior derecha | Inferior izquierda |
|---|---|---|---|---|
| Notebook | (404,262) | (1143,207) | (1086,823) | (318,765) |
| Teléfono | (1121,405) | (1337,399) | (1306,928) | (1080,902) |

Centro de aparición: **(737.75, 514.25)**. Los dispositivos y el fondo permanecen estáticos. La misma placa se dibuja dos veces, sin movimiento: una como fondo y otra recortada con las siluetas del hardware. Esa segunda capa queda en `z-index: 10`; las tarjetas pasan por debajo de 10 en la fase posterior y por encima de 20 en la anterior. La escala aumenta al acercarse. Una elipse inclinada mantiene los cambios de capa fuera de las zonas principales de los dispositivos.

La imagen recibida era visible en el chat pero no estaba disponible como archivo en el entorno. `public/devices-plate.png` es una reconstrucción generada a partir de esa referencia, no el archivo original ni una medición exacta de sus píxeles. Se mantiene fija en todo el video. Puede sustituirse por el original conservando el encuadre y revisando las coordenadas y máscaras.

## Bucle y aparición

El período es `10 * fps` y las fases se separan por 100 fotogramas. Se calcula una fase modular y un ángulo de una vuelta completa; seno y coseno determinan la elipse y la profundidad. Una envolvente `smoothstep` hace que cada tarjeta emerja del centro de la pantalla y vuelva a él antes de reiniciar su propio ciclo. Esta aparición se repite de forma periódica, por lo que no se agrega una introducción que rompa el loop.

El estado del fotograma virtual 300 coincide con el del 0. El archivo contiene 0–299: no se duplica el fotograma inicial al final. Las derivadas de posición, escala y opacidad también coinciden a ambos lados de la unión. No hay reloj real, valores aleatorios ni estado acumulativo.

## Usar el MP4 como hero

Copiar el MP4 al sitio y utilizar una ruta local del sitio, por ejemplo:

```tsx
<video
  src="/videos/hero-orbita-pseudo3d.mp4"
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  style={{width: '100%', height: 'auto', display: 'block'}}
/>
```

El enlace de GitHub sirve para descargar el archivo; no se recomienda como alojamiento del hero en producción.

## Validación realizada

- TypeScript sin errores.
- 33 muestras de periodicidad, 900 comprobaciones de profundidad/capas y continuidad de velocidad en las tres fases.
- Render completo de 300 fotogramas; H.264, 1448 × 1086, 30 fps, duración exacta de 10 segundos.
- Decodificación completa con FFmpeg sin errores y revisión visual de fotogramas extraídos del MP4.
- Reproducción del MP4 en Chromium y carga de la composición en Remotion Studio.
