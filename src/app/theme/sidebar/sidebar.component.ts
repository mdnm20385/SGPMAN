import { Component, EventEmitter, HostListener, inject, Input, Output, ViewEncapsulation } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { SidemenuComponent } from '../sidemenu/sidemenu.component';
import { BrandingComponent } from '../widgets/branding.component';
import { UserPanelComponent } from './user-panel.component';
import { Router } from '@angular/router';
import { AuthService } from '@core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatSlideToggleModule, BrandingComponent, SidemenuComponent, UserPanelComponent],
})
export class SidebarComponent {
  @Input() showToggle = true;
  @Input() showUser = true;
  @Input() showHeader = true;
  @Input() toggleChecked = false;

  @Output() toggleCollapsed = new EventEmitter<void>();
//   @HostListener('window:unload', [ '$event' ])
//   unloadHandler(event:any) {
//       //console.log("window has been closed.");
//       alert('window:unload');
//   }

//   private readonly router = inject(Router);
//   private readonly auth = inject(AuthService);
// @HostListener('window:beforeunload', [ '$event' ])
//   beforeUnloadHandler(event:any) {
//      // console.log("starting close event for window..");
//      alert();
//      this.auth.logout().subscribe(() => {
//       this.router.navigateByUrl('/auth/login');
//     });
//   }




}
