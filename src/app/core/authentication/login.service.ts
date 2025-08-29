import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

import { environment } from '@env/environment';
import { busca } from 'app/classes/busca';
import { EntradaProcesso } from 'app/classes/ClassesSIGEX';
import { LoginModel } from 'app/classes/LoginModel';
import { Resposta } from 'app/classes/Resposta';
import { utilizador } from 'app/classes/utilizador';
import { SecureStorageService } from '../services/secure-storage.service';
import { Token, Usuario } from './interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  protected readonly http = inject(HttpClient);
  private readonly secureStorage = inject(SecureStorageService);

  constructor() {
    // Migra dados existentes para formato seguro na primeira execução
    this.secureStorage.migrateToEncrypted();
  }

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

  CadastrarUsuario(valor: utilizador): Observable<Resposta<utilizador>>{
    return this.http.post<Resposta<utilizador>>(`${this.ApiUrl}Users/Criar`,valor);
    }
 TrocarSenha(usuario: busca) : Observable<Resposta<busca>>{
  return this.http.post<Resposta<busca>>(`${this.ApiUrl}Users/xxxxxx`,usuario);
  }


  refresh(params: Record<string, any>) {
    return this.http.post<Token>(`${this.ApiUrl}auth/refresh`, params);
  }

  logout() {
    this.eliminarTotais();
    this.eliminarentradaStamp();
    this.secureStorage.clearSensitiveData(); // Limpa todos os dados sensíveis
    return this.http.post<any>(`${this.ApiUrl}auth/logout`, {});
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

  mes() {
    // Alias para o método menu() - carrega menu da sessão
    return this.menu();
  }
  me() {
    // Retorna informações do usuário da sessão local
    const usuario = this.obterSessao() as Usuario;

    // Se não há usuário na sessão, retorna erro
    if (!usuario) {
      console.warn('Nenhum usuário encontrado na sessão');
      return of(null);
    }

    // Se usuário inativo, limpa sessão
    if (usuario.activopa === false) {
      console.warn('Usuário inativo detectado');
      this.logout();
      return of(null);
    }

    // Retorna o usuário como Observable
    return of(usuario as any);
  }
 obterSessao() {
    return this.secureStorage.getItem('usuario');
  }

  obterToken() {
    // Verifica múltiplas possibilidades de armazenamento do token
    const token = this.secureStorage.getItem('ng-matero-token') ||
                  this.secureStorage.getItem('token') ||
                  this.secureStorage.getItem('access_token');

    return token as Token | null;
  }
  menu() {
    // Busca o menu do Token em vez do Usuario
    const usuario = this.obterSessao() as Usuario;

    // Se não há usuário, retorna menu vazio
    if (!usuario) {
      console.warn('Nenhum usuário encontrado para carregar menu');
      return of([]);
    }

    if (usuario.activopa === false) {
      console.warn('Usuário inativo - carregando menu vazio');
      this.logout();
      return of([]);
    }

    // Obtem o token que contém o menu
    const token = this.obterToken();
    if (token && token.menuusr) {
      // Loading menu from token silently
      // Se o token tem um menu, converte para o formato Menu[]
      const menuData = token.menuusr as any;

      // Se menuusr é uma string JSON, faz parse
      let menuItems: any = menuData;
      if (typeof menuData === 'string') {
        try {
          menuItems = JSON.parse(menuData);
        } catch (error) {
          console.error('Erro ao parsear menu do token:', error);
          // Continua para carregar do arquivo JSON
        }
      }

      // Se o menu está no formato correto, retorna
      if (Array.isArray(menuItems)) {
        return of(menuItems);
      }

      // Se é um objeto com propriedade menu, extrai
      if (menuItems && menuItems.menu) {
        return of(menuItems.menu);
      }

      // Se menuusr contém string de menus, processa
      if (typeof menuItems === 'object' && menuItems.menu) {
        const menuString = menuItems.menu;
        if (typeof menuString === 'string') {
          // Processa string de menus separados por vírgula
          const menuNames = menuString.split(',');
          // Menu processed from token silently
          return of(menuNames.map((name: string) => ({
            route: name.trim(),
            name: name.trim(),
            type: 'link',
            icon: 'menu'
          })));
        }
      }
    }

    // Se não há menu no token, carrega do arquivo JSON como fallback
    console.warn('Menu não encontrado no token, carregando do arquivo JSON');
    return this.http.get<{ menu: any[] }>('./assets/data/menu.json').pipe(
      map(res => res.menu),
      catchError(error => {
        console.error('Erro ao carregar menu do arquivo JSON:', error);
        return of([]);
      })
    );
  }

  /**
   * Armazena sessão do usuário de forma segura
   */
  armazenarSessao(usuario: Usuario) {
    this.secureStorage.setItem('usuario', usuario);
  }

  /**
   * Armazena token de forma segura
   */
  armazenarToken(token: Token) {
    this.secureStorage.setItem('ng-matero-token', token);
  }

  /**
   * Armazena dados de totais de forma segura
   */
  armazenarTotais(totais: any) {
    this.secureStorage.setItem('Totais', totais);
  }

  /**
   * Armazena entrada stamp de forma segura
   */
  armazenarEntradaStamp(entradaStamp: any) {
    this.secureStorage.setItem('entradaStamp', entradaStamp);
  }

  /**
   * Auditoria de segurança - verificar dados armazenados
   */
  auditarSeguranca() {
    this.secureStorage.auditStorage();
  }

  /**
   * Força migração de dados para formato seguro
   */
  migrarDadosSeguro() {
    this.secureStorage.migrateToEncrypted();
  }
}
