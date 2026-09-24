import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllManualGatePassComponent } from './all-manual-gate-pass.component';

describe('AllManualGatePassComponent', () => {
  let component: AllManualGatePassComponent;
  let fixture: ComponentFixture<AllManualGatePassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllManualGatePassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllManualGatePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
