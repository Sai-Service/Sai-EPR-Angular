import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeMasterComponent } from './employee-master/employee-master.component';
import { LocationMasterComponent } from './location-master/location-master.component';
import { ComapanyMasterComponent } from './comapany-master/comapany-master.component';

const routes: Routes = [
{path:'empMaster' ,component:EmployeeMasterComponent},
{path:'LocMaster' ,component:LocationMasterComponent},
{path:'CompnyMaster' ,component:ComapanyMasterComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
