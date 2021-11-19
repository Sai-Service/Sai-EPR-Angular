
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FixedAssetService } from '../../FixedAsset.service';

interface IProrateConvention
{
  prorateConventionCode:string;
  description:string;
  fiscalYearName:string;
  deprWhenAcquiredFlag:string;

  startDate:Date;
  endDate:Date;
  prorateDate:Date;
}


@Component({
  selector: 'app-prorate-conventions',
  templateUrl: './prorate-conventions.component.html',
  styleUrls: ['./prorate-conventions.component.css']
})
export class ProrateConventionsComponent implements OnInit {
prorateConventionForm:FormGroup;
prorateConventionCode:string;
description:string;
fiscalYearName:string;
deprWhenAcquiredFlag:string;

startDate:Date;
endDate:Date;
prorateDate:Date;
  lstcomment: any;

constructor(private fb: FormBuilder, private router: Router, private fixedAssetservice:FixedAssetService) {
  this.prorateConventionForm=fb.group({
    prorateConventionCode:[],
    description:[],
    fiscalYearName:[],
    deprWhenAcquiredFlag:[],

    faConvLst:this.fb.array([]),

  }) }

  faConvLst():FormArray{
   
    return this.prorateConventionForm.get("faConvLst") as FormArray
  }
  newfaConvLst(): FormGroup{
    return this.fb.group({
      startDate:[],
      endDate:[],
      prorateDate:[],
     
    });
  }
  addnewfaConvLst(){
     this.faConvLst().push(this.newfaConvLst());
  }
  removenewtrxLinesList(trxLineIndex){
    this.faConvLst().removeAt(trxLineIndex);
  }

  prorateConventions(prorateConventionForm:any){}
  ngOnInit(): void {

    this.addnewfaConvLst();
  }
  resetMast() {  window.location.reload();   }

 
  closeMast() {  this.router.navigate(['admin']);  }

  search()
  {
    this.fixedAssetservice.getSearchConvention().subscribe
    (data =>
     {
       console.log(data);
       this.lstcomment=data;
       console.log(this.lstcomment);
       this.prorateConventionForm.patchValue(this.lstcomment);
       for (let i = 0; i < this.lstcomment.faConvLst.length ; i++) {
        var faconLnGrp: FormGroup = this.newfaConvLst();
        this.faConvLst().push(faconLnGrp);
      }
       
        this.prorateConventionForm.get('faConvLst').patchValue(this.lstcomment.faConvLst);
        this.prorateConventionForm.disable()  ;
     
     }
     );
  }

}
