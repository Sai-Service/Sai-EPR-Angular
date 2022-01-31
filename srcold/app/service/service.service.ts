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

getJonCardNoSearchLoc(jcNum,jDate,jStatus,jRegNo,jLocId): Observable<any> {
  return this.http.get(this.ServerUrl +`/jobCard/jobList?jobDate=${jDate}&status=${jStatus}&locId=${jLocId}&jobCardNum=${jcNum}&regNo=${jRegNo}`);
  }

getPendingjcListForGP(jRegNo,jLocId): Observable<any> {
  return this.http.get(this.ServerUrl +`/jobCard/pendingList?locId=${jLocId}&regNo=${jRegNo}`);
 }






getByRegNo(RegNo,ouId,jcType): Observable<any> {
  // alert ("reg,ou,jtype:"+RegNo+","+ouId +","+jcType);
  return this.http.get(this.ServerUrl +`/jobCard/regDtls?regNo=${RegNo}&ouId=${ouId}&jyType=${jcType}`);
  // http://localhost:8081/jobCard/regDtls?regNo=MH12EM8970&ouId=101&jyType=Service
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
  return this.http.get(this.ServerUrl +`/itemMst/ItemTypeNew?itemType=Labor&divisionId=${divisionId}&dept=${deptname}`);
  // http://localhost:8081/itemMst/ItemTypeNew?itemType=Labor&divisionId=2&dept=Service
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


generateServiceGatePass(regNo,mlocId){
  const options = {
    headers: this.headers
  };
  // const url = this.ServerUrl + `/SRGatepass/postSRVGatepass?jobCardNum=${jcNo}`;
  const url = this.ServerUrl + `/SRGatepass/SRVGatepass?regNo=${regNo}&locId=${mlocId}`;
  return this.http.post(url, options);
  // old -- http://localhost:8081/SRGatepass/postSRVGatepass?jobCardNum=12PU.101-40
  // new -- http://localhost:8081/SRGatepass/SRVGatepass?regNo=MH12SV4124&locId=2202
}

printWsGatePass(jcNumber,gpNum,locId){
  // const REQUEST_URI = this.ServerUrl +`/SRGatepass/print/${jcNumber}`;  
  const REQUEST_URI = this.ServerUrl +`/SRGatepass/printSrvGatePass?vehicleNo=${jcNumber}&gatepassId=${gpNum}`;  
  return this.http.get(REQUEST_URI, {
  responseType: 'arraybuffer',
  headers: this.headers,
});
// http://localhost:8081/SRGatepass/printSrvGatePass?vehicleNo=MH12TJ9161&gatepassId=43
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


printWsPreInvdocument(jcNumber,jtype){
 // http://localhost:8081/jobCard/wsPreInvoicePrint/12PU.101-3
  // http://localhost:8081/jobCard/dpPreInv/12PU.101-24

  if (jtype==='BS') {
    const REQUEST_URI = this.ServerUrl +`/jobCard/dpPreInv/${jcNumber}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    }); 
  }
  if (jtype==='Service') {
    const REQUEST_URI = this.ServerUrl +`/jobCard/wsPreInvoicePrint/${jcNumber}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }
  
 
}

printWsInvoicedocument(jcNumber,jtype){
   // http://localhost:8081/jobCard/wsInvoicePrint/12PU.101-3
  //  http://localhost:8081/jobCard/dpInvoice/12PU.101-24

   if (jtype==='Service') {
    const REQUEST_URI = this.ServerUrl +`/jobCard/wsInvoicePrint/${jcNumber}`;  
    return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
  }  

  if (jtype==='BS') {
    const REQUEST_URI = this.ServerUrl +`/jobCard/dpInvoice/${jcNumber}`;  
    return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
  }  
}


printVehicleHistory(vehNum){
  alert("History : "+vehNum);
  const REQUEST_URI = this.ServerUrl +`/jobCard/vehHistory/${vehNum}`;  
  return this.http.get(REQUEST_URI, {
  responseType: 'arraybuffer',
  headers: this.headers,
});

//  http://localhost:8081/jobCard/vehHistory/MH12MP9225
}

}
