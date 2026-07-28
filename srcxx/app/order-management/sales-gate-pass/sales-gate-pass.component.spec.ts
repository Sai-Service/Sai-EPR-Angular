import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesGatePassComponent } from './sales-gate-pass.component';

describe('SalesGatePassComponent', () => {
  let component: SalesGatePassComponent;
  let fixture: ComponentFixture<SalesGatePassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesGatePassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesGatePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
