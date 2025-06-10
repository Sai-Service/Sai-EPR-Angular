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
  lstcommentsUserSm = JSON.parse(sessionStorage.getItem('logRes'));
  token = this.lstcommentsUserSm.token;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.headers = this.headers.append("Authorization", "Bearer " + this.token);
    this.ServerUrl = AppConstants.ServerUrl;
   }
///////////////////Job Card //////////////
getJonCardNoSearch(jonCardNo): Observable<any> {
  return this.http.get(this.ServerUrl +`/jobCard/jobDtls/${jonCardNo}`, { headers: this.headers });
}

getJonCardNoSearchLoc(jcNum,jDate,jStatus,jRegNo,jLocId): Observable<any> {
  return this.http.get(this.ServerUrl +`/jobCard/jobList?jobDate=${jDate}&status=${jStatus}&locId=${jLocId}&jobCardNum=${jcNum}&regNo=${jRegNo}`, { headers: this.headers });
  }

getJonCardNoSearchOu(jcNum,jDate,jStatus,jRegNo,jouId): Observable<any> {
  return this.http.get(this.ServerUrl +`/jobCard/jobListAccount?jobDate=${jDate}&status=${jStatus}&ouId=${jouId}&jobCardNum=${jcNum}&regNo=${jRegNo}`, { headers: this.headers });
  
}


  getPendingjcListForGP(jRegNo,jLocId): Observable<any> {
  return this.http.get(this.ServerUrl +`/jobCard/pendingList?locId=${jLocId}&regNo=${jRegNo}`, { headers: this.headers });
 }

 getJobCardInvDet(jobCardNum,jcTp): Observable<any> {
  return this.http.get(this.ServerUrl +`/jobCard/jobCardInvDetails?referenceNo=${jobCardNum}&invType=${jcTp}`, { headers: this.headers });
 }

 getGatePassIdDetails(gpId): Observable<any> {
  return this.http.get(this.ServerUrl +`/SRGatepass/byGatepassId/${gpId}`, { headers: this.headers });
  
 }

getByRegNo(RegNo,ouId,jcType): Observable<any> {
  
  return this.http.get(this.ServerUrl +`/jobCard/regDtls?regNo=${RegNo}&ouId=${ouId}&jyType=${jcType}`, { headers: this.headers });
  
}
jobCarStatusListFn(): Observable<any> {
  return this.http.get(this.ServerUrl +`/cmnLookup/type/jobCardStatus`, { headers: this.headers });
}
pickupTypeListFN(): Observable<any> {
  return this.http.get(this.ServerUrl +`/cmnLookup/type/pickUpType`);
}
srTypeIdListFN(): Observable<any> {
  return this.http.get(this.ServerUrl +`/srvType`, { headers: this.headers });
}
srTypeIdstFN(jcTyp): Observable<any> {
  return this.http.get(this.ServerUrl +`/srvType/srTypeWise/${jcTyp}`, { headers: this.headers });
}
getSubSrTypeIdList(srTypeId): Observable<any> {
  return this.http.get(this.ServerUrl +`/srvType/subTy/${srTypeId}`, { headers: this.headers });
}
matStatusListFN(): Observable<any> {
  return this.http.get(this.ServerUrl +`/cmnLookup/type/matStatus`, { headers: this.headers });
} 
matDiscPerListFN(): Observable<any> {
  return this.http.get(this.ServerUrl +`/cmnLookup/type/matDisPercentage`, { headers: this.headers });
} 
labDiscPerListFN(): Observable<any> {
  return this.http.get(this.ServerUrl +`/cmnLookup/type/labDisPercentage`, { headers: this.headers });
} 
srvAdvisorListtFN(locId,deptId) : Observable<any> {
  return this.http.get(this.ServerUrl +`/teamMaster/srvAdvisor?locId=${locId}&deptId=${deptId}`, { headers: this.headers });
} 
srvAdvisorListFN(locId,jcTyp) : Observable<any> {
  return this.http.get(this.ServerUrl +`/teamMaster/srvAdvisorNew?locId=${locId}&jcType=${jcTyp}`, { headers: this.headers });
} 
groupIdListFN(locId,deptId) : Observable<any> {
  return this.http.get(this.ServerUrl +`/teamMaster/srvGroup?locId=${locId}&deptId=${deptId}`, { headers: this.headers });
} 

billableTyIdListFN() : Observable<any> {
  return this.http.get(this.ServerUrl +`/billableTy`, { headers: this.headers });
} 
billableTyIdLstFN(type,regno) : Observable<any> {
  return this.http.get(this.ServerUrl +`/jobCard/billType?srTy=${type}&regNo=${regno}`, { headers: this.headers });
} 
LaborItemListFN() : Observable<any> {
  return this.http.get(this.ServerUrl +`/itemMst/ItemType?itemType=Labor&dept=Service`, { headers: this.headers });
} 
LaborItemListDivisionFN(divisionId,deptname) : Observable<any> {
  return this.http.get(this.ServerUrl +`/itemMst/ItemTypeNew?itemType=Labor&divisionId=${divisionId}&dept=${deptname}`, { headers: this.headers });
  
} 
splitRatioListFN() : Observable<any> {
  return this.http.get(this.ServerUrl +`/billableTy/splitRatio`, { headers: this.headers });
} 

disCategoryListFn() : Observable<any> {
  return this.http.get(this.ServerUrl +`/cmnLookup/type/srvDisType`, { headers: this.headers });
} 

bayTypeLst() : Observable<any> {
  return this.http.get(this.ServerUrl +`/byCodeMst`, { headers: this.headers });
  
} 



TechnicianListFN(locId) : Observable<any> {
  return this.http.get(this.ServerUrl +`/teamMaster/techDtls/${locId}`, { headers: this.headers });
} 
priceListFN(locId,segment) : Observable<any> {
  return this.http.get(this.ServerUrl +`/jobCard/labPrice?labCode=${segment}&srvModel=RN&locId=${locId}`, { headers: this.headers });
} 
priceListDivisionFN(segment,serModel,locId,ouId) : Observable<any> {
  return this.http.get(this.ServerUrl +`/jobCard/labPrice?labCode=${segment}&srvModel=${serModel}&locId=${locId}&ouId=${ouId}`, { headers: this.headers });
} 
jobCardCount(jobNum) : Observable<any> {
  return this.http.get(this.ServerUrl +`/jobCard//dpPreInvPrintStatus/${jobNum}`, { headers: this.headers });
} 

jobCardCountDp(jobNum): Observable<any> {
  return this.http.get(this.ServerUrl +`/jobCard//CustPreInvPrintStatus/${jobNum}`, { headers: this.headers });
} 

MatImptWipFn(jobCardNum,locId) : Observable<any> {
  return this.http.get(this.ServerUrl +`/jobCard/partLines?jobNum=${jobCardNum}&locId=${locId}`, { headers: this.headers });
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


generateServiceGatePass(regNo,mlocId,balAmt,authBy,dType){
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + `/SRGatepass/SRVGatepass?regNo=${regNo}&locId=${mlocId}&osAmt=${balAmt}&delAuthBy=${authBy}&delvType=${dType}`;
  return this.http.post(url, options);
 
}


printWsGatePass(jcNumber,gpNum,locId){
  
  const REQUEST_URI = this.ServerUrl +`/SRGatepass/printSrvGatePass?vehicleNo=${jcNumber}&gatepassId=${gpNum}`;  
  return this.http.get(REQUEST_URI, {
  responseType: 'arraybuffer',
  headers: this.headers,
});

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
  
     const REQUEST_URI = this.ServerUrl +`/jobCard/wsPreInvoicePrint/${jcNumber}`;
     return this.http.get(REQUEST_URI, {
     
       responseType: 'arraybuffer',
       headers: this.headers,
     });
  
  
 }

printWsPreInvdocumentDp(jcNumber,jtype,custtp){
 
  if (custtp==='cust') {
    const REQUEST_URI = this.ServerUrl +`/jobCard/dpPreInvCust/${jcNumber}`;
    return this.http.get(REQUEST_URI, {
     
      responseType: 'arraybuffer',
      headers: this.headers,
    }); 
  }

  if (custtp==='ins') {
    const REQUEST_URI = this.ServerUrl +`/jobCard/dpPreInvInsu/${jcNumber}`;
    return this.http.get(REQUEST_URI, {
     
      responseType: 'arraybuffer',
      headers: this.headers,
    }); 
  }
  
}

printWsInvoicedocument(jcNumber,jtype){
    const REQUEST_URI = this.ServerUrl +`/jobCard/wsInvoicePrint/${jcNumber}`;  
    return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

printWsAddonInvoicedocument(jcNumber,jtype){
  const REQUEST_URI = this.ServerUrl +`/jobCard/wsAddonPrint/${jcNumber}`;  
   return this.http.get(REQUEST_URI, {
   responseType: 'arraybuffer',
   headers: this.headers,
 });
}



printWsInvoicedocumentDp(jcNumber,jtype,custtp){
 
      if (custtp==='cust') {
        const REQUEST_URI = this.ServerUrl +`/jobCard/dpCustInvoice/${jcNumber}`;  
        return this.http.get(REQUEST_URI, {
        responseType: 'arraybuffer',
        headers: this.headers,
      });
      }  

    if (custtp==='ins') {
      const REQUEST_URI = this.ServerUrl +`/jobCard/dpInsInvoice/${jcNumber}`;  
      return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
    }  


}


printVehicleHistory(vehNum){
  
  const REQUEST_URI = this.ServerUrl +`/jobCard/vehHistory/${vehNum}`;  
  return this.http.get(REQUEST_URI, {
  responseType: 'arraybuffer',
  headers: this.headers,
});


}

}
