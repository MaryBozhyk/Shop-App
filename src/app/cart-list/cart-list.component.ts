import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from './cart.service';
import { OrdersService } from '../orders';
import { ProductService } from '../products/services/product.service';
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
  sortOption: string;
  sortOrder = false;
  sortingProperties: string[] = ['name', 'price', 'quantity'];

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private productService: ProductService,
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
    this.ordersService.setOrder(this.cartProducts, this.totalSumm, this.totalQty);
    this.productService.updateProducts(this.cartProducts);
    this.onRemoveAll();
    this.router.navigate(['/orders']);
  }
}
