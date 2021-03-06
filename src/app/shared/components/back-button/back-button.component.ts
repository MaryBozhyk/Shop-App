import { Component, HostListener } from '@angular/core';

import { Store } from '@ngrx/store';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent {

  constructor(private store: Store) { }

  @HostListener('click')
  onClick() {
    this.store.dispatch(RouterActions.go({
      path: ['/home']
    }));
  }
}
