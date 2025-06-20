import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ AppConstants} from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  httpclient: any;
  headers: any;
  ServerUrl : string;
  lstcommentsUserSm = JSON.parse(sessionStorage.getItem('logRes'));
  token = this.lstcommentsUserSm.token;


  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.headers = this.headers.append("Authorization", "Bearer " + this.token);
    this.ServerUrl = AppConstants.ServerUrl;
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
  
  // BankNameListFn(): Observable<any> {
  //   return this.http.get(this.ServerUrl +'/ceBankBranch/custName/edp');
  // } 
  
  BankNameListFn(): Observable<any> {
    return this.http.get(this.ServerUrl +'/Customer/ClassCode/BANK',{ headers: this.headers });
  } 
  BankNameList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/Customer/ClassCodeCompany',{ headers: this.headers });
  } 
  BankBranchList(BkName): Observable<any> {
    return this.http.get(this.ServerUrl +`/ceBankBranch/branchList/${BkName}`,{ headers: this.headers });
  } 
  

  BankAcccountList(bkBranchName,bkName): Observable<any> {
      return this.http.get(this.ServerUrl +`/abc/${bkBranchName}${bkName}`,{ headers: this.headers });

  } 

  BankAcDtlsList(bkBranchName): Observable<any> {
    return this.http.get(this.ServerUrl +`/ceBankAccounts/BranchwiseBankAcct/${bkBranchName}`,{ headers: this.headers });
  } 

  BranchSearchFn(bkBranchName): Observable<any> {
    return this.http.get(this.ServerUrl +`/ceBankBranch/branchName/${bkBranchName}`,{ headers: this.headers });
  } 
  BranchNumberSearchFn(bkBranchNoName): Observable<any> {
    return this.http.get(this.ServerUrl +`/ceBankBranch/branchNo/${bkBranchNoName}`,{ headers: this.headers });
  } 

public BankBranchCreation(bankBranchRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/ceBankBranch/post';  
  return this.http.post(url, bankBranchRecord, options);
}
  }

