import { Usuario } from '@core/interface';
export interface Alauxiliar {
  alauxiliarstamp: string;
  codigo: number;
  descricao: string;
  obs: string;
  padrao: boolean;
  tabela: number;
  desctabela: string;
  alauxiliarl: Alauxiliarl[];
}
export interface Alauxiliarl {
  alauxiliarlstamp: string;
  alauxiliarstamp: string;
  codigo: number;
  descricao: string;
  alauxiliar: Alauxiliar;
}
export interface Alteracmes {
  alteracmesstamp: string;
  pestamp: string;
  no: string;
  nome: string;
  periodo: string;
  nrmes: number;
  mes: string;
  datain: Date;
  datater: Date;
  pehextra: Pehextra[];
  pefalta: Pefalta[];
  pesub: Pesub[];
  pedesc: Pedesc[];
}

export interface Anolect {
  anolectstamp: string;
  codigo: number;
  ano: number;
  descricao: string;
  anoSem: AnoSem[];
}

export interface AnoLectivo {
  anoLectivostamp: string;
  codigo: string;
  ano: number;
  descricao: string;
}

export interface AnoSem {
  anoSemstamp: string;
  anolectstamp: string;
  codigo: string;
  descricao: string;
  ano: number;
  obs: string;
  anolect: Anolect;
  turma: Turma[];
}

export interface Apivded {
  apivdedlstamp: string;
  conta: string;
  descricao: string;
  apparamstamp: string;
  apparam: Apparam;
}

export interface Apivliq {
  apivliqlstamp: string;
  conta: string;
  descricao: string;
  apparamstamp: string;
  apparam: Apparam;
}

export interface Apparam {
  apparamstamp: string;
  conta: string;
  descricao: string;
  cc1: string;
  cc2: string;
  cc3: string;
  qmc: string;
  qmcdathora: Date;
  qma: string;
  qmadathora: Date;
  ivarec: string;
  ivaant: string;
  ivapag: string;
  origem: string;
  cmesant: string;
  desmesant: string;
  sequec: number;
  tiposaldo: number;
  apivdeds: Apivded[];
  apivliqs: Apivliq[];
}

export interface Armazem {
  armazemstamp: string;
  codigo: string;
  descricao: string;
  obs: string;
  padrao: boolean;
  sector: boolean;
  cozinha: boolean;
  tanque: boolean;
}

export interface Auxiliar {
  auxiliarstamp: string;
  codigo: number;
  descricao: string;
  obs: string;
  padrao: boolean;
  tabela: number;
  desctabela: string;
  tel: string;
  auxiliar2: Auxiliar2[];
}

export interface Auxiliar2 {
  auxiliar2stamp: string;
  auxiliarstamp: string;
  codigo: number;
  descricao: string;
  data: Date;
  nacional: boolean;
  ccustamp: string;
  ccusto: string;
  auxiliar: Auxiliar;
}

export interface A_param {
  a_paramstamp: string;
  qmc: string;
  qmcdathora: Date;
  qma: string;
  qmadathora: Date;
  ftmax: number;
  rfmax: number;
  despmax: number;
  dumax: number;
  rdcodtesoura: number;
  rdcontatesoura: string;
  rdalttesoura: boolean;
  rccodtesoura: number;
  rccontatesoura: string;
  rcalttesoura: boolean;
  rpcodtesoura: number;
  rpcontatesoura: string;
  rpalttesoura: boolean;
  pgcodtesoura: number;
  pgcontatesoura: string;
  pgalttesoura: boolean;
  ftaberto: boolean;
  separador: string;
  ponto: string;
  aVMAX: number;
  ivcodentr: number;
  ivdescentr: string;
  ivcodsai: number;
  ivdescsai: string;
  dseparador: string;
  usaPosRest: boolean;
  usaPosQtt: boolean;
  maskPosQtt: string;
  maskPosValor: string;
  motivoiva: string;
  cpextcccl: string;
  cpextccfn: string;
  cprd: string;
  cprdf: string;
  cplitsdocs: string;
  cpmvtcc: string;
  motivoivaeng: string;
  usadi: boolean;
  usafact: boolean;
  usafacc: boolean;
  smtpserver: string;
  smtpport: number;
  outgoingemail: string;
  outgoingpassword: string;
  destinationemail: string;
  subj: string;
  emailtext: string;
  tipobase: number;
  formapag: string;
  codtiposgs: number;
  desctiposgs: string;
  codsgs: number;
  descsgs: string;
  sMTPServerp: string;
  sMTPPortp: number;
  outGoingEmailp: string;
  outGoingPasswordp: string;
  destinationEmailp: string;
  subjp: string;
  emailTextp: string;
  pathponto: string;
  usaanexo: boolean;
  temailgest: number;
  temailpess: number;
  contacc: number;
  fncpgc: number;
  clpgc: number;
  grupo: string;
  marca: string;
  submarca: string;
  nopend: boolean;
  codtzpos: number;
  contastesourapos: string;
  comissao: number;
  qttsoma: boolean;
  gointro: boolean;
  noaltpreco: boolean;
  askremline: boolean;
  refauto: boolean;
  exprefauto: string;
  extuser: string;
  extpassw: string;
  extdatabase: string;
  extinstance: string;
  showCapBarras: boolean;
  bdimagens: string;
  percSeguro: number;
  percFrete: number;
  valormin: number;
  valormin2: number;
  tabhonor: boolean;
  naoresumo: boolean;
  ivaagencia: boolean;
  pastaScan: string;
  tipoimg: string;
  usaexternalbd: boolean;
  usaestab: boolean;
  usacomerc: boolean;
  ano: number;
  autointcl: boolean;
  diarioTrf: string;
  noDiTrf: number;
  nDocContTrf: number;
  descDocTrf: string;
  diarioDp: string;
  noDiDp: number;
  nDocContDp: number;
  descDocDp: string;
  diarioMvt: string;
  noDiMvt: number;
  nDocContMvt: number;
  descDocMvt: string;
  autointfnc: boolean;
  usames: boolean;
  contmascara: string;
  autointeg: boolean;
}

export interface Banco {
  bancostamp: string;
  sigla: string;
  nome: string;
  cx: boolean;
}

export interface Bico {
  bicostamp: string;
  codigo: number;
  codigoconc: string;
  armazemstamp: string;
  armazem: string;
  combustivel: string;
  cor: string;
  iipoCombustivel: number;
  encerrante: number;
}

export interface Bomba {
  bombastamp: string;
  codigo: number;
  descricao: string;
  modelo: string;
  fabricante: string;
  codmedicao: number;
  totalizador: number;
  medicao: string;
  serie: string;
  armazemstamp: string;
  armazem: string;
  bico: BombaBico[];
}

export interface BombaBico {
  bombaBicostamp: string;
  bombastamp: string;
  bicostamp: string;
  descricao: string;
  iipoCombustivel: number;
  bomba: Bomba;
}

export interface Cabaz {
  cabazstamp: string;
  descricao: string;
  codigo: string;
  dataEmissao: Date;
  dataValidade: Date;
  status: string;
  tipodeCabaz: string;
  categoria: string;
  categoriastamp: string;
  saldototal: number;
}

export interface Caixa {
  caixastamp: string;
  numero: number;
  inicial: number;
  data: Date;
  codtz: number;
  contatesoura: string;
  fechado: boolean;
  obs: string;
  qmc: string;
  qmf: string;
  qmcdathora: Date;
  no: number;
  nome: string;
  dhorafecho: Date;
  entrada: number;
  saida: number;
  saldo: number;
  totalCaixa: number;
  defice: number;
  campo1: number;
  campo2: number;
  campo3: number;
  campo4: string;
  campo5: string;
  supervisor: boolean;
  usrstamp: string;
  contasstamp: string;
  caixal: Caixal[];
  ccusto: string;
  ccustamp: string;
  moeda: string;
  ccutvstamp: string;
  ccutvdesc: string;
}

export interface Caixal {
  caixalstamp: string;
  caixastamp: string;
  data: Date;
  codtz: number;
  contatesoura: string;
  qmf: string;
  qmfdathora: Date;
  entrada: number;
  saida: number;
  saldo: number;
  lancado: number;
  totalDefice: number;
  campo1: number;
  campo2: number;
  campo3: string;
  obs: string;
  contasstamp: string;
  mobileUnicNumber: string;
  serialNumber: string;
  valormanual: number;
  corredor: string;
  corredorstamp: string;
  carreirastamp: string;
  carreira: string;
  fechado: boolean;
  matricula: string;
  viaturastamp: string;
  mobileserial: string;
  motorista: string;
  motoristastamp: string;
  caixa: Caixa;
  caixall: Caixall[];
}

export interface Caixall {
  caixallstamp: string;
  caixalstamp: string;
  caixastamp: string;
  data: Date;
  codtz: number;
  contatesoura: string;
  entrada: number;
  saida: number;
  saldo: number;
  lancado: number;
  totalDefice: number;
  campo1: number;
  campo2: number;
  campo3: string;
  obs: string;
  campo4: string;
  campo5: string;
  fechado: boolean;
  supervisor: boolean;
  usrstamp: string;
  contasstamp: string;
  caixal: Caixal;
}

export interface calendario {
  calendariostamp: string;
  date: Date;
  events: string;
}

export interface Cambio {
  cambiostamp: string;
  moeda: string;
  data: Date;
  compra: number;
  venda: number;
}

export interface Cc {
  ccstamp: string;
  origem: string;
  oristamp: string;
  nrdoc: string;
  no: string;
  nome: string;
  data: Date;
  vencim: Date;
  debito: number;
  debitom: number;
  debitof: number;
  debitofm: number;
  credito: number;
  creditom: number;
  creditof: number;
  creditofm: number;
  documento: string;
  moeda: string;
  saldo: number;
  codmov: number;
  factstamp: string;
  rclstamp: string;
  clstamp: string;
  usrstamp: string;
  rdstamp: string;
  ccusto: string;
  numinterno: string;
  estabno: number;
  estabnome: string;
  cambiousd: number;
  descontofin: number;
  mDescontofin: number;
  rcladiant: boolean;
  entidadebanc: string;
  referencia: string;
  pos: boolean;
  fact: Fact;
  rcl: RCL;
}

export interface CCu {
  ccustamp: string;
  empresastamp: string;
  nome: string;
  codCcu: string;
  descricao: string;
  codigo: string;
  status: string;
  defeito: boolean;
  morada: string;
  email: string;
  cell: string;
  nuit: number;
  padrao: boolean;
  controlanumcl: boolean;
  controlanumfnc: boolean;
  minimocl: number;
  maximocl: number;
  minimofnc: number;
  maximofnc: number;
  director: string;
  ccuCaixa: Ccu_Caixa[];
  ccuArm: Ccu_Arm[];
  ccuTv: Ccutv[];
  ccudep: Ccudep[];
}

export interface Ccudep {
  ccudepstamp: string;
  ccustamp: string;
  codigo: string;
  descricao: string;
  cCu: CCu;
}

export interface Ccutv {
  ccutvstamp: string;
  ccustamp: string;
  codigo: number;
  descricao: string;
  status: string;
  codarm: number;
  armazem: string;
  tervendsusp: boolean;
  cCu: CCu;
  ccutvdoc: Ccutvdoc[];
  ccutvdocdi: Ccutvdocdi[];
}

export interface Ccutvdoc {
  ccutvdocstamp: string;
  ccutvstamp: string;
  sigla: string;
  descricao: string;
  padrao: boolean;
  ccutv: Ccutv;
}

export interface Ccutvdocdi {
  ccutvdocdistamp: string;
  ccutvstamp: string;
  sigla: string;
  descricao: string;
  padrao: boolean;
  ccutv: Ccutv;
}

export interface Ccu_Arm {
  ccu_Armstamp: string;
  ccustamp: string;
  codarm: number;
  descricao: string;
  status: string;
  defeito: boolean;
  armazemstamp: string;
  cCu: CCu;
}

export interface Ccu_Caixa {
  ccu_Caixastamp: string;
  ccustamp: string;
  codtz: number;
  descricao: string;
  status: string;
  defeito: boolean;
  cx: boolean;
  contasstamp: string;
  descpos: string;
  cCu: CCu;
}

export interface Cl {
  clstamp: string;
  no: string;
  nome: string;
  morada: string;
  codprov: number;
  coddist: number;
  codpad: number;
  localidade: string;
  distrito: string;
  provincia: string;
  telefone: string;
  celular: string;
  fax: string;
  email: string;
  nuit: number;
  saldo: number;
  moeda: string;
  status: string;
  datacl: Date;
  obs: string;
  imagem: File[];
  codigobarra: File[];
  codigoQr: File[];
  prontopag: boolean;
  tipo: string;
  pos: boolean;
  pais: string;
  codcurso: string;
  curso: string;
  gradestamp: string;
  descgrelha: string;
  anoingresso: Date;
  bolseiro: boolean;
  coddep: string;
  departamento: string;
  codfac: string;
  faculdade: string;
  nofnc: string;
  fnc: string;
  datanasc: Date;
  sexo: string;
  areafiscal: string;
  aluno: boolean;
  estadocivil: string;
  religiao: string;
  nivelac: string;
  codaluno: string;
  codesc: string;
  escola: string;
  planosaude: boolean;
  medico: string;
  hospital: string;
  instplanosaude: string;
  transp: string;
  sozinho: boolean;
  acompanhado: boolean;
  codccu: number;
  ccusto: string;
  ccustostamp: string;
  deficilCobrar: boolean;
  plafond: number;
  vencimento: number;
  generico: boolean;
  desconto: boolean;
  percdesconto: number;
  codCondPagamento: number;
  descCondPagamento: string;
  insencao: boolean;
  motivoInsencao: string;
  cobrador: string;
  clivainc: boolean;
  paciene: boolean;
  entidade: boolean;
  codtz: number;
  tesouraria: string;
  localentregas: string;
  contaPgc: string;
  grupoclPgc: string;
  descGrupoclPgc: string;
  site: string;
  variasmoradas: boolean;
  tipocl: string;
  precoespecial: boolean;
  ctrlplanfond: boolean;
  contastamp: string;
  mesavirtual: boolean;
  possuifilial: boolean;
  clFam: ClFam[];
  clTurma: ClTur[];
  clContact: ClContact[];
  clCt: ClCt[];
  cldoc: ClDoc[];
  clCurso: ClCur[];
  clDoenca: ClDoenca[];
  clBolsa: ClBolsa[];
  clMorada: ClMorada[];
  clst: Clst[];
  clContas: ClContas[];
  clFilial: ClFilial[];
  clCart: ClCart[];
  clLing: ClLing[];
  contasstamp: string;
  marcacao: Marcacao[];
  clEntity: ClEntity[];
}

export interface Clas {
  classtamp: string;
  codigo: number;
  descricao: string;
  padrao: boolean;
}

export interface ClBolsa {
  clBolsastamp: string;
  clstamp: string;
  instituicao: string;
  tipobolsa: string;
  datain: Date;
  datatermino: Date;
  anolectivo: string;
  valor: number;
  perc: number;
  obs: string;
  cl: Cl;
}

export interface ClCart {
  clCartstamp: string;
  clstamp: string;
  codigo: string;
  data: Date;
  datavenc: Date;
  produzido: boolean;
  entregue: boolean;
  dataentrega: Date;
  usrentrega: string;
  quantidade: number;
  cl: Cl;
}

export interface ClContact {
  clContactstamp: string;
  clstamp: string;
  nome: string;
  funcao: string;
  telefone: string;
  email: string;
  rep: boolean;
  cob: boolean;
  pai: boolean;
  mae: boolean;
  profissao: string;
  retiraluno: boolean;
  cl: Cl;
}

export interface ClContas {
  clContasstamp: string;
  clstamp: string;
  codigo: number;
  moeda: string;
  numero: number;
  banco: string;
  nib: string;
  swift: string;
  iban: string;
  cl: Cl;
}

export interface ClCt {
  clCtstamp: string;
  clstamp: string;
  conta: string;
  descgrupo: string;
  contacc: boolean;
  movIntegra: boolean;
  cl: Cl;
}

export interface ClCur {
  clCurstamp: string;
  clstamp: string;
  curso: string;
  codcurso: string;
  inicio: Date;
  fim: Date;
  concluido: boolean;
  cl: Cl;
  clCursol: ClCursem[];
}

export interface ClCursem {
  clcursemstamp: string;
  clCursostamp: string;
  codsem: string;
  sem: string;
  clCurso: ClCur;
  clCursemdisc: ClCursemdisc[];
}

export interface ClCursemdisc {
  clCursemdiscstamp: string;
  coddisc: string;
  disc: string;
  valor: number;
  cargah: number;
  prec: boolean;
  clCursemstamp: string;
  clCursem: ClCursem;
}

export interface ClDoc {
  cldocstamp: string;
  clstamp: string;
  documento: string;
  numero: string;
  localemis: string;
  emissao: Date;
  validade: Date;
  bi: boolean;
  imagem: File[];
  cl: Cl;
}

export interface ClDoenca {
  clDoencastamp: string;
  clstamp: string;
  doenca: string;
  coddoenca: string;
  inicio: Date;
  fim: Date;
  cronica: boolean;
  tratamento: string;
  cl: Cl;
}

export interface ClEntity {
  clEntitystamp: string;
  clstamp: string;
  nome: string;
  funcao: string;
  telefone: string;
  email: string;
  rep: boolean;
  profissao: string;
  clstamp1: string;
  cl: Cl;
}

export interface ClFam {
  clFamstamp: string;
  clstamp: string;
  nome: string;
  grau: string;
  tel: string;
  email: string;
  cl: Cl;
}

export interface ClFilial {
  clFilialstamp: string;
  clstamp: string;
  oristamp: string;
  descricao: string;
  cl: Cl;
}

export interface ClLing {
  clLingstamp: string;
  lingua: string;
  fala: string;
  leitura: string;
  escrita: string;
  compreecao: string;
  materna: boolean;
  clstamp: string;
  cl: Cl;
}

export interface ClMorada {
  clMoradastamp: string;
  clstamp: string;
  departamento: string;
  morada: string;
  pessoa: string;
  telefone: string;
  email: string;
  cl: Cl;
}

export interface Clst {
  clststamp: string;
  clstamp: string;
  referenc: string;
  descricao: string;
  preco: number;
  quant: number;
  ststamp: string;
  cl: Cl;
}

export interface ClTur {
  clTurstamp: string;
  clstamp: string;
  codtur: string;
  turma: string;
  codcurso: string;
  curso: string;
  anolect: string;
  sala: string;
  codsala: number;
  matricula: string;
  datamat: Date;
  turno: string;
  periodo: string;
  localmat: string;
  cl: Cl;
}

export interface Codcc {
  codccstamp: string;
  codigo: number;
  descricao: string;
}

export interface Codstk {
  codstkstamp: string;
  codigo: number;
  descricao: string;
}

export interface Codtz {
  codtzstamp: string;
  codigo: number;
  descricao: string;
}

export interface Combustivel {
  combustivelstamp: string;
  codigo: number;
  descricao: string;
  tipo: number;
}

export interface Condpag {
  condpagstamp: string;
  codigo: number;
  descricao: string;
  cliente: boolean;
  forn: boolean;
  dias: number;
  condpagl: Condpagl[];
}

export interface Condpagl {
  condpaglstamp: string;
  condpagstamp: string;
  diain: number;
  diafim: number;
  percetagem: number;
  condpag: Condpag;
}

export interface Contas {
  contasstamp: string;
  codigo: number;
  codtipo: number;
  tipo: string;
  moeda: string;
  numero: number;
  descricao: string;
  sigla: string;
  banco: string;
  morada: string;
  nib: string;
  swift: string;
  iban: string;
  nomecontacto: string;
  contacto: string;
  obs: string;
  status: string;
  saldo: number;
  mSaldo: number;
  saldor: number;
  noneg: boolean;
  cxmn: boolean;
  vernaFactura: boolean;
  codpos: number;
  descpos: string;
  codCcu: string;
  ccusto: string;
  especial: boolean;
  data: Date;
  cpoc: string;
  moedaest: boolean;
  ccustamp: string;
  entidadebanc: string;
  contasct: Contasct[];
}

export interface Contasct {
  contasctstamp: string;
  contasstamp: string;
  conta: string;
  descgrupo: string;
  contacc: boolean;
  movIntegra: boolean;
  contas: Contas;
}

export interface Cpoc {
  cpocstamp: string;
  codcpoc: number;
  nrdoc: number;
  documento: string;
  codccu: string;
  ccusto: string;
  descricao: string;
  qmc: string;
  qmcdathora: Date;
  qma: string;
  qmadathora: Date;
  servico: boolean;
  cpocCompra: CpocCompra[];
  cpocVend: CpocVend[];
}

export interface CpocCompra {
  cpocComprastamp: string;
  cpocstamp: string;
  tabiva: number;
  taxaiva: string;
  valCompra: string;
  iva: string;
  desconto: string;
  descontofin: string;
  nac: boolean;
  valVendaest: string;
  valVendaoutro: string;
  cpoc: Cpoc;
}

export interface CpocVend {
  cpocvendstamp: string;
  cpocstamp: string;
  tabiva: number;
  taxaiva: string;
  valVenda: string;
  iva: string;
  desconto: string;
  descontofin: string;
  nac: boolean;
  valVendaest: string;
  valVendaoutro: string;
  cpoc: Cpoc;
}

export interface Ctauxiliar {
  ctauxiliarstamp: string;
  codigo: number;
  descricao: string;
  tabela: number;
  desctabela: string;
  padrao: boolean;
  obs: string;
  ctauxiliarl: Ctauxiliarl[];
}

export interface Ctauxiliarl {
  ctauxiliarlstamp: string;
  ctauxiliarstamp: string;
  codigo: string;
  descricao: string;
  ctauxiliar: Ctauxiliar;
}

export interface Curso {
  cursostamp: string;
  codcurso: string;
  desccurso: string;
  tipo: number;
  status: string;
  nivel: string;
  nivelstamp: string;
  cargahora: number;
  cursoeq: string;
  duracao: number;
  codmec: string;
  habmec: string;
  obs: string;
  imagem: File[];
  cCusto: string;
  ccustamp: string;
  ccudepstamp: string;
  departamento: string;
  pestamp: string;
  director: string;
  cursoacto: Cursoacto[];
  cursodoc: Cursodoc[];
  cursograd: Cursograd[];
  turma: Turma[];
}

export interface Cursoacto {
  cursoactostamp: string;
  data: Date;
  titulo: string;
  anosem: string;
  cursostamp: string;
  curso: Curso;
}

export interface Cursodoc {
  cursodocstamp: string;
  cursostamp: string;
  documento: string;
  anexo: File[];
  curso: Curso;
}

export interface Cursograd {
  cursogradstamp: string;
  cursostamp: string;
  gradestamp: string;
  codigo: string;
  descricao: string;
  principal: boolean;
  curso: Curso;
}

export interface Dc {
  dcstamp: string;
  docno: number;
  docnome: string;
  abrv: string;
  pedeval: boolean;
  arredonda: boolean;
  nvaimapa: boolean;
  olcodigo: string;
  oldesc: string;
  qmc: string;
  qma: string;
  lancaol: boolean;
  naolancapla: boolean;
  oltrfa: boolean;
  introol: boolean;
  ollinhas: boolean;
  automl: boolean;
  qmcdathora: Date;
  qmadathora: Date;
  apuraiva: boolean;
  apurares: boolean;
  dcli: Dcli[];
}

export interface Dclasse {
  dclassestamp: string;
  anosem: string;
  descricao: string;
  codigo: string;
  tipoprazo: string;
  datain: Date;
  datater: Date;
  datainaula: Date;
  datateraula: Date;
  datainnota: Date;
  dataternota: Date;
  dataresult: Date;
  fechado: boolean;
  motivo: string;
  dataFecho: Date;
  dclassel: Dclassel[];
}

export interface Dclassel {
  dclasselstamp: string;
  dclassestamp: string;
  turmastamp: string;
  turma: string;
  cursostamp: string;
  curso: string;
  dclasse: Dclasse;
}

export interface Dcli {
  dclistamp: string;
  dcstamp: string;
  conta: string;
  rubrica: string;
  deb: boolean;
  valor: number;
  factor: number;
  evalor: number;
  lordem: number;
  lbanco: boolean;
  cct: string;
  ncusto: string;
  oldesc: string;
  docno: number;
  sgrupo: string;
  grupo: string;
  olcodigo: string;
  dc: Dc;
}

export interface Dcv {
}

export interface Desconto {
  descontostamp: string;
  codigo: string;
  descricao: string;
  tipo: number;
  valor: number;
  descfixo: boolean;
  decimo13: boolean;
  retro: boolean;
  tipodesc: number;
  vta: boolean;
  insid: number;
  rectro: boolean;
  obs: string;
}

export interface Di {
  distamp: string;
  numdoc: number;
  sigla: string;
  tdistamp: string;
  numinterno: string;
  numero: string;
  entidade: number;
  data: Date;
  dataven: Date;
  no: string;
  nome: string;
  entidadestamp: string;
  moeda: string;
  subtotal: number;
  perdesc: number;
  desconto: number;
  totaliva: number;
  total: number;
  msubtotal: number;
  mdesconto: number;
  mtotaliva: number;
  mtotal: number;
  codvend: number;
  vendedor: string;
  cambio: number;
  cambfixo: boolean;
  anulado: boolean;
  movtz: boolean;
  movstk: boolean;
  trf: boolean;
  nomedoc: string;
  codtz: number;
  contatesoura: string;
  codmovstk: number;
  descmovstk: string;
  reffornec: string;
  ccusto: string;
  codmovstk2: number;
  descmovstk2: string;
  obs: string;
  oristamp: string;
  aprovado: boolean;
  codarm: number;
  descarm: string;
  codarm2: number;
  descarm2: string;
  clivainc: boolean;
  no2: number;
  nome2: string;
  fechado: boolean;
  pjno: number;
  pjstamp: string;
  pjNome: string;
  trailerref: string;
  trailer: string;
  tipo: number;
  no3: number;
  nome3: string;
  no4: number;
  nome4: string;
  mercadoria: string;
  refcl: string;
  nrfornec: string;
  destino: string;
  moeda2: string;
  seguro: number;
  dchegada: Date;
  codmovtz: number;
  descmovtz: string;
  codmovtz2: number;
  descmovtz2: string;
  trfConta: boolean;
  encomenda: boolean;
  reserva: boolean;
  vendido: boolean;
  comprado: boolean;
  estorno: boolean;
  manutantecipada: boolean;
  matricula: string;
  localpartida: string;
  horapartida: Date;
  horachegada: Date;
  localmanut: string;
  fechomanut: boolean;
  datafecho: Date;
  kilometragem: string;
  morada: string;
  nuit: string;
  bomba: string;
  cambiousd: number;
  requisicao: string;
  ccustamp: string;
  usrstamp: string;
  dil: Dil[];
  formasp: Formasp[];
  dianexo: Dianexo[];
  ditec: Ditec[];
  localentrega: string;
  departamento: string;
  motorista: string;
  pais: string;
  mail: string;
  cell: string;
  pcontacto: string;
  dataentrega: Date;
  datapartida: Date;
  entrega: boolean;
  prod: boolean;
  caixastamp: string;
  caixalstamp: string;
}

export interface Dianexo {
  dianexostamp: string;
  distamp: string;
  descricao: string;
  anexo: File[];
  di: Di;
}

export interface Diario {
  diariostamp: string;
  dino: number;
  descricao: string;
  docno: number;
  docnome: string;
  dilno: number;
  deb: number;
  cre: number;
  conana: number;
  confin: number;
  conord: number;
  edeb: number;
  ecre: number;
  diano: number;
  qmc: string;
  qmcdathora: Date;
  qma: string;
  qmadathora: Date;
  defeito: boolean;
  apura: boolean;
  diariodoc: Diariodoc[];
}

export interface Diariodoc {
  diariodocstamp: string;
  diariostamp: string;
  codigo: number;
  descricao: string;
  padrao: boolean;
  diario: Diario;
}

export interface DiasFeria {
  diasFeriastamp: string;
  descricao: string;
  dias: number;
  ordem: number;
}

export interface Dil {
  dilstamp: string;
  distamp: string;
  ststamp: string;
  entidadestamp: string;
  numdoc: number;
  sigla: string;
  ref: string;
  descricao: string;
  quant: number;
  unidade: string;
  armazem: number;
  descarm: string;
  armazem2: number;
  descarm2: string;
  preco: number;
  mpreco: number;
  lote: string;
  tabiva: number;
  txiva: number;
  valival: number;
  mvalival: number;
  ivainc: boolean;
  perdesc: number;
  descontol: number;
  mdescontol: number;
  subtotall: number;
  msubtotall: number;
  totall: number;
  mtotall: number;
  status: boolean;
  usadesign: boolean;
  servico: boolean;
  nmovstk: boolean;
  remotestamp: string;
  oristamp: string;
  tit: boolean;
  ordem: number;
  stkprod: boolean;
  titstamp: string;
  usaserie: boolean;
  serie: string;
  contatz: number;
  composto: boolean;
  processado: boolean;
  activo: boolean;
  cpoc: number;
  cpoo: number;
  gasoleo: boolean;
  cambiousd: number;
  moeda: string;
  moeda2: string;
  lineAnulado: boolean;
  ccusto: string;
  codccu: string;
  acordo: string;
  armazemstamp2: string;
  armazemstamp: string;
  refornec: string;
  usaquant2: boolean;
  lotevalid: Date;
  lotelimft: Date;
  usalote: boolean;
  obs: string;
  stRefFncCodstamp: string;
  codigobarras: string;
  quant2: number;
  campomultiuso: string;
  precoPromo: number;
  tipoPromocao: string;
  dataInicio: Date;
  dataFim: Date;
  ativo: boolean;
  di: Di;
  mstk: Mstk[];
  dill: Dill[];
}

export interface Dil3 {
  dil3Stamp: string;
  cod: string;
  descricao: string;
  distamp: string;
  intertekstamp: string;
  di: Di;
}

export interface Dill {
  dillstamp: string;
  dilstamp: string;
  numdoc: number;
  sigla: string;
  ref: string;
  descricao: string;
  quant: number;
  unidade: string;
  armazem: number;
  armazem2: number;
  preco: number;
  mpreco: number;
  lote: string;
  tabiva: number;
  txiva: number;
  valival: number;
  mvalival: number;
  ivainc: boolean;
  perdesc: number;
  descontol: number;
  mdescontol: number;
  subtotall: number;
  msubtotall: number;
  totall: number;
  mtotall: number;
  ordem: number;
  cambiol: number;
  descarm: string;
  servico: boolean;
  dil: Dil;
  nome: string;
  no: string;
  matricula: string;
}

export interface Stb {
  stbstamp: string;
  ststamp: string;
  descricao: string;
  st: St;
}

export interface DisciplinaTumra {
  disciplinaTumrastamp: string;
  disciplina: string;
  referenc: string;
  matriculaAlunostamp: string;
  turmastamp: string;
  codigo: string;
  ststamp: string;
  clstamp: string;
  sitcao: string;
  activo: boolean;
  motivo: string;
  matriculaAluno: MatriculaAluno;
}

export interface Stl {
  stlstamp: string;
  ststamp: string;
  codigo: string;
  descricao: string;
  st: St;
}

export interface Dist {
  diststamp: string;
  codprov: number;
  codDist: number;
  descricao: string;
  provstamp: string;
  prov: Prov;
  pad: Pad[];
}

export interface DistribuicaoTurno {
  distribuicaoTurnostamp: string;
  pestamp: string;
  descTurno: string;
  nome: string;
  turnostamp: string;
  sigla: string;
  no: string;
  categ: string;
  tipo: string;
  data: Date;
  data1: string;
  pe: Pe;
}

export interface Ditec {
  ditecstamp: string;
  distamp: string;
  no: string;
  nome: string;
  funcao: string;
  chefe: boolean;
  di: Di;
}

export interface Dlei {
  dleistamp: string;
  codigo: number;
  descricao: string;
  ano: number;
  conta: string;
  depmapa: string;
  reavmapa: string;
  perc: number;
}

export interface Dleil {
  dleilstamp: string;
  dleistamp: string;
  ano: number;
  coef: number;
}

export interface Docac {
  docacstamp: string;
  codigo: string;
  descricao: string;
}

export interface Docmodulo {
  docmodulostamp: string;
  codigo: string;
  descricao: string;
  estado: boolean;
  rltstamp: string;
  tdistamp: string;
  tdocstamp: string;
  tdocfstamp: string;
  tdi: Tdi;
  tdocf: Tdocf;
  tdoc: Tdoc;
  rlt: Rlt;
}

export interface Empresa {
  empresastamp: string;
  codigo: number;
  nome: string;
  morada: string;
  morada2: string;
  sede: string;
  telefone: string;
  fax: string;
  email: string;
  cell: string;
  cp: number;
  actividade: string;
  nuit: number;
  sigla: string;
  moeda: string;
  infobanc: string;
  declarante: string;
  refdeclara: string;
  codigoINSS: string;
  grupo1: string;
  grupo2: string;
  webpage: string;
  empslogan: string;
  actdgi: string;
  reparticao: string;
  capitalsocial: number;
  matricula: string;
  logoGrande: boolean;
  mostraNome: boolean;
  logo: File[];
  logo1: File[];
  logo2: File[];
  logo3: File[];
  logo4: File[];
  logo5: File[];
  logo6: File[];
  logo7: File[];
  logo8: File[];
  logo9: File[];
  logo10: File[];
  logo11: File[];
  logo12: File[];
  logo13: File[];
  logo14: File[];
  logo15: File[];
  cl1: File[];
  cl2: File[];
  cl3: File[];
  cl4: File[];
  cl5: File[];
  cl6: File[];
  cl7: File[];
  cl8: File[];
  cl9: File[];
  cl10: File[];
  cl11: File[];
  cl12: File[];
  cl13: File[];
  cl14: File[];
  cl15: File[];
  emptransporte: boolean;
  imagemFundo: File[];
  empresaMod: EmpresaMod[];
  empresadep: Empresadep[];
}

export interface Empresadep {
  empresadepstamp: string;
  empresastamp: string;
  sigla: string;
  descricao: string;
  obs: string;
  empresa: Empresa;
}

export interface EmpresaMod {
  empresaModstamp: string;
  empresastamp: string;
  sigla: string;
  descricao: string;
  validade: Date;
  trial: boolean;
  obs: string;
  empresa: Empresa;
}

export interface Ent {
  entstamp: string;
  no: number;
  nome: string;
  morada: string;
  telefone: string;
  celular: string;
  fax: string;
  cp: number;
  email: string;
  nuit: number;
  zona: string;
  tipo: string;
  codVend: number;
  vendedor: string;
  nimpexp: string;
  perdesc: number;
  moeda: string;
  status: boolean;
  campo1: string;
  campo2: string;
  campo3: string;
  campo4: string;
  tabela: number;
  datacl: Date;
  obs: string;
  pais: string;
  qmc: string;
  qmcdathora: Date;
  qma: string;
  qmadathora: Date;
  localidade: string;
  codpais: string;
  codarm: number;
  descarm: string;
  clivainc: boolean;
  cobrador: boolean;
  codcondpag: number;
  descondpag: string;
}

export interface EquipaMedica {
  equipaMedicastamp: string;
  processoClinicostamp: string;
  nome: string;
  funcao: string;
  especialidade: string;
  pestamp: string;
  data: Date;
  processoClinico: ProcessoClinico;
}

export interface Escaladeservico {
  escaladeservicostamp: string;
  nome: string;
  situacao: string;
  departamento: string;
  cCusto: string;
  pestamp: string;
  descricao: string;
  codccu: string;
  ccustamp: string;
  turno: string;
  serviTurnostamp: string;
  corredor: string;
  escalal: Escalal[];
}

export interface Escalal {
  escalalstamp: string;
  escaladeservicostamp: string;
  descricao: string;
  codigo: string;
  data: Date;
  excluiProc: boolean;
  excluiEstat: boolean;
  descontaVenc: boolean;
  descontaRem: boolean;
  numPeriodoProcessado: number;
  valorDescontado: number;
  anoProcessado: number;
  numProc: number;
  descontaSubsTurno: boolean;
  subAlimProporcional: boolean;
  horas: number;
  injustificada: number;
  justificada: number;
  total: number;
  processado: boolean;
  obs: string;
  docjustifica: File[];
  pestamp: string;
  processtamp: string;
  prcstamp: string;
  escaladeservico: Escaladeservico;
  dataProc: Date;
}

export interface EscalaPe {
  escalaPestamp: string;
  descricao: string;
  codigo: string;
  dataem: Date;
  situacao: string;
  departamento: string;
  cCusto: string;
  codccu: string;
  ccustamp: string;
  escalaPeLL: EscalaPeLL[];
  escalaPeL: EscalaPeL[];
}

export interface EscalaPeL {
  escalaPeLstamp: string;
  escalaPestamp: string;
  nome: string;
  no: string;
  horaSaida: Date;
  horaRend: Date;
  turno: string;
  siglaTurno: string;
  serviTurnostamp: string;
  corredor: string;
  corredorstamp: string;
  codMotorista: string;
  motorista: string;
  motoristastamp: string;
  carreirastamp: string;
  carreira: string;
  viatura: string;
  viaturastamp: string;
  campo3: string;
  campo4: string;
  motivo: string;
  pestamp: string;
  dias: number;
  reserva: boolean;
  diasTrabalhos: string;
  codcarreira: string;
  codCarreirastamp: string;
  ferias: boolean;
  sabado: boolean;
  domingo: boolean;
  feriado: boolean;
  escalaPe: EscalaPe;
}

export interface EscalaPeLL {
  escalaPeLLstamp: string;
  escalaPestamp: string;
  turno: string;
  siglaTurno: string;
  serviTurnostamp: string;
  escalaPeLstamp: string;
  dias: number;
  diasTrabalhos: string;
  pestamp: string;
  escalaPe: EscalaPe;
}

export interface EscalaPeriodo {
  escalaPeriodostamp: string;
  codigo: string;
  descricao: string;
  sigla: string;
  col: number;
  obs: string;
}

export interface Facc {
  faccstamp: string;
  numdoc: number;
  tdocfstamp: string;
  sigla: string;
  numero: string;
  data: Date;
  dataven: Date;
  dataAprovacao: Date;
  no: string;
  nome: string;
  moeda: string;
  subtotal: number;
  perdesc: number;
  desconto: number;
  totaliva: number;
  total: number;
  msubtotal: number;
  mdesconto: number;
  mtotaliva: number;
  mtotal: number;
  anulado: boolean;
  codInterno: string;
  movtz: boolean;
  movstk: boolean;
  movcc: boolean;
  nomedoc: string;
  codmovstk: number;
  descmovstk: string;
  codmovcc: number;
  descmovcc: string;
  numinterno: string;
  ccusto: string;
  obs: string;
  oristamp: string;
  aprovado: boolean;
  tipodoc: number;
  integra: boolean;
  reserva: boolean;
  no2: number;
  nome2: string;
  cambiousd: number;
  moeda2: string;
  pjnome: string;
  pjstamp: string;
  comprado: boolean;
  encomenda: boolean;
  pjno: number;
  requisicao: string;
  fncstamp: string;
  descontofin: number;
  mDescontofin: number;
  perdescfin: number;
  codCondPagamento: number;
  descCondPagamento: string;
  ccustamp: string;
  usrstamp: string;
  nc: boolean;
  nd: boolean;
  ft: boolean;
  vd: boolean;
  nuit: number;
  faccprest: Faccprest[];
  faccl: Faccl[];
  formasp: Formasp[];
  fcc: Fcc[];
  faccanexo: Faccanexo[];
}

export interface Faccanexo {
  faccanexostamp: string;
  faccstamp: string;
  descricao: string;
  anexo: File[];
  facc: Facc;
}

export interface Faccl {
  facclstamp: string;
  faccstamp: string;
  ststamp: string;
  entidadestamp: string;
  numdoc: number;
  sigla: string;
  ref: string;
  descricao: string;
  quant: number;
  unidade: string;
  armazem: number;
  preco: number;
  mpreco: number;
  tabiva: number;
  txiva: number;
  valival: number;
  mvalival: number;
  ivainc: boolean;
  perdesc: number;
  descontol: number;
  mdescontol: number;
  subtotall: number;
  msubtotall: number;
  totall: number;
  mtotall: number;
  status: boolean;
  usadesign: boolean;
  servico: boolean;
  nmovstk: boolean;
  remotestamp: string;
  oristamp: string;
  tit: boolean;
  ordem: number;
  stkprod: boolean;
  titstamp: string;
  contatz: number;
  cpoo: number;
  composto: boolean;
  pack: number;
  usalote: boolean;
  lotevalid: Date;
  lotelimft: Date;
  lote: string;
  reffornecl: string;
  qttmedida: number;
  totalmedida: number;
  grupo: number;
  usaperlinha: boolean;
  perlinha: number;
  tipocheck: number;
  descarm: string;
  oristampl: string;
  cpoc: number;
  gasoleo: boolean;
  cambiousd: number;
  moeda: string;
  moeda2: string;
  lineAnulado: boolean;
  ccusto: string;
  codccu: string;
  obs: string;
  activo: boolean;
  armazemstamp: string;
  refornec: string;
  usaquant2: boolean;
  quant2: number;
  facc: Facc;
  codigobarras: string;
  stRefFncCodstamp: string;
  campomultiuso: string;
  precoPromo: number;
  mstk: Mstk[];
}

export interface Faccprest {
  faccpreststamp: string;
  faccstamp: string;
  descricao: string;
  data: Date;
  perc: number;
  valor: number;
  obs: string;
  status: boolean;
  facc: Facc;
}

export interface Fact {
  factstamp: string;
  numdoc: number;
  tdocstamp: string;
  sigla: string;
  numero: string;
  data: Date;
  dataven: Date;
  dataAprovacao: Date;
  no: string;
  nome: string;
  morada: string;
  telefone: string;
  fax: string;
  nuit: number;
  email: string;
  moeda: string;
  subtotal: number;
  perdesc: number;
  perdescfin: number;
  desconto: number;
  descontofin: number;
  mDescontofin: number;
  totaliva: number;
  total: number;
  msubtotal: number;
  mdesconto: number;
  mtotaliva: number;
  mtotal: number;
  codvend: number;
  vendedor: string;
  cambiousd: number;
  cambfixo: boolean;
  anulado: boolean;
  codInterno: string;
  movtz: boolean;
  movstk: boolean;
  codmovstk: number;
  movcc: boolean;
  codmovcc: number;
  nomedoc: string;
  descmovcc: string;
  descmovstk: string;
  numinterno: string;
  ccusto: string;
  obs: string;
  oristamp: string;
  aprovado: boolean;
  adjudicado: boolean;
  origem: string;
  coment: string;
  codarm: number;
  codturno: number;
  turno: string;
  mesa: string;
  fechada: boolean;
  isiva: boolean;
  clivainc: boolean;
  campo1: string;
  campo2: string;
  tipodoc: number;
  no2: number;
  nome2: string;
  morada2: string;
  localidade2: string;
  nomecomerc: string;
  integra: boolean;
  noDiario: number;
  diario: string;
  nDocCont: number;
  descDocCont: string;
  contabilizado: boolean;
  reserva: boolean;
  lant: number;
  lact: number;
  lreal: number;
  ldata: Date;
  tipoentida: string;
  zona: string;
  ncont: string;
  codzona: number;
  fleitura: string;
  ncontador: string;
  moeda2: string;
  pjno: number;
  pjnome: string;
  pjstamp: string;
  estabno: number;
  estabnome: string;
  codisiva: number;
  motivoisiva: string;
  numcaixa: number;
  datcaixa: Date;
  codsec: number;
  descsector: string;
  posto: number;
  fechado: boolean;
  entrega: boolean;
  localentrega: string;
  localpartida: string;
  datapartida: Date;
  requisicao: string;
  dataentrega: Date;
  pais: string;
  departamento: string;
  cell: string;
  mail: string;
  estado: string;
  matricula: string;
  pcontacto: string;
  regularizado: boolean;
  valRegularizado: number;
  liquidofactura: number;
  vendido: boolean;
  segundaVia: boolean;
  nrFactura: string;
  motivoanula: string;
  nrdocanuala: string;
  clstamp: string;
  codCondPagamento: number;
  descCondPagamento: string;
  ccustamp: string;
  usrstamp: string;
  nc: boolean;
  nd: boolean;
  ft: boolean;
  vd: boolean;
  factl: Factl[];
  factprest: Factprest[];
  factreg: Factreg[];
  formasp: Formasp[];
  fcc: Cc[];
  factanexo: Factanexo[];
  motorista: string;
  cursostamp: string;
  desccurso: string;
  turmastamp: string;
  descturma: string;
  anosem: string;
  etapa: string;
  inscricao: boolean;
  entidadebanc: string;
  referencia: string;
  multa: boolean;
  pos: boolean;
  caixastamp: string;
  caixalstamp: string;
  matriculaAluno: boolean;
  [key: string]: any;
}

export interface Factanexo {
  factanexostamp: string;
  factstamp: string;
  descricao: string;
  anexo: File[];
  fact: Fact;
}
class Factsss {
  factstamp: string = '';
  nome: string = '';
  valor: number = 0;
  ativo: boolean = false;
  dataCriacao: Date = new Date();
  itens: string[] = [];
}
export interface FactConcet {
  factConcetstamp: string;
  usrCode: string;
  quant: number;
  bomba: string;
  bico: string;
  preco: number;
  combustivel: string;
  tipocomb: string;
}

export interface Factl {
  factlstamp: string;
  factstamp: string;
  ststamp: string;
  entidadestamp: string;
  numdoc: number;
  sigla: string;
  ref: string;
  descricao: string;
  quant: number;
  unidade: string;
  armazem: number;
  preco: number;
  mpreco: number;
  tabiva: number;
  txiva: number;
  valival: number;
  mvalival: number;
  ivainc: boolean;
  activo: boolean;
  perdesc: number;
  descontol: number;
  mdescontol: number;
  subtotall: number;
  msubtotall: number;
  totall: number;
  mtotall: number;
  status: boolean;
  lotevalid: Date;
  lotelimft: Date;
  usalote: boolean;
  lote: string;
  obs: string;
  servico: boolean;
  oristampl: string;
  dispon: number;
  qttOrig: number;
  nmovstk: boolean;
  oristamp: string;
  tit: boolean;
  ordem: number;
  stkprod: boolean;
  lineAnulado: boolean;
  titstamp: string;
  contatz: number;
  pack: number;
  cpoc: number;
  cpoo: number;
  composto: boolean;
  descarm: string;
  refornec: string;
  usaquant2: boolean;
  quant2: number;
  morada: string;
  telefone: string;
  entrega: boolean;
  dataentrega: Date;
  pcontacto: string;
  email: string;
  pais: string;
  guias: string;
  contrato: string;
  gasoleo: boolean;
  cambiousd: number;
  moeda: string;
  moeda2: string;
  ccusto: string;
  codccu: string;
  armazemstamp: string;
  codigobarras: string;
  stRefFncCodstamp: string;
  campomultiuso: string;
  precoPromo: number;
  fact?: Fact;
  mstk?: Mstk[];
}
export interface LineValues {
  stamp:string;
  ststamp: string;
  entidadestamp: string;
  numdoc: number;
  sigla: string;
  ref: string;
  descricao: string;
  quant: number;
  unidade: string;
  armazem: number;
  preco: number;
  mpreco: number;
  tabiva: number;
  txiva: number;
  valival: number;
  mvalival: number;
  ivainc: boolean;
  activo: boolean;
  perdesc: number;
  descontol: number;
  mdescontol: number;
  subtotall: number;
  msubtotall: number;
  totall: number;
  mtotall: number;
  status: boolean;
  lotevalid: Date;
  lotelimft: Date;
  usalote: boolean;
  lote: string;
  obs: string;
  servico: boolean;
  oristampl: string;
  dispon: number;
  qttOrig: number;
  nmovstk: boolean;
  oristamp: string;
  tit: boolean;
  ordem: number;
  stkprod: boolean;
  lineAnulado: boolean;
  titstamp: string;
  contatz: number;
  pack: number;
  cpoc: number;
  cpoo: number;
  composto: boolean;
  descarm: string;
  refornec: string;
  usaquant2: boolean;
  quant2: number;
  morada: string;
  telefone: string;
  entrega: boolean;
  dataentrega: Date;
  pcontacto: string;
  email: string;
  pais: string;
  guias: string;
  contrato: string;
  gasoleo: boolean;
  cambiousd: number;
  moeda: string;
  moeda2: string;
  ccusto: string;
  codccu: string;
  armazemstamp: string;
  codigobarras: string;
  stRefFncCodstamp: string;
  campomultiuso: string;
  precoPromo: number;
  [key: string]: any;
}

export interface Cabecalho {
    numdoc: number;
    sigla: string;
    numero: string;
    data: Date | string;
    dataven: Date | string;
    no: string;
    nome: string;
    moeda: string;
    subtotal: number;
    perdesc: number;
    desconto: number;
    totaliva: number;
    total: number;
    msubtotal: number;
    mdesconto: number;
    mtotaliva: number;
    mtotal: number;
    anulado: boolean;
    movtz: boolean;
    movstk: boolean;
    nomedoc: string;
    numinterno: string;
    ccusto: string;
    obs: string;
    oristamp: string;
    aprovado: boolean;
    reserva: boolean;
    no2: number;
    nome2: string;
    cambiousd: number;
    moeda2: string;
    pjnome: string;
    pjstamp: string;
    pjno: number;
    requisicao: string;
    ccustamp: string;
    usrstamp: string;
}
export interface Factprest {
  factpreststamp: string;
  factstamp: string;
  descricao: string;
  data: Date;
  perc: number;
  valor: number;
  obs: string;
  status: boolean;
  fact?: Fact;
  [key: string]: any
}

export interface Factreg {
  factregstamp: string;
  factstamp: string;
  ccstamp: string;
  descricao: string;
  nrdoc: number;
  valpreg: number;
  valorreg: number;
  fact: Fact;
}

export interface Factsegvia {
  numero: string;
  factstamp: string;
  factstampsegvia: string;
  data: Date;
  numerosegvia: string;
}

export interface Falta {
  faltastamp: string;
  codigo: number;
  descricao: string;
  descontaSubAlimenta: boolean;
  descontaSubPorTurno: boolean;
}

export interface Familia {
  familiastamp: string;
  codigo: string;
  descricao: string;
  imagem: File[];
  pos: boolean;
  descpos: string;
  sequenc: number;
  tipofam: number;
  cpoc: string;
  subFam: SubFam[];
  familiacar: Familiacar[];
  familiapb: Familiapb[];
}

export interface Familiacar {
  familiacarstamp: string;
  familiastamp: string;
  codigo: string;
  descricao: string;
  familia: Familia;
  familiacarl: Familiacarl[];
  familiacarsub: Familiacarsub[];
}

export interface Familiacarl {
  familiacarlstamp: string;
  familiacarstamp: string;
  ststamp: string;
  descviatura: string;
  matricula: string;
  familiacar: Familiacar;
}

export interface Familiacarsub {
  familiacarsubstamp: string;
  familiacarstamp: string;
  ststamp: string;
  codcarreira: string;
  desccarreira: string;
  familiacar: Familiacar;
}

export interface Familiapb {
  familiapbstamp: string;
  familiastamp: string;
  codigo: string;
  order: string;
  descricao: string;
  preco: number;
  bagagem: boolean;
  familia: Familia;
}

export interface Fcc {
  fccstamp: string;
  origem: string;
  oristamp: string;
  nrdoc: string;
  no: string;
  nome: string;
  data: Date;
  vencim: Date;
  debito: number;
  debitom: number;
  debitof: number;
  debitofm: number;
  credito: number;
  creditom: number;
  creditof: number;
  creditofm: number;
  documento: string;
  moeda: string;
  saldo: number;
  codmov: number;
  reffornec: string;
  faccstamp: string;
  pgfstamp: string;
  rdfstamp: string;
  ccusto: string;
  pgflstamp: string;
  numinterno: string;
  cambiousd: number;
  rcladiant: boolean;
  pgf: Pgf;
  fncstamp: string;
  usrstamp: string;
  facc: Facc;
}

export interface Feriado {
  feriadostamp: string;
  codigo: string;
  descricao: string;
  data: Date;
  academico: boolean;
  biblioteca: boolean;
  administrativo: boolean;
  nacional: boolean;
  feriadol: Feriadol[];
}

export interface Feriadol {
  feriadolstamp: string;
  feriadostamp: string;
  codigo: string;
  descricao: string;
  feriado: Feriado;
}

export interface Fing {
  fingstamp: string;
  codigo: string;
  descricao: string;
}

export interface Fnc {
  fncstamp: string;
  no: string;
  nome: string;
  morada: string;
  telefone: string;
  celular: string;
  fax: string;
  email: string;
  nuit: number;
  tipo: string;
  saldo: number;
  moeda: string;
  status: string;
  data: Date;
  obs: string;
  pais: string;
  ccusto: string;
  codarm: number;
  armazem: string;
  imagem: File[];
  prontopag: boolean;
  localidade: string;
  site: string;
  plafond: number;
  vencimento: number;
  desconto: boolean;
  percdesconto: number;
  insencao: boolean;
  motivoInsencao: string;
  clivainc: boolean;
  codtz: number;
  tesouraria: string;
  contastamp: string;
  localentregas: string;
  generico: boolean;
  fncivainc: boolean;
  ctrlplanfond: boolean;
  codCondPagamento: number;
  descCondPagamento: string;
  familia: string;
  fncContact: FncContact[];
  fncCt: FncCt[];
  fncBomb: FncBomb[];
}

export interface FncBomb {
  fncbombstamp: string;
  fncstamp: string;
  no: string;
  descricao: string;
  fnc: Fnc;
}

export interface FncContact {
  fncContactstamp: string;
  fncstamp: string;
  nome: string;
  funcao: string;
  telefone: string;
  email: string;
  rep: boolean;
  cob: boolean;
  fnc: Fnc;
}

export interface FncCt {
  fncCtstamp: string;
  fncstamp: string;
  conta: string;
  descgrupo: string;
  contacc: boolean;
  movIntegra: boolean;
  fnc: Fnc;
}

export interface FncProc {
  fncProcstamp: string;
  fncstamp: string;
  avaliacao: string;
  criterio: string;
  grau: string;
  fnc: Fnc;
}

export interface Formasp {
  formaspstamp: string;
  titulo: string;
  numtitulo: string;
  dcheque: Date;
  banco: string;
  banco2: string;
  contatesoura: string;
  valor: number;
  codtz: number;
  codtz2: number;
  contatesoura2: string;
  contasstamp2: string;
  trf: boolean;
  numer: boolean;
  tipo: boolean;
  obgTitulo: boolean;
  rclstamp: string;
  oristamp: string;
  factstamp: string;
  faccstamp: string;
  pgfstamp: string;
  perclstamp: string;
  status: boolean;
  distamp: string;
  cpoc: number;
  contaPgc: number;
  origem: string;
  mvalor: number;
  codmovtz: number;
  descmovtz: string;
  codmovtz2: number;
  descmovtz2: string;
  usrLogin: string;
  aberturaCaixa: boolean;
  no: string;
  nome: string;
  numero: string;
  ccusto: string;
  fact?: Fact;
  facc?: Facc;
  rcl?: RCL;
  pgf?: Pgf;
  di?: Di;
  contasstamp: string;
  percl?: Percl;
  ccustamp: string;
  moeda: string;
  cambiousd: number;
  mvt?: Mvt[];
  caixalstamp: string;
  caixastamp: string;
}

export interface Fpagam {
  fpagamstamp: string;
  codigo: number;
  descricao: string;
  tipo: boolean;
  obgTitulo: boolean;
  pos: boolean;
  numer: boolean;
}

export interface Grade {
  gradestamp: string;
  codigo: string;
  descricao: string;
  codcurso: string;
  desccurso: string;
  cursostamp: string;
  activo: boolean;
  anoseminic: string;
  anoSemstamp: string;
  totalCargahora: number;
  totalCargaTeorica: number;
  totalCargaPratica: number;
  obs: string;
  totaldisc: number;
  totalCreda: number;
  data: Date;
  planopagstamp: string;
  descplano: string;
  gradel: Gradel[];
}

export interface Gradel {
  gradelstamp: string;
  gradestamp: string;
  codetapa: string;
  etapa: string;
  coddisc: string;
  displina: string;
  ststamp: string;
  semstamp: string;
  categoria: string;
  opcao: boolean;
  credac: number;
  cargahtotal: number;
  cargahteorica: number;
  cargahpratica: number;
  prec: boolean;
  grade: Grade;
  st: St;
  sem: Sem;
}

export interface Grupo {
  grupostamp: string;
  codigo: string;
  descricao: string;
  imagem: File[];
  subGrupo: SubGrupo[];
}

export interface HoraExtra {
  horaExtrastamp: string;
  codigo: number;
  descricao: string;
  valor: number;
  tipo: number;
}

export interface Horario {
  horariostamp: string;
  turmastamp: string;
  turma: string;
  codigo: string;
  descricao: string;
  anosem: string;
  visualizar: boolean;
  hactivo: boolean;
  horariol: Horariol[];
}

export interface Horariol {
  horariolstamp: string;
  horariostamp: string;
  descricao: string;
  hora: string;
  segunda: string;
  terca: string;
  quarta: string;
  quinta: string;
  sexta: string;
  sabado: string;
  domingo: string;
  horario: Horario;
}

export interface Imbauxiliar {
  imbauxiliarstamp: string;
  codigo: number;
  descricao: string;
  obs: string;
  padrao: boolean;
  tabela: number;
  desctabela: string;
  imbauxiliarl: Imbauxiliarl[];
}

export interface Imbauxiliarl {
  imbauxiliarlstamp: string;
  imbauxiliarstamp: string;
  codigo: number;
  descricao: string;
  imbauxiliar: Imbauxiliar;
}

export interface Inst {
  inststamp: string;
  codesc: string;
  descricao: string;
  obs: string;
  instunid: Instunid[];
}

export interface Instunid {
  instunidstamp: string;
  inststamp: string;
  codesc: string;
  codunid: string;
  descricao: string;
  obs: string;
  inst: Inst;
  instunidl: Instunidl[];
}

export interface Instunidl {
  instunidlstamp: string;
  instunidstamp: string;
  coduni: string;
  codigo: string;
  descricao: string;
  obs: string;
  instunid: Instunid;
}

export interface IV {
  ivstamp: string;
  numdoc: number;
  sigla: string;
  descricao: string;
  numero: number;
  armazem: string;
  descarmazem: string;
  familia: string;
  codfam: string;
  armazemstamp: string;
  data: Date;
  total: number;
  totalFisico: number;
  datalanc: Date;
  lancado: boolean;
  numinterno: string;
  ccusto: string;
  codccu: string;
  obs: string;
  divQutd: number;
  divTotal: number;
  totalquant: number;
  quantFisico: number;
  codsubfam: string;
  subfamilia: string;
  codmarca: number;
  marca: string;
  codfab: number;
  fabricante: string;
  modelo: string;
  endereco: string;
  coluna: string;
  rua: string;
  nivel: string;
  ivl: IVL[];
}

export interface IVL {
  ivlstamp: string;
  ivstamp: string;
  numdoc: number;
  sigla: string;
  referenc: string;
  descricao: string;
  quant: number;
  unidade: string;
  armazem: string;
  descarmazem: string;
  armazemstamp: string;
  preco: number;
  totall: number;
  status: boolean;
  servico: boolean;
  difer: number;
  nmovstk: boolean;
  remotestamp: string;
  tit: boolean;
  ordem: number;
  titstamp: string;
  lote: string;
  lotevalid: Date;
  lotelimft: Date;
  usalote: boolean;
  coluna: string;
  rua: string;
  nivel: string;
  ststamp: string;
  obs: string;
  qtdfisica: number;
  totalfisic: number;
  divQutd: number;
  divTotal: number;
  acuracidade: number;
  classificador: string;
  danificadoComp: number;
  danificadparcial: number;
  validadevenc: number;
  validadePorvenc: number;
  iV: IV;
  mstk: Mstk[];
  ivStimg: IvStimg[];
}

export interface IvStimg {
  ivStimgstamp: string;
  ivlstamp: string;
  tipodoc: boolean;
  licstamp: string;
  anexo: File[];
  documento: string;
  obs: string;
  ivl: IVL;
}

export interface Laranja {
  laranjastamp: string;
  codigo: number;
  descricao: string;
}

export interface Lcont {
  lcontstamp: string;
  dinome: string;
  dilno: number;
  docnome: string;
  adoc: string;
  data: Date;
  mes: number;
  dia: number;
  dino: number;
  doctipo: number;
  debana: number;
  debord: number;
  debfin: number;
  creana: number;
  creord: number;
  crefin: number;
  edebana: number;
  edebord: number;
  edebfin: number;
  ecreana: number;
  ecreord: number;
  ecrefin: number;
  memissao: string;
  oristamp: string;
  ncont: string;
  ano: number;
  cambio: number;
  docno: number;
  moeda2: string;
  moeda: string;
  apuraiva: boolean;
  apurares: boolean;
  diariostamp: string;
  lancamentoInicial: boolean;
  descritivo: string;
  ml: Ml[];
}

export interface Ls {
  lsstamp: string;
  descricao: string;
}

export interface LsLic {
  empresa: string;
  sigla: string;
  morada: string;
  trial: boolean;
  limitTrial: number;
  fullic: boolean;
  ges: boolean;
  cT: boolean;
  ctData: Date;
  ctval: Date;
  pOSR: boolean;
  gF: boolean;
  pOSM: boolean;
  flex: boolean;
  cRM: boolean;
  rHS: boolean;
  rhval: Date;
  rhdata: Date;
  aC: boolean;
  hT: boolean;
  fT: boolean;
  pJ: boolean;
  pRC: boolean;
  iMB: boolean;
  nUIT: number;
  uGes: number;
  uCt: number;
  uRh: number;
  hPS: boolean;
  uHP: number;
  hPdata: Date;
  hPval: Date;
  fulllicval: Date;
  fulllicdata: Date;
  demoVal: Date;
  demodata: Date;
  tecval: Date;
  tecdata: Date;
  din: string;
  tec: boolean;
  demo: boolean;
  anual: boolean;
  limitDemo: number;
  limitTec: number;
  memp: boolean;
  encripted: boolean;
}

export interface Maquina {
  maquinastamp: string;
  codigo: string;
  descricao: string;
  status: string;
  numero: string;
  iMEI: string;
}

export interface Marcacao {
  marcacaostamp: string;
  clstamp: string;
  no: string;
  nome: string;
  pestamp: string;
  no2: string;
  nome2: string;
  categ: string;
  codCateg: string;
  numero: string;
  procedimentostamp: string;
  descProcedimento: string;
  valorProcedimento: number;
  data: Date;
  hora: Date;
  horaini: Date;
  horafim: Date;
  horaentrada: Date;
  horasaida: Date;
  obs: string;
  retorno: boolean;
  ccustamp: string;
  quempagastamp: string;
  ccusto: string;
  quempaga: string;
  status: string;
  atendido: boolean;
  subtotal: number;
  perdesc: number;
  perdescfin: number;
  desconto: number;
  descontofin: number;
  mDescontofin: number;
  totaliva: number;
  total: number;
  msubtotal: number;
  mdesconto: number;
  mtotaliva: number;
  mtotal: number;
  fechado: boolean;
  ematendimento: boolean;
  anulado: boolean;
  cl: Cl;
  marcacaol: Marcacaol[];
  processoClinico: ProcessoClinico[];
}

export interface Marcacaol {
  marcacaolstamp: string;
  marcacaostamp: string;
  ststamp: string;
  entidadestamp: string;
  numdoc: number;
  sigla: string;
  ref: string;
  descricao: string;
  quant: number;
  unidade: string;
  armazem: number;
  preco: number;
  mpreco: number;
  tabiva: number;
  txiva: number;
  valival: number;
  mvalival: number;
  ivainc: boolean;
  factura: boolean;
  activo: boolean;
  perdesc: number;
  descontol: number;
  mdescontol: number;
  subtotall: number;
  msubtotall: number;
  totall: number;
  mtotall: number;
  status: boolean;
  lotevalid: Date;
  lotelimft: Date;
  usalote: boolean;
  lote: string;
  obs: string;
  servico: boolean;
  oristampl: string;
  dispon: number;
  qttOrig: number;
  nmovstk: boolean;
  oristamp: string;
  tit: boolean;
  ordem: number;
  stkprod: boolean;
  lineAnulado: boolean;
  titstamp: string;
  contatz: number;
  pack: number;
  cpoc: number;
  cpoo: number;
  composto: boolean;
  descarm: string;
  refornec: string;
  usaquant2: boolean;
  quant2: number;
  morada: string;
  telefone: string;
  entrega: boolean;
  dataentrega: Date;
  pcontacto: string;
  email: string;
  pais: string;
  guias: string;
  contrato: string;
  gasoleo: boolean;
  cambiousd: number;
  moeda: string;
  moeda2: string;
  ccusto: string;
  codccu: string;
  armazemstamp: string;
  codigobarras: string;
  stRefFncCodstamp: string;
  campomultiuso: string;
  precoPromo: number;
  fact: Marcacao;
}

export interface Mat {
  matriculastamp: string;
  clstamp: string;
  descricao: string;
  numero: string;
  no: number;
  nome: string;
  curso: string;
  codcurso: string;
  datamat: Date;
  turno: string;
  periodo: string;
  turma: string;
  codtur: string;
  anolect: string;
  localmat: string;
  emails: string;
  obs: string;
  matdisc: Matdisc[];
}

export interface Matdisc {
  matdiscstamp: string;
  matstamp: string;
  coddisc: string;
  disc: string;
  mat: Mat;
}

export interface MatriculaAluno {
  matriculaAlunostamp: string;
  planopagstamp: string;
  numero: number;
  numdoc: number;
  codigo: string;
  refonecedor: string;
  anolectivo: number;
  descplano: number;
  datapartida: Date;
  cursostamp: string;
  data: Date;
  anoSemstamp: string;
  clstamp: string;
  descricao: string;
  sitcao: string;
  no: number;
  nome: string;
  curso: string;
  codcurso: string;
  datamat: Date;
  turno: string;
  periodo: string;
  anoSem: string;
  codtur: string;
  anolect: string;
  localmat: string;
  emails: string;
  obs: string;
  gradestamp: string;
  descGrade: string;
  etapa: string;
  turmadiscstamp: string;
  ststamp: string;
  turmastamp: string;
  turnostamp: string;
  codfac: string;
  alauxiliarstamp: string;
  semstamp: string;
  nivelac: string;
  formaingresso: string;
  ccusto: string;
  ccustostamp: string;
  coddep: string;
  departamento: string;
  faculdade: string;
  descanoaem: string;
  tipo: string;
  activo: boolean;
  motivo: string;
  matriculaTurmaAlunol: MatriculaTurmaAlunol[];
  disciplinaTumra: DisciplinaTumra[];
  matdisc: Matdisc[];
  inscricao: boolean;
  matricula: boolean;
  nomedoc: string;
}

export interface MatriculaTurmaAlunol {
  matriculaTurmaAlunolstamp: string;
  matriculaAlunostamp: string;
  codigo: string;
  descricao: string;
  anoSemstamp: string;
  descanoaem: string;
  descurso: string;
  cursostamp: string;
  descgrade: string;
  gradestamp: string;
  etapa: string;
  sala: string;
  turno: string;
  vagasmin: number;
  vagasmax: number;
  responsavel: string;
  responsavel2: string;
  semanaslec: number;
  horasaulas: number;
  formaaval: string;
  situacao: string;
  obs: string;
  datain: Date;
  datafim: Date;
  horain: Date;
  horafim: Date;
  turmastamp: string;
  turmadiscstamp: string;
  padrao: boolean;
  matriculaAluno: MatriculaAluno;
}

export interface Mesas {
  mesasstamp: string;
  descricao: string;
  imagem: File[];
  topImg: number;
  leftImg: number;
  obs: string;
  codigo: string;
  status: boolean;
}

export interface Mescont {
  mescontstamp: string;
  codigo: string;
  nomemes: string;
  mes: string;
}

export interface Meses {
  mesesstamp: string;
  descricao: string;
  codigo: number;
  tipo: string;
  codtipo: number;
}

export interface Ml {
  mlstamp: string;
  dinome: string;
  dilno: number;
  docnome: string;
  adoc: string;
  data: Date;
  mes: number;
  dia: number;
  ano: number;
  conta: string;
  descricao: string;
  rubrica: string;
  deb: number;
  cre: number;
  edeb: number;
  ecre: number;
  dino: number;
  descritivo: string;
  docno: number;
  doctipo: number;
  ordem: number;
  lcontstamp: string;
  origem: string;
  oristamp: string;
  oristampl: string;
  obs: string;
  cambio: number;
  moeda2: string;
  moeda: string;
  ccusto: string;
  codccu: string;
  pgcstamp: string;
  processado: boolean;
  apuraiva: boolean;
  apurares: boolean;
  lancamentoInicial: boolean;
  lcont: Lcont;
}

export interface Modulos {
  modulosstamp: string;
  codigo: number;
  descricao: string;
  obs: string;
  modulosfrmdoc: Modulosfrmdoc[];
}

export interface Modulosfrmdoc {
  modulosfrmdocstamp: string;
  modulosstamp: string;
  sigla: string;
  descricao: string;
  ecran: string;
  origem: string;
  obs: string;
  isdoc: boolean;
  oristamp: string;
  modulos: Modulos;
}

export interface Moedas {
  moedasstamp: string;
  moeda: string;
  descricao: string;
  pais: string;
  princip: boolean;
}

export interface Motorista {
  motoristastamp: string;
  no: number;
  nome: string;
  motoristal: Motoristal[];
}

export interface Motoristal {
  motoristalstamp: string;
  motoristastamp: string;
  codigo: number;
  descricao: string;
  motorista: Motorista;
}

export interface Mov {
  conta: string;
  design: string;
  descr: string;
  debito: number;
  credito: number;
  noDiario: number;
  diario: string;
  doc: string;
  noDoc: string;
  numero: string;
  nuit: string;
  edebito: string;
  ecredito: string;
  nomedoc: string;
  numdoc: number;
  docstamp: string;
  doclstamp: string;
  moeda: string;
  moeda2: string;
  cambio: number;
  datadoc: Date;
  nrLacamento: number;
  oristampl: string;
  pgcstamp: string;
}

export interface Mstk {
  mstkstamp: string;
  oristamp: string;
  stampcab: string;
  ststamp: string;
  entidadestamp: string;
  origem: string;
  data: Date;
  tipodoc: string;
  nrdoc: string;
  documento: string;
  numdoc: number;
  ref: string;
  descricao: string;
  entrada: number;
  saida: number;
  vendido: number;
  vendidosaida: number;
  comparado: number;
  comparadoentrada: number;
  reserva: number;
  reservasaida: number;
  encomenda: number;
  encomendaentrada: number;
  codarm: number;
  preco: number;
  moeda: string;
  entidade: number;
  no: string;
  nome: string;
  datahora: Date;
  lote: string;
  codmovstk: number;
  descmovstk: string;
  numinterno: string;
  factstamp: string;
  faccstamp: string;
  distamp: string;
  ivstamp: string;
  factlstamp: string;
  facclstamp: string;
  dilstamp: string;
  ivlstamp: string;
  turno: string;
  vendedor: string;
  codvend: number;
  serie: string;
  ivainc: boolean;
  tabiva: number;
  txiva: number;
  preco2: number;
  preco3: number;
  lotevalid: Date;
  lotelimft: Date;
  usalote: boolean;
  qttmedida: number;
  totalmedida: number;
  ccusto: string;
  codccu: string;
  unidade: string;
  armazemstamp: string;
  ccustamp: string;
  usrstamp: string;
  codigobarras: string;
  stRefFncCodstamp: string;
  campomultiuso: string;
  factl: Factl;
  dil: Dil;
  faccl: Faccl;
  iVL: IVL;
}

export interface Mvt {
  mvtstamp: string;
  datamov: Date;
  origem: string;
  oristamp: string;
  entrada: number;
  saida: number;
  local: string;
  codlocal: number;
  documento: string;
  titulo: string;
  numtitulo: string;
  dprocess: Date;
  process: boolean;
  nrdoc: string;
  moeda: string;
  descricao: string;
  numeracao: number;
  saldo: number;
  reconc: boolean;
  extcontastamp: string;
  extracto: string;
  banco: string;
  ccusto: string;
  contatz: number;
  referenc: string;
  formaspstamp: string;
  tipomov: number;
  mentrada: number;
  msaida: number;
  numcaixa: number;
  datcaixa: Date;
  fechado: boolean;
  inicial: number;
  numero: string;
  codmovtz: number;
  descmovtz: string;
  usrLogin: string;
  contasstamp: string;
  aberturaCaixa: boolean;
  ccustamp: string;
  formasp: Formasp;
  caixalstamp: string;
  caixastamp: string;
}

export interface Numdocs {
  numdocsstamp: string;
  oristamp: string;
  sigla: string;
  cCusto: string;
  codccu: string;
  numero: number;
}

export interface Pad {
  padstamp: string;
  codpad: number;
  coddist: number;
  descricao: string;
  diststamp: string;
  dist: Dist;
}

export interface Paises {
  paisestamp: string;
  codigo: string;
  descricao: string;
}

export interface Param {
  paramstamp: string;
  codprod: string;
  imprimeMultDocumento: boolean;
  codprodMascra: string;
  vendeservico: boolean;
  ano: number;
  prodenum: boolean;
  ivcodentr: number;
  ivdescentr: string;
  ivcodsai: number;
  ivdescsai: string;
  usames: boolean;
  contmascara: string;
  mostranib: boolean;
  intervalo: number;
  fillvalue: boolean;
  mostraProdutoSemStock: boolean;
  excluemascara: boolean;
  diarioMesNum: boolean;
  diarioDiamesnum: boolean;
  diarioAnonum: boolean;
  criaContacc: boolean;
  usanumauto: boolean;
  nummascara: string;
  mascfact: string;
  radicalfact: string;
  actualizapreco: boolean;
  montanumero: boolean;
  tipooperacao: string;
  numImpressao: number;
  printfile: string;
  printfile2: string;
  mostraendereco: boolean;
  smtpserver: string;
  smtpport: number;
  outgoingemail: string;
  outgoingpassword: string;
  subjemail: string;
  emailtext: string;
  autoprecos: boolean;
  perlucro: number;
  anoref: number;
  localrdlc: boolean;
  usalocalreport: boolean;
  criacl: boolean;
  criafnc: boolean;
  criast: boolean;
  criacontas: boolean;
  criacontasprazo: boolean;
  criape: boolean;
  ivaposdesconto: boolean;
  contaIrps: string;
  contaIrpsdesc: string;
  contaiva85: string;
  contaiva85desc: string;
  naomostradatain: boolean;
  naomostradatater: boolean;
  naomostraduracao: boolean;
  naomostrasequencia: boolean;
  poObrigatorio: boolean;
  pjFechoautomatico: boolean;
  taxaInsspe: number;
  taxaInssemp: number;
  diastrab: number;
  ponaorepete: boolean;
  modeloja: boolean;
  integracaoautomatica: boolean;
  aredondamento: number;
  posicao: number;
  totalinteiro: boolean;
  mostraccusto: boolean;
  integradocs: boolean;
  obrigaNc: boolean;
  codsrc: string;
  codactivo: string;
  duodessimos: boolean;
  depmensais: boolean;
  esconderef: boolean;
  escondestock: boolean;
  escondecolprecos: boolean;
  preconormal: string;
  ecranPosPequeno: boolean;
  mostrarefornec: boolean;
  naoaredonda: boolean;
  horastrab: number;
  obrigaBi: boolean;
  segundavia: boolean;
  mostraTodasContas: boolean;
  paramImp: ParamImp[];
  paramgct: Paramgct[];
  parampv: Parampv[];
  paramemail: Paramemail[];
  origem: number;
  geraGuiaAutomatica: boolean;
  anolectivo: number;
  anoSem: string;
  mascaracl: string;
  usacademia: boolean;
  dispensa: boolean;
  exclui: boolean;
  matriculaComCCaberto: boolean;
  removematricula: boolean;
  naoverificaNuit: boolean;
  emailRespo: string;
  modulos: number;
  permiteApagarPos: boolean;
  usaMultRefereciaSt: boolean;
  usaLotes: boolean;
  campomultiuso: string;
}

export interface Paramac {
  paramacstamp: string;
  anoLectivo: string;
}

export interface Paramemail {
  paramemailstamp: string;
  paramstamp: string;
  login: string;
  email: string;
  nome: string;
  codtipo: number;
  tipo: string;
  param: Param;
}

export interface Paramgct {
  paramgctstamp: string;
  paramstamp: string;
  grupo: string;
  descricao: string;
  mascara: string;
  padrao: boolean;
  codtipo: number;
  tipo: string;
  param: Param;
}

export interface ParamImp {
  paramImpstamp: string;
  paramstamp: string;
  pos: string;
  normal1: string;
  normal2: string;
  ccusto: string;
  codccu: string;
  padrao: boolean;
  param: Param;
}

export interface Parampv {
  parampvstamp: string;
  paramstamp: string;
  valor: number;
  factor: number;
  param: Param;
}

export interface Part {
  partstamp: string;
  codigo: number;
  descricao: string;
  padrao: boolean;
}

export interface Pe {
  pestamp: string;
  no: string;
  nome: string;
  nuit: number;
  bi: string;
  codsit: number;
  situacao: string;
  datanasc: Date;
  dataAdmissao: Date;
  dataFimContrato: Date;
  dataDemissao: Date;
  sexo: string;
  ecivil: string;
  dcasa: Date;
  foto: File[];
  nacional: string;
  pais: string;
  provNasc: string;
  distNasc: string;
  padNasc: string;
  bairro: string;
  provMorada: string;
  distMorada: string;
  padMorada: string;
  locali: string;
  pai: string;
  mae: string;
  codNivel: number;
  nivel: string;
  codCateg: number;
  categ: string;
  codprof: number;
  prof: string;
  codep: number;
  depart: string;
  codrep: number;
  repart: string;
  nrinss: string;
  balcaoInss: string;
  dataInss: Date;
  relPonto: boolean;
  valBasico: number;
  horasdia: number;
  nrdepend: number;
  obs: string;
  codtipo: string;
  tipo: string;
  codccu: string;
  cCusto: string;
  ccustamp: string;
  diasmes: number;
  horasSemana: number;
  salHora: number;
  tabIrps: string;
  codRepFinancas: string;
  descRepFinancas: string;
  apolice: string;
  dataApoliceIn: Date;
  dataApoliceTer: Date;
  seguradora: string;
  moeda: string;
  naoInss: boolean;
  naoIRPS: boolean;
  tirpsstamp: string;
  ntabelado: boolean;
  pontonome: string;
  formapag: string;
  campomultiuso: string;
  codformp: number;
  dataadm: Date;
  reDataadm: Date;
  basedia: number;
  totalPacientesDia: number;
  pedagogico: boolean;
  coordenador: boolean;
  pefalta: Pefalta[];
  pehextra: Pehextra[];
  pedoc: Pedoc[];
  peling: Peling[];
  pecont: Pecont[];
  pefam: Pefam[];
  pesind: Pesind[];
  pecontra: Pecontra[];
  pebanc: Pebanc[];
  pefer: Pefer[];
  pesub: Pesub[];
  pedesc: Pedesc[];
  peForm: PeForm[];
  peaus: Peaus[];
  peacidente: Peacidente[];
  pect: Pect[];
  pefunc: Pefunc[];
  pedisc: Pedisc[];
  peSalbase: PeSalbase[];
  distribuicaoTurno: DistribuicaoTurno[];
}

export interface Peacidente {
  peacidentestamp: string;
  pestamp: string;
  data: Date;
  tipoAcidente: string;
  localAcidente: string;
  hospitalizacao: boolean;
  mortal: boolean;
  incapacidade: string;
  ausencia: string;
  dataInicio: Date;
  dataFim: Date;
  obs: string;
  pe: Pe;
}

export interface Peaus {
  peausstamp: string;
  pestamp: string;
  descricao: string;
  datain: Date;
  datater: Date;
  processa: boolean;
  cancelada: boolean;
  pe: Pe;
}

export interface Peaux {
  peauxstamp: string;
  codigo: number;
  descricao: string;
  tabela: number;
  desctabela: string;
  padrao: boolean;
  obs: string;
}

export interface PeAuxiliar {
  peAuxiliarstamp: string;
  codigo: number;
  descricao: string;
  tabela: number;
  desctabela: string;
  padrao: boolean;
  obs: string;
}

export interface Pebanc {
  pebancstamp: string;
  nome: string;
  sigla: string;
  conta: number;
  nib: string;
  swift: string;
  padrao: boolean;
  obs: string;
  pestamp: string;
  pe: Pe;
}

export interface Pecc {
  peccstamp: string;
  origem: string;
  oristamp: string;
  nrdoc: number;
  no: string;
  nome: string;
  data: Date;
  vencim: Date;
  debito: number;
  debitom: number;
  debitof: number;
  debitofm: number;
  credito: number;
  creditom: number;
  creditof: number;
  creditofm: number;
  documento: string;
  moeda: string;
  saldo: number;
  cambiousd: number;
  codmov: number;
  prcstamp: string;
  perclstamp: string;
  ccusto: string;
  numinterno: string;
  estabno: number;
  estabnome: string;
  rcladiant: boolean;
  pestamp: string;
  prc: Prc;
  percl: Percl;
}

export interface Pecont {
  pecontstamp: string;
  contacto: string;
  email: boolean;
  pestamp: string;
  padrao: boolean;
  pe: Pe;
}

export interface Pecontra {
  pecontrastamp: string;
  pestamp: string;
  codigo: string;
  descricao: string;
  tipo: number;
  inicio: Date;
  termino: Date;
  estado: boolean;
  anexo: File[];
  pe: Pe;
}

export interface Pect {
  pectstamp: string;
  pestamp: string;
  conta: string;
  descgrupo: string;
  contacc: boolean;
  movIntegra: boolean;
  pe: Pe;
}

export interface Pedesc {
  pedescstamp: string;
  codigo: string;
  descricao: string;
  valor: number;
  tipo: number;
  tipodesc: number;
  pestamp: string;
  datain: Date;
  datafim: Date;
  excluiProc: boolean;
  pe: Pe;
}

export interface Pedisc {
  pediscstamp: string;
  disciplina: string;
  sigla: string;
  pestamp: string;
  ststamp: string;
  pe: Pe;
}

export interface Pedoc {
  pedocstamp: string;
  documento: string;
  numero: string;
  local: string;
  emissao: Date;
  validade: Date;
  pestamp: string;
  anexo: File[];
  bi: boolean;
  pe: Pe;
}

export interface Peemp {
  peempstamp: string;
  codigo: number;
  valor: number;
  no: number;
  nome: string;
  data: Date;
  mesin: string;
  numprest: number;
  devsal: boolean;
  devolvido: boolean;
  pestamp: string;
  obs: string;
  codmes: number;
  saldo: number;
  ano: number;
  moeda: string;
  banco: string;
  contatesoura: string;
  titulo: string;
  numtitulo: string;
  peempl: Peempl[];
}

export interface Peempcc {
  peempccstamp: string;
  codigo: number;
  valor: number;
  ano: number;
  nummes: number;
  mes: string;
  nrdoc: number;
  no: number;
  nome: string;
  data: Date;
  vencim: Date;
  debito: number;
  debitom: number;
  debitof: number;
  debitofm: number;
  credito: number;
  creditom: number;
  creditof: number;
  creditofm: number;
  peemplstamp: string;
  prcstamp: string;
  origem: string;
  oristamp: string;
  documento: string;
  moeda: string;
  ccusto: string;
  codmov: number;
  empdevstamp: string;
  prcempstamp: string;
  peempl: Peempl;
}

export interface Peempl {
  peemplstamp: string;
  codigo: number;
  valor: number;
  mespagar: string;
  ano: number;
  nummes: number;
  pago: number;
  ultdevol: Date;
  saldo: number;
  devolvido: boolean;
  peempstamp: string;
  no: number;
  nome: string;
  data: Date;
  nrdoc: number;
  moeda: string;
  banco: string;
  contatesoura: string;
  titulo: string;
  numtitulo: string;
  codtz: number;
  peemp: Peemp;
  peempcc: Peempcc[];
}

export interface Pefalta {
  pefaltastamp: string;
  descricao: string;
  codigo: string;
  data: Date;
  excluiProc: boolean;
  excluiEstat: boolean;
  descontaVenc: boolean;
  descontaRem: boolean;
  numPeriodoProcessado: number;
  valorDescontado: number;
  anoProcessado: number;
  numProc: number;
  descontaSubsTurno: boolean;
  subAlimProporcional: boolean;
  horas: number;
  injustificada: number;
  justificada: number;
  total: number;
  processado: boolean;
  obs: string;
  docjustifica: File[];
  pestamp: string;
  processtamp: string;
  prcstamp: string;
  pe: Pe;
  dataProc: Date;
}

export interface Pefam {
  pefamstamp: string;
  nome: string;
  grau: string;
  tel: string;
  email: string;
  morada: string;
  obs: string;
  pestamp: string;
  pe: Pe;
}

export interface Pefer {
  peferstamp: string;
  pestamp: string;
  descricao: string;
  inicio: Date;
  termino: Date;
  dias: number;
  ano: number;
  estado: boolean;
  diasDireito: string;
  diasAdicionais: string;
  diasAnoAnterior: string;
  totalDias: string;
  diasPorGozar: string;
  diasJaGozados: string;
  diasPorMarcar: string;
  diasFeriasJaPagas: string;
  periodosFerias: string;
  funcSemFerias: boolean;
  diasAdicionaisAntig: string;
  diasAdicionaisAssid: string;
  diasAdicionaisIdade: string;
  diasAntecipados: string;
  pe: Pe;
}

export interface Peferias {
  peferiasstamp: string;
  pestamp: string;
  descricao: string;
  inicio: Date;
  termino: Date;
  dias: number;
  ano: number;
  estado: boolean;
  status: boolean;
  pe: Pe;
}

export interface PeForm {
  peformstamp: string;
  curso: string;
  tipo: string;
  instituicao: string;
  nivel: string;
  dataIn: Date;
  datafim: Date;
  duracao: string;
  pestamp: string;
  codpais: string;
  pais: string;
  anofreq: string;
  pe: Pe;
}

export interface Pefunc {
  pefuncstamp: string;
  funcao: string;
  tipo: string;
  local: string;
  dataIn: Date;
  datafim: Date;
  pestamp: string;
  pe: Pe;
}

export interface Pehextra {
  pehextrastamp: string;
  pestamp: string;
  descricao: string;
  codigo: string;
  data: Date;
  horas: number;
  valor: number;
  valorProc: number;
  tipo: number;
  processado: boolean;
  excluiProc: boolean;
  dataProc: Date;
  numPeriodoProcessado: number;
  anoProcessado: number;
  numProc: number;
  obs: string;
  processtamp: string;
  prcstamp: string;
  pe: Pe;
}

export interface Peling {
  pelingstamp: string;
  lingua: string;
  fala: string;
  leitura: string;
  escrita: string;
  compreecao: string;
  materna: boolean;
  pestamp: string;
  pe: Pe;
}

export interface Percl {
  perclstamp: string;
  pestamp: string;
  numero: number;
  tPerclstamp: string;
  data: Date;
  nuit: number;
  morada: string;
  localidade: string;
  no: string;
  nome: string;
  moeda: string;
  banco: string;
  total: number;
  mtotal: number;
  process: boolean;
  dprocess: Date;
  ccusto: string;
  numdoc: number;
  sigla: string;
  nomedoc: string;
  codmovcc: number;
  descmovcc: string;
  codmovtz: number;
  descmovtz: string;
  nomecomerc: string;
  integra: boolean;
  nodiario: number;
  diario: string;
  ndocCont: number;
  descDocCont: string;
  estabno: number;
  estabnome: string;
  cambiousd: number;
  moeda2: string;
  especial: boolean;
  pjno: number;
  pjstamp: string;
  processtamp: string;
  pjNome: string;
  obs: string;
  totalAbonos: number;
  totalDescontos: number;
  anulado: boolean;
  rcladiant: boolean;
  usrstamp: string;
  ccustamp: string;
  pecc: Pecc[];
  formasp: Formasp[];
  percll: Percll[];
}

export interface Percll {
  percllstamp: string;
  perclstamp: string;
  pccstamp: string;
  data: Date;
  nrdoc: string;
  descricao: string;
  valorpreg: number;
  valordoc: number;
  valorreg: number;
  valorPend: number;
  mvalorPend: number;
  anulado: boolean;
  numinterno: string;
  origem: string;
  mvalorpreg: number;
  mvalorreg: number;
  rcladiant: boolean;
  percl: Percl;
}

export interface Peri {
  peristamp: string;
  codigo: string;
  descricao: string;
  inicio: Date;
  fim: Date;
  concluido: boolean;
  pericur: Pericur[];
}

export interface Pericur {
  pericurstamp: string;
  peristamp: string;
  codigo: string;
  descricao: string;
  nivel: string;
  tipo: string;
  status: string;
  descperiodo: string;
  anolect: string;
  peri: Peri;
  pericursem: Pericursem[];
}

export interface Pericursem {
  pericursemstamp: string;
  pericurstamp: string;
  codigo: string;
  descricao: string;
  obs: string;
  pericur: Pericur;
  pericursemtur: Pericursemtur[];
}

export interface Pericursemtur {
  pericursemturstamp: string;
  pericursemstamp: string;
  pericurstamp: string;
  codigo: string;
  descricao: string;
  turclasse: string;
  obs: string;
  sala: string;
  pericursem: Pericursem;
}

export interface PeSalbase {
  peSalbasestamp: string;
  pestamp: string;
  mes: string;
  mesesstamp: string;
  datalanc: Date;
  nrhoras: number;
  salHora: number;
  valBasico: number;
  usrstamp: string;
}

export interface Pesind {
  pesindstamp: string;
  descricao: string;
  numero: string;
  perc: number;
  valor: number;
  obs: string;
  pestamp: string;
  pe: Pe;
}

export interface Pesub {
  pesubstamp: string;
  codigo: string;
  descricao: string;
  valor: number;
  tipo: number;
  tiposub: number;
  pestamp: string;
  datain: Date;
  datafim: Date;
  excluiProc: boolean;
  pe: Pe;
}

export interface Petur {
  peturstamp: string;
  pestamp: string;
  codturma: string;
  descricao: string;
  semestre: string;
  disciplina: string;
  anolect: string;
  pe: Pe;
}

export interface Pgc {
  pgcstamp: string;
  conta: string;
  descricao: string;
  ncont: string;
  obs: string;
  codis: string;
  oristamp: string;
  integracao: boolean;
  contaiva: string;
  codiva: number;
  codiva2: number;
  taxaiva: number;
  udata: Date;
  ppconta: string;
  ano: number;
  criadanoano: boolean;
  dedutivel: boolean;
  liquidado: boolean;
  moviva: boolean;
  activo: boolean;
  numero: number;
  moeda: string;
}

export interface Pgcsa {
  pgcsastamp: string;
  pgcstamp: string;
  conta: string;
  ano: number;
  mes: number;
  deb: number;
  cre: number;
  pgc: Pgc;
}

export interface Pgf {
  pgfstamp: string;
  numero: string;
  data: Date;
  no: string;
  nome: string;
  moeda: string;
  nuit: number;
  morada: string;
  localidade: string;
  banco: string;
  total: number;
  mtotal: number;
  obs: string;
  process: boolean;
  dprocess: Date;
  anulado: boolean;
  ccusto: string;
  nrFornec: string;
  numdoc: number;
  sigla: string;
  tpgfstamp: string;
  nomedoc: string;
  codmovcc: number;
  descmovcc: string;
  integra: boolean;
  nodiario: number;
  diario: string;
  ndocCont: number;
  descDocCont: string;
  cambiousd: number;
  moeda2: string;
  pjno: number;
  pjstamp: string;
  pjNome: string;
  fncstamp: string;
  descontofin: number;
  mDescontofin: number;
  perdescfin: number;
  rcladiant: boolean;
  usrstamp: string;
  ccustamp: string;
  refornec: string;
  fcc: Fcc[];
  formasp: Formasp[];
  pgfl: Pgfl[];
  codmovtz: number;
  descmovtz: string;
}

export interface Pgfl {
  pgflstamp: string;
  pgfstamp: string;
  fccstamp: string;
  nrdoc: number;
  valorpreg: number;
  valorreg: number;
  status: boolean;
  data: Date;
  descricao: string;
  numinterno: string;
  origem: string;
  mvalorpreg: number;
  mvalorreg: number;
  valorPend: number;
  mvalorPend: number;
  valordoc: number;
  mValordoc: number;
  anulado: boolean;
  cambiousd: number;
  descontofin: number;
  mDescontofin: number;
  perdescfin: number;
  rcladiant: boolean;
  pgf: Pgf;
}

export interface Pj {
  pjstamp: string;
  numdoc: string;
  nomedoc: string;
  sigla: string;
  tdocpjstamp: string;
  codigo: number;
  data: Date;
  datfim: Date;
  dias: number;
  no: string;
  nome: string;
  clstamp: string;
  descricao: string;
  tcusto: number;
  trecebido: number;
  tpago: number;
  orc: number;
  adenda: number;
  adendaper: number;
  totComp: number;
  totft: number;
  totGi: number;
  lucro: number;
  totftIva: number;
  totCompIva: number;
  obs: string;
  pcontact: string;
  tcontact: string;
  ccusto: string;
  codccu: string;
  ccudesc: string;
  status: string;
  codprov: number;
  ccustamp: string;
  prov: string;
  coddist: number;
  dist: string;
  endereco: string;
  subtotal: number;
  desconto: number;
  totaliva: number;
  total: number;
  po: string;
  morada: string;
  contrato: string;
  empfiscal: string;
  localentrega: string;
  localpartida: string;
  fechado: boolean;
  fechadodata: Date;
  cambiousd: number;
  msubtotal: number;
  mdesconto: number;
  mtotaliva: number;
  mtotal: number;
  moeda: string;
  moeda2: string;
  pjpe: Pjpe[];
  pjdepart: Pjdepart[];
  pjclpe: Pjclpe[];
  pjesc: Pjesc[];
  pjdoc: Pjdoc[];
  pjAudit: PjAudit[];
}

export interface PjAudit {
  pjauditstamp: string;
  pjstamp: string;
  descricao: string;
  data: Date;
  comprado: number;
  vendido: number;
  interno: number;
  login: string;
  pj: Pj;
}

export interface Pjclpe {
  pjclpestamp: string;
  pjstamp: string;
  no: string;
  nome: string;
  funcao: string;
  telefone: string;
  email: string;
  pj: Pj;
}

export interface Pjdepart {
  pjdepartstamp: string;
  pjstamp: string;
  codigo: string;
  descricao: string;
  resp: string;
  pj: Pj;
}

export interface Pjdoc {
  pjdocstamp: string;
  pjstamp: string;
  descricao: string;
  anexo: File[];
  doclc: boolean;
  pj: Pj;
}

export interface Pjesc {
  pjescstamp: string;
  pjstamp: string;
  descricao: string;
  classificador: string;
  duracao: number;
  predecedora: string;
  estado: string;
  sequenc: string;
  inicio: Date;
  termino: Date;
  ref: string;
  quant: number;
  unidade: string;
  armazem: number;
  preco: number;
  mpreco: number;
  tabiva: number;
  txiva: number;
  valival: number;
  perdesc: number;
  descontol: number;
  subtotall: number;
  oristampl: string;
  oristamp: string;
  descarm: string;
  no: string;
  nome: string;
  totall: number;
  executado: boolean;
  ivainc: boolean;
  servico: boolean;
  encerrado: boolean;
  factura: boolean;
  adenda: boolean;
  subContrada: boolean;
  ordem: number;
  cambiousd: number;
  moeda: string;
  moeda2: string;
  mvalival: number;
  mdescontol: number;
  msubtotall: number;
  mtotall: number;
  pj: Pj;
}

export interface Pjescl {
  pjesclstamp: string;
  pjescstamp: string;
  actividade: string;
  resp: string;
  inicio: Date;
  pretermino: Date;
  termino: Date;
  perc: number;
  factura: boolean;
  obs: string;
  pj: Pj;
}

export interface Pjpe {
  pjpestamp: string;
  pjstamp: string;
  no: number;
  nome: string;
  funcao: string;
  status: boolean;
  pj: Pj;
}

export interface PjRh {
  pjRhstamp: string;
  referencia: string;
  nome: string;
  funcao: string;
  custo: number;
  dataini: Date;
  dataFim: Date;
  dias: number;
  total: number;
  no: number;
  valBasico: number;
  pjstamp: string;
  pj: Pj;
}

export interface Pjvt {
  pjvtstamp: string;
  referenc: string;
  descricao: string;
  custo: number;
  quant: number;
  total: number;
  pjstamp: string;
  pj: Pj;
}

export interface Planoaval {
  planoavalstamp: string;
  codigo: string;
  descricao: string;
  anosem: string;
  anoSemstamp: string;
  formulademedia: string;
  formulademediafinal: string;
  dispensa: boolean;
  notadisp: number;
  nraval: number;
  exclui: boolean;
  planoavall: Planoavall[];
}

export interface Planoavall {
  planoavallstamp: string;
  planoavalstamp: string;
  notain: number;
  notafin: number;
  estado: string;
  descexamNrmal: string;
  descexamRecor: string;
  planoaval: Planoaval;
}

export interface Planobolsa {
  planobolsastamp: string;
  codigo: string;
  descricao: string;
  valor: number;
  perc: number;
  condicional: boolean;
  tipodesc: string;
  accao: string;
}

export interface PlanoFeria {
  planoFeriastamp: string;
  descricao: string;
  ano: number;
  dataplano: Date;
  codigo: number;
  cCusto: string;
  ccustamp: string;
  planogeral: boolean;
  planoFerial: PlanoFerial[];
}

export interface PlanoFerial {
  planoFerialstamp: string;
  planoFeriastamp: string;
  pestamp: string;
  nome: string;
  saldoferia: number;
  datain: Date;
  datater: Date;
  diasnaouteis: number;
  diasuteis: number;
  totaldias: number;
  anoref: number;
  diaslei: number;
  planoFeria: PlanoFeria;
}

export interface Planomulta {
  planomultastamp: string;
  codigo: string;
  descricao: string;
  anosem: string;
  anosemstamp: string;
  planomultal: Planomultal[];
}

export interface Planomultal {
  planomultalstamp: string;
  planomultastamp: string;
  valor: number;
  perc: number;
  dias: number;
  multadesc: string;
  usaperc: boolean;
  ordem: number;
  planomulta: Planomulta;
}

export interface Planopag {
  planopagstamp: string;
  codigo: string;
  descricao: string;
  parcelas: number;
  anosem: string;
  anolectivo: number;
  valor: number;
  valorextra: number;
  desconto: number;
  valorparzero: number;
  datapartida: Date;
  datafim: Date;
  diauteis: boolean;
  pularsabados: boolean;
  pulardomingos: boolean;
  pularferiados: boolean;
  tipo: number;
  distrato: boolean;
  valordistrato: number;
  diasvenc: number;
  tipoValdistrato: number;
  descdistrato: string;
  cursostamp: string;
  desccurso: string;
  descanosem: string;
  anoSemstamp: string;
  planopagp: Planopagp[];
  planopagt: Planopagt[];
}

export interface Planopagp {
  planopagpstamp: string;
  planopagstamp: string;
  ordem: number;
  descricao: string;
  data: Date;
  parecela: number;
  valorbruto: number;
  valordesc: number;
  valorextra: number;
  valordescextra: number;
  valorTotal: number;
  titulo: string;
  pzerro: boolean;
  planopag: Planopag;
}

export interface Planopagt {
  planopagtstamp: string;
  planopagstamp: string;
  codcurso: string;
  codturma: string;
  descturma: string;
  turmastamp: string;
  planopag: Planopag;
}

export interface Prc {
  prcstamp: string;
  processtamp: string;
  mes: number;
  ano: number;
  data: Date;
  no: string;
  nome: string;
  referenc: string;
  descricao: string;
  valor: number;
  taxa: number;
  fixo: boolean;
  quant: number;
  tipo: number;
  codsind: string;
  codsit: string;
  baseVencimento: number;
  totalVencimento: number;
  totalAbonus: number;
  totalDescontos: number;
  totalAliment: number;
  totalHextra: number;
  totalFaltas: number;
  totalSindicato: number;
  totalLiquido: number;
  obs: string;
  valEmp: number;
  totalSegSocEmp: number;
  totalSegSocfunc: number;
  departamento: string;
  totalIrps: number;
  diassal: string;
  periodo: string;
  segSocial: string;
  salarioHora: number;
  cCusto: string;
  ccustamp: string;
  contaEmpresa: string;
  tabIrps: string;
  salHoraHExtra: number;
  salHoraTurno: number;
  fundoPensao: number;
  diasPrc: number;
  moeda: string;
  cambio: number;
  cambioMoeda: string;
  cambioValor: number;
  tipoproces: string;
  linhatotal: boolean;
  alimentacao: boolean;
  ferias: boolean;
  pefaltastamp: string;
  pehextrastamp: string;
  totalEmprestimo: number;
  taxaSegSocial: number;
  totalSegSocial: number;
  obsinss: string;
  tipoEvento: string;
  pestamp: string;
  errosl: string;
  peSalbasestamp: string;
  mesesstamp: string;
  proces: Proces;
  pecc: Pecc[];
}

export interface ProcAnalFnc {
  procAnalFncstamp: string;
  procurmstamp: string;
  fncstamp: string;
  descricao: string;
  tipo: string;
  duracao: number;
  qual: number;
  estado: string;
  sequenc: string;
  inicio: Date;
  termino: Date;
  prazoEntrega: Date;
  email: string;
  ststamp: string;
  ref: string;
  quant: number;
  unidade: string;
  armazem: number;
  preco: number;
  mpreco: number;
  tabiva: number;
  txiva: number;
  valival: number;
  perdesc: number;
  descontol: number;
  subtotall: number;
  oristampl: string;
  oristamp: string;
  descarm: string;
  no: string;
  nome: string;
  totall: number;
  executado: boolean;
  ivainc: boolean;
  servico: boolean;
  encerrado: boolean;
  factura: boolean;
  adenda: boolean;
  subContrada: boolean;
  ordem: number;
  precoCompra: number;
  perc: number;
  procurm: Procurm;
}

export interface ProcCrt {
  procCrtstamp: string;
  procurmstamp: string;
  criterio: string;
  grau: string;
  avaliacao: string;
  procurm: Procurm;
}

export interface Procedimento {
  procedimentostamp: string;
  valor: number;
  tempo: number;
  obs: string;
  convenio: boolean;
  exame: boolean;
  descricao: string;
}

export interface Proces {
  processtamp: string;
  data: Date;
  mes: string;
  ano: number;
  descricao: string;
  cCusto: string;
  ccustamp: string;
  tipoproces: string;
  codigo: number;
  processado: number;
  ultproc: Date;
  nrmes: number;
  obs: string;
  periodo: string;
  totalSubsidio: number;
  totalBaseVencimento: number;
  totalDesconto: number;
  totalAliment: number;
  totalHextra: number;
  totalFaltas: number;
  totalSindicato: number;
  totalSegSocfunc: number;
  totalSegSocEmp: number;
  totalIrps: number;
  totalliquido: number;
  totalEmprestimo: number;
  erros: string;
  mesesstamp: string;
  prc: Prc[];
}

export interface ProcessoClinic {
  processoClinicstamp: string;
  numdoc: number;
  sigla: string;
  numero: number;
  data: Date;
  dataven: Date;
  no: string;
  nome: string;
  pestamp: string;
  tipo: number;
  processol: Processol[];
}

export interface ProcessoClinico {
  processoClinicostamp: string;
  marcacaostamp: string;
  dataConsulta: Date;
  queixaPrincipal: string;
  historicoClinico: string;
  diagnostico: string;
  prescricao: string;
  observacoes: string;
  proximoRetorno: Date;
  pestamp: string;
  nome: string;
  marcacao: Marcacao;
  equipaMedica: EquipaMedica[];
}

export interface Processol {
  processolstamp: string;
  processoClinicstamp: string;
  ref: string;
  descricao: string;
  datain: Date;
  datafim: Date;
  dias: number;
  processoClinic: ProcessoClinic;
}

export interface Procurm {
  procurmstamp: string;
  garanProv: string;
  numLote: string;
  clstamp: string;
  codigo: number;
  datini: Date;
  datfim: Date;
  dias: number;
  no: number;
  nome: string;
  email: string;
  horaabert: Date;
  descricao: string;
  classe: string;
  estado: boolean;
  datfecho: Date;
  tcusto: number;
  tRecebido: number;
  tPago: number;
  orc: number;
  adenda: number;
  adendaper: number;
  totorc: number;
  totComp: number;
  totft: number;
  totGI: number;
  totftper: number;
  totrec: number;
  totrecper: number;
  totprec: number;
  totprecper: number;
  totpft: number;
  totpftper: number;
  lucro: number;
  lucroper: number;
  lclProp: string;
  ugea: string;
  regime: string;
  modalidade: string;
  criter: string;
  ccusto: string;
  codccu: string;
  ccudesc: string;
  status: string;
  totpessoal: number;
  totvt: number;
  totProc: number;
  totcusto: number;
  codprov: number;
  prov: string;
  coddist: number;
  dist: string;
  endereco: string;
  procurml: Procurml[];
}

export interface Procurml {
  procurmlstamp: string;
  procurmstamp: string;
  descricao: string;
  tipo: string;
  duracao: number;
  fncstamp: string;
  qual: number;
  estado: string;
  sequenc: string;
  inicio: Date;
  termino: Date;
  prazoEntrega: Date;
  ref: string;
  quant: number;
  unidade: string;
  armazem: number;
  preco: number;
  mpreco: number;
  tabiva: number;
  txiva: number;
  valival: number;
  perdesc: number;
  descontol: number;
  subtotall: number;
  oristampl: string;
  oristamp: string;
  descarm: string;
  no: string;
  nome: string;
  email: string;
  totall: number;
  activo: boolean;
  ststamp: string;
  pjescstamp: string;
  cCusto: string;
  codCCu: string;
  entidadestamp: string;
  moeda: string;
  moeda2: string;
  cambiousd: number;
  mvalival: number;
  mdescontol: number;
  msubtotall: number;
  mtotall: number;
  executado: boolean;
  ivainc: boolean;
  servico: boolean;
  encerrado: boolean;
  factura: boolean;
  adenda: boolean;
  subContrada: boolean;
  ordem: number;
  precoCompra: number;
  perc: number;
  procurm: Procurm;
}

export interface Profiss {
  profissstamp: string;
  codigo: number;
  descricao: string;
}

export interface Prov {
  provstamp: string;
  codprov: number;
  descricao: string;
  dist: Dist[];
}

export interface Pv {
  pvstamp: string;
  codigo: number;
  descricao: string;
  cx: string;
  codCaixa: number;
}

export interface RCL {
  rclstamp: string;
  numero: string;
  tRclstamp: string;
  data: Date;
  nuit: number;
  morada: string;
  localidade: string;
  no: string;
  nome: string;
  moeda: string;
  banco: string;
  total: number;
  mtotal: number;
  obs: string;
  process: boolean;
  rcladiant: boolean;
  dprocess: Date;
  anulado: boolean;
  ccusto: string;
  numdoc: number;
  sigla: string;
  nomedoc: string;
  codmovcc: number;
  descmovcc: string;
  codmovtz: number;
  descmovtz: string;
  nomecomerc: string;
  integra: boolean;
  nodiario: number;
  diario: string;
  ndocCont: number;
  descDocCont: string;
  estabno: number;
  estabnome: string;
  cambiousd: number;
  moeda2: string;
  especial: boolean;
  pjno: number;
  pjstamp: string;
  clstamp: string;
  pjNome: string;
  desccurso: string;
  descontofin: number;
  mDescontofin: number;
  perdescfin: number;
  usrstamp: string;
  ccustamp: string;
  pos: boolean;
  cursostamp: string;
  turmastamp: string;
  descturma: string;
  anosem: string;
  etapa: string;
  cc: Cc[];
  formasp: Formasp[];
  rcll: Rcll[];
}

export interface Rcll {
  rcllstamp: string;
  rclstamp: string;
  ccstamp: string;
  data: Date;
  nrdoc: string;
  descricao: string;
  valorpreg: number;
  valordoc: number;
  mValordoc: number;
  valorreg: number;
  valorPend: number;
  mvalorPend: number;
  anulado: boolean;
  numinterno: string;
  cambiousd: number;
  origem: string;
  mvalorpreg: number;
  mvalorreg: number;
  descontofin: number;
  mDescontofin: number;
  perdescfin: number;
  rcladiant: boolean;
  rCL: RCL;
}

export interface Rd {
  rdstamp: string;
  numero: number;
  data: Date;
  no: number;
  nome: string;
  moeda: string;
  banco: string;
  total: number;
  mtotal: number;
  obs: string;
  bancoprov: string;
  anulado: boolean;
  ccusto: string;
  numdoc: number;
  sigla: string;
  nomedoc: string;
  codmovcc: number;
  descmovcc: string;
  nomecomerc: string;
  integra: boolean;
  nodiario: number;
  diario: string;
  ndocCont: number;
  descDocCont: string;
  estabno: number;
  estabnome: string;
  cc: Cc[];
  formasp: Formasp[];
  rdl: Rdl[];
}

export interface Rdf {
  rdfstamp: string;
  numero: number;
  data: Date;
  no: number;
  nome: string;
  moeda: string;
  banco: string;
  total: number;
  mtotal: number;
  obs: string;
  bancoprov: string;
  titulo: string;
  numtitulo: string;
  ccusto: string;
  numdoc: number;
  sigla: string;
  nomedoc: string;
  codmovcc: number;
  descmovcc: string;
  anulado: boolean;
  fcc: Fcc[];
  formasp: Formasp[];
  rdfl: Rdfl[];
}

export interface Rdfl {
  rdflstamp: string;
  ordem: number;
  descricao: string;
  valorl: number;
  mvalorl: number;
  rdfstamp: string;
  status: boolean;
  rdf: Rdf;
}

export interface Rdl {
  rdstamp: string;
  ordem: number;
  descricao: string;
  valorl: number;
  mvalorl: number;
  rdlstamp: string;
  status: boolean;
  rd: Rd;
}

export interface Rdlcxml {
  rdlcxmLstamp: string;
  xmlString: string;
  rdlcname: string;
  descricao: string;
  querry: string;
}

export interface Reserva {
  reservastamp: string;
  ccustamp: string;
  produto: string;
  valor: string;
  usrstamp: string;
  ccusto: string;
  no: number;
  nome: string;
  clstamp: string;
  numero: number;
  datain: Date;
  datafim: Date;
  horain: Date;
  horafim: Date;
  total: number;
  reserval: Reserval[];
}

export interface Reserval {
  reservalstamp: string;
  mesastamp: string;
  referenc: string;
  descricao: string;
  quant: number;
  valor: number;
  totall: number;
  din: Date;
  dfim: Date;
  hin: Date;
  hfim: Date;
  reservastamp: string;
  reserva: Reserva;
}

export interface Rlt {
  rltstamp: string;
  numero: number;
  descricao: string;
  tipofilter: number;
  comboQry1: string;
  tmGrid: string;
  clnBold: string;
  clmMask: string;
  clnHeader: string;
  clnAlign: string;
  clnCor: string;
  clnTab: string;
  clnReport: boolean;
  crQuery: string;
  usaMoeda: boolean;
  tabela: string;
  comboQry2: string;
  comboQry3: string;
  comboQry4: string;
  comboQry5: string;
  comboQry6: string;
  comboQry7: string;
  comboQry8: string;
  comboQry9: string;
  tipoRlt: number;
  rltGrafico: boolean;
  pos: boolean;
  filtros: string;
  descFiltroEntreDatas: string;
  filtroEntreDatas: string;
  descFiltroEntreAnos: string;
  filtroEntreAnos: string;
  descFiltroAno: string;
  filtroAno: string;
  descFiltroData: string;
  filtroData: string;
  codmodulo: string;
  modulo: string;
  mostracfe: number;
  mostrapj: boolean;
  mostrafp: boolean;
  mostraTesoura: boolean;
  naoMostraM: boolean;
  mostraprc: boolean;
  geramapa: boolean;
  reportXml: string;
  mostrausr: boolean;
  mostraCorredor: boolean;
  mostratdocf: boolean;
  mostracurso: boolean;
  mostraturma: boolean;
  mostraplanocur: boolean;
  mostradisciplina: boolean;
  mostraanosem: boolean;
  mostraprof: boolean;
  mostraetapasem: boolean;
  docmodulo: Docmodulo[];
  rltusr: Rltusr[];
  rltCc: RltCc[];
  rltmapa: Rltmapa[];
  xmlstring: string;
  mostraEscala: boolean;
  mostraturno: boolean;
  mostradi: boolean;
}

export interface RltCc {
  rltCcstamp: string;
  ccusto: string;
  codccu: string;
  estado: boolean;
  rltstamp: string;
  rlt: Rlt;
}

export interface RltCond {
  rltCondstamp: string;
  labelText: string;
  sqlComandText: string;
  tipocontrol: number;
  filtrostring: string;
}

export interface Rltmapa {
  rltmapastamp: string;
  rltstamp: string;
  nome: string;
  tamanho: number;
  alinhamento: string;
  formatacao: string;
  dataPropertyName: string;
  columnType: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  rlt: Rlt;
}

export interface Rltsql {
  rltsqlstamp: string;
  descricao: string;
  querry: string;
  origem: string;
  reportname: string;
  tamanho: string;
  geragrid: boolean;
  campo1: string;
  campo2: string;
  campo3: string;
  xmlstring: string;
}

export interface Rltusr {
  rltusrstamp: string;
  login: string;
  descricao: string;
  rltstamp: string;
  status: boolean;
  rlt: Rlt;
}

export interface Sala {
  salastamp: string;
  codigo: string;
  descricao: string;
  capacidade: number;
}

export interface SectMesas {
  sectmesasstamp: string;
  mesasstamp: string;
  descricao: string;
  sectorstamp: string;
  sector: Sector;
}

export interface Sector {
  sectorstamp: string;
  codigo: number;
  descricao: string;
  mesas: SectMesas[];
}

export interface Sem {
  semstamp: string;
  codigo: string;
  descricao: string;
  ordem: number;
  gradel: Gradel[];
}

export interface Serverlink {
  serverlinkstamp: string;
  serverName: string;
  serverIp: string;
}

export interface ServiTurno {
  serviTurnostamp: string;
  codigo: string;
  descricao: string;
  sigla: string;
  capacidade: number;
  horainicio: Date;
  horafim: Date;
}

export interface St {
  ststamp: string;
  referenc: string;
  obs: string;
  refornec: string;
  tipo: string;
  codigoBarras: string;
  status: string;
  unidade: string;
  descricao: string;
  servico: boolean;
  tabiva: number;
  txiva: number;
  valor: number;
  ivainc: boolean;
  codfam: string;
  familia: string;
  codsubfam: string;
  subfamilia: string;
  codarm: string;
  armazem: string;
  codmarca: number;
  marca: string;
  matricula: string;
  modelo: string;
  motor: string;
  chassis: string;
  anofab: number;
  tara: number;
  pesobruto: number;
  combustivel: boolean;
  tipoCombustivel: string;
  codfab: number;
  fabricante: string;
  negativo: boolean;
  viatura: boolean;
  avisanegativo: boolean;
  descontinuado: boolean;
  ligaprojecto: boolean;
  composto: boolean;
  stock: number;
  ultimopreco: number;
  precoponderado: number;
  imagem: File[];
  codtrailer: number;
  trailer: boolean;
  procedimento: boolean;
  usaconvunid: boolean;
  quantidade: number;
  unidsaida: string;
  usadoprod: boolean;
  dimensao: boolean;
  devolc: boolean;
  usaserie: boolean;
  stockmin: number;
  stockmax: number;
  reserva: number;
  encomenda: number;
  nmovstk: boolean;
  pos: boolean;
  motorista: string;
  departanto: string;
  ccusto: string;
  cilindrada: number;
  companhia: string;
  contrato: string;
  inicio: Date;
  termino: Date;
  valorLeasing: number;
  mensalidade: number;
  bloqueado: boolean;
  assentos: number;
  portas: number;
  data: Date;
  trailref: string;
  traildesc: string;
  anomodelo: number;
  eixos: number;
  pneus: number;
  carga: number;
  vendido: number;
  comprado: number;
  obterpeso: boolean;
  peso: number;
  volume: number;
  usalote: boolean;
  ivametade: boolean;
  cpoc: string;
  contaInv: string;
  contaCev: string;
  contaReo: string;
  contaCoi: string;
  nofrota: string;
  cor: string;
  gasoleo: boolean;
  naovisisvel: boolean;
  activo: boolean;
  tipoartigo: number;
  quantvenda: number;
  usaquant2: boolean;
  st2: St2;
  stPrecos: StPrecos[];
  stRefFncCod: StRefFncCod[];
  stcp: Stcp[];
  stFnc: StFnc[];
  starm: Starm[];
  stVtman: StVtman[];
  stVtdoc: StVtdoc[];
  stVtTrailer: StVtTrailer[];
  stCt: StCt[];
  stQuant: StQuant[];
  disciplina: boolean;
  sigla: string;
  credac: number;
  cargahtotal: number;
  cargahteorica: number;
  cargahpratica: number;
  prec: boolean;
  stl: Stl[];
  stb: Stb[];
  stpe: Stpe[];
  stmaq: Stmaq[];
  multa: boolean;
  bilhete: boolean;
  bilheteespecial: boolean;
  tipoProduto: number;
  codigobarra: File[];
  codigoQr: File[];
  codigobarrasemba: string;
  usaMultCodigobarraSt: boolean;
  campomultiuso: string;
  validadeDias: number;
  garantiaDias: number;
}

export interface St2 {
  ststamp: string;
  data: Date;
  datain: Date;
  depin: Date;
  localizacao: string;
  nrelement: number;
  nranos: number;
  vidafis: number;
  anomvalia: number;
  reinsvest: boolean;
  ndep: boolean;
  quotas: boolean;
  duodessimos: boolean;
  usado: boolean;
  repactivo: boolean;
  activorep: string;
  valmvaliacusto: number;
  valmvaliareivest: number;
  valAquis: number;
  valAquisact: number;
  quantdep: number;
  quantrec: number;
  perdas: number;
  valResidual: number;
  valFiscal: number;
  codAmotr: number;
  amotr: string;
  naturAct: string;
  codtipoact: string;
  tipoact: string;
  tipoartigo: number;
  valMatricial: number;
  deptotalnact: number;
  deptotalact: number;
  valdepact: number;
  valquantesc: number;
  percdep: number;
  percndep: number;
  perctaxaceite: number;
  quotasperdidas: number;
  deptotaisperdidas: number;
  sNC: string;
  depex: string;
  depacu: string;
  mvalia: string;
  venda: string;
  aliena: string;
  abate: string;
  reaval: string;
  perdaimpa: string;
  reversimpa: string;
  perdaimpacum: string;
  excedreval: string;
  passimposto: string;
  menosvalia: string;
  vdreal: number;
  valavaliac: number;
  datavaliac: Date;
  duracao: number;
  datafim: Date;
  databate: Date;
  valvenda: number;
  motivo: string;
  grupo: string;
  subgrupo: string;
  origem: string;
  oristamp: string;
  cambio: number;
  moeda: string;
  percent: number;
  st?: St;
  drp: StDrp[];
  stDrpc: StDrpc[];
  stimpar: Stimpar[];
  streaval: Streaval[];
  streval: Streval[];
}

export interface Starm {
  starmstamp: string;
  ststamp: string;
  codarm: number;
  descricao: string;
  armazemstamp: string;
  ref: string;
  stock: number;
  stockMin: number;
  stockMax: number;
  reserva: number;
  encomenda: number;
  vendido: number;
  comprado: number;
  padrao: boolean;
  endereco: string;
  coluna: string;
  rua: string;
  nivel: string;
  stockMinVend: number;
  stockMaxVend: number;
  st: St;
}

export interface Status {
  statustamp: string;
  codigo: string;
  descricao: string;
  activo: boolean;
}

export interface Stcp {
  stcpstamp: string;
  refcp: string;
  descricao: string;
  quantcp: number;
  precocp: number;
  servico: boolean;
  ststamp: string;
  status: boolean;
  ivainc: boolean;
  oristamp: string;
  totall: number;
  st: St;
}

export interface StCt {
  stCtstamp: string;
  ststamp: string;
  conta: string;
  descgrupo: string;
  contacc: boolean;
  movIntegra: boolean;
  st: St;
}

export interface StDrp {
  stDrpstamp: string;
  ststamp: string;
  data: Date;
  valdepact: number;
  valdep: number;
  taxaDeprec: number;
  valdepnact: number;
  st2: St2;
}

export interface StDrpc {
  stdrpcstamp: string;
  ststamp: string;
  data: Date;
  datac: Date;
  valdep: number;
  valdepact: number;
  taxaDeprec: number;
  st2: St2;
}

export interface StFnc {
  stFncstamp: string;
  ststamp: string;
  fncstamp: string;
  nome: string;
  codigo: number;
  quant: number;
  devolvido: number;
  reffnc: string;
  obs: string;
  padrao: boolean;
  st: St;
}

export interface Stimpar {
  stimparstamp: string;
  ststamp: string;
  descricao: string;
  referencia: string;
  data: Date;
  valdep: number;
  depreciacao: number;
  valescriturada: number;
  valrecup: number;
  valimparidade: number;
  valacuimp: number;
  valacurevers: number;
  st2: St2;
}

export interface Stmaq {
  stmaqstamp: string;
  ststamp: string;
  maquinastamp: string;
  descricao: string;
  iMEI: string;
  st: St;
}

export interface Stpe {
  stpestamp: string;
  ststamp: string;
  pestamp: string;
  nome: string;
  funcao: string;
  st: St;
}

export interface StPrecos {
  stPrecostamp: string;
  ststamp: string;
  moeda: string;
  cCusto: string;
  codCCu: string;
  ccustamp: string;
  ivainc: boolean;
  padrao: boolean;
  preco: number;
  precoemb: number;
  precoCompra: number;
  perc: number;
  percemb: number;
  dataincio: Date;
  datatermino: Date;
  descpreco: string;
  quant: number;
  st: St;
}

export interface StQuant {
  stQuantstamp: string;
  ststamp: string;
  quant: number;
  descpos: string;
  preco: number;
  ivainc: boolean;
  imagem: File[];
  cCusto: string;
  codCCu: string;
  ccustamp: string;
  st: St;
}

export interface Streaval {
  streavalstamp: string;
  ststamp: string;
  decreto: string;
  data: Date;
  aquis: number;
  aquisreaval: number;
  dep: number;
  depcorrig: number;
  contab: boolean;
  st2: St2;
}

export interface StRefFncCod {
  stRefFncCodstamp: string;
  ststamp: string;
  serieCodBarras: File[];
  codigobarras: string;
  estado: boolean;
  st: St;
}

export interface Streval {
  strevalstamp: string;
  ststamp: string;
  referencia: string;
  data: Date;
  valdep: number;
  depreciacao: number;
  valescriturada: number;
  valrecup: number;
  valimparidade: number;
  valacuimp: number;
  valacurevers: number;
  st2: St2;
}

export interface StVtdoc {
  stVtdocstamp: string;
  numdoc: string;
  tipodoc: string;
  entidade: string;
  datain: Date;
  datatermino: Date;
  premio: number;
  franquia: number;
  anexo: File[];
  ststamp: string;
  st: St;
}

export interface StVtman {
  stVtmanstamp: string;
  matricula: string;
  valparam: number;
  valkm: number;
  diferenca: number;
  feito: boolean;
  distamp: string;
  ststamp: string;
  st: St;
}

export interface StVtTrailer {
  stVtTrailerstamp: string;
  ststamp: string;
  matricula: string;
  obs: string;
  st: St;
}

export interface Sub {
  substamp: string;
  codigo: string;
  descricao: string;
  tipo: number;
  valor: number;
  tiposub: number;
  decimo13: boolean;
  rectro: boolean;
  sofreDescontoFalta: boolean;
  obs: string;
  pagoMesFerias: boolean;
  pagoSubsFerias: boolean;
  pagoSubsNatal: boolean;
  pagoExtra: boolean;
  moeda: string;
  subFixo: boolean;
}

export interface SubFam {
  subfamstamp: string;
  familiastamp: string;
  codigo: string;
  descricao: string;
  imagem: File[];
  pos: boolean;
  descpos: string;
  sequenc: number;
  familia: Familia;
}

export interface SubGrupo {
  subGrupostamp: string;
  grupostamp: string;
  codigo: string;
  descricao: string;
  imagem: File[];
  grupo: Grupo;
}

export interface TabelaAmort {
  tabelaAmortstamp: string;
  codigo: string;
  descricao: string;
  grupo: string;
  subGrupo: string;
  perc1: number;
}

export interface TContrato {
  tContratostamp: string;
  codigo: string;
  descricao: string;
  tipo: number;
}

export interface Tdi {
  tdistamp: string;
  descricao: string;
  sigla: string;
  tipo: number;
  desctipo: string;
  tiposigla: string;
  alteranum: boolean;
  ctrlData: boolean;
  armazem: boolean;
  armdefeito: number;
  movstk: boolean;
  codmovstk: number;
  descmovstk: string;
  composto: boolean;
  obgccusto: boolean;
  activo: boolean;
  defa: boolean;
  trf: boolean;
  codmovstk2: number;
  descmovstk2: string;
  numdoc: number;
  reserva: boolean;
  noneg: boolean;
  armapenas: boolean;
  prod: boolean;
  copyqtt: boolean;
  copyvalor: boolean;
  prccusto: boolean;
  armdefeito2: number;
  facturar: boolean;
  ndocfact: number;
  docfact: string;
  copiaDocs: boolean;
  nomfile: string;
  ecran: string;
  titimpress: string;
  copia: boolean;
  usaaprova: boolean;
  descpreco: string;
  campopreco: string;
  usafecho: boolean;
  no: number;
  nome: string;
  usaemail: boolean;
  destinationEmail: string;
  subj: string;
  emailText: string;
  usaattach: boolean;
  usaorigem: boolean;
  usadestino: boolean;
  usaanexo: boolean;
  ligapj: boolean;
  lancacustopj: boolean;
  usaserie: boolean;
  autoemail: boolean;
  condcopia: string;
  orc: boolean;
  movtz: boolean;
  tipomovtz: number;
  noentid: boolean;
  regrd: boolean;
  usalote: boolean;
  visivelPos: boolean;
  aprova: boolean;
  introdir: boolean;
  tipodoc: number;
  nomefiles: string;
  usatec: boolean;
  nopergtec: boolean;
  obrigalote: boolean;
  usaqttmedida: boolean;
  descqttmedida: string;
  noalteramedida: boolean;
  dias: number;
  ccusto: string;
  contastesoura: string;
  codtz: number;
  titulo: string;
  nalteratz: boolean;
  precocl: boolean;
  trfConta: boolean;
  codmovtz: number;
  descmovtz: string;
  codmovtz2: number;
  descmovtz2: string;
  stkinicial: boolean;
  encomenda: boolean;
  integra: boolean;
  nodiario: number;
  diario: string;
  ndocCont: number;
  descDocCont: string;
  obs: string;
  vendido: boolean;
  comprado: boolean;
  estorno: boolean;
  stockmax: boolean;
  reportXml: string;
  xmlstring: string;
  inscricao: boolean;
  promocao: boolean;
  campomultiuso: string;
  docmodulo: Docmodulo[];
  tdiCcu: TdiCcu[];
}

export interface TdiCcu {
  tdiCcustamp: string;
  padrao: boolean;
  ccusto: string;
  ccustamp: string;
  tdistamp: string;
  codCcu: string;
  tdi: Tdi;
}

export interface Tdoc {
  tdocstamp: string;
  numdoc: number;
  descricao: string;
  sigla: string;
  alteranum: boolean;
  ctrlData: boolean;
  armazem: boolean;
  armdefeito: number;
  movstk: boolean;
  codmovstk: number;
  descmovstk: string;
  codmovtz: number;
  descmovtz: string;
  movcc: boolean;
  descmovcc: string;
  codmovcc: number;
  composto: boolean;
  obgccusto: boolean;
  codtz: number;
  contastesoura: string;
  movtz: boolean;
  nalteratz: boolean;
  activo: boolean;
  defa: boolean;
  pos: boolean;
  ccusto: string;
  reserva: boolean;
  noneg: boolean;
  armapenas: boolean;
  coment: string;
  titulo: string;
  nomfile: string;
  nomfile2: string;
  nomfile3: string;
  obs2: string;
  no: number;
  nome: string;
  ligapj: boolean;
  obrigapj: boolean;
  usaserie: boolean;
  usalote: boolean;
  adjudica: boolean;
  aprova: boolean;
  tipodoc: number;
  integra: boolean;
  nodiario: number;
  diario: string;
  ndocCont: number;
  descDocCont: string;
  nc: boolean;
  nd: boolean;
  ft: boolean;
  vd: boolean;
  dias: number;
  usamascara: boolean;
  mascara: string;
  plafond: boolean;
  lancaend: boolean;
  stockmin: boolean;
  mostraguia: boolean;
  mostraContrato: boolean;
  lancacustopj: boolean;
  ncobrigadoc: boolean;
  reportXml: string;
  docmodulo: Docmodulo[];
  xmlstring: string;
  xmlStringA5: string;
  xmlStringPOS: string;
  inscricao: boolean;
  multa: boolean;
  campomultiuso: string;
  usaprovacao: boolean;
}

export interface Tdocf {
  tdocfstamp: string;
  numdoc: number;
  descricao: string;
  sigla: string;
  alteranum: boolean;
  ctrlData: boolean;
  armazem: boolean;
  armdefeito: number;
  movstk: boolean;
  codmovstk: number;
  descmovstk: string;
  codmovtz: number;
  descmovtz: string;
  movcc: boolean;
  descmovcc: string;
  codmovcc: number;
  recibo: boolean;
  composto: boolean;
  obgccusto: boolean;
  codtz: number;
  contastesoura: string;
  movtz: boolean;
  activo: boolean;
  defa: boolean;
  reserva: boolean;
  noneg: boolean;
  armapenas: boolean;
  nomfile: string;
  no: number;
  nome: string;
  ligapj: boolean;
  obrigapj: boolean;
  usaserie: boolean;
  tipodoc: number;
  usalote: boolean;
  coment: string;
  integra: boolean;
  nodiario: number;
  diario: string;
  ndocCont: number;
  descDocCont: string;
  lancacustopj: boolean;
  ccusto: string;
  nc: boolean;
  nd: boolean;
  ft: boolean;
  vd: boolean;
  usaprovacao: boolean;
  dias: number;
  stockmax: boolean;
  reportXml: string;
  xmlstring: string;
  campomultiuso: string;
  docmodulo: Docmodulo[];
}

export interface TdocMat {
  tdocMatstamp: string;
  numdoc: number;
  descricao: string;
  sigla: string;
  defa: boolean;
  inscricao: boolean;
  matricula: boolean;
}

export interface Tdocpe {
  tdocpestamp: string;
  numdoc: number;
  descricao: string;
  sigla: string;
  tipo: number;
  nomfile: string;
  defa: boolean;
}

export interface TdocPj {
  tdocpjstamp: string;
  numdoc: number;
  descricao: string;
  sigla: string;
  defa: boolean;
  compra: boolean;
  venda: boolean;
  di: boolean;
}

export interface Teste {
  testestamp: string;
  descricao: string;
}

export interface TipoPromocao {
  tipoPromocaostamp: string;
  codigo: number;
  descricao: string;
  sigla: string;
  obs: string;
}

export interface Tiporesult {
  tiporesultstamp: string;
  codigo: number;
  descricao: string;
  tipo: number;
}

export interface Tirps {
  tirpsstamp: string;
  codigo: string;
  descricao: string;
  padrao: boolean;
  tirpsl: Tirpsl[];
}

export interface Tirpsl {
  tirpslstamp: string;
  valMin: number;
  valMax: number;
  dep00: number;
  dep01: number;
  dep02: number;
  dep03: number;
  dep04: number;
  percentagem: number;
  ano: number;
  tirps: Tirps;
}

export interface TPercl {
  tPerclstamp: string;
  numdoc: number;
  descricao: string;
  sigla: string;
  descmovcc: string;
  codmovcc: number;
  codmovtz: number;
  descmovtz: string;
  contastesoura: string;
  codtz: number;
  titulo: string;
  ccusto: string;
  obs: string;
  entida: number;
  activo: boolean;
  defa: boolean;
  alteranum: boolean;
  usaemail: boolean;
  usaanexo: boolean;
  integra: boolean;
  nodiario: number;
  diario: string;
  ndocCont: number;
  descDocCont: string;
  nomfile: string;
  especial: boolean;
  xmlstring: string;
}

export interface Tpgf {
  tpgfstamp: string;
  numdoc: number;
  descricao: string;
  sigla: string;
  descmovcc: string;
  codmovcc: number;
  codmovtz: number;
  descmovtz: string;
  contastesoura: string;
  codtz: number;
  titulo: string;
  ccusto: string;
  obs: string;
  entida: number;
  activo: boolean;
  defa: boolean;
  integra: boolean;
  nodiario: number;
  diario: string;
  ndocCont: number;
  descDocCont: string;
  rh: boolean;
  rcladiant: boolean;
  nomfile: string;
  reportXml: string;
  xmlstring: string;
  xmlString2: string;
  campomultiuso: string;
}

export interface Tpgp {
  tpgpstamp: string;
  numdoc: number;
  descricao: string;
  sigla: string;
  descmovcc: string;
  codmovcc: number;
  codmovtz: number;
  descmovtz: string;
  contastesoura: string;
  codtz: number;
  titulo: string;
  ccusto: string;
  obs: string;
  entida: number;
  activo: boolean;
  defa: boolean;
  integra: boolean;
  nodiario: number;
  diario: string;
  ndocCont: number;
  descDocCont: string;
  rcladiant: boolean;
  nomfile: string;
  nomfile2: string;
  xmlstring: string;
  xmlStringa5: string;
}

export interface Transp {
  transpstamp: string;
  codigo: number;
  nome: string;
  morada: string;
  celular: string;
  email: string;
  transpvt: Transpvt[];
}

export interface Transpvt {
  transpvtstamp: string;
  transpstamp: string;
  marca: string;
  modelo: string;
  matricula: string;
  motorista: string;
  transp: Transp;
}

export interface TRcl {
  tRclstamp: string;
  numdoc: number;
  descricao: string;
  sigla: string;
  descmovcc: string;
  codmovcc: number;
  codmovtz: number;
  descmovtz: string;
  contastesoura: string;
  codtz: number;
  titulo: string;
  ccusto: string;
  obs: string;
  entida: number;
  activo: boolean;
  defa: boolean;
  alteranum: boolean;
  usaemail: boolean;
  usaanexo: boolean;
  integra: boolean;
  nodiario: number;
  diario: string;
  ndocCont: number;
  descDocCont: string;
  nomfile: string;
  nomfile2: string;
  nomfilePOS: string;
  especial: boolean;
  rcladiant: boolean;
  reportXml: string;
  xmlstring: string;
  xmlStringA5: string;
  xmlStringPOS: string;
  campomultiuso: string;
}

export interface Trd {
  trdstamp: string;
  numdoc: number;
  descricao: string;
  sigla: string;
  descmovcc: string;
  codmovcc: number;
  contastesoura: string;
  codtz: number;
  titulo: string;
  ccusto: string;
  obs: string;
  entida: number;
  activo: boolean;
  defa: boolean;
  qmc: string;
  qmcdathora: Date;
  qma: string;
  qmadathora: Date;
  usaanexo: boolean;
  usaemail: boolean;
  tesouraPgc: number;
  integra: boolean;
  nodiario: number;
  diario: string;
  ndocCont: number;
  descDocCont: string;
  etpemiss: boolean;
  etpimpress: boolean;
  etpemail: boolean;
  etpemisstxt: string;
  etpimpresstxt: string;
  etpemailtxt: string;
}

export interface Trdf {
  trdfstamp: string;
  numdoc: number;
  descricao: string;
  sigla: string;
  descmovcc: string;
  codmovcc: number;
  contastesoura: string;
  codtz: number;
  titulo: string;
  ccusto: string;
  obs: string;
  entida: number;
  activo: boolean;
  defa: boolean;
  qmc: string;
  qmcdathora: Date;
  qma: string;
  qmadathora: Date;
  usaanexo: boolean;
  usaemail: boolean;
  tesouraPgc: number;
  etpemiss: boolean;
  etpimpress: boolean;
  etpemail: boolean;
  etpemisstxt: string;
  etpimpresstxt: string;
  etpemailtxt: string;
}

export interface Trf {
  trfstamp: string;
  codigo: number;
  numinterno: string;
  data: Date;
  origem: string;
  orinum: number;
  moeda1: string;
  destino: string;
  destnum: number;
  moeda2: string;
  valor: number;
  obs: string;
  titulo: string;
  numtitulo: string;
  ccusto: string;
  mvt: Mvt[];
}

export interface Turma {
  turmastamp: string;
  codigo: string;
  descricao: string;
  anoSemstamp: string;
  descanoaem: string;
  descurso: string;
  cursostamp: string;
  descgrade: string;
  gradestamp: string;
  etapa: string;
  sala: string;
  turno: string;
  vagasmin: number;
  vagasmax: number;
  responsavel: string;
  responsavel2: string;
  semanaslec: number;
  horasaulas: number;
  formaaval: string;
  situacao: string;
  obs: string;
  datain: Date;
  datafim: Date;
  horain: Date;
  horafim: Date;
  codetapa: string;
  anoSem: AnoSem;
  curso: Curso;
  turmal: Turmal[];
  turmadisc: Turmadisc[];
  turmanota: Turmanota[];
}

export interface Turmadisc {
  turmadiscstamp: string;
  turmastamp: string;
  ststamp: string;
  referenc: string;
  disciplina: string;
  numeroTeste: string;
  turma: Turma;
  turmadiscp: Turmadiscp[];
}

export interface Turmadiscp {
  turmadiscpstamp: string;
  turmadiscstamp: string;
  pestamp: string;
  ststamp: string;
  nome: string;
  turmadisc: Turmadisc;
}

export interface Turmal {
  turmalstamp: string;
  turmastamp: string;
  clstamp: string;
  no: string;
  nome: string;
  activo: boolean;
  motivo: string;
  turma: Turma;
}

export interface Turmanota {
  turmanotastamp: string;
  turmastamp: string;
  no: string;
  alunostamp: string;
  alunoNome: string;
  n1: number;
  n2: number;
  n3: number;
  n4: number;
  n5: number;
  media: number;
  data: Date;
  aprovado: boolean;
  coddis: string;
  disciplina: string;
  anosem: string;
  sem: string;
  cursostamp: string;
  e1: number;
  e2: number;
  es: number;
  mediafinal: number;
  pestamp: string;
  profnome: string;
  pestamp2: string;
  profnome2: string;
  fecho: boolean;
  obs: string;
  datafecho: Date;
  resultado: string;
  resultadoFinal: string;
  codSit: number;
  codetapa: string;
  activo: boolean;
  motivo: string;
  turma: Turma;
}

export interface Turno {
  turnostamp: string;
  codigo: string;
  descricao: string;
  horain: Date;
  horafim: Date;
  intervaloin: Date;
  intervalofim: Date;
  obs: string;
}

export interface Unimesa {
  unimesastamp: string;
  clstamp: string;
  nome: string;
  unimesal: Unimesal[];
}

export interface Unimesal {
  unimesalstamp: string;
  unimesastamp: string;
  messastamp: string;
  descricao: string;
  total: number;
  unimesa: Unimesa;
}

export interface Usracessos {
  usracessostamp: string;
  descricao: string;
  ver: boolean;
  intro: boolean;
  altera: boolean;
  apaga: boolean;
  anula: boolean;
  imprimir: boolean;
  usrmodulostamp: string;
  usrstamp: string;
  ecran: string;
  tipo: number;
  sigla: string;
  numdoc: number;
  numrlt: number;
  nordem: number;
  codmodulo: number;
  codmenu: number;
  ordem: number;
  headgroup: boolean;
  activo: boolean;
  painel: boolean;
  origem: string;
  oristamp: string;
  usrModulo: UsrModulo;
  usr: Usuario;
}

export interface UsrAudit {
  usrAuditstamp: string;
  usrstamp: string;
  oristamp: string;
  dataAdd: Date;
  dataUpd: Date;
  formName: string;
  docName: string;
  docSigla: string;
  docNumero: number;
  coment: string;
  total: number;
  usr: Usuario;
}

export interface Usrcontas {
  usrcontasstamp: string;
  usrstamp: string;
  conta: string;
  contasstamp: string;
  codtz: number;
  cx: boolean;
  descpos: string;
  usr: Usuario;
}

export interface UsrLog {
  usrLogstamp: string;
  usrstamp: string;
  entradaDataHora: Date;
  saidaDataHora: Date;
  firstLogin: boolean;
  valor: number;
  corredor: string;
  corredorstamp: string;
  sentidostamp: string;
  sentido: string;
  carreira: string;
  cobradorstamp: string;
  estado: number;
  codigo: number;
  matricula: string;
  viaturastamp: string;
  carreirastamp: string;
  usr: Usuario;
}

export interface UsrlogSect {
  usrlogSectstamp: string;
  usrstamp: string;
  entradaDataHora: Date;
  saidaDataHora: Date;
  obsUsrPw: string;
  obsfielUsrname: string;
  obs: string;
  usr: Usuario;
}

export interface UsrModulo {
  usrmodulostamp: string;
  codigo: string;
  descricao: string;
  usrstamp: string;
  activo: boolean;
  usr: Usuario;
  usracessgrupo: Usracessos[];
}

export interface Usrmudapreco {
  usrmudaprecostamp: string;
  usrstamp: string;
  usrvenda: string;
  usrsupervidor: string;
  referenc: string;
  preco: number;
  precoalter: number;
  data: Date;
  docstamp: string;
  origem: string;
  usr: Usuario;
}

export interface Vend {
  vendstamp: string;
  no: number;
  nome: string;
  nuit: string;
  codccu: number;
  cCusto: string;
  telefone: string;
  celular: string;
  email: string;
  morada: string;
  tipo: string;
  obs: string;
  status: string;
}

export interface Vendas {
  vendasstamp: string;
  descricao: string;
  codBlilhete: string;
  nrdoc: string;
  data: Date;
  entrada: number;
  saida: number;
  clstamp: string;
  ststamp: string;
  factlstamp: string;
  tdocstamp: string;
  oristamp: string;
  clCartstamp: string;
}

export interface Vt {
  vtstamp: string;
  codigo: number;
  matricula: string;
  marca: string;
  modelo: string;
  motor: string;
  chassis: string;
  anofab: number;
  tara: number;
  pesobruto: number;
  combustivel: string;
  pneus: string;
  codentida: number;
  nomentida: string;
  valInspec: Date;
  daquisic: Date;
  obs: string;
  status: number;
  descstatus: string;
  seguradora: string;
  apolice: string;
  valapolice: Date;
  codtrl: number;
  trailer: string;
  numlic: string;
  datLic: Date;
  validLic: Date;
  numInspec: string;
  datInspec: Date;
  datSegura: Date;
  anomanifest: number;
  datmanifest: Date;
  validmanifest: Date;
  capacit: number;
  externa: boolean;
  numdoc: number;
  medveloc: string;
  qttporkm: number;
  capaclitros: number;
  ref: string;
  stdesc: string;
  codmarca: number;
  tipo: number;
  designacao: string;
  valorbase: number;
  vtcfg: Vtcfg[];
  vtcorreias: Vtcorreias[];
  vtfiltros: Vtfiltros[];
  vtman: Vtman[];
  vtpneus: Vtpneus[];
  vtoleos: Vtoleos[];
  vtdoc: Vtdoc[];
}

export interface Vtcfg {
  vtcfgstamp: string;
  codigo: number;
  descricao: string;
  valor: number;
  data: Date;
  feito: boolean;
  vtstamp: string;
  distamp: string;
  matricula: string;
  valor2: number;
  vt: Vt;
}

export interface Vtcorreias {
  vtcorreiasstamp: string;
  descricao: string;
  reforig: string;
  outraref1: string;
  outraref2: string;
  outraref3: string;
  outraref4: string;
  codigo: number;
  vtstamp: string;
  vt: Vt;
}

export interface Vtdoc {
  vtdocstamp: string;
  numdoc: string;
  tipodoc: string;
  entidade: string;
  datain: Date;
  datatermino: Date;
  anexo: File[];
  vtstamp: string;
  vt: Vt;
}

export interface Vtfiltros {
  vtfiltrosstamp: string;
  descricao: string;
  reforig: string;
  outraref1: string;
  outraref2: string;
  outraref3: string;
  outraref4: string;
  tipo: number;
  codigo: number;
  vtstamp: string;
  vt: Vt;
}

export interface Vtman {
  vtmanstamp: string;
  matricula: string;
  valparam: number;
  valkm: number;
  diferenca: number;
  feito: boolean;
  vtstamp: string;
  distamp: string;
  vt: Vt;
}

export interface Vtmanunt {
  vtmanuntstamp: string;
  matricula: string;
  data: Date;
  km: number;
  motorista: string;
}

export interface Vtoleos {
  vtoleosstamp: string;
  descricao: string;
  reforig: string;
  outraref1: string;
  outraref2: string;
  outraref3: string;
  outraref4: string;
  codigo: number;
  vtstamp: string;
  vt: Vt;
}

export interface Vtpneus {
  vtpneusstamp: string;
  descricao: string;
  numero: number;
  dataent: Date;
  datasaida: Date;
  posicao: string;
  vtstamp: string;
  distamp: string;
  vt: Vt;
}

export interface MenuItem {
  menustamp: string;
  nome: string;
  rota: string;
  tipo: string;
  icone: string;
  checked: boolean;
  children: MenuItem[];
}

export interface LineValuesParamss<TEntity = any, TLine = any> {
  st: any;
  compra: boolean;
  moedavenda: string;
  moedacambio: string;
  moedaBase: string;
  nc: boolean;
  entidadestamp: string;
  entity: TEntity;
  line: TLine;
}
export interface LineValuesParams<T> {
  line: {
    codigoBarras: string;
    entidadestamp: string;
    tableName: string;
    reffornecl: any;
    ststamp: string,
    numdoc: number,
    sigla: string,
    ref: string,
    descricao: string,
    quant: number,
    unidade: string,
    armazem: number,
    preco: number,
    mpreco: number,
    tabiva: number,
    txiva: number,
    valival: number,
    mvalival: number,
    ivainc: boolean,
    activo: boolean,
    perdesc: number,
    descontol: number,
    mdescontol: number,
    subtotall: number,
    msubtotall: number,
    totall: number,
    mtotall: number,
    status: boolean,
    lotevalid: Date,
    lotelimft: Date,
    usalote: boolean,
    lote: string,
    obs: string,
    servico: boolean,
    oristampl: string,
    dispon: number,
    qttOrig: number,
    nmovstk: boolean,
    oristamp: string,
    tit: boolean,
    ordem: number,
    stkprod: boolean,
    lineAnulado: boolean,
    titstamp: string,
    contatz: number,
    pack: number,
    cpoc: number,
    cpoo: number,
    composto: boolean,
    descarm: string,
    refornec: string,
    usaquant2: boolean,
    quant2: number,
    morada: string,
    telefone: string,
    entrega: boolean,
    dataentrega: Date,
    pcontacto: string,
    email: string,
    pais: string,
    guias: string,
    contrato: string,
    gasoleo: boolean,
    cambiousd: number,
    moeda: string,
    moeda2: string,
    ccusto: string,
    codccu: string,
    armazemstamp: string,
    codigobarras: string,
    stRefFncCodstamp: string,
    campomultiuso: string,
    precoPromo: number} ; // The line object to fill (equivalent to DataRow)
  st: St;
  entity: T;
  compra: boolean;
  row?: any; // Optional, equivalent to DataRow row
  nc: boolean;
  moedavenda: string;
  moedacambio: string;
  entidadestamp: string;
  moedaBase: string
}
