# Scripts de Inicialização da Aplicação Angular

Este projeto está configurado para sempre usar a **porta 4200** e inclui scripts que automaticamente liberam a porta se estiver ocupada.

## Opções de Inicialização

### 1. Comando Padrão (Recomendado)
```bash
npm start
```
- Usa a porta 4200 configurada no angular.json
- Se a porta estiver ocupada, o Angular pode falhar

### 2. Comando com Força (PowerShell)
```bash
npm run start:force
```
- Mata automaticamente processos usando a porta 4200
- Inicia a aplicação na porta 4200
- Usa o script PowerShell (start-dev.ps1)

### 3. Comando com Força (Batch)
```bash
npm run start:force-bat
```
- Alternativa usando arquivo batch (start-dev.bat)
- Funciona mesmo se PowerShell estiver bloqueado
- Mata automaticamente processos usando a porta 4200

### 4. Comando Direto Angular CLI
```bash
ng serve --port 4200
```
- Comando direto do Angular CLI
- Não mata processos automaticamente

## Arquivos de Configuração

### angular.json
Configurado com porta fixa:
```json
"serve": {
  "options": {
    "port": 4200,
    "host": "localhost"
  }
}
```

### start-dev.ps1
Script PowerShell que:
- Verifica processos usando a porta 4200
- Mata os processos automaticamente
- Inicia a aplicação

### start-dev.bat
Script Batch que:
- Alternativa ao PowerShell
- Funciona em ambientes restritivos
- Mesma funcionalidade do script PowerShell

## Resolução de Problemas

### Porta ainda ocupada após usar scripts
```bash
# Verificar processos usando a porta 4200
netstat -ano | findstr :4200

# Matar processo específico manualmente
taskkill /PID [PID_NUMBER] /F
```

### Erro de execução de PowerShell
```bash
# Usar a alternativa batch
npm run start:force-bat

# Ou liberar execução de scripts PowerShell (como administrador)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Acesso à Aplicação

Após inicialização bem-sucedida, a aplicação estará disponível em:
- **URL Local**: http://localhost:4200
- **Modo Watch**: Ativado automaticamente para desenvolvimento
- **Hot Reload**: Mudanças no código são refletidas automaticamente

## Status de Inicialização

✅ **Sucesso**: Porta 4200 livre e aplicação iniciada
⚠️ **Aviso**: Porta estava ocupada, mas foi liberada automaticamente  
❌ **Erro**: Porta ainda ocupada após tentativas de liberação
