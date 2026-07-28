import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaCalenderComponent } from './fa-calender.component';

describe('FaCalenderComponent', () => {
  let component: FaCalenderComponent;
  let fixture: ComponentFixture<FaCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaCalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
