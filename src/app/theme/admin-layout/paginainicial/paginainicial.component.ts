import { NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterLink } from '@angular/router';
import { AuthService, Usuario } from '@core';
import { MtxProgressModule } from '@ng-matero/extensions/progress';
import { BreadcrumbComponent, PageHeaderComponent } from '@shared';
import { selectsprocura } from 'app/classes/CampoSessoes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paginainicial',
  standalone: true,
  imports: [
     NgClass,
     MatButtonModule,
     MatCardModule,
     MatChipsModule,
     MatListModule,
     MatGridListModule,
     MatTableModule,
     MatTabsModule,
     MtxProgressModule,
     PageHeaderComponent
  ],
  templateUrl: './paginainicial.component.html',
  styleUrl: './paginainicial.component.scss',
})

export class PaginainicialComponent implements AfterViewInit,OnInit{
login(nome:string) {
  switch(nome){
case 'naohomologadas':
  this.router.navigate(['/juntass/listaProcessosnaohomoldados']);
  break;
  case 'homologadas':
    this.router.navigate(['/juntass/listaProcessoshomoldados']);
    break;
    case 'listaemtramitacao':
      this.router.navigate(['/juntass/listaProcessosemtramitacao']);
      break;
      case 'pendentes':
        this.router.navigate(['/juntass/listaProcessoseporIniciar']);
        break;
  }
}
  ngOnInit(): void {
    if(this.isAutenticated()===true){
      const usr=this.obterSessao() as Usuario;

      this.auth.GetTotais2(usr).subscribe( (res)=>
        {
          this.listaprocu= res;
        });
          }
          else{
            this.router.navigateByUrl('/auth/login');
          }
        this.cdr.detectChanges();
        this.cdr.markForCheck();
  }

  private readonly router = inject(Router);

  ngAfterViewInit(): void {


  }
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly auth = inject(AuthService);
  listaprocu!:selectsprocura[];
  gettota():selectsprocura[]{
  const se=this.auth.obterselectprocura();
  return se;
  }
  isAutenticated() {
    return (localStorage.getItem('usuario')) !== null ? true : false;
  }
   obterSessao() {
    const dataGuardar = localStorage.getItem('usuario');
    const utilizador = JSON.parse(dataGuardar!);
    return utilizador;
  }
}
