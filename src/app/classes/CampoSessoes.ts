

export interface CampoSessoes  {


     usrstamp:string,
     Login :string,
     Nome:string,
     Email :string,
     retorno:boolean,
     tipo: number;
     totalprofesso: number;
     totalalunos: number;
     totalRh: number;
     totalcurso: number;
     totalturmas: number;




}


export interface dmzview
{
     chave :string;
     descricao :string;
     ordem :string;
     query :string;
     tabela :string;
  col1 :string;
  col2 :string;
  col3 :string;
  col4 :string;
  col5 :string;
  col6 :string;
  col7 :string;
  col8 :string;
  col9 :string;
  col10 :string;
  col11 :string;
  col12 :string;
  col13 :string;

  col14 :string;
  col15 :string;

  col16 :string;

  col17 :string;

  col18 :string;

  col19 :string;
  col20 :string;
  col21 :string;
  col22 :string;
  col23 :string;
  col24 :string;
  col25 :string;
  col26 :string;
  col27 :string;
  col28 :string;
  col29 :string;
  col30 :string;
  col31 :string;
  col32 :string;
  col33 :string;
  col34 :string;
  col35 :string;
  col36 :string;
  col37 :string;
  col38 :string;
  col39 :string;
  col40 :string;
  col41 :string;
  col42 :string;
  col43 :string;
  col44 :string;
  col45 :string;
  col46 :string;
  col47 :string;
  col48 :string;
  col49 :string;
  col50 :string;
  col51 :string;
}
export interface dmzviewgrelha{
       dmzview:dmzview[];
}
export interface selects  {
     chave:string,
     descricao :string,
     ordem :string,
}
export interface selectsprocura  {
       amount: number;
     chave:string,
     descricao :string,
     ordem :string,
     stamplocal :string,
     stampsexcepcao :string,
     color :string,
     title:string,
     progress:progress
}

export interface progress  {
  value:number
}

export interface selectview  {
     selects:selects[]
}

export interface condicoesprocura  {
     tabela:string
      campo1: string
      campo2:string
       condicao:string
       campochave:string|null
}
export interface gradelviwob  {

     dados
:gradelviw[]
}
export interface  gradelviw
{
    gradelstamp:string;
    gradestamp:string;
    codetapa :string;//
    etapa :string;//Ordem etapa
    coddisc:string;
    displina :string;
    ststamp:string;//representa o stamp da disciplina
    semstamp:string;//Stamp do semestre
    categoria :string;
    opcao :boolean;
    credac:number;//Credito Academico
  cargahtotal:number;//Somatorio de teorica e pratica
   cargahteorica:number;//Carga Horaria contacto
  cargahpratica:number;//Carga Horaria de estudo
  prec :boolean;//Indica se a disciplina tem precedencia
}
export interface  cllingview
{
    cllingstamp:string;
    lingua :string;
    fala:string;
    leitura:string;
    escrita:string;
    compreecao:string;
    materna :boolean;
    clstamp:string;
}
export interface contacorrente
{ total:number;
     contacorrentelistas
:contacorrentelista[];
}
export interface  contacorrentelista
{
     descricao:string;
     valorreg :string;
     ccstamp :string;
     data :string;
     dataven:string;
      referencia :string;
      numero:string;
      entidadebanc:string;
}







