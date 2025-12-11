import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparesOrderListComponent } from './spares-order-list.component';

describe('SparesOrderListComponent', () => {
  let component: SparesOrderListComponent;
  let fixture: ComponentFixture<SparesOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparesOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparesOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
