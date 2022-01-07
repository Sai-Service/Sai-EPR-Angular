import { TestBed } from '@angular/core/testing';

import { DeActivateGuard } from './de-activate.guard';

describe('DeActivateGuard', () => {
  let guard: DeActivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DeActivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
