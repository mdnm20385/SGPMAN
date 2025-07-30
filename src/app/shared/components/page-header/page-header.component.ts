import {
  Component,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  ViewEncapsulation,
  booleanAttribute,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AuthService, MenuService, Usuario } from '@core';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { MtxDialog } from '@ng-matero/extensions/dialog';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [BreadcrumbComponent, TranslateModule],
})
export class PageHeaderComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly menu = inject(MenuService);
  private readonly auth = inject(AuthService);
  private readonly dialog = inject(MtxDialog);
  @HostBinding('class') class = 'matero-page-header';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() nav: string[] = [];
  @Input({ transform: booleanAttribute }) hideBreadcrumb = false;
  ngOnInit() {
    this.nav = Array.isArray(this.nav) ? this.nav : [];
    if (this.nav.length === 0) {
      this.genBreadcrumb();
    }
    this.title = this.title || this.nav[this.nav.length - 1];

      const usrs=this.auth.obterSessao() as Usuario;

    if(this.auth.isAutenticated()===false ||  usrs==null || usrs.activopa==false){
        this.dialog.alert(`Acesso negado!`);
     this.auth.logout().pipe().subscribe();
     return;
  }
    if(this.auth.isAutenticated()===true &&  usrs!=null && usrs.activopa){
      if(usrs.priEntrada==='1' ){
        this.dialog.alert(`${usrs.nome}, é obrigatório trocar a senha no primeiro ao Sistema!`);
    this.router.navigateByUrl('/auth/senhasss');
    return;
  }
  }
  }

  genBreadcrumb() {
    const routes = this.router.url.slice(1).split('/');
    this.nav = this.menu.getLevel(routes);
    this.nav.unshift('home');
  }

}
