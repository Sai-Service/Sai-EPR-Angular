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

interface IOrderGen {
  segment: string;
  dFlag: string;
}


@Component({
  selector: 'app-dead-stock',
  templateUrl: './dead-stock.component.html',
  styleUrls: ['./dead-stock.component.css']
})


export class DeadStockComponent implements OnInit {
  deadStockForm: FormGroup;

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

      nMonths: string;
      stk: string;
      stkCategory:string;
      totalValue :number;
      totalRecords:number;

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
    var mOrgId = this.deadStockForm.get('ouId').value
    var nMths = this.deadStockForm.get('nMonths').value
     this.ShowDeadList(mOrgId,nMths);

  }

  ShowDeadList(mOrgId,nMths) {

    alert ("Not Transacted  for Months :"+nMths);
   
    this.spinIcon=true;
    this.dataDisplay ='Loading Data....Pls wait..';
   
    this.service.getDeadStockList(mOrgId,'Y',nMths)
      .subscribe(
        data => {
          this.lstDeadItems = data;
          // alert ("Total Items Found :" +data.length);
          this.totalRecords=data.length;
          if (data.length > 0) {
           
            console.log(this.lstDeadItems);
            var len = this.lineDetailsArray().length;
            var y = 0;
            for (let i = 0; i < this.lstDeadItems.length - len; i++) {
              var ordLnGrp: FormGroup = this.lineDetailsGroup();
              this.lineDetailsArray().push(ordLnGrp);
              y = i;

            }

            this.deadStockForm.get('deadItemList').patchValue(this.lstDeadItems);
            this.spinIcon = false;this.dataDisplay = ''; 
           
            // this.CalculateOrdValue();

          // } else { alert (mOrderNumber+ "  - Order Number doesn't exists");
          //          this.spinIcon=false; this.dataDisplay=null;
          //          this.orderGenerationForm.get('orderNumber').enable();}
        } else { alert ("No Records Found ....");  this.spinIcon = false;  this.dataDisplay = '';   }
      });
    }


  updateMst(){}

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
  
    var ordLineArr = this.deadStockForm.get('deadItemList').value;
    var len1 = this.lineDetailsArray().length - 1;
    if (len1 === index) {
      if (ordLineArr[index].itemId > 0 && ordLineArr[index].orderQty >= 0) {
        this.lineDetailsArray().push(this.lineDetailsGroup());
      } else {

        if(index>0) {
        alert("Incomplete Line -  Part No /  Qty not updated ....Line will be deleted ");
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

}
