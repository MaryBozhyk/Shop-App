import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, UrlTree } from '@angular/router';

import { Category, Product } from 'src/app/shared';
import { HttpProductService } from 'src/app/products';
import { CanComponentDeactivate, DialogService } from 'src/app/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, CanComponentDeactivate {
  keys: string[];
  categories: typeof Category = Category;
  product: Product;
  addForm: FormGroup;

  get sizes() {
    return this.addForm.get('sizes') as FormArray;
  }

  get quantity() {
    return this.addForm.get('quantity') as FormArray;
  }

  constructor(
    private httpProductService: HttpProductService,
    private dialogService: DialogService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.keys = Object.keys(this.categories).filter(k => !isNaN(Number(k)));
  }

  ngOnInit(): void {
    this.buildForm();
  }

  onAddSize() {
    this.sizes.push(this.fb.control('', [Validators.required]));
    this.quantity.push(this.fb.control('', [Validators.required]));
  }

  onSubmit() {
    this.httpProductService.getAllProducts()
    .then(products => {
      this.product = {
        id: +products[products.length - 1].id + 1,
        ...this.addForm.value,
        isAvailable: this.quantity.value.some(value => value > 0)
      };
    })
    .then(() => this.httpProductService.addProduct(this.product))
    .then(() => this.router.navigate(['/admin'], { queryParams: { id: this.product.id }}))
    .catch(err => console.error(err));
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
