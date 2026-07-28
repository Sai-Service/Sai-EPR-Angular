import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordWindowComponent } from './forget-password-window.component';

describe('ForgetPasswordWindowComponent', () => {
  let component: ForgetPasswordWindowComponent;
  let fixture: ComponentFixture<ForgetPasswordWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetPasswordWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPasswordWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
