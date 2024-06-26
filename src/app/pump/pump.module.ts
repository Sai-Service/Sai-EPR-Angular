import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDateRangeModule } from 'ngx-daterange';

import { PumpRoutingModule } from './pump-routing.module';
import { PumpTankMasterComponent } from './pump-tank-master/pump-tank-master.component';
import { PumpIslandMasterComponent } from './pump-island-master/pump-island-master.component';
import { PumpNozzleMasterComponent } from './pump-nozzle-master/pump-nozzle-master.component';
import { PumpShiftSaleComponent } from './pump-shift-sale/pump-shift-sale.component';
import { PumpShiftPumpNewComponent } from './pump-shift-pump-new/pump-shift-pump-new.component';
import { TestingDynamicComponent } from './testing-dynamic/testing-dynamic.component';
import { ShiftInvoiceGenComponent } from './shift-invoice-gen/shift-invoice-gen.component';
import { ShiftEntryListComponent } from './shift-entry-list/shift-entry-list.component';
import { PumpDipMasterNewComponent } from './pump-dip-master-new/pump-dip-master-new.component';
import { PumpCounterSaleComponent } from './pump-counter-sale/pump-counter-sale.component';
import { DipScaleEntryComponent } from './dip-scale-entry/dip-scale-entry.component';
import { PumpPurchaseOrderComponent } from './pump-purchase-order/pump-purchase-order.component';
import { PumpPoReceiptComponent } from './pump-po-receipt/pump-po-receipt.component';
import { PumpItemMasterComponent } from './pump-item-master/pump-item-master.component';
import { PumpEmployeeMasterComponent } from './pump-employee-master/pump-employee-master.component';
import { PumpPricelistMasterComponent } from './pump-pricelist-master/pump-pricelist-master.component';
import { PumpPoListComponent } from './pump-po-list/pump-po-list.component';
import { PumpCustomerMasterComponent } from './pump-customer-master/pump-customer-master.component';
import { PumpSupplierMasterComponent } from './pump-supplier-master/pump-supplier-master.component';
// import { PumpArInvoiceComponent } from './pump-ar-invoice/pump-ar-invoice.component';
import { ARInvoiceComponent } from './arinvoice/arinvoice.component';
import { PumpMiscTransactionComponent } from './pump-misc-transaction/pump-misc-transaction.component';
import { PumpSubinventoryTransferComponent } from './pump-subinventory-transfer/pump-subinventory-transfer.component';

// import { PumpBulkPoUploadComponent } from './pump-bulk-po-upload/pump-bulk-po-upload.component';


@NgModule({
  declarations: [PumpTankMasterComponent, 
    PumpIslandMasterComponent, 
    PumpNozzleMasterComponent,  
    PumpShiftSaleComponent, 
    PumpShiftPumpNewComponent, 
    TestingDynamicComponent, 
    ShiftInvoiceGenComponent, 
    ShiftEntryListComponent, 
    PumpDipMasterNewComponent, 
    PumpCounterSaleComponent, 
    DipScaleEntryComponent, 
    PumpPurchaseOrderComponent, 
    PumpPoReceiptComponent, 
    PumpItemMasterComponent, 
    PumpEmployeeMasterComponent, 
    PumpPricelistMasterComponent, 
    PumpPoListComponent, 
    PumpCustomerMasterComponent, 
    PumpSupplierMasterComponent, 
    ARInvoiceComponent, PumpMiscTransactionComponent, PumpSubinventoryTransferComponent,
    ],

  imports: [
    CommonModule,
    PumpRoutingModule,
    ReactiveFormsModule,
    NgxDateRangeModule,
    FormsModule
  ]
})
export class PumpModule { }


