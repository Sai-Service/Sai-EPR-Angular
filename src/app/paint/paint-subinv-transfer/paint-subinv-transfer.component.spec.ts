import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintSubinvTransferComponent } from './paint-subinv-transfer.component';

describe('PaintSubinvTransferComponent', () => {
  let component: PaintSubinvTransferComponent;
  let fixture: ComponentFixture<PaintSubinvTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintSubinvTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintSubinvTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
