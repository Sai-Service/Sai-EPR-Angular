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
  public DepartmentList: any = [];
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  isVisibleCashCollectionExcessShort:boolean=false;
  isVisiblegstsaiDebtors:boolean=false;
  rptValidation=true;
  isVisiblelocationInput: boolean = true;
  isVisiblelocationLOV: boolean = false;
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

  reportDetails(reportName) {

    if (reportName === 'CashCollectionExcessShort') {
      this.reportName='Cash Collection-Excess Short Report';
      this.isVisibleCashCollectionExcessShort=true;
      this.isVisiblegstsaiDebtors=false;
    }
    if (reportName==='gstsaiDebtors'){
      this.reportName='Debtor Report';
      this.isVisiblegstsaiDebtors=true;
      this.isVisibleCashCollectionExcessShort=false;
    }
    if (reportName==='cashCardSum'){
      this.reportName='Cash Card Summary Report';
      this.isVisibleCashCollectionExcessShort=true;
      this.isVisiblegstsaiDebtors=false;
    }
    if (reportName==='cashCardDet'){
      this.reportName='Cash Card Detail Report';
      this.isVisibleCashCollectionExcessShort=true;
      this.isVisiblegstsaiDebtors=false;
    }
    if (reportName==='saleRegisterCustomerWise'){
      this.reportName='Sales Register - Customer Wise';
      this.isVisibleCashCollectionExcessShort=true;
      this.isVisiblegstsaiDebtors=false;
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
