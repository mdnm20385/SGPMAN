import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError, timer } from 'rxjs';
import {
    catchError,
    debounceTime,
    distinctUntilChanged,
    finalize,
    map,
    retry,
    shareReplay,
    switchMap,
    takeUntil,
    tap,
    timeout
} from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Usuario } from './interface';
import { LoginService } from './login.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthPerformanceService implements OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly tokenService = inject(TokenService);
  private readonly loginService = inject(LoginService);

  // Cache para requisições frequentes
  private userCache$ = new BehaviorSubject<Usuario | null>(null);
  private readonly API_TIMEOUT = 30000; // 30 segundos
  private readonly RETRY_COUNT = 2;
  private readonly DEBOUNCE_TIME = 300; // 300ms

  // Subjects para cleanup
  private readonly destroy$ = new BehaviorSubject<boolean>(false);

  /**
   * Login otimizado com timeout, retry e cache
   */
  optimizedLogin(username: string, password: string, rememberMe = false): Observable<boolean> {
    // Limpa cache anterior
    this.clearCache();

    return this.loginService.login(username, password, rememberMe).pipe(
      timeout(this.API_TIMEOUT),
      retry(this.RETRY_COUNT),
      debounceTime(this.DEBOUNCE_TIME),
      distinctUntilChanged(),
      shareReplay(1), // Cache da resposta
      switchMap((response: any) => {
        if (response.sucesso === false || response.usuario?.activopa === false) {
          return this.handleLoginError(response, username, password);
        }

        return this.handleLoginSuccess(response);
      }),
      catchError((error: HttpErrorResponse | Error) => this.handleHttpError(error)),
      takeUntil(this.destroy$),
      finalize(() => {
        // Login process completed
      })
    );
  }

  /**
   * Valida sessão de forma otimizada
   */
  optimizedSessionCheck(): Observable<boolean> {
    // Verifica cache primeiro
    const cachedUser = this.userCache$.value;
    if (cachedUser && this.isValidSession(cachedUser)) {
      return of(true);
    }

    return this.authService.user().pipe(
      timeout(5000), // Timeout menor para check de sessão
      map((user: any) => {
        if (user && this.isValidSession(user)) {
          this.userCache$.next(user);
          return true;
        }
        return false;
      }),
      catchError(() => of(false)),
      shareReplay(1)
    );
  }

  /**
   * Logout otimizado
   */
  optimizedLogout(): Observable<boolean> {
    this.clearCache();
    this.destroy$.next(true);

    return this.authService.logout().pipe(
      timeout(10000),
      retry(1),
      map(() => true),
      catchError(() => {
        // Se falhar, limpa dados localmente
        this.authService.eliminarSessao();
        return of(true);
      }),
      finalize(() => {
        // Garante limpeza local
        this.authService.eliminarSessao();
        this.authService.eliminarReload();
      })
    );
  }

  /**
   * Obtém dados do usuário com cache
   */
  getCachedUser(): Observable<Usuario | null> {
    const cachedUser = this.userCache$.value;
    if (cachedUser && this.isValidSession(cachedUser)) {
      return of(cachedUser);
    }

    return this.authService.user().pipe(
      timeout(5000),
      tap((user: any) => {
        if (user && this.isValidSession(user)) {
          this.userCache$.next(user);
        }
      }),
      catchError(() => of(null)),
      shareReplay(1)
    );
  }

  /**
   * Refresh token otimizado
   */
  optimizedRefreshToken(): Observable<boolean> {
    return this.tokenService.refresh().pipe(
      timeout(15000),
      retry(1),
      map(() => true),
      catchError(() => {
        // Se refresh falhar, força logout
        this.optimizedLogout().subscribe();
        return of(false);
      }),
      shareReplay(1)
    );
  }

  // Métodos privados de apoio

  private handleLoginSuccess(response: any): Observable<boolean> {
    try {
      // Salva dados da sessão
      this.authService.guardarSessao(response.usuario);
      this.userCache$.next(response.usuario);

      // Inicia timer de logout se necessário
      if (response.usuario) {
        this.startSessionTimer();
      }

      return of(true);
    } catch (error) {
      console.error('Erro ao processar login bem-sucedido:', error);
      return throwError(() => new Error('Erro interno de processamento'));
    }
  }

  private handleLoginError(response: any, username: string, password: string): Observable<boolean> {
    const mensagem = response.usuario?.activopa === false
      ? 'Acesso inibido\r\nContacte o administrador!'
      : response.mensagem;

    // Salva informações de erro para recuperação
    localStorage.setItem('mensagemtoquen', JSON.stringify(mensagem));

    const usuario: Usuario = this.createErrorUser(username, password);
    localStorage.setItem('password', JSON.stringify(usuario));

    // Logout e reload serão feitos no componente
    return throwError(() => new Error(mensagem));
  }

  private handleHttpError(error: HttpErrorResponse | Error): Observable<never> {
    let errorMessage = 'Erro de conexão. Tente novamente.';

    if (error instanceof Error && (error.name === 'TimeoutError' || error.message?.includes('timeout'))) {
      errorMessage = 'Tempo limite excedido. Verifique sua conexão.';
    } else if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        errorMessage = 'Sem conexão com o servidor. Verifique sua internet.';
      } else if (error.status >= 500) {
        errorMessage = 'Erro interno do servidor. Tente novamente em alguns minutos.';
      }
    }

    console.error('Erro no login:', error);
    return throwError(() => new Error(errorMessage));
  }

  private isValidSession(user: any): boolean {
    if (!user) return false;

    // Verifica se usuário está ativo
    if (user.activopa === false) return false;

    // Verifica se password não expirou
    if (user.priEntrada === '1' && user.passwordexperaem) {
      const now = new Date();
      const expiration = new Date(user.passwordexperaem);
      if (now > expiration) return false;
    }

    return true;
  }

  private createErrorUser(username: string, password: string): Usuario {
    return {
      paStamp: '',
      codUsuario: 0,
      nome: '',
      login: username,
      senha: password,
      priEntrada: '',
      activopa: false,
      inseriu: '',
      inseriuDataHora: '',
      alterou: '',
      alterouDataHora: '',
      tipoPerfil: '',
      edaSic: false,
      sexo: '',
      orgao: '',
      direcao: '',
      departamento: '',
      orgaostamp: null,
      departamentostamp: '',
      direcaostamp: '',
      verSitClass: false,
      pathPdf: null,
      tdocAniva: '',
      path1: '',
      passwordexperaem: '',
      email: null,
      medico: false,
      patentetegoria: '',
      usuarioMenu: [],
    };
  }

  private startSessionTimer(): void {
    // Timer para alertar sobre expiração da sessão
    timer(4.5 * 60 * 1000) // 4.5 minutos (antes dos 5 minutos do logout)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        console.warn('Sessão expirará em breve');
        // Aqui poderia mostrar um aviso ao usuário
      });
  }

  private clearCache(): void {
    this.userCache$.next(null);
  }

  // Cleanup ao destruir o serviço
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.clearCache();
  }

  // Métodos de performance monitoring
  getPerformanceMetrics(): any {
    return {
      cacheHits: this.userCache$.value ? 1 : 0,
      apiTimeout: this.API_TIMEOUT,
      retryCount: this.RETRY_COUNT,
      debounceTime: this.DEBOUNCE_TIME
    };
  }
}
