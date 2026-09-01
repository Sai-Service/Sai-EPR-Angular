import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItCorrectionForAllComponent } from './it-correction-for-all/it-correction-for-all.component';
import { EwschememasteruploadComponent } from './ewschememasterupload/ewschememasterupload.component';

const routes: Routes = [
  {path:'itCorrectionForAll',component:ItCorrectionForAllComponent},
  {path:'ewschememasterupload',component:EwschememasteruploadComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItCorrectionRoutingModule { }
