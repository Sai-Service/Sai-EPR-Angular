import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllReportsComponent } from './all-reports.component';
import { SalesReportsComponent } from './sales-reports/sales-reports.component';
import { ServiceReportComponent } from './service-report/service-report.component';



const routes: Routes = [
  {path:'SparesReports',component:AllReportsComponent},
  {path:'ServiceReport',component:ServiceReportComponent},
  {path:'SalesReports',component:SalesReportsComponent},
  { path : '' ,redirectTo: 'Dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
