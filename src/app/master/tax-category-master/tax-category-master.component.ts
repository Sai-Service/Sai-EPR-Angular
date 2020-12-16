import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { MasterService } from '../master.service';

interface IpostPO {
  ouId: number;
  taxCategoryId: string;
  taxCategoryName: string;
  taxCategoryDesc: string;
  itemClassCode: string;
  recordTypeCode: string;
  startDate: Date;
  status: string;
  endDate: Date;
}

@Component({
  selector: 'app-tax-category-master',
  templateUrl: './tax-category-master.component.html',
  styleUrls: ['./tax-category-master.component.css']
})
export class TaxCategoryMasterComponent implements OnInit {
  taxCategoryMasterForm: FormGroup;
  ouId: number;
  taxCategoryId: string;
  taxCategoryName: string;
  taxCategoryDesc: string;
  itemClassCode: string;
  recordTypeCode: string;
  startDate: Date;
  endDate: Date;

  public status = "Active";
  public minDate = new Date();
  displayButton = true;
  displayInactive = true;
  Status1: any;
  display = true;
  submitted = false;
  lstcomments: any[];

  public OUIdList: Array<string> = [];
  public statusList: Array<string> = [];

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.taxCategoryMasterForm = fb.group({
      ouId: ['', [Validators.required]],
      taxCategoryId: ['', [Validators.required]],
      taxCategoryName: ['', [Validators.required]],
      taxCategoryDesc: ['', [Validators.required]],
      itemClassCode: ['', [Validators.required]],
      recordTypeCode: ['', [Validators.required]],
      startDate: [],
      status: ['', [Validators.required]],
      endDate: ['', [Validators.nullValidator]],
    });
  }

  get f() { return this.taxCategoryMasterForm.controls; }
  ngOnInit(): void {
    this.service.OUIdList()
      .subscribe(
        data => {
          this.OUIdList = data;
          console.log(this.OUIdList);
        }
      );

    this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        }
      );
  }
  taxCategoryMaster(taxCategoryMasterForm) { }
  onOptionsSelected(event: any) {
    this.Status1 = this.taxCategoryMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.taxCategoryMasterForm.get('endDate').reset();
    }
  }

  transData(val) {
    // delete val.ouId;
    return val;
  }

  newMast() {
    const formValue: IpostPO = this.transData(this.taxCategoryMasterForm.value);
    this.service.TaxCategoryMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        this.taxCategoryMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert('Data already present in the data base');
          this.taxCategoryMasterForm.reset();
        }
      }
    });
  }

  updateMast() {
    const formValue: IpostPO =this.taxCategoryMasterForm.value;
    this.service.UpdateTaxCategoryMasterById(formValue, formValue.taxCategoryId).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFUILY');
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.taxCategoryMasterForm.reset();
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
    this.service.getTaxCategorySearch()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
  };

  Select(taxCategoryId: number) {
    // alert(companyCode);
    let select = this.lstcomments.find(d => d.taxCategoryId === taxCategoryId);
    if (select) {
      this.taxCategoryMasterForm.patchValue(select);
      this.displayButton = false;
      this.display = false;
    }
  }
}
