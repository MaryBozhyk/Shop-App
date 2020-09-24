import { Component, OnDestroy } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnDestroy() {
    this.unsubscribe.complete();
  }

  onLogin() {
    const observer = {
      next: () => {
        if (this.authService.isLoggedIn) {
          const redirect = this.authService.redirectUrl
            ? this.authService.redirectUrl
            : '/admin';

          const navigationExtras: NavigationExtras = {
            queryParamsHandling: 'preserve',
            preserveFragment: true
          };
          this.router.navigate([redirect], navigationExtras);
        }
      },
      error: (err: any) => console.error(err)
    };
    this.authService
      .login()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(observer);
  }

  onLogout() {
    this.authService.logout();
  }
}
