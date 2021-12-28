import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmcSchemeMasterComponent } from './amc-scheme-master.component';

describe('AmcSchemeMasterComponent', () => {
  let component: AmcSchemeMasterComponent;
  let fixture: ComponentFixture<AmcSchemeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmcSchemeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmcSchemeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
