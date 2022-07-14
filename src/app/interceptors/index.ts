/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';

import { LoginInterceptor } from './login';

import { NbAuthJWTInterceptor, NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '@nebular/auth';

import { RefreshTokenInterceptor } from './refreshToken';

import { AjaxInterceptor } from './ajax/ajax.interceptor';

import { environment } from 'src/environments/environment';

const URLFilter = (req: HttpRequest<any>) => {
  switch (req.url) {
    case `${environment.apiUrl}${environment.loginEndpoint}`:
    case `${environment.apiUrl}${environment.refreshTokenEndpoint}`:
      return true;
    default:
      return false;
  }
};

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true },
  { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: URLFilter },
  { provide: HTTP_INTERCEPTORS, useClass: AjaxInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
];
