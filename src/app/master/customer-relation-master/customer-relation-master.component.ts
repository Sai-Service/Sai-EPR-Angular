import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators , FormArray } from '@angular/forms';
import { MasterService } from '../master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ThemeService } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';

interface ICustRelMaster { }

@Component({
  selector: 'app-customer-relation-master',
  templateUrl: './customer-relation-master.component.html',
  styleUrls: ['./customer-relation-master.component.css']
})

export class CustomerRelationMasterComponent implements OnInit {
    custRelationMasterForm: FormGroup;

    pipe = new DatePipe('en-US');
    now = Date.now();

    

    public PriceListIdList : Array<string> = [];
    // public EmployeeList : Array<string> = [];
    EmployeeList : any=[];
    CustomerMapList :any[];
    priceListLineDetails1 : any=[];

    loginName:string;
    loginArray:string;
    name:string;
    ouName : string;
    ouId:number;
    locId: number;
    deptId:number;
    locName : string;
    emplId :number;
    orgId:number;
    divisionId : number;
    divisionName:string;
    
    employeeId:number;
    ticketNo:string;
    empTktNo:string;
    custName:string;
    emplName:string;
    empDesig:string;
    empStatus:string ='Active';
    startDate = this.pipe.transform(Date.now(), 'y-MM-dd');
    endDate:Date;

  constructor(private service: MasterService, private fb: FormBuilder, private router: Router) 
    {
      this.custRelationMasterForm = fb.group({

      loginArray:[''],
      loginName:[''],
      ouName :[''],
      ouId:[''],
      locId:[''],
      locName :[''],
      emplId:[''],
      divisionId :[''],
      divisionName:[''],

      employeeId:[],
      ticketNo:[],
      empTktNo:[],
      custName:[],

      emplName:[],
      empDesig:[],
      empStatus:[],
      startDate:[],
      endDate:[],

      custList: this.fb.array([this.lineDetailsGroup()])   

      });
    }

    lineDetailsGroup() {
      return this.fb.group({ 
        customerId:[''],
        custAccountNo :['', [Validators.required]],    
        custName:['', [Validators.required]],
        custAddr: ['', [Validators.required]],
        custMobile: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
       });
    }
  
   lineDetailsArray() :FormArray{
      return <FormArray>this.custRelationMasterForm.get('custList')
    }
   

  get f() { return this.custRelationMasterForm.controls; }
  custRelationMaster(custRelationMasterForm:any) {  }

  ngOnInit(): void {

    this.name=  sessionStorage.getItem('name');
    this.loginArray=sessionStorage.getItem('divisionName');
    this.divisionName=sessionStorage.getItem('divisionName');
    this.divisionId=Number(sessionStorage.getItem('divisionId'));
    this.loginName=sessionStorage.getItem('name');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId=Number(sessionStorage.getItem('ouId'));
    this.locId=Number(sessionStorage.getItem('locId'));
    this.locName=(sessionStorage.getItem('locName'));
    this.deptId=Number(sessionStorage.getItem('dept'));
    this.emplId= Number(sessionStorage.getItem('emplId'));
   
    this.orgId=this.ouId;
    console.log(this.loginArray);
    console.log(this.locId);


   

    this.service.employeeLst(this.locId,this.divisionId,this.deptId)
    .subscribe(
      data => {
        this.EmployeeList = data;
        console.log(this.EmployeeList);
      }
    );

  }

  onSelectEmpTktNo(tktNo){

    let selectedValue = this.EmployeeList.find(d => d.ticketNo === tktNo);
    if( selectedValue != undefined){
    console.log(selectedValue);

    this.emplName=selectedValue.fullName;
    this.empDesig=selectedValue.designation;
    this.empStatus=selectedValue.status;
    this.employeeId=selectedValue.emplId
    // alert ("Employee Id :"+employeeId);

    // this.service.customerEmpMapList(employeeId,0,1)
    // .subscribe(
    //   data => {
    //     this.CustomerMapList = data;
    //     console.log(this.CustomerMapList);
    //   }
    // );

    }
  }


  SearchByEmpTktNo (){
    var mEmpId=this.custRelationMasterForm.get('employeeId').value;
    alert ("Cust-emp Id :"+mEmpId)

    this.service.customerEmpMapList(mEmpId,0,1)
    .subscribe(
      data => {
        this.CustomerMapList = data;
        console.log(this.CustomerMapList);
      });
    }

  


  SearchByCust (cust){
    alert("Search Cust...TktNo :"+cust);
  }
  

}
