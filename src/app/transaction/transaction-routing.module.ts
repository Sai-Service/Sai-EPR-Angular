import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MiscellaneousTransactionComponent } from './miscellaneous-transaction/miscellaneous-transaction.component';
import { MoveOrderComponent } from './move-order/move-order.component';
import { PoInvoiceComponent } from './po-invoice/po-invoice.component';
import { StockTransferComponent } from './stock-transfer/stock-transfer.component';
import { PaymentsComponent } from './payments/payments.component';
import { TdsInvoiceComponent } from './tds-invoice/tds-invoice.component';
import { ARInvoiceComponent } from './arinvoice/arinvoice.component';
import { combineLatest } from 'rxjs';
import { AvgCostUpdateComponent } from './avg-cost-update/avg-cost-update.component';
import { PaymentARComponent } from './payment-ar/payment-ar.component';


const routes: Routes = [
  {path:'PoInvoice', component: PoInvoiceComponent},
  {path:'MoveOrder',component:MoveOrderComponent},
  {path:'stockTransfer',component:StockTransferComponent},
  {path:'miscTransaction',component:MiscellaneousTransactionComponent},
  {path:'TdsInvoice',component:TdsInvoiceComponent},
  {path:'Payment',component:PaymentsComponent},
  {path:'ARInvoice', component:ARInvoiceComponent},
  {path:'AvgCostUpadte',component:AvgCostUpdateComponent},
  {path:'PaymentAR',component:PaymentARComponent},
  { path : '' ,redirectTo: 'Dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
