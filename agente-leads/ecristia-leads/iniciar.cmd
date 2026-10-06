@echo off
rem Abre la app ECRISTIA Leads en el navegador.
chcp 65001 >nul
cd /d "%~dp0"
title ECRISTIA Leads
where node >nul 2>nul
if errorlevel 1 (
  echo No se encontro Node.js. Instala la version LTS desde https://nodejs.org y vuelve a abrir este archivo.
  pause
  exit /b 1
)
where claude >nul 2>nul
if errorlevel 1 (
  echo No se encontro Claude Code. Instalalo y verifica que el comando claude funcione en una terminal.
  pause
  exit /b 1
)
if not exist node_modules\exceljs (
  echo Instalando dependencias por unica vez...
  call npm install --no-audit --no-fund
  if errorlevel 1 (
    echo No se pudieron instalar las dependencias. Revisa tu conexion e intenta de nuevo.
    pause
    exit /b 1
  )
)
node app\servidor.js --abrir
pause
