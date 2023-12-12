import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDateRangeModule } from 'ngx-daterange';

import { PumpRoutingModule } from './pump-routing.module';
import { PumpTankMasterComponent } from './pump-tank-master/pump-tank-master.component';
import { PumpIslandMasterComponent } from './pump-island-master/pump-island-master.component';
import { PumpNozzleMasterComponent } from './pump-nozzle-master/pump-nozzle-master.component';
// import { PumpSalesEntryComponent } from './pump-sales-entry/pump-sales-entry.component';
import { PumpShiftSaleComponent } from './pump-shift-sale/pump-shift-sale.component';


@NgModule({
  declarations: [PumpTankMasterComponent, PumpIslandMasterComponent, PumpNozzleMasterComponent,  PumpShiftSaleComponent,],
  imports: [
    CommonModule,
    PumpRoutingModule,
    ReactiveFormsModule,
    NgxDateRangeModule,
    FormsModule
  ]
})
export class PumpModule { }


