import { Injectable } from '@angular/core';
import { Product, CartItem } from '../shared';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  basketItems: Array<CartItem> = [];

  private newCartItem: CartItem;

  constructor() { }

  getCartList(): Array<CartItem> {
    return this.basketItems;
  }

  addItemtoCart(data: any): void {
    this.newCartItem = {
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
  }

  increaseItemQty(item: CartItem): void {
    this.basketItems.forEach(currentItem => {
      if (currentItem.name === item.name && currentItem.size === item.size) {
        currentItem.quantity += 1;
      }
    });
  }

  removeItem(item: CartItem): void {
    this.basketItems = this.basketItems.filter(currentItem => currentItem !== item);
  }

}
// не понятно расположение этого сервиса
