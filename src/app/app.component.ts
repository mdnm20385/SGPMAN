import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, HostListener, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService, Menu, MenuService, PreloaderService, SettingsService } from '@core';
import { LoginService } from '@core/authentication';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { LogoutService } from './services/logout.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  standalone: true,
  imports: [RouterOutlet],

})
export class AppComponent implements OnInit, AfterViewInit {

constructor(private http: HttpClient,
  private logoutService: LogoutService,
  private guardarsessoes:AuthService,
  private menuService: MenuService = inject(MenuService),
  private loginService: LoginService = inject(LoginService)
  ){

    this.guardarsessoes.setAppLanguage();
    this.checkVersion();
}
  private readonly preloader = inject(PreloaderService);
  private readonly settings = inject(SettingsService);
  private readonly router = inject(Router);

  private readonly dialog = inject(MtxDialog);
  ngOnInit() {

         // FORÇAR HEADER SEMPRE VISÍVEL
    const currentOptions = this.settings.options;
    if (!currentOptions.showHeader) {
      currentOptions.showHeader = true;
      currentOptions.headerPos = 'fixed';
      this.settings.setOptions(currentOptions);
    }

    if(this.guardarsessoes.isAutenticated()===true
){

    try {
      this.settings.setDirection();
      this.settings.setTheme();

      // **FORÇA O CARREGAMENTO DO MENU SEMPRE**
      this.forceLoadMenu();

    } catch (error) {
      this.router.navigateByUrl('/auth/login'); // Redireciona para a página de login
    }
}
    if(!this.guardarsessoes.isAutenticated()
      ||
       !this.guardarsessoes.isAutenticateddatasessao() ||
       this.guardarsessoes.obterdatasessao()!==this.guardarsessoes.
       ObterDataactual()
      ){
      this.guardarsessoes.eliminarSessao();
      this.guardarsessoes.guardarSessaoData();
      this.router.navigateByUrl('/auth/login');
      return;
    }
    try{
      this.logoutService.startLogoutCountDown(300000);
    }
    catch(error){
      this.guardarsessoes.eliminarSessao();
      this.guardarsessoes.guardarSessaoData();
      this.router.navigateByUrl('/auth/login');
    }
  }

  ngAfterViewInit() {
    this.preloader.hide();
  }

  // if we want to restart our countdown on ANY user interaction with the UI
  @HostListener('document:click')
  onClick() {
    this.logoutService.restartCountdown();
  }
  checkVersion() {
    this.http.get('/assets/Version.json').subscribe((data: any) => {
      const currentVersion = data.version;
      if (currentVersion !== localStorage.getItem('appVersion')  ||
       !this.guardarsessoes.isAutenticateddatasessao() ||
       this.guardarsessoes.obterdatasessao()!==this.guardarsessoes.ObterDataactual()) {
          localStorage.removeItem('reload');
        localStorage.setItem('appVersion', currentVersion);
        window.location.reload();
        this.guardarsessoes.eliminarSessao();
        this.router.navigateByUrl('/auth/login');
      }
    });
  }

  /**
   * Força o carregamento do menu sempre que houver um usuário autenticado
   * Resolve o problema do menu não aparecer após refresh da página
   */
  private forceLoadMenu(): void {
    // Verifica se já há um menu carregado
    this.menuService.getAll().subscribe(currentMenu => {
      if (!currentMenu || currentMenu.length === 0) {
        // Se não há menu, carrega do LoginService
        this.loginService.menu().subscribe({
          next: (menu: Menu[]) => {
            if (menu && menu.length > 0) {
              // Adiciona namespace e define o menu
              this.menuService.addNamespace(menu, 'menu');
              this.menuService.set(menu);
            }
          },
          error: (error) => {
            console.error('Erro ao carregar menu na inicialização:', error);
            // Em caso de erro, tenta carregar menu básico
            this.loadFallbackMenu();
          }
        });
      }
    });
  }

  /**
   * Carrega um menu básico de fallback em caso de erro
   */
  private loadFallbackMenu(): void {
    const fallbackMenu: Menu[] = [
      {
        route: '/dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'dashboard'
      }
    ];
    this.menuService.set(fallbackMenu);
  }
}
