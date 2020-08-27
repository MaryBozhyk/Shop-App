import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CartService } from './cart-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('appTitle') title: ElementRef;
  today: number = Date.now();

  constructor(public cartServise: CartService) {}

  ngAfterViewInit() {
    this.title.nativeElement.innerHTML = 'Find your best sport shoes';
  }
}
