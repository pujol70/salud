@echo off
rem Busqueda semanal de leads: 15 clinicas, 10 inmobiliarias, 5 otros. Sin Google Places.
rem Para usar Google Places en una linea, agrega --places al final de la linea, antes de la redireccion.
rem Cada busqueda genera un Excel en la carpeta leads. El detalle queda en leads\registro.log.
cd /d "%~dp0"
node app\buscar.js --rubro "Clinicas y consultorios" --ciudad "Asuncion y Gran Asuncion" --cantidad 15 2>> leads\registro.log
node app\buscar.js --rubro "Inmobiliarias" --ciudad "Asuncion y Gran Asuncion" --cantidad 10 2>> leads\registro.log
node app\buscar.js --rubro "Estudios juridicos y contables o comercios con catalogo" --ciudad "Asuncion" --cantidad 5 2>> leads\registro.log
