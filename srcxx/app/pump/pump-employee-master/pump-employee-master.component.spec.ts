import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpEmployeeMasterComponent } from './pump-employee-master.component';

describe('PumpEmployeeMasterComponent', () => {
  let component: PumpEmployeeMasterComponent;
  let fixture: ComponentFixture<PumpEmployeeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpEmployeeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpEmployeeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
