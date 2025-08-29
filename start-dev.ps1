# Script para iniciar a aplicação Angular em modo DESENVOLVIMENTO na porta 4200
# Força a liberação da porta se estiver ocupada

Write-Host "Iniciando aplicação Angular em MODO DESENVOLVIMENTO na porta 4200..." -ForegroundColor Green

# Verificar se a porta 4200 está em uso
$processes = netstat -ano | findstr :4200

if ($processes) {
    Write-Host "Porta 4200 está em uso. Liberando para desenvolvimento..." -ForegroundColor Yellow

    # Extrair PIDs dos processos que estão usando a porta 4200
    $pids = $processes | ForEach-Object {
        if ($_ -match '\s+(\d+)$') {
            $matches[1]
        }
    } | Sort-Object -Unique

    # Matar os processos
    foreach ($processId in $pids) {
        try {
            Write-Host "Terminando processo PID: $processId" -ForegroundColor Yellow
            taskkill /PID $processId /F 2>$null
        }
        catch {
            Write-Host "Não foi possível terminar o processo PID: $processId" -ForegroundColor Red
        }
    }

    # Aguardar um momento para a porta ser liberada
    Start-Sleep -Seconds 2
}

# Verificar novamente se a porta está livre
$stillUsed = netstat -ano | findstr :4200 | findstr LISTENING

if ($stillUsed) {
    Write-Host "AVISO: A porta 4200 ainda está em uso. Tentando iniciar mesmo assim..." -ForegroundColor Red
} else {
    Write-Host "Porta 4200 está livre. Iniciando aplicação em modo desenvolvimento..." -ForegroundColor Green
}

# Iniciar a aplicação Angular em modo desenvolvimento
Write-Host "Executando: ng serve --configuration development" -ForegroundColor Cyan
ng serve --configuration development
