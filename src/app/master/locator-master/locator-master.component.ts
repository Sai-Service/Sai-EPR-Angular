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

interface ILocatorMaster {
  locatorId: number;
  locId: number;
  subinventoryId: string;
  segment1: string;
  segment2: string;
  segment3: string;
  segment4: string;
  segment5: string;
  segmentName: string;
  status: string;
  endDate: Date;
  // copyAddv:string;
}

@Component({
  selector: 'app-locator-master',
  templateUrl: './locator-master.component.html',
  styleUrls: ['./locator-master.component.css']
})
export class LocatorMasterComponent implements OnInit {
  locatorMasterForm: FormGroup;
  submitted = false;
  locatorId: number;
  locId: number;
  subinventoryId: string;
  segment1: string;
  segment2: string;
  segment3: string;
  segment4: string;
  segment5: string;
  segmentName: string;
  // copyAddv:string;

  endDate: Date;
  public status = "Active";
  displayInactive = true;
  Status1: any;
  inactiveDate: Date;
  lstcomments: any[];
  display = true;
  displayButton = true;
  public minDate = new Date();
  public statusList: Array<string> = [];
  public locationIdList: Array<string> = [];
  public subinventoryIdList: Array<string> = [];

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.locatorMasterForm = fb.group({
      locatorId :[],
      locId: ['', [Validators.required]],
      subinventoryId: ['', [Validators.required]],
      segment1: ['', [ Validators.maxLength(5)]],
      segment2: ['', [Validators.maxLength(5)]],
      segment3: ['', [Validators.maxLength(5)]],
      segment4: ['', [Validators.maxLength(5)]],
      segment5: ['', [ Validators.maxLength(5)]],
      segmentName: ['', [Validators.required]],
      status: ['', [Validators.required]],
      endDate: ['', [Validators.nullValidator]],
      // copyAddv:[],
    });
  }

  get f() { return this.locatorMasterForm.controls; }


  ngOnInit(): void {
    this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        }
      );

    this.service.locationIdList()
      .subscribe(
        data => {
          this.locationIdList = data;
          console.log(this.locationIdList);
        }
      );
    this.service.subinventoryIdList()
      .subscribe(
        data => {
          this.subinventoryIdList = data;
          console.log(this.subinventoryIdList);
        }
      );
  }

  locatorMaster(locatorMasterForm: any) {

  }

  // copyAdd(e) {
  //   if (e.target.checked) {
  //   this.copyAddv='Y'
  //   }
  //   else{
  //     this.copyAddv = 'N';
  //   }
  // }

  onOptionsSelected(event: any) {
    this.Status1 = this.locatorMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.locatorMasterForm.get('endDate').reset();
    }
  }

  onKey(event: any) {
    const aaa = this.segment1 + '.' + this.segment2 + '.' + this.segment3 + '.' + this.segment4 + '.' + this.segment5;
    this.segmentName = aaa;
  }
  transData(val) {
    delete val.locatorId;
    return val;
  }

  newMast() {
    const formValue: ILocatorMaster = this.transData(this.locatorMasterForm.value);
    this.service.LocatorMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFULLY');
        this.locatorMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert('Data already present in the data base');
          this.locatorMasterForm.reset();
        }
      }
    });
  }

  updateMast() {
    const formValue: ILocatorMaster = this.locatorMasterForm.value;
    this.service.UpdateLocatorMasterById(formValue, formValue.locatorId).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFULLY');
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.locatorMasterForm.reset();
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
    this.service.getLocatorMasterSearch()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
  };

  Select(locatorId: number) {
    let select = this.lstcomments.find(d => d.locatorId === locatorId);
    if (select) {
      this.locatorMasterForm.patchValue(select);
      this.displayButton = false;
      this.display = false;
    }
  }




}
