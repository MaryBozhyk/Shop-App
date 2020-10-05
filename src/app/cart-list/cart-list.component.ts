import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from './cart.service';
import { CartItem } from '../shared';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements DoCheck {
  cartProducts: Array<CartItem>;
  totalSumm: number;
  totalQty: number;
  sortOption: string;
  sortOrder = false;
  sortingProperties: string[] = ['name', 'price', 'quantity'];

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

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

  onMakeOrder(): void {
    this.router.navigate(['./process-order']);
  }
}
