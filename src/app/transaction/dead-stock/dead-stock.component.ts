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

interface IdeadStock {
  segment: string;
  dFlag: string;
}

export class dedList {
  ouId:number;
  locationCode:string;
  segment: string;
  description:string;
  days:number;
  quantity: number;
  averageCost: number;
  totalAmount: number;
  transDate:Date;
  attribute1:string;
}


@Component({
  selector: 'app-dead-stock',
  templateUrl: './dead-stock.component.html',
  styleUrls: ['./dead-stock.component.css']
})


export class DeadStockComponent implements OnInit {
  deadStockForm: FormGroup;

  @ViewChild('aForm') aForm: ElementRef;

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  @ViewChild('epltable1', { static: false }) epltable1: ElementRef;
  @ViewChild('orderList', { static: false }) orderList: ElementRef;

  pipe = new DatePipe('en-US');
  public minDate = new Date();

  // lstClearBackOrder: any;
  // lstOrderList: any;
  // lstLatestOrder: any;
  // public lstItemDetails: any;

  public OUIdList: Array<string> = [];
  public locIdList: Array<string> = [];
  public DepartmentList: Array<string> = [];
  public statusList: Array<string> = [];

  lstDeadItems: any;
  

  dataDisplay: any;spinIcon = false;
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

  nMonths: number;
  stk: string;
  stkCategory:string;
  totalValue :number;
  totalRecords:number;
  displayButton = false;
  exportExcel=false;
  dedFlagButton =true;

   constructor(private service: MasterService, private orderManagementService: OrderManagementService, private transactionService: TransactionService, private fb: FormBuilder, private router: Router) {
    this.deadStockForm = fb.group({

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

      nMonths: [],
      stk: [],
      stkCategory: [],

      totalValue :[],
      totalRecords:[],



      deadItemList: this.fb.array([this.lineDetailsGroup()])

    });
  }
  lineDetailsGroup() {
    return this.fb.group({
       dedId:[],
       locId: [],
       locationCode:[],
       ouId:[],
       itemId:[],
       segment:[],
       description:[],
       dflag:[],
       createdBy:[],
       creationDate: [],
       lastUpdatedBy:[],
       lastUpdationDate: [],
       attribute1: [],
       onHandId: [],
       days:[],
       quantity:[],
       averageCost:[],
       totalAmount:[],
       transactionId:[],
       transDate: [],

     });
  }

  lineDetailsArray(): FormArray {
    return <FormArray>this.deadStockForm.get('deadItemList')
  }

  get f() { return this.deadStockForm.controls; }

  deadStock(deadStockForm: any) { }

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



  //   this.service.OUIdList()
  //   .subscribe(
  //     data => {
  //       this.OUIdList = data;
  //       console.log(this.OUIdList);
  //     }
  //   );

  // this.service.locationIdList()
  //   .subscribe(
  //     data => {
  //       this.locIdList = data;
  //       console.log(this.locIdList);
  //     }
  //   );


      this.service.OUIdListDiv(this.divisionId)
      .subscribe(
        data => {
          this.OUIdList = data;
          console.log(this.OUIdList);
        }
      );

    this.service.getLocationSearch1(this.ouId)
    .subscribe(
      data => {
        this.locIdList = data;
        console.log(this.locIdList);

      }
        );


  this.service.DepartmentList()
    .subscribe(
      data => {
        this.DepartmentList = data;
        console.log(this.DepartmentList);

      }
    );
  }


  clearSearch() {
    this.deadStockForm.get('stk').reset();
    this.deadStockForm.get('stkCategory').reset();
    this.deadStockForm.get('nMonths').reset();
    
    // this.lstJobcardList = null;
  }
 

  getDeadList() {
    this.ShowDeadList();

  }

  ShowDeadList() {
    this.dedFlagButton=false;
    // alert ("Not Transacted  for Months :"+nMths);
    var mOrgId = this.deadStockForm.get('ouId').value
    var nMths = this.deadStockForm.get('nMonths').value
    this.spinIcon=true;
    this.dataDisplay ='Loading Data....Pls wait..';
   
    this.service.getDeadStockList(mOrgId,'Y')
      .subscribe(
        data => {
          this.lstDeadItems = data;
          // alert ("Total Items Found :" +data.length);
          this.totalRecords=data.length;
          if (data.length > 0) {
            
            this.exportExcel=true;
            console.log(this.lstDeadItems);
            var len = this.lineDetailsArray().length;
            var y = 0;
            for (let i = 0; i < this.lstDeadItems.length - len; i++) {
              var ordLnGrp: FormGroup = this.lineDetailsGroup();
              this.lineDetailsArray().push(ordLnGrp);
              y = i;

            }

            this.deadStockForm.get('deadItemList').patchValue(this.lstDeadItems);
            // this.spinIcon = false;this.dataDisplay = ''; 
            this.displayButton=true;
            this.CalculateDeadStockValue();

          // } else { alert (mOrderNumber+ "  - Order Number doesn't exists");
          //          this.spinIcon=false; this.dataDisplay=null;
          //          this.orderGenerationForm.get('orderNumber').enable();}
        } else { alert ("No Records Found ....");  this.spinIcon = false;  this.dataDisplay = '';   }
      });
    }


    CalculateDeadStockValue() {
      var patch = this.deadStockForm.get('deadItemList') as FormArray;
      var deadLineArr = this.deadStockForm.get('deadItemList').value;
      var len = this.lineDetailsArray().length;
      var deadTotal = 0;
  
      for (let i = 0; i < len; i++) {
        var lineValue = deadLineArr[i].quantity * deadLineArr[i].averageCost;
  
        lineValue = Math.round((lineValue + Number.EPSILON) * 100) / 100,
          // patch.controls[i].patchValue({ totalValue: lineValue });
          deadTotal = deadTotal + lineValue
  
      }
  
      deadTotal = Math.round((deadTotal + Number.EPSILON) * 100) / 100,
        this.deadStockForm.patchValue({ totalValue: deadTotal })
        this.spinIcon=false;
        this.dataDisplay=null;
  
    }


  transeData(val) {
    delete val.loginArray;
    delete val.loginName;
    delete val.divisionId;
    delete val.division;
    delete val.ouName;
    delete val.locName;
    delete val.locationId;
    delete val.orgId;
    delete val.fromDate;
    delete val.toDate;
    delete val.orderDate;
    return val;
  }


    deadFlagging() {
      const formValue: IdeadStock = this.transeData(this.deadStockForm.value);
      var dDays = this.deadStockForm.get('nMonths').value
      var ouId = this.deadStockForm.get('ouId').value
  
      if(dDays===null || dDays===undefined || dDays.trim()==='' || dDays <=0) { alert ("Please select Aging Days...."); return;}

      this.dedFlagButton=false;
      this.spinIcon = true;
      this.dataDisplay = 'Dead Stock Flagging in Progress....Please wait';
  
      this.service.deadFlg(ouId,dDays).subscribe((res: any) => {
        if (res.code === 200) {
          alert('Flagging Completed...');
          this.spinIcon = false;
          this.dataDisplay = ''; 
          this.ShowDeadList()
        } else {
          if (res.code === 400) {
            // alert('Error While Flagging Record:-' + res.obj);
            alert('Flagging Completed...');
           this.spinIcon = false;
            this.dataDisplay = '';
            this.ShowDeadList()
          }
        }
      });
    }


  updateMst(){
    // http://localhost:8081/DedStock/addLine

    const formValue: IdeadStock = this.transeData(this.deadStockForm.value);
    var dedLineArr = this.deadStockForm.get('deadItemList').value;
    var len1 = dedLineArr.length;

    // for (let i = 0; i < len1; i++) {
    //   this.CheckTdsLineValidations(i);
    // }
    // if (this.tdsLineValidation) {
    //   alert("TDS data Validation Sucessfull....Posting data...")

      this.displayButton = false;
      this.spinIcon = true;
      this.dataDisplay = 'Updating data....Please wait';

      var dedLines = this.deadStockForm.get('deadItemList').value;
      console.log(dedLines);
      this.service.deadLineAddUpdate(dedLines).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.deadStockForm.disable();
          this.spinIcon = false;
          this.dataDisplay = ''; 
        } else {
          if (res.code === 400) {
            alert(res.message);
            this.displayButton = true;
            this.spinIcon = false;
            this.dataDisplay = ''; 
          
          }
        }
      });
    // } else { alert("TDS data Validation Not Sucessfull....\nPosting Not Done...") }

  }

  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }

  addNewRow() {
    var len1 = this.lineDetailsArray().length - 1;
    this.addRow(len1);
  }

  addRow(index) {
  
    var dedLineArr = this.deadStockForm.get('deadItemList').value;
    var len1 = this.lineDetailsArray().length - 1;
    if (len1 === index) {
      if (dedLineArr[index].itemId > 0 && dedLineArr[index].segment !=null) {
        this.lineDetailsArray().push(this.lineDetailsGroup());
      } else {

        if(index>0) {
        alert("Incomplete Line....Line will be deleted ");
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

  validateItem(index) {}

  enterKeyLock(i) {
    alert('Enter Not Allowed.!');
    // this.setFocus('orderQty' + i);
    return;
  }

  dedHedaerList = [[
    'Operating Unit',
    'Location Code',
    'Part No',
    'Descreption	',
    'Aging Days',
    'Quantity',
    'Price',
    'Amount',
    'Trans Date',
    'Remark',
  ]]

  deadStockListExport() {
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet([]);
    xlsx.utils.sheet_add_aoa(ws, this.dedHedaerList);
    var orList = this.deadStockForm.get('deadItemList').value;
    var xlOrdList: any = [];
    for (let i = 0; i < orList.length; i++) {
      var ordLn = new dedList();

      ordLn.ouId = orList[i].ouId;
      ordLn.locationCode = orList[i].locationCode;
      ordLn.segment = orList[i].segment;
      ordLn.description = orList[i].description;
      ordLn.days = orList[i].days;
      ordLn.quantity = orList[i].quantity;
      ordLn.averageCost = orList[i].averageCost;
      ordLn.totalAmount = orList[i].totalAmount;
      ordLn.transDate = orList[i].transDate;
      ordLn.attribute1 = orList[i].attribute1;
      xlOrdList.push(ordLn);
    }
    xlsx.utils.sheet_add_json(ws, xlOrdList, { origin: 'A2', skipHeader: true });
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'deadStockList.xlsx');
  }

}
