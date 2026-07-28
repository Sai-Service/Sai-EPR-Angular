import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintPanelMasterComponent } from './paint-panel-master.component';

describe('PaintPanelMasterComponent', () => {
  let component: PaintPanelMasterComponent;
  let fixture: ComponentFixture<PaintPanelMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintPanelMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintPanelMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
