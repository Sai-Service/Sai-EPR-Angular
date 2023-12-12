import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PumpTankMasterComponent } from './pump-tank-master/pump-tank-master.component';
import { PumpIslandMasterComponent } from './pump-island-master/pump-island-master.component';
import { PumpNozzleMasterComponent } from './pump-nozzle-master/pump-nozzle-master.component';
// import { PumpSalesEntryComponent } from './pump-sales-entry/pump-sales-entry.component';
import { PumpShiftSaleComponent } from './pump-shift-sale/pump-shift-sale.component';

const routes: Routes = [
  {path:'PumpTankMaster', component: PumpTankMasterComponent},
  {path:'PumpIslandMaster', component: PumpIslandMasterComponent},
  {path:'PumpNozzleMaster', component: PumpNozzleMasterComponent},
  // {path:'PumpSalesEntry', component: PumpSalesEntryComponent},
  {path:'PumpShiftSale', component: PumpShiftSaleComponent},


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




