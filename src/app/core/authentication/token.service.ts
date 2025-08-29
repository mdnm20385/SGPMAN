import { Injectable, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, Subject, Subscription, share, timer } from 'rxjs';

import { LocalStorageService } from '@shared';
import { currentTimestamp, filterObject } from './helpers';
import { Token } from './interface';
import { BaseToken } from './token';
import { TokenFactory } from './token-factory.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService implements OnDestroy {
  public readonly key = 'ng-matero-token';



  public readonly store = inject(LocalStorageService);
  public readonly factory = inject(TokenFactory);

  public readonly change$ = new BehaviorSubject<BaseToken | undefined>(undefined);
  public readonly refresh$ = new Subject<BaseToken | undefined>();

  public timer$?: Subscription;

  public _token?: BaseToken;

  public get token(): BaseToken | undefined {
    try {
      if (!this._token) {
        const storedToken = this.store.get(this.key);
        if (storedToken) {
          this._token = this.factory.create(storedToken);
        }
      }
      return this._token;
    } catch (error) {
      console.error('Error getting token:', error);
      return undefined;
    }
  }



  change() {

    return this.change$.pipe(share());
  }

  refresh() {
    this.buildRefresh();

    return this.refresh$.pipe(share());
  }

  set(token?: Token) {
    this.save(token);
    return this;
  }

  clear() {
    this.save();
  }

  valid() {
    try {
      return this.token?.valid() ?? false;
    } catch (error) {
      console.error('Error checking token validity:', error);
      return false;
    }
  }

  getBearerToken() {
    try {
      return this.token?.getBearerToken() ?? '';
    } catch (error) {
      console.error('Error getting bearer token:', error);
      return '';
    }
  }

  getRefreshToken() {
    try {
      return this.token?.refresh_token;
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return undefined;
    }
  }

  ngOnDestroy(): void {
    this.clearRefresh();
  }

  public save(token?: Token) {
    try {
      this._token = undefined;

      if (!token) {
        this.store.remove(this.key);
      } else {
        // Verificar se token tem as propriedades necessárias
        const safeToken = {
          access_token: token.access_token || '',
          token_type: token.token_type || 'Bearer',
          expires_in: token.expires_in,
          refresh_token: token.refresh_token,
          usuario: token.usuario // Preservar dados do usuário
        };

        const value = Object.assign(
          { access_token: '', token_type: 'Bearer' },
          safeToken,
          {
            exp: safeToken.expires_in ? currentTimestamp() + safeToken.expires_in : null,
          }
        );

        this.store.set(this.key, filterObject(value));
      }

      this.change$.next(this.token);
      this.buildRefresh();
    } catch (error) {
      console.error('Error saving token:', error);
      // Em caso de erro, limpar token
      this._token = undefined;
      this.store.remove(this.key);
      this.change$.next(undefined);
    }
  }

  public buildRefresh() {
    try {
      this.clearRefresh();

      if (this.token?.needRefresh()) {
        const refreshTime = this.token.getRefreshTime();
        if (refreshTime > 0) {
          this.timer$ = timer(refreshTime * 1000).subscribe(() => {
            this.refresh$.next(this.token);
          });
        }
      }
    } catch (error) {
      console.error('Error building refresh timer:', error);
      this.clearRefresh();
    }
  }

  public clearRefresh() {
    try {
      if (this.timer$ && !this.timer$.closed) {
        this.timer$.unsubscribe();
      }
    } catch (error) {
      console.error('Error clearing refresh timer:', error);
    }
  }
}
