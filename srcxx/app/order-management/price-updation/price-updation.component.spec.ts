import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceUpdationComponent } from './price-updation.component';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
describe('PriceUpdationComponent', () => {
  let component: PriceUpdationComponent;
  let fixture: ComponentFixture<PriceUpdationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceUpdationComponent ],
      imports: [ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceUpdationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
