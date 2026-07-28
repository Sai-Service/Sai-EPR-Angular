import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkShopReturnComponent } from './work-shop-return.component';

describe('WorkShopReturnComponent', () => {
  let component: WorkShopReturnComponent;
  let fixture: ComponentFixture<WorkShopReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkShopReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkShopReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
