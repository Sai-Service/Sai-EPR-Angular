import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service'
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location, } from "@angular/common";

@Component({
  selector: 'app-vehicle-service-history',
  templateUrl: './vehicle-service-history.component.html',
  styleUrls: ['./vehicle-service-history.component.css']
})
export class VehicleServiceHistoryComponent implements OnInit {

  vehicleServiceHistoryForm: FormGroup;

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  @ViewChild('epltable1', { static: false }) epltable1: ElementRef;

  dataDisplay: any;
  dt: any;

  loginName:string;
  loginArray:string;
  name:string;
  ouName : string;
  ouId:number;
  deptId:number;
  locId: number;
  locName : string;
  locCode:string;
  emplId :number;
  orgId:number;
  divisionId : number;
  divisionName:string;


  progress = 0;
  message = '';
  selectFile?: File;
  pipe = new DatePipe('en-US');
  now = Date.now();
  resMsg : string;
  lstMessage: any;

  fileName :string; 
  docType :string;
  lstBackOrder : any;
  
  vehRegNo:string;
  updStatus =false;
  closeResetButton =true;
  fileValidation=false;
  viewLogFile=false;
  backorderStatus=false;
  msg:string;
  
  @ViewChild('fileInput') fileInput;

  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private service: MasterService) {
    this.vehicleServiceHistoryForm = this.fb.group({

     
      loginArray:[''],
      loginName:[''],
      ouName :[''],
      ouId:[],
      deptId:[],
      locId:[''],
      locName :[''],
      locCode:[],
      emplId:[''],
      divisionId :[''],
      divisionName:[''],

      msg:[],
      fileName:['',Validators.required],
      docType:['',Validators.required],

      vehRegNo:[],
      
      


    });
  
  }

  
  vehicleServiceHistory(vehicleServiceHistoryForm:any){}
  get f() { return this.vehicleServiceHistoryForm.controls; }
  
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
    this.locCode=(sessionStorage.getItem('locCode'));  
    this.deptId=Number(sessionStorage.getItem('dept'));
    // this.emplId= Number(sessionStorage.getItem('emplId'));
   
    this.orgId=this.ouId;
    console.log(this.loginArray);
    console.log(this.locId);
    
    
    // this.service.getBackOrderStatusBajaj(this.locId)
    // .subscribe(
    //   data => {
    //     console.log(data);
    //     // alert ("data.obj :"+ data.obj);
    //     if(data.obj===null) { this.backorderStatus =false; this.msg=data.message;} 
    //     else {this.backorderStatus=true;this.msg="Back order Found."}
    //   }
    // );

 
  
  }

  showHist() {

    alert (" Vehicle History......wip");
  }

  
  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }


  message1:string="PleaseFixtheErrors!";
  msgType:string="Close";
  getMessage(msgType:string){
  this.msgType=msgType;
  if(msgType.includes("Reset")){
  this.message="DoyouwanttoResettheForm(Yes/No)?"
  }
  
  if(msgType.includes("Close")){
  this.message="DoyouwanttoClosetheForm(Yes/No)?"
  }
  return;
  }
  
  
  executeAction(){
  
  if(this.msgType.includes("Reset")){
  window.location.reload();
  }
  
  if(this.msgType.includes("Close")){
  this.router.navigate(['admin']);
  }
  return;
  }

}
