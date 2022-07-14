import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newReq;
    switch (req.url) {
      case environment.apiUrl + environment.loginEndpoint:
      case environment.apiUrl + environment.requestPasswordEndpoint:
        newReq = req.clone({
          setHeaders: {
            'Cache-Control': 'no-cache',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + environment.basic
          }
        });
        return next.handle(newReq);
      case environment.apiUrl + environment.resetPasswordEndpoint:
        newReq = req.clone({
          setHeaders: {
            'Cache-Control': 'no-cache',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + req.body.token
          }
        });
        delete newReq.body.token;
        return next.handle(newReq);
    }
    return next.handle(req);
  }
}
