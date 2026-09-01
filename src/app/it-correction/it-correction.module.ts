import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ItCorrectionRoutingModule } from './it-correction-routing.module';
import { ItCorrectionForAllComponent } from './it-correction-for-all/it-correction-for-all.component';
import { EwschememasteruploadComponent } from './ewschememasterupload/ewschememasterupload.component';


@NgModule({
  declarations: [ItCorrectionForAllComponent, EwschememasteruploadComponent],
  imports: [
    CommonModule,
    ItCorrectionRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ItCorrectionModule { }
