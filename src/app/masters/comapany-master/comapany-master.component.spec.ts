import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComapanyMasterComponent } from './comapany-master.component';

describe('ComapanyMasterComponent', () => {
  let component: ComapanyMasterComponent;
  let fixture: ComponentFixture<ComapanyMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComapanyMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComapanyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
