import { Component, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

import { Product } from 'src/app/shared';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() item: Product;

  constructor(private store: Store) { }

  onEdit(): void {
    const link = ['/admin/edit/', this.item.id];
    this.store.dispatch(RouterActions.go({
      path: link
    }));
  }
}
