import { JsonPipe, AsyncPipe, CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, inject, Inject, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatTabsModule } from '@angular/material/tabs';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { environment } from '@env/environment';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MtxGridModule } from '@ng-matero/extensions/grid';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbComponent } from '@shared';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-ver-visualizador-ficheiros',
  standalone: true,
  templateUrl: './ver-visualizador-ficheiros.component.html',
  styleUrl: './ver-visualizador-ficheiros.component.scss',
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
   MatRadioModule,
 ],
})
export class VerVisualizadorFicheirosComponent implements OnInit,AfterViewInit {
  titloAccao: string='';
  isSpinnerDisplayed: boolean=false;
  totalrecordturma:number=0;
  totalrecordturma1:number=0;
  closeDialog() {
    this.dialogRef.close('true');
  }

  ngAfterViewInit(): void {


    this.filename=this.data.path;
this.path= `${environment.Apiurl}Proc2`;
this.setUrl(this.filename);

this._cdr.markForCheck();
this._cdr.detectChanges();
  }


  cadastro!:FormGroup;
filename:string='';

ngOnInit(): void {
}


readonly dialogRef = inject(MatDialogRef);
readonly data = inject(MAT_DIALOG_DATA);
path:string= `${environment.Apiurl}Proc2`;
src: SafeResourceUrl | undefined;
constructor(private sanitizer: DomSanitizer, private _cdr: ChangeDetectorRef
  // private modalActual: MatDialogRef<VerVisualizadorFicheirosComponent>,
  // @Inject(MAT_DIALOG_DATA) public trabalho: Trabalho,
) {

}
private _isLoading$ = new BehaviorSubject<boolean>(false);

get isLoading$() {
  return this._isLoading$.asObservable();
}
setUrl(fileName:string) {
  this._isLoading$.next(true);
  this.cleanup();
  this.src = this.bypassAndSanitize(`${this.path}/LeituraDeFicheiros?ficheiro=${fileName}`);
  setTimeout(() => {
    this._isLoading$.next(false);
  }, 150);
}

cleanup() {
  this.src = '';
}

bypassAndSanitize(url:string): SafeResourceUrl {
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}
}
