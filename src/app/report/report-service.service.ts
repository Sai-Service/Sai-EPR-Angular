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
 

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.ServerUrl = AppConstants.ServerUrl;
   }


   SPDebtorReport(invcDt1,ouId,locId,custAcctNo,deptId,ag1,ag2,ag3,ag4){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprDebtors?toDate=${invcDt1}&ouId=${ouId}&locId=${locId}&custAcctNo=${custAcctNo}&deptId=${deptId}&age1=${ag1}&age2=${ag2}&age3=${ag3}&age4=${ag4}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  SPDebtorAgingSummary(invcDt1,ouId,locId,custAcctNo,deptId,ag1,ag2,ag3,ag4){
    // http://localhost:8081/SparesReports/SprDebtSummary?toDate=08-OCT-2022&ouId=21&locId=2102&custAcctNo&deptId=5&age1=30&age2=45&age3=60&age4=75

    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprDebtSummary?toDate=${invcDt1}&ouId=${ouId}&locId=${locId}&custAcctNo=${custAcctNo}&deptId=${deptId}&age1=${ag1}&age2=${ag2}&age3=${ag3}&age4=${ag4}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  stockMadeDetailsReport(fromDate, toDate,locId,tolocId,subInvCode,deptId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprStkTrfMade?fromDate=${fromDate}&toDate=${toDate}&fromLoc=${locId}&toLoc=${tolocId}&subInvCode=${subInvCode}&deptId=${deptId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
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


  SprStkTrfRecdSummaryReport(invcDt1,invcDt4,locId,fromlocId,subInvCode){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprStkTrfRecdSummary?fromDate=${invcDt1}&toDate=${invcDt4}&shipToLoc=${fromlocId}&shipFromLoc=${locId}&subInvCode=${subInvCode}`;
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


  SprcusttakestatReport(invcDt1,invcDt4,locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/CustomerOffTake?fromDate=${invcDt1}&toDate=${invcDt4}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  spSparesMiscIssueReceiptReport(invcDt1,invcDt4,locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprMiscRep?fromDate=${invcDt1}&toDate=${invcDt4}&locId=${locId}`;
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

  sspInvAgingReport(spInvAging1,spInvAging2,spInvAging3,ouId,locId,subInv,userNam){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/InventoryAging?age1=${spInvAging1}&age2=${spInvAging2}&age3=${spInvAging3}&subInvCode=${subInv}&locId=${locId}&ouId=${ouId}&userName=${userNam}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
    // http://localhost:8081/SparesReports/InventoryAging?age1=30&age2=60&age3=90&subInvCode=SP&locId=2102&ouId=21&userName=DINESH
  }

  gltrialBalanceReport(ouCode,glYearName){
    // const REQUEST_URI = this.ServerUrl +`/AccountsReports/GLTrailBal?ouPara=${ouCode}&periodName=${periodName}`;
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/GLTrailBal?ouPara=${ouCode}&periodYear=${glYearName}`;
   
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
    // Request URL: http://localhost:8081/AccountsReports/GLTrailBal?ouPara=12MU&periodYear=2022

  }

  gltrialBalanceReportYtd(ouCode,glPrdName){
    // const REQUEST_URI = this.ServerUrl +`/AccountsReports/GLTrailBal?ouPara=${ouCode}&periodName=${periodName}`;
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/GLTrailYtd?periodYear=${glPrdName}&ouPara=${ouCode}`;
   
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });

    // http://localhost:8081/AccountsReports/GLTrailYtd?periodYear=APR-22-23&ouPara=12MU
  }

  gltrialBalanceReportPtd(ouCode,glYearName){
    // const REQUEST_URI = this.ServerUrl +`/AccountsReports/GLTrailBal?ouPara=${ouCode}&periodName=${periodName}`;
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/GLTrailPTD?ouPara=${ouCode}&periodYear=${glYearName}`;
   
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });

    // http://localhost:8081/AccountsReports/GLTrailPTD?ouPara=12MU&periodYear=2022

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
    // http://localhost:8081/AccountsReports/JVRegister?fromDate=01-APR-2022&toDate=29-JUL-2022&ouId=21
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
    // http://localhost:8081/AccountsReports/RefundRegister?fromDate=01-APR-2022&toDate=02-AUG-2022&ouId=21&locId&deptName=Service  
  }

  rtvRegister(fromDate,toDate,ouId,locId,deptId){
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/RTVRegister?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}&deptId=${deptId}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  
    // http://localhost:8081/AccountsReports/RTVRegister?fromDate=01-APR-2022&toDate=19-SEP-2022&ouId=21&locId=2101&deptId=1
  
  }

  manualInvoice(fromDate,toDate,ouId,locId){
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/ManualInvoiceRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}&sourceName=Manual`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  vendorLedgerRpt(fromDate,toDate,ouId,locId,supNo,supSite){
    // http://localhost:8081/AccountsReports/VendorLedger?fromDate=01-APR-2022&toDate=30-APR-2022&ouId=21&locId=2102&suppNo=3 ---old
    // http://localhost:8081/AccountsReports/VendorLedger?fromDate=01-APR-2022&toDate=30-APR-2022&ouId=21&locId=2102&suppId=3&siteName=MUMBAI-MAHARASHTRA  --new
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

  spIssueDetailsReport(invcDt1,invcDt4,locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprIssueDtls?fromDate=${invcDt1}&toDate=${invcDt4}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  spIssueSummaryReport(invcDt1,invcDt4,locId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprIssueSummary?fromDate=${invcDt1}&toDate=${invcDt4}&locId=${locId}`;
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

    // http://localhost:8081/SalesReports/SalesRTOReg?fromDate=01-Sep-2022&toDate=21-Sep-2022&ouId=21&locId=2101
  }


  spPurRegDownLoadReport(ouId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/download?fileName=GstPurchaseReg${ouId}.xls`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }
  // http://localhost:8081/AccountsReports/GstPurchaseRep?fromDate=01-FEB-2022&toDate=02-FEB-2022&ouId=21&locId=&deptId=5
 

  spclosstrockReport(locId,subInvCode){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprClosingStk?locId=${locId}&subInvCode=${subInvCode}`;
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
    return this.http.get(this.ServerUrl + `/locationMst/locListOuwise/${ouId}`);
  }


  spReceiptRegisterReport(fromDate,toDate,ouId,locId,deptId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprReceiptRegister?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}&deptId=${deptId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }



  //////////////////////////// Service URL Srarted /////////////////////////

  


  jobSummaryReport(fromDate,toDate,locId){
    const REQUEST_URI = this.ServerUrl +`/ServiceReports/JobCardSummary?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  serPendingVehicleReport(toDate,locId){
    const REQUEST_URI = this.ServerUrl +`/ServiceReports/ServPendingVeh?toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  servindToDtReport(toDate,locId){
    const REQUEST_URI = this.ServerUrl +`/ServiceReports/ServiceIndRep?toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  seviceDeliverySummaryReport(fromDate,toDate,ouId,locId){
    const REQUEST_URI = this.ServerUrl +`/ServiceReports/ServDelvRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  spInvTransRecFuc(fromDate,toDate,locId,subInvCode){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SubInvTrfRep?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}&subInvCode=${subInvCode}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  SalesInvTransRecFuc(fromDate,toDate,locId,subInvCode){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SubInvTrfRecdRep?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}&subInvCode=${subInvCode}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  spInvTransMadeFuc(fromDate,toDate,locId,subInvCode){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SubInvTrfMadeRep?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}&subInvCode=${subInvCode}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  irnGenerationReport(fromDate,toDate,ouId,locId,deptId){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprIrnRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}&deptId=${deptId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  sprIssSummaryReport(fromDate,toDate,ouId,locId,deptId){
    // http://localhost:8081/SparesReports/SprIssueTransRep?fromDate=01-JUN-2022&toDate=25-JUN-2022&locId=2101
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprIssueTransRep?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  sprIssSummaryAvgCostReport(fromDate,toDate,locId,deptId){
    // http://localhost:8081/SparesReports/SprIssueTransAvgRep?fromDate=01-AUG-2022&toDate=25-AUG-2022&locId=2101
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprIssueTransAvgRep?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  sprZeroStockReport(fromDate,toDate,locId,subInvCode){
    // http://localhost:8081/SparesReports/SprZeroStock?fromDate=01-JUN-2022&toDate=16-JUL-2022&ouId=22&locId=2102&subInvCode=SP
    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprZeroStock?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}&subInvCode=${subInvCode}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  stockTakingBlankFormatReport(locId,compileName){
    // http://localhost:8081/SparesReports/StkBlankFormat?compileName=12MU.2101-22221012500126&locId=2101
    const REQUEST_URI = this.ServerUrl +`/SparesReports/StkBlankFormat?compileName=${compileName}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  stockTakingQtyReport(locId,compileName){
    // http://localhost:8081/SparesReports/StkQtyDtlsFormat?compileName=12MU.2101-22221012500126&locId=2101

    const REQUEST_URI = this.ServerUrl +`/SparesReports/StkQtyDtlsFormat?compileName=${compileName}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }
  stockTakingPhyStockUpldReport(locId,compileName){
    // http://localhost:8081/SparesReports/PhyStkUploadFormat?compileName=12MU.2101-22221012500128&locId=2101

    const REQUEST_URI = this.ServerUrl +`/SparesReports/PhyStkUploadFormat?compileName=${compileName}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  spConsumptionReport(fromDate,toDate, locId){
    // http://localhost:8081/SparesReports/PhyStkUploadFormat?compileName=12MU.2101-22221012500128&locId=2101

    const REQUEST_URI = this.ServerUrl +`/SparesReports/SprItemConsumption?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  invoiceSummaryReport(fromDate,toDate,locId){
    const REQUEST_URI = this.ServerUrl +`/ServiceReports/InvoiceSummary?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  amcUtilisation(fromDate,toDate,ouId){
    const REQUEST_URI = this.ServerUrl +`/ServiceReports/AmcCouponRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
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

    // http://localhost:8081/SalesReports/SlBookingCanc?fromDate=01-APR-2022&toDate=03-AUG-2022&ouId=21&locId=2101

  }


  amcHistory(regNo,ouId){
    const REQUEST_URI = this.ServerUrl +`/ServiceReports/AmcHistory?regNo=${regNo}&ouId=${ouId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  internalConsuptionReport(fromDate,toDate,locId,subInvCode){
    const REQUEST_URI = this.ServerUrl +`/SparesReports/ICReport?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}&subInvCode=${subInvCode}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  customerLedger(fromDate,toDate,custAccNo,ouId,deptId){
    const REQUEST_URI = this.ServerUrl +`/AccountsReports/CustomerLedger?fromDate=${fromDate}&toDate=${toDate}&custAcctNo=${custAccNo}&ouId=${ouId}&deptId=${deptId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

///////////////////// Sales Reports API Starts ////////////////////

vhslRegisterReport(fromDate,toDate,locId){
  const REQUEST_URI = this.ServerUrl +`/SalesReports/VehSalesReg?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    // params: REQUEST_PARAMS,
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}


gstSaleRegisterReport(fromDate,toDate,ouId,locId){
  const REQUEST_URI = this.ServerUrl +`/AccountsReports/GstSaleReg?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    // params: REQUEST_PARAMS,
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

laborChargeSummary(fromDate,toDate,ouId,locId){
  const REQUEST_URI = this.ServerUrl +`/ServiceReports/LabSummaryRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    // params: REQUEST_PARAMS,
    responseType: 'arraybuffer',
    headers: this.headers,
  }); 
}

technicianSummary(fromDate,toDate,ouId,locId){
  const REQUEST_URI = this.ServerUrl +`/ServiceReports/TechSummRep?fromDate=${fromDate}&toDate=${toDate}&ouId=${ouId}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    // params: REQUEST_PARAMS,
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
    // params: REQUEST_PARAMS,
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

salesAltnotInvReport(toDate,locId){
  const REQUEST_URI = this.ServerUrl +`/SalesReports/VehAnIReg?toDate=${toDate}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    // params: REQUEST_PARAMS,
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

salesbookingregReport(fromDate,toDate,locId){
  const REQUEST_URI = this.ServerUrl +`/SalesReports/VehBookReg?fromDate=${fromDate}&toDate=${toDate}&locId=${locId}`;
  return this.http.get(REQUEST_URI, {
    // params: REQUEST_PARAMS,
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

vehicleClosingStockReport(orgId){
  const REQUEST_URI = this.ServerUrl +`/SalesReports/VehClosingStk?orgId=${orgId}`;
  return this.http.get(REQUEST_URI, {
    // params: REQUEST_PARAMS,
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}

vehicleClosingStockReportNew(orgId){
  // http://localhost:8081/SalesReports/VehClosingStkNew?orgId=22

  const REQUEST_URI = this.ServerUrl +`/SalesReports/VehClosingStkNew?orgId=${orgId}`;
  return this.http.get(REQUEST_URI, {
    // params: REQUEST_PARAMS,
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}


ChetakPendingBookingLastYear(orgId){
  // http://localhost:8081/SalesReports/ChetakPendingBooking
  const REQUEST_URI = this.ServerUrl +`/SalesReports/ChetakPendingBooking`;
  return this.http.get(REQUEST_URI, {
    // params: REQUEST_PARAMS,
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
  return this.http.get(this.ServerUrl + `/fndRequest/fndRequestor/${tktNum}`);
  // http://localhost:8081/fndRequest/fndRequestor/M2152

}

fndRquestDownload(requestId){
   const REQUEST_URI = this.ServerUrl +`/fndRequest/download?requestId=${requestId}`;
  return this.http.get(REQUEST_URI, {
    responseType: 'arraybuffer',
    headers: this.headers,
  });
}



}

