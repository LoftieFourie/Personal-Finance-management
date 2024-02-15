import { TestBed } from '@angular/core/testing';

import { CostServicesService } from './cost-services.service';

describe('CostServicesService', () => {
  let service: CostServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
