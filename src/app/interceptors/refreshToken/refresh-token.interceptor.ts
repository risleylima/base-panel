import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { NbAuthService } from '@nebular/auth';
import { switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: NbAuthService,
    private router: Router
  ) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url === environment.apiUrl + environment.refreshTokenEndpoint) {
      return this.authService.getToken().pipe(switchMap(token => {
        const payload = token.getPayload();
        const newReq = req.clone({
          setHeaders: {
            'Cache-Control': 'no-cache',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + payload.refresh
          }
        });
        return next.handle(newReq);
      }));
    } else {
      switch (req.url) {
        case environment.apiUrl + environment.loginEndpoint:
        case environment.apiUrl + environment.requestPasswordEndpoint:
        case environment.apiUrl + environment.resetPasswordEndpoint:
          return next.handle(req);
      }

      return next.handle(req).pipe(catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.router.navigate(['auth/login']);
          localStorage.clear();
          throw new Error('Error already inspected, redirecting to login...');
        }
        return next.handle(req);
      }));
    }
  }
}
