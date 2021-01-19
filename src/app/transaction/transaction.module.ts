import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { PoInvoiceComponent } from './po-invoice/po-invoice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PoInvoiceComponent],
  imports: [
    CommonModule,
    TransactionRoutingModule, ReactiveFormsModule,
    FormsModule
  ]
})
export class TransactionModule { }
