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
  public minDate = new Date();
  fromDate: Date;
  toDate: Date;
  OUCode: string;
  locCode: string;
  locId: number;
  public BillShipToList: Array<string> = [];
  periodNameList: any = [];

  public DepartmentList: any = [];
  pipe = new DatePipe('en-US');
  now = new Date();
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  deptId: number;
  userName: string;
  subInventory: string;
  subInvCode: any;
  segment: string;
  tolocCode: string;
  tolocId: number;
  orderNumber: number;
  custAccNo: number;
  spInvAging1: number;
  spInvAging2: number;
  spInvAging3: number;
  invItemList = new Array();
  isVisibleGSTPurchaseRegister: boolean = false;
  isVisiblelocationInput: boolean = false;
  isVisiblelocationLOV: boolean = false;
  isVisiblespPurRegDownLoad: boolean = false;
  isVisibleonlyLocationCode: boolean = false;
  isVisiblegstsaiDebtors: boolean = false;
  isVisibleStockLedger: boolean = false;
  isVisiblestockTransfer: boolean = false;
  isVisibleSparesBackOrderQty: boolean = false;
  isVisiblesparesMiscIssueReceipt: boolean = false;
  isVisiblesparesInventoryAging: boolean = false;
  isVisibleSparesDebtorsExecutiveWise: boolean = false;
  isVisiblespClosingStockAsOndate:boolean=false;
  isVisibleDepartmentList: boolean = false;
  isVisiblefromtosubinventory:boolean=false;
  isDisabled1 = false;
  userName1:string;
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private location1: Location, private router1: ActivatedRoute, private reportService: ReportServiceService) {
    this.sparesReportForm = this.fb.group({
      fromDate: [''],
      toDate: [''],
      OUCode: [''],
      locCode: [''],
      locId: [''],
      deptId: [''],
      userName: [''],
      subInventory: [''],
      segment: [''],
      tolocCode: [''],
      tolocId: [''],
      custAccNo: [''],
      orderNumber: [''],
      spInvAging1: [''],
      spInvAging2: [''],
      spInvAging3: [''],
      department: [''],
      userName1:[''],
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


    this.sparesReportForm.patchValue({ userName: sessionStorage.getItem('ticketNo') })

    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.isVisiblelocationLOV = true;
      this.isVisiblelocationInput = false;
      this.sparesReportForm.patchValue({ subInventory: 'AC' })
    }
    else {
      this.isVisiblelocationLOV = false;
      this.isVisiblelocationInput = true;
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
      this.isVisiblespClosingStockAsOndate=false;
      this.isVisibleonlyLocationCode = false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisibleStockLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisibleSparesBackOrderQty = false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisiblesparesInventoryAging = false;
      this.isVisibleSparesDebtorsExecutiveWise = false;
      this.isVisiblefromtosubinventory=false;
    }
    else if (reportName === 'gstpurRegSumm') {
      this.reportName = 'Spares Purchase Register - Summary';
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.isVisibleDepartmentList = true;
      }
      this.isVisibleGSTPurchaseRegister = true;
      this.isVisibleonlyLocationCode = false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisibleStockLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisibleSparesBackOrderQty = false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisiblesparesInventoryAging = false;
      this.isVisiblespClosingStockAsOndate=false;
      this.isVisibleSparesDebtorsExecutiveWise = false;
      this.isVisiblefromtosubinventory=false;
    }
    else if (reportName === 'gstIssueDetails') {
      this.reportName = 'Spares Issue Details Report';
      this.isVisibleGSTPurchaseRegister = true;
      this.isVisibleonlyLocationCode = false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisibleStockLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisibleSparesBackOrderQty = false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisiblesparesInventoryAging = false;
      this.isVisibleSparesDebtorsExecutiveWise = false;
      this.isVisiblefromtosubinventory=false;
      this.isVisiblespClosingStockAsOndate=false;
    }
    else if (reportName === 'gstIssueSummary') {
      this.reportName = 'Spares Issue Summary';
      this.isVisibleGSTPurchaseRegister = true;
      this.isVisibleonlyLocationCode = false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisibleStockLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisibleSparesBackOrderQty = false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisiblesparesInventoryAging = false;
      this.isVisibleSparesDebtorsExecutiveWise = false;
      this.isVisiblefromtosubinventory=false;
      this.isVisiblespClosingStockAsOndate=false;
    }
    else if (reportName === 'gstReceiptRegister') {
      this.reportName = 'Spares Receipt Register';
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.isVisibleDepartmentList = true;
      }
      this.isVisibleonlyLocationCode = false;
      this.isVisibleGSTPurchaseRegister = true;
      this.isVisiblegstsaiDebtors = false;
      this.isVisibleStockLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisibleSparesBackOrderQty = false;
      this.isVisiblespClosingStockAsOndate=false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisiblesparesInventoryAging = false;
      this.isVisibleSparesDebtorsExecutiveWise = false;
      this.isVisiblefromtosubinventory=false;
    }
    else if (reportName === 'gstClosingReport') {
      this.reportName = 'Spares Closing Stock Report';
      this.isVisibleonlyLocationCode = true;
      this.isVisiblegstsaiDebtors = false;
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisibleStockLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisibleSparesBackOrderQty = false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisiblespClosingStockAsOndate=false;
      this.isVisiblesparesInventoryAging = false;
      this.isVisibleSparesDebtorsExecutiveWise = false;
      this.isVisiblefromtosubinventory=false;
    }
    else if (reportName === 'gstsaiDebtors') {
      this.reportName = 'Sai Debtors';
      if (Number(sessionStorage.getItem('deptId'))===4){
        this.isVisibleDepartmentList=true;
      }
      this.isVisibleonlyLocationCode = false;
      this.isVisiblegstsaiDebtors = true;
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisibleStockLedger = false;
      this.isVisiblespClosingStockAsOndate=false;
      this.isVisiblestockTransfer = false;
      this.isVisibleSparesBackOrderQty = false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisiblesparesInventoryAging = false;
      this.isVisibleSparesDebtorsExecutiveWise = false;
      this.isVisiblefromtosubinventory=false;
    }
    else if (reportName === 'gstStockLedger') {
      this.reportName = 'Stock Ledger';
      this.isVisibleonlyLocationCode = false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisibleStockLedger = true;
      this.isVisiblestockTransfer = false;
      this.isVisibleSparesBackOrderQty = false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisiblespClosingStockAsOndate=false;
      this.isVisiblesparesInventoryAging = false;
      this.isVisibleSparesDebtorsExecutiveWise = false;
      this.isVisiblefromtosubinventory=false;
    }
    else if (reportName === 'gststockTransfer') {
      this.reportName = 'Stock Transfer Made Detail Report';
      this.isVisibleonlyLocationCode = false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisibleStockLedger = false;
      this.isVisiblestockTransfer = true;
      this.isVisibleSparesBackOrderQty = false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisiblespClosingStockAsOndate=false;
      this.isVisiblesparesInventoryAging = false;
      this.isVisibleSparesDebtorsExecutiveWise = false;
      this.isVisiblefromtosubinventory=false;
    }
    else if (reportName === 'gststockTransferSummary') {
      this.reportName = 'Stock Transfer Made Summary Report';
      this.isVisibleonlyLocationCode = false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisibleStockLedger = false;
      this.isVisiblestockTransfer = true;
      this.isVisibleSparesBackOrderQty = false;
      this.isVisiblespClosingStockAsOndate=false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisiblesparesInventoryAging = false;
      this.isVisibleSparesDebtorsExecutiveWise = false;
      this.isVisiblefromtosubinventory=false;
    }
    else if (reportName === 'gststockTransferReceivedDetails') {
      this.reportName = 'Stock Transfer Received Detail Report';
      this.isVisibleonlyLocationCode = false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisibleStockLedger = false;
      this.isVisiblespClosingStockAsOndate=false;
      this.isVisiblestockTransfer = true;
      this.isVisibleSparesBackOrderQty = false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisiblesparesInventoryAging = false;
      this.isVisibleSparesDebtorsExecutiveWise = false;
      this.isVisiblefromtosubinventory=false;
    }
    else if (reportName === 'gststockTransferReceivedSummary') {
      this.reportName = 'Spares Stock Transfer Received Summary Report';
      this.isVisibleonlyLocationCode = false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisiblespClosingStockAsOndate=false;
      this.isVisibleStockLedger = false;
      this.isVisiblestockTransfer = true;
      this.isVisibleSparesBackOrderQty = false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisiblesparesInventoryAging = false;
      this.isVisibleSparesDebtorsExecutiveWise = false;
      this.isVisiblefromtosubinventory=false;
    }
    else if (reportName === 'gstsparesCustomerOffTakeStatment') {
      this.reportName = 'Spares Customer Off Take Statement';
      this.isVisibleGSTPurchaseRegister = true;
      this.isVisibleonlyLocationCode = false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisiblespClosingStockAsOndate=false;
      this.isVisibleStockLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisibleSparesBackOrderQty = false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisiblesparesInventoryAging = false;
      this.isVisibleSparesDebtorsExecutiveWise = false;
      this.isVisiblefromtosubinventory=false;
    }
    else if (reportName === 'gstSparesBackOrderQty') {
      this.reportName = 'Spares Back Order Qty Report';
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisibleonlyLocationCode = false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisibleStockLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisibleSparesBackOrderQty = true;
      this.isVisiblespClosingStockAsOndate=false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisiblesparesInventoryAging = false;
      this.isVisibleSparesDebtorsExecutiveWise = false;
      this.isVisiblefromtosubinventory=false;
    }
    else if (reportName === 'gstsparesMiscIssueReceipt') {
      this.reportName = 'Spares Misc Issue Receipt Report';
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisibleonlyLocationCode = false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisiblespClosingStockAsOndate=false;
      this.isVisibleStockLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisibleSparesBackOrderQty = false;
      this.isVisiblesparesMiscIssueReceipt = true;
      this.isVisiblesparesInventoryAging = false;
      this.isVisibleSparesDebtorsExecutiveWise = false;
      this.isVisiblefromtosubinventory=false;
    }
    else if (reportName === 'gstSaleReturnRegister') {
      this.reportName = 'Spares Sales Return Register';
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisiblespClosingStockAsOndate=false;
      this.isVisibleonlyLocationCode = false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisibleStockLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisibleSparesBackOrderQty = false;
      this.isVisiblesparesMiscIssueReceipt = true;
      this.isVisiblesparesInventoryAging = false;
      this.isVisibleSparesDebtorsExecutiveWise = false;
      this.isVisiblefromtosubinventory=false;
    }
    else if (reportName === 'gstIncomeStatement') {
      this.reportName = 'Income Statement';
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisibleonlyLocationCode = false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisiblespClosingStockAsOndate=false;
      this.isVisibleStockLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisibleSparesBackOrderQty = false;
      this.isVisiblesparesMiscIssueReceipt = true;
      this.isVisiblesparesInventoryAging = false;
      this.isVisibleSparesDebtorsExecutiveWise = false;
      this.isVisiblefromtosubinventory=false;
    }
    else if (reportName === 'gstSparesClosingStockAsOnDate') {
      this.reportName = 'Spares Closing Stock As On Date';
      this.isVisibleonlyLocationCode = false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisiblespClosingStockAsOndate=true;
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisibleStockLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisibleSparesBackOrderQty = false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisiblesparesInventoryAging = false;
      this.isVisibleSparesDebtorsExecutiveWise = false;
      this.isVisiblefromtosubinventory=false;
    }
    else if (reportName === 'gstSpresProformaDetailsReports') {
      this.reportName = 'Spares Proforma Details Report';
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisibleonlyLocationCode = false;
      this.isVisiblespClosingStockAsOndate=false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisibleStockLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisibleSparesBackOrderQty = false;
      this.isVisiblesparesMiscIssueReceipt = true;
      this.isVisiblesparesInventoryAging = false;
      this.isVisibleSparesDebtorsExecutiveWise = false;
      this.isVisiblefromtosubinventory=false;
    }
    else if (reportName === 'gstChequeBounceReport') {
      this.reportName = 'Cheque Bounce Report';
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisiblespClosingStockAsOndate=false;
      this.isVisibleonlyLocationCode = false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisibleStockLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisibleSparesBackOrderQty = false;
      this.isVisiblesparesMiscIssueReceipt = true;
      this.isVisiblesparesInventoryAging = false;
      this.isVisibleSparesDebtorsExecutiveWise = false;
      this.isVisiblefromtosubinventory=false;
    }
    else if (reportName === 'gstsparesInventoryAging') {
      this.reportName = 'Spares Inventory Aging Report';
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisibleonlyLocationCode = false;
      this.isVisiblespClosingStockAsOndate=false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisibleStockLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisibleSparesBackOrderQty = false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisiblesparesInventoryAging = true;
      this.isVisibleSparesDebtorsExecutiveWise = false;
      this.isVisiblefromtosubinventory=false;
    }
    else if (reportName === 'gstSparesDebtorsExecutiveWise') {
      this.reportName = 'Spares Debtors Executive Wise report';
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.isVisibleDepartmentList = true;
      }
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisibleonlyLocationCode = false;
      this.isVisiblespClosingStockAsOndate=false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisibleStockLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisibleSparesBackOrderQty = false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisiblesparesInventoryAging = false;
      this.isVisibleSparesDebtorsExecutiveWise = true;
      this.isVisiblefromtosubinventory=false;
    }
    else if (reportName === 'sparesSubinvTransReceived') {
      this.reportName = 'Sub Inventory Transfer Received Report';
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisibleonlyLocationCode = false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisibleStockLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisibleSparesBackOrderQty = false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisiblesparesInventoryAging = false;
      this.isVisibleSparesDebtorsExecutiveWise = false;
      this.isVisiblefromtosubinventory=true;
      this.isVisiblespClosingStockAsOndate=false;
    }
    else if (reportName === 'sparesSubinvTransMade') {
      this.reportName = 'Sub Inventory Transfer Made Report';
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisibleonlyLocationCode = false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisibleStockLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisibleSparesBackOrderQty = false;
      this.isVisiblespClosingStockAsOndate=false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisiblesparesInventoryAging = false;
      this.isVisibleSparesDebtorsExecutiveWise = false;
      this.isVisiblefromtosubinventory=true;
    }
    else if (reportName === 'internalConsumptionReport') {
      this.reportName = 'Internal Consumption Report';
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisibleonlyLocationCode = false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisibleStockLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisibleSparesBackOrderQty = false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisiblesparesInventoryAging = false;
      this.isVisibleSparesDebtorsExecutiveWise = false;
      this.isVisiblefromtosubinventory=true;
      this.isVisiblespClosingStockAsOndate=false;
    }
  }

  



  onOptionsLocation(event) {
    // alert(event);
    this.sparesReportForm.patchValue({ locId: event })
  }

  onOptionsToLocation(event) {
    this.sparesReportForm.patchValue({ tolocId: event })
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
    var tolocId = this.sparesReportForm.get('tolocId').value;
    var deptId = this.sparesReportForm.get('deptId').value;
    var userName = this.sparesReportForm.get('userName').value;
    var segment = this.sparesReportForm.get('segment').value;
    var subInventory = this.sparesReportForm.get('subInventory').value;
    var tolocId = this.sparesReportForm.get('tolocId').value;
    // alert(deptId);
    if (locId === null) {
      alert('Please Select location Code.!');
      return;
    }
    //   alert(reportName.includes('Spares Closing Stock'))
    // if ( reportName.includes('Spares Closing Stock') ===false || reportName.includes('Sai Debtors')===false){
    //   if (fromDate === null ||fromDate ===undefined|| fromDate==='' ) {
    //     alert('Please Select From Date.!');
    //     this.isDisabled1 = false;
    //     this.closeResetButton = false;
    //     this.progress = 0;
    //     this.dataDisplay = 'Please Select From Date.!';
    //     return;
    //   }
    // }
    // else if (reportName !='Spares Closing Stock Report'){
    //   if (toDate === null || toDate===undefined || toDate ==='') {
    //     alert('Please Select To Date.!');
    //     this.isDisabled1 = false;
    //     this.closeResetButton = false;
    //     this.progress = 0;
    //     this.dataDisplay = 'Please Select To Date.!';
    //     return;
    //   }
    // }
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
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        const fileName = 'Purchase Register Details-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
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
        const fileName = 'Purchase Register Details-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
        const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
        this.reportService.sppurRegidetailReport(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), sessionStorage.getItem('deptId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
    }
    else if (reportName === 'Spares Purchase Register - Summary') {
      const fileName = 'Spares Purchase Register - Summary-' + sessionStorage.getItem('locName').replace(' ', '') + '-' + fromDate + '-TO-' + toDate + '.xls';
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
    else if (reportName === 'Spares Issue Details Report') {
      const fileName = 'Spares Issue Details Report-' + sessionStorage.getItem('locName').replace(' ', '') + '-' + fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.spIssueDetailsReport(fromDate, toDate, locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = '';
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.spIssueDetailsReport(fromDate, toDate, sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = '';
          })
      }
    }
    else if (reportName === 'Spares Issue Summary') {
      const fileName = 'Spares Issue Summary Report-' + sessionStorage.getItem('locName').replace(' ', '') + '-' + fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.spIssueSummaryReport(fromDate, toDate, locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.spIssueSummaryReport(fromDate, toDate, sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName === 'Spares Receipt Register') {
      const fileName = 'Spares Receipt Register-' + sessionStorage.getItem('locName').replace(' ', '') + '-' + fromDate + '-TO-' + toDate + '.xls';
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
    else if (reportName === 'Spares Closing Stock Report') {
      const fileName = 'SP-Closing-Stock-' + sessionStorage.getItem('locName').trim() + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.spclosstrockReport(locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.spclosstrockReport(sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName === 'Sai Debtors') {
      var custAccNo = this.sparesReportForm.get('custAccNo').value;
      if (custAccNo === undefined || custAccNo === null) {
        custAccNo = '';
      }
      const fileName = 'SP-Debtors-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.SPDebtorReport(toDate, sessionStorage.getItem('ouId'), locId,custAccNo,deptId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.SPDebtorReport(toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'),custAccNo,deptId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName === 'Stock Ledger') {
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
      const fileName = 'Stock Transfer Made Detail Report-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.stockMadeDetailsReport(fromDate, toDate, locId, tolocId, subInventory)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.stockMadeDetailsReport(fromDate, toDate, sessionStorage.getItem('locId'), tolocId, subInventory)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName === 'Stock Transfer Made Summary Report') {
      const fileName = 'Stock Transfer Made Summary Report-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
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
      const fileName = 'Stock Transfer Received Detail Report-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.SprStkTrfRecdDtlsReport(fromDate, toDate, locId, tolocId, subInventory)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.SprStkTrfRecdDtlsReport(fromDate, toDate, sessionStorage.getItem('locId'), tolocId, subInventory)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName === 'Spares Stock Transfer Received Summary Report') {
      const fileName = 'Spares Stock Transfer Received Summary Report-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
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
    else if (reportName === 'Spares Customer Off Take Statement') {
      const fileName = 'Spares-Customer-Off-Take-Statement-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
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
    else if (reportName === 'Spares Back Order Qty Report') {
      var custAccNo = this.sparesReportForm.get('custAccNo').value;
      var orderNumber = this.sparesReportForm.get('orderNumber').value;
      if (custAccNo === undefined || custAccNo === null) {
        custAccNo = '';
      }
      if (orderNumber === undefined || orderNumber === null) {
        orderNumber = ''
      }
      const fileName = 'Spares Back Order Qty Report-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
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
    else if (reportName === 'Spares Misc Issue Receipt Report') {
      const fileName = 'Spares Misc Issue Receipt Report-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.spSparesMiscIssueReceiptReport(fromDate, toDate, locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.spSparesMiscIssueReceiptReport(fromDate, toDate, sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName === 'Spares Sales Return Register') {
      const fileName = 'Spares Sales Return Register-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
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
      const fileName = 'Spares Income Statement-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
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
    else if (reportName === 'Spares Closing Stock As On Date') {
      const fileName = 'Spares Closing Stock As On Date-' + sessionStorage.getItem('locName').trim() + '-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.sprClsAsonDtReport(toDate, locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) { 
        this.reportService.sprClsAsonDtReport(toDate, sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName === 'Spares Proforma Details Report') {
      const fileName = 'Spares Proforma Details Report-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
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
      const fileName = 'Cheque Bounce Report-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
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
    else if (reportName === 'Spares Inventory Aging Report') {
      var spInvAging1 = this.sparesReportForm.get('spInvAging1').value;
      var spInvAging2 = this.sparesReportForm.get('spInvAging2').value;
      var spInvAging3 = this.sparesReportForm.get('spInvAging3').value;
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
      const fileName = 'Spares Inventory Aging Report-' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.sspInvAgingReport(spInvAging1, spInvAging2, spInvAging3, sessionStorage.getItem('ouId'), locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.sspInvAgingReport(spInvAging1, spInvAging2, spInvAging3, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName === 'Spares Debtors Executive Wise report') {
      var custAcctNo = this.sparesReportForm.get('custAccNo').value;
      var ticketNo = this.sparesReportForm.get('userName1').value
      if (custAcctNo === undefined || custAcctNo === null) {
        custAcctNo = '';
      }
      if (ticketNo === undefined || ticketNo === null) {
        ticketNo = '';
      }
      const fileName = 'Spares Debtors Executive Wise report-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
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
      const fileName = 'Sub Inventory Transfer Received Report-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
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
      const fileName = 'Sub Inventory Transfer Made Report-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
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
      const fileName = 'Internal Consumption Report-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if ((Number(sessionStorage.getItem('deptId'))===4)){
        this.reportService.internalConsuptionReport(fromDate,toDate, locId, subInventory)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
      }
      else if ((Number(sessionStorage.getItem('deptId')))!=4){
        this.reportService.internalConsuptionReport(fromDate,toDate, sessionStorage.getItem('locId'), subInventory)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
      } 
    }
  }
  spPurRegDownLoad() {
    const fileName = 'Purchase-Register-' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
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

}
