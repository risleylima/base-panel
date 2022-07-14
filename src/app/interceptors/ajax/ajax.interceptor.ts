import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AjaxInterceptor implements HttpInterceptor {
  constructor(
    private loaderService: LoaderService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.headers.get('disableLoader')) {
      this.loaderService.show();
    }

    const newReq = req.clone({
      setHeaders: {
        'Cache-Control': 'no-cache',
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return next.handle(newReq).pipe(tap((evt) => {
      if (evt instanceof HttpResponse) {
        if (!req.headers.get('disableLoader')) {
          this.loaderService.hide();
        }
      }
    }), catchError((err) => {
      this.loaderService.hide();
      throw err;
    }));
  }
}
