import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaRetirementComponent } from './fa-retirement.component';

describe('FaRetirementComponent', () => {
  let component: FaRetirementComponent;
  let fixture: ComponentFixture<FaRetirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaRetirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaRetirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
