import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MasterService } from 'src/app/master/master.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { DatePipe, Location } from '@angular/common';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';



interface IBookOrderChetak {}


@Component({
  selector: 'app-booking-order-chetak',
  templateUrl: './booking-order-chetak.component.html',
  styleUrls: ['./booking-order-chetak.component.css']
})

export class BookingOrderChetakComponent implements OnInit {
  bookingOrderChetakForm: FormGroup;

  pipe = new DatePipe('en-US');
  now = Date.now();
  public minDate = new Date();
  public OUIdList            : Array<string> = [];
  public locIdList           : Array<string> = [];
  public statusList          : Array<string> = [];


  loginName:string;
  divisionId:number;
  loginArray:string;
  name:string;
  ouName : string;
  locId: number;
  locName : string;
  orgId:number;
  ouId :number;
  deptId:number; 
  emplId :number;

  customerId:number;
  custAccountNo: number;
  customerSiteId: number;
  custName: string;
  mobile1:string;
  custAddress:string;

  emailId: string;
  classCodeType:string;
  allDatastore: any;
  emailId1: string;
  locationId: number;
  birthDate: Date;
  subInventoryId: number;
  weddingDate: Date;
  gstNo: string;
  panNo: string;
  state:string;
 
  
  isDisabled3 = false;
  customerNameSearch: any = [];
  accountNoSearchdata:any=[];
  display = 'none';

  
  selCustomer: any;
  custSiteList: any = [];
  displaytcsYN = true;
  displaytcsBuuton = false;
  public payTermDescList: any = [];
  displaywalkingCustomer = true;
  displaydisPer = true;
  custClassCode:string;
  displayCSOrderAndLineDt = true;

  get f() { return this.bookingOrderChetakForm.controls; }

  bookingOrderChetak(bookingOrderChetakForm:any) {  }

  constructor(private fb: FormBuilder, private location1: Location, private service: MasterService, private orderManagementService: OrderManagementService,private router: Router) {
    this.bookingOrderChetakForm = fb.group({

      loginArray:[''],
      loginName:[''],
      ouName :[''],
      divisionId:[],
      locId:[''],
      locName :[''],
      ouId :[],
      deptId :[],
      emplId:[''],
      orgId:[''],

      custAccountNo: [],
      customerId:[],
      customerSiteId: [],
      custName:[],
      custClassCode:[],
      custAddress:[],

      emailId: [],
      classCodeType:[],
      allDatastore: [],
      emailId1: [],
      locationId: [],
      birthDate: [],
      subInventoryId: [],
      weddingDate: [],
      gstNo: [],
      panNo: [],
      state:[],
      mobile1:[],
      name: [],

     
      // oeOrderLinesAllList: this.fb.array([this.orderlineDetailsGroup()]),
    })
  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.name=  sessionStorage.getItem('name');
    this.loginArray=sessionStorage.getItem('divisionName');
    this.divisionId=Number(sessionStorage.getItem('divisionId'));
    this.loginName=sessionStorage.getItem('name');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId=Number(sessionStorage.getItem('ouId'));
    this.locId=Number(sessionStorage.getItem('locId'));
    this.deptId=Number(sessionStorage.getItem('dept'));
    this.emplId= Number(sessionStorage.getItem('emplId'));
    this.orgId=this.ouId;
    console.log(this.loginArray);
    console.log(this.locId);
  }


  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }

  searchByContact(contactNo) {
    this.service.searchCustomerByContact(contactNo)
      .subscribe(
        data => {
          this.accountNoSearchdata = data.obj;
          this.bookingOrderChetakForm.patchValue({ custAccountNo: data.obj.custAccountNo })

        });
  }


  custNameSearch(custName) {
    // alert(custName)
    this.orderManagementService.custNameSearchFn1(custName, sessionStorage.getItem('divisionId'))
      .subscribe(
        data => {
          if (data.code === 200) {
            this.customerNameSearch = data.obj;
          }
          else {
            if (data.code === 400) {
              alert(data.message);
              this.display = 'block';
            }
          }
        }
      );
  }

  accountNoSearch(custAccountNo) {
    // alert(custAccountNo);
    this.service.searchCustomerByAccount(custAccountNo)
      .subscribe(
        data => {
          if (data.code === 200) {
            this.selCustomer = data.obj;
            this.displayCSOrderAndLineDt = false;
            this.custSiteList = data.obj.customerSiteMasterList;
            if (data.obj.tcsYN === 'Y') {
              this.bookingOrderChetakForm.patchValue(data.obj);
              this.displaytcsYN = false;
              this.displaytcsBuuton = false;
             }
            
            this.custClassCode = this.selCustomer.classCodeType;
            this.bookingOrderChetakForm.patchValue({ tcsYN: data.obj.tcsYN });
            this.bookingOrderChetakForm.patchValue({ custName: data.obj.custName });
            this.bookingOrderChetakForm.patchValue({ customerId: data.obj.customerId });
            this.bookingOrderChetakForm.patchValue({ classCodeType: data.obj.classCodeType});
            this.bookingOrderChetakForm.patchValue({ tcsPer: data.obj.tcsPer });
            this.bookingOrderChetakForm.patchValue({ custAccountNo: custAccountNo });
            this.bookingOrderChetakForm.patchValue({ mobile1: data.obj.mobile1 });

            let select = this.payTermDescList.find(d => d.lookupValueId === this.selCustomer.termId);
            // this.paymentType = select.lookupValue;
            this.bookingOrderChetakForm.patchValue({ paymentType: select.lookupValue })
            this.bookingOrderChetakForm.get('custName').disable();
            this.bookingOrderChetakForm.get('mobile1').disable();
            // alert(this.custSiteList.length)
            for (let i = 0; i < this.custSiteList.length; i++) {
              if (this.custSiteList.length === 1) {
                // alert(this.custSiteList.length)
                this.bookingOrderChetakForm.patchValue({ name: this.custSiteList[0].siteName });
                // this.onOptionsSelectedcustSiteName(this.custSiteList[0].siteName);
              }
              else if (this.custSiteList.length > 1) {
                // alert('hi')
                this.bookingOrderChetakForm.patchValue({ name: this.custSiteList[0].siteName });
                // this.onOptionsSelectedcustSiteName(this.custSiteList[0].siteName);
              }
            }
            var custName = data.obj.custName;
            if (custName.includes(('CSCash Customer')) && Number(sessionStorage.getItem('divisionId')) === 2) {
              this.displaywalkingCustomer = false;
              this.bookingOrderChetakForm.patchValue({ discType: 'Header Level Discount' });
              this.displaydisPer = false;
            }
            else {
              this.bookingOrderChetakForm.get('disPer').disable();
            }
            if (data.obj.tcsYM === 'Y') {
              this.displaytcsYN = false;
              this.displaytcsBuuton = true;
            }
            this.bookingOrderChetakForm.get('custAccountNo').disable();
            this.isDisabled3 = true;
            this.customerNameSearch.splice(0, this.customerNameSearch.length);
            console.log(this.customerNameSearch);
          }
          else {
            if (data.code === 400) {
               this.display = 'block';
            }
          }
        });
  }
  
 
  
  onOptionsSelectedcustSiteName(siteName) {
    // alert(  "siteName :" +siteName);
    let selSite = this.custSiteList.find(d => d.siteName === siteName);
    console.log(selSite);
    // if(selSite ===undefined) {alert ("selsite undefined");return;}

    console.log(this.custSiteList);
    if (selSite.ouId != (sessionStorage.getItem('ouId'))) {
      alert('First Create OU wise Site to continue process!')
    }
    else {
      console.log(this.selCustomer);

      this.bookingOrderChetakForm.patchValue(selSite);
      this.custAddress = (selSite.address1 + ', '
        + selSite.address2 + ', '
        + selSite.address3 + ', '
        + selSite.city + ', '
        + selSite.pinCd + ', '
        + this.selCustomer.state);
      this.birthDate = this.selCustomer.birthDate;
      this.weddingDate = this.selCustomer.weddingDate;
      this.bookingOrderChetakForm = this.selCustomer.taxCategoryName;
      this.custClassCode = this.selCustomer.classCodeType;
      this.bookingOrderChetakForm.patchValue({ creditAmt: selSite.creditAmt });
      if (selSite.disPer != null) {
        // alert(selSite.disPer)
        this.bookingOrderChetakForm.patchValue({ discType: 'Header Level Discount' })
        this.bookingOrderChetakForm.patchValue({ disPer: selSite.disPer })
        // this.orderlineDetailsGroup().patchValue({ disPer: selSite.disPer })
        this.displaydisPer = false;
        var patch = this.bookingOrderChetakForm.get('oeOrderLinesAllList') as FormArray;
        // alert(patch.length)
        for (let i = 0; i < patch.length; i++) {
          (patch.controls[i]).patchValue({
            disPer: selSite.disPer,
          });
        }
      }
    }
    
  

  }

}
