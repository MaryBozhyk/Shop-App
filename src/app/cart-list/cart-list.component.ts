import { Component, DoCheck } from '@angular/core';
import { CartService } from '../core/cart.service';
import { CartItem } from '../shared';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements DoCheck {
  cartProducts: Array<CartItem>;
  totalSumm: number;
  totalQty: number;

  constructor(private cartService: CartService) { }

  ngDoCheck(): void {
    this.cartProducts = this.cartService.getCartList();
    this.getTotalSumm();
    this.getTotalQty();
  }

  getTotalSumm(): void {
    this.totalSumm = 0;
    this.cartService.basketItems.forEach(item => this.totalSumm += item.price * item.quantity);
  }

  getTotalQty(): void {
    this.totalQty = this.cartService.basketItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  onRemove(item: CartItem): void {
    this.cartService.removeItem(item);
  }

  onReduce(item: CartItem): void {
    this.cartService.reduceItemQty(item);
  }

  onIncrease(item: CartItem): void {
    this.cartService.increaseItemQty(item);
  }
}
