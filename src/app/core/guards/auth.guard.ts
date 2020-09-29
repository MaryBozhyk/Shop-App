import { Injectable } from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanLoad,
    Route,
    NavigationExtras,
    UrlTree,
    UrlSegment
} from '@angular/router';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as RouterActions from './../@ngrx/router/router.actions';

import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private authService: AuthService,
    private store: Store
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const { url } = state;
    return this.checkLogin(url);
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
    const { url } = state;
    return this.checkLogin(url);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const url = `/${route.path}`;
    return this.checkLogin(url) as boolean;
  }

  private checkLogin(url: string): boolean | UrlTree {
    if (this.authService.isLoggedIn) { return true; }

    this.authService.redirectUrl = url;

    const sessionId = 123456789;

    const navigationExtras: NavigationExtras = {
      queryParams: { sessionId },
      fragment: 'anchor'
    };

    this.store.dispatch(RouterActions.go({
      path: ['/login'],
      extras: navigationExtras
    }));

    return false;
  }
}
