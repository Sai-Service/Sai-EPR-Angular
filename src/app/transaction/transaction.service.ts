import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  httpclient: any;
  headers: any;
  receiptNumber: number;
  ServerUrl: string;
  lstcommentsUserSm = JSON.parse(sessionStorage.getItem('logRes'));
  token = this.lstcommentsUserSm.token;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.headers = this.headers.append("Authorization", "Bearer " + this.token);
    this.ServerUrl = AppConstants.ServerUrl;
  }



  public getsearchByApINV(content) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/apInv/Search';
    return this.http.post(url, content, options);
  }

  getsearchByApDoc(docNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/apInv/SearchDocNoWise?documentNo=${docNo}`, { headers: this.headers });
  }
  
  //////////////////poInvoice////////////////
  UpdateValidate(invoiceNum) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/apInv/invValidate?invNum=${invoiceNum}`);
    return this.http.put(url, invoiceNum, options);
  }
  UpdateValidateSupwise(invoiceNum, suppNo) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/apInv/invValidateBySupp?invNum=${invoiceNum}&suppNo=${suppNo}`);
    return this.http.put(url, invoiceNum, options);
  }

  apInvoiceCancellation(invoiceNum, emplId): Observable<any> {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/apInv/apInvCancel?invNum=${invoiceNum}&emplId=${emplId}`);
    return this.http.put(url, invoiceNum, options);
  }

  
  getApInvLineDetails(invoiceNum,partyId,suppId): Observable<any> {
      return this.http.get(this.ServerUrl + `/apInv/invDtls?invNum=${invoiceNum}&partyId=${partyId}&suppId=${suppId}`, { headers: this.headers });
    }

  
  getApPaymentDetails(suppNo, invoiceNum): Observable<any> {
    return this.http.get(this.ServerUrl + `/apInv/payDetailInvNowise?suppNo=${suppNo}&invoiceNum=${invoiceNum}`, { headers: this.headers });
  }
  getApInvLineDetailsSupwise(invoiceNum, suppNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/apInv/invDtlsBySuppNo?invNum=${invoiceNum}&suppNo=${suppNo}`, { headers: this.headers });
  }
 
  getApInvLnStatusDetailsSupwise(invoiceNum, suppNo, status): Observable<any> {
    return this.http.get(this.ServerUrl + `/apInv/linesBySuppNo?invNum=${invoiceNum}&suppNo=${suppNo}&invoiceStatus=${status}`
    , { headers: this.headers });
  
  }

  distLinesDeatailsfa(invoiceId, lineNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/apInv/apinvDisLinewise?invoiceId=${invoiceId}&distLineNumber=${lineNumber}`, { headers: this.headers });
  }

  roundOffAPManu(invoiceNum, suppNo, amt) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/apInv/roundoff?invNum=${invoiceNum}&suppNo=${suppNo}&roValue=${amt}`);
    return this.http.put(url, invoiceNum, options);
  }

  getprepay(supId, supsiteId): Observable<any> {
    return this.http.get(this.ServerUrl + `/apInv/apSuppDtls/?suppId=${supId}&suppSiteId=${supsiteId}`, { headers: this.headers })
  }

  roundOffAP(invoiceNum, suppNo) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/apInv/roundoff?invNum=${invoiceNum}&suppNo=${suppNo}`);
    return this.http.put(url, invoiceNum, options);
  }

  paymentMethodList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/locationMst', { headers: this.headers });
  }

  searchByinvoiceNumFn(suppNo, invoiceNum): Observable<any> {
    return this.http.get(this.ServerUrl + `/apInv/check?suppNo=${suppNo}&invoiceNum=${invoiceNum}`, { headers: this.headers });
  }


  DistributionDataList(distributionSet, amount): Observable<any> {
   
    return this.http.get(this.ServerUrl + `/apInv/get/apinvDisLinewise?invAmount=${amount}&distSetName=${distributionSet}`, { headers: this.headers });
  }
  prepayTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/locationMst', { headers: this.headers });
  }

  public apInvSaveSubmit(poRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/apInv';
    return this.http.post(url, poRecord, options);
  }

  distributionSetNameList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/ApDistSetAll', { headers: this.headers });
  }

  inventoryItemList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/itemMst', { headers: this.headers });
  }

  getTaxDetails(taxCategoryId, invItemId, disAm, amount): Observable<any> {
    return this.http.get(this.ServerUrl + `/apInv/Aptaxcal?invId=${invItemId}&baseAmt=${amount}&taxCateId=${taxCategoryId}&disAmt=${disAm}`, { headers: this.headers });
  }

  getTaxDetailsNew(taxCategoryId, invItemId, disAm, amount, invoiceLineNum): Observable<any> {
    return this.http.get(this.ServerUrl + `/apInv/Aptaxcal?invId=${invItemId}&baseAmt=${amount}&taxCateId=${taxCategoryId}&disAmt=${disAm}&invLineNum=${invoiceLineNum}`, { headers: this.headers });
  }

  // ============================ PO INVOICE  TDS SAVE=======================
  public PoInvoiceTdsDataSubmit(poTdsRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/apInv/insertTdsDtls';
    return this.http.post(url, poTdsRecord, options);
  }
  //=======================================Payment Componanat==============================
  getsearchByPayment(suppNo, ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/apInvPayment/paymentSupp?suppNo=${suppNo}&ouId=${ouId}`, { headers: this.headers });
  }

  getsearchByInvDtls(suppNo, ouId, partyId): Observable<any> {
    return this.http.get(this.ServerUrl + `/apInvPayment/paymentSupp?suppId=${suppNo}&ouId=${ouId}&partyId=${partyId}`, { headers: this.headers });
  }


  bankAccountNumList(ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/ceBankAccounts/BankList/${ouId}`, { headers: this.headers });
  }
  statusLookupCodeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/PayStatus', { headers: this.headers });
  }
  paymentIdListList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/PayType', { headers: this.headers });
  }
  docCategoryCodeList(bankAccountId): Observable<any> {
    return this.http.get(this.ServerUrl + `/cePaymentDoc/PayDoc/${bankAccountId}`, { headers: this.headers });
  }

  paymentMethodName(ouId, methodTyp): Observable<any> {
    return this.http.get(this.ServerUrl + `/ceBankAccounts/BankList?ouId=${ouId}&methodType=${methodTyp}`, { headers: this.headers });
  }

  paymentDocNameList(docCategoryCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/cePaymentDoc/DocName/${docCategoryCode}`, { headers: this.headers });
  }
  SuppBalPayment(suppId, ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/apInv/BalanceAmt?suppId=${suppId}&ouId=${ouId}`, { headers: this.headers });
  }
  SuppBalData(suppId, ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/apInv/BalancePayment?suppId=${suppId}&ouId=${ouId}`, { headers: this.headers });
  }
  viewPaymentAdvice(docSeq, docCat, ouId): Observable<any> {
   
    const REQUEST_URI = this.ServerUrl + `/AccountsReports/PaymentAdvice?docSeqId=${docSeq}&docCatCode=${docCat}&ouId=${ouId}`;
    return this.http.get(REQUEST_URI, {
     
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  public paymentSaveSubmit(poRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/apInvPayment/NewPost';
    return this.http.post(url, poRecord, options);
  }

  public paymentSaveQuickSubmit(poRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/apInvPayment/NewPostQuick';
    return this.http.post(url, poRecord, options);
  }

  public paymentCancel(paymentRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/apInvPayment/paymentCancel';
    return this.http.post(url, paymentRecord, options);
  }

  paymentSearch(suppNo, fromDate, toDate, divId): Observable<any> {
    return this.http.get(this.ServerUrl + `/apInvPayment/apPaymentDetail?suppNo=${suppNo}&frmDt=${fromDate}&toDate1=${toDate}&divisionId=${divId}`, { headers: this.headers })
  }

  paymentSearchBydocNo(paymentNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/apInvPayment/apPaymentDocumentwise/${paymentNo}`, { headers: this.headers })
  }

  paymentDocSearch(docNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/apInvPayment/documentNo/${docNo}`, { headers: this.headers });
  }
  //////////Move Order//////////////
  public moveOrderSubmit(MoveOrderRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/mtrlIssue';
    return this.http.post(url, MoveOrderRecord, options);
  }
  transType(): Observable<any> {
    return this.http.get(this.ServerUrl + '/mtlTrxTypes/IPO', { headers: this.headers });
  }
  subInvCode(): Observable<any> {
    return this.http.get(this.ServerUrl + '/subInvMst', { headers: this.headers })
  }
  issueByList(locId, deptId, divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/empMst/EmpLocDept?locId=${locId}&divisionId=${divisionId}&deptId=${deptId}`, { headers: this.headers })
  }
  ItemIdList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/itemMst/category', { headers: this.headers });
  }
  getfrmSubLoc(locId, invItemId, subInventoryId): Observable<any> {
    return this.http.get(this.ServerUrl + `/onhandqty/onhandlocsubinv?locId=${locId}&itemId=${invItemId}&subInventoryId=${subInventoryId}`, { headers: this.headers })
  }
  getSearchByTrans(reqNo): Observable<any> {

    return this.http.get(this.ServerUrl + `/mtrlIssue/reqNum/${reqNo}`, { headers: this.headers })

  }
  getItemDetail(itemid): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/${itemid}`, { headers: this.headers })
  }


  ////////////AR Invoice ///////////////
  searchByInvoiceNoAR(trxNumber1): Observable<any> {
    return this.http.get(this.ServerUrl + `/arInv/invDtls/${trxNumber1}`, { headers: this.headers })

  }

  searchByInvoiceNoAROu(trxNumber1, ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/arInv/invDtls?invNum=${trxNumber1}&ouId=${ouId}`, { headers: this.headers })
    
    
  }

  DistributionCal(amount, taxableAmt, custTrxTypeId): Observable<any> {
    return this.http.get(this.ServerUrl + `/arInv/invLnDis?custTrxTypeId=${custTrxTypeId}&invAmount=${amount}&taxableAmt=${taxableAmt}`, { headers: this.headers })
  }

  sourceListFn(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/type/RcvSource`, { headers: this.headers })
  }
  classListFN(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/type/RcvClass`, { headers: this.headers })
  }
  paymentTermListFn(): Observable<any> {
    return this.http.get(this.ServerUrl + `/fndAcctLookup/lookupTypeWise/PaymentTerms`, { headers: this.headers })
  }
  invTypeListFN(): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvType/status`, { headers: this.headers })
  }
  invItemList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst`, { headers: this.headers })
  }
  invItemList1(divId): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/nonInvList/${divId}`, { headers: this.headers })
  }

  public ARInvoiceSubmit(Record) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/arInv';
    return this.http.post(url, Record, options);
  }



  ///////////////////////////AVERAGE COST UPDATE//////////////////////////

  avgCurrentCost(mitemId, mLocId): Observable<any> {
    // alert("Master Service :"+ mitemId+" ,"+mLocId);
    return this.http.get(this.ServerUrl + `/averageCost/avgLocItem?locationId=${mLocId}&itemId=${mitemId}`, { headers: this.headers });
  }

  public AvgCostUpdateSubmit(AvgCostUpdateRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/averageCost';
    return this.http.post(url, AvgCostUpdateRecord, options);
  }


  getAvgHistoryList(mLocId, mitemId, frmDate, toDate): Observable<any> {

    return this.http.get(this.ServerUrl + `/averageCost/avghistory?locationId=${mLocId}&itemId=${mitemId}&startDate=${frmDate}&endDate=${toDate}`, { headers: this.headers });
  }

  ///////////////////////////////////////////////////// warranty claim /////////////////////

  lineStatusLst(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/CmnType/WARRANTY_STATUS', { headers: this.headers });
  }

  itemTypeLst(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/CmnType/ITEM_TYPE', { headers: this.headers });
  }


  warrDataList(fromDt, toDt, ouId, lineStat, itmType): Observable<any> {
    const REQUEST_PARAMS = new HttpParams().set('fromDate', fromDt)
      .set('toDate', toDt)
      .set('ouId', ouId)
      .set('lineStatus', lineStat)
      .set('itemType', itmType)
    const REQUEST_URI = this.ServerUrl + '/oemWarranty/warrantyData';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,
      headers: this.headers,
    });
  }


  UpdateWarrClaim(warrClaimRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/oemWarranty`);
    return this.http.put(url, warrClaimRecord, options);
    
  }


 

  viewInterconsumptionNote(orderNumber) {
    const REQUEST_URI = this.ServerUrl + `/SparesReports/SprICConsPrint?shipmentNumber=${orderNumber}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  arInvoicePrint(invNumber) {
    const REQUEST_URI = this.ServerUrl + `/arInv/ManualInvPrint/${invNumber}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
  }
}
