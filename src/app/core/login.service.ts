import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Menu } from '@core';
import { environment } from '@env/environment';
import { busca } from 'app/classes/busca';
import { EntradaProcesso } from 'app/classes/ClassesSIGEX';
import { LoginModel } from 'app/classes/LoginModel';
import { Resposta } from 'app/classes/Resposta';
import { utilizador } from 'app/classes/utilizador';
import { Token, User } from './interface';
import { SecureStorageService } from './services/secure-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  protected readonly http = inject(HttpClient);
  private readonly secureStorage = inject(SecureStorageService);

  constructor() { }

  private ApiUrl = `${environment.Apiurl}`;
  login(username: string, password: string, rememberMe = false){
    const usuario:LoginModel={
      Login: username,
      PasswordHash: password
    };
    const trtrt=this.http.post<Token>(`${this.ApiUrl}Users/IniciarSessao1`, usuario);
    return trtrt;
  }
  InserirEntradas(valor: EntradaProcesso): Observable<Resposta<EntradaProcesso>>{
  return this.http.post<Resposta<EntradaProcesso>>(`${this.ApiUrl}EntradaProcesso/InserirEntradas`,valor);
  }
  // login(username: string, password: string, rememberMe = false) {
  //   return this.http.post<Token>('/auth/login', { username, password, rememberMe });
  // }
  CadastrarUsuario(valor: utilizador): Observable<Resposta<utilizador>>{
    return this.http.post<Resposta<utilizador>>(`${this.ApiUrl}Users/Criar`,valor);
    }
 TrocarSenha(usuario: busca) : Observable<Resposta<busca>>{
  return this.http.post<Resposta<busca>>(`${this.ApiUrl}Users/xxxxxx`,usuario);
  }


  refresh(params: Record<string, any>) {
    return this.http.post<Token>('/auth/refresh', params);
  }

  logout() {
    this.eliminarTotais();
    this.eliminarentradaStamp();
    return this.http.post<any>('/auth/logout', {});
  }

  isAutenticated() {
    return this.secureStorage.hasItem('usuario');
  }
  isAutenticatedentradaStamp() {
    return this.secureStorage.hasItem('entradaStamp');
  }

  isAutenticatedTotais() {
    return this.secureStorage.hasItem('Totais');
  }

  eliminarSessao() {
    this.secureStorage.removeItem('usuario');
  }
  eliminarentradaStamp() {
    this.secureStorage.removeItem('entradaStamp');
  }
  eliminarTotais() {
    this.secureStorage.removeItem('Totais');
  }
  me() {

this.http.get<{ menu: Menu[] }>('/me/menu').pipe(map(res => res.menu))
.pipe()
.subscribe({
  next: () => {

    //this.router.navigateByUrl('/');
  },

});
    return this.http.get<User>('/me');
  }

  menu() {
    return this.http.get<{ menu: Menu[] }>('/me/menu').pipe(map(res => res.menu));
  }
}
