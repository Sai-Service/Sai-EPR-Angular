import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OPMasterDtoComponent } from './opmaster-dto.component';

describe('OPMasterDtoComponent', () => {
  let component: OPMasterDtoComponent;
  let fixture: ComponentFixture<OPMasterDtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OPMasterDtoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OPMasterDtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
