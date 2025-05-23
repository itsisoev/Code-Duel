import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "./auth/interceptor/auth.interceptor";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {provideCodeEditor} from "@ngstack/code-editor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: JWT_OPTIONS, useValue: {
        headerName: 'Authorization',
        authScheme: 'Bearer ',
        tokenGetter: () => localStorage.getItem('access_token'),
        allowedDomains: ['localhost:3000'],
      }
    },
    JwtHelperService,
    provideCodeEditor()
  ]
};
