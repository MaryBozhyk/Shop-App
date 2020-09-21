import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/app/shared';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() item: Product;

  constructor(private router: Router) { }

  onEdit(): void {
    const link = ['/admin/edit/', this.item.id];
    this.router.navigate(link);
  }
}
