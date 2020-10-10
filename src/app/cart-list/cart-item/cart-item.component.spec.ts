import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CartItem } from 'src/app/shared';

import { CartItemComponent } from './cart-item.component';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  const expectedItem = {
    id: '1',
    photo: null,
    name: 'item1',
    size: 36,
    quantity: 1,
    price: 100
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CartItemComponent ]
    });

    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    component.product = expectedItem;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should display item name', () => {
    de = fixture.debugElement.query(By.css('.cart-tbl-row-name'));
    el = de.nativeElement;

    fixture.detectChanges();
    expect(el.textContent).toEqual(expectedItem.name);
  });

  it('should display item size', () => {
    de = fixture.debugElement.query(By.css('.cart-tbl-row-size'));
    el = de.nativeElement;

    fixture.detectChanges();
    expect(el.textContent).toEqual(`${expectedItem.size}`);
  });

  it('should display item quantity', () => {
    de = fixture.debugElement.query(By.css('.cart-tbl-row-qty'));
    el = de.nativeElement;

    fixture.detectChanges();
    expect(el.textContent).toContain(`${expectedItem.quantity}`);
  });

  it('should display items total summ', () => {
    de = fixture.debugElement.query(By.css('.cart-tbl-row-summ'));
    el = de.nativeElement;

    fixture.detectChanges();
    expect(el.textContent).toContain(`${expectedItem.quantity * expectedItem.price}`);
  });

  it('should raise remove event when clicked', () => {
    let selectedItem: CartItem;
    de = fixture.debugElement.query(By.css('.remove-button'));

    fixture.detectChanges();
    component.remove.subscribe((item: CartItem) => (selectedItem = item));
    de.triggerEventHandler('click', null);
    expect(selectedItem).toBe(expectedItem);
  });

  it('should raise minus quantity event when clicked', () => {
    let selectedItem: CartItem;
    de = fixture.debugElement.query(By.css('.change-quantity'));

    fixture.detectChanges();
    component.minus.subscribe((item: CartItem) => (selectedItem = item));
    de.triggerEventHandler('click', null);
    expect(selectedItem).toBe(expectedItem);
  });

  it('should raise plus quantity event when clicked', () => {
    let selectedItem: CartItem;
    de = fixture.debugElement.queryAll(By.css('.change-quantity'))[1];

    fixture.detectChanges();
    component.plus.subscribe((item: CartItem) => (selectedItem = item));
    de.triggerEventHandler('click', null);
    expect(selectedItem).toBe(expectedItem);
  });
});
