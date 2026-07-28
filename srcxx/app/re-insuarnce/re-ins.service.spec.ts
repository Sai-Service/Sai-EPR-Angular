import { TestBed } from '@angular/core/testing';

import { ReInsService } from './re-ins.service';

describe('ReInsService', () => {
  let service: ReInsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReInsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
