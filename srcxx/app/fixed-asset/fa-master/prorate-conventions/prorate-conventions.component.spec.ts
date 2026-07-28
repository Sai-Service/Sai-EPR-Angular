import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProrateConventionsComponent } from './prorate-conventions.component';

describe('ProrateConventionsComponent', () => {
  let component: ProrateConventionsComponent;
  let fixture: ComponentFixture<ProrateConventionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProrateConventionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProrateConventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
