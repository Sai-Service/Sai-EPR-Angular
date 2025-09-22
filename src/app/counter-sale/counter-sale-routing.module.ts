import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterSaleInvComponent } from './counter-sale-inv/counter-sale-inv.component';

const routes: Routes = [
  {path:'counterSaleInv',component:CounterSaleInvComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounterSaleRoutingModule { }
