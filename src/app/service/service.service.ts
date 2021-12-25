import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ AppConstants} from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  httpclient: any;
  headers: any;
  ServerUrl: string;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.ServerUrl = AppConstants.ServerUrl;
   }
///////////////////Job Card //////////////
getJonCardNoSearch(jonCardNo): Observable<any> {
  return this.http.get(this.ServerUrl +`/jobCard/jobDtls/${jonCardNo}`);
}

getJonCardNoSearchLoc(jobDate,jStatus,jLocId,jcNo,jRegNo): Observable<any> {
  return this.http.get(this.ServerUrl +`/jobCard/jobList?jobDate=${jobDate}&status=${jStatus}&locId=${jLocId}&jobCardNum=${jcNo}&regNo=${jRegNo}`);

  // return this.http.get(this.ServerUrl +`/jobCard/jobList?jobDate=${jobDate}&status=&locId=${jLocId}&jobCardNum&regNo`);
  // http://localhost:8081/jobCard/jobList?jobDate=2021-12-21&status=Invoiced&locId=121&jobCardNum&regNo 
}




getByRegNo(RegNo, ouId): Observable<any> {
  return this.http.get(this.ServerUrl +`/jobCard/regDtls?regNo=${RegNo}&ouId=${ouId}`);
}
jobCarStatusListFn(): Observable<any> {
  return this.http.get(this.ServerUrl +`/cmnLookup/type/jobCardStatus`);
}
pickupTypeListFN(): Observable<any> {
  return this.http.get(this.ServerUrl +`/cmnLookup/type/pickUpType`);
}
srTypeIdListFN(): Observable<any> {
  return this.http.get(this.ServerUrl +`/srvType`);
}
srTypeIdstFN(jcTyp): Observable<any> {
  return this.http.get(this.ServerUrl +`/srvType/srTypeWise/${jcTyp}`);
}
getSubSrTypeIdList(srTypeId): Observable<any> {
  return this.http.get(this.ServerUrl +`/srvType/subTy/${srTypeId}`);
}
matStatusListFN(): Observable<any> {
  return this.http.get(this.ServerUrl +`/cmnLookup/type/matStatus`);
} 
matDiscPerListFN(): Observable<any> {
  return this.http.get(this.ServerUrl +`/cmnLookup/type/matDisPercentage`);
} 
labDiscPerListFN(): Observable<any> {
  return this.http.get(this.ServerUrl +`/cmnLookup/type/labDisPercentage`);
} 
srvAdvisorListtFN(locId,deptId) : Observable<any> {
  return this.http.get(this.ServerUrl +`/teamMaster/srvAdvisor?locId=${locId}&deptId=${deptId}`);
} 
srvAdvisorListFN(locId,jcTyp) : Observable<any> {
  return this.http.get(this.ServerUrl +`/teamMaster/srvAdvisorNew?locId=${locId}&jcType=${jcTyp}`);
} 
groupIdListFN(locId,deptId) : Observable<any> {
  return this.http.get(this.ServerUrl +`/teamMaster/srvGroup?locId=${locId}&deptId=${deptId}`);
} 
RegNoListFN() : Observable<any> {
  return this.http.get(this.ServerUrl +`/itemMst/regList`);
} 
RegNoListDividionwiseFN(divisionId) : Observable<any> {
  return this.http.get(this.ServerUrl +`/itemMst/regList/${divisionId}`);
} 
billableTyIdListFN() : Observable<any> {
  return this.http.get(this.ServerUrl +`/billableTy`);
} 
billableTyIdLstFN(type,regno) : Observable<any> {
  return this.http.get(this.ServerUrl +`/jobCard/billType?srTy=${type}&regNo=${regno}`);
} 
LaborItemListFN() : Observable<any> {
  return this.http.get(this.ServerUrl +`/itemMst/ItemType?itemType=Labor&dept=Service`);
} 
LaborItemListDivisionFN(divisionId,deptname) : Observable<any> {
  return this.http.get(this.ServerUrl +`/itemMst/ItemType?itemType=Labor&divisionId=${divisionId}&dept=${deptname}`);
} 
splitRatioListFN() : Observable<any> {
  return this.http.get(this.ServerUrl +`/billableTy/splitRatio`);
} 

disCategoryListFn() : Observable<any> {
  return this.http.get(this.ServerUrl +`/cmnLookup/type/srvDisType`);
} 

bayTypeLst() : Observable<any> {
  return this.http.get(this.ServerUrl +`/byCodeMst`);
  // http://localhost:8081/byCodeMst
} 



TechnicianListFN(locId) : Observable<any> {
  return this.http.get(this.ServerUrl +`/teamMaster/techDtls/${locId}`);
} 
priceListFN(locId,segment) : Observable<any> {
  return this.http.get(this.ServerUrl +`/jobCard/labPrice?labCode=${segment}&srvModel=RN&locId=${locId}`);
} 
priceListDivisionFN(segment,serModel,locId,ouId) : Observable<any> {
  return this.http.get(this.ServerUrl +`/jobCard/labPrice?labCode=${segment}&srvModel=${serModel}&locId=${locId}&ouId=${ouId}`);
} 
MatImptWipFn(jobCardNum,locId) : Observable<any> {
  return this.http.get(this.ServerUrl +`/jobCard/partLines?jobNum=${jobCardNum}&locId=${locId}`);
} 
public jobcardHeaderSubmit(Record) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/jobCard/jobHeader';
  return this.http.post(url, Record, options);
}

public jobcardUpdateSubmit(Record) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/jobCard/jobHdrUpdate';
  return this.http.put(url, Record, options);
}



public ReopenMaterialIssue(jobcardNo, matStatus){
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + `/jobCard/matStatus?jobNum=${jobcardNo}&matStatus=${matStatus}`;
  return this.http.put(url, options);
}

public jobCardStatusCancel(jobcardNo){
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + `/jobCard/jobCardCancel/${jobcardNo}`;
  return this.http.put(url, options);
}
public jobCardStatusReadyInvoice(jobcardNo, status){
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + `/jobCard/jobStatus?jobNum=${jobcardNo}&status=${status}`;
  return this.http.put(url, options);
}
public lineWISESubmit(Record) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + `/jobCard/labInsert`;
  return this.http.post(url, Record, options);
}
GenerateInvoiceFN(jobCardNum){
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + `/arInv/jobInv/${jobCardNum}`;
  return this.http.post(url, options);
}
public BillingCal(Record) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/jobCard/jobBilling';
  return this.http.put(url, Record, options);
}
saveMaterialSubmit(Record) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + `/jobCard/matInsert`;
  return this.http.post(url, Record, options);
}


printWsPreInvdocument(jcNumber){
  const REQUEST_URI = this.ServerUrl +`/jobCard/wsPreInvoicePrint/${jcNumber}`;  
  // http://localhost:8081/jobCard/wsPreInvoicePrint/12PU.101-3
  return this.http.get(REQUEST_URI, {
    // params: REQUEST_PARAMS,
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

printWsInvoicedocument(jcNumber){
  const REQUEST_URI = this.ServerUrl +`/jobCard/wsInvoicePrint/${jcNumber}`;  
  // http://localhost:8081/jobCard/wsInvoicePrint/12PU.101-3
  return this.http.get(REQUEST_URI, {
    // params: REQUEST_PARAMS,
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

}
