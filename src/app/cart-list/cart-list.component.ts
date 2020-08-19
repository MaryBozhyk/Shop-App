import { Component, DoCheck } from '@angular/core';
import { CartService } from './cart.service';
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
    this.totalSumm = this.cartService.totalSumm;
    this.totalQty =  this.cartService.totalQuantity;
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

  onRemoveAll(): void {
    this.cartService.removeAllProducts();
  }
}
