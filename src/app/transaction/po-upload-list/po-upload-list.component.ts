import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, FormControlName } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
// import { MasterService } from '../master.service';
import { MasterService } from 'src/app/master/master.service'
import { DatePipe } from '@angular/common';
import { data, get } from 'jquery';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location, } from "@angular/common";
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-po-upload-list',
  templateUrl: './po-upload-list.component.html',
  styleUrls: ['./po-upload-list.component.css']
})
export class PoUploadListComponent implements OnInit {
  poPendingListForm: FormGroup;
  pipe = new DatePipe('en-US');
  poDetails: any = [];
  today = new Date();
  startDt = this.pipe.transform(this.today, 'dd-MMM-yyyy');
  minDate = new Date();
  endDt = this.pipe.transform(this.today, 'dd-MMM-yyyy');


  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private service: MasterService) {
    this.poPendingListForm = this.fb.group({
      startDt: [],
      endDt: [],
    })
  }

  poPendingList(poPendingListForm) {

  }

  ngOnInit(): void {

    var endDt1 = new Date(this.today);
    endDt1.setDate(endDt1.getDate() + 1);
    this.endDt = this.pipe.transform(endDt1, 'dd-MMM-yyyy');

    // this.service.pendingPOList(Number(sessionStorage.getItem('emplId'))).subscribe((res: any) => {
    this.service.getPOByUser(Number(sessionStorage.getItem('emplId')), this.startDt, this.endDt).subscribe((res: any) => {
      if (res.code === 200) {
        this.poDetails = res.obj;
        for (let i = 0; i < res.obj.length; i++) {
          //this.poPendingListForm.patchValue({ segment1: res[i].obj.segment1 })
          var poDt = this.poDetails[i].poDate;
          this.poDetails[i].poDate = this.pipe.transform(poDt, 'dd-MM-yyyy');
          if (this.poDetails[i].rcvLines.length > 0) {
            var recDt = this.poDetails[i].receiptDate;
            this.poDetails[i].receiptDate = this.pipe.transform(recDt, 'dd-MM-yyyy');
          }else{
            this.poDetails[i].rcvLines[0].receiptNo = "Pending";
          }

        }
        console.log(this.poDetails);
      }
      else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    })
  }


  getPO() {
    var stDt = this.poPendingListForm.get('startDt').value;
    this.startDt = this.pipe.transform(stDt, 'dd-MMM-yyyy');

    var endDtSt = this.poPendingListForm.get('endDt').value;
    var endDt1 = new Date(endDtSt);
    endDt1.setDate(endDt1.getDate() + 1);
    this.endDt = this.pipe.transform(endDt1, 'dd-MMM-yyyy');

    this.service.getPOByUser(Number(sessionStorage.getItem('emplId')), this.startDt, this.endDt).subscribe((res: any) => {
      if (res.code === 200) {
          this.poDetails = res.obj;
        // for (let i = 0; i < res.obj; i++) {
        //   this.poPendingListForm.patchValue({ segment1: res[i].obj.segment1 })
        // }
      }
      else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    })

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
}
