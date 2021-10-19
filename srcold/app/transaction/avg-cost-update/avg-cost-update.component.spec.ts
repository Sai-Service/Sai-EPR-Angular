import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgCostUpdateComponent } from './avg-cost-update.component';

describe('AvgCostUpdateComponent', () => {
  let component: AvgCostUpdateComponent;
  let fixture: ComponentFixture<AvgCostUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvgCostUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvgCostUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
