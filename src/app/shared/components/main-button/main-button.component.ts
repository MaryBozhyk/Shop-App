import { Component, HostListener, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

@Component({
  selector: 'app-main-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.css']
})
export class MainButtonComponent {
  @Input() title = 'Start shopping';

  constructor(private store: Store) { }

  @HostListener('click', ['$event.target'])
  onClick() {
    this.store.dispatch(RouterActions.go({
      path: ['/home']
    }));
  }
}
