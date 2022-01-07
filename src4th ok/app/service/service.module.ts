import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import { JobCardComponent } from './job-card/job-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDateRangeModule } from 'ngx-daterange';
// import { JobcardOpeningComponent } from './jobcard-opening/jobcard-opening.component';
import { ServiceGatepassComponent } from './service-gatepass/service-gatepass.component';


@NgModule({
  declarations: [JobCardComponent,  ServiceGatepassComponent],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    ReactiveFormsModule,NgxDateRangeModule,
    FormsModule,
  ]
})
export class ServiceModule { }