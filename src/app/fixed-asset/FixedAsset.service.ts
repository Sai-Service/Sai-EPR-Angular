import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FixedAssetService {

  httpclient: any;
  headers: any;
  receiptNumber:number;

  // ServerUrl='http://saireplica.horizon.org:8080/ErpReplica';  
  ServerUrl='http://localhost:8081'; 
  // ServerUrl='http://saihorizon.com:8080/ErpReplica'
   
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
   }

   public getSearchfiscal(): Observable<any> {
    return this.http.get(this.ServerUrl + `/fiscalYr/FA%20Calendar`);
  }

  public getSearchConvention(): Observable<any> {
    return this.http.get(this.ServerUrl + `/faConnTy/DAILY`);
  }
  public getSearchCal(): Observable<any> {
    return this.http.get(this.ServerUrl + `/faCalTy/calTypeWise/Deprn%20Period`);
  }

  public getDepriciation(methodtyp): Observable<any> {
    return this.http.get(this.ServerUrl + `/faMethods/methodWise/${methodtyp}`);
  }

  /////////////////Book Control/////////////////////
  public getBookControl(booktyp): Observable<any> {
    return this.http.get(this.ServerUrl + `//faBookCtrl/bookTypeWise/${booktyp}`);
  }
}
