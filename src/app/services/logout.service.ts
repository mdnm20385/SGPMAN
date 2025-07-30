import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription, timer } from 'rxjs';

import { Router } from '@angular/router';
import { LogoutConfirmComponent } from './logout-confirm/logout-confirm.component';
import { AuthService } from '@core/authentication';
@Injectable({ providedIn: 'root' })
export class  LogoutService {
  logoutCountdown!: Subscription;
  dialogInstance!: MatDialogRef<LogoutConfirmComponent>;
  storedTimeToLogout!: number;

  constructor(private matDialog: MatDialog,private router: Router,
    private auth:AuthService,
  ) {

    }

  startLogoutCountDown(timeToLogout: number) {
    this.storedTimeToLogout = timeToLogout;
  }

  createCountdown(timeToLogout: number): Observable<number> {
    return timer(timeToLogout);
  }

  cancelLogout() {
    this.logoutCountdown.unsubscribe();
  }
  restartCountdown() {
    // we want to be sure that there is an active subscription that we can clear out
    // if (this.logoutCountdown) {
    //   this.cancelLogout();
    //   this.startLogoutCountDown(this.storedTimeToLogout);
    // }
  }
  logout() {
    this.eliminarReload();
    this.auth.logout().subscribe(() => {
      this.router.navigateByUrl('/auth/login');
    });
  }
  eliminarReload() {
    localStorage.removeItem('reload');
  }
  ourLogoutFunction() {
  this. logout();
  }
}
