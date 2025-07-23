import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToolsPurchaseOrderComponent } from './tools-purchase-order/tools-purchase-order.component';

const routes: Routes = [
   {path:'ToolsPurchaseOrder', component: ToolsPurchaseOrderComponent},

   {path : '' ,redirectTo: 'Dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }
