import {Injectable} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpParams, HttpEventType } from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clonedRequest;
    if (req.url.includes('product')) {
      clonedRequest = req.clone({
        params: new HttpParams()
          .set('timing_interceptor', Date.now().toString())
      });
    } else {
      clonedRequest = req;
    }

    return next.handle(clonedRequest).pipe(
        filter((event: HttpEvent<any>) => event.type === HttpEventType.Response),
        map((event: HttpResponse<any>) => {
          if (event.url.includes('product')) {
            const requestTime = Date.now() - clonedRequest.params.get('timing_interceptor');
            console.log(`The request took ${requestTime} ms.`);
          }
          return event;
        })
    );
  }
}
