import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDateRangeModule } from 'ngx-daterange';

import { ToolsRoutingModule } from './tools-routing.module';
import { ToolsPurchaseOrderComponent } from './tools-purchase-order/tools-purchase-order.component';


@NgModule({
  declarations: [ToolsPurchaseOrderComponent],
  imports: [
    CommonModule,
    ToolsRoutingModule,
     ReactiveFormsModule,
    NgxDateRangeModule,
    FormsModule
  ]
})
export class ToolsModule { }
