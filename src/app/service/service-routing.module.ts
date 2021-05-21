import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeActivateGuard } from '../de-activate.guard';
import { JobCardComponent } from './job-card/job-card.component';

const routes: Routes = [
  {path:'JobCard', component:JobCardComponent, canDeactivate: [DeActivateGuard] },
  { path : '' ,redirectTo: 'Dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ 
    // DeActivateGuard
  ]
})
export class ServiceRoutingModule { }
