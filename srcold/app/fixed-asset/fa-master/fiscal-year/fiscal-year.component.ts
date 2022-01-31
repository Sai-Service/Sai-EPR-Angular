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

interface IFiscalYear
{
  lookupType:string;
  description:string;
  startDate:Date;
  endDate:Date;
  midYearDate:Date;
  fiscalYear:number;
}

@Component({
  selector: 'app-fiscal-year',
  templateUrl: './fiscal-year.component.html',
  styleUrls: ['./fiscal-year.component.css']
})
export class FiscalYearComponent implements OnInit {
fiscalYearForm:FormGroup;
lookupType:string;
description:string;
startDate:Date;
endDate:Date;
midYearDate:Date;
fiscalYear:number;
lstcomment: any;

  constructor(private fb: FormBuilder, private router: Router, private fixedAssetservice:FixedAssetService) {
    this.fiscalYearForm=fb.group({
      lookupType:[],
      description:[],
      fisYrLst:this.fb.array([]),
    })
   }
   fisYrLst():FormArray{
   
    return this.fiscalYearForm.get("fisYrLst") as FormArray
  }
  newfisYrLst(): FormGroup{
    return this.fb.group({
      startDate:[],
      endDate:[],
      midYearDate:[],
      fiscalYear:[],
    });
  }
  addnewfisYrLst(){
     this.fisYrLst().push(this.newfisYrLst());
  }
  removenewtrxLinesList(trxLineIndex){
    this.fisYrLst().removeAt(trxLineIndex);
  }
   fiscalyear(fiscalYearForm:any){}
  ngOnInit(): void {
    this.addnewfisYrLst();
  }

  resetMast() {  window.location.reload();   }

 
  closeMast() {  this.router.navigate(['admin']);  }

  search()
  {
    this.fixedAssetservice.getSearchfiscal().subscribe
    (data =>
     {
       console.log(data);
       this.lstcomment=data;
       console.log(this.lstcomment);
       this.fiscalYearForm.patchValue(this.lstcomment);
       for (let i = 0; i < this.lstcomment.fisYrLst.length ; i++) {
        var fisLnGrp: FormGroup = this.newfisYrLst();
        this.fisYrLst().push(fisLnGrp);
      }
       
        this.fiscalYearForm.get('fisYrLst').patchValue(this.lstcomment.fisYrLst);
        this.fiscalYearForm.disable()  ;
     
     }
     );
  }
}
