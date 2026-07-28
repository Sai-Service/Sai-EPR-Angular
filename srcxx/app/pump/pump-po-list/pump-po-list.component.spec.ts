import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpPoListComponent } from './pump-po-list.component';

describe('PumpPoListComponent', () => {
  let component: PumpPoListComponent;
  let fixture: ComponentFixture<PumpPoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpPoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpPoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
