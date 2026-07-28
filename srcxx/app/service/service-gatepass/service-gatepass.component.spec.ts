import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceGatepassComponent } from './service-gatepass.component';

describe('ServiceGatepassComponent', () => {
  let component: ServiceGatepassComponent;
  let fixture: ComponentFixture<ServiceGatepassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceGatepassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceGatepassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
