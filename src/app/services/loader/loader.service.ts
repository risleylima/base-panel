import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private selector = 'loader';
  private element: HTMLElement | null;

  constructor(
    private zone: NgZone
  ) {
    this.element = document.getElementById(this.selector);
  }

  public show(): void {
    if (this.element) {
      this.element.style.display = 'block';
    }
  }

  public hide(delay: number = 0): void {
    this.zone.run(() => {
      setTimeout(() => {
        if (this.element) {
          this.element.style.display = 'none';
        }
      }, delay);
    });
  }
}