import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, HostListener, inject, Inject, NgModule, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SafeResourceUrl, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AuthService, Trabalho } from '@core';
import { environment } from '@env/environment';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { TranslateModule } from '@ngx-translate/core';
import { busca } from 'app/classes/busca';
import { BehaviorSubject, finalize } from 'rxjs';

@Component({
  selector: 'app-frm-relatorio',
  standalone: true,
  imports: [MatDialogModule,
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
   CommonModule],
  templateUrl: './frm-relatorio.component.html',
  styleUrl: './frm-relatorio.component.scss'
})
export class FrmRelatorioComponent implements AfterViewInit,OnInit, OnDestroy

{

  titloAccao: string='Meu Relatório';
  isSpinnerDisplayed: boolean=false;
  totalrecordturma:number=0;
  totalrecordturma1:number=0;
  closeDialog() {
    //this.modalActual.close('true');
  }

  private readonly ngZone = inject(NgZone);
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
this.path= `${environment.Apiurl}Report`;

const iframe = document.querySelector('iframe') as HTMLIFrameElement;
if (iframe &&
   iframe.contentWindow) { iframe.contentWindow.onbeforeprint = (event) =>
     {
    event.preventDefault();
    };
   }
this.setUrl(this.filename);
this.cdr.detectChanges();
  }
  cadastro!:FormGroup;
filename:string='';
private readonly auth = inject(AuthService);
safeHtmlContent: SafeHtml | null = null;
path:string= `${environment.Apiurl}Report`;
src: SafeResourceUrl | undefined;
constructor(private sanitizer: DomSanitizer,
  @Inject(MAT_DIALOG_DATA) public trabalho: Trabalho,
  private cdr: ChangeDetectorRef) {
  this.filename=this.trabalho.path;
}


readonly dialogRef = inject(MatDialogRef);
readonly data = inject(MAT_DIALOG_DATA);
private _isLoading$ = new BehaviorSubject<boolean>(false);
get isLoading$() {
  return this._isLoading$.asObservable();
}
setUrlimagem(fileName:string) {
  this._isLoading$.next(true);
  this.cleanup();
  this.src = this.bypassAndSanitize(`${this.path}/LeituraDeImagens?ficheiro=${fileName}`);
  setTimeout(() => {
    this._isLoading$.next(false);
  }, 150);
}
setUrl(fileName:string) {
  this._isLoading$.next(true);
  this.cleanup();
  this.src = this.bypassAndSanitize(`${this.path}/LeituraDeFicheiros?ficheiro=${fileName}`);
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
//
    }
  }


}


}

