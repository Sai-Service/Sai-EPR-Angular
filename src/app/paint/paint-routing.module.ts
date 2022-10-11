import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaintIssueDpComponent } from './paint-issue-dp/paint-issue-dp.component';
import { PaintCreationComponent } from './paint-creation/paint-creation.component';
import { PaintMixingMasterComponent } from './paint-mixing-master/paint-mixing-master.component';

const routes: Routes = [
  {path:'PaintIssueDp', component: PaintIssueDpComponent},
  {path:'PaintCreation', component: PaintCreationComponent},
  {path:'PaintMixingMaster', component: PaintMixingMasterComponent},


  {path : '' ,redirectTo: 'Dashboard', pathMatch: 'full'}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ 
    // DeActivateGuard
  ]
})

export class PaintRoutingModule { }
