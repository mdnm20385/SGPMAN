import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, interval, takeUntil } from 'rxjs';
import { LogoutService } from '../logout.service';
import { AuthService } from '@core/authentication';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-confirm',
  standalone: true,
  imports: [],
  templateUrl: './logout-confirm.component.html',
  styleUrl: './logout-confirm.component.scss'
})
export class LogoutConfirmComponent implements OnInit, OnDestroy {
  count = 30;

  private destroyed$ = new Subject<void>();

  constructor(
    private changeDetection: ChangeDetectorRef,
    private logoutService: LogoutService,
    private matDialogRef: MatDialogRef<LogoutConfirmComponent>,
    private auth:AuthService,
    private router:Router
  ) {}

  ngOnInit(): void {
    interval(1000)
    .pipe(takeUntil(this.destroyed$))
    .subscribe(() => {
      if (this.count === 1) {
        this.logoutService.ourLogoutFunction();
        this.destroyed$.next();
    this.matDialogRef.close();
      }
      this.count--;
      this.changeDetection.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
  eliminarReload() {
    localStorage.removeItem('reload');
  }
  restartCountdown() {
    this.matDialogRef.close();
    this.logoutService.restartCountdown();
  }

  logout() {
    this.eliminarReload();
    this.auth.logout().subscribe(() => {
      this.router.navigateByUrl('/auth/login');
    });
  }
}

