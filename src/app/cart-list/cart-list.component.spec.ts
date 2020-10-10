import { Component, DebugElement } from '@angular/core';
import { inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterStub } from '../core/testing-helpers';
import { OrderByPipe } from '../shared/pipes/order-by.pipe';
import { CartItemComponent } from './cart-item';

import { CartListComponent } from './cart-list.component';
import { CartService } from './cart.service';

@Component({ selector: 'app-main-button', template: '' })
class MainButtonStubComponent {}

@Component({ selector: 'app-back-button', template: '' })
class BackButtonStubComponent {}

describe('CartListComponent', () => {
  let component: CartListComponent;
  let fixture: ComponentFixture<CartListComponent>;
  let productEl: DebugElement;
  let cartService: CartService;
  let de: DebugElement;
  let el: HTMLElement;
  const mockValue = {
    basketItems: [{
      id: '1',
      photo: null,
      name: 'item1',
      price: 100,
      size: 36,
      quantity: 1
    }]
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        CartListComponent,
        CartItemComponent,
        MainButtonStubComponent,
        BackButtonStubComponent,
        OrderByPipe
      ],
      providers: [
        { provide: CartService, useClass: CartService },
        { provide: Router, useClass: RouterStub }
      ]
    });

    fixture = TestBed.createComponent(CartListComponent);
    component = fixture.componentInstance;
    cartService = fixture.debugElement.injector.get(CartService);
    cartService.basketItems = mockValue.basketItems;
    fixture.detectChanges();
  });

  it('should tell ROUTER to navigate when make order is clicked', inject(
    [Router],
    (router: Router) => {
      const navigateByUrlSpy = spyOn(router, 'navigate');
      fixture.detectChanges();
      productEl = fixture.debugElement.queryAll(By.css('.cart-btn'))[1];
      productEl.triggerEventHandler('click', null);
      const navArgs = navigateByUrlSpy.calls.first().args[0];

      expect(navArgs).toEqual(['./process-order'], 'should nav to Process Order page');
      }
    )
  );

  it('should show correct total quantity', () => {
    de = fixture.debugElement.query(By.css('.cart-total-qty'));
    el = de.nativeElement;

    fixture.detectChanges();
    expect(el.textContent).toEqual(`${mockValue.basketItems[0].quantity}`);
  });

  it('should show correct total summ', () => {
    de = fixture.debugElement.query(By.css('.cart-total-summ'));
    el = de.nativeElement;

    fixture.detectChanges();
    expect(el.textContent).toContain(`${mockValue.basketItems[0].quantity * mockValue.basketItems[0].price}`);
  });

  it('should remove all items', () => {
    de = fixture.debugElement.query(By.css('.cart-btn'));

    fixture.detectChanges();
    de.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.cartProducts).toEqual([]);
  });
});
