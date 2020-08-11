import { Component, Input, ViewChildren, QueryList } from '@angular/core';

import { Product } from '../../../shared';
import { SizeButtonComponent } from '../../size-button/size-button.component';
import { ChooseSize } from '../../choose-size.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent {
  @Input() item: Product;
  @ViewChildren('sizeButton') sizeButtons: QueryList<SizeButtonComponent>;

  showDetails = false;
  disableButton = true;
  itemSize: number;

  constructor() { }

  onChangeSize(item: ChooseSize) {
    this.disableButton = true;
    if (item.active) {
      this.sizeButtons.forEach(sizeButton => {
        if (sizeButton.isChosen && sizeButton.itemSize !== item.size) {
          sizeButton.isChosen = false;
        }
      });
      this.itemSize = item.size;
      this.disableButton = false;
    }
  }

}
