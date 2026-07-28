import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpIslandMasterComponent } from './pump-island-master.component';

describe('PumpIslandMasterComponent', () => {
  let component: PumpIslandMasterComponent;
  let fixture: ComponentFixture<PumpIslandMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpIslandMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpIslandMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
