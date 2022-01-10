import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllReportsComponent } from './all-reports.component';
import { ServiceReportComponent } from './service-report/service-report.component';

const routes: Routes = [
  {path:'SparesReports',component:AllReportsComponent},
  {path:'ServiceReports',component:ServiceReportComponent},
  { path : '' ,redirectTo: 'Dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
