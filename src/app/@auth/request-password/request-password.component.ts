import { Component, ViewEncapsulation, ChangeDetectorRef, Inject, AfterViewChecked } from '@angular/core';
import { NbRequestPasswordComponent, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.sass']
})
export class RequestPasswordComponent extends NbRequestPasswordComponent implements AfterViewChecked {

  private toastr: boolean = false;

  constructor(
    protected override service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected override options = {},
    protected override cd: ChangeDetectorRef,
    protected override router: Router,
    private toastrService: NbToastrService
  ) {
    super(service, options, cd, router);
  }

  override requestPass() {
    super.requestPass();
    this.toastr = true;
  }

  ngAfterViewChecked() {
    if (this.toastr && this.showMessages.error && this.errors && this.errors.length) {
      this.toastrService.danger(this.errors,
        'Ops!',
        {
          duration: 5000,
          preventDuplicates: true
        }
      );
      this.toastr = false;
    }

    if (this.toastr && this.showMessages.success && this.messages && this.messages.length) {
      this.toastrService.success(this.messages,
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
