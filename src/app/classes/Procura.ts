

// export interface procura {
//   tabela :string;
//   campo :string;
//   campo1 :string;
//   chave :string;
//   valorprocurado :string;
//  currentNumber :number;
//  pagesize :number;
//  marcar :boolean;
//  professorstamp:string;
//  alunoestamp: string;
//  rhstamp:string;
//  descricao:string;
//  origem:string;
//  referencia: string;
// }

import { Usuario } from '@core';

export interface FirstLogin {
  email: string;
  user: string;
  senha: string;
}

export interface DadosRecuperacao {
  usuario: string;
  senha: string;
  confirmarSenha: string;
}

export interface RecPassword {
  email: string;
  codigo: string;
  tipoperfil: string;
}

export interface Selects {
  chave: string | null;
  descricao: string | null;
  ordem: string | null;
}

export interface Camposeliminar {
  id: string | null;
  tabela: string | null;
  nomecampochave: string | null;
}

export interface Condicoesprocura {
  tabela: string | null;
  campo1: string | null;
  campo2: string | null;
  condicao: string | null;
}

export interface Procura {
  tabela: string | null;
  campo: string | null;
  campo1: string | null;
  camposseleccionados: string | null;
  valorprocurado: string | null;
  currentNumber: number;
  pagesize: number;
  marcar: boolean;
  condicoes: string;
  alunoestamp: string;
  rhstamp: string;
  descricao: string;
  origem: string;
  referencia: string;
  usuario:Usuario;



}


export interface selects  {
  chave:string,
  descricao :string,
  ordem :string,
}
export interface Mdnviewgrelha {
  mdnview: (Mdnview | null)[];
}

export interface Mdnview {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  col6: string;
  col7: string;
  col8: string;
  col9: string;
  col10: string;
  col11: string;
  col12: string;
  col13: string;
  col14: string;
  col15: string;
  col16: string;
  col17: string;
  col18: string;
  col19: string;
  col20: string;
  col21: string;
  col22: string;
  col23: string;
  col24: string;
  col25: string;
  col26: string;
  col27: string;
  col28: string;
  col29: string;
  col30: string;
  col31: string;
  col32: string;
  col33: string;
  col34: string;
  col35: string;
  col36: string;
  col37: string;
  col38: string;
  col39: string;
  col40: string;
  col41: string;
  col42: string;
  col43: string;
  col44: string;
  col45: string;
  col46: string;
  col47: string;
  col48: string;
  col49: string;
  col50: string;
  col51: string;
  chave: string | null;
  descricao: string | null;
  ordem: string | null;
  query: string | null;
  tabela: string | null;
}

export interface Filepdf {
  filename: string | null;
}

export interface Selectview {
  selects: (Selects | null)[];
}

export interface PaginationResponseBl<T> {
  totalCount: number;
  pageSize: number;
  currentPageNumber: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  data: T;
  status: boolean;
  msg: string;
  professorstamp: string;
  alunoestamp: string;
  rhstamp: string;
}

export interface PaginationResponse<T> {
  totalCount: number;
  pageSize: number;
  currentPageNumber: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  data: T;
}
