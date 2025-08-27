import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export enum STATUS {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private readonly router = inject(Router);
  private readonly toast = inject(ToastrService);

  private readonly errorPages = [STATUS.FORBIDDEN, STATUS.NOT_FOUND, STATUS.INTERNAL_SERVER_ERROR];

  private getMessage = (error: HttpErrorResponse) => {
    if (error.error?.message) {
      return error.error.message;
    }
    if (error.error?.msg) {
      return error.error.msg;
    }
    return `${error.status} ${error.statusText}`;
  };

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return next
      .handle(request)
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }
  private handleError(error: HttpErrorResponse) {
    if (this.errorPages.includes(error.status)) {
      this.router.navigateByUrl(`/${error.status}`, {
        skipLocationChange: true,
      });
    } else {
      console.error('ERROR', error);      // Verifica se é erro relacionado ao token
      if (error.url && (error.url.includes('/me') || error.url.includes('/auth'))) {
        console.warn('Erro de autenticação detectado:', error.message);

        // Se for erro 401 em endpoints de autenticação, não mostra toast
        if (error.status === STATUS.UNAUTHORIZED) {
          this.router.navigateByUrl('/auth/login');
          return throwError(() => error);
        }
      }

      // Para outros erros, mostra o toast
      if (error.status !== STATUS.UNAUTHORIZED) {
        this.toast.error(this.getMessage(error));
      }

      if (error.status === STATUS.UNAUTHORIZED) {
        // Limpa dados de autenticação antes de redirecionar
        localStorage.removeItem('usuario');
        localStorage.removeItem('ng-matero-token');
        localStorage.removeItem('token');
        localStorage.removeItem('access_token');
        this.router.navigateByUrl('/auth/login');
      }
    }

    return throwError(() => error);
  }
}
