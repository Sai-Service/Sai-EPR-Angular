import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingShipmentListComponent } from './pending-shipment-list.component';

describe('PendingShipmentListComponent', () => {
  let component: PendingShipmentListComponent;
  let fixture: ComponentFixture<PendingShipmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingShipmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingShipmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
