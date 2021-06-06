import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MiscellaneousTransactionComponent } from './miscellaneous-transaction/miscellaneous-transaction.component';
import { MoveOrderComponent } from './move-order/move-order.component';
import { PoInvoiceComponent } from './po-invoice/po-invoice.component';
import { StockTransferComponent } from './stock-transfer/stock-transfer.component';
import { PaymentsComponent } from './payments/payments.component';
import { TdsInvoiceComponent } from './tds-invoice/tds-invoice.component';
import { ARInvoiceComponent } from './arinvoice/arinvoice.component';
import { PaymentReceiptComponent } from './payment-receipt/payment-receipt.component';
import { PaymentArComponent } from './payment-ar/payment-ar.component';
import { AvgCostUpdateComponent } from './avg-cost-update/avg-cost-update.component';
import { ReceiptArApplicationComponent} from './receipt-ar-application/receipt-ar-application.component';
import { SaiExtendedWarrantyComponent } from './sai-extended-warranty/sai-extended-warranty.component';
import { SaiEwSchemeMasterComponent } from './sai-ew-scheme-master/sai-ew-scheme-master.component';
import { McpItemMasterComponent } from './mcp-item-master/mcp-item-master.component';
import { McpItemMappingComponent } from './mcp-item-mapping/mcp-item-mapping.component';
import { McpPackageMasterComponent } from './mcp-package-master/mcp-package-master.component';
import { McpEnquiryComponent } from './mcp-enquiry/mcp-enquiry.component';
import { McpEnrollmentComponent } from './mcp-enrollment/mcp-enrollment.component';
import { McpCancellationComponent } from './mcp-cancellation/mcp-cancellation.component';

const routes: Routes = [
  {path:'PoInvoice', component: PoInvoiceComponent},
  {path:'MoveOrder',component:MoveOrderComponent},
  {path:'stockTransfer',component:StockTransferComponent},
  {path:'miscTransaction',component:MiscellaneousTransactionComponent},
  {path:'TdsInvoice',component:TdsInvoiceComponent},
  {path:'Payment',component:PaymentsComponent},
  {path:'ARInvoice', component:ARInvoiceComponent},
  {path:'AvgCostUpdate',component:AvgCostUpdateComponent},
  {path:'PaymentReceipt',component:PaymentReceiptComponent},
  {path:'PaymentAr',component:PaymentArComponent},
  {path:'ReceiptArApplication',component:ReceiptArApplicationComponent},
  {path:'SaiExtendedWarranty',component:SaiExtendedWarrantyComponent},
  {path:'SaiEwSchemeMaster',component:SaiEwSchemeMasterComponent},
  {path:'McpItemMaster',component:McpItemMasterComponent},
  {path:'McpItemMapping',component:McpItemMappingComponent},
  {path:'McpPackageMaster',component:McpPackageMasterComponent},
  {path:'McpEnquiry',component:McpEnquiryComponent},
  {path:'McpEnrollment',component:McpEnrollmentComponent},
  {path:'McpCancellation',component:McpCancellationComponent},
  
  {path : '' ,redirectTo: 'Dashboard', pathMatch: 'full'}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
