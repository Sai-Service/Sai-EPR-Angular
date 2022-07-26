import { NgModule, Component } from '@angular/core';
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
import { FlexFieldComponent } from './flex-field/flex-field.component';
import { PricelistMasterComponent } from './pricelist-master/pricelist-master.component';
import { OmGruopMasterComponent } from './om-gruop-master/om-gruop-master.component';
import { OrderTypeMasterComponent } from './order-type-master/order-type-master.component';
import { WsVehicleMasterComponent } from './ws-vehicle-master/ws-vehicle-master.component';
import { VariantMasterComponent } from './variant-master/variant-master.component';
import { TaxThresholdSetupComponent } from './tax-threshold-setup/tax-threshold-setup.component';
import { SubinventoryMasterComponent } from './subinventory-master/subinventory-master.component';
import { PendingShipmentListComponent } from './pending-shipment-list/pending-shipment-list.component';
import { ItemMasterLocatorComponent } from './item-master-locator/item-master-locator.component';
import { ReceivableTranstypeMasterComponent } from './receivable-transtype-master/receivable-transtype-master.component';
import { CustomerRelationMasterComponent } from './customer-relation-master/customer-relation-master.component';
import { ItemMasterNewComponent } from './item-master-new/item-master-new.component';
import { ItemRelatedMasterComponent } from './item-related-master/item-related-master.component';

// import { SubinventoryTransferComponent } from '../transaction/subinventory-transfer/subinventory-transfer.component';



// import { FlexFieldComponent } from './flex-field/flex-field.component';



const routes: Routes = [
  {path:'division', component:DivisionMasterComponent},
  {path:'orgMaster', component:OrganizationMasterComponent},
  {path:'companyMaster', component:CompanyMasterComponent},
  {path:'locatioMaster', component:LocationMasterComponent},
  {path:'fndCmmonLookup', component:FNDCommonLookupComponent},
  {path:'ItemCategory',component:ItemCategortComponent},
  {path:'SupplierMaster', component:SupplierMasterComponent},
  {path:'LocatorMaster', component:LocatorMasterComponent},
  {path:'Dashboard',component:DashboardComponent},
  {path:'ItemMaster', component:ItemMasterComponent},
  {path:'CommonMaster', component:CommonMasterComponent},
  {path:'DocumentSequenceMaster',component:DocumentSequenceMasterComponent},
  {path:'EmployeeMaster', component:EpmloyeeMasterComponent},
  {path:'EmployeesMaster', component:EmployeeMasterComponent},
  {path:'customerMaster', component:CustomerMasterComponent},
  {path:'GlCodeCombination', component:GlCodeCombinationComponent},
  {path:'HsnSacMaster', component:HsnSacMasterComponent},
  {path:'OPMasterDto',component:OPMasterDtoComponent},
  {path:'OPMasterDto/:poNo',component:OPMasterDtoComponent},
  {path:'OPMasterDto/:poNo/:locId',component:OPMasterDtoComponent},
  {path:'JaiRegimeMaster', component:JaiRegimeMasterComponent},
  {path:'TaxAccounts', component:TaxAccountsComponent},
  {path:'taxCategoryMaster', component:TaxCategoryMasterComponent},
  {path:'JaiTaxCategoryLine', component:JaiTaxCategoryLineComponent},
  {path:'jaiTaxRatesMaster', component:JaiTaxRatesMasterComponent},
  {path:'JaiTaxType', component:JaiTaxTypeComponent},
  {path:'PoReceiptForm',component:PoReceiptFormComponent},
  {path:'FlexField',component:FlexFieldComponent},
  {path:'pricelistMaster', component:PricelistMasterComponent},
  {path:'OMGRP',component:OmGruopMasterComponent},
  {path:'orderType', component:OrderTypeMasterComponent},
  {path:'WsVehicleMaster', component:WsVehicleMasterComponent },
  {path:'VariantMaster', component:VariantMasterComponent },
  {path:'TaxThresholdSetup', component:TaxThresholdSetupComponent  },
  // {path:'PoReceiptForm/:receiptNo',component:PoReceiptFormComponent},
  {path:'PoReceiptForm/:segment1',component:PoReceiptFormComponent},
  {path:'PoReceiptForm/:segment1/:accountLocId',component:PoReceiptFormComponent},
  {path:'PoReceiptForm/:trxNum/:catg',component:PoReceiptFormComponent},
  {path:'itemMasterNew',component:ItemMasterNewComponent},
  {path:'SubinventoryMaster',component:SubinventoryMasterComponent},
  {path:'PendingShipmentList',component:PendingShipmentListComponent},
  {path:'PoReceiptForm/:shipmentNumber',component:PoReceiptFormComponent},
  {path:'ItemMasterLocator',component:ItemMasterLocatorComponent},
  {path:'ReceivableTranstypeMaster',component:ReceivableTranstypeMasterComponent},
  {path:'CustomerRelationMaster',component:CustomerRelationMasterComponent},
  {path:'ItemRelatedMaster',component:ItemRelatedMasterComponent},
  // {path:'SubinventoryTransfer',component:SubinventoryTransferComponent},
  { path : '' ,redirectTo: 'Dashboard', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
