import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { FaRoutingModule } from './famaster-routing.module';
import { FiscalYearComponent } from './fa-master/fiscal-year/fiscal-year.component';
import { FaCalenderComponent } from './fa-master/fa-calender/fa-calender.component';
import { ProrateConventionsComponent } from './fa-master/prorate-conventions/prorate-conventions.component';
import { DepriciationMethodComponent } from './fa-master/depriciation-method/depriciation-method.component';
import { BookControlComponent } from './fa-master/book-control/book-control.component';
import { AssetCategoriesComponent } from './fa-master/asset-categories/asset-categories.component';
import { AssetAdditionComponent } from './fa-transaction/asset-addition/asset-addition.component';

@NgModule({
  declarations: [
   
  FiscalYearComponent,
   
  FaCalenderComponent,
   
  ProrateConventionsComponent,
   
  DepriciationMethodComponent,
   
  BookControlComponent,
   
  AssetCategoriesComponent,
   
  AssetAdditionComponent],
    
  // declarations: [DivisionMasterComponent, OrganizationMasterComponent, LocationMasterComponent, CompanyMasterComponent, FNDCommonLookupComponent, ItemCategortComponent, SupplierMasterComponent, LocatorMasterComponent, ItemMasterComponent, CommonMasterComponent, DocumentSequenceMasterComponent, EpmloyeeMasterComponent, CustomerMasterComponent, GlCodeCombinationComponent, HsnSacMasterComponent, OPMasterDtoComponent, JaiRegimeMasterComponent, TaxAccountsComponent, TaxCategoryMasterComponent, JaiTaxCategoryLineComponent, JaiTaxRatesMasterComponent, JaiTaxTypeComponent,FlexFieldComponent, PricelistMasterComponent, OmGruopMasterComponent, OrderTypeMasterComponent,SubinventoryMasterComponent,SaiEwSchemeComponent],
  
 imports: [
    CommonModule,
    FaRoutingModule,
    ReactiveFormsModule,
    FormsModule,

  ]
})
export class faMasterModule { }
