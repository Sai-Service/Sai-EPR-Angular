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
import { BackorderSparesImportBajajComponent } from './backorder-spares-import-bajaj/backorder-spares-import-bajaj.component';
import { CounterSalePerformaInvComponent } from './counter-sale-performa-inv/counter-sale-performa-inv.component';
import { SalesOrderListComponent } from './sales-order-list/sales-order-list.component';
import { ClosingStockGridComponent } from './closing-stock-grid/closing-stock-grid.component';
import { ShippingNetworkComponent } from './shipping-network/shipping-network.component';

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
  {path:'BackorderSparesImportBajaj',component:BackorderSparesImportBajajComponent},
  {path:'CSPerformaINV',component:CounterSalePerformaInvComponent},
  {path:'SalesOrderList',component:SalesOrderListComponent},
  {path:'ClosingStock',component:ClosingStockGridComponent},
  {path:'GatePass/:orderNumber',component:SalesGatePassComponent},
  {path:'ShippingNetwork',component:ShippingNetworkComponent},
  { path : '' ,redirectTo: 'Dashboard', pathMatch: 'full' }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagementRoutingModule { }
