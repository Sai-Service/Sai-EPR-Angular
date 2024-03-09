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
// import { PumpPurchaseOrderComponent } from './pump-purchase-order/pump-purchase-order.component';


@NgModule({
  declarations: [PumpTankMasterComponent, PumpIslandMasterComponent, PumpNozzleMasterComponent,  PumpShiftSaleComponent, PumpShiftPumpNewComponent, TestingDynamicComponent, ShiftInvoiceGenComponent, ShiftEntryListComponent, PumpDipMasterNewComponent,],
  imports: [
    CommonModule,
    PumpRoutingModule,
    ReactiveFormsModule,
    NgxDateRangeModule,
    FormsModule
  ]
})
export class PumpModule { }


