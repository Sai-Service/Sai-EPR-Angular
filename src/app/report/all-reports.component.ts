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
import { MasterService } from 'src/app/master/master.service';

interface IAdmin {
  searchItemId  :number;
  searchItemCode: string;
  searchItemName: string;
}

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
  sppurRegiSummfromDate:Date;
  sppurRegiSummtoDate:Date;
  public BillShipList: Array<string> = [];
  public BillShipFromList: Array<string> = [];
  public BillShipToList: Array<string> = [];

  pipe = new DatePipe('en-US');
  now = new Date();
  invcDt1 = this.pipe.transform(this.now, 'dd-MM-yyyy');
  public ItemIdList:any[];
  userList2: any[] = [];
  lastkeydown1: number = 0;
  searchItemId  :number;
  searchItemName: string;
  searchItemCode: string;
  stkLgrUserName:string;
  stklgrsubInv:string;
  stockLegfromDate:Date;
  stockLegtoDate:Date;
  spIssSmryfromDate:Date;
  spIssSmrytoDate:Date; 
  spproformafromDate:Date;
  spproformatoDate:Date;
  spcreditnotregtoDate:Date;
  spcreditnotregfromDate:Date;
  sppurRegidetailfromDate:Date;
  sppurRegidetailtoDate:Date;
  spstktrfRecivedfromDate:Date;
  spstktrfRecivedToDate:Date;
  spstktrfRecivedToLoc:number;
  spstktrfRecivedFromLoc:number;
  spstktrfRecivedSumfromDate:Date;
  spstktrfRecivedSumToDate:Date;
  spstktrfRecivedSumToLoc:number;
  spstktrfRecivedSumFromLoc:number;

  constructor(private fb: FormBuilder, private router: Router,private service: MasterService, private location1: Location, private router1: ActivatedRoute, private reportService: ReportServiceService) {
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
      searchItemCode: [],
  stkLgrUserName:[],
  stklgrsubInv:[],
  stockLegfromDate:[],
  stockLegtoDate:[],
  spIssSmryfromDate:[],
  spIssSmrytoDate:[], 
  spproformafromDate:[],
  spproformatoDate:[],
  spcreditnotregfromDate:[],
  spcreditnotregtoDate:[],
  sppurRegiSummfromDate:[],
  sppurRegiSummtoDate:[],
  sppurRegidetailtoDate:[],
  sppurRegidetailfromDate:[],
  spstktrfRecivedToDate:[],
  spstktrfRecivedfromDate:[],
  spstktrfRecivedToLoc:[],
  spstktrfRecivedFromLoc:[],
  spstktrfRecivedSumfromDate:[],
  spstktrfRecivedSumToDate:[],
  spstktrfRecivedSumToLoc:[],
  spstktrfRecivedSumFromLoc:[],
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

   this.service.ItemIdDivisionList(sessionStorage.getItem('divisionId')).subscribe(
    data =>{ this.ItemIdList = data;
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


  getInvItemId($event)
  {
    // alert('in getInvItemId')
     let userId=(<HTMLInputElement>document.getElementById('invItemIdFirstWay')).value;
     this.userList2=[];
     if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList2 = this.searchFromArray1(this.ItemIdList, userId);
      }
    }
  }
  searchFromArray1(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };


  onOptioninvItemIdSelectedSingle(mItem) {
    // alert ("in fn onOptioninvItemIdSelectedSingle "+mItem);

    let selectedValue = this.ItemIdList.find(v => v.SEGMENT == mItem);
      if( selectedValue != undefined){
       console.log(selectedValue);
      this.searchItemId=selectedValue.itemId;
      this.searchItemName=selectedValue.DESCRIPTION;
      this.searchItemCode=selectedValue.SEGMENT;
    }
    // alert(selectedValue.itemId+","+selectedValue.DESCRIPTION+","+selectedValue.SEGMENT);

  }




  stklgrt(stklgrsubInv,searchItemCode,stkLgrUserName){
    // alert(stklgrsubInv,searchItemCode,stkLgrUserName);
    var invcDt2 = this.reportForm.get('stockLegfromDate').value;
    var invcDt1 = this.pipe.transform(invcDt2, 'dd-MMM-yyyy');
    var invcDt3 = this.reportForm.get('stockLegtoDate').value;
    var invcDt4 = this.pipe.transform(invcDt3, 'dd-MMM-yyyy');
    // var subInv =this.reportForm.get('stklgrsubInv');
//  var segment=this.reportForm.get('searchItemCode');
    // alert(stklgrsubInv+'----'+searchItemCode+'----'+stkLgrUserName)
    // var spstktrfMdToLoc=this.reportForm.get('spstktrfMdSumToLoc');
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.stklgrtReport(invcDt1,invcDt4,stklgrsubInv,searchItemCode,sessionStorage.getItem('locId'),stkLgrUserName)
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      })
  }


  spIssSmry(){
    var spreceiptfromDate2 = this.reportForm.get('spIssSmryfromDate').value;
    var fromDate = this.pipe.transform(spreceiptfromDate2, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.reportForm.get('spIssSmrytoDate').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spIssSmryReport(fromDate,toDate,sessionStorage.getItem('locId'))
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      })
  }


  spproforma(){
    var spreceiptfromDate2 = this.reportForm.get('spproformafromDate').value;
    var fromDate = this.pipe.transform(spreceiptfromDate2, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.reportForm.get('spproformatoDate').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spproformaReport(fromDate,toDate,sessionStorage.getItem('locId'))
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      })
  }


  spcreditnotreg(){
    var spreceiptfromDate2 = this.reportForm.get('spcreditnotregfromDate').value;
    var fromDate = this.pipe.transform(spreceiptfromDate2, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.reportForm.get('spcreditnotregtoDate').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spcreditnotregReport(fromDate,toDate,sessionStorage.getItem('locId'))
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      })
  }


  sppurRegiSumm(){
    var spreceiptfromDate2 = this.reportForm.get('sppurRegiSummfromDate').value;
    var fromDate = this.pipe.transform(spreceiptfromDate2, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.reportForm.get('sppurRegiSummtoDate').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.sppurRegiSummReport(fromDate,toDate,sessionStorage.getItem('locId'),sessionStorage.getItem('deptId'))
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      })
  }


  sppurRegidetail(){
    var spreceiptfromDate2 = this.reportForm.get('sppurRegidetailfromDate').value;
    var fromDate = this.pipe.transform(spreceiptfromDate2, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.reportForm.get('sppurRegidetailtoDate').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.sppurRegidetailReport(fromDate,toDate,sessionStorage.getItem('locId'),sessionStorage.getItem('deptId'))
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      })
  }


  spclosstrock(){
    // var spreceiptfromDate2 = this.reportForm.get('sppurRegidetailfromDate').value;
    // var fromDate = this.pipe.transform(spreceiptfromDate2, 'dd-MMM-yyyy');
    // var spreceipttoDate2 = this.reportForm.get('sppurRegidetailtoDate').value;
    // var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spclosstrockReport(sessionStorage.getItem('locId'))
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      })
  }


  spstktrfRecived(){
    var spreceiptfromDate2 = this.reportForm.get('spstktrfRecivedfromDate').value;
    var fromDate = this.pipe.transform(spreceiptfromDate2, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.reportForm.get('spstktrfRecivedToDate').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
   var shipFromLocId=this.reportForm.get('spstktrfRecivedFromLoc').value
   var shipToLocId=this.reportForm.get('spstktrfRecivedToLoc').value
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spstktrfRecivedReport(fromDate,toDate,shipFromLocId,shipToLocId)
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      })
  }


  spstktrfRecivedSum(){
    var spreceiptfromDate2 = this.reportForm.get('spstktrfRecivedSumfromDate').value;
    var fromDate = this.pipe.transform(spreceiptfromDate2, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.reportForm.get('spstktrfRecivedSumToDate').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
   var shipFromLocId=this.reportForm.get('spstktrfRecivedSumToLoc').value
   var shipToLocId=this.reportForm.get('spstktrfRecivedSumFromLoc').value
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spstktrfRecivedSumReport(fromDate,toDate,shipFromLocId,shipToLocId)
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
