import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { SalesOrderBookingComponent } from './sales-order-booking/sales-order-booking.component';

const routes: Routes = [
  {path:'salesOrderBooking', component:SalesOrderBookingComponent},
  { path : '' ,redirectTo: 'Dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagementRoutingModule { }
