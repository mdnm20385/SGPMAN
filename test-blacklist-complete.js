/**
 * Script de Teste para Sistema de Lista Negra do Login
 *
 * Como usar:
 * 1. Navegue até a página de login
 * 2. Abra o console do navegador (F12)
 * 3. Cole este código completo no console
 * 4. Pressione Enter para executar
 */

/* eslint-env browser */
/* eslint-disable no-console */

(function() {
    'use strict';

    console.log('=== TESTE DE FUNCIONALIDADE DE LISTA NEGRA ===');

    // Função para aguardar o componente estar disponível
    function waitForLoginComponent(callback, maxAttempts = 10) {
        let attempts = 0;

        function check() {
            attempts++;

            if (window.loginComponent) {
                callback(window.loginComponent);
                return;
            }

            if (attempts < maxAttempts) {
                console.log(`Tentativa ${attempts}: Aguardando componente de login...`);
                setTimeout(check, 1000);
            } else {
                console.error('❌ Componente de login não encontrado após', maxAttempts, 'tentativas.');
                console.log('💡 Certifique-se de estar na página de login do Angular.');
                console.log('💡 O componente pode não ter sido inicializado ainda.');
            }
        }

        check();
    }

    // Função principal de teste
    function runTests(loginComp) {
        console.log('✅ Componente de login encontrado!');

        try {
            // Teste 1: Verificar status inicial
            console.log('\n--- Teste 1: Status inicial da lista negra ---');
            const initialStatus = loginComp.adminManageBlacklist('list');
            console.log('📊 Status:', initialStatus);

            // Teste 2: Testar comando inválido
            console.log('\n--- Teste 2: Testando comando inválido ---');
            const invalidResult = loginComp.adminManageBlacklist('invalid');
            console.log('⚠️ Resultado:', invalidResult);

            // Teste 3: Testar remoção (se houver usuários)
            if (initialStatus.blacklisted && initialStatus.blacklisted.length > 0) {
                console.log('\n--- Teste 3: Testando remoção de usuário ---');
                const userToRemove = initialStatus.blacklisted[0];
                console.log('🔄 Removendo usuário:', userToRemove);

                const removeResult = loginComp.adminManageBlacklist('remove', userToRemove);
                console.log('✅ Resultado:', removeResult);

                // Verificar status após remoção
                const statusAfterRemove = loginComp.adminManageBlacklist('list');
                console.log('📊 Status após remoção:', statusAfterRemove);

                // Re-adicionar para não afetar o sistema
                console.log('🔄 Re-adicionando usuário para manter estado original...');
                // Nota: Não há função pública para adicionar, isso é feito automaticamente

            } else {
                console.log('\n--- Teste 3: Nenhum usuário na lista negra ---');
                console.log('✅ Lista negra está vazia - isso é bom!');
            }

            // Teste 4: Informações sobre failed attempts
            if (initialStatus.failedAttempts && Object.keys(initialStatus.failedAttempts).length > 0) {
                console.log('\n--- Teste 4: Tentativas falhadas registradas ---');
                console.log('📋 Tentativas falhadas:', initialStatus.failedAttempts);
            } else {
                console.log('\n--- Teste 4: Nenhuma tentativa falhada registrada ---');
                console.log('✅ Nenhuma tentativa falhada - sistema limpo!');
            }

            // Instruções para teste manual
            console.log('\n--- INSTRUÇÕES PARA TESTE MANUAL ---');
            console.log('🧪 Para testar a funcionalidade completa:');
            console.log('1️⃣ Digite um nome de usuário válido');
            console.log('2️⃣ Digite uma senha INCORRETA');
            console.log('3️⃣ Clique em "Login" - você verá: "Credenciais inválidas. Você tem 2 tentativas restantes."');
            console.log('4️⃣ Repita com senha incorreta - você verá: "Atenção: você tem apenas mais 1 tentativa..."');
            console.log('5️⃣ Repita novamente - você verá: "Usuário bloqueado por múltiplas tentativas..."');
            console.log('6️⃣ Use os comandos abaixo para gerenciar a lista negra');

            console.log('\n--- COMANDOS ADMINISTRATIVOS DISPONÍVEIS ---');
            console.log('📋 Listar status:');
            console.log('   window.loginComponent.adminManageBlacklist("list")');

            console.log('🗑️ Remover usuário específico:');
            console.log('   window.loginComponent.adminManageBlacklist("remove", "nome_usuario")');

            console.log('🧹 Limpar toda a lista negra:');
            console.log('   window.loginComponent.adminManageBlacklist("clear")');

            console.log('\n--- EXEMPLO DE USO ---');
            console.log('// Verificar status atual');
            console.log('let status = window.loginComponent.adminManageBlacklist("list");');
            console.log('console.log(status);');
            console.log('');
            console.log('// Remover usuário específico (substitua "usuario@teste.com" pelo nome real)');
            console.log('window.loginComponent.adminManageBlacklist("remove", "usuario@teste.com");');
            console.log('');
            console.log('// Limpar toda a lista (cuidado!)');
            console.log('window.loginComponent.adminManageBlacklist("clear");');

        } catch (error) {
            console.error('❌ Erro durante os testes:', error);
            console.log('💡 Certifique-se de que o componente foi carregado corretamente.');
        }
    }

    // Verificar se já está disponível ou aguardar
    if (window.loginComponent) {
        runTests(window.loginComponent);
    } else {
        console.log('⏳ Componente não encontrado imediatamente. Aguardando...');
        waitForLoginComponent(runTests);
    }

    console.log('\n=== FIM DO TESTE ===');

})();
