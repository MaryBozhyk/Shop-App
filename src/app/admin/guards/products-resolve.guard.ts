import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError, take, delay } from 'rxjs/operators';

import { Product } from 'src/app/shared';
import { HttpProductObservableService } from 'src/app/products';

@Injectable({
  providedIn: 'any'
})
export class ProductResolveGuard implements Resolve<Product> {
  constructor(
    private httpProductObservableService: HttpProductObservableService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Product | null> {
    console.log('ProductResolve Guard is called');

    const id = +route.paramMap.get('itemID');

    return this.httpProductObservableService.getProduct(id).pipe(
      delay(2000),
      map((item: Product) => {
        if (item) {
          return item;
        } else {
          this.router.navigate(['/admin']);
          return null;
        }
      }),
      take(1),
      catchError(() => {
        this.router.navigate(['/admin']);
        return of(null);
      })
    );
  }
}
