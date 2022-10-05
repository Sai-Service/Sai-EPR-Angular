import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessoriesReportComponent } from './accessories-report/accessories-report.component';
import { AccountsReportComponent } from './accounts-report/accounts-report.component';
import { AllReportsComponent } from './all-reports.component';
import { SalesReportsComponent } from './sales-reports/sales-reports.component';
import { ServiceReportComponent } from './service-report/service-report.component';
import { SparesReportsComponent } from './spares-reports/spares-reports.component';
import { ServerReportComponent } from './server-report/server-report.component';



const routes: Routes = [
  {path:'SparesReports',component:AllReportsComponent},
  {path:'ServiceReport',component:ServiceReportComponent},
  {path:'SalesReports',component:SalesReportsComponent},
  {path:'AccountsRepor',component:AccountsReportComponent},
  {path:'SparesReportsNew',component:SparesReportsComponent},
  {path:'AccessoriesReport',component:AccessoriesReportComponent},
  {path:'ServerReport',component:ServerReportComponent},
  { path : '' ,redirectTo: 'Dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
