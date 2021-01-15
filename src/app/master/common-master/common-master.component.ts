// import { Component, OnInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators,FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from '../master.service';


interface ICommon {
  cmnType: string;
  cmnDesc:string;
}

@Component({
  selector: 'app-common-master',
  templateUrl: './common-master.component.html',
  styleUrls: ['./common-master.component.css']
})
export class CommonMasterComponent implements OnInit {

  // constructor() { }

  // ngOnInit(): void {
  // }
  commonMasterForm: FormGroup;
  cmnType: string;
  cmnDesc:string;
  submitted = false;


  public applicationList: Array<string> = [];
  public DivisionIDList: Array<string> = [];
  public cmnTypeList: Array<string> = [];
  // public array: Array<string> = [];
  // public group: Array<string> = [];

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) { 
    this.commonMasterForm = fb.group({
      itemRows: this.fb.array([this.inItemRows()]),
      cmnType: ['', [Validators.required]],
      cmnDesc: ['', [Validators.required]],
    });
  }

  inItemRows(){
    return this.fb.group({
      cmnType:[''] ,
      cmnDesc:['']
    });
  }

  addRow(){
    const control=<FormArray>this.commonMasterForm.controls['itemRows'];
    control.push(this.inItemRows());
  }

  get f() { return this.commonMasterForm.controls; }

  ngOnInit(): void {
    this.service.DivisionIDList()
    .subscribe(
      data => {
        this.DivisionIDList = data;
        console.log(this.DivisionIDList);    
      }
    );

    this.service.applicationList()
    .subscribe(
      data => {
        this.applicationList = data;
        console.log(this.applicationList);
      }
    );

    this.service.cmnTypeList()
    .subscribe(
      data => {
        this.cmnTypeList = data;
        console.log(this.cmnTypeList);
      }
    );
  }

  commonMaster(commonMaster: any) {

  }

  saveComnMast(){
    const formValue: ICommon = this.commonMasterForm.value;
    this.service.commonMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('Error occured while storing Common Master details ' + res.message);
          window.location.reload();
        }
      }
  }
  // searchMast(){}


  }}
