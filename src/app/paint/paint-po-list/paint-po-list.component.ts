import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service'
import { DatePipe } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location, } from "@angular/common";
import * as xlsx from 'xlsx';


@Component({
  selector: 'app-paint-po-list',
  templateUrl: './paint-po-list.component.html',
  styleUrls: ['./paint-po-list.component.css']
})
export class PaintPoListComponent implements OnInit {
  paintPoPendingListForm: FormGroup;

  pipe = new DatePipe('en-US');
  poDetails: any = [];
  today = new Date();

  // startDt = this.pipe.transform(this.today, 'dd-MMM-yyyy');
  // endDt = this.pipe.transform(this.today, 'dd-MMM-yyyy');

  

  // endDt1.setDate(endDt1.getDate() + 1);

  startDt = this.pipe.transform(Date.now(), 'y-MM-dd');
  endDt = this.pipe.transform(Date.now(), 'y-MM-dd');

  minDate = new Date();
 
  isPending: Array<boolean> = [];
  isVisibledeptAndLocation: boolean = false;
  displaySegment: boolean;
  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  public DepartmentList: any = [];
  DepartmentListNew: any = [];
  public BillShipToList: Array<string> = [];
  deptId: number;
  locCode: string;
  locId: number;
  enabledFlag: string;
  selectedPOList:Array<any>=[];
  // selectLine: string;

  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private service: MasterService) {
    this.paintPoPendingListForm = this.fb.group({
      startDt: [],
      endDt: [],
      deptId: [],
      locCode: [],
      locId: [],
      enabledFlag: [],
    })
  }

  paintPoPendingList(paintPoPendingListForm) {

  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");

    // var stDate1 = new Date(Date.now());
    // stDate1.setDate(stDate1.getDate()-1);

    var date = new Date(), yr = date.getFullYear(), mth = date.getMonth();
    var firstDay = new Date(yr, mth, 1);
    var lastDay = new Date(yr, mth + 1, 0);
    this.startDt = this.pipe.transform(firstDay, 'y-MM-dd');

    // alert (y+","+m+"," +firstDay +","+lastDay);

    // var endDt1 = new Date(this.today);
    // endDt1.setDate(endDt1.getDate() + 1);
    // this.endDt = this.pipe.transform(endDt1, 'dd-MMM-yyyy');

    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.isVisibledeptAndLocation = true;
    }
    else {
      this.isVisibledeptAndLocation = false;
    }


    this.service.DepartmentListNew()
      .subscribe(
        data => {
          this.DepartmentListNew = data;
          let createOrderList = this.DepartmentListNew.filter((dept) => (dept.divisionId == 2));
          console.log(createOrderList);
          this.DepartmentList = createOrderList;
        }
      );

    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.displaySegment = false;
    }
    else if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.displaySegment = true;
    }

    this.service.getLocationSearch1(sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.BillShipToList = data;
        }
      );

    // this.service.pendingPOList(Number(sessionStorage.getItem('emplId'))).subscribe((res: any) => {

    // if (Number(sessionStorage.getItem('deptId')) != 4) {
    //   this.closeResetButton = false;
    //   this.progress = 0;
    //   this.dataDisplay = 'Data Loading in progress....Do not refresh the Page'
    //   this.service.getPOByUser(Number(sessionStorage.getItem('emplId')), this.startDt, this.endDt, sessionStorage.getItem('locId')).subscribe((res: any) => {
    //     if (res.code === 200) {
    //       this.poDetails = res.obj;
    //       this.dataDisplay = 'Data Display Sucessfully....'
    //       this.closeResetButton = true;
    //       for (let i = 0; i < res.obj.length; i++) {
    //         var poDt = this.poDetails[i].poDate;
    //         var supInvDt = this.poDetails[i].suppInvDate;
    //         this.poDetails[i].poDate = this.pipe.transform(poDt, 'dd-MM-yyyy');
    //         this.poDetails[i].suppInvDate = this.pipe.transform(supInvDt, 'dd-MM-yyyy');
    //         if (this.poDetails[i].rcvLines.length > 0) {
    //           var recDt = this.poDetails[i].rcvLines[0].receiptDate;
    //           this.poDetails[i].rcvLines[0].receiptDate = this.pipe.transform(recDt, 'dd-MM-yyyy');
    //           this.isPending[i] = false;
    //         } else {
    //           this.poDetails[i].rcvLines.push({ receiptNo: "Pending" });
    //           this.isPending[i] = true;
    //         }

    //       }
    //       console.log(this.poDetails);
    //     }
    //     else {
    //       if (res.code === 400) {
    //         alert(res.message);
    //         this.dataDisplay = 'Data Display Failed....'
    //         this.closeResetButton = true;
    //       }
    //     }
    //   })
    // }


  }


  getPO() {

     

    var stDt = this.paintPoPendingListForm.get('startDt').value;
    var endDtSt = this.paintPoPendingListForm.get('endDt').value;

    // this.startDt = this.pipe.transform(stDt, 'dd-MMM-yyyy');
    // var endDtSt = this.paintPoPendingListForm.get('endDt').value;
    // var endDt1 = new Date(endDtSt);
    // endDt1.setDate(endDt1.getDate() + 1);
    // this.endDt = this.pipe.transform(endDt1, 'dd-MMM-yyyy');


    var date1 = this.pipe.transform(stDt, 'dd-MMM-y');
    var date2 = this.pipe.transform(endDtSt, 'dd-MMM-y');

    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Data Loading in progress....Do not refresh the Page'
    if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.service.getPOByUser(Number(sessionStorage.getItem('emplId')), date1, date2, sessionStorage.getItem('locId')).subscribe((res: any) => {
        if (res.code === 200) {
          this.poDetails = res.obj;
          this.dataDisplay = 'Data Display Sucessfully....'
          this.closeResetButton = true;
          for (let i = 0; i < res.obj.length; i++) {
            //this.paintPoPendingListForm.patchValue({ segment1: res[i].obj.segment1 })
            var poDt = this.poDetails[i].poDate;
            var supInvDt = this.poDetails[i].suppInvDate;
            this.poDetails[i].poDate = this.pipe.transform(poDt, 'dd-MM-yyyy');
            this.poDetails[i].suppInvDate = this.pipe.transform(supInvDt, 'dd-MM-yyyy');
            if (this.poDetails[i].rcvLines.length > 0) {
              var recDt = this.poDetails[i].rcvLines[0].receiptDate;
              this.poDetails[i].rcvLines[0].receiptDate = this.pipe.transform(recDt, 'dd-MM-yyyy');
              this.isPending[i] = false;
            } else {
              this.poDetails[i].rcvLines.push({ receiptNo: "Pending" });
              this.isPending[i] = true;
            }

          }
          console.log(this.poDetails);
        }
        else {
          if (res.code === 400) {
            alert(res.message);
            this.dataDisplay = 'Data Display Failed....'
            this.closeResetButton = true;
          }
        }
      })
    }
    else {
      var deptId = this.paintPoPendingListForm.get('deptId').value;
      var locId = this.paintPoPendingListForm.get('locId').value;
      this.service.getPOByUserAccc(deptId, this.startDt, this.endDt, locId).subscribe((res: any) => {
        if (res.code === 200) {
          this.poDetails = res.obj;
          this.dataDisplay = 'Data Display Sucessfully....'
          this.closeResetButton = true;
          for (let i = 0; i < res.obj.length; i++) {
            //this.paintPoPendingListForm.patchValue({ segment1: res[i].obj.segment1 })
            var poDt = this.poDetails[i].poDate;
            var supInvDt = this.poDetails[i].suppInvDate;
            this.poDetails[i].poDate = this.pipe.transform(poDt, 'dd-MM-yyyy');
            this.poDetails[i].suppInvDate = this.pipe.transform(supInvDt, 'dd-MM-yyyy');
            if (this.poDetails[i].rcvLines.length > 0) {
              var recDt = this.poDetails[i].rcvLines[0].receiptDate;
              this.poDetails[i].rcvLines[0].receiptDate = this.pipe.transform(recDt, 'dd-MM-yyyy');
              this.isPending[i] = false;
            } else {
              this.poDetails[i].rcvLines.push({ receiptNo: "Pending" });
              this.isPending[i] = true;
            }

          }
          console.log(this.poDetails);
        }
        else {
          if (res.code === 400) {
            alert(res.message);
            this.dataDisplay = 'Data Display Failed....'
            this.closeResetButton = true;
          }
        }
      })
    }
  }

  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }

  exportToExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
  }

  onOptionsLocation(event) {
    // alert(event);
    this.paintPoPendingListForm.patchValue({ locId: event })
  }

  navigation(segment) {
    var locId = this.paintPoPendingListForm.get('locId').value;
    // alert(segment+'-----'+locId);
    this.router.navigate(['/admin/master/OPMasterDto', segment, locId]);
  }
  // goReceiptForm(segment1) {

  //   this.router.navigate(['/admin/master/PoReceiptForm', segment1]);
  //   // alert(segment1);

  recoverableFlg1(e, index) {

    if (e.target.checked === true) {
      this.enabledFlag = 'Y'
      this.poDetails[index].selectLineFlag = this.enabledFlag;

    }
    if (e.target.checked === false) {
      this.enabledFlag = 'N'
    }
  }
  // alert ('Recoverable flag =' + this.recoverableFlag);


  update() {
    // var upData: UpdateData = new UpdateData();
    
  alert("Hello")
    for (let i = 0; i < this.poDetails.length; i++) {
      if (this.poDetails[i].selectLineFlag === 'Y') {
       
      
       var  values = {};
      values['name1'] = this.poDetails[i].segment1;
      values['name'] = this.poDetails[i].selectLineFlag;

      var str = JSON.stringify(values);
      var regex = /"/gi;
      // debugger;
      this.selectedPOList.push(values);
       //this.selectedPOList.push(str.replace(regex,"'"));
      }    
        }
        if(this.selectedPOList!=undefined){
this.service.updateData(this.selectedPOList).subscribe((res: any) => {
  if (res.code === 200)
   {alert("Record Inserted Successfully");
  }
  else {
    if (res.code === 400) {
      alert("Code already present in data base");
    }
  }});}
}}