import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaCommanMasterComponent } from './fa-comman-master.component';

describe('FaCommanMasterComponent', () => {
  let component: FaCommanMasterComponent;
  let fixture: ComponentFixture<FaCommanMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaCommanMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaCommanMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
