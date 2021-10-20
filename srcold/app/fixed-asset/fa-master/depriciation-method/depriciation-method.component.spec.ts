import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepriciationMethodComponent } from './depriciation-method.component';

describe('DepriciationMethodComponent', () => {
  let component: DepriciationMethodComponent;
  let fixture: ComponentFixture<DepriciationMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepriciationMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepriciationMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
