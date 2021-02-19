import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  httpclient: any;
  headers: any;

  // ServerUrl='http://saireplica.horizon.org:8080/ErpReplica';  
  ServerUrl='http://localhost:8081'; 

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
   }

  

  public getsearchByApINV(content) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/apInv/Search';  
    return this.http.post(url, content, options);
  }

  getApInvLineDetails(invoiceNum): Observable<any> {
    return this.http.get(this.ServerUrl + `/apInv/invDtls/${invoiceNum}`);
  }

  distLinesDeatailsfa(invoiceId,lineNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/apInv/apinvDisLinewise?invoiceId=${invoiceId}&distLineNumber=${lineNumber}`);
  }

  paymentMethodList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/locationMst');
  } 


  prepayTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/locationMst');
  } 

   public apInvSaveSubmit(poRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/apInv';  
    return this.http.post(url, poRecord, options);
  }

  distributionSetNameList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/ApDistSetAll');
  }

}
