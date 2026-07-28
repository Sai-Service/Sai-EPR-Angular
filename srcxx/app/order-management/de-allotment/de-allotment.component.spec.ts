import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeAllotmentComponent } from './de-allotment.component';

describe('DeAllotmentComponent', () => {
  let component: DeAllotmentComponent;
  let fixture: ComponentFixture<DeAllotmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeAllotmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeAllotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
