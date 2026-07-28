import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintReportsComponent } from './paint-reports.component';

describe('PaintReportsComponent', () => {
  let component: PaintReportsComponent;
  let fixture: ComponentFixture<PaintReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
