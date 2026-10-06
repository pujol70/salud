// Búsqueda desde la línea de comandos (la usa ejecutar-semanal.cmd).
// Uso: node app/buscar.js --rubro "Inmobiliarias" --ciudad "Asunción" --cantidad 10 [--places]

const motor = require('./motor');

function argumento(nombre) {
  const i = process.argv.indexOf('--' + nombre);
  return i === -1 ? undefined : process.argv[i + 1];
}

const datos = {
  rubro: argumento('rubro'),
  ciudad: argumento('ciudad'),
  cantidad: Number(argumento('cantidad') || 10),
  places: process.argv.includes('--places'),
};

motor
  .buscar(datos, (t) => process.stdout.write(t))
  .then(() => process.exit(0))
  .catch((e) => {
    console.error('Error: ' + e.message);
    process.exit(1);
  });
