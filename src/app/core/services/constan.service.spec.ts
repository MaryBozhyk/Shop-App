import { TestBed } from '@angular/core/testing';

import { ConstanService } from './constan.service';

describe('ConstanService', () => {
  let service: ConstanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
