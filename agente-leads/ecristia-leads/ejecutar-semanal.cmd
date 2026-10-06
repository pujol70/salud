@echo off
rem Busqueda semanal de leads: 15 clinicas, 10 inmobiliarias, 5 otros.
rem La cantidad es de leads A o B; el agente revisa hasta 3 veces esa cantidad de candidatos.
chcp 65001 >nul
cd /d "%~dp0"
echo ==== %date% %time% ==== >> leads\registro.log
call claude -p "Usa el agente buscador-leads para: clinicas y consultorios, Asuncion y Gran Asuncion, 15" >> leads\registro.log 2>&1
call claude -p "Usa el agente buscador-leads para: inmobiliarias, Asuncion y Gran Asuncion, 10" >> leads\registro.log 2>&1
call claude -p "Usa el agente buscador-leads para: estudios juridicos y contables o comercios con catalogo, Asuncion, 5" >> leads\registro.log 2>&1
