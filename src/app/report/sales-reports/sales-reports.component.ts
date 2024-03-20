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
  tolocCode: string;
  tolocId: number;

  spDbAging1: number = 15;
  spDbAging2: number = 30;
  spDbAging3: number = 45;
  spDbAging4: number = 60;
  // New Code Started//////////////
  public BillShipToList: Array<string> = [];
  public DepartmentList: any = [];
  isVisibleVehicleSaleRegister: boolean = false;
  isVisiblelocationLOV: boolean = false;
  isVisiblelocationInput: boolean = false;
  isVisibleDepartmentList: boolean = false;
  isVisiblegstsaiDebtors: boolean = false;
  // fromDate: Date;
  // toDate: Date;
  fromDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  toDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  locId: number;
  isVisibleSaleIND: boolean = false;
  isSaleClosingStock: boolean = false;
  OUCode: string;
  custAccNo: string;
  deptId: number;
  isVisiblefromtolocationdepartment: boolean = false;
  isVisiblecustomerLedger: boolean = false;
  isVisiblespPurRegDownLoad: boolean = false;
  isVisiblestockTransfer: boolean = false;
  isVisiblefromtoloccustaccno: boolean = false;
  isVisibleSalesInventoryAging: boolean = false;
  inVisiblepanelSaleSaiDebtors: boolean = false;
  spInvAging1: number;
  spInvAging2: number;
  spInvAging3: number;
  isVisiblepanelfromtolocation: boolean = false;
  isVisiblepaneltolocation: boolean = false;
  isVisiblepanelreceiptNo: boolean = false;
  receiptNo: number;
  isVisiblepanelSalesAddonReconciliation: boolean = false;
  segment1: string;
  segment2: string;
  segment4: string;
  segment3: string;
  segment5: string;
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
  isVisiblefromtosubinventory: boolean = false;
  isVisiblepanelfromtolocation1: boolean = false;
  subInventory: string;
  subInvCode: any;
  panelamcHistrory: boolean = false;
  ispanelTolocationOu: boolean = false;

  age1: number = 20;
  age2: number = 30;
  age3: number = 45;
  age4: number = 60;
  rptValidation = true;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private location1: Location, private router1: ActivatedRoute, private reportService: ReportServiceService) {
    this.salesReportForm = this.fb.group({
      fromDate: [''],
      toDate: [''],
      locId: [''],
      locCode:[],
      deptName1:[],
      OUCode: [''],
      custAccNo: [''],
      deptId: [],
      department: [''],
      tolocCode: [''],
      tolocId: [''],
      spInvAging1: [],
      spInvAging2: [],
      spInvAging3: [],
      vhslRegisterFromDt: [''],
      vhslRegisterToDt: [''],
      deptCode: [''],
      salesINDFromDt: [''],
      salesINDToDt: [''],
      ouName: [''],
      deptId1:[''],
      salesbkregToDt: [''],
      salesbkregFromDt: [''],
      salesAltnotInvToDt: [''],
      frGstSaleReg: [''],
      toGstSaleReg: [''],
      invcDt1: [''],
      age1: [],
      age2: [],
      age3: [],
      age4: [],
      location: [''],
      receiptNo: [''],
      segment1: [],
      segment2: [],
      segment3: [],
      segment4: [],
      segment5: [],
      lookupValueDesc1: [],
      lookupValueDesc2: [],
      lookupValueDesc3: [],
      lookupValueDesc4: [],
      lookupValueDesc5: [],
      subInventory: [],
      regNo: [''],
    })
  }

  salesReport(salesReportForm) {
  }

  ngOnInit(): void {
    this.salesReportForm.patchValue({ OUCode: sessionStorage.getItem('ouId') + '-' + sessionStorage.getItem('ouName') })
    this.salesReportForm.patchValue({ locCode: sessionStorage.getItem('locId') + '-' + sessionStorage.getItem('locName') })
    if (Number(sessionStorage.getItem('deptId'))!=4){
    this.salesReportForm.patchValue({ department: 'Sales' });
    this.salesReportForm.patchValue({ deptId: 1 });
  }
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
          console.log(data);
          
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

    // this.service.getInterBranchNatural()
    //   .subscribe(
    //     data => {
    //       this.NaturalAccountList = data.obj;
    //       console.log(data.obj);
    //       console.log(this.NaturalAccountList);
    //     }
    //   );

    // this.service.NaturalAccountList1()
    // .subscribe(
    //   data=> {
    //     this.NaturalAccountList = data.obj;
    //     console.log(this.NaturalAccountList);
    //   }
    // );

    this.service.getInterBranchNatural()
    .subscribe(
      data => {
        for (let j = 0; j < data.obj.length; j++) {
          var str = data.obj[j].naturalaccount + '-' + data.obj[j].description;
          this.NaturalAccountList.push(str);
        }
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
      this.isVisiblestockTransfer = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelfromtolocation1 = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
    else if (reportName === 'gstSaleIND') {
      this.reportName = 'Sales Invoiced Not Delivered'
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = true;
      this.isSaleClosingStock = false;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation1 = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
    else if (reportName === 'gstVehicleBookingReg') {
      this.reportName = 'Vehicle Booking Register'
      this.isVisibleVehicleSaleRegister = true;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation1 = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
    else if (reportName === 'gstSaleAllotNotInv') {
      this.reportName = 'Sales Alloted Not Invoiced Report'
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = true;
      this.isSaleClosingStock = false;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelfromtolocation1 = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
    else if (reportName === 'gstSaleClosingStock') {
      this.reportName = 'Vehicle Closing Stock'
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = true;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelfromtolocation1 = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
    else if (reportName === 'gstSaleClosingStockNew') {
      this.reportName = 'Vehicle Closing Stock-New'
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = true;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelfromtolocation1 = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
    else if (reportName === 'gstSaleRegister') {
      this.reportName = 'GST Sales Register'
      this.isVisibleVehicleSaleRegister = true;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblepanelfromtolocation1 = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
    else if (reportName === 'gstSparesSaiDebtors') {
      // alert(reportName +'---'+this.inVisiblepanelSaleSaiDebtors);
      this.reportName = 'Sai Debtors';
      this.isVisiblegstsaiDebtors = true;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.inVisiblepanelSaleSaiDebtors = true;
      this.isSaleClosingStock = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblestockTransfer = false;
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.isVisibleDepartmentList = true;

      }
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
      this.isVisiblepanelfromtolocation1 = false;
    }
    else if (reportName === 'gstReceiptRegister') {
      this.reportName = 'Receipt Register';
      this.isVisiblefromtolocationdepartment = true;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblestockTransfer = false;
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.isVisibleDepartmentList = true;
      }
      this.salesReportForm.patchValue({ department: 'Sales' });
      this.salesReportForm.patchValue({ deptId: 1 });
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblepanelfromtolocation1 = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }

    else if (reportName === 'customerLedger') {
      this.reportName = 'Customer Ledger Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblecustomerLedger = true;
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.isVisibleDepartmentList = true;
      }
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.isVisiblepanelfromtolocation1 = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
    else if (reportName === 'gststockTransferSummary') {
      this.reportName = 'Stock Transfer Made Detail Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer = true;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.isVisiblepanelfromtolocation1 = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
    else if (reportName === 'gststockTransferReceivedDetails') {
      this.reportName = 'Stock Transfer Received Detail Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer = true;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblepanelfromtolocation1 = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
    else if (reportName === 'gststockTransferReceivedSummary') {
      this.reportName = 'Sales Stock Transfer Received Summary Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer = true;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation1 = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
    else if (reportName === 'saleProformaSummary') {
      this.reportName = 'Sales Proforma Summary Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = true;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblepanelfromtolocation1 = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
    else if (reportName === 'creditNoteReg') {
      this.reportName = 'Credit Note Register';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = true;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisiblepanelfromtolocation1 = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
    else if (reportName === 'subDealerRep') {
      this.reportName = 'SubDealer-Sales Register Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno = true;
      this.isVisiblepanelfromtolocation1 = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
    else if (reportName === 'salesaggingReports') {
      this.reportName = 'Sales Aging Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = true;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepanelfromtolocation1 = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
    else if (reportName === 'saleAddonRegister') {
      this.reportName = 'Sales Addon Register';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = true;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.isVisiblepanelfromtolocation1 = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
    else if (reportName === 'EWSaleRegister') {
      this.reportName = 'EW Sales Register';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = true;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.isVisiblepanelfromtolocation1 = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
    else if (reportName === 'reinsuarnceReceiptPrint') {
      this.reportName = 'Reinsurance Receipt Print';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = true;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblepanelfromtolocation1 = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
    else if (reportName === 'salesAddonReconciliation') {
      this.reportName = 'Sales Addon Reconciliation';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = true;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepanelfromtolocation1 = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
    else if (reportName === 'sparesSubinvTransReceived') {
      this.reportName = 'Sub Inventory Transfer Received Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = true;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepanelfromtolocation1 = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
    else if (reportName === 'sparesSubinvTransMade') {
      this.reportName = 'Sub Inventory Transfer Made Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = true;
      this.isVisiblepanelfromtolocation1 = false;
      this.panelamcHistrory = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
    else if (reportName === 'IrnGenerationReport') {
      this.reportName = 'IRN Generation Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = true;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.isVisibleDepartmentList = true;

      }
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblepanelfromtolocation1 = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
    else if (reportName === 'amcHistrory') {
      this.reportName = 'AMC History Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = true;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblepanelfromtolocation1 = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
    else if (reportName === 'reInsuarnceRegister') {
      this.salesReportForm.patchValue({ department: 'Sales' });
      this.salesReportForm.patchValue({ deptId: 1 });
      this.reportName = 'ReInsurance Register';
      this.isVisiblefromtolocationdepartment = true;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblestockTransfer = false;
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.isVisibleDepartmentList = true;
      }
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblepanelfromtolocation1 = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
    else if (reportName === 'gstPurRegister') {
      this.reportName = 'Purchase Register Details';
      this.salesReportForm.patchValue({ department: 'Sales' });
      this.salesReportForm.patchValue({ deptId: 1 });
      this.isVisiblefromtolocationdepartment = true;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblestockTransfer = false;
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.isVisibleDepartmentList = true;
      }
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblepanelfromtolocation1 = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
    else if (reportName === 'vehicleClosingStockAsOn') {
      this.reportName = 'Vehicle Closing Stock As on Date';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = true;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
      this.isVisiblepanelfromtolocation1 = false;
    }
    else if (reportName === 'deliverySummary') {
      this.reportName = 'Delivery Summary Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = true;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
      this.isVisiblepanelfromtolocation1 = false;
    }
    else if (reportName === 'fscCouponData') {
      this.reportName = 'FSC Coupon Data Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = true;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
      this.isVisiblepanelfromtolocation1 = false;
    }

    else if (reportName === 'salesPendingPayment') {
      this.reportName = 'Sales Pending Payment Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = true;
      this.inVisiblepanelSaleSaiDebtors = false;
      this.isVisiblepanelfromtolocation1 = false;
    }
    else if (reportName === 'salesBookingCancReport') {
      this.reportName = 'Sales Booking Cancellation Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = true;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
      this.isVisiblepanelfromtolocation1 = false;
    }

    else if (reportName === 'salesRtoRegister') {
      this.reportName = 'Sales RTO Register';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = true;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
      this.isVisiblepanelfromtolocation1 = false;
    }
    else if (reportName === 'pendBookingChetakLy') {
      this.reportName = 'Chetak Pending Booking-Last Year'
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = true;
      this.isVisiblepanelfromtolocation1 = false;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }

    else if (reportName === 'receiptOtherDetails') {
      this.reportName = 'Receipt-Other Details Report'
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.ispanelTolocationOu = false;
      this.isSaleClosingStock = false;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
      this.isVisiblepanelfromtolocation1 = true;
    }
    else if (reportName === 'saleSOALinewiseReport') {
      this.reportName = 'Sales SOA LineWise Report';
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.ispanelTolocationOu = false;
      this.isSaleClosingStock = false;
      this.salesReportForm.patchValue({ department: 'Sales' });
      this.salesReportForm.patchValue({ deptId: 1 });
      this.isVisiblefromtolocationdepartment = true;
      this.isVisiblestockTransfer = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
      this.isVisiblepanelfromtolocation1 = false;
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.isVisibleDepartmentList = true;
      }
    }
    else if (reportName === 'gstsaiDebtorsAsOf') {
      this.reportName = 'Sale Debtor Report As Of';
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isVisiblegstsaiDebtors = true;
      this.ispanelTolocationOu = false;
      this.isSaleClosingStock = false;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.inVisiblepanelSaleSaiDebtors = false;
      this.isVisiblepanelfromtolocation1 = false;
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.isVisibleDepartmentList = true;
      }
    }
    else if (reportName ==='saleQtyChartForVehicle'){
      this.reportName = 'Sales Qty Chart for Vehicle';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = true;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblepanelfromtolocation1 = false;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
    else if(reportName=='salesInvoiceCan'){
      this.reportName = 'Sales Invoice Cancellation Report';
      this.isVisiblefromtolocationdepartment = false;
      this.isVisibleVehicleSaleRegister = false;
      this.isVisibleSaleIND = false;
      this.isSaleClosingStock = false;
      this.isVisiblestockTransfer = false;
      this.isVisiblecustomerLedger = false;
      this.isVisiblefromtoloccustaccno = false;
      this.isVisibleSalesInventoryAging = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblepanelreceiptNo = false;
      this.isVisiblepanelSalesAddonReconciliation = false;
      this.isVisiblefromtosubinventory = false;
      this.panelamcHistrory = false;
      this.ispanelTolocationOu = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblepanelfromtolocation1 = true;
      this.inVisiblepanelSaleSaiDebtors = false;
    }
  }



  toDateValidation(tDate) {
    this.rptValidation = true;

    if (tDate == null || tDate == undefined || tDate.trim() == '') { this.rptValidation = false; }

    if (this.rptValidation == false) {
      alert("Please Check Date..");
      this.closeResetButton = true;
      this.dataDisplay = '';
      this.isDisabled1 = false;
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
    var fDate = this.salesReportForm.get('fromDate').value;
    var tDate = this.salesReportForm.get('toDate').value;
    if (locId === null) {
      alert('Please Select location Code.!');
      return;
    }
    if (deptId ===undefined){
      deptId =''
    }
    if (reportName === 'Vehicle Sales Register') {
      const fileName = 'Vehicle Sales Register-' +  fromDate + '-TO-' + toDate + '.xls';
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
      const fileName = 'Sales Invoiced Not Delivered-' +  '-TO-' + toDate + '.xls';
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
      const fileName = 'Sales Booking Register-' +  fromDate + '-TO-' + toDate + '.xls';
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
      const fileName = 'Sales Alloted Not Invoiced Report-' +  '-TO-' + toDate + '.xls';
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
      const fileName = 'Vehicle Closing Stock-' +  '-TO-' + '.xls';
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
    else if (reportName === 'Vehicle Closing Stock-New') {
      const fileName = 'Vehicle Closing StockNew-' +  '-TO-' + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.vehicleClosingStockReportNew(sessionStorage.getItem('ouId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.vehicleClosingStockReportNew(sessionStorage.getItem('ouId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
    }

    else if (reportName === 'GST Sales Register') {
      const fileName = 'GST Sales Register-' +  '-TO-' + '.xls';
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
      // debugger;
      const fileName = 'Sai Debtors-' +  fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        if (deptId === null || deptId == undefined || deptId == '') {
          alert('Please Select Department ID.!');
          this.dataDisplay = 'Please Select Department ID.....Do not refresh the Page';
          this.isDisabled1 = false;
          this.closeResetButton = true;
          return;

        }
        var deptId1 = this.salesReportForm.get('deptId1').value;
        this.reportService.SPDebtorReport(toDate, sessionStorage.getItem('ouId'), locId, custAccNo, deptId1, this.age1, this.age2, this.age3, this.age4)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.SPDebtorReport(toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), custAccNo, sessionStorage.getItem('deptId'), 0, 0, 0, 0)
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
        this.reportService.spReceiptRegisterReport(fromDate, toDate, sessionStorage.getItem('ouId'), locId, deptId)
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
        this.reportService.customerLedger(fromDate, toDate, custAccNo, sessionStorage.getItem('ouId'), deptId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          });
      }
      else if ((Number(sessionStorage.getItem('deptId')) != 4)) {
        this.reportService.customerLedger(fromDate, toDate, custAccNo, sessionStorage.getItem('ouId'), sessionStorage.getItem('deptId'))
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
      var subInventory = 'VH';
      const fileName = 'Stock Transfer Made Detail Report-' +  fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.stockMadeDetailsReport(fromDate, toDate, locId, tolocId, subInventory, sessionStorage.getItem('deptId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.stockMadeDetailsReport(fromDate, toDate, sessionStorage.getItem('locId'), tolocId, subInventory, sessionStorage.getItem('deptId'))
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
      var subInventory = 'VH';
      const fileName = 'Stock Transfer Received Detail Report-' +  fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.SprStkTrfRecdDtlsReport(fromDate, toDate, locId, tolocId, subInventory, this.deptId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.SprStkTrfRecdDtlsReport(fromDate, toDate, sessionStorage.getItem('locId'), tolocId, subInventory, sessionStorage.getItem('deptId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName === 'Sales Stock Transfer Received Summary Report') {
      var tolocId = this.salesReportForm.get('tolocId').value;
      var subInventory = 'VH';
      const fileName = 'Sales Stock Transfer Received Summary Report-' +  fromDate + '.xls';
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
      const fileName = 'Sales Proforma Summary Report-' +  fromDate + '.xls';
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
      const fileName = 'Credit Note Register-' +  fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.creditNoteReg(fromDate, toDate, sessionStorage.getItem('ouId'), locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.creditNoteReg(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName === 'SubDealer-Sales Register Report') {
      var custAcctNo = this.salesReportForm.get('custAccNo').value;
      if (custAcctNo === undefined || custAcctNo === null) {
        custAcctNo = '';
      }
      const fileName = 'SubDealer-Sales Register Report-' +  fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.subDealerRep(fromDate, toDate, locId, custAcctNo)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.subDealerRep(fromDate, toDate, sessionStorage.getItem('locId'), custAcctNo)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName === 'Sales Aging Report') {
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
      const fileName = 'Spares Inventory Aging Report-' +  '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.salesAgingReport(sessionStorage.getItem('ouId'), spInvAging1, spInvAging2, spInvAging3)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.salesAgingReport(sessionStorage.getItem('ouId'), spInvAging1, spInvAging2, spInvAging3)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName === 'Sales Addon Register') {
      const fileName = 'Sales Addon Register-' +  '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.saleAddonRegister(fromDate, toDate, sessionStorage.getItem('ouId'), locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.saleAddonRegister(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }

    else if (reportName === 'EW Sales Register') {
      const fileName = 'EW Sales Register-' +  fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.EWSaleRegister(fromDate, toDate, sessionStorage.getItem('ouId'), locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
      if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.EWSaleRegister(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
    }
    else if (reportName === 'Reinsurance Receipt Print') {
      var receiptNo = this.salesReportForm.get('receiptNo').value;
      // alert(receiptNo)
      if (receiptNo == '' || receiptNo == null || receiptNo == undefined) {
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
    else if (reportName === 'Sales Addon Reconciliation') {
      var segment1 = this.salesReportForm.get('segment1').value;
      // alert(segment1)
      var segment2 = this.salesReportForm.get('segment2').value;
      var segment3 = this.salesReportForm.get('segment3').value;
      // var segment4 = this.salesReportForm.get('segment4').value;
      var segment4 = (this.salesReportForm.get('segment4').value).split('-')
      var segment5 = this.salesReportForm.get('segment5').value;
      const fileName = 'Sales Addon Reconciliation -' +  fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.reportService.salesAddonReconciliation(fromDate, toDate, segment1, segment2, segment3, segment4[0], segment5)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled1 = false;
        })
    }
    else if (reportName === 'Sub Inventory Transfer Received Report') {
      var subInvCode = this.salesReportForm.get('subInventory').value;
      // alert(subInvCode)
      const fileName = 'Sub Inventory Transfer Received Report-' +  fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if ((Number(sessionStorage.getItem('deptId')) === 4)) {
        this.reportService.SalesInvTransRecFuc(fromDate, toDate, locId, subInvCode)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if ((Number(sessionStorage.getItem('deptId'))) != 4) {
        this.reportService.SalesInvTransRecFuc(fromDate, toDate, sessionStorage.getItem('locId'), subInvCode)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName === 'Sub Inventory Transfer Made Report') {
      var subInvCode = this.salesReportForm.get('subInventory').value;
      // alert(subInvCode)
      const fileName = 'Sub Inventory Transfer Made Report-' +  fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if ((Number(sessionStorage.getItem('deptId')) === 4)) {
        this.reportService.spInvTransMadeFuc(fromDate, toDate, locId, subInvCode)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if ((Number(sessionStorage.getItem('deptId'))) != 4) {
        this.reportService.spInvTransMadeFuc(fromDate, toDate, sessionStorage.getItem('locId'), subInvCode)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName === 'IRN Generation Report') {
      const fileName = 'IRN Generation Report-' +  '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        var deptId = this.salesReportForm.get('deptId').value;
        this.reportService.irnGenerationReport(fromDate, toDate, sessionStorage.getItem('ouId'), locId, deptId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.irnGenerationReport(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), sessionStorage.getItem('deptId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName == 'AMC History Report') {
      var regNo = this.salesReportForm.get('regNo').value;
      if (regNo == undefined || regNo == null) {
        alert('Please Select Vehicle number.!');
        return;
      }
      const fileName = 'download.pdf';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.reportService.amcHistory(regNo, sessionStorage.getItem('ouId'))
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

    else if (reportName == 'Purchase Register Details') {
      const fileName = 'Purchase Register Details-' +  fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      // var departId=this.DepartmentList.filter(d=>d.code== this.locCode)
      // alert(deptId+this.locCode);
      var locaId = this.salesReportForm.get('locId').value;
      if (Number(sessionStorage.getItem('deptId')) == 4) {
        // this.reportService.sppurRegidetailReport(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), sessionStorage.getItem('deptId'))
        this.reportService.sppurRegidetailReport(fromDate, toDate, sessionStorage.getItem('ouId'), locaId, deptId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.sppurRegidetailReportSpares(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), sessionStorage.getItem('deptId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })

      }
    }
    else if (reportName == 'Vehicle Closing Stock As on Date') {
      const fileName = 'Vehicle Closing Stock As on Date-' +  fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.reportService.vehicleClosingStockAsOn(toDate, sessionStorage.getItem('ouId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled1 = false;
        })
    }
    else if (reportName == 'Delivery Summary Report') {
      const fileName = 'Delivery Summary Report-' +  fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number((sessionStorage.getItem('deptId'))) == 4) {
        this.reportService.deliverySummary(fromDate, toDate, sessionStorage.getItem('ouId'), locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number((sessionStorage.getItem('deptId'))) != 4) {
        this.reportService.deliverySummary(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }


    else if (reportName == 'FSC Coupon Data Report') {
      const fileName = 'FSC Coupon Data Report-' +  '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) == 4) {
        this.reportService.fscCouponData(fromDate, toDate, locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.fscCouponData(fromDate, toDate, sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }

    else if (reportName == 'Sales Pending Payment Report') {
      const fileName = 'Sales Pending Payment Report-' +  '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) == 4) {
        // this.reportService.salesPendingPymntReport(fromDate,toDate,locId,sessionStorage.getItem('ouId'))
        this.reportService.salesPendingPymntReport(toDate, locId, sessionStorage.getItem('ouId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.salesPendingPymntReport(toDate, sessionStorage.getItem('locId'), sessionStorage.getItem('ouId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }

    else if (reportName == 'Sales Booking Cancellation Report') {
      const fileName = 'Sales Booking Cancellation Report-' +  '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) == 4) {
        this.reportService.salesBookCancelReport(fromDate, toDate, locId, sessionStorage.getItem('ouId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.salesBookCancelReport(fromDate, toDate, sessionStorage.getItem('locId'), sessionStorage.getItem('ouId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName == 'Sales RTO Register') {
      const fileName = 'Sales RTO Register-' +  fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number((sessionStorage.getItem('deptId'))) == 4) {
        this.reportService.salesRTOReport(fromDate, toDate, sessionStorage.getItem('ouId'), locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number((sessionStorage.getItem('deptId'))) != 4) {
        this.reportService.salesRTOReport(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName === 'Chetak Pending Booking-Last Year') {
      const fileName = 'Chetak Pending Booking-LastYear-' +  '-TO-' + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.ChetakPendingBookingLastYear(sessionStorage.getItem('ouId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.ChetakPendingBookingLastYear(sessionStorage.getItem('ouId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
    }
    else if (reportName === 'Receipt-Other Details Report') {
      const fileName = 'Receipt-Other Details Report-' +  '-TO-' + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.receiptOtherDetails(fromDate, toDate, sessionStorage.getItem('ouId'), locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.receiptOtherDetails(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
    }

    else if (reportName === 'Sales SOA LineWise Report') {
      //  alert(deptId);
      const fileName = 'Sales SOA LineWise Report-' + sessionStorage.getItem('locName').replace(' ', '') + '-' + fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.saleSOALinewiseReport(fromDate, toDate, sessionStorage.getItem('ouId'), locId, deptId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.saleSOALinewiseReport(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), sessionStorage.getItem('deptId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }

    else if (reportName === 'Sale Debtor Report As Of') {
      // alert('Sale Debtor Report As Of')
      // var tDate =this.salesReportForm.get('toDate').value;
      this.isDisabled1 = false;
      // alert('Hello');
      this.toDateValidation(tDate); if (this.rptValidation == false) { return; }
      var custAccNo = this.salesReportForm.get('custAccNo').value;

      // if (custAccNo<=0 || custAccNo==undefined || custAccNo==null ) {
      //   this.closeResetButton=true;
      //   // this.dataDisplay = 'Please check Customer No.'
      //   return; }comment by vinita

      if (custAccNo <= 0 || custAccNo == undefined || custAccNo == null) {
        custAccNo = '';
      }


      var d1 = this.salesReportForm.get('toDate').value;
      var tDate1 = this.pipe.transform(d1, 'dd-MMM-y');
      var locId = this.salesReportForm.get('locId').value;

      var spDbAg1 = this.salesReportForm.get('age1').value;
      var spDbAg2 = this.salesReportForm.get('age2').value;
      var spDbAg3 = this.salesReportForm.get('age3').value;
      var spDbAg4 = this.salesReportForm.get('age4').value;

      if (spDbAg1 < 0 || spDbAg1 == null || spDbAg1 == undefined) { this.rptValidation = false; }
      if (spDbAg2 < 0 || spDbAg2 == null || spDbAg2 == undefined) { this.rptValidation = false; }
      if (spDbAg3 < 0 || spDbAg3 == null || spDbAg3 == undefined) { this.rptValidation = false; }
      if (spDbAg4 < 0 || spDbAg4 == null || spDbAg4 == undefined) { this.rptValidation = false; }

      if (spDbAg1 > spDbAg2) { this.rptValidation = false; }
      else if (spDbAg1 > spDbAg3) { this.rptValidation = false; }
      else if (spDbAg1 > spDbAg4) { this.rptValidation = false; }
      else if (spDbAg2 > spDbAg3) { this.rptValidation = false; }
      else if (spDbAg2 > spDbAg4) { this.rptValidation = false; }
      else if (spDbAg3 > spDbAg4) { this.rptValidation = false; }


      if (this.rptValidation == false) { this.closeResetButton = true; this.dataDisplay = 'Please check Aging Values.'; return; }
      this.isDisabled1 = true;
      const fileName = 'Sales-Debtors-' +  fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);

      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.gstsaiDebtorsAsOf1(tDate1, sessionStorage.getItem('ouId'), locId, custAccNo, deptId, spDbAg1, spDbAg2, spDbAg3, spDbAg4)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          });
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.gstsaiDebtorsAsOf1(tDate1, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), custAccNo, deptId, spDbAg1, spDbAg2, spDbAg3, spDbAg4)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          });
      }
    }
    else if (reportName === 'Sales Qty Chart for Vehicle'){
      const fileName = 'Sales Qty Chart for Vehicle Report-' +  fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.saleqtyChartForVh(fromDate, toDate, locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.saleqtyChartForVh(fromDate, toDate, sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName === 'Sales Invoice Cancellation Report') {
      //  alert(deptId);
      const fileName = 'Sales Invoice Cancellation Report-' + sessionStorage.getItem('locName').replace(' ', '') + '-' + fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.salesInvoiceCanFn(fromDate, toDate, sessionStorage.getItem('ouId'), locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.salesInvoiceCanFn(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
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
      // alert(sessionStorage.getItem('deptId'))
      if (Number(sessionStorage.getItem('deptId')) != 4){
      let department = this.DepartmentList.filter((customer) => ((customer.codeDesc.includes('Sales') == true)));
      console.log(department);
      this.DepartmentList = department;
      this.department = department.code;
    }
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
    const fileName = 'Vehicle Sales Register-' +  fromDate + '-TO-' + toDate + '.xls';
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
    const fileName = 'Sales Invoiced Not Delivered-' +  '-TO-' + toDate + '.xls';

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
    const fileName = 'Sales Booking Register-' +  fromDate + '-TO-' + toDate + '.xls';

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
    const fileName = 'Sales Alloted Not Invoiced Report-' +  '-TO-' + toDate + '.xls';
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
    const fileName = 'Vehicle Closing Stock-' +  '-TO-' + '.xls';

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
    const fileName = 'Vehicle Closing Stock-' +  '-TO-' + '.xls';

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
    const fileName = 'SP-Debtors-' +  fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.SPDebtorReport(fromDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), sessionStorage.getItem('deptId'), sessionStorage.getItem('deptId'), 0, 0, 0, 0)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled2 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
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



  // onOptionsSelectedBranch(segment: any, lType: string) {
  //   // alert(segment+'----'+lType);
  //   this.service.getInterBranch(segment, lType).subscribe(
  //     data => {
  //       this.branch = data;
  //       console.log(this.branch);
  //       if (this.branch != null) {
  //         if (lType === 'SS_Interbranch') {
  //           this.lookupValueDesc5 = this.branch.lookupValueDesc;
  //         }
  //         if (lType === 'CostCentre') {
  //           this.lookupValueDesc3 = this.branch.lookupValueDesc;
  //         }
  //         if (lType === 'SS_Location') {
  //           this.lookupValueDesc2 = this.branch.lookupValueDesc;
  //         }
  //         if (lType === 'SS_Branch') {
  //           // this.lookupValueDesc1 = this.branch.lookupValueDesc;
  //           this.lookupValueDesc1 = this.branch.lookupValueDesc;
  //           var sellBr = this.BranchList.find(d => d.lookupValue === segment);
  //           // console.log(sellBr);       
  //           this.locIdList1 = this.locIdList1.filter((br => br.lookupValue.includes(sellBr.parentValue) || br.lookupValue === "000"));
  //         }
  //       }
  //     }
  //   );

  // }

  getNaturalAccount($event) {
    let userId = (<HTMLInputElement>document.getElementById('NaturalAccountFirstWay')).value;
    this.userList3 = [];
    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown3 > 200) {
        this.userList3 = this.searchFromArray2(this.NaturalAccountList, userId);
      }
    }
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
          if (lType === 'NaturalAccount') {
            this.lookupValueDesc4 = this.branch.lookupValueDesc;
            //   // this.GlCodeCombinaionForm.patchValue(this.branch);
            //  this.accountType=this.branch.accountType;
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



  onOptionsSelectedNatural(event) {
    if (event != undefined || event != null) {
      var naArr = event.split('-');
      this.lookupValueDesc4 = naArr[1];
      if (naArr[0].length > 4) {
        this.service.getInterBranchNewApi(naArr[0]).subscribe(
          data => {
            this.InterBrancList = data.obj;
          })
      }
    }
  }

  // getNaturalAccount($event) {
  //   let userId = (<HTMLInputElement>document.getElementById('NaturalAccountFirstWay')).value;
  //   this.userList3 = [];
  //   if (userId.length > 2) {
  //     if ($event.timeStamp - this.lastkeydown3 > 200) {
  //       this.userList3 = this.searchFromArray2(this.NaturalAccountList, userId);
  //     }
  //   }
  // }


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

  // onOptionsSelectedBranchNew(event) {
  //   if (event != undefined) {
  //     let selectinterbranch = this.InterBrancList.find(v => v.lookupValue == event);
  //     console.log(selectinterbranch);
  //     this.lookupValueDesc5 = selectinterbranch.lookupValueDesc;
  //   }
  // }

  // onOptionsSelectedNatural(event) {
  //   alert(event)
  //   if (event != undefined) {
  //     let selectnaturalaccount = this.NaturalAccountList.find(v => v.naturalaccount == event);
  //     console.log(selectnaturalaccount);
  //     this.lookupValueDesc4 = selectnaturalaccount.description;
  //     this.service.getInterBranchNewApi(event).subscribe(
  //       data => {
  //         this.InterBrancList = data.obj
  //       })
  //   }


  // }


  onOptionsDepartmentList(event: string) {
    // alert(event);
    var deptList = this.DepartmentList.find(d => d.code === event);
    console.log(deptList);

    this.salesReportForm.patchValue({ deptId: deptList.cmnTypeId })
  }

}
