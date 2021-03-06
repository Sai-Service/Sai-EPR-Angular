import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  httpclient: any;
  headers: any;

  // ServerUrl='http://saireplica.horizon.org:8080/ErpReplica';
  ServerUrl='http://localhost:8081';
  // ServerUrl='http://saihorizon.com:8080/ErpReplica'

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
   }

   ////////////////////////////////////////Comman Lov//////////////////////////////////////////////////
   statusList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
  }
  memberTicketNo(locCode, deptId,divisionId): Observable<any> {
    return this.http.get(this.ServerUrl +`/empMst/teamMemberList?locId=${locCode}&deptId=${deptId}&divisionId=${divisionId}`);
  }
  teamRoleListFN(deptName): Observable<any> {
    return this.http.get(this.ServerUrl +`/cmnLookup/TeamRole/${deptName}`);
  }
  OUIdList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/opUnit');
  }
  StateList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/cmnLookup/States');
  }
  cityList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/cmnLookup/City');
  }
  regionList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/cmnLookup/Region');
  }
  DivisionIDList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/divMst');
  }
  poTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/cmnLookup/PoTypes');
  }
  APiNVOICEtYPETypeList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/cmnLookup/type/AP INVOICE TYPE');
  }
  APitemtYPEList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/cmnLookup/type/AP Item TYPE');
  }
  invItemList1(): Observable<any> {
    return this.http.get(this.ServerUrl +'/itemMst');
  }


  invItemListEw(mEwType,mVariant,mPeriod): Observable<any> {
    // alert("type,varinat,period   "+ mEwType +","+mVariant +","+mPeriod)
    return this.http.get(this.ServerUrl + `/itemMst/ewItems?ewType=${mEwType}&variant=${mVariant}&ewPeriod=${mPeriod} `);
   }


  companyCodeList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/CompMst');
  }
  YesNoList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/cmnLookup/YesNo');
  }
  SSitemTypeListFn(): Observable<any> {
    return this.http.get(this.ServerUrl +'/itemCategory/type');
  }
  subTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/cmnLookup/SubCtg');
  }
  mainTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/cmnLookup/MainCtg');
  }
  locationIdList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/locationMst');
  }
  locationCodeList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/fndAcctLookup/lookupTypeWise/SS_Location');
  }
  subinventoryIdList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/subInvMst');
  }
  titleList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/cmnLookup/TitleList');
  }
  DepartmentList(): Observable<any> {

    return this.http.get(this.ServerUrl +'/cmnLookup/DeptList');
  }
  empIdListFn(): Observable<any> {
    return this.http.get(this.ServerUrl +'/empMst/All');
  }
  DepartmentListById(dept): Observable<any> {
    return this.http.get(this.ServerUrl +`/divMst/${dept}`);
  }
  emplIdList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/empMst');
  }
  DesignationList(Department): Observable<any> {
    return this.http.get(this.ServerUrl +`/cmnLookup/Designation/${Department}`);
  }
  recvTypeIdList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/cmnLookup/DeptList');
  }

  invItemList(itemType,deptName):Observable<any> {
    const REQUEST_PARAMS = new HttpParams().set('itemType', itemType)
    .set('dept', deptName)

    const REQUEST_URI = this.ServerUrl +'/itemMst/ItemType';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,

    });
  }

  supplierCodeList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/supp');
  }

  supplierCodeList1(): Observable<any> {
    return this.http.get(this.ServerUrl +'/supp');
  }

  taxCategoryList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/JaiTaxCatg/taxCate/PURCHASE');
  }

  createOrderTypeListFn(): Observable<any> {
    return this.http.get(this.ServerUrl +'/cmnLookup/CmnType/AccOrderType');
  }

  taxCategoryListForSALES(): Observable<any> {
    return this.http.get(this.ServerUrl +'/JaiTaxCatg/taxCate/SALES');
  }
  taxCategoryIgstListForSALES(): Observable<any> {
    return this.http.get(this.ServerUrl +'/JaiTaxCatg/getByCateTypeIGST1/SALES');
  }


 
  taxCategoryListForSALESwithstatetcs(customerId,loginOuId1,itemId,custOuId,deptName,tcs): Observable<any> {
    const REQUEST_PARAMS = new HttpParams().set('customerId', customerId)
    .set('loginOuId1', loginOuId1)
    .set('itemId', itemId)
    .set('custOuId', custOuId)
    .set('deptName',deptName)
    .set('tcs',tcs)
    const REQUEST_URI = this.ServerUrl +'/poHdr/potaxcal';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,
  
    });
  }


  taxCategoryListHSN(mPer,mType): Observable<any> {
    // alert("MTYPE= "+mType + "  MPER= " + mPer);
    return this.http.get(this.ServerUrl + `/JaiTaxCatg/taxCateGstPer?taxCatType=${mType}&gstPer=${mPer}`);
  }



  taxCategoryListPoInvoice(): Observable<any> {
    return this.http.get(this.ServerUrl +'/JaiTaxCatg/taxCate');
    // return this.http.get(this.ServerUrl +'/JaiTaxCatg/taxCate/Purchase');
  }
  // suppIdList(suppId, ouId): Observable<any> {
  //   return this.http.get(this.ServerUrl +`/supp/sites/${suppId}`);
  // }

  suppIdList(suppId, ouId) {
    const REQUEST_PARAMS = new HttpParams().set('suppId', suppId)
    .set('ouId', ouId)

    const REQUEST_URI = this.ServerUrl +'/supp/ouSites';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,

    });
  }

  suppIdList1(suppId, ouId) {
    const REQUEST_PARAMS = new HttpParams().set('suppId', suppId)
    .set('ouId', ouId)

    const REQUEST_URI = this.ServerUrl +'/supp/ouSites';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,

    });
  }
  siteIdList(siteId): Observable<any> {
    return this.http.get(this.ServerUrl +`/supp/site/${siteId}`);
  }
  segmentNameList(segmentName) : Observable<any> {
    return this.http.get(this.ServerUrl +`/glCodeCmbn/codeComb/${segmentName}`);
  }



//   taxCategoryList(): Observable<any> {
//   return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
// }
custTypeList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
}
classCodeTypeList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
}
getTaxCat(ouId): Observable<any> {
 // return this.http.get(this.ServerUrl + `/JaiTaxCatg/${ouId}`);
 return this.http.get(this.ServerUrl + `/taxCtgHeader/${ouId}`);
}
BranchList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/fndAcctLookup/lookupTypeWise/SS_Branch');
}
CostCenterList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/fndAcctLookup/lookupTypeWise/CostCentre');
}
NaturalAccountList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/fndAcctLookup/lookupTypeWise/NaturalAccount');
}
InterBrancList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/fndAcctLookup/lookupTypeWise/SS_Interbranch');
}
FutureList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/fndAcctLookup/lookupTypeWise/SS_Future');
}
SubAccountList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/fndAcctLookup/lookupTypeWise/SS_SubAccount');
}
/////////////IOT Transfer/////////////////////

iotOrderTypeList(ouId): Observable<any> {
  return this.http.get(this.ServerUrl +`/OrderTrnType/stkorder/${ouId}`);
}
getShiptoLoc(locId): Observable<any> {
  return this.http.get(this.ServerUrl +`/shippingNetwork/shiptoloc/${locId}`);
}
  /////////////////////////////////////////Division Master////////////////////////////////////////////
   public divisionMasterSubmit(divMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/divMst/divPost';
    return this.http.post(url, divMasterRecord, options);
  }
  getDiviSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/divMst');

  }
  getDiviSearchPach(divisionCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/divMst/divCode/${divisionCode}`);
  }
  // statusList(): Observable<any> {
  //   return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
  // }  OUIdList StateList
  UpdateDivMasterById(DivMasterRecord,divisionId) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/divMst/${divisionId}`);
    return this.http.put(url, DivMasterRecord, options);
  }

  getcommentsById(companyCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/ssCompanies/${companyCode}`,{ headers: this.headers });
}
//////////////////////////Company Master//////////////////////////////////////////////////////////

public CompanyMasterSubmit(companyMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/CompMst/ComanyMaster';
  return this.http.post(url, companyMasterRecord, options);
}

getcompanySearch(): Observable<any> {
  return this.http.get(this.ServerUrl + '/CompMst');

}


public commonMasterSubmit(commonMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/cmnLookup';
  return this.http.post(url, commonMasterRecord, options);
}

getCommonLookupSearch(searchText): Observable<any> {
  return this.http.get(this.ServerUrl + `/CompMst/${searchText}`);

}


UpdateCompanyMasterById(ComMasterRecord,compId) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + `/CompMst/${compId}`);
  return this.http.put(url, ComMasterRecord, options);
}
//////////////////////////Operating Unit Master////////////////////////////////////////////////////

public operatingUnitMasterSubmit(operatingUnitMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/opUnit/hrOperatingUnits';
  return this.http.post(url, operatingUnitMasterRecord, options);
}
// getoperatingUnitSearch(): Observable<any> {
//   return this.http.get(this.ServerUrl + '/opUnit');

// }
getoperatingUnitSearch(pageNo): Observable<any> {
  return this.http.get(this.ServerUrl + `/opUnit?page=${pageNo}&size=5`);

}

UpdateoperatingUnitMasterById(operatingUnitMasterRecord,ouId) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + `/opUnit/${ouId}`);
  return this.http.put(url, operatingUnitMasterRecord, options);
}
///////////////////////////////////// Location Master///////////////////////////////////////////
public LocationMasterSubmit(LocationMasterRecord) {
  const options = {
    headers: this.headers
  };
  // const url = this.ServerUrl + '/locationMst/postLoc';
  const url = this.ServerUrl + '/locationMst';
  return this.http.post(url, LocationMasterRecord, options);
}




getLocationSearch1(ouId): Observable<any> {
  return this.http.get(this.ServerUrl + `/locationMst/locListOuwise/${ouId}`);
}
getLocationSearch(): Observable<any> {
  return this.http.get(this.ServerUrl + '/locationMst');
}
UpdateLocationMasterById(LocationMasterRecord,locId) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + `/locationMst/${locId}`);
  return this.http.put(url, LocationMasterRecord, options);
}

///////////////////////////////// Sales Order Gruop Master ////////

getGruopSearch(teamName,ouId,locId): Observable<any> {
  return this.http.get(this.ServerUrl + `/teamMaster/Team?teamName=${teamName}&ouId=${ouId}&locId=${locId}`);
}

leadTicketNoList(locId,deptId): Observable<any> {
  // return this.http.get(this.ServerUrl + `/empMst/EmpLocDept?locId=${locId}&divisionId=${divisionId}&deptId=${deptId}`);
  return this.http.get(this.ServerUrl + `/empMst/teamList?locId=${locId}&deptId=${deptId}`);
}
public GroupMasterSubmit(LocationMasterRecord) {
  const options = {
    headers: this.headers
  };
  // const url = this.ServerUrl + '/locationMst/postLoc';
  const url = this.ServerUrl + '/teamMaster/post';
  return this.http.post(url, LocationMasterRecord, options);
}



// public GroupMasterSubmit(LocationMasterRecord) {
//   const options = {
//     headers: this.headers
//   };
//   // const url = this.ServerUrl + '/locationMst/postLoc';
//   const url = this.ServerUrl + '/teamMaster/post';
//   return this.http.post(url, LocationMasterRecord, options);
// }


////////////////// Item Category Master /////////////////////////////////////////////////////////
getItemCategorySearch(): Observable<any> {
  return this.http.get(this.ServerUrl + '/itemCategory');
}
public ItemCatMastSubmit(ItemCategoryRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/itemCategory';
  return this.http.post(url, ItemCategoryRecord, options);
}
UpdateItemCatMastById(ItemCategoryRecord,categoryId) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + `/itemCategory/${categoryId}`);
  return this.http.put(url, ItemCategoryRecord, options);
}
////////////////////////////////Locator Master/////////////////////////////

 getLocatorMasterSearch(): Observable<any> {
  return this.http.get(this.ServerUrl + '/lctrmst');
}
public LocatorMasterSubmit(LocatorMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/lctrmst/locatormaster';
  return this.http.post(url, LocatorMasterRecord, options);
}

UpdateItemMasterById(itemMasterRecord,) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + `/itemMst/withInfo1`);
  return this.http.put(url, itemMasterRecord, options);
}

UpdateLocatorMasterById(LocatorMasterRecord,locatorId) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + `/lctrmst/${locatorId}`);
  return this.http.put(url, LocatorMasterRecord, options);
}

//////////////////////// Item Master/////////////////

public VehItemSubmit(VehItemRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/itemMst/withInfo1';
  return this.http.post(url, VehItemRecord, options);
}
categoryIdList(category): Observable<any> {
  return this.http.get(this.ServerUrl +`/itemCategory/type/${category}`);
}

uomList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/type/UOM');
}

costingList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
}

stockableList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
}

purchasableList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
}

costCenterList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/fndAcctLookup/lookupTypeWise/CostCentre');
}

hsnSacCodeList(): Observable<any> {
  // return this.http.get(this.ServerUrl +'/hsnsacMst/HsnSacCode');
  return this.http.get(this.ServerUrl +'/hsnSacMst');
}

hsnSacCodeDet(mHsnCode): Observable<any> {
  // alert("ms >> "+mHsnCode);
  return this.http.get(this.ServerUrl +`/hsnSacMst/${mHsnCode}`);
}



internalOrderList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
}

marginCategoryList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
}

assetItemList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
}

itemStatusList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
}

typeList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
}

mainModelList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/MulModel');
}

colorCodeList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/MulColour');
}

transactionTypeNameList(deptId,locId,ouId): Observable<any> {
  return this.http.get(this.ServerUrl +`/OrderTrnType/otList?deptId=${deptId}&locId=${locId}&ouId=${ouId}`);
}

payTermDescList(): Observable<any> {
  return this.http.get(this.ServerUrl +`/fndAcctLookup/lookupTypeWise/PaymentTerms`);
}

// taxCategoryListForSALES1(){}


taxCategoryListForSALES1(orderNumber, segment) {
  const REQUEST_PARAMS = new HttpParams().set('orderNumber', orderNumber)
    .set('segment', segment)

  const REQUEST_URI = this.ServerUrl + `/orderHeader/deallotment?orderNumber=${orderNumber}&segment=${segment}`;
  return this.http.put(REQUEST_URI, {
    params: REQUEST_PARAMS,

  });
}


salesRepNameList(ouId,locId,dept): Observable<any> {
  return this.http.get(this.ServerUrl +`/teamMaster/StatusOuswise?ouId=${ouId}&locId=${locId}&dept=${dept}`);
}


variantCodeList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
}

manYaerList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
}

octraiBillDateList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
}

octraiTypeList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
}

warrantyStatusList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
}

ewStatusList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
}

ewPeriodList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
}

ewInsNameList(): Observable<any> {
  // return this.http.get(this.ServerUrl +'/Customer/ClassCode/INSURER');
  return this.http.get(this.ServerUrl +'/Customer/ClassCode/EWINSURER');
}

ewInsSiteList(customerId): Observable<any> {
  return this.http.get(this.ServerUrl +`/Customer/${customerId}`);
}

itemTypeList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/ItemType');
}

fuelTypeList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/type/FuelType');
}

McpPackageTypeList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/type/McpPackageType');
}

McpPackageCategoryList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/type/McpPackageCatg');
}

insNameList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/Customer/ClassCode/INSURER');
}

insSiteList(customerId): Observable<any> {
  return this.http.get(this.ServerUrl +`/Customer/${customerId}`);

}

ripsList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
}

twoToneList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
}

holdList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
}

holdReasonList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/HoldReason');
}
getItemCodePach(segment): Observable<any> {
  // return this.http.get(this.ServerUrl +`/itemMst/${segment}`);
  return this.http.get(this.ServerUrl +`/itemMst/bySegment/${segment}`);
}

GetCustomerSiteDetails(mCustomerId,mOuId): Observable<any> {
  // alert("customerId ,OuId :" +mCustomerId +" ,"+mOuId);
  return this.http.get(this.ServerUrl +`/Customer/custsite?customerId=${mCustomerId}&ouId=${mOuId}`);
}

////////////////////////////////Supplier Master///////////////////////////

// cityList(): Observable<any> {
//   return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
// }

// pinCodeList(): Observable<any> {
//   return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
// }

// stateList(): Observable<any> {
//   return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
// }



// ouList(): Observable<any> {
//   return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
// }


getsupplierMastSearch(): Observable<any> {
  return this.http.get(this.ServerUrl + '/supp');
}
getsearchBySuppCode(suppNo): Observable<any> {
  return this.http.get(this.ServerUrl + `/supp/bycode/${suppNo}`);
}

public SupliMasterSubmit(SupliMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/supp';
  return this.http.post(url, SupliMasterRecord, options);
}
SupliMasterSubmitForSite(SupliMasterRecord) {
  const options = {
    headers: this.headers
  };
  // const url = this.ServerUrl + '/supp/withSite';
  const url = this.ServerUrl + '/supp/site';
  return this.http.post(url, SupliMasterRecord, options);
}
UpdateSupliMasterById(SupliMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + '/supp');
  return this.http.put(url, SupliMasterRecord, options);
}
UpdateSiteSupliMasterById(SupliMasterRecord) {
  const options = {
    headers: this.headers
  };
  // const url = (this.ServerUrl + `/supp/${suppId}`);
  const url = (this.ServerUrl + '/supp/site');
  return this.http.put(url, SupliMasterRecord, options);
}
///////////////////////////common Master///////////////////////
cmnTypeList(): Observable<any>{return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');}
  applicationList(): Observable<any>{
    return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
  }
  //////////////////////////////////////document sequence master//////////
  getdocSeqSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/docsrlmst');
  }
  public docSeqMasterSubmit(docSeqMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/docsrlmst/docsrlmaster';
    return this.http.post(url, docSeqMasterRecord, options);
  }
  UpdatedocSeqMasterById(docSeqMasterRecord,docSrlId) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/docsrlmst/${docSrlId}`);
    return this.http.put(url, docSeqMasterRecord, options);
  }

  getLocationId(orgCode):Observable<any>{
    return this.http.get(this.ServerUrl +`/locationMst/locListOuwise/${orgCode}`);
  }

  getOrganizationId(divCode):Observable<any>{
    return this.http.get(this.ServerUrl +`/docsrlmst/divName/${divCode}`);
  }
  FinancialYear():Observable<any>{
    return this.http.get(this.ServerUrl +'/docsrlmst/getYear');
  }

  docTypeList():Observable<any>{
    return this.http.get(this.ServerUrl +'/fndAcctLookup/lookupTypeWise/DocType');
  }
  getTransType(transType,OrgId):Observable<any>{
    return this.http.get(this.ServerUrl +`/docsrlmst/getTransTy?trnsType=${transType}&ouId=${OrgId}`)
  }
  getSrlNo(doctype,trantype):Observable<any>{
    return this.http.get(this.ServerUrl +`/docsrlmst/getTypeDtls?trnsType=${doctype}&TypeId=${trantype}`)
  }
  getcoCent(deptype):Observable<any>{
    return this.http.get(this.ServerUrl +`/cmnLookup/lookup?codeDesc=${deptype}&cmnType=Dept`)
  }
  /////////////////////////////EMPLOYEE MASTER////////////////////////////

 getEmpSearch(): Observable<any> {
  // return this.http.get(this.ServerUrl + '/empMst');
  return this.http.get(this.ServerUrl + '/empMst/All ');
}
getEmpIdDetails(ticketNo): Observable<any> {
  return this.http.get(this.ServerUrl + `/empMst/EmpTicket/${ticketNo}`);
}


getEmpIdDetails1(fullName): Observable<any> {
  return this.http.get(this.ServerUrl + `/empMst/EmpSearchByName?fullName=${fullName}`);
}


public EmployeeMasterSubmit(EmpMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/empMst';
  return this.http.post(url, EmpMasterRecord, options);
}
UpdateEmpMasterById(EmpMasterRecord,emplId) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + `/empMst/${emplId}`);
  return this.http.put(url, EmpMasterRecord, options);
}
//////////////////////////////Document Sequence master///////////////////////
// getdocSeqSearch(): Observable<any> {
//   return this.http.get(this.ServerUrl + '/docsrlmst');
// }
// public docSeqMasterSubmit(docSeqMasterRecord) {
//   const options = {
//     headers: this.headers
//   };
//   const url = this.ServerUrl + '/docsrlmst/docsrlmaster';
//   return this.http.post(url, docSeqMasterRecord, options);
// }
// UpdatedocSeqMasterById(docSeqMasterRecord,docSrlId) {
//   const options = {
//     headers: this.headers
//   };
//   const url = (this.ServerUrl + `/docsrlmst/${docSrlId}`);
//   return this.http.put(url, docSeqMasterRecord, options);
// }
////////////////////////Customer master//////////////////
UpdateCustMasterById(CustMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + '/Customer');
  return this.http.put(url, CustMasterRecord, options);
}
UpdateCustExeSiteMasterById(CustMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + '/Customer/site');
  return this.http.put(url, CustMasterRecord, options);
}
public CustMasterOnlySitSubmit(CustMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/Customer/site';
  return this.http.post(url, CustMasterRecord, options);
}
public CustMasterSubmit(CustMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/Customer/withSite';
  return this.http.post(url, CustMasterRecord, options);
}
getsearchByAccountNo(customerId1): Observable<any> {
  return this.http.get(this.ServerUrl +  `/Customer/CustomerId1/${customerId1}`);
}
/////////AccountEnquiry////////////////////
public FinancialPeriod():Observable<any>{
  return this.http.get(this.ServerUrl+'/glPeriod/periodName');
}

public AccountEnquirySearch(AccountEnquiryRecord):Observable<any>{
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/glHeader/glEnquiry';
  return this.http.post(url, AccountEnquiryRecord, options);
}
public viewAccountingjv(JVNO):Observable<any>
{
  return this.http.get(this.ServerUrl+`/glHeader/receiptNoWise/${JVNO}`);
}
/////////////////////////////HSN-SAC CODE//////////////////////
getHsnSacSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/hsnsacMst');
  }

  public HSNSACMasterSubmit(HsnSacMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/hsnsacMst';
    return this.http.post(url, HsnSacMasterRecord, options);
  }

UpdateHSNMasterById(HsnMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + '/hsnsacMst');
  return this.http.put(url, HsnMasterRecord, options);
}
///////////////////////////Purchese order/////////////////

TransactionNatureList(): Observable<any> {
  return this.http.get(this.ServerUrl + '/cmnLookup/TranNature');
}
purchaseLocationList(temp): Observable<any> {
  // return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_Location');
  return this.http.get(this.ServerUrl + `/fndAcctLookup/lookupTypeBrLoc?lookupType=SS_Branch&lookupValue=${temp}`);
  // http://localhost:8081/fndAcctLookup/lookupTypeBrLoc?lookupType=SS_Branch&lookupValue=${temp}

}

getsearchByPOHeder(poNo): Observable<any> {
  return this.http.get(this.ServerUrl + `/poHdr/poNum/${poNo}`);
}




cancelledPO(poNo) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + `/poHdr/poCancel/${poNo}`);
  return this.http.put(url, poNo, options);
}


public poSubmit(poMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/poHdr';
  return this.http.post(url, poMasterRecord, options);
}

public applyPOTax(poMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/poHdr/apply';
  return this.http.post(url, poMasterRecord, options);
}

ApprovePo(ApprovePoRecord,segment1) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + `/poHdr/poApprove/${segment1}`);
  return this.http.put(url, ApprovePoRecord, options);
}

UpdatePoDetails(ApprovePoRecord) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + '/poHdr');
  return this.http.put(url, ApprovePoRecord, options);
}

ItemDetailsList(invItemId, taxCat, billTo):Observable<any> {
  const REQUEST_PARAMS = new HttpParams().set('itemId', invItemId)
  .set('taxCategoryName', taxCat)
  .set('locId', billTo)
  const REQUEST_URI = this.ServerUrl +'/itemMst/ItemDetails';
  return this.http.get(REQUEST_URI, {
    params: REQUEST_PARAMS,

  });
}

expenceItemDetailsList(invItemId):Observable<any>{
  return this.http.get(this.ServerUrl +`/itemMst/ItemDetailsExp/${invItemId}`);
}


taxCalforItemWithVOR(itemId,taxCatId,diss,baseAmount,vorAmt,drfAmt) {
  const REQUEST_PARAMS = new HttpParams().set('itemId', itemId)
  .set('baseAmt', baseAmount)
  .set('taxCateId', taxCatId)
  .set('disAmt', diss)
  .set('vorAmt',vorAmt)
  .set('drfAmt',drfAmt)
  const REQUEST_URI = this.ServerUrl +'/poHdr/potaxcal';
  return this.http.get(REQUEST_URI, {
    params: REQUEST_PARAMS,

  });
}

taxCalforItem(itemId,taxCatId,diss,baseAmount) {
  const REQUEST_PARAMS = new HttpParams().set('itemId', itemId)
  .set('baseAmt', baseAmount)
  .set('taxCateId', taxCatId)
  .set('disAmt', diss)
  const REQUEST_URI = this.ServerUrl +'/poHdr/potaxcal';
  return this.http.get(REQUEST_URI, {
    params: REQUEST_PARAMS,

  });
}


taxCalforItemwithMulDisc(itemId,taxCatId,baseAmount,diss1,diss2,diss3,diss4,diss5) {
  const REQUEST_PARAMS = new HttpParams().set('itemId', itemId)
  .set('baseAmt', baseAmount)
  .set('taxCateId', taxCatId)
  .set('disAmt1', diss1)
  .set('disAmt2', diss2)
  .set('disAmt3', diss3)
  .set('disAmt4', diss4)
  .set('disAmt5', diss5)
  const REQUEST_URI = this.ServerUrl +'/poHdr/potaxcal';
  return this.http.get(REQUEST_URI, {
    params: REQUEST_PARAMS,

  });
}

taxCalforItem1( ouId, locId, baseAmount, taxCategoryId, diss ){
  const REQUEST_PARAMS = new HttpParams().set('ouId', ouId)
  .set('locId', locId)
  .set('baseAmt', baseAmount)
  .set('taxCateId', taxCategoryId)
  .set('disAmt1', diss)

  const REQUEST_URI = this.ServerUrl +'/arInv/arTaxcal';
  return this.http.get(REQUEST_URI, {
    params: REQUEST_PARAMS,

  });
}
distributionApi1(custTrxTypeId, ouId, locId,basicAmt,extendedAmount){
  const REQUEST_PARAMS = new HttpParams().set('custTrxTypeId', custTrxTypeId)
  .set('ouId',ouId)
  .set('locId', locId)
  .set('invAmount',extendedAmount )
  .set('taxableAmt', basicAmt )

  const REQUEST_URI = this.ServerUrl +'/arInv/invLnDis';
  return this.http.get(REQUEST_URI, {
    params: REQUEST_PARAMS,

  });
}
// addDiscount(totTaxAmt,taxTypeName)
public addDiscountM(poMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/poHdr/taxDetails';
  return this.http.post(url, poMasterRecord, options);
}
public addDiscount(totTaxAmt: number, taxTypeName: string) {
  const body = {
    'totTaxAmt': totTaxAmt,
    'taxTypeName': taxTypeName,
  };
  let options = {
    headers: this.headers
  };
  // const url = 'http://saireplica.horizon.org:8080/ErpReplica/loginpage';
  const url = 'http://saihorizon.com:8080/taxDetails';
  // const url = 'http://localhost:8081/taxDetails';
  console.log(body);
  return this.httpclient.post(url, body, options);
}

// distributionApi1(custTrxTypeId, ouId, locId,basicAmt,extendedAmount){
//   const REQUEST_PARAMS = new HttpParams().set('custTrxTypeId', custTrxTypeId)
//   .set('ouId',ouId)
//   .set('locId', locId)
//   .set('invAmount', basicAmt)
//   .set('taxableAmt', extendedAmount)

//   const REQUEST_URI = this.ServerUrl +'/arInv/invLnDis';
//   return this.http.get(REQUEST_URI, {
//     params: REQUEST_PARAMS,

//   });
// }

public completeInvoice(invoiceno)
{
  const option={
    headers:this.headers
  };
  const url=this.ServerUrl+`/arInv/invComplete/${invoiceno}`;
  return this.http.put(url,option);
}
////////////Stock Transfer////////
public stockTransferSubmit(stockTransferRecord)
{
  const option={
    headers:this.headers
  };
  const url=this.ServerUrl+'/mmtTrx';
  return this.http.post(url,stockTransferRecord,option);
}

getsearchByShipmentNo(shipNo):Observable<any>
{
  return this.http.get(this.ServerUrl+`/mmtTrx/stktrf/${shipNo}`)
}
ItemIdListDept(deptname,locId,subId):Observable<any>
{
  return this.http.get(this.ServerUrl+`/itemMst/itemDepartent?dept=${deptname}&locationId=${locId}&subInventoryId=${subId}`)
}
///////////OnHand////////////
searchByItem(itemid,locId:number):Observable<any>
{
  alert('--' + itemid +'--'+ locId);
  return this.http.get(this.ServerUrl+`/onhandqty/onhandlocitem?locId=${locId}&itemId=${itemid}`)
}
//////////Move Order//////////////
public moveOrderSubmit(MoveOrderRecord)
{
  const options={
    headers:this.headers
  };
  const url=this.ServerUrl+'/mtrlIssue';
  return this.http.post(url,MoveOrderRecord,options);
}
public reservePost(reserverecord)
{
  const options={
    headers:this.headers
  };
  const url=this.ServerUrl+`/reserveQty/insResrv`;
  return this.http.post(url,reserverecord,options);
}
WorkShopIssue(locId):Observable<any>{
  return this.http.get(this.ServerUrl+`/jobCard/jobNo?locId=${locId}`);
}
BillableType():Observable<any>{
  return this.http.get(this.ServerUrl+`/billableTy`);
}
searchall(locId):Observable<any>
{
  return this.http.get(this.ServerUrl+`/mmtTrx/PendingRecMyloc/${locId}`);
}
searchallatother(locId):Observable<any>
{
  return this.http.get(this.ServerUrl+`/mmtTrx/PendingRecOthLoc/${locId}`);
}
getreserqty(locId,itemID):Observable<any>{
  return this.http.get(this.ServerUrl+`/reserveQty/locResQty?locId=${locId}&invItemId=${itemID}`)
}
transType():Observable<any>{
  return this.http.get(this.ServerUrl +'/mtlTrxTypes/IPO');
}
getsearchByJob(jobno):Observable<any>{
 return this.http.get(this.ServerUrl+`/mtrlIssue/repair?repairNo=${jobno}`)
}
subInvCode(deptId):Observable<any>{
  return this.http.get(this.ServerUrl +`/subInvMst/wipissue/${deptId}`);
}
subInvCode1():Observable<any>{
  return this.http.get(this.ServerUrl +`/subInvMst/wipissue`);
}
issueByList(locId,deptId,divisionId):Observable<any>{
return this.http.get(this.ServerUrl +`/empMst/EmpLocDept?locId=${locId}&divisionId=${divisionId}&deptId=${deptId}`)
}
ItemIdList():Observable<any>{
  return this.http.get(this.ServerUrl+'/itemMst/category');
}
getfrmSubLoc(locId,invItemId,subInventoryId):Observable<any>{
  return this.http.get(this.ServerUrl+`/onhandqty/onhandlocsubinv?locId=${locId}&itemId=${invItemId}&subInventoryId=${subInventoryId}`)
}
getSearchByTrans(reqNo):Observable<any>{

  return this.http.get(this.ServerUrl+`/mtrlIssue/reqNum/${reqNo}`)

}
getItemDetail(itemid):Observable<any>{
  return this.http.get(this.ServerUrl +`/itemMst/${itemid}`)
}
////////////WorkShop Return/////////////////
transTypereturn():Observable<any>{
  return this.http.get(this.ServerUrl +'/mtlTrxTypes/IPOReturn');
  }
issueReturn(locId1):Observable<any>{
   return this.http.get(this.ServerUrl +`/mtrlIssue/wipjob?locId=${locId1}`);
    }
returnBillableType(repno):Observable<any>{
      return this.http.get(this.ServerUrl+`/mtrlIssue/jobBillable?repairNo=${repno}`);
    }
    itemLst(jobno,typ):Observable<any>{
      return this.http.get(this.ServerUrl+`/mtrlIssue/wipItems?jobNo=${jobno}&billable=${typ}`);
    }
    getsubInv(subId):Observable<any>{
      return this.http.get(this.ServerUrl+`/subInvMst/subinvname/${subId}`);
    }
    getretfrmSubLoc(locId,itemId,subId,jobno):Observable<any>{
      return this.http.get(this.ServerUrl+`/onhandqty/onhandJobNo/?locId=${locId}&itemId=${itemId}&subInventoryId=${subId}&jobNo=${jobno}`);
    }
/////////Subinventory/////////////
public saveSubinventory(subInvRecord)
{
  const options={
    headers:this.headers
  };
  const url=this.ServerUrl+'/subInvMst';
  return this.http.post(url,subInvRecord,options);
}

public getSubInvSearch():Observable<any>
{
  return this.http.get(this.ServerUrl+'/subInvMst');
}

UpdateSubInventory(SubinvRecord) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl +'/subInvMst');
  return this.http.put(url, SubinvRecord, options);
}
//////////Journal Voucher/////////////
public glPost(glPostValue)
{
  const options={
    headers:this.headers
  };
  const url=this.ServerUrl+'/glHeader';
  return this.http.post(url,glPostValue,options);
}

public glSave(glSaveValue)
{
  const options={
    headers:this.headers
  };
  const url=this.ServerUrl+'/glHeader/Save';
  return this.http.post(url,glSaveValue,options);
}

public glCopy(glCopyValue)
{
  const options={
    headers:this.headers
  };
  const url=this.ServerUrl+'/glHeader/Copy';
  return this.http.post(url,glCopyValue,options);
}
public glReverse(glReverseValue){
  const options={
    headers:this.headers
  };
  const url=this.ServerUrl+'/glHeader/Reverse';
  return this.http.post(url,glReverseValue,options);
}
JournalType():Observable<any>
{
  return this.http.get(this.ServerUrl+'/fndAcctLookup/lookupTypeWise/JVType');
}
SerchBydocseqval(docseqval):Observable<any>
{
  return this.http.get(this.ServerUrl+`/glHeader/docSeqValueWise/${docseqval}`);
}

//////////////////FlexField////////////////

public flexFieldSubmit(FlexFieldRecord)
{
  const options={
    headers:this.headers
  };
  const url=this.ServerUrl + '/FlexHeader' ;
  return this.http.post(url,FlexFieldRecord,options);
}



applList():Observable<any>{
  return this.http.get(this.ServerUrl +`/fndAppl`);
}

getTitle(applId):Observable<any>{
  return this.http.get(this.ServerUrl +`/FlexHeader/applWise/${applId}`);
}
getFlexField(applid,titles):Observable<any>{
 return this.http.get(this.ServerUrl +`/FlexHeader/titleAndApp?applicationId=${applid}&title=${titles}`);
}

//////////////////Jai Regime Master////////////////
regimeTypeLisFunt(): Observable<any> {
  return this.http.get(this.ServerUrl + '/cmnLookup/JaiRegimeType');
}
getJaiRegimeSearch(): Observable<any> {
  return this.http.get(this.ServerUrl + '/jairegime');

}

public JaiRegimeMasterSubmit(JaiRegimeMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/jairegime';
  return this.http.post(url, JaiRegimeMasterRecord, options);
}

UpdateJaiRegimeById(JaiRegimeMasterRecord,regimeId) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + `/jairegime/${regimeId}`);
  return this.http.put(url, JaiRegimeMasterRecord, options);
}

//////////////////////////TaxAccountMaster/////////////
getTaxAccountSearch(): Observable<any> {
  return this.http.get(this.ServerUrl + '/TaxAccounts');
 }

public taxAccountMasterSubmit(taxAccountMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/TaxAccounts//TaxAcctIdPost';
  return this.http.post(url, taxAccountMasterRecord, options);
}


UpdatetaxAccountMasterById(taxAccountMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + '/TaxAccounts/TaxAcctIdPut');
  return this.http.put(url, taxAccountMasterRecord, options);
}
//////////////////////Tax Category Master //////////////////////
// geActDetails(taxTypeCode): Observable<any> {
//   return this.http.get(this.ServerUrl + `/taxType/acInfo/${taxTypeCode}`);
//  }

 geActDetails1(mtaxTypeId): Observable<any> {
  return this.http.get(this.ServerUrl + `/taxType/taxTypeId/${mtaxTypeId}`);
 }
getTaxCategorySearch(): Observable<any> {
  return this.http.get(this.ServerUrl + '/JaiTaxCatg');
 }

 selectTypewiseCategory(cateType): Observable<any> {
  return this.http.get(this.ServerUrl + `/JaiTaxCatg/taxCate/${cateType}`);
 }

 getsearchCategoryData(taxCategoryId): Observable<any> {
  return this.http.get(this.ServerUrl + `/JaiTaxCatg/${taxCategoryId}`);
 }

public TaxCategoryMasterSubmit(TaxCategoryMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/JaiTaxCatg/TaxCatgPost';
  return this.http.post(url, TaxCategoryMasterRecord, options);
}

UpdateTaxCategoryMasterById(TaxCategoryMasterRecord,taxCategoryId) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + `/JaiTaxCatg/${taxCategoryId}`);
  return this.http.put(url, TaxCategoryMasterRecord, options);
}
///////////////////////JAI TAX TYPE MASTER ///////////////////////
getTaxTypeSearch(): Observable<any> {
  return this.http.get(this.ServerUrl + '/taxType');
 }

 public jaiTaxTypeMasterSubmit(JaiTaxTypeMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/taxType';
  return this.http.post(url, JaiTaxTypeMasterRecord, options);
}

UpdateJaiTaxTypeMasterById(JaiTaxTypeMasterRecord,taxTypeId) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + `/taxType/${taxTypeId}`);
  return this.http.put(url, JaiTaxTypeMasterRecord, options);
}

 //////  JAI TAX RATE       ///////
 getTaxRateSearch(): Observable<any> {
  return this.http.get(this.ServerUrl + '/taxRates');
 }


taxTypeIdList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/taxType');
}

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\PRICE LIST MASTER\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  priceListIdList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/pricelist');
  }



  itemIdList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/itemMst');

  }

itemNameList(itemId): Observable<any>
{
  return this.http.get(this.ServerUrl +`/itemMst/${itemId}`);
}


priceDescList(priceListId): Observable<any>
{
  return this.http.get(this.ServerUrl +`/pricelist/${priceListId}`);
}
taxTypeNameList(taxTypeId): Observable<any>
{
   if(taxTypeId>0) {
  return this.http.get(this.ServerUrl +`/taxType/${taxTypeId}`);
}}

locationNameList(locCode): Observable<any>
{
  return this.http.get(this.ServerUrl +`/locationMst/LocationCode/${locCode}`);
}

locationNameList1(locId): Observable<any>
{
  return this.http.get(this.ServerUrl +`/locationMst/${locId}`);
}

regimeIdList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/jairegime');

}

thresholdTypeList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/type/JAI_THRESHOLD_TYPE');

}

tdsVendorList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/type/JAI_TDS_VENDOR_TYPE');

}

tdsSectionList(): Observable<any> {
  // return this.http.get(this.ServerUrl +'/cmnLookup/type/JAI_TDS_SECTION');
  return this.http.get(this.ServerUrl +'/fndAcctLookup/lookupTypeWise/JAI_TDS_SECTION');



}

tdsTaxCategoryList(): Observable<any> {
  // return this.http.get(this.ServerUrl +'/JaiTaxCatg');
   return this.http.get(this.ServerUrl +'/JaiTaxCatg/taxCate/TDS');


}






 public jaiTaxRatesMasterSubmit(JaiTaxRatesMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/JaiTaxRates/TaxRatesPost';
  return this.http.post(url, JaiTaxRatesMasterRecord, options);
}


getJaiTaxRateSearch(): Observable<any> {
  return this.http.get(this.ServerUrl +'/taxRates');

}
// UpdateJaiTaxRatesMasterById(JaiTaxRatesMasterRecord) {
//   const options = {
//     headers: this.headers
//   };
//   const url = (this.ServerUrl + '/JaiTaxRates/TaxRatesPut');
//   return this.http.put(url, JaiTaxRatesMasterRecord, options);
// }

 ////////////////////////Jai Tax Category Line //////////////////

  getJaiTaxCategoryLineSearch(): Observable<any> {
  return this.http.get(this.ServerUrl + '/jaiCateLines');
 }

public JaiTaxCategoryLineMasterSubmit(JaiTaxCategoryLineMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/jaiCateLines';
  return this.http.post(url, JaiTaxCategoryLineMasterRecord, options);
}

UpdateJaiTaxCategoryLineMasterById(JaiTaxCategoryLineMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + `/jaiCateLines`);
  return this.http.put(url, JaiTaxCategoryLineMasterRecord, options);
}
//////////////////////////////
regimNameList(regimeId): Observable<any>
{
  alert("Regime Id: "+regimeId);
  if ( regimeId>0 ) {
  return this.http.get(this.ServerUrl +`/jairegime/${regimeId}`);
  }
}



LedgerList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/SSLedger');
}

UpdateJaiTaxRatesMasterById(JaiTaxRatesMasterRecord,taxRateId) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + '/JaiTaxRates/TaxRatesPut');
  return this.http.put(url, JaiTaxRatesMasterRecord, options);
}

public JaiTaxtypeMasterSubmit(JaiTaxtypeMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/jaiTaxType';
  return this.http.post(url, JaiTaxtypeMasterRecord, options);
}


getJaiTaxTypeSearch(): Observable<any> {
  return this.http.get(this.ServerUrl +'/taxType');

}

///////////GL CodeCombination//////////////
branchlist():Observable<any>{
  return this.http.get(this.ServerUrl+'/fndAcctLookup/lookupTypeWise/SS_Branch');
}

locationlist():Observable<any>{
  return this.http.get(this.ServerUrl +'/fndAcctLookup/lookupTypeWise/SS_Location');
}
costcentre():Observable<any>{
  return this.http.get(this.ServerUrl +'/fndAcctLookup/lookupTypeWise/CostCentre');
}
naturalaccount():Observable<any>{
  return this.http.get(this.ServerUrl +'/fndAcctLookup/lookupTypeWise/NaturalAccount');
}
interbranch():Observable<any>{
  return this.http.get(this.ServerUrl +'/fndAcctLookup/lookupTypeWise/SS_Interbranch');
}
getnaturalaccount(naturalAccount1):Observable<any>{
  return this.http.get(this.ServerUrl +`/fndAcctLookup/lookupValueWise/${naturalAccount1}`);
}
getbranch(branch1):Observable<any>{
  return this.http.get(this.ServerUrl +`/fndAcctLookup/lookupValueWise/${branch1}`);
}
getloc(loc1):Observable<any>{
  return this.http.get(this.ServerUrl + `/fndAcctLookup/lookupValueWise/${loc1}`);
}
getcostCentre(costCentre1):Observable<any>{
  return this.http.get(this.ServerUrl +`/fndAcctLookup/lookupValueWise/${costCentre1}`);
}
// getInterBranch(InterBranch1):Observable<any>{
//   return this.http.get(this.ServerUrl + `/fndAcctLookup/lookupTypeValueWise?lookupType=SS_InterBranch& +${InterBranch1}`);
// }
glCodeCombinationSubmit(glcodecmbnmstRecord){
  const comb ={headers:this.headers
  };
  const url=this.ServerUrl + '/glCodeCmbn/GlCodeCombinations'
  return this.http.post(url,glcodecmbnmstRecord,comb)
}
getGlCodeCombinationSearch():Observable<any>{
  return this.http.get(this.ServerUrl + '/glCodeCmbn');
}
UpdateGlMasterById(GlMasterRecord){
  const options={
    headers:this.headers
    };
    const url=(this.ServerUrl + `/glCodeCmbn`);
    return this.http.put(url,GlMasterRecord,options);
}

cityList1(city): Observable<any> {
  return this.http.get(this.ServerUrl + `/cmnLookup/lookup?codeDesc=${city}&cmnType=City`);
}
// receipt service

getLocatorPoLines(locatorDesc,locId): Observable<any> {
  return this.http.get(this.ServerUrl + `/lctrmst/nameandloc?segmentName=${locatorDesc}&locId=${locId}`);
}


getsearchByPOlines(segment1): Observable<any> {
  return this.http.get(this.ServerUrl + `/rcvShipment/rcv/${segment1}`);
}

receiptnotdonetaxDeatils(trxId,trxLineId): Observable<any> {
  return this.http.get(this.ServerUrl +`/rcvShipment/trxLineDet?trxId=${trxId}&trxLineId=${trxLineId}&updVenOnTransaction=PO_TRANSACTION`);
}

receiptdonetaxDeatils(trxId,trxLineId): Observable<any> {
  return this.http.get(this.ServerUrl +`/rcvShipment/trxLineDet?trxId=${trxId}&trxLineId=${trxLineId}&updVenOnTransaction=RCV_TRANSACTION`);
}

getsearchByReceiptNo(segment1): Observable<any> {
  return this.http.get(this.ServerUrl + `/rcvShipment/receiptNoWise/${segment1}`);
}

public PoReceiptReturnSubmit(PoReceiptRtnrRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/rcvShipment/rtvPost';
  // http://localhost:8081/rcvShipment/rtvPost
  return this.http.post(url, PoReceiptRtnrRecord, options);
}



public poDateWiseFind(content) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/rcvShipment/DatewisePODto';
  // const url = this.ServerUrl + '/rcvShipment/rcvPoDate';
  return this.http.post(url, content, options);
}


POApproveDateWise(poDate,locId){
  return this.http.get(this.ServerUrl + `/rcvShipment/rcvPoDate?poDate=${poDate}&billToLoc=${locId}`);
}


public receiptDateWiseFind(content) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/rcvShipment/DatewiseReceiptDto';
  return this.http.post(url, content, options);
}

getsearchByRcvSupp(rcvSupp1): Observable<any> {
  return this.http.get(this.ServerUrl + `/rcvShipment/rcvSupp1/${rcvSupp1}`);
}

viewAccounting1(receiptNo): Observable<any> {
  return this.http.get(this.ServerUrl + `/glHeader/receiptNoWise/${receiptNo}`);
}

getsearchByshipmentNo(shipmentNo): Observable<any> {
  return this.http.get(this.ServerUrl + `/rcvShipment/shipmentNo/${shipmentNo}`);
}


public poinvCre(segment1) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + `/apInv/inserDtls/${segment1}`;
  return this.http.post(url, segment1, options);
}


poAllRecFind(segment1): Observable<any> {
  return this.http.get(this.ServerUrl +`/rcvShipment/findByPONumber/${segment1}`);
}


delearCodeList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/DealerMst');
}

getInterBranch(InterBranch1, lType):Observable<any>{

    const REQUEST_PARAMS = new HttpParams().set('lookupType', lType).set('lookupValue', InterBranch1)
    const REQUEST_URI = this.ServerUrl +'/fndAcctLookup/lookupTypeValueWise';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,

    });
  }

lookupNameList(mlookupValue, mlookupType) {
  // alert('servie=call');
  const REQUEST_PARAMS = new HttpParams().set('lookupType', mlookupType)
                                         .set('lookupValue', mlookupValue)

  const REQUEST_URI = this.ServerUrl +'/fndAcctLookup/lookupTypeValueWise';
  return this.http.get(REQUEST_URI, {
    params: REQUEST_PARAMS,

  });
}

public poSaveSubmit(poRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/rcvShipment';
  return this.http.post(url, poRecord, options);
  
}

//////////////////////////////////RTV///////////////////////////////////////////////////////////

public rtvSaveSubmit(rtvRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/rcvShipment/rtvPost';
  return this.http.post(url, rtvRecord, options);
}
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\PRICE LIST MASTER\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

PriceTypeList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/PriceListType');
}

PriceSubTypeList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/PriceListSubType');
}



PriceListIdList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/pricelist');
  }






// getPriceListSearch(): Observable<any> {
//   return this.http.get(this.ServerUrl +`/pricelist/prcline/${priceListHeaderId}`);
//  }

    public PriceListMasterSubmit(PriceListMasterRecord) {
      const options = {
        headers: this.headers
      };
      const url = this.ServerUrl + '/pricelist';
      return this.http.post(url, PriceListMasterRecord, options);
    }

    UpdatePriceListById(PriceListMasterRecord,priceListHeaderId) {
      // alert("PL HEADER ID : "+priceListHeaderId);
      const options = {
        headers: this.headers
      };
      // const url = (this.ServerUrl + `/pricelist/${priceListHeaderId}`);
      const url = (this.ServerUrl + `/pricelist`);
      return this.http.put(url, PriceListMasterRecord, options);
    }

    UpdatePriceListByIdHeader(PriceListMasterRecord,priceListHeaderId) {
      // alert("PL HEADER ID : "+priceListHeaderId);
      const options = {
        headers: this.headers
      };
      // const url = (this.ServerUrl + `/pricelist/${priceListHeaderId}`);
      // URL - http://localhost:8081/pricelist/prcheader
      const url = (this.ServerUrl + `/pricelist/prcheader`);
      return this.http.put(url, PriceListMasterRecord, options);
    }


    public OrderTypeMasterSubmit(OrderTypeMasterRecord) {
      const options = {
        headers: this.headers
      };
      const url = this.ServerUrl + '/OrderTrnType';
      return this.http.post(url, OrderTypeMasterRecord, options);
    }

    UpdateOrderTypeMasterById(OrderTypeMasterRecord,transactionTypeId) {
      const options = {
        headers: this.headers
      };
      const url = (this.ServerUrl + `/OrderTrnType/${transactionTypeId}`);
      return this.http.put(url, OrderTypeMasterRecord, options);
    }

    getPriceListSearch(): Observable<any> {
      // return this.http.get(this.ServerUrl + '/pricelist');
      return this.http.get(this.ServerUrl + '/pricelist/prcListDto');
    }

    getPriceListHistorySearch(priceListId,itemId): Observable<any> {
      // alert("MS>>PL ID="+priceListId + " item id="+itemId);
      return this.http.get(this.ServerUrl + `/priceHistory/itemhist?priceListHeaderId=${priceListId}&itemId=${itemId}`);
    }

////////////////////////////OrderTypeMaster//////////////////
UpdateOrderTypeMasterById1(OrderTypeMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + `/OrderTrnType`);
  return this.http.put(url, OrderTypeMasterRecord, options);
}
getOrderTypeSearch(): Observable<any> {
  return this.http.get(this.ServerUrl + '/OrderTrnType');

}
InvSourceList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/InvoiceSource');
}
OrderCategoryList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/OrderCategory');
}

 ///////////////////////// AR RECEIPT  //////////////////////////////////////

 CustomerList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/Customer');
}

// CustomerSiteList(customerId: any): Observable<any> {
//   return this.http.get(this.ServerUrl +`/Customer/${customerId}`);
// }



 ReceiptTypeArList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/type/ArReceiptType');
  // cmnLookup/type/ReceiptStatus
}


  ReceiptStatusList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/cmnLookup/type/ReceiptStatus');
    // cmnLookup/type/ReceiptStatus
  }

  ReverseReasonList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/cmnLookup/type/RvslReson');
  }

  public ArReceiptSubmit(ArReceiptRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/arCashReceipts/ArReceipt';
    return this.http.post(url, ArReceiptRecord, options);
  }
  ////////////////////////// RECEIPT APPLICATION /////////////////////
  public ArReceipApplySubmit(ArReceiptApplyRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/arCashReceipts/apply/inv';
    return this.http.post(url, ArReceiptApplyRecord, options);
  }
  ////////////////////////// ///////////////////////////////////////

  custAccountNoSearch(accountNo,ouId): Observable<any> {
    alert("ms >>account no:"+accountNo+","+ouId);
    // return this.http.get(this.ServerUrl + `/Customer/getByAccountNo?accountNo=${accountNo}&ouId=${ouId}`);
    return this.http.get(this.ServerUrl + `/Customer/getByAccountNo?accountNo=${accountNo}&ouId=${ouId}`);
  }

  getArReceiptSearchByRcptNo(rcptNumber,custActNo,rcptDate): Observable<any>
  {
    // alert("MS>>RCPT NO -getArReceiptSearchByRcptNo: RcptNo ,CustNo,RcptDate :" +rcptNumber +','+custActNo +','+rcptDate  );
    if(rcptDate===undefined)
    {
      return this.http.get(this.ServerUrl + `/arCashReceipts/Search?receiptNumber=${rcptNumber}&accountNo=${custActNo}`);
    }else
    {
    return this.http.get(this.ServerUrl + `/arCashReceipts/Search?receiptNumber=${rcptNumber}&accountNo=${custActNo}&receiptDate='${rcptDate}'`);
    }
  }


  getArReceiptSearchByInvoiceNo(custAccountNo,billToSiteId,rcptNo): Observable<any> {
    // alert("MS>>RCPT NO -getArReceiptSearchByRcptNo: CustActNo " +custAccountNo +'billToSiteId:'+billToSiteId );
    return this.http.get(this.ServerUrl + `/arCashReceipts/apply/inv?recepitNo=${rcptNo}&custAccountNo=${custAccountNo}&billToSiteId=${billToSiteId}`);


  }

  PaymentModeList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/fndAcctLookup/lookupTypeWise/PayType');
  }

  ReceiptMethodList(mPaytype ,mLocId,mStatus): Observable<any> {
    // alert("Master Service :"+ mPaytype+" "+mLocId+" " +mStatus);
    return this.http.get(this.ServerUrl + `/receiptMethod?methodType=${mPaytype}&locId=${mLocId}&status=${mStatus}`);
  }

  ///////////////////////////AVERAGE COST UPDATE//////////////////////////

    avgCurrentCost(mitemId,mLocId): Observable<any> {
    // alert("Master Service :"+ mitemId+" ,"+mLocId);
    return this.http.get(this.ServerUrl + `/averageCost/avgLocItem?locationId=${mLocId}&itemId=${mitemId}`);
  }

  public AvgCostUpdateSubmit(AvgCostUpdateRecord) {
    // alert('in service')
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/averageCost';
    return this.http.post(url, AvgCostUpdateRecord, options);
  }

  // getAvgHistoryList
  getAvgHistoryList(mLocId,mitemId,frmDate,toDate): Observable<any> {
    // alert("Master Service :"+ mLocId+","+mitemId+" ,"+frmDate+","+toDate);
    return this.http.get(this.ServerUrl + `/averageCost/avghistory?locationId=${mLocId}&itemId=${mitemId}&startDate=${frmDate}&endDate=${toDate}`);
    }

  ///////////////////Price list File upload/////////////////////
  UploadExcel(formData: FormData,docType:string) {
    let headers1 = new HttpHeaders();
    var userId1=sessionStorage.getItem('userId');
    console.log(docType);
    var docType1=formData.get('docType');

    // return this.http.post(this.ServerUrl + `/pricelist/uploadprc`);

      return this.http.post(this.ServerUrl + `/pricelist/uploadprc`, formData)
      // URL :- http://localhost:8081/pricelist/uploadprc
    }


    //////////////////////////EXTENDED WARRANTY/////////////////////////////


    EwSourceList(): Observable<any> {
      //////
      return this.http.get(this.ServerUrl +'/cmnLookup/type/EWSource');
    }

    EwSchemeList(): Observable<any> {
      return this.http.get(this.ServerUrl +'/cmnLookup/type/EWScheme');
    }

    EWSlabList(): Observable<any> {
      return this.http.get(this.ServerUrl +'/cmnLookup/type/EWSlab');
    }


    EwTypeList(): Observable<any> {
      return this.http.get(this.ServerUrl +'/cmnLookup/type/EWType');
    }

    EwCancelReasonList(): Observable<any> {
      return this.http.get(this.ServerUrl +'/cmnLookup/type/EW CANCEL REASON');
    }


    ModelVariantList(): Observable<any> {
      return this.http.get(this.ServerUrl +'/cmnLookup/type/Variant');
    }

    PremiumPeriodList(): Observable<any> {
      return this.http.get(this.ServerUrl +'/cmnLookup/type/EWPeriod');
    }

    getEWSchemeSearch(mOuId): Observable<any> {
      // alert("OUID ="+mOuId);
       return this.http.get(this.ServerUrl + `/EwScheme/ouEwScheme?ouId=${mOuId}`);
    }

    public SaiEwSchemeSubmit(EwSchemeMasterRecord) {
      const options = {
        headers: this.headers
      };
      const url = this.ServerUrl + '/EwScheme/newscheme';
      return this.http.post(url, EwSchemeMasterRecord, options);
    }

    UpdateSaiEwScheme(EwSchemeMasterRecord) {
      const options = {
        headers: this.headers
      };
      const url = (this.ServerUrl + `/EwScheme`);
      return this.http.put(url, EwSchemeMasterRecord, options);
    }

    RegNoListFN() : Observable<any> {
      return this.http.get(this.ServerUrl +`/itemMst/regList`);
    }

    VehVinList() : Observable<any> {
      return this.http.get(this.ServerUrl +`/itemMst/vinList`);
    }

    getEWSlabDetailsByCodeDesc(mCode): Observable<any> {
      // alert("MS >> "+mCodeDesc);
      return this.http.get(this.ServerUrl + `/cmnLookup/CmnTypeCode?code=${mCode}&cmnType=EWSlab`);
    }

    getSectionTdsDetailsByCode(mCode): Observable<any> {
      // alert("MS >> "+mCodeDesc);
      return this.http.get(this.ServerUrl + `/cmnLookup/CmnTypeCode?code=${mCode}&cmnType=JAI_TDS_SECTION`);
    }

    EwSchemeItemList(mVariant,mOuId,mAging,mKms): Observable<any> {
      // alert(  "ms>>> "+ mVariant+","+mAging+","+mKms+","+mOuId);
       return this.http.get(this.ServerUrl +`/EwScheme/ewvariant?variant=${mVariant}&ouId=${mOuId}&aging=${mAging}&kms=${mKms}`);
     }

    getEWSchemeDetails(mSchemeId): Observable<any> {

      if(mSchemeId>0) {
        // alert(mSchemeId );
      return this.http.get(this.ServerUrl + `/EwScheme/${mSchemeId}`);
    }
    }

    variantDetailsList(mVariant): Observable<any> {
      // alert(mVariant );
      return this.http.get(this.ServerUrl + `/VariantMst/VariantDesc/${mVariant}`);
    }

    getVariantList(): Observable<any> {
      // alert(mVariant );
      return this.http.get(this.ServerUrl + `/VariantMst/Variants`);
    }


    getVehRegDetails(mRegNumber): Observable<any> {
      // alert(mRegNumber );
      return this.http.get(this.ServerUrl + `/VehAddInfo/RegNo/${mRegNumber}`);
    }

    
    getWsVehRegDetails(mRegNumber): Observable<any> {
      // alert(mRegNumber );
      return this.http.get(this.ServerUrl + `/VehAddInfo/ws/RegNo/${mRegNumber}`);
    } 

    getVehVinDetails(mVin): Observable<any> {
      // alert("master >> " +mVin );
      return this.http.get(this.ServerUrl + `/VehAddInfo/VinInfo/${mVin}`);
    }


    getEWCustomerSearch(): Observable<any> {
           return this.http.get(this.ServerUrl + `/ewmaster`);
   }

   getEWCustomerSearchByEWNo(mEWNo): Observable<any> {
     return this.http.get(this.ServerUrl + `/ewmaster/${mEWNo}`);
  }

  getVehicleOrderDetails(mOrderNumber): Observable<any> {
    // alert("ms order number>>"+mOrderNumber);
    return this.http.get(this.ServerUrl + `/orderHeader/EwOrder/${mOrderNumber}`);
    }


  getEWStatusVehcile(mRegno): Observable<any> {
    // alert("ms>>"+mRegno);
    return this.http.get(this.ServerUrl + `/ewmaster/ewvehicle/${mRegno}`);
 }

 getLastRunKms(mRegno): Observable<any> {
  // alert("ms>>"+mRegno);
  return this.http.get(this.ServerUrl + `/jobCard/lastKms?regNo=${mRegno}`);

}

// EwClaimedCheck(mRegno): Observable<any> {
//   alert("ms>>"+mRegno);
//   return this.http.get(this.ServerUrl + `/jobCard/ewjobNo?regNo=${mRegno}&billableTyName=Extended Warranty`);
//    // http://localhost:8081/jobCard/ewjobNo?regNo=MH12EM6011&billableTyName=Extended Warranty

// }
EwClaimedCheck(mRegno): Observable<any> {
  // alert("ms>>"+mRegno);
  return this.http.get(this.ServerUrl + `/jobCard/ewjobNo?regNo=${mRegno}&billableTyName=Extended Warranty`);

}



   public SaiEwCustomerSubmit(EwCustomerMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/ewmaster';
    return this.http.post(url, EwCustomerMasterRecord, options);
  }

  UpdateSaiEwCustomer(EwCustomerMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/ewmaster`);
    return this.http.put(url, EwCustomerMasterRecord, options);
  }

  ///////////////////////////// MCP /////////////////////////////////

  public McpItemMasterSubmit(McpItemMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/McpItemMst';
    return this.http.post(url, McpItemMasterRecord, options);
  }

  UpdateMcpItemMaster(McpItemMasterRecord,mcpItemId) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/McpItemMst/${mcpItemId}`);
    return this.http.put(url, McpItemMasterRecord, options);
  }



  getMcpItemSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/McpItemMst');
  }

 getMcpPackageSearch(): Observable<any> {
  return this.http.get(this.ServerUrl + '/PackageMst');
}

getMcpPackageSearchNew1(mPkgType,mFuelType): Observable<any>
{
  // alert("MS>>RCPT NO -getArReceiptSearchByRcptNo: RcptNo ,CustNo,RcptDate :" +rcptNumber +','+custActNo +','+rcptDate  );
   return this.http.get(this.ServerUrl + `/PackageMst/PkgTypeAndFuelType?packageType=${mPkgType}&fuelType=${mFuelType}`);

}

getMcpPackageSearchNew2(mPkgNo,mFuelType): Observable<any>
{
   return this.http.get(this.ServerUrl + `/PackageMst/PkgNoAndFuelType?packageNumber=${mPkgNo}&fuelType=${mFuelType}`);

}


public McpPackageMasterSubmit(McpPkgMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/PackageMst';
  return this.http.post(url, McpPkgMasterRecord, options);
}

// UpdatePriceListByIdMCP(PriceListMasterRecord,priceListHeaderId) {
//   const options = {
//     headers: this.headers
//   };
//   const url = (this.ServerUrl + `/pricelist`);
//   return this.http.put(url, PriceListMasterRecord, options);
// }

UpdateMcpPackageMaster(McpPkgMasterRecord,mcpPkgId) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + `/PackageMst/${mcpPkgId}`);
  return this.http.put(url, McpPkgMasterRecord, options);
}


//////////////////////VARIANT MASTER////////////////////////////
public VariantMasterSubmit(VariantMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/VariantMst';
  return this.http.post(url, VariantMasterRecord, options);
}

UpdateVariantMaster(VariantMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + `/VariantMst`);
  return this.http.put(url, VariantMasterRecord, options);
}

mcpItemList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/McpItemMst');
}

//////////////////////// TAX THRESHOLD SETUP //////////////////

public taxThresholdSetupSubmit(ThresholdSetupRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/jaiApTdsHdr';
  return this.http.post(url, ThresholdSetupRecord, options);
}

getThresholdSetup(): Observable<any> {
  return this.http.get(this.ServerUrl + '/jaiApTdsHdr');

}

// //////////////////   Miscell Transaction //////////////////////////

TransactionType():Observable<any>
{
  return this.http.get(this.ServerUrl +'/mtlTrxTypes/9');
}
TransactionTypemisc():Observable<any>
{
  return this.http.get(this.ServerUrl +`/mtlTrxTypes/stockAdj/9`);
}
ReasonList():Observable<any>
{
  return this.http.get(this.ServerUrl+'/mtlTransReasons');
}
reasonaccCode(locId,reason,costCode):Observable<any>
{
return this.http.get(this.ServerUrl+`/mtlTransReasons/reason?locId=${locId}&reasonName=${reason}&costCode=${costCode}`)
}
TypeList():Observable<any>
{
  return  this.http.get(this.ServerUrl+'/cmnLookup/type/StockAdjType');
}




ItemIdList1(locationId,subInv):Observable<any>
{
  return this.http.get(this.ServerUrl+`/itemMst/OnHandItemLst?locId= ${locationId}&subInvCode=${subInv}`)
}
getItemDetail11(locId,itemId,subInvCode):Observable<any>
{
  return this.http.get(this.ServerUrl+`/itemMst/OnHandItemDtls?locId=${locId}&subInvCode=${subInvCode}&itemId=${itemId}`)
  }
LocatorNameList(LocName,LocId):Observable<any>
{
  return this.http.get(this.ServerUrl+`/lctrmst/nameandloc?segmentName=${LocName}&locId=${LocId}`)
}
getCostDetail(locId,ItemId):Observable<any>
{
  return this.http.get(this.ServerUrl+`/averageCost/avgLocItem?locationId=${locId}&itemId=${ItemId}`)
}
getonhandqty(locId,subId,locatorId,Itemid):Observable<any>
{
  return this.http.get(this.ServerUrl+`/onhandqty/locator?locationId=${locId}&subInventoryId=${subId}&locatorId=${locatorId}&itemId=${Itemid}`)
}
// getonhandqty(locatorId):Observable<any>
// {
//   return this.http.get(this.ServerUrl+`/onhandqty/locator?id=${locatorId}`)
// }
miscellaneousSubmit(miscRecord):Observable<any>
{
  const options ={
    headers:this.headers
   }
   const url=this.ServerUrl+'/stockadj';
   return this.http.post(url,miscRecord,options);
}
miscSubmit(miscelRecord):Observable<any>
{
  const options={
    headers:this.headers
  }
  const url =this.ServerUrl+'/stockadj/misc';
  return this.http.post(url,miscelRecord,options);
}
approve(appmiscRecord):Observable<any>
{
  const options ={
    headers:this.headers
  }
  const url =this.ServerUrl+'/stockadj/stkapprove';
  return this.http.post(url,appmiscRecord,options);
}
getSearchByNo(compNo):Observable<any>
{
  return this.http.get(this.ServerUrl+`/stockadj/compileNo/${compNo}`);
}
getSearchViewBycompNo(compNo):Observable<any>
{
  return this.http.get(this.ServerUrl+`/stockadj/compileall/${compNo}`)
}
getSearchBycompNo(compNo):Observable<any>
{
  return this.http.get(this.ServerUrl+`/stockadj/compileadj/${compNo}`);
}
getsearchByCompId(compileId,itemId):Observable<any>
{
  return this.http.get(this.ServerUrl+`/cycleline?compileId=${compileId}&invItemId=${itemId}`);
}
miscellaneousUpdate(comId,cyclelinerecord){
  const options={
    headers:this.headers
  };
  const url=(this.ServerUrl+`/cycleline/${comId}`);
  return this.http.put(url,cyclelinerecord,options);
}


/////////////////////////////// PO INVOICE -TDS LINE /////////////////////////
getTdsDetails(mInvoiceId): Observable<any> {
  // alert("MS>> "+mInvoiceId);
  return this.http.get(this.ServerUrl+`/apInv/apTdsDis?invId=${mInvoiceId}`);
  // http://localhost:8081/apInv/apTdsDis?invId=27
}

getTdsTaxDetails(mItemId,mBaseAmt,mTaxCatId): Observable<any> {
   return this.http.get(this.ServerUrl+`/poHdr/potaxcal?itemId=${mItemId}&baseAmt=${mBaseAmt}&taxCateId=${mTaxCatId}`);
  // http://localhost:8081/poHdr/potaxcal?itemId=1&baseAmt=1000&taxCateId=14071
}

getPOReceiptSearchByRcptNo(mReceiptNo): Observable<any> {
  return this.http.get(this.ServerUrl+`/rcvShipment/receiptNoWise/${mReceiptNo}`)
  // return this.http.get(this.ServerUrl+`/rcvShipment/findByReceiptNum/${mReceiptNo}`)
  // http://localhost:8081/rcvShipment/findByReceiptNum/1000155
}

getPOReceiptSearchByPONo(mPoNumber): Observable<any> {
  return this.http.get(this.ServerUrl+`/rcvShipment/findByPONumber/${mPoNumber}`)
}





    //////////////////////////EXTENDED WARRANTY/////////////////////////////


    // EwSourceList(): Observable<any> {
    //   return this.http.get(this.ServerUrl +'/cmnLookup/type/EWSource');
    // }

    // EwTypeList(): Observable<any> {
    //   return this.http.get(this.ServerUrl +'/cmnLookup/type/EWType');
    // }

    // ModelVariantList(): Observable<any> {
    //   return this.http.get(this.ServerUrl +'/cmnLookup/type/Variant');
    // }

    // PremiumPeriodList(): Observable<any> {
    //   return this.http.get(this.ServerUrl +'/cmnLookup/type/EWPeriod');
    // }

    // getEWSchemeSearch(): Observable<any> {
    //    return this.http.get(this.ServerUrl + '/EwScheme');
    // }

    // public SaiEwSchemeSubmit(EwSchemeMasterRecord) {
    //   const options = {
    //     headers: this.headers
    //   };
    //   const url = this.ServerUrl + '/EwScheme/newscheme';
    //   return this.http.post(url, EwSchemeMasterRecord, options);
    // }

    // UpdateSaiEwScheme(EwSchemeMasterRecord) {
    //   const options = {
    //     headers: this.headers
    //   };
    //   const url = (this.ServerUrl + `/EwScheme`);
    //   return this.http.put(url, EwSchemeMasterRecord, options);
    // }


    // PaymentModeList(): Observable<any> {
    //   return this.http.get(this.ServerUrl +'/fndAcctLookup/lookupTypeWise/PayType');
    // }

    // ReceiptStatusList(): Observable<any> {
    //   return this.http.get(this.ServerUrl +'/cmnLookup/type/ReceiptStatus');
    //   // cmnLookup/type/ReceiptStatus
    // }

    // ReceiptTypeArList(): Observable<any> {
    //   return this.http.get(this.ServerUrl +'/cmnLookup/type/arReceiptType');
    //   // cmnLookup/type/ReceiptStatus
    // }

    // ReverseReasonList(): Observable<any> {
    //   return this.http.get(this.ServerUrl +'/cmnLookup/type/RvslReson');
    // }


    // getArReceiptSearchByRcptNo(rcptNumber,custActNo,rcptDate): Observable<any>
    // {
    //   // alert("MS>>RCPT NO -getArReceiptSearchByRcptNo: RcptNo ,CustNo,RcptDate :" +rcptNumber +','+custActNo +','+rcptDate  );
    //   if(rcptDate===undefined)
    //   {
    //     return this.http.get(this.ServerUrl + `/arCashReceipts/Search?receiptNumber=${rcptNumber}&accountNo=${custActNo}`);
    //   }else
    //   {
    //   return this.http.get(this.ServerUrl + `/arCashReceipts/Search?receiptNumber=${rcptNumber}&accountNo=${custActNo}&receiptDate='${rcptDate}'`);
    //   }
    // }

    // getArReceiptSearchByInvoiceNo(custAccountNo,billToSiteId,rcptNo): Observable<any> {
    //   // alert("MS>>RCPT NO -getArReceiptSearchByRcptNo: CustActNo " +custAccountNo +'billToSiteId:'+billToSiteId );
    //   return this.http.get(this.ServerUrl + `/arCashReceipts/apply/inv?recepitNo=${rcptNo}&custAccountNo=${custAccountNo}&billToSiteId=${billToSiteId}`);


    // }


    // CustomerList(): Observable<any> {
    //   return this.http.get(this.ServerUrl +'/Customer');
    // }


    // custAccountNoSearch(accountNo,ouId): Observable<any> {
    //   alert("ms >>account no:"+accountNo+","+ouId);
    //   // return this.http.get(this.ServerUrl + `/Customer/getByAccountNo?accountNo=${accountNo}&ouId=${ouId}`);
    //   return this.http.get(this.ServerUrl + `/Customer/getByAccountNo?accountNo=${accountNo}&ouId=${ouId}`);
    // }

    // public ArReceipApplySubmit(ArReceiptApplyRecord) {
    //   const options = {
    //     headers: this.headers
    //   };
    //   const url = this.ServerUrl + '/arCashReceipts/apply/inv';
    //   return this.http.post(url, ArReceiptApplyRecord, options);
    // }


    // public ArReceiptSubmit(ArReceiptRecord) {
    //   const options = {
    //     headers: this.headers
    //   };
    //   const url = this.ServerUrl + '/arCashReceipts/ArReceipt';
    //   return this.http.post(url, ArReceiptRecord, options);
    // }

    // ReceiptMethodList(mPaytype ,mLocId,mStatus): Observable<any> {
    //   // alert("Master Service :"+ mPaytype+" "+mLocId+" " +mStatus);
    //   return this.http.get(this.ServerUrl + `/receiptMethod?methodType=${mPaytype}&locId=${mLocId}&status=${mStatus}`);
    // }
}
