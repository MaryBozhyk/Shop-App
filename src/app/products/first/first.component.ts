import { Component, ViewChildren, QueryList } from '@angular/core';

import { Category, Product } from '../../shared';
import { SizeButtonComponent } from '../size-button/size-button.component';
import { ChooseSize } from '../choose-size.model';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})

export class FirstComponent {
  @ViewChildren('sizeButton') sizeButtons: QueryList<SizeButtonComponent>;

  name = 'NIKE REACT INFINITY RUN FLYKNIT WOMEN\'S RUNNING SHOES - FA20';
  description = 'The Nike React Infinity Run Flyknit will keep you running. Created for all levels of runner, this shoe delivers on the promise of innovation with more foam and improved upper details for a secure and cushioned feel. Lace-up and feel the potential as you hit the road. The React Infinity moves away from the traditional norm of neutral and stability running shoes to bring you a hybrid that is ideal for all runners. Designed with both an abundance of cushioning and elements of support the Infinity is suitable for neutral runners and overpronators. Defined under its own category the React Infinity is for ALL runners.';
  price = 170.74;
  category: Category = Category.Running;
  isAvailable = true;
  quantity: Array<number> = [20, 25, 22, 15];
  sizes: Array<number> = [36, 37, 38, 40];
  color = 'Black';
  photo = './assets/NIK16394_1000_1.jpg';
  item: Partial<Product> = {
    photo: this.photo,
    name: this.name,
    price: this.price
  };
  showDetails = false;
  disableButton = true;
  itemSize: number;

  constructor() { }

  onChangeSize(item: ChooseSize) {
    this.disableButton = true;
    if (item.active) {
      this.sizeButtons.forEach(sizeButton => {
        if (sizeButton.isChosen && sizeButton.itemSize !== item.size) {
          sizeButton.isChosen = false;
        }
      });
      this.itemSize = item.size;
      this.disableButton = false;
    }
  }
}
