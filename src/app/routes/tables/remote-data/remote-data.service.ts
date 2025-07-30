import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orgao, Processo, Unidade } from 'app/classes/ClassesSIGEX';
import { environment } from '@env/environment';
import { Condicoesprocura, Procura, Selects, selects } from 'app/classes/Procura';
import { Resposta } from 'app/classes/Resposta';
import { condicoesprocura, selectview } from 'app/classes/CampoSessoes';
import { Pa, Usuario } from '@core';

export interface RepoSearchList {
  incomplete_results: boolean;
  items: any[];
  total_count: number;
}

@Injectable()
export class TablesRemoteDataService {
  constructor(private http: HttpClient) {}

  private ApiUrlgeral = `${environment.Apiurl}`;
        Getgrades(nonome: string,
          currentNumber: number,
          pagesize: number): Observable<PaginationResponseApi> {

         if(nonome.length==0){
           nonome='';
         }
         return this.http.get<PaginationResponseApi>(`${this.ApiUrlgeral}GetGrades?nomeno=${nonome}&currentNumber=${currentNumber}&pagesize=${pagesize}`);
       }

  getList(params = {}): Observable<RepoSearchList> {
    return this.http.get<RepoSearchList>('https://api.github.com/search/repositories', { params });
  }


  GetTotais(item:selects): Observable<Resposta<any>>{
    return this.http.post<Resposta<any>>(`${this.ApiUrlgeral}Proc2/GetTotais`,item );
    }



  MetodoGenerico(item:Procura): Observable<PaginationResponseApi>{
    
    return this.http.post<PaginationResponseApi>(`${this.ApiUrlgeral}Proc2/MetodoGenerico`,item );
    }
    GetUser(item:Usuario): Observable<Resposta<Usuario>>{
      return this.http.post<Resposta<Usuario>>(`${this.ApiUrlgeral}Proc2/GetPreencheCampos`,item );
      }

      GetMax(item:Condicoesprocura): Observable<Resposta<selects>>{
        return this.http.post<Resposta<selects>>(`${this.ApiUrlgeral}Proc2/GetMax`,item );
        }
        Delete(item:Condicoesprocura): Observable<Resposta<selects>>{
          return this.http.post<Resposta<selects>>(`${this.ApiUrlgeral}Proc2/Delete`,item );
          }
    CarregarProcesso(item:Procura): Observable<Resposta<Processo>>{
    return this.http.post<Resposta<Processo>>(`${this.ApiUrlgeral}Proc2/CarregarProcesso`,item );
    }

    CarregarPacientefilhos(item:Procura): Observable<Resposta<Pa>>{
      return this.http.post<Resposta<Pa>>(`${this.ApiUrlgeral}Proc2/CarregarPacientefilhos`,item );
      }
    getSelectionGeral(sele:condicoesprocura):  Observable<Resposta<selectview>>{
      return this.http.post<Resposta<selectview>>(`${this.ApiUrlgeral}Proc2/ComboboxesPost`,sele);
      }

      getDestinatarios(sele:Usuario):  Observable<Resposta<Unidade[]>>{
        return this.http.post<Resposta<Unidade[]>>(`${this.ApiUrlgeral}Proc2/ObterDestinatarios`,sele);
        }
        getProcesso(sele:Usuario):  Observable<Resposta<Processo[]>>{
          return this.http.post<Resposta<Processo[]>>(`${this.ApiUrlgeral}Proc2/ObterProcssss`,sele);
          }
        GenDt(sele:Selects):  Observable<any>{
          return this.http.post<any>(`${this.ApiUrlgeral}Proc2/GenDt`,sele);
          }
   getSelection(sele:condicoesprocura):  Observable<Resposta<selectview>>{
    return this.http.post<Resposta<selectview>>(`${this.ApiUrlgeral}Proc2/ComboboxesPost17`,sele);
    }

    GerarRelatorioParam(nomeficheiro:string): Observable<Resposta<ReportParam>>{
      return this.http.post<Resposta<ReportParam>>(`${this.ApiUrlgeral}Proc2/LeituraDeFicheiros`,nomeficheiro);
      }
}

export interface  ReportParam
{
    filename:string;
    origem:string;
    xmlstring:string;
}
export interface PaginationResponseApi {
  totalCount:number;
  status?:boolean,
  msg?:string,
  data?:any,
  pageSize: number;
  currentPageNumber: number;
  totalPages?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

