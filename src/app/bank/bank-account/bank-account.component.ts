import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import{ BankService} from '../bank.service';

interface IbankDetails{
  custName:string;
branchId:number;  
branchNumber:string;
branchName:string;
  customerId:number;
  bankAccountName:string;
  status :string ;
  bankAccountNo:number;
  currancyCode: string;
 description:string;
  shortAccountName:string;
  multiCurrAllowedFlag:string;
  paymentMultiCurrFlag:string;
receiptMultiCurrFlag:string;
 zeroAmtAllowed:string;
 maxCheckAmt:number;
 minCheckAmt:number;
  bankAccountType:string;
  ownerPartyId:number;
  startDate:number;
  endDate:string;
}

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {
  bankCreationForm: FormGroup;
  custName:string;
branchId:number;  
branchNumber:string;
branchName:string;
  bankAccountName:string;
  status :string = 'Active';
  bankAccountNo:number;
  currancyCode: "INR";
 description:string; 
  shortAccountName:string;
  multiCurrAllowedFlag:string;
  paymentMultiCurrFlag:string;
receiptMultiCurrFlag:string;
 zeroAmtAllowed:string;
 maxCheckAmt:number;
 minCheckAmt:number;
  bankAccountType:string;
  ownerPartyId:number;
  startDate:number;
  endDate:string;
  customerId:number;
  bkName:string;
  bkBranchName:string;
  public minDate = new Date();

  // public BankNameList: Array<string> = [];
  public BankAcccount:Array<string>=[];
  public BankBranchList:any[];
  public BankBranchListHeder:any[];
  public BankNameList: any;
  public BankNameList1: any;
  constructor(private fb: FormBuilder, private router: Router, private bankService: BankService) { 
     this.bankCreationForm = fb.group({
      custName:['',[Validators.required] ],
      branchId:['',[Validators.required] ], 
      branchNumber:[],
      branchName:['',[Validators.required] ],
      customerId:[''],
      bkName:[''],
      bkBranchName:[''],
      bankAccountName : ['',[Validators.required] ],
      status :['',Validators.required],
      bankAccountNo:['',Validators.required],
      currancyCode: ['',Validators.required],
     description:['',Validators.required],
      shortAccountName:['',Validators.nullValidator],
      multiCurrAllowedFlag:[''],
      paymentMultiCurrFlag:[''],
    receiptMultiCurrFlag:[''],
     zeroAmtAllowed:[''],
     maxCheckAmt:[''],
     minCheckAmt:[''],
      bankAccountType:[''],
      ownerPartyId:[''],
      startDate:[''],
      endDate:['',Validators.nullValidator],
    })
  }

  ngOnInit(): void {  
    this.bankService.BankNameList()
    .subscribe(
      data => {
        this.BankNameList1 = data;
        console.log(this.BankNameList1);
      }
    );
    this.bankService.BankNameListFn()
    .subscribe(
      data => {
        this.BankNameList = data;
        console.log(this.BankNameList);
      }
    );
  }
  multiCurrAllowedFlagFn(e) {
    if (e.target.checked=== true) {
      this.multiCurrAllowedFlag = 'Y'
   } 
   if (e.target.checked=== false) {
     this.multiCurrAllowedFlag='N'
   }
  }
  paymentMultiCurrFlagFn(e) {
    if (e.target.checked=== true) {
      this.paymentMultiCurrFlag = 'Y'
   } 
   if (e.target.checked=== false) {
     this.paymentMultiCurrFlag='N'
   }
  }
  receiptMultiCurrFlagFn(e) {
    if (e.target.checked=== true) {
      this.receiptMultiCurrFlag = 'Y'
   } 
   if (e.target.checked=== false) {
     this.receiptMultiCurrFlag='N'
   }
  }
  zeroAmtAllowedFn(e) {
    if (e.target.checked=== true) {
      this.zeroAmtAllowed = 'Y'
   } 
   if (e.target.checked=== false) {
     this.zeroAmtAllowed='N'
   }
  }
  BreanchAccountSearch(bkBranchName,bkName){
    alert('bkBranchName '+bkBranchName+' bkName'+ bkName)
    this.bankService.BankAcccountList(bkBranchName,bkName)
    .subscribe(
      data => {
        this.BankAcccount = data;
        console.log(this.BankAcccount);
      }
    );
  }
  selectCustId(bankName){
    alert(bankName);
    let select = this.BankNameList.find(d => d.custName === bankName);
    this.customerId = select.customerId
  }
  onBankNameSelectedHeder(BkName) {
    this.bankService.BankBranchList(BkName)
    .subscribe(
      data => {
        this.BankBranchListHeder = data.obj;
        console.log(this.BankBranchListHeder);
      }
    );
  }
  onBankNameSelected1(BkName) {
    alert(BkName);
    this.bankService.BankBranchList(BkName)
    .subscribe(
      data => {
        this.BankBranchList = data.obj;
        console.log(this.BankBranchList);
      // this.branchId = this.BankBranchList.name2;
      }
    );
  }
  onbranchIdSelected(branchName){
    let select = this.BankBranchList.find(d => d.name=== branchName);
    console.log(select);
    console.log(select.name2);
    this.branchNumber = select.name2;
    this.branchId = select.id;
  }

    // onbranchIdSelected(branchName){
  //   let select = this.BankBranchList.find(d => d.name=== branchName);
  //   console.log(select);
  //   console.log(select.name2);
  //   this.branchId = select.name2;
    
  //   // console.log(select.name2);
  //   // this.branchId = select.name2;
  // }
  SelectbranchId(branchId){}
  bankCreation(bankCreationForm){}

  tranceFun(val){
    val.bankId={ "customerId": this.customerId}
    return val
  }
  BankCreation(){
    const formValue: IbankDetails = this.tranceFun(this.bankCreationForm.value);
    this.bankService.bankCreationFun(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('BANK DETAILS INSERTED SUCCESSFULLY');
        // window.location.reload();
        // this.divisionMasterForm.reset();
        // this.divisionMasterForm.get('status').reset();
      } else {
        if (res.code === 400) {
          alert('Error occurred during data inserting');
          // this.divisionMasterForm.reset();
          window.location.reload();
        }
      }
    });
  }
  close(){this.router.navigate(['admin']); }
  refresh() { window.location.reload();}
}

