import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';

import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FixedAssetService } from '../../FixedAsset.service';


interface IBookControl
{
  setOfBooksId:number;
  deprnCalendar:string;
  fiscalYearName:string;
  currentFiscalYear:string;
  capitalGainThreshold:number;
  amortizeFlag:string;
  allowMassChanges:string;
  allowCostSignChangeFlag:string;
  revalDeprnReserveFlag:string;
  retireRevalReserveFlag:string;
  amortizeRevalReserveFlag;
  defaultRevalFullyRsvdFlag:string;
  allowCipMemberFlag:string;
  allowCipDepGroupFlag:string;
  allowIntercoGroupFlag:string
}

@Component({
  selector: 'app-book-control',
  templateUrl: './book-control.component.html',
  styleUrls: ['./book-control.component.css']
})
export class BookControlComponent implements OnInit {
  BookControlForm:FormGroup;
  setOfBooksId:number;
  deprnCalendar:string;
  fiscalYearName:string;
  retireRevalReserveFlag:string;
  currentFiscalYear:string;
  capitalGainThreshold:number;
  amortizeFlag:string;
  allowMassChanges:string;
  allowCostSignChangeFlag:string;
  revalDeprnReserveFlag:string;
  amortizeRevalReserveFlag:string;
  defaultRevalFullyRsvdFlag:string;
  allowCipMemberFlag:string;
  allowCipDepGroupFlag:string;
  allowMemberTrackingFlag:string;
  allowIntercoGroupFlag:string;

  revalRsvRetiredGainAcct:string;
  revalRsvRetiredLossAcct:string;
  nbvRetiredGainAcct:string;
  nbvRetiredLossAcct:string;
  costOfRemovalGainAcct:string;
  costOfRemovalLossAcct:string
  costOfRemovalClearingAcct:string;
  proceedsOfSaleGainAcct:string;
  proceedsOfSaleLossAcct:string;
  proceedsOfSaleClearingAcct:string;
  deferredDeprnReserveAcct:string;
  deferredDeprnExpenseAcct:string;
  deprnAdjustmentAcct:string;
  accountingFlexStructure:number;
  booktyp:string;
  lstcomment: any;
  lastDeprnRunDate:Date;
  revalYtdDeprnFlag:string;

 constructor(private fb: FormBuilder, private router: Router, private fixedAssetservice:FixedAssetService) {
    this.BookControlForm=fb.group({
      setOfBooksId:[],
      deprnCalendar:[],
      fiscalYearName:[],
      currentFiscalYear:[],
      capitalGainThreshold:[],
      amortizeFlag:[],
      allowMassChanges:[],
      allowCostSignChangeFlag:[],
      revalDeprnReserveFlag:[],
      retireRevalReserveFlag:[],
      amortizeRevalReserveFlag:[],
      defaultRevalFullyRsvdFlag:[],
      allowCipMemberFlag:[],
      allowCipDepGroupFlag:[],
      allowMemberTrackingFlag:[],
      allowIntercoGroupFlag:[],
      revalRsvRetiredGainAcct:[],
      revalRsvRetiredLossAcct:[],
      nbvRetiredGainAcct:[],
      nbvRetiredLossAcct:[],
      costOfRemovalGainAcct:[],
      costOfRemovalLossAcct:[],
      costOfRemovalClearingAcct:[],
      proceedsOfSaleGainAcct:[],
      proceedsOfSaleLossAcct:[],
      proceedsOfSaleClearingAcct:[],
      deferredDeprnReserveAcct:[],
      deferredDeprnExpenseAcct:[],
      deprnAdjustmentAcct:[],
      accountingFlexStructure:[],
      booktyp:[],
      lastDeprnRunDate:[],
      revalYtdDeprnFlag:[],
    })
     }

  ngOnInit(): void {
  }
  bookControl(BookControlForm:any){}
  resetMast() {  window.location.reload();   }

 
  closeMast() {  this.router.navigate(['admin']);  }
  search(booktyp){
    alert(booktyp+'ty');
    this.fixedAssetservice.getBookControl(booktyp).subscribe
    (data =>
     {
       console.log(data);
       this.lstcomment=data;
       console.log(this.lstcomment);
       this.BookControlForm.patchValue(this.lstcomment);
       this.BookControlForm.disable()  ;
     
     }
     );
  }
}
