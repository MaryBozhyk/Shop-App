import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor() { }

  @HostBinding('style.backgroundColor') background: string;

  @HostListener('mouseover')
  onMouseOver() {
    this.background = '#ededee';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.background = '';
  }

}
