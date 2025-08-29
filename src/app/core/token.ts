import { base64, capitalize, currentTimestamp, timeLeft } from './helpers';
import { Token } from './interface';

export abstract class BaseToken {
  constructor(protected attributes: Token) {}
  get access_token(): string {
    return this.attributes.access_token;
  }
  get refresh_token(): string | void {
    return this.attributes.refresh_token;
  }
  get token_type(): string {
    return this.attributes.token_type ?? 'bearer';
  }
  get exp(): number | void {
    return this.attributes.exp;
  }
  valid(): boolean {
    return this.hasAccessToken() && !this.isExpired();
  }
  getBearerToken(): string {
    return this.access_token
      ? [capitalize(this.token_type), this.access_token].join(' ').trim()
      : '';
  }

  needRefresh(): boolean {
    return this.exp !== undefined && this.exp >= 0;
  }

  getRefreshTime(): number {
    return timeLeft((this.exp ?? 0) - 5);
  }

  private hasAccessToken(): boolean {
    return !!this.access_token;
  }

  private isExpired(): boolean {
    return this.exp !== undefined && this.exp - currentTimestamp() <= 0;
  }
}

export class SimpleToken extends BaseToken {}

export class JwtToken extends SimpleToken {
  private _payload?: { exp?: number | void };

  static is(accessToken: string): boolean {
    try {
      const [_header] = accessToken.split('.');
      const header = JSON.parse(base64.decode(_header));

      return header.typ.toUpperCase().includes('JWT');
    } catch (e) {
      return false;
    }
  }

  get exp(): number | void {
    return this.payload?.exp;
  }

  public get payload(): { exp?: number | void } {
    if (!this.access_token) {
      return {};
    }

    if (this._payload) {
      return this._payload;
    }

    try {
      const [, payload] = this.access_token.split('.');

      if (!payload) {
        console.error('Token payload is empty');
        return {};
      }

      const data = JSON.parse(base64.decode(payload));

      if (!data.exp) {
        data.exp = this.attributes.exp;
      }

      // ✅ CORREÇÃO: Verificar e criar objeto user se não existir
      if (!data.user) {
        data.user = {};
      }

      // ✅ CORREÇÃO: Verificar se attributes.usuario existe
      if (this.attributes.usuario) {
        data.user.username = this.attributes.usuario.login || '';
        data.user.name = this.attributes.usuario.nome || '';
        data.user.email = this.attributes.usuario.email || `${this.attributes.usuario.login}@gmail.com`;
      } else {
        // Valores padrão caso usuario não exista
        data.user.username = '';
        data.user.name = '';
        data.user.email = '';
      }

      return (this._payload = data);
    } catch (error) {
      console.error('Error parsing token payload:', error);
      return {};
    }
  }
}
