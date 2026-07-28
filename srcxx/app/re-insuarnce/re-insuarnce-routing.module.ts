import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArReceiptInsComponent } from './ar-receipt-ins/ar-receipt-ins.component';
import { ArInvoiceInsComponent } from './ar-invoice-ins/ar-invoice-ins.component';


const routes: Routes = [
  {path:'arReceiptIns',component:ArReceiptInsComponent},
   {path:'arInvoiceIns',component:ArInvoiceInsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReInsuarnceRoutingModule { }
