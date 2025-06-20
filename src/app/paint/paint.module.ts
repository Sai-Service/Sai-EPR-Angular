import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDateRangeModule } from 'ngx-daterange';

import { PaintRoutingModule } from './paint-routing.module';
import { PaintIssueDpComponent } from './paint-issue-dp/paint-issue-dp.component';
import { PaintCreationComponent } from './paint-creation/paint-creation.component';
import { PaintMixingMasterComponent } from './paint-mixing-master/paint-mixing-master.component';
import { PaintPurchaseOrderComponent } from './paint-purchase-order/paint-purchase-order.component';
import { PaintPoReceiptComponent } from './paint-po-receipt/paint-po-receipt.component';
import { PaintPanelMasterComponent } from './paint-panel-master/paint-panel-master.component';
import { PaintItemMasterComponent } from './paint-item-master/paint-item-master.component';
import { PaintPoListComponent } from './paint-po-list/paint-po-list.component';
import { PaintMiscTransactionComponent } from './paint-misc-transaction/paint-misc-transaction.component';
import { PaintStockTransferComponent } from './paint-stock-transfer/paint-stock-transfer.component';
import { PaintCreationNewComponent } from './paint-creation-new/paint-creation-new.component';
import { PaintAvgCostComponent } from './paint-avg-cost/paint-avg-cost.component';
import { PanelConsupReComponent } from './panel-consup-re/panel-consup-re.component';
import { PaintEmpMasterComponent } from './paint-emp-master/paint-emp-master.component';
import { PaintSubinvTransferComponent } from './paint-subinv-transfer/paint-subinv-transfer.component';


@NgModule({
  declarations: [PaintIssueDpComponent, PaintCreationComponent, PaintMixingMasterComponent, PaintPurchaseOrderComponent, PaintPoReceiptComponent, PaintPanelMasterComponent, PaintItemMasterComponent, PaintPoListComponent,  PaintMiscTransactionComponent, PaintStockTransferComponent, PaintCreationNewComponent,  PaintAvgCostComponent, PanelConsupReComponent, PaintEmpMasterComponent, PaintSubinvTransferComponent],
  imports: [
    CommonModule,
    PaintRoutingModule,
    ReactiveFormsModule,
    NgxDateRangeModule,
    FormsModule
  ]
})
export class PaintModule { }


