import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveQtyClearComponent } from './reserve-qty-clear.component';

describe('ReserveQtyClearComponent', () => {
  let component: ReserveQtyClearComponent;
  let fixture: ComponentFixture<ReserveQtyClearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveQtyClearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveQtyClearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
