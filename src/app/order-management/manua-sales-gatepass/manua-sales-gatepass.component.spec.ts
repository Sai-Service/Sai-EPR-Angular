import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ManuaSalesGatepassComponent } from './manua-sales-gatepass.component';

describe('ManuaSalesGatepassComponent', () => {
  let component: ManuaSalesGatepassComponent;
  let fixture: ComponentFixture<ManuaSalesGatepassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManuaSalesGatepassComponent ],
       imports: [ ReactiveFormsModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManuaSalesGatepassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
