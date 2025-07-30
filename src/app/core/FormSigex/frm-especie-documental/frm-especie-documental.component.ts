import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '@core/authentication';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MtxGridModule } from '@ng-matero/extensions/grid';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbComponent } from '@shared';
import { selects } from 'app/classes/CampoSessoes';
import { EspecieDocumental } from 'app/classes/ClassesSIGEX';
@Component({
  selector: 'app-frm-especie-documental',
  standalone: true,
  templateUrl: './frm-especie-documental.component.html',
  styleUrl: './frm-especie-documental.component.scss',
  imports: [
    MatDialogModule,
      MatButtonModule,
    //  //JsonPipe,
    //  //RouterLink,
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
    MatDividerModule,
    MtxSelectModule,
     MatTabsModule,
    CommonModule,
    MtxGridModule,
    MatRadioModule,
 ],
})
export class FrmEspecieDocumentalComponent
implements OnInit{

  readonly dialogRef = inject(MatDialogRef);
  readonly data = inject(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private _snackBar= inject(MatSnackBar);
  isSubmitting = false;
  registerForm = this.fb.nonNullable.group(
    {
      especieStamp:['',[Validators.required]],
      descricao:['',[Validators.required]],
      vidaUtil:['',[Validators.required]],
      inseriu:[''],
      inseriuDataHora:[''],
      alterou:[''],
      alterouDataHora:[''],
      codClassif:['',[Validators.required]],
      destnFnl:['',[Validators.required]],
      orgaoOrigem1:[''],

    }
  );
  onSelectorgaoChange(event: any): void {

    this.registerForm.patchValue({
      destnFnl:event.descricao,
    });
  }
  loading = false;
  selectedorgao = null;
  selectedorgaoCustom = null;
  mostrarAlerta(mensagem: string, tipo: string) {
    this._snackBar.open(mensagem, tipo, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }

  selectorgaos: selects[] = [];

  orgao!: EspecieDocumental;
  ngOnInit(): void {
    this.registerForm.patchValue( {
      especieStamp:this.data.record.EspecieStamp,
      descricao:this.data.record.Descricao,
      vidaUtil:this.data.record.VidaUtil,
      inseriu:this.data.record.Inseriu,
      inseriuDataHora:this.data.record.InseriuDataHora,
      alterou:this.data.record.Alterou,
      alterouDataHora:this.data.record.AlterouDataHora,
      codClassif:this.data.record.CodClassif,
      destnFnl:this.data.record.DestnFnl,
    } );
  }
  Save(){

  }
}
