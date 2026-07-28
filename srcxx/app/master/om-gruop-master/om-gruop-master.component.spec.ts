import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OmGruopMasterComponent } from './om-gruop-master.component';

describe('OmGruopMasterComponent', () => {
  let component: OmGruopMasterComponent;
  let fixture: ComponentFixture<OmGruopMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmGruopMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmGruopMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
