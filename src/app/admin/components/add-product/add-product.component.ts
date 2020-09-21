import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, UrlTree } from '@angular/router';

import { Category, Product } from 'src/app/shared';
import { ProductService } from 'src/app/products/services/product.service';
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
    private productService: ProductService,
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
    this.product = {
      id: this.productService.products.length.toString(),
      ...this.addForm.value,
      isAvailable: this.quantity.value.some(value => value > 0)
    };
    this.productService.addProduct(this.product);
    this.router.navigate(['/admin'], { queryParams: { id: this.product.id } });
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
