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
        rClass:string;
        creationSign:string;

        tranStatus:string;
        creditMemoType:string;

        startDate:string=this.pipe.transform(Date.now(), 'y-MM-dd');  
        endDate:string;

        recoverableFlag: string;
        offsetFlag: string;
        selfAssesedFlag: string;

        TRUER = false; FALSER = false;
        TRUEs = false; FALSEs = false;
        TRUEo = false; FALSEo = false;

        recFlagDiss = true;
        offsetFlagFagDiss = true;
        selfAssesedFagDiss = true;

        recAccount:string;
        revAccount:string;



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
      rClass:[],
      creationSign:[],
      tranStatus:[],
      creditMemoType:[],
      startDate:[],
      endDate:[],

      recAccount:[],
      revAccount:[],

      recoverableFlag: ['', [Validators.required]],
      offsetFlag: ['', [Validators.required]],
      selfAssesedFlag: ['', [Validators.required]],
  
  
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


  }

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

  recoverableFlg1(e) {
    if (e.target.checked === true) {
      this.recoverableFlag = 'Y'
    }
    if (e.target.checked === false) {
      this.recoverableFlag = 'N'
    }

    // alert ('Recoverable flag =' + this.recoverableFlag);
  }

  ///////////////////////Applicable for Offset  CheckBox/////////////////////////
  offsetFlg(e) {
    if (e.target.checked === true) {
      this.offsetFlag = 'Y'
    }
    if (e.target.checked === false) {
      this.offsetFlag = 'N'
    }
  }
  ///////////////////////Self Assessed /Reverse Change  CheckBox/////////////////////////
  selfAssesedFlg(e) {
    if (e.target.checked === true) {
      this.selfAssesedFlag = 'Y'
    }
    if (e.target.checked === false) {
      this.selfAssesedFlag = 'N'
    }
  }



}
