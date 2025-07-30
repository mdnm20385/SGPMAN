import { Injectable } from '@angular/core';
import { Token } from './interface';
import { SimpleToken, JwtToken, BaseToken } from './token';

@Injectable({
  providedIn: 'root',
})
export class TokenFactory {
  create(attributes: Token): BaseToken | undefined {
    if (!attributes.access_token) {
      return undefined;
    }



    if (JwtToken.is(attributes.access_token)) {

const jwt=new JwtToken(attributes);
      return jwt;
    }

    return new SimpleToken(attributes);
  }
}
