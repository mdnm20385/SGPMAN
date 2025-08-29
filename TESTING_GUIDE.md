# Como Testar a Funcionalidade de Lista Negra

## Scripts de Teste Disponíveis

### 1. `test-blacklist.js` - Teste Simples
Script básico para verificação rápida da funcionalidade.

### 2. `test-blacklist-complete.js` - Teste Completo
Script avançado com verificações robustas e instruções detalhadas.

## Como Executar os Testes

### Método 1: Console do Navegador (Recomendado)

1. **Navegue para a página de login** do sistema
2. **Abra o console do navegador**:
   - Chrome/Edge: `F12` ou `Ctrl+Shift+I`
   - Firefox: `F12` ou `Ctrl+Shift+K`
3. **Copie e cole o conteúdo** de `test-blacklist-complete.js` no console
4. **Pressione Enter** para executar

### Método 2: Comandos Diretos

Se o componente já estiver carregado, você pode usar comandos diretos:

```javascript
// Verificar status da lista negra
window.loginComponent.adminManageBlacklist('list')

// Remover usuário específico
window.loginComponent.adminManageBlacklist('remove', 'usuario@teste.com')

// Limpar toda a lista negra
window.loginComponent.adminManageBlacklist('clear')
```

## Teste Manual da Funcionalidade

### Cenário: Simular Tentativas Falhadas

1. **Na página de login**, digite um nome de usuário válido
2. **Digite uma senha INCORRETA**
3. **Clique em "Login"**
4. **Observe a mensagem**: "Credenciais inválidas. Você tem 2 tentativas restantes."
5. **Repita com senha incorreta**
6. **Observe a mensagem**: "Credenciais inválidas. Atenção: você tem apenas mais 1 tentativa antes de ser bloqueado."
7. **Repita mais uma vez**
8. **Observe a mensagem**: "Usuário bloqueado por múltiplas tentativas de login incorretas. Entre em contato com o administrador."

### Verificar Bloqueio

Após o bloqueio:
1. **Tente fazer login novamente** com o mesmo usuário
2. **O sistema deve mostrar imediatamente** a mensagem de bloqueio
3. **Não deve permitir tentativas de login**

### Desbloquear Usuário

Para desbloquear um usuário bloqueado:

```javascript
// Substituir 'nome_usuario' pelo usuário real
window.loginComponent.adminManageBlacklist('remove', 'nome_usuario')
```

## Verificações de Funcionamento

### ✅ O que deve funcionar:

- [x] Contagem de tentativas falhadas
- [x] Mensagens progressivas de aviso
- [x] Bloqueio automático após 2 tentativas
- [x] Persistência da lista negra (após refresh da página)
- [x] Comandos administrativos funcionando
- [x] Reset automático após 15 minutos

### ❌ Possíveis problemas:

- **"loginComponent is undefined"**: Componente ainda não carregou ou você não está na página de login
- **Comandos não funcionam**: Certifique-se de usar `window.loginComponent.adminManageBlacklist()`
- **Lista negra não persiste**: Verifique se o localStorage está habilitado no navegador

## Comandos Úteis para Debug

```javascript
// Verificar se o componente está disponível
typeof window.loginComponent !== 'undefined'

// Ver dados brutos do localStorage
JSON.parse(localStorage.getItem('user_blacklist') || '[]')

// Limpar localStorage manualmente
localStorage.removeItem('user_blacklist')

// Verificar todos os dados relacionados
Object.keys(localStorage).filter(key => key.includes('blacklist') || key.includes('login'))
```

## Logs do Sistema

O sistema registra automaticamente no console:
- ⚠️ Quando um usuário é adicionado à lista negra
- ✅ Quando um usuário é removido da lista negra
- ❌ Erros de armazenamento/carregamento

## Troubleshooting

### Problema: Script não executa
**Solução**: Certifique-se de estar na página de login e que o Angular carregou completamente.

### Problema: Comandos administrativos não funcionam
**Solução**: Use `window.loginComponent` em vez de apenas `loginComponent`.

### Problema: Lista negra não persiste
**Solução**: Verifique se o localStorage está habilitado e se não há erro no console.

### Problema: Reset automático não funciona
**Solução**: O reset só acontece quando o usuário tenta fazer login novamente após 15 minutos.

## Limpeza Após Testes

Para limpar todos os dados de teste:

```javascript
// Limpar lista negra
window.loginComponent.adminManageBlacklist('clear')

// Limpar localStorage
localStorage.removeItem('user_blacklist')

// Recarregar página
location.reload()
```
