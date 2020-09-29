import { Injectable } from '@angular/core';
import { CartItem } from '../shared';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  basketItems: Array<CartItem> = [];
  totalQuantity: number;
  totalSumm: number;

  private newCartItem: CartItem;

  constructor() { }

  getCartList(): Array<CartItem> {
    this._updateCartData();
    return this.basketItems;
  }

  addItemtoCart(data: any): void {
    this.newCartItem = {
      id: data.item.id,
      photo: data.item.photo,
      name: data.item.name,
      price: data.item.price,
      size: data.size,
      quantity: 1
    };

    this.basketItems.forEach(x => {
      if (x.name === data.item.name && x.size === data.size) {
        x.quantity += 1;
        this.newCartItem = null;
      }
    });

    if (this.newCartItem) {
      this.basketItems.push(this.newCartItem);
    }

    this._updateCartData();
  }

  reduceItemQty(item: CartItem): void {
    this.basketItems.forEach(currentItem => {
      if (currentItem.name === item.name && currentItem.size === item.size) {
        currentItem.quantity -= 1;
      }

      if (currentItem.quantity === 0) {
        this.removeItem(currentItem);
      }
    });

    this._updateCartData();
  }

  increaseItemQty(item: CartItem): void {
    this.basketItems.forEach(currentItem => {
      if (currentItem.name === item.name && currentItem.size === item.size) {
        currentItem.quantity += 1;
      }
    });

    this._updateCartData();
  }

  removeItem(item: CartItem): void {
    this.basketItems = this.basketItems.filter(currentItem => currentItem !== item);

    this._updateCartData();
  }

  removeAllProducts(): void {
    this.basketItems = [];
    this._updateCartData();
  }

  private _updateCartData(): void {
    this.totalQuantity = this.basketItems.reduce((acc, item) => acc + item.quantity, 0);
    this.totalSumm = this.basketItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  }

}
