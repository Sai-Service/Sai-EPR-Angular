import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderManagementService {
  httpclient: any;
  headers: any;

  // ServerUrl='http://saireplica.horizon.org:8080/ErpReplica';  
  ServerUrl='http://localhost:8081'; 
  // ServerUrl='http://saihorizon.com:8080/ErpReplica'


  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  getsearchByOrderNo(orderNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/${orderNumber}`);
  }


  getFinTypeSearch1(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/FinanceType`);
  }
  getFinNameSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/FinanceType`);
  }

  ItemIdList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/category`);
  }
  addonItemList(category): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/segmentLike/${category}`);
  }

  addonDescList(segment): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/segmentLike/${segment}`);
  }

}
