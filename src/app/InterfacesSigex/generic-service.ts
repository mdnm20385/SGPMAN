import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth.service';
import { environment } from '@env/environment';
import { dmzviewgrelha, selects } from 'app/classes/CampoSessoes';
import { Param } from 'app/classes/Facturacao/Facturacao';
import { Resposta } from 'app/classes/Resposta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericoService {
  constructor(private http: HttpClient,private router :Router,private _snackBar: MatSnackBar,
    private guardarsessoes:AuthService,
  ) { }

private ApiUrlgeral = `${environment.Apiurl}MatriculaAluno/`;

  GetGenerico(chave: string, descricao: string,ordem: string): Observable<Resposta<dmzviewgrelha>>{
       const item: selects={
          chave,
          descricao,
          ordem
        };
    return this.http.post<Resposta<dmzviewgrelha>>(`${this.ApiUrlgeral}GetGenerico`,item);
    }


  MetodoGenerico(chave: string,
     descricao: string,
    ordem: string):
  Observable<Resposta<any>>{
    const item: selects={
      chave,
      descricao,
      ordem
    };
    return this.http.post<Resposta<any>>(`${this.ApiUrlgeral}MetodoGenerico`,item );
    }

    editar(request: selects): Observable<Resposta<any>>{
      return this.http.post<Resposta<any>>(`${this.ApiUrlgeral}MetodoGenerico`,request);
      }

      retor!:any;
      St!:any;

      SetLineValues(datas:any, compra:boolean, nc:boolean, moedavenda:string,
        moedacambio:string,
        Entidadestamp:string,dr:any,tableName:string,
        ent:any,param:Param): any {

          this.Param=param;
          const aredondamento:number=0;
          const par=this.Param;
          this.St=datas;
          let valor:number=0;
          let vainc = false;
          if (this.St != null)
          {
            valor = compra ? this.St.precoCompra : this.St.preco;
            vainc = this.St.ivainc;
          }
            this.St.ststamp=datas.ststamp;
            this.St.referenc=datas.referenc;
            this.St.obs=datas.obs;
            this.St.refornec=datas.refornec;
            this.St.tipo=datas.tipo;
            this.St.codigoBarras=datas.codigoBarras;
            this.St.status=datas.status;
            this.St.unidade=datas.unidade;
            this.St.descricao=datas.descricao;
            this.St.servico=datas.servico;
            this.St.tabiva=datas.tabiva;
            this.St.txiva=datas.txiva;
            this.St.valor=datas.valor;
            this.St.ivainc=datas.ivainc;
            this.St.codfam=datas.codfam;
            this.St.familia=datas.familia;
            this.St.codsubfam=datas.codsubfam;
            this.St.subfamilia=datas.subfamilia;
            this.St.codarm=datas.codarm;
            this.St.armazem=datas.armazem;
            this.St.codmarca=datas.codmarca;
            this.St.marca=datas.marca;
            this.St.matricula=datas.matricula;
            this.St.modelo=datas.modelo;
            this.St.motor=datas.motor;
            this.St.chassis=datas.chassis;
            this.St.anofab=datas.anofab;
            this.St.tara=datas.tara;
            this.St.pesobruto=datas.pesobruto;
            this.St.combustivel=datas.combustivel;
            this.St.tipoCombustivel=datas.tipoCombustivel;
            this.St.codfab=datas.codfab;
            this.St.fabricante=datas.fabricante;
            this.St.negativo=datas.negativo;
            this.St.viatura=datas.viatura;
            this.St.avisanegativo=datas.avisanegativo;
            this.St.descontinuado=datas.descontinuado;
            this.St.ligaprojecto=datas.ligaprojecto;
            this.St.composto=datas.composto;
            this.St.stock=datas.stock;
            this.St.ultimopreco=datas.ultimopreco;
            this.St.precoponderado=datas.precoponderado;
            this.St.imagem=datas.imagem;
            this.St.codigobarra=datas.codigobarra;
            this.St.codigoQr=datas.codigoQr;
            this.St.codtrailer=datas.codtrailer;
            this.St.trailer=datas.trailer;
            this.St.usaconvunid=datas.usaconvunid;
            this.St.quantidade=datas.quantidade;
            this.St.unidsaida=datas.unidsaida;
            this.St.usadoprod=datas.usadoprod;
            this.St.dimensao=datas.dimensao;
            this.St.devolc=datas.devolc;
            this.St.usaserie=datas.usaserie;
            this.St.stockmin=datas.stockmin;
            this.St.stockmax=datas.stockmax;
            this.St.reserva=datas.reserva;
            this.St.encomenda=datas.encomenda;
            this.St.nmovstk=datas.nmovstk;
            this.St.pos=datas.pos;
            this.St.motorista=datas.motorista;
            this.St.departanto=datas.departanto;
            this.St.ccusto=datas.ccusto;
            this.St.cilindrada=datas.cilindrada;
            this.St.companhia=datas.companhia;
            this.St.contrato=datas.contrato;
            this.St.inicio=datas.inicio;
            this.St.termino=datas.termino;
            this.St.valorLeasing=datas.valorLeasing;
            this.St.mensalidade=datas.mensalidade;
            this.St.bloqueado=datas.bloqueado;
            this.St.assentos=datas.assentos;
            this.St.portas=datas.portas;
            this.St.data=datas.data;
            this.St.trailref=datas.trailref;
            this.St.traildesc=datas.traildesc;
            this.St.anomodelo=datas.anomodelo;
            this.St.eixos=datas.eixos;
            this.St.pneus=datas.pneus;
            this.St.carga=datas.carga;
            this.St.vendido=datas.vendido;
            this.St.comprado=datas.comprado;
            this.St.obterpeso=datas.obterpeso;
            this.St.peso=datas.peso;
            this.St.volume=datas.volume;
            this.St.usalote=datas.usalote;
            this.St.ivametade=datas.ivametade;
            this.St.cpoc=datas.cpoc;
            this.St.contaInv=datas.contaInv;
            this.St.contaCev=datas.contaCev;
            this.St.contaReo=datas.contaReo;
            this.St.contaCoi=datas.contaCoi;
            this.St.nofrota=datas.nofrota;
            this.St.cor=datas.cor;
            this.St.gasoleo=datas.gasoleo;
            this.St.naovisisvel=datas.naovisisvel;
            this.St.activo=datas.activo;
            this.St.tipoartigo=datas.tipoartigo;
            this.St.quantvenda=datas.quantvenda;
            this.St.usaquant2=datas.usaquant2;
            this.St.disciplina=datas.disciplina;
            this.St.sigla=datas.sigla;
            this.St.credac=datas.credac;
            this.St.cargahtotal=datas.cargahtotal;
            this.St.cargahteorica=datas.cargahteorica;
            this.St.cargahpratica=datas.cargahpratica;
            this.St.prec=datas.prec;
            this.St.multa=datas.multa;
            this.St.bilhete=datas.bilhete;
            this.St.bilheteespecial=datas.bilheteespecial;
            this.St.tipoProduto=datas.tipoProduto;

            if (dr.quant==0)
              {
                  dr.quant = nc ? -1:1;
              }


              dr.activo =this.St.activo;
              dr.ststamp =this.St.ststamp;
            dr.perdesc = 0;
            dr.descontol = 0;
            dr.valival = 0;
            dr.descricao =this.St.descricao;
            dr.ref =this.St.referenc;
              //dr.Refornec =this.St.Refornec.Trim();
              dr.oristamp =this.St.ststamp;
            dr.ivainc =vainc;
            dr.txiva =this.St.txiva;
            dr.tabiva =this.St.tabiva;
              dr.usaquant2 =this.St.usaquant2;
              //dr.codccu ="" Pbl.Usr.Codccu;
            //dr.ccusto = Pbl.Usr.Ccusto;
            //  dr.Composto =this.St.Composto;

              try
              {
                  dr.usalote =this.St.usalote;
              }
              catch (Exception)
              {
                  //
              }
              const Sempreconamoedadevenda=false;
              //dr.preco =valor;
              dr.entidadestamp=Entidadestamp;
              dr.preco = valor;//SQL.GetField("Aredondamento","param").ToDecimal();
if(moedacambio==null){
  moedacambio='';
}
if(moedavenda==null){
  moedacambio='MZN';
}
              if (moedavenda.toLowerCase()!='mzn')
              {
                  this.NewMethod(dr, moedavenda, Sempreconamoedadevenda, valor, aredondamento);
                  dr.moeda = moedavenda;
                  dr.moeda2 = 'MZN';
              }
              else if (moedacambio.toLowerCase()=='mzn')
              {
                this.NewMethod(dr, moedavenda, Sempreconamoedadevenda, valor, aredondamento);
                  dr.moeda = moedavenda;
                  dr.moeda2 = 'MZN';
              }
              else if (moedacambio.toLowerCase()!='mzn')
              {
                  if (moedacambio.length>0)
                  {
                    this.NewMethod(dr, moedacambio, Sempreconamoedadevenda, valor, aredondamento);
                      dr.moeda = moedavenda;
                      dr.moeda2 = moedacambio;
                  }
              }
              else
              {
                  dr.moeda =moedavenda;
                  dr.moeda2 ='';
                  dr.cambiousd =0;
                  dr.preco =valor;
                  dr.mpreco =0;
              }
              dr.mvalival =0;
              dr.mdescontol =0;
              dr.msubtotall =0;
              dr.mtotall =0;
            dr.servico =this.St.servico;
            dr.unidade =this.St.unidade;
              const tbname=tableName.toLowerCase();
              if (tbname=='factl'||tbname=='faccl'||tbname=='dil')
              {
                  dr.gasoleo =this.St.gasoleo;
                  // dr.numdoc = ent.numdoc;
                  // dr.sigla = ent.sigla;
                  dr.tit =this.St.composto;
                  dr.status =true;
                  dr.cpoc =this.St.cpoc;
              }
            if (this.St.servico==true) {
              return;}

            //   dr.armazem = Pbl.Usr.Codarm;
            // dr.descarm = Pbl.Usr.Armazem;
            //   dr.armazemstamp = Pbl.Usr.Armazemstamp;
              if (tbname=='faccl'){
                const se:selects={
                  chave: 'StFnc',
                  descricao: ` Codigo,Reffnc`,
                  ordem: `where Ststamp='${this.St.ststamp}' order by data desc`
                };
                this.MetodoGenerico(se.chave, se.descricao, se.ordem).subscribe({
                  next: (data) => {
                    if (data.sucesso) {
                   dr.reffornecl = data.dados[0].reffnc;
                    }
                  }
                });
              }
        return dr;
      }



      NewMethod( dr:any,  moedavenda:string,
        Sempreconamoedadevenda:boolean, valor:number, aredondamento:number)
      {
       const txcambio=this.ExecCambio(moedavenda);
          if (!Sempreconamoedadevenda)
          {
              dr.preco = valor;
              if (txcambio > 0)
              {
                const num: number = (valor / txcambio);
                const roundedStr: string = num.toFixed(this.Param.aredondamento); // roundedStr will be "3.46"
                const roundedNum: number = parseFloat(roundedStr); // Convert back to number if needed
                  dr.mpreco = roundedNum;
              }
          }
          else
          {
            const num: number = (valor / txcambio);
            const roundedStr: string = num.toFixed(this.Param.aredondamento); // roundedStr will be "3.46"
            const roundedNum: number = parseFloat(roundedStr); // Convert back to number if needed
              dr.preco = roundedNum;
              dr.mpreco = valor;
          }
          dr.cambiousd = txcambio;
      }

      ExecCambio(moedavenda: string): number{
             let txcambio=0;
        const se:selects={
          chave: 'cambio',
          descricao: ` top 1 Venda`,
          ordem: `where Moeda='${moedavenda}' order by data desc`
        };
        this.MetodoGenerico(se.chave, se.descricao, se.ordem).subscribe({
          next: (data) => {
            if (data.sucesso) {
             const datas= data.dados[0];
             txcambio=datas.venda;
            }
          }
        });
        return txcambio;
        }

        Param!:Param;
        GetParam(): Param{

     const se:selects={
       chave: 'Param',
       descricao: ` *`,
       ordem: `where 1=1`
     };
     this.MetodoGenerico(se.chave, se.descricao, se.ordem).subscribe({
       next: (data) => {
         if (data.sucesso) {
          const datas= data.dados[0];
                    this.Param=data.dados[0];
                   // pr=datas;
         }
       }
     });

     return  this.Param;
     }


     TotaisLinhas(dr:any,ivaIncluso:boolean=false,param:Param):any
     {
            // console.log(`valor da tabela do Iva ${JSON.stringify(dr)}`);
            // console.log(dr);
            // console.log('valor da tabela do Iva' );
        if (dr==null || dr==undefined) return;
        const ivc = ivaIncluso || Boolean(dr.ivainc);
        let valorIva = 0;
        let mvalorIva = 0;
        if (ivc==true)
        {
            valorIva = Number(dr.preco)-Number(dr.preco) / (1 + Number(dr.txiva) / Number(100));
            dr.subtotall = (Number(dr.quant) *
            Number(dr.preco) / (1 + Number(dr.txiva) / Number(100))).toFixed(param.aredondamento);

             mvalorIva = Number(dr.mpreco)-Number(dr.mpreco) / (1 + Number(dr.txiva) / Number(100));
            dr.msubtotall = (Number(dr.quant) *
            Number(dr.mpreco) / (1 + Number(dr.txiva) / Number(100))).toFixed(param.aredondamento);
        }
        else
        {
            dr.subtotall = (Number(dr.quant) * Number(dr.preco)).toFixed(param.aredondamento);
            dr.msubtotall = (Number(dr.quant) * Number(dr.mpreco)).toFixed(param.aredondamento);
        }
       const subtotal:number = Number(dr.subtotall);
        const msubtotal:number = Number(dr.msubtotall);
        if (dr.perdesc >0)
        {
            if (ivc==true)
            {
                dr.descontol = ((Number(subtotal)-Number(valorIva))
                 * Number(dr.perdesc) / Number(100)).toFixed(param.aredondamento);
                 dr.mdescontol = ((Number(msubtotal)-Number(mvalorIva))
                 * Number(dr.perdesc) / Number(100)).toFixed(param.aredondamento);
                dr.subtotall=Number(dr.subtotall)-Number(dr.descontol);
                dr.msubtotall=Number(dr.msubtotall)-Number(dr.mdescontol);
            }
            else
            {
                dr.descontol = (Number(subtotal) * Number(dr.perdesc) /
                Number(100)).toFixed(param.aredondamento);
                dr.mdescontol = (Number(msubtotal) * Number(dr.perdesc) /
                Number(100)).toFixed(param.aredondamento);
                dr.subtotall=Number(dr.subtotall)-Number(dr.descontol);
                dr.msubtotall=Number(dr.msubtotall)-Number(dr.mdescontol);
            }
        }
        else if (Number(dr.descontol) >0)
        {
            if (ivc==true)
            {


                dr.perdesc=Number(Number(dr.descontol)/Number(subtotal)
                -Number(valorIva)*Number(100)).toFixed(param.aredondamento);
                dr.mdescontol = (Number(msubtotal)-Number(mvalorIva) *
                 Number(dr.perdesc) / Number(100)).toFixed(param.aredondamento);
                dr.subtotall=Number(dr.subtotall)-Number(dr.descontol);
                dr.msubtotall=Number(dr.msubtotall)-Number(dr.mdescontol);
            }
            else
            {
                dr.perdesc=(Number(dr.descontol)/Number(subtotal)*
                Number(100)).toFixed(param.aredondamento);
                dr.mdescontol = (Number(msubtotal) * Number(dr.perdesc) /
                 Number(100)).toFixed(param.aredondamento);
                dr.subtotall=Number(dr.subtotall)-Number(dr.descontol);
                dr.msubtotall=Number(dr.msubtotall)-Number(dr.mdescontol);
            }
        }
        const ivaposdesconto = param.ivaposdesconto;
        if (ivaposdesconto==true)
        {
            dr.valival = ((Number(subtotal)-Number(dr.descontol))*
            Number(dr.txiva) / Number(100)).toFixed(param.aredondamento);
            dr.mvalival = ((Number(msubtotal)-Number(dr.mdescontol)) *
            Number(dr.txiva) / Number(100)).toFixed(param.aredondamento);
        }
        else
        {
            dr.valival = (Number(subtotal) * Number(dr.txiva) /
             Number(100)).toFixed(param.aredondamento);
            dr.mvalival = (Number(msubtotal) * Number(dr.txiva) /
             Number(100)).toFixed(param.aredondamento);
        }


        dr.totall = (Number(subtotal) -
        Number(dr.descontol) + Number(dr.valival)).toFixed(param.aredondamento);
        dr.mtotall = (Number(msubtotal) - Number(dr.mdescontol) +
        Number(dr.mvalival)).toFixed(param.aredondamento);

        return dr;
      }

      FillFormasp(itemsFpag:FormArray,aluno:any):any{

        for (let i = 0; i < aluno.formasp.length; i++) {
          itemsFpag.push({
             formaspstamp :aluno.formasp[i].formaspstamp,
             titulo :aluno.formasp[i].titulo,
             numtitulo :aluno.formasp[i].numtitulo,
             dcheque :aluno.formasp[i].dcheque,
             banco :aluno.formasp[i].banco,
             banco2 :aluno.formasp[i].banco2,
             contatesoura :aluno.formasp[i].contatesoura,
              valor :aluno.formasp[i].valor,
             codtz :aluno.formasp[i].codtz,
             codtz2 :aluno.formasp[i].codtz2,
             contatesoura2 :aluno.formasp[i].contatesoura2,
             contasstamp2 :aluno.formasp[i].contasstamp2,
              trf :aluno.formasp[i].trf,
              numer :aluno.formasp[i].numer,
              tipo :aluno.formasp[i].tipo,
              obgTitulo :aluno.formasp[i].obgTitulo,
             rclstamp :aluno.formasp[i].rclstamp,
             oristamp :aluno.formasp[i].oristamp,
             factstamp :aluno.formasp[i].factstamp,
             faccstamp :aluno.formasp[i].faccstamp,
             pgfstamp :aluno.formasp[i].pgfstamp,
             perclstamp :aluno.formasp[i].perclstamp,
              status :aluno.formasp[i].status,
             distamp :aluno.formasp[i].distamp,
              cpoc :aluno.formasp[i].cpoc,
              contaPgc :aluno.formasp[i].contaPgc,
             origem :aluno.formasp[i].origem,
              mvalor :aluno.formasp[i].mvalor,
              codmovtz :aluno.formasp[i].codmovtz,
             descmovtz :aluno.formasp[i].descmovtz,
              codmovtz2 :aluno.formasp[i].codmovtz2,
             descmovtz2 :aluno.formasp[i].descmovtz2,
             usrLogin :aluno.formasp[i].usrLogin,//RECEBE O STAMP DO UTILIZADOR
              aberturaCaixa :aluno.formasp[i].aberturaCaixa,
             no :aluno.formasp[i].no,
             nome :aluno.formasp[i].nome,
             numero :aluno.formasp[i].numero,
             ccusto :aluno.formasp[i].ccusto,
             contasstamp :aluno.formasp[i].contasstamp,
             ccustamp :aluno.formasp[i].ccustamp,
             moeda :aluno.formasp[i].moeda,
              cambiousd :aluno.formasp[i].cambiousd,
           });
          }
          return itemsFpag;
      }

      UpdateLinhas(linhas:any, clstamp:string):any
      {
        if (linhas.length > 0)
        {            for (let i = 0; i < linhas.length; i++) {
              if (linhas[i].value.servico==false)
              {
                if (linhas[i].value.Entidadestamp.length==0)
                  {
                    linhas[i].value.Entidadestamp = clstamp;
                  }
                  if (linhas[i].value.Entidadestamp.length==0)
                  {
                    linhas[i].value.ststamp = clstamp;
                  }
              }
              }

        }
return linhas;

      }

      CheckStstamp(GridUIFt :any):[boolean,string]
        {
          let retorno=[true,''];
            const linhas = GridUIFt;
            if (linhas.length > 0)
            {
              for (let i = 0; i < linhas.length; i++) {
                if (linhas[i].value.servico==false)
                {
                    if (linhas[i].value.Entidadestamp.length==0)
                    {
                      retorno=[false,`O artigo ${linhas[i].value.descricao} não possui o ststamp na linha, O software não irá movimentar o stock`];
                    }
                }
                }
            }
           return [true,''];
        }

        ParteInicial():string{

return  `Estimado(a): ${this.guardarsessoes.obterSessao().nome}`;
        }

}
