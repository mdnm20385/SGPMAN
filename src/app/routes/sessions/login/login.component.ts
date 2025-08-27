import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { Menu, MenuService } from '@core';
import { AuthService, User, Usuario } from '@core/authentication';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { LogoutService } from 'app/services/logout.service';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { catchError, filter, finalize, of, retry, Subject, takeUntil, timeout } from 'rxjs';

/**
 * LoginComponent with Enhanced Security Features
 *
 * Features implemented:
 * - Failed login attempts tracking per user
 * - Automatic blacklisting after 2 failed attempts
 * - User blocking with appropriate warning messages
 * - Persistent blacklist storage in localStorage
 * - Automatic reset of failed attempts after 15 minutes
 * - Administrative methods for blacklist management
 *
 * Security measures:
 * - Users are warned when they have 1 attempt remaining
 * - Blocked users cannot attempt login until removed from blacklist
 * - Failed attempts are tracked case-insensitively
 * - Blacklist persists across browser sessions
 */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MtxButtonModule,
    TranslateModule,
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly authService = inject(AuthService);
  private readonly menuService = inject(MenuService);
  private readonly permissonsService = inject(NgxPermissionsService);
  private readonly rolesService = inject(NgxRolesService);
  private readonly dialog = inject(MtxDialog);
  private readonly http = inject(HttpClient);

  // Performance optimizations
  private readonly LOGIN_TIMEOUT = 30000; // 30 seconds timeout
  private readonly MAX_RETRIES = 2;

  // Failed login attempts tracking
  private readonly MAX_FAILED_ATTEMPTS = 2;
  private failedAttempts = new Map<string, { count: number; lastAttempt: Date }>();
  private blacklistedUsers = new Set<string>();

  isSubmitting = false;
  hidePassword = true; // For password visibility toggle
  appVersion = '2.0.0'; // Default version
  currentYear = new Date().getFullYear(); // Current year

  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    rememberMe: [false],
  });

  constructor(private logoutService: LogoutService) {}

  ngOnInit(): void {
    this.loadBlacklistFromStorage();
    this.initializeForm();
    this.loadAppVersion();

    // Expose component for administrative access in development
    if (typeof window !== 'undefined') {
      (window as any).loginComponent = this;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    if (this.auth.mensagemtoquen() === true) {
      this.dialog.alert(`${this.auth.obtermensagemtoquen()}`);
      const usr = this.auth.obterpassword() as Usuario;
      this.loginForm.patchValue({
        username: usr.login!,
        password: usr.senha!,
        rememberMe: false
      });
      this.auth.removepassword();
    }
  }

  // Getters optimized
  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe')!;
  }

  showMacAddress(): void {
    // Implementation if needed
  }

  private setMenu(menu: Menu[]): void {
    this.menuService.addNamespace(menu, 'menu');
    this.menuService.set(menu);

  }

  /**
   * Carrega o menu do usuário de forma obrigatória
   * Garante que o menu seja sempre carregado após login bem-sucedido
   */
  private loadUserMenu(): void {
    // Usar o LoginService para carregar o menu
    this.auth.menu()
      .pipe(
        takeUntil(this.destroy$),
        retry(2), // Tentar 2 vezes em caso de erro
        timeout(10000), // Timeout de 10 segundos
        catchError((error) => {
          console.error('Erro ao carregar menu do usuário:', error);
          // Retorna menu básico em caso de erro
          return of([{
            route: '/dashboard',
            name: 'Dashboard',
            type: 'link' as const,
            icon: 'dashboard'
          }]);
        })
      )
      .subscribe({
        next: (menu: Menu[]) => {
          if (menu && menu.length > 0) {
            this.setMenu(menu);
            // Menu carregado com sucesso
          } else {
            // Se menu vazio, carrega menu básico
            this.setMenu([{
              route: '/dashboard',
              name: 'Dashboard',
              type: 'link' as const,
              icon: 'dashboard'
            }]);
          }
        },
        error: (error) => {
          console.error('Erro fatal ao carregar menu:', error);
          // Define menu básico mesmo em caso de erro
          this.setMenu([{
            route: '/dashboard',
            name: 'Dashboard',
            type: 'link' as const,
            icon: 'dashboard'
          }]);
        }
      });
  }

  private setPermissions(user: User): void {
    const permissions = ['canAdd', 'canDelete', 'canEdit', 'canRead'];
    this.permissonsService.loadPermissions(permissions);
    this.rolesService.flushRoles();
    this.rolesService.addRoles({ QUALQ: permissions });
  }

  private loadAppVersion(): void {
    this.http.get<{version: string}>('assets/Version.json')
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          console.error('Error loading version:', error);
          return of({ version: '2.0.0' }); // Default version
        })
      )
      .subscribe({
        next: (versionData) => {
          this.appVersion = versionData.version || '2.0.0';
        }
      });
  }

  refresh(): void {
    window.location.reload();
  }

  // Methods for handling failed login attempts and blacklist
  private isUserBlacklisted(username: string): boolean {
    return this.blacklistedUsers.has(username.toLowerCase());
  }

  private getFailedAttempts(username: string): number {
    const userKey = username.toLowerCase();
    const attempts = this.failedAttempts.get(userKey);
    return attempts ? attempts.count : 0;
  }

  private recordFailedAttempt(username: string): void {
    const userKey = username.toLowerCase();
    const now = new Date();

    const currentAttempts = this.failedAttempts.get(userKey);
    const newCount = currentAttempts ? currentAttempts.count + 1 : 1;

    this.failedAttempts.set(userKey, {
      count: newCount,
      lastAttempt: now
    });

    // Add to blacklist if exceeded max attempts
    if (newCount > this.MAX_FAILED_ATTEMPTS) {
      this.addToBlacklist(username);
    }
  }

  private addToBlacklist(username: string): void {
    const userKey = username.toLowerCase();
    this.blacklistedUsers.add(userKey);

    // Store in localStorage for persistence
    this.saveBlacklistToStorage();

    console.warn(`User ${username} has been added to blacklist after ${this.MAX_FAILED_ATTEMPTS + 1} failed attempts`);
  }

  private clearFailedAttempts(username: string): void {
    const userKey = username.toLowerCase();
    this.failedAttempts.delete(userKey);
  }

  private saveBlacklistToStorage(): void {
    try {
      const blacklistArray = Array.from(this.blacklistedUsers);
      localStorage.setItem('user_blacklist', JSON.stringify(blacklistArray));
    } catch (error) {
      console.error('Error saving blacklist to storage:', error);
    }
  }

  private loadBlacklistFromStorage(): void {
    try {
      const stored = localStorage.getItem('user_blacklist');
      if (stored) {
        const blacklistArray = JSON.parse(stored);
        this.blacklistedUsers = new Set(blacklistArray);
      }
    } catch (error) {
      console.error('Error loading blacklist from storage:', error);
    }
  }

  private resetFailedAttemptsTimer(username: string): void {
    const userKey = username.toLowerCase();
    const attempts = this.failedAttempts.get(userKey);

    if (attempts) {
      const timeSinceLastAttempt = Date.now() - attempts.lastAttempt.getTime();
      const resetTime = 15 * 60 * 1000; // 15 minutes

      if (timeSinceLastAttempt > resetTime) {
        this.failedAttempts.delete(userKey);
      }
    }
  }

  // Administrative method to remove user from blacklist
  private removeFromBlacklist(username: string): void {
    const userKey = username.toLowerCase();
    this.blacklistedUsers.delete(userKey);
    this.clearFailedAttempts(username);
    this.saveBlacklistToStorage();
    // User removed from blacklist silently
  }

  // Method to check blacklist status (for debugging)
  private getBlacklistStatus(): { blacklisted: string[], failedAttempts: any } {
    return {
      blacklisted: Array.from(this.blacklistedUsers),
      failedAttempts: Object.fromEntries(this.failedAttempts)
    };
  }

  // Public method for administrative access via browser console
  public adminManageBlacklist(action: 'list' | 'remove' | 'clear', username?: string): any {
    switch (action) {
      case 'list':
        return this.getBlacklistStatus();
      case 'remove':
        if (username) {
          this.removeFromBlacklist(username);
          return `User ${username} removed from blacklist`;
        }
        return 'Username required for remove action';
      case 'clear':
        this.blacklistedUsers.clear();
        this.failedAttempts.clear();
        this.saveBlacklistToStorage();
        return 'Blacklist cleared';
      default:
        return 'Available actions: list, remove, clear';
    }
  }

  login(): void {
    if (this.loginForm.invalid || this.isSubmitting) {
      return;
    }

    const username = this.username.value;

    // Verificar se os serviços estão disponíveis
    if (!this.auth || !this.dialog) {
      console.error('Required services not available');
      return;
    }

    // Check if user is blacklisted
    if (this.isUserBlacklisted(username)) {
      this.dialog.alert('Usuário bloqueado por múltiplas tentativas de login incorretas. Entre em contato com o administrador.');
      return;
    }

    // Reset failed attempts timer
    this.resetFailedAttemptsTimer(username);

    // Check current failed attempts
    const currentFailedAttempts = this.getFailedAttempts(username);
    if (currentFailedAttempts >= this.MAX_FAILED_ATTEMPTS) {
      this.addToBlacklist(username);
      this.dialog.alert('Usuário bloqueado por múltiplas tentativas de login incorretas. Entre em contato com o administrador.');
      return;
    }

    this.isSubmitting = true;

    try {
      this.auth.eliminarSessao();
    } catch (error) {
      console.error('Error clearing session:', error);
    }

    this.auth
      .login(username, this.password.value, this.rememberMe.value)
      .pipe(
        timeout(this.LOGIN_TIMEOUT),
        retry(this.MAX_RETRIES),
        filter(authenticated => !!authenticated), // Ensure we have a truthy value
        takeUntil(this.destroy$),
        finalize(() => {
          this.isSubmitting = false;
        }),
        catchError((error: any) => {
          console.error('Login error:', error);
          this.handleLoginError(error);
          throw error; // Re-throw to trigger error handler
        })
      )
      .subscribe({
        next: () => {
          try {
            // Clear failed attempts on successful login
            this.clearFailedAttempts(username);
            this.handleSuccessfulLogin();
          } catch (error) {
            console.error('Error in login success handler:', error);
            this.showErrorAndLogout('Erro interno do sistema. Tente fazer login novamente.');
          }
        },
        error: (errorRes: HttpErrorResponse) => {
          try {
            // Record failed attempt
            this.recordFailedAttempt(username);

            const remainingAttempts = this.MAX_FAILED_ATTEMPTS - this.getFailedAttempts(username);

            if (remainingAttempts <= 0) {
              this.dialog.alert('Usuário bloqueado por múltiplas tentativas de login incorretas. Entre em contato com o administrador.');
            } else if (remainingAttempts === 1) {
              this.dialog.alert(`Credenciais inválidas. Atenção: você tem apenas mais ${remainingAttempts} tentativa antes de ser bloqueado.`);
            } else {
              this.dialog.alert(`Credenciais inválidas. Você tem ${remainingAttempts} tentativas restantes.`);
            }

            this.handleLoginError(errorRes);
          } catch (error) {
            console.error('Error in login error handler:', error);
            this.dialog.alert('Erro interno do sistema. Tente novamente.');
          }
        },
      });
  }

  private handleSuccessfulLogin(): void {
    try {
      // Verificar se o auth service está disponível
      if (!this.auth) {
        console.error('Auth service not available');
        this.showErrorAndLogout('Erro interno do sistema. Tente novamente.');
        return;
      }

      // Verificar autenticação antes de prosseguir
      if (!this.auth.isAutenticated()) {
        this.showErrorAndLogout('Dados de acesso inválidos');
        return;
      }

      // Obter dados da sessão com verificação de segurança
      let usrs: Usuario | null = null;
      try {
        usrs = this.auth.obterSessao() as Usuario;
      } catch (error) {
        console.error('Error getting session data:', error);
        this.showErrorAndLogout('Erro ao obter dados da sessão. Tente fazer login novamente.');
        return;
      }

      if (usrs == null || usrs.activopa == false) {
        this.showErrorAndLogout('Dados de acesso inválidos');
        return;
      }

      // Verificar expiração de senha apenas se necessário
      if (usrs.priEntrada === '1' && usrs.passwordexperaem) {
        const datati = new Date();
        try {
          const expirationDate = new Date(usrs.passwordexperaem);
          if (datati > expirationDate) {
            this.showErrorAndLogout(`${usrs.nome}, o código introduzido já expirou.\n Clica em esqueci senha para gerar novo código!`);
            return;
          } else {
            this.router.navigateByUrl('/auth/senhasss');
            return;
          }
        } catch (error) {
          console.error('Error parsing password expiration date:', error);
        }
      }

      // Tentar obter dados do usuário com tratamento de erro
      this.auth.user()
        .pipe(
          takeUntil(this.destroy$),
          catchError((error) => {
            console.error('Error getting user data:', error);
            // Continuar mesmo se houver erro ao obter dados do usuário
            return of(null);
          })
        )
        .subscribe((data1) => {
          if (data1) {
            try {
              this.setPermissions(data1);
            } catch (error) {
              console.error('Error setting permissions:', error);
            }
          }
        });

      // **CARREGAR MENU OBRIGATORIAMENTE**
      this.loadUserMenu();
      // Navegar para a página principal e iniciar countdown de logout
      this.router.navigateByUrl('/');
      // Força reload da página para garantir atualização dos componentes
      setTimeout(() => {
        window.location.reload();
      }, 100);
      try {
        this.logoutService.startLogoutCountDown(300000);
      } catch (error) {
        console.error('Error starting logout countdown:', error);
      }

    } catch (error) {
      console.error('Error in handleSuccessfulLogin:', error);
      this.showErrorAndLogout('Erro interno do sistema. Tente fazer login novamente.');
    }
  }

  private handleLoginError(errorRes: HttpErrorResponse | Error): void {
    if (errorRes instanceof HttpErrorResponse && errorRes.status === 422) {
      const form = this.loginForm;
      const errors = errorRes.error.errors;
      Object.keys(errors).forEach(key => {
        form.get(key === 'email' ? 'username' : key)?.setErrors({
          remote: errors[key][0],
        });
      });
    } else if (errorRes instanceof Error && (errorRes.name === 'TimeoutError' || errorRes.message?.includes('timeout'))) {
      this.dialog.alert('Tempo limite excedido. Tente novamente.');
    } else {
      this.dialog.alert('Erro de conexão. Verifique sua internet e tente novamente.');
    }
  }

  private showErrorAndLogout(message: string): void {
    try {
      if (this.dialog) {
        this.dialog.alert(message);
      } else {
        console.error('Dialog service not available:', message);
        alert(message); // Fallback to native alert
      }

      if (this.auth && typeof this.auth.logout === 'function') {
        this.auth.logout()
          .pipe(
            takeUntil(this.destroy$),
            catchError((error: any) => {
              console.error('Error during logout:', error);
              return of(null); // Continue even if logout fails
            })
          )
          .subscribe({
            next: () => {
              // Logout successful or completed
            },
            error: (error: any) => {
              console.error('Logout subscription error:', error);
            }
          });
      } else {
        console.error('Auth service or logout method not available');
        // Force navigation to login page as fallback
        this.router.navigateByUrl('/auth/login');
      }
    } catch (error) {
      console.error('Error in showErrorAndLogout:', error);
      // Emergency fallback
      alert(message);
      window.location.href = '/auth/login';
    }
  }
}

