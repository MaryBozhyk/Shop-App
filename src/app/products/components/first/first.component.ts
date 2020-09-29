import { Component, Input } from '@angular/core';

import { ProductsFacade } from './../../../core/@ngrx';

import { Product } from '../../../shared';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})

export class FirstComponent {
  @Input() bestSeller: Product;

  constructor(private productsFacade: ProductsFacade) { }

  onBuy() {
    const link = ['product/', this.bestSeller.id];
    this.productsFacade.goTo({ path: link });
  }
}
