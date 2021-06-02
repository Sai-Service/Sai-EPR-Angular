import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnHandDetailsComponent } from './on-hand-details.component';

describe('OnHandDetailsComponent', () => {
  let component: OnHandDetailsComponent;
  let fixture: ComponentFixture<OnHandDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnHandDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnHandDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
