import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyMasterComponent } from './company-master/company-master.component';
import { DivisionMasterComponent } from './division-master/division-master.component';
import { LocationMasterComponent } from './location-master/location-master.component';
import { OrganizationMasterComponent } from './organization-master/organization-master.component';
import { FNDCommonLookupComponent } from './fndcommon-lookup/fndcommon-lookup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemCategortComponent } from './item-categort/item-categort.component';
import { SupplierMasterComponent } from './supplier-master/supplier-master.component';
import { LocatorMasterComponent } from './locator-master/locator-master.component';
import { ItemMasterComponent } from './item-master/item-master.component';
import { CommonMasterComponent } from './common-master/common-master.component';
import { DocumentSequenceMasterComponent } from './document-sequence-master/document-sequence-master.component';
import { EpmloyeeMasterComponent } from './epmloyee-master/epmloyee-master.component';
import { CustomerMasterComponent } from './customer-master/customer-master.component';

const routes: Routes = [
  {path:'division', component:DivisionMasterComponent},
  {path:'orgMaster', component:OrganizationMasterComponent},
  {path:'companyMaster', component:CompanyMasterComponent},
  {path:'locatioMaster', component:LocationMasterComponent},
  {path:'fndCmmonLookup', component:FNDCommonLookupComponent},
  {path:'ItemCategory',component:ItemCategortComponent},
  {path:'suplierMaster', component:SupplierMasterComponent},
  {path:'LocatorMaster', component:LocatorMasterComponent},
  {path:'Dashboard',component:DashboardComponent},
  {path:'ItemMaster', component:ItemMasterComponent},
  {path:'CommonMaster', component:CommonMasterComponent},
  {path:'DocumentSequenceMaster',component:DocumentSequenceMasterComponent},
  {path:'EmployeeMaster', component:EpmloyeeMasterComponent},
  {path:'customerMaster', component:CustomerMasterComponent},
  { path : '' ,redirectTo: 'Dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
}) 
export class MasterRoutingModule { }
