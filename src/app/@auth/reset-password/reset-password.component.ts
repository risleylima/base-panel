import { Component, Inject, ChangeDetectorRef, OnDestroy, ViewEncapsulation, AfterViewChecked } from '@angular/core';
import { NbResetPasswordComponent, NbAuthService, NB_AUTH_OPTIONS, NbAuthJWTToken } from '@nebular/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import * as moment from 'moment';
import { NbToastrService } from '@nebular/theme';
import { faClock, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent extends NbResetPasswordComponent implements OnDestroy, AfterViewChecked {
  public token: NbAuthJWTToken | any;
  public tokenExpiration: any;
  public agora: any = moment();
  public icons = {
    faClock,
    faTimesCircle
  };
  private toastr: boolean = false;



  private subs: Subscription[] = [];

  constructor(
    protected override service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected override options = {},
    protected override cd: ChangeDetectorRef,
    protected override router: Router,
    private activeRouter: ActivatedRoute,
    private toastrService: NbToastrService
  ) {
    super(service, options, cd, router);
    this.subs.push(this.activeRouter.queryParams.subscribe(params => {
      this.token = params['token'];
      if (params['token']) {
        this.token = new NbAuthJWTToken(params['token'], '', new Date());
        this.tokenExpiration = moment.unix(this.token.getPayload().exp);
      }
    }));

    this.subs.push(interval(1000).subscribe((val) => {
      this.agora = moment();
    }));

    localStorage.clear();
  }

  override resetPass() {
    this.user.token = this.token.getValue();
    super.resetPass();
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

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
