import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaintIssueDpComponent }       from './paint-issue-dp/paint-issue-dp.component';
import { PaintCreationComponent }      from './paint-creation/paint-creation.component';
import { PaintMixingMasterComponent }  from './paint-mixing-master/paint-mixing-master.component';
import { PaintPurchaseOrderComponent } from './paint-purchase-order/paint-purchase-order.component';
import { PaintPoReceiptComponent }     from './paint-po-receipt/paint-po-receipt.component';
import { PaintPanelMasterComponent }   from './paint-panel-master/paint-panel-master.component';
import { PaintItemMasterComponent } from './paint-item-master/paint-item-master.component';


const routes: Routes = [
  {path:'PaintMixingMaster', component: PaintMixingMasterComponent},
  {path:'PaintPanelMaster', component: PaintPanelMasterComponent},
  {path:'PaintItemMaster', component: PaintItemMasterComponent},
  {path:'PaintIssueDp', component: PaintIssueDpComponent},
  {path:'PaintCreation', component: PaintCreationComponent},
  {path:'PaintPurchaseOrder', component: PaintPurchaseOrderComponent},
  {path:'PaintPoReceipt', component: PaintPoReceiptComponent},
  {path:'PaintPoReceipt/:segment1',component:PaintPoReceiptComponent},
  {path:'PaintPoReceipt/:segment1/:accountLocId',component:PaintPoReceiptComponent},
  {path:'PaintPoReceipt/:trxNum/:catg',component:PaintPoReceiptComponent},
  {path:'PaintPoReceipt/:shipmentNumber',component:PaintPoReceiptComponent},

  {path : '' ,redirectTo: 'Dashboard', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ 
    // DeActivateGuard
  ]
})

export class PaintRoutingModule { }
