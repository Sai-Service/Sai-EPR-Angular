import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EwschememasteruploadComponent } from './ewschememasterupload.component';

describe('EwschememasteruploadComponent', () => {
  let component: EwschememasteruploadComponent;
  let fixture: ComponentFixture<EwschememasteruploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EwschememasteruploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EwschememasteruploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
