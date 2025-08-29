# Scripts de Inicialização da Aplicação Angular

Este projeto está configurado para usar a **porta 4200 APENAS em modo de desenvolvimento** e inclui scripts que automaticamente liberam a porta se estiver ocupada.

## 🎯 Configuração por Ambiente

### 🔧 Desenvolvimento
- **Porta Fixa**: 4200
- **Host**: localhost
- **Liberação Automática**: Scripts matam processos conflitantes

### 🚀 Produção
- **Porta**: Flexível (padrão Angular CLI ou configurável)
- **Host**: Configurável
- **Liberação**: Não forçada

## Opções de Inicialização

### 1. Comando Padrão Desenvolvimento (Recomendado)
```bash
npm start
```
- Usa modo desenvolvimento com porta 4200 fixa
- Equivalente a `ng serve --configuration development`

### 2. Comando Específico Desenvolvimento
```bash
npm run start:dev
```
- Explicitamente usa configuração de desenvolvimento
- Porta 4200 garantida

### 3. Comando Produção
```bash
npm run start:prod
```
- Usa configuração de produção
- Porta flexível (sem forçar 4200)

### 4. Comando com Força (PowerShell) - Apenas Desenvolvimento
```bash
npm run start:force
```
- Mata automaticamente processos usando a porta 4200
- Inicia em modo desenvolvimento
- Usa o script PowerShell (start-dev.ps1)

### 5. Comando com Força (Batch) - Apenas Desenvolvimento
```bash
npm run start:force-bat
```
- Alternativa usando arquivo batch (start-dev.bat)
- Funciona mesmo se PowerShell estiver bloqueado
- Mata automaticamente processos usando a porta 4200

## Arquivos de Configuração

### angular.json
Configurado com porta específica para desenvolvimento:
```json
"serve": {
  "configurations": {
    "development": {
      "port": 4200,
      "host": "localhost"
    },
    "production": {
      "buildTarget": "ng-matero:build:production"
    }
  },
  "defaultConfiguration": "development"
}
```

### start-dev.ps1
Script PowerShell que:
- Verifica processos usando a porta 4200
- Mata os processos automaticamente
- Inicia em modo desenvolvimento

### start-dev.bat
Script Batch que:
- Alternativa ao PowerShell
- Funciona em ambientes restritivos
- Mesma funcionalidade para desenvolvimento

## Diferenças por Ambiente

| Aspecto | Desenvolvimento | Produção |
|---------|----------------|----------|
| Porta | **4200 (fixa)** | Flexível |
| Host | localhost | Configurável |
| Scripts de Força | ✅ Disponíveis | ❌ Não necessário |
| Liberação Automática | ✅ Sim | ❌ Não |

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

### Desenvolvimento
- **URL Local**: http://localhost:4200
- **Porta Garantida**: Sempre 4200
- **Hot Reload**: Ativado automaticamente

### Produção
- **URL**: Varia conforme configuração
- **Porta**: Configurável via parâmetros
- **Otimizações**: Build otimizado para produção

## Status de Inicialização

✅ **Desenvolvimento**: Porta 4200 obrigatória com liberação automática
🚀 **Produção**: Configuração flexível sem forçar porta específica
⚠️ **Scripts de Força**: Apenas para desenvolvimento
