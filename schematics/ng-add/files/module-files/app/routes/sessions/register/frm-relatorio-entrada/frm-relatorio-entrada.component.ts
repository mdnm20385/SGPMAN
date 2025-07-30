import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AuthService, Usuario, Trabalho, Pa, DClinicos } from '@core';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { PageHeaderComponent } from '@shared/components';
import { FrmRelatorioComponent } from 'app/frm-relatorio/frm-relatorio.component';
import { routes } from 'app/routes/design/design.routes';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-frm-relatorio-entrada',
  standalone: true,
  imports: [PageHeaderComponent,MatProgressSpinner,CommonModule],
  templateUrl: './frm-relatorio-entrada.component.html',
  styleUrl: './frm-relatorio-entrada.component.scss'
})
export class FrmRelatorioEntradaComponent
implements OnInit{
  isSpinnerDisplayed=false;
  private readonly dialogs = inject(MtxDialog);
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly dialog = inject(MatDialog);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly ngZone = inject(NgZone);
  filename!: string;
  ngOnInit(): void {
if(this.auth.isAutenticated()===false){
  this.auth.logout().subscribe();
return;
}

    this.isSpinnerDisplayed=true;
let item=this.auth.InitializeTrabalho();
    this.auth.GetRelar1(item).pipe(
      finalize(() => {
        this.ngZone.runOutsideAngular(() => {
          setTimeout(() => {
            this.ngZone.run(() => {
              this.isSpinnerDisplayed = false;
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



   let trabalho=this.auth.InitializeTrabalho();
   trabalho.path= filename;
   this.filename=filename;
   trabalho.numTabela= '2';
                this.dialog.open(FrmRelatorioComponent, {
                  width: '1000px',
                 disableClose: true,
                 autoFocus: false,
                 enterAnimationDuration: '1000ms',
                 exitAnimationDuration: '1000ms',
                  data: trabalho,
                }).afterClosed().subscribe(resultado => {
                  if (resultado === "true") {
                    routes
                  }
                });
              }
            } catch {
              // this._loginservice.mostrarAlerta("O sistema não conseguiu carregar o ficheiro, o report apresenta má formatação!","Erro");
               this.dialogs.alert('Erro!', "O sistema não conseguiu carregar o ficheiro, o report apresenta má formatação!");
            }
          }
        } else {
           this.dialogs.alert('Erro!',data.mensagem );
        }
      },
      error: (e) => {
         this.dialogs.alert('Erro!', "O sistema não conseguiu carregar o ficheiro " + e);
        //this.disabiltabtnSave = false;
      }
    });




//     const filename ='1';
//     try {


//       //this.modalActual.close("true");

// let usuario=this.auth.obterSessao() as Usuario;
// let trabalho: Trabalho={
//   trabalhostamp: '',
//   turmalstamp: '',
//   ststamp: '',
//   clstamp: '',
//   status: '',
//   data: new Date(),
//   path: filename,
//   path1: '',
//   usuario,
//   numTabela: '1',
//   descricao: ''
// }

// this.dialog.open(FrmRelatorioComponent, {
//   width: '100%',
//   height:'100%',
//   disableClose: true,
//   data: trabalho,
//   autoFocus: false,
// }).afterClosed().subscribe(resultado => {
//   if (resultado === "true") {
//    // this.isSpinnerDisplayed= false
//   }
// });
//     } catch {
//       // this._loginservice.mostrarAlerta("O sistema não conseguiu carregar o ficheiro, o report apresenta má formatação!","Erro");
//       this.dialogs.alert('Erro!', "O sistema não conseguiu carregar o ficheiro, o report apresenta má formatação!");
//     }

  }

}

