import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class OrderManagementService {
  httpclient: any;
  headers: any;
  ServerUrl: string;
  lstcommentsUserSm = JSON.parse(sessionStorage.getItem('logRes'));
  token = this.lstcommentsUserSm.token;


  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.headers = this.headers.append("Authorization", "Bearer " + this.token);
    this.ServerUrl = AppConstants.ServerUrl;
  }

  getsearchByOrderNo(orderNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/${orderNumber}`,{ headers: this.headers });
  }



  getsearchByOrderNo1(orderNumber,locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/orderLocWise?orderNumber=${orderNumber}&locationId=${locId}`,{ headers: this.headers });
  }

  getsearchBymsRefNo(deptId,locId,msRefNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/${deptId}/${locId}/${msRefNo}`,{ headers: this.headers });
  }

  getsearchByOrderNoToUpdate(orderNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/OrderToUpdate/${orderNumber}`,{ headers: this.headers });
  }

  UpdateOrderDetails(saleOrderRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/orderHeader/orderUpdate`);
    return this.http.put(url, saleOrderRecord, options);
    
  }


  categoryList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemCategory/type`,{ headers: this.headers });
  }

  categoryList1(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/ITEM_TYPE`,{ headers: this.headers });
  }

  getFinTypeSearch1(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/FinanceType`,{ headers: this.headers });
  }

  getFinNameSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/FinanceType`,{ headers: this.headers });
  }

  getFinNameSearchNew(divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/Catgtype?cmnType=FinCmpny&divisionId=${divisionId}`,{ headers: this.headers });
  }

  ItemIdList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/category`,{ headers: this.headers });
  }
  addonItemList(category): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/segmentLike/${category}`,{ headers: this.headers });
  }

  
  getItemByCatType(itemCatType, divId): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/ByCatType?itemCatType=${itemCatType}&divId=${divId}`,{ headers: this.headers })
  }


  getItemByCatTypeNew(itemCatType, divId, variant): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/ByCatType1?itemCatType=${itemCatType}&divId=${divId}&variant=${variant}`,{ headers: this.headers })
  }

  searchByItemSegmentDiv(divId, itemSeg): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/details/${divId}/${itemSeg}`,{ headers: this.headers })
  }

  orderTypeList(deptId, ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/OrderTrnType/otAccSpList?deptId=${deptId}&ouId=${ouId}`,{ headers: this.headers });
  }

  priceListNameListDeptWise(divisionId, ouId, deptId): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist/prinHeader?divisionId=${divisionId}&ouId=${ouId}&deptId=${deptId}`,{ headers: this.headers });
  }


  counterSaleOrderSearch(orderNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/ACSP/orderNumber=${orderNumber}`,{ headers: this.headers });
  }

  counterSaleOrderSearchNew(orderNumber, locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/ACSPLoc?orderNumber=${orderNumber}&locationId=${locId}`,{ headers: this.headers });
  }


  proformaOrderSearchNew(divisionId, orderNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/Proforma/${divisionId}/${orderNumber}`,{ headers: this.headers });
  }

  UpdateCounterSaleInv(UpdateCounterSaleInvRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/orderHeader/pickTicketLineUpdate`);
    return this.http.put(url, UpdateCounterSaleInvRecord, options);
  }



  downloadCSPreINV(orderNumber): Observable<any> {
   
    const REQUEST_URI = this.ServerUrl + `//orderHeader/cntrTaxPreInvPrint/${orderNumber}`;
    return this.http.get(REQUEST_URI, {
    
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  downloadCSINV(InvoiceNumber) {
   
    const REQUEST_URI = this.ServerUrl + `//orderHeader/cntrTaxInvPrint/${InvoiceNumber}`;
    return this.http.get(REQUEST_URI, {
     
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  downloadBajajCSINV(InvoiceNumber) {
  
    const REQUEST_URI = this.ServerUrl + `/orderHeader/bajajSpares/${InvoiceNumber}`;
    return this.http.get(REQUEST_URI, {
     
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  viewGatePass(orderNumber) {
   
    const REQUEST_URI = this.ServerUrl + `/orderHeader/SS_SPAC_Gatepass/${orderNumber}`;
    return this.http.get(REQUEST_URI, {
    
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  viewReceipt(orderNumber) {
   
    const REQUEST_URI = this.ServerUrl + `/omPayment/counterSaleReceipt/${orderNumber}`;
    return this.http.get(REQUEST_URI, {
      
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  viewSalesReceipt(orderNumber) {
    const REQUEST_URI = this.ServerUrl + `/omPayment/omReceipt?orderNumber=${orderNumber}&receiptNumber`;
    return this.http.get(REQUEST_URI, {
    
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  receiptView(receiptNo) {
    const REQUEST_URI = this.ServerUrl + `/omPayment/omSingleReceipt?receiptNumber=${receiptNo}`;
    return this.http.get(REQUEST_URI, {
      
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  downloadVehicleINV(InvoiceNumber) {
   
    const REQUEST_URI = this.ServerUrl + `/orderHeader/salesTaxInv/${InvoiceNumber}`;
    return this.http.get(REQUEST_URI, {
     
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  downloadEWINV(InvoiceNumber) {
    const REQUEST_URI = this.ServerUrl + `/orderHeader/addonTaxInvEW/${InvoiceNumber}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  downloadSoa(orderNumber) {
    const REQUEST_URI = this.ServerUrl + `/orderHeader/SS_Sales_SOA/${orderNumber}`;
    return this.http.get(REQUEST_URI, {
    
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  form21(orderNumber) {
    const REQUEST_URI = this.ServerUrl + `/orderHeader/Form21/${orderNumber}`;
    return this.http.get(REQUEST_URI, {
     
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  downloadAddonINV(InvoiceNumber) {
   
    const REQUEST_URI = this.ServerUrl + `/orderHeader/addonTaxInv/${InvoiceNumber}`;
    return this.http.get(REQUEST_URI, {
     
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  createInvoiceAll(orderNumber, emplId) {
    const REQUEST_PARAMS = new HttpParams().set('orderNumber', orderNumber)
      .set('emplId', emplId)

    const REQUEST_URI = this.ServerUrl + `/arInv/inserDtls?orderNumber=${orderNumber}&emplId=${emplId}`;
    return this.http.post(REQUEST_URI, {
      params: REQUEST_PARAMS,
      headers: this.headers,
    });
  }



  downloadGatePass(InvoiceNumber) {
   
    const REQUEST_URI = this.ServerUrl + `/salesGatePass/print/${InvoiceNumber}`;
    return this.http.get(REQUEST_URI, {
     
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  public countersaleReadyForInvFn(orderNumber) {
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
    return this.http.get(this.ServerUrl + `/itemMst/segmentLike/${segment}`, { headers: this.headers });
  }

 

  addonDescList1(segment, taxCategoryName, priceListHeaderId): Observable<any> {
    const REQUEST_PARAMS = new HttpParams().set('segment', segment)
      .set('taxCategoryName', taxCategoryName)
      .set('priceListHeaderId', priceListHeaderId)

    const REQUEST_URI = this.ServerUrl + '/itemMst/segmentLike';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,
      headers: this.headers,
    });
  }

  addonDescList2(segment, taxCategoryName, priceListHeaderId, isExportCust): Observable<any> {
    const REQUEST_PARAMS = new HttpParams().set('segment', segment)
      .set('taxCategoryName', taxCategoryName)
      .set('priceListHeaderId', priceListHeaderId)
      .set('isExportCust', isExportCust)
    const REQUEST_URI = this.ServerUrl + '/itemMst/segmentLike';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,
      headers: this.headers,
    });
  }

  getTaxCategoriesForSales(taxCategoryName, hsnTaxPer): Observable<any> {
    return this.http.get(this.ServerUrl + `/JaiTaxCatg/taxCateDtls?taxCatType=SALES&suppTaxCate=${taxCategoryName}&hsnTaxPer=${hsnTaxPer}`,{ headers: this.headers });
  }

  ItemDescList(segment, ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/JaiTaxCatg/IgstTaxCtg?itemId=${segment}&ouId=${ouId}`,{ headers: this.headers })
  }
  priceListNameList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist`,{ headers: this.headers });
  }

  priceListNameList1(ouId, divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist/priceHdr?ouId=${ouId}&divisionId=${divisionId}`,{ headers: this.headers });
  }


  priceListNameListouwise(ouId, divisionId, deptId): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist/priceHdrOu?ouId=${ouId}&divisionId=${divisionId}&deptId=${deptId}&priceSubType=MRP`,{ headers: this.headers });
  }
  
  public OrderBook(BookRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/orderHeader/Entered';
    return this.http.post(url, BookRecord, options);
  }

  getOnHandQty(locId, invItemId, subInventoryId): Observable<any> {
    return this.http.get(this.ServerUrl + `/onhandqty/onhandPrchng?locId=${locId}&itemCode=${invItemId}&subInventoryId=${subInventoryId}`,{ headers: this.headers })
  }

  public AccLineSave(AccLineRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/orderHeader/postAccItems';
    return this.http.post(url, AccLineRecord, options);
  }

  viewAllInvoice(orderNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/arInv/referenceNo/${orderNumber}`,{ headers: this.headers });
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



  accountNoSearchFn1(accountNo, ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/getBillToAccountNo?accountNo=${accountNo}&ouId=${ouId}`,{ headers: this.headers });
  }

  

  public createProformaOrderFFn(AccLineRecord1) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/Proforma';
    return this.http.post(url, AccLineRecord1, options);
  }

  proformaInv(orderNumber, locId) {
    const REQUEST_URI = this.ServerUrl + `/SparesReports/PrintProforma?orderNumber=${orderNumber}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  salesproformaInv(orderNumber, locId) {
    const REQUEST_URI = this.ServerUrl + `/SalesReports/PrintProforma?orderNumber=${orderNumber}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }



  accountNoSearchFn2(accountNo, divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/getByAccountNo1?accountNo=${accountNo}&divisionId=${divisionId}`,{ headers: this.headers });
  }

  custSideAddDet(id): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/site/${id}`);
  }

  accountNoSearchFn(accountNo, ouId, divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/getByAccountNo?accountNo=${accountNo}&ouId=${ouId}&divisionId=${divisionId}`,{ headers: this.headers });
   
  }

  contactNoSearchFn(mobile1, ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/contactNo?mobile1=${mobile1}&ouId=${ouId}`,{ headers: this.headers });
  }

  othRefNoSearchFn(locId, deptId, customerId): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/getOrderListForAccSale?locationId=${locId}&dept=1&customerId=${customerId}`,{ headers: this.headers });
  }

  searchByPanNumber(panNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/findByPanNo?panNo=${panNo}`,{ headers: this.headers });
  }


  custNameSearchFn1(custName, divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/custName?custName=${custName}&divisionId=${divisionId}`,{ headers: this.headers });
  }
  custNameSearchFncomp(custName, divisionId, compId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/custName1?custName=${custName}&divisionId=${divisionId}&compId=${compId}`,{ headers: this.headers });
  }

  finananceList(finName, divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/FinanceCmpny?cmnType=FinCmpny&attribute1=${finName}&divisionId=${divisionId}`,{ headers: this.headers });
  }

  finananceListNew(divisionId): Observable<any> {
    
    return this.http.get(this.ServerUrl + `/cmnLookup/Division/Finance/${divisionId}`,{ headers: this.headers });
  }

  custNameSearchFn(custName, ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/custName?custName=${custName}&ouId=${ouId}`,{ headers: this.headers });
  }

  VariantSearchFn(mainModel): Observable<any> {
  
    if (mainModel != null) {
      return this.http.get(this.ServerUrl + `/VariantMst/VariantList/${mainModel}`,{ headers: this.headers });
    }
  }


  ticketNoSearchFn(salesRepName, dept): Observable<any> {
    return this.http.get(this.ServerUrl + `/teamMaster/TicketNowise?ticketNo=${salesRepName}&dept=${dept}`,{ headers: this.headers });
  }

  ColourSearchFn(variant): Observable<any> {
    if (variant != null) {
      return this.http.get(this.ServerUrl + `/VariantMst/ColorList/${variant}`,{ headers: this.headers });
    }
  }

  
  dealerShipBaseAmt(model, variant, color): Observable<any> {
    if (variant != null && variant != null) {
      return this.http.get(this.ServerUrl + `/orderHeader/getVehiclePrice?code=${model}&variant=${variant}&colorCode=${color}`,{ headers: this.headers });
    }
  }
  dealerShipBaseAmtNew(model, variant, color, ouId): Observable<any> {
    if (variant != null && variant != null) {
      return this.http.get(this.ServerUrl + `/orderHeader/getVehiclePrice?code=${model}&variant=${variant}&colorCode=${color}&ouId=${ouId}`,{ headers: this.headers });
    }
  }

  proformaList(color,model,variant,custAcctNo): Observable<any> {
    if (variant != null && variant != null) {
      return this.http.get(this.ServerUrl + `/Proforma/proformaList?colorCode=${color}&model=${model}&variant=${variant}&custAcctNo=${custAcctNo}`,{ headers: this.headers });
    }
  }


  public variantDetailsUpdate(orderNumber, model, variant, color, basicValue) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/orderHeader/variantUpdate?orderNumber=${orderNumber}&Model=${model}&color=${color}&variant=${variant}&attribute2=${basicValue}`;
    return this.http.put(url, options);
  }


  
  autoApplyInvoiceFn(orderNumber) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/orderHeader/autoApply/inv/${orderNumber}`;
    return this.http.post(url, options);
  }


  cancelledSalesOrderFn(orderNumber,rsnCode){
   
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/orderHeader/cancelSaleOrder?orderNumber=${orderNumber}&reasonCode=${rsnCode}`;
    return this.http.put(url, options);
  }


  OrderCanceList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/CmnType/SalesOrderCancelledReason',{ headers: this.headers });
  }


  // ////////////////************Order Payment Receipt **************//////////////////
  PaymentModeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/PayType',{ headers: this.headers });
  }

  getOmReceiptSearchByOrdNo(orderNumber): Observable<any> {
    // alert("MS>>order number :" + orderNumber);
    if (orderNumber != null) {
      return this.http.get(this.ServerUrl + `/omPayment/${orderNumber}`,{ headers: this.headers });
    }
  }


  YesNoList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/YesNo',{ headers: this.headers });
  }



  ReceiptMethodList(mPaytype, mStatus): Observable<any> {
   
    return this.http.get(this.ServerUrl + `/receiptMethod?methodType=${mPaytype}&status=${mStatus}`,{ headers: this.headers });
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
    return this.http.get(this.ServerUrl + `/orderHeader/DeAllotment/${ouId}`,{ headers: this.headers });
  }

  DeallocateSubmit(orderNumber, segment, deallotReason) {
    const REQUEST_PARAMS = new HttpParams().set('orderNumber', orderNumber)
      .set('segment', segment)
      .set('deallotReason', deallotReason)
    const REQUEST_URI = this.ServerUrl + `/orderHeader/deallotment?orderNumber=${orderNumber}&segment=${segment}&deallotReason=${deallotReason}`;
    return this.http.put(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }



  getOmReceiptSearchBy(rcptNumber, orderNumber, custAcNumber): Observable<any> {
   
    var baseUrl = (this.ServerUrl + '/arCashReceipts/Search?',{ headers: this.headers });
    var receipt, order, cust;
    if (rcptNumber === undefined) {
      
      receipt = '&receiptNumber=';
    } else {
      receipt = '&receiptNumber=' + rcptNumber;
    }
    if (orderNumber === undefined) {
      order = '&orderNumber=';
    } else {
      order = '&orderNumber' + orderNumber;
    }
    if (custAcNumber === undefined) {
     
      cust = '&accountNo=';
    } else {
      cust = '&accountNo=' + custAcNumber;
    }
    return this.http.get(baseUrl + receipt + order + cust);
   
  }



  getOmReceiptSearchByRcptNo(rcptNumber): Observable<any> {
   
    return this.http.get(this.ServerUrl + `/arCashReceipts/receipt/${rcptNumber}`,{ headers: this.headers });
  }

  getOmReceiptSearchByRcptNoByloc(rcptNumber): Observable<any> {
   
    return this.http.get(this.ServerUrl + `/arCashReceipts/receipt/${rcptNumber}?locId=` + sessionStorage.getItem('locId'),{ headers: this.headers });
  }
  getOmReceiptSearchByCustAcNo(custAcNumber): Observable<any> {
   
    return this.http.get(this.ServerUrl + `/arCashReceipts/custmst/${custAcNumber}`,{ headers: this.headers });
  }




  // ***************************** Allotment Form ****************************
  allotmentSearch(orgId, locId, divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/Allotment?orgId=${orgId}&locId=${locId}&divisionId=${divisionId}`,{ headers: this.headers });
  }

  allotmentVehicleSearch(model, color, variant, locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/StockList?mainModel=${model}&colorCode=${color}&variantCode=${variant}&locationId=${locId}`,{ headers: this.headers });
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

  finexchangeUpdate(formValue) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/orderHeader/financeDetUpdate`);
    return this.http.put(url, formValue, options);
  }

  UpdateSalesUpdateLine(UpdateSaleUpdateRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/orderHeader/salesOrderOtherLineSave`);
    return this.http.put(url, UpdateSaleUpdateRecord, options);
  }

  UpdatePrice(UpdatePrice) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/onhandqty/onHandPrcChng`);
    return this.http.put(url, UpdatePrice, options);
  }




  gatePassPendList(date1,locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/InvNotDelv?inputDate=${date1}&locId=${locId}`,{ headers: this.headers });
  
  }

  getGatepassSearch(orderNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/salesGatePass/omOrderInfo/${orderNumber}`,{ headers: this.headers });
  }

  lineLevelOrderStatus(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/OrderBookType`,{ headers: this.headers });
  }


  rtoList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/rtoType`,{ headers: this.headers });
  }

  deallotmentReasonType(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/DeallotReason`,{ headers: this.headers });
  }


  orderNoPost(orderNumber, emplId, locId) {
    const REQUEST_PARAMS = new HttpParams().set('orderNumber', orderNumber)
      .set('emplId', emplId)
      .set('servLocId', locId)
    const REQUEST_URI = this.ServerUrl + `/salesGatePass/postSlGatepassSuperUser?orderNumber=${orderNumber}&emplId=${emplId}&servLocId=${locId}`;
    return this.http.post(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  


  SalesGatePassGenSubmit(orderNumber, emplId, locId) {
    const REQUEST_PARAMS = new HttpParams().set('orderNumber', orderNumber)
      .set('emplId', emplId)
      .set('servLocId', locId)
    const REQUEST_URI = this.ServerUrl + `/salesGatePass/postSlGatepass?orderNumber=${orderNumber}&emplId=${emplId}&servLocId=${locId}`;
    return this.http.post(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,

    });
  }

  

  public vehicleNoupdateFn(itemId, regNo, regDate, customerId) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/VehAddInfo/updateVHSales?itemId=${itemId}&regNo=${regNo}&regDate=${regDate}&customerId=${customerId}`;
    return this.http.put(url, options);
  }


  public vehicleNoInsuranceupdateFn(gpInsuranceRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/VehAddInfo/updateInsurance`);
    return this.http.put(url,gpInsuranceRecord, options);
  }


 
  OrderReversal(orderNumber, emplId, reversalReason) {
    const REQUEST_PARAMS = new HttpParams().set('orderNumber', orderNumber)
      .set('emplId', emplId)
      .set('reversalReason', reversalReason)
    const REQUEST_URI = this.ServerUrl + `/arInv/orderReversal?orderNumber=${orderNumber}&emplId=${emplId}&reversalReason=${reversalReason}`;
    return this.http.post(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,

    });
  }


  reversalReasonList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/ReversalReason`,{ headers: this.headers });
  }


  /////////////////////////////// COUNTER SALE RETURN/////////////////

  counterSaleReturnSearchHeader(orderNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/salesReturn/${orderNumber}`,{ headers: this.headers });
  }


  SaleReturnSearchHeader(orderNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/vehReturn/${orderNumber}`,{ headers: this.headers });
  }


  counterSaleReturnSearchLines(orderNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/salesRtnLines/${orderNumber}`,{ headers: this.headers });
  }

  public rtnCntrOrderSaveSubmit(rtnRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/arInv/salesReversal';
    return this.http.post(url, rtnRecord, options);
  }


  


  public rtnSalesOrderReversal(rtnRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/arInv/OMVHSalesReversal';
    return this.http.post(url, rtnRecord, options);
  }

  printCSRtndocument(mRtnNumber) {
    const REQUEST_URI = this.ServerUrl + `/orderHeader/csReversalPrint/${mRtnNumber}`; 
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  printSalesRtndocument(mRtnNumber) {
    const REQUEST_URI = this.ServerUrl + `/orderHeader/csReversalVHPrint/${mRtnNumber}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  printArReceipt(rcptNumber, refTp) {
   
    if (refTp === 'ReIns-Renewal') {
      return this.http.get(this.ServerUrl + `/SalesReports/ReInsuranceReceipt?receiptNumber=${rcptNumber}`, { responseType: 'arraybuffer', headers: this.headers, });
    }
    else {
      return this.http.get(this.ServerUrl + `/arCashReceipts/arReceiptPrint/${rcptNumber}`, { responseType: 'arraybuffer', headers: this.headers, });
    }

  }


  reinsuarnceReceiptPrintFn(receiptNo) {
    const REQUEST_URI = this.ServerUrl + `/SalesReports/ReInsuranceReceipt?receiptNumber=${receiptNo}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });

  }


  public createProformaOrderCh(AccLineRecord1) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/Proforma/ch';
    return this.http.post(url, AccLineRecord1, options);
  }

  proformaOrderSearchChetak(divisionId, orderNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/Proforma/${divisionId}/ch/${orderNumber}`,{ headers: this.headers });
  }


  public saveBackOrderItem(backOrderObj) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/CustomerBackOrder/insBackOrder';
    return this.http.post(url, backOrderObj, options);
  }

  
  downloadDateFn(frmDt,tDt,locId,custAccountN) {
    const REQUEST_URI = this.ServerUrl + `/SparesReports/EwayRegisterRep?fromDate=${frmDt}&toDate=${tDt}&locId=${locId}&custAccountNo=${custAccountN}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  panNoCheckFn(panNo): Observable<any> {
  
    return this.http.get(this.ServerUrl + `/Customer/findByPanNoDetails?panNo=${panNo}`,{ headers: this.headers });
  }
  
}





