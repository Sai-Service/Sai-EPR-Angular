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

  spstktrfMdSummaryReport(invcDt1,invcDt4,locId,tolocId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprStkTrfMade?fromDate=${invcDt1}&toDate=${invcDt4}&fromLoc=${locId}&toLoc=${tolocId}`;
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
}

