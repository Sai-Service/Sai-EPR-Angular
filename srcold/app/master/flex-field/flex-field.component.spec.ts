import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexFieldComponent } from './flex-field.component';

describe('FlexFieldComponent', () => {
  let component: FlexFieldComponent;
  let fixture: ComponentFixture<FlexFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
