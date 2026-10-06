// Servidor local de la app. Solo escucha en esta computadora (127.0.0.1).
// Uso: node app/servidor.js [--abrir]

const http = require('http');
const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');
const motor = require('./motor');

const PUERTO = Number(process.env.ECRISTIA_PUERTO) || 5178;
const HOST = '127.0.0.1';
const URL_APP = `http://${HOST}:${PUERTO}/`;
const HOSTS_VALIDOS = new Set([`${HOST}:${PUERTO}`, `localhost:${PUERTO}`]);

let trabajo = { estado: 'libre', log: '', mensaje: '', archivo: '', inicio: null, fin: null, busqueda: null };
let control = {};

function abrir(destino) {
  if (process.platform === 'win32') {
    // explorer.exe abre carpetas, archivos (con su programa) y direcciones web (con el navegador).
    execFile('explorer.exe', [destino], () => {});
  } else if (process.platform === 'darwin') {
    execFile('open', [destino], () => {});
  } else {
    execFile('xdg-open', [destino], () => {});
  }
}

function responder(res, codigo, datos) {
  res.writeHead(codigo, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(datos));
}

function leerCuerpo(req) {
  return new Promise((resolve, reject) => {
    let t = '';
    req.on('data', (c) => {
      t += c;
      if (t.length > 10000) req.destroy();
    });
    req.on('end', () => {
      try {
        resolve(t ? JSON.parse(t) : {});
      } catch {
        reject(new Error('Datos no válidos.'));
      }
    });
    req.on('error', reject);
  });
}

function iniciarBusqueda(datos) {
  const b = motor.validar(datos);
  control = {};
  trabajo = { estado: 'buscando', log: '', mensaje: '', archivo: '', inicio: Date.now(), fin: null, busqueda: b };
  const alLog = (t) => {
    trabajo.log = (trabajo.log + t).slice(-20000);
  };
  motor
    .buscar(b, alLog, control)
    .then((r) => {
      trabajo.estado = 'listo';
      trabajo.archivo = r.archivo;
      trabajo.mensaje = r.resumen;
    })
    .catch((e) => {
      trabajo.estado = 'error';
      trabajo.mensaje = e.message;
      alLog('\nError: ' + e.message + '\n');
    })
    .finally(() => {
      trabajo.fin = Date.now();
    });
}

const servidor = http.createServer(async (req, res) => {
  // Solo peticiones dirigidas a esta app (evita que otra página la use desde el navegador).
  if (!HOSTS_VALIDOS.has(req.headers.host || '')) return responder(res, 403, { error: 'Acceso no permitido.' });

  const ruta = new URL(req.url, URL_APP).pathname;

  if (req.method === 'GET' && (ruta === '/' || ruta === '/index.html')) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    return fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
  }

  if (req.method === 'GET' && ruta === '/api/estado') {
    return responder(res, 200, { ...trabajo, ahora: Date.now() });
  }

  if (req.method === 'GET' && ruta === '/api/archivos') {
    return responder(res, 200, { archivos: motor.listarExcel() });
  }

  if (req.method === 'GET' && ruta === '/api/config') {
    return responder(res, 200, { placesConfigurado: Boolean(process.env.GOOGLE_PLACES_API_KEY) });
  }

  if (req.method === 'POST') {
    if (!(req.headers['content-type'] || '').startsWith('application/json')) {
      return responder(res, 415, { error: 'Tipo de contenido no válido.' });
    }
    let cuerpo;
    try {
      cuerpo = await leerCuerpo(req);
    } catch (e) {
      return responder(res, 400, { error: e.message });
    }

    if (ruta === '/api/buscar') {
      if (trabajo.estado === 'buscando') return responder(res, 409, { error: 'Ya hay una búsqueda en curso.' });
      try {
        iniciarBusqueda(cuerpo);
        return responder(res, 200, { ok: true });
      } catch (e) {
        return responder(res, 400, { error: e.message });
      }
    }

    if (ruta === '/api/cancelar') {
      if (trabajo.estado !== 'buscando' || !control.detener) return responder(res, 409, { error: 'No hay búsqueda en curso.' });
      control.detener();
      return responder(res, 200, { ok: true });
    }

    if (ruta === '/api/abrir') {
      const nombre = String(cuerpo.archivo || '');
      const valido = /^[\w.\- ]+\.xlsx$/i.test(nombre) && path.basename(nombre) === nombre;
      const destino = path.join(motor.LEADS, nombre);
      if (!valido || !fs.existsSync(destino)) return responder(res, 404, { error: 'Archivo no encontrado.' });
      abrir(destino);
      return responder(res, 200, { ok: true });
    }

    if (ruta === '/api/abrir-carpeta') {
      fs.mkdirSync(motor.LEADS, { recursive: true });
      abrir(motor.LEADS);
      return responder(res, 200, { ok: true });
    }
  }

  responder(res, 404, { error: 'No encontrado.' });
});

servidor.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.log(`La app ya está abierta en ${URL_APP}`);
    if (process.argv.includes('--abrir')) abrir(URL_APP);
    setTimeout(() => process.exit(0), 500);
  } else {
    console.error('No se pudo iniciar la app:', e.message);
    process.exit(1);
  }
});

servidor.listen(PUERTO, HOST, () => {
  console.log(`ECRISTIA Leads está abierta en ${URL_APP}`);
  console.log('No cierres esta ventana mientras uses la app. Para salir, ciérrala.');
  if (process.argv.includes('--abrir')) abrir(URL_APP);
});
