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
import { PumpDipMasterComponent } from './pump-dip-master/pump-dip-master.component';
import { PumpDipMasterNewComponent } from './pump-dip-master-new/pump-dip-master-new.component';

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
  {path:'PumpDipMaster',component:PumpDipMasterComponent},
  {path:'PumpDipMasterNew',component:PumpDipMasterNewComponent},
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




