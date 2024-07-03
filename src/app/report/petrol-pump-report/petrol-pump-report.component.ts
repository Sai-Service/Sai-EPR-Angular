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
  selector: 'app-petrol-pump-report',
  templateUrl: './petrol-pump-report.component.html',
  styleUrls: ['./petrol-pump-report.component.css']
})

export class PetrolPumpReportComponent implements OnInit {
  petrolPumpReportForm: FormGroup;
  pipe = new DatePipe('en-US');
  now = new Date();
  public minDate = new Date();
  fromDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  toDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  OUCode: string;
  locCode: string;
  subInvCode: any;
  subInventory: string;

  public DepartmentList: any = [];
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  isVisibleCashCollectionExcessShort:boolean=false;
  isVisiblegstsaiDebtors:boolean=false;
  rptValidation=true;
  isVisiblelocationInput: boolean = true;
  isVisiblelocationLOV: boolean = false;
  isVisiblesparesMiscIssueReceipt: boolean = false;
  isDisabled1 = false;
  isVisibleonlyLocationCode = false;
  isVisibleGSTPurchaseRegister = false;
  isVisiblefromtosubinventory= false;
  isVisiblespPurRegDownLoad= false;
  isVisibleDepartmentList: boolean = false;



  public BillShipToList: Array<string> = [];
  age1: number=20;
  age2: number=30;
  age3: number=45;
  age4: number=60;
  custAccNo:number;


  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private location1: Location, private router1: ActivatedRoute, private reportService: ReportServiceService) {
    this.petrolPumpReportForm = this.fb.group({
      fromDate: [''],
      toDate: [],
      age1: [],
  age2: [],
  age3: [],
  age4: [],
  custAccNo:[],
  department:[],
  deptId:[],
  locCode:[],
  locId:[],

  OUCode: [''],
  subInventory: [''],
    })
   }

  ngOnInit(): void {
    this.petrolPumpReportForm.patchValue({ OUCode: sessionStorage.getItem('ouId') + '-' + sessionStorage.getItem('ouName') })
    this.petrolPumpReportForm.patchValue({ locCode: sessionStorage.getItem('locId') + '-' + sessionStorage.getItem('locName') })
    this.petrolPumpReportForm.patchValue({ department: 'Petrol' });
    this.petrolPumpReportForm.patchValue({ deptId: 14 })
    $(document).on('click', '.dropdown-menu', function (e) {
      e.stopPropagation();
    });

   
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


    this.service.DepartmentListNew()
    .subscribe(
      data => {
        this.DepartmentList = data;
      }
    );


    this.service.getLocationSearch1(sessionStorage.getItem('ouId'))
    .subscribe(
      data => {
        this.BillShipToList = data;
      }
    );

    this.service.subInvCode2(sessionStorage.getItem('deptId'), sessionStorage.getItem('divisionId')).subscribe(
      data => {
        this.subInvCode = data;
        console.log(this.subInvCode);
        if (this.subInvCode.subInventoryCode != null) {
          this.subInventory = this.subInvCode.subInventoryCode;
          this.petrolPumpReportForm.patchValue({ subInventory: this.subInvCode.subInventoryCode })
        }
      });

  }


  department(department) {
    if (department === 'Spares') {
      let department = this.DepartmentList.filter((customer) => ((customer.codeDesc.includes('Spares') == true)));
      console.log(department);
      this.DepartmentList = department;
    }
  }


  petrolPumpReport(petrolPumpReportForm) {
  }


  reportName: string;

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

  reportDetails(reportName) {

    if (reportName === 'CashCollectionExcessShort') {
      this.reportName='Cash Collection-Excess Short Report';
      this.isVisibleCashCollectionExcessShort=true;
      this.isVisiblegstsaiDebtors=false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisibleonlyLocationCode = false;
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisiblefromtosubinventory= false;
      this.isVisiblespPurRegDownLoad=false;

    }
    if (reportName==='gstsaiDebtors'){
      this.reportName='Debtor Report';
      this.isVisiblegstsaiDebtors=true;
      this.isVisibleCashCollectionExcessShort=false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisibleonlyLocationCode = false;
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisiblefromtosubinventory= false;
      this.isVisiblespPurRegDownLoad=false;

    }
    if (reportName==='cashCardSum'){
      this.reportName='Cash Card Summary Report';
      this.isVisibleCashCollectionExcessShort=true;
      this.isVisiblegstsaiDebtors=false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisibleonlyLocationCode = false;
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisiblefromtosubinventory= false;
      this.isVisiblespPurRegDownLoad=false;

    }
    if (reportName==='cashCardDet'){
      this.reportName='Cash Card Detail Report';
      this.isVisibleCashCollectionExcessShort=true;
      this.isVisiblegstsaiDebtors=false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisibleonlyLocationCode = false;
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisiblefromtosubinventory= false;
      this.isVisiblespPurRegDownLoad=false;

    }
    if (reportName==='saleRegisterCustomerWise'){
      this.reportName='Sales Register - Customer Wise';
      this.isVisibleCashCollectionExcessShort=true;
      this.isVisiblegstsaiDebtors=false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisibleonlyLocationCode = false;
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisiblefromtosubinventory= false;
      this.isVisiblespPurRegDownLoad=false;

    }
    if (reportName==='salesTotCollReport'){
      // salesTotCollReport - Sales Total Collection Report(Daywise)
      this.reportName='Sales Total Collection Report(Daywise)';
      this.isVisibleCashCollectionExcessShort=true;
      this.isVisiblegstsaiDebtors=false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisibleonlyLocationCode = false;
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisiblefromtosubinventory= false;
      this.isVisiblespPurRegDownLoad=false;

    }
    if (reportName==='shiftEntryReport'){
      // shiftEntryReport - Shift Entry Report
      this.reportName='Shift Entry Report';
      this.isVisibleCashCollectionExcessShort=true;
      this.isVisiblegstsaiDebtors=false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisibleonlyLocationCode = false;
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisiblefromtosubinventory= false;
      this.isVisiblespPurRegDownLoad=false;

    }

    if (reportName==='saleRegisterPP'){
      // saleRegisterPP  -Sales Register - Petrol Pump
      this.reportName='Sales Register - Petrol Pump';
      this.isVisibleCashCollectionExcessShort=true;
      this.isVisiblegstsaiDebtors=false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisibleonlyLocationCode = false;
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisiblefromtosubinventory= false;
      this.isVisiblespPurRegDownLoad=false;

    }

    if (reportName==='gstsparesMiscIssueReceipt'){
      this.reportName='Pump Stock Adjustment Report';
      this.isVisibleCashCollectionExcessShort=false;
      this.isVisiblegstsaiDebtors=false;
      this.isVisiblesparesMiscIssueReceipt = true;
      this.isVisibleonlyLocationCode = false;
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisiblefromtosubinventory= false;
      this.isVisiblespPurRegDownLoad=false;

    }

    if (reportName==='gstClosingReport'){
      this.reportName='Pump Closing Stock Report';
      this.isVisibleCashCollectionExcessShort=false;
      this.isVisiblegstsaiDebtors=false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisibleonlyLocationCode = true;
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisiblefromtosubinventory= false;
      this.isVisiblespPurRegDownLoad=false;
     
  }

  if (reportName === 'gstPurRegister') {
    this.reportName = 'Pump Purchase Register Details';
    if (this.reportName === 'Pump Purchase Register Details') {
      this.isVisiblespPurRegDownLoad = true;
    }
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.isVisibleDepartmentList = true;
    }
    this.isVisibleCashCollectionExcessShort=false;
    this.isVisiblegstsaiDebtors=false;
    this.isVisiblesparesMiscIssueReceipt = false;
    this.isVisibleonlyLocationCode = false;
    this.isVisibleGSTPurchaseRegister = true;
    this.isVisiblefromtosubinventory= false;
    // this.isVisiblespPurRegDownLoad=false;
   
}

if (reportName === 'gstpurRegSumm') {
  this.reportName = 'Pump Purchase Register - Summary';
  if (Number(sessionStorage.getItem('deptId')) === 4) {
    this.isVisibleDepartmentList = true;
  }
  this.isVisibleCashCollectionExcessShort=false;
  this.isVisiblegstsaiDebtors=false;
  this.isVisiblesparesMiscIssueReceipt = false;
  this.isVisibleonlyLocationCode = false;
  this.isVisibleGSTPurchaseRegister = true;
  this.isVisiblefromtosubinventory= false;
  // this.isVisiblespPurRegDownLoad=false;
 
}

if (reportName === 'sparesSubinvTransReceived') {
  this.reportName = 'Sub Inventory Transfer Received Report';
  this.isVisibleCashCollectionExcessShort=false;
  this.isVisiblegstsaiDebtors=false;
  this.isVisiblesparesMiscIssueReceipt = false;
  this.isVisibleonlyLocationCode = false;
  this.isVisibleGSTPurchaseRegister = false;
  this.isVisiblefromtosubinventory= true;
  this.isVisiblespPurRegDownLoad=false;
}

if (reportName === 'sparesSubinvTransMade') {
      this.reportName = 'Sub Inventory Transfer Made Report';
      this.isVisibleCashCollectionExcessShort=false;
      this.isVisiblegstsaiDebtors=false;
      this.isVisiblesparesMiscIssueReceipt = false;
      this.isVisibleonlyLocationCode = false;
      this.isVisibleGSTPurchaseRegister = false;
      this.isVisiblefromtosubinventory= true;
      this.isVisiblespPurRegDownLoad=false;
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
    // this.isDisabled1=false; 
  }
}
  

  toDateValidation(tDate){
    this.rptValidation=true;
   
    if(tDate==null || tDate == undefined || tDate.trim() == ''){this.rptValidation=false;}

    if(this.rptValidation==false) {alert ("Please Check Date..");
    this.closeResetButton=true;
    this.dataDisplay='';
    // this.isDisabled1=false;
   }
  }


  reportParameter(reportName) {
    // alert(reportName)
    // alert ("....Report Not ready....wip");
    // return;
    // this.isDisabled1 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var purStDt = this.petrolPumpReportForm.get('fromDate').value;
    var fromDate = this.pipe.transform(purStDt, 'dd-MMM-yyyy');
    var toDate1 = this.petrolPumpReportForm.get('toDate').value;
    var toDate = this.pipe.transform(toDate1, 'dd-MMM-yyyy');
    var subInventory = this.petrolPumpReportForm.get('subInventory').value;
    var fDate =this.petrolPumpReportForm.get('fromDate').value;
    var tDate =this.petrolPumpReportForm.get('toDate').value;

    if (reportName === 'Cash Collection-Excess Short Report') {
      this.fromToDateValidation(fromDate,toDate); if(this.rptValidation==false){return;}
      const fileName = 'Cash Collection-Excess Short-' +  fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.reportService.CashCollectionExcessShortFn(fromDate, toDate, sessionStorage.getItem('locId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
    }
   
else if (reportName === 'Cash Card Summary Report'){
  this.fromToDateValidation(fromDate,toDate); if(this.rptValidation==false){return;}
  const fileName = 'Cash Card Summary Report-' +  fromDate + '.xls';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  this.reportService.cashCardSumFn(fromDate, toDate, sessionStorage.getItem('locId'))
  .subscribe(data => {
    saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
    this.closeResetButton = true;
    this.dataDisplay = ''
  })
}

else if (reportName === 'Cash Card Detail Report'){
  this.fromToDateValidation(fromDate,toDate); if(this.rptValidation==false){return;}
  const fileName = 'Cash Card Detail Report-' +  fromDate + '.xls';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  this.reportService.cashCardDetFn(fromDate, toDate, sessionStorage.getItem('locId'))
  .subscribe(data => {
    saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
    this.closeResetButton = true;
    this.dataDisplay = ''
  })
}
else if (reportName === 'Sales Register - Customer Wise'){
  this.fromToDateValidation(fromDate,toDate); if(this.rptValidation==false){return;}
  const fileName = 'Sales Register - Customer Wise-' +  fromDate + '.xls';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  this.reportService.saleRegisterCustomerWiseFn(fromDate, toDate, sessionStorage.getItem('locId'))
  .subscribe(data => {
    saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
    this.closeResetButton = true;
    this.dataDisplay = ''
  })
}

else if (reportName === 'Sales Total Collection Report(Daywise)'){
  // salesTotCollReport - Sales Total Collection Report(Daywise)
  this.fromToDateValidation(fromDate,toDate); if(this.rptValidation==false){return;}
  const fileName = 'Sales Total Collection Report(Daywise)-' +  fromDate + '.xls';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  this.reportService.saleTotalCollectionReport_PP(fromDate, toDate, sessionStorage.getItem('locId'))
  .subscribe(data => {
    saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
    this.closeResetButton = true;
    this.dataDisplay = ''
  })
}

else if (reportName === 'Shift Entry Report'){
  // salesTotCollReport - Sales Total Collection Report(Daywise)
  this.fromToDateValidation(fromDate,toDate); if(this.rptValidation==false){return;}
  const fileName = 'Shift Entry Report' +  fromDate + '.xls';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  this.reportService.shiftEntryReport_PP(fromDate, toDate, sessionStorage.getItem('locId'))
  .subscribe(data => {
    saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
    this.closeResetButton = true;
    this.dataDisplay = ''
  })
}

else if (reportName === 'Sales Register - Petrol Pump'){
  // salesTotCollReport - Sales Total Collection Report(Daywise)
  this.fromToDateValidation(fromDate,toDate); if(this.rptValidation==false){return;}
  const fileName = 'Sales Register - Petrol Pump' +  fromDate + '.xls';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  this.reportService.saleRegisterReport_PP(fromDate, toDate, sessionStorage.getItem('locId'))
  .subscribe(data => {
    saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
    this.closeResetButton = true;
    this.dataDisplay = ''
  })
}

    else if (reportName ==='Debtor Report'){
     
      var custAccNo=' ';
      var deptId = this.petrolPumpReportForm.get('custAccNo').value;
      if (custAccNo === undefined || custAccNo === null) {
        custAccNo = '';
      }

      var d1= this.petrolPumpReportForm.get('toDate').value;   
      var tDate1 = this.pipe.transform(d1, 'dd-MMM-y');
      var locId= this.petrolPumpReportForm.get('locId').value;
      var spDbAg1= this.petrolPumpReportForm.get('age1').value;
      var spDbAg2= this.petrolPumpReportForm.get('age2').value;
      var spDbAg3= this.petrolPumpReportForm.get('age3').value;
      var spDbAg4= this.petrolPumpReportForm.get('age3').value;
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
      var deptId=this.petrolPumpReportForm.get('deptId').value;
      if (deptId===null){deptId=''}
    if(this.rptValidation ==false) {this.closeResetButton=true;this.dataDisplay = 'Please check Aging Values.';  return; }
      const fileName = 'SP-Debtors-' +  fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
        this.reportService.SPDebtorReport(tDate1, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'),custAccNo,deptId,spDbAg1,spDbAg2,spDbAg3,spDbAg4)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.closeResetButton = true;
            this.dataDisplay = ''
          });
     }

     else if (reportName === 'Pump Stock Adjustment Report') {
      this.fromToDateValidation(fromDate,toDate); if(this.rptValidation==false){return;}

      const fileName = 'Pump Stock Adjustment Report-' +  fromDate + '.xls';
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
    else if (reportName === 'Pump Closing Stock Report') {
      const fileName = 'PUMP-Closing-Stock-' + sessionStorage.getItem('locName').trim() + '.xls';
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

   else if (reportName === 'Pump Purchase Register Details') {

      this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

      if (Number(sessionStorage.getItem('deptId')) === 4) {
        const fileName = 'Pump Purchase Register Details-' +  fromDate + '-TO-' + toDate + '.xls';
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
        const fileName = 'Pump Purchase Register Details-' +  fromDate + '-TO-' + toDate + '.xls';
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
    else if (reportName === 'Pump Purchase Register - Summary') {
      this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}

      const fileName = 'Pump Purchase Register - Summary-' + sessionStorage.getItem('locName').replace(' ', '') + '-' + fromDate + '-TO-' + toDate + '.xls';
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

    else if (reportName==='Sub Inventory Transfer Received Report'){
          this.closeResetButton = true;
          this.dataDisplay = ''
          alert("Sub Inventory Transfer Received Report...WIP....");return;

      this.fromToDateValidation(fDate,tDate); if(this.rptValidation==false){return;}
      // alert ("this.rptValidation:"+this.rptValidation)
      // alert (" sessionStorage.getItem('deptId')"+ sessionStorage.getItem('deptId'))

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
          this.closeResetButton = true;
          this.dataDisplay = ''
          alert("Sub Inventory Transfer Made Report...WIP....");return;
          
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

    


    // ------------------------------------------------------------
  }


  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }


  onOptionsLocation(event) {
    // alert("From Location : "+ event);
    this.petrolPumpReportForm.patchValue({ locId: event })
    // this.paintReportForm.patchValue({ fromLocId: event })

    if(event>0){
      var x=this.petrolPumpReportForm.get('locCode').value;
      var y=this.petrolPumpReportForm.get('tolocCode').value;
      if(x===y) {alert ("From/To Locations Should not be Same...");
       this.petrolPumpReportForm.get('locCode').reset();
      return;
    }}
  

  }



  onOptionsDepartmentList(event: string) {
    // alert(event);
    var deptList = this.DepartmentList.find(d => d.code === event);
    console.log(deptList);

    this.petrolPumpReportForm.patchValue({ deptId: deptList.cmnTypeId })
  }

}
