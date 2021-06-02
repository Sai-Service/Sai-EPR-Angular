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

  priceListNameList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist`);
  }
  

  public OrderBook(BookRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/orderHeader/Entered';  
    return this.http.post(url, BookRecord, options);
  }


  accountNoSearchFn(accountNo,ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/getByAccountNo?accountNo=${accountNo}&ouId=${ouId}`);
  }

  VariantSearchFn(mainModel): Observable<any> {
    return this.http.get(this.ServerUrl + `/VariantMst/VariantList/${mainModel}`);
  }


  ticketNoSearchFn(ticketNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/teamMaster/TicketNowise?ticketNo=${ticketNo}`);
  }

  ColourSearchFn(variant): Observable<any> {
    return this.http.get(this.ServerUrl + `/VariantMst/ColorList/${variant}`);
  }



  // ////////////////************Order Payment Receipt **************//////////////////
  PaymentModeList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/fndAcctLookup/lookupTypeWise/PayType');
  } 

  getOmReceiptSearchByOrdNo(orderNumber): Observable<any> {
    alert("MS>>ORDER number :" +orderNumber);
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

  
  
  // ************Deallotment Form**************/////////////////
  
  Deallotmentsearchlist(ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/DeAllotment/${ouId}`);
  }
  
  // http://localhost:8081/orderHeader/deallotment?orderNumber=2111242153&segment=MVSAA4CZ2-ZQD-278852
  DeallocateSubmit(orderNumber,segment) {
    const REQUEST_PARAMS = new HttpParams().set('orderNumber', orderNumber)
    .set('segment', segment)

    const REQUEST_URI = this.ServerUrl +`/orderHeader/deallotment?orderNumber=${orderNumber}&segment=${segment}`;
    return this.http.put(REQUEST_URI, {
      params: REQUEST_PARAMS,

    });
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




// ***************************** Allotment Form ****************************
allotmentSearch(): Observable<any> {
   return this.http.get(this.ServerUrl + `/orderHeader/Allotment`);
}

allotmentVehicleSearch(model,color,variant,locId): Observable<any> {
   return this.http.get(this.ServerUrl + `/orderHeader/StockList?mainModel=${model}&colorCode=${color}&variantCode=${variant}&locationId=${locId}`);
}



public allotmentSubmit(allotedChassisArray) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/orderHeader/allotment/';  
  return this.http.post(url,allotedChassisArray,  options);
}

}
