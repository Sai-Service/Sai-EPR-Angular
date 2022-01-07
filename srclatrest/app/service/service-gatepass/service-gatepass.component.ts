import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators , FormArray } from '@angular/forms';
import { MasterService } from '../../master/master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InteractionModeRegistry } from 'chart.js';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { ServiceService } from '../service.service';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';

interface IServiceGatePass { 

  regNo:string;
  delvType:string;
  delvTakenBy:string;
  driverName:string;
  custAccountNo: number;
}

@Component({
  selector: 'app-service-gatepass',
  templateUrl: './service-gatepass.component.html',
  styleUrls: ['./service-gatepass.component.css']
})


export class ServiceGatepassComponent implements OnInit {
  serviceGatepassForm : FormGroup;

    message = '';
    pipe = new DatePipe('en-US');
    now = Date.now();
    public minDate = new Date();

    public OUIdList            : Array<string> = [];
    public pickupTypeList: Array<string> = [];

    getVehRegDetails: any;
    CustomerDetailsList: any;
    CustomerSiteDetails: any;
    lstJobcardList :any
    lstStatementLines:any
    lstAvlBnkLines:any;
    lstcomments:any;

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


    gpNumber :string;
    gpDate=this.pipe.transform(Date.now(), 'y-MM-dd');  
    gpByName:string;
    regNo:string;
    vin :string;
    mainModel:string;

    delvType:string;
    delvTakenBy:string;
    driverName:string;

    customerId: number;
    custAccountNo: number;
    customerType: string;
    custName: string;
    custAddress:string;
    custCity: string;
    custState: String;
    custPincode: string;
    CustomerGstNo: string
    custPhone: string;
    custEmail: string;
    custContact: string;
    jobCardNum:string;

    checkValidation=false;
    gpButton=false;
    printGPbutton=false;
  

          
    get f() { return this.serviceGatepassForm.controls; }
    serviceGatepass(serviceGatepassForm:any) {  }

    constructor(private fb: FormBuilder, private router: Router, private orderManagementService: OrderManagementService, private service: MasterService, private serviceService: ServiceService) {
      this.serviceGatepassForm = fb.group({ 

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

        gpNumber :[],
        gpDate:[],
        gpByName:[],
        regNo:[],
        vin :[],
        mainModel :[],

        delvType:[],
        delvTakenBy:[],
        driverName:[],

        customerId: [],
        custAccountNo: [],
        customerType: [],
        custName: [],
        custAddress:[],
        custCity: [],
        custState: [],
        custPincode: [],
        CustomerGstNo: [],
        custPhone: [],
        custEmail: [],
        custContact: [],

        jobCardNum:[],
        });
    }
  
   


  
    ngOnInit(): void {

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


      this.serviceService.pickupTypeListFN()
      .subscribe(
        data1 => {
          this.pickupTypeList = data1;
          console.log(this.pickupTypeList);
        }
      );



    }

    
    // clearSearch(){}
    // newJob(){}

    // jobcardFind() {
    //   var jcNum=this.serviceGatepassForm.get('jcNumber').value
    //   jcNum=jcNum.toUpperCase();
             
    //   this.serviceService.getJonCardNoSearch(jcNum)
    //     .subscribe(
    //       data => {
    //         this.lstJobcardList = data.obj;
    //         console.log(this.lstJobcardList); 
    //         // alert(data.driverName);
       
    //       });
        
    //     }


        serchByRegNo(mRegNo) {
        
          var mreg1=this.serviceGatepassForm.get('regNo').value
          if(mreg1==null || mreg1==undefined || mreg1.trim()=='') {
            alert ("Enter Valid Vehicle Registration No."); return;
          }

          var mreg=mreg1.toUpperCase();
          // alert(mreg);
          this.service.getVehRegDetails(mreg)
            .subscribe(
              data => {
                this.getVehRegDetails = data;
  
                if(this.getVehRegDetails !=null){
                console.log(this.getVehRegDetails);
  
                this.serviceGatepassForm.patchValue({
                  customerId: this.getVehRegDetails.customerId,
                  mainModel: this.getVehRegDetails.mainModel,
                  vin: this.getVehRegDetails.vin,
                  
                });
                  this.GetCustomerDetails(this.getVehRegDetails.customerId);
                // this.GetCustomerSiteDetails(this.getVehRegDetails.customerId);??
                this.GetJobcardList();
              }  else { alert("Vehicle Regno. Not Found....");this.resetMast();  }
  
              });
            
        }
  
        GetCustomerDetails(mCustId: any) {
          // alert("Customer Id: "+mCustId);
          this.service.ewInsSiteList(mCustId)
            .subscribe(
              data1 => {
                this.CustomerDetailsList = data1;
                console.log(this.CustomerDetailsList);
                this.serviceGatepassForm.patchValue({
                  custAccountNo: this.CustomerDetailsList.custAccountNo,
                  custName: this.CustomerDetailsList.custName,
                  customerType: this.CustomerDetailsList.custType,
                  custAddress :this.CustomerDetailsList.address1 + ","+
                               this.CustomerDetailsList.address2 +","+
                               this.CustomerDetailsList.address3 +","+
                               this.CustomerDetailsList.address4,
                  custCity : this.CustomerDetailsList.city,
                  custState : this.CustomerDetailsList.state,
                  custPincode : this.CustomerDetailsList.pinCd,
                  custPhone : this.CustomerDetailsList.mobile1,
                  custEmail : this.CustomerDetailsList.emailId,
                  custContact: this.CustomerDetailsList.contactPerson,
                  delvTakenBy:this.CustomerDetailsList.custName,
                });
              });
        }
  
  
         
resetMast() {
  window.location.reload();
}
          
GetJobcardList() {
  var jLocId=this.locId;
  var jcNum=null;
  var jDate=null;
  var jStatus ='Invoiced'
  var jRegNo=this.serviceGatepassForm.get('regNo').value
  jRegNo=jRegNo.toUpperCase();

  this.serviceService.getJonCardNoSearchLoc(jcNum,jDate,jStatus,jRegNo,jLocId)
  .subscribe(
    data => {
      if(data.length>0) {
        this.gpButton=true;
      this.lstJobcardList = data;
      this.jobCardNum=data[0].jobCardNum;
      console.log(this.lstJobcardList); 
      } else {alert ("No Jobcard available to Gatepass...");this.gpButton=false;}
     });
    
}


message1:string="PleaseFixtheErrors!";
msgType:string="Close";

getMessage(msgType:string){
// alert ("msgType :"+msgType)
 this.msgType=msgType;
if(msgType.includes("gPass")){ this.message="Generate Gatepass for this Vehicle(Yes/No)?"} 

}

  executeAction(){
  if(this.msgType.includes("gPass")){
  this.GenerateGatePass(); }
  }


  GenerateGatePass() { 
    this.CheckGPvalidation();
  if(this.checkValidation===false) {
    return;
  }
  this.gpButton=false;
 var jcNum=this.serviceGatepassForm.get('jobCardNum').value;
 this.serviceService.generateServiceGatePass(jcNum).subscribe((res: any) => {
      if (res.code === 200) {
        this.printGPbutton=true;
        alert(res.message);
        this.gpNumber = res.obj.gatepassId;
        this.serviceGatepassForm.disable();
      } else {
        if (res.code === 400) {
          this.printGPbutton=false;
           alert(res.message);
        }
      }
    });
  }

  

CheckGPvalidation() {
  var msg1;
  const formValue: IServiceGatePass = this.serviceGatepassForm.value

  if (formValue.regNo === undefined || formValue.regNo === null || formValue.regNo.trim()=='') {
    this.checkValidation = false;
    msg1="REGISTRATION NO: Should not be null....";
    alert(msg1);
    return;
  }

  if (formValue.delvType === undefined || formValue.delvType === null || formValue.delvType.trim()=='') {
    this.checkValidation = false;
    alert("DELIVERY TYPE: Should not be null....");
    return;
  }

  if (formValue.driverName === undefined || formValue.driverName === null || formValue.driverName.trim()=='') {
    this.checkValidation = false;
    alert("DRIVER NAME: Should not be null....");
    return;
  }

  if (formValue.delvTakenBy === undefined || formValue.delvTakenBy === null || formValue.delvTakenBy.trim()=='') {
    this.checkValidation = false;
    alert("DELIVERY TAKEN BY: Should not be null....");
    return;
  }

  this.checkValidation=true;

}


printGP(){
  var jcNum=this.serviceGatepassForm.get('jobCardNum').value
  const fileName = 'download.pdf';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  this.serviceService.printWsGatePass(jcNum)
    .subscribe(data => {
      var blob = new Blob([data], { type: 'application/pdf' });
      var url = URL.createObjectURL(blob);
      var printWindow = window.open(url, '', 'width=800,height=500');
      printWindow.open
      
    });
}


    
        

}
