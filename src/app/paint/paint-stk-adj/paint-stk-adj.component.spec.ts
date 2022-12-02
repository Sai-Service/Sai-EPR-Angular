import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintStkAdjComponent } from './paint-stk-adj.component';

describe('PaintStkAdjComponent', () => {
  let component: PaintStkAdjComponent;
  let fixture: ComponentFixture<PaintStkAdjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintStkAdjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintStkAdjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
