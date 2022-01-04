import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from '../master.service';

interface IDivision {
  divisionCode: number;
  divisionName: string;
  status: string;
  divisionId: number;
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'app-division-master',
  templateUrl: './division-master.component.html',
  styleUrls: ['./division-master.component.css']
})

export class DivisionMasterComponent implements OnInit {
  divisionMasterForm: FormGroup;
  divisionCode: number;
  submitted = false;
  divisionName: string;
  startDate: Date;
  endDate: Date;

  public status ="Active"; 
  displayInactive = true;
  Status1: any;
  inactiveDate: Date;
  display = true;
  displayButton = true;
  lstcomments: any[];
  public minDate = new Date();
  public statusList: Array<string> = [];

  // private DivisionMasterService:DivisionMasterService
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.divisionMasterForm = fb.group({
      divisionCode: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(2),Validators.pattern('[a-zA-Z]*')]],
      // divisionCode:['', [Validators.required, Validators.pattern('[0-9]*'),Validators.maxLength(1)]],
      divisionName: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(20),Validators.pattern('[a-zA-Z 0-9]*')]],
      status: ['', Validators.nullValidator],
      divisionId: [],
      startDate: ['',[Validators.required]],
      endDate: [],
    });
  }

  get f() { return this.divisionMasterForm.controls; }

  ngOnInit(): void {
    this.status ="Active"; 
    this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        }
      );
  }

  divisionMaster(divisionMaster: any) {

  }

  onOptionsSelected(event: any) {
    this.Status1 = this.divisionMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.divisionMasterForm.get('endDate').reset();
    }
  }

  transData(val) {
    delete val.divisionId;

    // const callDuDt = val.followUpDt;
    // const status = 'Active';
    return val;
  }

  newMast() {
    this.submitted = true;
    if(this.divisionMasterForm.invalid){
    return;
    }

    const formValue: IDivision = this.transData(this.divisionMasterForm.value);
    this.service.divisionMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFULLY');
        window.location.reload();
        // this.divisionMasterForm.reset();
        // this.divisionMasterForm.get('status').reset();
      } else {
        if (res.code === 400) {
          alert('Code already present in the data base');
          // this.divisionMasterForm.reset();
          window.location.reload();
        }
      }
    });
  }

  updateMast() {
    const formValue: IDivision = this.divisionMasterForm.value;
    this.service.UpdateDivMasterById(formValue, formValue.divisionId).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFULLY');
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.divisionMasterForm.reset();
        }
      }
    });
  };

  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }

  searchMast() {
    this.service.getDiviSearch()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
  };

  // searchMast(divisionCode) {
  //   this.service.getDiviSearchPach(divisionCode)
  //     .subscribe(
  //       data => {
  //         this.lstcomments = data;
  //     this.divisionMasterForm.patchValue(this.lstcomments);
  //     this.displayButton = false;
  //     this.display = false;
  //       }
  //     );
  // };

  Select(divisionId: number) {
    let select = this.lstcomments.find(d => d.divisionId === divisionId);
    this.divisionMasterForm.get('status').reset();
    if (select) {
      this.divisionMasterForm.patchValue(select);
      this.displayButton = false;
      this.display = false;
    }
  }

message:string="PleaseFixtheErrors!";
msgType:string="Close";

getMessage(msgType:string){
this.msgType=msgType;

if(msgType.includes("Save")){
this.submitted=true;
(document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target','#confirmAlert');

if(this.divisionMasterForm.invalid){
(document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target','');
return;
}

this.message="Do you want to SAVE the changes (Yes/No)?"
}

if(msgType.includes("Reset")){ this.message="Do you want to Reset the changes(Yes/No)?" }

if(msgType.includes("Close")){this.message="Do you want to Close the Form(Yes/No)?"}
return;
}

executeAction(){
if(this.msgType.includes("Save")){
this.newMast();
}

if(this.msgType.includes("Reset")){ this.divisionMasterForm.reset();  }

if(this.msgType.includes("Close")){ this.router.navigate(['admin']); }
return;
}

}
