import { Component, Input, Output, EventEmitter } from '@angular/core';

import { CartItem } from '../../shared';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})

export class CartItemComponent {
  @Input() product: CartItem;
  @Output() remove = new EventEmitter<CartItem>();
  @Output() minus = new EventEmitter<CartItem>();
  @Output() plus = new EventEmitter<CartItem>();

  constructor() { }

  removeItem() {
    this.remove.emit(this.product);
  }

  reduceItemQty() {
    this.minus.emit(this.product);
  }

  increaseItemQty() {
    this.plus.emit(this.product);
  }

}
