import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable,from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderManagementService {
  httpclient: any;
  headers: any;

  // ServerUrl='http://saireplica.horizon.org:8080/ErpReplica';  
  // ServerUrl = 'http://localhost:8081';
  ServerUrl='http://saihorizon.com:8080/ErpReplica'


  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  getsearchByOrderNo(orderNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/${orderNumber}`);
  }

  categoryList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemCategory/type1`);
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

  //http://localhost:8081/itemMst/ByCatType?itemCatType=SS_SPARES&divId=1
  getItemByCatType(itemCatType, divId): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/ByCatType?itemCatType=${itemCatType}&divId=${divId}`)
  }


  orderTypeList(deptId,locId,ouId): Observable<any> {
    return this.http.get(this.ServerUrl +`/OrderTrnType/otAccSpList?deptId=${deptId}&locId=${locId}&ouId=${ouId}`);
  }


  counterSaleOrderSearch(orderNumber): Observable<any> {
    return this.http.get(this.ServerUrl +`/orderHeader/ACSP/${orderNumber}`);
  }


  UpdateCounterSaleInv(UpdateCounterSaleInvRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/orderHeader/pickTicketLineUpdate`);
    return this.http.put(url, UpdateCounterSaleInvRecord, options);
  }

    
  downloadCSPreINV(orderNumber) {
    const REQUEST_URI = `http://saihorizon.com:8080/ErpReplica//orderHeader/cntrTaxPreInvPrint/${orderNumber}`; 
    // local
    // const REQUEST_URI = `http://localhost:8081//orderHeader/cntrTaxPreInvPrint/${orderNumber}`;    
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  downloadCSINV(InvoiceNumber){
    const REQUEST_URI = ` http://saihorizon.com:8080/ErpReplica//orderHeader/cntrTaxInvPrint/${InvoiceNumber}`;  
    // local
   
    // const REQUEST_URI = `http://localhost:8081//orderHeader/cntrTaxInvPrint/${InvoiceNumber}`;    
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }
  
  downloadVehicleINV(InvoiceNumber){
    const REQUEST_URI = ` http://saihorizon.com:8080/ErpReplica//orderHeader/salesTaxInv/${InvoiceNumber}`;  
    // local
    // const REQUEST_URI = `http://localhost:8081//orderHeader/salesTaxInv/${InvoiceNumber}`;    
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  public  countersaleReadyForInvFn(orderNumber){
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/orderHeader/AccSp/InvoiceStatus?orderNumber=${orderNumber}`;
    return this.http.put(url, options);
  }



  
  public countersaleInvFn(orderNumber) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/arInv/inserDtls/${orderNumber}`;
    return this.http.post(url, orderNumber, options);
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

  public AccLineSave(AccLineRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/orderHeader/postAccItems';
    return this.http.post(url, AccLineRecord, options);
  }

// **************** counter Sale order Save post *****************************/////

  public SaveCounterSaleOrder(AccLineRecord1) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/orderHeader/postAccSPOrders';
    return this.http.post(url, AccLineRecord1, options);
  }
  

  // **************** counter Sale order Save post *****************************/////

//////// pick ticket invoice post ********************** /////


public pickTicketInvoiceFun(pickTicketInvDels) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/orderHeader/postAccSPPickTckt';
  return this.http.post(url, pickTicketInvDels, options);
}


  // accountNoSearchFn(accountNo, ouId): Observable<any> {
  //   return this.http.get(this.ServerUrl + `/Customer/getByAccountNo?accountNo=${accountNo}&ouId=${ouId}`);
  // }
  accountNoSearchFn1(accountNo, ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/getBillToAccountNo?accountNo=${accountNo}&ouId=${ouId}`);
  }

  // VariantSearchFn(mainModel): Observable<any> {
  //   return this.http.get(this.ServerUrl + `/VariantMst/VariantList/${mainModel}`);
  // }



  // ColourSearchFn(variant): Observable<any> {
  //   return this.http.get(this.ServerUrl + `/VariantMst/ColorList/${variant}`);
  // }



  accountNoSearchFn(accountNo,ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/getByAccountNo?accountNo=${accountNo}&ouId=${ouId}`);
    // return this.http.get(this.ServerUrl + `/Customer/getBillToAccountNo?accountNo=${accountNo}&ouId=${ouId}`);
  }

  contactNoSearchFn(mobile1, ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/contactNo?mobile1=${mobile1}&ouId=${ouId}`);
  }

  othRefNoSearchFn(othRefNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/getSaleOrderInfo/${othRefNo}`);
  }


  custNameSearchFn(custName, ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/custName?custName=${custName}&ouId=${ouId}`);
  }


  VariantSearchFn(mainModel): Observable<any> {
    // alert("MS>> "+mainModel);
    if(mainModel !=null) {
    return this.http.get(this.ServerUrl + `/VariantMst/VariantList/${mainModel}`);
    }
  }


  ticketNoSearchFn(salesRepName,dept): Observable<any> {
    return this.http.get(this.ServerUrl + `/teamMaster/TicketNowise?ticketNo=${salesRepName}&dept=${dept}`);
  }

  ColourSearchFn(variant): Observable<any> {
    if(variant !=null) {
     return this.http.get(this.ServerUrl + `/VariantMst/ColorList/${variant}`);
    }
  }



  // ////////////////************Order Payment Receipt **************//////////////////
  PaymentModeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/PayType');
  }

  getOmReceiptSearchByOrdNo(orderNumber): Observable<any> {
    // alert("MS>>order number :" + orderNumber);
    if(orderNumber !=null){
    return this.http.get(this.ServerUrl + `/omPayment/${orderNumber}`);
  }
  }




  ReceiptMethodList(mPaytype, mLocId, mStatus): Observable<any> {
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
  DeallocateSubmit(orderNumber, segment) {
    const REQUEST_PARAMS = new HttpParams().set('orderNumber', orderNumber)
      .set('segment', segment)

    const REQUEST_URI = this.ServerUrl + `/orderHeader/deallotment?orderNumber=${orderNumber}&segment=${segment}`;
    return this.http.put(REQUEST_URI, {
      params: REQUEST_PARAMS,

    });
  }



  getOmReceiptSearchBy(rcptNumber, orderNumber, custAcNumber): Observable<any> {
    // getOmReceiptSearchBy(rcptNumber): Observable<any> {
    alert("MS>>RCPT NO : " + rcptNumber);
    var baseUrl = this.ServerUrl + '/arCashReceipts/Search?';
    var receipt, order, cust ;
    if (rcptNumber === undefined) {
    // baseUrl = baseUrl + '&receiptNumber=' ;
    receipt = '&receiptNumber=';
    }else{
      receipt = '&receiptNumber='+rcptNumber;
    }
    if (orderNumber === undefined) {
      order = '&orderNumber=';
    }else{
      order = '&orderNumber'+orderNumber;
    }
    if (custAcNumber === undefined) {
    //  baseUrl = baseUrl + '&accountNo=' ;
    cust =   '&accountNo=' ;
    }else{
      cust =  '&accountNo=' +custAcNumber;
    }
    return this.http.get(baseUrl +receipt+order+cust);
   // return this.http.get(this.ServerUrl + `/arCashReceipts/Search?accountNo=${custAcNumber}&orderNumber=${orderNumber}&receiptNumber=${rcptNumber}`);
    // receiptNumber=${rcptNumber}&baseorderNumber=${orderNumber}&accountNo=${custAcNumber}
  
  }



  getOmReceiptSearchByRcptNo(rcptNumber): Observable<any> {
    alert("MS>>Receipt number :" + rcptNumber);
    return this.http.get(this.ServerUrl + `/arCashReceipts/receipt/${rcptNumber}`);
  }

  getOmReceiptSearchByCustAcNo(custAcNumber): Observable<any> {
    alert("MS>>Customer Accunt number :" + custAcNumber);
    return this.http.get(this.ServerUrl + `/arCashReceipts/custmst/${custAcNumber}`);
  }




  // ***************************** Allotment Form ****************************
  allotmentSearch(orgId): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/Allotment/${orgId}`);
  }

  allotmentVehicleSearch(model, color, variant, locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/StockList?mainModel=${model}&colorCode=${color}&variantCode=${variant}&locationId=${locId}`);
  }



  public allotmentSubmit(allotedChassisArray) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/orderHeader/allotment/';
    return this.http.post(url, allotedChassisArray, options);
  }


  UpdateTaxCategoryLineWise(TaxCategoryupdate,) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/orderHeader/vehTaxCtgUpdate`);
    return this.http.put(url, TaxCategoryupdate, options);
  }

  UpdateSalesUpdateLine(UpdateSaleUpdateRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/orderHeader/salesOrderOtherLineSave`);
    return this.http.put(url, UpdateSaleUpdateRecord, options);
  }

}
