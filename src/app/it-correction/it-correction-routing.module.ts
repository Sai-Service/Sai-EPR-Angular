import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItCorrectionForAllComponent } from './it-correction-for-all/it-correction-for-all.component';

const routes: Routes = [
  {path:'itCorrectionForAll',component:ItCorrectionForAllComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItCorrectionRoutingModule { }
