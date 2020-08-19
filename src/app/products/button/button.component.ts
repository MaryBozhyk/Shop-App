import { Component, Input } from '@angular/core';
import { CartService } from '../../cart-list';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() cartItem;
  @Input() disable: boolean;

  constructor(private cartService: CartService) { }

  onBuy(): void {
    console.log('You have bought item');
    this.cartService.addItemtoCart(this.cartItem);
  }

}
