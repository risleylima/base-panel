import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private _toastrService: NbToastrService,
    private _router: Router
  ) { }

  getViewport(): string {
    const width = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0);

    if (width <= 576) {
      return 'xs';
    }
    if (width <= 768) {
      return 'sm';
    }
    if (width <= 992) {
      return 'md';
    }
    if (width <= 1200) {
      return 'lg';
    }
    return 'xl';
  }

  catchError(err: any, preventDuplicates = true, showToastr = true) {
    console.error(err);
    let msg;
    if (err.status === 0) {
      msg = 'Erro de Conexão ao Servidor!'
    } else if (err.status === 500) {
      msg = err.error.erro;
    } else if (err.status === 403) {
      msg = err.error.erro;
      this._router.navigate(['/pages/forbidden']);
    } else {
      msg = err.message;
    }
    if (showToastr) {
      this._toastrService.danger(msg,
        'Ops!',
        {
          duration: 5000,
          preventDuplicates
        }
      );
    }

    return throwError(err);
  }
}
