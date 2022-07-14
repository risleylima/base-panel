import { Component, ViewEncapsulation, AfterViewChecked, Inject, ChangeDetectorRef } from '@angular/core';
import { NbLoginComponent, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent implements AfterViewChecked {
  private toastr: boolean = false;
  constructor(
    protected override service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected override options = {},
    protected override cd: ChangeDetectorRef,
    protected override router: Router,
    private _toastrService: NbToastrService
  ) {
    super(service, options, cd, router);
  }

  override login() {
    super.login();
    this.toastr = true;
  }

  ngAfterViewChecked() {
    if (this.toastr && this.showMessages.error && this.errors && this.errors.length) {
      this._toastrService.danger(this.errors,
        'Ops!',
        {
          duration: 5000,
          preventDuplicates: true
        }
      );
      this.toastr = false;
    }

    if (this.toastr && this.showMessages.success && this.messages && this.messages.length) {
      this._toastrService.success(this.messages,
        'Sucesso!',
        {
          duration: 5000,
          preventDuplicates: true
        }
      );
      this.toastr = false;
    }
  }

}
