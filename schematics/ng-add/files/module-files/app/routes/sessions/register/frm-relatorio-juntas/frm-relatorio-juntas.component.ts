import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, inject, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService, Usuario, Trabalho } from '@core';
import { environment } from '@env/environment';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderComponent } from '@shared';
import { routes } from 'app/app.routes';
import { condicoesprocura, selects } from 'app/classes/CampoSessoes';
import { FrmRelatorioComponent } from 'app/frm-relatorio/frm-relatorio.component';
import { BehaviorSubject, finalize } from 'rxjs';

@Component({
  selector: 'app-frm-relatorio-juntas',
  standalone: true,
    imports: [PageHeaderComponent
     ,
     MatDatepickerModule,
         MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        TranslateModule,
        MtxButtonModule,
        MatIconModule,
        MtxSelectModule,
        CommonModule
    ],
  templateUrl: './frm-relatorio-juntas.component.html',
  styleUrl: './frm-relatorio-juntas.component.scss'
})
export class FrmRelatorioJuntasComponent

implements OnInit,AfterViewInit, OnDestroy{
cadastro!:FormGroup;
filename:string='';
private readonly auth = inject(AuthService);
safeHtmlContent: SafeHtml | null = null;
path:string= `${environment.Apiurl}Report`;
src: SafeResourceUrl | undefined;
EstadoTramitacao: selects[] = [];
selectedestadoe = 'EM TRAMITAÇÃO';

GetEstadotramitacaoParametrizacao():void{
  this.loading=true;
  const se:condicoesprocura={
    tabela:'Busca',
    campo1: 'descricao',
    campo2:'numTabela',
     condicao:`vazio`,
     campochave:'BuscaStamp'
  };
  this.auth
  .getSelection(se).subscribe({
    next: (data) => {
      if (data.sucesso) {
        const busca=data.dados.selects;
        this.EstadoTramitacao = busca.filter(person => person.ordem =='20'
           && person.descricao.toLowerCase() !=='arquivado'.toLowerCase());
      }
    },
    error: (e) => {

    }
  });
  this.loading=false;
}

onEstadotramitacaChange(event: any): void {
  this.query.q= this.query.assunto=event.descricao;
}
ClearEstadotramitaca(): void {
  this.query.q= this.query.assunto= this.query.assunto='';
}

onEnterPress(){
  this.search();
}

loading = false;
search() {
  this.query.page = 0;
this.cleanup();
if(!this.auth.isValidDate(new Date(this.auth.ConvertDate(this.params.data)))){
  this.dialogs.alert('Erro!', `A data inicial não está num formato correcto!
    ${new Date(this.auth.ConvertDate(this.params.data))}`);

return;
}
if(!this.auth.isValidDate(new Date(this.auth.ConvertDate(this.params.data1)))){
  this.dialogs.alert('Erro!', `A data final não está num formato correcto! ${new Date(this.auth.ConvertDate(this.params.data1))}`);
return;
}
if(this.auth.isStartDateGreater(new Date(this.auth.ConvertDate(this.params.data)),new Date(this.auth.ConvertDate(this.params.data1)))){
  this.dialogs.alert('Erro!', "A data inicial não pode ser superior que a final!");
return;
}
if(this.auth.isStartDateGreater(new Date(this.auth.ConvertDate(this.params.data)),new Date())){
  this.dialogs.alert('Erro!', "A data inicial não pode ser superior que a data actual!");
return;
}
if(this.auth.isStartDateGreater(new Date(this.auth.ConvertDate(this.params.data1)),new Date())){
  this.dialogs.alert('Erro!', "A data final não pode ser superior que a data actual!");
return;
}
this.isPdfVisible=false;
  let trabalho=this.auth.InitializeTrabalho();
  trabalho.clstamp= this.params.q,
 trabalho. status=this.params.q,
 trabalho. data=this.params.data,
 trabalho. path= this.auth.ConvertDate(this.params.data),
 trabalho. path1=this.auth.ConvertDate(this.params.data1),
  trabalho.numTabela= '2';
  this._isLoading$.next(true);
  this.auth.GetRelatorioTemp(trabalho)
  .pipe(
    finalize(() => {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.ngZone.run(() => {
          });
        });
      });
    })
  ).subscribe({
    next: (data) => {
      if (data.sucesso) {
        if (data.dados != null) {
          const filename = data.dados.filename;


          try {
            if (filename != null && filename.length > 0 && filename != '' && filename != 'vazio') {

              this.path= `${environment.Apiurl}Report`;
              this.filename=filename;
              this.setUrl(this.filename);
            }
          }
          catch {

            this.cleanup() ;

               this.dialogs.alert('Erro!', "O sistema não conseguiu carregar o ficheiro,\rO report pode não ter sido carregado correctamente!");
          }
        }
      } else {

        this.cleanup() ;
         this.dialogs.alert('Erro!',data.mensagem );

      }
    },
    error: (e) => {

      this.cleanup() ;
       this.dialogs.alert('Erro!', "O sistema não conseguiu carregar o ficheiro ");

    }
  });
  this._isLoading$.next(false);
}


ngOnDestroy() : void{
  if(this.filename.length>0){
    try
    {
      this.auth
      .Apagarficheirotemp(this.filename)  .pipe(
        finalize(() => {
          this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
              this.ngZone.run(() => {
              });
            });
          });
        })
      ).subscribe({
        next: (data) => {

        },
        error: (e) => {


        }
      });

    }
    catch{

    }
  }


}
Refresh(){
  this.GetEstadotramitacaoParametrizacao();
}


  ngAfterViewInit(): void {
    if(this.auth.isAutenticated()===false){
      this.auth.logout().subscribe();
    return;
    }
    this.Refresh();
     //this.search();
    this.cdr.detectChanges();
  }
  query = {
    q: '',
    sort: 'stars',
    order: 'desc',
    page: 0,
    per_page: 5,
    data: new Date(),
    data1: new Date(),
    numerodoc: '',
    pordata: false,
    assunto: '',
    patente: '',
  };


  get params() {
    const p = Object.assign({}, this.query);
    p.page += 1;
    return p;
  }
  private readonly dialogs = inject(MtxDialog);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly ngZone = inject(NgZone);
  titloAccao: string='Meu Relatório';
  totalrecordturma:number=0;
  totalrecordturma1:number=0;
constructor(private sanitizer: DomSanitizer,

) {
}
private _isLoading$ = new BehaviorSubject<boolean>(false);
get isLoading$() {
  return this._isLoading$.asObservable();
}

isPdfVisible = false;
setUrl(fileName:string) {
  this._isLoading$.next(true);
  this.cleanup();
  this.src = this.bypassAndSanitize(`${this.path}/LeituraDeFicheirostemp?ficheiro=${fileName}`);
  setTimeout(() => {
    this._isLoading$.next(false);
  }, 150);
  window.stop();

}



cleanup() {
  this.src = '';
}
bypassAndSanitize(url:string): SafeResourceUrl {

  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}



  ngOnInit(): void {


  }

}

