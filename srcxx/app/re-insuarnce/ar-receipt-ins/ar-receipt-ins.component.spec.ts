import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { ArReceiptInsComponent } from './ar-receipt-ins.component';

describe('ArReceiptInsComponent', () => {
  let component: ArReceiptInsComponent;
  let fixture: ComponentFixture<ArReceiptInsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArReceiptInsComponent ],
       imports: [ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArReceiptInsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
