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
    try {
      return this.hasAccessToken() && !this.isExpired();
    } catch (error) {
      console.error('Error checking token validity:', error);
      return false;
    }
  }

  getBearerToken(): string {
    try {
      return this.access_token
        ? [capitalize(this.token_type), this.access_token].join(' ').trim()
        : '';
    } catch (error) {
      console.error('Error getting bearer token:', error);
      return '';
    }
  }

  needRefresh(): boolean {
    try {
      return this.exp !== undefined && this.exp >= 0;
    } catch (error) {
      console.error('Error checking if token needs refresh:', error);
      return false;
    }
  }

  getRefreshTime(): number {
    try {
      return timeLeft((this.exp ?? 0) - 5);
    } catch (error) {
      console.error('Error getting refresh time:', error);
      return 0;
    }
  }

  private hasAccessToken(): boolean {
    try {
      return !!this.access_token;
    } catch (error) {
      console.error('Error checking access token:', error);
      return false;
    }
  }

  private isExpired(): boolean {
    try {
      return this.exp !== undefined && this.exp - currentTimestamp() <= 0;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true; // Assumir expirado em caso de erro
    }
  }
}

export class SimpleToken extends BaseToken {}

export class JwtToken extends SimpleToken {
  private _payload?: { exp?: number | void };

  static is(accessToken: string): boolean {
    try {
      if (!accessToken || typeof accessToken !== 'string') {
        return false;
      }

      const parts = accessToken.split('.');
      if (parts.length !== 3) {
        return false;
      }

      const [_header] = parts;
      if (!_header) {
        return false;
      }

      const header = JSON.parse(base64.decode(_header));

      return header && header.typ && header.typ.toUpperCase().includes('JWT');
    } catch (e) {
      console.error('Error checking if token is JWT:', e);
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

      // Verificar e criar objeto user se não existir
      if (!data.user) {

        data.user = {};
      }
      // Verificar se attributes.usuario existe antes de acessar suas propriedades
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
