import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobCardComponent } from './job-card/job-card.component';

const routes: Routes = [
  {path:'JobCard', component:JobCardComponent },
  { path : '' ,redirectTo: 'Dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
