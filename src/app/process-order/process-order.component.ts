import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UrlTree } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import { selectProductsData } from '../core/@ngrx/products/products.selectors';
import * as ProductsActions from '../core/@ngrx/products/products.actions';

import { CustomValidators, DialogService } from '../core';
import { OrdersService } from '../orders';
import { CartItem, Product } from '../shared';
import { ValidFields } from './models/valid-fields.model';
import { CartService } from '../cart-list';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.css']
})
export class ProcessOrderComponent implements OnInit, OnDestroy {
  keys: string[];
  processOrderForm: FormGroup;
  submited = false;
  validationMessage: ValidFields = {
    name: '',
    email: ''
  };
  cartProducts: Array<CartItem>;
  totalSumm: number;
  totalQty: number;
  stockProducts: Product[] = [];

  private unsubscribe: Subject<void> = new Subject();
  private validationMessagesMap = {
    name: {
      required: 'Please enter your name.',
      minlength: 'Name must be longer that 3 symbols'
    },
    email: {
      required: 'Please enter your email.',
      emailMatch: 'Not correct email'
    }
  };

  get name(): AbstractControl {
    return this.processOrderForm.get('name');
  }

  get email(): AbstractControl {
    return this.processOrderForm.get('email');
  }

  get phones() {
    return this.processOrderForm.get('phone') as FormArray;
  }

  get pickup(): AbstractControl {
    return this.processOrderForm.get('pickup').value;
  }

  constructor(
    private dialogService: DialogService,
    private fb: FormBuilder,
    private cartService: CartService,
    private ordersService: OrdersService,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.cartProducts = this.cartService.getCartList();
    this.totalSumm = this.cartService.totalSumm;
    this.totalQty =  this.cartService.totalQuantity;
    this.buildForm();
    this.watchValueChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onAddPhone(): void {
    this.phones.push(this.fb.control('', [Validators.required]));
  }

  onRemovePhone(index: number): void {
    this.phones.removeAt(index);
  }

  onBlur(event: FocusEvent) {
    if ((event.target as Element).id === 'name') {
      this.setValidationMessage(this.name, 'name');
    } else if ((event.target as Element).id === 'email') {
      this.setValidationMessage(this.email, 'email');
    }
  }

  onSubmit() {
    this.submited = true;
    this.ordersService.setOrder(this.cartProducts, this.totalSumm, this.totalQty);
    this.updateProductsAndNavigate(this.cartProducts);
  }

  canDeactivate():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
    if (this.submited) {
      return true;
    }

    for (const i in this.processOrderForm.controls) {
      if (this.processOrderForm.controls[i].touched) {
        return this.dialogService.confirm('Discard changes?');
      }
    }
    return true;
  }

  private buildForm() {
    this.processOrderForm = this.fb.group({
      name: ['', [Validators.required, CustomValidators.minLengthValidator(3)]],
      surname: [''],
      email: ['', {validators: [Validators.required, Validators.email], updateOn: 'blur'}],
      phone: this.fb.array([new FormControl('')]),
      pickup: [''],
      adress: ['']
    });
  }

  private watchValueChanges() {
    this.name.valueChanges
        .pipe(takeUntil(this.unsubscribe))
        .subscribe();
  }

  private setValidationMessage(c: AbstractControl, controlName: string) {
    for (const field in this.validationMessage) {
      if (!this[field].errors) {
        this.validationMessage[field] = '';
      }
    }

    if ((c.touched || c.dirty) && c.errors) {
      this.validationMessage[controlName] = Object.keys(c.errors)
        .map(key => this.validationMessagesMap[controlName][key])
        .join(' ');
    }
  }

  private updateProductsAndNavigate(cartItems: CartItem[]) {
    const observer: any = {
      next: (products: Product[]) => {
        this.stockProducts = [...products];
        cartItems.forEach(item => {
          this.stockProducts
          .filter(product => +product.id === +item.id)
          .map(product => {
            const productQuantity = [...product.quantity];
            productQuantity[product.sizes.indexOf(item.size)] -= item.quantity;
            return {
              ...product,
              quantity: productQuantity
            };
          })
          .map(product => this.store.dispatch(ProductsActions.updateProduct({ product, url: '/orders' })));
        });
        this.cartService.removeAllProducts();
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
  }
}
