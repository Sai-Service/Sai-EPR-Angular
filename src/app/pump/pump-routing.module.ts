import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PumpTankMasterComponent } from './pump-tank-master/pump-tank-master.component';
import { PumpIslandMasterComponent } from './pump-island-master/pump-island-master.component';
import { PumpNozzleMasterComponent } from './pump-nozzle-master/pump-nozzle-master.component';
import { PumpShiftSaleComponent } from './pump-shift-sale/pump-shift-sale.component';
import { PumpShiftPumpNewComponent } from './pump-shift-pump-new/pump-shift-pump-new.component';
import { TestingDynamicComponent } from './testing-dynamic/testing-dynamic.component';
import { ShiftInvoiceGenComponent } from './shift-invoice-gen/shift-invoice-gen.component';
import { ShiftEntryListComponent } from './shift-entry-list/shift-entry-list.component';
// import { PumpDipMasterComponent } from './pump-dip-master/pump-dip-master.component';
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
// import { PumpBulkPoUploadComponent } from './pump-bulk-po-upload/pump-bulk-po-upload.component';
import { ARInvoiceComponent } from './arinvoice/arinvoice.component';
import { PumpMiscTransactionComponent } from './pump-misc-transaction/pump-misc-transaction.component';
import { PumpSubinventoryTransferComponent } from './pump-subinventory-transfer/pump-subinventory-transfer.component';


const routes: Routes = [
  {path:'PumpTankMaster', component: PumpTankMasterComponent},
  {path:'PumpIslandMaster', component: PumpIslandMasterComponent},
  {path:'PumpNozzleMaster', component: PumpNozzleMasterComponent},
  {path:'PumpShiftSale', component: PumpShiftSaleComponent},
  {path:'PumpShiftSaleNew',component:PumpShiftPumpNewComponent},
  {path:'testing',component:TestingDynamicComponent},
  {path:'testing/:shiftEntryNo',component:TestingDynamicComponent},
  {path:'invoiceGene',component:ShiftInvoiceGenComponent},
  {path:'ShiftEntryList',component:ShiftEntryListComponent},
  // {path:'PumpDipMaster',component:PumpDipMasterComponent},
  {path:'PumpDipMasterNew',component:PumpDipMasterNewComponent},
  {path:'PumpCounterSale',component:PumpCounterSaleComponent},
  {path:'DipScaleEntry',component:DipScaleEntryComponent},
  {path:'PumpPurchaseOrder',component:PumpPurchaseOrderComponent},
  {path:'PumpPoReceipt',component:PumpPoReceiptComponent},
  {path:'PumpItemMaster',component:PumpItemMasterComponent},
  {path:'PumpEmployeeMaster',component:PumpEmployeeMasterComponent},
  {path:'PumpPricelistMaster',component:PumpPricelistMasterComponent},
  {path:'PumpPoList',component:PumpPoListComponent},
  {path:'PumpCustomerMaster',component:PumpCustomerMasterComponent},
  {path:'PumpSupplierMaster',component:PumpSupplierMasterComponent},
  {path:'ARInvoice',component:ARInvoiceComponent},
  {path:'PumpMiscTransaction',component:PumpMiscTransactionComponent},
  {path:'PumpSubinventoryTransfer',component:PumpSubinventoryTransferComponent},

 // {path:'PumpBulkPoUpload',component:PumpBulkPoUploadComponent},
  {path : '' ,redirectTo: 'Dashboard', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ 
    // DeActivateGuard
  ]

})
export class PumpRoutingModule { }




