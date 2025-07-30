import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Input, OnDestroy, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService, Usuario } from '@core';
import { MenuService } from '@core/bootstrap/menu.service';
import { environment } from '@env/environment';
import { TranslateModule } from '@ngx-translate/core';
import { selectsprocura } from 'app/classes/CampoSessoes';
import { Observable } from 'rxjs';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatIconModule, TranslateModule],
})
export class BreadcrumbComponent implements OnInit,OnDestroy {
  private readonly router = inject(Router);
  private readonly menu = inject(MenuService);
  @Input() nav: string[] = [];
  constructor() {}
  ngOnInit() {
    this.CheckVersion();
    this.nav = Array.isArray(this.nav) ? this.nav : [];
    if (this.nav.length === 0) {
      this.genBreadcrumb();
    }
  }
  trackByNavlink(index: number, navLink: string): string {
    return navLink;
  }
  isAutenticated() {
    return (localStorage.getItem('usuario')) !== null ? true : false;
  }
   obterSessao() {
    const dataGuardar = localStorage.getItem('usuario');
    const utilizador = JSON.parse(dataGuardar!);
    return utilizador;
  }
  CheckVersion(){
  // const meta = document.querySelector(`meta[name="viewport"]`);
  // const version = meta?.getAttribute(`content`);
  // const currentVersion =localStorage.getItem('appVersion');
  // if(currentVersion!==version)
  //   {
  //    localStorage.setItem('appVersion',version|| '');
  //    location.reload();
  // }
}
private ApiUrl = `${environment.Apiurl}`;
usr !: Usuario;
protected readonly http = inject(HttpClient);
GetTotais2(item:Usuario): Observable<selectsprocura[]>{
  return this.http.post<selectsprocura[]>(`${this.ApiUrl}Proc2/GetTotais`,item );
  }
  genBreadcrumb() {
    const routes = this.router.url.slice(1).split('/');

    this.nav = this.menu.getLevel(routes);
    this.nav.unshift('home');
  }
  ngOnDestroy(): void {
  }
  // @HostListener('window:unload', ['$event'])
  // unloadHandler(event:any) {
  //   alert('PageheaderComponent unload');
  //     //console.log("window has been closed.");
  // }
// @HostListener('window:beforeunload', ['$event'])
//   beforeUnloadHandler(event:any) {
//      // console.log("starting close event for window..");

//      alert('PageheaderComponent beforeunload');
//      this.logout().subscribe(() => {
//       this.router.navigateByUrl('/auth/login');
//     });
//   }
}
