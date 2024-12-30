import { TestBed } from '@angular/core/testing';

import { CareRegimenService } from './care-regimen.service';

describe('CareRegimenService', () => {
  let service: CareRegimenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareRegimenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
