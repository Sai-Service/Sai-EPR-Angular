import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, FormControlName } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReportServiceService} from 'src/app/report/report-service.service'
import { DatePipe } from '@angular/common';
import { data, get } from 'jquery';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location, } from "@angular/common";
import * as xlsx from 'xlsx';


@Component({
  selector: 'app-all-reports',
  templateUrl: './all-reports.component.html',
  styleUrls: ['./all-reports.component.css']
})
export class AllReportsComponent implements OnInit {
  reportForm: FormGroup;
  public minDate = new Date();
  // invcDt1:Date;
  location:string;
  decimal_value:number;
  sidfromDate:Date;
  sidtoDate:Date;
  spIssueSummfromDate:Date;
  spstktrfMdSumToLoc:number;
  spIssueSummtoDate:Date;
  spstktrfMdToLoc:number;
  public BillShipList: Array<string> = [];

  pipe = new DatePipe('en-US');
  now = new Date();
  invcDt1 = this.pipe.transform(this.now, 'dd-MM-yyyy');

  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private reportService: ReportServiceService) {
    this.reportForm = this.fb.group({ 
      invcDt1:[],
      location:[],
      spreceiptfromDate:[],
      deptId:[],
      spreceipttoDate:[],
      sidfromDate:[],
      sidtoDate:[],
      spIssueSummfromDate:[],
      spIssueSummtoDate:[],
      performatoDate:[],
      performafromDate:[],
      spstktrfMdfromDate:[],
      spstktrfMdtoDate:[],
      spstktrfMdToLoc:[],
      spstktrfMdSumfromDate:[],
      spstktrfMdSumtoDate:[],
      spstktrfMdSumToLoc:[],
    })
  }

  report(reportForm) {   
  }

  ngOnInit(): void {
   this.decimal_value=100.8999777789; 
  //  this.reportForm.patchValue({ location: sessionStorage.getItem('locId') });
   this.reportForm.patchValue({ deptId: sessionStorage.getItem('deptName') });
  this.reportForm.patchValue({ location: sessionStorage.getItem('locCode') });


   this.reportService.getLocationSearch1(sessionStorage.getItem('ouId'))
   .subscribe(
     data => {
       this.BillShipList = data;
       console.log(this.BillShipList);
     }
   );
  }
  SPdebtorsReport(){
    var invcDt2 = this.reportForm.get('invcDt1').value;
    var invcDt1 = this.pipe.transform(invcDt2, 'dd-MMM-yyyy');
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.SPDebtorReport(invcDt1,sessionStorage.getItem('locId'))
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      })
  }


  spReceiptRegister(){
    var spreceiptfromDate2 = this.reportForm.get('spreceiptfromDate').value;
    var fromDate = this.pipe.transform(spreceiptfromDate2, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.reportForm.get('spreceipttoDate').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spReceiptRegisterReport(fromDate,toDate,sessionStorage.getItem('locId'),sessionStorage.getItem('deptId'))
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      })
  }



  spIssueDetails(){
    var invcDt2 = this.reportForm.get('sidfromDate').value;
    var invcDt1 = this.pipe.transform(invcDt2, 'dd-MMM-yyyy');
    var invcDt3 = this.reportForm.get('sidtoDate').value;
    var invcDt4 = this.pipe.transform(invcDt3, 'dd-MMM-yyyy');
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spIssueDetailsReport(invcDt1,invcDt4,sessionStorage.getItem('locId'))
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      })
  }

  spIssueSummary(){
    var invcDt2 = this.reportForm.get('spIssueSummfromDate').value;
    var invcDt1 = this.pipe.transform(invcDt2, 'dd-MMM-yyyy');
    var invcDt3 = this.reportForm.get('spIssueSummtoDate').value;
    var invcDt4 = this.pipe.transform(invcDt3, 'dd-MMM-yyyy');
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spIssueSummaryReport(invcDt1,invcDt4,sessionStorage.getItem('locId'))
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      })
  }


  performaReg(){
    var invcDt2 = this.reportForm.get('performafromDate').value;
    var invcDt1 = this.pipe.transform(invcDt2, 'dd-MMM-yyyy');
    var invcDt3 = this.reportForm.get('performatoDate').value;
    var invcDt4 = this.pipe.transform(invcDt3, 'dd-MMM-yyyy');
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.performaRegister(invcDt1,invcDt4,sessionStorage.getItem('locId'))
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      })
  }


  spstktrfMd(spstktrfMdToLoc){
    var invcDt2 = this.reportForm.get('spstktrfMdfromDate').value;
    var invcDt1 = this.pipe.transform(invcDt2, 'dd-MMM-yyyy');
    var invcDt3 = this.reportForm.get('spstktrfMdtoDate').value;
    var invcDt4 = this.pipe.transform(invcDt3, 'dd-MMM-yyyy');
    // var spstktrfMdToLoc=this.reportForm.get('spstktrfMdToLoc');
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spstktrfMdReport(invcDt1,invcDt4,sessionStorage.getItem('locId'),spstktrfMdToLoc)
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      })
  }



  spstktrfMdSummary(spstktrfMdSumToLoc){
    var invcDt2 = this.reportForm.get('spstktrfMdSumfromDate').value;
    var invcDt1 = this.pipe.transform(invcDt2, 'dd-MMM-yyyy');
    var invcDt3 = this.reportForm.get('spstktrfMdSumtoDate').value;
    var invcDt4 = this.pipe.transform(invcDt3, 'dd-MMM-yyyy');
    // var spstktrfMdToLoc=this.reportForm.get('spstktrfMdSumToLoc');
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spstktrfMdSummaryReport(invcDt1,invcDt4,sessionStorage.getItem('locId'),spstktrfMdSumToLoc)
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      })
  }
  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }
}
