import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  httpclient: any;
  headers: any;

  ServerUrl='http://localhost:8081'; 

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
   }

   ////////////////////////////////////////Comman Lov//////////////////////////////////////////////////
   statusList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
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
  companyCodeList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/CompMst');
  }
  YesNoList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/cmnLookup/YesNo');
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
  subinventoryIdList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/subInvMst');
  }
  titleList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/cmnLookup/TitleList');
  }
  DepartmentList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/cmnLookup/DeptList');
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
  invItemList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/itemMst');
  } 
  supplierCodeList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/supp');
  }
  suppIdList(suppId): Observable<any> {
    return this.http.get(this.ServerUrl +`/supp/sites/${suppId}`);
  }
//   taxCategoryList(): Observable<any> {
//   return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
// } 
custTypeList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
} 
getTaxCat(ouId): Observable<any> {
  return this.http.get(this.ServerUrl + `/JaiTaxCatg/${ouId}`);
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
getoperatingUnitSearch(): Observable<any> {
  return this.http.get(this.ServerUrl + '/opUnit');

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
  const url = this.ServerUrl + '/locationMst/postLoc';  
  return this.http.post(url, LocationMasterRecord, options);
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

categoryIdList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
} 

uomList(): Observable<any> {
  return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
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
  return this.http.get(this.ServerUrl +'/hsnsacMst/HsnSacCode');
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
  return this.http.get(this.ServerUrl +`/itemMst/${segment}`);
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
  departmentList(): Observable<any>{return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');}

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

} 


