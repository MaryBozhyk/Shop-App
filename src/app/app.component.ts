import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CartService } from './core/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('appTitle') title: ElementRef;

  constructor(public cartServise: CartService) {}

  ngAfterViewInit() {
    this.title.nativeElement.innerHTML = 'Find your best sport shoes';
  }
}
