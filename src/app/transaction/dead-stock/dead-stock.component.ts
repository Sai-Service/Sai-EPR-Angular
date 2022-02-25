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
  orderQty: number;
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

      nMonths: string;
      stk: string;
      stkCategory:string;

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

      status: [],
      orderDate: [],
      consCriteria: [],
      currMonthYN: [],
      orderValue: [],
      dlrCode: [],
      cdmsRefNo: [],

      mth1ConWsQty: [],
      mth2ConWsQty: [],
      mth3ConWsQty: [],
      mth1ConsSaleQty: [],
      mth2ConsSaleQty: [],
      mth3ConsSaleQty: [],


      partNumber: [],
      partDesc: [],

      currSaleQty: [],
      consSaleQty: [],
      currWsQty: [],
      conWsQty: [],



      deadItemList: this.fb.array([this.lineDetailsGroup()])

    });
  }
  lineDetailsGroup() {
    return this.fb.group({
      sprOrderId: [''],
      itemId: [''],
      segment: ['', [Validators.required]],
      description: ['', [Validators.required]],
      unitPrice: ['', [Validators.required]],

      mth1ConWsQty: ['', [Validators.required]],
      mth2ConWsQty: ['', [Validators.required]],
      mth3ConWsQty: ['', [Validators.required]],
      currWsQty: ['', [Validators.required]],
      conWsQty: ['', [Validators.required]],

      mth1ConsSaleQty: ['', [Validators.required]],
      mth2ConsSaleQty: ['', [Validators.required]],
      mth3ConsSaleQty: ['', [Validators.required]],
      currSaleQty: ['', [Validators.required]],
      consSaleQty: ['', [Validators.required]],

      lastOrderQty: [],
      mth1TotalCons: [],
      mth2TotalCons: [],
      mth3TotalCons: [],
      mth4TotalCons: [],
      totalCons: [],



      currentStock: ['', [Validators.required]],
      backOrderQty: ['', [Validators.required]],
      intransitQty: ['', [Validators.required]],
      custBackOrder: ['', [Validators.required]],

      orderQty: ['', [Validators.required]],
      totalValue: ['', [Validators.required]],
      uom: [],
      setQty: [],
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
  getDeadList(){}

}
