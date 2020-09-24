import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, UrlTree } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { HttpProductObservableService, HttpProductService } from 'src/app/products';
import { Product } from 'src/app/shared';
import { DialogService, CanComponentDeactivate } from 'src/app/core';

import { switchMap, takeUntil } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  product: Product;
  itemForm: FormGroup;
  productCopy: Product;

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
    private httpProductObservableService: HttpProductObservableService,
    private httpProductService: HttpProductService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    const observer = {
      next: (product: Product) => {
        this.product = { ...product };
        this.buildForm();
        this.setFormValues();
        this.productCopy = {...this.product};
      },
      error: (err: any) => console.error(err)
    };

    this.route.paramMap
      .pipe(
        takeUntil(this.unsubscribe),
        switchMap((params: ParamMap) => {
          return params.get('itemID')
            ? this.httpProductObservableService.getProduct(+params.get('itemID'))
            : of(null);
        })
      ).subscribe(observer);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onSubmit() {
    const observer = {
      next: () => {
        this.router.navigate(['/admin'], { queryParams: { id: this.product.id } });
        this.product = {...this.productCopy};
      },
      error: (err: any) => console.error(err)
    };

    this.getFormValues();
    this.httpProductObservableService.updateProduct(this.productCopy)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(observer);
  }

  onDeleteItem() {
    this.httpProductService
      .deleteProduct(this.product)
      .then(() => (this.router.navigate(['/admin'])))
      .catch(err => console.error(err));
  }

  onGoBack() {
    this.getFormValues();
    this.router.navigate(['/admin']);
  }

  canDeactivate():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
    const flags = Object.keys(this.product).map(key => {
      if (this.product[key] === this.productCopy[key]) {
        return true;
      }

      if (Array.isArray(this.product[key])) {
        for (let i = 0; i < this.product[key].length; i++) {
          if (this.product[key][i] !== this.productCopy[key][i]) {
            return false;
          }
        }
        return true;
      }
      return false;
    });

    if (flags.every(el => el)) {
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
    this.productCopy.name = this.name.value;
    this.productCopy.price = this.price.value;
    this.productCopy.sizes = this.sizes.value;
    this.productCopy.quantity = this.quantity.value;
  }
}
