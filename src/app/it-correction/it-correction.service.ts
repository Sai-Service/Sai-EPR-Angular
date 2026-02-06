import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { AppConstants } from '../app-constants'

@Injectable({
  providedIn: 'root'
})
export class ItCorrectionService {
httpclient: any;
  headers: any;
  ServerUrl: string;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.ServerUrl = AppConstants.ServerUrl;
  }
custNameSearchFn1(custName: any): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/getCustDetails?custName=${custName}`, { headers: this.headers });
  }

  searchCustomerByAccount(accountNo:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/getByCustAcctNo?accountNo=${accountNo}`);
  }

  getIssueTypes(): Observable<any> {
    return this.http.get(
      this.ServerUrl + `/cmnLookup/issueTypes`,
      { headers: this.headers }
    );
  }

  // getReferenceTypes(): Observable<any> {
  //   return this.http.get(
  //     this.ServerUrl + `/cmnLookup/issueSubTypes`,
  //     { headers: this.headers }
  //   );
  // }
  getReferenceTypes(issueType: string): Observable<any> {
    return this.http.get(
      this.ServerUrl + `/cmnLookup/getIssueSubTypeByIssueType?issueType=` + issueType,
      { headers: this.headers }
    );
  }

  updateItCorrection(payload: any) {
    return this.http.post(
      this.ServerUrl + '/bajajIssues/updateCustDetails',
      payload
    );
  }

  getCustomerDetailsByOrderNo(orderNumber: string): Observable<any> {
    return this.http.get(
      this.ServerUrl + `/orderHeader/getCustDetByOrderNo?orderNumber=${orderNumber}`,
      { headers: this.headers }
    );
  }

  getOrderStatus(orderNumber: string): Observable<any> {
    return this.http.get(
      this.ServerUrl + `/orderHeader/getOrderStatus?orderNumber=${orderNumber}`,
      { headers: this.headers }
    );
  }
  
  getAccApproverNames(): Observable<any> {
    return this.http.get(
      this.ServerUrl + `/bajajIssues/getAccApprName`,
      { headers: this.headers }
    );
  }
  
  getDetailsByVehicleNo(regNo: string): Observable<any> {
    return this.http.get(
      this.ServerUrl + `/bajajIssues/getDetByRegNo?regNo=${regNo}`,
      { headers: this.headers }
    );
  }
  
  getDetailsByJobCardNo(jobCardNo: string): Observable<any> {
    return this.http.get(
      this.ServerUrl + `/bajajIssues/getDetByJobCardNo?jobCardNo=${jobCardNo}`,
      { headers: this.headers }
    );
  }
}

