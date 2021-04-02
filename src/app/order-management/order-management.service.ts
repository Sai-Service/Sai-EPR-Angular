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

  

  public OrderBook(BookRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/orderHeader/HeaderPayment';  
    return this.http.post(url, BookRecord, options);
  }


  // ////////////////************Order Payment Receipt **************//////////////////
  PaymentModeList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/fndAcctLookup/lookupTypeWise/PayType');
  } 

  getOmReceiptSearchByOrdNo(orderNumber): Observable<any> {
    alert("MS>>order number :" +orderNumber);
    return this.http.get(this.ServerUrl + `/omPayment/${orderNumber}`);
  }


  ReceiptMethodList(mPaytype ,mLocId,mStatus): Observable<any> {
    // alert("Master Service :"+ mPaytype+" "+mLocId+" " +mStatus);
    return this.http.get(this.ServerUrl + `/receiptMethod?methodType=${mPaytype}&locId=${mLocId}&status=${mStatus}`);
  }



  public OrderReceiptSubmit(OrderReceiptRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/omPayment/omPayment';  
    return this.http.post(url, OrderReceiptRecord, options);
  }   

  
  
 
  getOmReceiptSearchBy(rcptNumber,orderNumber,custAcNumber): Observable<any> {
    // getOmReceiptSearchBy(rcptNumber): Observable<any> {
    alert("MS>>RCPT NO : " +rcptNumber );
    // + " ORD NO : " + orderNumber +" cust no : " +custAcNumber );
    return this.http.get(this.ServerUrl + `/arCashReceipts/Search?accountNo=${custAcNumber}&orderNumber=${orderNumber}&receiptNumber=${rcptNumber}`);
    // receiptNumber=${rcptNumber}&orderNumber=${orderNumber}&accountNo=${custAcNumber}
   
  }



  getOmReceiptSearchByRcptNo(rcptNumber): Observable<any> {
    alert("MS>>Receipt number :" +rcptNumber);
    return this.http.get(this.ServerUrl + `/arCashReceipts/receipt/${rcptNumber}`);
  }

  getOmReceiptSearchByCustAcNo(custAcNumber): Observable<any> {
    alert("MS>>Customer Accunt number :" +custAcNumber);
    return this.http.get(this.ServerUrl + `/arCashReceipts/custmst/${custAcNumber}`);
  }








}
