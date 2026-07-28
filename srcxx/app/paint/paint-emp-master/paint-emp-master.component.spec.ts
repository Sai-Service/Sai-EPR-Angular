import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintEmpMasterComponent } from './paint-emp-master.component';

describe('PaintEmpMasterComponent', () => {
  let component: PaintEmpMasterComponent;
  let fixture: ComponentFixture<PaintEmpMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintEmpMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintEmpMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
