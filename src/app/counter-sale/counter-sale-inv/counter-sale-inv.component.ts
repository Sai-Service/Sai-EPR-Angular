import { Component, OnInit, HostListener, ViewChild, ElementRef, NgModule, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormControlName, NgForm, Validators, FormArray, FormsModule, Form, } from '@angular/forms';
import { Url } from 'url';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CounterSaleService } from '../counter-sale.service';
import { SalesOrderObj } from '../sales-order-obj'
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-counter-sale-inv',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './counter-sale-inv.component.html',
  styleUrl: './counter-sale-inv.component.css'
})
export class CounterSaleInvComponent {
  CounterSaleOrderBookingForm: FormGroup;
  emplId: number;
  locCode: string;
  locId: number;
  locationId: number;
  ouId: number;
  billLocName: string;
  shipLocName: string;
  customerId: number;
  orderNumber:number;
  custAccountNo:number;



isDisabled11 = false;
displayCustomerSite = true;

  constructor(private fb: FormBuilder,private router1: ActivatedRoute, private router: Router, private orderManagementService: CounterSaleService) {
    this.CounterSaleOrderBookingForm = fb.group({
      emplId: [],
      locCode: [],
      locId: [],
      locationId: [],
      ouId: [],
      billLocName: [],
      shipLocName: [],
      customerId: [],
      orderNumber:[],
      state:[],
      emailId:[],
      emailId1:[],
      birthDate:[],
      weddingDate:[],
      gstNo:[],
      panNo:[],
      perAdd:[],
      custAccountNo:[],

    })
  }


  CounterSaleOrderBooking(CounterSaleOrderBookingForm: any) {
  }


  OrderFind(){
    var orderNumber1 = this.CounterSaleOrderBookingForm.get('orderNumber')?.value;
  }


accountNoSearch(){
  var accountNo = this.CounterSaleOrderBookingForm.get('custAccountNo')?.value;
}


onOptionsSelectedcustSiteName(event:any){

}
}
