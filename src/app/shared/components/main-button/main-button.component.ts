import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.css']
})
export class MainButtonComponent {
  @Input() title = 'Start shopping';

  constructor(private router: Router) { }

  @HostListener('click', ['$event.target'])
  onClick() {
    this.router.navigate(['/home']);
  }
}
