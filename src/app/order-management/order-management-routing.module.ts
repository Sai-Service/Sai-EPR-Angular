import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { AllotmentComponent } from './allotment/allotment.component';
import { CounterSaleWithCSVModuleComponent } from './counter-sale-with-csvmodule/counter-sale-with-csvmodule.component';
import { CounterSaleComponent } from './counter-sale/counter-sale.component';
import { DeAllotmentComponent } from './de-allotment/de-allotment.component';
import { OmSalesOrderFormComponent } from './om-sales-order-form/om-sales-order-form.component';
import { PaymentReceiptComponent } from './payment-receipt/payment-receipt.component';
import { ReversalOrderComponent } from './reversal-order/reversal-order.component';
import { SalesGatePassComponent } from './sales-gate-pass/sales-gate-pass.component';
import { SalesOrderBookingComponent } from './sales-order-booking/sales-order-booking.component';
import { SalesOrderFormComponent } from './sales-order-form/sales-order-form.component';
import { CounterSaleReturnComponent } from './counter-sale-return/counter-sale-return.component';
import { AllOrderListComponent } from './all-order-list/all-order-list.component';
import { OrderGenerationComponent } from './order-generation/order-generation.component';

const routes: Routes = [
  {path:'salesOrderBooking', component:SalesOrderBookingComponent},
  {path:'SalesOrderForm',component:SalesOrderFormComponent},
  {path:'SalesOrderForm/:orderNumber',component:SalesOrderFormComponent},
  // {path:'OMpaymentReceipt',component:PaymentReceiptComponent},
  // {path:'OMpaymentReceipt/:orderNumber',component:PaymentReceiptComponent},
  {path:'allotment',component:AllotmentComponent},
  {path:'Deallotment',component:DeAllotmentComponent},
  {path:'CounterSaleOrder',component:CounterSaleComponent},
  {path:'CounterSaleOrder/:orderNumber',component:CounterSaleComponent},
  {path:'ReversalOrder',component:ReversalOrderComponent},
  {path:'GatePass',component:SalesGatePassComponent},
  {path:'OMSalesOrder',component:OmSalesOrderFormComponent},
  {path:'CounterSaleWithCSV',component:CounterSaleWithCSVModuleComponent},
  {path:'CounterSaleReturn',component:CounterSaleReturnComponent},
  {path:'orderList',component:AllOrderListComponent},
  {path:'OrderGeneration',component:OrderGenerationComponent},
  // {path:'GatePass/:orderNumber',component:SalesGatePassComponent},
  { path : '' ,redirectTo: 'Dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagementRoutingModule { }
