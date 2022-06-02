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
  selector: 'app-sales-reports',
  templateUrl: './sales-reports.component.html',
  styleUrls: ['./sales-reports.component.css']
})
export class SalesReportsComponent implements OnInit {
  salesReportForm: FormGroup;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  public minDate = new Date();
  pipe = new DatePipe('en-US');
  now = new Date();
  vhslRegisterFromDt: Date;
  vhslRegisterToDt: Date;
  locCode: string;
  salesINDFromDt: Date;
  salesINDToDt: Date;
  salesbkregFromDt: Date;
  salesbkregToDt: Date;
  salesAltnotInvToDt: Date;
  ouName: string;
  frGstSaleReg: Date;
  toGstSaleReg: Date;
  invcDt1: Date;
  location: string;

  isDisabled1 = false;
  isDisabled2 = false;
  tolocCode:string;
  tolocId:number;


  // New Code Started//////////////
  public BillShipToList: Array<string> = [];
  public DepartmentList: any = [];
  isVisibleVehicleSaleRegister: boolean = false;
  isVisiblelocationLOV: boolean = false;
  isVisiblelocationInput: boolean = false;
  isVisibleDepartmentList: boolean = false;
  fromDate: Date;
  toDate: Date;
  locId: number;
  isVisibleSaleIND: boolean = false;
  isSaleClosingStock: boolean = false;
  OUCode: string;
  custAccNo: string;
  deptId: number;
  isVisiblefromtolocationdepartment: boolean = false;
  isVisiblecustomerLedger: boolean = false;
  isVisiblespPurRegDownLoad: boolean = false;
  isVisiblestockTransfer:boolean=false;
  isVisiblefromtoloccustaccno:boolean=false;
  isVisibleSalesInventoryAging:boolean=false;
  spInvAging1:number;
  spInvAging2:number;
  spInvAging3:number;
  isVisiblepanelfromtolocation:boolean=false;
  isVisiblepanelreceiptNo:boolean=false;
  receiptNo:number;
  isVisiblepanelSalesAddonReconciliation:boolean=false;
  segment1:string;
  segment2:string;
  segment4:string;
  segment3:string;
  segment5:string;
  branch: any;
  lookupValueDesc4: string;
  lookupValueDesc1: string;
  lookupValueDesc2: string;
  lookupValueDesc3: string;
  lookupValueDesc5: string;
  BranchList: any = [];
  locIdList1: any = [];
  userList3: any[] = [];
  lastkeydown3: number = 0;
  public NaturalAccountList: any = [];
  public InterBrancList: any = [];
  public CostCenterList: Array<string> = [];
  isVisiblefromtosubinventory:boolean=false;
  subInventory:string;
  subInvCode: any;
  panelamcHistrory:boolean=false;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private location1: Location, private router1: ActivatedRoute, private reportService: ReportServiceService) {
    this.salesReportForm = this.fb.group({
      fromDate: [''],
      toDate: [''],
      locId: [''],
      OUCode: [''],
      custAccNo: [''],
      deptId: [''],
      department: [''],
      tolocCode:[''],
      tolocId:[''],
      spInvAging1:[],
      spInvAging2:[],
      spInvAging3:[],

      vhslRegisterFromDt: [''],
      vhslRegisterToDt: [''],
      locCode: [''],
      salesINDFromDt: [''],
      salesINDToDt: [''],
      ouName: [''],
      salesbkregToDt: [''],
      salesbkregFromDt: [''],
      salesAltnotInvToDt: [''],
      frGstSaleReg: [''],
      toGstSaleReg: [''],
      invcDt1: [''],
      location: [''],
      receiptNo:[''],
      segment1:[],
      segment2:[],
      segment3:[],
      segment4:[],
      segment5:[],
      lookupValueDesc1:[],
      lookupValueDesc2:[],
      lookupValueDesc3:[],
      lookupValueDesc4:[],
      lookupValueDesc5:[],
      subInventory:[],
      regNo:[''],
    })
  }

  salesReport(salesReportForm) {
  }

  ngOnInit(): void {
    this.salesReportForm.patchValue({ OUCode: sessionStorage.getItem('ouId') + '-' + sessionStorage.getItem('ouName') })
    this.salesReportForm.patchValue({ locCode: sessionStorage.getItem('locId') + '-' + sessionStorage.getItem('locName') })
    this.salesReportForm.patchValue({ department: 'Spares' });
    this.salesReportForm.patchValue({ department: '5' });

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

      this.service.CostCenterList()
      .subscribe(
        data => {
          this.CostCenterList = data;
          console.log(this.CostCenterList);
        }
      );

      this.service.DepartmentListNew()
      .subscribe(
        data => {
          this.DepartmentList = data;
        }
      );

      this.service.locationCodeList()
      .subscribe(
        data => {
          this.locIdList1 = data;
          console.log(this.locIdList1);
        }
      );

      this.service.BranchList()
      .subscribe(
        data => {
          this.BranchList = data;
          console.log(this.BranchList);
          var branchNM = sessionStorage.getItem('locCode').split('.');
          console.log(branchNM[0]); 
          this.BranchList = this.BranchList.filter((br => br.lookupValue === branchNM[0]));
            console.log(this.BranchList);
        }
      );

      this.service.getInterBranchNatural()
      .subscribe(
        data => {
          this.NaturalAccountList = data.obj;
          console.log(data.obj);
          console.log(this.NaturalAccountList);
        }
      );

      this.service.subInvCode2(sessionStorage.getItem('deptId'), sessionStorage.getItem('divisionId')).subscribe(
        data => {
          this.subInvCode = data;
          console.log(this.subInvCode);
          if (this.subInvCode.subInventoryCode != null) {
            this.subInventory = this.subInvCode.subInventoryCode;
            this.salesReportForm.patchValue({ subInventory: this.subInvCode.subInventoryCode })
          }
        });
  
        
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.isVisiblelocationLOV = true;
      this.isVisiblelocationInput = false;
      this.salesReportForm.patchValue({ subInventory: 'VH' })
    }
    else {
      this.isVisiblelocationLOV = false;
      this.isVisiblelocationInput = true;
    }
  }



  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }



  reportName: string;
  reportDetails(reportName) {
    if (reportName === 'gstVehicleSaleRegister') {
      this.reportName = 'Vehicle Sales Register'
      this.isVisibleVehicleSaleRegister = true;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblestockTransfer=false;
      this.isVisiblefromtoloccustaccno=false;
      this.isVisibleSalesInventoryAging=false;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblepanelreceiptNo=false;
      this.isVisiblepanelSalesAddonReconciliation=false;
      this.isVisiblefromtosubinventory=false;
      this.panelamcHistrory=false;
    }
    else if (reportName === 'gstSaleIND') {
      this.reportName = 'Sales Invoiced Not Delivered'
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = true;
      this.isSaleClosingStock = false;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblestockTransfer=false;
      this.isVisiblefromtoloccustaccno=false;
      this.isVisibleSalesInventoryAging=false;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblepanelreceiptNo=false;
      this.isVisiblepanelSalesAddonReconciliation=false;
      this.isVisiblefromtosubinventory=false;
      this.panelamcHistrory=false;
    }
    else if (reportName === 'gstVehicleBookingReg') {
      this.reportName = 'Vehicle Booking Register'
      this.isVisibleVehicleSaleRegister = true;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblestockTransfer=false;
      this.isVisiblefromtoloccustaccno=false;
      this.isVisibleSalesInventoryAging=false;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblepanelreceiptNo=false;
      this.isVisiblepanelSalesAddonReconciliation=false;
      this.isVisiblefromtosubinventory=false;
      this.panelamcHistrory=false;
    }
    else if (reportName === 'gstSaleAllotNotInv') {
      this.reportName = 'Sales Alloted Not Invoiced Report'
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = true;
      this.isSaleClosingStock = false;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblestockTransfer=false;
      this.isVisiblefromtoloccustaccno=false;
      this.isVisibleSalesInventoryAging=false;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblepanelreceiptNo=false;
      this.isVisiblepanelSalesAddonReconciliation=false;
      this.isVisiblefromtosubinventory=false;
      this.panelamcHistrory=false;
    }
    else if (reportName === 'gstSaleClosingStock') {
      this.reportName = 'Vehicle Closing Stock'
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = true;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblestockTransfer=false;
      this.isVisiblefromtoloccustaccno=false;
      this.isVisibleSalesInventoryAging=false;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblepanelreceiptNo=false;
      this.isVisiblepanelSalesAddonReconciliation=false;
      this.isVisiblefromtosubinventory=false;
      this.panelamcHistrory=false;
    }
    else if (reportName === 'gstSaleRegister') {
      this.reportName = 'GST Sales Register'
      this.isVisibleVehicleSaleRegister = true;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblestockTransfer=false;
      this.isVisiblefromtoloccustaccno=false;
      this.isVisibleSalesInventoryAging=false;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblepanelreceiptNo=false;
      this.isVisiblepanelSalesAddonReconciliation=false;
      this.isVisiblefromtosubinventory=false;
      this.panelamcHistrory=false;
    }
    else if (reportName === 'gstSparesSaiDebtors') {
      this.reportName = 'Sai Debtors'
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = true;
      this.isSaleClosingStock = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblestockTransfer=false;
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.isVisibleDepartmentList = true;

      }
      this.isVisiblefromtoloccustaccno=false;
      this.isVisibleSalesInventoryAging=false;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblepanelreceiptNo=false;
      this.isVisiblepanelSalesAddonReconciliation=false;
      this.isVisiblefromtosubinventory=false;
      this.panelamcHistrory=false;
    }
    else if (reportName === 'gstReceiptRegister') {
      this.reportName = 'Receipt Register';
      this.isVisiblefromtolocationdepartment = true;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblestockTransfer=false;
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.isVisibleDepartmentList = true;
      }
      this.isVisiblefromtoloccustaccno=false;
      this.isVisibleSalesInventoryAging=false;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblepanelreceiptNo=false;
      this.isVisiblepanelSalesAddonReconciliation=false;
      this.isVisiblefromtosubinventory=false;
      this.panelamcHistrory=false;
    }

    else if (reportName === 'customerLedger') {
      this.reportName = 'Customer Ledger Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer=false;
      this.isVisiblecustomerLedger = true;
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.isVisibleDepartmentList = true;
      }
      this.isVisiblefromtoloccustaccno=false;
      this.isVisibleSalesInventoryAging=false;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblepanelreceiptNo=false;
      this.isVisiblepanelSalesAddonReconciliation=false;
      this.isVisiblefromtosubinventory=false;
      this.panelamcHistrory=false;
    }
    else if (reportName === 'gststockTransferSummary') {
      this.reportName = 'Stock Transfer Made Detail Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer=true;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno=false;
      this.isVisibleSalesInventoryAging=false;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblepanelreceiptNo=false;
      this.isVisiblepanelSalesAddonReconciliation=false;
      this.isVisiblefromtosubinventory=false;
      this.panelamcHistrory=false;
    }
    else if (reportName ==='gststockTransferReceivedDetails'){
      this.reportName = 'Stock Transfer Received Detail Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer=true;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno=false;
      this.isVisibleSalesInventoryAging=false;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblepanelreceiptNo=false;
      this.isVisiblepanelSalesAddonReconciliation=false;
      this.isVisiblefromtosubinventory=false;
      this.panelamcHistrory=false;
    }
    else if (reportName==='gststockTransferReceivedSummary'){
      this.reportName = 'Spares Stock Transfer Received Summary Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer=true;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno=false;
      this.isVisibleSalesInventoryAging=false;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblepanelreceiptNo=false;
      this.isVisiblepanelSalesAddonReconciliation=false;
      this.isVisiblefromtosubinventory=false;
      this.panelamcHistrory=false;
    }
    else if (reportName==='saleProformaSummary'){
      this.reportName = 'Sales Proforma Summary Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = true;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer=false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno=false;
      this.isVisibleSalesInventoryAging=false;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblepanelreceiptNo=false;
      this.isVisiblepanelSalesAddonReconciliation=false;
      this.isVisiblefromtosubinventory=false;
      this.panelamcHistrory=false;
    }
    else if (reportName==='creditNoteReg'){
      this.reportName = 'Credit Note Register';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = true;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer=false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno=false;
      this.isVisibleSalesInventoryAging=false;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblepanelreceiptNo=false;
      this.isVisiblepanelSalesAddonReconciliation=false;
      this.isVisiblefromtosubinventory=false;
      this.panelamcHistrory=false;
    }
    else if (reportName==='subDealerRep'){
      this.reportName = 'SubDealer-Sales Register Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer=false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno=true;
      this.isVisibleSalesInventoryAging=false;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblepanelreceiptNo=false;
      this.isVisiblepanelSalesAddonReconciliation=false;
      this.isVisiblefromtosubinventory=false;
      this.panelamcHistrory=false;
    }
    else if (reportName==='salesaggingReports'){
      this.reportName = 'Sales Aging Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer=false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno=false;
      this.isVisibleSalesInventoryAging=true;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblepanelreceiptNo=false;
      this.isVisiblepanelSalesAddonReconciliation=false;
      this.isVisiblefromtosubinventory=false;
      this.panelamcHistrory=false;
    }
    else if (reportName==='saleAddonRegister'){
      this.reportName = 'Sales Addon Register';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = true;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer=false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno=false;
      this.isVisibleSalesInventoryAging=false;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblepanelreceiptNo=false;
      this.isVisiblepanelSalesAddonReconciliation=false;
      this.isVisiblefromtosubinventory=false;
      this.panelamcHistrory=false;
    }
    else if (reportName==='EWSaleRegister'){
      this.reportName = 'EW Sales Register';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = true;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer=false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno=false;
      this.isVisibleSalesInventoryAging=false;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblepanelreceiptNo=false;
      this.isVisiblepanelSalesAddonReconciliation=false;
      this.isVisiblefromtosubinventory=false;
      this.panelamcHistrory=false;
    }
    else if (reportName==='reinsuarnceReceiptPrint'){
      this.reportName = 'Reinsurance Receipt Print';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer=false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno=false;
      this.isVisibleSalesInventoryAging=false;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblepanelreceiptNo=true;
      this.isVisiblepanelSalesAddonReconciliation=false;
      this.isVisiblefromtosubinventory=false;
      this.panelamcHistrory=false;
    }
    else if (reportName ==='salesAddonReconciliation'){
      this.reportName = 'Sales Addon Reconciliation';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer=false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno=false;
      this.isVisibleSalesInventoryAging=false;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblepanelreceiptNo=false;
      this.isVisiblepanelSalesAddonReconciliation=true;
      this.isVisiblefromtosubinventory=false;
      this.panelamcHistrory=false;
    }
    else if (reportName ==='sparesSubinvTransReceived'){
      this.reportName ='Sub Inventory Transfer Received Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer=false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno=false;
      this.isVisibleSalesInventoryAging=false;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblepanelreceiptNo=false;
      this.isVisiblepanelSalesAddonReconciliation=false;
      this.isVisiblefromtosubinventory=true;
      this.panelamcHistrory=false;
    }
    else if (reportName ==='sparesSubinvTransMade'){
      this.reportName ='Sub Inventory Transfer Made Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer=false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno=false;
      this.isVisibleSalesInventoryAging=false;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblepanelreceiptNo=false;
      this.isVisiblepanelSalesAddonReconciliation=false;
      this.isVisiblefromtosubinventory=true;
      this.panelamcHistrory=false;
    }
    else if (reportName === 'IrnGenerationReport'){
      this.reportName ='IRN Generation Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer=false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno=false;
      this.isVisibleSalesInventoryAging=false;
      this.isVisiblepanelfromtolocation=true;
      this.isVisiblepanelreceiptNo=false;
      this.isVisiblepanelSalesAddonReconciliation=false;
      this.isVisiblefromtosubinventory=false;
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.isVisibleDepartmentList = true;

      }
      this.panelamcHistrory=false;
    }
    else if (reportName ==='amcHistrory'){
      this.reportName ='AMC History Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer=false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno=false;
      this.isVisibleSalesInventoryAging=false;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblepanelreceiptNo=false;
      this.isVisiblepanelSalesAddonReconciliation=false;
      this.isVisiblefromtosubinventory=false;
      this.panelamcHistrory=true;
    }
    else if (reportName === 'reInsuarnceRegister') {
      this.reportName = 'ReInsurance Register';
      this.isVisiblefromtolocationdepartment = true;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblestockTransfer=false;
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.isVisibleDepartmentList = true;
      }
      this.isVisiblefromtoloccustaccno=false;
      this.isVisibleSalesInventoryAging=false;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblepanelreceiptNo=false;
      this.isVisiblepanelSalesAddonReconciliation=false;
      this.isVisiblefromtosubinventory=false;
      this.panelamcHistrory=false;
    }
  }



  reportParameter(reportName) {
    this.isDisabled1 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var purStDt = this.salesReportForm.get('fromDate').value;
    var fromDate = this.pipe.transform(purStDt, 'dd-MMM-yyyy');
    var toDate1 = this.salesReportForm.get('toDate').value;
    var toDate = this.pipe.transform(toDate1, 'dd-MMM-yyyy');
    var locId = this.salesReportForm.get('locId').value;
    var deptId = this.salesReportForm.get('deptId').value;
    if (locId === null) {
      alert('Please Select location Code.!');
      return;
    }
    if (reportName === 'Vehicle Sales Register') {
      const fileName = 'Vehicle Sales Register-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.vhslRegisterReport(fromDate, toDate, locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.vhslRegisterReport(fromDate, toDate, sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
    }
    else if (reportName === 'Sales Invoiced Not Delivered') {
      const fileName = 'Sales Invoiced Not Delivered-' + sessionStorage.getItem('locName').trim() + '-' + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.salesINDReport(toDate, locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.salesINDReport(toDate, sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
    }
    else if (reportName === 'Vehicle Booking Register') {
      const fileName = 'Sales Booking Register-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.salesbookingregReport(fromDate, toDate, locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.salesbookingregReport(fromDate, toDate, sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
    }
    else if (reportName === 'Sales Alloted Not Invoiced Report') {
      const fileName = 'Sales Alloted Not Invoiced Report-' + sessionStorage.getItem('locName').trim() + '-' + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.salesAltnotInvReport(toDate, locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.salesAltnotInvReport(toDate, sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
    }
    else if (reportName === 'Vehicle Closing Stock') {
      const fileName = 'Vehicle Closing Stock-' + sessionStorage.getItem('locName').trim() + '-' + '-TO-' + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.vehicleClosingStockReport(sessionStorage.getItem('ouId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.vehicleClosingStockReport(sessionStorage.getItem('ouId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
    }
    else if (reportName === 'GST Sales Register') {
      const fileName = 'GST Sales Register-' + sessionStorage.getItem('locName').trim() + '-' + '-TO-' + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.gstSaleRegisterReport(fromDate, toDate, sessionStorage.getItem('ouId'), locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.gstSaleRegisterReport(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
    }
    else if (reportName === 'Sai Debtors') {
      var custAccNo = this.salesReportForm.get('custAccNo').value;
      var deptId = this.salesReportForm.get('deptId').value;
      if (custAccNo === undefined || custAccNo === null) {
        custAccNo = '';
      }
      // alert(deptId);
      const fileName = 'Sai Debtors-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        if (deptId===null || deptId == undefined || deptId ==''){
          alert('Please Select Department ID.!');
          this.dataDisplay = 'Please Select Department ID.....Do not refresh the Page';
          this.isDisabled1 = false;
          this.closeResetButton = true;
          return;
        }
        this.reportService.SPDebtorReport(toDate, sessionStorage.getItem('ouId'), locId, custAccNo, deptId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.SPDebtorReport(toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), custAccNo, sessionStorage.getItem('deptId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled2 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName === 'Receipt Register') {
    //  alert(deptId);
      const fileName = 'Receipt Register-' + sessionStorage.getItem('locName').replace(' ', '') + '-' + fromDate + '-TO-' + toDate + '.xls';
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
    else if (reportName === 'Customer Ledger Report') {
      var custAccNo = this.salesReportForm.get('custAccNo').value;
      if (custAccNo === undefined || custAccNo === '' || custAccNo === null) {
        alert('First Enter customer Account No.!');
        this.isDisabled1 = false;
        return;
      }
      const fileName = 'Customer Ledger Report-' + sessionStorage.getItem('locName').replace(' ', '') + '-' + fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      // const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {     
        this.reportService.customerLedger(fromDate,toDate,custAccNo,sessionStorage.getItem('ouId'),deptId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          });
      }
      else if ((Number(sessionStorage.getItem('deptId'))!=4)){
        this.reportService.customerLedger(fromDate,toDate,custAccNo,sessionStorage.getItem('ouId'),sessionStorage.getItem('deptId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        });
      }
    }
    else if (reportName === 'Stock Transfer Made Detail Report') {
      var tolocId = this.salesReportForm.get('tolocId').value;
      var subInventory='VH';
      const fileName = 'Stock Transfer Made Detail Report-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
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
    else if (reportName === 'Stock Transfer Received Detail Report') {
      var tolocId = this.salesReportForm.get('tolocId').value;
      var subInventory='VH';
      const fileName = 'Stock Transfer Received Detail Report-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
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
    else if (reportName === 'Spares Stock Transfer Received Summary Report') {
      var tolocId = this.salesReportForm.get('tolocId').value;
      var subInventory='VH';
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
    else if (reportName === 'Sales Proforma Summary Report') {
      const fileName = 'Sales Proforma Summary Report-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.saleProformaSummary(fromDate, toDate, locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.saleProformaSummary(fromDate, toDate, sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName === 'Credit Note Register') {
      const fileName = 'Credit Note Register-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
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
    else if (reportName==='SubDealer-Sales Register Report'){
      var custAcctNo=this.salesReportForm.get('custAccNo').value;
      if (custAcctNo === undefined || custAcctNo === null) {
        custAcctNo = '';
      }
      const fileName = 'SubDealer-Sales Register Report-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.subDealerRep(fromDate, toDate,locId,custAcctNo)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.subDealerRep(fromDate, toDate, sessionStorage.getItem('locId'),custAcctNo)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName==='Sales Aging Report'){
      var spInvAging1 = this.salesReportForm.get('spInvAging1').value;
      var spInvAging2 = this.salesReportForm.get('spInvAging2').value;
      var spInvAging3 = this.salesReportForm.get('spInvAging3').value;
      if (spInvAging1 > spInvAging2) {
        alert('Please check Aging.!');
        this.dataDisplay = 'Please Check Aging 2 Parameter.!';
        return;
      }
      else if (spInvAging1 > spInvAging3) {
        alert('Please check Aging.!');
        this.dataDisplay = 'Please Check Aging 3 Parameter.!';
        return;
      }
      else if (spInvAging2 > spInvAging3) {
        alert('Please check Aging.!');
        this.dataDisplay = 'Please Check Aging 3 Parameter.!';
        return;
      }
      const fileName = 'Spares Inventory Aging Report-' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.salesAgingReport( sessionStorage.getItem('ouId'),spInvAging1, spInvAging2, spInvAging3)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.salesAgingReport(sessionStorage.getItem('ouId'),spInvAging1, spInvAging2, spInvAging3)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName==='Sales Addon Register'){
      const fileName = 'Sales Addon Register-' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.saleAddonRegister( fromDate,toDate,sessionStorage.getItem('ouId'),locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.saleAddonRegister(fromDate,toDate,sessionStorage.getItem('ouId'),sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }

    else if (reportName==='EW Sales Register'){
      const fileName = 'EW Sales Register-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId'))===4){
      this.reportService.EWSaleRegister(fromDate, toDate, sessionStorage.getItem('ouId'),locId)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled1 = false;
      })
      }
      if (Number(sessionStorage.getItem('deptId'))!=4){
        this.reportService.EWSaleRegister(fromDate, toDate, sessionStorage.getItem('ouId'),sessionStorage.getItem('locId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled1 = false;
        })
      }
    }
    else if (reportName === 'Reinsurance Receipt Print'){
      var receiptNo = this.salesReportForm.get('receiptNo').value;
      // alert(receiptNo)
      if (receiptNo == '' || receiptNo == null || receiptNo==undefined){
        alert('Please Enter receipt Number.!')
      }
      const fileName = 'download.pdf';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.reportService.reinsuarnceReceiptPrint(receiptNo)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled1 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
    }
    else if (reportName === 'Sales Addon Reconciliation'){
      var segment1= this.salesReportForm.get('segment1').value;
      // alert(segment1)
      var segment2 = this.salesReportForm.get('segment2').value;
      var segment3 = this.salesReportForm.get('segment3').value;
      var segment4= this.salesReportForm.get('segment4').value;
      var segment5 = this.salesReportForm.get('segment5').value;
      const fileName = 'Sales Addon Reconciliation -' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.reportService.salesAddonReconciliation(fromDate,toDate,segment1,segment2,segment3,segment4,segment5)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled1 = false;
      })
    }
    else if (reportName==='Sub Inventory Transfer Received Report'){
      var subInvCode = this.salesReportForm.get('subInventory').value;
      // alert(subInvCode)
      const fileName = 'Sub Inventory Transfer Received Report-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if ((Number(sessionStorage.getItem('deptId'))===4)){
        this.reportService.SalesInvTransRecFuc(fromDate,toDate, locId, subInvCode)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
      }
      else if ((Number(sessionStorage.getItem('deptId')))!=4){
        this.reportService.SalesInvTransRecFuc(fromDate,toDate, sessionStorage.getItem('locId'), subInvCode)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
      }
    }
    else if (reportName==='Sub Inventory Transfer Made Report'){
      var subInvCode = this.salesReportForm.get('subInventory').value;
      // alert(subInvCode)
      const fileName = 'Sub Inventory Transfer Made Report-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if ((Number(sessionStorage.getItem('deptId'))===4)){
        this.reportService.spInvTransMadeFuc(fromDate,toDate, locId, subInvCode)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
      }
      else if ((Number(sessionStorage.getItem('deptId')))!=4){
        this.reportService.spInvTransMadeFuc(fromDate,toDate, sessionStorage.getItem('locId'), subInvCode)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
      } 
    }
    else if (reportName ==='IRN Generation Report'){
      const fileName = 'IRN Generation Report-' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        var deptId=this.salesReportForm.get('deptId').value;
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
    else if (reportName == 'AMC History Report'){
      var regNo = this.salesReportForm.get('regNo').value;
      if (regNo == undefined || regNo == null){
        alert('Please Select Vehicle number.!');
        return;
      }
      const fileName = 'download.pdf';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.reportService.amcHistory(regNo,sessionStorage.getItem('ouId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled1 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
     }
     else if (reportName === 'ReInsurance Register') {
      //  alert(deptId);
        const fileName = 'ReInsurance Register-' + sessionStorage.getItem('locName').replace(' ', '') + '-' + fromDate + '-TO-' + toDate + '.xls';
        const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
        if (Number(sessionStorage.getItem('deptId')) === 4) {
          this.reportService.reinsuarnceReceiptRegister(fromDate, toDate, sessionStorage.getItem('ouId'), locId, deptId)
            .subscribe(data => {
              saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
              this.isDisabled1 = false;
              this.closeResetButton = true;
              this.dataDisplay = ''
            })
        }
        else if (Number(sessionStorage.getItem('deptId')) != 4) {
          this.reportService.reinsuarnceReceiptRegister(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), sessionStorage.getItem('deptId'))
            .subscribe(data => {
              saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
              this.isDisabled1 = false;
              this.closeResetButton = true;
              this.dataDisplay = ''
            })
        }
      }
  }

 
  department(department) {
    if (department === 'Sales') {
      let department = this.DepartmentList.filter((customer) => ((customer.codeDesc.includes('Sales') == true)));
      console.log(department);
      this.DepartmentList = department;
    }
  }

  onOptionsToLocation(event) {
    this.salesReportForm.patchValue({ tolocId: event })
  }

  onOptionsLocation(event) {
    // alert(event);
    this.salesReportForm.patchValue({ locId: event })
  }

  vhslRegister() {
    this.isDisabled1 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var purStDt = this.salesReportForm.get('vhslRegisterFromDt').value;
    var fromDate = this.pipe.transform(purStDt, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.salesReportForm.get('vhslRegisterToDt').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    const fileName = 'Vehicle Sales Register-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
    // alert(fromDate+'----'+ toDate+'-----'+ sessionStorage.getItem('locId'))
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.vhslRegisterReport(fromDate, toDate, sessionStorage.getItem('locId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled1 = false;
      })
  }



  salesIND() {
    this.isDisabled2 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    // var purStDt = this.salesReportForm.get('salesINDFromDt').value;
    // var fromDate = this.pipe.transform(purStDt, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.salesReportForm.get('salesINDToDt').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    const fileName = 'Sales Invoiced Not Delivered-' + sessionStorage.getItem('locName').trim() + '-' + '-TO-' + toDate + '.xls';

    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.salesINDReport(toDate, sessionStorage.getItem('locId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled2 = false;
      })
  }



  salesbookingreg() {
    this.isDisabled2 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var purStDt = this.salesReportForm.get('salesbkregFromDt').value;
    var fromDate = this.pipe.transform(purStDt, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.salesReportForm.get('salesbkregToDt').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    const fileName = 'Sales Booking Register-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';

    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.salesbookingregReport(fromDate, toDate, sessionStorage.getItem('locId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled2 = false;
      })
  }



  salesAltnotInv() {
    this.isDisabled2 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    // var purStDt = this.salesReportForm.get('salesbkregFromDt').value;
    // var fromDate = this.pipe.transform(purStDt, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.salesReportForm.get('salesAltnotInvToDt').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    const fileName = 'Sales Alloted Not Invoiced Report-' + sessionStorage.getItem('locName').trim() + '-' + '-TO-' + toDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.salesAltnotInvReport(toDate, sessionStorage.getItem('locId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled2 = false;
      })
  }



  vehicleClosingStock() {
    this.isDisabled2 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    // var purStDt = this.salesReportForm.get('salesbkregFromDt').value;
    // var fromDate = this.pipe.transform(purStDt, 'dd-MMM-yyyy');
    // var spreceipttoDate2 = this.salesReportForm.get('salesAltnotInvToDt').value;
    // var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    const fileName = 'Vehicle Closing Stock-' + sessionStorage.getItem('locName').trim() + '-' + '-TO-' + '.xls';

    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.vehicleClosingStockReport(sessionStorage.getItem('ouId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled2 = false;
      })
  }

  gstSaleRegister() {
    this.isDisabled2 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var fromDate1 = this.salesReportForm.get('frGstSaleReg').value;
    var fromDate = this.pipe.transform(fromDate1, 'dd-MMM-yyyy');
    var toDate1 = this.salesReportForm.get('toGstSaleReg').value;
    var toDate = this.pipe.transform(toDate1, 'dd-MMM-yyyy');
    const fileName = 'Vehicle Closing Stock-' + sessionStorage.getItem('locName').trim() + '-' + '-TO-' + '.xls';

    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.gstSaleRegisterReport(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled2 = false;
      })
  }


  SPdebtorsReport() {
    this.isDisabled2 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var invcDt2 = this.salesReportForm.get('invcDt1').value;
    var fromDate = this.pipe.transform(invcDt2, 'dd-MMM-yyyy');
    //const fileName = 'download.pdf';
    const fileName = 'SP-Debtors-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.SPDebtorReport(fromDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), sessionStorage.getItem('deptId'), sessionStorage.getItem('deptId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled2 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
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



  onOptionsSelectedBranch(segment: any, lType: string) {
    // alert(segment+'----'+lType);
    this.service.getInterBranch(segment, lType).subscribe(
      data => {
        this.branch = data;
        console.log(this.branch);
        if (this.branch != null) {
          if (lType === 'SS_Interbranch') {
            this.lookupValueDesc5 = this.branch.lookupValueDesc;
          }
          if (lType === 'CostCentre') {
            this.lookupValueDesc3 = this.branch.lookupValueDesc;
          }
          if (lType === 'SS_Location') {
            this.lookupValueDesc2 = this.branch.lookupValueDesc;
          }
          if (lType === 'SS_Branch') {
            // this.lookupValueDesc1 = this.branch.lookupValueDesc;
            this.lookupValueDesc1 = this.branch.lookupValueDesc;
            var sellBr = this.BranchList.find(d => d.lookupValue === segment);
            // console.log(sellBr);       
            this.locIdList1 = this.locIdList1.filter((br => br.lookupValue.includes(sellBr.parentValue) || br.lookupValue === "000"));
          }
        }
      }
    );

  }


  getNaturalAccount($event) {
    let userId = (<HTMLInputElement>document.getElementById('NaturalAccountFirstWay')).value;
    this.userList3 = [];
    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown3 > 200) {
        this.userList3 = this.searchFromArray2(this.NaturalAccountList, userId);
      }
    }
  }


  searchFromArray2(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      // alert(arr[i] + 'Array i');
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };

  onOptionsSelectedBranchNew(event) {
    if (event != undefined) {
      let selectinterbranch = this.InterBrancList.find(v => v.lookupValue == event);
      console.log(selectinterbranch);
      this.lookupValueDesc5 = selectinterbranch.lookupValueDesc;
    }
  }

  onOptionsSelectedNatural(event) {
    if (event != undefined) {
      let selectnaturalaccount = this.NaturalAccountList.find(v => v.naturalaccount == event);
      console.log(selectnaturalaccount);
      this.lookupValueDesc4 = selectnaturalaccount.description;
      this.service.getInterBranchNewApi(event).subscribe(
        data => {
          this.InterBrancList = data.obj
        })
    }

    
  }


  onOptionsDepartmentList(event:string){
    // alert(event);
    var deptList = this.DepartmentList.find(d => d.code === event);
    console.log(deptList);
    
    this.salesReportForm.patchValue({deptId:deptList.cmnTypeId})
  }

}
