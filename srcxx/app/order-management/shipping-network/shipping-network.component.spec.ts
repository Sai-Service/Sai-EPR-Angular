import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingNetworkComponent } from './shipping-network.component';

describe('ShippingNetworkComponent', () => {
  let component: ShippingNetworkComponent;
  let fixture: ComponentFixture<ShippingNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
