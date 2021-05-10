import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { PoInvoiceComponent } from './po-invoice/po-invoice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDateRangeModule } from 'ngx-daterange';
import { MoveOrderComponent } from './move-order/move-order.component';
import { StockTransferComponent } from './stock-transfer/stock-transfer.component';
import { MiscellaneousTransactionComponent } from './miscellaneous-transaction/miscellaneous-transaction.component';
import { PaymentsComponent } from './payments/payments.component';
import { ARInvoiceComponent } from './arinvoice/arinvoice.component';
import { AvgCostUpdateComponent } from './avg-cost-update/avg-cost-update.component';
import { PaymentARComponent } from './payment-ar/payment-ar.component';

@NgModule({
  declarations: [
    PoInvoiceComponent,
     MoveOrderComponent, 
     StockTransferComponent, 
     MiscellaneousTransactionComponent,
    PaymentsComponent,
    PoInvoiceComponent,
    ARInvoiceComponent,
    AvgCostUpdateComponent,
    PaymentARComponent,
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule, ReactiveFormsModule,NgxDateRangeModule,
    FormsModule
  ]
})
export class TransactionModule { }
