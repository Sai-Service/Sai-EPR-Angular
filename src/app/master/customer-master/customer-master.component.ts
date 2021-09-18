import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from '../master.service';

interface IcustomerMaster {
  custType: string;
  customerId:number;
  title: string;
  customerId1: number;
  customerAcc1:number;
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
  staxCatName:string;
  stanNo:string;
  spanNo:string;
  sGstNo:string;
  souId:number;
  souName:string;
  status: string;
  classCodeType: string;
  ouId: string;
  locId:string;
  taxCategoryName:string;
  location: string;
  saddress1: string;
  saddress2: string;
  saddress3: string;
  scity: string;
  // spinCd: string;
  sstate: string;
  smobile1: string;
  smobile2: number;
  smobile3: number;
  semailId: string;
  semailId1: string;
  sstartDate: Date;
  sendDate: Date;
  sstatus: string;
  custAccountNo:number;
  divisionName: string;
  paymentType: string;
  slocation:string;
  emplId: number;
  customerSiteId:number;
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
  customerId:number;
  custType: string;
  PersonType: any;
  taxCategoryName:string;
  displayPerson: boolean;
  displayOrgnization: boolean ;
  title: string;
  customerId1: number;
  customerAcc1:number;
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
  locId:string;
  staxCatName:string;
  stanNo:string;
  spanNo:string;
  sGstNo:string;
  souId:number;
  souName:string;
  location: string;
  saddress1: string;
  saddress2: string;
  saddress3: string;
  scity: string;
  // spinCd: string;
  sstate: string;
  smobile1: string;
  smobile2: string;
  smobile3: string;
  semailId: string;
  semailId1: string;
  sstartDate: Date;
  sendDate: Date;
  public sstatus="Active";
  slocation:string;
  custAccountNo:number;
  ExeAddress: string;
  divisionName: string;
  name:string;
  public status = "Active";
  displayInactive = true;
  displaystatus=true;
  displayNewButton = true;
  displayNewButton1=true;
  displayNewButtonWithSite=false;
  Status1: any;
  lstcomments: any;
  searchByAccount: any;
  displayButton = true;
  birthDate :Date;
  weddingDate: Date;
  startDate: Date;
  endDate: Date
  public minDate = new Date()  ;
  public minDateBirth = new Date().setFullYear(new Date().getFullYear() -18);
  public minDateWedding = new Date().getFullYear();
  public cityList1: any=[];

  public custTypeList: Array<string>[];
  public titleList: any=[];
  public cityList: Array<string>[];
  public taxCategoryNameList : Array<string>[];
  public pinCdList: Array<string>[];
  public stateList: Array<string>[];
  public ouIdList: Array<string>[];
  public classCodeTypeList:Array<string>[];
  public taxCategoryList: Array<string>[];
  public statusList: any= [];
  loginName:string;
  ouName:string;
  public maxDate = new Date();
  // public maxDate = new Date();
  // ouId:number;

  loginArray:string;
  lstcomments2: any[];

  public payTermDescList: any;
  paymentType: string;
  taxCategoryList1: any;
  customerSiteId:number;
  // startDate = this.pipe.transform(Date.now(), 'y-MM-dd');


  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.customerMasterForm = fb.group({
      customerId1: [''],
      emplId: [''],
      customerAcc1:[''],
      title: [''],
      custType: ['', Validators.required],
      paymentType: [''],
      // fName: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*'),Validators.minLength(1)]],
      fName:['',[Validators.pattern('[a-zA-Z ]*'),Validators.minLength(1)]],
      mName: [''],
      // lName: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*'),Validators.minLength(1)]],
      lName:[''],
      custName: ['', Validators.required],
      address1: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(100),Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      address2: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(100),Validators.pattern('[a-zA-Z 0-9/-]*')]],
      address3: ['',[Validators.maxLength(100)]],
      address4: ['',[Validators.maxLength(100)]],
      city: ['', Validators.required],
      taxCategoryName: ['', Validators.required],
      pinCd: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(6),Validators.pattern('[0-9]*')]],
      state: ['', Validators.required],
      mobile1: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]*'), ]],
      mobile2: ['', [Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]*')]],
      mobile3: ['',[Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]*')]],
      // emailId: ['', [Validators.required, Validators.email,Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      emailId:[''],
      emailId1:['', [Validators.email,Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      // contactPerson: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      contactPerson:['',[Validators.pattern('^[a-zA-Z]*')]],
      contactNo:[''],
      // contactNo: ['', [Validators.pattern('[0-9]*'), Validators.minLength(10),Validators.maxLength(10)]],
      birthDate: [''],
      weddingDate: [''],
      startDate: ['', [Validators.required]],
      endDate: [''],
      gstNo: ['',[Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{2}$"),Validators.minLength(15), Validators.maxLength(15)]],
      // gstNo:['', [Validators.required, Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{2}$"), Validators.maxLength(15)]],
      panNo: ['', [Validators.required, Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]{1}$"), Validators.minLength(10),Validators.maxLength(10)]],
      tanNo: [''],
      status: ['', [Validators.required]],
      classCodeType: [''],
      ouId: ['', [Validators.required]],
      locId:[''],
      location: [''],
      saddress1: [''],
      saddress2: [''],
      saddress3: [''],
      scity: [''],
      // spinCd: [''],
      sstate: [''],
      smobile1: [''],
      smobile2: [''],
      smobile3: [''],
      semailId: [''],
      semailId1: [''],
      sstartDate: [''],
      sendDate: [''],
      sstatus: [''],
      customerSiteId:[],
      // custAccountNo:['', [Validators.required,Validators.pattern('[0-9]*')]],
      custAccountNo:[''],
      ExeAddress: [],
      customerId:[],
      divisionName: [],
      ouName:[],
      loginArray:[],
      staxCatName:[],
      stanNo:[],
      spanNo:[],
      sGstNo:[],
      souId:[],
      souName:[],
      slocation:[],
    })

  }

  get f() { return this.customerMasterForm.controls; }

  ngOnInit(): void {
    this.lstcomments= [];
    this.lstcomments.customerSiteMasterList=[];
    this.name=  sessionStorage.getItem('name');
    this.loginArray=sessionStorage.getItem('divisionName');
   this.loginName=sessionStorage.getItem('name');
   console.log(this.loginArray);
   this.ouName = (sessionStorage.getItem('ouName'));
   this.ouId = (sessionStorage.getItem('ouId'));
   this.locId=(sessionStorage.getItem('locId'));
   this.emplId=Number(sessionStorage.getItem('emplId'));
   console.log(this.ouId);
   this.weddingDate = new Date();
   this.startDate = new Date();
    this.service.custTypeList()
      .subscribe(
        data => {
          this.custTypeList = data;
          console.log(this.custTypeList);
        }
      );

      this.service.classCodeTypeList()
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
    this.service.OUIdList()
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

  }

  customerMaster(customerMaster: any) {
  }

  ExeAddressEvent(e) {
    if (e.target.checked) {
      this.saddress1 = this.address1
      this.saddress2 = this.address2
      this.saddress3 = this.address3
      // this.saddress4 = this.address4
      this.scity = this.city
      // this.spinCd = this.pinCd
      this.sstate = this.state
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

    if(ouId!=undefined){
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

onOptionStateSeleted(event:any)
{
      if(event!=undefined)
      {
       this.service.taxCategoryList1(this.locId,event)
        .subscribe(
          data => {
            // this.taxCategoryNameList = data;
            this.taxCategoryName=data.taxCategoryName;
            // console.log(this.taxCategoryNameList);

          }
        );
      }
}
onOptionSiteStateSeleted(event:any)
{

      if(event!=undefined)
      {
       this.service.taxCategoryList1(this.locId,event)
        .subscribe(
          data => {
            // this.taxCategoryNameList = data;
            this.staxCatName=data.taxCategoryName;
            // console.log(this.taxCategoryNameList);

          }
        );
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
    this.PersonType = this.customerMasterForm.get('custType').value;

    if (event === 'Person') {
      this.displayPerson = true;
      this.displayOrgnization = false;
    //  this.customerMasterForm.get('custName').disable();
    } if (event === 'Organization') {
      //this.displayOrgnization = true;
      this.displayPerson = false;
     // this.customerMasterForm.get('custName').enable();
    }
  }
  onKey(event: any) {
   // const aaa = this.title + '. ' + this.fName + ' ' + this.mName + ' ' + this.lName;


  const aaa = this.customerMasterForm.get('title').value + '. ' + this.customerMasterForm.get('fName').value + ' ' + this.customerMasterForm.get('mName').value+ ' ' +this.customerMasterForm.get('lName').value;
  var person = this.customerMasterForm.get('custType').value;

if (person === 'Person'){
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
    delete val.spinCd;
    delete val.sstartDate;
    delete val.sendDate;
    return val;
  }
  newOnlySiteMast() {
    const formValue: IcustomerMaster = this.transDataForSite(this.customerMasterForm.value);

    this.service.CustMasterOnlySitSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        var acctNo=this.customerMasterForm.get('custAccountNo').value;
        this.searchByAccount1(acctNo);
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
    this.submitted = true;
    if(this.customerMasterForm.invalid){
      alert("Please fix the errors!!");
    return;
    }

    const formValue: IcustomerMaster = this.transDataWithSite(this.customerMasterForm.value);
    formValue.customerId1=this.custAccountNo;

    if(formValue.custType ==='Organization')
    {
      formValue.title='M/S';
    }
    this.service.CustMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFULLY');
        var mobile=this.customerMasterForm.get('mobile1').value;
        this.searchByContact(mobile);
        this.customerMasterForm.disable();
      //  this.customerMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert('Error ' + res.obj);

          //this.customerMasterForm.reset();
        }
      }
    });
  }
  UpdateSiteCustMastExeSite(){

    const formValue: IcustomerMaster = this.customerMasterForm.value;
    this.service.UpdateCustExeSiteMasterById(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFULLY');
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.customerMasterForm.reset();
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
    const formValue: IcustomerMaster = this.transDataUppdateCustomer(this.customerMasterForm.value);
    this.service.UpdateCustMasterById(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFULLY');
        window.location.reload();
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
    this.router.navigate(['admin']);
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
  searchByContact(contactNo) {

    this.displayNewButton =false;
    this.service.searchCustomerByContact(contactNo)
      .subscribe(
        data => {
          this.lstcomments = data.obj;
           console.log(this.lstcomments);
          this.customerMasterForm.patchValue(this.lstcomments[0]);
          // this.city = this.lstcomments.city
          this.customerMasterForm.patchValue({
            panNo:this.lstcomments[0].customerSiteMasterList[0].panNo,
            gstNo:this.lstcomments[0].customerSiteMasterList[0].gstNo
          });
          var title1=this.titleList.find(d=>d.code===this.lstcomments[0].title);
          var payTerm=this.payTermDescList.find(d=>d.lookupValueId===this.lstcomments[0].termId);
          this.customerMasterForm.patchValue({title:this.lstcomments[0].title,paymentType:payTerm.lookupValueId});
        }
      );
  }
  searchByAccount1(accountNo) {

    this.displayNewButton =false;
    this.service.searchCustomerByAccount(accountNo)
      .subscribe(
        data => {
          this.lstcomments = data.obj;
           console.log(this.lstcomments);
          this.customerMasterForm.patchValue(this.lstcomments);
          // this.city = this.lstcomments.city
          this.customerMasterForm.patchValue({
            panNo:this.lstcomments.customerSiteMasterList[0].panNo,
            gstNo:this.lstcomments.customerSiteMasterList[0].gstNo,
            taxCategoryName:this.lstcomments.customerSiteMasterList[0].taxCategoryName
          });
          var title1=this.titleList.find(d=>d.code===this.lstcomments.title);
          var payTerm=this.payTermDescList.find(d=>d.lookupValueId===this.lstcomments.termId);
          this.customerMasterForm.patchValue({title:this.lstcomments.title,paymentType:payTerm.lookupValueId});
        }
      );
  }
  Select(customerSiteId: number) {

    this.displayNewButton1=false;
    this.displaystatus=false;

        this.lstcomments2 = this.lstcomments.customerSiteMasterList;
        console.log(this.lstcomments2);
        let select = this.lstcomments2.find(d => d.customerSiteId === customerSiteId);
        console.log(select);
        console.log(select.status);

        if (select!=undefined) {
          // this.customerSiteId = select.customerSiteId
          this.saddress1 = select.address1
          this.saddress2 = select.address2
          this.saddress3 = select.address3
          this.scity = select.city
          this.pinCd = select.pinCd
          this.sstate = select.state
          this.contactNo = select.contactNo
          this.contactPerson = select.contactPerson
          this.emailId = select.emailId
          this.gstNo = select.gstNo
          this.smobile1 = select.mobile1
          this.smobile2 = select.mobile2
          this.ouId = select.ouId
          this.panNo = select.panNo
          this.tanNo = select.tanNo
          this.souId=select.ouId
          this.customerSiteId=select.customerSiteId;
          this.slocation=select.location
          // this.sstatus=select.status
          // ticketNo not in  json
          let selstatus = this.statusList.find(d => d.codeDesc === select.status);

          this.customerMasterForm.patchValue({sstatus:selstatus.codeDesc,slocation:select.location});

          // this.displayButton = false;
        }
        console.log(select.status);

      }

      onOptionsSelectedCity (city: any){

        if(city != undefined){
        this.service.cityList1(city)
        .subscribe(
          data => {
            this.cityList1 = data;
            console.log(this.cityList1);
            this.state=this.cityList1.attribute1;
            console.log(this.cityList1.attribute1);
            // this.country = 'INDIA';
          }
        );
        }
      }
      onOptionsiteSelectedCity (event){

        if(event != undefined){
          var selcity=this.cityList1.find(d=>d.codeDesc===event);
          // this.sstate=selcity.attribute1;
        }
      }
      onBirthgDateChange(event){


        var birthdt  :Date= new Date(event.target.value);
        this.minDateWedding = birthdt.setFullYear(birthdt.getFullYear()+18);
        var birthdt1  :Date= new Date(this.minDateWedding);


      }
      onOptionWeddingDate(event)
      {

         var weddate=event.target.value;

        var birthdat:Date=this.customerMasterForm.get('birthDate').value

        if(weddate>this.startDate ||weddate<=birthdat||weddate<=birthdat.setFullYear(birthdat.getFullYear()+18))
        {
          alert("Please select Correct Wedding Date");

        }
      }

      validation()
      {
        var type=this.customerMasterForm.get('custType').value;
        if(type === 'Person')
        {
          alert('Please enter Birth Date');
        }
      }
}
