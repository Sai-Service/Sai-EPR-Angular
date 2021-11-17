import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubinventoryMasterComponent } from './subinventory-master.component';

describe('SubinventoryMasterComponent', () => {
  let component: SubinventoryMasterComponent;
  let fixture: ComponentFixture<SubinventoryMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubinventoryMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubinventoryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
