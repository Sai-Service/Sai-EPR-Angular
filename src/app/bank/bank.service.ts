// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class BankService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  httpclient: any;
  headers: any;

  // ServerUrl='http://saireplica.horizon.org:8080/ErpReplica';  
  ServerUrl='http://localhost:8081'; 
  // ServerUrl='http://saihorizon.com:8080/ErpReplica'

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
   }
///////////////BANK ACCOUNT USES///////////////

public BankAccUseFun(bankRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/ceBankAccUses/post';  
  return this.http.post(url,bankRecord, options);
}
////////////////////////NEW BANK Account CREATION/////////////////
   public bankCreationFun(bankRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/ceBankAccounts/post';  
    return this.http.post(url,bankRecord, options);
  }
  ///////////////////////BANK BRANCH CREATION///////////
  BankNameListFn(): Observable<any> {
    return this.http.get(this.ServerUrl +'/ceBankBranch/custName/edp');
  } 
  BankNameList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/Customer/ClassCodeCompany');
  } 
  BankBranchList(BkName): Observable<any> {
    return this.http.get(this.ServerUrl +`/ceBankBranch/branchList/${BkName}`);
  } 

  BankAcDtlsList(bkBranchName){
    return this.http.get(this.ServerUrl +`/ceBankBranch/branchList/${bkBranchName}`);
  }
  BankAcccountList(bkBranchName,bkName): Observable<any> {
    return this.http.get(this.ServerUrl +`/abc/${bkBranchName}${bkName}`);
  } 
  BranchSearchFn(bkBranchName): Observable<any> {
    return this.http.get(this.ServerUrl +`/ceBankBranch/branchName/${bkBranchName}`);
  } 
  BranchNumberSearchFn(bkBranchNoName): Observable<any> {
    return this.http.get(this.ServerUrl +`/ceBankBranch/branchNo/${bkBranchNoName}`);
  } 

public BankBranchCreation(bankBranchRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/ceBankBranch/post';  
  return this.http.post(url, bankBranchRecord, options);
}
  }

