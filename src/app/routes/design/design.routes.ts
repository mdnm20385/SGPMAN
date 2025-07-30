import { Routes } from '@angular/router';

import { DesignColorsComponent } from './colors/colors.component';
import { DesignIconsComponent } from './icons/icons.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'colors', component: DesignColorsComponent },
  { path: 'icons', component: DesignIconsComponent },
  { path: 'dashboard', component: DashboardComponent },
];
