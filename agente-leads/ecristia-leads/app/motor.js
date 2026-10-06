// Ejecuta una búsqueda con Claude Code (modo sin interfaz) y guarda el resultado en Excel.
// Lo usan servidor.js (la app) y buscar.js (línea de comandos y tarea semanal).

const fs = require('fs');
const path = require('path');
const { spawn, execFile } = require('child_process');
const ExcelJS = require('exceljs');

const RAIZ = path.resolve(__dirname, '..');
const LEADS = path.join(RAIZ, 'leads');
const TMP = path.join(LEADS, 'tmp');
const HISTORIAL = path.join(LEADS, 'historial.csv');
const NO_CONTACTAR = path.join(LEADS, 'no-contactar.csv');
const REGISTRO = path.join(LEADS, 'registro.log');

// Comando de Claude Code. Se puede reemplazar con la variable ECRISTIA_CLAUDE_CMD (solo para pruebas).
const CLAUDE_CMD = process.env.ECRISTIA_CLAUDE_CMD || 'claude -p';
const LIMITE_MS = 30 * 60 * 1000;

const ESTADOS = ['nuevo', 'contactado', 'respondió', 'reunión', 'propuesta', 'ganado', 'perdido'];

const COLUMNAS = [
  { clave: 'estado', titulo: 'Estado', ancho: 13 },
  { clave: 'categoria', titulo: 'Cat.', ancho: 6 },
  { clave: 'puntaje', titulo: 'Puntaje', ancho: 9 },
  { clave: 'negocio', titulo: 'Negocio', ancho: 30 },
  { clave: 'rubro', titulo: 'Rubro', ancho: 20 },
  { clave: 'ciudad', titulo: 'Ciudad', ancho: 16 },
  { clave: 'direccion', titulo: 'Dirección', ancho: 32 },
  { clave: 'telefono_publico', titulo: 'Teléfono', ancho: 16 },
  { clave: 'email_publico', titulo: 'Correo', ancho: 26 },
  { clave: 'web', titulo: 'Web', ancho: 30 },
  { clave: 'instagram', titulo: 'Instagram', ancho: 26 },
  { clave: 'fuente_contacto', titulo: 'Fuente del contacto', ancho: 22 },
  { clave: 'resenas_google', titulo: 'Reseñas Google', ancho: 10 },
  { clave: 'calificacion_google', titulo: 'Calificación Google', ancho: 11 },
  { clave: 'servicio_sugerido', titulo: 'Servicio sugerido', ancho: 22 },
  { clave: 'motivo', titulo: 'Motivo', ancho: 40 },
  { clave: 'senales', titulo: 'Señales', ancho: 40 },
  { clave: 'borrador_mensaje', titulo: 'Borrador de mensaje', ancho: 60 },
  { clave: 'notas', titulo: 'Notas y fuentes', ancho: 50 },
  { clave: 'fecha', titulo: 'Fecha', ancho: 11 },
  { clave: 'place_id', titulo: 'place_id', ancho: 28 },
];

const COLOR = {
  fiordo: 'FF2E4A5C',
  nieve: 'FFFDFCFA',
  salvia100: 'FFDDE5DD',
  arena: 'FFECE8DF',
  linea: 'FFDCD6CA',
};

// ---------- utilidades ----------

function limpiarTexto(valor, max = 80) {
  return String(valor ?? '')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/["<>|&^%;`$\\]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

// Para el contenido del Excel: solo quita saltos de línea y espacios repetidos.
function unaLinea(valor) {
  return String(valor).replace(/\s*[\r\n]+\s*/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 4000);
}

function validar(datos) {
  const rubro = limpiarTexto(datos.rubro);
  const ciudad = limpiarTexto(datos.ciudad);
  const cantidad = Number(datos.cantidad);
  const places = datos.places === true || datos.places === 'true' || datos.places === 'on';
  if (!rubro) throw new Error('Escribe el rubro.');
  if (!ciudad) throw new Error('Escribe la ciudad o zona.');
  if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 30) {
    throw new Error('La cantidad debe ser un número entero entre 1 y 30.');
  }
  if (places && !process.env.GOOGLE_PLACES_API_KEY) {
    throw new Error(
      'Marcaste Google Places, pero falta la variable GOOGLE_PLACES_API_KEY en Windows. ' +
        'Configúrala con setx (ver LEEME.md), cierra esta app y vuelve a abrirla. O desmarca la casilla.'
    );
  }
  return { rubro, ciudad, cantidad, places };
}

function slug(texto) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 30) || 'busqueda';
}

function dos(n) {
  return String(n).padStart(2, '0');
}

function marcaDeTiempo(d = new Date()) {
  return `${d.getFullYear()}-${dos(d.getMonth() + 1)}-${dos(d.getDate())}_${dos(d.getHours())}${dos(d.getMinutes())}`;
}

function fechaHoy(d = new Date()) {
  return `${d.getFullYear()}-${dos(d.getMonth() + 1)}-${dos(d.getDate())}`;
}

function registrar(linea) {
  try {
    fs.appendFileSync(REGISTRO, linea.endsWith('\n') ? linea : linea + '\n', 'utf8');
  } catch {
    /* el registro no debe frenar la búsqueda */
  }
}

// ---------- duplicados ----------

const normNombre = (s) =>
  String(s || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

const normWeb = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '')
    .trim();

// Quita el código de país (595) y el 0 inicial: "+595 21 222222" y "021 222222" quedan iguales.
const normTel = (s) => {
  const d = String(s || '').replace(/\D/g, '').replace(/^595/, '').replace(/^0+/, '');
  return d.length >= 6 ? d : '';
};

function leerCsv(archivo) {
  if (!fs.existsSync(archivo)) return [];
  const lineas = fs.readFileSync(archivo, 'utf8').replace(/^﻿/, '').split(/\r?\n/).filter(Boolean);
  if (lineas.length < 2) return [];
  const cab = lineas[0].split(';').map((c) => c.trim());
  return lineas.slice(1).map((l) => {
    const v = l.split(';');
    const o = {};
    cab.forEach((c, i) => (o[c] = (v[i] || '').trim()));
    return o;
  });
}

function clavesDe(fila) {
  const k = [];
  if (fila.place_id) k.push('id:' + fila.place_id);
  const n = normNombre(fila.negocio);
  if (n) k.push('n:' + n);
  const w = normWeb(fila.web);
  if (w && !/instagram\.com|facebook\.com|wa\.me|linktr\.ee/.test(w)) k.push('w:' + w);
  const t = normTel(fila.telefono_publico || fila.telefono);
  if (t) k.push('t:' + t);
  return k;
}

function clavesConocidas() {
  const set = new Set();
  for (const f of [...leerCsv(HISTORIAL), ...leerCsv(NO_CONTACTAR)]) clavesDe(f).forEach((k) => set.add(k));
  return set;
}

// ---------- lectura del JSON del agente ----------

function leerResultado(archivo) {
  if (!fs.existsSync(archivo)) {
    throw new Error('Claude Code terminó sin crear el archivo de resultados. Revisa leads\\registro.log.');
  }
  const texto = fs.readFileSync(archivo, 'utf8').replace(/^﻿/, '').trim();
  let datos;
  try {
    datos = JSON.parse(texto);
  } catch {
    const i = texto.indexOf('[');
    const j = texto.lastIndexOf(']');
    if (i === -1 || j <= i) throw new Error('El archivo de resultados no tiene un JSON válido.');
    datos = JSON.parse(texto.slice(i, j + 1));
  }
  if (!Array.isArray(datos)) throw new Error('El archivo de resultados no es una lista.');
  return datos;
}

function normalizarFila(f, hoy) {
  const o = {};
  for (const c of COLUMNAS) {
    if (c.clave === 'estado') continue;
    const v = f[c.clave];
    o[c.clave] = v === null || v === undefined ? '' : typeof v === 'number' ? v : unaLinea(v);
  }
  o.categoria = String(o.categoria || '').toUpperCase();
  const p = Number(o.puntaje);
  o.puntaje = Number.isFinite(p) ? p : '';
  for (const k of ['resenas_google', 'calificacion_google']) {
    const n = Number(o[k]);
    o[k] = o[k] === '' || !Number.isFinite(n) ? '' : n;
  }
  o.fecha = o.fecha || hoy;
  o.estado = 'nuevo';
  return o;
}

// ---------- Excel ----------

function enlace(url, esInstagram = false) {
  const u = String(url || '').trim();
  if (!u) return '';
  let href;
  if (/^https?:\/\//i.test(u)) href = u;
  else if (esInstagram && /^@?[\w.]+$/.test(u) && !/\.(com|py|net|org)$/i.test(u)) href = 'https://instagram.com/' + u.replace(/^@/, '');
  else href = 'https://' + u;
  return { text: u, hyperlink: href };
}

async function escribirExcel(archivo, filas, busqueda, resumen) {
  const libro = new ExcelJS.Workbook();
  libro.creator = 'ECRISTIA';
  libro.created = new Date();

  const hoja = libro.addWorksheet('Leads', { views: [{ state: 'frozen', ySplit: 1, xSplit: 4 }] });
  hoja.columns = COLUMNAS.map((c) => ({ header: c.titulo, key: c.clave, width: c.ancho }));

  const cab = hoja.getRow(1);
  cab.font = { bold: true, color: { argb: COLOR.nieve } };
  cab.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLOR.fiordo } };
  cab.alignment = { vertical: 'middle', wrapText: true };
  cab.height = 30;

  for (const f of filas) {
    const fila = hoja.addRow({ ...f, web: enlace(f.web), instagram: enlace(f.instagram, true) });
    fila.alignment = { vertical: 'top', wrapText: true };
    const color = f.categoria === 'A' ? COLOR.salvia100 : COLOR.arena;
    for (const k of ['categoria', 'puntaje', 'negocio']) {
      fila.getCell(k).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: color } };
    }
    fila.getCell('categoria').font = { bold: true };
    for (const k of ['web', 'instagram']) {
      if (fila.getCell(k).value) fila.getCell(k).font = { color: { argb: 'FF1F5F8B' }, underline: true };
    }
    fila.getCell('estado').dataValidation = {
      type: 'list',
      allowBlank: false,
      formulae: ['"' + ESTADOS.join(',') + '"'],
    };
  }

  hoja.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: COLUMNAS.length } };

  const info = libro.addWorksheet('Búsqueda');
  info.columns = [
    { header: 'Dato', key: 'dato', width: 26 },
    { header: 'Valor', key: 'valor', width: 60 },
  ];
  info.getRow(1).font = { bold: true, color: { argb: COLOR.nieve } };
  info.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLOR.fiordo } };
  info.addRows([
    { dato: 'Fecha y hora', valor: new Date().toLocaleString('es-PY') },
    { dato: 'Rubro', valor: busqueda.rubro },
    { dato: 'Ciudad o zona', valor: busqueda.ciudad },
    { dato: 'Cantidad pedida (A o B)', valor: busqueda.cantidad },
    { dato: 'Google Places', valor: busqueda.places ? 'Sí' : 'No' },
    { dato: 'Leads guardados', valor: filas.length },
    { dato: 'Descartados por repetidos', valor: resumen.repetidos },
    { dato: 'Descartados por categoría C o sin categoría', valor: resumen.descartados },
    { dato: 'Estados posibles', valor: ESTADOS.join(', ') },
  ]);

  await libro.xlsx.writeFile(archivo);
}

function agregarAlHistorial(filas, nombreArchivo) {
  const existe = fs.existsSync(HISTORIAL);
  const sinPuntoYComa = (s) => String(s ?? '').replace(/[;\r\n]+/g, ' ').trim();
  let texto = existe ? '' : 'fecha;place_id;negocio;web;telefono;archivo\n';
  for (const f of filas) {
    texto +=
      [f.fecha, f.place_id, f.negocio, f.web, f.telefono_publico, nombreArchivo].map(sinPuntoYComa).join(';') + '\n';
  }
  fs.appendFileSync(HISTORIAL, texto, 'utf8');
}

// ---------- Claude Code ----------

function armarPrompt(b, salidaRel) {
  return [
    'Usa el agente buscador-leads con estos datos:',
    `- Rubro: ${b.rubro}`,
    `- Ciudad o zona: ${b.ciudad}`,
    `- Cantidad de leads A o B: ${b.cantidad}`,
    `- Usar Google Places: ${b.places ? 'SÍ' : 'NO'}`,
    `- Archivo de salida (JSON): ${salidaRel}`,
    'Sigue las reglas del agente. Al terminar, escribe el archivo de salida aunque no encuentres leads (en ese caso, una lista vacía []).',
    '',
  ].join('\n');
}

function detenerProceso(hijo) {
  if (!hijo || hijo.exitCode !== null) return;
  if (process.platform === 'win32') {
    execFile('taskkill', ['/pid', String(hijo.pid), '/T', '/F'], () => {});
  } else {
    try {
      process.kill(-hijo.pid, 'SIGTERM');
    } catch {
      hijo.kill('SIGTERM');
    }
  }
}

function ejecutarClaude(prompt, alLog, control) {
  return new Promise((resolve, reject) => {
    const hijo = spawn(CLAUDE_CMD, {
      cwd: RAIZ,
      shell: true,
      windowsHide: true,
      detached: process.platform !== 'win32',
      env: process.env,
    });

    let cancelado = false;
    const reloj = setTimeout(() => {
      cancelado = 'tiempo';
      detenerProceso(hijo);
    }, LIMITE_MS);
    if (control) {
      control.detener = () => {
        cancelado = 'usuario';
        detenerProceso(hijo);
      };
    }

    const escribir = (buf) => {
      const t = buf.toString('utf8');
      registrar(t);
      alLog(t);
    };
    hijo.stdout.on('data', escribir);
    hijo.stderr.on('data', escribir);

    hijo.on('error', (e) => {
      clearTimeout(reloj);
      reject(new Error('No se pudo iniciar Claude Code: ' + e.message));
    });

    hijo.on('close', (codigo) => {
      clearTimeout(reloj);
      if (cancelado === 'usuario') return reject(new Error('Búsqueda cancelada.'));
      if (cancelado === 'tiempo') return reject(new Error('La búsqueda superó los 30 minutos y se detuvo.'));
      if (codigo !== 0) {
        return reject(
          new Error(
            `Claude Code terminó con error (código ${codigo}). Revisa que el comando "claude" funcione en una terminal y que hayas iniciado sesión.`
          )
        );
      }
      resolve();
    });

    hijo.stdin.on('error', () => {});
    hijo.stdin.end(prompt, 'utf8');
  });
}

// ---------- búsqueda completa ----------

async function buscar(datos, alLog = () => {}, control = {}) {
  const b = validar(datos);
  fs.mkdirSync(TMP, { recursive: true });

  const marca = marcaDeTiempo();
  const id = `${marca}_${Math.random().toString(36).slice(2, 6)}`;
  const salidaRel = `leads/tmp/${id}.json`;
  const salidaAbs = path.join(RAIZ, salidaRel);

  registrar(`\n==== ${new Date().toLocaleString('es-PY')} | ${b.rubro} | ${b.ciudad} | ${b.cantidad} | Places: ${b.places ? 'sí' : 'no'} ====`);
  alLog(`Buscando ${b.cantidad} leads de "${b.rubro}" en "${b.ciudad}" (Google Places: ${b.places ? 'sí' : 'no'}).\n`);

  try {
    await ejecutarClaude(armarPrompt(b, salidaRel), alLog, control);
  } catch (e) {
    fs.rmSync(salidaAbs, { force: true });
    throw e;
  }

  const crudo = leerResultado(salidaAbs);
  const hoy = fechaHoy();
  const conocidas = clavesConocidas();
  const filas = [];
  let repetidos = 0;
  let descartados = 0;

  for (const r of crudo) {
    if (!r || typeof r !== 'object') {
      descartados++;
      continue;
    }
    const f = normalizarFila(r, hoy);
    if (f.categoria !== 'A' && f.categoria !== 'B') {
      descartados++;
      continue;
    }
    const claves = clavesDe(f);
    if (!f.negocio || claves.some((k) => conocidas.has(k))) {
      repetidos++;
      continue;
    }
    claves.forEach((k) => conocidas.add(k));
    filas.push(f);
  }

  filas.sort((x, y) => (Number(y.puntaje) || 0) - (Number(x.puntaje) || 0));

  fs.rmSync(salidaAbs, { force: true });

  if (filas.length === 0) {
    const resumen = `No hay leads nuevos A o B; no se creó el Excel.` +
      (repetidos || descartados ? ` Descartados: ${repetidos} repetidos, ${descartados} de categoría C o sin categoría.` : '');
    registrar(resumen);
    alLog('\n' + resumen + '\n');
    return { archivo: '', filas: 0, repetidos, descartados, resumen };
  }

  let nombre = `${marca}_${slug(b.rubro)}_${slug(b.ciudad)}.xlsx`;
  let n = 2;
  while (fs.existsSync(path.join(LEADS, nombre))) {
    nombre = `${marca}_${slug(b.rubro)}_${slug(b.ciudad)}-${n++}.xlsx`;
  }

  await escribirExcel(path.join(LEADS, nombre), filas, b, { repetidos, descartados });
  agregarAlHistorial(filas, nombre);

  const descarte = [repetidos && `${repetidos} repetidos`, descartados && `${descartados} de categoría C o sin categoría`]
    .filter(Boolean)
    .join(', ');
  const resumen = `Listo: ${filas.length} leads guardados en leads\\${nombre}.` + (descarte ? ` Descartados: ${descarte}.` : '');
  registrar(resumen);
  alLog('\n' + resumen + '\n');

  return { archivo: nombre, filas: filas.length, repetidos, descartados, resumen };
}

function listarExcel() {
  if (!fs.existsSync(LEADS)) return [];
  return fs
    .readdirSync(LEADS)
    .filter((f) => f.toLowerCase().endsWith('.xlsx') && !f.startsWith('~$'))
    .map((f) => {
      const st = fs.statSync(path.join(LEADS, f));
      return { nombre: f, fecha: st.mtime.toISOString(), bytes: st.size };
    })
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
}

module.exports = { buscar, validar, listarExcel, RAIZ, LEADS };
