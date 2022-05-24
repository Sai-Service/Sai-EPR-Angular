import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MasterService } from 'src/app/master/master.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { DatePipe, Location } from '@angular/common';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';


interface IBookOrderChetak {}


@Component({
  selector: 'app-booking-order-chetak',
  templateUrl: './booking-order-chetak.component.html',
  styleUrls: ['./booking-order-chetak.component.css']
})

export class BookingOrderChetakComponent implements OnInit {
  bookingOrderChetakForm: FormGroup;

  pipe = new DatePipe('en-US');
  now = Date.now();
  public minDate = new Date();
  public OUIdList            : Array<string> = [];
  public locIdList: Array<string> = [];
  public PeriodList          : Array<string> = [];
  public bnkHeaderList       : Array<string> = [];
  public statusList          : Array<string> = [];


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

  get f() { return this.bookingOrderChetakForm.controls; }

  bookingOrderChetak(bookingOrderChetakForm:any) {  }

  constructor(private fb: FormBuilder, private location1: Location, private service: MasterService, private orderManagementService: OrderManagementService,private router: Router) {
    this.bookingOrderChetakForm = fb.group({

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

     
      // oeOrderLinesAllList: this.fb.array([this.orderlineDetailsGroup()]),
    })
  }

  ngOnInit(): void {
    this.name=  sessionStorage.getItem('name');
    this.loginArray=sessionStorage.getItem('divisionName');
    this.divisionId=Number(sessionStorage.getItem('divisionId'));
    this.loginName=sessionStorage.getItem('name');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId=Number(sessionStorage.getItem('ouId'));
    this.locId=Number(sessionStorage.getItem('locId'));
    this.deptId=Number(sessionStorage.getItem('dept'));
    this.emplId= Number(sessionStorage.getItem('emplId'));
    this.orgId=this.ouId;
    console.log(this.loginArray);
    console.log(this.locId);
  }


  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }

}
