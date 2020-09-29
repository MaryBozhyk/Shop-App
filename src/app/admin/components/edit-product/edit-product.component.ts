import { Component, OnDestroy, OnInit } from '@angular/core';
import { UrlTree } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Product } from 'src/app/shared';
import { DialogService, CanComponentDeactivate } from 'src/app/core';

import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { ProductsFacade } from './../../../core/@ngrx';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  product: Product;
  itemForm: FormGroup;
  canBuild = false;
  isSubmit = false;

  private unsubscribe: Subject<void> = new Subject();

  get name(): AbstractControl {
    return this.itemForm.get('name');
  }

  get price(): AbstractControl {
    return this.itemForm.get('price');
  }

  get sizes() {
    return this.itemForm.get('sizes') as FormArray;
  }

  get quantity() {
    return this.itemForm.get('quantity') as FormArray;
  }

  constructor(
    private dialogService: DialogService,
    private fb: FormBuilder,
    private productsFacade: ProductsFacade
  ) {
  }

  ngOnInit(): void {
      const observer: any = {
        next: (product: Product) => {
          this.product = { ...product };

          if (Object.keys(this.product).length > 0) {
            this.canBuild = true;
            this.buildForm();
            this.setFormValues();
          }
        },
        error(err) {
          console.log(err);
        },
        complete() {
          console.log('Stream is completed');
        }
      };

      this.productsFacade.selectedProductByUrl$
        .pipe(
          takeUntil(this.unsubscribe)
        )
        .subscribe(observer);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onSubmit() {
    this.getFormValues();
    this.productsFacade.updateProduct({ product: this.product, url: '/admin' });
    this.isSubmit = true;
  }

  onDeleteItem() {
    this.productsFacade.deleteProduct({ product: this.product });
  }

  onGoBack() {
    this.getFormValues();
    this.productsFacade.goTo({ path: ['/admin'] });
  }

  canDeactivate():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
    if (this.isSubmit) {
      return true;
   }

    if (this.itemForm.pristine) {
      return true;
   }
    return this.dialogService.confirm('Discard changes?');
  }

  private buildForm() {
    this.itemForm = this.fb.group({
      name: [this.product?.name, Validators.required],
      price: [this.product?.price, Validators.required],
      sizes: this.fb.array([]),
      quantity: this.fb.array([])
    });
  }

  private setFormValues() {
    this.product.sizes.forEach(size => {
      this.sizes.push(new FormControl(size, Validators.required));
    });

    this.product.quantity.forEach(quantity => {
      this.quantity.push(new FormControl(quantity, Validators.required));
    });
  }

  private getFormValues() {
    this.product.name = this.name.value;
    this.product.price = this.price.value;
    this.product.sizes = this.sizes.value;
    this.product.quantity = this.quantity.value;
  }
}
