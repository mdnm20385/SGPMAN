import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, debounceTime, tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService, SettingsService, User, Usuario } from '@core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-user',
  template: `
    <button class="r-full" mat-button [matMenuTriggerFor]="menu">
      <img matButtonIcon class="avatar"
       [src]="safeUrl ? safeUrl :  user.avatar"
       width="24" alt="avatar" />
      <span class="m-x-8">{{ user.name }}</span>
    </button>

    <mat-menu #menu="matMenu">

      <!--
     <button routerLink="/profile/overview" mat-menu-item>
        <mat-icon>account_circle</mat-icon>
        <span>{{ 'profile' | translate }}</span>
      </button>
      <button routerLink="/profile/settings" mat-menu-item>
        <mat-icon>edit</mat-icon>
        <span>{{ 'edit_profile' | translate }}</span>
      </button> -->
      <button mat-menu-item (click)="restore()">
        <mat-icon>restore</mat-icon>
        <span>{{ 'restore_defaults' | translate }}</span>
      </button>
      <button mat-menu-item (click)="logout()">
        <mat-icon>exit_to_app</mat-icon>
        <span>{{ 'logout' | translate }}</span>
      </button>
    </mat-menu>
  `,
  styles: [
    `
      .avatar {
        width: 24px !important;
        height: 24px !important;
        border: 2px solid #27ae60 !important;
        border-radius: 50% !important;
        object-fit: cover !important;
        display: inline-block !important;
        vertical-align: middle !important;
        background-color: white !important;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
      }

      .r-full {
        background: whitesmoke !important;
        color: #27ae60 !important;
        border-radius: 8px !important;
        padding: 8px 12px !important;
        transition: all 0.3s ease !important;
        border: 1px solid rgba(39, 174, 96, 0.3) !important;
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
      }

      .r-full img {
        margin-right: 0 !important;
      }

      .r-full:hover {
        background: rgba(39, 174, 96, 0.2) !important;
        color: #1e8449 !important;
        transform: translateY(-1px) !important;
        box-shadow: 0 4px 12px rgba(39, 174, 96, 0.15) !important;
      }

      .r-full span {
        color: #27ae60 !important;
        font-weight: 600 !important;
        margin-left: 8px !important;
      }

      .r-full:hover span {
        color: #1e8449 !important;
      }

      .menu-container, .user-menu {
        z-index: 1000;
      }

      /* Estilização do menu dropdown */
      ::ng-deep .mat-mdc-menu-panel {
        background: white !important;
        border-radius: 8px !important;
        box-shadow: 0 8px 25px rgba(39, 174, 96, 0.15) !important;
        border: 1px solid #27ae60 !important;
      }

      ::ng-deep .mat-mdc-menu-item {
        color: #2c3e50 !important;
        transition: all 0.3s ease !important;
      }

      ::ng-deep .mat-mdc-menu-item:hover {
        background-color: rgba(39, 174, 96, 0.1) !important;
        color: #27ae60 !important;
      }

      ::ng-deep .mat-mdc-menu-item .mat-icon {
        color: #27ae60 !important;
        margin-right: 8px !important;
      }

      ::ng-deep .mat-mdc-menu-item:hover .mat-icon {
        color: #1e8449 !important;
      }
    `,
  ],
  standalone: true,
  //imports: [RouterLink, MatButtonModule, MatIconModule, MatMenuModule, TranslateModule],
  imports: [ MatButtonModule, MatIconModule, MatMenuModule, TranslateModule],
})
export class UserComponent implements OnInit {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly settings = inject(SettingsService);
  private readonly http = inject(HttpClient);
constructor(private sanitizer: DomSanitizer, private _cdr: ChangeDetectorRef){

}
  user!: User;

safeUrl: SafeResourceUrl | null = null;imageUrl!: string;

cleanup() {
  this.safeUrl= null;
  //this.registerForm.patchValue({path1:''});
}

private _isLoading$ = new BehaviorSubject<boolean>(false);
path:string= `${environment.Apiurl}Proc2`;
get isLoading$() {
  return this._isLoading$.asObservable();
}
setUrl(fileName:string) {
  if(fileName.length<=0){
    return;
  }
  this._isLoading$.next(true);
  this.cleanups();
  this.safeUrl = this.bypassAndSanitize(`${this.path}/LeituraDeFicheiros?ficheiro=${fileName}`);
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

  ngOnInit(): void {

    this.auth
      .user()
      .pipe(
        tap(user => {
          this.user = user;
          if(this.auth.isAutenticated()==true)
            {

         const users=this.auth.obterSessao() as Usuario;
          this.user.name =users.login;
          if ((users.email?.length ?? 0) > 0) {

            this.user.email =`${users.email}`;
        }else{
          this.user.email =`${users.login}@gmail.com`;
        }
          this.user.avatar = './assets/images/heros/12.jpg';
         this.setUrl(users.pathPdf ?? '');
          }
        }),
        debounceTime(10)
      )
      .subscribe(() => {
        if(this.auth.isAutenticated()==true)
          {
       const users=this.auth.obterSessao() as Usuario;
        this.user.name =users.login;
       this.auth.GetTotais2(users)
         .subscribe( (res)=>
        {
          this.auth.guardartotais(res);
        });
         if ((users.email?.length ?? 0) > 0) {

          this.user.email =`${users.email}`;
      }else{
        this.user.email =`${users.login}@gmail.com`;
      }
         this.user.avatar='./assets/images/heros/12.jpg';

        }
    this.cdr.markForCheck();
    this.cdr.detectChanges();
      });
  }

  logout() {
    this.eliminarReload();
    this.auth.eliminarTotais();
    this.auth.eliminarentradaStamp();
    this.auth.logout().subscribe(() => {
      this.router.navigateByUrl('/auth/login');

    });
  }

  isAutenticareload() {
    return (localStorage.getItem('reload')) !== null ? true : false;
  }
  obterreload() {
    const dataGuardar = localStorage.getItem('reload');
    const utilizador = JSON.parse(dataGuardar!);
    return utilizador;
  }
  eliminarReload() {
    localStorage.removeItem('reload');
  }
  guardarreload() {
    localStorage.setItem('reload', JSON.stringify('true'));
  }
  restore() {
    this.settings.reset();
    window.location.reload();
  }
}
