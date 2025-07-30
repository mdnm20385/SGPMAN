import { InjectionToken, NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';


import { ToastrModule } from 'ngx-toastr';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '@env/environment';

// Required for AOT compilation
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { LoginService } from '@core/authentication/login.service';
import { FormlyConfigModule } from 'app/formly-config.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { RoutesModule } from './routes/routes.module';
import { SharedModule } from './shared/shared.module';
import { ThemeModule } from './theme/theme.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { httpInterceptorProviders, appInitializerProviders } from '@core';
export const BASE_URL = new InjectionToken<string>('BASE_URL');

@NgModule({ declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    ThemeModule,
    SharedModule,
    RoutesModule,
    FormlyConfigModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: BASE_URL, useValue: environment.baseUrl },
    { provide: LoginService, useClass: LoginService },
     { provide: LocationStrategy, useClass: HashLocationStrategy }

  ],
  ...httpInterceptorProviders,
  ...appInitializerProviders,
  bootstrap: [AppComponent]
})
// @NgModule({
//   declarations: [AppComponent],
//   imports: [
//     BrowserModule,
//     HttpClientModule,
//     CoreModule,
//     ThemeModule,
//     SharedModule,
//     RoutesModule,
//     FormlyConfigModule.forRoot(),
//     NgxPermissionsModule.forRoot(),
//     ToastrModule.forRoot(),
//     TranslateModule.forRoot({
//       loader: {
//         provide: TranslateLoader,
//         useFactory: TranslateHttpLoaderFactory,
//         deps: [HttpClient],
//       },
//     }),
//   ],
//   providers: [<% if(animations!='excluded') { %>
//     provideAnimationsAsync(<% if(Animation=='disabled') { %>'noop'<% } %>),<% } %>
//     { provide: BASE_URL, useValue: environment.baseUrl },
//     // ==================================================
//     // 👇 ❌ Remove it in the realworld application
//     //
//     { provide: LoginService, useClass: LoginService },
//     //
//     // ==================================================
//     ...httpInterceptorProviders,
//     ...appInitializerProviders,
//   ],
//   bootstrap: [AppComponent],
// })
export class AppModule {}
