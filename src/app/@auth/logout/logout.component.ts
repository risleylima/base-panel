import { Component, Inject } from '@angular/core';
import { NbLogoutComponent } from '@nebular/auth';
import { NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass']
})
export class LogoutComponent extends NbLogoutComponent {
  errors: any;
  submitted: any;
  messages: any;

  constructor(
    protected override service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected override options = {},
    protected override router: Router,
    private _sessionService: SessionService
  ) {
    super(service, options, router);
    this._sessionService.destroy();
  }

  override logout() {
    super.logout(this.strategy);
    localStorage.clear();
  }
}
