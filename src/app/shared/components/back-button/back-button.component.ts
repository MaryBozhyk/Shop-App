import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent implements OnInit {

  constructor(private router: Router) { }

  @HostListener('click', ['$event.target'])
  onClick() {
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
  }

}
