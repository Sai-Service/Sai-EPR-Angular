import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { MasterRoutingModule } from './master-routing.module';
import { DivisionMasterComponent } from './division-master/division-master.component';
import { OrganizationMasterComponent } from './organization-master/organization-master.component';
import { LocationMasterComponent } from './location-master/location-master.component';
import { CompanyMasterComponent } from './company-master/company-master.component';
import { FNDCommonLookupComponent } from './fndcommon-lookup/fndcommon-lookup.component';
import { ItemCategortComponent } from './item-categort/item-categort.component';
import { SupplierMasterComponent } from './supplier-master/supplier-master.component';
import { LocatorMasterComponent } from './locator-master/locator-master.component';
import { ItemMasterComponent } from './item-master/item-master.component';
import { CommonMasterComponent } from './common-master/common-master.component';
import { DocumentSequenceMasterComponent } from './document-sequence-master/document-sequence-master.component';
import { EpmloyeeMasterComponent } from './epmloyee-master/epmloyee-master.component';
import { CustomerMasterComponent } from './customer-master/customer-master.component';
import { GlCodeCombinationComponent } from './gl-code-combination/gl-code-combination.component';
import { HsnSacMasterComponent } from './hsn-sac-master/hsn-sac-master.component';
import { OPMasterDtoComponent } from './opmaster-dto/opmaster-dto.component';
import { JaiRegimeMasterComponent } from './jai-regime-master/jay-regime-master.component';
// import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [DivisionMasterComponent, OrganizationMasterComponent, LocationMasterComponent, CompanyMasterComponent, FNDCommonLookupComponent, ItemCategortComponent, SupplierMasterComponent, LocatorMasterComponent, ItemMasterComponent, CommonMasterComponent, DocumentSequenceMasterComponent, EpmloyeeMasterComponent, CustomerMasterComponent, GlCodeCombinationComponent, HsnSacMasterComponent, OPMasterDtoComponent, JaiRegimeMasterComponent],
  imports: [
    CommonModule,
    MasterRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MasterModule { }
