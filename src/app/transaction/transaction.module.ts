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
import { PaymentReceiptComponent } from './payment-receipt/payment-receipt.component';
import { PaymentArComponent } from './payment-ar/payment-ar.component';
import { AvgCostUpdateComponent } from './avg-cost-update/avg-cost-update.component';
// import { ReceiptArApplicationComponent } from './receipt-ar-application/receipt-ar-application.component';
import { SaiExtendedWarrantyComponent } from './sai-extended-warranty/sai-extended-warranty.component';
import { SaiEwSchemeMasterComponent } from './sai-ew-scheme-master/sai-ew-scheme-master.component';
import { McpItemMasterComponent } from './mcp-item-master/mcp-item-master.component';
import { McpItemMappingComponent } from './mcp-item-mapping/mcp-item-mapping.component';
import { McpPackageMasterComponent } from './mcp-package-master/mcp-package-master.component';
import { McpEnquiryComponent } from './mcp-enquiry/mcp-enquiry.component';
import { McpEnrollmentComponent } from './mcp-enrollment/mcp-enrollment.component';
import { McpCancellationComponent } from './mcp-cancellation/mcp-cancellation.component';
import { StockTakingComponent } from './stock-taking/stock-taking.component';
import { JournalVoucherComponent } from './journal-voucher/journal-voucher.component';
import { OnHandDetailsComponent } from './on-hand-details/on-hand-details.component';
import { AccountEnquiryComponent } from './account-enquiry/account-enquiry.component';
import { WorkShopReturnComponent } from './work-shop-return/work-shop-return.component';
import { ReturnToVendorComponent } from './return-to-vendor/return-to-vendor.component';
import { InterStateComponent } from './inter-state/inter-state.component';
import { CashBankTransferComponent } from './cash-bank-transfer/cash-bank-transfer.component';
import { SubinventoryTransferComponent } from './subinventory-transfer/subinventory-transfer.component';
import { BulkUploadWithCsvComponent } from './bulk-upload-with-csv/bulk-upload-with-csv.component';
import { BulkItemUploadCSVComponent } from './bulk-item-upload-csv/bulk-item-upload-csv.component';
import { InternalConsumptionComponent } from './internal-consumption/internal-consumption.component';
import { PoUploadListComponent } from './po-upload-list/po-upload-list.component';
import { RelatedItemPartComponent } from './related-item-part/related-item-part.component';
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
import { VehicleBookingUploadComponent } from './vehicle-booking-upload/vehicle-booking-upload.component';
import { ReceiptWriteoffComponent } from './receipt-writeoff/receipt-writeoff.component';
import { ShortLandedGrrComponent } from './short-landed-grr/short-landed-grr.component';
// import { SubInventoryTransferNewComponent } from './sub-inventory-transfer-new/sub-inventory-transfer-new.component';


// import { ShippingNetworkComponent } from './shipping-network/shipping-network.component';

// import { OrderGenerationComponent } from './order-generation/order-generation.component';
// import { CounterSaleReturnComponent } from './counter-sale-return/counter-sale-return.component';





@NgModule({
  declarations: [
    PoInvoiceComponent,
    MoveOrderComponent, 
    StockTransferComponent, 
    MiscellaneousTransactionComponent,
    PaymentsComponent,
    PoInvoiceComponent,
    ARInvoiceComponent,
    PaymentReceiptComponent, 
    PaymentArComponent, 
    AvgCostUpdateComponent, 
    SaiExtendedWarrantyComponent, 
    SaiEwSchemeMasterComponent, 
    McpItemMasterComponent, 
    McpItemMappingComponent, 
    McpPackageMasterComponent, 
    McpEnquiryComponent, 
    McpEnrollmentComponent, 
    McpCancellationComponent, 
    StockTakingComponent,
    JournalVoucherComponent,
    AvgCostUpdateComponent,
    OnHandDetailsComponent,
    AccountEnquiryComponent,
    WorkShopReturnComponent,
    ReturnToVendorComponent,
    InterStateComponent,
    CashBankTransferComponent,
    SubinventoryTransferComponent,
    BulkUploadWithCsvComponent,
    BulkItemUploadCSVComponent,
    InternalConsumptionComponent,
    PoUploadListComponent,
    RelatedItemPartComponent,
    BulkUploadPricelistComponent,
    BankReconcillationComponent,
    AmcSchemeMasterComponent,
    AmcEnrollmentComponent,
    WarrantyClaimComponent,
    PayableInvoiceNewComponent,
    DeadStockComponent,
    PoInvListComponent,
    GlTrialBalanceComponent,
    JvUploadComponent,
    VehicleBookingUploadComponent,
    ReceiptWriteoffComponent,
    ShortLandedGrrComponent,
  
 
  
    // ShippingNetworkComponent,
    // OrderGenerationComponent,
    // CounterSaleReturnComponent
  ],
  
  imports: [
    CommonModule,
    TransactionRoutingModule, ReactiveFormsModule,NgxDateRangeModule,
    FormsModule
  ]
})
export class TransactionModule { }
