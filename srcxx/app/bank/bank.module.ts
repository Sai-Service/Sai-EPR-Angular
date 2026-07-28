import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankRoutingModule } from './bank-routing.module';
import { BankBranchComponent } from './bank-branch/bank-branch.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { BankAccountUsesComponent } from './bank-account-uses/bank-account-uses.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDateRangeModule } from 'ngx-daterange';


@NgModule({
  declarations: [BankBranchComponent, BankAccountComponent, BankAccountUsesComponent],
  imports: [
    CommonModule,
    BankRoutingModule,
    ReactiveFormsModule,
    NgxDateRangeModule,
    FormsModule
  ]
})
export class BankModule { }
