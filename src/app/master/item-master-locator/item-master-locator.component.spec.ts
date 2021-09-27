import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMasterLocatorComponent } from './item-master-locator.component';

describe('ItemMasterLocatorComponent', () => {
  let component: ItemMasterLocatorComponent;
  let fixture: ComponentFixture<ItemMasterLocatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemMasterLocatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMasterLocatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
