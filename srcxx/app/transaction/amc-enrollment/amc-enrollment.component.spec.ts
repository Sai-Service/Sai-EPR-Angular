import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmcEnrollmentComponent } from './amc-enrollment.component';

describe('AmcEnrollmentComponent', () => {
  let component: AmcEnrollmentComponent;
  let fixture: ComponentFixture<AmcEnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmcEnrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmcEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
