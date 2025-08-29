import { Menu } from '@core/bootstrap/menu.service';
import { Processo } from 'app/classes/ClassesSIGEX';
import { Param } from 'app/classes/Facturacao/Facturacao';
import { get } from 'http';

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
  menuusr?: Menuusr;
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
  passwordexperaem:string;
  email: string | null;
medico: boolean;
patentetegoria: string;
 usuarioMenu: UsuarioMenu[],
}


export interface UsuarioMenu {
    usuarioMenuId: string; // Chave primária
    paStamp: string;
    usuario: Usuario;
    menuStamp: string;
    menu: Menu;
    dataAtribuicao: Date | string;
}
 export interface Menuusr {
    menuusrstamp: string;
    menu: string;
    userstamp: string;
    activo: boolean;
}
export interface Pa {
  paStamp: string ;
  nome: string ;
  sexo: string ;
  numBi: string ;
  naturalidade: string ;
  resProv: string ;
  resDist: string ;
  resPosto: string ;
  resLocal: string ;
  resBairro: string ;
  resQuarteirao: string ;
  resAvenida: string ;
  numCasa: string ;
  conPrinc: string ;
  conAlter: string ;
  ramo: string ;
  orgao: string ;
  unidade: string ;
  subunidade: string ;
  patente: string ;
  catpat: string ;
  inseriu: string ;
  inseriuDataHora: string ;
  alterou: string ;
  alterouDataHora: string ;
  tipodoc: string ;
  activo: boolean ;
  path: string ;
dClinicos: DClinicos;
  processo: Processo[];
  junta: string;
  juntaHom: string;
  scanDoc: ScanDoc[];
  path1: string ;
}
export interface ScanDoc {
    scanStamp: string;
    entradaStamp: string ;
    descricao: string;
    DocPdf : string;
    path1: string;
    dataArquivo: Date ;
    inseriu: string;
    inseriuDataHora: Date;
    alterou: string ;
    alterouDataHora: Date ;
    saidaStamp: string;
    arquivoStamp: string;
    pastamp: string ;
}
// export interface Pa {
//   paStamp: string ;
//   nome: string ;
//   sexo: string ;
//   numBi: string ;
//   naturalidade: string ;
//   resProv: string ;
//   resDist: string;
//   resPosto: string;
//   resLocal: string;
//   resBairro: string;
//   resQuarteirao: string;
//   resAvenida: string;
//   numCasa: string;
//   conPrinc: string;
//   conAlter: string;
//   ramo: string;
//   orgao: string;
//   unidade: string;
//   subunidade: string;
//   patente: string;
//   inseriu: string;
//   inseriuDataHora: string;
//   alterou: string;
//   alterouDataHora: string;
//   tipodoc: string;
//   activo: boolean;
//   profilePhoto: Blob|null;
//   profilePhotos: Blob|null;
//   path: string;
//   processo: Processo[];
//   junta: string;
//   juntaHom: string;
//   catpat:string;
//   dClinicos: DClinicos;
// }


export interface DClinicos {
    paStamp: string;
    dadosAnamense: string;
    examesObjectivos: string;
    examesClinicos: string;
    diaDef: string;
    conclusao: string;
    inseriu: string;
    inseriuDataHora: string;
    alterou: string;
    alterouDataHora: string;
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
