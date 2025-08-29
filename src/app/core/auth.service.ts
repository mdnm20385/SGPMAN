import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { busca } from 'app/classes/busca';
import { CampoSessoes, condicoesprocura, selectsprocura, selectview } from 'app/classes/CampoSessoes';
import { EntradaProcesso, SaidaProcesso, Unidade } from 'app/classes/ClassesSIGEX';
import { LoginModel } from 'app/classes/LoginModel';
import { Filepdf, RecPassword, Selects } from 'app/classes/Procura';
import { Objecto, Resposta } from 'app/classes/Resposta';
import { BehaviorSubject, Observable, catchError, delay, iif, map, merge, of, share, switchMap, tap } from 'rxjs';
import { filterObject, isEmptyObject } from './helpers';
import { EmailRec, Token, Trabalho, User, Usuario } from './interface';
import { LoginService } from './login.service';
import { SecureStorageService } from './services/secure-storage.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginService = inject(LoginService);
  private readonly tokenService = inject(TokenService);
  private readonly secureStorage = inject(SecureStorageService);
  private usuarioAutenticado: boolean = false;
  private ApiUrl = `${environment.Apiurl}`;
  usr !: Usuario;
  protected readonly http = inject(HttpClient);
  Fazerlogin(username: string, password: string, rememberMe = false){
    const usuario:LoginModel={
      Login: username,
      PasswordHash: password
    };
    return this.http.post<Resposta<CampoSessoes>>(`${this.ApiUrl}Users/IniciarSessao`, usuario);
    }
    getBrowserLanguage(): string {
      return navigator.language || (navigator as any).userLanguage;
    }

    GetTotais2(item:Usuario): Observable<selectsprocura[]>{
      return this.http.post<selectsprocura[]>(`${this.ApiUrl}Proc2/GetTotais`,item );
      }


    SalvarMenu(item:any): Observable<any>{
      return this.http.post<any>(`${this.ApiUrl}Menu/Salvar`,item );
      }

      GetRelar1(item:Trabalho): Observable<Resposta<Filepdf>>{
        return this.http.post<Resposta<Filepdf>>(`${this.ApiUrl}Report/RelatorioPri`,item );
        }

      Stamp(origem:string='MDN'):string{

        delay(1000);
      const moment = new Date();
      // Year gets 1999.
      const year = moment.getUTCFullYear();
      // Month gets 1 (January).
      const month = moment.getMonth();
      // Day gets 13.
      const day = moment.getDay();
      // Hour gets 3.
      const hour = moment.getHours();
      // Minute gets 57.
      const minute = moment.getMinutes();
      // Second gets 32.
      const second = moment.getSeconds();
      // Millisecond gets 11.
      const milliseconds = moment.getMilliseconds();
      const stamp = milliseconds + 'D' + year + month + origem + day + hour + minute + second;
      return stamp;

     }

     ConvertDate(Data: Date){
      const tttttt = formatDate(Data, 'yyyy-MM-dd', 'en-US');
      return tttttt;
    }

  private user$ = new BehaviorSubject<User>({});
  private change$ = merge(
    this.tokenService.change(),
    this.tokenService.refresh().pipe(switchMap(() => this.refresh()))
  ).pipe(
    switchMap(() => this.assignUser()),
    share()
  );

  init() {
      return new Promise<void>(resolve => this.change$.subscribe(() => resolve()));
  }

  change() {
    return this.change$;
  }

  check() {
    //
    return this.tokenService.valid();
  }
   check1() {
    //
    return this.tokenService.valid();
  }
  loginNovo(username: string, password: string, rememberMe = false) {
    const usuario:LoginModel={
      Login: username,
      PasswordHash: password
    };
    const trtrt=this.http.post<Token>(`${this.ApiUrl}Users/IniciarSessao1`, usuario);
    return trtrt;
  }



  guardarSessao(DadosTemp?: Usuario) {
    localStorage.setItem('usuario', JSON.stringify(DadosTemp));
  }


  guardartotais(DadosTemp?: selectsprocura[]) {
    localStorage.setItem('Totais', JSON.stringify(DadosTemp));
  }
  obterTotais() {
    const dataGuardar = localStorage.getItem('Totais');
    const utilizador = JSON.parse(dataGuardar!);
    return utilizador;
  }



  isAutenticatedTotais() {
    if (localStorage.getItem('Totais') === null) {
      return false;
    }
    else{
      return true;
    }
  }


  guardarentrdastamp(entradaStamp?: string) {
    localStorage.setItem('entradaStamp', JSON.stringify(entradaStamp));
  }
  obterentradaStamp() {
    const dataGuardar = localStorage.getItem('entradaStamp');
    const utilizador = JSON.parse(dataGuardar!);
    return utilizador;
  }

  isAutenticatedentradaStamp() {
    return this.secureStorage.hasItem('entradaStamp');
  }
  obterSessao() {
    return this.secureStorage.getItem('usuario');
  }

selects!:selectsprocura[];

  obterselectprocura() {
    //this.eliminarSessao();
    const users=this.obterSessao() as Usuario;
     this.GetTotais2(users)
       .subscribe( (res)=>
      {
        this.guardartotais(res);
        return res;
      });
      const dataGuardar = localStorage.getItem('Totais');
      const utilizador = JSON.parse(dataGuardar!) as selectsprocura[];
      return utilizador;
  }

  eliminarSessao() {
    localStorage.removeItem('usuario');
  }

  eliminarentradaStamp() {
    this.secureStorage.removeItem('entradaStamp');
  }
  eliminarTotais() {
    this.secureStorage.removeItem('Totais');
  }

  isAutenticated() {
    return this.secureStorage.hasItem('usuario');
  }
  createObservable(): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      // Emit values
      subscriber.next(false);

      // Complete the observable
      subscriber.complete();

      // Cleanup logic (optional)
      return () => {};
    });
  }
  private readonly router = inject(Router);
  private readonly dialog = inject(MtxDialog);
  constructor(private dialodg: MtxDialog) {}


  mensagemtoquen() {
    return (localStorage.getItem('mensagemtoquen')) !== null ? true : false;
  }
  obtermensagemtoquen() {
    const dataGuardar = localStorage.getItem('mensagemtoquen');
    const utilizador = JSON.parse(dataGuardar!);
    return utilizador;
  }
  obterpassword() {
    const dataGuardar = localStorage.getItem('password');
    const utilizador = JSON.parse(dataGuardar!);
    return utilizador;
  }

  login(username: string, password: string, rememberMe = false) {
    this.eliminarSessao();
    this.eliminarReload();
    const usrs=this.loginService.login(username, password, rememberMe).pipe(
      tap(token => {


        if(token.sucesso===false || token.usuario?.activopa===false)
          {
            if(token.usuario?.activopa===false){
              token.mensagem=`Acesso inibido\nContacte o administrador!`;
            }
             this.logout().subscribe(() => {
                    localStorage.setItem('mensagemtoquen', JSON.stringify(token.mensagem));
                    const usuario:Usuario={
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
                      passwordexperaem: null,
                      email: null
                    };
                    localStorage.setItem('password', JSON.stringify(usuario));
                    window.location.reload();
            });
            return;
        }
        this.tokenService.set(token);
        const user=token.usuario;
        this.guardarSessao(user);
      }),

      map(() => this.check())

    );


    return usrs;
  }

  InserirEntradas(valor: EntradaProcesso): Observable<Resposta<EntradaProcesso>>{
    return this.http.post<Resposta<EntradaProcesso>>(`${this.ApiUrl}EntradaProcesso/InserirEntradas`,valor);
    }

    InserirAlterarObjecto(valor: Objecto): Observable<Resposta<Unidade>>{
    return this.http.post<Resposta<Unidade>>(`${this.ApiUrl}Save/InserirAlterarObjectos`,valor);
    }

    
    SqlCmd(valor: Selects): Observable<Resposta<Selects>>{
      return this.http.post<Resposta<Selects>>(`${this.ApiUrl}EntradaProcesso/SqlCmd`,valor);
      }
      InserirArquivo(valor: any): Observable<Resposta<any>>{
        return this.http.post<Resposta<any>>(`${this.ApiUrl}Arquivo/InserirObjecto`,valor);
        }
    InserirSaida(valor: SaidaProcesso): Observable<Resposta<SaidaProcesso>>{
      return this.http.post<Resposta<SaidaProcesso>>(`${this.ApiUrl}SaidaProcesso/InserirSaidas`,valor);
      }
      InserirUser(valor: Usuario): Observable<Resposta<Usuario>>{
        return this.http.post<Resposta<Usuario>>(`${this.ApiUrl}SaidaProcesso/InserirUsuario`,valor);
        }

getUser(){

}
getselectionPost(sele:condicoesprocura): Observable<selectview>{
  return this.http.post<selectview>(`${this.ApiUrl}Proc2/ComboboxesPost`,sele);
  }

  TrocarSenha(usuarios: busca) : Observable<Resposta<Usuario>>{
    return this.http.post<Resposta<Usuario>>(`${this.ApiUrl}Users/xxxxxx`,usuarios);
    }
    PasseRecover(usuarios: EmailRec) : Observable<Resposta<RecPassword>>{
      return this.http.post<Resposta<RecPassword>>(`${this.ApiUrl}Email/PasseRecover`,usuarios);
      }
  refresh() {
    return this.loginService
      .refresh(filterObject({ refresh_token: this.tokenService.getRefreshToken()}))
      .pipe(
        catchError(() => of(undefined)),
        tap(token => this.tokenService.set(token)),
        map(() => this.check())
      );
  }
removepassword(){
  if(this.mensagemtoquen()===true){
    localStorage.removeItem('mensagemtoquen');
    localStorage.removeItem('password');
  }
}
  logout() {
  this.removepassword();
    return this.loginService.logout().pipe(
      tap(() => this.tokenService.clear()),
      map(() => !this.check())
    );
  }

  user() {

if(this.isAutenticated()===false){
  this.logout();
  const usrgs=this.user$.pipe(share());
  usrgs.subscribe((data)=>{
   data.name='Invalido';
   data.email='Invalido@gmail.com';
   data.id='0';
    });
  return usrgs;
}

const usrg=this.user$.pipe(share());




//     usrg.subscribe((data)=>{
// data.name='';
//     });


    return usrg;
  }

  menu() {
    return iif(() => this.check(), this.loginService.menu(), of([]));
  }


  private assignUser() {

    if (!this.check()) {

      return of({}).pipe(tap(user => this.user$.next(user)));
    }
    if (!isEmptyObject(this.user$.getValue())) {
      //
      return of(this.user$.getValue());
    }


    const sssss=this.loginService.me().pipe(tap(user => this.user$.next(user)));

    return sssss;
  }

  isAutenticareload() {
    return (localStorage.getItem('reload')) !== null ? true : false;
  }
  obterreload() {
    const dataGuardar = localStorage.getItem('reload');
    const utilizador = JSON.parse(dataGuardar!);
    return utilizador;
  }
  eliminarReload() {
    localStorage.removeItem('reload');
  }
}
