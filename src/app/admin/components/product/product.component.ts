import { Component, Input } from '@angular/core';

import { ProductsFacade } from './../../../core/@ngrx';

import { Product } from 'src/app/shared';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() item: Product;

  constructor(private productsFacade: ProductsFacade) { }

  onEdit(): void {
    const link = ['/admin/edit/', this.item.id];
    this.productsFacade.goTo({path: link});
  }
}
