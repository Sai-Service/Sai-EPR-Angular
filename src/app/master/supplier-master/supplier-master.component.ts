import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, PatternValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators} from '@angular/forms';
import { MasterService } from '../master.service';
import { Alert } from 'selenium-webdriver';


interface IsupplierMaster {
  suppId: number;
  suppNo: number;
  suppno:number;
  name: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  city: string;
  pinCode: string;
  state: string;
  mobile1: number;
  mobile2: number;
  emailId: string;
  contactPerson: string;
  contactNo: number;
  taxCategoryName: string;
  ticketNo: string;
  creditDays: number;
  creditLimit: number;
  remarks: string;
  gstNo: string;
  panNo: string;
  tanNo: string;
  ouId: string;
  souId:number;
  existing: string;
  ExeAddress: string;
  saddress1: string;
  saddress2: string;
  saddress3: string;
  saddress4: string;
  scity: string;
  pinCd: string;
  sstate: string;
  status:string;
  smobile1: string;
  smobile2: string;
  endDate: Date;
  sstatus: string;
  emplId:number;
  aadharNo:string;
  // ticketNo:string;
  Ename:string;
  type:string;
  divisionId:number;
  compId:number;
  locId:number;
  //displayMsmeNo:
  // aadharNo:string;
  spanNo:string;
  sGstNo:string;
  sprePayAcct:string;
  prePayAcct:string;
  sliabilityAcct:string;
  staxCatName:string
  siteName:string;
  acctsPayCodeCombId:number;
  prepayCodeCombId:number;
  sacctsPayCodeCombId:number;
  sprepayCodeCombId:number;
  displaysite:boolean;
  createDebitMemoFlag:string;
  semailId:string;
  screateDebitMemoFlag:string;
  supTdsTyp:string;
  supTds:string;
  sbankName:string;
   sacctNo:string;
   sifscCode:string;
   supName:string;
}



@Component({
  selector: 'app-supplier-master',
  templateUrl: './supplier-master.component.html',
  styleUrls: ['./supplier-master.component.css']
})
export class SupplierMasterComponent implements OnInit {

  supplierMasterForm: FormGroup;
  isDisabled=false;
  suppId: number;
  suppNo: number;
  suppno:number;
  name: string;
  submitted = false;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  city: string;
  pinCode: string;
  state: string;
  mobile1: number;
  mobile2: number;
  emailId: string;
  contactPerson: string;
  contactNo: number;
  taxCategoryName: string;
  ticketNo: string;
  creditDays: number;
  creditLimit: number;
  remarks: string;
  gstNo: string;
  panNo: string;
  tanNo: string;
  msmeYN='N';
  msmeNo: string
  displayMsmeNo = false;
  public status='Active';
  supplierSiteMasterList:any[];
  lstcomments: any;
  lstcomments2: any[];
  array: any[];
  lstcommentsId: any[];
  displayButton = true;
  ouId: string;
  souId:number;
  existing: string;
  ExeAddress: string;
  saddress1: string;
  saddress2: string;
  saddress3: string;
  saddress4: string;
  scity: string;
  pinCd: string;
  sstate: string;
  smobile1: string;
  smobile2: string;
  suppSiteId: number;
  endDate: Date;
  sstatus: string;
  displayInactive = true;
  displayTdsTyp=true;
  type:string;
  Status1: any;
  // aadharNo:string;
  ouIdSelected: number;
  emplId: number;
  public cityList: any[];
  public pinCodeList: Array<string>[];
  public stateList: Array<string>[];
  public taxCategoryList: Array<string>[];
  public ouIdList: any=[];
  public statusList: Array<string> = [];
  // public supplierSiteMasterList1 : Array<string>[][];
  public lstcommentsTax: any[];
  // public cityList: Array<string>[];
  public cityList1: any;
  public YesNoList: Array<string> = [];
  displayadditional:boolean=true;
  aadharNo:string;
  divisionId:number;
  compId:number;
  supplierTyp: any;
  displaySupplier:Boolean;
  displayEmployee :Boolean;
  // ticketNo:string;
  Ename:string;
  locId:number;
  displaySaveBtn: boolean=true;
  displayUpdBtn: boolean;
  spanNo:string;
  sGstNo:string;
  sprePayAcct:string;
  sacctsPayCodeCombId:number;
  sprepayCodeCombId:number;
  sliabilityAcct:string;
  staxCatName:string;
  siteName:string;
  public InterBrancList:Array<string>=[];
  public BranchList:Array<string>=[];
  public CostCenterList:Array<string>=[];
  public NaturalAccountList:any=[];
  public locIdList:Array<string>=[];
  segment11:string;
  lookupValueDesc1:string;
  segment2:number;
  lookupValueDesc2:string;
  segment3:number;
  trans:string;
  lookupValueDesc3:string;
  segment4:number;
  lookupValueDesc4:string;
  segment5:string;
  lookupValueDesc5:string;
  showModal:boolean;
  segmentNameList: any;
  branch:any;
  acctsPayCodeCombId:number;
  liabilityAcct:string;
  prePayAcct: string;
  prepayCodeCombId: number;
  displaysite:boolean=true;
  createDebitMemoFlag='N';
  currentOp: string;
  semailId:string;
  screateDebitMemoFlag:string;
  displayenable = true;
  supTdsTyp:string;
  getTdsType: any;
  supTds:string;
  sbankName:string;
   sacctNo:string;
   sifscCode:string;
  supNamedata: any;
  supName:string;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.supplierMasterForm = fb.group({
      suppId: [],
      suppno:[''],
      supName:[],
      suppNo: [''],
      name: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(150), Validators.pattern('[a-zA-Z,.& 0-9/-]*')]],
     address1: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(100),Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      address2: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(100),Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      address3: ['',[Validators.maxLength(50)]],
      address4: ['',[Validators.maxLength(50)]],
      city: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50),Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      contactNo: ['', [Validators.pattern('[0-9]*'), Validators.maxLength(10)]],
      mobile1: ['', [Validators.required]],
      mobile2: [''],
      contactPerson: ['',[Validators.pattern('[a-zA-Z /-]*')]],
      taxCategoryName: [''],
      creditDays: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      creditLimit: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      remarks: [''],
      emailId: ['', [Validators.email]],
      state: ['', [Validators.required]],
      // gstNo: ['', [Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[A-Z0-9]{1}$"),Validators.minLength(15), Validators.maxLength(15)]],
      gstNo:[],
      // panNo: ['', [Validators.required, Validators.pattern("^[A-Za-z]{5}[0-9]{4}[A-Za-z]$"), Validators.maxLength(10)]],
      panNo:[''],
      tanNo: [''],
      msmeYN: [],
      msmeNo: [],
      pinCode: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^[0-9]{6}$")]],
      status: ['', [Validators.nullValidator]],
      divisionId:[],
      compId:[],
      type:['', [Validators.required]],
      locId:[],
      ouId:[''],
      souId:[''],
      ExeAddress: [],
      saddress1: ['', [Validators.minLength(10),Validators.maxLength(100),Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      saddress2: ['', [Validators.minLength(3),Validators.maxLength(100),Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      saddress3: ['',[Validators.maxLength(50)]],
      saddress4: ['',[Validators.maxLength(50)]],
      scity:  ['', [Validators.minLength(3),Validators.maxLength(50),Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      pinCd: ['',[Validators.pattern('[0-9]*'),Validators.minLength(6),Validators.maxLength(6)]],
      sstate: [],
      smobile1: ['', [Validators.pattern('[0-9]*'), Validators.maxLength(10)]],
      smobile2: ['', [Validators.pattern('[0-9]*'), Validators.maxLength(10)]],
      suppSiteId: [],
      endDate: [],
      sstatus: [],
      emplId:[],
      aadharNo:[],
      address1E: ['', [Validators.minLength(10),Validators.maxLength(100),Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      address2E: ['', [Validators.minLength(10),Validators.maxLength(100),Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      address3E: ['',[Validators.maxLength(50)]],
      address4E:  ['',[Validators.maxLength(50)]],
      cityE: [],
      pinCodeE: ['',[Validators.pattern('[0-9]*'),Validators.minLength(10),Validators.maxLength(10)]],
      stateE: [],
      ticketNo:[],
      Ename:[],
      spanNo:[],
      sGstNo:[],
      sprePayAcct:[],
      sliabilityAcct:[],
      staxCatName:[],
      siteName:[],
      acctsPayCodeCombId:[],
      liabilityAcct:[],
      segment11:[],
  lookupValueDesc1:[],
  segment2:[],
  lookupValueDesc2:[],
  segment3:[],
  lookupValueDesc3:[],
  segment4:[],
  lookupValueDesc4:[],
  segment5:[],
  lookupValueDesc5:[], 
  prePayAcct: [],
  prepayCodeCombId: [],
  sacctsPayCodeCombId:[],
   sprepayCodeCombId:[],
   createDebitMemoFlag:[],
   semailId:[],
   screateDebitMemoFlag:[],
   supTdsTyp:[],
   supTds:['', [Validators.required]],
   sbankName:[],
   sacctNo:[],
   sifscCode:[],

    });
  }

  get f() { return this.supplierMasterForm.controls; }

  ngOnInit(): void {
    this.supplierMasterForm.patchValue({creditDays:'0',creditLimit:'0'});
    this.lstcomments= [];
    this.lstcomments.supplierSiteMasterList=[];
    this.emplId =Number(sessionStorage.getItem('emplId'));
    this.divisionId =Number(sessionStorage.getItem('divisionId'));
    this.locId=Number(sessionStorage.getItem('locId'));
    this.ouId=(sessionStorage.getItem('ouId'));
    this.compId =41;
    this.service.cityList()
      .subscribe(
        data => {
          this.cityList = data;
          console.log(this.cityList);
        }
      );
      this.service.supplierType().subscribe(
        data=>{
          this.supplierTyp=data;
        }
      )
      this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        }
      );

      this.service.YesNoList()
      .subscribe(
        data => {
          this.YesNoList = data;
          console.log(this.YesNoList);
        }
      );

    this.service.StateList()
      .subscribe(
        data => {
          this.stateList = data;
          console.log(this.stateList);
        }
      );

    this.service.OUIdListDiv( Number(sessionStorage.getItem('divisionId')))
      .subscribe(
        data => {
          this.ouIdList = data;
          console.log(this.ouIdList);
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
    this.service.NaturalAccountList1()
      .subscribe(
        data => {
          this.NaturalAccountList = data.obj;
          console.log(this.NaturalAccountList);
        }
      ); this.service.InterBrancList()
        .subscribe(
          data => {
            this.InterBrancList = data;
            console.log(this.InterBrancList);
          }
        );
        this.service.locationCodeList()
        .subscribe(
          data => {
            this.locIdList = data;
            console.log(this.locIdList);
          }
        );
  }

  supplierMaster(supplierMaster: any) {
  }
  currentAcctTyp:string;
  openCodeCombination(accountType:string)
  {
    // alert(accountType);
    let SegmentName1=this.supplierMasterForm.get(accountType).value;
    // alert(SegmentName1);
    this.currentAcctTyp=accountType;
    if(SegmentName1===null)
    {this.supplierMasterForm.get('segment11').reset();
    this.supplierMasterForm.get('segment2').reset();
    this.supplierMasterForm.get('segment3').reset();
    this.supplierMasterForm.get('segment4').reset();
    this.supplierMasterForm.get('segment5').reset();

    this.supplierMasterForm.get('lookupValueDesc1').reset();
    this.supplierMasterForm.get('lookupValueDesc2').reset();
    this.supplierMasterForm.get('lookupValueDesc3').reset();
    this.supplierMasterForm.get('lookupValueDesc4').reset();
    this.supplierMasterForm.get('lookupValueDesc5').reset();
  }
  if(SegmentName1!=null)
  {
    var temp = SegmentName1.split('.');
    // alert(temp[0]);
    this.segment11 = temp[0];
    this.segment2 = temp[1];
    this.segment3 = temp[2];
    this.segment4 = temp[3];
    this.segment5 = temp[4];
  }
    this.showModal = true;

  }
  fnCancatination()
  {

   var AcctCode=this.supplierMasterForm.get('segment11').value+'.'+
                     this.supplierMasterForm.get('segment2').value+'.'+
                     this.supplierMasterForm.get('segment3').value+'.'+
                     this.supplierMasterForm.get('segment4').value+'.'+
                     this.supplierMasterForm.get('segment5').value;

    // alert(AcctCode);

    this.service.segmentNameList(AcctCode)
    .subscribe(
      data => {

        this.segmentNameList = data.obj;
        // alert(this.currentAcctTyp+'type')
        if (data.code=== 200) {
          // this.AccountEnquiryForm.patchValue({codeCombinationId:this.segmentNameList.obj.codeCombinationId});
          if (data.obj.length == 0) {
            alert('Invalid Code Combination');
          } else {
            console.log(this.segmentNameList);

            if(this.currentAcctTyp==='liabilityAcct')
            {
              this.acctsPayCodeCombId = Number(this.segmentNameList.codeCombinationId);
              this.supplierMasterForm.patchValue({'acctsPayCodeCombId': Number(this.segmentNameList.codeCombinationId)});
              this.liabilityAcct=AcctCode;
            }
            if(this.currentAcctTyp==='sliabilityAcct')
            {
              this.sacctsPayCodeCombId = Number(this.segmentNameList.codeCombinationId);
              this.supplierMasterForm.patchValue({'sacctsPayCodeCombId': Number(this.segmentNameList.codeCombinationId)});
              this.sliabilityAcct=AcctCode;
            }
            if(this.currentAcctTyp==='prePayAcct')
            {
              this.prepayCodeCombId = Number(this.segmentNameList.codeCombinationId);
              // alert(this.segmentNameList.codeCombinationId);
              this.supplierMasterForm.patchValue({'prepayCodeCombId': Number(this.segmentNameList.codeCombinationId)});
              this.prePayAcct=AcctCode;
            }
            if(this.currentAcctTyp==='sprePayAcct')
            {
              this.sprepayCodeCombId = Number(this.segmentNameList.codeCombinationId);
              this.supplierMasterForm.patchValue({'sprePayAcct': Number(this.segmentNameList.codeCombinationId)});
              this.sprePayAcct=AcctCode;
            }
          }
        } else if (data.code=== 400) {
          alert(data.message);
          // this.supplierMasterForm.patchValue({liabilityAcct:''});
          if(this.currentAcctTyp==='liabilityAcct')
            {
              this.supplierMasterForm.patchValue({liabilityAcct:''});
            }
            if(this.currentAcctTyp==='sliabilityAcct')
            {
              this.supplierMasterForm.patchValue({sliabilityAcct:''});
            }
            if(this.currentAcctTyp==='prePayAcct')
            {
              this.supplierMasterForm.patchValue({prePayAcct:''});
            }
            if(this.currentAcctTyp==='sprePayAcct')
            {
              this.supplierMasterForm.patchValue({sprePayAcct:''});
            }
          // alert(this.segmentNameList.message);

        }
      }
    );
   this.supplierMasterForm.get('segment11').reset();
        this.supplierMasterForm.get('segment2').reset();
        this.supplierMasterForm.get('segment3').reset();
        this.supplierMasterForm.get('segment4').reset();
        this.supplierMasterForm.get('segment5').reset();

        this.supplierMasterForm.get('lookupValueDesc1').reset();
        this.supplierMasterForm.get('lookupValueDesc2').reset();
        this.supplierMasterForm.get('lookupValueDesc3').reset();
        this.supplierMasterForm.get('lookupValueDesc4').reset();
        this.supplierMasterForm.get('lookupValueDesc5').reset();
  }
  onOptionsSelectedBranch(segment: any, lType: string) {

    this.service.getInterBranch(segment, lType).subscribe(
      data => {
        this.branch = data;
        console.log(this.branch);
        if (this.branch != null) {
           if (lType === 'SS_Interbranch') {
            this.lookupValueDesc5 = this.branch.lookupValueDesc;
          }
          // if (lType === 'NaturalAccount') {
          //   this.lookupValueDesc4 = this.branch.lookupValueDesc;
          //   }
          if (lType === 'CostCentre') {
            this.lookupValueDesc3 = this.branch.lookupValueDesc;
          }
          if (lType === 'SS_Location') {
            this.lookupValueDesc2 = this.branch.lookupValueDesc;
          }
          if (lType === 'SS_Branch') {
            this.lookupValueDesc1 = this.branch.lookupValueDesc;
          }
        }

      }
    );

      var natdesc= this.NaturalAccountList.find(d => d.naturalaccount === segment);
      if(natdesc!=undefined){
      this.lookupValueDesc4=natdesc.description;
      }
      }


  onOptionsupTypeSelected(event: any) {
    // alert(this.PersonType+'Type');
    if(this.type!=undefined){
    if(event!=this.type){
       window.location.reload();
    }}

    this.type = this.supplierMasterForm.get('type').value;

    if (event === 'Employee') {
      // alert('Hi')
      this.displaySupplier = false;
      this.displayEmployee = true;
      } if (event === 'Supplier') {
      this.displaySupplier=true;
      this.displayEmployee=false;
   }
  }

  transData(val) {
    delete val.suppSiteId;
    delete val.existing;
    delete val.ExeAddress;
    delete val.saddress1;
    delete val.saddress2;
    delete val.saddress3;
    delete val.saddress4;
    delete val.scity;
    delete val.pinCd;
    delete val.sstate;
    delete val.smobile1;
    delete val.smobile2;
    delete val.aadharNo;
    return val;
  }
  transDataforS(val) {
    // delete val.suppId;
    delete val.suppNo;
    delete val.name;
    delete val.address1;
    delete val.address2;
    delete val.address3;
    delete val.address4;
    delete val.city;
    delete val.pinCode;
    delete val.state;
    delete val.mobile1;
    delete val.mobile2;
    delete val.ticketNo;
    delete val.creditDays;
    delete val.creditLimit;
    delete val.remarks;
    delete val.existing;
    // delete val.ExeAddress;
    delete val.existing;
    delete val.ExeAddress;
    delete val.status;
    return val;
  }

  newsupplierMast() {
    this.submitted = true;
    if(this.supplierMasterForm.invalid){
    alert('Field Validation Error (D)');
      return;
    }
    var isvaliddata = this.validation();
    if (isvaliddata === false) {
      // alert('In Validation (v)');
      return;
    }


    // const formValue: IsupplierMaster = this.transData(this.supplierMasterForm.value);
    const formValue:IsupplierMaster=this.supplierMasterForm.value;
    formValue.compId=41;
    formValue.siteName=this.supplierMasterForm.get('city').value+'-'+this.supplierMasterForm.get('state').value;
    formValue.ouId=(sessionStorage.getItem('ouId'));
    formValue.divisionId=Number(sessionStorage.getItem('divisionId'));
    if(formValue.gstNo===''){
      formValue.gstNo='GSTUNREGISTERED';
    }
    formValue.name=(this.supplierMasterForm.get('name').value).toUpperCase();
    formValue.address1=(this.supplierMasterForm.get('address1').value).toUpperCase();
    formValue.address2=(this.supplierMasterForm.get('address2').value).toUpperCase();
    // formValue.address3=(this.supplierMasterForm.get('address3').value).toUpperCase();
    // formValue.address4=(this.supplierMasterForm.get('address4').value).toUpperCase();
    this.service.SupliMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFULLY');
        this.suppNo=res.obj.suppNo;
        this.searchBySuppCode(this.suppNo);
        this.displayadditional=false;
        this.displaySaveBtn=false;
        // this.supplierMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert('Supplier Master Details Validation Error. Please Enter Validate Data !!!');
          // this.supplierMasterForm.reset();
        }
      }
    });
  }
  UpdateSitesupplierMastExeSite() {
    const formValue: IsupplierMaster = this.transDataforS(this.supplierMasterForm.value);
    this.service.UpdateSiteSupliMasterById(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFULLY');
        // window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          // this.supplierMasterForm.reset();
        }
      }
    });
  }
  transDataSupp(val) {
    delete val.suppSiteId;
    delete val.existing;
    delete val.ExeAddress;
    delete val.saddress1;
    delete val.saddress2;
    delete val.saddress3;
    delete val.saddress4;
    delete val.scity;
    delete val.pinCd;
    delete val.sstate;
    delete val.smobile1;
    delete val.smobile2;
    // delete val.aadharNo;
    // delete val.remarks;
    delete val.existing;
    delete val.ExeAddress;
    delete val.existing;
    delete val.ExeAddress;
    delete val.contactNo;
    delete val.tanNo;
    delete val.gstNo;
    delete val.panNo;
    delete val.emailId;
    // delete val.endDate;
    return val;
  }
  updatesupplierMast() {
    // var isvaliddata = this.validation();
    // if (isvaliddata === false) {
    //   // alert('In Validation (v)');
    //   return;
    // }

    // this.submitted = true;
    // if (this.supplierMasterForm.invalid) {
    //   // alert('In Validation(d) ');
    //   return;
    // }
    const formValue: IsupplierMaster = this.transDataSupp(this.supplierMasterForm.value);
    this.service.UpdateSupliMasterById(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFULLY');
        // window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.supplierMasterForm.reset();
        }
      }
    });
  };

  gstVerification(event: any) {
    
    var gstno = this.supplierMasterForm.get('gstNo').value
    // alert(gstno+'gst');
    // var sGstnoVal = this.customerMasterForm.get('sGstNo').value
    if(gstno===''){
      this.supplierMasterForm.patchValue({'gstNo':'GSTUNREGISTERED'});
      return;
    }
    else{
    // var regex: string = "{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}";
    var regex:string="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[A-Z0-9]{1}";
       var p = new PatternValidator();
       var patt = new RegExp('[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[A-Z0-9]{1}');
      //  alert(gstno.length+'gstno.length');
      var validgst = patt.test(gstno);
      if (validgst === false  && gstno.length==15) {
        alert('Please enter valid GST Number');
      }

    else{
      // alert('Please enter valid GST Number');
      return false;
    }
    // return validgst;
    
    const gstNo1 = gstno.substr(2, 10);
    // this.panNo = gstNo1;
    alert('Gst verificaition'+ gstNo1);
    this.supplierMasterForm.patchValue({panNo:gstNo1});
    var res = gstno.substr(0, 2);
    console.log(res);
    // alert(res+'res');
    const state = (this.supplierMasterForm.get('state').value).toUpperCase();
    console.log(state);
    console.log(this.state === 'MAHARASHTRA' && res === 27);
    switch (state) {
      case 'MAHARASHTRA':
        if (res != 27) {
          alert('Kindly entered correct GST No Start with 27');
          this.supplierMasterForm.get('gstNo').reset();
        }
        break;
      case 'GOA':
        if (res != 30) {
          alert('Kindly entered correct GST No Start with 30');
          this.supplierMasterForm.get('gstNo').reset();
        }
        break;
      case 'ANDHRA PRADESH':
        if (res != 28) {
          alert('Kindly entered correct GST No Start with 28');
          this.supplierMasterForm.get('gstNo').reset();
        }
        break;
      case 'KARNATAKA':
        if (res != 29) {
          alert('Kindly entered correct GST No Start with 29');
          this.supplierMasterForm.get('gstNo').reset();
        }
        break;
      case 'KERALA':
        if (res != 32) {
          alert('Kindly entered correct GST No Start with 32');
          this.supplierMasterForm.get('gstNo').reset();
        }
        break;
      case 'TELANGANA':
        if (res != 36) {
          alert('Kindly entered correct GST No Start with 36');
          this.supplierMasterForm.get('gstNo').reset();
        }
        break;
    }

  }

  }

  gstVerification1(event: any) {
    var gstno = this.supplierMasterForm.get('sGstNo').value
    // var sGstnoVal = this.customerMasterForm.get('sGstNo').value
    if(gstno===''){
      this.supplierMasterForm.patchValue({'sGstNo':'GSTUNREGISTERED'});
      return;
    }
    else{
    // var regex: string = "{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}";
    var regex:string="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[A-Z0-9]{1}";
       var p = new PatternValidator();
       var patt = new RegExp('[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[A-Z0-9]{1}');
      //  alert(gstno.length+'gstno.length');
      var validgst = patt.test(gstno);
      if (validgst === false  && gstno.length==15) {
        alert('Please enter valid GST Number');
      }

    else{
      // alert('Please enter valid GST Number');
      return false;
    }
    // return validgst;
    
    const gstNo1 = gstno.substr(2, 10);
    // this.panNo = gstNo1;
    // alert('Gst verificaition'+ gstNo1);
    this.supplierMasterForm.patchValue({'spanNo':gstNo1});
    var res = gstno.substr(0, 2);
    console.log(res);
    // alert(res+'res');
    const state = (this.supplierMasterForm.get('sstate').value).toUpperCase();
    console.log(state);
    console.log(this.state === 'MAHARASHTRA' && res === 27);
    switch (state) {
      case 'MAHARASHTRA':
        if (res != 27) {
          alert('Kindly entered correct GST No Start with 27');
          this.supplierMasterForm.get('sGstNo').reset();
        }
        break;
      case 'GOA':
        if (res != 30) {
          alert('Kindly entered correct GST No Start with 30');
          this.supplierMasterForm.get('sGstNo').reset();
        }
        break;
      case 'ANDHRA PRADESH':
        if (res != 28) {
          alert('Kindly entered correct GST No Start with 28');
          this.supplierMasterForm.get('sGstNo').reset();
        }
        break;
      case 'KARNATAKA':
        if (res != 29) {
          alert('Kindly entered correct GST No Start with 29');
          this.supplierMasterForm.get('sGstNo').reset();
        }
        break;
      case 'KERALA':
        if (res != 32) {
          alert('Kindly entered correct GST No Start with 32');
          this.supplierMasterForm.get('sGstNo').reset();
        }
        break;
      case 'TELANGANA':
        if (res != 36) {
          alert('Kindly entered correct GST No Start with 36');
          this.supplierMasterForm.get('sGstNo').reset();
        }
        break;
    }

  }

  }

  resetsupplierMast() {
    window.location.reload();
  }

  closesupplierMast() {
    this.router.navigate(['admin']);
  }

  createSitesupplierMast() {
    const formValue: IsupplierMaster = this.transDataforS(this.supplierMasterForm.value);
    this.service.SupliMasterSubmitForSite(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        this.isDisabled=true;
        alert(res.message);
        this.displayadditional=false;
        var acctNo=this.supplierMasterForm.get('suppNo').value;
        this.searchBySuppCode(acctNo);
        // this.supplierMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert(res.message);
          this.isDisabled=false;
          // this.supplierMasterForm.reset();s
        }
      }
    });
  }

  Select(suppSiteId: number) {
    this.displaysite=false;
// alert(suppSiteId);
    this.lstcomments2 = this.lstcomments.supplierSiteMasterList;
    console.log(this.lstcomments2);
    let select = this.lstcomments2.find(d => d.suppSiteId === suppSiteId);
    let ouName=this.ouIdList.find(d=>d.ouId===select.ouId);
    // let select = this.lstcomments.find(d => d.suppSiteId === suppSiteId);
    if (select) {
      this.suppSiteId = select.suppSiteId
      this.saddress1 = select.address1
      this.saddress2 = select.address2
      this.saddress3 = select.address3
      this.saddress4 = select.address4
      this.scity = select.city
      this.pinCd = select.pinCd
      // this.sstate = select.state
      this.contactNo = select.contactNo
      this.contactPerson = select.contactPerson
      this.emailId = select.emailId
      this.gstNo = select.gstNo
      this.smobile1 = select.mobile1
      this.smobile2 = select.mobile2
      // this.spanNo=select.panNo
      this.taxCategoryName = select.taxCategoryDesc
      this.supplierMasterForm.patchValue({sGstNo:select.gstNo,
                                          spanNo:select.panNo,
                                          sstate:select.state1,
                                          staxCatName:select.taxCategoryName,
                                          sstatus:select.status,
                                          souId:select.ouId,
                                          siteName:select.siteName,
                                          sliabilityAcct:select.attribute2,
                                          sprePayAcct:select.attribute1,
                                          screateDebitMemoFlag:select.createDebitMemoFlag});
      // ticketNo not in  json

      // this.displayButton = false;
      // this.displaysite=true;
      // this
    }
  }
  ExeAddressEvent(e) {
    if (e.target.checked) {
      this.supplierMasterForm.get('siteName').reset();
      this.supplierMasterForm.get('souId').reset();
      this.supplierMasterForm.get('sliabilityAcct').reset();
      this.supplierMasterForm.get('sprePayAcct').reset();
      this.saddress1 = this.supplierMasterForm.get('address1').value;
      this.saddress2 = this.address2
      this.saddress3 = this.address3
      // this.saddress4 = this.address4
      this.scity = this.supplierMasterForm.get('city').value;
      this.pinCd = this.supplierMasterForm.get('pinCode').value;
      this.sstate = this.state
      this.supplierMasterForm.patchValue({smobile1:this.supplierMasterForm.get('mobile1').value});
      this.supplierMasterForm.patchValue({semailId:this.supplierMasterForm.get('emailId').value});
      this.supplierMasterForm.patchValue({spanNo:this.supplierMasterForm.get('panNo').value});
      this.supplierMasterForm.patchValue({sGstNo:this.supplierMasterForm.get('gstNo').value});
      this.displaysite=true;
    }
    else {
      this.saddress1 = null;
      this.saddress2 = null;
      this.saddress3 = null;
      this.saddress4 = null;
      this.scity = null;
      this.pinCd = null;
      this.sstate = null;
    }
  }

  searchsupplierMast() {
    this.service.getsupplierMastSearch()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
  }

  onOptionTdsSelect(event:any){
alert(event);

if(event==='Yes')
{
  this.displayTdsTyp=false;
  this.service.getTdsType()
    .subscribe(data => {
      this.getTdsType = data;
    }
      );

}
else{
  this.displayTdsTyp=true;
}
  }

  searchBySuppCode(suppno) {
    this.currentOp = 'SEARCH';
    if(suppno!=undefined){
    this.service.getsearchBySuppCode(suppno)
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments.supplierSiteMasterList);
          this.supplierMasterForm.patchValue(this.lstcomments);
          this.displayenable = false;
          this.supplierMasterForm.get('type').disable();
          this.supplierMasterForm.patchValue({
            panNo:this.lstcomments.supplierSiteMasterList[0].panNo,
            gstNo:this.lstcomments.supplierSiteMasterList[0].gstNo,
            prePayAcct:this.lstcomments.supplierSiteMasterList[0].attribute1,
            liabilityAcct:this.lstcomments.supplierSiteMasterList[0].attribute2,
            taxCategoryName:this.lstcomments.supplierSiteMasterList[0].taxCategoryName,
            createDebitMemoFlag:this.lstcomments.supplierSiteMasterList[0].createDebitMemoFlag,
            contactPerson:this.lstcomments.supplierSiteMasterList[0].contactPerson,
            contactNo:this.lstcomments.supplierSiteMasterList[0].contactNo});

            // contactPerson:this.lstcomments.customerSiteMasterList[0].contactPerson,
            // contactNo:this.lstcomments.customerSiteMasterList[0].contactNo});

          // });
          this.city = this.lstcomments.city
          this.displayInactive = true;
          // (document.getElementById("saveBtn") as HTMLInputElement).disabled = true;
          this.displaySaveBtn=false;
          this.displayUpdBtn=true;
          this.displayadditional=false;
          this.supplierMasterForm.get('gstNo').disable();
          this.supplierMasterForm.get('panNo').disable();
          this.supplierMasterForm.get('tanNo').disable();
          this.supplierMasterForm.get('liabilityAcct').disable();
          this.supplierMasterForm.get('prePayAcct').disable();
          this.supplierMasterForm.get('prePayAcct').disable();
          this.currentOp = 'INSERT';
          // for(let x=0; x <this.lstcomments.supplierSiteMasterList.length; x++){
          //   var ouObj =  this.ouIdList.find(d => d.ouId=== this.lstcomments.supplierSiteMasterList[x].ouId);
          //   if(ouObj != undefined){

          //   this.lstcomments.supplierSiteMasterList[x].ouId = ouObj.ouName;
          // }
          // }
        }
      );
  }}
  searchBySuppId(suppId) {
    if(suppId!=undefined){ 
    this.service.getsearchBySuppCode(suppId)
      .subscribe(
        data => {
          this.lstcommentsId = data;
          console.log(this.lstcommentsId);
          this.supplierMasterForm.patchValue(this.lstcommentsId);
        }
      );}
  }
  onOuIdSelected(souId: any) {
    console.log(souId);
    // if(ouId!=undefined){
      var siteState=this.supplierMasterForm.get('sstate').value;
      // alert(siteState+'state');
      if(souId!=undefined && siteState!=undefined){
        // alert(' if');
      this.service.taxCategorySiteList1(souId,siteState)
  .subscribe(
    data => {
      // this.taxCategoryNameList = data;
      this.staxCatName=data.taxCategoryName;
      this.supplierMasterForm.patchValue({staxCatName:data.taxCategoryName});
      // console.log(this.taxCategoryNameList);

    }
  );}
    // this.SearchTaxCat(ouId);

  }
  SearchTaxCat(ouId) {
     // alert(ouId);
    if (ouId > 0 ) {
    this.service.getTaxCat(ouId)
      .subscribe(
        data => {
          this.taxCategoryList = data;
          console.log(this.taxCategoryList);
          // this.allFunction(locId);
        }
      );
    }
  }
  onOptionsSelected(event: any) {
    this.Status1 = this.supplierMasterForm.get('sstatus').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.supplierMasterForm.get('endDate').reset();
      this.displayInactive = true;
    }
  }
  onOptionsSelectedSupp(event: any) {

    this.Status1 = this.supplierMasterForm.get('status').value;

    if (this.Status1 === 'Inactive') {

      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.supplierMasterForm.get('endDate').reset();
      this.displayInactive = true;
    }
  }

  onOptionStateSeleted(event: any){
    // alert(city);
    if (this.currentOp === 'SEARCH') {
      return;
    }
      if(this.ouId!=undefined && event!=undefined ){
         this.service.taxCategorySiteList1(this.ouId,event)
        .subscribe(
          data => {
            // this.taxCategoryNameList = data;
            this.taxCategoryName=data.taxCategoryName;
            // console.log(this.taxCategoryNameList);

          }
        );}
      // }
    // );
  }

  onOptionSiteStateSeleted(event:any)
  {
    // alert(event+'--'+this.supplierMasterForm.get('souId').value);
    if (this.currentOp === 'SEARCH') {
      return;
    }
    if(this.supplierMasterForm.get('souId').value!=undefined && event!=undefined ){
         this.service.taxCategorySiteList1(this.supplierMasterForm.get('souId').value,event)
        .subscribe(
          data => {
            // this.taxCategoryNameList = data;
            this.staxCatName=data.taxCategoryName;
            this.supplierMasterForm.patchValue({staxCatName:data.taxCategoryName})
            // console.log(this.taxCategoryNameList);

          }
        );
        }
  }
  onKey(event: any) {
    const gstNo1 = this.gstNo.substr(3,10);
    this.panNo = gstNo1;
  }


    onOptionsSelectedCity1(event:any){
        // alert(city);
        // this.service.cityList1(city)
        // .subscribe(
        //   data => {
        //     this.cityList1 = data;
        //     console.log(this.cityList1);
        //     // this.state=this.cityList1.attribute1;
        //     this.sstate=this.cityList1.attribute1;
            let select1 = this.cityList.find(d => d.codeDesc=== event);

            this.supplierMasterForm.patchValue({sstate:select1.attribute1});
            // console.log(this.cityList1.attribute1);
            // this.country = 'INDIA';
            var ouId=this.supplierMasterForm.get('souId').value;
            if(ouId!=undefined && this.supplierMasterForm.get('sstate').value!=undefined){
            this.service.taxCategorySiteList1(ouId,this.supplierMasterForm.get('sstate').value)
        .subscribe(
          data => {
            // this.taxCategoryNameList = data;
            // this.staxCatName=data.taxCategoryName;
            this.supplierMasterForm.patchValue({staxCatName:data.taxCategoryName});
            // console.log(this.taxCategoryNameList);

          }
        );}
          // });
      }
      onOptionGstno(event:any,tanNo)
      {
        // alert(event);
        var gstno=event.target.value;
        // alert(gstno);
        if(gstno.length==15 && gstno!='GSTUNREGISTERED')
        {

          const gstNo1 = gstno.substr(2,10);
          this.panNo = gstNo1;
          tanNo.focus();
        }
        else
        {
          // this.gstNo='GSTUNREGISTERED';
          if(gstno.length==0 ) {
          this.supplierMasterForm.patchValue({'gstNo':'GSTUNREGISTERED'});
        }
         // panNo.focus();
        }
        return;

      }
      searchByConName(supName){
        this.service.supplierName(supName)
        .subscribe(
          data => {
            this.supNamedata=data.obj;
          });
      }

      onMSMESelected(msmeYN : any){
        // alert(msmeYN);
          if (msmeYN === 'Y') {
            this.displayMsmeNo = true;
          }
          else {
            this.displayMsmeNo = false;
          }
        }


         message: string = "Please Fix the Errors !";
          msgType:string ="Close";
          getMessage(msgType: string) {
            this.msgType = msgType;
            if (msgType.includes("Save")) {
        //       this.submitted = true;
              (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
        //       if (this.supplierMasterForm.invalid) {

        //         //this.submitted = false;

        //         (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '');
        //         return;
        //       }
              this.message = "Do you want to SAVE the changes(Yes/No)?"

            }

            if (msgType.includes("Reset")) {
              this.message = "Do you want to Reset the changes(Yes/No)?"
            }

            if (msgType.includes("Close")) {
              this.message = "Do you want to Close the Form(Yes/No)?"
            }
            return;
          }

         executeAction() {
            if(this.msgType.includes("Save")) {

              this.newsupplierMast();
            }

            if (this.msgType.includes("Reset")) {
              this.resetsupplierMast();
        //       this.itemMasterForm.reset();
            }

            if (this.msgType.includes("Close")) {
              // this.closeItemCatMast();
              this.router.navigate(['admin']);
            }
            return;
          }

        public validation(): boolean {
          var validdata: boolean;
            const formValue:IsupplierMaster = this.supplierMasterForm.value;
            if (formValue.type === 'Supplier') {
            if (formValue.contactPerson === undefined) {
              alert('Please enter Contact  Person Name');
              validdata = false;
            }
            if (formValue.contactNo === undefined) {
              alert('Please enter Contact  No');
              validdata = false;

            }
            return validdata;
          }
          if (formValue.panNo != '') {

            var regex: string = "[A-Z]{5}[0-9]{4}[A-Z]{1}";
            var p = new PatternValidator();
            var patt = new RegExp('[A-Z]{5}[0-9]{4}[A-Z]{1}');
            validdata = patt.test(formValue.panNo);
            if (validdata === false) {
              alert('Please enter valid PAN Number');
            }
            return validdata;

          }else{
            alert('Please enter valid PAN Number');
            return false;
          }
        }
        }
