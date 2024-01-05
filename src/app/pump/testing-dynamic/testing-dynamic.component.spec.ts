import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingDynamicComponent } from './testing-dynamic.component';

describe('TestingDynamicComponent', () => {
  let component: TestingDynamicComponent;
  let fixture: ComponentFixture<TestingDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestingDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
