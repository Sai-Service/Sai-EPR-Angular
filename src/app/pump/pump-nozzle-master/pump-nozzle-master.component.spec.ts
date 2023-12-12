import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpNozzleMasterComponent } from './pump-nozzle-master.component';

describe('PumpNozzleMasterComponent', () => {
  let component: PumpNozzleMasterComponent;
  let fixture: ComponentFixture<PumpNozzleMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpNozzleMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpNozzleMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
