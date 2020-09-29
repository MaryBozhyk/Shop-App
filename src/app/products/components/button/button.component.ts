import { Component, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

import { CartItem } from 'src/app/shared';
import { CartService } from '../../../cart-list';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() cartItem: CartItem;
  @Input() disable: boolean;

  constructor(
    private cartService: CartService,
    private store: Store
    ) { }

  onBuy(): void {
    if (!this.cartItem) {
      return;
    }
    console.log('You have bought item');
    this.cartService.addItemtoCart(this.cartItem);
    this.store.dispatch(RouterActions.go({
      path: ['/cart']
    }));
  }
}
