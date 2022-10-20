import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ AppConstants} from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  httpclient: any;
  headers: any;
  receiptNumber:number;
  ServerUrl :string;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
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
    return this.http.get(this.ServerUrl + `/apInv/SearchDocNoWise?documentNo=${docNo}`);
  }
  // public getsearchByPayment(content) {
  //   const options = {
  //     headers: this.headers
  //   };
  //   const url = this.ServerUrl + '/apInvPayment/paymentSupp';
  //   return this.http.post(url, content, options);
  // }
//////////////////poInvoice////////////////
UpdateValidate(invoiceNum) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + `/apInv/invValidate?invNum=${invoiceNum}`);
  return this.http.put(url, invoiceNum, options);
}
UpdateValidateSupwise(invoiceNum,suppNo) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + `/apInv/invValidateBySupp?invNum=${invoiceNum}&suppNo=${suppNo}`);
  return this.http.put(url, invoiceNum, options);
}

apInvoiceCancellation(invoiceNum,emplId): Observable<any> {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + `/apInv/apInvCancel?invNum=${invoiceNum}&emplId=${emplId}`);
  return this.http.put(url, invoiceNum, options);
}

  getApInvLineDetails(invoiceNum): Observable<any> {
    return this.http.get(this.ServerUrl + `/apInv/invDtls?invNum=${invoiceNum}`);
  }
  getApPaymentDetails(suppNo,invoiceNum): Observable<any> {
    return this.http.get(this.ServerUrl + `/apInv/payDetailInvNowise?suppNo=${suppNo}&invoiceNum=${invoiceNum}`);
  }
  getApInvLineDetailsSupwise(invoiceNum,suppNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/apInv/invDtlsBySuppNo?invNum=${invoiceNum}&suppNo=${suppNo}`);
  }
  getApInvLnStatusDetailsSupwise(invoiceNum,suppNo,status): Observable<any> {
    return this.http.get(this.ServerUrl + `/apInv/invDtlsBySuppNo?invNum=${invoiceNum}&suppNo=${suppNo}&invoiceStatus=${status}`);
  }

  distLinesDeatailsfa(invoiceId,lineNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/apInv/apinvDisLinewise?invoiceId=${invoiceId}&distLineNumber=${lineNumber}`);
  }

  getprepay(supId,supsiteId):Observable<any>{
    return this.http.get(this.ServerUrl+`/apInv/apSuppDtls/?suppId=${supId}&suppSiteId=${supsiteId}`)
  }

  roundOffAP(invoiceNum) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/apInv/roundoff?invNum=${invoiceNum}`);
    return this.http.put(url, invoiceNum, options);
  }

  paymentMethodList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/locationMst');
  }

  searchByinvoiceNumFn(suppNo,invoiceNum): Observable<any> {
    return this.http.get(this.ServerUrl +`/apInv/check?suppNo=${suppNo}&invoiceNum=${invoiceNum}`);
  }


  DistributionDataList(distributionSet,amount): Observable<any> {
    // return this.http.get(this.ServerUrl +`/ApDistSetAll/distSetAmount?distributionSetName=${distributionSet}&distributionAmt=${amount}`);
    return this.http.get(this.ServerUrl +`/apInv/get/apinvDisLinewise?invAmount=${amount}&distSetName=${distributionSet}`);
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

  getTaxDetailsNew(taxCategoryId,invItemId, disAm,amount,invoiceLineNum): Observable<any> {
    return this.http.get(this.ServerUrl +`/apInv/Aptaxcal?invId=${invItemId}&baseAmt=${amount}&taxCateId=${taxCategoryId}&disAmt=${disAm}&invLineNum=${invoiceLineNum}`);
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
getsearchByPayment(suppNo,ouId): Observable<any> {
  return this.http.get(this.ServerUrl + `/apInvPayment/paymentSupp?suppNo=${suppNo}&ouId=${ouId}`);
}

getsearchByInvDtls(suppNo,ouId,partyId): Observable<any> {
  return this.http.get(this.ServerUrl + `/apInvPayment/paymentSupp?suppId=${suppNo}&ouId=${ouId}&partyId=${partyId}`);
}


bankAccountNumList(ouId): Observable<any> {
  return this.http.get(this.ServerUrl +`/ceBankAccounts/BankList/${ouId}`);
}
statusLookupCodeList(): Observable<any> {
  return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/PayStatus');
}
paymentIdListList(): Observable<any> {
  return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/PayType');
}
docCategoryCodeList(bankAccountId): Observable<any> {
  return this.http.get(this.ServerUrl +`/cePaymentDoc/PayDoc/${bankAccountId}`);
}

paymentMethodName(ouId,methodTyp):Observable<any>{
  return this.http.get(this.ServerUrl +`/ceBankAccounts/BankList?ouId=${ouId}&methodType=${methodTyp}`);
}

paymentDocNameList(docCategoryCode): Observable<any> {
  return this.http.get(this.ServerUrl +`/cePaymentDoc/DocName/${docCategoryCode}`);
}
SuppBalPayment(suppId,ouId): Observable<any> {
  return this.http.get(this.ServerUrl +`/apInv/BalanceAmt?suppId=${suppId}&ouId=${ouId}`);
}
SuppBalData(suppId,ouId): Observable<any> {
  return this.http.get(this.ServerUrl +`/apInv/BalancePayment?suppId=${suppId}&ouId=${ouId}`);
}
viewPaymentAdvice(docSeq,docCat,ouId):Observable<any>{
  // const REQUEST_URI = `http://saihorizon.com:8080/ErpReplica/rcvShipment/StkTransferNote/${shipmentNumber}`;
  // local
  const REQUEST_URI = this.ServerUrl +`/AccountsReports/PaymentAdvice?docSeqId=${docSeq}&docCatCode=${docCat}&ouId=${ouId}`;
  return this.http.get(REQUEST_URI, {
    // params: REQUEST_PARAMS,
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

public paymentCancel(paymentRecord){
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/apInvPayment/paymentCancel';
  return this.http.post(url, paymentRecord, options);
}

paymentSearch(suppNo,fromDate,toDate,divId):Observable<any>{
  return this.http.get(this.ServerUrl+`/apInvPayment/apPaymentDetail?suppNo=${suppNo}&frmDt=${fromDate}&toDate1=${toDate}&divisionId=${divId}`)
}

paymentSearchBydocNo(paymentNo):Observable<any>{
  return this.http.get(this.ServerUrl+`/apInvPayment/apPaymentDocumentwise/${paymentNo}`)
}

paymentDocSearch(docNo):Observable<any>
{
  return this.http.get(this.ServerUrl+`/apInvPayment/documentNo/${docNo}`);
}
//////////Move Order//////////////
public moveOrderSubmit(MoveOrderRecord)
{
  const options={
    headers:this.headers
  };
  const url=this.ServerUrl+'/mtrlIssue';
  return this.http.post(url,MoveOrderRecord,options);
}
transType():Observable<any>{
  return this.http.get(this.ServerUrl +'/mtlTrxTypes/IPO');
}
subInvCode():Observable<any>{
  return this.http.get(this.ServerUrl +'/subInvMst')
}
issueByList(locId,deptId,divisionId):Observable<any>{
return this.http.get(this.ServerUrl +`/empMst/EmpLocDept?locId=${locId}&divisionId=${divisionId}&deptId=${deptId}`)
}
ItemIdList():Observable<any>{
  return this.http.get(this.ServerUrl+'/itemMst/category');
}
getfrmSubLoc(locId,invItemId,subInventoryId):Observable<any>{
  return this.http.get(this.ServerUrl+`/onhandqty/onhandlocsubinv?locId=${locId}&itemId=${invItemId}&subInventoryId=${subInventoryId}`)
}
getSearchByTrans(reqNo):Observable<any>{

  return this.http.get(this.ServerUrl+`/mtrlIssue/reqNum/${reqNo}`)

}
getItemDetail(itemid):Observable<any>{
  return this.http.get(this.ServerUrl +`/itemMst/${itemid}`)
}


////////////AR Invoice ///////////////
searchByInvoiceNoAR(trxNumber1):Observable<any>{
  return this.http.get(this.ServerUrl +`/arInv/invDtls/${trxNumber1}`)
  
}

searchByInvoiceNoAROu(trxNumber1,ouId):Observable<any>{
  return this.http.get(this.ServerUrl +`/arInv/invDtls?invNum=${trxNumber1}&ouId=${ouId}`)
  // http://localhost:8081/arInv/invDtls?invNum=222220222000002&ouId=22
}

DistributionCal(amount,taxableAmt, custTrxTypeId ):Observable<any>{
  return this.http.get(this.ServerUrl +`/arInv/invLnDis?custTrxTypeId=${custTrxTypeId}&invAmount=${amount}&taxableAmt=${taxableAmt}`)
}

sourceListFn():Observable<any>{
  return this.http.get(this.ServerUrl +`/cmnLookup/type/RcvSource`)
}
classListFN():Observable<any>{
  return this.http.get(this.ServerUrl +`/cmnLookup/type/RcvClass`)
}
paymentTermListFn():Observable<any>{
  return this.http.get(this.ServerUrl +`/fndAcctLookup/lookupTypeWise/PaymentTerms`)
}
invTypeListFN():Observable<any>{
  return this.http.get(this.ServerUrl +`/rcvType/status`)
}
invItemList():Observable<any>{
  return this.http.get(this.ServerUrl +`/itemMst`)
}
invItemList1(divId):Observable<any>{
  return this.http.get(this.ServerUrl +`/itemMst/nonInvList/${divId}`)
}

public ARInvoiceSubmit(Record) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/arInv';
  return this.http.post(url, Record, options);
}



///////////////////////////AVERAGE COST UPDATE//////////////////////////

avgCurrentCost(mitemId,mLocId): Observable<any> {
  // alert("Master Service :"+ mitemId+" ,"+mLocId);
  return this.http.get(this.ServerUrl + `/averageCost/avgLocItem?locationId=${mLocId}&itemId=${mitemId}`);
}

public AvgCostUpdateSubmit(AvgCostUpdateRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/averageCost';
  return this.http.post(url, AvgCostUpdateRecord, options);
}

// getAvgHistoryList
getAvgHistoryList(mLocId,mitemId,frmDate,toDate): Observable<any> {
 
  return this.http.get(this.ServerUrl + `/averageCost/avghistory?locationId=${mLocId}&itemId=${mitemId}&startDate=${frmDate}&endDate=${toDate}`);
  }

  ///////////////////////////////////////////////////// warranty claim /////////////////////

  lineStatusLst(): Observable<any> {
    return this.http.get(this.ServerUrl +'/cmnLookup/CmnType/WARRANTY_STATUS');
   }

  itemTypeLst(): Observable<any> {
    return this.http.get(this.ServerUrl +'/cmnLookup/CmnType/ITEM_TYPE');
   }
   

    warrDataList(fromDt,toDt,ouId,lineStat,itmType):Observable<any> {
      const REQUEST_PARAMS = new HttpParams().set('fromDate', fromDt)
      .set('toDate', toDt)
      .set('ouId',ouId)
      .set('lineStatus', lineStat)
      .set('itemType',itmType)
      const REQUEST_URI = this.ServerUrl +'/oemWarranty/warrantyData';
      return this.http.get(REQUEST_URI, {
        params: REQUEST_PARAMS,
      });
    }


    UpdateWarrClaim(warrClaimRecord) {
      const options = {
        headers: this.headers
      };
      const url = (this.ServerUrl + `/oemWarranty`);
      return this.http.put(url, warrClaimRecord, options);
      // http://localhost:8081/oemWarranty
    }

   
  
 }
