import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appChangeColor]'
})
export class ChangeColorDirective {
  @Input('appChangeColor') color: string;

  private clickCounter = 0;

  constructor(private el: ElementRef, private render: Renderer2) {}

  @HostListener('click')
  onClick() {
    this.clickCounter++;
    if (this.clickCounter % 2) {
      this.highlight(this.color || 'red');
    } else {
      this.highlight('');
    }
  }

  private highlight(color: string) {
    this.render.setStyle(this.el.nativeElement, 'backgroundColor', color);
  }
}
