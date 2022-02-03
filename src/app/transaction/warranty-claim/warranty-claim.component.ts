import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { MasterService } from '../../master/master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InteractionModeRegistry } from 'chart.js';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { trigger } from '@angular/animations';
import * as xlsx from 'xlsx';

interface IWarrantyClaim {
 }

@Component({
  selector: 'app-warranty-claim',
  templateUrl: './warranty-claim.component.html',
  styleUrls: ['./warranty-claim.component.css']
})
export class WarrantyClaimComponent implements OnInit {

  warrantyClaimForm: FormGroup;

  @ViewChild('aForm') aForm: ElementRef;
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  @ViewChild('epltable1', { static: false }) epltable1: ElementRef;
  @ViewChild('orderList', { static: false }) orderList: ElementRef;


  pipe = new DatePipe('en-US');
  public minDate = new Date();

  lstClearBackOrder: any;
  lstOrderList: any;
  lstLatestOrder: any;
  public lstItemDetails: any;

  dataDisplay: any;
  loginName: string;
  loginArray: string;
  divisionId: number;
  name: string;
  ouName: string;
  locId: number;
  locationId: number;
  locName: string;
  orgId: number;
  ouId: number;
  deptId: number;
  emplId: number;

  lineStatus:string;
  itemType:string;

  fromDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  toDate = this.pipe.transform(Date.now(), 'y-MM-dd');

  

  displayButton = true;
  spinIcon = false;
  dispGenOrdButton = true;
  dispShowOrdButton = true;
  addNewLine = false;
  lineItemRepeated = false;
  lineValidation = false;
  viewLogFile = false;
  orderUpdateStatus =true;

  // epltable1: any;

  constructor(private service: MasterService, private orderManagementService: OrderManagementService, private transactionService: TransactionService, private fb: FormBuilder, private router: Router) {
    this.warrantyClaimForm = fb.group({

      loginArray: [''],
      loginName: [''],
      divisionId: [],
      ouName: [''],
      locId: [''],
      locationId: [],
      locName: [''],
      ouId: [],
      deptId: [],
      emplId: [''],
      orgId: [''],

 
      fromDate: [],
      toDate: [],

      warrLines: this.fb.array([this.lineDetailsGroup()])

    });
  }

  lineDetailsGroup() {
    return this.fb.group({
    itemCode:[],
    itemDesc:[],
    hsnSac:[],
    taxPer:[],
    repairNo:[],
    vehicleNo:[],
    chassisNo:[],
    qty:[],
    avgCost:[],
    totValue:[],
    ndp:[],
    mrp:[],
    msilclaimNo:[],
    msilClaimDate:[],
    msilInvNo:[],
    msilInvDate:[],
    msilClaimAmt:[],
    oldStatus:[],
    newStatus:[],
    });
  }

  lineDetailsArray(): FormArray {
    return <FormArray>this.warrantyClaimForm.get('warrLines')
  }


  get f() { return this.warrantyClaimForm.controls; }

  warrantyClaim(warrantyClaimForm: any) { }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.name = sessionStorage.getItem('name');
    this.loginArray = sessionStorage.getItem('divisionName');
    this.loginName = sessionStorage.getItem('name');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.locId = Number(sessionStorage.getItem('locId'));
    this.locName = (sessionStorage.getItem('locName'));
    this.deptId = Number(sessionStorage.getItem('dept'));
    this.emplId = Number(sessionStorage.getItem('emplId'));
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.orgId = this.ouId;
    console.log(this.loginArray);
    console.log(this.locId);


  }

  
  addNewRow() {
    var len1 = this.lineDetailsArray().length - 1;
    this.addRow(len1);
  }

  addRow(index) {
  
    var ordLineArr = this.warrantyClaimForm.get('orderList').value;
    var len1 = this.lineDetailsArray().length - 1;
    if (len1 === index) {
      if (ordLineArr[index].itemId > 0 && ordLineArr[index].orderQty >= 0) {
        this.lineDetailsArray().push(this.lineDetailsGroup());
      } else {

        if(index>0) {
        alert("Incomplete Line - Order Part No / Order Qty not updated ....Line will be deleted ");
        this.lineDetailsArray().removeAt(index);
        }

        // if(index===0) {
        //   alert("Incomplete Line - Order Part No / Order Qty not updated .... ");
        // }

      }


    }
  }

  RemoveRow(index) {
    if (index === 0) { }
    else {


      // this.deleteOrderLine(index)

      this.lineDetailsArray().removeAt(index);
      // this.CalculateOrdValue();
    }

  }

  dispDetails(){}
  clearSearch() {
    // this.jobcardForm.get('jobCardNum2').reset();
    // this.jobcardForm.get('regNo1').reset();
    // this.jobcardForm.get('JobOpenDt').reset();
    // this.jobcardForm.get('jobStatus1').enable();
    
    // this.lstJobcardList = null;
  }

  
  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }
  newMast(){}

  SearchByDate(){}

}
