import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintAvgCostComponent } from './paint-avg-cost.component';

describe('PaintAvgCostComponent', () => {
  let component: PaintAvgCostComponent;
  let fixture: ComponentFixture<PaintAvgCostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintAvgCostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintAvgCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
