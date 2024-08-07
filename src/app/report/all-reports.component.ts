import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportServiceService } from 'src/app/report/report-service.service'
import { DatePipe, Location } from '@angular/common';
import { MasterService } from 'src/app/master/master.service';
import { saveAs } from 'file-saver';

interface IAdmin {
  searchItemId: number;
  searchItemCode: string;
  searchItemName: string;
}
const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

@Component({
  selector: 'app-all-reports',
  templateUrl: './all-reports.component.html',
  styleUrls: ['./all-reports.component.css']
})
export class AllReportsComponent implements OnInit {
  reportForm: FormGroup;
  public minDate = new Date();
  // invcDt1:Date;
  location: string;
  decimal_value: number;
  sidfromDate: Date;
  sidtoDate: Date;
  stockLedgerToLocName: string;
  invItemList = new Array();
  subInvCode: any;
  spIssueSummfromDate: Date;
  stockLedgerSubInv: string;
  spstktrfMdSumToLoc: number;
  spIssueSummtoDate: Date;
  spstktrfMdToLoc: number;

  purRegFromDt: Date;
  purRegToDt: Date;
  sppurRegiSummfromDate: Date;
  sppurRegiSummtoDate: Date;
  public BillShipList: Array<string> = [];
  public BillShipFromList: Array<string> = [];
  public BillShipToList: Array<string> = [];

  pipe = new DatePipe('en-US');
  now = new Date();
  invcDt1 = this.pipe.transform(this.now, 'dd-MM-yyyy');
  public ItemIdList: any[];
  userList2: any[] = [];
  lastkeydown1: number = 0;
  searchItemId: number;
  searchItemName: string;
  searchItemCode: string;
  stkLgrUserName: string;
  stklgrsubInv: string;
  stockLegfromDate: Date;
  stockLegtoDate: Date;
  spIssSmryfromDate: Date;
  spIssSmrytoDate: Date;
  spproformafromDate: Date;
  spproformatoDate: Date;
  spcreditnotregtoDate: Date;
  spcreditnotregfromDate: Date;
  sppurRegidetailfromDate: Date;
  sppurRegidetailtoDate: Date;
  spstktrfRecivedfromDate: Date;
  spstktrfRecivedToDate: Date;
  spstktrfRecivedToLoc: number;
  spstktrfRecivedFromLoc: number;
  spstktrfRecivedSumfromDate: Date;
  spstktrfRecivedSumToDate: Date;
  spstktrfRecivedSumToLoc: number;
  spstktrfRecivedSumFromLoc: number;

  stockLedgerfromDate: Date;
  stockLedgerToDate: Date;
  segment: string;
  stockLedgerToLoc: string;
  stockLedgerUserName: string;
  stockMadefromDate: Date;
  stockMadeToDate: Date;
  stockMadeToLocName: string;
  stockMadeToFromLoc: string;
  SprStkTrfRecdDtlsfromDate: Date;
  SprStkTrfRecdDtlstoDate: Date;
  SprStkTrfRecdDtlsFromLoc: number;
  SprStkTrfRecdSummaryfromDate: Date;
  SprStkTrfRecdSummarytoDate: Date;
  SprStkTrfRecdSummaryFromLoc: number;
  SprcusttakestatfromDate: Date;
  SprcusttakestattoDate: Date;
  spbackOrderQtyfromDate: Date;
  spbackOrderQtytoDate: Date;
  spbackOrderQtyCustAccNo: number;
  spbackOrderQtyOrderNumber: number;
  spmiscissRecfromDate: Date;
  spmiscissRectoDate: Date;
  spslReturnRegistertoDate: Date;
  spslReturnRegisterfromDate: Date;
  spInvAging1: number;
  spInvAging2: number;
  spInvAging3: number;
  spIncomeStatementfromDate: Date;
  spIncomeStatementtoDate: Date;
  sprClsAsonDttoDate: Date;
  spProforDtfromDate: Date;
  spProforDttoDate: Date;
  chequebouncefromDate: Date;
  chequebouncetoDate: Date;

  closeResetButton = true;
  dataDisplay: any;
  progress = 0;

  isDisabled1 = false;
  isDisabled2 = false;
  isDisabled3 = false;
  isDisabled4 = false;
  isDisabled5 = false;
  isDisabled6 = false;
  isDisabled7 = false;
  isDisabled8 = false;
  isDisabled9 = false;
  isDisabled10 = false;
  isDisabled11 = false;
  isDisabled12 = false;
  isDisabled13 = false;
  isDisabled14 = false;
  isDisabled15 = false;
  isDisabled16 = false;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private location1: Location, private router1: ActivatedRoute, private reportService: ReportServiceService) {
    this.reportForm = this.fb.group({
      invcDt1: [],
      location: [],
      deptId: [],
      purRegFromDt: [],
      purRegToDt: [],
      sprClsAsonDttoDate: [],
      spmiscissRectoDate: [],
      spmiscissRecfromDate: [],
      stockLedgerToLocName: [],
      spreceiptfromDate: [],
      spreceipttoDate: [],
      sidfromDate: [],
      sidtoDate: [],
      spIssueSummfromDate: [],
      spIssueSummtoDate: [],
      performatoDate: [],
      performafromDate: [],
      spstktrfMdfromDate: [],
      spstktrfMdtoDate: [],
      spstktrfMdToLoc: [],
      spstktrfMdSumfromDate: [],
      spstktrfMdSumtoDate: [],
      spstktrfMdSumToLoc: [],
      searchItemCode: [],
      stkLgrUserName: [],
      stklgrsubInv: [],
      stockLegfromDate: [],
      stockLegtoDate: [],
      spIssSmryfromDate: [],
      spIssSmrytoDate: [],
      spproformafromDate: [],
      spproformatoDate: [],
      spcreditnotregfromDate: [],
      spcreditnotregtoDate: [],
      sppurRegiSummfromDate: [],
      sppurRegiSummtoDate: [],
      sppurRegidetailtoDate: [],
      sppurRegidetailfromDate: [],
      spstktrfRecivedToDate: [],
      spstktrfRecivedfromDate: [],
      spstktrfRecivedToLoc: [],
      spstktrfRecivedFromLoc: [],
      spstktrfRecivedSumfromDate: [],
      spstktrfRecivedSumToDate: [],
      spstktrfRecivedSumToLoc: [],
      spstktrfRecivedSumFromLoc: [],
      stockLedgerfromDate: [],
      stockLedgerToDate: [],
      segment: [],
      stockLedgerToLoc: [],
      stockLedgerUserName: [],
      stockLedgerSubInv: [],
      stockMadefromDate: [],
      stockMadeToDate: [],
      stockMadeToLocName: [],
      stockMadeToFromLoc: [],
      SprStkTrfRecdDtlsfromDate: [],
      SprStkTrfRecdDtlstoDate: [],
      SprStkTrfRecdDtlsFromLoc: [],
      SprStkTrfRecdSummaryfromDate: [],
      SprStkTrfRecdSummarytoDate: [],
      SprStkTrfRecdSummaryFromLoc: [],
      SprcusttakestatfromDate: [],
      SprcusttakestattoDate: [],
      spbackOrderQtyfromDate: [],
      spbackOrderQtytoDate: [],
      spbackOrderQtyCustAccNo: [],
      spbackOrderQtyOrderNumber: [],
      spslReturnRegistertoDate: [],
      spslReturnRegisterfromDate: [],
      spInvAging1: [],
      spInvAging2: [],
      spInvAging3: [],
      spIncomeStatementtoDate: [],
      spIncomeStatementfromDate: [],
      spProforDtfromDate: [],
      spProforDttoDate: [],
      chequebouncefromDate: [],
      chequebouncetoDate: [],
    })
  }

  report(reportForm) {
  }

  ngOnInit(

  ): void {


    $('.link').click(function () {
      var id = $(this).attr("rel");

      $('#' + id).slideToggle('slow');
    });


    this.decimal_value = 100.8999777789;
    //  this.reportForm.patchValue({ location: sessionStorage.getItem('locId') });
    this.reportForm.patchValue({ deptId: sessionStorage.getItem('deptName') });
    this.reportForm.patchValue({ location: sessionStorage.getItem('locCode') });
    this.reportForm.patchValue({ stockLedgerToLocName: sessionStorage.getItem('locCode') });
    this.reportForm.patchValue({ stockLedgerToLoc: sessionStorage.getItem('locId') });
    this.reportForm.patchValue({ stockLedgerUserName: sessionStorage.getItem('ticketNo') });
    this.reportForm.patchValue({ spstktrfRecivedToLoc: sessionStorage.getItem('locCode') });
    this.reportForm.patchValue({ spstktrfRecivedSumToLoc: sessionStorage.getItem('locCode') });
    this.reportForm.patchValue({ stockMadeToLocName: sessionStorage.getItem('locCode') });

    this.reportService.getLocationSearch1(sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.BillShipList = data;
          console.log(this.BillShipList);
        }
      );

    this.service.ItemIdDivisionList(sessionStorage.getItem('divisionId')).subscribe(
      data => {
        this.ItemIdList = data;
        console.log(this.ItemIdList);
      });


    this.service.getLocationSearch1(sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.BillShipToList = data;
        }
      );

    this.service.getLocationSearch1(sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.BillShipFromList = data;
        }
      );


    this.service.invItemList2New('GOODS', (sessionStorage.getItem('deptName')), (sessionStorage.getItem('divisionId')), '36DH1601')
      .subscribe(
        data => {
          this.invItemList = data;
          console.log(this.invItemList);
        }
      );


    this.service.subInvCode2(sessionStorage.getItem('deptId'), sessionStorage.getItem('divisionId')).subscribe(
      data => {
        this.subInvCode = data;
        console.log(this.subInvCode);
        this.stockLedgerSubInv = this.subInvCode.subInventoryCode;
        this.reportForm.patchValue({ stockLedgerSubInv: this.subInvCode.subInventoryCode })
      });

  }



  spPurReg() {
    this.isDisabled1 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var purStDt = this.reportForm.get('purRegFromDt').value;
    var fromDate = this.pipe.transform(purStDt, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.reportForm.get('purRegToDt').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    const fileName = 'Purchase-Register-' +  fromDate + '-TO-' + toDate + '.xls';

    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.sppurRegidetailReport(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), sessionStorage.getItem('deptId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled1 = false;
      })
  }


  spPurRegDownLoad() {
    const fileName = 'Purchase-Register-' +  '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spPurRegDownLoadReport(sessionStorage.getItem('ouId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled1 = false;
      })
  }

  sppurRegiSumm() {
    this.isDisabled11 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var spreceiptfromDate2 = this.reportForm.get('sppurRegiSummfromDate').value;
    var fromDate = this.pipe.transform(spreceiptfromDate2, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.reportForm.get('sppurRegiSummtoDate').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    const fileName = 'Purchase-Register-Summary-' + sessionStorage.getItem('locName').replace(' ', '') + '-' + fromDate + '-TO-' + toDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);

    this.reportService.sppurRegiSummReport(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), sessionStorage.getItem('deptId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled11 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }

  spcreditnotreg() {
    var spreceiptfromDate2 = this.reportForm.get('spcreditnotregfromDate').value;
    var fromDate = this.pipe.transform(spreceiptfromDate2, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.reportForm.get('spcreditnotregtoDate').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    const fileName = 'download.pdf';
    this.reportService.spcreditnotregReport(fromDate, toDate, sessionStorage.getItem('locId'))
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      })
  }


  spIssueDetails() {
    this.isDisabled2 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var invcDt2 = this.reportForm.get('sidfromDate').value;
    var fromDate = this.pipe.transform(invcDt2, 'dd-MMM-yyyy');
    var invcDt3 = this.reportForm.get('sidtoDate').value;
    var toDate = this.pipe.transform(invcDt3, 'dd-MMM-yyyy');
    const fileName = 'SP-Issue-Details' +  fromDate + '-TO-' + toDate + '.xls';
    var custAcctNo = this.reportForm.get('custAccNo').value;
    var ticketNo = this.reportForm.get('userName1').value
    if (custAcctNo === undefined || custAcctNo === null) {
      custAcctNo = '';
    }
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spIssueDetailsReport(fromDate, toDate, sessionStorage.getItem('locId'),custAcctNo)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled2 = false;
        this.closeResetButton = true;
        this.dataDisplay = '';
      })
  }


  spIssueSummary() {
    this.isDisabled3 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var invcDt2 = this.reportForm.get('spIssueSummfromDate').value;
    var fromDate = this.pipe.transform(invcDt2, 'dd-MMM-yyyy');
    var invcDt3 = this.reportForm.get('spIssueSummtoDate').value;
    var toDate = this.pipe.transform(invcDt3, 'dd-MMM-yyyy');
    const fileName = 'SP-Issue-Summary-' +  fromDate + '-TO-' + toDate + '.xls';
   var custAccNo= this.reportForm.get('custAccNo').value;
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spIssueSummaryReport(fromDate, toDate, sessionStorage.getItem('locId'),custAccNo)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled3 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }

  spclosStock() {
    // var spreceiptfromDate2 = this.reportForm.get('sppurRegidetailfromDate').value;
    // var fromDate = this.pipe.transform(spreceiptfromDate2, 'dd-MMM-yyyy');
    // var spreceipttoDate2 = this.reportForm.get('sppurRegidetailtoDate').value;
    // var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    this.isDisabled4 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    const fileName = 'SP-Closing-Stock-' + sessionStorage.getItem('locName').trim() + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spclosstrockReport(sessionStorage.getItem('locId'),this.subInvCode)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled4 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }

  spReceiptRegister() {
    this.isDisabled5 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var spreceiptfromDate2 = this.reportForm.get('spreceiptfromDate').value;
    var fromDate = this.pipe.transform(spreceiptfromDate2, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.reportForm.get('spreceipttoDate').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    const fileName = 'SP-Receipt-Register-' +  fromDate + '-TO-' + toDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spReceiptRegisterReport(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), sessionStorage.getItem('deptId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled5 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }




  SPdebtorsReport() {
    this.isDisabled6 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var invcDt2 = this.reportForm.get('invcDt1').value;
    var fromDate = this.pipe.transform(invcDt2, 'dd-MMM-yyyy');
    //const fileName = 'download.pdf';
    const fileName = 'SP-Debtors-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.SPDebtorReport(fromDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'),sessionStorage.getItem('locId'),sessionStorage.getItem('locId'),0,0,0,0)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled6 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }



  spstktrfMd(spstktrfMdToLoc) {
    this.isDisabled7 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var invcDt2 = this.reportForm.get('spstktrfMdfromDate').value;
    var invcDt1 = this.pipe.transform(invcDt2, 'dd-MMM-yyyy');
    var invcDt3 = this.reportForm.get('spstktrfMdtoDate').value;
    var invcDt4 = this.pipe.transform(invcDt3, 'dd-MMM-yyyy');
    // var spstktrfMdToLoc=this.reportForm.get('spstktrfMdToLoc');
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spstktrfMdReport(invcDt1, invcDt4, sessionStorage.getItem('locId'), spstktrfMdToLoc)
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open;
        this.isDisabled7 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }



  spstktrfRecived() {
    this.isDisabled8 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var spreceiptfromDate2 = this.reportForm.get('spstktrfRecivedfromDate').value;
    var fromDate = this.pipe.transform(spreceiptfromDate2, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.reportForm.get('spstktrfRecivedToDate').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    var shipFromLocId = this.reportForm.get('spstktrfRecivedFromLoc').value
    var shipToLocId = sessionStorage.getItem('locId');
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spstktrfRecivedReport(fromDate, toDate, shipFromLocId, shipToLocId)
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open;
        this.isDisabled8 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }




  spstktrfRecivedSum() {
    this.isDisabled9 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var spreceiptfromDate2 = this.reportForm.get('spstktrfRecivedSumfromDate').value;
    var fromDate = this.pipe.transform(spreceiptfromDate2, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.reportForm.get('spstktrfRecivedSumToDate').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    // var shipFromLocId = this.reportForm.get('spstktrfRecivedSumToLoc').value;
    var shipFromLocId = sessionStorage.getItem('locId');
    var shipToLocId = this.reportForm.get('spstktrfRecivedSumFromLoc').value
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spstktrfRecivedSumReport(fromDate, toDate, shipFromLocId, shipToLocId)
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open;
        this.isDisabled9 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }

  stockLedger() {
    this.isDisabled10 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var spreceiptfromDate2 = this.reportForm.get('stockLedgerfromDate').value;
    var fromDate = this.pipe.transform(spreceiptfromDate2, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.reportForm.get('stockLedgerToDate').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    var subInvCode = this.reportForm.get('stockLedgerSubInv').value;
    var partNo = this.reportForm.get('segment').value;
    var locId = this.reportForm.get('stockLedgerToLoc').value;
    var userName = this.reportForm.get('stockLedgerUserName').value;
    this.reportService.stockLedgerReport(fromDate, toDate, subInvCode, partNo, locId, userName)
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open;
        this.isDisabled10 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }



  stockMade() {

    this.isDisabled11 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var spreceiptfromDate2 = this.reportForm.get('stockMadefromDate').value;
    var fromDate = this.pipe.transform(spreceiptfromDate2, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.reportForm.get('stockMadeToDate').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    var toLicId = this.reportForm.get('stockMadeToFromLoc').value;
    //  alert(toLicId)
    const fileName = 'Stock-Made-Details-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.stockMadeDetailsReport(fromDate, toDate, sessionStorage.getItem('locId'), toLicId, this.subInvCode.subInventoryCode,sessionStorage.getItem('deptId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled11 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }




  spstktrfMdSummary() {
    this.isDisabled12 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var invcDt2 = this.reportForm.get('spstktrfMdSumfromDate').value;
    var fromDate = this.pipe.transform(invcDt2, 'dd-MMM-yyyy');
    var invcDt3 = this.reportForm.get('spstktrfMdSumtoDate').value;
    var invcDt4 = this.pipe.transform(invcDt3, 'dd-MMM-yyyy');
    var fromlocId = this.reportForm.get('spstktrfMdSumToLoc').value;
    const fileName = 'Stock-Made-Summary-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spstktrfMdSummaryReport(fromDate, invcDt4, sessionStorage.getItem('locId'), fromlocId, this.subInvCode.subInventoryCode)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled12 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }



  SprStkTrfRecdDtls() {
    this.isDisabled13 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var invcDt2 = this.reportForm.get('SprStkTrfRecdDtlsfromDate').value;
    var fromDate = this.pipe.transform(invcDt2, 'dd-MMM-yyyy');
    var invcDt3 = this.reportForm.get('SprStkTrfRecdDtlstoDate').value;
    var invcDt4 = this.pipe.transform(invcDt3, 'dd-MMM-yyyy');
    var fromlocId = this.reportForm.get('SprStkTrfRecdDtlsFromLoc').value;
    const fileName = 'Stock-Received-Detail-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.SprStkTrfRecdDtlsReport(fromDate, invcDt4, sessionStorage.getItem('locId'), fromlocId, this.subInvCode.subInventoryCode,sessionStorage.getItem('deptId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled13 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }




  SprStkTrfRecdSummary() {
    this.isDisabled14 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var invcDt2 = this.reportForm.get('SprStkTrfRecdSummaryfromDate').value;
    var fromDate = this.pipe.transform(invcDt2, 'dd-MMM-yyyy');
    var invcDt3 = this.reportForm.get('SprStkTrfRecdSummarytoDate').value;
    var invcDt4 = this.pipe.transform(invcDt3, 'dd-MMM-yyyy');
    var fromlocId = this.reportForm.get('SprStkTrfRecdSummaryFromLoc').value;
    const fileName = 'Stock-Received-Summary-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.SprStkTrfRecdSummaryReport(fromDate, invcDt4, sessionStorage.getItem('locId'), fromlocId, this.subInvCode.subInventoryCode)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled14 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }




  Sprcusttakestat() {
    this.isDisabled15 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var invcDt2 = this.reportForm.get('SprcusttakestatfromDate').value;
    var fromDate = this.pipe.transform(invcDt2, 'dd-MMM-yyyy');
    var invcDt3 = this.reportForm.get('SprcusttakestattoDate').value;
    var invcDt4 = this.pipe.transform(invcDt3, 'dd-MMM-yyyy');
    const fileName = 'Spares-Customer-Off-Take-Statement-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.SprcusttakestatReport(fromDate, invcDt4, sessionStorage.getItem('locId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled15 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }

  spSparesMiscIssueReceipt() {
    this.isDisabled15 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var invcDt2 = this.reportForm.get('spmiscissRecfromDate').value;
    var fromDate = this.pipe.transform(invcDt2, 'dd-MMM-yyyy');
    var invcDt3 = this.reportForm.get('spmiscissRectoDate').value;
    var invcDt4 = this.pipe.transform(invcDt3, 'dd-MMM-yyyy');
    const fileName = 'Spares Misc Issue Receipt Report-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spSparesMiscIssueReceiptReport(fromDate, invcDt4, sessionStorage.getItem('locId'),sessionStorage.getItem('ouId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled15 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }



  spbackOrderQty(spbackOrderQtyCustAccNo, spbackOrderQtyOrderNumber) {
    // alert(spbackOrderQtyCustAccNo+'----'+spbackOrderQtyOrderNumber)
    this.isDisabled16 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var invcDt2 = this.reportForm.get('spbackOrderQtyfromDate').value;
    var fromDate = this.pipe.transform(invcDt2, 'dd-MMM-yyyy');
    var invcDt3 = this.reportForm.get('spbackOrderQtytoDate').value;
    var invcDt4 = this.pipe.transform(invcDt3, 'dd-MMM-yyyy');
    var orderNumber = spbackOrderQtyOrderNumber;
    if (spbackOrderQtyCustAccNo === undefined || spbackOrderQtyCustAccNo === null) {
      spbackOrderQtyCustAccNo = '';
    }
    if (orderNumber === undefined || orderNumber === null) {
      orderNumber = ''
    }
    const fileName = 'Spares Back Order Qty Report-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spbackOrderQtyReport(fromDate, invcDt4, sessionStorage.getItem('locId'), spbackOrderQtyCustAccNo, orderNumber)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled16 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }

  filterRecord(event) {
    var itemCode = event.target.value;
    if (itemCode.length === 4) {
      // if (event.keyCode == 13) {
      this.service.invItemList2New('GOODS', (sessionStorage.getItem('deptName')), (sessionStorage.getItem('divisionId')), itemCode.toUpperCase())
        .subscribe((data) => {
          if (data.length === 0) {
            alert('Item Not Present in Master');
            return;
          }
          else {
            this.invItemList = data;
          }
        });
      // }
    }
    else if (itemCode.length === 3) {
      alert('Please Enter 4 characters of item number!!');
      return;
    }
  }

  onOptioninvItemIdSelected(event) { }


  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }


  spslReturnRegister() {
    this.isDisabled15 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var invcDt2 = this.reportForm.get('spslReturnRegisterfromDate').value;
    var fromDate = this.pipe.transform(invcDt2, 'dd-MMM-yyyy');
    var invcDt3 = this.reportForm.get('spslReturnRegistertoDate').value;
    var invcDt4 = this.pipe.transform(invcDt3, 'dd-MMM-yyyy');
    const fileName = 'Spares Sales Return Register-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spslReturnRegisterReport(fromDate, invcDt4, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled15 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }


  spInvAging() {
    this.isDisabled15 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var spInvAging1 = this.reportForm.get('spInvAging1').value;
    var spInvAging2 = this.reportForm.get('spInvAging2').value;
    var spInvAging3 = this.reportForm.get('spInvAging3').value;
    if (spInvAging1 > spInvAging2) {
      alert('Please check Aging.!');
      this.dataDisplay = 'Please check Aging.';
      return;
    }
    else if (spInvAging1 > spInvAging3) {
      alert('Please check Aging.!');
      this.dataDisplay = 'Please check Aging.';
      return;
    }
    else if (spInvAging2 > spInvAging3) {
      alert('Please check Aging.!');
      this.dataDisplay = 'Please check Aging.';
      return;
    }
    const fileName = 'Spares Inventory Aging Report-' +  '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.sspInvAgingReport(spInvAging1, spInvAging2, spInvAging3, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'),this.subInvCode,"")
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled15 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }





  spIncomeStatement() {
    this.isDisabled15 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var invcDt2 = this.reportForm.get('spIncomeStatementfromDate').value;
    var fromDate = this.pipe.transform(invcDt2, 'dd-MMM-yyyy');
    var invcDt3 = this.reportForm.get('spIncomeStatementtoDate').value;
    var invcDt4 = this.pipe.transform(invcDt3, 'dd-MMM-yyyy');
    const fileName = 'Spares Income Statement-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spIncomeStatement(fromDate, invcDt4, sessionStorage.getItem('locId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled15 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }



  sprClsAsonDt() {
    this.isDisabled15 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var invcDt2 = this.reportForm.get('sprClsAsonDttoDate').value;
    var toDate = this.pipe.transform(invcDt2, 'dd-MMM-yyyy');
    const fileName = 'Spares Income Statement-' +  toDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.sprClsAsonDtReport(toDate, sessionStorage.getItem('locId'),'SP')
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled15 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }

  spProforDt() {
    this.isDisabled15 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var invcDt2 = this.reportForm.get('spProforDtfromDate').value;
    var fromDate = this.pipe.transform(invcDt2, 'dd-MMM-yyyy');
    var invcDt3 = this.reportForm.get('spProforDttoDate').value;
    var invcDt4 = this.pipe.transform(invcDt3, 'dd-MMM-yyyy');
    const fileName = 'Spares Proforma Details Report-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spProforDtReport(fromDate, invcDt4, sessionStorage.getItem('locId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled15 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }


  chequebounce() {
    this.isDisabled15 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var invcDt2 = this.reportForm.get('chequebouncefromDate').value;
    var fromDate = this.pipe.transform(invcDt2, 'dd-MMM-yyyy');
    var invcDt3 = this.reportForm.get('chequebouncetoDate').value;
    var invcDt4 = this.pipe.transform(invcDt3, 'dd-MMM-yyyy');
    const fileName = 'Cheque Bounce Report-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.chequebounceReport(fromDate, invcDt4, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled15 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }

}


