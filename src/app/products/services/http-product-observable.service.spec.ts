import { TestBed } from '@angular/core/testing';

import { HttpProductObservableService } from './http-product-observable.service';

describe('HttpProductObservableService', () => {
  let service: HttpProductObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpProductObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
