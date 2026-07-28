import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortLandedGrrComponent } from './short-landed-grr.component';

describe('ShortLandedGrrComponent', () => {
  let component: ShortLandedGrrComponent;
  let fixture: ComponentFixture<ShortLandedGrrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortLandedGrrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortLandedGrrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
