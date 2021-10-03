import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalConsumptionComponent } from './internal-consumption.component';

describe('InternalConsumptionComponent', () => {
  let component: InternalConsumptionComponent;
  let fixture: ComponentFixture<InternalConsumptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalConsumptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
