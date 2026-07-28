import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlTrialBalanceComponent } from './gl-trial-balance.component';

describe('GlTrialBalanceComponent', () => {
  let component: GlTrialBalanceComponent;
  let fixture: ComponentFixture<GlTrialBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlTrialBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlTrialBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
