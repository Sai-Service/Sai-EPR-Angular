import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { SalesOrderModelWisePriceComponent } from './sales-order-model-wise-price.component';

describe('SalesOrderModelWisePriceComponent', () => {
  let component: SalesOrderModelWisePriceComponent;
  let fixture: ComponentFixture<SalesOrderModelWisePriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOrderModelWisePriceComponent ],
      imports: [ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrderModelWisePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
