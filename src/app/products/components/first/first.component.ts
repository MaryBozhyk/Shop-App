import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../../shared';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})

export class FirstComponent {
  @Input() bestSeller: Product;

  constructor(private router: Router) { }

  onBuy() {
    const link = ['product/', this.bestSeller.id];
    this.router.navigate(link);
  }
}
