import { Component, Input } from '@angular/core';

import { ProductsFacade } from './../../../core/@ngrx';

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
    private productsFacade: ProductsFacade
    ) { }

  onBuy(): void {
    if (!this.cartItem) {
      return;
    }
    console.log('You have bought item');
    this.cartService.addItemtoCart(this.cartItem);
    this.productsFacade.goTo({ path: ['/cart'] });
  }
}
