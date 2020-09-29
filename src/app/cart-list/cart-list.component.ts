import { Component, DoCheck, OnDestroy } from '@angular/core';

import { CartService } from './cart.service';
import { OrdersService } from '../orders';
import { CartItem, Product } from '../shared';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import { selectProductsData } from '../core/@ngrx/products/products.selectors';
import * as ProductsActions from '../core/@ngrx/products/products.actions';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements DoCheck, OnDestroy {
  cartProducts: Array<CartItem>;
  totalSumm: number;
  totalQty: number;
  sortOption: string;
  sortOrder = false;
  sortingProperties: string[] = ['name', 'price', 'quantity'];
  stockProducts: Product[] = [];

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private store: Store
  ) { }

  ngDoCheck(): void {
    this.cartProducts = this.cartService.getCartList();
    this.totalSumm = this.cartService.totalSumm;
    this.totalQty =  this.cartService.totalQuantity;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
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
    const observer: any = {
      next: (products: Product[]) => {
        this.stockProducts = [...products];
        cartItems.forEach(item => {
          this.stockProducts
          .filter(product => +product.id === +item.id)
          .map(product => {
            const productQuantity = [...product.quantity];
            productQuantity[product.sizes.indexOf(item.size)] -= item.quantity;
            return {
              ...product,
              quantity: productQuantity
            };
          })
          .map(product => this.store.dispatch(ProductsActions.updateProduct({ product, url: '/orders' })));
        });
        this.onRemoveAll();
      },
      error(err) {
        console.log(err);
      },
      complete() {
        console.log('Stream is completed');
      }
    };

    this.store
      .pipe(
        select(selectProductsData),
        takeUntil(this.unsubscribe)
      )
      .subscribe(observer);
  }
}
