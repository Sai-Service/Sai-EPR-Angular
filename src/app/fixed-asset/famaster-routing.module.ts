import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaCommanMasterComponent } from './fa-master/fa-comman-master/fa-comman-master.component';
import { FiscalYearComponent } from './fa-master/fiscal-year/fiscal-year.component';
import{FaCalenderComponent} from './fa-master/fa-calender/fa-calender.component';
import{ProrateConventionsComponent} from './fa-master/prorate-conventions/prorate-conventions.component';
import{DepriciationMethodComponent} from './fa-master/depriciation-method/depriciation-method.component';
import { CalendarComponent } from 'ngx-daterange';
import { BookControlComponent } from './fa-master/book-control/book-control.component';
import { AssetCategoriesComponent } from './fa-master/asset-categories/asset-categories.component';
import { AssetAdditionComponent } from './fa-transaction/asset-addition/asset-addition.component';
import { FaRetirementComponent } from './fa-transaction/fa-retirement/fa-retirement.component';

const routes: Routes = [
  {path:'FACommonMaster',component:FaCommanMasterComponent},
  {path:'FiscalYear',component:FiscalYearComponent},
  {path:'FACalender',component:FaCalenderComponent},
  {path:'ProrateConvention',component:ProrateConventionsComponent},
  {path:'DepriciationMethod',component:DepriciationMethodComponent},
  {path:'BookControl',component:BookControlComponent},
  {path:'AssetCategories',component:AssetCategoriesComponent},
  {path:'AssetAddition',component:AssetAdditionComponent},
  {path:'AssetRetirement',component:FaRetirementComponent},
    // {path:'FACalender',component:facal}
  {path : '' ,redirectTo: 'Dashboard', pathMatch: 'full'}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaRoutingModule { }
