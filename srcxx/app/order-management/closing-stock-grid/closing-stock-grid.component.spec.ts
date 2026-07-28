import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosingStockGridComponent } from './closing-stock-grid.component';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';

describe('ClosingStockGridComponent', () => {
  let component: ClosingStockGridComponent;
  let fixture: ComponentFixture<ClosingStockGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosingStockGridComponent ],
      imports: [ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosingStockGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
