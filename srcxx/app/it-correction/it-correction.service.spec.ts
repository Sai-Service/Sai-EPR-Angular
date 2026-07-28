import { TestBed } from '@angular/core/testing';

import { ItCorrectionService } from './it-correction.service';

describe('ItCorrectionService', () => {
  let service: ItCorrectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItCorrectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
