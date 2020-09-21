import { Component, Input } from '@angular/core';

import { Product } from '../../../shared';

import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent {
  @Input() item: Product;

  constructor(private router: Router) { }

  onBuy() {
    const link = ['product/', this.item.id];
    this.router.navigate(link);
  }
}
