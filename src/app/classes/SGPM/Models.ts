import { Subunidade, Unidade } from '../ClassesSIGEX';
export interface Armazem {
  armazemStamp?: string;
  descricao?: string;
  numeroArmazem?: string;
  localizacao?: string;
  contacto?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
}
export interface Artigo {
  artigoStamp?: string;
  artigoGeralStamp?: string;
  codArtigo?: string;
  descricaoartigo?: string;
  artigogeral?: string;
  orgao?: string;
  grupo?: string;
  sexo?: string;
  policiaMilitar?: boolean;
  unidCerimonial?: boolean;
  unifTrabalho?: boolean;
  desportivo?: boolean;
  domando?: boolean;
  daraquedista?: boolean;
  fuzileiro?: boolean;
  piloto?: boolean;
  complementar?: boolean;
  ofGen?: boolean;
  ofSup?: boolean;
  ofSub?: boolean;
  sargento?: boolean;
  praca?: boolean;
  norma?: number;
  tempoUtil?: string;
  tempoutilMesesAnos?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  artigoGeral1?: ArtigoGeral;
  artigoContrato?: ArtigoContrato[];
  existencia?: Existencia[];
}

export interface ArtigoContrato {
  artigoContratoStamp?: string;
  contratoStamp?: string;
  descricao?: string;
  quantidade?: number;
  tamanho?: number;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  artigoStamp?: string;
  artigo?: Artigo;
  contrato?: Contrato;
}

export interface ArtigoGeral {
  artigoGeralStamp?: string;
  descricao?: string;
  u_m?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  artigo?: Artigo[];
}

export interface CodCarta {
  codCartaStamp?: string;
  codigo?: string;
  descricao?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
}

export interface Contrato {
  contratoStamp?: string;
  nrContrato?: string;
  fornecedor?: string;
  contacto?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  descricaocontrato?: string;
  abreviaturaFornecedor?: string;
  artigoContrato?: ArtigoContrato[];
}

export interface Curso {
  cursoStamp?: string;
  codCurso?: number;
  descricao?: string;
  tipo?: boolean;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  abreviatura?: string;
}

export interface Desconto {
  descontoStamp?: string;
  codDesconto?: number;
  descricao?: string;
  percentgDesconto?: number;
  obsDesconto?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  milStamp?: string;
  milSalario?: MilSalario;
}

export interface Email {
  emailStamp?: string;
  codEmail?: number;
  email1?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  milStamp?: string;
  mil?: Mil;
}

export interface Entrada {
  entradaStamp?: string;
  existenciaStamp?: string;
  quantidade?: number;
  dataEntrada?: string;
  unidadeStamp?: string;
  orgao?: string;
  numeroGR?: number;
  pUnit?: number;
  pTotal?: number;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  numeroContrato?: string;
  numeroParaImpressao?: string;
  existencia?: Existencia;
  unidade?: Unidade;
}

export interface Entrega {
  fornecimentoStamp?: string;
  dataEntrega?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  fornecimento?: Fornecimento;
}

export interface Escalao {
  escalaoStamp?: string;
  codEscalao?: number;
  patente?: string;
  escalaoUcerm1?: string;
  eSCALÃO_I?: string;
  eSCALÃO_II?: string;
  eSCALÃO_III?: string;
  eSCALÃO_IV?: string;
  eSCALÃO_V?: string;
  obs?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  patStamp?: string;
  pat?: Pat;
}

export interface Pat {
  patStamp?: string;
  codPatente?: number;
  codPat?: number;
  descricao?: string;
  codRamo?: number;
  ramo?: string;
  codCategoria?: number;
  categoria?: string;
  classeMil?: string;
  inseriu?: string;
  inseriuDataHora?: string;
  alterou?: string;
  alterouDataHora?: string;
  catStamp?: string;
}
export interface Especial {
  especialStamp?: string;
  codEspecial?: number;
  descricao?: string;
  codRamo?: number;
  ramo?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  subEspecial?: SubEspecial[];
}

export interface Especie {
  especieStamp?: string;
  descricao?: string;
  graus?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
}

export interface Existencia {
  existenciaStamp?: string;
  artigoStamp?: string;
  tamanho?: string;
  quantidadeActual?: number;
  armazemStamp?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  artigo?: Artigo;
  entrada?: Entrada[];
  fornecimento?: Fornecimento[];
}

export interface Fornecedor {
  fornecedorStamp?: string;
  fornecedorNome?: string;
  fornecedorAbreviatura?: string;
  fornecedorContacto?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  codigo?: string;
}

export interface Fornecimento {
  fornecimentoStamp?: string;
  unidadeStamp?: string;
  milStamp?: string;
  existenciaStamp?: string;
  subunidadeStamp?: string;
  quantidade?: number;
  dataFornecimento?: string;
  numeroGR?: number;
  jarecebeu?: boolean;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  nomeOrgaoUnidade?: string;
  existencia?: Existencia;
  entrega?: Entrega[];
  mil?: Mil;
  subunidade?: Subunidade;
  unidade?: Unidade;
}

export interface Instituicao {
  instituicaoStamp?: string;
  codInstituicao?: number;
  descricao?: string;
  tipoInstituicao?: boolean;
  codProvincia?: number;
  provincia?: string;
  codDistrito?: number;
  distrito?: string;
  codPostoAdm?: number;
  postoAdm?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
}

export interface Licenca {
  licencaStamp?: string;
  codLicenca?: number;
  descricao?: string;
  tipoLicenca?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
}

export interface Mil {
  milStamp?: string;
  nome?: string;
  nim?: number;
  nascData?: string;
  sexo?: string;
  grupSangue?: string;
  nacional?: string;
  nascPais?: string;
  nascProv?: string;
  codNascProv?: number;
  nascDist?: string;
  codNascDist?: number;
  nascPosto?: string;
  codNascPostAdm?: number;
  nascLocal?: string;
  codNascLocalidade?: number;
  nascPov?: string;
  pai?: string;
  mae?: string;
  estCivil?: string;
  regCasamento?: string;
  dataCasamento?: string;
  conjuge?: string;
  numFilhos?: number;
  habiLite?: string;
  resProv?: string;
  codResProv?: number;
  resDist?: string;
  codResDist?: number;
  resPosto?: string;
  codResPostAdm?: number;
  resLocalidade?: string;
  codResLocal?: number;
  resBairro?: string;
  resQuarteirao?: string;
  resAvenida?: string;
  numCasa?: string;
  ramo?: string;
  codRamo?: number;
  incPais?: string;
  incProv?: string;
  codIncProv?: number;
  incDist?: string;
  codIncDist?: number;
  incPosto?: string;
  codIncPostAdm?: number;
  incLocal?: string;
  codIncLocalidade?: number;
  incData?: string;
  inicioTreino?: string;
  terminoTreino?: string;
  duracaoTreino?: string;
  centroTreino?: string;
  cursoTreino?: string;
  adquirEspecial?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  email?: Email[];
  fornecimento?: Fornecimento[];
  milAgre?: MilAgre[];
  milConde?: MilConde[];
  milDoc?: MilDoc[];
  milEmail?: MilEmail[];
  milEmFor?: MilEmFor[];
  milEspecial?: MilEspecial[];
  milFa?: MilFa;
  milFor?: MilFor[];
  milFot?: MilFot[];
  milFuncao?: MilFuncao[];
  milIDigital?: MilIDigital;
  milLice?: MilLice[];
  milLingua?: MilLingua[];
  milMed?: MilMed;
  milPeEmerg?: MilPeEmerg[];
  milRea?: MilRea[];
  milReco?: MilReco[];
  milReg?: MilReg[];
  milRetReaSal?: MilRetReaSal[];
  milSa?: MilSa[];
  milSalario?: MilSalario;
  milSit?: MilSit[];
  milSitCrim?: MilSitCrim[];
  milSitDisc?: MilSitDisc[];
  milSitQPActivo?: MilSitQPActivo[];
  telefone?: Telefone[];
}

export interface MilAgre {
  milAgreStamp?: string;
  codMilAgre?: number;
  nome?: string;
  grau?: string;
  nascData?: string;
  nascProv?: string;
  codNascProv?: number;
  resProv?: string;
  codResProv?: number;
  resDist?: string;
  codResDist?: number;
  resPosto?: string;
  codResPostAdm?: number;
  resLocal?: string;
  codResLocal?: number;
  resBairro?: string;
  telefone?: number;
  obs?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  milStamp?: string;
  mil?: Mil;
}

export interface MilConde {
  milCondeStamp?: string;
  codMilConde?: number;
  galardoa?: string;
  especie?: string;
  grauMedalha?: string;
  dataGalardoacao?: string;
  obs?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  milStamp?: string;
  mil?: Mil;
}

export interface MilDoc {
  milDocStamp?: string;
  codMilDoc?: number;
  tipoDocumento?: string;
  numeroDoc?: string;
  localemissao?: string;
  dataemissao?: string;
  datavalid?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  milStamp?: string;
  mil?: Mil;
}

export interface MilEmail {
  milStamp?: string;
  emailStamp?: string;
  email?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  mil?: Mil;
}

export interface MilEmFor {
  milEmForStamp?: string;
  codMilEmFor?: number;
  tipo?: boolean;
  curso?: string;
  adquirEspecial?: string;
  custos?: string;
  anoFrequentar?: string;
  dataInicio?: string;
  dataTermino?: string;
  duracao?: string;
  duracaoNormal?: string;
  nivel?: string;
  nivelAtingir?: string;
  tipoInstituicao?: boolean;
  instituicao?: string;
  obs?: string;
  codPpais?: number;
  pais?: string;
  codProvincia?: number;
  provincia?: string;
  codDistrito?: number;
  distrito?: string;
  codPostoAdm?: number;
  postoAdm?: string;
  codLocalidade?: number;
  localidade?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  milStamp?: string;
  mil?: Mil;
}

export interface MilEspecial {
  milEspecialStamp?: string;
  codMilEspecial?: number;
  codRamo?: number;
  ramo?: string;
  codEspecial?: number;
  especial?: string;
  codSubEspecial?: number;
  subEspecial?: string;
  dataEspecial?: string;
  numOS?: string;
  obs?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  especialStamp?: string;
  milStamp?: string;
  mil?: Mil;
  milSubEspecial?: MilSubEspecial[];
}

export interface MilFa {
  milStamp?: string;
  codMilFa?: number;
  falecData?: string;
  falecLocal?: string;
  circunstancias?: string;
  enterroData?: string;
  enterroLocal?: string;
  numCampa?: string;
  numCertObito?: string;
  obs?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  mil?: Mil;
}

export interface MilFor {
  milForStamp?: string;
  codMilFor?: number;
  tipoFormacao?: boolean;
  curso?: string;
  dataInicio?: string;
  dataTermino?: string;
  nivel?: string;
  duracao?: string;
  tipoInstituicao?: boolean;
  instituicao?: string;
  codPais?: number;
  pais?: string;
  obs?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  milStamp?: string;
  mil?: Mil;
}

export interface MilFot {
  milFotStamp?: string;
  caminho?: string;
  foto?: any;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  milStamp?: string;
  mil?: Mil;
}

export interface MilFuncao {
  milFuncaoStamp?: string;
  milStamp?: string;
  codMilFuncao?: number;
  funcao?: string;
  numOS?: string;
  dataOS?: string;
  dataInicio?: string;
  dataTermino?: string;
  obs?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  orgao?: string;
  unidade?: string;
  subunidade?: string;
  subunidade1?: string;
  subunidade2?: string;
  orgaoStamp?: string;
  unidadeStamp?: string;
  subunidadeStamp?: string;
  subunidade1Stamp?: string;
  subunidade2Stamp?: string;
  mil?: Mil;
}

export interface MilIDigital {
  milStamp?: string;
  caminhoPolegarE?: string;
  polegarE?: any;
  caminhoIndicadorE?: string;
  indicadorE?: any;
  caminhoPolegarD?: string;
  polegarD?: any;
  caminhoIndicadorD?: string;
  indicadorD?: any;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  mil?: Mil;
}

export interface MilLice {
  milLiceStamp?: string;
  codMilLice?: number;
  licenca?: string;
  licencaData?: string;
  dataTermino?: string;
  duracao?: string;
  obs?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  licencaStamp?: string;
  milStamp?: string;
  mil?: Mil;
}

export interface MilLingua {
  milLinguaStamp?: string;
  codMilLingua?: number;
  lingua?: string;
  fala?: string;
  leitura?: string;
  escrita?: string;
  compreensao?: string;
  materna?: boolean;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  milStamp?: string;
  mil?: Mil;
}

export interface MilMed {
  milStamp?: string;
  codMil?: number;
  altura?: number;
  braco?: number;
  cabeca?: number;
  pescoco?: number;
  peito?: number;
  cintura?: number;
  ancas?: number;
  entrepernas?: number;
  calcado?: number;
  peso?: number;
  ombros?: number;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  mil?: Mil;
}

export interface MilPeEmerg {
  milPeEmergStamp?: string;
  codMilPeEmerg?: number;
  nome?: string;
  grau?: string;
  nascProv?: string;
  codNascProv?: number;
  resProv?: string;
  codResProv?: number;
  resDist?: string;
  codResDist?: number;
  resPosto?: string;
  codResPostAdm?: number;
  resLocal?: string;
  codResLocal?: number;
  resBairro?: string;
  resAvenida?: string;
  resQuarteirao?: string;
  numCasa?: string;
  obs?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  milStamp?: string;
  mil?: Mil;
}

export interface MilProm {
  milPromStamp?: string;
  codMilProm?: number;
  categoria?: string;
  patente?: string;
  tipoPromocao?: string;
  dataOS?: string;
  numOS?: string;
  obs?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  patStamp?: string;
  milStamp?: string;
  mil?: Mil;
}

export interface MilRea {
  milStamp?: string;
  codMilRea?: number;
  numOS?: string;
  dataOS?: string;
  destino?: string;
  obs?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  mil?: Mil;
}

export interface MilReco {
  milRecoStamp?: string;
  codMilReco?: number;
  tipoDistincao?: string;
  concessaoDoc?: string;
  orgao?: string;
  data?: string;
  motivo?: string;
  obs?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  milStamp?: string;
  mil?: Mil;
}

export interface MilReg {
  milRegStamp?: string;
  codReg?: number;
  dataReg?: string;
  numOS?: string;
  regime?: string;
  obs?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  regStamp?: string;
  milStamp?: string;
  mil?: Mil;
}

export interface MilRetReaSal {
  milRetReaSalStamp?: string;
  codMilRetReaSal?: number;
  sal?: string;
  unidadeSalario?: string;
  retencaoData?: string;
  reactivacaoData?: string;
  obs?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  milStamp?: string;
  mil?: Mil;
}

export interface MilSa {
  milSaStamp?: string;
  codMilSa?: number;
  doencaSofre?: string;
  doencaSofrida?: string;
  cirurgiaSofrida?: string;
  motivoDoenca?: string;
  datainicioDoenca?: string;
  obs?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  milStamp?: string;
  mil?: Mil;
}

export interface MilSalario {
  milStamp?: string;
  uCerimonial?: boolean;
  saudeMilitar?: boolean;
  recebePatente?: boolean;
  recebeSqtc?: boolean;
  escalao?: string;
  sQTC?: string;
  nivelSalarial?: string;
  nomeBanco?: string;
  nrConta?: string;
  nib?: string;
  obs?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  desconto?: Desconto[];
  mil?: Mil;
  milSalMensal?: MilSalMensal[];
  subsidio?: Subsidio[];
  suplemento?: Suplemento[];
}

export interface MilSalMensal {
  milSalMensalStamp?: string;
  nim?: number;
  nome?: string;
  regime?: string;
  patente?: string;
  especialidade?: string;
  mes?: string;
  ano?: number;
  bonusEspecial?: number;
  sQTC?: number;
  subsPosto?: number;
  subSaudeMG95?: number;
  subSaudeTSS75?: number;
  subSaudeRisco15?: number;
  subSaudeSCET25?: number;
  subSaudeSEXC40?: number;
  suplementoChefia25?: number;
  suplementoSCET10?: number;
  suplementoRisco15?: number;
  forcaEspecial40?: number;
  forcaEspecial50?: number;
  forcaEspecial60?: number;
  desconto2?: number;
  desconto7?: number;
  liquidoActual?: number;
  escalao1?: number;
  escalao2?: number;
  escalao3?: number;
  escalao4?: number;
  escalao5?: number;
  subAlimentacao?: number;
  subTrinta30?: number;
  totalDesconto?: number;
  outroSubsidio?: number;
  totalBonus?: number;
  liquidoRecebe?: number;
  contaBanco?: number;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  milStamp?: string;
  milSalario?: MilSalario;
}

export interface MilSit {
  milSitStamp?: string;
  codMilSit?: number;
  situacao?: string;
  numOS?: string;
  dataOS?: string;
  obs?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  milStamp?: string;
  mil?: Mil;
}

export interface MilSitCrim {
  milSitCrimStamp?: string;
  codMilSitCrim?: number;
  orgao?: string;
  infraccao?: string;
  numProcesso?: string;
  processodata?: string;
  pena?: string;
  detencaoData?: string;
  condenacaoData?: string;
  localPrisao?: string;
  solturaData?: string;
  numDocSoltura?: string;
  obs?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  milStamp?: string;
  mil?: Mil;
}

export interface MilSitDisc {
  milSitDiscStamp?: string;
  codMilSitDisc?: number;
  orgao?: string;
  numOS?: string;
  infracao?: string;
  numProcesso?: string;
  dataProcesso?: string;
  medTomadas?: string;
  dataInicioMedida?: string;
  dataTerminoMedida?: string;
  obs?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  milStamp?: string;
  mil?: Mil;
}

export interface MilSitQPActivo {
  milSitQPActivoStamp?: string;
  codMilSitQPActivo?: number;
  situacaoQpAtivo?: string;
  numOS?: string;
  dataOS?: string;
  localFuncao?: string;
  obs?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  milStamp?: string;
  mil?: Mil;
}

export interface MilSubEspecial {
  milSubEspecialStamp?: string;
  milEspecialStamp?: string;
  subespecialStamp?: string;
  dataSubEspecial?: Date;
  numOS?: string;
  obs?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  milEspecial?: MilEspecial;
}

export interface QualifcTecnica {
  qualifcTecnicaStamp?: string;
  codQualifTecnica?: number;
  descricao?: string;
  grupoSalarial?: string;
  nível_IV?: number;
  nível_III?: number;
  nível_II?: number;
  nível_I?: number;
  com_Mais_de_10_anos?: number;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
}

export interface Reg {
  regStamp?: string;
  codReg?: number;
  descricao?: string;
  abreviatura?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
}

export interface SubEspecial {
  subEspecialStamp?: string;
  codSubespecial?: number;
  descricao?: string;
  codEspecial?: number;
  especialidade?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  especialStamp?: string;
  especial?: Especial;
}

export interface Subsidio {
  subsidioStamp?: string;
  codSubsidio?: number;
  descricao?: string;
  percentgSubsidio?: number;
  obsSubsidio?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  milStamp?: string;
  milSalario?: MilSalario;
}

export interface Subunidade1 {
  subunidade1Stamp?: string;
  codSubunidade1?: number;
  descricao?: string;
  subunidade?: string;
  codOrgao?: string;
  orgao?: string;
  unidade?: string;
  organica?: number;
  totalOfSup?: number;
  totalCor?: number;
  totalTteCor?: number;
  totalMaj?: number;
  totalOfSub?: number;
  totalCap?: number;
  totalTte?: number;
  totalTteMil?: number;
  totalAlf?: number;
  totalAlfMil?: number;
  totalSarg?: number;
  totalInt?: number;
  totalSub?: number;
  totalPriSar?: number;
  totalSegSar?: number;
  totalTerSar?: number;
  totalFur?: number;
  totalPra?: number;
  totalPriCab?: number;
  totalSegCab?: number;
  totalSold?: number;
  provincia?: string;
  codProvincia?: number;
  distrito?: string;
  codDistrito?: number;
  postoAdm?: string;
  codPostoAdm?: number;
  localidade?: string;
  codLocalidade?: number;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  subunidadeStamp?: string;
  totalOf?: number;
  subunidades?: Subunidade;
  subunidade2?: Subunidade2[];
}

export interface Subunidade2 {
  subunidade2Stamp?: string;
  codSubunidade2?: number;
  descricao?: string;
  subunidade?: string;
  subunidade1?: string;
  codOrgao?: number;
  orgao?: string;
  unidade?: string;
  organica?: string;
  totalOf?: number;
  totalOfSup?: number;
  totalCor?: number;
  totalTteCor?: number;
  totalMaj?: number;
  totalOfSub?: number;
  totalCap?: number;
  totalTte?: number;
  totalTteMil?: number;
  totalAlf?: number;
  totalAlfMil?: number;
  totalSarg?: number;
  totalInt?: number;
  totalSub?: number;
  totalPriSar?: number;
  totalSegSar?: number;
  totalTerSar?: number;
  totalFur?: number;
  totalPra?: number;
  totalPriCab?: number;
  totalSegCab?: number;
  totalSold?: number;
  provincia?: string;
  codProvincia?: number;
  distrito?: string;
  codDistrito?: number;
  postoAdm?: string;
  codPostoAdm?: number;
  localidade?: string;
  codLocalidade?: number;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  subunidade1Stamp?: string;
  subunidade11?: Subunidade1;
}

export interface Suplemento {
  suplementoStamp?: string;
  codSuplemento?: number;
  descricao?: string;
  percentgSuplemento?: number;
  obsSuplemento?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  milStamp?: string;
  milSalario?: MilSalario;
}

export interface Telefone {
  telefoneStamp?: string;
  codTelefone?: string;
  telefone1?: number;
  milPeEmergStamp?: string;
  inseriu?: string;
  inseriuDataHora?: Date;
  alterou?: string;
  alterouDataHora?: Date;
  milStamp?: string;
  mil?: Mil;
}

