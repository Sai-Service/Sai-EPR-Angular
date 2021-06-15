import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { MasterService } from '../master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';

interface IJaiTaxtype {

  taxTypeId: number;
  regimeId: number;
  taxTypeName: string;
  taxTypeCode: string;

  recoverableFlag: string;
  offsetFlag: string;
  selfAssesedFlag: string;
  reportingOnlyFlag: string;
  updVendorOnTran: string;
  allowAbatement: string;
  taxPointBasis: string;
  wthldTrxApplicableFlag: string;
  startDate: Date;
  endDate: Date;
  status: string;
  regimeCode: string;

  opUnit: number;
  ledgerId: number;
  ouId: number; ouName: string;
  locId: number; locName: string; locCode: string;
  interimRecoveryCcid: string;
  recoveryCcid: string;
  interimLiablilityCcid: string;
  liablilityCcid: string;
  expenseCcid: string;
  roundingCcid: string;
  suspenseCcid: string;
  advRcptSuspenseCcid: string;
  isoSuspenseCcid: string;



  lookupValueDesc1: string;
  lookupValueDesc2: string;
  lookupValueDesc3: string;
  lookupValueDesc4: string;
  // lookupValueDesc5 : string;
  // showOu : boolean[];
  // showOrg: boolean[];

}

@Component({
  selector: 'app-jai-tax-type',
  templateUrl: './jai-tax-type.component.html',
  styleUrls: ['./jai-tax-type.component.css']
})
export class JaiTaxTypeComponent implements OnInit {
  jaiTaxtypeMasterForm: FormGroup;


  loginName: string;
  loginArray: string;
  name: string;
  ouName: string;
  locId: number;
  locName: string;
  orgId: number;
  ouId: number;
  deptId: number;
  divisionId: number;
  // emplId :number;
  public emplId = 6;
  lineIndex: number;


  iValue: number;
  // PLANE =true;   
  TRUER = false; FALSER = false;
  TRUEwth = false; FALSEwth = false;
  TRUEall = false; FALSEall = false;
  TRUEupd = false; FALSEupd = false;
  TRUErept = false; FALSErept = false;
  TRUEs = false; FALSEs = false;
  TRUEo = false; FALSEo = false;

  public minDate = new Date();
  // public maxDate = new Date();
  startDate = new Date();
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

  ledgerId: number;
  opUnit: number;
  // ouId: number; ouName : string;
  // locId: number;
  // locName: string; 
  locCode: string;
  interimRecoveryCcid: string;
  recoveryCcid: string;
  interimLiablilityCcid: string;
  liablilityCcid: string;
  expenseCcid: string;
  roundingCcid: string;
  suspenseCcid: string;
  advRcptSuspenseCcid: string;
  isoSuspenseCcid: string;
  // segmentName: string;

  regimCodeDisp = true;
  showOpUnit = false;
  showOrg = false;
  showOu = false;
  regimeName: string;
  regimeCode: string;


  // locDescreption : string;



  lookupValueDesc: string;
  lookupValueDesc1: string;
  lookupValueDesc2: string;
  lookupValueDesc3: string;
  lookupValueDesc4: string;
  lookupValueDesc5: string;

  lookupValueDesc6: any[];
  lookupValueDescB1: string;
  checked: boolean;
  // public ledger = 'SS LEDGER';
  locationId: string;
  wthldTrxApplicableFlag: string;
  // startDate: Date;
  endDate: Date;
  // status:string;
  submitted = false;


  showCodeButton = false;
  displayInactive = true;
  Status1: any;
  lstcomments: any[];
  public statusList: Array<string> = [];
  public regimeIdList: Array<string> = [];

  public actDetails: any;

  public regimNameList: any;
  public locationNameList: any;
  public locationNameList1: any;
  public lookupNameList: any;

  public OUIdList: Array<string> = [];
  public LedgerList: Array<string> = [];



  public status = "Active";
  inactiveDate: Date;
  currentDate: Date;
  display = true;
  displayButton = true;
  recFlagDiss = true;
  offsetFlagFagDiss = true;
  selfAssesedFagDiss = true;
  reportingOnlyFlagDiss = true;
  updVendorOnTranDiss = true;
  allowAbatementDiss = true;
  wthldTrxApplicableFlagDiss = true;
  locationDissplay = false;


  a1: string;
  a2: string;
  a3: string;
  a4: string;
  a5: string;

  b1: string;
  b2: string;
  b3: string;
  b4: string;
  b5: string;
  b6: string;
  b7: string;
  b8: string;
  b9: string;

  b1Desc: string;
  b2Desc: string;
  b3Desc: string;
  b4Desc: string;
  b5Desc: string;
  b6Desc: string;
  b7Desc: string;
  b8Desc: string;
  b9Desc: string;




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

  public locIdList2: Array<string> = [];



  constructor(private service: MasterService, private fb: FormBuilder, private router: Router) {
    this.jaiTaxtypeMasterForm = fb.group({


      loginArray: [''],
      loginName: [''],
      ouName: [''],
      locId: [''],
      locName: [''],
      ouId: [],
      deptId: [],
      emplId: [''],
      orgId: [],
      divisionId: [],

      status: ['', [Validators.required]],
      taxTypeCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      taxTypeName: ['', [Validators.required]],
      taxPointBasis: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.nullValidator]],
      taxTypeId: [''],
      regimeId: [],
      regimeCode: ['', [Validators.nullValidator]],
      recoverableFlag: ['', [Validators.required]],
      offsetFlag: ['', [Validators.required]],
      selfAssesedFlag: ['', [Validators.required]],
      reportingOnlyFlag: ['', [Validators.required]],
      updVendorOnTran: ['', [Validators.required]],
      allowAbatement: ['', [Validators.required]],
      wthldTrxApplicableFlag: ['', [Validators.required]],
      locationId: [''],
      opUnit: ['', [Validators.required]],
      lineIndex: [],
      a1: ['', [Validators.required]],
      a2: ['', [Validators.required]],
      a3: ['', [Validators.required]],
      a4: ['', [Validators.required]],
      a5: ['', [Validators.required]],

      b1: ['', [Validators.required]],
      b2: ['', [Validators.required]],
      b3: ['', [Validators.required]],
      b4: ['', [Validators.required]],
      b5: ['', [Validators.required]],
      b6: ['', [Validators.required]],
      b7: ['', [Validators.required]],
      b8: ['', [Validators.required]],
      b9: ['', [Validators.required]],

      b1Desc: ['', [Validators.required]],
      b2Desc: ['', [Validators.required]],
      b3Desc: ['', [Validators.required]],
      b4Desc: ['', [Validators.required]],
      b5Desc: ['', [Validators.required]],
      b6Desc: ['', [Validators.required]],
      b7Desc: ['', [Validators.required]],
      b8Desc: ['', [Validators.required]],
      b9Desc: ['', [Validators.required]],


      regimeName: [],
      lookupValueDesc1: [],
      lookupValueDesc2: [],
      lookupValueDesc3: [],
      lookupValueDesc4: [],
      // lookupValueDesc5: [],


      actLines: this.fb.array([this.lineDetailsGroup()])


    });

  }

  lineDetailsGroup() {
    return this.fb.group({

      ledgerId: ['', [Validators.required]],
      ouId: ['', [Validators.required]],
      locId: ['', [Validators.required]],
      // locName: ['', [Validators.required]],
      // locCode: ['', [Validators.required]],
      // ouName: ['', [Validators.required]],
      interimRecoveryCcid: ['', [Validators.required]],
      recoveryCcid: ['', [Validators.required]],
      interimLiablilityCcid: ['', [Validators.required]],
      liablilityCcid: ['', [Validators.required]],
      expenseCcid: ['', [Validators.required]],
      roundingCcid: ['', [Validators.required]],
      suspenseCcid: ['', [Validators.required]],
      advRcptSuspenseCcid: ['', [Validators.required]],
      isoSuspenseCcid: ['', [Validators.required]],
      // segmentName: [],

    });
  }

  get lineDetailsArray() {
    return <FormArray>this.jaiTaxtypeMasterForm.get('actLines')
  }

  jaiTaxtypeMaster(jaiTaxtypeMasterForm: any) {
  }

  addRow() {
    // alert('addrow index '+index);
    this.lineDetailsArray.push(this.lineDetailsGroup());
    this.showOu = false;
    this.showOrg = false;
    this.resetModalData();
  }

  RemoveRow(index) {
    if (index === 0) {

    }
    else {
      this.lineDetailsArray.removeAt(index);
    }

  }



  get f() {
    return this.jaiTaxtypeMasterForm.controls;
  }
  //////////////////////////////////////////////////ngOninit///////////////////////
  ngOnInit(): void {


    this.name = sessionStorage.getItem('name');
    this.loginArray = sessionStorage.getItem('divisionName');
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.loginName = sessionStorage.getItem('name');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.locId = Number(sessionStorage.getItem('locId'));
    // this.locName=(sessionStorage.getItem('locName'));
    this.deptId = Number(sessionStorage.getItem('dept'));
    // this.emplId= Number(sessionStorage.getItem('emplId'));

    this.orgId = this.ouId;
    console.log(this.loginArray);
    console.log(this.locId);

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

    // this.service.locationIdList()
    //   .subscribe(
    //     data => {
    //       this.locIdList = data;
    //       console.log(this.locIdList);
    //     }
    //   );


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

    // this.service.DivisionIDList()
    //   .subscribe(
    //     data => {
    //       this.DivisionIDList = data;
    //       console.log(this.DivisionIDList);
    //     }
    //   );

    // this.service.companyCodeList()
    //   .subscribe(
    //     data => {
    //       this.companyCodeList = data;
    //       console.log(this.companyCodeList);
    //     }
    //   );

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

  LoadValues(i) {
    // alert("load value i ="+i);
    this.lineIndex = i;
    var iRecovery;

    var patch = this.jaiTaxtypeMasterForm.get('actLines') as FormArray;
    var invLineArr = this.jaiTaxtypeMasterForm.get('actLines').value;
    // alert(iRecovery);
    // var xyz =iRecovery;
    // iRecovery = invLineArr[i].interimRecoveryCcid;
    // var  temp = iRecovery.split('.');
    var temp = invLineArr[i].interimRecoveryCcid.split('.');
    this.a1 = temp[0]; this.a2 = temp[1]; this.a3 = temp[2]; this.a4 = temp[4]; this.b1 = temp[3];
    var temp = invLineArr[i].recoveryCcid.split('.');
    this.a1 = temp[0]; this.a2 = temp[1]; this.a3 = temp[2]; this.a4 = temp[4]; this.b2 = temp[3];
    var temp = invLineArr[i].interimLiablilityCcid.split('.');
    this.a1 = temp[0]; this.a2 = temp[1]; this.a3 = temp[2]; this.a4 = temp[4]; this.b3 = temp[3];
    var temp = invLineArr[i].liablilityCcid.split('.');
    this.a1 = temp[0]; this.a2 = temp[1]; this.a3 = temp[2]; this.a4 = temp[4]; this.b4 = temp[3];
    var temp = invLineArr[i].expenseCcid.split('.');
    this.a1 = temp[0]; this.a2 = temp[1]; this.a3 = temp[2]; this.a4 = temp[4]; this.b5 = temp[3];
    var temp = invLineArr[i].roundingCcid.split('.');
    this.a1 = temp[0]; this.a2 = temp[1]; this.a3 = temp[2]; this.a4 = temp[4]; this.b6 = temp[3];
    var temp = invLineArr[i].suspenseCcid.split('.');
    this.a1 = temp[0]; this.a2 = temp[1]; this.a3 = temp[2]; this.a4 = temp[4]; this.b7 = temp[3];
    var temp = invLineArr[i].advRcptSuspenseCcid.split('.');
    this.a1 = temp[0]; this.a2 = temp[1]; this.a3 = temp[2]; this.a4 = temp[4]; this.b8 = temp[3];
    var temp = invLineArr[i].isoSuspenseCcid.split('.');
    this.a1 = temp[0]; this.a2 = temp[1]; this.a3 = temp[2]; this.a4 = temp[4]; this.b9 = temp[3];

    // this.a1=temp[0]; this.a2=temp[1]; this.a3=temp[2]; this.b1=temp[3]; this.a4=temp[4];


    // alert("temp: "+temp +"  temp[0]="+temp[0]);
    // alert("a4=" +temp[3]);

  }

  ///////////////////////Recoverable Tax CheckBox/////////////////////////
  recoverableFlg1(e) {
    if (e.target.checked === true) {
      this.recoverableFlag = 'Y'
    }
    if (e.target.checked === false) {
      this.recoverableFlag = 'N'
    }

    // alert ('Recoverable flag =' + this.recoverableFlag);
  }

  ///////////////////////Applicable for Offset  CheckBox/////////////////////////
  offsetFlg(e) {
    if (e.target.checked === true) {
      this.offsetFlag = 'Y'
    }
    if (e.target.checked === false) {
      this.offsetFlag = 'N'
    }
  }
  ///////////////////////Self Assessed /Reverse Change  CheckBox/////////////////////////
  selfAssesedFlg(e) {
    if (e.target.checked === true) {
      this.selfAssesedFlag = 'Y'
    }
    if (e.target.checked === false) {
      this.selfAssesedFlag = 'N'
    }
  }

  ///////////////////////Set Taxtype for Reporting Only CheckBox/////////////////////////


  reportingOnlyFlg(e) {
    if (e.target.checked === true) {
      this.reportingOnlyFlag = 'Y'
    }
    if (e.target.checked === false) {
      this.reportingOnlyFlag = 'N'
    }

  }
  ///////////////////////Update Vendor on Transaction CheckBox/////////////////////////
  updVendorOnTranFlg(e) {
    if (e.target.checked === true) {
      this.updVendorOnTran = 'Y'
    }
    if (e.target.checked === false) {
      this.updVendorOnTran = 'N'
    }
  }
  ///////////////////////Allow Abetment CheckBox/////////////////////////
  allowAbatementFlg(e) {
    if (e.target.checked === true) {
      this.allowAbatement = 'Y'
    }
    if (e.target.checked === false) {
      this.allowAbatement = 'N'
    }
  }
  ///////////////////////Witholding Tax Applicable  CheckBox/////////////////////////
  wthldTrxApplicableFlg(e) {
    if (e.target.checked === true) {
      this.wthldTrxApplicableFlag = 'Y'
    }
    if (e.target.checked === false) {
      this.wthldTrxApplicableFlag = 'N'
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////

  Select(taxTypeId: number) {
    this.regimCodeDisp = false;
    let select = this.lstcomments.find(d => d.taxTypeId === taxTypeId);

    if (select) {

      this.recFlagDiss = false;
      if (select.recoverableFlag === 'Y') {
        this.TRUER = false; this.FALSER = true;
      } if (select.recoverableFlag === 'N') {
        this.FALSER = false; this.TRUER = true;
      }

      this.offsetFlagFagDiss = false;
      if (select.offsetFlag === 'Y') {
        this.TRUEo = false; this.FALSEo = true;
      } if (select.offsetFlag === 'N') {
        this.TRUEo = true; this.FALSEo = false;
      }

      this.selfAssesedFagDiss = false;
      if (select.selfAssesedFlag === 'Y') {
        this.TRUEs = false; this.FALSEs = true;
      } if (select.selfAssesedFlag === 'N') {
        this.TRUEs = true; this.FALSEs = false;
      }

      this.reportingOnlyFlagDiss = false;
      if (select.reportingOnlyFlag === 'Y') {
        this.TRUErept = false; this.FALSErept = true;
      } if (select.reportingOnlyFlag === 'N') {
        this.TRUErept = true; this.FALSErept = false;
      }

      this.updVendorOnTranDiss = false;
      if (select.updVendorOnTran === 'Y') {
        this.TRUEupd = false; this.FALSEupd = true;
      } if (select.updVendorOnTran === 'N') {
        this.TRUEupd = true; this.FALSEupd = false;
      }

      this.allowAbatementDiss = false;
      if (select.allowAbatement === 'Y') {
        this.TRUEall = false; this.FALSEall = true;
      } if (select.allowAbatement === 'N') {
        this.TRUEall = true; this.FALSEall = false;
      }

      this.wthldTrxApplicableFlagDiss = false;
      if (select.wthldTrxApplicableFlag === 'Y') {
        this.TRUEwth = false; this.FALSEwth = true;
      } if (select.wthldTrxApplicableFlag === 'N') {
        this.TRUEwth = true; this.FALSEwth = false;
      }
      this.jaiTaxtypeMasterForm.patchValue(select);
      this.taxTypeId = select.taxTypeId;
      this.regimeId = select.regimeId.regimeId;
      this.regimeCode = select.regimeId.regimeCode;
      this.regimeName = select.regimeId.regimeName;


      this.displayButton = false;
      this.display = false;
      // this.regimeId = select[0].regimeId.regimeIdfal
      // this.regimeId=select.regimeId.regimeCode;
      // alert('taxPointBasis='+this.taxPointBasis);
      // alert('recoverable flag='+select.recoverableFlag);
      // this.recoverableFlag = select.recoverableFlag;

    }

  }



  searchMast() {
    // alert('searching....')
    this.service.getJaiTaxTypeSearch()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);

        }
      )
  }


  ////////////////////////// Reset Button module
  resetMast() { window.location.reload(); }

  ////////////////////////// Close Button module
  closeMast() { this.router.navigate(['admin']); }

  //////////////////////////////////////New Button 

  transeData(val) {

    delete val.loginArray;
    delete val.loginName;
    delete val.ouName;
    delete val.locId;
    delete val.locName;
    delete val.ouId;
    delete val.deptId;
    delete val.orgId;

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

    delete val.b1;
    delete val.b2;
    delete val.b3;
    delete val.b4;
    delete val.b5;
    delete val.b6;
    delete val.b7;
    delete val.b8;
    delete val.b9;
    delete val.b1Desc;
    delete val.b2Desc;
    delete val.b3Desc;
    delete val.b4Desc;
    delete val.b5Desc;
    delete val.b6Desc;
    delete val.b7Desc;
    delete val.b8Desc;
    delete val.b9Desc;
    delete val.locationId;
    delete val.lineIndex;
    return val;
  }

  newMast() {
    const formValue: IJaiTaxtype = this.transeData(this.jaiTaxtypeMasterForm.value);

    if (this.jaiTaxtypeMasterForm.controls['recoverableFlag'].value === undefined) {
      formValue.recoverableFlag = 'N';
    }
    if (this.jaiTaxtypeMasterForm.controls['offsetFlag'].value === undefined) {
      formValue.offsetFlag = 'N';
    }
    if (this.jaiTaxtypeMasterForm.controls['selfAssesedFlag'].value === undefined) {
      formValue.selfAssesedFlag = 'N';
    }
    if (this.jaiTaxtypeMasterForm.controls['reportingOnlyFlag'].value === undefined) {
      formValue.reportingOnlyFlag = 'N';
    }
    if (this.jaiTaxtypeMasterForm.controls['updVendorOnTran'].value === undefined) {
      formValue.updVendorOnTran = 'N';
    }
    if (this.jaiTaxtypeMasterForm.controls['allowAbatement'].value === undefined) {
      formValue.allowAbatement = 'N';
    }
    if (this.jaiTaxtypeMasterForm.controls['wthldTrxApplicableFlag'].value === undefined) {
      formValue.wthldTrxApplicableFlag = 'N';
    }

    this.service.jaiTaxTypeMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFULLY');
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
    // alert(this.jaiTaxtypeMasterForm.controls['recoverableFlag'].value)
    // alert(this.recoverableFlag)
    const formValue: IJaiTaxtype = this.jaiTaxtypeMasterForm.value;
    formValue.recoverableFlag = this.recoverableFlag;
    formValue.offsetFlag = this.offsetFlag;
    formValue.reportingOnlyFlag = this.reportingOnlyFlag;
    formValue.updVendorOnTran = this.updVendorOnTran;
    formValue.selfAssesedFlag = this.selfAssesedFlag;
    formValue.allowAbatement = this.allowAbatement;
    formValue.wthldTrxApplicableFlag = this.wthldTrxApplicableFlag;
    formValue.regimeId = this.regimeId;
    this.service.UpdateJaiTaxTypeMasterById(formValue, formValue.taxTypeId).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFULLY');
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.jaiTaxtypeMasterForm.reset();
        }
      }
    });
  };




  // fndinterimRecoveryCcidGlCodeNew(content) {
  //   var i = this.iValue;
  //   var patch = this.jaiTaxtypeMasterForm.get('actLines') as FormArray;

  //   alert('content-' + content);
  //   alert('a1 =' + this.jaiTaxtypeMasterForm.get('a1').value);

  //   let aa = this.jaiTaxtypeMasterForm.get('a1').value + '.' + this.jaiTaxtypeMasterForm.get('a2').value + '.' +
  //     this.jaiTaxtypeMasterForm.get('a3').value + '.' + this.jaiTaxtypeMasterForm.get('a4').value + '.' +
  //     this.jaiTaxtypeMasterForm.get('a5').value;

  //     alert('aa='+aa);

  //    if (content === 'INTERIM RECOVERY') {
  //     // this.jaiTaxtypeMasterForm.patchValue({ interimRecoveryCcid: aa })
  //     (patch.controls[i]).patchValue({ interimRecoveryCcid: aa})
  //   }
  //   if (content === 'RECOVERY') {
  //     this.jaiTaxtypeMasterForm.patchValue({ recoveryCcid: aa })
  //   }
  //   if (content === 'Interim Liability') {
  //     this.jaiTaxtypeMasterForm.patchValue({ interimLiablilityCcid: aa })
  //   }
  //   if (content === 'Liability') {
  //     this.jaiTaxtypeMasterForm.patchValue({ liablilityCcid: aa })
  //   }
  //   if (content === 'Expense Account') {
  //     this.jaiTaxtypeMasterForm.patchValue({ expenseCcid: aa })
  //   }
  //   if (content === 'Rounding Account') {
  //     this.jaiTaxtypeMasterForm.patchValue({ roundingCcid: aa })
  //   }
  //   if (content === 'Suspense Account') {
  //     this.jaiTaxtypeMasterForm.patchValue({ suspenseCcid: aa })
  //   }
  //   if (content === 'Advance Suspense') {
  //     this.jaiTaxtypeMasterForm.patchValue({ advRcptSuspenseCcid: aa })
  //   }
  //   if (content === 'ISO Suspense Account') {
  //     this.jaiTaxtypeMasterForm.patchValue({ isoSuspenseCcid: aa })
  //   }

  //   this.jaiTaxtypeMasterForm.get('a1').reset(); 
  //   this.jaiTaxtypeMasterForm.get('a2').reset();
  //   this.jaiTaxtypeMasterForm.get('a3').reset();
  //   this.jaiTaxtypeMasterForm.get('a4').reset();
  //   this.jaiTaxtypeMasterForm.get('a5').reset();

  //   this.jaiTaxtypeMasterForm.get('lookupValueDesc1').reset();
  //   this.jaiTaxtypeMasterForm.get('lookupValueDesc2').reset();
  //   this.jaiTaxtypeMasterForm.get('lookupValueDesc3').reset();
  //   this.jaiTaxtypeMasterForm.get('lookupValueDesc4').reset();
  //   this.jaiTaxtypeMasterForm.get('lookupValueDesc5').reset();

  // }

  // fndinterimRecoveryCcidGlCode(a1, a2, a3, a4, a5) {
  //   const glcd1 = a1 + '.' + a2 + '.' + a3 + '.' + a4 + '.' + a5
  //   this.interimRecoveryCcid = glcd1;
  // }


  fndinterimRecoveryCcidGlCodeNew(content) {
    var i = this.iValue;
    var patch = this.jaiTaxtypeMasterForm.get('actLines') as FormArray;
    // alert('a1 '+ this.jaiTaxtypeMasterForm.get('a1').value);
    let aa = this.jaiTaxtypeMasterForm.get('a1').value + '.' + this.jaiTaxtypeMasterForm.get('a2').value + '.' +
      this.jaiTaxtypeMasterForm.get('a3').value + '.' + this.jaiTaxtypeMasterForm.get('a4').value + '.' +
      this.jaiTaxtypeMasterForm.get('a5').value;
    // alert('aa '+aa)
    if (content === 'INTERIM RECOVERY') {
      // this.jaiTaxtypeMasterForm.patchValue({ interimRecoveryCcid: aa })
      (patch.controls[i]).patchValue({ interimRecoveryCcid: aa })
    }
    if (content === 'RECOVERY') {
      // this.jaiTaxtypeMasterForm.patchValue({ recoveryCcid: aa })
      (patch.controls[i]).patchValue({ recoveryCcid: aa })
    }
    if (content === 'Interim Liability') {
      // this.jaiTaxtypeMasterForm.patchValue({ interimLiablilityCcid: aa })
      (patch.controls[i]).patchValue({ interimLiablilityCcid: aa })
    }
    if (content === 'Liability') {
      // this.jaiTaxtypeMasterForm.patchValue({ liablilityCcid: aa })
      (patch.controls[i]).patchValue({ liablilityCcid: aa })
    }
    if (content === 'Expense Account') {
      // this.jaiTaxtypeMasterForm.patchValue({ expenseCcid: aa })
      (patch.controls[i]).patchValue({ expenseCcid: aa })
    }
    if (content === 'Rounding Account') {
      // this.jaiTaxtypeMasterForm.patchValue({ roundingCcid: aa })
      (patch.controls[i]).patchValue({ roundingCcid: aa })
    }
    if (content === 'Suspense Account') {
      // this.jaiTaxtypeMasterForm.patchValue({ suspenseCcid: aa })
      (patch.controls[i]).patchValue({ suspenseCcid: aa })
    }
    if (content === 'Advance Suspense') {
      // this.jaiTaxtypeMasterForm.patchValue({ advRcptSuspenseCcid: aa })
      (patch.controls[i]).patchValue({ advRcptSuspenseCcid: aa })
    }
    if (content === 'ISO Suspense Account') {
      // this.jaiTaxtypeMasterForm.patchValue({ isoSuspenseCcid: aa })
      (patch.controls[i]).patchValue({ isoSuspenseCcid: aa })
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

  fndinterimRecoveryCcidGlCodeNew1(i) {
    // var i = this.iValue;
    // alert("index="+i);
    var patch = this.jaiTaxtypeMasterForm.get('actLines') as FormArray;
    // alert('a1 '+ this.jaiTaxtypeMasterForm.get('a1').value);
    let c1 = this.jaiTaxtypeMasterForm.get('a1').value + '.' + this.jaiTaxtypeMasterForm.get('a2').value + '.' +
      this.jaiTaxtypeMasterForm.get('a3').value + '.' + this.jaiTaxtypeMasterForm.get('b1').value + '.' +
      this.jaiTaxtypeMasterForm.get('a4').value;

    let c2 = this.jaiTaxtypeMasterForm.get('a1').value + '.' + this.jaiTaxtypeMasterForm.get('a2').value + '.' +
      this.jaiTaxtypeMasterForm.get('a3').value + '.' + this.jaiTaxtypeMasterForm.get('b2').value + '.' +
      this.jaiTaxtypeMasterForm.get('a4').value;

    let c3 = this.jaiTaxtypeMasterForm.get('a1').value + '.' + this.jaiTaxtypeMasterForm.get('a2').value + '.' +
      this.jaiTaxtypeMasterForm.get('a3').value + '.' + this.jaiTaxtypeMasterForm.get('b3').value + '.' +
      this.jaiTaxtypeMasterForm.get('a4').value;

    let c4 = this.jaiTaxtypeMasterForm.get('a1').value + '.' + this.jaiTaxtypeMasterForm.get('a2').value + '.' +
      this.jaiTaxtypeMasterForm.get('a3').value + '.' + this.jaiTaxtypeMasterForm.get('b4').value + '.' +
      this.jaiTaxtypeMasterForm.get('a4').value;

    let c5 = this.jaiTaxtypeMasterForm.get('a1').value + '.' + this.jaiTaxtypeMasterForm.get('a2').value + '.' +
      this.jaiTaxtypeMasterForm.get('a3').value + '.' + this.jaiTaxtypeMasterForm.get('b5').value + '.' +
      this.jaiTaxtypeMasterForm.get('a4').value;

    let c6 = this.jaiTaxtypeMasterForm.get('a1').value + '.' + this.jaiTaxtypeMasterForm.get('a2').value + '.' +
      this.jaiTaxtypeMasterForm.get('a3').value + '.' + this.jaiTaxtypeMasterForm.get('b6').value + '.' +
      this.jaiTaxtypeMasterForm.get('a4').value;

    let c7 = this.jaiTaxtypeMasterForm.get('a1').value + '.' + this.jaiTaxtypeMasterForm.get('a2').value + '.' +
      this.jaiTaxtypeMasterForm.get('a3').value + '.' + this.jaiTaxtypeMasterForm.get('b7').value + '.' +
      this.jaiTaxtypeMasterForm.get('a4').value;

    let c8 = this.jaiTaxtypeMasterForm.get('a1').value + '.' + this.jaiTaxtypeMasterForm.get('a2').value + '.' +
      this.jaiTaxtypeMasterForm.get('a3').value + '.' + this.jaiTaxtypeMasterForm.get('b8').value + '.' +
      this.jaiTaxtypeMasterForm.get('a4').value;

    let c9 = this.jaiTaxtypeMasterForm.get('a1').value + '.' + this.jaiTaxtypeMasterForm.get('a2').value + '.' +
      this.jaiTaxtypeMasterForm.get('a3').value + '.' + this.jaiTaxtypeMasterForm.get('b9').value + '.' +
      this.jaiTaxtypeMasterForm.get('a4').value;


    (patch.controls[i]).patchValue({ interimRecoveryCcid: c1 });
    (patch.controls[i]).patchValue({ recoveryCcid: c2 });
    (patch.controls[i]).patchValue({ interimLiablilityCcid: c3 });
    (patch.controls[i]).patchValue({ liablilityCcid: c4 });
    (patch.controls[i]).patchValue({ expenseCcid: c5 });
    (patch.controls[i]).patchValue({ roundingCcid: c6 });
    (patch.controls[i]).patchValue({ suspenseCcid: c7 });
    (patch.controls[i]).patchValue({ advRcptSuspenseCcid: c8 });
    (patch.controls[i]).patchValue({ isoSuspenseCcid: c9 });


  }

  resetModalData() {

    this.jaiTaxtypeMasterForm.get('a1').reset();
    this.jaiTaxtypeMasterForm.get('a2').reset();
    this.jaiTaxtypeMasterForm.get('a3').reset();
    this.jaiTaxtypeMasterForm.get('a4').reset();
    this.jaiTaxtypeMasterForm.get('lookupValueDesc1').reset();
    this.jaiTaxtypeMasterForm.get('lookupValueDesc2').reset();
    this.jaiTaxtypeMasterForm.get('lookupValueDesc3').reset();
    this.jaiTaxtypeMasterForm.get('lookupValueDesc4').reset();


    this.jaiTaxtypeMasterForm.get('b1').reset();
    this.jaiTaxtypeMasterForm.get('b2').reset();
    this.jaiTaxtypeMasterForm.get('b3').reset();
    this.jaiTaxtypeMasterForm.get('b4').reset();
    this.jaiTaxtypeMasterForm.get('b5').reset();
    this.jaiTaxtypeMasterForm.get('b6').reset();
    this.jaiTaxtypeMasterForm.get('b7').reset();
    this.jaiTaxtypeMasterForm.get('b8').reset();
    this.jaiTaxtypeMasterForm.get('b9').reset();
    this.jaiTaxtypeMasterForm.get('b1Desc').reset();
    this.jaiTaxtypeMasterForm.get('b2Desc').reset();
    this.jaiTaxtypeMasterForm.get('b3Desc').reset();
    this.jaiTaxtypeMasterForm.get('b4Desc').reset();
    this.jaiTaxtypeMasterForm.get('b5Desc').reset();
    this.jaiTaxtypeMasterForm.get('b6Desc').reset();
    this.jaiTaxtypeMasterForm.get('b7Desc').reset();
    this.jaiTaxtypeMasterForm.get('b8Desc').reset();
    this.jaiTaxtypeMasterForm.get('b9Desc').reset();
  }


  onOptionsSelectedStatus(event: any) {
    this.Status1 = this.jaiTaxtypeMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.jaiTaxtypeMasterForm.get('endDate').reset();
      this.displayInactive = true;
      this.startDate = new Date()
    }
  }

  onOuIdSelected(ouId: any, index) {
    // alert('ouId id =' +ouId + 'index ='+ index);
    if (ouId > 0) {
      this.showOrg = true;

      this.service.getLocationSearch1(ouId)
        .subscribe(
          data => {
            this.locIdList = data;
            console.log(this.locIdList);

          }
        );
    }
    else {
      this.showOrg = false;
    }

    if (ouId === '--Select--') {
      // alert('testing...')
      this.lineDetailsArray.controls[index].get('locId').reset();
    }
  }

  onLedgerSelected(ledgerId: any, index) {
    // alert('ledger id =' +ledgerId);
    if (ledgerId > 0) {
      this.showOu = true;
      this.showCodeButton = true;
    }
    else {
      this.showOu = false;
      this.showCodeButton = false;

    }

    if (ledgerId === '--Select--') {
      // alert('testing...')
      this.lineDetailsArray.controls[index].get('ouId').reset();
      this.lineDetailsArray.controls[index].get('locId').reset();
      this.showCodeButton = false;
      // this.lineDetailsArray.controls[index].get('locName').reset();
    }
    
  }


  onOpUnitSelected(opUnit, index) {
    // alert('ouId id =' +opUnit);
    if (opUnit > 0) {
      this.showOpUnit = true;
      this.service.getLocationSearch1(opUnit)
        .subscribe(
          data => {
            this.locIdList2 = data;
            console.log(this.locIdList2);


          }
        );
    }
    else {
      this.showOpUnit = false;
    }

    if (opUnit === '--Select--') {
      // alert('testing...')
      this.jaiTaxtypeMasterForm.get('locationId').reset()
    }
    var nam = 'ledgerId';
    console.log(this.lineDetailsArray.controls[index].get('ledgerId'));
    console.log (this.jaiTaxtypeMasterForm.get('actLines.controls[index].get(nam)'));
  }


  loadActDetails() {

    this.lineDetailsArray.clear();
    // var taxTypeCode = this.jaiTaxtypeMasterForm.get('taxTypeCode').value;
    var taxTypeId = this.jaiTaxtypeMasterForm.get('taxTypeId').value;
    alert('taxTypeId=' + taxTypeId);

    this.service.geActDetails(taxTypeId)
      .subscribe(
        data => {
          this.actDetails = data;
          console.log(this.actDetails);
          let cont = this.jaiTaxtypeMasterForm.get('actLines') as FormArray;
          var actLines: FormGroup = this.lineDetailsGroup();
          var length1 = this.actDetails.accountList.length - 1;
          alert(length1);

          this.lineDetailsArray.removeAt(length1);
          for (let i = 0; i <=length1; i++) {
            var actLines: FormGroup = this.lineDetailsGroup();

            cont.push(actLines);
          }
          alert(this.actDetails.accountList[0].ledgerName);
          this.jaiTaxtypeMasterForm.get('actLines').patchValue(this.actDetails.accountList)
          for (let i = 0; i <= length1; i++) {
            (cont.controls[i]).patchValue({ ledgerId: this.actDetails.accountList[i].ledgerName });
            //this.customerForm.controls.orders.setValue(this.filteredOrders[0]);
          }
          // this.jaiTaxtypeMasterForm.get('actLines').patchValue(this.actDetails.accountList);
       
        });
  
         

}


ontaxTypeCodeSelected(event: any) {
  var regimeCode = this.jaiTaxtypeMasterForm.get('regimeCode').value;
  // alert(regimeCode)
  if (event === 'Discount' && regimeCode == 3) { this.locationDissplay = true; }
  if (event === 'Select' && regimeCode == 3) { this.locationDissplay = false; }
}
// onOptionsSelected(event: any) {
//   this.Status1 = this.jaiTaxtypeMasterForm.get('status').value;
//   // alert(this.Status1);
//   if (this.Status1 === 'Inactive') {
//     this.displayInactive = false;
//     this.endDate = new Date();
//   }
//   else if (this.Status1 === 'Active') {
//     this.jaiTaxtypeMasterForm.get('endDate').reset();
//   }
// }




onOptionSelected(regimeId: any) {
  //  alert("Regime ID :" + regimeId);
  if (regimeId != undefined) {
    var temp = regimeId.split('-');
    this.service.regimNameList(temp[0])
      .subscribe(
        data => {
          this.regimNameList = data;
          console.log(this.regimNameList);
          this.jaiTaxtypeMasterForm.patchValue(this.regimNameList.regimeName);
          this.regimeName = this.regimNameList.regimeName;

        }
      );
  }
}


onLocationSelected(locCode: any, i) {
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
        // alert(this.locationNameList.locName);
        (patch.controls[i]).patchValue({ locName: this.locationNameList.locName })
      }
    );
  // this.addRow();
}

onLocationSelected1(locId: any, i) {
  // alert('LOCATION ID='+locId);
  this.service.locationNameList1(locId)
    .subscribe(
      data => {
        this.locationNameList1 = data;
        console.log(this.locationNameList1);
        var patch = this.jaiTaxtypeMasterForm.get('actLines') as FormArray;
        (patch.controls[i]).patchValue({ locName: this.locationNameList1.locName });
        (patch.controls[i]).patchValue({ locCode: this.locationNameList1.locCode });
      }
    );
  // alert ('Location id/Code/Name='+locId+'/'+this.locCode+'/'+this.locName);
}

onLookupSelected1(mlookupValue: any, mlookupType: string, mAccountType : string) {
  // alert('LookupValue: '+mlookupValue+ ' Type : '+mlookupType +" Account Type: "+mAccountType);
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
          if (this.lookupNameList.lookupType === "SS_Interbranch")
            this.lookupValueDesc4 = this.lookupNameList.lookupValueDesc;
          if (this.lookupNameList.lookupType === "NaturalAccount" && mAccountType === "INTERIM RECOVERY")
            this.b1Desc = this.lookupNameList.lookupValueDesc;
          if (this.lookupNameList.lookupType === "NaturalAccount" && mAccountType === "RECOVERY")
            this.b2Desc = this.lookupNameList.lookupValueDesc;
          if (this.lookupNameList.lookupType === "NaturalAccount" && mAccountType === "INTERIM LIABILITY")
            // alert("in INTERIM LIABILITY");
            this.b3Desc = this.lookupNameList.lookupValueDesc;
          if (this.lookupNameList.lookupType === "NaturalAccount" && mAccountType === "LIABILITY")
            this.b4Desc = this.lookupNameList.lookupValueDesc;
          if (this.lookupNameList.lookupType === "NaturalAccount" && mAccountType === "EXPENSE")
            this.b5Desc = this.lookupNameList.lookupValueDesc;
          if (this.lookupNameList.lookupType === "NaturalAccount" && mAccountType === "ROUNDING")
            this.b6Desc = this.lookupNameList.lookupValueDesc;
          if (this.lookupNameList.lookupType === "NaturalAccount" && mAccountType === "SUSPENSE")
            this.b7Desc = this.lookupNameList.lookupValueDesc;
          if (this.lookupNameList.lookupType === "NaturalAccount" && mAccountType === "ADVANCE")
            this.b8Desc = this.lookupNameList.lookupValueDesc;
          if (this.lookupNameList.lookupType === "NaturalAccount" && mAccountType === "ISO SUSPENSE")
            this.b9Desc = this.lookupNameList.lookupValueDesc;

        }
      }
    );

  // alert('LookupValue: '+mlookupValue+ ' Type : '+mlookupType + ' Desc ' +this.lookupValueDesc1);
}


openCodeComb(i, j)
{

  if (j.target.value != '') {
    // alert('i= '+i + '  j= '+j.target.value);
    var segment = j.target.value
    var temp = segment.split('.');
    this.a1 = temp[0];
    this.a2 = temp[1];
    this.a3 = temp[2];
    this.a4 = temp[3];
    this.a5 = temp[4];
  }

  this.showModal = true; // Show-Hide Modal Check
  this.content = i; // Dynamic Data
  this.title = i    // Dynamic Data

}


openCodeComb11(i, j, index)
{
  alert('i= ' + i + '  j= ' + j.target.value + " INDEX =" + index);
  this.iValue = index;
  if (j.target.value != '') {
    // alert('i= '+i + '  j= '+j.target.value +" INDEX =" +index);
    var segment = j.target.value
    var temp = segment.split('.');

    this.a1 = temp[0];
    this.a2 = temp[1];
    this.a3 = temp[2];
    this.a4 = temp[3];
    this.a5 = temp[4];
  }

  this.showModal = true; // Show-Hide Modal Check
  this.content = i; // Dynamic Data
  this.title = i    // Dynamic Data

}


openCodeComb1(i, interimRecoveryCcid) {
  // alert('in openCodeComb1 ' + i + 'interimRecoveryCcid ' + interimRecoveryCcid);
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
