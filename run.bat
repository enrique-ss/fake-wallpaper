@echo off
title Menu de Wallpapers Animados
chcp 65001 >nul
cd /d "%~dp0"

:menu
cls
echo ======================================
echo        SELECIONE UM WALLPAPER
echo ======================================
echo.
echo 1 - video1
echo 2 - video2
echo 3 - video3
echo 4 - video4
echo 0 - Sair
echo.
set /p escolha="Digite o numero do wallpaper desejado: "

if "%escolha%"=="1" set video=video1.mp4
if "%escolha%"=="2" set video=video2.mp4
if "%escolha%"=="3" set video=video3.mp4
if "%escolha%"=="4" set video=video4.mp4
if "%escolha%"=="0" exit

if not defined video (
    echo.
    echo Opcao invalida!
    timeout /t 2 >nul
    goto menu
)

REM Gerar HTML temporario com o video selecionado
(
echo ^<!DOCTYPE html^>
echo ^<html lang="pt-br"^>
echo ^<head^>
echo   ^<meta charset="utf-8"^>
echo   ^<style^>
echo       html, body {margin:0; height:100%%; background:black; overflow:hidden;}
echo       video {position:fixed; top:0; left:0; width:100%%; height:100%%; object-fit:cover;}
echo   ^</style^>
echo ^</head^>
echo ^<body^>
echo   ^<video autoplay loop muted playsinline^>
echo     ^<source src="%~dp0%video%" type="video/mp4"^>
echo   ^</video^>
echo ^</body^>
echo ^</html^>
) > "%~dp0wallpaper.html"

REM Abrir no modo fullscreen real (Edge kiosk)
start msedge --kiosk "file:///%~dp0wallpaper.html" --no-first-run --edge-kiosk-type=fullscreen --disable-restore-session-state
exit