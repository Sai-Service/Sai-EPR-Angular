import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionMasterComponent } from './division-master.component';

describe('DivisionMasterComponent', () => {
  let component: DivisionMasterComponent;
  let fixture: ComponentFixture<DivisionMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisionMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
