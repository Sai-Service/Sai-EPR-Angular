import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpDipMasterComponent } from './pump-dip-master.component';

describe('PumpDipMasterComponent', () => {
  let component: PumpDipMasterComponent;
  let fixture: ComponentFixture<PumpDipMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpDipMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpDipMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
