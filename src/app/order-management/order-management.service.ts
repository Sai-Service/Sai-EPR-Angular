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


  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.ServerUrl = AppConstants.ServerUrl;
  }

  getsearchByOrderNo(orderNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/${orderNumber}`);
  }



  getsearchByOrderNo1(orderNumber,locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/orderLocWise?orderNumber=${orderNumber}&locationId=${locId}`);
  }

  getsearchBymsRefNo(deptId,locId,msRefNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/${deptId}/${locId}/${msRefNo}`);
  }

  getsearchByOrderNoToUpdate(orderNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/OrderToUpdate/${orderNumber}`);
    // http://localhost:8081/orderHeader/OrderToUpdate/222220910400113

  }

  UpdateOrderDetails(saleOrderRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/orderHeader/orderUpdate`);
    return this.http.put(url, saleOrderRecord, options);
    // http://localhost:8081/orderHeader/orderUpdate
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

  getFinNameSearchNew(divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/Catgtype?cmnType=FinCmpny&divisionId=${divisionId}`);
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


  getItemByCatTypeNew(itemCatType, divId, variant): Observable<any> {
    return this.http.get(this.ServerUrl + `//itemMst/ByCatType1?itemCatType=${itemCatType}&divId=${divId}&variant=${variant}`)
  }

  searchByItemSegmentDiv(divId, itemSeg): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/details/${divId}/${itemSeg}`)

    // http://localhost:8081/itemMst/searchBydesc/2/ring
  }

  orderTypeList(deptId, ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/OrderTrnType/otAccSpList?deptId=${deptId}&ouId=${ouId}`);
  }

  priceListNameListDeptWise(divisionId, ouId, deptId): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist/prinHeader?divisionId=${divisionId}&ouId=${ouId}&deptId=${deptId}`);
  }


  counterSaleOrderSearch(orderNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/ACSP/orderNumber=${orderNumber}`);
  }

  counterSaleOrderSearchNew(orderNumber, locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/ACSPLoc?orderNumber=${orderNumber}&locationId=${locId}`);
  }


  proformaOrderSearchNew(divisionId, orderNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/Proforma/${divisionId}/${orderNumber}`);
  }

  UpdateCounterSaleInv(UpdateCounterSaleInvRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/orderHeader/pickTicketLineUpdate`);
    return this.http.put(url, UpdateCounterSaleInvRecord, options);
  }



  downloadCSPreINV(orderNumber): Observable<any> {
    // const REQUEST_URI = `http://saihorizon.com:8080/ErpReplica//orderHeader/cntrTaxPreInvPrint/${orderNumber}`; 
    // local
    const REQUEST_URI = this.ServerUrl + `//orderHeader/cntrTaxPreInvPrint/${orderNumber}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  downloadCSINV(InvoiceNumber) {
    // const REQUEST_URI = `http://saihorizon.com:8080/ErpReplica/orderHeader/cntrTaxInvPrint/${InvoiceNumber}`;  
    // local
    const REQUEST_URI = this.ServerUrl + `//orderHeader/cntrTaxInvPrint/${InvoiceNumber}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  downloadBajajCSINV(InvoiceNumber) {
    // const REQUEST_URI = `http://saihorizon.com:8080/ErpReplica/orderHeader/bajajSpares/${InvoiceNumber}`;  
    // local
    const REQUEST_URI = this.ServerUrl + `/orderHeader/bajajSpares/${InvoiceNumber}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  viewGatePass(orderNumber) {
    // const REQUEST_URI = `http://saihorizon.com:8080/ErpReplica/orderHeader/SS_SPAC_Gatepass/${orderNumber}`;  
    // local
    const REQUEST_URI = this.ServerUrl + `/orderHeader/SS_SPAC_Gatepass/${orderNumber}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  viewReceipt(orderNumber) {
    // const REQUEST_URI = `http://saihorizon.com:8080/ErpReplica/omPayment/counterSaleReceipt/${orderNumber}`;  
    // local
    const REQUEST_URI = this.ServerUrl + `/omPayment/counterSaleReceipt/${orderNumber}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  viewSalesReceipt(orderNumber) {
    const REQUEST_URI = this.ServerUrl + `/omPayment/omReceipt?orderNumber=${orderNumber}&receiptNumber`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  receiptView(receiptNo) {
    const REQUEST_URI = this.ServerUrl + `/omPayment/omSingleReceipt?receiptNumber=${receiptNo}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  downloadVehicleINV(InvoiceNumber) {
    // const REQUEST_URI = `http://saihorizon.com:8080/ErpReplica/orderHeader/salesTaxInv/${InvoiceNumber}`;  
    // local
    const REQUEST_URI = this.ServerUrl + `/orderHeader/salesTaxInv/${InvoiceNumber}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
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
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  form21(orderNumber) {
    const REQUEST_URI = this.ServerUrl + `/orderHeader/Form21/${orderNumber}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  downloadAddonINV(InvoiceNumber) {
    // const REQUEST_URI = `http://saihorizon.com:8080/ErpReplica/orderHeader/addonTaxInv/${InvoiceNumber}`;  
    // local
    const REQUEST_URI = this.ServerUrl + `/orderHeader/addonTaxInv/${InvoiceNumber}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
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

    });
  }



  downloadGatePass(InvoiceNumber) {
    // const REQUEST_URI = `http://saihorizon.com:8080/ErpReplica/salesGatePass/print/${InvoiceNumber}`;  
    // local
    const REQUEST_URI = this.ServerUrl + `/salesGatePass/print/${InvoiceNumber}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
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
    return this.http.get(this.ServerUrl + `/itemMst/segmentLike/${segment}`);
  }

  // addonDescList1(segment,taxCategoryName,priceListHeaderId): Observable<any> {
  //   return this.http.get(this.ServerUrl + `/itemMst/segmentLike?segment=${segment}&taxCategoryName=${taxCategoryName}&priceListHeaderId=${priceListHeaderId}`);
  // }


  addonDescList1(segment, taxCategoryName, priceListHeaderId): Observable<any> {
    const REQUEST_PARAMS = new HttpParams().set('segment', segment)
      .set('taxCategoryName', taxCategoryName)
      .set('priceListHeaderId', priceListHeaderId)

    const REQUEST_URI = this.ServerUrl + '/itemMst/segmentLike';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,

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

    });
  }

  getTaxCategoriesForSales(taxCategoryName, hsnTaxPer): Observable<any> {
    return this.http.get(this.ServerUrl + `/JaiTaxCatg/taxCateDtls?taxCatType=SALES&suppTaxCate=${taxCategoryName}&hsnTaxPer=${hsnTaxPer}`);
  }

  ItemDescList(segment, ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/JaiTaxCatg/IgstTaxCtg?itemId=${segment}&ouId=${ouId}`)
  }
  priceListNameList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist`);
  }

  priceListNameList1(ouId, divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist/priceHdr?ouId=${ouId}&divisionId=${divisionId}`);
  }


  priceListNameListouwise(ouId, divisionId, deptId): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist/priceHdrOu?ouId=${ouId}&divisionId=${divisionId}&deptId=${deptId}&priceSubType=MRP`);
  }
  public OrderBook(BookRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/orderHeader/Entered';
    return this.http.post(url, BookRecord, options);
  }

  getOnHandQty(locId, invItemId, subInventoryId): Observable<any> {
    return this.http.get(this.ServerUrl + `/onhandqty/onhandPrchng?locId=${locId}&itemCode=${invItemId}&subInventoryId=${subInventoryId}`)
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
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  salesproformaInv(orderNumber, locId) {
    const REQUEST_URI = this.ServerUrl + `/SalesReports/PrintProforma?orderNumber=${orderNumber}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }



  accountNoSearchFn2(accountNo, divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/getByAccountNo1?accountNo=${accountNo}&divisionId=${divisionId}`);
    // return this.http.get(this.ServerUrl + `/Customer/getBillToAccountNo?accountNo=${accountNo}&ouId=${ouId}`);
    // `/Customer/getByAccountNo?accountNo=${accountNo}&ouId=${ouId}`
  }

  custSideAddDet(id): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/site/${id}`);
  }

  accountNoSearchFn(accountNo, ouId, divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/getByAccountNo?accountNo=${accountNo}&ouId=${ouId}&divisionId=${divisionId}`);
    // return this.http.get(this.ServerUrl + `/Customer/getBillToAccountNo?accountNo=${accountNo}&ouId=${ouId}`);
  }

  contactNoSearchFn(mobile1, ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/contactNo?mobile1=${mobile1}&ouId=${ouId}`);
  }

  othRefNoSearchFn(locId, deptId, customerId): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/getOrderListForAccSale?locationId=${locId}&dept=1&customerId=${customerId}`);
  }

  searchByPanNumber(panNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/findByPanNo?panNo=${panNo}`);
  }


  custNameSearchFn1(custName, divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/custName?custName=${custName}&divisionId=${divisionId}`);
  }
  custNameSearchFncomp(custName, divisionId, compId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/custName1?custName=${custName}&divisionId=${divisionId}&compId=${compId}`);
  }

  finananceList(finName, divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/FinanceCmpny?cmnType=FinCmpny&attribute1=${finName}&divisionId=${divisionId}`);
  }

  finananceListNew(divisionId): Observable<any> {
    // http://localhost:8081/cmnLookup/Division/Finance/1
    return this.http.get(this.ServerUrl + `/cmnLookup/Division/Finance/${divisionId}`);
  }

  custNameSearchFn(custName, ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/custName?custName=${custName}&ouId=${ouId}`);
  }

  VariantSearchFn(mainModel): Observable<any> {
    // alert("MS>> "+mainModel);
    if (mainModel != null) {
      return this.http.get(this.ServerUrl + `/VariantMst/VariantList/${mainModel}`);
    }
  }


  ticketNoSearchFn(salesRepName, dept): Observable<any> {
    return this.http.get(this.ServerUrl + `/teamMaster/TicketNowise?ticketNo=${salesRepName}&dept=${dept}`);
  }

  ColourSearchFn(variant): Observable<any> {
    if (variant != null) {
      return this.http.get(this.ServerUrl + `/VariantMst/ColorList/${variant}`);
    }
  }

  // dealerShipBaseAmt(model,variant): Observable<any> {
  //   if(variant !=null &&  variant!=null) {
  //    return this.http.get(this.ServerUrl + `/orderHeader/getVehiclePrice?code=${model}&variant=${variant}`);
  //   }
  // }

  dealerShipBaseAmt(model, variant, color): Observable<any> {
    if (variant != null && variant != null) {
      return this.http.get(this.ServerUrl + `/orderHeader/getVehiclePrice?code=${model}&variant=${variant}&colorCode=${color}`);
    }
  }
  dealerShipBaseAmtNew(model, variant, color, ouId): Observable<any> {
    if (variant != null && variant != null) {
      return this.http.get(this.ServerUrl + `/orderHeader/getVehiclePrice?code=${model}&variant=${variant}&colorCode=${color}&ouId=${ouId}`);
    }
  }

  proformaList(color,model,variant,custAcctNo): Observable<any> {
    if (variant != null && variant != null) {
      return this.http.get(this.ServerUrl + `/Proforma/proformaList?colorCode=${color}&model=${model}&variant=${variant}&custAcctNo=${custAcctNo}`);
    }
  }


  public variantDetailsUpdate(orderNumber, model, variant, color, basicValue) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/orderHeader/variantUpdate?orderNumber=${orderNumber}&Model=${model}&color=${color}&variant=${variant}&attribute2=${basicValue}`;
    return this.http.put(url, options);
  }


  // autoApplyInvoiceFn(currentDate){
  //   const options = {
  //     headers: this.headers
  //   };
  //   const url = this.ServerUrl + `/orderHeader/autoApply/inv/${currentDate}`;
  //   return this.http.post(url, options);
  // }


  autoApplyInvoiceFn(orderNumber) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/orderHeader/autoApply/inv/${orderNumber}`;
    return this.http.post(url, options);
  }


  cancelledSalesOrderFn(orderNumber,rsnCode){
    // http://localhost:8081/orderHeader/cancelSaleOrder?orderNumber=222210112200086&reasonCode=cancelbyuser
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/orderHeader/cancelSaleOrder?orderNumber=${orderNumber}&reasonCode=${rsnCode}`;
    return this.http.put(url, options);
  }


  OrderCanceList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/CmnType/SalesOrderCancelledReason');
  }


  // ////////////////************Order Payment Receipt **************//////////////////
  PaymentModeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/PayType');
  }

  getOmReceiptSearchByOrdNo(orderNumber): Observable<any> {
    // alert("MS>>order number :" + orderNumber);
    if (orderNumber != null) {
      return this.http.get(this.ServerUrl + `/omPayment/${orderNumber}`);
    }
  }


  YesNoList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/YesNo');
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
  DeallocateSubmit(orderNumber, segment, deallotReason) {
    const REQUEST_PARAMS = new HttpParams().set('orderNumber', orderNumber)
      .set('segment', segment)
      .set('deallotReason', deallotReason)
    const REQUEST_URI = this.ServerUrl + `/orderHeader/deallotment?orderNumber=${orderNumber}&segment=${segment}&deallotReason=${deallotReason}`;
    return this.http.put(REQUEST_URI, {
      params: REQUEST_PARAMS,

    });
  }



  getOmReceiptSearchBy(rcptNumber, orderNumber, custAcNumber): Observable<any> {
    // getOmReceiptSearchBy(rcptNumber): Observable<any> {
    // alert("MS>>RCPT NO : " + rcptNumber);
    var baseUrl = this.ServerUrl + '/arCashReceipts/Search?';
    var receipt, order, cust;
    if (rcptNumber === undefined) {
      // baseUrl = baseUrl + '&receiptNumber=' ;
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
      //  baseUrl = baseUrl + '&accountNo=' ;
      cust = '&accountNo=';
    } else {
      cust = '&accountNo=' + custAcNumber;
    }
    return this.http.get(baseUrl + receipt + order + cust);
    // return this.http.get(this.ServerUrl + `/arCashReceipts/Search?accountNo=${custAcNumber}&orderNumber=${orderNumber}&receiptNumber=${rcptNumber}`);
    // receiptNumber=${rcptNumber}&baseorderNumber=${orderNumber}&accountNo=${custAcNumber}

  }



  getOmReceiptSearchByRcptNo(rcptNumber): Observable<any> {
    // alert("MS>>Receipt number :" + rcptNumber);
    return this.http.get(this.ServerUrl + `/arCashReceipts/receipt/${rcptNumber}`);
  }

  getOmReceiptSearchByRcptNoByloc(rcptNumber): Observable<any> {
    // alert("MS>>Receipt number :" + rcptNumber);
    return this.http.get(this.ServerUrl + `/arCashReceipts/receipt/${rcptNumber}?locId=` + sessionStorage.getItem('locId'));
  }
  getOmReceiptSearchByCustAcNo(custAcNumber): Observable<any> {
    // alert("MS>>Customer Accunt number :" + custAcNumber);
    return this.http.get(this.ServerUrl + `/arCashReceipts/custmst/${custAcNumber}`);
  }




  // ***************************** Allotment Form ****************************
  allotmentSearch(orgId, locId, divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/Allotment?orgId=${orgId}&locId=${locId}&divisionId=${divisionId}`);
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


  // Sales Gate Pass Service

  // getGatepassSearch(orderNumber): Observable<any> {
  //   return this.http.get(this.ServerUrl + `/salesGatePass/gatepass/${orderNumber}`);
  // }


  gatePassPendList(date1,locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/InvNotDelv?inputDate=${date1}&locId=${locId}`);
    // http://localhost:8081/orderHeader/InvNotDelv?inputDate=25-NOV-2022&locId=2209
  }

  getGatepassSearch(orderNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/salesGatePass/omOrderInfo/${orderNumber}`);
  }

  lineLevelOrderStatus(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/OrderBookType`);
  }


  rtoList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/rtoType`);
  }

  deallotmentReasonType(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/DeallotReason`);
  }


  orderNoPost(orderNumber, emplId, locId) {
    const REQUEST_PARAMS = new HttpParams().set('orderNumber', orderNumber)
      .set('emplId', emplId)
      .set('servLocId', locId)
    const REQUEST_URI = this.ServerUrl + `/salesGatePass/postSlGatepassSuperUser?orderNumber=${orderNumber}&emplId=${emplId}&servLocId=${locId}`;
    return this.http.post(REQUEST_URI, {
      params: REQUEST_PARAMS,

    });
  }

  // public SalesGatePassGenSubmit(gatePassRecord) {
  //   const options = {
  //     headers: this.headers
  //   };
  //   const url = this.ServerUrl + '/salesGatePass/postSlGatepass?orderNumber';
  //   return this.http.post(url, gatePassRecord, options);
  //   // http://localhost:8081/salesGatePass
  // }



  SalesGatePassGenSubmit(orderNumber, emplId, locId) {
    const REQUEST_PARAMS = new HttpParams().set('orderNumber', orderNumber)
      .set('emplId', emplId)
      .set('servLocId', locId)
    const REQUEST_URI = this.ServerUrl + `/salesGatePass/postSlGatepass?orderNumber=${orderNumber}&emplId=${emplId}&servLocId=${locId}`;
    return this.http.post(REQUEST_URI, {
      params: REQUEST_PARAMS,

    });
  }

  // vehicleNoupdateFn(itemId, regNo, regDate) {
  //   const REQUEST_PARAMS = new HttpParams()
  //     .set('itemId', itemId)
  //     .set('regNo', regNo)
  //     .set('regDate', regDate)

  //   const REQUEST_URI = this.ServerUrl + `/VehAddInfo/updateVHSales?itemId=${itemId}&regNo=${regNo}&regDate=${regDate}`;
  //   return this.http.put(REQUEST_URI, {
  //     params: REQUEST_PARAMS,

  //   });
  // }

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
      params: REQUEST_PARAMS,

    });
  }


  reversalReasonList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/ReversalReason`);
  }


  /////////////////////////////// COUNTER SALE RETURN/////////////////

  counterSaleReturnSearchHeader(orderNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/salesReturn/${orderNumber}`);
  }


  SaleReturnSearchHeader(orderNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/vehReturn/${orderNumber}`);
  }


  counterSaleReturnSearchLines(orderNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/orderHeader/salesRtnLines/${orderNumber}`);
  }

  public rtnCntrOrderSaveSubmit(rtnRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/arInv/salesReversal';
    return this.http.post(url, rtnRecord, options);
  }


  // rtnSalesOrderReversal(orderNumber, emplId, reversalReason) {
  //   alert(orderNumber+'----'+emplId+'-----'+reversalReason)
  //   const REQUEST_PARAMS = new HttpParams().set('orderNumber', orderNumber)
  //     .set('emplId', emplId)
  //     .set('reversalReason', reversalReason)
  //   const REQUEST_URI = this.ServerUrl + `/arInv/orderReversal?orderNumber=${orderNumber}&emplId=${emplId}&reversalReason=${reversalReason}`;
  //   return this.http.put(REQUEST_URI, {
  //     params: REQUEST_PARAMS,

  //   });
  // }


  public rtnSalesOrderReversal(rtnRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/arInv/OMVHSalesReversal';
    return this.http.post(url, rtnRecord, options);
  }

  printCSRtndocument(mRtnNumber) {
    const REQUEST_URI = this.ServerUrl + `/orderHeader/csReversalPrint/${mRtnNumber}`;
    // http://localhost:8081/orderHeader/csReversalPrint/12121101811 
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  printSalesRtndocument(mRtnNumber) {
    const REQUEST_URI = this.ServerUrl + `/orderHeader/csReversalVHPrint/${mRtnNumber}`;
    // http://localhost:8081/orderHeader/csReversalPrint/12121101811 
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  printArReceipt(rcptNumber, refTp) {
    // alert ( "oms >> "+ refTp);
    // const REQUEST_URI = this.ServerUrl + `/arCashReceipts/arReceiptPrint/${rcptNumber}`;
    // const REQUEST_URI = this.ServerUrl + `/SalesReports/ReInsuranceReceipt?receiptNumber=${rcptNumber}`;
    // return this.http.get(REQUEST_URI, { responseType: 'arraybuffer',  headers: this.headers, });

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
    return this.http.get(this.ServerUrl + `/Proforma/${divisionId}/ch/${orderNumber}`);
  }


}





