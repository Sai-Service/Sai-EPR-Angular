import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxThresholdSetupComponent } from './tax-threshold-setup.component';

describe('TaxThresholdSetupComponent', () => {
  let component: TaxThresholdSetupComponent;
  let fixture: ComponentFixture<TaxThresholdSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxThresholdSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxThresholdSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
