import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { controllers } from 'chart.js';
import { ThemeService } from 'ng2-charts';
import { MasterService } from 'src/app/master/master.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from "@angular/common";
import { data } from 'jquery';
import { formatDate } from '@angular/common'


interface IpoReceipt {
  ouName: string;
  poNumber: string;
  supplier: string;
  item: string;
  poInvNum: string;
  poInvDate: Date;
  segment1: string;
  ouId: number;
  totalAmt: number;
  supplierName: string;
  // totalAmt:number;
  baseAmount: number;
  taxAmt: number;
  subInventoryId: number;
  recDate: Date;
  // recDate: new Date()
  Comments: string;
  suppInvDate: Date;
  suppInvNo: string;
  gstDocNo: string;
  // EwayBill:string;
  ewayBillNo: string;
  docDate: Date;
  ewayBillDate: Date;
  locId: number;
  poHeaderId: number;
  poLineId: number;
  suppNo: number;
  supplierSiteId: number;
  emplId: number;
  totAmount: number;
  invItemId: number;
  billToLoc: number;
  billToLocId: number;
  categoryId: number;
  qtyReceived: number;
  polineNum: number;
  locatorId: number;
  poType: string;
  poStatus: string;
  // locatorDesc:any[];
  locatorDesc: string;
  shipmentNumber: string;
}

interface Ilocator {
  segment11: string;
  segment2: string;
  segment3: number;
  segment4: string;
  segment5: number;
}

interface IPODateWise {
  frmDate: Date,
  toDate: Date,
  billToLocId: number;
  disAmt:number;
}


@Component({
  selector: 'app-pump-po-receipt',
  templateUrl: './pump-po-receipt.component.html',
  styleUrls: ['./pump-po-receipt.component.css']
})
export class PumpPoReceiptComponent implements OnInit {
  poReceiptForm: FormGroup;
  ouName: string;
  poNumber: string;
  docSeqValue: string;
  disAmt:number;
  isVisible: boolean = true;
  public minDate = new Date();
  recdate1: Date;
  polineNum: number;
  poInvNum: string;
  poInvDate: Date;
  content: Number;
  itemType: string;
  subInventory: number;
  title: string;
  submitted = false;
  private sub: any;
  private sub1: any;
  supplier: string;
  item: string;
  segment1: string;
  shipmentNumber: string;
  ouId: number;
  totalAmt: number;
  name: string;
  divisionName: string;
  supplierName: string;
  baseAmount: number;
  taxAmt: number;
  frmDate1: Date;
  shipmentNo: string;
  disabled = true;
  disabledLine = true;
  disabledViewAccounting = true;
  DisplayqtyReceived = true;
  displaylocatorDesc: Array<boolean> = [];sub3: any;
;
  // recDate=new Date();
  pipe = new DatePipe('en-US');
  now = Date.now();
  recDate = this.pipe.transform(this.now, 'dd-MM-yyyy');
  // recDate:Date;
  // public minDate = new Date();
  Comments: string;
  suppInvDate: Date;
  suppInvNo: string;
  gstDocNo: string;
  user: any[];
  // EwayBill:string;
  ewayBillNo: string;
  docDate: Date;
  ewayBillDate: Date;
  locId: number;
  poHeaderId: number;
  suppNo: number;
  supplierSiteId: number;
  emplId: number;
  totAmount: number;
  invItemId: number;
  billToLoc: number;
  categoryId: number;
  // polineNum: number;
  // segment1:string;
  segment2: string;
  segment3: number;
  segment4: string;
  segment5: number;
  segment11: string;
  // locatorDesc:any[];
  locatorDesc: string;
  locatorId: number;
  poType: string;
  poStatus: string;
  receiptNo: number;
  ledgerId: number;
  runningTotalDr: number;
  ctgDescription: string;


  selectAllFlag: string;
  selectFlag: string;
  rcvSupp1: number;
  description: string;
  periodName: string;
  postedDate: Date;
  jeCategory: string;
  name1: string;
  runningTotalCr: number;
  // poStatus:string;


  // loginArray: any[];
  loginArray: string;
  public cityList: Array<string>[];
  public poAllRecFind: any[];
  lstcompolines: any;
  public poLines: any[];
  public lstlocationwise: any[];
  public lstcompolines1: any = [];
  public rcvTaxDeatils: [];
  public poTaxDeatils: [];
  public lstSupLineDetails: any[];
  public lstPODateWiseData: any[];
  public lstReceiptDateWiseData: any[];
  public lstPOApproveDateWise: any;
  public ApproveDateWise: any[];
  supplierList: any[];
  lstcomments2: any[];
  lstcomments: any;
  lstcomments1: any[];
  divisionId: any[];
  loginName: string;
  poLineId: number;
  viewAccounting1: any[];
  viewAccounting2: any[];
  displayrecDate = true;
  public BillShipToList: Array<string> = [];

  // PO wise Date Paratemeter//////
  frmDate: Date;
  toDate: Date;
  accountLocId: number;


  xyzdis = false;

  //  supplierSiteId:number;
  //  check box selection
  names: any;
  selectedAll: any;
  selectedNames: any;
  poDate: Date;
  isEisableLocationInSearch=false;
  displaySaveButton = false;
  displaysubInvDesc: Array<boolean> = [];
  TRUER = false; recFagDiss = true;

  @ViewChild("myinput") myInputField: ElementRef;
  @ViewChild("input1") input1: ElementRef;
  @ViewChild("input2") input2: ElementRef;
  @ViewChild("input3") input3: ElementRef;
  @ViewChild("input4") input4: ElementRef;
  @ViewChild("input5") input5: ElementRef;
  @ViewChild("input6") input6: ElementRef;

  ngAfterViewInit() {
     this.myInputField.nativeElement.focus();
  }
  // recDate=this.pipe.transform(this.recDate,'dd-MM-yyyy');

  constructor(private fb: FormBuilder, private location: Location, private router: Router, private service: MasterService, private router1: ActivatedRoute,private router3: ActivatedRoute) {
    this.poReceiptForm = fb.group({
      ouName: [''],
      accountLocId: [''],
      // poNumber: ['', Validators.required],
      poNumber: [''],
      supplier: [''],
      item: [''],
      poInvNum: [''],
      poInvDate: [''],
      segment1: [''],
      shipmentNumber: [],
      ouId: [''],
      totalAmt: [''],
      disAmt:[''],
      divisionName: [''],
      supplierName: [''],
      baseAmount: [''],
      taxAmt: [''],
      recDate: [''],
      Comments: [''],
      suppInvDate: [''],
      suppInvNo: [''],
      gstDocNo: [''],
      ewayBillNo: [''],
      docDate: [''],
      ewayBillDate: [''],
      locId: [''],
      poHeaderId: [''],
      suppNo: [''],
      supplierSiteId: [''],
      emplId: [''],
      loginArray: [''],
      loginName: [''],
      poType: [''],
      poStatus: [''],
      receiptNo: [''],
      selectAllFlag: [''],
      rcvSupp1: [''],
      frmDate: [''],
      toDate: [''],
      frmDate1: [''],
      poDate: [''],
      description: [''],
      periodName: [''],
      postedDate: [''],
      jeCategory: [''],
      ledgerId: [''],
      name1: [''],
      runningTotalDr: [''],
      runningTotalCr: [''],
      docSeqValue: [''],
      shipmentNo: [''],
      segment3: [],
      segment11: [],
      segment2: [],
      segment4: [],
      segment5: [],
      locatorDesc: [],
      poLines: this.fb.array([this.lineDetailsGroup()]),
    })
  }

  lineDetailsGroup() {
    return this.fb.group({
      poLineId: [],
      poHeaderId: [],
      orderedQty: [],
      shipLineId: [],
      shipHeaderId: [],
      itemType: [],
      itemName: [],
      disAmt:[],
      taxCategoryName: [],
      ctgDescription: [],
      itemDesc: [],
      subInvDesc: [],
      subInventoryId: [''],
      cgstAmt: [''],
      sgstAmt: [''],
      igstAmt: [''],
      // subInventoryId:[],
      locatorDesc: [''],
      uom: [],
      unitPrice: [],
      taxPercentage: [],
      taxAmount: [],
      sacCode: [],
      totalAmt: [],
      poChargeAcc: [],
      qtyReceived: [],
      locId: [],
      baseAmount: [],
      totAmount: [],
      invItemId: [''],
      billToLoc: [''],
      categoryId: [''],
      // segment11: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      // segment2: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      // segment3: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      // segment4: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      // segment5: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      segment11: [''],
      segment2: [''],
      segment3: [''],
      segment4: [''],
      segment5: [''],
      polineNum: [''],
      locatorId: [''],
      selectFlag: [],
    });
  }
  get lineDetailsArray() {
    return <FormArray>this.poReceiptForm.get('poLines')
  }


  //  selectAll() {
  //   this.selectedAll = !this.selectedAll;

  //   for (var i = 0; i < this.names.length; i++) {
  //       this.names[i].selected = this.selectedAll;
  //   }

  selectAll(e) {
    // alert(e.target.checked);
    let control = this.poReceiptForm.get('poLines') as FormArray;

    if (e.target.checked === true) {
      this.recFagDiss = false;
    }
    else {
      this.recFagDiss = true;
    }
  }

  checkIfAllSelected() {
    var totalSelected = 0;
    for (var i = 0; i < this.names.length; i++) {
      if (this.names[i].selected) totalSelected++;
    }
    this.selectedAll = totalSelected === this.names.length;
    return true;
  }







  get f() { return this.poReceiptForm.controls; }

  poReceipt(poReceiptForm: any) {

  }


  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    var recdate1 = this.pipe.transform(this.now, 'dd-MM-yyyy');
    this.poReceiptForm.patchValue({ recDate: recdate1 });
    // alert(this.pipe.transform(this.now, 'dd-MM-yyyy'));
    // alert(recdate1)
    this.name = sessionStorage.getItem('name');
    this.loginArray = sessionStorage.getItem('divisionName');
    this.loginName = sessionStorage.getItem('name')
    this.ouName = (sessionStorage.getItem('ouName'));
    this.locId = Number(sessionStorage.getItem('locId'));
    this.emplId = Number(sessionStorage.getItem('emplId'));
    console.log(this.loginArray);
    console.log(this.locId);
    console.log(this.emplId);

    this.displayrecDate = true;

    if (Number(sessionStorage.getItem('deptId')) == 4){
      this.isEisableLocationInSearch=true;} 
      else { this.isEisableLocationInSearch=false; }
    

    // this.poReceiptForm.patchValue(this.lstcomments1.user);
    // var divisionCode = this.lstcomments1.user.divisionCode;
    //  console.log(divisionCode);
    // var locId = this.lstcomments1.user.locId;
    // console.log(locId);


    // this.lstcomments= [];

    this.service.getLocationSearch1(sessionStorage.getItem('ouId'))
    .subscribe(
      data => {
        this.BillShipToList = data;
      }
    );

    this.service.cityList()
      .subscribe(
        data => {
          this.cityList = data;
          console.log(this.cityList);
        }
      );


    this.sub1 = this.router1.queryParams.subscribe(params => {
      // this.shipmentNumber = params.get('shipmentNumber');
      this.shipmentNumber = this.router1.snapshot.queryParamMap.get('shipmentNumber');
      // alert(this.shipmentNumber);
      this.poReceiptForm.patchValue({ shipmentNumber: this.shipmentNumber })
      if (this.shipmentNumber != null) {
        this.shipmentNoFind(this.shipmentNumber);
      }
    })


    this.sub = this.router1.params.subscribe(params => {
      // alert( params['segment1']);
      this.segment1 = params['segment1'];
      var locId = params['accountLocId'];
      this.accountLocId = params['accountLocId'];
      // alert(this.segment1 +'----'+ locId);
      console.log(this.poReceiptForm.value);

      this.service.getsearchByPOlines(this.segment1)
        .subscribe(
          data => {
            if (data.code === 400) {
              alert(data.message);
              // alert(data.obj);
            }
            if (data.code === 200) {
              this.lstcompolines = data.obj;
              // alert(data.obj.poLines.length)
              if (this.lstcompolines.poStatus === 'FULLY RECEIVED') {
                console.log(this.poStatus);
                this.displaySaveButton = true;
                this.disabled = false;
                this.disabledLine = false;
                let control = this.poReceiptForm.get('poLines') as FormArray;
                var poLines: FormGroup = this.lineDetailsGroup();
                var length1 = this.lstcompolines.poLines.length - 1;
                this.lineDetailsArray.removeAt(length1);
                control.push(poLines);
                this.displaySaveButton = false;
                this.poReceiptForm.patchValue(this.lstcompolines);
                let controlinv = this.poReceiptForm.get('poLines') as FormArray;
                for (let j = 0; j < data.obj.poLines.length; j++) {
                  // alert(data.obj.poLines[j].poLineId);
                  (controlinv.controls[j]).patchValue({
                    totAmount: data.obj.poLines[j].totAmount.toFixed(2),
                    unitPrice: data.obj.poLines[j].unitPrice.toFixed(2),
                    baseAmount: data.obj.poLines[j].baseAmount.toFixed(2),
                    sgstAmt: data.obj.poLines[j].sgstAmt.toFixed(2),
                    cgstAmt: data.obj.poLines[j].cgstAmt.toFixed(2),
                    igstAmt: data.obj.poLines[j].igstAmt.toFixed(2),
                    taxAmount: data.obj.poLines[j].taxAmount.toFixed(2),
                  });
                }
              }
              else {
                const invCategory = data.obj.rcvLines[0].ctgDescription.substr(0, 3);
                // alert(invCategory);
                if (this.ctgDescription === 'MCH') {
                  this.lstcompolines = data.obj;
                  this.disabled = true;
                  this.disabledLine = true;
                  this.DisplayqtyReceived = true;
                  let control = this.poReceiptForm.get('poLines') as FormArray;
                  var poLines: FormGroup = this.lineDetailsGroup();
                  var length1 = this.lstcompolines.poLines.length - 1;
                  this.lineDetailsArray.removeAt(length1);
                  control.push(poLines);
                  this.displaySaveButton = true;
                  this.poReceiptForm.patchValue(this.lstcompolines);
                  qtyReceived: 1;
                }
                else {
                  this.lstcompolines = data.obj;
                  this.disabled = true;
                  this.DisplayqtyReceived = false;
                  this.disabledLine = true;
                  let control = this.poReceiptForm.get('poLines') as FormArray;
                  // var length1=this.lstcompolines.poLines.length-1;
                  // this.lineDetailsArray.removeAt(length1);
                  this.lineDetailsArray.clear();
                  // alert(data.obj.poLines.length);
                  for (let i = 0; i < this.lstcompolines.poLines.length; i++) {
                    var poLines: FormGroup = this.lineDetailsGroup();
                    control.push(poLines);
                    if (data.obj.poLines[i].itemType === 'EXPENCE') {
                      this.displaysubInvDesc[i] = true;
                      this.displaylocatorDesc[i] = true;
                    }
                  }
                  this.displaySaveButton = true;
                  this.poReceiptForm.patchValue(this.lstcompolines);
                  this.baseAmount = data.obj.baseAmount.toFixed(2);
                  this.totalAmt = data.obj.totalAmt.toFixed(2);
                  this.taxAmt = data.obj.taxAmt.toFixed(2);
                  let controlinv = this.poReceiptForm.get('poLines') as FormArray;
                  for (let j = 0; j < data.obj.poLines.length; j++) {
                    // alert(data.obj.poLines[j].poLineId);
                    (controlinv.controls[j]).patchValue({
                      subInventoryId: data.obj.poLines[j].subInventoryId,
                      poLineId: data.obj.poLines[j].poLineId,
                      totAmount: data.obj.poLines[j].totAmount.toFixed(2),
                      unitPrice: data.obj.poLines[j].unitPrice.toFixed(2),
                      baseAmount: data.obj.poLines[j].baseAmount.toFixed(2),
                      sgstAmt: data.obj.poLines[j].sgstAmt.toFixed(2),
                      cgstAmt: data.obj.poLines[j].cgstAmt.toFixed(2),
                      igstAmt: data.obj.poLines[j].igstAmt.toFixed(2),
                      taxAmount: data.obj.poLines[j].taxAmount.toFixed(2),
                    });
                    // this.lineDetailsGroup().patchValue({subInvetoryId:data.obj.poLines[j].subInventoryId})
                  }
                }
              }
            }
          }
        );
    });

   
    this.sub3 = this.router3.params.subscribe(params => {
      var recNo = this.router3.snapshot.queryParamMap.get('trxNum');
      // alert(recNo)
      var categ = (this.router3.snapshot.queryParamMap.get('catg'));
      // alert(categ)
      // debugger;
      if ( recNo != undefined){
        this.glReceiptFind(recNo);
        }
      // if (recNo != undefined && categ=='STKTRF_Receipt'){
      //   this.glReceiptFind(recNo);
      // }
      });
  }

  currentDate = new Date();

  clear() { }


  suppFind(rcvSupp1) {
    this.displaySaveButton = false;
    // alert(rcvSupp1);
    console.log(this.poReceiptForm.value);
    this.service.getsearchByRcvSupp(rcvSupp1)
      .subscribe(
        data => {
          if (data.code === 400) {
            alert(data.message);
            // alert(data.obj);
          }
          if (data.code === 200) {
            this.lstSupLineDetails = data.obj;
            this.poReceiptForm.patchValue(this.lstSupLineDetails);
            this.locatorDesc = this.lstcompolines.rcvLines[0].locatorDesc;
            this.recDate = this.lstcompolines.receiptDate;
          }
        }
      );

  }

  ReceiptFind(segment1) {
    // alert(segment1)
    this.lineDetailsArray.clear();
    // this.poReceiptForm.get('loginArray').reset();
    // this.poReceiptForm.get('ouName').reset();
    this.poReceiptForm.get('segment1').reset();
    // this.poReceiptForm.get('poType').reset();
    this.poReceiptForm.get('baseAmount').reset();
    this.poReceiptForm.get('supplierName').reset();
    this.poReceiptForm.get('receiptNo').reset();
    this.poReceiptForm.get('recDate').reset();
    this.poReceiptForm.get('taxAmt').reset();
    // this.poReceiptForm.get('loginName').reset();
    this.poReceiptForm.get('gstDocNo').reset();
    this.poReceiptForm.get('docDate').reset();
    this.poReceiptForm.get('totalAmt').reset();
    this.poReceiptForm.get('ewayBillNo').reset();
    this.poReceiptForm.get('ewayBillDate').reset();
    this.poReceiptForm.get('suppInvDate').reset();
    this.poReceiptForm.get('suppInvNo').reset();
    this.poReceiptForm.get('poInvNum').reset();
    this.poReceiptForm.get('poInvDate').reset();
    this.poReceiptForm.get('Comments').reset();
    this.displaySaveButton = false;
    this.displayrecDate = false;
    // alert(segment1);
    console.log(this.poReceiptForm.value);
    if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.service.getsearchByReceiptNo(segment1, (sessionStorage.getItem('locId')))
        .subscribe(
          data => {
            if (data.code === 200) {
              this.lstcompolines = data.obj;
              // alert(data.obj.receiptNo);
              if (data.obj.shipmentNumber != null) {
                // alert(data.obj.shipmentNo);
                this.isVisible = false;
              }
              else {
                this.isVisible = true;
              }
              var recDate1 = (data.obj.recDate, 'dd-MM-yyyy');
              this.poReceiptForm.patchValue(({ recDate: (data.obj.recDate, 'dd-MM-yyyy') }));
              let control = this.poReceiptForm.get('poLines') as FormArray;
              for (var i = 0; i < this.lstcompolines.rcvLines.length; i++) {
                var poLines: FormGroup = this.lineDetailsGroup();
                control.push(poLines);
              }
              if (data.obj.poInvNum != null) {
                this.isVisible = false;
              }
              this.disabled = false;
              this.disabledLine = false;
              this.disabledViewAccounting = false;
              this.poReceiptForm.get('poLines').patchValue(this.lstcompolines.rcvLines);
              this.poReceiptForm.patchValue(this.lstcompolines);
              this.locatorDesc = this.lstcompolines.rcvLines[0].locatorDesc;
              this.recDate = this.lstcompolines.receiptDate;

              this.poReceiptForm.patchValue({ taxAmt: this.lstcompolines.totalTax });
              let controlinv1 = this.poReceiptForm.get('poLines') as FormArray;
              for (let j = 0; j < data.obj.rcvLines.length; j++) {
                (controlinv1.controls[j]).patchValue({
                  subInventoryId: data.obj.rcvLines[j].subInventoryId
                })
                // this.lineDetailsArray[j].patchValue({ subInventoryId: data.obj.rcvLines[j].subInventoryId })
              }
              let controlinv = this.poReceiptForm.get('poLines') as FormArray;
              for (let j = 0; j < data.obj.rcvLines.length; j++) {
                (controlinv.controls[j]).patchValue({
                  totAmount: data.obj.rcvLines[j].totAmount.toFixed(2),
                  unitPrice: data.obj.rcvLines[j].unitPrice.toFixed(2),
                  baseAmount: data.obj.rcvLines[j].baseAmount.toFixed(2),
                  sgstAmt: data.obj.rcvLines[j].sgstAmt.toFixed(2),
                  cgstAmt: data.obj.rcvLines[j].cgstAmt.toFixed(2),
                  igstAmt: data.obj.rcvLines[j].igstAmt.toFixed(2),
                  taxAmount: data.obj.rcvLines[j].taxAmount.toFixed(2),
                });
              }

            }
            else if (data.code === 400) {
              alert(data.message)
            }
          }

        );
    }
    else if (Number(sessionStorage.getItem('deptId')) == 4) {
      // this.service.getsearchByReceiptNo(segment1, this.accountLocId)
      this.service.getsearchByReceiptNo(segment1, this.locId)
        .subscribe(
          data => {
            if (data.code === 200) {
              this.lstcompolines = data.obj;
              // alert(data.obj.receiptNo);
              if (data.obj.shipmentNumber != null) {
                // alert(data.obj.shipmentNo);
                this.isVisible = false;
              }
              else {
                this.isVisible = true;
              }
              var recDate1 = (data.obj.recDate, 'dd-MM-yyyy');
              this.poReceiptForm.patchValue(({ recDate: (data.obj.recDate, 'dd-MM-yyyy') }));
              let control = this.poReceiptForm.get('poLines') as FormArray;
              for (var i = 0; i < this.lstcompolines.rcvLines.length; i++) {
                var poLines: FormGroup = this.lineDetailsGroup();
                control.push(poLines);
              }
              if (data.obj.poInvNum != null) {
                this.isVisible = false;
              }
              this.disabled = false;
              this.disabledLine = false;
              this.disabledViewAccounting = false;
              this.poReceiptForm.get('poLines').patchValue(this.lstcompolines.rcvLines);
              this.poReceiptForm.patchValue(this.lstcompolines);
              this.locatorDesc = this.lstcompolines.rcvLines[0].locatorDesc;
              this.recDate = this.lstcompolines.receiptDate;

              this.poReceiptForm.patchValue({ taxAmt: this.lstcompolines.totalTax });
              let controlinv1 = this.poReceiptForm.get('poLines') as FormArray;
              for (let j = 0; j < data.obj.rcvLines.length; j++) {
                (controlinv1.controls[j]).patchValue({
                  subInventoryId: data.obj.rcvLines[j].subInventoryId
                })
                // this.lineDetailsArray[j].patchValue({ subInventoryId: data.obj.rcvLines[j].subInventoryId })
              }
              let controlinv = this.poReceiptForm.get('poLines') as FormArray;
              for (let j = 0; j < data.obj.rcvLines.length; j++) {
                (controlinv.controls[j]).patchValue({
                  totAmount: data.obj.rcvLines[j].totAmount.toFixed(2),
                  unitPrice: data.obj.rcvLines[j].unitPrice.toFixed(2),
                  baseAmount: data.obj.rcvLines[j].baseAmount.toFixed(2),
                  sgstAmt: data.obj.rcvLines[j].sgstAmt.toFixed(2),
                  cgstAmt: data.obj.rcvLines[j].cgstAmt.toFixed(2),
                  igstAmt: data.obj.rcvLines[j].igstAmt.toFixed(2),
                  taxAmount: data.obj.rcvLines[j].taxAmount.toFixed(2),
                });
              }

            }
            else if (data.code === 400) {
              alert(data.message)
            }
          }

        );
    }
  }



  poFind(segment1) {
    // alert(segment1);

    console.log(this.poReceiptForm.value);
    this.service.getsearchByPOlines(segment1)
      .subscribe(
        data => {
          if (data.code === 400) {
            alert(data.message);
            // alert(data.obj);
          }
          if (data.code === 200) {
            this.lstcompolines = data.obj;
            this.lineDetailsArray.clear();
            // alert( this.lstcompolines.receiptNo);
            if (this.lstcompolines.poStatus === 'FULLY RECEIVED') {
              console.log(this.poStatus);
              this.displaySaveButton = true;
              this.disabled = false;
              this.disabledLine = false;
              let control = this.poReceiptForm.get('poLines') as FormArray;
              // var length1=this.lstcompolines.poLines.length-1;
              // this.lineDetailsArray.removeAt(length1);
              for (let i = 0; i < this.lstcompolines.poLines.length; i++) {
                var poLines: FormGroup = this.lineDetailsGroup();
                control.push(poLines);
                // debugger;
              }
              this.displaySaveButton = false;
              this.poReceiptForm.patchValue(this.lstcompolines);
            }
            else {
              const invCategory = data.obj.poLines[0].ctgDescription.substr(0, 3);
              // alert(invCategory);
              if (this.ctgDescription === 'MCH') {
                this.lstcompolines = data.obj;
                this.disabled = true;
                this.disabledLine = true;
                this.DisplayqtyReceived = true;
                let control = this.poReceiptForm.get('poLines') as FormArray;
                // var length1=this.lstcompolines.poLines.length-1;
                // this.lineDetailsArray.removeAt(length1);
                for (let i = 0; i < this.lstcompolines.poLines.length; i++) {
                  var poLines: FormGroup = this.lineDetailsGroup();
                  control.push(poLines);
                }
                this.displaySaveButton = true;
                this.poReceiptForm.patchValue(this.lstcompolines);
                qtyReceived: 1;
              }
              else {
                this.lstcompolines = data.obj;
                this.disabled = true;
                this.DisplayqtyReceived = false;
                this.disabledLine = true;
                let control = this.poReceiptForm.get('poLines') as FormArray;
                // debugger;
                // var length1=this.lstcompolines.poLines.length-1;
                // this.lineDetailsArray.removeAt(length1);
                for (let i = 0; i < this.lstcompolines.poLines.length; i++) {
                  var poLines: FormGroup = this.lineDetailsGroup();
                  control.push(poLines);
                  if (data.obj.poLines[i].itemType === 'EXPENCE') {
                    this.displaysubInvDesc[i] = true;
                    this.displaylocatorDesc[i] = true;
                  }
                }
                this.displaySaveButton = true;
                this.poReceiptForm.patchValue(this.lstcompolines);
                let controlinv = this.poReceiptForm.get('poLines') as FormArray;

                for (let j = 0; j < data.obj.poLines.length; j++) {
                  (controlinv.controls[j]).patchValue({
                    subInventoryId: data.obj.poLines[j].subInventoryId,
                  });
                }
                // this.locatorDesc.push(this.lstcompolines.rcvLines[0].locatorDesc);
              }
            }
          }
        }
      );
  }

  taxDeatils(i, poHeaderId) {
    var invLine = this.poReceiptForm.get('poLines').value;
    var poLineId = invLine[i].poLineId;
    this.service.receiptnotdonetaxDeatils(poHeaderId, poLineId)
      .subscribe((res: any) => {
        if (res.code === 200) {
          this.poTaxDeatils = res.obj;
          console.log(this.poTaxDeatils);
        }
        else {
          if (res.code === 400) {
            alert('Error : ' + res.message);
          }
        }
      })
  }


  taxDeatils1(i) {
    // alert(i);
    var shipHeaderId = this.lstcompolines.shipHeaderId;
    // alert(shipHeaderId);
    var invLine = this.poReceiptForm.get('poLines').value;
    var shipLineId = invLine[i].shipLineId;
    this.service.receiptdonetaxDeatils(shipHeaderId, shipLineId)
      .subscribe((res: any) => {
        if (res.code === 200) {
          this.rcvTaxDeatils = res.obj;
          console.log(this.rcvTaxDeatils);
        }
        else {
          if (res.code === 400) {
            alert('Error : ' + res.message);
          }
        }
      })
  }


  shipmentNoFind(shipmentNumber: String) {
    console.log(this.poReceiptForm.value);
    this.service.getsearchByshipmentNo(shipmentNumber, sessionStorage.getItem('locId'))
      .subscribe(
        data => {
          if (data.code === 400) {
            alert(data.message);
            // alert(data.obj);
          }
          if (data.code === 200) {
            this.lineDetailsArray.clear();
            this.lstcompolines = data.obj;
            if (this.lstcompolines.poStatus === 'Receipt Generated') {
              this.disabledViewAccounting = false;
              console.log(this.poStatus);
              this.displaySaveButton = true;
              this.disabled = false;
              this.isVisible = false;
              this.disabledLine = false;
              let control = this.poReceiptForm.get('poLines') as FormArray;
              for (let i = 0; i < this.lstcompolines.poLines.length; i++) {
                var poLines: FormGroup = this.lineDetailsGroup();
                control.push(poLines);
                var totLineAmt = (data.obj.poLines[i].totAmount).toFixed(2);
                this.lineDetailsGroup().patchValue({ totAmount: (data.obj.poLines[i].totAmount).toFixed(2) })
              }
              this.displaySaveButton = false;
              this.poReceiptForm.patchValue(this.lstcompolines);
            }
            else {
              this.lstcompolines = data.obj;
              this.disabled = true;
              this.isVisible = false;
              this.disabledLine = true;
              let control = this.poReceiptForm.get('poLines') as FormArray;
              for (let i = 0; i < this.lstcompolines.poLines.length; i++) {
                var poLines: FormGroup = this.lineDetailsGroup();
                control.push(poLines);
              }
              this.displaySaveButton = true;
              this.poReceiptForm.patchValue(this.lstcompolines);
              for (let j = 0; j < data.obj.poLines.length; j++) {
                // alert(data.obj.poLines[j].poLineId);
                (control.controls[j]).patchValue({
                  totAmount: data.obj.poLines[j].totAmount.toFixed(2),
                  unitPrice: data.obj.poLines[j].unitPrice.toFixed(2),
                  baseAmount: data.obj.poLines[j].baseAmount.toFixed(2),
                  sgstAmt: data.obj.poLines[j].sgstAmt.toFixed(2),
                  cgstAmt: data.obj.poLines[j].cgstAmt.toFixed(2),
                  igstAmt: data.obj.poLines[j].igstAmt.toFixed(2),
                  taxAmount: data.obj.poLines[j].taxAmount.toFixed(2),
                });
              }
              this.locatorDesc = this.lstcompolines.rcvLines[0].locatorDesc;
              this.recDate = this.lstcompolines.receiptDate;

            }
          }
        }
      );
  }



  poFind1(segment1) {
    this.displaySaveButton = false;
    // alert(segment1);
    console.log(this.poReceiptForm.value);
    this.service.getsearchByPOlines(segment1)
      .subscribe(
        data => {
          if (data.code === 400) {
            alert(data.message);
            // alert(data.obj);
          }
          if (data.code === 200) {
            // this.lstcompolines = data.obj;
            this.lineDetailsArray.clear();
            this.lstcompolines = data.obj;
            let control = this.poReceiptForm.get('poLines') as FormArray;
            var poLines: FormGroup = this.lineDetailsGroup();
            // var length1=this.lstcompolines.poLines.length-1;
            // this.lineDetailsArray.removeAt(length1);
            this.disabled = false;
            this.disabledLine = false;
            // control.push(poLines);
            for (let i = 0; i < this.lstcompolines.poLines.length; i++) {
              var poLines: FormGroup = this.lineDetailsGroup();
              control.push(poLines);
              // debugger;
            }
            this.poReceiptForm.patchValue(this.lstcompolines);
            let controlinv = this.poReceiptForm.get('poLines') as FormArray;

            for (let j = 0; j < data.obj.poLines.length; j++) {
              (controlinv.controls[j]).patchValue({
                subInventoryId: data.obj.poLines[j].subInventoryId,
              });
            }
            this.locatorDesc = this.lstcompolines.poLines[0].locatorDesc;
            this.recDate = this.lstcompolines.receiptDate;
          }
        }
      );

  }

  poFind11(segment1) {
    this.displaySaveButton = true;
    // alert(segment1);
    console.log(this.poReceiptForm.value);
    this.service.getsearchByPOlines(segment1)
      .subscribe(
        data => {
          if (data.code === 400) {
            alert(data.message);
            // alert(data.obj);
          }
          if (data.code === 200) {
            // this.lstcompolines = data.obj;
            this.lineDetailsArray.clear();
            this.lstcompolines = data.obj;
            let control = this.poReceiptForm.get('poLines') as FormArray;
            // var poLines:FormGroup=this.lineDetailsGroup();
            // var length1=this.lstcompolines.poLines.length-1;
            // this.lineDetailsArray.removeAt(length1);
            this.disabled = false;
            this.disabledLine = false;
            for (let i = 0; i < this.lstcompolines.poLines.length; i++) {
              var poLines: FormGroup = this.lineDetailsGroup();
              control.push(poLines);
              // debugger;
            }
            // control.push(poLines);
            this.poReceiptForm.patchValue(this.lstcompolines);
            let controlinv = this.poReceiptForm.get('poLines') as FormArray;

            for (let j = 0; j < data.obj.poLines.length; j++) {
              (controlinv.controls[j]).patchValue({
                subInventoryId: data.obj.poLines[j].subInventoryId,
              });
            }
            this.locatorDesc = this.lstcompolines.rcvLines[0].locatorDesc;
            this.recDate = this.lstcompolines.receiptDate;
          }
        }
      );

  }

  PODateWise() {
    this.displaySaveButton = false;
    var frmDate = this.poReceiptForm.get('frmDate').value;
    // alert(frmDate);
    const formValue: IPODateWise = (this.poReceiptForm.value);
    formValue.toDate = frmDate;
    formValue.billToLocId = this.locId;
    var reqArr = [];
    reqArr.push({
      frmDate: formValue.frmDate,
      toDate: formValue.frmDate,
      // toDate:'2021-02-05',
      billToLocId: this.locId
    });
    // then to get the JSON string
    var jsonString = JSON.stringify(reqArr);
    this.service.poDateWiseFind(reqArr[0]).subscribe((res: any) => {
      this.lstPODateWiseData = res;
    });
  }


  POApproveDateWise() {
    this.displaySaveButton = false;
    this.service.POApproveDateWise(this.poDate, this.locId)
      .subscribe(
        data => {
          // var ApproveDateWise=data;
          this.lstPOApproveDateWise = data;
          this.ApproveDateWise = this.lstPOApproveDateWise.obj;
          //  this.lstPOApproveDateWise=ApproveDateWise[0].obj;

          console.log(this.lstPOApproveDateWise);
        }
      );
  }



  xyz(e) {

    if (e.target.value === '') {
      this.xyzdis = true;
    }
  }

  ReceiptDateWiseFind() {
    this.displaySaveButton = false;
    var frmDate = this.poReceiptForm.get('frmDate1').value;
    // alert(frmDate);
    const formValue: IPODateWise = (this.poReceiptForm.value);
    formValue.toDate = frmDate;
    formValue.billToLocId = this.locId;
    var reqArr = [];
    reqArr.push({
      frmDate: frmDate,
      toDate: formValue.toDate,
      // toDate:'2021-02-05',
      billToLocId: this.locId
    });
    // then to get the JSON string
    var jsonString = JSON.stringify(reqArr);
    this.service.receiptDateWiseFind(reqArr[0]).subscribe((res: any) => {
      this.lstReceiptDateWiseData = res;
      this.locatorDesc = this.lstcompolines.rcvLines[0].locatorDesc;
      this.recDate = this.lstcompolines.receiptDate;
    });
  }

  close() {
    // this.router.navigate(['login']);
    // this.router.navigate(['admin']);
    this.location.back();
  }

  okLocator(i) {

    console.log(this.lstcompolines.poLines[0].subInventoryId);

    var poControls = this.poReceiptForm.get('poLines').value;
    // var subinvetoryId = 
    // alert(this.lstcompolines.poLines[0].subInventoryId);
    poControls[i].locatorDesc =
      this.poReceiptForm.get('segment11').value + '.' +
      this.poReceiptForm.get('segment2').value + '.' +
      this.poReceiptForm.get('segment3').value + '.' +
      this.poReceiptForm.get('segment4').value + '.' +
      this.poReceiptForm.get('segment5').value;
    var locatorDesc = (poControls[i].locatorDesc).toUpperCase();
    this.service.getLocatorPoLines(locatorDesc, this.locId, this.lstcompolines.poLines[0].subInventoryId)
      .subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          var patch = this.poReceiptForm.get('poLines') as FormArray;
          (patch.controls[i]).patchValue({
            locatorDesc: res.obj.segmentName,
            locatorId: res.obj.locatorId,
          });
        }
        else {
          if (res.code === 400) {
            alert('Error : ' + res.message);
          }
        }
        // this.poReceiptForm.patchValue(this.lstcompolines);
      }
      );
  }


  openLocator(i) {
    let locatorDesc = this.lineDetailsArray.controls[i].get('locatorDesc').value;
    // alert(locatorDesc);
    if (locatorDesc != null) {
      var temp = locatorDesc.split('.');
      this.segment11 = temp[0];
      this.segment2 = temp[1];
      this.segment3 = temp[2];
      this.segment4 = temp[3];
      this.segment5 = temp[4];
    }
    this.content = i;
    let a = i + 1
    this.title = "Locator :" + a;
  }

  calculation(i, qty) {
    // alert(this.lstcompolines.poLines[i].qtyReceived);
    var patch = this.poReceiptForm.get('poLines') as FormArray;
    let quantity = this.lineDetailsArray.controls[i].get('qtyReceived').value;
    // alert(quantity); 
    let unitPrri = this.lineDetailsArray.controls[i].get('unitPrice').value;
    let taxPer = this.lineDetailsArray.controls[i].get('taxPercentage').value;
    // this.lineDetailsArray.controls[i]
    var baseAmt = unitPrri * quantity
    var taxAmt = baseAmt * taxPer / 100;
    (patch.controls[i]).patchValue({
      // baseAmount: baseAmt,  
      // taxAmount : taxAmt,
      // totAmount: baseAmt +taxAmt,
      baseAmount: (Math.round(((baseAmt) + Number.EPSILON) * 100) / 100).toFixed(2),
      taxAmount: Math.round(((taxAmt) + Number.EPSILON) * 100) / 100,
      totAmount: Math.round(((baseAmt + taxAmt) + Number.EPSILON) * 100) / 100,
    });
    //  alert("Validate");
    var trxLnArr = this.poReceiptForm.get('poLines').value;
    var trxLnArr1 = this.poReceiptForm.get('poLines') as FormArray
    let toBeIssuequantity = this.lstcompolines.poLines[i].qtyReceived;
    // var receivedqty=this.poReceiptForm.get('poLines').value.qtyReceived;
    //  let qty=trxLnArr[i].qtyReceived;  
    // alert(quantity+'receivedqty');
    // alert(toBeIssuequantity +' qty');
    if (toBeIssuequantity < quantity) {
      alert("You can not enter more than available quantity");
      trxLnArr1.controls[i].patchValue({ qtyReceived: '' });
      qty.focus();
      // this.displaySaveButton =false;   
    }
    if (quantity <= 0) {
      alert("Please enter quantity more than zero");
      trxLnArr1.controls[i].patchValue({ qtyReceived: '' });
      qty.focus();
      //  this.displaySaveButton =false;
    }
    // else{
    //   this.displaySaveButton =true;
    // }
  }

  Select(suppSiteId: number) {
  }

  refresh() {
    window.location.reload();
  }





  // onKey(event: any) {
  //   const aaa = this.segment1 + '.' + this.segment2 + '.' + this.segment3 + '.' + this.segment4 + '.' + this.segment5;
  //   this.segmentName = aaa;
  // }

  // onKey(event: any){
  //   alert('only tab')
  // }


  //       validate(i:number,qty1)
  // {alert("Validate");
  //   var trxLnArr=this.poReceiptForm.get('poLines').value;
  //   var trxLnArr1=this.poReceiptForm.get('poLines') as FormArray
  //   let avalqty=trxLnArr[i].qtyReceived;
  //   let qty=trxLnArr[i].qtyReceived;  
  //  alert(avalqty+'avalqty');
  //  alert(trxLnArr[i].primaryQty +' qty');
  //   if(qty>avalqty)
  //   {
  //     alert("You can not enter more than available quantity");
  //     trxLnArr1.controls[i].patchValue({primaryQty:''});
  //     qty1.focus();
  //   }
  //   if(qty<=0)
  //   {
  //     alert("Please enter quantity more than zero");
  //     trxLnArr1.controls[i].patchValue({primaryQty:''});
  //     qty1.focus();
  //   }

  // }


  poSave() {
    var loctorDesc1 = this.poReceiptForm.get('poLines').value;
    for (let i = 0; i < loctorDesc1.length; i++) {
      if (loctorDesc1[i].itemType === 'GOODS' && loctorDesc1[i].locatorDesc === null) {
        alert('Please Entered Locator !');
        return
      }
    }
    this.displaySaveButton = false;
    const totlCalControls = this.poReceiptForm.get('poLines').value;
    const formValue: IpoReceipt = this.poReceiptForm.value;
    formValue.baseAmount = this.poReceiptForm.get('baseAmount').value;
    formValue.taxAmt = this.poReceiptForm.get('taxAmt').value;
    formValue.totalAmt = this.poReceiptForm.get('totalAmt').value;
    formValue.billToLocId = Number(sessionStorage.getItem('locId'));
    this.locId = Number(sessionStorage.getItem('locId'));
    console.log(formValue);
    this.service.poSaveSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        this.receiptNo = res.obj;
        this.ReceiptFind(res.obj)
        this.disabled = false;
        this.disabledLine = false;
        this.disabledViewAccounting = false;
        alert(res.message);
      } else {
        if (res.code === 400) {
          alert(res.message);
          window.location.reload();
        }
      }
    });
  }

  viewAccounting(receiptNo: any) {
    // alert(receiptNo);
    this.service.viewAccounting1(receiptNo).subscribe((res: any) => {
      if (res.code === 200) {
        this.viewAccounting2 = res.obj;
        this.description = res.obj.description;
        this.periodName = res.obj.periodName;
        this.postedDate = res.obj.postedDate;
        this.jeCategory = res.obj.jeCategory;
        this.name1 = res.obj.name;
        this.ledgerId = res.obj.ledgerId;
        this.runningTotalDr = res.obj.runningTotalDr;
        this.runningTotalCr = res.obj.runningTotalCr;
        this.docSeqValue = res.obj.docSeqValue;
        console.log(this.description);

        this.viewAccounting1 = res.obj.glLines;
        console.log(this.viewAccounting1);
        // alert(res.message);
      } else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    });
  }

  poInvoiceCreation(segment1: any) {
    // alert(this.segment1);
    this.service.poinvCre(segment1).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.ReceiptFind(this.receiptNo);
      }
      else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    })
  }


  poAllFind(segment1: any) {
    // alert(this.segment1);
    // this.poNumber=this.poNumber;
    if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.service.poAllRecFind(segment1, (sessionStorage.getItem('locId'))).subscribe((res: any) => {
        if (res.code === 200) {
          this.poAllRecFind = res.obj;
          console.log(this.poAllRecFind);
          // alert(res.message);
        } else {
          if (res.code === 400) {
            alert(res.message);
          }
        }
      });
    }
    else if (Number(sessionStorage.getItem('deptId')) == 4) {
      // alert(this.accountLocId)
      this.service.poAllRecFind(segment1, this.accountLocId).subscribe((res: any) => {
        if (res.code === 200) {
          this.poAllRecFind = res.obj;
          console.log(this.poAllRecFind);
          // alert(res.message);
        } else {
          if (res.code === 400) {
            alert(res.message);
          }
        }
      });
    }
  }

  onOptionsLocationSelected(event) {
    // alert(event);
    this.poReceiptForm.patchValue({ locId: event })
  }


  grrReceiptPrint() {
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.service.downloadgrrPrint(this.receiptNo)
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      });
  }


  keytab(event, maxLength, nxtEle) {

    if (event.target.value.length === maxLength) {
      // alert('Focus'+nxtEle);
      if (nxtEle === 'input2') {
        event.target.value = event.target.value.toUpperCase();
        this.input2.nativeElement.focus();
      }
      if (nxtEle === 'input3') {
        event.target.value = event.target.value.toUpperCase();
        this.input3.nativeElement.focus();
      }
      if (nxtEle === 'input4') {
        event.target.value = event.target.value.toUpperCase();
        this.input4.nativeElement.focus();
      }
      if (nxtEle === 'input5') {
        event.target.value = event.target.value.toUpperCase();
        this.input5.nativeElement.focus();
        (document.getElementById('btnok') as HTMLInputElement).disabled = false;
      }
      if (nxtEle === 'input6') {
        event.target.value = event.target.value.toUpperCase();
        this.input6.nativeElement.focus();
      }
    }


  }

  message: string = "Please Fix the Errors !";
  msgType: string = "Close";
  getMessage(msgType: string) {
    this.msgType = msgType;
    if (msgType.includes("Save")) {
      this.submitted = true;
      (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
      if (this.poReceiptForm.invalid) {
        //this.submitted = false;
        (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '');
        alert('saving PO - Validator error');
        return;
      }
      this.message = "Do you want to SAVE the changes(Yes/No)?"

    }

    if (msgType.includes("Reset")) {
      this.message = "Do you want to Reset the changes(Yes/No)?"
    }

    if (msgType.includes("Close")) {
      this.message = "Do you want to Close the Form(Yes/No)?"
    }
    if (msgType.includes("poInvoiceCreation")) {
      this.message = "Do you want to Create PO AP Invoice(Yes/No)?"
    }

    return;
  }

  executeAction() {
    if (this.msgType.includes("Save")) {
      alert('saving PO');
      this.poSave();
    }

    if (this.msgType.includes("Reset")) {
      window.location.reload();
    }

    if (this.msgType.includes("Close")) {
      this.close();
    }

    if (this.msgType.includes("poInvoiceCreation")) {
      alert('PO Invoice creation');
      this.poInvoiceCreation(this.segment1);
    }
    return;
  }
  glReceiptFind(receiptno){
    // alert(receiptno)
    this.lineDetailsGroup().reset();
      this.service.getsearchByGlReceiptNo(receiptno)
        .subscribe(
          data => {
            if (data.code === 200) {
              // this.lstcompolines.reload();
              this.lstcompolines = data.obj;
              // alert(data.obj.receiptNo);
              if (data.obj.shipmentNumber != null) {
                // alert(data.obj.shipmentNo);
                this.isVisible = false;
              }
              else {
                this.isVisible = true;
              }
              var recDate1 = (data.obj.recDate, 'dd-MM-yyyy');
              this.poReceiptForm.patchValue(({ recDate: (data.obj.recDate, 'dd-MM-yyyy') }));
              let control = this.poReceiptForm.get('poLines') as FormArray;
              // debugger;
              for (var i = 0; i < this.lstcompolines.rcvLines.length-1; i++) {
                var poLines: FormGroup = this.lineDetailsGroup();
                control.push(poLines);
              }
              if (data.obj.poInvNum != null) {
                this.isVisible = false;
              }
              this.disabled = false;
              this.disabledLine = false;
              this.disabledViewAccounting = false;
              this.poReceiptForm.get('poLines').patchValue(this.lstcompolines.rcvLines);
              this.poReceiptForm.patchValue(this.lstcompolines);
              this.locatorDesc = this.lstcompolines.rcvLines[0].locatorDesc;
              this.recDate = this.lstcompolines.receiptDate;

              this.poReceiptForm.patchValue({ taxAmt: this.lstcompolines.totalTax });
              let controlinv1 = this.poReceiptForm.get('poLines') as FormArray;
              for (let j = 0; j < data.obj.rcvLines.length; j++) {
                (controlinv1.controls[j]).patchValue({
                  subInventoryId: data.obj.rcvLines[j].subInventoryId
                })
                // this.lineDetailsArray[j].patchValue({ subInventoryId: data.obj.rcvLines[j].subInventoryId })
              }
              let controlinv = this.poReceiptForm.get('poLines') as FormArray;
              for (let j = 0; j < data.obj.rcvLines.length; j++) {
                (controlinv.controls[j]).patchValue({
                  totAmount: data.obj.rcvLines[j].totAmount.toFixed(2),
                  unitPrice: data.obj.rcvLines[j].unitPrice.toFixed(2),
                  baseAmount: data.obj.rcvLines[j].baseAmount.toFixed(2),
                  sgstAmt: data.obj.rcvLines[j].sgstAmt.toFixed(2),
                  cgstAmt: data.obj.rcvLines[j].cgstAmt.toFixed(2),
                  igstAmt: data.obj.rcvLines[j].igstAmt.toFixed(2),
                  taxAmount: data.obj.rcvLines[j].taxAmount.toFixed(2),
                });
              }

            }
            else if (data.code === 400) {
              alert(data.message)
            }
          }

        );
    
  }
}












