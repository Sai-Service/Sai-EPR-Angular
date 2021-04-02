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
  DepartmentListById(dept): Observable<any> {
    return this.http.get(this.ServerUrl +`/divMst/${dept}`);
  }
  emplIdList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/empMst');
  }
  DesignationList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/cmnLookup/Designation');
  }
  recvTypeIdList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/cmnLookup/DeptList');
  }

  invItemList(itemType,deptName) {
    const REQUEST_PARAMS = new HttpParams().set('itemType', itemType)
    .set('Dept', deptName)

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
    // return this.http.get(this.ServerUrl +'/JaiTaxCatg/taxCate');  /JaiTaxCatg/taxCate/Purchase
    return this.http.get(this.ServerUrl +'/JaiTaxCatg/taxCate/Purchase');
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
  return this.http.get(this.ServerUrl + `/JaiTaxCatg/${ouId}`);
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
  return this.http.get(this.ServerUrl +'/fndAcctLookup/lookupTypeWise/SS_InterBranch');
}
FutureList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/fndAcctLookup/lookupTypeWise/SS_Future');
}
SubAccountList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/fndAcctLookup/lookupTypeWise/SS_SubAccount');
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
  return this.http.get(this.ServerUrl + '/empMst');
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

ItemDetailsList(invItemId, taxCat, billTo) {
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
  const url = 'http://localhost:8081/taxDetails';
  console.log(body);
  return this.httpclient.post(url, body, options);
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
//////////Move Order//////////////
public moveOrderSubmit(MoveOrderRecord)
{
  const options={
    headers:this.headers
  };
  const url=this.ServerUrl+'/mtrlIssue';
  return this.http.post(url,MoveOrderRecord,options);
}
transType():Observable<any>{
  return this.http.get(this.ServerUrl +'/mtlTrxTypes/IPO');
}
subInvCode():Observable<any>{
  return this.http.get(this.ServerUrl +'/subInvMst')
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
actDetails(taxTypeCode): Observable<any> {
  return this.http.get(this.ServerUrl + `/taxType/acInfo/${taxTypeCode}`);

 }
getTaxCategorySearch(): Observable<any> {
  return this.http.get(this.ServerUrl + '/JaiTaxCatg');
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
  return this.http.get(this.ServerUrl + '/jaiTaxType');
 }

 public jaiTaxTypeMasterSubmit(JaiTaxTypeMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/jaiTaxType';
  return this.http.post(url, JaiTaxTypeMasterRecord, options);
}

UpdateJaiTaxTypeMasterById(JaiTaxTypeMasterRecord,taxTypeId) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + `/jaiTaxType/${taxTypeId}`);
  return this.http.put(url, JaiTaxTypeMasterRecord, options);
}

 //////  JAI TAX RATE       ///////
 getTaxRateSearch(): Observable<any> {
  return this.http.get(this.ServerUrl + '/JaiTaxRates');
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
  return this.http.get(this.ServerUrl +`/taxType/${taxTypeId}`);
}

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




 public jaiTaxRatesMasterSubmit(JaiTaxRatesMasterRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/JaiTaxRates/TaxRatesPost';
  return this.http.post(url, JaiTaxRatesMasterRecord, options);
}


getJaiTaxRateSearch(): Observable<any> {
  return this.http.get(this.ServerUrl +'/JaiTaxRates');

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
  return this.http.get(this.ServerUrl +`/jairegime/${regimeId}`);
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
  return this.http.get(this.ServerUrl +'/jaiTaxType');

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

getsearchByReceiptNo(segment1): Observable<any> {
  return this.http.get(this.ServerUrl + `/rcvShipment/receiptNoWise/${segment1}`);
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
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\PRICE LIST MASTER\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

PriceTypeList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/PriceListType');
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
      const options = {
        headers: this.headers
      };
      const url = (this.ServerUrl + `/pricelist`);
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
}


