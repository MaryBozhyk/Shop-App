import { Component, OnInit, QueryList, ViewChildren, OnDestroy } from '@angular/core';

import { Product } from '../../../shared';
import { SizeButtonComponent } from '../size-button/size-button.component';
import { ChooseSize } from '../../models/choose-size.model';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import { selectSelectedProductByUrl } from './../../../core/@ngrx';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy {
  @ViewChildren('sizeButton') sizeButtons: QueryList<SizeButtonComponent>;

  disableButton = true;
  itemSize: number;
  product: Product;

  private componentDestroyed$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store
  ) {}

  ngOnInit(): void {
    const observer: any = {
      next: (product: Product) => {
        this.product = { ...product };
      },
      error(err) {
        console.log(err);
      },
      complete() {
        console.log('Stream is completed');
      }
    };

    this.store
      .pipe(
        select(selectSelectedProductByUrl),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(observer);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
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
