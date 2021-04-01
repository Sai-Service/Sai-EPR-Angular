import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { MasterService } from '../master.service';

interface IJaiTaxRate{
  ouName  : string;
  taxRateId : number;
  taxTypeId :number;
  taxTypeName:string;
  taxTypeCode:string;
  taxRateType:string;
  regimeId:number;
  inclusiveFlag:string;
  taxRateName:string;
  taxRateCode:string;
  // status :string;
  recoveryPercentage : number;
  regimeCode : string;
  taxPercentage : number
  orgId: number;
  taxRate : number
  startDate:Date;
  endDate:Date;

  ledgerId : number;
  OUId: number;
  locId: number;
  locName :string;

}

  @Component({
  selector: 'app-jai-tax-rates-master',
  templateUrl: './jai-tax-rates-master.component.html',
  styleUrls: ['./jai-tax-rates-master.component.css']
})
export class JaiTaxRatesMasterComponent implements OnInit {
  jaiTaxRateMasterForm:FormGroup;
  public minDate = new Date();
  ouName  : string;
  taxRateId : number;
  taxTypeId: number;
  regimeId: number;
  taxTypeName: string;
  taxTypeCode: string;
  taxRateType:string;
  regimeName: string;
  inclusiveFlag: string;
  taxRateName:string;
  taxRateCode:string;
  // status :string;
  recoveryPercentage : number;
  orgId: number;
  taxRate : number
  startDate:Date;
  endDate:Date;
  regimCodeDisp=true;
  taxCodeDisp=true
  ouCodeDisp=true;
  showOu =false;
  showOrg=false;

  regimeCode : string;
  taxPercentage : number

  interimRecoveryCcid: string;
  recoveryCcid: string;
  interimLiablilityCcid: string;
  liablilityCcid: string;
  expenseCcid: string;
  roundingCcid: string;
  suspenseCcid: string;
  advRcptSuspenseCcid: string;
  isoSuspenseCcid: string;

  ledgerId : number;
  OUId: number;
  locId: number;
  locName :string;

  
  Status1: any;

  a1: string;
  a2: string;
  a3: string;
  a4: string;
  a5: string;

  lookupValueDesc1: string;
  lookupValueDesc2: string;
  lookupValueDesc3: string;
  lookupValueDesc4: string;
  lookupValueDesc5: string;
  
  displayInactive = true;
  displayButton = true;
  display = true;
  public status = "Active";

  public BranchList: Array<string> = [];
  public CostCenterList: Array<string> = [];
  public NaturalAccountList: Array<string> = [];
  public InterBrancList: Array<string> = [];
  public locationCodeList: Array<string> = [];

  showModal: boolean;
  content: number;
  title: string;

  lstcomments: any[];
  public statusList: Array<string> = [];
  public regimeIdList: Array<string> = [];
  public OUIdList: Array<string> = [];
  public regimNameList: any;
  public LedgerList: Array<string> = [];
  public locIdList: Array<string> = [];
  public lookupNameList: any;
 
  public taxTypeIdList: Array<string> = [];
  public taxTypeNameList: any;
  public locationNameList: any;
  public locationNameList1: any;


  

  constructor(private service: MasterService, private fb: FormBuilder, private router: Router) { 
    this.jaiTaxRateMasterForm = fb.group({
      ouName:[''],
      orgId:[''],
      taxTypeCode: ['', [Validators.required]],
      taxTypeName: ['', [Validators.required]],
      taxRateId:[''],
      taxTypeId: ['', [Validators.required]],
      regimeId: ['', [Validators.required]],
      regimeCode:[''],
      inclusiveFlag: ['', [Validators.required]],
      regimeName: [],
      taxRateName:['', [Validators.required]],
      taxRateCode:['', [Validators.required]],
      taxRateType:['', [Validators.required]],
      status :['', [Validators.required]],
      recoveryPercentage:['', [Validators.required]],
      taxPercentage :['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.nullValidator]],


      a1: ['', [Validators.required]],
      a2: ['', [Validators.required]],
      a3: ['', [Validators.required]],
      a4: ['', [Validators.required]],
      a5: ['', [Validators.required]],

      interimRecoveryCcid: ['', [Validators.required]],
      recoveryCcid: ['', [Validators.required]],
      interimLiablilityCcid: ['', [Validators.required]],
      liablilityCcid: ['', [Validators.required]],
      expenseCcid: ['', [Validators.required]],
      roundingCcid: ['', [Validators.required]],
      suspenseCcid: ['', [Validators.required]],
      advRcptSuspenseCcid: ['', [Validators.required]],
      isoSuspenseCcid: ['', [Validators.required]],
      
      lookupValueDesc1: [],
      lookupValueDesc2: [],
      lookupValueDesc3: [],
      lookupValueDesc4: [],
      lookupValueDesc5: [],

      // taxLines: this.fb.array([this.lineDetailsGroupTax()]),
      actLines: this.fb.array([this.lineDetailsGroupAct()])
    });
  }

  // lineDetailsGroupTax() {
  //   return this.fb.group({
  //     taxPercentage:['', [Validators.required]],
  //     taxStartDate: ['', [Validators.required]],
  //     taxEndDate: ['', [Validators.nullValidator]],    
  //   });
  // }

  // get lineDetailsArrayTax() {
  //   return <FormArray>this.jaiTaxRateMasterForm.get('taxLines')
  // }

      
    
 // ======================================================
 lineDetailsGroupAct() {
  return this.fb.group({
      ledgerId: ['', [Validators.required]],
      ouId: ['', [Validators.required]],
      locId: ['', [Validators.required]],
      locName: ['', [Validators.required]],

      interimRecoveryCcid: ['', [Validators.required]],
      recoveryCcid: ['', [Validators.required]],
      interimLiablilityCcid: ['', [Validators.required]],
      liablilityCcid: ['', [Validators.required]],
      expenseCcid: ['', [Validators.required]],
      roundingCcid: ['', [Validators.required]],
      suspenseCcid: ['', [Validators.required]],
      advRcptSuspenseCcid: ['', [Validators.required]],
      isoSuspenseCcid: ['', [Validators.required]],

  });
}

get lineDetailsArrayAct() {
  return <FormArray>this.jaiTaxRateMasterForm.get('actLines')
}

// addRow1() {
//   // this.lineDetailsArrayAct.push(this.lineDetailsGroupAct());
//   this.lineDetailsArrayTax.push(this.lineDetailsGroupTax());
// }

// RemoveRow1(index) {
//   if (index===0){

//   }
//   else {
//     // this.lineDetailsArrayAct.removeAt(index);
//     this.lineDetailsArrayTax.removeAt(index);
//   }
// }

addRow2() {
  this.lineDetailsArrayAct.push(this.lineDetailsGroupAct());
  // this.lineDetailsArrayTax.push(this.lineDetailsGroupTax());
}

RemoveRow2(index) {
  if (index===0){

  }
  else {
    this.lineDetailsArrayAct.removeAt(index);
    // this.lineDetailsArrayTax.removeAt(index);
  }
}

  // ======================================================
  

  jaiTaxRateMaster(jaiTaxRateMasterForm: any) {
  }

  get f() {
    return this.jaiTaxRateMasterForm.controls;
  }


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

    this.service.regimeIdList()
      .subscribe(
        data => {
          this.regimeIdList = data;
          console.log(this.regimeIdList);
        }
      );
      this.service.taxTypeIdList()
      .subscribe(
        data => {
          this.taxTypeIdList = data;
          console.log(this.taxTypeIdList);
        }
      );

      // this.service.locationIdList()
      // .subscribe(
      //   data => {
      //     this.locIdList = data;
      //     console.log(this.locIdList);
      //   }
      // );


      this.service.LedgerList()
      .subscribe(
        data => {
          this.LedgerList = data;
          console.log(this.LedgerList);
        }
      );


      //////////////////////////////////////////////for GL Code Combination/////////////////
    this.service.locationCodeList()
    .subscribe(
      data => {
        this.locationCodeList = data;
        console.log(this.locationCodeList);
      }
    );
  
  
  this.service.BranchList()
    .subscribe(
      data => {
        this.BranchList = data;
        console.log(this.BranchList);
      }
    );
  this.service.CostCenterList()
    .subscribe(
      data => {
        this.CostCenterList = data;
        console.log(this.CostCenterList);
      }
    );
  this.service.NaturalAccountList()
    .subscribe(
      data => {
        this.NaturalAccountList = data;
        console.log(this.NaturalAccountList);
      }
    );
  this.service.InterBrancList()
    .subscribe(
      data => {
        this.InterBrancList = data;
        console.log(this.InterBrancList);
      }
    );

  
  
  ///////////////////////////////////GL Code///////////////////////////////
  }

  iFlag(e) {
    if (e.target.checked) {
       this.inclusiveFlag = 'Y'
    }
  }

  onOptionsSelectedStatus(event: any) {
    this.Status1 = this.jaiTaxRateMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.jaiTaxRateMasterForm.get('endDate').reset();
      this.displayInactive=true;
      this.startDate = new Date()
    }
  }

  onTaxCocdeSelected(taxTypeId: any) {
    this.service.taxTypeNameList(taxTypeId)
      .subscribe(
        data => {
          this.taxTypeNameList = data;
          console.log(this.taxTypeNameList);
          this.jaiTaxRateMasterForm.patchValue(this.taxTypeNameList.taxTypeName);
          this.taxTypeName = this.taxTypeNameList.taxTypeName;
          // alert(taxTypeId  +' ' + this.taxTypeName);
        }
      );
  }

  onRegimeSelected(regimeId: any) {
    // alert(regimeId);
    this.service.regimNameList(regimeId)
      .subscribe(
        data => {
          this.regimNameList = data;
          console.log(this.regimNameList);
          this.jaiTaxRateMasterForm.patchValue(this.regimNameList.regimeName);
          this.regimeName = this.regimNameList.regimeName;
        }
      );
  }

  onLocationSelected(locCode: any ,i) {
    // alert(locCode);
    this.service.locationNameList(locCode)
      .subscribe(
        data => {
          this.locationNameList = data;
          console.log(this.locationNameList);
         var patch = this.jaiTaxRateMasterForm.get('actLines') as FormArray;
          // alert(this.locationNameList.locName);
          (patch.controls[i]).patchValue({ locName: this.locationNameList.locName })
        }
      );
      // this.addRow();
  }

  onLedgerSelected(ledgerId : any ,index){
    alert('ledger id =' +ledgerId);
      if (ledgerId > 0) {
        this.showOu=true;
      }
      else {
        this.showOu=false;
        
      }

      if(ledgerId==='--Select--'){
        alert('testing...')
        
        // this.jaiTaxRateMasterForm.get('ouId').reset();
        this.lineDetailsArrayAct.controls[index].get('ouId').reset();
        this.lineDetailsArrayAct.controls[index].get('locId').reset();
      }

    }


    onOuIdSelected(ouId : any ,index){
      alert('ouId id =' +ouId);
        if (ouId > 0) {
          this.showOrg=true;
        
          this.service.getLocationSearch1(ouId)
          .subscribe(
            data => {
              this.locIdList = data;
              console.log(this.locIdList);
            }
          );

        }
        else {
          this.showOrg=false;
        }
  
        if(ouId==='--Select--'){
          // alert('testing...')
          this.lineDetailsArrayAct.controls[index].get('locId').reset();
        }


      }


  onLocationSelected1(locId: any ,i) {
    // alert('LOCATION ID='+locId);

    this.service.locationNameList1(locId)
      .subscribe(
        data => {
          this.locationNameList1 = data;
          console.log(this.locationNameList1);
          var patch = this.jaiTaxRateMasterForm.get('actLines') as FormArray;
          (patch.controls[i]).patchValue({ locName: this.locationNameList1.locName })
        }
      );
    
  }

  openCodeComb(i,j) 
  {
    if(j.target.value != ''){
      // alert('i= '+i + '  j= '+j.target.value);
    var segment =j.target.value
    var  temp = segment.split('.');
    this.a1=temp[0];
    this.a2=temp[1];
    this.a3=temp[2];
    this.a4=temp[3];
    this.a5=temp[4];
    }
  
    this.showModal = true; // Show-Hide Modal Check
    this.content = i; // Dynamic Data
    this.title = i    // Dynamic Data

  }

  fndinterimRecoveryCcidGlCodeNew(content) {
    // alert(content);

    let aa = this.jaiTaxRateMasterForm.get('a1').value + '.' + this.jaiTaxRateMasterForm.get('a2').value + '.' +
      this.jaiTaxRateMasterForm.get('a3').value + '.' + this.jaiTaxRateMasterForm.get('a4').value + '.' +
      this.jaiTaxRateMasterForm.get('a5').value;
    if (content === 'INTERIM RECOVERY') {
      this.jaiTaxRateMasterForm.patchValue({ interimRecoveryCcid: aa })
    }
    if (content === 'RECOVERY') {
      this.jaiTaxRateMasterForm.patchValue({ recoveryCcid: aa })
    }
    if (content === 'Interim Liability') {
      this.jaiTaxRateMasterForm.patchValue({ interimLiablilityCcid: aa })
    }
    if (content === 'Liability') {
      this.jaiTaxRateMasterForm.patchValue({ liablilityCcid: aa })
    }
    if (content === 'Expense Account') {
      this.jaiTaxRateMasterForm.patchValue({ expenseCcid: aa })
    }
    if (content === 'Rounding Account') {
      this.jaiTaxRateMasterForm.patchValue({ roundingCcid: aa })
    }
    if (content === 'Suspense Account') {
      this.jaiTaxRateMasterForm.patchValue({ suspenseCcid: aa })
    }
    if (content === 'Advance Suspense') {
      this.jaiTaxRateMasterForm.patchValue({ advRcptSuspenseCcid: aa })
    }
    if (content === 'ISO Suspense Account') {
      this.jaiTaxRateMasterForm.patchValue({ isoSuspenseCcid: aa })
    }

    this.jaiTaxRateMasterForm.get('a1').reset(); 
    this.jaiTaxRateMasterForm.get('a2').reset();
    this.jaiTaxRateMasterForm.get('a3').reset();
    this.jaiTaxRateMasterForm.get('a4').reset();
    this.jaiTaxRateMasterForm.get('a5').reset();

    this.jaiTaxRateMasterForm.get('lookupValueDesc1').reset();
    this.jaiTaxRateMasterForm.get('lookupValueDesc2').reset();
    this.jaiTaxRateMasterForm.get('lookupValueDesc3').reset();
    this.jaiTaxRateMasterForm.get('lookupValueDesc4').reset();
    this.jaiTaxRateMasterForm.get('lookupValueDesc5').reset();
    // alert('in ' +this.jaiTaxtypeMasterForm.get('myModal').reset);
    // this.showModal = false;
  }


  onLookupSelected1(mlookupValue: any, mlookupType: string) {
    // alert('LookupValue: '+mlookupValue+ ' Type : '+mlookupType);

    this.service.lookupNameList(mlookupValue, mlookupType)
      .subscribe(
        data => {
          this.lookupNameList = data;
          console.log(this.lookupNameList);
          // this.jaiTaxtypeMasterForm.patchValue(this.lookupNameList.lookupValueDesc);
          if (this.lookupNameList.lookupType === 'SS_Branch')
            this.lookupValueDesc1 = this.lookupNameList.lookupValueDesc;
          if (this.lookupNameList.lookupType === 'SS_Location')
            this.lookupValueDesc2 = this.lookupNameList.lookupValueDesc;
          if (this.lookupNameList.lookupType === "CostCentre")
            this.lookupValueDesc3 = this.lookupNameList.lookupValueDesc;
          if (this.lookupNameList.lookupType === "NaturalAccount")
            this.lookupValueDesc4 = this.lookupNameList.lookupValueDesc;
          if (this.lookupNameList.lookupType === "SS_Interbranch")
            this.lookupValueDesc5 = this.lookupNameList.lookupValueDesc;
        }
      );
  }
//  ==============================Search=============================================
  searchMast() {
    this.service.getJaiTaxRateSearch()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      )
  }

  Select(taxRateId: number) {
    this.regimCodeDisp =false;
    this.taxCodeDisp=false;
    this.ouCodeDisp=false;
    let select = this.lstcomments.find(d => d.taxRateId === taxRateId);
    if (select) {
     
      this.orgId =select.orgId
      this.taxTypeId = select.taxTypeId.taxTypeId;
      // alert('TaxRateid=' + taxRateId+ '  Taxtypeid=' + this.taxTypeId + ' Ou id =' +this.orgId  );
      
      this.jaiTaxRateMasterForm.patchValue(select);
       this.taxRateId = select.taxRateId;
      this.displayButton = false;
      this.display = false;
    }
  }


  ////////////////////////// Reset Button module
  resetMast() {
    window.location.reload();
  }
  ////////////////////////// Close Button module
  closeMast() {
    this.router.navigate(['admin']);
  }
  
  //////////////////////////////////////New Button 
  transeData(val) {
    delete val.a1;
    delete val.a2;
    delete val.a3;
    delete val.a4;
    delete val.a5;
    delete val.lookupValueDesc1;
    delete val.lookupValueDesc2;
    delete val.lookupValueDesc3;
    delete val.lookupValueDesc4;
    delete val.lookupValueDesc5;
    delete val.regimeCode;
    delete val.regimeName;
    delete val.taxTypeCode;
    delete val.taxTypeName;
    delete val.ouName;
    return val;
  }
  
    
      

  newMast() {
    const formValue: IJaiTaxRate =this.transeData(this.jaiTaxRateMasterForm.value);
    this.service.jaiTaxRatesMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        this.jaiTaxRateMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert('Code already present in the data base');
          this.jaiTaxRateMasterForm.reset();
        }
      }
    });
  }

  updateMast() {
    const formValue: IJaiTaxRate = this.jaiTaxRateMasterForm.value;
    this.service.UpdateJaiTaxRatesMasterById(formValue, formValue.taxRateId).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFUILY');
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.jaiTaxRateMasterForm.reset();
        }
      }
    });
  };

 

}
