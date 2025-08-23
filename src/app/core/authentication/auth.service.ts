/* eslint-disable max-len */
import { formatDate } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '@env/environment';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { busca } from 'app/classes/busca';
import { CampoSessoes, condicoesprocura, selects, selectsprocura, selectview } from 'app/classes/CampoSessoes';
import { Cliente, EntradaProcesso, Processo, SaidaProcesso, Unidade } from 'app/classes/ClassesSIGEX';
import { Di, Facc, Fact, Formasp, LineValues, LineValuesParams, LineValuesParamss, MenuItem, Param, Percl, Pgf, RCL, St } from 'app/classes/Facturacao/Facturacao';
import { LoginModel } from 'app/classes/LoginModel';
import { Filepdf, Procura, RecPassword, Selects } from 'app/classes/Procura';
import { Objecto, Resposta } from 'app/classes/Resposta';
import { GenericoService } from 'app/InterfacesSigex/generic-service';
import { BehaviorSubject, Observable, catchError, delay, firstValueFrom, iif, map, merge, of, share, switchMap, tap } from 'rxjs';
import { filterObject, isEmptyObject } from './helpers';
import { DClinicos, EmailRec, Pa, ScanDoc, Token, Trabalho, User, Usuario } from './interface';
import { LoginService } from './login.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

   querryTdoc(): string{
    const tdoc = 'Tdocstamp,Numdoc,Descricao,Sigla,Movstk,Movcc,Descmovcc,Codmovcc,Codmovstk,Descmovstk,Movtz,Codtz,Contastesoura,CCusto,Noneg,Armazem,Tipodoc,Ligapj,Obrigapj,Usaserie,Usalote,Integra,NoDiario,Diario,NDocCont,Descdoccont,Alteranum,CtrlData,Armdefeito,Composto,Obgccusto,Nalteratz,Activo,Defa,Pos,Reserva,Armapenas,Coment,Titulo,Nc,Nomfile,Obs2,No,Nome,Adjudica,Aprova,Codmovtz,Descmovtz,Dias,Nd,Ft,Vd,Usamascara,Mascara,Plafond,Lancaend,Stockmin,Mostraguia,MostraContrato,Lancacustopj,Nomfile2,Nomfile3,Ncobrigadoc,\'\',\'\',Inscricao,Multa,\'\',\'\'';
    return tdoc;
  }


  querryMaxFtFccDiRcl(campo : string): string{
    const querry=` ISNULL(max(convert(int,${campo})),0) +1 as ${campo}`;
    return querry;
  }


  QuerryclFact():string {

const fff=`
''Codcurso,''Curso,''Descgrelha,''Gradestamp,''Nivelac,''Coddep,''Departamento,''Faculdade,''Ccusto,
 ''Ccustostamp,''Tipo,''clstamp,''no,''nome,''Email,''nuit,''morada,''localidade,''Moeda,'' Turma,''Turmastampunion, ''entidadebanc union all
 select Convert(nvarchar(max),Codcurso)Codcurso,CONVERT(nvarchar(max),Curso)Curso,CONVERT(nvarchar(max),Descgrelha)Descgrelha,CONVERT(nvarchar(max),
 Gradestamp)Gradestamp,CONVERT(nvarchar(max),Nivelac)Nivelac,CONVERT(nvarchar(max),Coddep)Coddep,CONVERT(nvarchar(max),Departamento)Departamento,CONVERT(nvarchar(max),Faculdade)Faculdade,CONVERT(nvarchar(max),Ccusto)Ccusto,CONVERT(nvarchar(max),Ccustostamp)Ccustostamp,CONVERT(nvarchar(max),Tipo)Tipo,CONVERT(nvarchar(max),clstamp)clstamp,CONVERT(nvarchar(max),no)no,CONVERT(nvarchar(max),nome)nome,CONVERT(nvarchar(max),Email)Email,CONVERT(nvarchar(max),nuit)nuit,CONVERT(nvarchar(max),morada)morada,CONVERT(nvarchar(max),localidade)localidade,CONVERT(nvarchar(max),Moeda)Moeda ,Turma=(select top 1 Turma.Codigo from Turma join Turmal l on Turma.Turmastamp=l.Turmastamp where l.Clstamp=cl.Clstamp and Turma.Descanoaem=(select AnoSem from param) ),Turmastamp=(select top 1 Turma.Turmastamp from Turma join Turmal l on Turma.Turmastamp=l.Turmastamp where l.Clstamp=cl.Clstamp and Turma.Descanoaem=(select AnoSem from param) ), entidadebanc=(select top 1 Entidadebanc from Contas) `;
    return fff;
  }


  calcularProximoVencimento(dataBase: Date, mesesParaAdicionar: number): Date {
  const novaData = new Date(dataBase);
  const diaOriginal = novaData.getDate();

  novaData.setMonth(novaData.getMonth() + mesesParaAdicionar);

  // Corrige se o mês resultante tiver menos dias (ex: 31 para fevereiro)
  if (novaData.getDate() < diaOriginal) {
    novaData.setDate(0); // Vai para o último dia do mês anterior, que é o último do mês correto
  }

  return novaData;
}
  subtotal:number=0;
  getFactss(): Observable<Fact[]> {
    return this.http.get<Fact[]>(`${this.ApiUrl}Proc2/GetFacts`);
  }
  removeSelectedRow(selectedRowIndex: number | null,
    formArray: FormArray,
    gridDataSource: any[]
  ): any[] {
    if (selectedRowIndex !== null) {
      formArray.removeAt(selectedRowIndex);
      return [...formArray.controls]; // Atualiza o gridDataSource
    } else {
      return gridDataSource; // Retorna o gridDataSource sem alterações
    }
  }
  createFacts(fact: Fact): Observable<void> {
    return this.http.post<void>(`${this.ApiUrl}Proc2/createFact`, fact);
  }
 getFactWithChildren(factstamp: string): Observable<Fact> {
   return this.http.get<Fact>(`${this.ApiUrl}Proc2/${factstamp}`);
 }
//  getStSingle(ststamp: string): Observable<St> {
//   alert(ststamp);
//    return this.http.get<St>(`${this.ApiUrl}Proc2/GetStWithChildren?ststamp=${ststamp}`);
//  }

getStSingle(ststamp: string): Observable<St> {
  return this.http.get<St>(`${this.ApiUrl}Proc2/GetStWithChildren?ststamp=${encodeURIComponent(ststamp)}`);
}
  async getStWithChildren(ststamp: string): Promise<St | null> {
    const url = `/api/proc2/GetStWithChildren?ststamp=${encodeURIComponent(ststamp)}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    });

    if (response.ok) {
        // Supondo que o endpoint retorna um array de St
        return await response.json();
    } else if (response.status === 404) {
        return null;
    } else {
        throw new Error(`Erro ao buscar o St: ${response.statusText}`);
    }
}

 addTesouraria(fb:FormBuilder,tesourariaFormArray:FormArray):
 FormArray{
    const tesourariaGroup = fb.group({
      formaspstamp: [''],
      titulo: [''], // Adiciona o controle 'titulo'
      numtitulo: [''],
      dcheque: [this.ConvertDate(new Date())],
      banco: [''],
      banco2: [''],
      contatesoura: [''],
      valor: [0],
      codtz: [0],
      codtz2: [0],
      contatesoura2: [''],
      contasstamp2: [''],
      trf: [false],
      numer: [false],
      tipo: [false],
      obgTitulo: [false],
      rclstamp: [''],
      oristamp: [''],
      factstamp: [''],
      faccstamp: [''],
      pgfstamp: [''],
      perclstamp: [''],
      status: [false],
      distamp: [''],
      cpoc: [0],
      contaPgc: [0],
      origem: [''],
      mvalor: [0],
      codmovtz: [0],
      descmovtz: [''],
      codmovtz2: [0],
      descmovtz2: [''],
      usrLogin: [''],
      aberturaCaixa: [false],
      no: [''],
      nome: [''],
      numero: [''],
      ccusto: [''],
      contasstamp: [''],
      ccustamp: [''],
      moeda: [''],
      cambiousd: [0],
      caixalstamp: [''],
      caixastamp: [''],
    });
    tesourariaFormArray.push(tesourariaGroup); // Adiciona o FormGroup ao FormArray
    return tesourariaFormArray;
  }
  generateFormGroup(entity: any,fb:FormBuilder): FormGroup {
    const formGroupConfig: { [key: string]: any } = {};
  Object.keys(entity).forEach((key) => {
      const value = entity[key];
      if (value === null || value === undefined) {
        formGroupConfig[key] = [''];
      } else if (typeof value === 'string') {
        formGroupConfig[key] = [value];
      } else if (typeof value === 'number') {
        formGroupConfig[key] = [value];
      } else if (typeof value === 'boolean') {
        formGroupConfig[key] = [value];
      } else if (value instanceof Date) {
        formGroupConfig[key] = [value];
      } else if (Array.isArray(value)) {
        formGroupConfig[key] = [value]; // Inicializa com o array
      } else {
        formGroupConfig[key] = [value];
      }
    });
    return fb.group(formGroupConfig);
  }
  deleteFacts(factstamp: string): Observable<void> {
    return this.http.delete<void>(`${this.ApiUrl}Proc2/${factstamp}`);
  }
   iva:number=0;
   desconto:number=0;
   descComercial:number=0;
   descFinanceiro:number=0;
   totalIVA:number=0;
   total:number=0;

GetParam(): Param {
  const usr = this.obterSessao() as Usuario;
   const p:Param={
      paramstamp: '',
      codprod: '',
      imprimeMultDocumento: false,
      codprodMascra: '',
      vendeservico: false,
      ano: 0,
      prodenum: false,
      ivcodentr: 0,
      ivdescentr: '',
      ivcodsai: 0,
      ivdescsai: '',
      usames: false,
      contmascara: '',
      mostranib: false,
      intervalo: 0,
      fillvalue: false,
      mostraProdutoSemStock: false,
      excluemascara: false,
      diarioMesNum: false,
      diarioDiamesnum: false,
      diarioAnonum: false,
      criaContacc: false,
      usanumauto: false,
      nummascara: '',
      mascfact: '',
      radicalfact: '',
      actualizapreco: false,
      montanumero: false,
      tipooperacao: '',
      numImpressao: 0,
      printfile: '',
      printfile2: '',
      mostraendereco: false,
      smtpserver: '',
      smtpport: 0,
      outgoingemail: '',
      outgoingpassword: '',
      subjemail: '',
      emailtext: '',
      autoprecos: false,
      perlucro: 0,
      anoref: 0,
      localrdlc: false,
      usalocalreport: false,
      criacl: false,
      criafnc: false,
      criast: false,
      criacontas: false,
      criacontasprazo: false,
      criape: false,
      ivaposdesconto: false,
      contaIrps: '',
      contaIrpsdesc: '',
      contaiva85: '',
      contaiva85desc: '',
      naomostradatain: false,
      naomostradatater: false,
      naomostraduracao: false,
      naomostrasequencia: false,
      poObrigatorio: false,
      pjFechoautomatico: false,
      taxaInsspe: 0,
      taxaInssemp: 0,
      diastrab: 0,
      ponaorepete: false,
      modeloja: false,
      integracaoautomatica: false,
      aredondamento: 2,
      posicao: 0,
      totalinteiro: false,
      mostraccusto: false,
      integradocs: false,
      obrigaNc: false,
      codsrc: '',
      codactivo: '',
      duodessimos: false,
      depmensais: false,
      esconderef: false,
      escondestock: false,
      escondecolprecos: false,
      preconormal: '',
      ecranPosPequeno: false,
      mostrarefornec: false,
      naoaredonda: false,
      horastrab: 0,
      obrigaBi: false,
      segundavia: false,
      mostraTodasContas: false,
      paramImp: [],
      paramgct: [],
      parampv: [],
      paramemail: [],
      origem: 0,
      geraGuiaAutomatica: false,
      anolectivo: 0,
      anoSem: '',
      mascaracl: '',
      usacademia: false,
      dispensa: false,
      exclui: false,
      matriculaComCCaberto: false,
      removematricula: false,
      naoverificaNuit: false,
      emailRespo: '',
      modulos: 0,
      permiteApagarPos: false,
      usaMultRefereciaSt: false,
      usaLotes: false,
      campomultiuso: ''
    };
    p.aredondamento=usr.codUsuario;
    p.ivaposdesconto=usr.edaSic;
    return p;
}
   totaisLinhas(dr: any, ivaIncluso: boolean = false,
    tblename:string): void {
     const ivc = ivaIncluso || dr.ivainc;
  let valorIva = 0;
  let mvalorIva = 0;
  if (ivc)
  {
      valorIva = Number(dr.preco)-Number(dr.preco) /
      (1 + Number(dr.txiva) / 100);
    const sub = (Number(dr.quant) * Number(dr.preco)
      / (1 + Number(dr.txiva) / 100));
      dr.subtotall=sub;
      mvalorIva = Number(dr.mPreco)-Number(dr.mPreco) / (1 + Number(dr.txiva) / 100);


      dr.mSubtotall = (Number(dr.quant) * Number(dr.mPreco)
      / (1 + Number(dr.txiva) / 100));
  }
  else
  {
      dr.subtotall = (Number(dr.quant) * Number(dr.preco));
      dr.mSubtotall = (Number(dr.quant) * Number(dr.mPreco));
  }
		const subtotal = Number(dr.subtotall);
  const msubtotal = Number(dr.mSubtotall);

  const tbl = tblename.toLowerCase();
  if (tbl=='dil')
  {
      if (!dr.ativo)
      {
          if (Number(dr.perdesc) >0)
          {
              if (ivc)
              {
                  dr.descontol = ((subtotal-valorIva) * Number(dr.perdesc) / 100);
                  dr.mDescontol = ((msubtotal-mvalorIva) * Number(dr.perdesc) / 100);
                  dr.subtotall=Number(dr.subtotall)-Number(dr.descontol);
                  dr.mSubtotall=Number(dr.mSubtotall)-Number(dr.mDescontol);
              }
              else
              {
                  dr.descontol = (subtotal * Number(dr.perdesc) / 100);
                  dr.mDescontol = (msubtotal * Number(dr.perdesc) / 100);
                  dr.subtotall=Number(dr.subtotall)-Number(dr.descontol);
                  dr.mSubtotall=Number(dr.mSubtotall)-Number(dr.mDescontol);
              }
          }
          else if (dr.descontol >0)
          {
              if (ivc)
              {
                  dr.perdesc=(Number(dr.descontol)/(subtotal-valorIva)*100);
                  dr.mDescontol = ((msubtotal-mvalorIva) * Number(dr.perdesc) / 100);
                  dr.subtotall=Number(dr.subtotall)-Number(dr.descontol);
                  dr.mSubtotall=Number(dr.mSubtotall)-Number(dr.mDescontol);
              }
              else
              {
                  dr.perdesc=(Number(dr.descontol)/subtotal*100);
                  dr.mDescontol = (msubtotal * Number(dr.perdesc) / 100);
                  dr.subtotall=Number(dr.subtotall)-Number(dr.descontol);
                  dr.mSubtotall=Number(dr.mSubtotall)-Number(dr.mDescontol);
              }
          }
          const ivaposdesconto =  this.GetParam().ivaposdesconto;
          if (ivaposdesconto)
          {
              dr.valival = ((subtotal-Number(dr.descontol)) * Number(dr.txiva) / 100);
              dr.mvalival = ((msubtotal-Number(dr.mDescontol)) * Number(dr.txiva) / 100);
          }
          else
          {
              dr.valival = (subtotal * Number(dr.txiva) / 100).
              toFixed(this.GetParam().aredondamento);
              dr.mvalival = (msubtotal * Number(dr.txiva) / 100);
          }
          dr.totall= (subtotal - Number(dr.descontol) + Number(dr.valival));
          dr.mTotall = (msubtotal - Number(dr.mDescontol) +Number(dr.mvalival));
      }
      else
      {
          //Verifica se a coluna editada foi a do Percentual de Desconto
          if (Number(dr.perdesc)>0)
          {
              // Garante que as células não sejam nulas
              if (dr.preco == null || dr.perdesc == null) return;
              // Obtém o preço original e o percentual de desconto
              const precoOriginal = parseFloat(dr.preco?.toString() ?? '');
              const percentualDesconto = parseFloat(dr.perdesc?.toString() ?? '');
              if (!isNaN(precoOriginal) && !isNaN(percentualDesconto)) {
                  if (precoOriginal > 0 && percentualDesconto > 0)
                  {
                      // Calcula o valor do desconto
                      const valorDesconto = precoOriginal * (percentualDesconto / 100);
                      // Atualiza as células no DataGridView
                      dr.descontol = valorDesconto;
                      //dr["PrecoPromo"] = precoPromocional;
                  }
                  else
                  {
                      // Caso não tenha valores válidos, zera os campos
                     dr.precoPromo = precoOriginal;
                      dr.descontol = 0;
                  }
              }
          }
      }
  }
  else
  {
      if (Number(dr.perdesc) >0)
      {
          if (ivc)
          {
              dr.descontol = ((subtotal-valorIva) * Number(dr.perdesc) / 100);
              dr.mDescontol = ((msubtotal-mvalorIva) * Number(dr.perdesc) / 100);
              dr.subtotall=Number(dr.subtotall)-Number(dr.descontol);
              dr.mSubtotall=Number(dr.mSubtotall)-Number(dr.mDescontol);
          }
          else
          {
              dr.descontol = (subtotal * Number(dr.perdesc) / 100);
              dr.mDescontol = (msubtotal * Number(dr.perdesc) / 100);
              dr.subtotall=Number(dr.subtotall)-Number(dr.descontol);
              dr.mSubtotall=Number(dr.mSubtotall)-Number(dr.mDescontol);
          }
      }
      else if (dr.descontol >0)
      {
          if (ivc)
          {
              dr.perdesc=(Number(dr.descontol)/(subtotal-valorIva)*100);
              dr.mDescontol = ((msubtotal-mvalorIva) * Number(dr.perdesc) / 100);
              dr.subtotall=Number(dr.subtotall)-Number(dr.descontol);
              dr.mSubtotall=Number(dr.mSubtotall)-Number(dr.mDescontol);
          }
          else
          {
              dr.perdesc=(Number(dr.descontol)/subtotal*100);
              dr.mDescontol = (msubtotal * Number(dr.perdesc) / 100);
              dr.subtotall=Number(dr.subtotall)-Number(dr.descontol);
              dr.mSubtotall=Number(dr.mSubtotall)-Number(dr.mDescontol);
          }
      }
      //const ivaposdesconto = this.GetField('Ivaposdesconto', 'param');

const ivaposdesconto =  this.GetParam().ivaposdesconto;
      if (ivaposdesconto)
      {
          dr.valival = ((subtotal-Number(dr.descontol)) * Number(dr.txiva) / 100);
          dr.mvalival = ((msubtotal-Number(dr.mDescontol)) * Number(dr.txiva) / 100);
      }
      else
      {
          dr.valival = (subtotal * Number(dr.txiva) / 100);
          dr.mvalival = (msubtotal * Number(dr.txiva) / 100);
      }
      dr.totall= (subtotal - Number(dr.descontol) + Number(dr.valival));
      dr.mTotall = (msubtotal - Number(dr.mDescontol) + Number(dr.mvalival));
  }


   }

updateLineValues(factlFormArray: FormArray, groups: FormGroup, tableName: string = 'factl') {
 factlFormArray.controls.forEach((group: AbstractControl) => {
    group.valueChanges.subscribe(val => {
      // Recalcula os valores da linha
      this.totaisLinhas(val, val.ivainc, tableName);
      // Atualiza o campo subtotal sem disparar outro evento
      const subtotalControl = val.subtotall;
     group.get('subtotall')?.setValue(subtotalControl, { emitEvent: false });
      group.get('totall')?.setValue(val.totall, { emitEvent: false });
group.get('valival')?.setValue(val.valival, { emitEvent: false });
group.get('descontol')?.setValue(val.descontol, { emitEvent: false });


      // Recalcula os totais gerais
    });
  });

      this.recalculateAllSubtotals(factlFormArray,groups);
}
recalculateAllSubtotals(factlFormArray: FormArray, frmFtForm: FormGroup) {
  // Reseta os acumuladores
  this.subtotal = 0;
  this.total = 0;
  this.desconto = 0;
  this.totalIVA = 0;
 const totals = factlFormArray.controls.reduce(
    (acc, control) => {
      return {
        subtotal: acc.subtotal + (control.get('subtotall')?.value || 0),
        desconto: acc.desconto + (control.get('descontol')?.value || 0),
        total: acc.total + (control.get('totall')?.value || 0),
        totaliva: acc.totaliva + (control.get('valival')?.value || 0),
      };
    },
    { subtotal: 0, desconto: 0, total: 0, totaliva: 0 }
  );
  // Atualiza os campos no formulário principal
  frmFtForm.patchValue({
    subtotal: totals.subtotal,
    total: totals.total,
    desconto: totals.desconto,
    totaliva: totals.totaliva
  });

}

SetLinevaluesssssss(factlFormArray: FormArray, group: FormGroup,
  nometabela:string=`factl`) {
this.updateLineValues(factlFormArray,group,nometabela);
}
recalcularTodosSubtotais(factlFormArray: FormArray, frmFtForm: FormGroup) {
  this.recalculateAllSubtotals(factlFormArray,frmFtForm);

}

async setLineValue<T extends object>(params: LineValuesParams<T>):
 Promise<any> {
  const {
    line, st, entity, compra, row, nc, moedavenda, moedacambio, entidadestamp,
    moedaBase  } = params;
  if (!line) return;
  let tmpValor: any  = null;
  let sempreComMoedaVenda = false;
  if (!row) {
 const data = await this.getFieldArray('*', 'StPrecos',
  `ltrim(rtrim(ststamp)) = '${st.ststamp.trim()}' and Ccustamp=(select top 1 Ccustamp from ccu) and
   moeda ='${moedavenda}'`);
tmpValor = data?.length > 0 ? data[0] : tmpValor;
    if (!tmpValor) {
 const data = await this.getFieldArray('*', 'StPrecos',
  `ltrim(rtrim(ststamp)) = '${st.ststamp.trim()}' and Ccustamp=(select top 1 Ccustamp from ccu)`);
      tmpValor = data?.length > 0 ? data[0] : tmpValor;
      sempreComMoedaVenda = true;
    }
  }
  let valor = 0;
  let vainc = false;
  if (tmpValor) {
    valor = compra ? tmpValor.PrecoCompra : tmpValor.Preco;
    vainc = tmpValor.Ivainc;
  } else if (row) {
    valor = +row.preco || 0;
  }
  if (!row) {
    if (!line.quant || line.quant === 0) {
      line.quant = nc ? -1 : 1;
    }
  } else {
    line.quant = +row.quant || 0;
  }
  if (st.campomultiuso && st.campomultiuso.split(',').includes('1')) {
    line.campomultiuso = '1';
  }
const user=this.obterSessao() as Usuario;
  line.lotevalid = new Date();
  line.activo = st.activo;
  line.ststamp = st.ststamp;
  line.perdesc = 0;
  line.descontol = 0;
  line.valival = 0;
  line.descricao = st.descricao?.trim();
  line.ref = st.referenc?.trim();
  line.oristamp = st.ststamp;
  line.ivainc = vainc;
  line.txiva = st.txiva;
  line.tabiva = st.tabiva;
  line.usaquant2 = st.usaquant2;
  line.codccu =user.direcao; //user.codccu;
  line.ccusto = user.direcao;
  line.composto = st.composto;
  line.codigoBarras = st.codigoBarras;
  try {
    line.usalote = st.usalote;
  } catch { /* ignore */ }
  line.entidadestamp = entidadestamp;
  line.preco = valor;

const aredondamento =  this.GetParam().aredondamento;
  if (moedavenda.toLowerCase() !== moedaBase.toLowerCase()) {
    await this.newMethod(line, moedavenda, sempreComMoedaVenda, valor, aredondamento);
    line.moeda = moedavenda;
    line.moeda2 = moedaBase;
  } else if (moedacambio.toLowerCase() === moedaBase.toLowerCase()) {
    await this.newMethod(line, moedavenda, sempreComMoedaVenda, valor, aredondamento);
    line.moeda = moedavenda;
    line.moeda2 = moedaBase;
  } else if (moedacambio && moedacambio.toLowerCase() !== moedaBase.toLowerCase()) {
    await this.newMethod(line, moedacambio, sempreComMoedaVenda, valor, aredondamento);
    line.moeda = moedavenda;
    line.moeda2 = moedacambio;
  } else {
    line.moeda = moedavenda;
    line.moeda2 = '';
    line.cambiousd = 0;
    line.preco = valor;
    line.mpreco = 0;
  }
  line.mvalival = 0;
  line.mdescontol = 0;
  line.msubtotall = 0;
  line.mtotall = 0;
  line.servico = st.servico;
  line.unidade = st.unidade;
  const tbname = (line.tableName || '').toLowerCase();
  if (['factl', 'faccl', 'dil'].includes(tbname)) {
    line.gasoleo = st.gasoleo;
    line.numdoc = this.getValue('numdoc', params.entity);
    line.sigla = this.getValue('Sigla',  params.entity);
    line.tit = st.composto;
    line.status = false;
    line.cpoc = +st.cpoc || 0;
  }
  if (st.servico) return;
  line.armazem = 0; //user.codarm;
  line.descarm =''; //user.armazem;
  line.armazemstamp =''; //user.armazemstamp;
  const tmpFnc = await this.getFieldArray('codigo,reffnc', 'StFnc',`ststamp='${st.ststamp.trim()}'
   and Padrao=1`);
  if (!tmpFnc || tmpFnc.length === 0) return;
  if ((entity as any).constructor.name === 'Facc') {
    line.reffornecl = tmpFnc[0].reffnc;
  }
  return line;
}
async getFieldArray(campo: string, tabela: string, condicao?: string): Promise<any[]> {
  const params = new URLSearchParams({ campo, tabela });
  if (condicao) {
    params.append('condicao', condicao);
  }

  const cond = condicao ?? '';
 const obj:Objecto={
      dados: campo,
      tabela,
      condicao:cond,
      sucesso: false
    };
return this.GetFielddt(obj);
}


 generateStamp(): string {
    // Simulate a unique stamp (adapt as needed)
    const now = new Date();
    return `${now.getMilliseconds()}D${now.getFullYear()}${now.getMonth() + 1}MDN${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
}

generateFormGroupFromInterface<T>(entity: T, fb: FormBuilder): FormGroup {
  const formGroupConfig: { [key: string]: any } = {};

  // Itera sobre as propriedades da interface
  Object.keys(entity as object).forEach((key) => {
    const value = (entity as any)[key];

    // Verifica se o campo é "subTotal" ou outros campos que devem ser desabilitados
    if (key === 'subtotall') {
  if (value != null) {
      formGroupConfig[key] =[{ value, disabled: true }]; // Campo de texto
  } else{
      formGroupConfig[key] = [{ value: '', disabled: true }]; // Campo desabilitado

  }

       }
    else if (key === 'txiva') {
  if (value != null) {
      formGroupConfig[key] = [value]; // Campo de texto
  } else{
      formGroupConfig[key] = [16]; // Campo de texto
  }
    }
    else if (key === 'tabiva') {
  if (value != null) {
      formGroupConfig[key] =[value]; // Campo de texto
  } else{
      formGroupConfig[key] = [2]; // Campo desabilitado

  }
    }
    else if (key === 'quant') {
  if (value != null) {
      formGroupConfig[key] =[value]; // Campo de texto
  } else{
      formGroupConfig[key] = [1 ]; // Campo desabilitado

  }
    }
     else if (typeof value === 'string') {
  if (value != null) {
      formGroupConfig[key] =[value]; // Campo de texto
  } else{
      formGroupConfig[key] = ['']; // Campo desabilitado

  }
    } else if (typeof value === 'number') {
      if (value != null) {
      formGroupConfig[key] =[value ]; // Campo de texto
  } else{
      formGroupConfig[key] = [0]; // Campo desabilitado

  }// Campo numérico
    } else if (typeof value === 'boolean') {
       if (value != null) {
      formGroupConfig[key] =[value]; // Campo de texto
  } else{
      formGroupConfig[key] = [false]; // Campo desabilitado

  }
    } else if (value instanceof Date) {


        if (value != null) {
      formGroupConfig[key] =[value]; // Campo de texto
  } else{
      formGroupConfig[key] = [new Date()]; // Campo desabilitado

  }
    } else if (Array.isArray(value)) {
      formGroupConfig[key] = [[]]; // Campo de array
    } else {
      formGroupConfig[key] = ['']; // Campo genérico para outros tipos
    }
  });

  // Retorna o FormGroup gerado
  return fb.group(formGroupConfig);
}




/**
  const obj: T = {} as T; // Cria um objeto vazio que segue a interface

  // Validate and ensure types match between defaults and T
  for (const key in defaults) {
    if (Object.prototype.hasOwnProperty.call(defaults, key)) {
      const value = defaults[key];
      if (typeof value !== typeof obj[key]) {
  const obj: T = {} as T; // Cria um objeto vazio que segue a interface

  // Define valores padrão para cada propriedade com base no tipo
  for (const prop in defaults) {
    if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
      const value = defaults[prop];
      if (Array.isArray(value)) {
        obj[prop] = []; // Valor padrão para arrays
      } else if (typeof value === 'string') {
        obj[prop] = ''; // Valor padrão para strings
      } else if (typeof value === 'number') {
        obj[prop] = 0; // Valor padrão para números
      } else if (typeof value === 'boolean') {
        obj[prop] = false; // Valor padrão para booleanos
      } else if ((typeof value === 'object' && value !== null && (value as object) instanceof Date) || Object.prototype.toString.call(value) === '[object Date]') {
        obj[prop] = new Date(); // Valor padrão para datas
      } else if (typeof value === 'object' && value !== null) {
        obj[prop] = {}; // Valor padrão para objetos
      } else {
        obj[prop] = null; // Valor padrão para outros tipos
      }
    }
  }
      }
    }
  }
 *
 * @template T - The type of the object to be created.
 * @param defaults - An optional object containing default values for the properties.
 * @returns A new object of type T with default values applied.
 */
DoAddLine<T extends Record<string, any>>(defaults: Partial<T> = {}): T {
  const obj: T = {} as T; // Cria um objeto vazio que segue a interface

  // Define valores padrão para cada propriedade com base no tipo
  for (const prop in defaults) {
    if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
      const value = defaults[prop];
      if (Array.isArray(value)) {
        obj[prop] = [] as any; // Valor padrão para arrays
      } else if (typeof value === 'string') {
        obj[prop] = '' as any; // Valor padrão para strings
      } else if (typeof value === 'number') {
        obj[prop] = 0 as any; // Valor padrão para números
      } else if (typeof value === 'boolean') {
        obj[prop] = false as any; // Valor padrão para booleanos
      } else if ((typeof value === 'object' && value !== null && (value as object) instanceof Date) || Object.prototype.toString.call(value) === '[object Date]') {
        obj[prop] = new Date() as any; // Valor padrão para datas
      } else if (typeof value === 'object' && value !== null) {
        obj[prop] = {} as any; // Valor padrão para objetos
      } else {
        obj[prop] = null as any; // Valor padrão para outros tipos
      }
    }
  }

  // Mescla os valores padrão com os valores fornecidos
  return { ...obj, ...defaults };
}
// DoAddLine<T extends Record<string, any>>(entityName: string): T {
//   const obj: any = {};

//   // Define valores padrão para cada propriedade com base no tipo
//   for (const prop of Object.keys(obj)) {
//     const value = obj[prop];
//     // Se o nome da propriedade for igual ao nome da entidade + 'stamp', define como ''
//     if (prop.toLowerCase() === `${entityName.toLowerCase()}stamp`) {
//       obj[prop] = this.Stamp(); // Valor padrão para propriedades do tipo 'stamp'
//     } else if (Array.isArray(value)) {
//       obj[prop] = []; // Valor padrão para arrays
//     } else if (typeof value === 'string') {
//       obj[prop] = ''; // Valor padrão para strings
//     } else if (typeof value === 'number') {
//       obj[prop] = 0; // Valor padrão para números
//     } else if (typeof value === 'boolean') {
//       obj[prop] = false; // Valor padrão para booleanos
//     } else if (value instanceof Date || Object.prototype.toString.call(value) === '[object Date]') {
//       obj[prop] = new Date(); // Valor padrão para datas (data atual)
//     } else if (typeof value === 'object' && value !== null) {
//       obj[prop] = {}; // Valor padrão para objetos
//     } else {
//       obj[prop] = null; // Valor padrão para outros tipos
//     }
//   }

//   return obj as T;
// }
 SetDefault<T extends Record<string, any>>(obj: T): T {
    const result = { ...obj };

    for (const key in result) {
        if (!Object.prototype.hasOwnProperty.call(result, key)) continue;
        const value = result[key];

        // Handle Date
        if ((typeof value === 'object' && value !== null && (value as object) instanceof Date) || Object.prototype.toString.call(value) === '[object Date]') {
            if (!value || isNaN(new Date(value).getTime()) || value.toString().includes('0001')) {
                result[key] = new Date(1900, 0, 1) as T[Extract<keyof T, string>]; // January is 0 in JS
            }
        }
        // Handle string
        else if (typeof value === 'string') {
            if (!value) {
                result[key] = '' as T[Extract<keyof T, string>];
            }
        }
        // Handle number (covers int, decimal, etc.)
        else if (typeof value === 'number') {
            if (value === null || value === undefined || isNaN(value)) {
                result[key] = 0 as T[Extract<keyof T, string>];
            }
        }
        // Handle boolean
        else if (typeof value === 'boolean') {
            if (value === null || value === undefined) {
                result[key] = false as T[Extract<keyof T, string>];
            }
        }
        // Handle byte[] equivalent (Uint8Array)
        else if (value && typeof value === 'object' && (value as object) instanceof Uint8Array) {
            if (!value || (value as Uint8Array).length === 0) {
                result[key] = new Uint8Array(0) as T[Extract<keyof T, string>];
            }
        }
        // Optionally handle null/undefined for any other type
        else if (value === null || value === undefined) {
            result[key] = value;
        }
    }

    return result;
}

Inicializadorformasp():Formasp{

const data=new Date();
  const linha:
Formasp={
  formaspstamp: '',
  titulo: '',
  numtitulo: '',
  dcheque: data,
  banco: '',
  banco2: '',
  contatesoura: '',
  valor: 0,
  codtz: 0,
  codtz2: 0,
  contatesoura2: '',
  contasstamp2: '',
  trf: false,
  numer: false,
  tipo: false,
  obgTitulo: false,
  rclstamp: '',
  oristamp: '',
  factstamp: '',
  faccstamp: '',
  pgfstamp: '',
  perclstamp: '',
  status: false,
  distamp: '',
  cpoc: 0,
  contaPgc: 0,
  origem: '',
  mvalor: 0,
  codmovtz: 0,
  descmovtz: '',
  codmovtz2: 0,
  descmovtz2: '',
  usrLogin: '',
  aberturaCaixa: false,
  no: '',
  nome: '',
  numero: '',
  ccusto: '',
  contasstamp: '',
  ccustamp: '',
  moeda: '',
  cambiousd: 0,
  caixalstamp: '',
  caixastamp: '',
  fact: {} as Fact, // Inicializa como um objeto vazio
  facc: {} as Facc, // Inicializa como um objeto vazio
  rcl: {} as RCL, // Inicializa como um objeto vazio
  pgf: {} as Pgf, // Inicializa como um objeto vazio
  di: {} as Di, // Inicializa como um objeto vazio
  percl: {} as Percl, // Inicializa como um objeto vazio

};
return linha;
}

InicializadorLinhas():LineValues{

const data=new Date();
  const linha:
LineValues={
  stamp:this.Stamp(),
  ststamp: '',
  entidadestamp: '',
  numdoc: 0,
  sigla: '',
  ref: '',
  descricao: '',
  quant: 0,
  unidade: '',
  armazem: 0,
  preco: 0,
  mpreco: 0,
  tabiva: 0,
  txiva: 0,
  valival: 0,
  mvalival: 0,
  ivainc: false,
  activo: false,
  perdesc: 0,
  descontol: 0,
  mdescontol: 0,
  subtotall: 0,
  msubtotall: 0,
  totall: 0,
  mtotall: 0,
  status: false,
  lotevalid: data,
  lotelimft: data,
  usalote: false,
  lote: '',
  obs: '',
  servico: false,
  oristampl: '',
  dispon: 0,
  qttOrig: 0,
  nmovstk: false,
  oristamp: '',
  tit: false,
  ordem: 0,
  stkprod: false,
  lineAnulado: false,
  titstamp: '',
  contatz: 0,
  pack: 0,
  cpoc: 0,
  cpoo: 0,
  composto: false,
  descarm: '',
  refornec: '',
  usaquant2: false,
  quant2: 0,
  morada: '',
  telefone: '',
  entrega: false,
  dataentrega: data,
  pcontacto: '',
  email: '',
  pais: '',
  guias: '',
  contrato: '',
  gasoleo: false,
  cambiousd: 0,
  moeda: '',
  moeda2: '',
  ccusto: '',
  codccu: '',
  armazemstamp: '',
  codigobarras: '',
  stRefFncCodstamp: '',
  campomultiuso: '',
  precoPromo: 0
};
return linha;
}

 MetodoNovos<TEntity = any, TLine = any>(
  defaults: Partial<LineValuesParamss<TEntity, TLine>> = {}
): LineValuesParamss<TEntity, TLine> {

  const baseParams: LineValuesParamss<TEntity, TLine> = {
    st: null as any, // Dados de stock/artigo (deve ser fornecido externamente)
    compra: false,
    moedavenda: 'MZN',
    moedacambio: '',
    moedaBase: 'MZN',
    nc: false,
    entidadestamp: '',
    entity: {} as TEntity, // Objeto genérico para `entity`
    line: {} as TLine, // Objeto genérico para `line`
  };

  // Mescla os valores padrão com os valores fornecidos
  return { ...baseParams, ...defaults };
}

MetodoNovo<TEntity = any>(
  defaults: Partial<LineValuesParams<TEntity>> = {}
): LineValuesParams<TEntity> {
  const baseParams: LineValuesParams<TEntity> = {
    st: null as any, // Dados de stock/artigo (deve ser fornecido externamente)
    compra: false,
    moedavenda: 'MZN',
    moedacambio: '',
    moedaBase: 'MZN',
    nc: false,
    entidadestamp: '',
    entity: {} as TEntity, // Objeto genérico para `entity`
    line: {} as any, // Objeto genérico para `line`
  };
  // Mescla os valores padrão com os valores fornecidos
  return { ...baseParams, ...defaults };
}

async GetFielddt(obj: Objecto): Promise<any> {
  const params = new HttpParams()
    .set('campo', obj.dados)
    .set('tabela', obj.tabela)
    .set('condicao', obj.condicao || '');

  const url = `${this.ApiUrl}Proc2/getfield`;

  try {
    const response = await firstValueFrom(this.http.get<any>(url, { params }));

    return response;
  } catch (error) {
    throw new Error('Erro ao buscar dados');
  }
}

 getValue<T extends object>(campo: string, ent: T): any {
  const key = Object.keys(ent).find(k => k.toLowerCase() === campo.toLowerCase());
  return key ? (ent as any)[key] : null;
}
    GetField(valor: Objecto): Observable<Resposta<any>>{
    return this.http.post<Resposta<any>>(`${this.ApiUrl}Proc2/getfield`,valor);
    }
// Helper for currency conversion logic
async  newMethod(
  line: any,
  moedavenda: string,
  sempreComMoedaVenda: boolean,
  valor: number,
  aredondamento: number,
) {

const data = await this.getFieldArray(moedavenda,'cambio');
const txcambio = data?.length > 0 ? data[0].cambio : 0;
  if (!sempreComMoedaVenda) {
    line.preco = valor;
    if (txcambio > 0) {
      line.mpreco = +(valor / txcambio).toFixed(aredondamento);
    }
  } else {
    line.preco = +(valor * txcambio).toFixed(aredondamento);
    line.mpreco = valor;
  }
  line.cambiousd = txcambio;
}









  ConvertDateYear(Data: Date){
    const tttttt = formatDate(Data, 'yyyy', 'en-US');
    return tttttt;
  }
  ConvertDateMont(Data: Date){
    const tttttt = formatDate(Data, 'MM', 'en-US');
    return tttttt;
  } ConvertDateday(Data: Date){
    const tttttt = formatDate(Data, 'dd', 'en-US');
    return tttttt;
  }
  formatDatexxx(date: Date): string {
    const year = this.ConvertDateYear(date);
    const month = this.ConvertDateMont(date); // Mês começa do 0, então adicionamos 1
    const day = this.ConvertDateday(date);

    return `${year}-${month}-${day}`;
  }
  getBrowserLanguage(): string {
    return navigator.language || (navigator as any).userLanguage;
  }
  setAppLanguage(): void {
    const browserLanguage = this.getBrowserLanguage();
    if (!browserLanguage.startsWith('en')) {
      document.documentElement.lang = 'en';
      }
  }
  private readonly loginService = inject(LoginService);
  private readonly tokenService = inject(TokenService);
  private ApiUrl = `${environment.Apiurl}`;
  usr !: Usuario;
  protected readonly http = inject(HttpClient);

    getFacts(): Observable<Fact[]> {
    return this.http.get<Fact[]>(this.ApiUrl);
  }

  createFact(fact: Fact): Observable<void> {
    return this.http.post<void>(this.ApiUrl, fact);
  }

  deleteFact(factstamp: string): Observable<void> {
    return this.http.delete<void>(`${this.ApiUrl}/${factstamp}`);
  }
  Fazerlogin(username: string, password: string, rememberMe = false){
    const usuario:LoginModel={
      Login: username,
      PasswordHash: password
    };
    return this.http.post<Resposta<CampoSessoes>>(`${this.ApiUrl}Users/IniciarSessao`, usuario);
    }
    getSelection(sele:condicoesprocura):  Observable<Resposta<selectview>>{
      return this.http.post<Resposta<selectview>>(`${this.ApiUrl}Proc2/ComboboxesPost17`,sele);
      }

         listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.ApiUrl}Users/listarClientes`);
  }

getMenusPorGrupo(grupoId: string): Observable<MenuItem[]> {
  return this.http.get<MenuItem[]>(`${this.ApiUrl}Buscas/menus-por-grupo/${grupoId}`);
}

salvarPermissoes(grupoId: string, selecionados: string[]): Observable<any> {
  return this.http.post(`${this.ApiUrl}Buscas/atualizar-permissoes`, {
    grupoId,
    menusSelecionados: selecionados
  });
}

   registrarVenda(venda: any): Observable<any> {
    return this.http.post(`${this.ApiUrl}Users/GravarVendas`, venda);
  }
    InicializarProcesso(pastamp:string):Processo{

const usuario=this.obterSessao() as Usuario;
const processoStampss=this.Stamp();
const dClinicos:DClinicos={
  paStamp: '',
  dadosAnamense: '',
  examesObjectivos: '',
  examesClinicos: '',
  diaDef: '',
  conclusao: '',
  inseriu: '',
  inseriuDataHora: '',
  alterou: '',
  alterouDataHora: ''
};

const pa:Pa={
  paStamp: pastamp,
  nome: '',
  sexo: '',
  numBi: '',
  naturalidade: '',
  resProv: '',
  resDist: '',
  resPosto: '',
  resLocal: '',
  resBairro: '',
  resQuarteirao: '',
  resAvenida: '',
  numCasa: '',
  conPrinc: '',
  conAlter: '',
  ramo: '',
  orgao: '',
  unidade: '',
  subunidade: '',
  patente: '',
  catpat: '',
  inseriu: '',
  inseriuDataHora: '',
  alterou: '',
  alterouDataHora: '',
  tipodoc: '',
  activo: false,
  path: '',
  dClinicos,
  processo: [],
  junta: '',
  juntaHom: '',
  scanDoc: [],
  path1: ''
};
      const processos:Processo={
        processoStamp: processoStampss,
        numero: 0,
        tipoDoc: '',
        assunto: '',
        inseriu: usuario.nome,
        inseriuDataHora: this.ConvertDate(new Date()),
        alterou: usuario.nome,
        alterouDataHora: this.ConvertDate(new Date('2007-01-01')),
        orgao: usuario.orgao,
        direcao: usuario.direcao,
        departamento: usuario.departamento,
        orgaostamp: usuario.orgaostamp,
        departamentostamp: usuario.departamentostamp,
        direcaostamp: usuario.direcaostamp,
        estado: '',
        visado: '',
        usrstamp: usuario.paStamp!,
        homologado: '',
        paStamp: pastamp,
        pa,
        entradaProcesso: []
      };
      return processos;
    }
InicializarPaciente():Pa{


  const processoStampss=this.Stamp();
  const data=this.ConvertDate(new Date());
          const dclinicos:DClinicos={
            paStamp: processoStampss,
            dadosAnamense: '',
            examesObjectivos: '',
            examesClinicos: '',
            diaDef: '',
            conclusao: '',
            inseriu: '',
            inseriuDataHora: data,
            alterou: '',
            alterouDataHora: data
          };

          const scanDoc:ScanDoc={
            scanStamp: processoStampss,
            entradaStamp: '',
            descricao: '',
            DocPdf: '',
            path1: '',
            dataArquivo: new Date(),
            inseriu:'',
            inseriuDataHora: new Date(),
            alterou: '',
            alterouDataHora: new Date(),
            saidaStamp: '',
            arquivoStamp: '',
            pastamp: ''
          };
          const   listscan: ScanDoc[] = [];
          listscan.push(scanDoc);
           const values:Pa={
             paStamp: processoStampss,
             nome: '',
             sexo: '',
             numBi: '',
             naturalidade: '',
             resProv: '',
             resDist: '',
             resPosto: '',
             resLocal: '',
             resBairro: '',
             resQuarteirao: '',
             resAvenida: '',
             numCasa: '',
             conPrinc: '',
             conAlter: '',
             ramo: '',
             orgao: '',
             unidade: '',
             subunidade: '',
             patente: '',
             inseriu: '',
             inseriuDataHora: data,
             alterou: 'novo pacie',
             alterouDataHora: data,
             tipodoc: '',
             activo: false,
             path: '',
             processo: [],
             junta: '',
             juntaHom: '',
             catpat: '',
             dClinicos: dclinicos,
             scanDoc: listscan,
             path1: ''
           };
           return values;
}
    GetTotais2(item:Usuario): Observable<selectsprocura[]>{

      return this.http.post<selectsprocura[]>(`${this.ApiUrl}Proc2/GetTotais`,item );
      }

      Apagarficheirotemp(fileName:string): Observable<Resposta<Filepdf>>{
        return this.http.get<Resposta<Filepdf>>(`${this.ApiUrl}Report/ApagarFicheirostemp?ficheiro=${fileName}`);
        }
      GetRelar1(item:Trabalho): Observable<Resposta<Filepdf>>{
        return this.http.post<Resposta<Filepdf>>(`${this.ApiUrl}Report/RelatorioPri`,item );
        }
        GetRelatorioTemp(item:Trabalho): Observable<Resposta<Filepdf>>{
          return this.http.post<Resposta<Filepdf>>(`${this.ApiUrl}Report/Ficheirostemp`,item );
          }
InitializeTrabalho():Trabalho{

  const usuario=this.obterSessao() as Usuario;
  const dClinicos:DClinicos={
        paStamp: '',
        dadosAnamense: '',
        examesObjectivos: '',
        examesClinicos: '',
        diaDef: '',
        conclusao: '',
        inseriu: '',
        inseriuDataHora: '',
        alterou: '',
        alterouDataHora: ''
      };
      const pa:Pa={
        paStamp: '',
        nome: '',
        sexo: '',
        numBi: '',
        naturalidade: '',
        resProv: '',
        resDist: '',
        resPosto: '',
        resLocal: '',
        resBairro: '',
        resQuarteirao: '',
        resAvenida: '',
        numCasa: '',
        conPrinc: '',
        conAlter: '',
        ramo: '',
        orgao: '',
        unidade: '',
        subunidade: '',
        patente: '',
        catpat: '',
        inseriu: '',
        inseriuDataHora: '',
        alterou: '',
        alterouDataHora: '',
        tipodoc: '',
        activo: false,
        path: '',
        dClinicos,
        processo: [],
        junta: '',
        juntaHom: '',
        scanDoc: [],
        path1: ''
      };
      const item: Trabalho={
        trabalhostamp: '',
        turmalstamp: '',
        ststamp: '',
        clstamp: '',
        status: '',
        data: new Date(),
        path: '',
        path1: '',
        usuario,
        numTabela: '0',
        descricao: '',
        pa
      };
      return item;
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

  formatDateToLocale(date: Date): string {
  return new Intl.DateTimeFormat(navigator.language, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

     ConvertDate(Data: Date){
      const tttttt = formatDate(Data, 'yyyy-MM-dd', 'en-US');
      return tttttt;
    }
    isValidDate(date: Date): boolean {
      return date instanceof Date && !isNaN(date.getTime());
    }
    isStartDateGreater(startDate: Date, endDate: Date): boolean {
      const inici=new Date(this.ConvertDate(startDate));
      const final=new Date(this.ConvertDate(endDate));
      return inici.getTime() > final.getTime();
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
   this.guardarSessaoData();
  }
    guardarSessaoData() {
      const data=new Date();
      const ano = data.getFullYear();
const mes = String(data.getMonth() + 1).padStart(2, '0'); // mês começa do 0
const dia = String(data.getDate()).padStart(2, '0');

const formato = `${ano}-${mes}-${dia}`;
    localStorage.setItem('datasessao', JSON.stringify(formato));
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
    return (localStorage.getItem('entradaStamp')) !== null ? true : false;
  }
 isAutenticateddatasessao() {
    return (localStorage.getItem('datasessao')) !== null ? true : false;
  }
  GetEntityWithChildren(entityStamp: string, tableName: string,
  stampColumnName: string): Observable<any> {
    const request = {
      EntityStamp: entityStamp,
      TableName: tableName,
      StampColumnName: stampColumnName,
    };
    return this.http.post<any>(`${this.ApiUrl}Proc2/GetEntityWithChildrenfgfgfg`, request);
  }
 showSnackBar(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
InicializaProcura():Procura{
  const user =this.obterSessao() as Usuario;
const proc:Procura={
  tabela: 'fact',
  campo: 'Numero',
  campo1: 'Nome',
  camposseleccionados: `numero,nome`,
  valorprocurado: ``,
  currentNumber: 0,
  pagesize: 0,
  marcar: false,
  condicoes: '',
  alunoestamp: '',
  rhstamp: '',
  descricao: '',
  origem: '',
  referencia: '',
  usuario: user
};
return proc;
}
  obterSessao() {
    const dataGuardar = localStorage.getItem('usuario');
    const utilizador = JSON.parse(dataGuardar!);
    return utilizador;
  }



selects!:selectsprocura[];

  obterselectprocura() {

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
    localStorage.removeItem('entradaStamp');
  }
  eliminarTotais() {
    localStorage.removeItem('Totais');
  }

  isAutenticated() {
    return (localStorage.getItem('usuario')) !== null ? true : false;
  }
  createObservable(): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      // Emit values
      subscriber.next(false);

      // Complete the observable
      subscriber.complete();

      // Cleanup logic (optional)
      return () => '';
    });
  }
  private readonly dialog = inject(MtxDialog);
  constructor(
      private snackBar: MatSnackBar) {}


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
ObterDataactual():string{
const dataks = new Date();
const ano = dataks.getFullYear();
const mes = String(dataks.getMonth() + 1).padStart(2, '0'); // mês começa do 0
const dia = String(dataks.getDate()).padStart(2, '0');
const formato = `${ano}-${mes}-${dia}`;
return formato;
}
  obterdatasessao() {
    const dataGuardar = localStorage.getItem('datasessao');
    const utilizador = JSON.parse(dataGuardar!);
    return utilizador;
  }

      private readonly generico = inject(GenericoService);
 async GetParamFromBd():Promise<Param>{
const item: selects = {
    chave: 'Param',
    descricao: ` *`,
    ordem: `where 1=1`
  };
  const data1 = await this.generico.MetodoGenerico(item.chave, item.descricao, item.ordem).
  toPromise();
  if (data1 && data1.sucesso) {
     return data1.dados[0] as Param;
  }

     const param:Param={
                      paramstamp: '',
                      codprod: '',
                      imprimeMultDocumento: false,
                      codprodMascra: '',
                      vendeservico: false,
                      ano: 0,
                      prodenum: false,
                      ivcodentr: 0,
                      ivdescentr: '',
                      ivcodsai: 0,
                      ivdescsai: '',
                      usames: false,
                      contmascara: '',
                      mostranib: false,
                      intervalo: 0,
                      fillvalue: false,
                      mostraProdutoSemStock: false,
                      excluemascara: false,
                      diarioMesNum: false,
                      diarioDiamesnum: false,
                      diarioAnonum: false,
                      criaContacc: false,
                      usanumauto: false,
                      nummascara: '',
                      mascfact: '',
                      radicalfact: '',
                      actualizapreco: false,
                      montanumero: false,
                      tipooperacao: '',
                      numImpressao: 0,
                      printfile: '',
                      printfile2: '',
                      mostraendereco: false,
                      smtpserver: '',
                      smtpport: 0,
                      outgoingemail: '',
                      outgoingpassword: '',
                      subjemail: '',
                      emailtext: '',
                      autoprecos: false,
                      perlucro: 0,
                      anoref: 0,
                      localrdlc: false,
                      usalocalreport: false,
                      criacl: false,
                      criafnc: false,
                      criast: false,
                      criacontas: false,
                      criacontasprazo: false,
                      criape: false,
                      ivaposdesconto: false,
                      contaIrps: '',
                      contaIrpsdesc: '',
                      contaiva85: '',
                      contaiva85desc: '',
                      naomostradatain: false,
                      naomostradatater: false,
                      naomostraduracao: false,
                      naomostrasequencia: false,
                      poObrigatorio: false,
                      pjFechoautomatico: false,
                      taxaInsspe: 0,
                      taxaInssemp: 0,
                      diastrab: 0,
                      ponaorepete: false,
                      modeloja: false,
                      integracaoautomatica: false,
                      aredondamento: 0,
                      posicao: 0,
                      totalinteiro: false,
                      mostraccusto: false,
                      integradocs: false,
                      obrigaNc: false,
                      codsrc: '',
                      codactivo: '',
                      duodessimos: false,
                      depmensais: false,
                      esconderef: false,
                      escondestock: false,
                      escondecolprecos: false,
                      preconormal: '',
                      ecranPosPequeno: false,
                      mostrarefornec: false,
                      naoaredonda: false,
                      horastrab: 0,
                      obrigaBi: false,
                      segundavia: false,
                      mostraTodasContas: false,
                      paramImp: [],
                      paramgct: [],
                      parampv: [],
                      paramemail: [],
                      origem: 0,
                      geraGuiaAutomatica: false,
                      anolectivo: 0,
                      anoSem: '',
                      mascaracl: '',
                      usacademia: false,
                      dispensa: false,
                      exclui: false,
                      matriculaComCCaberto: false,
                      removematricula: false,
                      naoverificaNuit: false,
                      emailRespo: '',
                      modulos: 0,
                      permiteApagarPos: false,
                      usaMultRefereciaSt: false,
                      usaLotes: false,
                      campomultiuso: ''
                    };
                    return param;
}
  login(username: string, password: string, rememberMe = false) {
    this.eliminarSessao();
    this.eliminarReload();
    const usrs=this.loginService.login(username, password, rememberMe).pipe(
      tap(token => {
        if(token.sucesso===false || token.usuario?.activopa===false)
          {
            if(token.usuario?.activopa===false){
              token.mensagem=`Acesso inibido\r\nContacte o administrador!`;
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
                      passwordexperaem: '',
                      email: null,
                      medico: false,
                      patentetegoria: '',
                      usuarioMenu: [],
                    };
                    localStorage.setItem('password', JSON.stringify(usuario));
                    window.location.reload();
            });
            return;
        }
        if(token.mensagem!=''){
          this.dialog.alert(token.mensagem ?? 'Usuário ou senha inválido');
        }
        this.tokenService.set(token);
        const user=token.usuario;
        this.guardarSessao(user);
      }),
      map(() => this.check())
    );
    return usrs;
  }

    InserirAlterarObjecto(valor: Objecto): Observable<Resposta<Unidade>>{
    return this.http.post<Resposta<Unidade>>(`${this.ApiUrl}Save/InserirAlterarObjecto`,valor);
    }

    SqlCmd(valor: Selects): Observable<Resposta<Selects>>{
      return this.http.post<Resposta<Selects>>(`${this.ApiUrl}EntradaProcesso/SqlCmd`,valor);
      }
      InserirArquivo(valor: any): Observable<Resposta<any>>{
        return this.http.post<Resposta<any>>(`${this.ApiUrl}Arquivo/InserirObjecto`,valor);
        }

        InserirEntradas(valor: EntradaProcesso): Observable<Resposta<EntradaProcesso>>{
          return this.http.post<Resposta<EntradaProcesso>>(`${this.ApiUrl}EntradaProcesso/InserirEntradas`,valor);
          }


           inserirOuAtualizar<T>(tipo: string, objeto: T) {



//  return this.http.post(`${this.ApiUrl}Save/${tipo}`, objeto, {
//     headers: { 'Content-Type': 'application/json' }
//   });

    return this.http.post<T>(`${this.ApiUrl}Save/${tipo}`, objeto);
  }


// getWithChildren<T>(tipo: string, id: string) {
//   const body = { id }; // ou { valor: id } dependendo do que o backend espera
//   return this.http.post<T>(`${this.ApiUrl}Buscas/${tipo}`, body);
// }

getWithChildren<T>(entityName: string, id: string) {
  return this.http.get<T>(`${this.ApiUrl}Buscas/${entityName}/${id}`);
}

    InserirSaida(valor: SaidaProcesso): Observable<Resposta<SaidaProcesso>>{

      return this.http.post<Resposta<SaidaProcesso>>(`${this.ApiUrl}SaidaProcesso/InserirSaidas`,valor);
      }
      InserirUser(valor: Usuario): Observable<Resposta<Usuario>>{
        return this.http.post<Resposta<Usuario>>(`${this.ApiUrl}SaidaProcesso/InserirUsuario`,valor);
        }

getUser(){

}
_filter(name: string,list:selects[]): selects[] {
    const filterValue = name.toLowerCase();
    const fffh=list.filter(option => option.descricao.toLowerCase().includes(filterValue));

     return fffh;
   }


getselectionPost17(sele:condicoesprocura): Observable<Resposta<selectview>>{
  return this.http.post<Resposta<selectview>>(`${this.ApiUrl}Proc2/ComboboxesPost`,sele);
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

  /**
   * Salva uma entidade com suas entidades filhas
   * @param obj Objeto contendo os dados da entidade e suas relações
   * @returns Observable com a resposta da API
   */
  saveWithChildren(obj: any): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.ApiUrl}Save/SaveWithChildren`,
      obj,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export { Usuario };
