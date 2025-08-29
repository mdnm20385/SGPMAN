@echo off
echo.
echo ===================================================
echo  Iniciando aplicacao Angular em MODO DESENVOLVIMENTO
echo  Porta 4200 (apenas em desenvolvimento)
echo ===================================================
echo.

echo Verificando se a porta 4200 esta em uso...
netstat -ano | findstr :4200 | findstr LISTENING >nul

if %ERRORLEVEL% == 0 (
    echo Porta 4200 esta em uso. Liberando para desenvolvimento...

    REM Obter PIDs dos processos usando a porta 4200
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :4200 ^| findstr LISTENING') do (
        echo Terminando processo PID: %%a
        taskkill /PID %%a /F >nul 2>&1
    )

    echo Aguardando liberacao da porta...
    timeout /t 3 /nobreak >nul
) else (
    echo Porta 4200 esta livre para desenvolvimento!
)

echo.
echo Iniciando aplicacao Angular em modo DESENVOLVIMENTO...
echo Comando: ng serve --configuration development
echo.

ng serve --configuration development
