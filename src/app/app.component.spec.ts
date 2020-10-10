import { DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CartService } from './cart-list';
import { RouterLinkStubDirective, RouterOutletStubComponent } from './core/testing-helpers';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let links: RouterLinkStubDirective[];
  let linkDes: DebugElement[];
  let de: DebugElement;
  let el: HTMLElement;

  const cartServiceStub = {
    basketItems: [{
      id: '1',
      photo: null,
      name: 'item1',
      price: 100,
      size: 36,
      quantity: 1
    }]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterLinkStubDirective,
        RouterOutletStubComponent
      ],
      providers: [{ provide: CartService, useValue: cartServiceStub }]
    });

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    linkDes = fixture.debugElement.queryAll(
      By.directive(RouterLinkStubDirective)
    );

    links = linkDes.map(
      d => d.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective
    );
  });

  it('can get RouterLinks from template', () => {
    expect(links.length).toBe(7, 'should have 7 links');
    expect(links[0].linkParams).toBe('./about', '1st link should go to About');
    expect(links[1].linkParams).toBe('./home', '2nd link should go to Home');
    expect(links[2].linkParams).toBe('./admin', '2nd link should go to Admin');
    expect(links[3].linkParams).toBe('./cart', '2nd link should go to Cart');
    expect(links[4].linkParams).toBe('./orders', '2nd link should go to Orders');
    expect(links[5].linkParams).toBe('./cart', '2nd link should go to Cart');
    expect(links[6].linkParams).toBe('./login', '2nd link should go to Login');
  });

  it('can click About link in template', () => {
    const aboutLinkDe = linkDes[0];
    const aboutLink = links[0];

    expect(aboutLink.navigatedTo).toBeNull('link should not have navigated yet');

    aboutLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(aboutLink.navigatedTo).toBe('./about');
  });

  it('should show title', () => {
    fixture.componentInstance.ngAfterViewInit();
    de = fixture.debugElement.query(By.css('.main-header'));
    el = de.nativeElement;
    expect(el.textContent).toEqual('Find your best sport shoes');
  });

  it('should show basket items length', () => {
    de = fixture.debugElement.query(By.css('.basket-items'));
    el = de.nativeElement;
    expect(el.textContent).toEqual('1');
  });
});
