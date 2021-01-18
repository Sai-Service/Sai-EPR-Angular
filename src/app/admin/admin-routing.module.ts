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
      { path : '' ,redirectTo: 'master', pathMatch: 'full' }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
