import { Component, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

import { Product } from '../../../shared';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})

export class FirstComponent {
  @Input() bestSeller: Product;

  constructor(private store: Store) { }

  onBuy() {
    const link = ['product/', this.bestSeller.id];
    this.store.dispatch(RouterActions.go({
      path: link
    }));
  }
}
