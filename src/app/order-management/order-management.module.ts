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
import { OmSalesOrderFormComponent } from './om-sales-order-form/om-sales-order-form.component';
import { CounterSaleWithCSVModuleComponent } from './counter-sale-with-csvmodule/counter-sale-with-csvmodule.component';
import { CounterSaleReturnComponent } from './counter-sale-return/counter-sale-return.component';
import { AllOrderListComponent } from './all-order-list/all-order-list.component';
import { OrderGenerationComponent } from './order-generation/order-generation.component';
import { BackorderSparesImportBajajComponent } from './backorder-spares-import-bajaj/backorder-spares-import-bajaj.component';
import { CounterSalePerformaInvComponent } from './counter-sale-performa-inv/counter-sale-performa-inv.component';
import { SalesOrderListComponent } from './sales-order-list/sales-order-list.component';
import { ClosingStockGridComponent } from './closing-stock-grid/closing-stock-grid.component';
import { ShippingNetworkComponent } from './shipping-network/shipping-network.component';
import { SalesOrderProformaComponent } from './sales-order-proforma/sales-order-proforma.component';
import { PriceUpdationComponent } from './price-updation/price-updation.component';
import { SalesOrderModelWisePriceComponent } from './sales-order-model-wise-price/sales-order-model-wise-price.component';
import { RtoLineItemReportComponent } from './rto-line-item-report/rto-line-item-report.component';
import { EwayBillInvoiceDataComponent } from './eway-bill-invoice-data/eway-bill-invoice-data.component';
import { EwayBillCustomerNoWiseComponent } from './eway-bill-customer-no-wise/eway-bill-customer-no-wise.component';
import { ReserveQtyClearComponent } from './reserve-qty-clear/reserve-qty-clear.component';
import { SalesOrderProformaChetakComponent } from './sales-order-proforma-chetak/sales-order-proforma-chetak.component';
import { OrderDetailsUpdationComponent } from './order-details-updation/order-details-updation.component';


@NgModule({
  declarations: [SalesOrderBookingComponent,
     PaymentReceiptComponent, 
     AllotmentComponent, 
     DeAllotmentComponent, 
     CounterSaleComponent,
     SalesOrderFormComponent, 
     ReversalOrderComponent, 
     SalesGatePassComponent, 
     OmSalesOrderFormComponent,
     CounterSaleWithCSVModuleComponent,
     CounterSaleReturnComponent, 
     AllOrderListComponent,
     OrderGenerationComponent,
     BackorderSparesImportBajajComponent,
     CounterSalePerformaInvComponent,
     SalesOrderListComponent,
     ClosingStockGridComponent,
     ShippingNetworkComponent,
     SalesOrderProformaComponent,
     PriceUpdationComponent,
     SalesOrderModelWisePriceComponent,
     RtoLineItemReportComponent,
     EwayBillInvoiceDataComponent,
     EwayBillCustomerNoWiseComponent,
     ReserveQtyClearComponent,
     SalesOrderProformaChetakComponent,
     OrderDetailsUpdationComponent,
      ],
  imports: [
    CommonModule,
    OrderManagementRoutingModule,
    ReactiveFormsModule,NgxDateRangeModule,
    FormsModule
  ]
})
export class OrderManagementModule { }
