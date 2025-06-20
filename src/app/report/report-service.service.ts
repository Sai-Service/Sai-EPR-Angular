import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ AppConstants} from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {
  httpclient: any;
  headers: any;
  ServerUrl : string;
  lstcommentsUserSm = JSON.parse(sessionStorage.getItem('logRes'));
  token = this.lstcommentsUserSm.token;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.headers = this.headers.append("Authorization", "Bearer " + this.token);
    this.ServerUrl = AppConstants.ServerUrl;
   }


   SPDebtorReport(invcDt1,ouId,locId,custAcctNo,deptId,ag1,ag2,ag3,ag4){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprDebtors?toDate=${invcDt1}&ouId=${ouId}&locId=${locId}&custAcctNo=${custAcctNo}&deptId=${deptId}&age1=${ag1}&age2=${ag2}&age3=${ag3}&age4=${ag4}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  gstsaiDebtorsAsOf1(invcDt1,ouId,locId,custAcctNo,deptId,ag1,ag2,ag3,ag4){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprDebtorsRepAsOf?toDate=${invcDt1}&ouId=${ouId}&locId=${locId}&custAcctNo=${custAcctNo}&deptId=${deptId}&age1=${ag1}&age2=${ag2}&age3=${ag3}&age4=${ag4}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  SPDebtorAgingSummary(invcDt1,ouId,locId,custAcctNo,deptId,ag1,ag2,ag3,ag4){
   
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprDebtSummary?toDate=${invcDt1}&ouId=${ouId}&locId=${locId}&custAcctNo=${custAcctNo}&deptId=${deptId}&age1=${ag1}&age2=${ag2}&age3=${ag3}&age4=${ag4}`;
    return this.http.get(REQUEST_URI, {
    
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  stockMadeDetailsReport(fromDate, toDate,locId,tolocId,subInvCode,deptId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprStkTrfMade?fromDate=${fromDate}&toDate=${toDate}&fromLoc=${locId}&toLoc=${tolocId}&subInvCode=${subInvCode}&deptId=${deptId}`;
    return this.http.get(REQUEST_URI, {
   
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  spstktrfMdSummaryReport(invcDt1,invcDt4,locId,tolocId,subInvCode){
   
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprStkTrfMadeSummary?fromDate=${invcDt1}&toDate=${invcDt4}&fromLoc=${locId}&toLoc=${tolocId}&subInvCode=${subInvCode}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  panelConsuptionReFn(fromDate,toDate, locId){
   
    const REQUEST_URI = this.ServerUrl +`/PaintReports/PanelConsRep?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  templateDownload(name){
    const REQUEST_URI = this.ServerUrl +`/template/${name}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  


  SprStkTrfRecdDtlsReport(invcDt1,invcDt4,tolocId,fromlocId,subInvCode,deptId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprStkTrfRecdDtls?fromDate=${invcDt1}&toDate=${invcDt4}&shipToLoc=${tolocId}&shipFromLoc=${fromlocId}&subInvCode=${subInvCode}&deptId=${deptId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });

    
  }


  SprStkTrfRecdSummaryReport(invcDt1,invcDt4,tolocId,fromlocId,subInvCode){
    
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprStkTrfRecdSummary?fromDate=${invcDt1}&toDate=${invcDt4}&shipToLoc=${tolocId}&shipFromLoc=${fromlocId}&subInvCode=${subInvCode}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  saleProformaSummary(fromDate, toDate, locId){
    const REQUEST_URI = this.ServerUrl +`/SalesReports/SaleProformaReg?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  saleqtyChartForVh(fromDate, toDate, locId){
    const REQUEST_URI = this.ServerUrl +`/SalesReports/SalesQtyChartRep?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  salesInvoiceCanFn(fromDate, toDate, ouId,locId){
    const REQUEST_URI = this.ServerUrl +`/SalesReports/SlInvoiceCancRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  SprcusttakestatReport(invcDt1,invcDt4,locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/CustomerOffTake?fromDate=${invcDt1}&toDate=${invcDt4}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  paintPanelReportSummary(frmdt,todt,locId){
    const REQUEST_URI = this.ServerUrl +`/PaintReports/PanelEntryRep?fromDate=${frmdt}&toDate=${todt}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  paintPanelReportDetail(frmdt,todt,locId){
   
    const REQUEST_URI = this.ServerUrl +`/PaintReports/PanelDtlsRep?fromDate=${frmdt}&toDate=${todt}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  spSparesMiscIssueReceiptReport(invcDt1,invcDt4,locId,ouId){
    
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprMiscRep?fromDate=${invcDt1}&toDate=${invcDt4}&ouId=${ouId}&locId=${locId}`;

    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  PaintparesMiscIssueReceiptReport(invcDt1,invcDt4,locId,ouId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprMiscRep?fromDate=${invcDt1}&toDate=${invcDt4}&ouId=${ouId}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  spslReturnRegisterReport(invcDt1,invcDt4,ouId,locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprSalesReturn?fromDate=${invcDt1}&toDate=${invcDt4}&ouId=${ouId}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }




  spIncomeStatement(invcDt1,invcDt4,locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprIncomeStat?fromDate=${invcDt1}&toDate=${invcDt4}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  spProforDtReport(invcDt1,invcDt4,locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/ProformaIssueDtls?fromDate=${invcDt1}&toDate=${invcDt4}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  chequebounceReport(fromDate,invcDt4,ouId,locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/CheqBounce?fromDate=${fromDate}&toDate=${invcDt4}&ouId=${ouId}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  sprClsAsonDtReport(toDate,locId,subInvcd){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprClsAsonDt?toDate=${toDate}&locId=${locId}&subInvCode=${subInvcd}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  gstSparesClosingStockAsOnDateFN(toDate,locId,subInvcd){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprClsAsonDt?toDate=${toDate}&locId=${locId}&subInvCode=${subInvcd}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  sspInvAgingReport(spInvAging1,spInvAging2,spInvAging3,ouId,locId,subInv,userNam){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/InventoryAging?age1=${spInvAging1}&age2=${spInvAging2}&age3=${spInvAging3}&subInvCode=${subInv}&locId=${locId}&ouId=${ouId}&userName=${userNam}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
   
  }

  gltrialBalanceReport(ouCode,glYearName){
   
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/GLTrailBal?ouPara=${ouCode}&periodYear=${glYearName}`;
   
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
   
  }

  gltrialBalanceReportYtd(ouCode,glPrdName){
  
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/GLTrailYtd?periodYear=${glPrdName}&ouPara=${ouCode}`;
   
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });

    
  }

  gltrialBalanceReportPtd(ouCode,glYearName){
   
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/GLTrailPTD?ouPara=${ouCode}&periodYear=${glYearName}`;
   
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });

  }


  empLedgerReport(fromDate,toDate,ouId){
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/EmplLedger?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  cashBankReport(fromDate,toDate,ouId,locId,accountName,naturalAccct,userName){
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/CashbankReg?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}&accountName=${accountName}&naturalCode=${naturalAccct}&userName=${userName}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  aPGLUnpainAging(ouId,suppNo){
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/APToGLUnpaid?ouId=${ouId}&suppNo=${suppNo}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  jvRegister(fromDate,toDate,ouId){
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/JVRegister?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
    
  }

  actMatDistReport(fromDate,toDate,ouId){
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/AcctDistMatTrxRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
    
  }


  salesPendingPaymentDtlsFn(toDate,ouId,locId){
    const REQUEST_URI = this.ServerUrl +`/SalesReports/SlPendingPymtDtlsRep?toDate=${toDate}&ouId=${ouId}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  shortLandedClaimReport(fromDate,toDate,ouId,locaId,deptId){
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/ShortLandedRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locaId}&deptId=${deptId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  invReceiptWriteOffReport(fromDate,toDate,ouId,locaId){
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/InvRcptWriteOffRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locaId=${locaId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  tdsRegister(fromDate,toDate,ouId){
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/TDSRegister?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  tcsRegister(fromDate,toDate,ouId,locId){
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/TcsReport?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  refundRegister(fromDate,toDate,ouId,locId,depName){
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/RefundRegister?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}&deptName=${depName}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
    
  }

  rtvRegister(fromDate,toDate,ouId,locId,deptId){
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/RTVRegister?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}&deptId=${deptId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  actBillHandoverReport(fromDate,toDate,ouId,locId,deptId){
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/AcctBillFormat?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}&deptId=${deptId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  spDebtorOSLetterFn(toDate,ouId,locId,custAcctNo,deptId,age1,age2,age3,age4){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprDbtLetter?toDate=${toDate}&ouId=${ouId}&locId=${locId}&custAcctNo=${custAcctNo}&deptId=${deptId}&age1=${age1}&age2=${age2}&age3=${age3}&age4=${age4}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  manualInvoice(fromDate,toDate,ouId,locId){
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/ManualInvoiceRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}&sourceName=Manual`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  vendorLedgerRpt(fromDate,toDate,ouId,locId,supNo,supSite){
   
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/VendorLedger?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}&suppNo=${supNo}&siteName=${supSite}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  

  prePayment(ouId){
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/PrepaymentRep?ouId=${ouId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  bankReconciliation(fromDate,toDate,ouId,accountName){
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/BankRecoRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&bankName=${accountName}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  reinsuarnceReceiptRegister(fromDate, toDate, ouId, locId, deptId){
    const REQUEST_URI = this.ServerUrl +`/SalesReports/SalesReinsuranceRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}&deptId=${deptId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  saleSOALinewiseReport(fromDate, toDate, ouId, locId, deptId){
    const REQUEST_URI = this.ServerUrl +`/SalesReports/SalesSOARep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}&deptId=${deptId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
   
  }

  creditNoteReg(fromDate, toDate,ouId, locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprCreditNoteRegister?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  jobIssueDetails(fromDate, toDate, locId){
    const REQUEST_URI = this.ServerUrl +`/ServiceReports/JobIssueDetails?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  EwayBill(trxNumber){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/EwayBillRep?trxNumber=${trxNumber}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  subDealerRep(fromDate, toDate,locId,custAcctNo){
    const REQUEST_URI = this.ServerUrl +`/SalesReports/SubDealerRep?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}&custAcctNo=${custAcctNo}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  salesAgingReport(ouId,spInvAging1, spInvAging2, spInvAging3){
    const REQUEST_URI = this.ServerUrl +`/SalesReports/VehSalesAging?ouId=${ouId}&age1=${spInvAging1}&age2=${spInvAging2}&age3=${spInvAging3}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  saleAddonRegister(fromDate,toDate,ouId,locId){
    const REQUEST_URI = this.ServerUrl +`/SalesReports/SalesAddonReg?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  saleAddonRegisterNew(fromDate,toDate,ouId,locId,requestor){
    const REQUEST_URI = this.ServerUrl +`/SalesReports/SalesAddonRegDS?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}&requestor=${requestor}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  spbackOrderQtyReport(invcDt1,invcDt4,locId,custNo,ordNo){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprBackOrder?fromDate=${invcDt1}&toDate=${invcDt4}&locId=${locId}&custNo=${custNo}&ordNo=${ordNo}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  spDebtorExicutiveWise(toDate,ouId,locId,ticketNo,custAcctNo,deptId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/DebtorsExecWise?toDate=${toDate}&ouId=${ouId}&locId=${locId}&ticketNo=${ticketNo}&custAcctNo=${custAcctNo}&deptId=${deptId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

 

  JobCardSummaryReport(invcDt1,invcDt4,locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/JobCardSummary?fromDate=${invcDt1}&toDate=${invcDt4}&fromLoc=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  spIssueDetailsReport(invcDt1,invcDt4,locId,custAcctNo){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprIssueDtls?fromDate=${invcDt1}&toDate=${invcDt4}&locId=${locId}&custAcctNo=${custAcctNo}`;
    return this.http.get(REQUEST_URI, {
     
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  spIssueSummaryReport(invcDt1,invcDt4,locId,custAccNo){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprIssueSummary?fromDate=${invcDt1}&toDate=${invcDt4}&locId=${locId}&customerId=${custAccNo}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  sparesAgingReportAsOfDateFn(toDate,locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/InvAgingAsOfRep?toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }
  spareDailyReportFn(toDate,locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprDailyRep?toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  paintDailyReportFN(fromDate,toDate,orgId,subId){
    const REQUEST_URI = this.ServerUrl +`/PaintReports/PN_DailyRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${orgId}&subInvCode=${subId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  performaRegister(invcDt1,invcDt4,locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/ProformaIssueDtls?fromDate=${invcDt1}&toDate=${invcDt4}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  spstktrfMdReport(invcDt1,invcDt4,locId,tolocId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprStkTrfMade?fromDate=${invcDt1}&toDate=${invcDt4}&fromLoc=${locId}&toLoc=${tolocId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  stklgrtReport(invcDt1,invcDt4,subInv,segment,locId,stkLgrUserName){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/StockLedger?fromDate=${invcDt1}&toDate=${invcDt4}&subInvCode=${subInv}&partNo=${segment}&locId=${locId}&userName=${stkLgrUserName}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  spIssSmryReport(fromDate,toDate,locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprIssueSummary?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  spproformaReport(fromDate,toDate,locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/ProformaIssueDtls?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  spcreditnotregReport(fromDate,toDate,locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprCreditNoteRegister?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  sppurRegiSummReport(fromDate,toDate,ouId,locId,deptId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/PurchaseRegisterSummary?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}&deptId=${deptId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  PaintConsumptionSummReport(fromDate,toDate,ouId,locId,deptId){
    const REQUEST_URI = this.ServerUrl +`/PaintReports/PanelConsRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  sparesDbAgingExicutiveSum(toDate,ouId,locId,ticketNo,custAcctNo,deptId,age1,age2,age3,age4){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/DebtorsExecSummary?toDate=${toDate}&ouId=${ouId}&locId=${locId}&ticketNo=${ticketNo}&custAcctNo=${custAcctNo}&deptId=${deptId}&age1=${age1}&age2=${age2}&age3=${age3}&age4=${age4}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  sppurRegidetailReport(fromDate,toDate,ouId,locId,deptId){
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/GstPurchaseRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}&deptId=${deptId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  sppurRegidetailReportSpares(fromDate,toDate,ouId,locId,deptId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/PurchaseRegisterDtls?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}&deptId=${deptId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  vehicleClosingStockAsOn(toDate,ouId){
    const REQUEST_URI = this.ServerUrl +`/SalesReports/VehClsStkAoDRep?toDate=${toDate}&ouId=${ouId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  deliverySummary(fromDate,toDate,ouId,locId){
    const REQUEST_URI = this.ServerUrl +`/SalesReports/DeliverySummaryRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  salesRTOReport(fromDate,toDate,ouId,locId){
    const REQUEST_URI = this.ServerUrl +`/SalesReports/SalesRTOReg?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  spPurRegDownLoadReport(ouId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/download?fileName=GstPurchaseReg${ouId}.xls`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }
 

  paintStockTakingReport(locId,subInvCode,rep1){
    if(rep1=='blank') {
    const REQUEST_URI = this.ServerUrl +`/SparesReports/StkBlankFormat?compileName=&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  if(rep1=='detail') {
    const REQUEST_URI = this.ServerUrl +`/SparesReports/StkQtyDtlsFormat?compileName=&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  if(rep1=='upload') {
    const REQUEST_URI = this.ServerUrl +`/SparesReports/PhyStkUploadFormat?compileName=&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  
  }

  spclosstrockReport(locId,subInvCode){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprClosingStk?locId=${locId}&subInvCode=${subInvCode}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  paintclosingstockSummary(ouId,subInvCode){
  
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprClosingSummary?ouId=${ouId}&locId=&subInvCode=${subInvCode}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }



  spstktrfRecivedReport(fromDate,toDate,shipFromLocId,shipToLocId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprStkTrfRecdDtls?fromDate=${fromDate}&toDate=${toDate}&shipToLoc=${shipFromLocId}&shipFromLoc=${shipToLocId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  spstktrfRecivedSumReport(fromDate,toDate,shipFromLocId,shipToLocId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprStkTrfRecdSummary?fromDate=${fromDate}&toDate=${toDate}&shipToLoc=${shipFromLocId}&shipFromLoc=${shipToLocId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  stockLedgerReport(fromDate, toDate, subInvCode, partNo,locId,userName){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/StockLedger?fromDate=${fromDate}&toDate=${toDate}&subInvCode=${subInvCode}&partNo=${partNo}&locId=${locId}&userName=${userName}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

 

  getLocationSearch1(ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/locListOuwise/${ouId}`, { headers: this.headers });
  }


  spReceiptRegisterReport(fromDate,toDate,ouId,locId,deptId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprReceiptRegister?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}&deptId=${deptId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }



  //////////////////////////// Service URL Srarted /////////////////////////

  


  jobSummaryReport(fromDate,toDate,locId){
    const REQUEST_URI = this.ServerUrl +`/ServiceReports/JobCardSummary?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  serPendingVehicleReport(toDate,locId){
    const REQUEST_URI = this.ServerUrl +`/ServiceReports/ServPendingVeh?toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  servindToDtReport(toDate,locId){
    const REQUEST_URI = this.ServerUrl +`/ServiceReports/ServiceIndRep?toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  seviceDeliverySummaryReport(fromDate,toDate,ouId,locId){
    const REQUEST_URI = this.ServerUrl +`/ServiceReports/ServDelvRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  spInvTransRecFuc(fromDate,toDate,locId,subInvCode){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SubInvTrfRep?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}&subInvCode=${subInvCode}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  SalesInvTransRecFuc(fromDate,toDate,locId,subInvCode){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SubInvTrfRecdRep?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}&subInvCode=${subInvCode}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  spInvTransMadeFuc(fromDate,toDate,locId,subInvCode){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SubInvTrfMadeRep?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}&subInvCode=${subInvCode}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  irnGenerationReport(fromDate,toDate,ouId,locId,deptId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprIrnRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}&deptId=${deptId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  sprIssSummaryReport(fromDate,toDate,ouId,locId,deptId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprIssueTransRep?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  sprIssSummaryAvgCostReport(fromDate,toDate,locId,deptId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprIssueTransAvgRep?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  sprZeroStockReport(fromDate,toDate,locId,subInvCode){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprZeroStock?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}&subInvCode=${subInvCode}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  stockTakingBlankFormatReport(locId,compileName){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/StkBlankFormat?compileName=${compileName}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  stockTakingQtyReport(locId,compileName){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/StkQtyDtlsFormat?compileName=${compileName}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
     
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }
  stockTakingPhyStockUpldReport(locId,compileName){
     const REQUEST_URI = this.ServerUrl +`/SparesReports/PhyStkUploadFormat?compileName=${compileName}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
     
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  spConsumptionReport(fromDate,toDate, locId){
    
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprItemConsumption?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
     
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  invoiceSummaryReport(fromDate,toDate,locId){
    const REQUEST_URI = this.ServerUrl +`/ServiceReports/InvoiceSummary?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  amcUtilisation(fromDate,toDate,ouId){
    const REQUEST_URI = this.ServerUrl +`/ServiceReports/AmcCouponRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}`;
    return this.http.get(REQUEST_URI, {
     
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  amcControlReport(fromDate,toDate,ouId){
    const REQUEST_URI = this.ServerUrl +`/ServiceReports/AmcControlRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  fscCouponData(fromDate,toDate,locId){
    const REQUEST_URI = this.ServerUrl +`/SalesReports/FscCouponData?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  salesPendingPymntReport(toDate,locId,ouId){
    const REQUEST_URI = this.ServerUrl +`/SalesReports/SlPendingPymtRep?toDate=${toDate}&ouId=${ouId}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });

  }

  salesBookCancelReport(fromDate,toDate,locId,ouId){
    const REQUEST_URI = this.ServerUrl +`/SalesReports/SlBookingCanc?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  amcHistory(regNo,ouId){
    const REQUEST_URI = this.ServerUrl +`/ServiceReports/AmcHistory?regNo=${regNo}&ouId=${ouId}`;
    return this.http.get(REQUEST_URI, {
     
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  internalConsuptionReport(fromDate,toDate,locId,subInvCode,ouId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/ICReport?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}&subInvCode=${subInvCode}`;
    
    return this.http.get(REQUEST_URI, {
     
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  PaintInternalConsuptionReport(fromDate,toDate,locId,subInvCode,ouId,issCatg){
     const REQUEST_URI = this.ServerUrl +`/SparesReports/ICReport?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}&subInvCode=${subInvCode}&issueCatg=${issCatg}`;
     return this.http.get(REQUEST_URI, {
     
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  
  customerLedger(fromDate,toDate,custAccNo,ouId,deptId){
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/CustomerLedger?fromDate=${fromDate}&toDate=${toDate}&custAcctNo=${custAccNo}&ouId=${ouId}&deptId=${deptId}`;
    return this.http.get(REQUEST_URI, {
    
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

///////////////////// Sales Reports API Starts ////////////////////

vhslRegisterReport(fromDate,toDate,locId){
  const REQUEST_URI = this.ServerUrl +`/SalesReports/VehSalesReg?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}


gstSaleRegisterReport(fromDate,toDate,ouId,locId){
  const REQUEST_URI = this.ServerUrl +`/AccountsReports/GstSaleReg?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}
empLedgerControlReport(toDate,ouId){
  const REQUEST_URI = this.ServerUrl +`/AccountsReports/EmplLedgerControl?toDate=${toDate}&ouId=${ouId}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

laborChargeSummary(fromDate,toDate,ouId,locId){
  const REQUEST_URI = this.ServerUrl +`/ServiceReports/LabSummaryRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  }); 
}

technicianSummary(fromDate,toDate,ouId,locId){
  const REQUEST_URI = this.ServerUrl +`/ServiceReports/TechSummRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}


amcSaleRegister(fromDate,toDate,ouId,locId){
  const REQUEST_URI = this.ServerUrl +`/ServiceReports/AmcSalesRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

EWSaleRegister(fromDate,toDate,ouId,locId){
  const REQUEST_URI = this.ServerUrl +`/ServiceReports/EWSalesRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}


reinsuarnceReceiptPrint(receiptNo){
  const REQUEST_URI = this.ServerUrl +`/SalesReports/ReInsuranceReceipt?receiptNumber=${receiptNo}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
  
}

salesAddonReconciliation(fromDate,toDate,segment1,segment2,segment3,segment4,segment5){
  const REQUEST_URI = this.ServerUrl +`/SalesReports/SalesAddonReco?fromDate=${fromDate}&toDate=${toDate}&segment1=${segment1}&segment2=${segment2}&segment3=${segment3}&segment4=${segment4}&segment5=${segment5}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

salesINDReport(toDate,locId){
  const REQUEST_URI = this.ServerUrl +`/SalesReports/VehIndReg?toDate=${toDate}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

salesAltnotInvReport(toDate,locId){
  const REQUEST_URI = this.ServerUrl +`/SalesReports/VehAnIReg?toDate=${toDate}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

salesbookingregReport(fromDate,toDate,locId){
  const REQUEST_URI = this.ServerUrl +`/SalesReports/VehBookReg?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

vehicleClosingStockReport(orgId){
  const REQUEST_URI = this.ServerUrl +`/SalesReports/VehClosingStk?orgId=${orgId}`;
  return this.http.get(REQUEST_URI, {
    
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

vehicleClosingStockReportNew(orgId){
  const REQUEST_URI = this.ServerUrl +`/SalesReports/VehClosingStkNew?orgId=${orgId}`;
  return this.http.get(REQUEST_URI, {
    
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}


ChetakPendingBookingLastYear(orgId){
  
  const REQUEST_URI = this.ServerUrl +`/SalesReports/ChetakPendingBooking`;
  return this.http.get(REQUEST_URI, {
   
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}


receiptOtherDetails(fromDate,toDate,ouId,locId){
  
  const REQUEST_URI = this.ServerUrl +`/AccountsReports/RcptOthDtlsRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

///////////////////////////////  accounts report ///////////////


gstPurchaeReport(fromDate,toDate,orgId,locId,deptId){
  const REQUEST_URI = this.ServerUrl +`/AccountsReports/GstPurchaseRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${orgId}&locId=${locId}&deptId=${deptId}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

purchaseRegisterSummary(fromDate,toDate,ouId,locId,deptId){
  const REQUEST_URI = this.ServerUrl +`/SparesReports/PurchaseRegisterSummary?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}&deptId=${deptId}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

getServerReportById(tktNum): Observable<any> {
  return this.http.get(this.ServerUrl + `/fndRequest/fndRequestor/${tktNum}`, { headers: this.headers });
  
}

fndRquestDownload(requestId){
   const REQUEST_URI = this.ServerUrl +`/fndRequest/download?requestId=${requestId}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

PumpDSRreport(fromDate,ToDate,locId ,tnkId){
  
  const REQUEST_URI = this.ServerUrl +`/PetrolPumpReport/DSRReport?fromDate=${fromDate}&toDate=${ToDate}&tankId=${tnkId}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

CashCollectionExcessShortFn(fromDate,ToDate,locId){
 
  const REQUEST_URI = this.ServerUrl +`/PetrolPumpReport/CashCollectionRep?fromDate=${fromDate}&toDate=${ToDate}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

cashCardSumFn(fromDate,toDate,locId){
  
  const REQUEST_URI = this.ServerUrl +`/PetrolPumpReport/PP_CashCardSummary?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

cashCardDetFn(fromDate,toDate,locId){
 
  const REQUEST_URI = this.ServerUrl +`/PetrolPumpReport/PP_CashCardDetail?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  }); 
}


cashSaleReportFn(fromDate,toDate,locId){
  const REQUEST_URI = this.ServerUrl +`/PetrolPumpReport/CashSaleRep?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  }); 
}

saleRegisterCustomerWiseFn(fromDate,toDate,locId){
 
  const REQUEST_URI = this.ServerUrl +`/PetrolPumpReport/PP_CustSaleReg?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  }); 
}

saleTotalCollectionReport_PP(fromDate,toDate,locId){
 
  const REQUEST_URI = this.ServerUrl +`/PetrolPumpReport/DaywiseCollectionRep?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  }); 
}

shiftEntryReport_PP(fromDate,toDate,locId){
 
  const REQUEST_URI = this.ServerUrl +`/PetrolPumpReport/PP_ShiftEntryRep?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  }); 
}

saleRegisterReport_PP(fromDate,toDate,locId){
  
  const REQUEST_URI = this.ServerUrl +`/PetrolPumpReport/PP_SaleRegister?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  }); 
}

spDeadStockNoConsuptionDaywiseFn(ouId,locId,noOfday,subId){
  const REQUEST_URI = this.ServerUrl +`/SparesReports/SprDeadStkDayWise?ouId=${ouId}&locId=${locId}&noOfDays=${noOfday}&subInvCode=${subId}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  }); 
}


StockMissMatchFN(fromDate,toDate,subInventory,locId,userName){
  const REQUEST_URI = this.ServerUrl +`/SparesReports/StockMismatch/?fromDate=${fromDate}&toDate=${toDate}&subInvCode=${subInventory}&locId=${locId}&userName=${userName}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  }); 
}

soaLineWiseOrderWise(fromDate,toDate,ouId,locId,deptId,parameter){
  const REQUEST_URI = this.ServerUrl +`/SalesReports/SalesSOARep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}&deptId=${deptId}&repType=${parameter}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  }); 
}

soaLineWiseInvoiceWise(fromDate,toDate,ouId,locId,deptId,parameter){
  const REQUEST_URI = this.ServerUrl +`/SalesReports/SalesSOARep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}&deptId=${deptId}&repType=${parameter}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  }); 
}


}

