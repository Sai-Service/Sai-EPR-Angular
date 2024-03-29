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
import { mapToMapExpression } from '@angular/compiler/src/render3/util';

interface IRecTransTypeMaster {

}

@Component({
  selector: 'app-receivable-transtype-master',
  templateUrl: './receivable-transtype-master.component.html',
  styleUrls: ['./receivable-transtype-master.component.css']
})
export class ReceivableTranstypeMasterComponent implements OnInit {
  recTransTypeMasterForm : FormGroup;

        pipe = new DatePipe('en-US');
        now = Date.now();
        public minDate = new Date();

        public OUIdList            : Array<string> = [];
        public DepartmentList      : Array<string> = [];
        // public classTypeList       : Array<string> = [];

        classTypeList:any;
        categoryBaseList:any;
        receivableAccountList:any;
        revenueAccountList:any;
        creditMemoTypeList:any;


        lstcomments: any;

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

        transTypeName:string;
        transTypeDesc:string;
        type:string;
        creationSign:string;

        tranStatus:string;
        creditMemoTypeId:number;

        startDate:string=this.pipe.transform(Date.now(), 'y-MM-dd');
        endDate:string;

        defaultStatus:string;
        postToGL:string;
        adjPostToGL:string;

        TRUEd = false; FALSEd = false;
        TRUEp = false; FALSEp = false;
        TRUEa = false; FALSEa = false;

        defaultStatusFlg = true;
        postToGLflg = true;
        adjPostToGLflg = true;

        glIdRecAcct:number;
        glIdRevAcct:number;

        attributeCategory:number;
        accountingBase:string;



        displayButton = true;



    get f() { return this.recTransTypeMasterForm.controls; }
    recTransTypeMaster(recTransTypeMasterForm:any) {  }

    constructor(private service: MasterService,private  fb: FormBuilder, private router: Router) {
    this.recTransTypeMasterForm = fb.group({

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

      transTypeName:[],
      transTypeDesc:[],
      type:[],
      creationSign:[],
      tranStatus:[],
      creditMemoTypeId:[],
      startDate:[],
      endDate:[],

      glIdRecAcct:[],
      glIdRevAcct:[],
      attributeCategory:[],
      accountingBase:[],

      // recoverableFlag: ['', [Validators.required]],
      // offsetFlag: ['', [Validators.required]],
      // selfAssesedFlag: ['', [Validators.required]],

      defaultStatus:[],
      postToGL:[],
      adjPostToGL:[],
      
  
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


    this.service.OUIdList()
    .subscribe(
      data => {
        this.OUIdList = data;
        console.log(this.OUIdList);
      }
    );

    this.service.DepartmentList()
    .subscribe(
      data => {
        this.DepartmentList = data;
        console.log(this.DepartmentList);
      }
    );

    this.service.recTypeClass()
    .subscribe(
      data => {
        this.classTypeList = data;
        console.log(this.classTypeList);
      }
    );

    this.service.recCreditMemoType("Credit Memo")
    .subscribe(
      data => {
        this.creditMemoTypeList = data;
        console.log(this.creditMemoTypeList);
      }
    );


    

    this.service.recCategoryBase()
    .subscribe(
      data => {
        this.categoryBaseList = data;
        console.log(this.categoryBaseList);
      }
    );

    this.service.recRecAcList()
    .subscribe(
      data => {
        this.receivableAccountList = data;
        console.log(this.receivableAccountList);
      }
    );

    this.service.recRevAcList()
    .subscribe(
      data => {
        this.revenueAccountList = data;
        console.log(this.revenueAccountList);
      }
    );


  }

  // onSelectClassType(event){
  // this.service.recCreditMemoType(event)
  // .subscribe(
  //   data => {
  //     this.creditMemoTypeList = data;
  //     console.log(this.creditMemoTypeList);
  //   }
  // );
  // }

  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }

  onOptionsSelected(event: any) {
    var status1 = this.recTransTypeMasterForm.get('tranStatus').value;
    // alert(this.Status1);
    if (status1=== 'Closed') {
      // this.displayInactive = false;
      this.endDate = this.pipe.transform(Date.now(), 'y-MM-dd');
    }
    else if (status1 === 'Open') {
      this.recTransTypeMasterForm.get('endDate').reset();
      // this.displayInactive=true;
    }
  }

  defaultStatus1(e) {
    if (e.target.checked === true) {
      this.defaultStatus = 'Y'
    }
    if (e.target.checked === false) {
      this.defaultStatus = 'N'
    }

    // alert ('Recoverable flag =' + this.recoverableFlag);
  }

  ///////////////////////Applicable for Offset  CheckBox/////////////////////////
  postToGL1(e) {
    if (e.target.checked === true) {
      this.postToGL = 'Y'
    }
    if (e.target.checked === false) {
      this.postToGL = 'N'
    }
  }
  ///////////////////////Self Assessed /Reverse Change  CheckBox/////////////////////////
  adjPostToGL1(e) {
    if (e.target.checked === true) {
      this.adjPostToGL = 'Y'
    }
    if (e.target.checked === false) {
      this.adjPostToGL = 'N'
    }
  }

  onGlRecAcctSelected(event){
    if(event >0) {

    var rec =this.recTransTypeMasterForm.get("glIdRecAcct").value
    var rev=this.recTransTypeMasterForm.get("glIdRevAcct").value
    // alert("Receivable A/c :"+event +" ,Rec= "+rec +" ,Rev= "+rev)
    if(rec===rev) {
      alert ("RECEIVABLE A/c  and  REVENUE A/c should not be same.");
      this.recTransTypeMasterForm.get("glIdRecAcct").reset();
    }

  } }

  onGlRevAcctSelected(event){
    if(event >0) {

    var rec =this.recTransTypeMasterForm.get("glIdRecAcct").value
    var rev=this.recTransTypeMasterForm.get("glIdRevAcct").value
    // alert("Revenue A/c :"+event +" ,Rec= "+rec +" ,Rev= "+rev)
    if(rec===rev) {
      alert ("RECEIVABLE A/c  and  REVENUE A/c should not be same.");
      this.recTransTypeMasterForm.get("glIdRevAcct").reset();
    }
  }}

  newMast() {

    // this.CheckDataValidations();

    // if (this.checkValidation===true) {
    //   alert("Data Validation Sucessfull....\nPosting data  to ORDER TYPE TABLE")

    // const formValue: IRecTransTypeMaster =this.recTransTypeMasterForm.value;
    const formValue: IRecTransTypeMaster =this.transeData(this.recTransTypeMasterForm.value);
    this.service.RecTransTypeMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFULLY');
          this.recTransTypeMasterForm.disable();
      } else {
        if (res.code === 400) {
          alert('Code already present in the data base');
          }
      }
    });
  // } else{ alert("Data Validation Not Sucessfull....\nPosting Not Done...")  }
  }


  transeData(val) {
    // delete val.divisionId;
    delete val.division;
    delete val.loginArray;
    delete val.loginName;
    delete val.ouName;
    delete val.locName;
    delete val.orgId;
    return val;
  }



}
