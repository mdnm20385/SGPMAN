import { Pa } from '@core';



export interface EntradaProcesso {
    entradaStamp: string;
    conselhoColectivos: string;
    conselhoCoodenador: boolean;
    conselhoDefesaNaciona: boolean;
    conselhoTecnicoGeral: boolean;
    consultivo: boolean;
    conselhoDireccao: boolean;
    numeroEntrada: number;
    docPdf: string;
    remetente: string;
    orgaoProcedencia: string;
    direcProcedencia: string;
    depProcedencia: string;
    dataEntrada: Date | string;
    inseriu: string | null;
    inseriuDataHora: Date | string;
    alterou: string | null;
    alterouDataHora: Date | string | null;
    recebido: boolean | null;
    tipoDoc: string;
    direcaoOrigem: string;
    direcaoOrigemStamp: string;
    orgaoOrigem: string;
    orgaoOrigemstamp: string;
    grauClassifi: string;
    nvlUrgencia: string;
    despacho: string;
    numeroOrdem: number | null;
    dataDocumento: Date | string | null;
    endereco: string;
    observacao: string;
    qtdFolhas: string;
    qtdExemplares: string;
    qtdAnexo: string;
    orgaoUtilizador: string;
    direcUtilizador: string;
    depUtilizador: string;
    orgaostamp: string;
    departamentostamp: string;
    direcaostamp: string;
    tdocAniva: string;
    detalhesAssunto: string;
    vindoDeQuemquem: string;
    paraquem: string;
    pathPdf: string;
    path: string;
    arquivo: Arquivo;
    path1: string;
    processoStamp: string;
    saidaStamp: string | null;
    processo: Processo;
    provProveniencia: string;
    numero: string;
    documento: string;
    proveniencia: string;
    ano: Date | string | null;
    saidaProcesso: SaidaProcesso[];
  classificador: string;
  assunto:string;
}





export interface ScanDoc {
  scanStamp: string;
  entradaStamp: string | null;
  descricao: string | null;
  docPdf: string | null;
  path1: string;
  dataArquivo: string | null;
  inseriu: string | null;
  inseriuDataHora: string | null;
  alterou: string | null;
  alterouDataHora: string | null;
  saidaStamp: string | null;
  arquivoStamp: string
}

export interface Arquivo {
  arquivoStamp: string;
  processoStamp: string;
  localizacao: string;
  dataArquivo: string;
  numeroArquivo: number;
  inseriu: string|null;
  inseriuDataHora: string;
  alterou: string;
  alterouDataHora: string;
  activo: boolean;
  orgaoUtilizador: string;
  direcUtilizador: string;
  depUtilizador: string;
  pasta: string;
  path1: string;
  scanDoc: ScanDoc[];
  path: string;
  tdocAniva: string;
  classificador: string | null;
  grauClassifi: string;
  nvlUrgencia: string;
  despacho: string;
  detalhesAssunto: string;
  assunto: string;
  qtdFolhas: string;
  qtdExemplares: string;
  qtdAnexo: string;
  orgaoProcedencia: string;
  direcProcedencia: string;
  depProcedencia: string;
  direcaoOrigem: string;
  orgaoOrigem: string;
  paraquem: string;
  endereco: string;
  processo: Processo;
}
export interface Directorio {
  xave: number;
  directorio: string;
}
// export interface SaidaProcesso {
//   entradaStamp: string;
//   saidaStamp: string;
//   pathPdf: string;
//   numeroSaida: number;
//   docPDF: string | null;
//   destinatario: string;
//   orgaoDest: string;
//   direcDest: string;
//   depDest: string;
//   dataSaida: string;
//   inseriu: string | null;
//   inseriuDataHora: string;
//   alterou: string | null;
//   alterouDataHora: string;
//   classificador: string;
//   entregue: boolean;
//   direcaoOrigem: string;
//   orgaoorigem: string;
//   direcaoOrigemNaSaida: string;
//   orgaoorigemNaSaida: string;
//   numeroOrdem: string;
//   despacho: string;
//   dataDocumento: Date;
//   endereco: string;
//   observacao: string;
//   assunto: string|null;
//   qtdFolhas: string;
//   qtdExemplares: string;
//   qtdAnexo: string;
//   path1: string;
//   processo:Processo;
//   processoStamp: string|null;
//   paraquem: string|null;
//   tdocAniva: string|null;
//   grauClassifi: string,
// nvlUrgencia: string,
// listaDestinatarios: Unidade[];
// }



export interface SaidaProcesso {
    saidaStamp: string;
    entradaStamp: string;
    pathPdf: string;
    numeroSaida: number;
     docPDF:string;
    destinatario: string;
    orgaoDest: string;
    direcDest: string;
    depDest: string;
    dataSaida: Date | string;
    inseriu: string | null;
    inseriuDataHora: Date | string;
    alterou: string | null;
    alterouDataHora: Date | string;
    entregue: boolean;
    direcaoOrigem: string;
    orgaoorigem: string;
    direcaoOrigemNaSaida: string;
    orgaoorigemNaSaida: string;
    numeroOrdem: string;
    despacho: string;
    dataDocumento: Date | string | null;
    endereco: string;
    observacao: string;
    assunto: string;
    qtdFolhas: string;
    qtdExemplares: string;
    qtdAnexo: string;
    path1: string;
    paraquem: string | null;
    processoStamp: string | null;
    tdocAniva: string;
    visado: string | null;
    grauClassifi: string | null;
    nvlUrgencia: string | null;
    processo: Processo;
    listaDestinatarios:Unidade[];
    recebeu: string;
    numero: string;
    protocolo: number | null;
    ano: Date | string | null;
    entradaProcesso: EntradaProcesso;
    classificador:string;
}




export interface Unidade {
  unidadeStamp: string | null;
  codUnidade: number;
  descricao: string | null;
  codOrgao: number;
  orgao: string | null;
  cibm: boolean;
  estabEnsino: boolean;
  hospitalMilitar: boolean;
  unidSubordCentral: boolean;
  organica: number;
  totalOf: number;
  totalOfGen: number;
  totalGenEx: number;
  totalTteGen: number;
  totalMajGen: number;
  totalBrigadeiro: number;
  totalOfSup: number;
  totalCor: number;
  totalTteCor: number;
  totalMaj: number;
  totalOfSub: number;
  totalCap: number;
  totalTte: number;
  totalTteMil: number;
  totalAlf: number;
  totalAlfMil: number;
  totalSarg: number;
  totalInt: number;
  totalSub: number;
  totalPriSar: number;
  totalSegSar: number;
  totalTerSar: number;
  totalFur: number;
  totalPra: number;
  totalPriCab: number;
  totalSegCab: number;
  totalSold: number;
  provincia: string | null;
  codProvincia: number | null;
  distrito: string | null;
  codDistrito: number | null;
  postoAdm: string | null;
  codPostoAdm: number | null;
  localidade: string | null;
  codLocalidade: number | null;
  inseriu: string | null;
  inseriuDataHora: string | null;
  alterou: string | null;
  alterouDataHora: string | null;
  orgaoStamp: string | null;
  pco: boolean;
}

export interface Orgao {
  orgaoStamp: string | null;
  codOrgao: number;
  descricao: string | null;
  organica: number;
  totalOf: number;
  totalOfGen: number;
  totalGenEx: number;
  totalTteGen: number;
  totalMajGen: number;
  totalBrigadeiro: number;
  totalOfSup: number;
  totalCor: number;
  totalTteCor: number;
  totalMaj: number;
  totalOfSub: number;
  totalCap: number;
  totalTte: number;
  totalTteMil: number;
  totalAlf: number;
  totalAlfMil: number;
  totalSarg: number;
  totalInt: number;
  totalSub: number;
  totalPriSar: number;
  totalSegSar: number;
  totalTerSar: number;
  totalFur: number;
  totalPra: number;
  totalPriCab: number;
  totalSegCab: number;
  totalSold: number;
  inseriu: string | null;
  inseriuDataHora: string | null;
  alterou: string | null;
  alterouDataHora: string | null;
}

export interface Subunidade {
  subunidadeStamp: string | null;
  codsubunidade: number;
  descricao: string | null;
  cibm: boolean;
  estabEnsino: boolean;
  unidSubordCentral: boolean;
  codUnidade: number;
  unidade: string | null;
  organica: number;
  totalOf: number;
  totalOfGen: number;
  totalGenEx: number;
  totalTteGen: number;
  totalMajGen: number;
  totalBrigadeiro: number;
  totalOfSup: number;
  totalCor: number;
  totalTteCor: number;
  totalMaj: number;
  totalOfSub: number;
  totalCap: number;
  totalTte: number;
  totalTteMil: number;
  totalAlf: number;
  totalAlfMil: number;
  totalSarg: number;
  totalInt: number;
  totalSub: number;
  totalPriSar: number;
  totalSegSar: number;
  totalTerSar: number;
  totalFur: number;
  totalPra: number;
  totalPriCab: number;
  totalSegCab: number;
  totalSold: number;
  zona: string | null;
  provincia: string | null;
  codProvincia: number;
  distrito: string | null;
  codDistrito: number;
  postoAdm: string | null;
  codPostoAdm: number;
  localidade: string | null;
  codLocalidade: number;
  inseriu: string | null;
  inseriuDataHora: string | null;
  alterou: string | null;
  alterouDataHora: string | null;
  unidadeStamp: string | null;
}












export interface EspecieDocumental {
  especieStamp: string | null;
  descricao: string | null;
  vidaUtil: string | null;
  inseriu: string | null;
  inseriuDataHora: string | null;
  alterou: string | null;
  alterouDataHora: string | null;
  codClassif: string | null;
  destnFnl: string | null;
}
// export interface Processo {
//   processoStamp: string;
//   numero: number;
//   tipoDoc: string;
//   assunto: string | null;
//   inseriu: string | null;
//   inseriuDataHora: string;
//   alterou: string | null;
//   alterouDataHora: string;
//   orgao: string;
//   direcao: string;
//   departamento: string;
//   orgaostamp: string|null;
//   departamentostamp: string;
//   direcaostamp: string;
//   estado: string;
//   visado: string;
//   usrstamp: string|null;
//     homologado: string;
//     paStamp: string;
// }

export interface Processo {
    processoStamp: string;
    numero: number;
    tipoDoc: string;
    assunto: string | null;
    inseriu: string | null;
    inseriuDataHora: Date | string;
    alterou: string | null;
    alterouDataHora: Date | string;
    orgao: string | null;
    direcao: string | null;
    departamento: string | null;
    orgaostamp: string | null;
    departamentostamp: string | null;
    direcaostamp: string | null;
    estado: string;
    visado: string;
    usrstamp: string;
    homologado: string;
     paStamp: string;
       pa: Pa;
    entradaProcesso: EntradaProcesso[];
}
export interface Destruicao {
  arquivoStamp: string;
  observ: string;
  dataDest: string;
  inseriu: string;
  inseriuDataHora: string | null;
  alterou: string;
  alterouDataHora: string | null;
}
export interface Cliente {
  id: string;
  nome: string;
}
type ProdutoVenda = {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
};
export interface Vendas  {
  cliente: string;
  data: string;
  centroCusto: string;
  clienteId: string;
  produtos: ProdutoVenda[];
  total:number
}
type Venda = {
  cliente: string;
  data: string;
  centroCusto: string;
  produtos: ProdutoVenda[];
};
