import { Component, OnInit, DoCheck } from '@angular/core';
import { CartService } from '../core/cart.service';
import { CartItem } from '../shared';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit, DoCheck {
  cartProducts: Array<CartItem>;
  totalSumm: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartProducts = this.cartService.getCartList();
  }

  ngDoCheck(): void {
    this.getTotalSumm();
  }

  getTotalSumm() {
    this.totalSumm = 0;
    this.cartService.basketItems.forEach(item => this.totalSumm += item.price * item.quantity);
  }
}
