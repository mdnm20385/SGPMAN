import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from '@theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '@theme/auth-layout/auth-layout.component';
import { HeaderComponent } from '@theme/header/header.component';
import { SidebarNoticeComponent } from '@theme/sidebar-notice/sidebar-notice.component';
import { SidebarComponent } from '@theme/sidebar/sidebar.component';
import { UserPanelComponent } from '@theme/sidebar/user-panel.component';
import { NavAccordionItemDirective } from '@theme/sidemenu/nav-accordion-item.directive';
import { NavAccordionToggleDirective } from '@theme/sidemenu/nav-accordion-toggle.directive';
import { NavAccordionDirective } from '@theme/sidemenu/nav-accordion.directive';
import { SidemenuComponent } from '@theme/sidemenu/sidemenu.component';
import { TopmenuPanelComponent } from '@theme/topmenu/topmenu-panel.component';
import { TopmenuComponent } from '@theme/topmenu/topmenu.component';
import { BrandingComponent } from '@theme/widgets/branding.component';
import { NotificationComponent } from '@theme/widgets/notification.component';
import { TranslateComponent } from '@theme/widgets/translate.component';
import { UserComponent } from '@theme/widgets/user.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AdminLayoutComponent,
    AuthLayoutComponent,
    SidebarComponent,
    UserPanelComponent,
    SidemenuComponent,
    NavAccordionDirective,
    NavAccordionItemDirective,
    NavAccordionToggleDirective,
    SidebarNoticeComponent,
    TopmenuComponent,
    TopmenuPanelComponent,
    HeaderComponent,
    BrandingComponent,
    NotificationComponent,
    TranslateComponent,
    UserComponent,
  ],
})
export class ThemeModule {}
