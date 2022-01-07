import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankAccountUsesComponent } from './bank-account-uses/bank-account-uses.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { BankBranchComponent } from './bank-branch/bank-branch.component';

const routes: Routes = [
  {path:'newBank', component: BankAccountComponent},
  {path: 'bankBranch', component:BankBranchComponent},
  {path: 'BankAccUses', component:BankAccountUsesComponent},
  { path : '' ,redirectTo: 'Dashboard', pathMatch: 'full'} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRoutingModule { }
