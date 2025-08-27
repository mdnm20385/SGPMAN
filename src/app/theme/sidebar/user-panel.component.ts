import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService, User, Usuario } from '@core/authentication';
import { SecureStorageService } from '@core/services/secure-storage.service';
import { environment } from '@env/environment';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-panel',
  template: `
    <!-- <div class="matero-user-panel" *ngIf="user">
      <img class="matero-user-panel-avatar" [src]="safeUrl ? safeUrl : (user?.avatar || './assets/images/heros/12.jpg')" alt="avatar" width="64" />
      <h4 class="matero-user-panel-name">{{ user?.name || 'Usuário' }}</h4>
      <h5 class="matero-user-panel-email">{{ user?.email || 'Sem email' }}</h5>
      <div class="matero-user-panel-icons">
        <button mat-icon-button (click)="logout()" matTooltip="{{ 'logout' | translate }}">
          <mat-icon>exit_to_app</mat-icon>
        </button>
      </div>
    </div> -->
  `,
  styleUrls: ['./user-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  //imports: [RouterLink, MatButtonModule, MatIconModule, MatTooltipModule, TranslateModule],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule, TranslateModule],
})
export class UserPanelComponent implements OnInit {
constructor(private sanitizer: DomSanitizer, private _cdr: ChangeDetectorRef){

}
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly secureStorage = inject(SecureStorageService);
  user: User | null = null;

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
    // alert( 'Invalido@gmail.com User panel component');

    const users=this.auth.obterSessao() as Usuario;
    if(this.auth.isAutenticated()===false ||  users==null || users.activopa==false){
     this.logout();
     return;
  }
    this.auth.user().subscribe(
      user => {
        this.user = user;
        if (this.user && users) {
          this.user.email = users.email;
          this.setUrl(users.pathPdf ?? '');
        }
      }
    );
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }

  logout() {
    this.eliminarReload();
    this.auth.logout().subscribe(() => {
      this.router.navigateByUrl('/auth/login');
    });
  }
  isAutenticareload() {
    return this.secureStorage.hasItem('reload');
  }
  obterreload() {
    return this.secureStorage.getItem('reload');
  }
  eliminarReload() {
    this.secureStorage.removeItem('reload');
  }
  guardarreload(entradaStamp?: string) {
    this.secureStorage.setItem('reload', entradaStamp);
  }
}
