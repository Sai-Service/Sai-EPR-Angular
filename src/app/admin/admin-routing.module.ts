import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';

const routes: Routes = [{
   path: '', component: AdminPageComponent, children: [
     {
        path: 'salesTransaction',
        loadChildren: () => import('../sales-transaction/sales-transaction.module').then(mod => mod.SalesTransactionModule)
      },
      {
        path: 'counterSale',
        loadChildren: () => import('../counter-sale/counter-sale.module').then(mod => mod.CounterSaleModule)
      },
   ]
}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
