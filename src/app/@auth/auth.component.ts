import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { NbAuthComponent, NbAuthService } from '@nebular/auth';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nb-auth',
  // tslint:disable-next-line:max-line-length
  styles: ['/*! * @license * Copyright Akveo. All Rights Reserved. * Licensed under the MIT License. See License.txt in the project root for license information. */:host nb-card{margin:0;height:calc(100vh - 2 * 2.5rem)}:host .navigation .link{text-decoration:none}:host .navigation .link .icon{font-size:2rem}:host nb-card-body{display:flex;width:100%}:host nb-auth-block{margin:auto}@media (max-width: 767.98px){:host nb-card{border-radius:0;height:100vh}}:host ::ng-deep nb-layout .layout .layout-container .content .columns nb-layout-column{padding:2.5rem}@media (max-width: 767.98px){:host ::ng-deep nb-layout .layout .layout-container .content .columns nb-layout-column{padding:0}} '],
  templateUrl: './auth.component.html',
})
export class AuthComponent extends NbAuthComponent implements OnDestroy {
  public showHeader: boolean = false;
  private subs: Subscription[] = [];

  constructor(
    protected override auth: NbAuthService,
    protected override location: Location,
    private router: Router
  ) {
    super(auth, location);
    this.subs.push(this.router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationEnd) {
          if (event.url === '/auth/login') {
            this.showHeader = false;
          } else {
            this.showHeader = true;
          }
        }
      }
    }));
  }

  override ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
