import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpmloyeeMasterComponent } from './epmloyee-master.component';

describe('EpmloyeeMasterComponent', () => {
   let component: EpmloyeeMasterComponent;
  let fixture: ComponentFixture<EpmloyeeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpmloyeeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpmloyeeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
