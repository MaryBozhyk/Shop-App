import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from '../shared';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Array<Product>;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  trackByName(index: number, product: Product): string { 
    return product.name; 
  }

}
