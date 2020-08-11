import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ChooseSize } from '../choose-size.model';

@Component({
  selector: 'app-size-button',
  templateUrl: './size-button.component.html',
  styleUrls: ['./size-button.component.css']
})
export class SizeButtonComponent {
  @Input() itemSize: number;
  @Output() chooseSize = new EventEmitter<ChooseSize>();

  isChosen = false;

  constructor() { }

  onSizeChoose() {
    this.isChosen = !this.isChosen;
    this.chooseSize.emit({size: this.itemSize, active: this.isChosen});
  }
}
