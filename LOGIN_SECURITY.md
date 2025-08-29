# Sistema de Segurança de Login - Verificação de Falhas e Lista Negra

## 🚨 DIAGNÓSTICO DE ERRO 401 (Unauthorized)

### 📋 **COMO USAR O SCRIPT DE DIAGNÓSTICO**

1. **Abra a aplicação no navegador** (`http://localhost:4200/#/auth/login`)
2. **Abra o Console do navegador** (F12 → Console)
3. **Cole todo o código do arquivo `test-login-diagnosis.js`**
4. **Execute pressionando Enter**
5. **Analise os resultados**

### 🎯 **PROBLEMAS COMUNS E SOLUÇÕES**

#### ❌ **Erro: "net::ERR_CONNECTION_REFUSED"**
**CAUSA**: Servidor backend não está rodando
**SOLUÇÃO**: 
- Inicie o servidor backend na porta 44358
- Verifique se está acessível em `https://localhost:44358`

#### ⚠️ **Erro: "net::ERR_CERT_AUTHORITY_INVALID"**
**CAUSA**: Certificado SSL não confiável
**SOLUÇÃO**: 
- Acesse `https://localhost:44358` no navegador
- Clique em "Avançado" → "Prosseguir para localhost"

#### 🔐 **Status 401: Credenciais Inválidas**
**CAUSA**: Usuário/senha incorretos ou usuário inativo
**SOLUÇÃO**: Verifique no banco de dados se o usuário existe e está ativo

### 🛠️ **COMANDOS ÚTEIS NO CONSOLE**
```javascript
// Limpar cache completamente
localStorage.clear();

// Testar credenciais específicas
testarCredenciaisCustomizadas('admin', 'admin123');

// Remover da lista negra
localStorage.removeItem('user_blacklist');
```

---

## Visão Geral

Foi implementado um sistema de segurança robusto no componente de login que monitora tentativas de login falhadas e bloqueia usuários após múltiplas tentativas incorretas.

## Funcionalidades Implementadas

### 1. Rastreamento de Tentativas Falhadas
- O sistema monitora tentativas de login por usuário
- Cada falha é registrada com timestamp
- Os dados são armazenados em memória e persistidos no localStorage

### 2. Lista Negra Automática
- Usuários são automaticamente adicionados à lista negra após **2 tentativas falhadas**
- A lista negra é persistente (mantida entre sessões do navegador)
- Usuários bloqueados não podem tentar fazer login

### 3. Avisos Progressivos
- **1ª tentativa falhada**: Mensagem padrão de credenciais inválidas com número de tentativas restantes
- **2ª tentativa falhada**: Aviso de que resta apenas 1 tentativa
- **3ª tentativa falhada**: Usuário é bloqueado e adicionado à lista negra

### 4. Reset Automático
- Tentativas falhadas são automaticamente resetadas após **15 minutos** de inatividade
- Isso permite que usuários tentem novamente após um período de espera

## Como Funciona

### Processo de Login
1. Usuário insere credenciais
2. Sistema verifica se o usuário está na lista negra
3. Se não estiver bloqueado, verifica o número de tentativas falhadas
4. Procede com a autenticação
5. Em caso de falha:
   - Registra a tentativa falhada
   - Exibe aviso apropriado
   - Bloqueia se exceder o limite

### Armazenamento
- **Tentativas falhadas**: Mantidas em memória durante a sessão
- **Lista negra**: Armazenada no localStorage (`user_blacklist`)

## Gerenciamento Administrativo

### Via Console do Navegador

Administradores podem gerenciar a lista negra através do console:

```javascript
// Listar usuários bloqueados e tentativas falhadas
loginComponent.adminManageBlacklist('list')

// Remover usuário específico da lista negra
loginComponent.adminManageBlacklist('remove', 'nome_usuario')

// Limpar toda a lista negra
loginComponent.adminManageBlacklist('clear')
```

### Comandos Disponíveis

#### 1. Listar Status (`list`)
```javascript
loginComponent.adminManageBlacklist('list')
```
Retorna objeto com:
- `blacklisted`: Array de usuários bloqueados
- `failedAttempts`: Objeto com tentativas falhadas por usuário

#### 2. Remover Usuário (`remove`)
```javascript
loginComponent.adminManageBlacklist('remove', 'usuario@email.com')
```
Remove usuário específico da lista negra e limpa suas tentativas falhadas.

#### 3. Limpar Lista (`clear`)
```javascript
loginComponent.adminManageBlacklist('clear')
```
Remove todos os usuários da lista negra e limpa todas as tentativas falhadas.

## Configurações

### Constantes Configuráveis
No componente `login.component.ts`:

```typescript
private readonly MAX_FAILED_ATTEMPTS = 2; // Máximo de tentativas antes do bloqueio
```

Para alterar o número máximo de tentativas, modifique esta constante.

### Tempo de Reset
```typescript
const resetTime = 15 * 60 * 1000; // 15 minutos em milissegundos
```

Para alterar o tempo de reset automático, modifique esta constante no método `resetFailedAttemptsTimer`.

## Segurança

### Medidas Implementadas
1. **Case-insensitive**: Nomes de usuário são tratados sem distinção de maiúsculas/minúsculas
2. **Persistência**: Lista negra sobrevive ao fechamento do navegador
3. **Avisos claros**: Usuários são informados sobre o status de suas tentativas
4. **Bloqueio imediato**: Usuários bloqueados não podem tentar login

### Considerações
- A lista negra é armazenada localmente no navegador
- Para uma solução enterprise, considere armazenar no servidor
- O sistema atual é resistente a tentativas de bypass via refresh da página

## Logs

O sistema registra eventos importantes no console:
- Quando um usuário é adicionado à lista negra
- Quando um usuário é removido da lista negra (administrativamente)
- Erros de armazenamento/carregamento da lista negra

## Exemplo de Uso

### Cenário 1: Usuário com Credenciais Incorretas
1. **1ª tentativa**: "Credenciais inválidas. Você tem 2 tentativas restantes."
2. **2ª tentativa**: "Credenciais inválidas. Atenção: você tem apenas mais 1 tentativa antes de ser bloqueado."
3. **3ª tentativa**: "Usuário bloqueado por múltiplas tentativas de login incorretas. Entre em contato com o administrador."

### Cenário 2: Administrador Remove Usuário
```javascript
// Verificar status
console.log(loginComponent.adminManageBlacklist('list'));

// Remover usuário específico
loginComponent.adminManageBlacklist('remove', 'usuario@problema.com');

// Verificar novamente
console.log(loginComponent.adminManageBlacklist('list'));
```

## Manutenção

### Limpeza Periódica
Considere implementar limpeza automática da lista negra baseada em tempo para evitar bloqueios permanentes desnecessários.

### Monitoramento
Monitore os logs do console para identificar padrões de tentativas de acesso suspeitas.

### Backup
A lista negra pode ser exportada via:
```javascript
JSON.stringify(loginComponent.adminManageBlacklist('list'))
```

E restaurada editando diretamente o localStorage ou via método administrativo.
