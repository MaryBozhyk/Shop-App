import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, UrlTree } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ProductService } from 'src/app/products/services/product.service';
import { Product } from 'src/app/shared';
import { DialogService, CanComponentDeactivate } from 'src/app/core';

import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit, CanComponentDeactivate {
  product: Product;
  itemForm: FormGroup;
  productCopy: Product;

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
    private productService: ProductService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    const observer = {
      next: (product: Product) => (this.product = { ...product }),
      error: (err: any) => console.log(err)
    };

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return this.productService.getProduct(params.get('itemID'));
        }))
      .subscribe(observer);

    this.buildForm();

    this.product.sizes.forEach(size => {
      this.sizes.push(new FormControl(size, Validators.required));
    });

    this.product.quantity.forEach(quantity => {
      this.quantity.push(new FormControl(quantity, Validators.required));
    });

    this.productCopy = {...this.product};
  }

  onSubmit() {
    this.getFormValues();
    this.productService.updateProduct(this.productCopy);
    this.router.navigate(['/admin'], { queryParams: { id: this.product.id } });
    this.product = {...this.productCopy};
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
      name: [this.product.name, Validators.required],
      price: [this.product.price, Validators.required],
      sizes: this.fb.array([]),
      quantity: this.fb.array([])
    });
  }

  private getFormValues() {
    this.productCopy.name = this.name.value;
    this.productCopy.price = this.price.value;
    this.productCopy.sizes = this.sizes.value;
    this.productCopy.quantity = this.quantity.value;
  }
}
