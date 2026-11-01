@echo off
title Ma formation trading
cd /d "%~dp0"
start "Serveur - Ma formation trading" /min node serveur.js
timeout /t 2 /nobreak >nul
start "" http://localhost:8080
