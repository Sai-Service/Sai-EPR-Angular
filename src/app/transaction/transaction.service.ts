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
  // ServerUrl='http://saihorizon.com:8080/ErpReplica'
   
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
//////////////////poInvoice////////////////
UpdateValidate(invoiceNum) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + `/apInv/invValidate/${invoiceNum}`);
  return this.http.put(url, invoiceNum, options);
}
  getApInvLineDetails(invoiceNum): Observable<any> {
    return this.http.get(this.ServerUrl + `/apInv/invDtls/${invoiceNum}`);
  }

  distLinesDeatailsfa(invoiceId,lineNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/apInv/apinvDisLinewise?invoiceId=${invoiceId}&distLineNumber=${lineNumber}`);
  }

  getprepay(supId,supsiteId):Observable<any>{
    return this.http.get(this.ServerUrl+`/apInv/apSuppDtls/?suppId=${supId}&suppSiteId=${supsiteId}`)
  }

  paymentMethodList(): Observable<any> {
    return this.http.get(this.ServerUrl +'/locationMst');
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
statusLookupCodeList(): Observable<any> {
  return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/PayStatus');
} 
paymentIdListList(): Observable<any> {
  return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/PayType');
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
  alert('in service')
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/averageCost';
  return this.http.post(url, AvgCostUpdateRecord, options);
}

// getAvgHistoryList
getAvgHistoryList(mLocId,mitemId,frmDate,toDate): Observable<any> {
  alert("Master Service :"+ mLocId+","+mitemId+" ,"+frmDate+","+toDate);
  return this.http.get(this.ServerUrl + `/averageCost/avghistory?locationId=${mLocId}&itemId=${mitemId}&startDate=${frmDate}&endDate=${toDate}`);
  }

}
