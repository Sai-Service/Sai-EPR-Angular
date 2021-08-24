import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { MasterService } from '../master.service';
import {Location} from '@angular/common';
// import { NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
// import '@angular/localize/init';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

interface IOperatingUnit {
  ouId: number;
  ouName: string;
  ouDesc: string;
  divisionId: number;
  // divId:number;
  compId: number;
  mainBrAdd: string;
  mState: string;
  country:string;
  startDate: Date;
  uheadCeo:string;
  status:string;
  endDate: Date;
  city:string;
}

@Component({
  selector: 'app-organization-master',
  templateUrl: './organization-master.component.html',
  styleUrls: ['./organization-master.component.css']
})
export class OrganizationMasterComponent implements OnInit {
  operatingUnitMasterForm: FormGroup;
  lstcomments: any[];
  submitted = false;
  ouId: number;
  ouName: string;
  ouDesc: string;
  // divId:number;
  divisionId: number;
  divisionName:string;
  compId: number;
  compName:String;
  mainBrAdd: string;
  mState: string;
  startDate: Date;
  uheadCeo:string;
  city:string;
  attribute1:string;

  public status ="Active"; 
  public country = 'INDIA';
  public minDate = new Date();
  displayButton = true;
  displayInactive = true;
  Status1: any;
  display = true;
  public cityList1: any;
  
  endDate: Date;

  public statusList: Array<string> = [];
  public StateList: Array<string> = [];
  public companyCodeList: Array<string> = [];
  public DivisionIDList: any[];
  public cityList: Array<string> = [];
  // page = 1;
  // pageSize =10;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService,private _location: Location) {
    this.operatingUnitMasterForm = fb.group({
      ouId: [],
      ouName: ['', [Validators.required,Validators.minLength(5), Validators.maxLength(15),Validators.pattern('[a-zA-Z 0-9 -]*')]],
      ouDesc: ['', [Validators.required,Validators.minLength(5),Validators.pattern('[a-zA-Z -]*')]],
      divisionId: ['', [Validators.required]],
      divisionName:[''],
      compId: ['', [Validators.required]],
      compName:[''],
      mainBrAdd: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(35),Validators.pattern('[a-zA-Z 0-9]*')]],
      mState: ['', [Validators.required]],
      country:[],
      startDate: ['', [Validators.required]],
      uheadCeo:['', [Validators.nullValidator,Validators.maxLength(35),Validators.pattern('[a-zA-Z ]*')]],
      status: ['', [Validators.required]],
      endDate:[],
      city:['',[Validators.required]]
    });

  //   for(let i = 1; i <= 100; i++){
  //     this.lstcomments.push({Name: 'Shop ' + i});
  //  }
  }
  get f() { return this.operatingUnitMasterForm.controls; }


  ngOnInit(): void {

  

    this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        }
      );
 
   
    this.service.StateList()  
    .subscribe(
      data => {
        this.StateList = data;
        console.log(this.StateList);
        this.country = 'INDIA';
      }
    );
    this.service.companyCodeList()   
    .subscribe(
      data => {
        this.companyCodeList = data;
        console.log(this.companyCodeList);
      }
    );
    this.service.DivisionIDList()  
    .subscribe(
      data => {
        this.DivisionIDList = data;
        console.log(this.DivisionIDList);
      }
    );


    this.service.cityList()
    .subscribe(
      data => {
        this.cityList = data;
        console.log(this.cityList);
        // this.country = 'INDIA';
      }
    );

  }
  operatingUnitMaster(val) {

  }
  transData(val) {
    // delete val.ouId;
    return val;
  }

  newMast() {
    this.submitted = true;
    if(this.operatingUnitMasterForm.invalid){
    return;
    }
    const formValue: IOperatingUnit = this.transData(this.operatingUnitMasterForm.value);
    this.service.operatingUnitMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        // window.location.reload();
        // this.operatingUnitMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert(res.message);
          // this.operatingUnitMasterForm.reset();
          // window.location.reload();
        }
      }
    });
  }

  transUpdateData(val) {
    // delete val.ouId;
    delete val.ouName;
    delete val.ouDesc;
    delete val.divisionId;
    delete val.compId;
    delete val.mainBrAdd;
    delete val.mState;
    delete val.country;
    delete val.startDate;
    delete val.uheadCeo;
    // delete val.status;
    // delete val.endDate;
    return val;
  }
  updateMast() {
    let select = this.lstcomments.find(d => d.divisionId.divisionName === this.divisionName);
   this.divisionId =select.divisionId.divisionId;
   let select1 = this.lstcomments.find(d => d.compId.compName === this.compName);
   this.compId =select.compId.compId;
    const formValue: IOperatingUnit =this.operatingUnitMasterForm.value;
    formValue.divisionId=this.divisionId;
    this.service.UpdateoperatingUnitMasterById(formValue, formValue.ouId).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFULLY');
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          // this.operatingUnitMasterForm.reset();
          window.location.reload();
        }
      }
    });
  };

  resetMast() {
    // alert ('Please Confirm Do you want to Reset')
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }


  backClicked() {
        this._location.back();
      }

  searchMast(pageNo) {
    this.service.getoperatingUnitSearch(pageNo)
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
  };

  Select(ouId: number) {
    // alert(companyCode);
    let select = this.lstcomments.find(d => d.ouId === ouId);
    if (select) {
      this.operatingUnitMasterForm.patchValue(select);
      this.divisionName= select.divisionId.divisionName;
      this.compName= select.compId.compName;
      this.mState =select.mState;
      this.displayButton = false;
      this.display = false;
    }
  }
  
  onOptionsSelected(event: any) {
    this.Status1 = this.operatingUnitMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.operatingUnitMasterForm.get('endDate').reset();
    }
  }

  onOptionsDivSelected(sc : any) {
alert(sc);
  }

  
  close(){
    this.router.navigate(['login']);
  }


  onOptionsSelectedCity (city: any){
    // alert(city);
    this.service.cityList1(city)
    .subscribe(
      data => {
        this.cityList1 = data;
        console.log(this.cityList1);
        this.mState=this.cityList1.attribute1;
        console.log(this.cityList1.attribute1);
        // this.country = 'INDIA';
      }
    );
  }
}
