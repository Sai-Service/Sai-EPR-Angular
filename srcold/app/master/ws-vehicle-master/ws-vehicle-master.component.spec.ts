import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WsVehicleMasterComponent } from './ws-vehicle-master.component';

describe('WsVehicleMasterComponent', () => {
  let component: WsVehicleMasterComponent;
  let fixture: ComponentFixture<WsVehicleMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WsVehicleMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WsVehicleMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
