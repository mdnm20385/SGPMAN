/* eslint-disable no-undef */
/* eslint-env browser */
/* eslint-disable no-console */
// Teste para verificar a funcionalidade de lista negra do login
// Execute este código no console do navegador na página de login

console.log('=== TESTE DE FUNCIONALIDADE DE LISTA NEGRA ===');

// Verificar se o componente está disponível
if (typeof window !== 'undefined' && typeof window.loginComponent === 'undefined') {
    console.error('Componente de login não encontrado. Certifique-se de estar na página de login.');
} else {
    console.log('✓ Componente de login encontrado');

    // Referência local para evitar erros de linting
    const loginComp = window.loginComponent;

    // Testar comandos administrativos
    console.log('\n--- Testando comandos administrativos ---');

    // 1. Verificar status inicial
    console.log('1. Status inicial da lista negra:');
    const initialStatus = loginComp.adminManageBlacklist('list');
    console.log(initialStatus);

    // 2. Simular adição à lista negra (apenas para teste)
    console.log('\n2. Testando adição manual à lista negra:');
    // Nota: Isso seria normalmente feito pelo sistema automaticamente

    // 3. Testar remoção (se houver usuários na lista)
    if (initialStatus.blacklisted.length > 0) {
        console.log('\n3. Testando remoção de usuário da lista negra:');
        const userToRemove = initialStatus.blacklisted[0];
        const removeResult = loginComp.adminManageBlacklist('remove', userToRemove);
        console.log(removeResult);

        // Verificar status após remoção
        console.log('Status após remoção:');
        console.log(loginComp.adminManageBlacklist('list'));
    } else {
        console.log('\n3. Nenhum usuário na lista negra para testar remoção');
    }

    console.log('\n--- Instruções para teste completo ---');
    console.log('Para testar completamente a funcionalidade:');
    console.log('1. Tente fazer login com credenciais incorretas 3 vezes');
    console.log('2. Observe as mensagens de aviso progressivas');
    console.log('3. Após a 3ª tentativa, o usuário será bloqueado');
    console.log('4. Use window.loginComponent.adminManageBlacklist("remove", "username") para desbloquear');

    console.log('\n--- Comandos disponíveis ---');
    console.log('window.loginComponent.adminManageBlacklist("list") - Lista usuários bloqueados');
    console.log('window.loginComponent.adminManageBlacklist("remove", "username") - Remove usuário específico');
    console.log('window.loginComponent.adminManageBlacklist("clear") - Limpa toda a lista negra');
}

console.log('\n=== FIM DO TESTE ===');
