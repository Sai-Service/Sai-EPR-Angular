import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {
  httpclient: any;
  headers: any;

 
  ServerUrl='http://localhost:8081';
  // ServerUrl='http://saihorizon.com:8080/ErpReplica'

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
   }


   SPDebtorReport(invcDt1,locId){
    // const REQUEST_URI = `http://saihorizon.com:8080/ErpReplica/SparesReports/SprDebtors?toDate=${invcDt1}&locId=${locId}`;  
    // local
    const REQUEST_URI = `http://localhost:8081/SparesReports/SprDebtors?toDate=${invcDt1}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }
}
