import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UrlTree } from '@angular/router';

import { Category, Product } from 'src/app/shared';
import { CanComponentDeactivate, DialogService } from 'src/app/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import { selectProductsData } from './../../../core/@ngrx';
import * as ProductsActions from './../../../core/@ngrx/products/products.actions';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  keys: string[];
  categories: typeof Category = Category;
  product: Product;
  addForm: FormGroup;

  private unsubscribe: Subject<void> = new Subject();

  get sizes() {
    return this.addForm.get('sizes') as FormArray;
  }

  get quantity() {
    return this.addForm.get('quantity') as FormArray;
  }

  constructor(
    private dialogService: DialogService,
    private fb: FormBuilder,
    private store: Store
  ) {
    this.keys = Object.keys(this.categories).filter(k => !isNaN(Number(k)));
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onAddSize() {
    this.sizes.push(this.fb.control('', [Validators.required]));
    this.quantity.push(this.fb.control('', [Validators.required]));
  }

  onSubmit() {
    this.store.dispatch(ProductsActions.getProducts());

    const observer: any = {
      next: (products: Product[]) => {
        const productsCopy = [...products];

        this.product = {
          id: +productsCopy[products.length - 1].id + 1,
          ...this.addForm.value,
          isAvailable: this.quantity.value.some(value => value > 0)
        };
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
        select(selectProductsData),
        takeUntil(this.unsubscribe)
      )
      .subscribe(observer);

    this.store.dispatch(ProductsActions.addProduct({ product: this.product }));
  }

  canDeactivate():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
    if (this.product) {
      return true;
    }

    for (const i in this.addForm.controls) {
      if (this.addForm.controls[i].touched) {
        return this.dialogService.confirm('Discard changes?');
      }
    }
    return true;
  }

  private buildForm() {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      sizes: this.fb.array([new FormControl('', Validators.required)]),
      quantity: this.fb.array([new FormControl('', Validators.required)]),
      color: ['', Validators.required],
      category: [Category.Tennis, Validators.required],
      photo: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
}
