import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, Pipe, PipeTransform, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { Usuario } from '@core';
import { AuthService } from '@core/auth.service';
import { Menu, MenuChildrenItem } from '@core/bootstrap/menu.service';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridModule } from '@ng-matero/extensions/grid';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { TranslateModule } from '@ngx-translate/core';
import { selects, condicoesprocura } from 'app/classes/CampoSessoes';
import { TablesRemoteDataService } from 'app/routes/tables/remote-data/remote-data.service';

@Pipe({ name: 'userFilter', standalone: true })
export class UserFilterPipe implements PipeTransform {
  transform(users: any[], filter: string): any[] {
    if (!filter) return users;
    const lower = filter.toLowerCase();
    return users.filter(u => u.descricao?.toLowerCase().includes(lower));
  }
}
@Component({
  selector: 'app-menu-sender',
  standalone: true,
      encapsulation: ViewEncapsulation.None,
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
    MatDividerModule,
    MtxSelectModule,
    MatTabsModule,
    CommonModule,
    MtxGridModule,
    MatRadioModule],
            providers: [TablesRemoteDataService],
  templateUrl: './menu-sender.component.html',
  styleUrl: './menu-sender.component.scss',

})
export class MenuSenderComponent implements OnInit,AfterViewInit {
 protected readonly http = inject(HttpClient);
 utilizadorStamp = ''; // pode ser selecionado por dropdown
  menuData: Menu[] = [/* seu JSON de menus aqui */];

 constructor(
private sanitizer: DomSanitizer, private _cdr: ChangeDetectorRef
 ) {

 }





userFilter: string = '';





 protected readonly auth = inject(AuthService);


menus: Menu[] = []; // carregue do backend ou defina aqui
  // utilizadores :Usuario[]= [
  // ];

  private readonly dialog = inject(MtxDialog);
//   selectedUserStamp: string = '';
// // ...existing code...
// // Troque a linha:
// selectedUserStamp: string = '';
// Por:
selectedUserStamps: string[] = [];
// ...existing code...

// Atualize o método de seleção de usuário:


  selectedMenus: Set<string> = new Set(); // guardará os routes selecionados


  ngOnInit() {
const usr=this.auth.obterSessao() as Usuario;
    if(!this.auth.isAutenticated() || usr==null || !usr.activopa
      ){
      this.auth.logout().subscribe();
      return;
    }
  }
  private readonly remoteSrv = inject(TablesRemoteDataService);
    users: selects[] = [];
    GetUsers(){
      const se:condicoesprocura={
        tabela:'usuario',
        campo1: 'Nome',
        campo2:'Login',
         condicao:'Activopa=1',
         campochave:'PaStamp'
      };
      this.remoteSrv
      .getSelection(se).subscribe({
        next: (data) => {
          if (data.sucesso) {
            this.users= data.dados.selects;

          }
        },
        error: (e) => {

        }
      });
    }


 ngAfterViewInit(): void {
   // Carregue menus do backend ou defina estaticamente aqui
   this.GetUsers();
 this.http.get('/assets/data/menu.json').subscribe((data: any) => {
     // const currentVersion = data;
    this.menus = data.menu; // seu menu JSON
    });

    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }
onUserChange(chaves: string[]) {
  this.selectedUserStamps = chaves;
}
toggleMenu(menu: MenuChildrenItem, event: MatCheckboxChange) {
  const checked = event.checked;
  this.setMenuSelection(menu, checked);
}
  private setMenuSelection(menu: MenuChildrenItem, checked: boolean) {
    if (checked) {
      this.selectedMenus.add(menu.route);
    } else {
      this.selectedMenus.delete(menu.route);
    }

    if (menu.children?.length) {
      menu.children.forEach(child => this.setMenuSelection(child, checked));
    }
  }
  // Verifica se menu está selecionado
  isSelected(route: string): boolean {
    return this.selectedMenus.has(route);
  }
  // Para checkbox pai, verificar se todos os filhos estão selecionados
  areAllChildrenSelected(menu: MenuChildrenItem): boolean {
    if (!menu.children || menu.children.length === 0) return this.isSelected(menu.route);
    return menu.children.every(child => this.areAllChildrenSelected(child));
  }
  // Para checkbox pai, verificar se algum filho está selecionado (para estado indeterminado)
  areSomeChildrenSelected(menu: MenuChildrenItem): boolean {
    if (!menu.children || menu.children.length === 0) return false;
    return menu.children.some(child => this.isSelected(child.route)
     || this.areSomeChildrenSelected(child));
  }
// Atualize o salvar:
salvar() {
  if (!this.selectedUserStamps || this.selectedUserStamps.length === 0) {
    this.dialog.alert('Selecione pelo menos um usuário');
    return;
  }
  const filtrarMenusSelecionados = (menus: MenuChildrenItem[]): MenuChildrenItem[] => {
    return menus
      .map(menu => {
        const filhosSelecionados = menu.children ? filtrarMenusSelecionados(menu.children) : [];
        const selecionado = this.selectedMenus.has(menu.route);

        if (selecionado || filhosSelecionados.length > 0) {
          return {
            ...menu,
            children: filhosSelecionados
          };
        }

        return null;
      })
      .filter(m => m !== null) as MenuChildrenItem[];
  };

  const menusSelecionados = filtrarMenusSelecionados(this.menus);
  const payload = {
    menus: menusSelecionados,
    utilizadorStamps: this.selectedUserStamps
  };

  this.auth.SalvarMenu(payload).subscribe({
    next: () => this.dialog.alert('Menus salvos com sucesso!'),
    error: (err) => this.dialog.alert('Erro ao salvar menus ' + err.message)
  });
}

  gerarMenuStamp(menu: any): string {
    return `menu_${menu.route}_${Math.floor(Math.random() * 10000)}`;
  }

  adicionarMenuStamps(menus: any[]): any[] {
    return menus.map(menu => {
      const novoMenu = {
        ...menu,
        menuStamp: this.gerarMenuStamp(menu),
        children: menu.children ? this.adicionarMenuStamps(menu.children) : []
      };
      return novoMenu;
    });
  }

  enviarMenus() {
    const menusComStamp = this.adicionarMenuStamps(this.menuData);
    for (const menu of menusComStamp) {
      const payload = {
        menu,
        utilizadorStamps: [this.utilizadorStamp]
      };

      this.auth.SalvarMenu(payload)
        .subscribe({
          next: res => console.log('Menu salvo:', res),
          error: err => console.error('Erro ao salvar:', err)
        });
    }
  }
}
