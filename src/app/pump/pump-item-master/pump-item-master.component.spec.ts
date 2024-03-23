import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpItemMasterComponent } from './pump-item-master.component';

describe('PumpItemMasterComponent', () => {
  let component: PumpItemMasterComponent;
  let fixture: ComponentFixture<PumpItemMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpItemMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpItemMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
