import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetrolPumpReportComponent } from './petrol-pump-report.component';

describe('PetrolPumpReportComponent', () => {
  let component: PetrolPumpReportComponent;
  let fixture: ComponentFixture<PetrolPumpReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetrolPumpReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetrolPumpReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
