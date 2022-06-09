import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { MasterService } from 'src/app/master/master.service';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { Location,DatePipe } from "@angular/common";
import { saveAs } from 'file-saver';
// import { SalesOrderobj } from './sales-orderobj';

interface IOrderDetailUpdation {

}

@Component({
  selector: 'app-order-details-updation',
  templateUrl: './order-details-updation.component.html',
  styleUrls: ['./order-details-updation.component.css']
})



export class OrderDetailsUpdationComponent implements OnInit {
  orderDetailsUpdationForm: FormGroup;

  pipe = new DatePipe('en-US');
  now = Date.now();
  public minDate = new Date();

  public salesRepNameList: any;
  public ticketNoSearch: any;
  public mainModelList: Array<string>[];
  public VariantSearch: Array<string>[];
  public ColourSearch: any;
  public financeTypeList: any;
  public financerNameList: any = [];
  public YesNoList: Array<string> = [];
  truValueList: any;


  loginName:string;
  divisionId:number;
  loginArray:string;
  name:string;
  ouName : string;
  locId: number;
  locName : string;
  orgId:number;
  ouId :number;
  deptId:number; 
  emplId :number;

  orderNumber:number;
  orderDate:string;
  model:string;
  variant:string;
  color:string;
  fuelType:string;
 
  salesRepName:string;
  tlName:string;
  
  financeType:string;
  financerName:string;
  financeAmt:number;
  emi:number;
  tenure:number;
  downPayment:number;

  exchangeYN:string;
  loyaltyBonus:string;
  exRegNo:string;
  insCharges:number;
  offerPrice:number;
  tvBroker:string;

  custAccountNo:number;
  custName:string;
  title:string;
  address1:string;
  address2:string;
  address3:string;
  address4:string;
  city:string; 
  state:string;
  picd:string;



  DisplayfinanceSelectionYes = false;
  DisplayfinanceSelectionYes1 = false;
  Displayexchange = false;
  Displayexchange1 = false;

  orderDetailsUpdation(orderDetailsUpdationForm: any) {}
  get f() { return this.orderDetailsUpdationForm.controls }


  constructor(private fb: FormBuilder, private location1: Location, private service: MasterService, private orderManagementService: OrderManagementService) {
    this.orderDetailsUpdationForm = fb.group({ 

      loginArray:[''],
      loginName:[''],
      ouName :[''],
      divisionId:[],
      locId:[''],
      locName :[''],
      ouId :[],
      deptId :[],
      emplId:[''],
      orgId:[''],

      orderNumber:[],
      salesRepName:[],
      tlName:[],

      model:[],
      variant:[],
      color:[],
      fuelType:[],

      financeType:[],
      financerName:[],
      financeAmt:[],
      emi:[],
      tenure:[],
      downPayment:[],

      exchangeYN:[],
      loyaltyBonus:[],
      exRegNo:[],
      insCharges:[],
      offerPrice:[],
      tvBroker:[],

    })


  }


  ngOnInit(): void {

    $("#wrapper").toggleClass("toggled");
    this.name=  sessionStorage.getItem('name');
    this.loginArray=sessionStorage.getItem('divisionName');
    this.divisionId=Number(sessionStorage.getItem('divisionId'));
    this.loginName=sessionStorage.getItem('name');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId=Number(sessionStorage.getItem('ouId'));
    this.locId=Number(sessionStorage.getItem('locId'));
    // this.locName=(sessionStorage.getItem('locName'));
    this.deptId=Number(sessionStorage.getItem('dept'));
    this.emplId= Number(sessionStorage.getItem('emplId'));
    this.orgId=this.ouId;
    console.log(this.loginArray);
    console.log(this.locId);

    this.service.YesNoList()
    .subscribe(
      data => {
        this.YesNoList = data;
        console.log(this.YesNoList);
      }
    );

    this.service.salesRepNameList(this.ouId, this.locId, sessionStorage.getItem('deptId'))
    .subscribe(
      data => {
        this.salesRepNameList = data.obj;
        console.log(this.salesRepNameList);
      }
    );

    this.service.mainModelListDivisionWise(sessionStorage.getItem('divisionId'))
    .subscribe(
      data => {
        this.mainModelList = data;
        console.log(this.mainModelList);
      }
    );

    this.orderManagementService.getFinTypeSearch1()
      .subscribe(
        data => {
          this.financeTypeList = data;
          console.log(this.financeTypeList);
        }
      );
  }

  onOptionsSelectedTL(ticketNo: any) {
    // alert ("ticket id :"+ticketNo);
    var dept1 = Number(sessionStorage.getItem('deptId'));
    if (ticketNo != null) {
      this.orderManagementService.ticketNoSearchFn(ticketNo, dept1)
        .subscribe(
          data => {
            this.ticketNoSearch = data.obj;
            console.log(this.ticketNoSearch);
            this.tlName = this.ticketNoSearch.leadTicketNo;
          }
        );
    }
  }

  onOptionsSelectedColor(variant) {
    this.orderManagementService.ColourSearchFn(variant)
      .subscribe(
        data => {
          this.ColourSearch = data;
          console.log(this.ColourSearch);
          let select = this.ColourSearch.find(d => d.variant === variant);
          this.fuelType = select.fuelType;
        }
      );
  }

  onOptionsSelectedVariant(mainModel) {
     this.orderManagementService.VariantSearchFn(mainModel)
      .subscribe(
        data => {
          this.VariantSearch = data;
          console.log(this.VariantSearch);
        }
      );
    }


    
  financeSelectionYes(event: any) {
    // alert(event.target.value)
    if (event.target.value != 'None') {
      this.DisplayfinanceSelectionYes = true;
      this.DisplayfinanceSelectionYes1 = true;
      this.orderManagementService.finananceList(event.target.value, sessionStorage.getItem('divisionId'))
        .subscribe(
          data => {
            this.financerNameList = data;
            console.log(this.financerNameList);
          }
        );
    }
    else {
      this.DisplayfinanceSelectionYes = false;
      this.DisplayfinanceSelectionYes1 = false;
    }
    if (event.target.value === 'None') {
      this.orderDetailsUpdationForm.get('financerName').reset();
      this.orderDetailsUpdationForm.get('financeAmt').reset();
      this.orderDetailsUpdationForm.get('emi').reset();
      this.orderDetailsUpdationForm.get('tenure').reset;
      this.orderDetailsUpdationForm.get('downPayment').reset();
      this.orderDetailsUpdationForm.get('tenure').reset();
    }
  }

  
  exchangeYes(event: any) {
    //  alert(event.target.value);
    if (event.target.value === 'Y') {
      this.Displayexchange = false;
      this.Displayexchange1 = false;
      this.service.truValueListFn()
        .subscribe(
          data1 => {
            this.truValueList = data1;
            console.log(this.truValueList);
          }
        );
    }
    else {
      this.Displayexchange = true;
      this.Displayexchange1 = true;
    }
    if (event.target.value === 'N') {
      this.orderDetailsUpdationForm.get('loyaltyBonus').reset();
      this.orderDetailsUpdationForm.get('exRegNo').reset();
      this.orderDetailsUpdationForm.get('insCharges').reset();
      this.orderDetailsUpdationForm.get('offerPrice').reset();
    }
  }

  serchByOrderNum(orderNumber) {alert (orderNumber+"............WIP.............");}

}