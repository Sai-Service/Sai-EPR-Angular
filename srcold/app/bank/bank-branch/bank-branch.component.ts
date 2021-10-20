import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { MasterService } from 'src/app/master/master.service';
import{ BankService} from '../bank.service';

interface IbankBranch{
  branchId: number;
  branchName:string;
   address1: string;
    address2: string;
    address3:string;
    city:string;
county:string;
    pinCode: number;
    state: string;
    contact1: number;
    contact2: number;
    startDate: Date;
    endDate: Date;
    status: string;
    customerId:number;
    custName:string;
branchNo:string;
bankType:string;
emailId:string;
}

@Component({
  selector: 'app-bank-branch',
  templateUrl: './bank-branch.component.html',
  styleUrls: ['./bank-branch.component.css']
})
export class BankBranchComponent implements OnInit {
  bankBranchForm: FormGroup;
  branchId: number;
  branchName:string;
   address1: string;
    address2: string;
    address3:string;
    city:string;
county:string= 'India';
    pinCode: number;
    state: string;
    contact1: number;
    contact2: number;
    startDate: Date;
    endDate: Date;
public status = "Active";
    customerId:number;
    custName:string;
bankId:string;
bkName:string;
bkBranchName:string;
branchNO:string;
branchNo:string;
bankType:string ='OTHER';
emailId:string;

submitted = false;
displayInactive = true;

public minDate = new Date();
public cityList: Array<string> = [];
public statusList: Array<string> = [];
public BranchSearch : any;
public BankNameList: any;
public statList:any;
Status1: any;

constructor(private fb: FormBuilder, private router: Router, private bankService: BankService,  private service: MasterService) { 
  this.bankBranchForm = fb.group({
    bkName: ['',[Validators.nullValidator] ],
    bankId:['',Validators.nullValidator],
bkBranchName: ['',[Validators.nullValidator] ],
branchNO: ['',[Validators.nullValidator] ],
    branchId: ['',[Validators.nullValidator] ],
    branchName: ['',[Validators.required] ],
emailId: ['', [Validators.required, Validators.email,Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
    address1: ['',[Validators.required] ],
    address2: ['',[Validators.nullValidator] ],
    address3: ['',[Validators.nullValidator] ],
    city: ['',[Validators.required] ],
county:['',[Validators.required]],
    pinCode:['', [Validators.required, Validators.minLength(6),Validators.maxLength(6),Validators.pattern('[0-9]*')]],
    state: ['',[Validators.required] ],
    contact1: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10),Validators.maxLength(12)]],
    contact2: ['', [Validators.nullValidator, Validators.pattern('[0-9]*'), Validators.minLength(10),Validators.maxLength(12)]],
    startDate: ['',[Validators.required] ],
    endDate:['',[Validators.nullValidator] ],
    status: ['',[Validators.required] ],
    customerId: ['',[Validators.nullValidator] ],
    custName: ['',[Validators.required] ],
branchNo: ['',[Validators.required] ],
bankType: ['',[Validators.required] ],
});
}
get f() { return this.bankBranchForm.controls; }
Orgmaster(bankBranchForm: any) {
  this.submitted = true;
  console.log(bankBranchForm);
  if (this.bankBranchForm.invalid) {
    return;
  }
}

ngOnInit(): void {
  this.service.cityList()
    .subscribe(
      data => {
        this.cityList = data;
        console.log(this.cityList);
      }
    );
    this.service.statusList()
    .subscribe(
      data => {
        this.statusList = data;
        console.log(this.statusList);
      }
    );  
    this.bankService.BankNameListFn()
    .subscribe(
      data => {
        this.BankNameList = data;
        console.log(this.BankNameList)
      }
    );
}
onBankNameSelected(BkName) {
  alert(BkName);
   let selectedValue = this.BankNameList.find(v => v.custName == BkName);
   alert(selectedValue.custName+" "+selectedValue.customerId);
   this.bankId=selectedValue.customerId;
   this.custName =selectedValue.custName;
}
onOptionsSelected(event: any) {
  this.Status1 = this.bankBranchForm.get('status').value;
  // alert(this.Status1);
  if (this.Status1 === 'Inactive') {
    this.displayInactive = false;
    this.endDate = new Date();
  }
  else if (this.Status1 === 'Active') {
    this.displayInactive = true;
    this.bankBranchForm.get('endDate').reset();
  }
}
 
  onOptionsSelectedCity (city: any){
    // alert(city);
    this.service.cityList1(city)
    .subscribe(
      data => {
        this.statList= data;
        this.state=this.statList.attribute1;
        console.log(this.statList.attribute1);
        // this.country = 'INDIA';
      }
    );
  }
  BreanchNameSearch(bkBranchName){
    this.bankService.BranchSearchFn(bkBranchName)
    .subscribe(
      data => {
        this.BranchSearch = data;
        console.log(this.BranchSearch);
        // this.bankBranchForm.patchValue(this.BranchSearch);
      }
    );
  }
  serchByBranchNo(branchNO){
    this.bankService.BranchNumberSearchFn(branchNO)
    .subscribe(
      data => {
        this.BranchSearch = data;
        console.log(this.BranchSearch);
        // this.bankBranchForm.patchValue(this.BranchSearch);
      }
    );
  }
  bankBranch(bankBranchForm){}
  serchByBanhName(bkName){}
serchByBnkBranchName(bkBranchName){}

SelectBranchNO(branchNo){
  let select = this.BranchSearch.find(d => d.branchNo === branchNo);
  if (select) {
    this.bankBranchForm.patchValue(select);
    // this.divisionName= select.divisionId.divisionName;
    // this.compName= select.compId.compName;
    // this.mState =select.mState;
    // this.displayButton = false;
    // this.display = false;
  }
}
AccountCreation(){
  this.router.navigate(['newBank']);
}
  close(){this.router.navigate(['admin']); }
  refresh() { window.location.reload();}
  BankBranch(){
    const formValue: IbankBranch = this.bankBranchForm.value;
    this.bankService.BankBranchCreation(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('BRANCH INSERTED SUCCESSFULLY');
        window.location.reload();
        // this.operatingUnitMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert('ERROR WHILE INSERTING BRANCH');
          // this.operatingUnitMasterForm.reset();
          window.location.reload();
        }
      }
    });
  }
}
