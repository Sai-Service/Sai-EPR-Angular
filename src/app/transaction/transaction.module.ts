import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { PoInvoiceComponent } from './po-invoice/po-invoice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDateRangeModule } from 'ngx-daterange';
import { MoveOrderComponent } from './move-order/move-order.component';
import { StockTransferComponent } from './stock-transfer/stock-transfer.component';
import { MiscellaneousTransactionComponent } from './miscellaneous-transaction/miscellaneous-transaction.component';

@NgModule({
  declarations: [PoInvoiceComponent, MoveOrderComponent, StockTransferComponent, MiscellaneousTransactionComponent],
  imports: [
    CommonModule,
    TransactionRoutingModule, ReactiveFormsModule,NgxDateRangeModule,
    FormsModule
  ]
})
export class TransactionModule { }
