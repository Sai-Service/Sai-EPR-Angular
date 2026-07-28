import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterStateComponent } from './inter-state.component';

describe('InterStateComponent', () => {
  let component: InterStateComponent;
  let fixture: ComponentFixture<InterStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
