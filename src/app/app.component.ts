import { Component, OnDestroy } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart, Router
} from '@angular/router';
import { Subscription } from 'rxjs';
import { LoaderService } from './services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  private subs: Subscription[] = [];

  constructor(
    private router: Router,
    private loaderService: LoaderService,
  ) {
    this.subs.push(this.router.events.subscribe({
      next: (event: Event) => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loaderService.show();
            break;
          }
          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loaderService.hide(400);
            break;
          }
          default: {
            break;
          }
        }
      },
      error: () => { },
      complete: () => { }
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
