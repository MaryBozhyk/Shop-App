import { Injectable } from '@angular/core';

import { AppSettingsService } from './app-settings.service';

import { Observable, of } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;

  constructor(
    private appSettingsService: AppSettingsService
  ){}

  login(): Observable<any> {
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = val),
      switchMap(() => this.appSettingsService.uploadConfigInfo()),
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
