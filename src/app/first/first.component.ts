import { Component } from '@angular/core';
import { Category, Product } from '../shared';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})

export class FirstComponent {
  name: string = 'NIKE REACT INFINITY RUN FLYKNIT WOMEN\'S RUNNING SHOES - FA20';
  description: string = "The Nike React Infinity Run Flyknit will keep you running. Created for all levels of runner, this shoe delivers on the promise of innovation with more foam and improved upper details for a secure and cushioned feel. Lace-up and feel the potential as you hit the road. The React Infinity moves away from the traditional norm of neutral and stability running shoes to bring you a hybrid that is ideal for all runners. Designed with both an abundance of cushioning and elements of support the Infinity is suitable for neutral runners and overpronators. Defined under its own category the React Infinity is for ALL runners.";
  price: number = 170.74;
  category: Category = Category.Running;
  isAvailable: boolean = true;
  sizes: Array<number> = [36, 37, 38, 40];
  color: string = 'Black';
  photo: string = './assets/NIK16394_1000_1.jpg';
  item: Partial<Product> = {
    photo: this.photo,
    name: this.name,
    price: this.price
  }

  constructor() { }
}
