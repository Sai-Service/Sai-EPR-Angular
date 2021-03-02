import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentsComponent } from './payments/payments.component';
import { PoInvoiceComponent } from './po-invoice/po-invoice.component';
import { TdsInvoiceComponent } from './tds-invoice/tds-invoice.component';

const routes: Routes = [
  {path:'PoInvoice', component: PoInvoiceComponent},
  {path:'TdsInvoice',component:TdsInvoiceComponent},
  {path:'Payment',component:PaymentsComponent},
  { path : '' ,redirectTo: 'Dashboard', pathMatch: 'full'} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
