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
import { typeWithParameters } from '@angular/compiler/src/render3/util';

interface ICustRelMaster { 
  employeeId:number;
  ticketNo:string;
  empTktNo:string;
  custName:string;
  emplName:string;
  empDesig:string;
}

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
    EmployeeList : any=[];
    CustomerMapList :any[];
    CustomerEmpMapList :any;
    lstcomments: any[];
    lstCustDetails: any;

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
    customerNo:number;
    custName:string;
    emplName:string;
    empDesig:string;
    empStatus:string ='Active';
    startDate = this.pipe.transform(Date.now(), 'y-MM-dd');
    endDate:Date;

    displayButton=true;
    lineItemRepeated=false;
    headerValidation=true;
    lineValidation=true;

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
      customerNo:[],
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
        // custAccountNo:[],
        custAccountNo :['', [Validators.required]],    
        custName:['', [Validators.required]],
        address1: ['', [Validators.required]],
        contactNo: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        emplId:[],
        locId:[],
       });
    }
  
   lineDetailsArray() :FormArray{
      return <FormArray>this.custRelationMasterForm.get('custList')
    }
   

  get f() { return this.custRelationMasterForm.controls; }
  custRelationMaster(custRelationMasterForm:any) {  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
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
    this.lineDetailsArray().reset();
    this.displayButton=true;
    }
  }


  SearchByEmpTktNo (){
    // var mEmpId=this.custRelationMasterForm.get('employeeId').value;
   
    // this.service.getCustomerEmpMapList(mEmpId,0,1)
    // .subscribe(
    //   data => {
    //     this.CustomerMapList = data;
    //     console.log(this.CustomerMapList);
    //   });
    }

  SearchByCust (custNo){
    this.service.customerEmpMapSearch(custNo,this.locId)
    .subscribe(
      data => {
        this.CustomerEmpMapList = data.obj;
        if(this.CustomerEmpMapList !=null) {
         console.log(this.CustomerEmpMapList);
         this.custRelationMasterForm.patchValue({
          empTktNo: this.CustomerEmpMapList.ticketNo,
          emplName: this.CustomerEmpMapList.fullName,
          empDesig: this.CustomerEmpMapList.designation,
          empStatus: this.CustomerEmpMapList.status,
          startDate: this.CustomerEmpMapList.startDate,
          endDate: this.CustomerEmpMapList.endDate,

        });  }  else {

        (this.custRelationMasterForm.patchValue(
          {
            empTktNo:  '',  emplName:'', empDesig:  '', empStatus: '',  startDate: '',  endDate:'', }));
            alert ("Customer No : "+custNo + " Not Mapped to  any Ticket No.");
      }
      });
    }

        newMast()  {
      
          this.CheckHeaderValidations();
          if (this.headerValidation==false ) {alert("Header Validation Failed... Please Check");  return;}
    
          this.lineValidation=false;
          var custLineArr = this.custRelationMasterForm.get('custList').value;
          var len1=custLineArr.length;
          
          for (let i = 0; i < len1 ; i++) 
            {
              this.CheckLineValidations(i);
              if(this.lineValidation==false){break;}
            }

        if(this.lineValidation===false) { 
          alert("Line Validation Failed...\nPlease check all line data fields are updated properly..")
          return;
        }
          this.displayButton=false;
          var custLines = this.custRelationMasterForm.get('custList').value;
           var len1 = custLines.length;
            console.log(custLines);
            this.service.custRelationPostSubmit(custLines).subscribe((res: any) => {
              if (res.code === 200) {

                alert(res.message);
                } else {
                if (res.code === 400) {
                  this.displayButton=true;
                  alert(res.message);
                ;
                }
              }
            });
            

        }


  searchMast(pageNo) {
    this.CheckHeaderValidations();
    if (this.headerValidation==false ) {return;}

    this.service.getCustomerEmpMapList(this.employeeId,pageNo,50)
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
  };

  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }

  
  searchCustomer(index) {

    this.CheckHeaderValidations();
    var patch = this.custRelationMasterForm.get('custList') as FormArray;
    if(this.headerValidation==false) {
      patch.controls[index].patchValue({custAccountNo: '' });return;}
  
    var custLineArr = this.custRelationMasterForm.get('custList').value;
    var custAcNo = custLineArr[index].custAccountNo;
    this.service.searchCustomerByAccount(custAcNo)
      .subscribe(
        data => {
          this.lstCustDetails = data.obj;

          if(data.code===400){

            (patch.controls[index]).patchValue(
              {
                customerId:  '',
                custAccountNo:'',
                custName:  '',
                address1: '',
                contactNo: '',
                startDate: '',
                endDate:'',
                emplId:'',
                locId:','
              }
            ); alert (custAcNo+ " - Customer Account Not found in Customer Master");return;
          }

          if(data.code===200 && data.obj !=null){
          console.log(this.lstCustDetails);

          this.service.customerEmpMapSearch(custAcNo,this.locId)
          .subscribe(
            data1 => {
              this.CustomerEmpMapList = data1.obj;
              // alert ("this.CustomerEmpMapList :"+this.CustomerEmpMapList + " ,"+data1.obj);

              if(this.CustomerEmpMapList !=null) {
                alert (custAcNo+" - Customer  Already Mapped to this Ticket No.");return; }

              else {


                this.duplicateLineCheck(this.lstCustDetails.customerId,index,this.lstCustDetails.custAccountNo);
                if (this.lineItemRepeated){ this.lineDetailsArray().removeAt(index);}
                (patch.controls[index]).patchValue(
                  {
                    customerId:  this.lstCustDetails.customerId,
                    custName:  this.lstCustDetails.custName,
                    address1: this.lstCustDetails.address1,
                    contactNo: this.lstCustDetails.contactNo,
                    startDate: this.lstCustDetails.startDate,
                    endDate:this.lstCustDetails.endDate,
                    emplId:this.employeeId,
                    locId:this.locId,
                  }
                );

              }  

            });

          }


        }
      );  
  }


    addRow(index) {
        var custLineArr = this.custRelationMasterForm.get('custList').value;
      
        var len1=this.lineDetailsArray().length-1;
        // alert ("Len1 :" +len1 + "  index :"+index);
        if(index===len1) {
          if( custLineArr[index].customerId>0) {
          this.lineDetailsArray().push(this.lineDetailsGroup()); 
         }else {alert ("Incomplete Line ");}
        }
    }

    RemoveRow(index) {
      if (index===0){ }
      else {
         this.lineDetailsArray().removeAt(index);
      }
    
    }

    duplicateLineCheck(mCustId,index,custNo) {
      var varLineArr = this.custRelationMasterForm.get('custList').value;
      for (let i = 0; i <  this.lineDetailsArray().length ; i++) 
      {
         var x=varLineArr[i].customerId;
         if( i !=index && x===mCustId) {
          alert(custNo+" - Customer No Already in the List .Check Line :"+(i+1));
          this.lineItemRepeated=true;
          return;
        } 
        }
        this.lineItemRepeated=false;
      }

      CheckHeaderValidations(){
    
        const formValue: ICustRelMaster = this.custRelationMasterForm.value;
    
            if (formValue.employeeId<=0 || formValue.employeeId===null || formValue.employeeId===undefined)
            {
              this.headerValidation=false; 
              alert ("Header Details Not Found...Select Employee.");
                return;
            } 
          this.headerValidation=true;
    
        }

        CheckLineValidations(i) {

          var custLineArr1 = this.custRelationMasterForm.get('custList').value;
          var lineValue1=custLineArr1[i].customerId;
          var lineValue2=custLineArr1[i].custAccountNo;
          var lineValue3=custLineArr1[i].emplId;
          var j=i+1;
        if(lineValue1<=0 || lineValue2<=0 || lineValue3<=0) {
            alert("Line-"+j+ " : Incomplete Line Details.Please Check");
            this.lineValidation=false;
            return;
          } 
          this.lineValidation=true;

        }
  

  

}
