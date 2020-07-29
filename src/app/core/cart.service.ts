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

  addItemtoCart(item: Product): void {
    this.newCartItem = {
      photo: item.photo, 
      name: item.name, 
      price: item.price, 
      quantity: 1
    }

    this.basketItems.forEach(x => {
      if(x.name === item.name) {
        x.quantity += 1;
        delete this.newCartItem
      }
    });

    if(this.newCartItem) {
      this.basketItems.push(this.newCartItem);
    }    
  }

}
