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

  public lineStatusList       : Array<string> = [];
  public itemTypeList          : Array<string> = [];

  lstWarrantyDtls: any;
  
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

  lineStatus:string ='ALL';
  itemType:string ='ALL';

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
          
      lineStatus:[],
      itemType:[],

      warrLines: this.fb.array([this.lineDetailsGroup()])

    });
  }

  lineDetailsGroup() {
    return this.fb.group({

    warrClaimId:[],
    ouid:[],
    locid:[],

    itemCode:[],
    itemDesc:[],
    hsnSacCode:[],
    taxCate:[],
    repairNo:[],
    vehicleNo:[],
    chassisNo:[],
    itemQty:[],
    weigtedAverage:[],
    ndp:[],
    mrp:[],
    msilClaimNo:[],
    msilClaimDate:[],
    msilApproveAmt:[],
    msilInvoiceNo:[],
    msilInvoiceDate:[],

    totValue:[],
    oldStatus:[],
    newStatus:[],


    engineNo:[],
    dealerCode:[],
    warrantyPeriod:[],
    kms:[],
    repairOrderDate:[],
    srNo:[],
    mrnNo:[],
    itemType:[],
    acceptanceStatus:[],
    creationDate:[],
    invoiceDate:[],
    moveOrderNo:[],
    toAcctId:[],
    transactionId:[],
    invoiceStatus:[],
    remarks:[],

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

    this.transactionService.lineStatusLst()
    .subscribe(
      data => {
        this.lineStatusList = data;
        console.log(this.lineStatusList);
      }
    );

    this.transactionService.itemTypeLst()
    .subscribe(
      data => {
        this.itemTypeList = data;
        console.log(this.itemTypeList);
      }
    );

    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.fromDate = this.pipe.transform(firstDay, 'y-MM-dd');

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

  getWarrData(){

    var fDate=this.warrantyClaimForm.get('fromDate').value;
    var tDate=this.warrantyClaimForm.get('toDate').value;
    var lstat=this.warrantyClaimForm.get('lineStatus').value;
    var itmtp=this.warrantyClaimForm.get('itemType').value;
  
  this.transactionService.warrDataList(fDate,tDate,sessionStorage.getItem('ouId'),lstat,itmtp)
  .subscribe(
    data => {
      this.lstWarrantyDtls = data;
      console.log(this.lstWarrantyDtls);
     var len = this.lineDetailsArray().length;
    //  alert ("this.lstWarrantyDtls.length :"+ this.lstWarrantyDtls.length);
      var y = 0;
      for (let i = 0; i < this.lstWarrantyDtls.length - len; i++) {
        var ordLnGrp: FormGroup = this.lineDetailsGroup();
        this.lineDetailsArray().push(ordLnGrp);
        y = i;
       }

      this.warrantyClaimForm.get('warrLines').patchValue(this.lstWarrantyDtls);
      

       } );   }
       

     

  transeData(val) {

    delete val.loginArray;
    delete val.loginName;
    delete val.ouName;
    delete val.divisionId;
    delete val.locName;
    delete val.deptId;
    delete val.orgId;

    return val;
  }



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


  validateClaimDate(x,index) {

    
    var warLineArr = this.warrantyClaimForm.get('warrLines').value;
    var patch = this.warrantyClaimForm.get('warrLines') as FormArray;

    var currDate = new Date();
    var z = this.pipe.transform(currDate, 'y-MM-dd');
    var clmDate = new Date(warLineArr[index].msilClaimDate);
    var invDate = new Date(warLineArr[index].msilInvoiceDate);
  
    if(x==='MSILCLMDATE') {
      if(clmDate>currDate) {
        patch.controls[index].patchValue({ msilClaimDate: z })
        alert("MSIL CLAIM DATE :" + "Should not be above Today's Date");
      }
    }

    if(x==='MSILINVDATE') {
      if(invDate>currDate) {
        patch.controls[index].patchValue({ msilInvoiceDate: z })
        alert("MSIL INVOICE DATE :" + "Should not be above Today's Date");
      }
    }
   }

}
