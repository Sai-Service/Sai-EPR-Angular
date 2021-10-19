import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HsnSacMasterComponent } from './hsn-sac-master.component';

describe('HsnSacMasterComponent', () => {
  let component: HsnSacMasterComponent;
  let fixture: ComponentFixture<HsnSacMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HsnSacMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HsnSacMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
