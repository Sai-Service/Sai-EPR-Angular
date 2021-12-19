import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable,from } from 'rxjs';
import{ AppConstants} from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class OrderManagementService {
  httpclient: any;
  headers: any;
  ServerUrl : string;


  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.ServerUrl = AppConstants.ServerUrl;
  }

  getsearchByOrderNo(orderNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/${orderNumber}`);
  }

  

  categoryList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemCategory/type`);
  }

  categoryList1(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/ITEM_TYPE`);
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

  searchByItemSegmentDiv(divId,itemSeg):Observable<any>
{
    return this.http.get(this.ServerUrl+`/itemMst/details/${divId}/${itemSeg}`)
 
  // http://localhost:8081/itemMst/searchBydesc/2/ring
}

  orderTypeList(deptId,ouId): Observable<any> {
    return this.http.get(this.ServerUrl +`/OrderTrnType/otAccSpList?deptId=${deptId}&ouId=${ouId}`);
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


    
  downloadCSPreINV(orderNumber) :Observable<any> {
    // const REQUEST_URI = `http://saihorizon.com:8080/ErpReplica//orderHeader/cntrTaxPreInvPrint/${orderNumber}`; 
    // local
    const REQUEST_URI = this.ServerUrl +`//orderHeader/cntrTaxPreInvPrint/${orderNumber}`;   
    return this.http.get(REQUEST_URI, { 
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  downloadCSINV(InvoiceNumber){
    // const REQUEST_URI = `http://saihorizon.com:8080/ErpReplica/orderHeader/cntrTaxInvPrint/${InvoiceNumber}`;  
    // local
    const REQUEST_URI = this.ServerUrl +`//orderHeader/cntrTaxInvPrint/${InvoiceNumber}`;     
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }
  
  downloadBajajCSINV(InvoiceNumber){
    // const REQUEST_URI = `http://saihorizon.com:8080/ErpReplica/orderHeader/bajajSpares/${InvoiceNumber}`;  
    // local
    const REQUEST_URI = this.ServerUrl +`/orderHeader/bajajSpares/${InvoiceNumber}`;    
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  viewGatePass(orderNumber){
    // const REQUEST_URI = `http://saihorizon.com:8080/ErpReplica/orderHeader/SS_SPAC_Gatepass/${orderNumber}`;  
    // local
    const REQUEST_URI = this.ServerUrl +`/orderHeader/SS_SPAC_Gatepass/${orderNumber}`;    
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  viewReceipt(orderNumber){
    // const REQUEST_URI = `http://saihorizon.com:8080/ErpReplica/omPayment/counterSaleReceipt/${orderNumber}`;  
    // local
    const REQUEST_URI = this.ServerUrl +`/omPayment/counterSaleReceipt/${orderNumber}`;    
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  downloadVehicleINV(InvoiceNumber){
    // const REQUEST_URI = `http://saihorizon.com:8080/ErpReplica/orderHeader/salesTaxInv/${InvoiceNumber}`;  
    // local
    const REQUEST_URI = this.ServerUrl +`/orderHeader/salesTaxInv/${InvoiceNumber}`;    
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }



  downloadAddonINV(InvoiceNumber){
    // const REQUEST_URI = `http://saihorizon.com:8080/ErpReplica/orderHeader/addonTaxInv/${InvoiceNumber}`;  
    // local
    const REQUEST_URI = this.ServerUrl +`/orderHeader/addonTaxInv/${InvoiceNumber}`;    
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  createInvoiceAll(orderNumber,emplId) {
    const REQUEST_PARAMS = new HttpParams().set('orderNumber', orderNumber)
      .set('emplId', emplId)
  
    const REQUEST_URI = this.ServerUrl + `/arInv/inserDtls?orderNumber=${orderNumber}&emplId=${emplId}`;
    return this.http.post(REQUEST_URI, {
      params: REQUEST_PARAMS,
  
    });
  }
  

 
  downloadGatePass(InvoiceNumber){
    // const REQUEST_URI = `http://saihorizon.com:8080/ErpReplica/salesGatePass/print/${InvoiceNumber}`;  
    // local
    const REQUEST_URI = this.ServerUrl +`/salesGatePass/print/${InvoiceNumber}`;    
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

  // addonDescList1(segment,taxCategoryName,priceListHeaderId): Observable<any> {
  //   return this.http.get(this.ServerUrl + `/itemMst/segmentLike?segment=${segment}&taxCategoryName=${taxCategoryName}&priceListHeaderId=${priceListHeaderId}`);
  // }


  addonDescList1(segment, taxCategoryName, priceListHeaderId):Observable<any> {
    const REQUEST_PARAMS = new HttpParams().set('segment', segment)
    .set('taxCategoryName', taxCategoryName)
    .set('priceListHeaderId', priceListHeaderId)
    const REQUEST_URI = this.ServerUrl +'/itemMst/segmentLike';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,
  
    });
  }
 
  getTaxCategoriesForSales(taxCategoryName,hsnTaxPer):Observable<any>{
    return this.http.get(this.ServerUrl +`/JaiTaxCatg/taxCateDtls?taxCatType=SALES&suppTaxCate=${taxCategoryName}&hsnTaxPer=${hsnTaxPer}`);
  }

  ItemDescList(segment,ouId):Observable<any>{
    return this.http.get(this.ServerUrl+`/JaiTaxCatg/IgstTaxCtg?itemId=${segment}&ouId=${ouId}`)
  }
  priceListNameList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist`);
  }

  priceListNameListDeptWise(divisionId,ouId,deptId): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist/prinHeader?divisionId=${divisionId}&ouId=${ouId}&deptId=${deptId}`);
  }

  priceListNameList1(ouId,divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist/priceHdr?ouId=${ouId}&divisionId=${divisionId}`);
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

  viewAllInvoice(orderNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/arInv/referenceNo/${orderNumber}`);
  }

// **************** counter Sale order Save post *****************************/////

  public SaveCounterSaleOrder(AccLineRecord1) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/orderHeader/postAccSPOrders';
    return this.http.post(url, AccLineRecord1, options);
  }
  
  
  genrateGatePass(genrateGatePass) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/orderHeader/postSPACGatepass`);
    return this.http.post(url, genrateGatePass, options);
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







  accountNoSearchFn2(accountNo,divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/getByAccountNo1?accountNo=${accountNo}&divisionId=${divisionId}`);
    // return this.http.get(this.ServerUrl + `/Customer/getBillToAccountNo?accountNo=${accountNo}&ouId=${ouId}`);
    // `/Customer/getByAccountNo?accountNo=${accountNo}&ouId=${ouId}`
  }

  custSideAddDet(id): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/site/${id}`);
  }

  accountNoSearchFn(accountNo,ouId,divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/getByAccountNo?accountNo=${accountNo}&ouId=${ouId}&divisionId=${divisionId}`);
    // return this.http.get(this.ServerUrl + `/Customer/getBillToAccountNo?accountNo=${accountNo}&ouId=${ouId}`);
  }

  contactNoSearchFn(mobile1, ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/contactNo?mobile1=${mobile1}&ouId=${ouId}`);
  }

  othRefNoSearchFn(othRefNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/getSaleOrderInfo/${othRefNo}`);
  }

  searchByPanNumber(panNo): Observable<any>{
    return this.http.get(this.ServerUrl + `/Customer/findByPanNo?panNo=${panNo}`);
  }


  custNameSearchFn1(custName,divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/custName?custName=${custName}&divisionId=${divisionId}`);
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


  YesNoList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/cmnLookup/YesNo');
  }

  

  ReceiptMethodList(mPaytype, mStatus): Observable<any> {
    // alert("Master Service :"+ mPaytype+" "+mLocId+" " +mStatus);
    return this.http.get(this.ServerUrl + `/receiptMethod?methodType=${mPaytype}&status=${mStatus}`);
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
  DeallocateSubmit(orderNumber, segment,deallotReason) {
    const REQUEST_PARAMS = new HttpParams().set('orderNumber', orderNumber)
      .set('segment', segment)
      .set('deallotReason',deallotReason)
    const REQUEST_URI = this.ServerUrl + `/orderHeader/deallotment?orderNumber=${orderNumber}&segment=${segment}&deallotReason=${deallotReason}`;
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

  getOmReceiptSearchByRcptNoByloc(rcptNumber): Observable<any> {
    alert("MS>>Receipt number :" + rcptNumber);
    return this.http.get(this.ServerUrl + `/arCashReceipts/receipt/${rcptNumber}?locId=`+sessionStorage.getItem('locId'));
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


// Sales Gate Pass Service

getGatepassSearch(orderNumber): Observable<any> {
  return this.http.get(this.ServerUrl + `/salesGatePass/${orderNumber}`);
}

lineLevelOrderStatus():Observable<any>{
  return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/OrderBookType`);
}


deallotmentReasonType():Observable<any>{
  return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/DeallotReason`);
}


orderNoPost(orderNumber,emplId) {
  const REQUEST_PARAMS = new HttpParams().set('orderNumber', orderNumber)
    .set('emplId', emplId)

  const REQUEST_URI = this.ServerUrl + `/salesGatePass/postSlGatepass?orderNumber=${orderNumber}&emplId=${emplId}`;
  return this.http.post(REQUEST_URI, {
    params: REQUEST_PARAMS,

  });
}


OrderReversal(orderNumber, emplId,reversalReason) {
  const REQUEST_PARAMS = new HttpParams().set('orderNumber', orderNumber)
    .set('emplId', emplId)
    .set('reversalReason',reversalReason)
  const REQUEST_URI = this.ServerUrl + `/arInv/orderReversal?orderNumber=${orderNumber}&emplId=${emplId}&reversalReason=${reversalReason}`;
  return this.http.post(REQUEST_URI, {
    params: REQUEST_PARAMS,

  });
}


reversalReasonList(): Observable<any> {
  return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/ReversalReason`);
}


/////////////////////////////// COUNTER SALE RETURN/////////////////

counterSaleReturnSearchHeader(orderNumber): Observable<any> {
  return this.http.get(this.ServerUrl +`/orderHeader/salesReturn/${orderNumber}`);
}
counterSaleReturnSearchLines(orderNumber): Observable<any> {
  return this.http.get(this.ServerUrl +`/orderHeader/salesRtnLines/${orderNumber}`);
}

public rtnCntrOrderSaveSubmit(rtnRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/arInv/salesReversal';
  return this.http.post(url, rtnRecord, options);
}

printCSRtndocument(mRtnNumber){
  const REQUEST_URI = this.ServerUrl +`/orderHeader/csReversalPrint/${mRtnNumber}`;  
  // http://localhost:8081/orderHeader/csReversalPrint/12121101811 
  return this.http.get(REQUEST_URI, {
    // params: REQUEST_PARAMS,
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}



}
