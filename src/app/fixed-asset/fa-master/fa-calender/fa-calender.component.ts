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

interface IFaCalender
{
  calendarType:string;
  description:string;
  periodSuffixType:string;
  numberPerFiscalYear:number;

  periodNum:number;
  periodName:string;
  startDate:Date;
  endDate:Date;

}
@Component({
  selector: 'app-fa-calender',
  templateUrl: './fa-calender.component.html',
  styleUrls: ['./fa-calender.component.css']
})
export class FaCalenderComponent implements OnInit {
  faCalenderForm:FormGroup;
  calendarType:string;
  description:string;
  periodSuffixType:string;
  numberPerFiscalYear:number;

  periodNum:number;
  periodName:string;
  startDate:Date;
  endDate:Date;
  lstcomment: any;

  constructor(private fb: FormBuilder, private router: Router, private fixedAssetservice:FixedAssetService) {
    this.faCalenderForm=fb.group({
    calendarType:[],
    description:[],
    periodSuffixType:[],
    numberPerFiscalYear:[],
    
    calPrd:this.fb.array([]),
    })


 }
 calPrd():FormArray{
   
  return this.faCalenderForm.get("calPrd") as FormArray
}
newcalPrd(): FormGroup{
  return this.fb.group({
    periodNum:[],
    periodName:[],
    startDate:[],
    endDate:[],
  
  });
}
addnewcalPrd(){
   this.calPrd().push(this.newcalPrd());
}
removenewcalPrd(trxLineIndex){
  this.calPrd().removeAt(trxLineIndex);
}

faCalender(faCalenderForm:any){}
  ngOnInit(): void {
    this.addnewcalPrd();
  }
  resetMast() {  window.location.reload();   }

 
  closeMast() {  this.router.navigate(['admin']);  }

  search()
  {
    this.fixedAssetservice.getSearchCal().subscribe
    (data =>
     {
       console.log(data);
       this.lstcomment=data;
       console.log(this.lstcomment);
       this.faCalenderForm.patchValue(this.lstcomment);
       for (let i = 0; i < this.lstcomment.calPrd.length ; i++) {
        var facalLnGrp: FormGroup = this.newcalPrd();
        this.calPrd().push(facalLnGrp);
      }
       
        this.faCalenderForm.get('calPrd').patchValue(this.lstcomment.calPrd);
        this.faCalenderForm.disable()  ;
     
     }
     );
  }
}
