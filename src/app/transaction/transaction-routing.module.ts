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
// import { ReceiptArApplicationComponent} from './receipt-ar-application/receipt-ar-application.component';
import { SaiExtendedWarrantyComponent } from './sai-extended-warranty/sai-extended-warranty.component';
import { SaiEwSchemeMasterComponent } from './sai-ew-scheme-master/sai-ew-scheme-master.component';
import { McpItemMasterComponent } from './mcp-item-master/mcp-item-master.component';
import { McpItemMappingComponent } from './mcp-item-mapping/mcp-item-mapping.component';
import { McpPackageMasterComponent } from './mcp-package-master/mcp-package-master.component';
import { McpEnquiryComponent } from './mcp-enquiry/mcp-enquiry.component';
import { McpEnrollmentComponent } from './mcp-enrollment/mcp-enrollment.component';
import { McpCancellationComponent } from './mcp-cancellation/mcp-cancellation.component';
import { JournalVoucherComponent } from './journal-voucher/journal-voucher.component';
import { AccountEnquiryComponent } from './account-enquiry/account-enquiry.component';
import { OnHandDetailsComponent } from './on-hand-details/on-hand-details.component';
import { StockTakingComponent } from './stock-taking/stock-taking.component';
import { WorkShopReturnComponent} from './work-shop-return/work-shop-return.component';
import { ReturnToVendorComponent } from './return-to-vendor/return-to-vendor.component';
import { InterStateComponent } from './inter-state/inter-state.component';
import { CashBankTransferComponent } from './cash-bank-transfer/cash-bank-transfer.component';
import { SubinventoryTransferComponent } from './subinventory-transfer/subinventory-transfer.component';
import { BulkUploadWithCsvComponent } from './bulk-upload-with-csv/bulk-upload-with-csv.component';
import { OPMasterDtoComponent } from '../master/opmaster-dto/opmaster-dto.component';
import { BulkItemUploadCSVComponent } from './bulk-item-upload-csv/bulk-item-upload-csv.component';
import { InternalConsumptionComponent } from './internal-consumption/internal-consumption.component';
import { PoUploadListComponent } from './po-upload-list/po-upload-list.component';
import { BulkUploadPricelistComponent } from './bulk-upload-pricelist/bulk-upload-pricelist.component';
import { BankReconcillationComponent } from './bank-reconcillation/bank-reconcillation.component';
import { AmcSchemeMasterComponent } from './amc-scheme-master/amc-scheme-master.component';
import { AmcEnrollmentComponent } from './amc-enrollment/amc-enrollment.component';
import { WarrantyClaimComponent } from './warranty-claim/warranty-claim.component';
import { PayableInvoiceNewComponent } from './payable-invoice-new/payable-invoice-new.component';
import { DeadStockComponent } from './dead-stock/dead-stock.component';
import { PoInvListComponent } from './po-inv-list/po-inv-list.component';
import { GlTrialBalanceComponent } from './gl-trial-balance/gl-trial-balance.component';
import { JvUploadComponent } from './jv-upload/jv-upload.component';
import { PaymentObj } from './payments/payment-obj';
// import { ShippingNetworkComponent } from './shipping-network/shipping-network.component';cd..


// import { CounterSaleReturnComponent } from './counter-sale-return/counter-sale-return.component';

const routes: Routes = [
  {path:'PoInvoice', component: PoInvoiceComponent},
  {path:'MoveOrder',component:MoveOrderComponent},
  {path:'stockTransfer',component:StockTransferComponent},
  {path:'miscTransaction',component:MiscellaneousTransactionComponent},
  {path:'TdsInvoice',component:TdsInvoiceComponent},
  {path:'Payment',component:PaymentsComponent},
  {path:'Payment/:invNumber',component:PaymentsComponent},
  {path:'payableInvoice/:invNumber',component:PayableInvoiceNewComponent},
  {path:'ARInvoice', component:ARInvoiceComponent},
  {path:'ARInvoice/:invoiceNumber', component:ARInvoiceComponent},
  {path:'AvgCostUpdate',component:AvgCostUpdateComponent},
  {path:'PaymentReceipt',component:PaymentReceiptComponent},
  {path:'PaymentReceipt/:orderNumber',component:PaymentReceiptComponent},
  {path:'PaymentAr/:jobCardNum',component:PaymentArComponent},
  {path:'JournalVoucher/:docSequenceValue',component:JournalVoucherComponent},
  {path:'PaymentAr/:invNumber/:methodId/:recAmt',component:PaymentArComponent},
  {path:'PaymentAr',component:PaymentArComponent},
  {path:'PaymentAr/:docSequenceValue/:locId',component:PaymentArComponent},
  {path:'PaymentAr/:orderNumber',component:PaymentArComponent},
  {path:'Payment/: trxNum /:catg' ,component:PaymentsComponent},
  {path:'SaiExtendedWarranty',component:SaiExtendedWarrantyComponent},
  {path:'SaiEwSchemeMaster',component:SaiEwSchemeMasterComponent},
  {path:'McpItemMaster',component:McpItemMasterComponent},
  {path:'McpItemMapping',component:McpItemMappingComponent},
  {path:'McpPackageMaster',component:McpPackageMasterComponent},
  {path:'McpEnquiry',component:McpEnquiryComponent},
  {path:'McpEnrollment',component:McpEnrollmentComponent},
  {path:'McpCancellation',component:McpCancellationComponent},
 {path:'JournalVoucher',component:JournalVoucherComponent},
 {path:'AccountEnquiry',component:AccountEnquiryComponent},
 {path:'OnHandDetails',component:OnHandDetailsComponent},
 {path:'AvgCostUpadte',component:AvgCostUpdateComponent},
 {path:'StockTaking',component:StockTakingComponent},
 {path:'WorkshopReturn',component:WorkShopReturnComponent},
 {path:'ReturnToVendor',component:ReturnToVendorComponent},
 {path:'InterState',component:InterStateComponent},
 {path:'CashBankTransfer',component:CashBankTransferComponent},
 {path:'SubInventoryTransfer',component:SubinventoryTransferComponent},
 {path:'BulkUploadWithCsv',component:BulkUploadWithCsvComponent},
 {path:'BulkItemUploadCSV',component:BulkItemUploadCSVComponent},
{path:'InternalConsumption',component:InternalConsumptionComponent},
{path:'pendingPoList',component:PoUploadListComponent},
{path:'BulkUploadPricelist',component:BulkUploadPricelistComponent},
{path :'BankReconcillation',component:BankReconcillationComponent},
{path:'AmcSchemeMaster',component:AmcSchemeMasterComponent},
{path :'AmcEnrollment',component:AmcEnrollmentComponent},
{path :'WarrantyClaim',component:WarrantyClaimComponent},
{path:'payableInvoice',component:PayableInvoiceNewComponent},
{path:'DeadStock',component:DeadStockComponent},
{path:'poInvList',component:PoInvListComponent},
{path:'glTrialBalance',component:GlTrialBalanceComponent},
{path:'JvUpload',component:JvUploadComponent},
// {path :'ShippingNetwork',component:ShippingNetworkComponent},
// {path:'CounterSaleReturn',component:CounterSaleReturnComponent},
 {path : '' ,redirectTo: 'Dashboard', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
