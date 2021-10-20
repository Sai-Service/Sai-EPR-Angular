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


interface IdepriciationMethod
{
  methodCode:string;
  name:string;
  rateSourceRule:string;
  deprnBasisRule:string;
  depreciateLastyearFlag:string;
  excludeSalvageValueFlag:string;
  stlMethodFlag:string;
  polishAdjCalcBasisFlag:string;

  basicRate:number;
  adjustingRate:number;
  adjustedRate:number;
}

@Component({
  selector: 'app-depriciation-method',
  templateUrl: './depriciation-method.component.html',
  styleUrls: ['./depriciation-method.component.css']
})
export class DepriciationMethodComponent implements OnInit {
depriciationMethodForm:FormGroup;

methodCode:string;
name:string;
rateSourceRule:string;
deprnBasisRule:string;
depreciateLastyearFlag:string;
excludeSalvageValueFlag:string;
stlMethodFlag:string;
polishAdjCalcBasisFlag:string;

basicRate:number;
adjustingRate:number;
adjustedRate:number;
  lstcomment: any;

  methodtyp:string;
constructor(private fb: FormBuilder, private router: Router, private fixedAssetservice:FixedAssetService) {
  this.depriciationMethodForm=fb.group({
    methodtyp:[],
    faMthLst:this.fb.array([]),
    faRateLst:this.fb.array([]),
  })  }

  faMthLst():FormArray{
   
    return this.depriciationMethodForm.get("faMthLst") as FormArray
  }
  newfaMthLst(): FormGroup{
    return this.fb.group({
      methodCode:[],
      name:[],
      rateSourceRule:[],
      deprnBasisRule:[],
      depreciateLastyearFlag:[],
      excludeSalvageValueFlag:[],
      stlMethodFlag:[],
      polishAdjCalcBasisFlag:[],
    });
  }
  addnewfaMthLst(){
    this.faRateLst().push(this.newfaMthLst());
 }
 removenewfaMthLst(i){
   this.faMthLst().removeAt(i);
 }
  faRateLst():FormArray{
   
    return this.depriciationMethodForm.get("faRateLst") as FormArray
  }
  newfaRateLst(): FormGroup{
    return this.fb.group({
      basicRate:[],
      adjustingRate:[],
      adjustedRate:[],
      
    });
  }
  addnewfaRateLst(){
    this.faRateLst().push(this.newfaRateLst());
 }
 removenewfaRateLst(k){
   this.faRateLst().removeAt(k);
 }
  DepriciationMethod(depriciationMethodForm:any){

  }
  ngOnInit(): void {
    this.addnewfaMthLst();
    this.addnewfaRateLst();
  }
  resetMast() {  window.location.reload();   }

 
  closeMast() {  this.router.navigate(['admin']);  }

  search(methodtyp)
  {
    alert(methodtyp);
    this.fixedAssetservice.getDepriciation(methodtyp).subscribe
    (data =>
     {
       console.log(data);
       this.lstcomment=data;
       console.log(this.lstcomment);
       this.depriciationMethodForm.patchValue(this.lstcomment);
       for (let i = 0; i < this.lstcomment.faMthLst.length ; i++) {
        var famethrGrp: FormGroup = this.newfaMthLst();
        this.faMthLst().push(famethrGrp);
      }
      for (let i = 0; i < this.lstcomment.faRateLst.length ; i++) {
        var faRateLnGrp: FormGroup = this.newfaRateLst();
        this.faRateLst().push(faRateLnGrp);
      }
        this.depriciationMethodForm.get('faMthLst').patchValue(this.lstcomment.faMthLst);
        this.depriciationMethodForm.get('faRateLst').patchValue(this.lstcomment.faRateLst);
        this.depriciationMethodForm.disable()  ;
     
     }
     );
  }
}
