import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MasterService } from 'src/app/master/master.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { DatePipe, Location } from '@angular/common';
import { saveAs } from 'file-saver';


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



  }

}
