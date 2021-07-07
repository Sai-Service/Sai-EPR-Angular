import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  // {path: 'admin', component:AdminComponent},
  {
    path: '', component: AdminComponent, children: [
      // { path :'sidebar',component:a},
      {
        path: 'master',
        loadChildren: () => import('../master/master.module').then(mod => mod.MasterModule)
      },
      {
        path: 'transaction',
        loadChildren: () => import('../transaction/transaction.module').then(mod => mod.TransactionModule)
      },
      {
        path: 'bank',
        loadChildren: () => import('../bank/bank.module').then(mod => mod.BankModule)
      },  
      {
        path: 'OrderManagement',
        loadChildren: () => import('../order-management/order-management.module').then(mod => mod.OrderManagementModule)
      },  
      {
        path: 'service',
        loadChildren: () => import('../service/service.module').then(mod => mod.ServiceModule)
      },
      {
        path: 'FixedAsset',
        loadChildren: () => import('../fixed-asset/famaster.module').then(mod => mod.faMasterModule)
      },
      { path : '' ,redirectTo: 'master', pathMatch: 'full' }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
