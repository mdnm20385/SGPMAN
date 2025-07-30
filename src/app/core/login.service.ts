import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, filter, map } from 'rxjs';

import { AuthService, Menu } from '@core';
import { Token, User } from './interface';
import { environment } from '@env/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginModel } from 'app/classes/LoginModel';
import { Resposta } from 'app/classes/Resposta';
import { utilizador } from 'app/classes/utilizador';
import { busca } from 'app/classes/busca';
import { EntradaProcesso } from 'app/classes/ClassesSIGEX';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  protected readonly http = inject(HttpClient);

  constructor(
      ) { }

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
    return (localStorage.getItem('usuario')) !== null ? true : false;
  }
  isAutenticatedentradaStamp() {
    return (localStorage.getItem('entradaStamp')) !== null ? true : false;
  }

  isAutenticatedTotais() {
    return (localStorage.getItem('Totais')) !== null ? true : false;
  }

  eliminarSessao() {
    localStorage.removeItem('usuario');
  } eliminarentradaStamp() {
    localStorage.removeItem('entradaStamp');
  }
  eliminarTotais() {
    localStorage.removeItem('Totais');
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
