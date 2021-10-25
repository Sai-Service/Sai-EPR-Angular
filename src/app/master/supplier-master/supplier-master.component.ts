import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, RequiredValidator } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from '../master.service';
import { valHooks } from 'jquery';

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
  eTktNo:string;
  Ename:string;
  type:string;
  divisionId:number;
  compId:number;
  locId:number;
  //displayMsmeNo:
  // aadharNo:string;
  spanNo:string;
  sGstNo:string;
}


@Component({
  selector: 'app-supplier-master',
  templateUrl: './supplier-master.component.html',
  styleUrls: ['./supplier-master.component.css']
})
export class SupplierMasterComponent implements OnInit {

  supplierMasterForm: FormGroup;
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
  type:string;
  Status1: any;
  // aadharNo:string;
  ouIdSelected: number;
  emplId: number;
  public cityList: Array<string>[];
  public pinCodeList: Array<string>[];
  public stateList: Array<string>[];
  public taxCategoryList: Array<string>[];
  public ouIdList: Array<string>[];
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
  eTktNo:string;
  Ename:string;
  locId:number;
  displaySaveBtn: boolean=true;
  displayUpdBtn: boolean;
  spanNo:string;
  sGstNo:string;
  sprePayAcct:string;
      sliabilityAcct:string;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.supplierMasterForm = fb.group({
      suppId: [],
      suppno:[''],
      suppNo: ['', [Validators.maxLength(10), Validators.minLength(3), Validators.pattern('[0-9]*')]],
      name: ['', [ Validators.required, Validators.maxLength(150), Validators.pattern('[a-zA-Z ]*')]],
     address1: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(100),Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      address2: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(100),Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      address3: ['',[Validators.maxLength(50)]],
      address4: ['',[Validators.maxLength(50)]],
      city: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50),Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      contactNo: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10)]],
      mobile1: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10)]],
      mobile2: ['', [Validators.pattern('[0-9]*'), Validators.maxLength(10)]],
      contactPerson: ['',[Validators.required,Validators.pattern('[a-zA-Z /-]*')]],
      taxCategoryName: [''],
      creditDays: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      creditLimit: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      remarks: [''],
      emailId: ['', [Validators.email]],
      state: ['', [Validators.required]],
      gstNo: ['',[Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{2}$"),Validators.minLength(15), Validators.maxLength(15)]],
      panNo: ['', [Validators.required, Validators.pattern("^[A-Za-z]{5}[0-9]{4}[A-Za-z]$"), Validators.maxLength(10)]],
      tanNo: [''],
      msmeYN: [],
      msmeNo: [],
      pinCode: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^[0-9]{6}$")]],
      status: ['', [Validators.nullValidator]],
      divisionId:[],
      compId:[],
      type:[],
      locId:[],
      ouId:['',[Validators.required]],
      ExeAddress: [],
      saddress1: ['', [Validators.minLength(10),Validators.maxLength(100),Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      saddress2: ['', [Validators.minLength(10),Validators.maxLength(100),Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
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
      eTktNo:[],
      Ename:[],
      spanNo:[],
      sGstNo:[],
      sprePayAcct:[],
      sliabilityAcct:[],
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

    this.service.OUIdList()
      .subscribe(
        data => {
          this.ouIdList = data;
          console.log(this.ouIdList);
        }
      );
  }

  supplierMaster(supplierMaster: any) {
  }


  onOptionsupTypeSelected(event: any) {
    // alert(this.PersonType+'Type');
    if(this.type!=undefined){
    if(event!=this.type){
       window.location.reload();
    }}

    this.type = this.supplierMasterForm.get('type').value;

    if (event === 'Employee') {
      alert('Hi')
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

    // this.submitted = true;
    // if(this.supplierMasterForm.invalid){
    // alert('In Validation');
    //   return;
    // }
    // const formValue: IsupplierMaster = this.transData(this.supplierMasterForm.value);
    const formValue:IsupplierMaster=this.supplierMasterForm.value;
    formValue.compId=41;
    formValue.divisionId=Number(sessionStorage.getItem('divisionId'));
    this.service.SupliMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFULLY');
        this.suppNo=res.obj.suppNo;
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
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.supplierMasterForm.reset();
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
    const formValue: IsupplierMaster = this.transDataSupp(this.supplierMasterForm.value);
    this.service.UpdateSupliMasterById(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFULLY');
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.supplierMasterForm.reset();
        }
      }
    });
  };

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
        alert('RECORD INSERTED SUCCESSFULLY');
        this.displayadditional=false;
        this.supplierMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert('Code already present in the data base');
          this.supplierMasterForm.reset();
        }
      }
    });
  }

  Select(suppSiteId: number) {
alert(suppSiteId);
    this.lstcomments2 = this.lstcomments.supplierSiteMasterList;
    console.log(this.lstcomments2);
    let select = this.lstcomments2.find(d => d.suppSiteId === suppSiteId);
    // let select = this.lstcomments.find(d => d.suppSiteId === suppSiteId);
    if (select) {
      this.suppSiteId = select.suppSiteId
      this.saddress1 = select.address1
      this.saddress2 = select.address2
      this.saddress3 = select.address3
      this.saddress4 = select.address4
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
      this.taxCategoryName = select.taxCategoryDesc
      // ticketNo not in  json

      // this.displayButton = false;
    }
  }
  ExeAddressEvent(e) {
    if (e.target.checked) {
      this.saddress1 = this.address1
      this.saddress2 = this.address2
      this.saddress3 = this.address3
      this.saddress4 = this.address4
      this.scity = this.city
      this.pinCd = this.pinCode
      this.sstate = this.state
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

  searchBySuppCode(suppno) {
    this.service.getsearchBySuppCode(suppno)
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments.supplierSiteMasterList);
          this.supplierMasterForm.patchValue(this.lstcomments);
          // this.supplierMasterForm.patchValue({
          //   // panNo:this.lstcomments.supplierSiteMasterList[0].panNo,
          //   // gstNo:this.lstcomments.customerSiteMasterList[0].gstNo,
          //   taxCategoryName:this.lstcomments.customerSiteMasterList[0].taxCategoryName,
          //   contactPerson:this.lstcomments.customerSiteMasterList[0].contactPerson,
          // });
          this.city = this.lstcomments.city
          this.displayInactive = true;
          // (document.getElementById("saveBtn") as HTMLInputElement).disabled = true;
          this.displaySaveBtn=false;
          this.displayUpdBtn=true;
          this.displayadditional=false;
        }
      );
  }
  searchBySuppId(suppId) {
    this.service.getsearchBySuppCode(suppId)
      .subscribe(
        data => {
          this.lstcommentsId = data;
          console.log(this.lstcommentsId);
          this.supplierMasterForm.patchValue(this.lstcommentsId);
        }
      );
  }
  onOuIdSelected(ouId: any) {
    console.log(ouId);
    this.SearchTaxCat(ouId);

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

  onOptionsSelectedCity (city: any){
    // alert(city);
    this.service.cityList1(city)
    .subscribe(
      data => {
        this.cityList1 = data;
        console.log(this.cityList1);
        this.state=this.cityList1.attribute1;
        console.log(this.cityList1.attribute1);
        // this.country = 'INDIA';
         this.service.taxCategoryList1(this.locId,this.state)
        .subscribe(
          data => {
            // this.taxCategoryNameList = data;
            this.taxCategoryName=data.taxCategoryName;
            // console.log(this.taxCategoryNameList);

          }
        );
      }
    );
  }


  onKey(event: any) {
    const gstNo1 = this.gstNo.substr(3,10);
    this.panNo = gstNo1;
  }


    onOptionsSelectedCity1(city: any){
        // alert(city);
        this.service.cityList1(city)
        .subscribe(
          data => {
            this.cityList1 = data;
            console.log(this.cityList1);
            // this.state=this.cityList1.attribute1;
            this.sstate=this.cityList1.attribute1;
            console.log(this.cityList1.attribute1);
            // this.country = 'INDIA';
          }
        );
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
              this.submitted = true;
              (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
              if (this.supplierMasterForm.invalid) {

                //this.submitted = false;
                (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '');
                return;
              }
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

        }
