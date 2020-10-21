import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from '../master.service';

interface IcustomerMaster{
  custType:string;
  title:string;
  customerId1:number;
  fName:string;
  mName:string;
  lName:string;
  custName:string;
  address1:string;
  address2:string;
  address3:string;
  address4:string;
  city:string;
  pinCd:number;
  state:string;
  mobile1:number;
  mobile2:number;
  mobile3:number;
  emailId:string;
  emailId1:string;
  contactPerson:string;
  contactNo:number;
  birthDate:Date;
  weddingDate:Date;
  endDate:Date;
  gstNo:string;
  panNo:string;
  tanNo:string;
}



@Component({
  selector: 'app-customer-master',
  templateUrl: './customer-master.component.html',
  styleUrls: ['./customer-master.component.css']
})

export class CustomerMasterComponent implements OnInit {
    customerMasterForm: FormGroup;
    custType:string;
   PersonType: any;
   displayPerson: boolean; 
   displayOrgnization:boolean;
   title:string;
   customerId1:number;
   fName:string;
   mName:string;
   lName:string;
   custName:string;
   address1:string;
   address2:string;
   address3:string;
   address4:string;
   city:string;
   pinCd:number;
   state:string;
   mobile1:number;
   mobile2:number;
   mobile3:number;
   emailId:string;
   emailId1:string;
   contactPerson:string;
   contactNo:number;
   birthDate:Date;
   weddingDate:Date;
   endDate:Date;
   gstNo:string;
   panNo:string;
   tanNo:string;
   lstcomments: any[];
   displayButton = true;
  
    public custTypeList:Array<string>[];
    public titleList:Array<string>[];
    public cityList:Array<string>[];
    public pinCdList:Array<string>[];
    public stateList:Array<string>[];
  
    constructor(private fb: FormBuilder, private router: Router, private service: MasterService) { 
      this.customerMasterForm = fb.group({
        customerId1:[''],
        title:['',Validators.required],
        custType:['',Validators.required],
        fName:['',Validators.required],
        mName:['',Validators.required],
        lName:['',Validators.required],
        custName:['',Validators.required],
        address1:['',Validators.required],
        address2:['',Validators.required],
        address3:['',Validators.required],
        address4:['',Validators.required],
        city:['',Validators.required],
        pinCd:['',Validators.required],
        state:['',Validators.required],
        mobile1:['',Validators.required,Validators.pattern('[0-9]*'),Validators.maxLength(10)],
        mobile2:['',[Validators.pattern('[0-9]*'),Validators.maxLength(10)]],
        mobile3:['',[Validators.pattern('[0-9]*'),Validators.maxLength(10)]],
        emailId:['',Validators.required,Validators.email],
        emailId1:['',[Validators.email]],
        contactPerson:['',[Validators.required]],
        contactNo:['',[Validators.pattern('[0-9]*'),Validators.maxLength(10)]],
        birthDate:[''],
        weddingDate:[''],
        endDate:[''],
        gstNo:['', [Validators.required, Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{2}$"), Validators.maxLength(15)]],
        panNo:['', [Validators.required, Validators.pattern("^[A-Za-z]{5}[0-9]{4}[A-Za-z]$"), Validators.maxLength(10)]],
        tanNo:['']
      })
    }
  
    get f() { return this.customerMasterForm.controls; }
  
    ngOnInit(): void {
      this.service.custTypeList()
      .subscribe(
        data => {
          this.custTypeList = data;
          console.log(this.custTypeList);
        }
      );
  
      this.service.titleList()
      .subscribe(
        data => {
          this.titleList = data;
          console.log(this.titleList);
        }
      );
  
      this.service.cityList()
      .subscribe(
        data => {
          this.cityList = data;
          console.log(this.cityList);
        }
      );
  
      // this.service.pinCdList()
      // .subscribe(
      //   data => {
      //     this.pinCdList = data;
      //     console.log(this.pinCdList);
      //   }
      // );
  
      this.service.StateList()
      .subscribe(
        data => {
          this.stateList = data;
          console.log(this.stateList);
        }
      );
      
  
    }
  
    customerMaster(customerMaster: any) {
    }
  
  
  
    onOptioncustTypeSelected(event: any) {
      this.PersonType = this.customerMasterForm.get('custType').value;
      // alert(this.StatusPickUp);
      if (this.custType === 'Person') {
        this.displayPerson = true;
        this.displayOrgnization = false;
        } if (this.custType === 'Orgnization') {
        this.displayOrgnization = true;
        this.displayPerson = false;
      }
    }
  
  mergeCustName(fName,mName,lName){
    const aaa=fName+' '+mName+' '+lName;
    this.custName=aaa;
  }
  


}
