import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators , FormArray } from '@angular/forms';
import { MasterService } from '../master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';

interface IJaiTaxtype{
  
  taxTypeId :number;
  regimeId:number;
  taxTypeName:string;
  taxTypeCode:string;
  recoverableFlag:string;
  offsetFlag:string;
  selfAssesedFlag:string;
  reportingOnlyFlag:string;
  updVendorOnTran:string;
  allowAbatement:string;
  taxPointBasis:string;
  wthldTrxApplicableFlag:string;
  startDate:Date;
  endDate:Date;
  status:string;
  rgCode : number

  ouId: number;
  locId: number;
  locCode : string;
  locName  : string;
  ledgerId : number;
  // interimRecoveryCcid: string;
  // lookupValueDesc : string;
  lookupValueDesc1 : string;
  lookupValueDesc2 : string;
  lookupValueDesc3 : string;
  lookupValueDesc4 : string;
  lookupValueDesc5 : string;
  // lookupValue : string;
  // locDescreption : string;
 
}

@Component({
  selector: 'app-jai-tax-type',
  templateUrl: './jai-tax-type.component.html',
  styleUrls: ['./jai-tax-type.component.css']
})
export class JaiTaxTypeComponent implements OnInit {
  jaiTaxtypeMasterForm:FormGroup;
  public minDate = new Date();
  taxTypeId: number;
  regimeId: number;
  taxTypeName: string;
  taxTypeCode: string;
  taxPointBasis: string;
  recoverableFlag: string;
  offsetFlag: string;
  selfAssesedFlag: string;
  reportingOnlyFlag: string;
  updVendorOnTran: string;
  allowAbatement: string;
  locCode: string;
  // lookupValue: string;
  ledgerId:number;
  interimRecoveryCcid: string;
  recoveryCcid: string;
  interimLiablilityCcid: string;
  liablilityCcid: string;
  expenseCcid: string;
  roundingCcid: string;
  suspenseCcid: string;
  advRcptSuspenseCcid: string;
  isoSuspenseCcid: string;

  regimeName: string;
  locName: string;
  locDescreption : string;

  lookupValueDesc: string;
  lookupValueDesc1: string;
  lookupValueDesc2: string;
  lookupValueDesc3: string;
  lookupValueDesc4: string;
  lookupValueDesc5: string;

  lookupValueDesc6: any[];
  lookupValueDescB1: string;

  // public ledger = 'SS LEDGER';

  wthldTrxApplicableFlag: string;
  startDate: Date;
  endDate: Date;
  // status:string;
  submitted = false;
  ouId: number;
  locId: number;
  rgCode : number;

// lookupType:string

  displayInactive = true;
  Status1: any;
  lstcomments: any[];
  public statusList: Array<string> = [];
  public regimeIdList: Array<string> = [];

  public regimNameList: any;
  public locationNameList: any;
  public lookupNameList: any;

  public OUIdList: Array<string> = [];
  public LedgerList: Array<string> = [];
  
  // public locIdList: Array<string> = [];

  public status = "Active";
  inactiveDate: Date;
  display = true;
  displayButton = true;

  

  a1: string;
  a2: string;
  a3: string;
  a4: string;
  a5: string;


  showModal: boolean;
  content: number;
  title: string;

  
  public BranchList: Array<string> = [];
  public CostCenterList: Array<string> = [];
  public NaturalAccountList: Array<string> = [];
  public InterBrancList: Array<string> = [];
  public locationCodeList: Array<string> = [];
  public DivisionIDList: Array<string> = [];
  public locIdList: Array<string> = [];
  public companyCodeList: Array<string> = [];
  public FutureList: Array<string> = [];
  public SubAccountList: Array<string> = [];
  


  constructor(private service: MasterService, private fb: FormBuilder, private router: Router) {
    this.jaiTaxtypeMasterForm = fb.group({
      // ouId: ['', [Validators.required]],
      // locId: ['', [Validators.required]],
      status: ['', [Validators.required]],
      taxTypeCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      taxTypeName: ['', [Validators.required]],
      taxPointBasis: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.nullValidator]],
      taxTypeId: [''],
      regimeId: ['', [Validators.required]],
      recoverableFlag: ['', [Validators.required]],
      offsetFlag: ['', [Validators.required]],
      selfAssesedFlag: ['', [Validators.required]],
      reportingOnlyFlag: ['', [Validators.required]],
      updVendorOnTran: ['', [Validators.required]],
      allowAbatement: ['', [Validators.required]],
      wthldTrxApplicableFlag: ['', [Validators.required]],
      rgCode  :[''],
      
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
      regimeName: [],
      // locName: [],
      // ledgerId: [],
      // locCode: [],
      // lookupValue: [],
      // lookupValueDesc: [],
      lookupValueDesc1: [],
      lookupValueDesc2: [],
      lookupValueDesc3: [],
      lookupValueDesc4: [],
      lookupValueDesc5: [],
      // lookupValueDescB1: [],

      locDescreption:[],
      actLines: this.fb.array([this.lineDetailsGroup()])


    });

  }

  lineDetailsGroup() {
    return this.fb.group({
      // ledger: [],
      // opUnit: [],
      // invOrg: [],
      // locDesc: [],
      ledgerId:['', Validators.required],
      ouId: ['', [Validators.required]],
      locId: ['', [Validators.required]],
      locName: ['', [Validators.required]],
      // locCode: [],

    });
  }

  get lineDetailsArray() {
    return <FormArray>this.jaiTaxtypeMasterForm.get('actLines')
  }

  addRow() {
    this.lineDetailsArray.push(this.lineDetailsGroup());
  }

  RemoveRow(index) {
    if (index===0){

    }
    else {
      this.lineDetailsArray.removeAt(index);
    }
  
  }

  jaiTaxtypeMaster(jaiTaxtypeMaster: any) {
  }

  get f() {
    return this.jaiTaxtypeMasterForm.controls;
  }
  //////////////////////////////////////////////////ngOninit///////////////////////
  ngOnInit(): void {
   
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

    this.service.OUIdList()
      .subscribe(
        data => {
          this.OUIdList = data;
          console.log(this.OUIdList);
        }
      );

    this.service.locationIdList()
      .subscribe(
        data => {
          this.locIdList = data;
          console.log(this.locIdList);
        }
      );


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
    this.service.DivisionIDList()
      .subscribe(
        data => {
          this.DivisionIDList = data;
          console.log(this.DivisionIDList);
        }
      );
    this.service.companyCodeList()
      .subscribe(
        data => {
          this.companyCodeList = data;
          console.log(this.companyCodeList);
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

    this.service.FutureList()
      .subscribe(
        data => {
          this.FutureList = data;
          console.log(this.FutureList);
        }
      );
    this.service.SubAccountList()
      .subscribe(
        data => {
          this.SubAccountList = data;
          console.log(this.SubAccountList);
        }
      );
    ///////////////////////////////////GL Code///////////////////////////////

  }

  ///////////////////////Recoverable Tax CheckBox/////////////////////////
  recoverableFlg1(e : any) {
    // alert (e);
    if (e.target.checked) {
       this.recoverableFlag = 'Y'
    }
    else {
      this.recoverableFlag='N'
    }
  }

  ///////////////////////Applicable for Offset  CheckBox/////////////////////////
  offsetFlg(e) {
    if (e.target.checked) {
      this.offsetFlag = 'Y'
    }
  }
  ///////////////////////Self Assessed /Reverse Change  CheckBox/////////////////////////
  selfAssesedFlg(e) {
    if (e.target.checked) {
      this.selfAssesedFlag = 'Y'
    }
  }

  ///////////////////////Set Taxtype for Reporting Only CheckBox/////////////////////////


  reportingOnlyFlg(e) {
    if (e.target.checked) {
      this.reportingOnlyFlag = 'Y'
    }
  }
  ///////////////////////Update Vendor on Transaction CheckBox/////////////////////////
  updVendorOnTranFlg(e) {
    if (e.target.checked) {
      this.updVendorOnTran = 'Y'
    }
  }
  ///////////////////////Allow Abetment CheckBox/////////////////////////
  allowAbatementFlg(e) {
    if (e.target.checked) {
      this.allowAbatement = 'Y'
    }
  }
  ///////////////////////Witholding Tax Applicable  CheckBox/////////////////////////
  wthldTrxApplicableFlg(e) {
    if (e.target.checked) {
      this.wthldTrxApplicableFlag = 'Y'
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////


  Select(taxTypeId: number) {
    let select = this.lstcomments.find(d => d.taxTypeId === taxTypeId);
    if (select) {
      this.jaiTaxtypeMasterForm.patchValue(select);
      // this.regimeId = select[0].regimeId.regimeId;
      this.regimeId=select.regimeId.regimeId;
      alert('taxPointBasis='+this.taxPointBasis);
      alert('recoverable flag='+this.recoverableFlag);

      this.taxTypeId = select.taxTypeId;
      this.displayButton = false;
      this.display = false;
    }
  }
 
  searchMast() {
    this.service.getJaiTaxTypeSearch()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      )
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
  return val;
}

  newMast() {
    const formValue: IJaiTaxtype =this.transeData(this.jaiTaxtypeMasterForm.value);
    this.service.jaiTaxTypeMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        this.jaiTaxtypeMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert('Code already present in the data base');
          this.jaiTaxtypeMasterForm.reset();
        }
      }
    });
  }
  
  updateMast() {
    const formValue: IJaiTaxtype = this.jaiTaxtypeMasterForm.value;
    this.service.UpdateJaiTaxTypeMasterById(formValue, formValue.taxTypeId).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFUILY');
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.jaiTaxtypeMasterForm.reset();
        }
      }
    });
  };

  fndinterimRecoveryCcidGlCodeNew(content) {
    // alert(content);

    let aa = this.jaiTaxtypeMasterForm.get('a1').value + '.' + this.jaiTaxtypeMasterForm.get('a2').value + '.' +
      this.jaiTaxtypeMasterForm.get('a3').value + '.' + this.jaiTaxtypeMasterForm.get('a4').value + '.' +
      this.jaiTaxtypeMasterForm.get('a5').value;
    if (content === 'INTERIM RECOVERY') {
      this.jaiTaxtypeMasterForm.patchValue({ interimRecoveryCcid: aa })
    }
    if (content === 'RECOVERY') {
      this.jaiTaxtypeMasterForm.patchValue({ recoveryCcid: aa })
    }
    if (content === 'Interim Liability') {
      this.jaiTaxtypeMasterForm.patchValue({ interimLiablilityCcid: aa })
    }
    if (content === 'Liability') {
      this.jaiTaxtypeMasterForm.patchValue({ liablilityCcid: aa })
    }
    if (content === 'Expense Account') {
      this.jaiTaxtypeMasterForm.patchValue({ expenseCcid: aa })
    }
    if (content === 'Rounding Account') {
      this.jaiTaxtypeMasterForm.patchValue({ roundingCcid: aa })
    }
    if (content === 'Suspense Account') {
      this.jaiTaxtypeMasterForm.patchValue({ suspenseCcid: aa })
    }
    if (content === 'Advance Suspense') {
      this.jaiTaxtypeMasterForm.patchValue({ advRcptSuspenseCcid: aa })
    }
    if (content === 'ISO Suspense Account') {
      this.jaiTaxtypeMasterForm.patchValue({ isoSuspenseCcid: aa })
    }

    this.jaiTaxtypeMasterForm.get('a1').reset(); 
    this.jaiTaxtypeMasterForm.get('a2').reset();
    this.jaiTaxtypeMasterForm.get('a3').reset();
    this.jaiTaxtypeMasterForm.get('a4').reset();
    this.jaiTaxtypeMasterForm.get('a5').reset();

    this.jaiTaxtypeMasterForm.get('lookupValueDesc1').reset();
    this.jaiTaxtypeMasterForm.get('lookupValueDesc2').reset();
    this.jaiTaxtypeMasterForm.get('lookupValueDesc3').reset();
    this.jaiTaxtypeMasterForm.get('lookupValueDesc4').reset();
    this.jaiTaxtypeMasterForm.get('lookupValueDesc5').reset();


    // alert('in ' +this.jaiTaxtypeMasterForm.get('myModal').reset);
    // this.showModal = false;
  }

  // fndinterimRecoveryCcidGlCode(a1, a2, a3, a4, a5) {
  //   const glcd1 = a1 + '.' + a2 + '.' + a3 + '.' + a4 + '.' + a5
  //   this.interimRecoveryCcid = glcd1;
  // }

  // fndRecoveryCcidGlCode(b1, b2, b3, b4, b5) {
  //   const glcd1 = b1 + '.' + b2 + '.' + b3 + '.' + b4 + '.' + b5
  //   this.recoveryCcid = glcd1;
  // }

  // fndinterimLiablilityCcidGlCode(c1, c2, c3, c4, c5) {
  //   const glcd1 = c1 + '.' + c2 + '.' + c3 + '.' + c4 + '.' + c5
  //   this.interimLiablilityCcid = glcd1;
  // }

  // fndliablilityCcidGlCode(d1, d2, d3, d4, d5) {
  //   const glcd1 = d1 + '.' + d2 + '.' + d3 + '.' + d4 + '.' + d5
  //   this.liablilityCcid = glcd1;
  // }

  // fndexpenseCcidGlCode(e1, e2, e3, e4, e5) {
  //   const glcd1 = e1 + '.' + e2 + '.' + e3 + '.' + e4 + '.' + e5
  //   this.expenseCcid = glcd1;
  // }

  // fndroundingCcidGlCode(f1, f2, f3, f4, f5) {
  //   // alert(f1);
  //   const glcd1 = f1 + '.' + f2 + '.' + f3 + '.' + f4 + '.' + f5
  //   this.roundingCcid = glcd1;
  // }
  // fndsuspenseCcidGlCode(g1, g2, g3, g4, g5) {
  //   const glcd1 = g1 + '.' + g2 + '.' + g3 + '.' + g4 + '.' + g5
  //   this.suspenseCcid = glcd1;
  // }
  // fndadvRcptSuspenseCcidGlCode(h1, h2, h3, h4, h5) {
  //   const glcd1 = h1 + '.' + h2 + '.' + h3 + '.' + h4 + '.' + h5
  //   this.advRcptSuspenseCcid = glcd1;
  // }
  // fndisoSuspenseCcidGlCode(i1, i2, i3, i4, i5) {
  //   const glcd1 = i1 + '.' + i2 + '.' + i3 + '.' + i4 + '.' + i5
  //   this.isoSuspenseCcid = glcd1;
  // }


 

  onOptionsSelected(event: any) {
    this.Status1 = this.jaiTaxtypeMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.jaiTaxtypeMasterForm.get('endDate').reset();
    }
  }


 

  // Select(taxTypeId: number) {
  //   let select = this.lstcomments.find(d => d.taxTypeId === taxTypeId);
  //   if (select) {
  //     this.jaiTaxtypeMasterForm.patchValue(select);
  //     // this.regimeId = select.regimeId;
  //     this.taxTypeId = select.taxTypeId;
  //     this.displayButton = false;
  //     this.display = false;
  //   }
  // }

  onOptionSelected(regimeId : any) {
   
    this.service.regimNameList(regimeId)
      .subscribe(
        data => {
          this.regimNameList = data;
          console.log(this.regimNameList);
          this.jaiTaxtypeMasterForm.patchValue(this.regimNameList.regimeName);
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
          // this.jaiTaxtypeMasterForm.patchValue(this.locationNameList.locName);
          // this.locName = this.locationNameList.locName;
          // console.log(this.locationNameList.locName)
          // this.lineDetailsArray.push(this.lineDetailsGroup());
          var patch = this.jaiTaxtypeMasterForm.get('actLines') as FormArray;
          // this.locDescreption = this.locationNameList.locName;
          // var arrayControl = this.jaiTaxtypeMasterForm.get('actLines').value
          alert(this.locationNameList.locName);
          (patch.controls[i]).patchValue({ locName: this.locationNameList.locName })
        }
      );
      // this.addRow();
  }


  onLookupSelected1(mlookupValue: any, mlookupType: string) {
    // alert('LookupValue: '+mlookupValue+ ' Type : '+mlookupType);

    this.service.lookupNameList(mlookupValue, mlookupType)
      .subscribe(
        data => {
          this.lookupNameList = data;
          if (this.lookupNameList != null) {
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
      }
      );
  }

 
  openCodeComb(i,j) 
  {
    if(j.target.value != ''){
      alert('i= '+i + '  j= '+j.target.value);
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

  openCodeComb1(i, interimRecoveryCcid) {
    alert('in openCodeComb1 ' + i + 'interimRecoveryCcid ' + interimRecoveryCcid);
    // alert(interimRecoveryCcid.length);
    // if(interimRecoveryCcid != 'undefined'){
    //   alert('hi ' + interimRecoveryCcid);
    // var temp=  interimRecoveryCcid.split('.');
    // this.a1= temp[0];
    // this.a2=temp[1];
    // this.a3=temp[2];
    // this.a4=temp[3];
    // this.a5=temp[4];
    // }
    this.showModal = true; // Show-Hide Modal Check
    this.content = i; // Dynamic Data
    this.title = i    // Dynamic Data
  }

}
