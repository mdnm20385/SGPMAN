import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { selects, selectsprocura } from 'app/classes/CampoSessoes';
import { Resposta } from 'app/classes/Resposta';
import { finalize, Observable } from 'rxjs';
import { AuthService, CamposRetornadosSessao, Usuario } from '@core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];




const MESSAGES = [
  {
    img: 'assets/images/heros/1.jpg',
    subject: 'Hydrogen',
    content: `Cras sit amet nibh libero, in gravida nulla.
     Nulla vel metus scelerisque ante sollicitudin commodo.`,
  },
  {
    img: 'assets/images/heros/2.jpg',
    subject: 'Helium',
    content: `Cras sit amet nibh libero, in gravida nulla.
     Nulla vel metus scelerisque ante sollicitudin commodo.`,
  },
  {
    img: 'assets/images/heros/3.jpg',
    subject: 'Lithium',
    content: `Cras sit amet nibh libero, in gravida nulla.
     Nulla vel metus scelerisque ante sollicitudin commodo.`,
  },
  {
    img: 'assets/images/heros/4.jpg',
    subject: 'Beryllium',
    content: `Cras sit amet nibh libero, in gravida nulla.
     Nulla vel metus scelerisque ante sollicitudin commodo.`,
  },
  {
    img: 'assets/images/heros/6.jpg',
    subject: 'Boron',
    content: `Cras sit amet nibh libero, in gravida nulla.
     Nulla vel metus scelerisque ante sollicitudin commodo.`,
  },
];

@Injectable()
export class DashboardService {




  entradassss()  :   selectsprocura[]{




if(this.auth.isAutenticated()==false){
  return   this.entras;
}
    const user=this.auth.obterSessao() as Usuario;
    const proc:selects = {
      chave: `jgfgfk,orgaostamp`,
      descricao: 'orgaostamp',
      ordem: 'orgaostamp'
    };

    console.log(`Ver o usuário e o param`);
    console.log(user);
  const g= this.GetTotais2(user)
     .subscribe( (res)=>
    {
      this.entras=res;
      this.auth.guardartotais(res);
    });

    return   this.entras;
    }
entras:selectsprocura[]=[];
  stats = [
    {
      title: 'Total Sales',
      amount: '180,200',
      progress: {
        value: 50,
      },
      color: 'bg-indigo-500',
    },
    {
      title: 'Revenue',
      amount: '70,205',
      progress: {
        value: 70,
      },
      color: 'bg-blue-500',
    },
    {
      title: 'Traffic',
      amount: '1,291,922',
      progress: {
        value: 80,
      },
      color: 'bg-green-500',
    },
    {
      title: 'New User',
      amount: '1,922',
      progress: {
        value: 40,
      },
      color: 'bg-teal-500',
    },
  ];

  charts = [
    {
      chart: {
        height: 350,
        type: 'area',
        toolbar: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      series: [
        {
          name: 'UV',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: 'Download',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      xaxis: {
        type: 'datetime',
        categories: [
          '2019-11-24T00:00:00',
          '2019-11-24T01:30:00',
          '2019-11-24T02:30:00',
          '2019-11-24T03:30:00',
          '2019-11-24T04:30:00',
          '2019-11-24T05:30:00',
          '2019-11-24T06:30:00',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
      },
    },
    {
      chart: {
        height: 350,
        type: 'radar',
      },
      series: [
        {
          name: 'Weekly Revenue',
          data: [20, 100, 40, 30, 50, 80, 33],
        },
      ],
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      plotOptions: {
        radar: {
          size: 140,
          polygons: {
            strokeColor: '#e9e9e9',
            fill: {
              colors: ['#f8f8f8', '#fff'],
            },
          },
        },
      },
      colors: ['#FF4560'],
      markers: {
        size: 4,
        colors: ['#fff'],
        strokeColor: '#FF4560',
        strokeWidth: 2,
      },
      tooltip: {
        y: {
          formatter: (val: number) => val,
        },
      },
      yaxis: {
        tickAmount: 7,
        labels: {
          formatter: (val: number, i: number) => {
            if (i % 2 === 0) {
              return val;
            } else {
              return '';
            }
          },
        },
      },
    },
  ];

  constructor(private http: HttpClient) {}

  private readonly auth = inject(AuthService);

  private ApiUrlgeral = `${environment.Apiurl}`;
  getData() {
    return ELEMENT_DATA;
  }
  GetTotais2(item:Usuario): Observable<selectsprocura[]>{
    return this.http.post<selectsprocura[]>(`${this.ApiUrlgeral}Proc2/GetTotais`,item );
    }




  GetDocumentos(item:Usuario): Observable<Resposta<any[]>>{
    return this.http.post<Resposta<any[]>>(`${this.ApiUrlgeral}Proc2/GetDocumentos`,item );
    }



  getMessages() {
    return MESSAGES;
  }

  getCharts() {
    return this.charts;
  }

  getStats() {
     return this.stats;
  }

  entrass() {
    return this.entras;
  }

  CondUsuario():string
  {
      let cond = '';
      try
      {
          if (this.auth.isAutenticated()===true)
          {
            const sessa=this.auth.obterSessao() as Usuario;
              if (sessa.orgao.length>0)
              {
                  cond = `where Orgao='${sessa.orgao}' `;
                  if (sessa.direcaostamp.length>0)
                  {
                      cond +=` and Direcao='${sessa.direcao}' `;// $" and Direcao='{Pbl.UsuarioConselhoTecnico.Direcao}'";

                      if (sessa.departamentostamp.length>0)
                      { cond +=` and Departamento='${sessa.departamento}' `;//cond += $" and Departamento='{Pbl.UsuarioConselhoTecnico.Departamento}'";
                      }
                  }
              }
          }
      }
      catch
      {
          cond = '';
      }
      return cond;
  }



  CondUsuarioAcesso():CamposRetornadosSessao
  {
const ca:CamposRetornadosSessao=
{
  paStamp: '',
  edaSic: false,
  sexo: '',
  orgao: '',
  direcao: '',
  departamento: '',
  orgaostamp: '',
  departamentostamp: '',
  direcaostamp: '',
  verSitClass: false,
  departamentoEntradaProcura: '',
  departamentoProcessoProcura: '',
  departamentoSaidaProcura: '',
  subUnidadeStamprr: '',
  nomecampo: '',
  valorCampo: '',
  sicDoUtilizador: '',
  unidadeStamprr: '',
  direcaoEntradaProcura: '',
  direcaoProcessoProcura: '',
  orgaoEntradaProcura: '',
  orgaoProcessoProcura: '',
  orgaoStampDest: '',
  orgaoStamprr: '',
  direcaoDestinoProcura: ''
};

      try
      {

          if (this.auth.isAutenticated()===true)
          {
            const sessa=this.auth.obterSessao() as Usuario;
            if (sessa.orgao.length>0)
              {
                ca.orgao = sessa.orgao;
                ca.orgaostamp = sessa.orgaostamp;
                ca.orgao = sessa.orgao;
                ca.sicDoUtilizador =sessa.orgao;
                ca.edaSic = sessa.edaSic;
                ca.orgaoEntradaProcura =`e.OrgaoUtilizador ='${ca.orgao}'`;
                ca.orgaoProcessoProcura = `p.Orgao ='${ca.orgao}'`;
                ca.orgaoStampDest = `sd.orgaoDest ='${ca.orgao}'`;
                ca.orgaoStamprr = ca.orgaostamp;
                ca.nomecampo = `e.OrgaoUtilizador=`;
                ca.valorCampo = `'${sessa.orgao}'`;
                  if (sessa.direcao.length>0)
                  {
                    ca.direcao = sessa.direcao;
                    ca.direcaostamp = sessa.direcaostamp;
                    ca.sicDoUtilizador =sessa.direcao;
                    ca.unidadeStamprr = sessa.direcaostamp;
                    ca.direcaoEntradaProcura = `e.DirecUtilizador ='${sessa.direcao}'`;
                    ca.direcaoProcessoProcura = `p.Direcao ='${sessa.direcao}'`;

                ca.nomecampo = `e.DirecUtilizador=`;
                ca.valorCampo  = `'${sessa.direcao}'`;

                ca.direcaoDestinoProcura = `sd.direcDest ='${sessa.direcao}'`;
                      if (sessa.departamento.length>0)
                      {
                        ca.departamentostamp = sessa.departamentostamp;
                        ca.departamento = sessa.departamento;
                        ca.departamentoEntradaProcura = `e.DepUtilizador='${sessa.departamento}'`;
                        ca.departamentoProcessoProcura =`p.Departamento ='${sessa.departamento}'`;
                        ca.departamentoSaidaProcura = `sd.depDest ='${sessa.departamento}'`;
                        ca.subUnidadeStamprr = sessa.departamentostamp;
                          ca.nomecampo = `e.DepUtilizador=`;
                          ca.valorCampo= `'${sessa.departamento}'`;
                          ca.sicDoUtilizador = sessa.departamento;
                      }
                  }
              }





          }
      }
      catch
      {
        //
      }
      return ca;
  }

}
