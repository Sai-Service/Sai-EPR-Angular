import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintMixingMasterComponent } from './paint-mixing-master.component';

describe('PaintMixingMasterComponent', () => {
  let component: PaintMixingMasterComponent;
  let fixture: ComponentFixture<PaintMixingMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintMixingMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintMixingMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
