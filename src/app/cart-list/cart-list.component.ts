import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from './cart.service';
import { OrdersService } from '../orders';
import { HttpProductService, HttpProductObservableService } from '../products/services';
import { CartItem, Product } from '../shared';

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
  stockProducts: Product[];

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private httpProductService: HttpProductService,
    private httpProductObservableService: HttpProductObservableService,
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
    this.updateProductsAndNavigate(this.cartProducts);
  }

  private updateProductsAndNavigate(cartItems: CartItem[]) {
    this.httpProductService.getAllProducts()
    .then((products) => {
      this.stockProducts = products;

      cartItems.forEach(item => {
        this.stockProducts
        .filter(product => product.id === item.id)
        .map(product => {
          product.quantity[product.sizes.indexOf(item.size)] -= item.quantity;
          this.httpProductObservableService.updateProduct(product)
          .subscribe((err) => console.error(err));
        });
      });

      this.onRemoveAll();
      this.router.navigate(['/orders']);
    })
    .catch((err) => console.error(err));
  }
}
