import { TestBed } from '@angular/core/testing';

import { InvestmentServicesService } from './investment-services.service';

describe('InvestmentServicesService', () => {
  let service: InvestmentServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
