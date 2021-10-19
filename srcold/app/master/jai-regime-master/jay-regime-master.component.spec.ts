import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JayRegimeMasterComponent } from './jay-regime-master.component';

describe('JayRegimeMasterComponent', () => {
  let component: JayRegimeMasterComponent;
  let fixture: ComponentFixture<JayRegimeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JayRegimeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JayRegimeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
