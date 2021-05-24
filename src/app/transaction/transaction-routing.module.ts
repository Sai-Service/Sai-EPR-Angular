import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MiscellaneousTransactionComponent } from './miscellaneous-transaction/miscellaneous-transaction.component';
import { MoveOrderComponent } from './move-order/move-order.component';
import { PoInvoiceComponent } from './po-invoice/po-invoice.component';
import { StockTransferComponent } from './stock-transfer/stock-transfer.component';
import { PaymentsComponent } from './payments/payments.component';
import { TdsInvoiceComponent } from './tds-invoice/tds-invoice.component';
import { ARInvoiceComponent } from './arinvoice/arinvoice.component';
import { StockTakingComponent } from './stock-taking/stock-taking.component';
import { combineLatest } from 'rxjs';
import { AvgCostUpdateComponent } from './avg-cost-update/avg-cost-update.component';
import { PaymentARComponent } from './payment-ar/payment-ar.component';
import { OnHandDetailsComponent } from './on-hand-details/on-hand-details.component';
import { JournalVoucherComponent } from './journal-voucher/journal-voucher.component';
import { AccountEnquiryComponent } from './account-enquiry/account-enquiry.component';



const routes: Routes = [
  {path:'PoInvoice', component: PoInvoiceComponent},
  {path:'MoveOrder',component:MoveOrderComponent},
  {path:'stockTransfer',component:StockTransferComponent},
  {path:'miscTransaction',component:MiscellaneousTransactionComponent},
  {path:'TdsInvoice',component:TdsInvoiceComponent},
  {path:'Payment',component:PaymentsComponent},
  {path:'ARInvoice', component:ARInvoiceComponent},
  {path:'StockTaking',component:StockTakingComponent},
  {path:'AvgCostUpadte',component:AvgCostUpdateComponent},
  {path:'PaymentAR',component:PaymentARComponent},
  {path:'OnHandDetails',component:OnHandDetailsComponent},
  {path:'AccountEnquiry',component:AccountEnquiryComponent},
  {path:'JournalVoucher',component:JournalVoucherComponent},
  { path : '' ,redirectTo: 'Dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
