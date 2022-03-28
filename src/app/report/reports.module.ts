import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ServiceReportComponent } from './service-report/service-report.component';
import { SalesReportsComponent } from './sales-reports/sales-reports.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDateRangeModule } from 'ngx-daterange';
import { AccountsReportComponent } from './accounts-report/accounts-report.component';
import { SparesReportsComponent } from './spares-reports/spares-reports.component';
import { AccessoriesReportComponent } from './accessories-report/accessories-report.component';



@NgModule({
  declarations: [ServiceReportComponent, SalesReportsComponent, AccountsReportComponent, SparesReportsComponent, AccessoriesReportComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ReactiveFormsModule,NgxDateRangeModule,
    FormsModule,
  ]
})
export class ReportsModule { }
