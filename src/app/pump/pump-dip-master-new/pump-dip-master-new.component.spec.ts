import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpDipMasterNewComponent } from './pump-dip-master-new.component';

describe('PumpDipMasterNewComponent', () => {
  let component: PumpDipMasterNewComponent;
  let fixture: ComponentFixture<PumpDipMasterNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpDipMasterNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpDipMasterNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
