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

  // public getsearchByPayment(content) {
  //   const options = {
  //     headers: this.headers
  //   };
  //   const url = this.ServerUrl + '/apInvPayment/paymentSupp';  
  //   return this.http.post(url, content, options);
  // }

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

  inventoryItemList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/itemMst');
  }

  getTaxDetails(taxCategoryId,invItemId, disAm,amount): Observable<any> {
    return this.http.get(this.ServerUrl +`/apInv/Aptaxcal?invId=${invItemId}&baseAmt=${amount}&taxCateId=${taxCategoryId}&disAmt=${disAm}`);
  }

//=======================================Payment Componanat==============================
getsearchByPayment(suppNo): Observable<any> {
  return this.http.get(this.ServerUrl + `/apInvPayment/paymentSupp/${suppNo}`);
}

getsearchByInvDtls(suppNo,ouId): Observable<any> {
  return this.http.get(this.ServerUrl + `/apInvPayment/paymentSupp?suppNo=${suppNo}&ouId=${ouId}`);
}


bankAccountNumList(ouId): Observable<any> {
  return this.http.get(this.ServerUrl +`/ceBankAccounts/BankList/${ouId}`);
}  

docCategoryCodeList(bankAccountId): Observable<any> {
  return this.http.get(this.ServerUrl +`/cePaymentDoc/PayDoc/${bankAccountId}`);
} 


paymentDocNameList(docCategoryCode): Observable<any> {
  return this.http.get(this.ServerUrl +`/cePaymentDoc/DocName/${docCategoryCode}`);
} 

public paymentSaveSubmit(poRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/apInvPayment/NewPost';  
  return this.http.post(url, poRecord, options);
}

}
