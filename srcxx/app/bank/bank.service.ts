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


  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
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
    return this.http.get(this.ServerUrl +'/Customer/ClassCode/BANK');
  } 
  BankNameList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/Customer/ClassCodeCompany');
  } 
  BankBranchList(BkName): Observable<any> {
    return this.http.get(this.ServerUrl +`/ceBankBranch/branchList/${BkName}`);
  } 
  

  BankAcccountList(bkBranchName,bkName): Observable<any> {
      return this.http.get(this.ServerUrl +`/abc/${bkBranchName}${bkName}`);

  } 

  BankAcDtlsList(bkBranchName): Observable<any> {
    return this.http.get(this.ServerUrl +`/ceBankAccounts/BranchwiseBankAcct/${bkBranchName}`);
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

  getInterBranch(InterBranch1:any, lType:any): Observable<any> {
    const REQUEST_PARAMS = new HttpParams().set('lookupType', lType).set('lookupValue', InterBranch1)
    const REQUEST_URI = this.ServerUrl + '/fndAcctLookup/lookupTypeValueWise';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,
      headers: this.headers,
    });
  }

 
  
  // service.ts
getBankAccUsesList() {
  return this.http.get<any>('http://localhost:8081/ceBankAccUses/list');
}

getBranchesByBankId(bankId: number) : Observable<any>{
  return this.http.get(
    //this.ServerUrl + `/ceBankBranch/branch?BankId=${bankId}`
    this.ServerUrl + `/ceBankBranch/getBranchesByBank?bankId=${bankId}`
  );
}

 public BankBranchupdation(bankBranchRecord: any) {
    const options = {
      headers: this.headers
    };
    // const url = this.ServerUrl + '/ceBankBranch/post'; 
    const url = this.ServerUrl + '/ceBankBranch/updatebranchinfo';
    return this.http.put(url, bankBranchRecord, options);
  }

  getBankAccountDetails(accountName: string):Observable<any> {
  return this.http.get(this.ServerUrl + `/ceBankAccounts/bankAccountName/${accountName}`
  );
}

 BankBranchList1(bankId: any): Observable<any> {
    return this.http.get(this.ServerUrl + `/ceBankAccounts/getBranchesByBank/?bankId=${bankId}`, { headers: this.headers });
  }

   public bankUpdationFun(bankRecord: any) {
    const options = {
      headers: this.headers
    };
    // const url = this.ServerUrl + '/ceBankAccounts/post';
    const url = this.ServerUrl + '/ceBankAccounts/accountInfo';
    return this.http.put(url, bankRecord, options);
  }

  getBankAccUseById(id: number) : Observable<any> {
  return this.http.get(this.ServerUrl + `/ceBankAccUses/bankAccUseId/${id}`
  );
}

 public updateBankAccUses(bankRecord:any) {
    const options = {
      headers: this.headers
    };
    // const url = this.ServerUrl + '/ceBankAccUses/post';  
    const url = this.ServerUrl + `/ceBankAccUses/bankaccInfo`;  
    return this.http.put(url,bankRecord, options);
  }

}

