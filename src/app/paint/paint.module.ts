import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDateRangeModule } from 'ngx-daterange';

import { PaintRoutingModule } from './paint-routing.module';
import { PaintIssueDpComponent } from './paint-issue-dp/paint-issue-dp.component';
import { PaintCreationComponent } from './paint-creation/paint-creation.component';
import { PaintMixingMasterComponent } from './paint-mixing-master/paint-mixing-master.component';


@NgModule({
  declarations: [PaintIssueDpComponent, PaintCreationComponent, PaintMixingMasterComponent],
  imports: [
    CommonModule,
    PaintRoutingModule,
    ReactiveFormsModule,
    NgxDateRangeModule,
    FormsModule
  ]
})
export class PaintModule { }


