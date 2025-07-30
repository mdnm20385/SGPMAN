import { AsyncPipe, CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService, Pa, Trabalho } from '@core';
import { environment } from '@env/environment';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridModule } from '@ng-matero/extensions/grid';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, finalize } from 'rxjs';

@Component({
  selector: 'app-frm-relatorio-junta-temp',
  standalone: true,
  imports: [MatDialogModule,
      MatButtonModule,
     FormsModule,
     ReactiveFormsModule,
     MatCardModule,
     MatCheckboxModule,
     MatFormFieldModule,
     MatInputModule,
     TranslateModule,
     MtxButtonModule,
     MatIconModule,
     MatDatepickerModule,
     MatOptionModule,
     MatSelectModule,
     AsyncPipe,
     MatDividerModule,
     MtxSelectModule, MatTabsModule,
     CommonModule,
     MtxGridModule,
     MatRadioModule,],
  templateUrl: './frm-relatorio-junta-temp.component.html',
  styleUrl: './frm-relatorio-junta-temp.component.scss'
})
export class FrmRelatorioJuntaTempComponent implements OnInit,AfterViewInit,OnDestroy {
fileName: any;
titulocarregar:any;
  constructor(private sanitizer: DomSanitizer, private _cdr: ChangeDetectorRef){
  }
  ngOnInit(): void {

  }
 readonly dialogRef = inject(MatDialogRef);
  readonly data = inject(MAT_DIALOG_DATA);
  pastampsssss='';
    private readonly auth = inject(AuthService);
  StampPaciente = '';
  isSubmitting = false;

safeUrl: SafeResourceUrl | null = null;imageUrl!: string;

cleanup() {
  this.safeUrl= null;
  //this.registerForm.patchValue({path1:''});
}

private _isLoading$ = new BehaviorSubject<boolean>(false);
path:string= `${environment.Apiurl}Report`;
get isLoading$() {
  return this._isLoading$.asObservable();
}
setUrl(fileName:string) {
  if(fileName.length<=0){
    return;
  }
  this._isLoading$.next(true);
  this.cleanups();
  this.safeUrl = this.bypassAndSanitize(`${this.path}/LeituraDeFicheirostemp?ficheiro=${fileName}`);

  setTimeout(() => {
    this._isLoading$.next(false);
  }, 150);
}

cleanups() {
  this.safeUrl = '';
}
bypassAndSanitize(url:string): SafeResourceUrl {
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}
updateUrl(url: string) {
  this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
}
ngAfterViewInit(): void {
  if(this.auth.isAutenticated()===false){
    this.auth.logout().subscribe();
  return;
  }
 this.search();
  this._cdr.markForCheck();
  this._cdr.detectChanges();
}
  private readonly dialog = inject(MtxDialog);
loading = false;
search() {
this.cleanup();
  let trabalho= this.data;
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
              this.fileName=filename;
              this.setUrl(this.fileName);
            }
          }
          catch {
            this.cleanup() ;
               this.dialog.alert('Erro!', "O sistema não conseguiu carregar o ficheiro,\rO report pode não ter sido carregado correctamente!");
          }
        }
      } else {
        this.cleanup() ;
         this.dialog.alert('Erro!',data.mensagem );

      }
    },
    error: (e) => {

      this.cleanup() ;
       this.dialog.alert('Erro!', "O sistema não conseguiu carregar o ficheiro ");

    }
  });
  this._isLoading$.next(false);
}
  private readonly ngZone = inject(NgZone);
ngOnDestroy() : void{
  if(this.fileName.length>0){
    try
    {
      this.auth
      .Apagarficheirotemp(this.fileName)  .pipe(
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
}
