import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from '../master.service';
import { Location } from "@angular/common";
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { data } from 'jquery';

interface IcustomerMaster {
  custType: string;
  customerId: number;
  title: string;
  customerId1: number;
  customerAcc1: number;
  fName: string;
  mName: string;
  lName: string;
  custName: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  city: string;
  pinCd: number;
  state: string;
  mobile1: string;
  mobile2: string;
  mobile3: string;
  emailId: string;
  emailId1: string;
  contactPerson: string;
  contactNo: number;
  birthDate: Date;
  weddingDate: Date;
  startDate: Date;
  endDate: Date;
  gstNo: string;
  panNo: string;
  tanNo: string;
  staxCatName: string;
  stanNo: string;
  spanNo: string;
  sGstNo: string;
  souId: number;
  souName: string;
  status: string;
  classCodeType: string;
  ouId: string;
  locId: string;
  taxCategoryName: string;
  location: string;
  saddress1: string;
  saddress2: string;
  saddress3: string;
  scity: string;
  spinCd: string;
  sstate: string;
  smobile1: string;
  smobile2: number;
  smobile3: number;
  semailId: string;
  semailId1: string;
  sstartDate: Date;
  sendDate: Date;
  sstatus: string;
  custAccountNo: number;
  divisionName: string;
  paymentType: string;
  slocation: string;
  emplId: number;
  customerSiteId: number;
  creditAmt: number;
  highAmt: number;
  disPer: number;
  tdsPer:number;
  screditAmt: number;
  shighAmt: number;
  sdisPer: number;
  termId: number;
  dealerCode: string;
  dealerType: string;
  siteName: string;
  tcsYN: string;
  tcsPer:number;
  aadharNo: number;
  tdsApplDate:Date;
  staxCategoryName:string;
}

@Component({
  selector: 'app-customer-master',
  templateUrl: './customer-master.component.html',
  styleUrls: ['./customer-master.component.css']
})

export class CustomerMasterComponent implements OnInit {
  customerMasterForm: FormGroup;
  emplId: number;
  submitted = false;
  customerId: number;
  custType: string;
  PersonType: any;
  taxCategoryName: string;
  displayPerson: boolean;
  displayOrgnization: boolean;
  title: string;
  customerId1: number;
  customerAcc1: number;
  fName: string;
  mName: string;
  lName: string;
  custName: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  city: string;
  pinCd: number;
  state: string;
  mobile1: string;
  mobile2: string;
  mobile3: string;
  emailId: string;
  emailId1: string;
  contactPerson: string;
  contactNo: number;

  classCodeType: string;
  gstNo: string;
  panNo: string;
  tanNo: string;
  ouId: string;
  locId: string;
  staxCatName: string;
  stanNo: string;
  spanNo: string;
  sGstNo: string;
  souId: number;
  souName: string;
  location: string;
  saddress1: string;
  saddress2: string;
  saddress3: string;
  scity: string;
  spinCd: string;
  sstate: string;
  smobile1: string;
  smobile2: string;
  smobile3: string;
  semailId: string;
  semailId1: string;
  sstartDate: Date;
  sendDate: Date;
  public sstatus = "Active";
  slocation: string;
  custAccountNo: number;
  ExeAddress: string;
  divisionName: string;
  name: string;
  public status = "Active";
  displayInactive = true;
  displaystatus = true;
  displayNewButton = true;
  displayNewButton1 = true;
  displayNewButtonWithSite = false;
  Status1: any;
  lstcomments: any;
  searchByAccount: any;
  displayButton = true;
  birthDate: Date;
  weddingDate: Date;
  startDate: Date = new Date();
  endDate: Date
  public minDate = new Date();
  public minDateBirth = new Date().setFullYear(new Date().getFullYear() - 18);
  public minDateWedding = new Date().getFullYear();
  public cityList1: any = [];

  public custTypeList: Array<string>[];
  public titleList: any = [];
  public cityList: Array<string>[];
  public taxCategoryNameList: Array<string>[];
  public pinCdList: Array<string>[];
  public stateList: Array<string>[];
  public ouIdList: Array<string>[];
  public classCodeTypeList: Array<string>[];
  public taxCategoryList: Array<string>[];
  public statusList: any = [];
  loginName: string;
  ouName: string;
  public maxDate = new Date();
  // public maxDate = new Date();
  // ouId:number;

  loginArray: string;
  divId: number;
  lstcomments2: any[];

  public payTermDescList: any;
  paymentType: string;
  taxCategoryList1: any;
  customerSiteId: number;
  creditAmt: number;
  highAmt: number;
  screditAmt: number;
  shighAmt: number;
  disPer: number;
  tdsPer:number;
  sdisPer: number;
  displayadditional = true;
  termId: number;
  dealerCode: string;
  dealerType: string;
  dispDealer = false;
  siteName: string;

  pipe = new DatePipe('en-US');
  accountNoSearchdata: any;
  displaytanaadhar: boolean;
  displayenable = true;
  tcsYN: string;
  aadharNo: number;
  limitData: any;
  // startDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  customerNameSearch: any[];
  tdsPercentage: any;
  tdsApplDate:Date;
  staxCategoryName:string;
  tcsPer:number;

  constructor(private fb: FormBuilder, private router: Router,private orderManagementService: OrderManagementService, private location1: Location, private service: MasterService) {
    this.customerMasterForm = fb.group({
      customerId1: [''],
      emplId: [''],
      customerAcc1: [''],
      title: [''],
      custType: ['', Validators.required],
      classCodeType: ['', Validators.required],
      paymentType: ['', Validators.required],
      // fName: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*'),Validators.minLength(1)]],
      fName: ['', [Validators.pattern('[a-zA-Z ]*'), Validators.minLength(1), Validators.maxLength(50)]],
      mName: ['', [Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
      // lName: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*'),Validators.minLength(1)]],
      lName: ['', [Validators.pattern('[a-zA-Z ]*'), Validators.minLength(1), Validators.maxLength(50)]],
      custName: ['', [Validators.required, Validators.maxLength(150)]],
      address1: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100), Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      // address2: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(100),Validators.pattern('[a-zA-Z 0-9/-]*')]],
      address2: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      address3: ['', [Validators.maxLength(100)]],
      address4: ['', [Validators.maxLength(100)]],
      location: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      taxCategoryName: ['', Validators.required],
      pinCd: ['', [Validators.required, Validators.minLength(6), Validators.maxLength, Validators.pattern("^[0-9]{6}$")]],
      state: ['', Validators.required],
      mobile1: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]],
      mobile2: ['', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      mobile3: ['', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      // emailId: ['', [Validators.required, Validators.email,Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      emailId: ['', [Validators.required, Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      emailId1: ['', [Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      // contactPerson: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      contactPerson: ['', [Validators.pattern('^[a-z A-Z ]*')]],
      contactNo: [''],
      // contactNo: ['', [Validators.pattern('[0-9]*'), Validators.minLength(10),Validators.maxLength(10)]],
      birthDate: [''],
      weddingDate: [''],
      startDate: [''],
      endDate: [''],
      gstNo: ['', [Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[A-Z0-9]{1}$"), Validators.minLength(15), Validators.maxLength(15)]],
      // gstNo:['', [Validators.required, Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{2}$"), Validators.maxLength(15)]],
      panNo: ['', [Validators.required, Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]{1}$"), Validators.minLength(10), Validators.maxLength(10)]],
      tanNo: [''],
      status: [''],
      // classCodeType: [''],
      ouId: [''],
      locId: [''],
      saddress1: ['', [Validators.minLength(10), Validators.maxLength(100), Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      saddress2: ['', [Validators.minLength(3), Validators.maxLength(100), Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      saddress3: ['', [Validators.maxLength(100)]],
      scity: ['', [Validators.minLength(3), Validators.maxLength(50), Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      spinCd: ['', [Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[0-9]*')]],
      sstate: [''],
      smobile1: ['', [, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]],
      smobile2: ['', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      smobile3: ['', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      semailId: ['', [Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      semailId1: ['', [Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      sstartDate: [''],
      sendDate: [''],
      sstatus: [''],
      //derina - customerSiteId
      customerSiteId: [''],
      // custAccountNo:['', [Validators.required,Validators.pattern('[0-9]*')]],
      custAccountNo: [''],
      ExeAddress: [],
      customerId: [],
      divisionName: [],
      ouName: [],
      loginArray: [],
      divId: [],
      staxCatName: [],
      stanNo: [],
      spanNo: ['', [Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]{1}$"), Validators.minLength(10), Validators.maxLength(10)]],
      sGstNo: ['', [Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[A-Z0-9]{1}$"), Validators.minLength(15), Validators.maxLength(15)]],
      // sGstNo: ['', [Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{2}$"), Validators.minLength(15), Validators.maxLength(15)]],
      souId: [],
      souName: [],
      slocation: ['', [Validators.minLength(3), Validators.maxLength(100), Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      creditAmt: [],
      highAmt: [],
      screditAmt: [],
      shighAmt: [],
      disPer: [],
      tdsPer:[],
      sdisPer: [],
      termId: [],
      dealerCode: [],
      dealerType: [],
      siteName: [],
      tcsYN: [],
      aadharNo: [],
      tdsApplDate:[],
      tcsPer:[],
    })

  }

  get f() { return this.customerMasterForm.controls; }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.lstcomments = [];
    this.lstcomments.customerSiteMasterList = [];
    this.name = sessionStorage.getItem('name');
    this.loginArray = sessionStorage.getItem('divisionName');
    this.divId = Number(sessionStorage.getItem('divisionId'));
    this.loginName = sessionStorage.getItem('name');
    console.log(this.loginArray);
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId = (sessionStorage.getItem('ouId'));
    this.locId = (sessionStorage.getItem('locId'));
    this.emplId = Number(sessionStorage.getItem('emplId'));
    console.log(this.ouId);
    //  this.weddingDate = new Date();
    this.startDate = new Date();
    this.service.custTypeList()
      .subscribe(
        data => {
          this.custTypeList = data;
          console.log(this.custTypeList);
        }
      );

    this.service.classCodeTypeList(sessionStorage.getItem('divisionId'))
      .subscribe(
        data => {
          this.classCodeTypeList = data;
          console.log(this.classCodeTypeList);
        }
      );



    this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        }
      );

    // if (this.ouId != undefined){
    // this.service.taxCategoryNameList(this.ouId)
    // .subscribe(
    //   data => {
    //     this.taxCategoryNameList = data;
    //     console.log(this.taxCategoryNameList);

    //   }
    // );
    // }

    this.service.titleList()
      .subscribe(
        data => {
          this.titleList = data;
          console.log(this.titleList);
        }
      );
    // this.service.OUIdList()
    //   .subscribe(
    //     data => {
    //       this.ouIdList = data;
    //       console.log(this.ouIdList);
    //     }
    //   );
    this.service.OUIdListDiv(this.divId)
      .subscribe(
        data => {
          this.ouIdList = data;
          console.log(this.ouIdList);
        }
      );

    this.service.cityList()
      .subscribe(
        data => {
          this.cityList = data;
          console.log(this.cityList);
        }
      );

    // this.service.pinCdList()
    // .subscribe(
    //   data => {
    //     this.pinCdList = data;
    //     console.log(this.pinCdList);
    //   }
    // );

    this.service.StateList()
      .subscribe(
        data => {
          this.stateList = data;
          console.log(this.stateList);
        }
      );
    this.service.payTermDescList()
      .subscribe(
        data => {
          this.payTermDescList = data;
          console.log(this.payTermDescList);
        }
      );
      this.service.getTDSPercentage().subscribe(
        data=>{
          this.tdsPercentage=data;
        }

      )
    // this.PersonType='Person';
  }

  customerMaster(customerMaster: any) {
  }

  ExeAddressEvent(e) {
    if (e.target.checked) {
      this.saddress1 = this.customerMasterForm.get('address1').value;
      this.saddress2 = this.address2
      this.saddress3 = this.address3
      // this.saddress4 = this.address4
      this.scity = this.customerMasterForm.get('city').value;
      this.spinCd = this.customerMasterForm.get('pinCd').value;
      this.sstate = this.state
      this.customerMasterForm.patchValue({ slocation: this.customerMasterForm.get('location').value });
      this.customerMasterForm.patchValue({ smobile1: this.customerMasterForm.get('mobile1').value });
      this.customerMasterForm.patchValue({ semailId: this.customerMasterForm.get('emailId').value });
      this.customerMasterForm.patchValue({ spanNo: this.customerMasterForm.get('panNo').value });
      this.customerMasterForm.patchValue({ sGstNo: this.customerMasterForm.get('gstNo').value });
    }
    else {
      this.saddress1 = null;
      this.saddress2 = null;
      this.saddress3 = null;
      // this.saddress4 = null;
      this.scity = null;
      this.pinCd = null;
      this.sstate = null;
    }
  }

  onOuIdSelected(ouId: any) {
    console.log(ouId);
    this.SearchTaxCat(ouId);

  }
  SearchTaxCat(ouId) {

    if (ouId != undefined) {
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
  // SearchsiteTaxCat(souId) {

  //   this.service.getTaxCat(souId)
  //     .subscribe(
  //       data => {
  //         this.taxCategoryList1 = data;
  //         console.log(this.taxCategoryList);
  //         // this.allFunction(locId);
  //       }
  //     );
  // }

  onOptionStateSeleted(event: any) {
    if (event != undefined) {
      this.service.taxCategoryList1(this.locId, event)
        .subscribe(
          data => {
            // this.taxCategoryNameList = data;
            this.taxCategoryName = data.taxCategoryName;
            // console.log(this.taxCategoryNameList);

          }
        );
    }
  }
  onOptionSiteStateSeleted(event: any) {


    // this.lstcomments2 = this.lstcomments.customerSiteMasterList;
    // console.log(this.lstcomments2);
    // let select = this.lstcomments2.find(d => d.customerSiteId === customerSiteId);

    if (event != undefined && this.customerSiteId ===undefined) {
      this.service.taxCategoryList1(this.locId, event)
        .subscribe(
          data => {
            // this.taxCategoryNameList = data;
            this.staxCatName = data.taxCategoryName;
            // console.log(this.taxCategoryNameList);

          }
        );
    }
  }
  onOptionClassCode(event: any) {
    if (event === 'DEALER') {

      this.dispDealer = true;
    }
  }
  onOptionsSelected(event: any) {
    this.Status1 = this.customerMasterForm.get('status').value;

    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.customerMasterForm.get('endDate').reset();
    }
  }

  onOptioncustTypeSelected(event: any) {

    if (this.PersonType != undefined) {
      if (event != this.PersonType) {
        // this.customerMasterForm.reset();
        window.location.reload();
        // this.customerMasterForm.patchValue({custType:event});
        // return;
      }
    }

    this.PersonType = this.customerMasterForm.get('custType').value;

    if (event === 'Person') {
      this.displayPerson = true;
      this.displayOrgnization = false;
      this.displaytanaadhar = true;
      //  this.customerMasterForm.get('custName').disable();
    } if (event === 'Organization') {
      //this.displayOrgnization = true;
      this.displayPerson = false;
      // this.customerMasterForm.get('custName').enable();
      this.customerMasterForm.get('birthDate').disable();
      this.customerMasterForm.get('weddingDate').disable();
      this.displaytanaadhar = false;
    }
  }

  gstVerification(event: any) {
    var gstno = this.customerMasterForm.get('gstNo').value
    const gstNo1 = gstno.substr(2, 10);
    this.panNo = gstNo1;
    // alert('Gst verificaition');
    this.customerMasterForm.patchValue({'panNo':gstNo1});
    var res = gstno.substr(0, 2);
    console.log(res);
    const state = this.customerMasterForm.get('state').value;
    console.log(state);
    console.log(this.state === 'MAHARASHTRA' && res === 27);
    switch (state.toUpperCase()) {
      case 'MAHARASHTRA':
        if (res != 27) {
          alert('Kindly entered correct GST No Start with 27');
          this.customerMasterForm.get('gstnNo').reset();
        }
        break;
      case 'GOA':
        if (res != 30) {
          alert('Kindly entered correct GST No Start with 30');
          this.customerMasterForm.get('gstnNo').reset();
        }
        break;
      case 'ANDHRA PRADESH':
        if (res != 28) {
          alert('Kindly entered correct GST No Start with 28');
          this.customerMasterForm.get('gstnNo').reset();
        }
        break;
      case 'KARNATAKA':
        if (res != 29) {
          alert('Kindly entered correct GST No Start with 29');
          this.customerMasterForm.get('gstnNo').reset();
        }
        break;
      case 'KERALA':
        if (res != 32) {
          alert('Kindly entered correct GST No Start with 32');
          this.customerMasterForm.get('gstnNo').reset();
        }
        break;
      case 'TELANGANA':
        if (res != 36) {
          alert('Kindly entered correct GST No Start with 36');
          this.customerMasterForm.get('gstnNo').reset();
        }
        break;
    }



  }

  gstVerification2(event: any) {
    var sGstno = this.customerMasterForm.get('sGstNo').value
    const sGstNo1 = sGstno.substr(2, 10);
    this.panNo = sGstNo1;
    //  alert('Gst verificaition2');
    this.customerMasterForm.patchValue({'spanNo':sGstNo1});
    var res = sGstno.substr(0, 2);
    console.log(res);
    const state = this.customerMasterForm.get('sstate').value;
    console.log(state);
    console.log(this.sstate === 'MAHARASHTRA' && res === 27);
    switch (state.toUpperCase()) {
      case 'MAHARASHTRA':
        if (res != 27) {
          alert('Kindly entered correct GST No Start with 27');
          this.customerMasterForm.get('sGstnNo').reset();
        }
        break;
      case 'GOA':
        if (res != 30) {
          alert('Kindly entered correct GST No Start with 30');
          this.customerMasterForm.get('sGstnNo').reset();
        }
        break;
      case 'ANDHRA PRADESH':
        if (res != 28) {
          alert('Kindly entered correct GST No Start with 28');
          this.customerMasterForm.get('sGstnNo').reset();
        }
        break;
      case 'KARNATAKA':
        if (res != 29) {
          alert('Kindly entered correct GST No Start with 29');
          this.customerMasterForm.get('sGstnNo').reset();
        }
        break;
      case 'KERALA':
        if (res != 32) {
          alert('Kindly entered correct GST No Start with 32');
          this.customerMasterForm.get('sGstnNo').reset();
        }
        break;
      case 'TELANGANA':
        if (res != 36) {
          alert('Kindly entered correct GST No Start with 36');
          this.customerMasterForm.get('sGstnNo').reset();
        }
        break;
    }



  }

  onKey(event: any) {
    // const aaa = this.title + '. ' + this.fName + ' ' + this.mName + ' ' + this.lName;

    //  alert('On key press');
    const aaa = this.customerMasterForm.get('title').value + '. ' + this.customerMasterForm.get('fName').value + ' ' + this.customerMasterForm.get('mName').value + ' ' + this.customerMasterForm.get('lName').value;
    var person = this.customerMasterForm.get('custType').value;


    if (person === 'Person') {
      this.custName = aaa;
    }

  }


  mergeCustName(fName, mName, lName) {
    const aaa = fName + ' ' + mName + ' ' + lName;
    this.custName = aaa;
  }
  transDataForSite(val) {
    delete val.custType;
    delete val.title;
    delete val.fName;
    delete val.mName;
    delete val.lName;
    delete val.custName;
    delete val.address1;
    delete val.address2;
    delete val.address3;
    delete val.address4;
    delete val.city;
    delete val.state;
    delete val.mobile1;
    delete val.mobile2;
    delete val.mobile3;
    delete val.emailId;
    delete val.emailId1;
    delete val.contactPerson;
    delete val.contactNo;
    delete val.birthDate;
    delete val.weddingDate;
    delete val.status;
    delete val.classCodeType;
    // delete val.spinCd;comment by vinita
    delete val.sstartDate;
    delete val.sendDate;
    return val;
  }
  newOnlySiteMast() {
    this.submitted = true;
    if (this.customerMasterForm.invalid) {
      // alert ('new site click validation error');
      return;
    }
    const formValue: IcustomerMaster = this.transDataForSite(this.customerMasterForm.value);

    this.service.CustMasterOnlySitSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        var acctNo = this.customerMasterForm.get('custAccountNo').value;
        this.searchByAccount1(acctNo);
        // this.customerMasterForm.disable();
        this.displayNewButton1=false;
        // this.customerMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert(res.message);
          // this.customerMasterForm.reset();
        }
      }
    });
  }
  newMast() {
    alert('validating')
    var isvaliddata = this.validation();
    if (isvaliddata === false) {
      alert('In Validation (v)');
      return;
    }

    this.submitted = true;

    if (this.customerMasterForm.invalid) {
      alert("Please fix the errors!!");
      return;
    }

    const formValue: IcustomerMaster = this.transDataWithSite(this.customerMasterForm.value);
    formValue.customerId1 = this.custAccountNo;

    if (formValue.custType === 'Organization') {
      formValue.title = 'M/S';
    }
    this.service.CustMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFULLY ' + res.obj);
        // var mobile=this.customerMasterForm.get('mobile1').value;
        this.searchByAccount1(res.obj);
        this.customerMasterForm.disable();
        this.displayadditional = false;
        //  this.customerMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert('Error ' + res.obj);

          //this.customerMasterForm.reset();
        }
      }
    });
  }

  onOptionsPaymentTyp(paymentType) {
    // alert(paymentType);
    this.customerMasterForm.patchValue({ termId: paymentType })
    // let select = this.payTermDescList.find(d => d.paymentType === paymentType);

  }

  UpdateSiteCustMastExeSite() {

    const formValue: IcustomerMaster = this.customerMasterForm.value;
    formValue.termId = this.customerMasterForm.get('paymentType').value;
    formValue.staxCategoryName=this.customerMasterForm.get('staxCatName').value;
    this.service.UpdateCustExeSiteMasterById(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFULLY');
        // window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          // this.customerMasterForm.reset();
        }
      }
    });
  }
  transDataUppdateCustomer(val) {
    // delete val.customerId;
    delete val.saddress1;
    delete val.saddress2;
    delete val.saddress3;
    delete val.slocation;
    delete val.scity;
    delete val.spinCd;
    delete val.sstate;
    delete val.smobile1;
    delete val.smobile2;
    delete val.smobile3;
    delete val.semailId;
    delete val.semailId1;
    delete val.sstartDate;
    delete val.sendDate;
    delete val.sstatus;
    return val;
  }


  updateMast() {

    var isvaliddata = this.validation();
    if (isvaliddata === false) {
      // alert('In Validation (v)');
      return;
    }

    this.submitted = true;
    if (this.customerMasterForm.invalid) {
      // alert('In Validation(d) ');
      return;
    }
    const formValue: IcustomerMaster = this.transDataUppdateCustomer(this.customerMasterForm.getRawValue());
    this.service.UpdateCustMasterById(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFULLY');
        // window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.customerMasterForm.reset();
        }
      }
    });
  }
  transDataWithSite(val) {
    delete val.customerId;
    delete val.saddress1;
    delete val.saddress2;
    delete val.saddress3;
    delete val.slocation;
    delete val.scity;
    delete val.spinCd;
    delete val.sstate;
    delete val.smobile1;
    delete val.smobile2;
    delete val.smobile3;
    delete val.semailId;
    delete val.semailId1;
    delete val.sstartDate;
    delete val.sendDate;
    delete val.sstatus;
    return val;
  }
  resetMast() {
    window.location.reload();
  }
  closesMast() {
    this.location1.back();

  }
  // searchByCustAccount(customerId1) {
  //   this.service.getsearchByAccountNo(customerId1)
  //     .subscribe(
  //       data => {
  //         this.searchByAccount = data;
  //         // console.log(this.lstcomments.supplierSiteMasterList);
  //         this.customerMasterForm.patchValue(this.searchByAccount);
  //         // this.city = this.lstcomments.city
  //       }
  //     );
  // }

  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return (k >= 48 && k <= 57);
  }


  searchByContact(contactNo) {

    this.displayNewButton = false;
    this.service.searchCustomerByContact(contactNo)
      .subscribe(
        data => {
          this.accountNoSearchdata = data.obj;
          console.log(this.lstcomments);
          this.customerMasterForm.patchValue({ custAccountNo: data.obj.custAccountNo })
          // this.customerMasterForm.patchValue(this.lstcomments[0]);
          // this.customerMasterForm.patchValue(this.lstcomments[0].);
          // this.city = this.lstcomments.city

          //       this.customerMasterForm.patchValue({
          //         panNo:this.lstcomments[0].customerSiteMasterList[0].panNo,
          //         gstNo:this.lstcomments[0].customerSiteMasterList[0].gstNo,
          //         highAmt:this.lstcomments[0].customerSiteMasterList[0].highAmt,
          //         creditAmt:this.lstcomments[0].customerSiteMasterList[0].creditAmt,
          //         disPer:this.lstcomments[0].customerSiteMasterList[0].disPer

          //       });
          //       var title1=this.titleList.find(d=>d.code===this.lstcomments[0].title);
          //       var payTerm=this.payTermDescList.find(d=>d.lookupValueId===this.lstcomments[0].termId);
          //       this.customerMasterForm.patchValue({title:this.lstcomments[0].title,paymentType:payTerm.lookupValueId});
          //       this.displayadditional=false;
          //       this.customerMasterForm.get('address1').disable();
          // this.customerMasterForm.get('address2').disable();
          // this.customerMasterForm.get('address3').disable();
          // this.customerMasterForm.get('address4').disable();
          // this.customerMasterForm.get('location').disable();
          // this.customerMasterForm.get('city').disable();
          // this.customerMasterForm.get('pinCd').disable();
          // this.customerMasterForm.get('state').disable();
          // this.customerMasterForm.get('creditAmt').disable();
          // this.customerMasterForm.get('highAmt').disable();
          // this.customerMasterForm.get('disPer').disable();comment by vinnita
        }
      );
  }

  searchByAccount1(accountNo) {

    this.displayNewButton = false;
    this.service.searchCustomerByAccount(accountNo)
      .subscribe(
        data => {
          this.lstcomments = data.obj;
          console.log(this.lstcomments);
          this.customerMasterForm.patchValue(this.lstcomments);
          this.displayenable = false;

          // this.city = this.lstcomments.city

          // let birDate =this.pipe.transform(this.lstcomments[0].birthDate, 'yyyy-MM-dd');
          //  alert("----"+birDate)
          this.customerMasterForm.patchValue({
            panNo: this.lstcomments.customerSiteMasterList[0].panNo,
            gstNo: this.lstcomments.customerSiteMasterList[0].gstNo,
            taxCategoryName: this.lstcomments.customerSiteMasterList[0].taxCategoryName,
            highAmt: this.lstcomments.customerSiteMasterList[0].highAmt,
            creditAmt: this.lstcomments.customerSiteMasterList[0].creditAmt,
            disPer: this.lstcomments.customerSiteMasterList[0].disPer,
            location: this.lstcomments.customerSiteMasterList[0].location,
          });
          var title1 = this.titleList.find(d => d.code === this.lstcomments.title);
          var payTerm = this.payTermDescList.find(d => d.lookupValueId === this.lstcomments.termId);
          this.customerMasterForm.patchValue({ title: this.lstcomments.title, paymentType: payTerm.lookupValueId });
          this.displayadditional = false;
          this.customerMasterForm.get('address1').disable();
          this.customerMasterForm.get('address2').disable();
          this.customerMasterForm.get('address3').disable();
          this.customerMasterForm.get('address4').disable();
          this.customerMasterForm.get('location').disable();
          this.customerMasterForm.get('city').disable();
          this.customerMasterForm.get('pinCd').disable();
          this.customerMasterForm.get('state').disable();
          this.customerMasterForm.get('creditAmt').disable();
          this.customerMasterForm.get('highAmt').disable();
          this.customerMasterForm.get('disPer').disable();
        }
      );
  }


  Select(customerSiteId: number) {

    this.displayNewButton1 = false;
    this.displaystatus = false;

    this.lstcomments2 = this.lstcomments.customerSiteMasterList;
    console.log(this.lstcomments2);
    let select = this.lstcomments2.find(d => d.customerSiteId === customerSiteId);
    console.log(select);
    console.log(select.status);

    if (select != undefined) {
      // this.customerSiteId = select.customerSiteId
      this.saddress1 = select.address1
      this.saddress2 = select.address2
      this.saddress3 = select.address3
      this.scity = select.city
      this.spinCd = select.pinCd
      this.sstate = select.state
      this.contactNo = select.contactNo
      this.contactPerson = select.contactPerson
      this.semailId = select.emailId
      this.gstNo = select.gstNo
      this.smobile1 = select.mobile1
      this.smobile2 = select.mobile2
      this.ouId = select.ouId
      this.spanNo = select.panNo
      this.tanNo = select.tanNo
      this.souId = select.ouId
      this.customerSiteId = select.customerSiteId;
      this.slocation = select.location
      this.customerMasterForm.patchValue({ siteName: select.siteName });
      this.customerMasterForm.patchValue({ screditAmt: select.creditAmt });
      this.customerMasterForm.patchValue({ shighAmt: select.highAmt });
      this.customerMasterForm.patchValue({ sdisPer: select.disPer });
      this.customerMasterForm.patchValue({staxCatName:select.taxCategoryName});
      // this.sstatus=select.status
      // ticketNo not in  json
      let selstatus = this.statusList.find(d => d.codeDesc === select.status);

      this.customerMasterForm.patchValue({ sstatus: selstatus.codeDesc, slocation: select.location });

      // this.displayButton = false;
    }
    console.log(select.status);

  }

  onOptionsSelectedCity(city: any) {

    if (city != undefined) {
      this.service.cityList1(city)
        .subscribe(
          data => {
            this.cityList1 = data;
            console.log(this.cityList1);
            this.state = this.cityList1.attribute1;
            console.log(this.cityList1.attribute1);
            // this.country = 'INDIA';
          }
        );
    }
  }
  tcssel(e) {
    if (e.target.checked === true) {
      this.tcsYN = 'Y'
    }
    if (e.target.checked === false) {
      this.tcsYN = 'N'
    }
  }
  onOptionSelOuLimit(event) {
    var custId = this.customerMasterForm.get('customerId').value;
    if (custId != null) {
      this.service.Limitdata(event, custId).subscribe((res: any) => {
        if (res.code === 200) {
          // alert(res.message);
          this.limitData = res.obj
          this.customerMasterForm.patchValue({ 'screditAmt': this.limitData.creditAmt, 'shighAmt': this.limitData.highAmt, 'sdisPer': this.limitData.disPer });
        }
        else {
          if (res.code === 400) {
            alert(res.message);
          }
        }

        // this.country = 'INDIA';
      }
      );
    }
  }
  onOptionsiteSelectedCity(event) {

    if (event != undefined) {
      var selcity = this.cityList1.find(d => d.codeDesc === event);
      // this.sstate=selcity.attribute1;
    }
  }
  onBirthgDateChange(event) {
    var birthdt: Date = new Date(event.target.value);


    // this.customerMasterForm.controls.weddingDate.setValue(formatDate(this.minDateWedding,'yyyy-MM-dd','en'));

  }
  onOptionWeddingDate(event) {

    var weddate = event.target.value;

    var birthdat: Date = this.customerMasterForm.get('birthDate').value

    if (weddate > this.startDate || weddate <= birthdat || weddate <= birthdat.setFullYear(birthdat.getFullYear() + 18)) {
      alert("Please select Correct Wedding Date");
      this.weddingDate = undefined;

    }
  }

  public validation(): boolean {
    var validdata: boolean;
      const formValue: IcustomerMaster = this.customerMasterForm.value;
      if (formValue.custType === 'Person') {
      if (formValue.birthDate === undefined) {
        alert('Please enter Birth Date');
        validdata = false;
      }
      if (formValue.title === undefined) {
        alert('Please select Title');
        validdata = false;
      }
      return validdata;
    }
    if (formValue.custType === 'Organization') {

      if (formValue.contactNo === undefined) {
        alert('Please enter Contact  No');
        validdata = false;

      }
      if (formValue.contactPerson === undefined) {
        alert('Please enter Contact  Person Name');
        // this.customerMasterForm.get('contactPerson')
        validdata = false;
      }
      return validdata;
    }
    if (formValue.classCodeType === 'DEALER') {
      if (formValue.dealerCode === null) {
        alert("Please enter Dealer Code");
        validdata = false;
      }
      if (formValue.dealerType === null) {
        alert("Please Select Dealer Type");
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

  message: string = "Please Fix the Errors !";
  msgType: string = "Close";
  getMessage(msgType: string) {
    this.msgType = msgType;
    if (msgType.includes("Save")) {
      var isvaliddata = this.validation();
      if (isvaliddata === false) {
        alert('Validation Errors !!');
        this.msgType ='Error';
        (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '');
        return;
      }
      this.submitted = true;
      (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
      if (this.customerMasterForm.invalid) {
        //this.submitted = false;
        (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '');
        return;
      }
      this.message = "Do you want to SAVE the changes(Yes/No)?"

    }

    if (msgType.includes("NewSite")) {
      var isvaliddata = this.validation();
      if (isvaliddata === false) {
        alert('Validation Errors New Site !!');
        this.msgType ='Error';
        (document.getElementById('NewSite') as HTMLInputElement).setAttribute('data-target', '');
        return;
      }
      this.submitted = true;
      // (document.getElementById('NewSite') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
      if (this.customerMasterForm.invalid) {
        //this.submitted = false;
        (document.getElementById('NewSite') as HTMLInputElement).setAttribute('data-target', '');
        return;
      }
      this.message = "Do you want to SAVE New Site(Yes/No)?"

    }

    if (msgType.includes("Reset")) {
      this.message = "Do you want to Reset the changes(Yes/No)?"
    }

    if (msgType.includes("Close")) {
      this.message = "Do you want to Close the Form(Yes/No)?"
    }
    return;
  }

  executeAction() {
    if (this.msgType.includes("Save")) {

      this.newMast();
    }
    if (this.msgType.includes("Update")) {
      this.updateMast();
    }
    if (this.msgType.includes("Reset")) {
      // this.resetItemCatMast();
      this.customerMasterForm.reset();
    }

    if (this.msgType.includes("Close")) {
      // this.closeItemCatMast();
      this.router.navigate(['admin']);
    }

    if (this.msgType.includes("NewSite")) {
       this.newOnlySiteMast();
      // this.router.navigate(['admin']);
    }
    return;
  }

  pinCodeVerification(pincod) {
    if (pincod.leng > 6) {
      alert("Please enter Pincode in proper format");
    }
  }

  custNameSearch(custName) {
    alert(custName)
    this.orderManagementService.custNameSearchFn1(custName, sessionStorage.getItem('divisionId'))
      .subscribe(
        data => {
          if (data.code === 200) {
            this.customerNameSearch = data.obj;
            // console.log(this.accountNoSearch);
          }
          else {
            if (data.code === 400) {
              alert(data.message);
              // this.display='block';
            }
          }
        }
      );
  }


}

