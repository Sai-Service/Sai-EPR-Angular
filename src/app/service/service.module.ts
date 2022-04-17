import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import { JobCardComponent } from './job-card/job-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDateRangeModule } from 'ngx-daterange';
// import { JobcardOpeningComponent } from './jobcard-opening/jobcard-opening.component';
import { ServiceGatepassComponent } from './service-gatepass/service-gatepass.component';
import { VehicleServiceHistoryComponent } from './vehicle-service-history/vehicle-service-history.component';
import { LaborListComponent } from './labor-list/labor-list.component';


@NgModule({
  declarations: [JobCardComponent,  ServiceGatepassComponent, VehicleServiceHistoryComponent, LaborListComponent],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    ReactiveFormsModule,NgxDateRangeModule,
    FormsModule,
  ]
})
export class ServiceModule { }
