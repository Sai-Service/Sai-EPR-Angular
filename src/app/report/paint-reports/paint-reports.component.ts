import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportServiceService } from 'src/app/report/report-service.service'
import { DatePipe, Location, CommonModule } from '@angular/common';
import { MasterService } from 'src/app/master/master.service';
import { saveAs } from 'file-saver';


const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

@Component({
  selector: 'app-paint-reports',
  templateUrl: './paint-reports.component.html',
  styleUrls: ['./paint-reports.component.css']
})

export class PaintReportsComponent implements OnInit {
  paintReportForm: FormGroup;
  pipe = new DatePipe('en-US');
  now = new Date();
  public minDate = new Date();
  fromDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  toDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  OUCode: string;
  locCode: string;
  locCode1: number;

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
  issCatg:string='PN002';

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
  isVisiblelocationInput: boolean = true;
  isVisiblelocationLOV: boolean = false;
  isVisiblespPurRegDownLoad: boolean = false;
  isVisibleonlyLocationCode: boolean = false;
  isVisibleonlyOuCode: boolean = false;
  isVisiblegstsaiDebtors: boolean = false;
  isVisibleStockLedger: boolean = false;
  isVisiblestockTransfer: boolean = false;
  isVisiblestockTransferRecd: boolean = false;
  isVisibleSparesBackOrderQty: boolean = false;
  isVisiblesparesMiscIssueReceipt: boolean = false;
  isVisiblesparesPaintPanelReport: boolean = false;
  isVisiblesparesInventoryAging: boolean = false;
  isVisibleSparesDebtorsExecutiveWise: boolean = false;
  isVisibleDepartmentList: boolean = false;
  isVisiblefromtosubinventory:boolean=false;
  isVisiblespClosingStockAsOndate:boolean=false;
  isVisiblecustomerLedger:boolean=false;
  isVisibleEwayBill:boolean=false;
  isVisiblepanelStockTaking=false;
  isDisabled1 = false;
  userName1:string;
  dispLocation:boolean=true;
  rptValidation=true;
  isVisiblePanelOUFromDateToDateSubInv:boolean=false;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private location1: Location, private router1: ActivatedRoute, private reportService: ReportServiceService) {
    this.paintReportForm = this.fb.group({
      fromDate: [''],
      toDate: [],
      OUCode: [''],
      locCode: [''],
      locCode1: [''],

      locId: [''],
      deptId: [''],
      userName: [''],
      subInventory: [''],
      issCatg: [''],

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
    })
  }


  paintReport(paintReportForm) {
  }

  ngOnInit(): void {
    this.locId = Number(sessionStorage.getItem('locId'));
    this.paintReportForm.patchValue({ locId: Number(sessionStorage.getItem('locId')) })
    this.paintReportForm.patchValue({ OUCode: sessionStorage.getItem('ouId') + '-' + sessionStorage.getItem('ouName') })
    this.paintReportForm.patchValue({ locCode: sessionStorage.getItem('locId') + '-' + sessionStorage.getItem('locName') })
    this.paintReportForm.patchValue({ department: 'DP' });
    this.paintReportForm.patchValue({ deptId: 3 })
    // this.paintReportForm.patchValue({ locId: Number(sessionStorage.getItem('locId')) })

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

    // ticketNo  // "GM01733"

    // if (sessionStorage.getItem('ticketNo') === 'GM01733') {
    //   this.isVisiblelocationLOV = true;
    //   this.isVisiblelocationInput = false;
    //   this.dispLocation=true;
    // }
    // else {
    //   this.isVisiblelocationLOV = false;
    //   this.isVisiblelocationInput = true;
    //   this.dispLocation=false;
    // }
    

    this.service.subInvCode2(sessionStorage.getItem('deptId'), sessionStorage.getItem('divisionId')).subscribe(
      data => {
        this.subInvCode = data;
        console.log(this.subInvCode);
        if (this.subInvCode.subInventoryCode != null) {
          this.subInventory = this.subInvCode.subInventoryCode;
          this.paintReportForm.patchValue({ subInventory: this.subInvCode.subInventoryCode })
        }
      });


  this.paintReportForm.patchValue({ userName: sessionStorage.getItem('ticketNo') })

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
      this.reportName = 'Paint Purchase Register Details';
      if (this.reportName === 'Paint Purchase Register Details') {
        this.isVisiblespPurRegDownLoad = true;
      }
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.isVisibleDepartmentList = true;
      }
      this.isVisibleGSTPurchaseRegister = true;
      this.isVisibleonlyLocationCode = false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisibleStockLedger = false;
      this.isVisiblestockTransfer = false;
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
      this.isVisiblesparesPaintPanelReport=false;
      this.isVisibleonlyOuCode = false;
      this.isVisiblePanelOUFromDateToDateSubInv=false;

    }
    else if (reportName === 'gstpurRegSumm') {
      this.reportName = 'Paint Purchase Register - Summary';
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.isVisibleDepartmentList = true;
      }
      this.isVisibleGSTPurchaseRegister = true;
      this.isVisibleonlyLocationCode = false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisibleStockLedger = false;
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
      this.isVisiblesparesPaintPanelReport=false;
      this.isVisibleonlyOuCode = false;
      this.isVisiblePanelOUFromDateToDateSubInv=false;

    }
    else if (reportName === 'gstStockLedger') {
      this.reportName = 'Paint Stock Ledger';
      this.isVisibleonlyLocationCode = false;
      this.isVisiblegstsaiDebtors = false;
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
      this.isVisiblesparesPaintPanelReport=false;
      this.isVisibleonlyOuCode = false;
      this.isVisiblePanelOUFromDateToDateSubInv=false;

    }
    else if (reportName === 'gstsparesInventoryAging') {
      this.reportName = 'Paint Inventory Aging Report';
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisibleonlyLocationCode = false;
      this.isVisiblespClosingStockAsOndate=false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisibleStockLedger = false;
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
      this.isVisiblesparesPaintPanelReport=false;
      this.isVisibleonlyOuCode = false;
      this.isVisiblePanelOUFromDateToDateSubInv=false;

    }
   
    else if (reportName === 'gstClosingReport') {
      this.reportName = 'Paint Closing Stock Report';
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
      this.isVisibleEwayBill=false;
      this.isVisiblepanelStockTaking=false;
      this.isVisiblesparesPaintPanelReport=false;
      this.isVisibleonlyOuCode = false;
      this.isVisiblePanelOUFromDateToDateSubInv=false;
    }

    else if (reportName === 'gstClosingStocksummary') {
      this.reportName = 'Paint Closing Stock Summary';
      this.isVisibleonlyOuCode = true;
      this.isVisibleonlyLocationCode = false;
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
      this.isVisibleEwayBill=false;
      this.isVisiblepanelStockTaking=false;
      this.isVisiblesparesPaintPanelReport=false;
      this.isVisiblePanelOUFromDateToDateSubInv=false;
    }


    else if (reportName === 'internalConsumptionReport') {
      this.reportName = 'Paint Consumption Report';
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
      this.isVisiblepanelStockTaking=false;
      this.isVisiblesparesPaintPanelReport=false;
      this.isVisibleonlyOuCode = false;
      this.isVisiblePanelOUFromDateToDateSubInv=false;

    }
    else if (reportName === 'gstsparesMiscIssueReceipt') {
      this.reportName = 'Paint Stock Adjustment Report';
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
      this.isVisiblepanelStockTaking=false;
      this.isVisiblesparesPaintPanelReport=false;
      this.isVisibleonlyOuCode = false;
      this.isVisiblePanelOUFromDateToDateSubInv=false;
    }

    else if (reportName === 'gstsparesPaintPanel') {
      this.reportName = 'Paint Panel Summary Report';
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
      this.isVisiblefromtosubinventory=false;
      this.isVisiblecustomerLedger=false;
      this.isVisibleEwayBill=false;
      this.isVisiblepanelStockTaking=false;
      this.isVisiblesparesPaintPanelReport=true;
      this.isVisibleonlyOuCode = false;
      this.isVisiblePanelOUFromDateToDateSubInv=false;
    }
    else if (reportName === 'gstsparesPaintPanelDtlRpt') {
      this.reportName = 'Paint Panel Detail Report';
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
      this.isVisiblefromtosubinventory=false;
      this.isVisiblecustomerLedger=false;
      this.isVisibleEwayBill=false;
      this.isVisiblepanelStockTaking=false;
      this.isVisiblesparesPaintPanelReport=true;
      this.isVisibleonlyOuCode = false;
      this.isVisiblePanelOUFromDateToDateSubInv=false;
    }

    else if (reportName === 'gststockTransfer') {
      this.reportName = 'Paint Stock Transfer Made Detail Report';
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisibleonlyLocationCode = false;
      this.isVisiblespClosingStockAsOndate=false;
      this.isVisiblegstsaiDebtors = false;
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
      this.isVisiblesparesPaintPanelReport=false;
      this.isVisibleonlyOuCode = false;
      this.isVisiblePanelOUFromDateToDateSubInv=false;
    }

    else if (reportName === 'gststockTransferSummary') {
      this.reportName = 'Paint Stock Transfer Made Summary Report';
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisibleonlyLocationCode = false;
      this.isVisiblespClosingStockAsOndate=false;
      this.isVisiblegstsaiDebtors = false;
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
      this.isVisiblesparesPaintPanelReport=false;
      this.isVisibleonlyOuCode = false;
      this.isVisiblePanelOUFromDateToDateSubInv=false;
    }

    else if (reportName === 'gststockTransferReceivedDetails') {
      this.reportName = 'Paint Stock Transfer Received Detail Report';
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisibleonlyLocationCode = false;
      this.isVisiblespClosingStockAsOndate=false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisibleStockLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblestockTransferRecd=true;
      this.isVisibleSparesBackOrderQty = false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisiblesparesInventoryAging = false;
      this.isVisibleSparesDebtorsExecutiveWise = false;
      this.isVisiblefromtosubinventory=false;
      this.isVisiblecustomerLedger=false;
      this.isVisibleEwayBill=false;
      this.isVisiblepanelStockTaking=false;
      this.isVisiblesparesPaintPanelReport=false;
      this.isVisibleonlyOuCode = false;
      this.isVisiblePanelOUFromDateToDateSubInv=false;
    }

    else if (reportName === 'gststockTransferReceivedSummary') {
      this.reportName = 'Paint Stock Transfer Received Summary Report';
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisibleonlyLocationCode = false;
      this.isVisiblespClosingStockAsOndate=false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisibleStockLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblestockTransferRecd=true;
      this.isVisibleSparesBackOrderQty = false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisiblesparesInventoryAging = false;
      this.isVisibleSparesDebtorsExecutiveWise = false;
      this.isVisiblefromtosubinventory=false;
      this.isVisiblecustomerLedger=false;
      this.isVisibleEwayBill=false;
      this.isVisiblepanelStockTaking=false;
      this.isVisiblesparesPaintPanelReport=false;
      this.isVisibleonlyOuCode = false;
      this.isVisiblePanelOUFromDateToDateSubInv=false;
    }

    else if (reportName === 'gstSparesClosingStockAsOnDate') {
      this.reportName = 'Paint Closing Stock As On Date';
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisibleonlyLocationCode = false;
      this.isVisiblespClosingStockAsOndate=true;
      this.isVisiblegstsaiDebtors = false;
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
      this.isVisiblesparesPaintPanelReport=false;
      this.isVisibleonlyOuCode = false;
      this.isVisiblePanelOUFromDateToDateSubInv=false;
    }

    else if (reportName === 'billHandedoverToActReport') {
      this.reportName = 'Accounts Bill Handover Report';
      if (this.reportName === 'Accounts Bill Handover Report') {
        this.isVisiblespPurRegDownLoad = true;
      }
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.isVisibleDepartmentList = true;
      }
      this.isVisibleGSTPurchaseRegister = true;
      this.isVisibleonlyLocationCode = false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisibleStockLedger = false;
      this.isVisiblestockTransfer = false;
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
      this.isVisiblesparesPaintPanelReport=false;
      this.isVisibleonlyOuCode = false;
      this.isVisiblePanelOUFromDateToDateSubInv=false;
    }

    else if (reportName === 'paintStockTakingBlankFormat') {

      this.reportName = 'Stock Taking - Blank Format';
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
      this.isVisibleEwayBill=false;
      this.isVisiblepanelStockTaking=false;
      this.isVisiblesparesPaintPanelReport=false;
      this.isVisibleonlyOuCode = false;
      this.isVisiblePanelOUFromDateToDateSubInv=false;
    }

    else if (reportName === 'paintStockTakingDetailFormat') {

      this.reportName = 'Stock Taking - Detail Format';
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
      this.isVisibleEwayBill=false;
      this.isVisiblepanelStockTaking=false;
      this.isVisiblesparesPaintPanelReport=false;
      this.isVisibleonlyOuCode = false;
      this.isVisiblePanelOUFromDateToDateSubInv=false;
    }

    else if (reportName === 'paintStockTakinUploadFormat') {

      this.reportName = 'Stock Taking - Phy Stock Upload Format';
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
      this.isVisibleEwayBill=false;
      this.isVisiblepanelStockTaking=false;
      this.isVisiblesparesPaintPanelReport=false;
      this.isVisibleonlyOuCode = false;
      this.isVisiblePanelOUFromDateToDateSubInv=false;
    }

    else if (reportName === 'paintStockTakingQtyDetails') {

      this.reportName = 'Stock Taking Report - Qty Details';
      this.isVisibleonlyLocationCode = false;
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
      this.isVisibleEwayBill=false;
      this.isVisiblepanelStockTaking=true;
      this.isVisiblesparesPaintPanelReport=false;
      this.isVisibleonlyOuCode = false;
      this.isVisiblePanelOUFromDateToDateSubInv=false;
    }
    else if (reportName === 'icConsumptionReport') {
      this.reportName = 'Internal Consumption Report';
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
        this.isVisiblefromtosubinventory=false;
        this.isVisiblecustomerLedger=false;
        this.isVisibleEwayBill=false;
        this.isVisiblepanelStockTaking=false;
        this.isVisiblesparesPaintPanelReport=true;
        this.isVisibleonlyOuCode = false;
        this.isVisiblePanelOUFromDateToDateSubInv=false;
      }
      else if (reportName === 'paintDailyReport') {
        this.reportName = 'Paint Daily Report';
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
          this.isVisiblefromtosubinventory=false;
          this.isVisiblecustomerLedger=false;
          this.isVisibleEwayBill=false;
          this.isVisiblepanelStockTaking=false;
          this.isVisiblesparesPaintPanelReport=false;
          this.isVisibleonlyOuCode = false;
          this.isVisiblePanelOUFromDateToDateSubInv=true;
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

  reportParameter(reportName) {

    // alert ("reportName:"+reportName)
    
    this.isDisabled1 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var purStDt = this.paintReportForm.get('fromDate').value;
    var fromDate = this.pipe.transform(purStDt, 'dd-MMM-yyyy');
    var toDate1 = this.paintReportForm.get('toDate').value;
    var toDate = this.pipe.transform(toDate1, 'dd-MMM-yyyy');
    var locId = this.paintReportForm.get('locId').value;
    var fromlocId = this.paintReportForm.get('fromLocId').value;
    var tolocId = this.paintReportForm.get('tolocId').value;
    var deptId = this.paintReportForm.get('deptId').value;
    var userName = this.paintReportForm.get('userName').value;
    var segment = this.paintReportForm.get('segment').value;
    var subInventory = this.paintReportForm.get('subInventory').value;
    var tolocId = this.paintReportForm.get('tolocId').value;

   

    // alert (locId)

    // return;
    if (locId === null  ) {
      alert('Please Select location Code.!');
      return;
    }

    var fDate =this.paintReportForm.get('fromDate').value;
    var tDate =this.paintReportForm.get('toDate').value;


    if (reportName === 'Paint Purchase Register Details') {

      this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

      if (Number(sessionStorage.getItem('deptId')) === 4) {
        const fileName = 'Paint Purchase Register Details-' +  fromDate + '-TO-' + toDate + '.xls';
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
        const fileName = 'Paint Purchase Register Details-' +  fromDate + '-TO-' + toDate + '.xls';
        const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
        this.reportService.sppurRegidetailReportSpares(fromDate, toDate, sessionStorage.getItem('ouId'), locId, sessionStorage.getItem('deptId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
    }
    else if (reportName === 'Paint Purchase Register - Summary') {
      this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

      const fileName = 'Paint Purchase Register - Summary-' + sessionStorage.getItem('locName').replace(' ', '') + '-' + fromDate + '-TO-' + toDate + '.xls';
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
        this.reportService.sppurRegiSummReport(fromDate, toDate, sessionStorage.getItem('ouId'), locId, sessionStorage.getItem('deptId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    
    else if (reportName === 'Paint Stock Ledger') {
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
     else if (reportName === 'Paint Inventory Aging Report') {
      this.isDisabled1=false;
      this.rptValidation=true;
      var spInvAging1 = this.paintReportForm.get('spInvAging1').value;
      var spInvAging2 = this.paintReportForm.get('spInvAging2').value;
      var spInvAging3 = this.paintReportForm.get('spInvAging3').value;
      

      if(spInvAging1<0 || spInvAging1==null || spInvAging1==undefined) {this.rptValidation=false;}
      if(spInvAging2<0 || spInvAging2==null || spInvAging2==undefined) {this.rptValidation=false;}
      if(spInvAging3<0 || spInvAging3==null || spInvAging3==undefined) {this.rptValidation=false;}

      
      if (spInvAging1 > spInvAging2) {this.rptValidation=false;}
      else if (spInvAging1 >spInvAging3){this.rptValidation=false;}
      else if (spInvAging2 > spInvAging3){this.rptValidation=false;}

      if(this.rptValidation ==false) {this.closeResetButton=true;this.dataDisplay = 'Please check Aging Values.';  return; }
     
      this.isDisabled1=true;

      const fileName = 'Paint Inventory Aging Report-' +  '.xls';
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
  
    else if (reportName === 'Paint Daily Report') {
      const fileName = 'Paint Daily Report-' +  '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}
         this.reportService.paintDailyReportFN(fromDate, toDate,sessionStorage.getItem('ouId'), subInventory )
           .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            //  var url = URL.createObjectURL(blob);
            //  var printWindow = window.open(url, '', 'width=800,height=500');
            //  printWindow.open;
             this.isDisabled1 = false;
             this.closeResetButton = true;
             this.dataDisplay = ''
           })
      
     }


    else if (reportName === 'Paint Closing Stock Report') {
      const fileName = 'PAINT-Closing-Stock-' + sessionStorage.getItem('locName').trim() + '.xls';
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
    

    else if (reportName==='Paint Consumption Report'){
      this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

      // alert ("Dept id :"+sessionStorage.getItem('deptId'))
      var issCategory =this.paintReportForm.get('issCatg').value;


      const fileName = 'Consumption Report-' +  fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if ((Number(sessionStorage.getItem('deptId'))===4)){
        this.reportService.PaintInternalConsuptionReport(fromDate,toDate, locId, subInventory,sessionStorage.getItem('ouId'),issCategory)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
      }
      else if ((Number(sessionStorage.getItem('deptId')))!=4){
        this.reportService.PaintInternalConsuptionReport(fromDate,toDate, locId, subInventory,sessionStorage.getItem('ouId'),issCategory)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
      } 
    }

    else if (reportName === 'Paint Stock Adjustment Report') {
      this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

      const fileName = 'Paint Misc Issue Receipt Report-' +  fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.PaintparesMiscIssueReceiptReport(fromDate, toDate, locId,sessionStorage.getItem('ouId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.PaintparesMiscIssueReceiptReport(fromDate, toDate, locId,sessionStorage.getItem('ouId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }

    else if (reportName === 'Paint Panel Summary Report') {
      this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}
      const fileName = 'Paint Panel Summary Report-' +  fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.paintPanelReportSummary(fromDate, toDate, locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.paintPanelReportSummary(fromDate, toDate, sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }

    else if (reportName === 'Paint Panel Detail Report') {
      this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}
      const fileName = 'Paint Panel Detail Report-' +  fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.paintPanelReportDetail(fromDate, toDate, locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.paintPanelReportDetail(fromDate, toDate, sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName === 'Paint Stock Transfer Made Detail Report') {
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

    else if (reportName === 'Paint Stock Transfer Made Summary Report') {
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

    else if (reportName === 'Paint Stock Transfer Received Detail Report') {
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
    else if (reportName === 'Paint Spares Stock Transfer Received Summary Report') {
      this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}
      if (tolocId === undefined || tolocId === null ){
        alert('Please Select To Location.!');
        return;
      }
     
      const fileName = 'Spares Stock Transfer Received Summary Report-' +  fromDate + '.xls';
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
    else if (reportName==='Accounts Bill Handover Report'){
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

    else if (reportName==='Paint Closing Stock As On Date'){
      // const fileName = 'PAINT Closing Stock As On Date-' +  '-TO-' + '.xls';
      const fileName = 'PAINT-Closing Stock - ' +sessionStorage.getItem('locName').trim() +' As On ' +  toDate + '.xls';

      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      var subInventory = this.paintReportForm.get('subInventory').value;
      if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.gstSparesClosingStockAsOnDateFN(toDate,locId,subInventory)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.closeResetButton = true;
        this.dataDisplay = ''
        this.isDisabled1=false;
      })
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.reportService.gstSparesClosingStockAsOnDateFN(toDate,sessionStorage.getItem('locId'),subInventory)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.closeResetButton = true;
        this.dataDisplay = ''
        this.isDisabled1=false;
      })
    }
    }
    // Stock-Summary-OuWise
    else if (reportName === 'Paint Closing Stock Summary') {
      // alert ('reportName---'+reportName)

      const fileName = 'PAINT-Closing-StockSummary-' + sessionStorage.getItem('ouName').trim() + '.xls';
      // alert (fileName)
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.paintclosingstockSummary(sessionStorage.getItem('ouId'),subInventory)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.paintclosingstockSummary(sessionStorage.getItem('ouId'),subInventory)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }

    else if (reportName === 'Stock Taking - Blank Format') {
      const fileName = 'PAINT-Stock Taking-Blank Format-' + sessionStorage.getItem('locName').trim() + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.paintStockTakingReport(locId,subInventory,'blank')
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.paintStockTakingReport(sessionStorage.getItem('locId'),subInventory,'blank')
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }

    else if (reportName === 'Stock Taking - Detail Format') {
      const fileName = 'PAINT-Stock Taking-Detail Format-' + sessionStorage.getItem('locName').trim() + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.paintStockTakingReport(locId,subInventory,'detail')
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.paintStockTakingReport(sessionStorage.getItem('locId'),subInventory,'detail')
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }

    else if (reportName === 'Stock Taking - Phy Stock Upload Format') {
      const fileName = 'PAINT-Stock Taking-Upload Format-' + sessionStorage.getItem('locName').trim() + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.paintStockTakingReport(locId,subInventory,'upload')
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.paintStockTakingReport(sessionStorage.getItem('locId'),subInventory,'upload')
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
          // var locId=this.sparesReportForm.get('locId').value;
          var compileName =this.paintReportForm.get('compileCode').value;

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

  
  onOptionsLocation(event) {
    // alert("From Location : "+ event +","+this.paintReportForm.get('locCode').value);
    this.paintReportForm.patchValue({ locId: event })
    // this.paintReportForm.patchValue({ fromLocId: event })

    if(event>0){
      var x=this.paintReportForm.get('locCode').value;
      var y=this.paintReportForm.get('tolocCode').value;
      if(x===y) {alert ("From/To Locations Should not be Same...");
       this.paintReportForm.get('locCode').reset();
      return;
    }}
  

  }

  onOptionsToLocation(event) {
    // alert("To Location : "+ event);
    this.paintReportForm.patchValue({ tolocId: event });
    if(event>0){
      var x=this.paintReportForm.get('locCode').value;
      var y=this.paintReportForm.get('tolocCode').value;
      if(x===y) {alert ("From/To Locations Should not be Same...");
       this.paintReportForm.get('tolocCode').reset();
      return;
    }}
  }

  onOptionsDepartmentList(event: string) {
    // alert(event);
    var deptList = this.DepartmentList.find(d => d.code === event);
    console.log(deptList);

    this.paintReportForm.patchValue({ deptId: deptList.cmnTypeId })
  }

  department(department) {
    if (department === 'Spares') {
      let department = this.DepartmentList.filter((customer) => ((customer.codeDesc.includes('Spares') == true)));
      console.log(department);
      this.DepartmentList = department;
    }
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

}
