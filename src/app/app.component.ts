import { Component, OnInit, AfterViewInit, inject, OnDestroy, HostListener } from '@angular/core';
import { AuthService, PreloaderService, SettingsService, Usuario } from '@core';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LogoutService } from './services/logout.service';
import { MtxDialog } from '@ng-matero/extensions/dialog';

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
}
