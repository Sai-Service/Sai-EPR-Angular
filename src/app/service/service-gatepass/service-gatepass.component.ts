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
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

interface IServiceGatePass { 

  regNo:string;
  delvType:string;
  delvTakenBy:string;
  driverName:string;
  custAccountNo: number;
  delAuthBy:string;
  osAmt:number;
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
    gpNumList:any;

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
    dateOfDelv=this.pipe.transform(Date.now(), 'y-MM-dd');  
    gpByName:string;
    regNo:string;
    vin :string;
    mainModel:string;

    delvType:string='Self';
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
    osStatus=true;

    showGenForm=true;
    showPrintForm=false;
  
    optType:string;
    genGp :string;
    prnGp:string;
    delAuthBy:string;
    osAmt:number;

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
        dateOfDelv:[],
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

        optType:[],
        genGp :[],
        prnGp:[],
        delAuthBy:[],
        osAmt:[],

        });
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
          var mreg=this.serviceGatepassForm.get('regNo').value
          if(mreg==null || mreg==undefined || mreg.trim()=='') {
            alert ("Enter Valid Vehicle Registration No."); return;
          }
          // alert ("mreg1:"+this.regNo+"....");
          mreg=mreg.toUpperCase();
          mreg=mreg.trim();
          this.regNo=mreg;
          // alert ("this.regno :"+this.regNo+"...");
         
          this.service.getVehRegDetailsNew(mreg)
            .subscribe(
              data => {
                this.getVehRegDetails = data.obj;
  
                if(this.getVehRegDetails !=null){
                console.log(this.getVehRegDetails);

                if (this.showPrintForm) {this.LoadGatePassList(mreg);}
  
                this.serviceGatepassForm.patchValue({
                  customerId: this.getVehRegDetails.customerId,
                  mainModel: this.getVehRegDetails.mainModel,
                  vin: this.getVehRegDetails.vin,
                  custName:this.getVehRegDetails.custName,
                  custAccountNo:this.getVehRegDetails.custAccountNo,
                  
                });
                  this.GetCustomerDetails(this.getVehRegDetails.customerId);
                // this.GetCustomerSiteDetails(this.getVehRegDetails.customerId);??
                if(this.showGenForm) {this.GetJobcardList();}
              }  else { alert("Vehicle Regno. Not Found....");this.resetMast();  }
  
              });
            
        }

        LoadGatePassList(regNum){
          var jLocId=this.locId;
          var jcNum=null;
          var jDate=null;
          var jStatus ='Closed';
          var jRegNo=regNum;

          this.serviceService.getJonCardNoSearchLoc(jcNum,jDate,jStatus,jRegNo,jLocId)
          .subscribe(
            data => {
              if(data.length>0) {this.printGPbutton=true;
              this.lstJobcardList = data;
              console.log(this.lstJobcardList); } else {this.printGPbutton=false; alert ("No Record Found...");}
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

    if(formValue.osAmt>0) {
    if (formValue.delAuthBy === undefined || formValue.delAuthBy === null || formValue.delAuthBy.trim()=='') {
      this.checkValidation = false;
      alert("AUTHORISED BY: Should not be null....");
      return;
    } 
   }

 
  if (formValue.delvTakenBy === undefined || formValue.delvTakenBy === null || formValue.delvTakenBy.trim()=='') {
    this.checkValidation = false;
    alert("DELIVERY TAKEN BY: Should not be null....");
    return;
  }

  this.checkValidation=true;

}

GetJobcardList() {
  var jLocId=this.locId;
  var jcNum=null;
  var jDate=null;
  var balAmt=0;
  // var jStatus ='Invoiced'
  var jStatus =null;
  var jRegNo=this.serviceGatepassForm.get('regNo').value
  jRegNo=jRegNo.toUpperCase();


  this.serviceService.getPendingjcListForGP(jRegNo,jLocId)
  .subscribe(
    data => {
      if(data.length>0) {
        this.lstJobcardList = data;
        // alert ("this.lstJobcardList.length :"+this.lstJobcardList.length);
        for (let i = 0; i < this.lstJobcardList.length; i++) {
          
          if(this.lstJobcardList[i].status ==='Opened' || this.lstJobcardList[i].status ==='Ready for Invoice' || this.lstJobcardList[i].status ==='Closed') {
            this.gpButton=false;
            break;
          }
            balAmt=balAmt+ Number(this.lstJobcardList[i].balance);
           this.gpButton=true;
          } 
          // alert ("gpButton : :"+this.gpButton);
     
          this.osAmt=balAmt
          if(balAmt >0) {this.osStatus=true;} else {this.osStatus=false;}

          this.jobCardNum=data[0].jobCardNum;
          console.log(this.lstJobcardList); 

      } else {alert ("No Jobcard available to Gatepass...");this.gpButton=false;}
     });
    
}

GenerateGatePass() { 
  this.CheckGPvalidation();
if(this.checkValidation===false) {
  return;
}
this.gpButton=false;
var delAuthBy;
var jcNum=this.serviceGatepassForm.get('jobCardNum').value;
var regNum=this.serviceGatepassForm.get('regNo').value;
var osAmt=this.serviceGatepassForm.get('osAmt').value;
var delType=this.serviceGatepassForm.get('delvType').value;

// alert ("reg no :" +regNum);

if (osAmt<=0) {delAuthBy=null} else { delAuthBy=this.serviceGatepassForm.get('delAuthBy').value; }

this.serviceService.generateServiceGatePass(regNum,sessionStorage.getItem('locId'),osAmt,delAuthBy,delType).subscribe((res: any) => {
    if (res.code === 200) {
      this.printGPbutton=true;
      alert(res.message);
      this.gpNumber = res.obj.gatepassId;
      this.serviceGatepassForm.disable();
    } else {
      if (res.code === 400) {
        this.printGPbutton=false;
         alert(res.message +  res.obj);
         this.gpButton=true;
      }
    }
  });
}

printGP(){

  
  var regNum=this.serviceGatepassForm.get('regNo').value
  var gpNum=this.serviceGatepassForm.get('gpNumber').value

  if(gpNum==undefined || gpNum==null || gpNum<=0) {alert("Gate Pass Number not Selected..."); return;}
  if(regNum==undefined || regNum==null || regNum.trim()==''){return;}

  const fileName = 'download.pdf';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  this.serviceService.printWsGatePass(regNum,gpNum,sessionStorage.getItem('locId'))
    .subscribe(data => {
      var blob = new Blob([data], { type: 'application/pdf' });
      var url = URL.createObjectURL(blob);
      var printWindow = window.open(url, '', 'width=800,height=500');
      printWindow.open
      
    });
}



radioEvent(event:any){
  // alert(event.target.value);
  this.clearForm();
  if( event.target.value==='genGp') {this.showGenForm=true;this.showPrintForm=false;
          this.dateOfDelv=this.pipe.transform(Date.now(), 'y-MM-dd');   }
   else {this.showPrintForm=true;this.showGenForm=false;}
   }

   

 clearForm() {
   this.regNo=null;this.gpNumber=null;this.dateOfDelv=null;this.gpByName=null;
   this.vin=null;this.mainModel=null;this.custAccountNo=null;this.customerType=null;
   this.custAddress=null;this.custCity=null;this.custState=null;this.custPincode=null;
   this.custPhone=null;this.custEmail=null;this.custContact=null;this.delvType=null;
   this.delvTakenBy=null;this.driverName=null;
   this.lstJobcardList=null;this.custName=null;
 }

 onSelectGatePassNum(gpNum) {
  //   alert ("Gate Pass num :"+gpNum);
  //   let select = this.lstJobcardList.find(d => d.gatepassId === gpNum);
  //   if(select) {
  //     this.serviceGatepassForm.patchValue({dateOfDelv : select.dateOfDelv});
  //    }
  //  }

 this.serviceService.getGatePassIdDetails(gpNum)
 .subscribe(
   data => {
      //  this.lstJobcardList = data; 
        this.serviceGatepassForm.patchValue({
        delAuthBy: data.obj.delAuthBy,
        delvTakenBy: data.obj.custName,
        osAmt: data.obj.osAmt,
        dateOfDelv :data.obj.dateOfDelv, delvType:data.obj.delvType });
       });
    }

    onInput(event) {
       event.target.value = event.target.value.toLocaleUpperCase();
     
    }

 }
