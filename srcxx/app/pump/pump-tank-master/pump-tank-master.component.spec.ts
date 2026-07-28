import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpTankMasterComponent } from './pump-tank-master.component';

describe('PumpTankMasterComponent', () => {
  let component: PumpTankMasterComponent;
  let fixture: ComponentFixture<PumpTankMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpTankMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpTankMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
