import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportServiceService } from 'src/app/report/report-service.service'
import { DatePipe, Location } from '@angular/common';
import { MasterService } from 'src/app/master/master.service';
import { saveAs } from 'file-saver';

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};


@Component({
  selector: 'app-accessories-report',
  templateUrl: './accessories-report.component.html',
  styleUrls: ['./accessories-report.component.css']
})
export class AccessoriesReportComponent implements OnInit {

sparesReportForm: FormGroup;
pipe = new DatePipe('en-US');
now = new Date();
public minDate = new Date();
fromDate = this.pipe.transform(Date.now(), 'y-MM-dd');
toDate = this.pipe.transform(Date.now(), 'y-MM-dd');
OUCode: string;
locCode: string;
locId: number;
trxNumber:number;
public BillShipToList: Array<string> = [];
public BillShipFromList: Array<string> = [];
periodNameList: any = [];

public DepartmentList: any = [];

closeResetButton = true;
dataDisplay: any;
progress = 0;
deptId: number;
userName: string;
subInventory: string;
subInvCode: any;
segment: string;
fromlocCode:string;
fromLocId:number;
compileCode:string;

tolocCode: string;
tolocId: number;
orderNumber: number;
custAccNo: number;
spInvAging1: number=30;
spInvAging2: number=60;
spInvAging3: number=90;

spDbAging1: number=15;
spDbAging2: number=30;
spDbAging3: number=45;
spDbAging4: number=60;

invItemList = new Array();
isVisibleGSTPurchaseRegister: boolean = false;
isVisiblelocationInput: boolean = false;
isVisiblelocationLOV: boolean = false;
isVisiblespPurRegDownLoad: boolean = false;
isVisibleonlyLocationCode: boolean = false;
isVisiblegstsaiDebtors: boolean = false;
isVisibleStockLedger: boolean = false;
isVisiblestockTransfer: boolean = false;
isVisiblestockTransferRecd: boolean = false;
isVisibleSparesIssueDetailsReport:boolean=false;
isVisibleSparesBackOrderQty: boolean = false;
isVisiblesparesMiscIssueReceipt: boolean = false;
isVisiblesparesInventoryAging: boolean = false;
isVisibleSparesDebtorsExecutiveWise: boolean = false;
isVisibleDepartmentList: boolean = false;
isVisiblefromtosubinventory:boolean=false;
isVisiblespClosingStockAsOndate:boolean=false;
isVisiblecustomerLedger:boolean=false;
isVisibleEwayBill:boolean=false;
isVisiblepanelStockTaking=false;
panelspDebtAgByExicutiveSummary=false;
isDisabled1 = false;
userName1:string;
dispLocation:boolean=true;
rptValidation=true;
displayCustAccountNo=false;
isVisibleStockMissMatch:boolean=false;
isVisiblepanelspDeadStockNoConsuptionDaywise:boolean=false;
noOfDays:number;

constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private location1: Location, private router1: ActivatedRoute, private reportService: ReportServiceService) {
  this.sparesReportForm = this.fb.group({
    fromDate: [''],
    toDate: [],
    OUCode: [''],
    locCode: [''],
    locId: [''],
    deptId: [''],
    userName: [''],
    subInventory: [''],
    segment: [''],
    fromlocCode:[],
    fromLocId:[],
    tolocCode: [''],
    tolocId: [''],
    custAccNo: [''],
    orderNumber: [''],
    spInvAging1: [''],
    spInvAging2: [''],
    spInvAging3: [''],
    department: [''],
    userName1:[''], 
    trxNumber:[''],

    spDbAging1:[],
    spDbAging2:[],
    spDbAging3:[],
    spDbAging4:[],

    compileCode:[''],
    noOfDays:[],
  })
}


sparesReport(sparesReportForm) {
}

ngOnInit(): void {
  this.sparesReportForm.patchValue({ OUCode: sessionStorage.getItem('ouId') + '-' + sessionStorage.getItem('ouName') })
  this.sparesReportForm.patchValue({ locCode: sessionStorage.getItem('locId') + '-' + sessionStorage.getItem('locName') })
     this.sparesReportForm.patchValue({ department: 'Accessories' });
    this.sparesReportForm.patchValue({ deptId: 6 })
  // Prevent closing from click inside dropdown
  $(document).on('click', '.dropdown-menu', function (e) {
    e.stopPropagation();
  });

  // make it as accordion for smaller screens
  if ($(window).width() < 992) {
    $('.dropdown-menu a').click(function (e) {
      e.preventDefault();
      if ($(this).next('.submenu').length) {
        $(this).next('.submenu').toggle();
      }
      $('.dropdown').on('hide.bs.dropdown', function () {
        $(this).find('.submenu').hide();
      })
    });
  }

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


  this.service.DepartmentListNew()
    .subscribe(
      data => {
        this.DepartmentList = data;
      }
    );

  this.service.FinancialPeriod()
    .subscribe(
      data => {
        this.periodNameList = data.obj;
      }
    );

      // alert(sessionStorage.getItem('ticketNo') )
  this.sparesReportForm.patchValue({ userName: sessionStorage.getItem('ticketNo') });
  this.userName=sessionStorage.getItem('ticketNo');

  if (Number(sessionStorage.getItem('deptId')) === 4) {
    this.isVisiblelocationLOV = true;
    this.isVisiblelocationInput = false;
    this.sparesReportForm.patchValue({ subInventory: 'AC' })
    this.dispLocation=true;
  }
  else {
    this.isVisiblelocationLOV = false;
    this.isVisiblelocationInput = true;
    this.dispLocation=false;
  }

  this.service.subInvCode2(sessionStorage.getItem('deptId'), sessionStorage.getItem('divisionId')).subscribe(
    data => {
      this.subInvCode = data;
      console.log(this.subInvCode);
      if (this.subInvCode.subInventoryCode != null) {
        this.subInventory = this.subInvCode.subInventoryCode;
        this.sparesReportForm.patchValue({ subInventory: this.subInvCode.subInventoryCode })
      }
    });

  this.service.invItemList2New('GOODS', 'Spares', (sessionStorage.getItem('divisionId')), '36DH1601')
    .subscribe(
      data => {
        this.invItemList = data;
        console.log(this.invItemList);
      }
    );
}

refresh() {
  window.location.reload();
}

close() {
  this.location1.back();
}

reportName: string;

reportDetails(reportName) {
  if (reportName === 'gstPurRegister') {
    this.reportName = 'Purchase Register Details';
    if (this.reportName === 'Purchase Register Details') {
      this.isVisiblespPurRegDownLoad = true;
    }
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.isVisibleDepartmentList = true;
    }
    this.isVisibleGSTPurchaseRegister = true;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockLedger = false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.displayCustAccountNo=false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
  }
  else if (reportName === 'gstpurRegSumm') {
    this.reportName = 'Accessories Purchase Register - Summary';
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.isVisibleDepartmentList = true;
    }
    this.isVisibleGSTPurchaseRegister = true;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockLedger = false;
    this.displayCustAccountNo=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
  }
  else if (reportName === 'gstIssueDetails') {
    this.reportName = 'Accessories Issue Details Report';
    this.isVisibleGSTPurchaseRegister = true;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockLedger = false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
     this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.displayCustAccountNo=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
  }
  else if (reportName === 'gstIssueSummary') {
    this.reportName = 'Accessories Issue Summary';
    this.isVisibleGSTPurchaseRegister = true;
    // this.isVisibleSparesIssueDetailsReport=true;
    this.isVisibleonlyLocationCode = false;
    this.displayCustAccountNo=true;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisibleStockLedger = false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
  }
  else if (reportName === 'gstReceiptRegister') {
    this.reportName = 'Accessories Receipt Register';
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.isVisibleDepartmentList = true;
    }
    this.isVisibleonlyLocationCode = false;
    this.isVisibleGSTPurchaseRegister = true;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
     this.isVisiblespClosingStockAsOndate=false;
    this.isVisibleStockLedger = false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.displayCustAccountNo=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
  }

  else if (reportName === 'gstClosingReport') {
    this.reportName = 'Accessories Closing Stock Report';
    this.isVisibleonlyLocationCode = true;
    this.isVisiblegstsaiDebtors = false;
     this.isVisiblespClosingStockAsOndate=false;
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleStockLedger = false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.displayCustAccountNo=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }

  else if (reportName === 'gstsaiDebtors') {
    this.reportName = 'Accessories Debtor Report';
    if (Number(sessionStorage.getItem('deptId'))===4){
      this.isVisibleDepartmentList=true;
    }
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = true;
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleStockLedger = false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisibleSparesBackOrderQty = false;
    this.displayCustAccountNo=false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'gstSprAgingSummary') {
    this.reportName = 'Accessories Debtors Aging Report Summary';
    if (Number(sessionStorage.getItem('deptId'))===4){
      this.isVisibleDepartmentList=true;
    }
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = true;
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleStockLedger = false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.displayCustAccountNo=false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'gstStockLedger') {
    this.reportName = 'Stock Ledger';
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = false;
    this.displayCustAccountNo=false;
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleStockLedger = true;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'gststockTransfer') {
    this.reportName = 'Stock Transfer Made Detail Report';
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = false;
    this.displayCustAccountNo=false;
    this.isVisibleGSTPurchaseRegister = false;
     this.isVisiblespClosingStockAsOndate=false;
    this.isVisibleStockLedger = false;
    this.isVisiblestockTransfer = true;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;

    // this.dispLocation=false;
    if (this.dispLocation==false){
    this.service.TolocationIdList(sessionStorage.getItem('locId')).subscribe
    (data => {
      this.BillShipToList = data;
      console.log(this.BillShipToList);
    });}
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'gststockTransferSummary') {
    this.reportName = 'Stock Transfer Made Summary Report';
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = false;
    this.displayCustAccountNo=false;
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleStockLedger = false;
    this.isVisiblestockTransfer = true;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;

    // this.dispLocation=false;
    if (this.dispLocation==false){
    this.service.TolocationIdList(sessionStorage.getItem('locId')).subscribe
    (data => {
      this.BillShipToList = data;
      console.log(this.BillShipToList);
    });}
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'gststockTransferReceivedDetails') {
    this.reportName = 'Stock Transfer Received Detail Report';
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = false;
    this.displayCustAccountNo=false;
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleStockLedger = false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=true;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;

    // this.dispLocation=false;
    if (this.dispLocation==false){
    this.service.TolocationIdList(sessionStorage.getItem('locId')).subscribe
    (data => {
      this.BillShipToList = data;
      console.log(this.BillShipToList);
    });}
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'gststockTransferReceivedSummary') {
    this.reportName = 'Accessories Stock Transfer Received Summary Report';
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleStockLedger = false;
    this.displayCustAccountNo=false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=true;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;

    // this.dispLocation=false;
    if (this.dispLocation==false){
    this.service.TolocationIdList(sessionStorage.getItem('locId')).subscribe
    (data => {
      this.BillShipToList = data;
      console.log(this.BillShipToList);
    });}
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'gstsparesCustomerOffTakeStatment') {
    this.reportName = 'Accessories Customer Off Take Statement';
    this.isVisibleGSTPurchaseRegister = true;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockLedger = false;
    this.isVisiblestockTransfer = false;
    this.displayCustAccountNo=false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
     this.isVisiblespClosingStockAsOndate=false;
     this.isVisiblecustomerLedger=false;
     this.isVisibleEwayBill=false;
     this.isVisiblepanelStockTaking=false;
     this.panelspDebtAgByExicutiveSummary=false;
     this.isVisibleStockMissMatch = false;
     this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'gstSparesBackOrderQty') {
    this.reportName = 'Accessories Back Order Qty Report';
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockLedger = false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = true;
    this.displayCustAccountNo=false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'gstsparesMiscIssueReceipt') {
    this.reportName = 'Accessories Misc Issue Receipt Report';
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockLedger = false;
    this.isVisiblestockTransfer = false;
    this.displayCustAccountNo=false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = true;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'gstSaleReturnRegister') {
    this.reportName = 'Accessories Sales Return Register';
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockLedger = false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = true;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.displayCustAccountNo=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'gstIncomeStatement') {
    this.reportName = 'Income Statement';
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockLedger = false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.displayCustAccountNo=false;
    this.isVisiblesparesMiscIssueReceipt = true;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'gstSparesClosingStockAsOnDate') {
    this.reportName = 'Accessories Closing Stock As On Date';
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisiblespClosingStockAsOndate=true;
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleStockLedger = false;
    this.displayCustAccountNo=false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'gstSpresProformaDetailsReports') {
    this.reportName = 'Accessories Proforma Details Report';
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisibleStockLedger = false;
    this.isVisiblestockTransfer = false;
    this.displayCustAccountNo=false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = true;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'gstChequeBounceReport') {
    this.reportName = 'Cheque Bounce Report';
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = false;
    this.displayCustAccountNo=false;
    this.isVisibleStockLedger = false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = true;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'gstsparesInventoryAging') {
    this.reportName = 'Accessories Inventory Aging Report';
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockLedger = false;
    this.displayCustAccountNo=false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = true;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'gstSparesDebtorsExecutiveWise') {
    this.reportName = 'Accessories Debtors Executive Wise report';
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.isVisibleDepartmentList = true;
    }
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleonlyLocationCode = false;
    this.displayCustAccountNo=false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockLedger = false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = true;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'sparesSubinvTransReceived') {
    this.reportName = 'Sub Inventory Transfer Received Report';
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockLedger = false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=true;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.displayCustAccountNo=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'sparesSubinvTransMade') {
    this.reportName = 'Sub Inventory Transfer Made Report';
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockLedger = false;
    this.isVisiblestockTransfer = false;
    this.displayCustAccountNo=false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=true;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
    
  }
  else if (reportName === 'internalConsumptionReport') {
    this.reportName = 'Internal Consumption Report';
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockLedger = false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.displayCustAccountNo=false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=true;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'customerLedger') {
    this.reportName = 'Customer Ledger Report';
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockLedger = false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.displayCustAccountNo=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=true;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;

    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.isVisibleDepartmentList = true;
    }
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'creditNoteReg') {
    this.reportName = 'Credit Note Register';
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = false;
    this.displayCustAccountNo=false;
    this.isVisibleStockLedger = false;
     this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = true;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'EwayBill') {
    this.reportName = 'Eway Bill Report';
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockLedger = false;
     this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.displayCustAccountNo=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=true;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'IrnGenerationReport') {
    this.reportName = 'IRN Generation Report';
    this.isVisibleGSTPurchaseRegister = true;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockLedger = false;
     this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.displayCustAccountNo=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;

    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.isVisibleDepartmentList = true;
    }
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }

  else if (reportName === 'sparesIssSummaryTransWise') {
    this.reportName = 'Accessories Issue Summary-Transaction Wise';
    this.isVisibleGSTPurchaseRegister = true;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = false;
    this.displayCustAccountNo=false;
    this.isVisibleStockLedger = false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;

    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.isVisibleDepartmentList = true;
    }
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }

  else if (reportName === 'sparesZeroStkReport') {
    this.reportName = 'Accessories Zero Stock Report';
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleonlyLocationCode = false;
    this.displayCustAccountNo=false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockLedger = false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=true;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'sparesIssSummaryAvgCost') {
    this.reportName = 'Accessories Issue Summary-Average Cost';
    this.isVisibleGSTPurchaseRegister = true;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockLedger = false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.displayCustAccountNo=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }

  else if (reportName === 'stkTakingBlankFormat') {
    this.reportName = 'Stock Taking Report - Blank Format';
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockLedger = false;
    this.displayCustAccountNo=false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=true;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'stkTakingQtyDet') {
    this.reportName = 'Stock Taking Report - Qty Details';
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockLedger = false;
    this.displayCustAccountNo=false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=true;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'stkTakingPhyStk') {
    this.reportName = 'Stock Taking - Physical Stock Upload';
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockLedger = false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblestockTransfer = false;
    this.displayCustAccountNo=false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=true;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'sparesDbAgingExicutiveSum') {
    this.reportName = 'Accessories Debtors Aging Report - Executive summary';
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockLedger = false;
    this.displayCustAccountNo=false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=true;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName === 'spConsumptionReport') {
    this.reportName = 'Accessories Item Consumption Report';
    this.isVisibleGSTPurchaseRegister = true;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockLedger = false;
    this.displayCustAccountNo=false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName==='gstsaiDebtorsAsOf'){
    this.reportName = 'Accessories Debtor Report As Of';
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = true;
    this.displayCustAccountNo=false;
    this.isVisibleStockLedger = false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName==='receiptOtherDetails'){
    this.reportName = 'Receipt-Other Details Report';
    this.isVisibleGSTPurchaseRegister = true;
    this.isVisibleonlyLocationCode = false;
    this.displayCustAccountNo=false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockLedger = false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName==='billHandedoverToActReport'){
    this.reportName = 'Account Bill Handover Report';
    this.isVisibleGSTPurchaseRegister = true;
    this.displayCustAccountNo=false;
    this.isVisibleonlyLocationCode = false;
    this.isVisiblegstsaiDebtors = false;
    this.isVisibleStockLedger = false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName==='spDebtorOSLetter'){
    this.reportName = 'Accessories Debtor O/S Letter';
    this.isVisiblegstsaiDebtors=true;
    this.displayCustAccountNo=false;
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleonlyLocationCode = false;
    this.isVisibleStockLedger = false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName==='shortLandedClaim'){
    this.reportName = 'Short Landed Claim Report';
    this.isVisiblegstsaiDebtors=false;
    this.isVisibleGSTPurchaseRegister = true;
    this.isVisibleonlyLocationCode = false;
    this.isVisibleStockLedger = false;
    this.displayCustAccountNo=false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }
  else if (reportName==='spDeadStockNoConsuptionDaywise'){
    this.reportName = 'Spares Dead Stock-No Consumption-Daywise';
    this.isVisiblegstsaiDebtors=false;
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleonlyLocationCode = false;
    this.isVisibleStockLedger = false;
    this.displayCustAccountNo=false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = false;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=true;
  }
  else if (reportName==='StockMissMatch'){
    this.reportName = 'Spares Stock Mismatch Report';
    this.isVisiblegstsaiDebtors=false;
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleonlyLocationCode = false;
    this.isVisibleStockLedger = false;
    this.displayCustAccountNo=false;
    this.isVisiblespClosingStockAsOndate=false;
    this.isVisiblestockTransfer = false;
    this.isVisiblestockTransferRecd=false;
    this.isVisibleSparesBackOrderQty = false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisiblesparesInventoryAging = false;
    this.isVisibleSparesDebtorsExecutiveWise = false;
    this.isVisiblefromtosubinventory=false;
    this.isVisiblecustomerLedger=false;
    this.isVisibleEwayBill=false;
    this.isVisiblepanelStockTaking=false;
    this.panelspDebtAgByExicutiveSummary=false;
    this.isVisibleStockMissMatch = true;
    this.isVisiblepanelspDeadStockNoConsuptionDaywise=false;
  }

}







onOptionsLocation(event) {
  // alert("From Location : "+ event);
  this.sparesReportForm.patchValue({ locId: event })
  // this.sparesReportForm.patchValue({ fromLocId: event })

  if(event>0){
    var x=this.sparesReportForm.get('locCode').value;
    var y=this.sparesReportForm.get('tolocCode').value;
    if(x===y) {alert ("From/To Locations Should not be Same...");
     this.sparesReportForm.get('locCode').reset();
    return;
  }}


}

onOptionsToLocation(event) {
  // alert("To Location : "+ event);
  this.sparesReportForm.patchValue({ tolocId: event });
  if(event>0){
    var x=this.sparesReportForm.get('locCode').value;
    var y=this.sparesReportForm.get('tolocCode').value;
    if(x===y) {alert ("From/To Locations Should not be Same...");
     this.sparesReportForm.get('tolocCode').reset();
    return;
  }}
}

onOptionsDepartmentList(event: string) {
  // alert(event);
  var deptList = this.DepartmentList.find(d => d.code === event);
  console.log(deptList);

  this.sparesReportForm.patchValue({ deptId: deptList.cmnTypeId })
}


reportParameter(reportName) {
  this.isDisabled1 = true;
  this.closeResetButton = false;
  this.progress = 0;
  this.dataDisplay = 'Report Is Running....Do not refresh the Page';
  var purStDt = this.sparesReportForm.get('fromDate').value;
  var fromDate = this.pipe.transform(purStDt, 'dd-MMM-yyyy');
  var toDate1 = this.sparesReportForm.get('toDate').value;
  var toDate = this.pipe.transform(toDate1, 'dd-MMM-yyyy');
  var locId = this.sparesReportForm.get('locId').value;
  var fromlocId = this.sparesReportForm.get('fromLocId').value;
  var tolocId = this.sparesReportForm.get('tolocId').value;
  var deptId = this.sparesReportForm.get('deptId').value;
  var userName = this.sparesReportForm.get('userName').value;
  var segment = this.sparesReportForm.get('segment').value;
  var subInventory = this.sparesReportForm.get('subInventory').value;
  var tolocId = this.sparesReportForm.get('tolocId').value;
  var custAccNo = this.sparesReportForm.get('custAccNo').value;
  // alert(deptId);
  if (locId === null) {
    alert('Please Select location Code.!');
    return;
  }
  var fDate =this.sparesReportForm.get('fromDate').value;
  var tDate =this.sparesReportForm.get('toDate').value;

  
  if (reportName === 'Stock Ledger') {
    if (userName === null || userName === undefined || userName === '' || segment === null || segment === undefined || segment === '') {
      alert('Please Enter userName.!');
      this.isDisabled1 = false;
      this.closeResetButton = false;
      this.progress = 0;
      this.dataDisplay = 'Please Enter userName.!';
      return;
    }
  }
  else if (reportName === '') {
    if (tolocId === null || tolocId === undefined || tolocId === '') {
      alert('Please Select To Location.!');
      this.isDisabled1 = false;
      this.closeResetButton = false;
      this.progress = 0;
      this.dataDisplay = 'Please Select To Location.!';
      return;
    }
  }

  if (reportName === 'Purchase Register Details') {

    this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

    if (Number(sessionStorage.getItem('deptId')) === 4) {
      const fileName = 'Purchase Register Details-' +  fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.reportService.sppurRegidetailReport(fromDate, toDate, sessionStorage.getItem('ouId'), locId, deptId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled1 = false;
        })
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4) {
      const fileName = 'Purchase Register Details-' +  fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.reportService.sppurRegidetailReportSpares(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), sessionStorage.getItem('deptId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled1 = false;
        })
    }
  }
  else if (reportName === 'Accessories Purchase Register - Summary') {
    this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

    const fileName = 'Accessories Purchase Register - Summary-' + sessionStorage.getItem('locName').replace(' ', '') + '-' + fromDate + '-TO-' + toDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.sppurRegiSummReport(fromDate, toDate, sessionStorage.getItem('ouId'), locId, deptId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
    else if ((Number(sessionStorage.getItem('deptId'))) != 4) {
      this.reportService.sppurRegiSummReport(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), sessionStorage.getItem('deptId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
  }

  else if (reportName === 'Accessories Debtors Aging Report - Executive summary') {
    this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}
    if (userName === null || userName === undefined || userName === '') {
      userName='';
      custAccNo='';
    }
    if (custAccNo === null || custAccNo === undefined || custAccNo === ''){
      custAccNo='';
    }
    var age1= this.sparesReportForm.get('spDbAging1').value;
    var age2= this.sparesReportForm.get('spDbAging2').value;
    var age3= this.sparesReportForm.get('spDbAging3').value;
    var age4= this.sparesReportForm.get('spDbAging4').value;

    if(age1<0 || age1==null || age1==undefined) {this.rptValidation=false;}
    if(age2<0 || age2==null || age2==undefined) {this.rptValidation=false;}
    if(age3<0 || age3==null || age3==undefined) {this.rptValidation=false;}
    if(age4<0 || age4==null || age4==undefined) {this.rptValidation=false;}
    if (age1 > age2) {this.rptValidation=false;}
    else if (age1 >age3){this.rptValidation=false;}
    else if (age1 > age4){this.rptValidation=false;}
    else if (age2 > age3){this.rptValidation=false;}
    else if (age2 > age4){this.rptValidation=false;}
    else if (age3 > age4){this.rptValidation=false;}
  if(this.rptValidation ==false) {this.closeResetButton=true;this.dataDisplay = 'Please check Aging Values.';  return; }
    const fileName = 'Accessories Debtors Aging Report - Executive summary-' + sessionStorage.getItem('locName').replace(' ', '') + '-' + fromDate + '-TO-' + toDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.sparesDbAgingExicutiveSum(toDate, sessionStorage.getItem('ouId'), locId, userName,custAccNo,deptId,age1,age2,age3,age4)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
    else if ((Number(sessionStorage.getItem('deptId'))) != 4) {
      this.reportService.sparesDbAgingExicutiveSum(toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), userName,custAccNo,deptId,age1,age2,age3,age4)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
  }
  else if (reportName === 'Accessories Issue Details Report') {
    var custAcctNo = this.sparesReportForm.get('custAccNo').value;
    var ticketNo = this.sparesReportForm.get('userName1').value
    if (custAcctNo === undefined || custAcctNo === null) {
      custAcctNo = '';
    }
    this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}
    var dt1=new Date(fDate)
    var dt2= new Date(tDate)
    if(dt1>dt2) {alert ("Please Enter Proper Start Date and End Date...");return;}
    var mDays = this.diffDays(dt1,dt2);
    if (mDays >7) { 
      alert ("Date Range Cannot Exceed 7 Days...");
      this.dataDisplay = 'Date Range Cannot Exceed 7 Days...';
      this.isDisabled1 = false;
    return;
  }
    const fileName = 'Accessories Issue Details Report-' + sessionStorage.getItem('locName').replace(' ', '') + '-' + fromDate + '-TO-' + toDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.spIssueDetailsReport(fromDate, toDate, locId,custAcctNo)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = '';
        })
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.reportService.spIssueDetailsReport(fromDate, toDate, sessionStorage.getItem('locId'),custAcctNo)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = '';
        })
    }
  }
  else if (reportName === 'Accessories Issue Summary') {
    // alert(custAccNo)
    if (custAccNo === null || custAccNo === undefined || custAccNo === ''){
      custAccNo='';
    }
    this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

    const fileName = 'Accessories Issue Summary Report-' + sessionStorage.getItem('locName').replace(' ', '') + '-' + fromDate + '-TO-' + toDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.spIssueSummaryReport(fromDate, toDate, locId,custAccNo)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.reportService.spIssueSummaryReport(fromDate, toDate, sessionStorage.getItem('locId'),custAccNo)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
  }
  else if (reportName === 'Accessories Receipt Register') {
    this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

    const fileName = 'Accessories Receipt Register-' + sessionStorage.getItem('locName').replace(' ', '') + '-' + fromDate + '-TO-' + toDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.spReceiptRegisterReport(fromDate, toDate, sessionStorage.getItem('ouId'), locId, deptId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.reportService.spReceiptRegisterReport(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), sessionStorage.getItem('deptId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
  }

  else if (reportName === 'Accessories Closing Stock Report') {
    const fileName = 'AC-Closing-Stock-' + sessionStorage.getItem('locName').trim() + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.spclosstrockReport(locId,subInventory)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.reportService.spclosstrockReport(sessionStorage.getItem('locId'),subInventory)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
  }
  
  else if (reportName === 'Accessories Debtor Report') {

    this.isDisabled1=false;
    // alert('Hello');
    this.toDateValidation(tDate);if(this.rptValidation==false){return;}
    var custAccNo = this.sparesReportForm.get('custAccNo').value;

    // if (custAccNo<=0 || custAccNo==undefined || custAccNo==null ) {
    //   this.closeResetButton=true;
    //   // this.dataDisplay = 'Please check Customer No.'
    //   return; }comment by vinita

    if (custAccNo<=0 || custAccNo==undefined || custAccNo==null ) {
      custAccNo='';
        }


    var d1= this.sparesReportForm.get('toDate').value;   
    var tDate1 = this.pipe.transform(d1, 'dd-MMM-y');
    var locId= this.sparesReportForm.get('locId').value;
    
    var spDbAg1= this.sparesReportForm.get('spDbAging1').value;
    var spDbAg2= this.sparesReportForm.get('spDbAging2').value;
    var spDbAg3= this.sparesReportForm.get('spDbAging3').value;
    var spDbAg4= this.sparesReportForm.get('spDbAging4').value;

    if(spDbAg1<0 || spDbAg1==null || spDbAg1==undefined) {this.rptValidation=false;}
    if(spDbAg2<0 || spDbAg2==null || spDbAg2==undefined) {this.rptValidation=false;}
    if(spDbAg3<0 || spDbAg3==null || spDbAg3==undefined) {this.rptValidation=false;}
    if(spDbAg4<0 || spDbAg4==null || spDbAg4==undefined) {this.rptValidation=false;}

    if (spDbAg1 > spDbAg2) {this.rptValidation=false;}
    else if (spDbAg1 >spDbAg3){this.rptValidation=false;}
    else if (spDbAg1 > spDbAg4){this.rptValidation=false;}
    else if (spDbAg2 > spDbAg3){this.rptValidation=false;}
    else if (spDbAg2 > spDbAg4){this.rptValidation=false;}
    else if (spDbAg3 > spDbAg4){this.rptValidation=false;}


  if(this.rptValidation ==false) {this.closeResetButton=true;this.dataDisplay = 'Please check Aging Values.';  return; }
    this.isDisabled1=true;
    const fileName = 'SP-Debtors-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
   
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.SPDebtorReport(tDate1, sessionStorage.getItem('ouId'), locId,custAccNo,deptId,spDbAg1,spDbAg2,spDbAg3,spDbAg4)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        });
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.reportService.SPDebtorReport(tDate1, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'),custAccNo,deptId,spDbAg1,spDbAg2,spDbAg3,spDbAg4)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
  }
  else if (reportName === 'Accessories Debtor Report As Of') {

    this.isDisabled1=false;
    // alert('Hello');
    this.toDateValidation(tDate);if(this.rptValidation==false){return;}
    var custAccNo = this.sparesReportForm.get('custAccNo').value;
    if (custAccNo<=0 || custAccNo==undefined || custAccNo==null ) {
      custAccNo='';
        }


    var d1= this.sparesReportForm.get('toDate').value;   
    var tDate1 = this.pipe.transform(d1, 'dd-MMM-y');
    var locId= this.sparesReportForm.get('locId').value;
    
    var spDbAg1= this.sparesReportForm.get('spDbAging1').value;
    var spDbAg2= this.sparesReportForm.get('spDbAging2').value;
    var spDbAg3= this.sparesReportForm.get('spDbAging3').value;
    var spDbAg4= this.sparesReportForm.get('spDbAging4').value;

    if(spDbAg1<0 || spDbAg1==null || spDbAg1==undefined) {this.rptValidation=false;}
    if(spDbAg2<0 || spDbAg2==null || spDbAg2==undefined) {this.rptValidation=false;}
    if(spDbAg3<0 || spDbAg3==null || spDbAg3==undefined) {this.rptValidation=false;}
    if(spDbAg4<0 || spDbAg4==null || spDbAg4==undefined) {this.rptValidation=false;}

    if (spDbAg1 > spDbAg2) {this.rptValidation=false;}
    else if (spDbAg1 >spDbAg3){this.rptValidation=false;}
    else if (spDbAg1 > spDbAg4){this.rptValidation=false;}
    else if (spDbAg2 > spDbAg3){this.rptValidation=false;}
    else if (spDbAg2 > spDbAg4){this.rptValidation=false;}
    else if (spDbAg3 > spDbAg4){this.rptValidation=false;}


  if(this.rptValidation ==false) {this.closeResetButton=true;this.dataDisplay = 'Please check Aging Values.';  return; }
    this.isDisabled1=true;
    const fileName = 'SP-Debtors-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
   
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.gstsaiDebtorsAsOf1(tDate1, sessionStorage.getItem('ouId'), locId,custAccNo,deptId,spDbAg1,spDbAg2,spDbAg3,spDbAg4)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        });
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.reportService.gstsaiDebtorsAsOf1(tDate1, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'),custAccNo,deptId,spDbAg1,spDbAg2,spDbAg3,spDbAg4)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
  }
  else if (reportName === 'Accessories Debtors Aging Report Summary') {

    this.isDisabled1=false;
    this.toDateValidation(tDate);if(this.rptValidation==false){return;}
    var custAccNo = this.sparesReportForm.get('custAccNo').value;
    if (custAccNo<=0 || custAccNo==undefined || custAccNo==null ) {custAccNo=''; }


    var d1= this.sparesReportForm.get('toDate').value;   
    var tDate1 = this.pipe.transform(d1, 'dd-MMM-y');
    var locId= this.sparesReportForm.get('locId').value;
    
    var spDbAg1= this.sparesReportForm.get('spDbAging1').value;
    var spDbAg2= this.sparesReportForm.get('spDbAging2').value;
    var spDbAg3= this.sparesReportForm.get('spDbAging3').value;
    var spDbAg4= this.sparesReportForm.get('spDbAging4').value;

    if(spDbAg1<0 || spDbAg1==null || spDbAg1==undefined) {this.rptValidation=false;}
    if(spDbAg2<0 || spDbAg2==null || spDbAg2==undefined) {this.rptValidation=false;}
    if(spDbAg3<0 || spDbAg3==null || spDbAg3==undefined) {this.rptValidation=false;}
    if(spDbAg4<0 || spDbAg4==null || spDbAg4==undefined) {this.rptValidation=false;}

    if (spDbAg1 > spDbAg2) {this.rptValidation=false;}
    else if (spDbAg1 >spDbAg3){this.rptValidation=false;}
    else if (spDbAg1 > spDbAg4){this.rptValidation=false;}
    else if (spDbAg2 > spDbAg3){this.rptValidation=false;}
    else if (spDbAg2 > spDbAg4){this.rptValidation=false;}
    else if (spDbAg3 > spDbAg4){this.rptValidation=false;}


  if(this.rptValidation ==false) {this.closeResetButton=true;this.dataDisplay = 'Please check Aging Values.';  return; }
    this.isDisabled1=true;
    const fileName = 'SP-Debtors-Aging-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
   
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.SPDebtorAgingSummary(tDate1, sessionStorage.getItem('ouId'), locId,custAccNo,deptId,spDbAg1,spDbAg2,spDbAg3,spDbAg4)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        });
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.reportService.SPDebtorAgingSummary(tDate1, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'),custAccNo,deptId,spDbAg1,spDbAg2,spDbAg3,spDbAg4)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
  }


  else if (reportName === 'Stock Ledger') {
   this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.stockLedgerReport(fromDate, toDate, subInventory, segment, locId, userName)
        .subscribe(data => {
          var blob = new Blob([data], { type: 'application/pdf' });
          var url = URL.createObjectURL(blob);
          var printWindow = window.open(url, '', 'width=800,height=500');
          printWindow.open;
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.reportService.stockLedgerReport(fromDate, toDate, subInventory, segment, sessionStorage.getItem('locId'), userName)
        .subscribe(data => {
          var blob = new Blob([data], { type: 'application/pdf' });
          var url = URL.createObjectURL(blob);
          var printWindow = window.open(url, '', 'width=800,height=500');
          printWindow.open;
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
  }

  else if (reportName === 'Stock Transfer Made Detail Report') {
    this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

    const fileName = 'Stock Transfer Made Detail Report-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.stockMadeDetailsReport(fromDate, toDate, locId, tolocId, subInventory,sessionStorage.getItem('deptId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.reportService.stockMadeDetailsReport(fromDate, toDate, sessionStorage.getItem('locId'), tolocId, subInventory,sessionStorage.getItem('deptId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
  }

  else if (reportName === 'Stock Transfer Made Summary Report') {
    this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

    const fileName = 'Stock Transfer Made Summary Report-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.spstktrfMdSummaryReport(fromDate, toDate, locId, tolocId, subInventory)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.reportService.spstktrfMdSummaryReport(fromDate, toDate, sessionStorage.getItem('locId'), tolocId, subInventory)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
  }

  else if (reportName === 'Stock Transfer Received Detail Report') {
    this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

    const fileName = 'Stock Transfer Received Detail Report-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.SprStkTrfRecdDtlsReport(fromDate, toDate, locId, tolocId, subInventory,sessionStorage.getItem('deptId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.reportService.SprStkTrfRecdDtlsReport(fromDate, toDate, sessionStorage.getItem('locId'), tolocId, subInventory,sessionStorage.getItem('deptId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
  }
  else if (reportName === 'Accessories Stock Transfer Received Summary Report') {
    this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}
    // if ()
    const fileName = 'Accessories Stock Transfer Received Summary Report-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.SprStkTrfRecdSummaryReport(fromDate, toDate, locId, tolocId, subInventory)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.reportService.SprStkTrfRecdSummaryReport(fromDate, toDate, sessionStorage.getItem('locId'), tolocId, subInventory)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
  }
  
  else if (reportName === 'Accessories Customer Off Take Statement') {
    this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

    const fileName = 'Spares-Customer-Off-Take-Statement-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.SprcusttakestatReport(fromDate, toDate, locId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.reportService.SprcusttakestatReport(fromDate, toDate, sessionStorage.getItem('locId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
  }
  else if (reportName === 'Accessories Back Order Qty Report') {
    this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

    var custAccNo = this.sparesReportForm.get('custAccNo').value;
    var orderNumber = this.sparesReportForm.get('orderNumber').value;
    if (custAccNo === undefined || custAccNo === null) {
      custAccNo = '';
    }
    if (orderNumber === undefined || orderNumber === null) {
      orderNumber = ''
    }
    const fileName = 'Accessories Back Order Qty Report-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.spbackOrderQtyReport(fromDate, toDate, locId, custAccNo, orderNumber)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.reportService.spbackOrderQtyReport(fromDate, toDate, sessionStorage.getItem('locId'), custAccNo, orderNumber)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
  }
  
  else if (reportName === 'Accessories Misc Issue Receipt Report') {
    this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

    const fileName = 'Accessories Misc Issue Receipt Report-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.spSparesMiscIssueReceiptReport(fromDate, toDate, locId,sessionStorage.getItem('ouId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
    if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.reportService.spSparesMiscIssueReceiptReport(fromDate, toDate, sessionStorage.getItem('locId'),sessionStorage.getItem('ouId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
  }

  else if (reportName === 'Accessories Sales Return Register') {
    this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

    const fileName = 'Accessories Sales Return Register-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.spslReturnRegisterReport(fromDate, toDate, sessionStorage.getItem('ouId'), locId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.reportService.spslReturnRegisterReport(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
  }
  else if (reportName === 'Income Statement') {
    this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

    const fileName = 'Accessories Income Statement-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.spIncomeStatement(fromDate, toDate, locId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.reportService.spIncomeStatement(fromDate, toDate, sessionStorage.getItem('locId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
  }
  else if (reportName === 'Accessories Closing Stock As On Date') {
    this.toDateValidation(tDate);if(this.rptValidation==false){return;}

    const fileName = 'Accessories Closing Stock As On Date-' +  toDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.sprClsAsonDtReport(toDate, locId,subInventory)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.reportService.sprClsAsonDtReport(toDate, sessionStorage.getItem('locId'),subInventory)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled1 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
     }
  }
  else if (reportName === 'Accessories Proforma Details Report') {
    this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

    const fileName = 'Accessories Proforma Details Report-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.spProforDtReport(fromDate, toDate, locId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.reportService.spProforDtReport(fromDate, toDate, sessionStorage.getItem('locId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
  }
  else if (reportName === 'Cheque Bounce Report') {
    this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

    const fileName = 'Cheque Bounce Report-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.chequebounceReport(fromDate, toDate, sessionStorage.getItem('ouId'), locId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.reportService.chequebounceReport(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
  }
  else if (reportName === 'Accessories Inventory Aging Report') {
    this.isDisabled1=false;
    this.rptValidation=true;
    var spInvAging1 = this.sparesReportForm.get('spInvAging1').value;
    var spInvAging2 = this.sparesReportForm.get('spInvAging2').value;
    var spInvAging3 = this.sparesReportForm.get('spInvAging3').value;
    

    if(spInvAging1<0 || spInvAging1==null || spInvAging1==undefined) {this.rptValidation=false;}
    if(spInvAging2<0 || spInvAging2==null || spInvAging2==undefined) {this.rptValidation=false;}
    if(spInvAging3<0 || spInvAging3==null || spInvAging3==undefined) {this.rptValidation=false;}

    
    if (spInvAging1 > spInvAging2) {this.rptValidation=false;}
    else if (spInvAging1 >spInvAging3){this.rptValidation=false;}
    else if (spInvAging2 > spInvAging3){this.rptValidation=false;}

    if(this.rptValidation ==false) {this.closeResetButton=true;this.dataDisplay = 'Please check Aging Values.';  return; }
   
    this.isDisabled1=true;

    const fileName = 'Accessories Inventory Aging Report-' +  '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.sspInvAgingReport(spInvAging1, spInvAging2, spInvAging3, sessionStorage.getItem('ouId'), locId ,subInventory,userName)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.reportService.sspInvAgingReport(spInvAging1, spInvAging2, spInvAging3, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'),subInventory,userName)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
  }
  else if (reportName === 'Accessories Debtors Executive Wise report') {
    this.toDateValidation(tDate);if(this.rptValidation==false){return;}

    var custAcctNo = this.sparesReportForm.get('custAccNo').value;
    var ticketNo = this.sparesReportForm.get('userName1').value
    if (custAcctNo === undefined || custAcctNo === null) {
      custAcctNo = '';
    }
    if (ticketNo === undefined || ticketNo === null) {
      ticketNo = '';
    }
    const fileName = 'Accessories Debtors Executive Wise report-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.spDebtorExicutiveWise(toDate, sessionStorage.getItem('ouId'), locId, ticketNo, custAcctNo, deptId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.reportService.spDebtorExicutiveWise(toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), ticketNo, custAcctNo, sessionStorage.getItem('deptId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
  }

  else if (reportName==='Sub Inventory Transfer Received Report'){
    this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

    const fileName = 'Sub Inventory Transfer Received Report-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if ((Number(sessionStorage.getItem('deptId'))===4)){
      this.reportService.spInvTransRecFuc(fromDate,toDate, locId, subInventory)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled1 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
    }
    else if ((Number(sessionStorage.getItem('deptId')))!=4){
      this.reportService.spInvTransRecFuc(fromDate,toDate, sessionStorage.getItem('locId'), subInventory)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled1 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
    }
  }

  else if (reportName==='Sub Inventory Transfer Made Report'){
    this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

    const fileName = 'Sub Inventory Transfer Made Report-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if ((Number(sessionStorage.getItem('deptId'))===4)){
      this.reportService.spInvTransMadeFuc(fromDate,toDate, locId, subInventory)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled1 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
    }
    else if ((Number(sessionStorage.getItem('deptId')))!=4){
      this.reportService.spInvTransMadeFuc(fromDate,toDate, sessionStorage.getItem('locId'), subInventory)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled1 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
    } 
  }
  else if (reportName==='Internal Consumption Report'){
    this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

    const fileName = 'Internal Consumption Report-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if ((Number(sessionStorage.getItem('deptId'))===4)){
      this.reportService.internalConsuptionReport(fromDate,toDate, locId, subInventory,sessionStorage.getItem('ouId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled1 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
    }
    else if ((Number(sessionStorage.getItem('deptId')))!=4){
      this.reportService.internalConsuptionReport(fromDate,toDate, sessionStorage.getItem('locId'), subInventory,sessionStorage.getItem('ouId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled1 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
    } 
  }
  else if (reportName === 'Customer Ledger Report') {
    this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

    var custAccNo = this.sparesReportForm.get('custAccNo').value;
    if (custAccNo === undefined || custAccNo === '' || custAccNo === null) {
      alert('First Enter customer Account No.!');
      this.isDisabled1 = false;
      return;
    }
    const fileName = 'Customer Ledger Report-' + sessionStorage.getItem('locName').replace(' ', '') + '-' + fromDate + '-TO-' + toDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {     
      this.reportService.customerLedger(fromDate,toDate,custAccNo,sessionStorage.getItem('ouId'),deptId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        });
    }
    else if ((Number(sessionStorage.getItem('deptId'))!=4)){
      this.reportService.customerLedger(fromDate,toDate,custAccNo,sessionStorage.getItem('ouId'),sessionStorage.getItem('deptId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
      });
    }
  }
  else if (reportName === 'Credit Note Register') {
    this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

    const fileName = 'Credit Note Register-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.creditNoteReg(fromDate, toDate,sessionStorage.getItem('ouId'), locId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.reportService.creditNoteReg(fromDate, toDate, sessionStorage.getItem('ouId'),sessionStorage.getItem('locId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
  }
  else if (reportName === 'Eway Bill Report') {
    var trxNumber= this.sparesReportForm.get('trxNumber').value;
    if ( trxNumber == undefined || trxNumber ==null || trxNumber==''){
      alert('Please Enter Invoice Number.!')
    }
    const fileName = 'Eway Bill Report-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.EwayBill(trxNumber)
    .subscribe(data => {
      saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
      this.isDisabled1 = false;
      this.closeResetButton = true;
      this.dataDisplay = ''
    })
  }
  else if (reportName ==='IRN Generation Report'){
    this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

    const fileName = 'IRN Generation Report-' +  '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      var deptId=this.sparesReportForm.get('deptId').value;
      this.reportService.irnGenerationReport( fromDate,toDate,sessionStorage.getItem('ouId'),locId,deptId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4){
      this.reportService.irnGenerationReport(fromDate,toDate,sessionStorage.getItem('ouId'),sessionStorage.getItem('locId'),sessionStorage.getItem('deptId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled1 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
    }
  }

  else if (reportName ==='Accessories Issue Summary-Transaction Wise'){
    this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

    const fileName = 'Accessories Issue Summary-Transaction Wise-' +  '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      var deptId=this.sparesReportForm.get('deptId').value;
      this.reportService.sprIssSummaryReport( fromDate,toDate,sessionStorage.getItem('ouId'),locId,deptId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4){
      this.reportService.sprIssSummaryReport(fromDate,toDate,sessionStorage.getItem('ouId'),sessionStorage.getItem('locId'),sessionStorage.getItem('deptId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled1 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
    }
  }

  else if (reportName==='Accessories Zero Stock Report'){
    this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

    const fileName = 'Accessories Zero Stock Report-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if ((Number(sessionStorage.getItem('deptId'))===4)){
      this.reportService.sprZeroStockReport(fromDate,toDate, locId, subInventory)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled1 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
    }
    else if ((Number(sessionStorage.getItem('deptId')))!=4){
      this.reportService.sprZeroStockReport(fromDate,toDate, sessionStorage.getItem('locId'), subInventory)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled1 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
    }
  }

  else if (reportName ==='Accessories Issue Summary-Average Cost'){
    this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

    const fileName = 'Accessories Issue Summary-Average Cost-' +  '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      var deptId=this.sparesReportForm.get('deptId').value;
      this.reportService.sprIssSummaryAvgCostReport( fromDate,toDate,locId,sessionStorage.getItem('deptId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    } else if ((Number(sessionStorage.getItem('deptId'))) !=4){
      this.reportService.sprIssSummaryAvgCostReport( fromDate,toDate,sessionStorage.getItem('locId'),sessionStorage.getItem('deptId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled1 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
    }
   
  }

  else if (reportName ==='Stock Taking Report - Blank Format'){
    // this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

    const fileName = 'Stock Taking Report-Blank Format-' +  '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    var locId=this.sparesReportForm.get('locId').value;
    var compileName=this.sparesReportForm.get('compileCode').value;
    if (Number(sessionStorage.getItem('deptId')) === 4) {
     
      this.reportService.stockTakingBlankFormatReport( locId,compileName)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    } else if ((Number(sessionStorage.getItem('deptId'))) !=4){
      this.reportService.stockTakingBlankFormatReport( sessionStorage.getItem('locId'),compileName)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled1 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
    }
   
  }
  else if (reportName ==='Stock Taking Report - Qty Details'){
    // this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

    const fileName = 'Stock Taking Report - Qty Details-' +  '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    var locId=this.sparesReportForm.get('locId').value;
    var compileName=this.sparesReportForm.get('compileCode').value;
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.stockTakingQtyReport( locId,compileName)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    } else if ((Number(sessionStorage.getItem('deptId'))) !=4){
      this.reportService.stockTakingQtyReport( sessionStorage.getItem('locId'),compileName)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled1 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
    }
   
  }

  else if (reportName ==='Stock Taking - Physical Stock Upload'){
    // this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

    const fileName = 'SStock Taking - Physical Stock Upload-' +  '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    var locId=this.sparesReportForm.get('locId').value;
    var compileName=this.sparesReportForm.get('compileCode').value;
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.stockTakingPhyStockUpldReport( locId,compileName)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    } else if ((Number(sessionStorage.getItem('deptId'))) !=4){
      this.reportService.stockTakingPhyStockUpldReport( sessionStorage.getItem('locId'),compileName)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled1 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
    }
   
  }

  else if (reportName ==='Accessories Item Consumption Report'){
    const fileName = 'Accessories Item Consumption Report-' +  '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    var locId=this.sparesReportForm.get('locId').value;
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.spConsumptionReport( fromDate,toDate, locId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    } else if ((Number(sessionStorage.getItem('deptId'))) !=4){
      this.reportService.spConsumptionReport(fromDate,toDate, sessionStorage.getItem('locId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled1 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }
}

else if (reportName==='Receipt-Other Details Report'){
  const fileName = 'Receipt-Other Details Report-' +  '-TO-' + '.xls';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  if (Number(sessionStorage.getItem('deptId')) === 4) {
    this.reportService.receiptOtherDetails(fromDate,toDate,sessionStorage.getItem('ouId'),locId)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled1 = false;
      })
  }
  else if (Number(sessionStorage.getItem('deptId')) != 4) {
    this.reportService.receiptOtherDetails(fromDate,toDate,sessionStorage.getItem('ouId'),sessionStorage.getItem('locId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled1 = false;
      })
  }
}
else if (reportName==='Account Bill Handover Report'){
  const fileName = 'Receipt-Other Details Report-' +  '-TO-' + '.xls';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  if (Number(sessionStorage.getItem('deptId')) === 4) {
  this.reportService.actBillHandoverReport(fromDate,toDate,sessionStorage.getItem('ouId'),locId,deptId)
  .subscribe(data => {
    saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
    this.closeResetButton = true;
    this.dataDisplay = ''
    this.isDisabled1=false;
  })
}
else if (Number(sessionStorage.getItem('deptId')) != 4) {
  this.reportService.actBillHandoverReport(fromDate,toDate,sessionStorage.getItem('ouId'),sessionStorage.getItem('locId'),sessionStorage.getItem('deptId'))
  .subscribe(data => {
    saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
    this.closeResetButton = true;
    this.dataDisplay = ''
    this.isDisabled1=false;
  })
}
}
else if (reportName === 'Accessories Debtor O/S Letter') {

  this.isDisabled1=false;
  this.toDateValidation(tDate);if(this.rptValidation==false){return;}
  var custAccNo = this.sparesReportForm.get('custAccNo').value;

  if (custAccNo<=0 || custAccNo==undefined || custAccNo==null ) {
    custAccNo='';
      }


  var d1= this.sparesReportForm.get('toDate').value;   
  var tDate1 = this.pipe.transform(d1, 'dd-MMM-y');
  var locId= this.sparesReportForm.get('locId').value;
  
  var spDbAg1= this.sparesReportForm.get('spDbAging1').value;
  var spDbAg2= this.sparesReportForm.get('spDbAging2').value;
  var spDbAg3= this.sparesReportForm.get('spDbAging3').value;
  var spDbAg4= this.sparesReportForm.get('spDbAging4').value;

  if(spDbAg1<0 || spDbAg1==null || spDbAg1==undefined) {this.rptValidation=false;}
  if(spDbAg2<0 || spDbAg2==null || spDbAg2==undefined) {this.rptValidation=false;}
  if(spDbAg3<0 || spDbAg3==null || spDbAg3==undefined) {this.rptValidation=false;}
  if(spDbAg4<0 || spDbAg4==null || spDbAg4==undefined) {this.rptValidation=false;}

  if (spDbAg1 > spDbAg2) {this.rptValidation=false;}
  else if (spDbAg1 >spDbAg3){this.rptValidation=false;}
  else if (spDbAg1 > spDbAg4){this.rptValidation=false;}
  else if (spDbAg2 > spDbAg3){this.rptValidation=false;}
  else if (spDbAg2 > spDbAg4){this.rptValidation=false;}
  else if (spDbAg3 > spDbAg4){this.rptValidation=false;}


if(this.rptValidation ==false) {this.closeResetButton=true;this.dataDisplay = 'Please check Aging Values.';  return; }
  this.isDisabled1=true;
  const fileName = 'Accessories Debtor O/S Letter' +  fromDate + '.pdf';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
 
  if (Number(sessionStorage.getItem('deptId')) === 4) {
    this.reportService.spDebtorOSLetterFn(tDate1, sessionStorage.getItem('ouId'), locId,custAccNo,deptId,spDbAg1,spDbAg2,spDbAg3,spDbAg4)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled1 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      });
  }
  else if (Number(sessionStorage.getItem('deptId')) != 4) {
    this.reportService.spDebtorOSLetterFn(tDate1, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'),custAccNo,deptId,spDbAg1,spDbAg2,spDbAg3,spDbAg4)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled1 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }
}
else if (reportName ==='Short Landed Claim Report')
{
 const fileName = 'Short Landed Claim Report' +  '.xls';
 const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
 if (Number(sessionStorage.getItem('deptId')) === 4) {
 this.reportService.shortLandedClaimReport(fromDate,toDate,sessionStorage.getItem('ouId'),locId,deptId)
   .subscribe(data => {
     saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
     this.closeResetButton = true;
     this.dataDisplay = ''
     this.isDisabled1=false;
   })  
  }  
  else if (Number(sessionStorage.getItem('deptId')) != 4) {
    this.reportService.shortLandedClaimReport(fromDate,toDate,sessionStorage.getItem('ouId'),sessionStorage.getItem('locId'),sessionStorage.getItem('deptId'))
    .subscribe(data => {
      saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
      this.closeResetButton = true;
      this.dataDisplay = ''
      this.isDisabled1=false;
    })  
  } 
}
else if (reportName==='Spares Stock Mismatch Report'){
  const fileName = 'Spares Stock Mismatch Report-' +  '-TO-' + '.pdf';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  if (Number(sessionStorage.getItem('deptId')) === 4) {
  this.reportService.StockMissMatchFN(fromDate,toDate,subInventory,locId,userName)
  .subscribe(data => {
    saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
    this.closeResetButton = true;
    this.dataDisplay = ''
    this.isDisabled1=false;
  })
}
else if (Number(sessionStorage.getItem('deptId')) != 4) {
  this.reportService.StockMissMatchFN(fromDate,toDate,subInventory,sessionStorage.getItem('locId'),sessionStorage.getItem('ticketNo'))
  .subscribe(data => {
    saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
    this.closeResetButton = true;
    this.dataDisplay = ''
    this.isDisabled1=false;
  })
}
}
else if (reportName=='Spares Dead Stock-No Consumption-Daywise'){
  const fileName = 'Spares Dead Stock-No Consumption-Daywise' +  '.xls';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  var subInventory = this.sparesReportForm.get('subInventory').value;
  var noOfDays = this.sparesReportForm.get('noOfDays').value;
  if (Number(sessionStorage.getItem('deptId')) === 4) {
    this.reportService.spDeadStockNoConsuptionDaywiseFn(sessionStorage.getItem('ouId'),locId,noOfDays,subInventory)
    .subscribe(data => {
      saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
      this.closeResetButton = true;
      this.dataDisplay = ''
      this.isDisabled1=false;
    })  
  }
  if (Number(sessionStorage.getItem('deptId')) != 4) {
    this.reportService.spDeadStockNoConsuptionDaywiseFn(sessionStorage.getItem('ouId'),sessionStorage.getItem('locId'),noOfDays,subInventory)
    .subscribe(data => {
      saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
      this.closeResetButton = true;
      this.dataDisplay = ''
      this.isDisabled1=false;
    })  
  }
}
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


filterRecord(event) {
  var itemCode = event.target.value;
  if (itemCode.length === 4) {
    // if (event.keyCode == 13) {
    this.service.invItemList2New('GOODS', 'Spares', (sessionStorage.getItem('divisionId')), itemCode.toUpperCase())
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

department(department) {
  if (department === 'Spares') {
    let department = this.DepartmentList.filter((customer) => ((customer.codeDesc.includes('Spares') == true)));
    console.log(department);
    this.DepartmentList = department;
  }
}


fromToDateValidation(fDate,tDate){
  this.rptValidation=true;
 
  if(fDate==null || fDate == undefined || fDate.trim() == ''){this.rptValidation=false;}
  if(tDate==null || tDate == undefined || tDate.trim() == ''){this.rptValidation=false;}

  if (fDate>tDate ) { this.rptValidation=false;}
  if(this.rptValidation==false) {alert ("Please Check From date / To Date..");
  this.closeResetButton=true;
  this.dataDisplay='';
  this.isDisabled1=false; }
}

toDateValidation(tDate){
  this.rptValidation=true;
 
  if(tDate==null || tDate == undefined || tDate.trim() == ''){this.rptValidation=false;}

  if(this.rptValidation==false) {alert ("Please Check Date..");
  this.closeResetButton=true;
  this.dataDisplay='';
  this.isDisabled1=false; }
}


diffDays(dt1,dt2) {
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (800 * 60 * 60 * 24));
}
}

