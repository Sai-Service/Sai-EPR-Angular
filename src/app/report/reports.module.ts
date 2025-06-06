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
import { ServerReportComponent } from './server-report/server-report.component';
import { PaintReportsComponent } from './paint-reports/paint-reports.component';
import { TemplateDownloadComponent } from './template-download/template-download.component';
import { ShellReportComponent } from './shell-report/shell-report.component';
import { PetrolPumpReportComponent } from './petrol-pump-report/petrol-pump-report.component';
import { PaintReportsNewComponent } from './paint-reports-new/paint-reports-new.component';



@NgModule({
  declarations: [ServiceReportComponent, SalesReportsComponent, AccountsReportComponent, SparesReportsComponent, AccessoriesReportComponent,ServerReportComponent, PaintReportsComponent, TemplateDownloadComponent, ShellReportComponent, PetrolPumpReportComponent, PaintReportsNewComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ReactiveFormsModule,NgxDateRangeModule,
    FormsModule,
  ]
})
export class ReportsModule { }
