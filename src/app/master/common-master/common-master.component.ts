// import { Component, OnInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';

import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from '../master.service';
import { DatePipe } from '@angular/common';


interface ICommon {
  cmnId:number;
  cmnTypeId:number;
  cmnType: string;
  cmnDesc: string;
  code:string;
  codeDesc:string;
  application: string;
  divisionId: number;
  startDate:string;
  endDate:string,
  status:string;
}

@Component({
  selector: 'app-common-master',
  templateUrl: './common-master.component.html',
  styleUrls: ['./common-master.component.css']
})
export class CommonMasterComponent implements OnInit {
  commonMasterForm: FormGroup;

  pipe = new DatePipe('en-US');
  now = Date.now();
  public minDate = new Date();

  application:string ='ALL'
  cmnId:number;
  cmnTypeId:number;
  cmnType: string;
  cmnDesc: string;
  // startDate:Date;
  startDate = this.pipe.transform(Date.now(), 'y-MM-dd');

  endDate:string;
  status:string="Active";
  code:string;
  codeDesc:string;
  lstcomments: any[];
  submitted = false;
  public applicationList: Array<string> = [];
  public DivisionIDList: Array<string> = [];
  // public cmnTypeList: Array<string> = [];
  public statusList : Array<string> = [];
  cmnTypeList: any;

  loginName:string;
  loginArray:string;
  divisionId:number;
  name:string;
  ouName : string;
  locId: number;
  locationId:number;
  locName : string;
  orgId:number;
  ouId :number;
  deptId:number; 
  emplId :number;

  displayInactive = true;
  Status1: any;
  inactiveDate: Date;
  display = true;
  displayButton = true;
  checkValidation=false;
  saveButton=true;
  updButton=true;
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.commonMasterForm = fb.group({
      // itemRows: this.fb.array([this.inItemRows()]),

      cmnId:[],
      cmnTypeId:[],
      cmnType: ['', [Validators.required]],
      cmnDesc: ['', [Validators.required]],
      application: ['', [Validators.required]],

      code:[],
      codeDesc:[],
      startDate:[],
      endDate:[],
      status:[],

      loginArray:[''],
      loginName:[''],
      divisionId:[],
      ouName :[''],
      locId:[],
      locationId:[],
      locName :[''],
      ouId :[],
      deptId :[],
      emplId:[''],
      orgId:[''],

    });
  }

 



  // inItemRows() {
  //   return this.fb.group({
  //     cmnType: [''],
  //     cmnDesc: ['']
  //   });
  // }


  // addRow() {
  //   const control = <FormArray>this.commonMasterForm.controls['itemRows'];
  //   control.push(this.inItemRows());
  // }

  get f() { return this.commonMasterForm.controls; }

  ngOnInit(): void {

    $("#wrapper").toggleClass("toggled");
    this.name=  sessionStorage.getItem('name');
    this.loginArray=sessionStorage.getItem('divisionName');
    this.loginName=sessionStorage.getItem('name');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId=Number(sessionStorage.getItem('ouId'));
    this.locId=Number(sessionStorage.getItem('locId'));
    this.locName=(sessionStorage.getItem('locName'));
    this.deptId=Number(sessionStorage.getItem('dept'));
    this.emplId= Number(sessionStorage.getItem('emplId'));
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.orgId=this.ouId;
    console.log(this.loginArray);
    console.log(this.locId);


    this.service.DivisionIDList()
      .subscribe(
        data => {
          this.DivisionIDList = data;
          console.log(this.DivisionIDList);
        });

    this.service.applicationList()
      .subscribe(
        data => {
          this.applicationList = data;
          console.log(this.applicationList);
        });

    this.service.cmnTypeListNew(sessionStorage.getItem('divisionId'))
      .subscribe(
        data => {
          this.cmnTypeList = data;
          console.log(this.cmnTypeList);
        });

      this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        });

  }

  commonMaster(commonMaster: any) {

  }

  saveComnMast() {

    this.CheckDataValidations()
    
    if (this.checkValidation===true) {
       alert("Data Validation Sucessfull....") 

    const formValue: ICommon = this.commonMasterForm.value;
    this.service.commonMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD SAVED SUCCESSFULLY');
        this.saveButton=false;
        this.commonMasterForm.disable();
        
      } else {
        if (res.code === 400) {
          alert('ERROR : RECORD NO SAVED ' + res.message);
          this.saveButton=true;
        }
      }
    });
  } else { alert ("Data Validation Failed....Save not done.")}
  }

  // updateComnMast(){alert ("Update ....WIP")}


  updateComnMast() {

    // this.CheckDataValidations();
    // if (this.checkValidation===true) {
    //     alert("Data Validation Sucessfull....\nPutting data to TAX REGIME MASTER  TABLE")
    // alert ("Cmn Id = "+this.cmnId)

        const formValue: ICommon = this.commonMasterForm.value;
        this.service.UpdateCommonMasterSubmit(formValue, this.cmnId).subscribe((res: any) => {
          if (res.code === 200) {
            alert('RECORD UPDATED SUCCESSFULLY');
            this.updButton=false;
          } else {
            if (res.code === 400) {
              alert('ERROR OCCOURED IN PROCEESS');
              this.updButton=true;
              // this.jaiRegimeMasterForm.reset();
            }
          }
          
        });
      // }else{ alert("Data Validation Not Sucessfull....\nData not Saved...")  }
  }

  onOptionsSelected(event: any) {
    this.Status1 = this.commonMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      // this.endDate = new Date();
      this.endDate = this.pipe.transform(Date.now(), 'y-MM-dd');
    }
    else if (this.Status1 === 'Active') {
      this.commonMasterForm.get('endDate').reset();
      this.displayInactive=true;
    }
  }



  searchCmnMst(){

    var searchText=this.commonMasterForm.get('cmnType').value;
       
      this.service.getCommonLookupSearchNew(searchText,sessionStorage.getItem('divisionId'))
    .subscribe(
      data => {
        this.lstcomments = data;
        console.log(this.lstcomments);
        // this.displayButton=false;
        }
    );
  }




Select(cmId: number) {
  // alert ('cmnId='+cmId)
  let select = this.lstcomments.find(d => d.cmnId === cmId);
  if (select) {
    this.commonMasterForm.patchValue(select);
    this.cmnId=select.cmnId;
    this.displayButton = false;
    // this.updButton=true;
    // this.commonMasterForm.disable();
    this.commonMasterForm.get('status').enable();

    this.display = false;
  }
}

onSelectType(cmnTp){
  let select = this.cmnTypeList.find(d => d.CMNTYPE === cmnTp);
  if (select) {
     var cmnTypeId1=  select.CMNTYPEID+1;
    //  alert ("Desc :" +select.CMNDESC + " , id : "+select.CMNTYPEID + "," +cmnTypeId1);
    this.commonMasterForm.patchValue({cmnDesc:select.CMNDESC ,cmnTypeId :cmnTypeId1 ,application :'ALL'})
  }
}

resetMast() {
  window.location.reload();
}

closeMast() {
  this.router.navigate(['admin']);
}


CheckDataValidations(){

  const formValue: ICommon = this.commonMasterForm.value;

  formValue.code =this.code.toUpperCase();
  formValue.codeDesc=this.codeDesc.toUpperCase()

  // alert ("code, desc : "+this.code + " , "+this.codeDesc);

  if (formValue.divisionId===undefined || formValue.divisionId===null || formValue.divisionId<0)
  {
    this.checkValidation=false; 
    alert ("DIVISION : Should not be null....");
    return;
  } 

  if (formValue.cmnType===undefined || formValue.cmnType===null || formValue.cmnType.trim()==='')
  {
    this.checkValidation=false; 
    alert ("TYPE NAME : Should not be null....");
    return;
  } 

  if (formValue.code===undefined || formValue.code===null || formValue.code.trim()==='' )
  {
    this.checkValidation=false; 
    alert ("CODE : Should not be null....");
    return;
  } 

  if (formValue.codeDesc===undefined || formValue.codeDesc===null || formValue.codeDesc.trim()==='' )
  {
    this.checkValidation=false; 
    alert ("CODE DESCRIPTION : Should not be null....");
    return;
  } 

  if (formValue.status===undefined || formValue.status===null || formValue.status.trim()==='' )
  {
    this.checkValidation=false; 
    alert ("STATUS : Should not be null....");
    return;
  } 

  if (formValue.startDate===undefined || formValue.startDate===null || formValue.startDate.trim()==='' )
  {
    this.checkValidation=false; 
    alert ("START DATE : Enter Valid Start Date....");
    return;
  } 

    this.checkValidation=true;

}

}

