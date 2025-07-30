import { Injectable, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, Subject, Subscription, share, timer } from 'rxjs';

import { LocalStorageService } from '@shared';
import { currentTimestamp, filterObject } from './helpers';
import { Token } from './interface';
import { BaseToken, SimpleToken } from './token';
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
    if (!this._token) {
      this._token = this.factory.create(this.store.get(this.key));
    }
    return this._token;
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
    return this.token?.valid() ?? false;
  }

  getBearerToken() {
    return this.token?.getBearerToken() ?? '';
  }

  getRefreshToken() {
    return this.token?.refresh_token;
  }

  ngOnDestroy(): void {
    this.clearRefresh();
  }

  public save(token?: Token) {
    this._token = undefined;
    if (!token) {
      this.store.remove(this.key);
    } else {
      const value = Object.assign({ access_token: '', token_type: 'Bearer' }, token, {
        exp: token.expires_in ? currentTimestamp() + token.expires_in : null,
      },);
      this.store.set(this.key, filterObject(value));
    }

    this.change$.next(this.token);
    this.buildRefresh();
  }

  public buildRefresh() {
    this.clearRefresh();

    if (this.token?.needRefresh()) {
      this.timer$ = timer(this.token.getRefreshTime() * 1000).subscribe(() => {
        this.refresh$.next(this.token);
      });
    }
  }

  public clearRefresh() {
    if (this.timer$ && !this.timer$.closed) {
      this.timer$.unsubscribe();
    }
  }
}
