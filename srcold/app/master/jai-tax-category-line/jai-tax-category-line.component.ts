import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { MasterService } from '../master.service';
import { DatePipe } from '@angular/common';


interface IpostPO {
  taxCategoryLineId: number;
  taxCategoryId: number; // lov
  lineNumber: number;
  regimeId: number;
  taxTypeId: number;
  taxRateId: number;
  precedence1: number;
  precedence2: number;
  precedence3: number;
  // precedence 3 to 20
  recordTypeCode: string;
  startDate: Date;
 
  endDate: Date;
  status: string;
}

@Component({
  selector: 'app-jai-tax-category-line',
  templateUrl: './jai-tax-category-line.component.html',
  styleUrls: ['./jai-tax-category-line.component.css']
})
export class JaiTaxCategoryLineComponent implements OnInit {
  jaiTaxCategoryLineMasterForm: FormGroup;

  pipe = new DatePipe('en-US');

  taxCategoryLineId: number;
  taxCategoryId: number; // lov
  lineNumber: number;
  regimeId: number;
  taxTypeId: number;
  taxRateId: number;
  precedence1: number;
  precedence2: number;
  precedence3: number;
  // precedence 3 to 20
  recordTypeCode: string;
  // startDate: Date;
  startDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  endDate: Date;

  public statusList: Array<string> = [];
  public taxCategoryIdList: Array<string> =[];
  public regimeIdList :Array<string> = [];
  public taxTypeIdList:Array<string> = [];
  public taxRateIdList:Array<string> = [];


  public status = "Active";
  public minDate = new Date();
  displayButton = true;
  displayInactive = true;
  Status1: any;
  display = true;
  submitted = false;
  lstcomments: any[];

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.jaiTaxCategoryLineMasterForm = fb.group({
      taxCategoryLineId: [''],
      lineNumber: [],
      taxCategoryId: ['', [Validators.required]], // lov
      regimeId: ['', [Validators.required]],
      taxTypeId: ['', [Validators.required]],
      taxRateId: ['', [Validators.required]],
      precedence1: ['', [Validators.required]],
      precedence2: ['', [Validators.required]],
      precedence3: ['', [Validators.required]],
      // precedence 3 to 20
      recordTypeCode: ['', [Validators.required]],
      startDate: [],
      status: ['', [Validators.required]],
      endDate: ['', [Validators.nullValidator]],
    });
  }

  ngOnInit(): void {
    this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        }
      );  
      this.service.getTaxCategorySearch()
      .subscribe(
        data => {
          this.taxCategoryIdList = data;
          console.log(this.taxCategoryIdList);
        }
      );  

      this.service.getJaiRegimeSearch()
      .subscribe(
        data => {
          this.regimeIdList = data;
          console.log(this.regimeIdList);
        }
      );  

      this.service.getTaxTypeSearch()
      .subscribe(
        data => {
          this.taxTypeIdList = data;
          console.log(this.taxTypeIdList);
        }
      ); 

      this.service.getTaxRateSearch()
      .subscribe(
        data => {
          this.taxRateIdList = data;
          console.log(this.taxRateIdList);
        }
      );
  }

  onOptionsSelected(event: any) {
    this.Status1 = this.jaiTaxCategoryLineMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.jaiTaxCategoryLineMasterForm.get('endDate').reset();
    }
  }

  jaiTaxCategoryLineMaster(jaiTaxCategoryLineMasterForm) { }

  Select(taxCategoryLineId: number) {
    // alert(companyCode);
    let select = this.lstcomments.find(d => d.taxCategoryLineId === taxCategoryLineId);
    if (select) {
      this.jaiTaxCategoryLineMasterForm.patchValue(select);
      this.displayButton = false;
      this.display = false;
    }
  }

  transData(val) {
    // delete val.ouId;
    return val;
  }

  newMast() {
    const formValue: IpostPO = this.transData(this.jaiTaxCategoryLineMasterForm.value);
    this.service.JaiTaxCategoryLineMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFULLY');
        this.jaiTaxCategoryLineMasterForm.reset();   
      } else {
        if (res.code === 400) {
          alert('Data already present in the data base');
          this.jaiTaxCategoryLineMasterForm.reset();
        }
      }
    });
  }

  updateMast() {
    const formValue: IpostPO = this.jaiTaxCategoryLineMasterForm.value;
    this.service.UpdateJaiTaxCategoryLineMasterById(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFULLY');
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.jaiTaxCategoryLineMasterForm.reset();
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
    this.service.getJaiTaxCategoryLineSearch()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
  };

}
