import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { PoInvoiceComponent } from './po-invoice/po-invoice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDateRangeModule } from 'ngx-daterange';
import { TdsInvoiceComponent } from './tds-invoice/tds-invoice.component';
import { PaymentsComponent } from './payments/payments.component';

@NgModule({
  declarations: [PoInvoiceComponent, TdsInvoiceComponent, PaymentsComponent],
  imports: [
    CommonModule,
    TransactionRoutingModule, ReactiveFormsModule,NgxDateRangeModule,
    FormsModule
  ]
})
export class TransactionModule { }
