import { NgClass } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    NgZone,
    OnInit
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { MtxProgressModule } from '@ng-matero/extensions/progress';
import { SecureStorageService } from 'app/core/services/secure-storage.service';
import { Subscription } from 'rxjs';

import { AuthService, SettingsService } from '@core';
import { PageHeaderComponent } from '@shared';
import { selectsprocura } from 'app/classes/CampoSessoes';
import { TablesRemoteDataService } from '../tables/remote-data/remote-data.service';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DashboardService,TablesRemoteDataService],
  standalone: true,
  imports: [
     NgClass,
    // RouterLink,
     MatButtonModule,
     MatCardModule,
     MatChipsModule,
     MatListModule,
     MatGridListModule,
     MatTableModule,
     MatTabsModule,
     MtxProgressModule,
    // BreadcrumbComponent,
     PageHeaderComponent,
  ],
})
export class DashboardComponent implements OnInit,AfterViewInit

{
  private readonly secureStorage = inject(SecureStorageService);

  isAutenticated() {
    return this.secureStorage.hasItem('usuario');
  }
  private readonly ngZone = inject(NgZone);
  private readonly settings = inject(SettingsService);
  private readonly dashboardSrv = inject(DashboardService);
  private readonly router = inject(Router);
  colorentrada!:string;
  titleentrada!:string;
  amountentrada!:number;
  valueentrada!:number;
  colorsaida!:string;
  titlesaida!:string;
  amountsaida!:number;
  valuesaida!:number;

  ngAfterViewInit(): void {
  }
  private readonly auth = inject(AuthService);
  colorpendente!:string;
  titlependente!:string;
  amountpendente!:number;
  valuependente!:number;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this.dashboardSrv.getData();
  messages = this.dashboardSrv.getMessages();
  charts = this.dashboardSrv.getCharts();
  chart1: any;
  chart2: any;
  entras= this.dashboardSrv.entrass();
  selectsprocura!:selectsprocura[];
  stats = this.dashboardSrv.getStats();
slect=this.auth.obterselectprocura();
  notifySubscription!: Subscription;
gettota():selectsprocura[]{
const se=this.auth.obterselectprocura();

return se;
}

eliminarReload() {
  localStorage.removeItem('reload');
}
logout() {
  this.router.navigateByUrl('/principal');
}
private readonly cdr = inject(ChangeDetectorRef);
  ngOnInit() {
    this.notifySubscription = this.settings.notify.subscribe(res => {

    });
    this.cdr.detectChanges();
    this.cdr.markForCheck();
    this.logout();
  }


  isSpinnerDisplayed=false;

  myArray: selectsprocura[] = [];

}
