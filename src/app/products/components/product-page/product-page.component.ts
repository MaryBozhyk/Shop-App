import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Product } from '../../../shared';
import { HttpProductObservableService } from '../../services';

import { switchMap } from 'rxjs/operators';
import { SizeButtonComponent } from '../size-button/size-button.component';
import { ChooseSize } from '../../models/choose-size.model';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  @ViewChildren('sizeButton') sizeButtons: QueryList<SizeButtonComponent>;

  disableButton = true;
  itemSize: number;
  product: Product;

  constructor(
    private httpProductObservableService: HttpProductObservableService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const observer = {
      next: (product: Product) => (this.product = { ...product }),
      error: (err: any) => console.error(err)
    };

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return this.httpProductObservableService.getProduct(+params.get('productID'));
        }))
      .subscribe(observer);
  }

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
