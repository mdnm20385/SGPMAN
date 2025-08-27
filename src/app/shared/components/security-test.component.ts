import { Component, inject } from '@angular/core';
import { LoginService } from '../../core/authentication/login.service';
import { SecureStorageService } from '../../core/services/secure-storage.service';

@Component({
  selector: 'app-security-test',
  template: `
    <div class="security-test-container">
      <h2>🔐 Teste de Segurança - Armazenamento</h2>

      <div class="test-section">
        <h3>Status do Armazenamento</h3>
        <button (click)="auditarSeguranca()" class="btn btn-info">
          Auditar Segurança
        </button>
        <button (click)="migrarDados()" class="btn btn-warning">
          Migrar Dados
        </button>
      </div>

      <div class="test-section">
        <h3>Testar Armazenamento Seguro</h3>
        <button (click)="testarDadosSensiveis()" class="btn btn-primary">
          Armazenar Dados de Teste
        </button>
        <button (click)="verificarDados()" class="btn btn-success">
          Verificar Dados
        </button>
        <button (click)="limparDados()" class="btn btn-danger">
          Limpar Dados Sensíveis
        </button>
      </div>

      <div class="results" *ngIf="resultados">
        <h3>Resultados:</h3>
        <pre>{{ resultados }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .security-test-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    .test-section {
      margin: 20px 0;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }

    .btn {
      margin: 5px;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .btn-primary { background-color: #007bff; color: white; }
    .btn-success { background-color: #28a745; color: white; }
    .btn-danger { background-color: #dc3545; color: white; }
    .btn-warning { background-color: #ffc107; color: black; }
    .btn-info { background-color: #17a2b8; color: white; }

    .results {
      margin-top: 20px;
      padding: 15px;
      background-color: #f8f9fa;
      border-radius: 5px;
    }

    pre {
      white-space: pre-wrap;
      font-family: 'Courier New', monospace;
      font-size: 12px;
    }
  `]
})
export class SecurityTestComponent {
  private readonly loginService = inject(LoginService);
  private readonly secureStorage = inject(SecureStorageService);

  resultados = '';

  auditarSeguranca() {
    // Auditoria de segurança iniciada
    this.loginService.auditarSeguranca();
    this.resultados = 'Auditoria executada - dados verificados';
  }

  migrarDados() {
    this.loginService.migrarDadosSeguro();
    this.resultados = 'Migração de dados concluída - dados agora estão criptografados';
  }

  testarDadosSensiveis() {
    // Criar dados de teste usando as interfaces corretas
    const usuarioTeste = {
      paStamp: 'test-pa-stamp-12345',
      codUsuario: 12345,
      nome: 'João Teste',
      login: 'joao.teste',
      senha: 'minhasenhasecreta',
      priEntrada: null,
      activopa: true,
      inseriu: 'admin',
      inseriuDataHora: new Date().toISOString(),
      alterou: null,
      alterouDataHora: null,
      tipoPerfil: 'administrador',
      edaSic: false,
      sexo: 'M',
      orgao: 'SGPM',
      direcao: 'TI',
      departamento: 'Desenvolvimento',
      orgaostamp: 'org-stamp-123',
      departamentostamp: 'dept-stamp-123',
      direcaostamp: 'dir-stamp-123',
      verSitClass: true,
      pathPdf: null,
      tdocAniva: 'BI',
      path1: '/uploads/usuario-123',
      passwordexperaem: '2024-12-31',
      email: 'joao.teste@sgpm.com',
      medico: false,
      patentetegoria: 'civil',
      usuarioMenu: []
    };

    const tokenTeste = {
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.teste.signature',
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_token: 'def50200a1b2c3d4e5f6refresh_token_test',
      usuario: usuarioTeste,
      mensagem: 'Login realizado com sucesso',
      sucesso: true,
      menuusr: {
        menuusrstamp: 'menu-usr-stamp-123',
        menu: 'dashboard,usuarios,configuracoes',
        userstamp: 'test-pa-stamp-12345',
        activo: true
      }
    };

    // Armazenar usando métodos seguros
    this.loginService.armazenarSessao(usuarioTeste);
    this.loginService.armazenarToken(tokenTeste);

    // Armazenar dados não sensíveis normalmente
    localStorage.setItem('configuracao_app', JSON.stringify({ tema: 'dark', idioma: 'pt' }));

    this.resultados = `Dados de teste armazenados:

✅ Usuário: ${usuarioTeste.nome} (${usuarioTeste.login}) (CRIPTOGRAFADO)
✅ Token: Bearer ${tokenTeste.access_token.substring(0, 20)}... (CRIPTOGRAFADO)
✅ Menu: ${tokenTeste.menuusr?.menu} (CRIPTOGRAFADO)
✅ Configuração: tema/idioma (TEXTO PLANO - não sensível)

Verifique no DevTools → Application → Local Storage para ver a diferença:
- Dados sensíveis aparecem como "enc_..."
- Dados não sensíveis aparecem normalmente`;
  }

  verificarDados() {
    const usuario = this.loginService.obterSessao();
    const token = this.loginService.obterToken();
    const config = this.secureStorage.getItem('configuracao_app') || {};

    this.resultados = `Dados recuperados:

📊 USUÁRIO (descriptografado automaticamente):
${JSON.stringify(usuario, null, 2)}

🔑 TOKEN (descriptografado automaticamente):
${JSON.stringify(token, null, 2)}

⚙️ CONFIGURAÇÃO (não criptografada):
${JSON.stringify(config, null, 2)}

Status de Autenticação:
- Usuário autenticado: ${this.loginService.isAutenticated()}
- Token válido: ${token ? 'Sim' : 'Não'}`;
  }

  limparDados() {
    this.secureStorage.clearSensitiveData();
    this.resultados = `🧹 Limpeza de dados sensíveis concluída!

Dados removidos:
- ❌ usuario
- ❌ ng-matero-token
- ❌ token
- ❌ access_token
- ❌ password
- ❌ mensagemtoquen
- ❌ datasessao

Dados mantidos (não sensíveis):
- ✅ configuracao_app
- ✅ Outros dados não classificados como sensíveis

Status: ${this.loginService.isAutenticated() ? 'Ainda autenticado' : 'Não autenticado'}`;
  }
}
