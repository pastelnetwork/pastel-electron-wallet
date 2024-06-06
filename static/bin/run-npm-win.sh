@echo off
setlocal

:: Set the PATH to include the directory with your bundled node binary
set PATH=%~dp0static\bin\node-win;%PATH%

:: Run npm command
%~dp0static\bin\node-win\npm.cmd %*