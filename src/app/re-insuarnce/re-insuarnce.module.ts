import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReInsuarnceRoutingModule } from './re-insuarnce-routing.module';
import { ArReceiptInsComponent } from './ar-receipt-ins/ar-receipt-ins.component';
import { ArInvoiceInsComponent } from './ar-invoice-ins/ar-invoice-ins.component';


@NgModule({
  declarations: [ArReceiptInsComponent, ArInvoiceInsComponent],
  imports: [
    CommonModule,
    ReInsuarnceRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReInsuarnceModule { }
