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
import { EmployeeMasterComponent } from './employee-master/employee-master.component';
import { CustomerMasterComponent } from './customer-master/customer-master.component';
import { GlCodeCombinationComponent } from './gl-code-combination/gl-code-combination.component';
import { HsnSacMasterComponent } from './hsn-sac-master/hsn-sac-master.component';
import { OPMasterDtoComponent } from './opmaster-dto/opmaster-dto.component';
import { JaiRegimeMasterComponent } from './jai-regime-master/jay-regime-master.component';
import { TaxAccountsComponent } from './tax-accounts/tax-accounts.component';
import { TaxCategoryMasterComponent } from './tax-category-master/tax-category-master.component';
import { JaiTaxCategoryLineComponent } from './jai-tax-category-line/jai-tax-category-line.component';
import { JaiTaxRatesMasterComponent } from './jai-tax-rates-master/jai-tax-rates-master.component';
import { JaiTaxTypeComponent } from './jai-tax-type/jai-tax-type.component';
import { PoReceiptFormComponent } from './po-receipt-form/po-receipt-form.component';
import { FlexFieldComponent} from './flex-field/flex-field.component';
import { PricelistMasterComponent } from './pricelist-master/pricelist-master.component';
import { OmGruopMasterComponent } from './om-gruop-master/om-gruop-master.component';
import { OrderTypeMasterComponent } from './order-type-master/order-type-master.component';
import { WsVehicleMasterComponent } from './ws-vehicle-master/ws-vehicle-master.component';
import { VariantMasterComponent } from './variant-master/variant-master.component';
import { TaxThresholdSetupComponent } from './tax-threshold-setup/tax-threshold-setup.component';
import {SubinventoryMasterComponent}from './subinventory-master/subinventory-master.component';
import { PendingShipmentListComponent } from './pending-shipment-list/pending-shipment-list.component';
import { ItemMasterLocatorComponent } from './item-master-locator/item-master-locator.component';
import { ReceivableTranstypeMasterComponent } from './receivable-transtype-master/receivable-transtype-master.component';
import { CustomerRelationMasterComponent } from './customer-relation-master/customer-relation-master.component';
import { ItemMasterNewComponent } from './item-master-new/item-master-new.component';
import { ItemRelatedMasterComponent } from './item-related-master/item-related-master.component';
import { VariantMasterNewComponent } from './variant-master-new/variant-master-new.component';


// import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [DivisionMasterComponent, 
    OrganizationMasterComponent, 
    LocationMasterComponent, 
    CompanyMasterComponent, 
    FNDCommonLookupComponent, 
    ItemCategortComponent, 
    SupplierMasterComponent, 
    LocatorMasterComponent, 
    ItemMasterComponent, 
    CommonMasterComponent, 
    DocumentSequenceMasterComponent, 
    EpmloyeeMasterComponent, 
    EmployeeMasterComponent,
    CustomerMasterComponent, 
    GlCodeCombinationComponent, 
    HsnSacMasterComponent, 
    OPMasterDtoComponent, 
    JaiRegimeMasterComponent, 
    TaxAccountsComponent,
    TaxCategoryMasterComponent, 
    JaiTaxCategoryLineComponent, 
    JaiTaxRatesMasterComponent, 
    JaiTaxTypeComponent,
    FlexFieldComponent, 
    PricelistMasterComponent, 
    OmGruopMasterComponent, 
    OrderTypeMasterComponent, 
    WsVehicleMasterComponent, 
    VariantMasterComponent, 
    SubinventoryMasterComponent,
    TaxThresholdSetupComponent,
    PendingShipmentListComponent,
    ItemMasterLocatorComponent,
    ReceivableTranstypeMasterComponent,
    CustomerRelationMasterComponent,
    ItemMasterNewComponent,
    ItemRelatedMasterComponent,
    VariantMasterNewComponent,  ],
    
  // declarations: [DivisionMasterComponent, OrganizationMasterComponent, LocationMasterComponent, CompanyMasterComponent, FNDCommonLookupComponent, ItemCategortComponent, SupplierMasterComponent, LocatorMasterComponent, ItemMasterComponent, CommonMasterComponent, DocumentSequenceMasterComponent, EpmloyeeMasterComponent, CustomerMasterComponent, GlCodeCombinationComponent, HsnSacMasterComponent, OPMasterDtoComponent, JaiRegimeMasterComponent, TaxAccountsComponent, TaxCategoryMasterComponent, JaiTaxCategoryLineComponent, JaiTaxRatesMasterComponent, JaiTaxTypeComponent,FlexFieldComponent, PricelistMasterComponent, OmGruopMasterComponent, OrderTypeMasterComponent,SubinventoryMasterComponent,SaiEwSchemeComponent],
  
 imports: [
    CommonModule,
    MasterRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})


export class MasterModule { }
