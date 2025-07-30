export interface Resposta <T>{
  dados:T;
mensagem:string;
sucesso:boolean
}
export interface Objecto{
  dados:any;
tabela:string;
sucesso:boolean;
condicao:string;
}
