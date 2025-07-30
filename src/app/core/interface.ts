import { Pa } from './authentication';

export interface User {
  [prop: string]: any;

  id?: number | string | null;
  name?: string| null;
  email?: string| null;
  avatar?: string| null;
  roles?: any[];
  permissions?: any[];
}

export interface Token {
  [prop: string]: any;
  access_token: string;
  token_type?: string;
  expires_in?: number;
  exp?: number;
  refresh_token?: string;
  usuario?:Usuario
  mensagem?: string;
  sucesso?: boolean;
}
export interface EmailRec {
  email: string;
  codigo: string;
}
export interface Trabalho
{
    trabalhostamp:string;
    turmalstamp:string;
    ststamp:string;
    clstamp:string;
    status:string;
    data:Date;
    path:string;
    path1:string;
    usuario:Usuario;
   numTabela:string;
    descricao:string;
    pa:Pa;
  }
export interface Usuario {
  paStamp: string | null;
  codUsuario: number;
  nome: string | null;
  login: string | null;
  senha: string | null;
  priEntrada: string | null;
  activopa: boolean;
  inseriu: string | null;
  inseriuDataHora: string | null;
  alterou: string | null;
  alterouDataHora: string | null;
  tipoPerfil: string | null;
  edaSic: boolean;
  sexo: string ;
  orgao: string ;
  direcao: string ;
  departamento: string ;
  orgaostamp: string | null;
  departamentostamp: string ;
  direcaostamp: string ;
  verSitClass: boolean;
  pathPdf: string | null;
  tdocAniva : string ;
  path1: string;
  passwordexperaem:string| null;
  email: string | null;

}
export interface CamposRetornadosSessao {
  direcaoDestinoProcura: string;
  paStamp: string;
  edaSic: boolean;
  sexo: string ;
  orgao: string ;
  direcao: string ;
  departamento: string ;
  orgaostamp: string |null;
  departamentostamp: string ;
  direcaostamp: string ;
  verSitClass: boolean;
    departamentoEntradaProcura: string ;
   departamentoProcessoProcura: string ;
    departamentoSaidaProcura : string ;
    subUnidadeStamprr: string ;
    nomecampo : string ;
    valorCampo: string ;
     sicDoUtilizador : string ;
    unidadeStamprr : string ;
    direcaoEntradaProcura : string ;
    direcaoProcessoProcura: string ;
     orgaoEntradaProcura : string ;
     orgaoProcessoProcura: string ;
     orgaoStampDest : string ;
    orgaoStamprr: string |null;


}
export interface modalSenha {
  usuario:string,
  senha:string,
  confirmarSenha: string,

}

export interface FirstLogin{
  email:string,
  user:string,
  senha:string,
}
