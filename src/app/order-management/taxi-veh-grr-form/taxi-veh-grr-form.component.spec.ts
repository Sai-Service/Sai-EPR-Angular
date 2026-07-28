import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxiVehGrrFormComponent } from './taxi-veh-grr-form.component';

describe('TaxiVehGrrFormComponent', () => {
  let component: TaxiVehGrrFormComponent;
  let fixture: ComponentFixture<TaxiVehGrrFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxiVehGrrFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxiVehGrrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
