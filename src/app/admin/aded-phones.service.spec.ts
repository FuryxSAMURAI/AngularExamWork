import { TestBed } from '@angular/core/testing';

import { AdedPhonesService } from './aded-phones.service';

describe('AdedPhonesService', () => {
  let service: AdedPhonesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdedPhonesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
