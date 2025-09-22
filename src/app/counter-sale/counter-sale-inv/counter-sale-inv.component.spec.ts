import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CounterSaleInvComponent } from './counter-sale-inv.component';

describe('CounterSaleInvComponent', () => {
  let component: CounterSaleInvComponent;
  let fixture: ComponentFixture<CounterSaleInvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterSaleInvComponent,ReactiveFormsModule,FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterSaleInvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
