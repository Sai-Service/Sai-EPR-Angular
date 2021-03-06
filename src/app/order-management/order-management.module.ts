import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDateRangeModule } from 'ngx-daterange';
import { OrderManagementRoutingModule } from './order-management-routing.module';
import { SalesOrderBookingComponent } from './sales-order-booking/sales-order-booking.component';
import { PaymentReceiptComponent } from './payment-receipt/payment-receipt.component';
import { AllotmentComponent } from './allotment/allotment.component';
import { DeAllotmentComponent } from './de-allotment/de-allotment.component';
import { CounterSaleComponent } from './counter-sale/counter-sale.component';
import { SalesOrderFormComponent } from './sales-order-form/sales-order-form.component';
import { ReversalOrderComponent } from './reversal-order/reversal-order.component';
import { SalesGatePassComponent } from './sales-gate-pass/sales-gate-pass.component';


@NgModule({
  declarations: [SalesOrderBookingComponent, PaymentReceiptComponent, AllotmentComponent, DeAllotmentComponent, CounterSaleComponent, SalesOrderFormComponent, ReversalOrderComponent, SalesGatePassComponent],
  imports: [
    CommonModule,
    OrderManagementRoutingModule,
    ReactiveFormsModule,NgxDateRangeModule,
    FormsModule
  ]
})
export class OrderManagementModule { }
