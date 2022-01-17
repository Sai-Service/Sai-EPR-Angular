import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ AppConstants} from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {
  httpclient: any;
  headers: any;
  ServerUrl : string;
 

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.ServerUrl = AppConstants.ServerUrl;
   }


   SPDebtorReport(invcDt1,locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprDebtors?toDate=${invcDt1}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  stockMadeDetailsReport(fromDate, toDate,stockMadeToFromLoc,tolocId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprStkTrfMade?fromDate=${fromDate}&toDate=${toDate}&fromLoc=${stockMadeToFromLoc}&toLoc=${tolocId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  spstktrfMdSummaryReport(invcDt1,invcDt4,locId,tolocId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprStkTrfMadeSummary?fromDate=${invcDt1}&toDate=${invcDt4}&fromLoc=${locId}&toLoc=${tolocId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  SprStkTrfRecdDtlsReport(invcDt1,invcDt4,locId,tolocId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprStkTrfRecdDtls?fromDate=${invcDt1}&toDate=${invcDt4}&fromLoc=${locId}&toLoc=${tolocId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  SprStkTrfRecdSummaryReport(invcDt1,invcDt4,locId,tolocId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprStkTrfRecdSummary?fromDate=${invcDt1}&toDate=${invcDt4}&fromLoc=${locId}&toLoc=${tolocId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  SprcusttakestatReport(invcDt1,invcDt4,locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/CustomerOffTake?fromDate=${invcDt1}&toDate=${invcDt4}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  JobCardSummaryReport(invcDt1,invcDt4,locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/JobCardSummary?fromDate=${invcDt1}&toDate=${invcDt4}&fromLoc=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  spIssueDetailsReport(invcDt1,invcDt4,locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprIssueDtls?fromDate=${invcDt1}&toDate=${invcDt4}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  spIssueSummaryReport(invcDt1,invcDt4,locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprIssueSummary?fromDate=${invcDt1}&toDate=${invcDt4}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  performaRegister(invcDt1,invcDt4,locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/ProformaIssueDtls?fromDate=${invcDt1}&toDate=${invcDt4}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  spstktrfMdReport(invcDt1,invcDt4,locId,tolocId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprStkTrfMade?fromDate=${invcDt1}&toDate=${invcDt4}&fromLoc=${locId}&toLoc=${tolocId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  stklgrtReport(invcDt1,invcDt4,subInv,segment,locId,stkLgrUserName){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/StockLedger?fromDate=${invcDt1}&toDate=${invcDt4}&subInvCode=${subInv}&partNo=${segment}&locId=${locId}&userName=${stkLgrUserName}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  spIssSmryReport(fromDate,toDate,locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprIssueSummary?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  spproformaReport(fromDate,toDate,locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/ProformaIssueDtls?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  spcreditnotregReport(fromDate,toDate,locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprCreditNoteRegister?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  sppurRegiSummReport(fromDate,toDate,locId,deptId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/PurchaseRegisterSummary?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}&deptId=${deptId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  sppurRegidetailReport(fromDate,toDate,locId,deptId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/PurchaseRegisterDtls?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}&deptId=${deptId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  spclosstrockReport(locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprClosingStk?locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  spstktrfRecivedReport(fromDate,toDate,shipFromLocId,shipToLocId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprStkTrfRecdDtls?fromDate=${fromDate}&toDate=${toDate}&shipToLoc=${shipFromLocId}&shipFromLoc=${shipToLocId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  spstktrfRecivedSumReport(fromDate,toDate,shipFromLocId,shipToLocId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprStkTrfRecdSummary?fromDate=${fromDate}&toDate=${toDate}&shipToLoc=${shipFromLocId}&shipFromLoc=${shipToLocId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  stockLedgerReport(fromDate, toDate, subInvCode, partNo,locId,userName){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/StockLedger?fromDate=${fromDate}&toDate=${toDate}&subInvCode=${subInvCode}&partNo=${partNo}&locId=${locId}&userName=${userName}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

 

  getLocationSearch1(ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/locListOuwise/${ouId}`);
  }


  spReceiptRegisterReport(fromDate,toDate,locId,deptId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprReceiptRegister?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}&deptId=${deptId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }



  //////////////////////////// Service URL Srarted /////////////////////////

  


  jobSummaryReport(fromDate,toDate,locId){
    const REQUEST_URI = this.ServerUrl +`/ServiceReports/JobCardSummary?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  servindToDtReport(fromDate,toDate,locId){
    const REQUEST_URI = this.ServerUrl +`/ServiceReports/ServiceIndRep?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


///////////////////// Sales Reports API Starts ////////////////////

vhslRegisterReport(fromDate,toDate,locId){
  const REQUEST_URI = this.ServerUrl +`/SalesReports/VehSalesReg?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    // params: REQUEST_PARAMS,
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

salesINDReport(fromDate,toDate,locId){
  const REQUEST_URI = this.ServerUrl +`/SalesReports/VehIndReg?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    // params: REQUEST_PARAMS,
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

salesbookingregReport(fromDate,toDate,locId){
  const REQUEST_URI = this.ServerUrl +`/SalesReports/VehBookReg?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    // params: REQUEST_PARAMS,
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

}

