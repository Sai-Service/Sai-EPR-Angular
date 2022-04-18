import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { DeActivateGuard } from '../de-activate.guard';
import { JobCardComponent } from './job-card/job-card.component';
import { LaborListComponent } from './labor-list/labor-list.component';
// import { JobcardOpeningComponent } from './jobcard-opening/jobcard-opening.component';
import { ServiceGatepassComponent } from './service-gatepass/service-gatepass.component';
import { VehicleServiceHistoryComponent } from './vehicle-service-history/vehicle-service-history.component';



const routes: Routes = [
  // {path:'JobCard', component:JobCardComponent, canDeactivate: [DeActivateGuard] },
  // {path:'JobCard/:regNo',component:JobCardComponent},
  {path:'JobCard',component:JobCardComponent},
  {path :'ServiceGatepass',component:ServiceGatepassComponent},
  {path :'VehicleServiceHistory',component:VehicleServiceHistoryComponent},
  {path:'laborList',component:LaborListComponent},
  {path : '' ,redirectTo: 'Dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ 
    // DeActivateGuard
  ]
})
export class ServiceRoutingModule { }
