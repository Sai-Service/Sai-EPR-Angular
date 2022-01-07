import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators , FormArray } from '@angular/forms';
import { MasterService } from '../../master/master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InteractionModeRegistry } from 'chart.js';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { trigger } from '@angular/animations';

interface IAmcEnroll {  }

@Component({
  selector: 'app-amc-enrollment',
  templateUrl: './amc-enrollment.component.html',
  styleUrls: ['./amc-enrollment.component.css']
})
export class AmcEnrollmentComponent implements OnInit {

  amcEnrollmentForm : FormGroup;

  pipe = new DatePipe('en-US');
  public minDate = new Date();

  lstClearBackOrder:any;
  lstOrderList:any;
  public lstItemDetails:any;
  getVehRegDetails: any;
  CustomerDetailsList: any;
  CustomerSiteDetails: any;
   
  lstAmcSchemeList:any[];
  lstAmcSchLineDetails:any[];

  loginName:string;
  loginArray:string;
  divisionId:number;
  name:string;
  ouName : string;
  locId: number;
  locationId:number;
  locName : string;
  orgId:number;
  ouId :number;
  deptId:number; 
  emplId :number;

  amcNumber :string;
  amcDate:Date;
  saName:string;
  regNo:string;
  custNo :string;
  contactNo:string;
  custAddress:string;

  schemeGrp:string;
  schemeId:number;
  schemeNumber :string;
  startDate:Date;
  endDate :Date;
  startKms:number;
  endKms:number;

  customerId: number;
  dmsCustNo: number;
  custName: string;
  customerSiteId: number;
  customerSiteAddress: string;
  custCity: string;
  custState: String;
  custPincode: string;
  CustomerGstNo: string
  customerPanNo: string
  customerTanNo: string
  custAccountNo: number;
  custPhone: string;
  customerType: string;
  custTaxCategoryName: string;
  custTdsPer:number;

  

  displayButton=true;

  constructor(private service: MasterService,private orderManagementService:OrderManagementService,private transactionService: TransactionService , private  fb: FormBuilder, private router: Router) {
    this.amcEnrollmentForm = fb.group({

    loginArray:[''],
    loginName:[''],
    divisionId:[],
    ouName :[''],
    locId:[''],
    locationId:[],
    locName :[''],
    ouId :[],
    deptId :[],
    emplId:[''],
    orgId:[''],

    amcNumber :[],
    amcDate:[],
    saName:[],
    regNo:[],

    custNo :[],
    contactNo:[],
    custAddress:[],

    schemeId:[],
    schemeGrp:[],
    schemeNumber :[],
    startDate:[],
    endDate :[],
    startKms:[],
    endKms:[],

    customerId:[],
    dmsCustNo:[],
    custName:[],
    customerSiteId:[],
    customerSiteAddress:[],
    custCity:[],
    custState:[],
    custPincode:[],
    CustomerGstNo:[],
    customerPanNo:[],
    customerTanNo:[],
    custAccountNo:[],
    custPhone:[],
    customerType:[],
    custTaxCategoryName:[],
    custTdsPer:[],
  
    amcItemList: this.fb.array([this.lineDetailsGroup()])   

  });
}


lineDetailsGroup() {
  return this.fb.group({ 
  itemId:[''],
  couponId:[''],
  couponNumber:[''],
  couponDesc :['', [Validators.required]],    
  quantity:['', [Validators.required]],
  value:['', [Validators.required]],
  total:['', [Validators.required]],
  couponCode:[],
  gstpercentage:[],
  couponActualCode:[],
  discount:[],
  taxableAmt:[],
  taxAmt:[],
  netAmt:[],

 });
}

lineDetailsArray() :FormArray{
  return <FormArray>this.amcEnrollmentForm.get('amcItemList')
}


get f() { return this.amcEnrollmentForm.controls; }

amcEnrollment(amcEnrollmentForm:any) {  }

ngOnInit(): void {
  $("#wrapper").toggleClass("toggled");
  this.name=  sessionStorage.getItem('name');
  this.loginArray=sessionStorage.getItem('divisionName');
  this.loginName=sessionStorage.getItem('name');
  this.ouName = (sessionStorage.getItem('ouName'));
  this.ouId=Number(sessionStorage.getItem('ouId'));
  this.locId=Number(sessionStorage.getItem('locId'));
  this.locName=(sessionStorage.getItem('locName'));
  this.deptId=Number(sessionStorage.getItem('dept'));
  this.emplId= Number(sessionStorage.getItem('emplId'));
  this.divisionId = Number(sessionStorage.getItem('divisionId'));
  this.orgId=this.ouId;
  console.log(this.loginArray);
  console.log(this.locId);

  this.service.AmcSchemeList()
  .subscribe(
  data => {
    this.lstAmcSchemeList = data
    console.log(this.lstAmcSchemeList);
  }
);
}



resetMast() {
  window.location.reload();
}

closeMast() {
  this.router.navigate(['admin']);
}

      serchByRegNo(mRegNo) {
       
        var mreg=this.amcEnrollmentForm.get('regNo').value
        alert(mreg);
        this.service.getVehRegDetails(mreg)
          .subscribe(
            data => {
              this.getVehRegDetails = data;

              if(this.getVehRegDetails !=null){
              console.log(this.getVehRegDetails);

              this.amcEnrollmentForm.patchValue({
                customerId: this.getVehRegDetails.customerId,
              });
              // this.enableCustAccount = false;
              this.GetCustomerDetails(this.getVehRegDetails.customerId);
              this.GetCustomerSiteDetails(this.getVehRegDetails.customerId);
            }  else { alert("Vehicle Regno. Not Found...."); this.resetMast(); }

            });
          
      }

      GetCustomerDetails(mCustId: any) {
        // alert("Customer Id: "+mCustId);
        this.service.ewInsSiteList(mCustId)
          .subscribe(
            data1 => {
              this.CustomerDetailsList = data1;
              console.log(this.CustomerDetailsList);
              this.amcEnrollmentForm.patchValue({
                custAccountNo: this.CustomerDetailsList.custAccountNo,
                custName: this.CustomerDetailsList.custName,
              });
            });
      }


        GetCustomerSiteDetails(mCustId: any) {
          // alert("Customer Id: "+mCustId);
          this.service.GetCustomerSiteDetails(mCustId, this.ouId)
            .subscribe(
              data1 => {
                this.CustomerSiteDetails = data1;

                if (this.CustomerSiteDetails === null) { alert("Customer Site [" + this.ouId + "] Not Found in Site Master.....\nPlease check and try again...."); this.resetMast(); }
                else if (this.CustomerSiteDetails.taxCategoryName === null) { alert("Tax Category not attached to  this customer.Pls Update Tax category for this customer."); this.resetMast(); }
                else {
                  // this.dispCustButton=true;
                  console.log(this.CustomerSiteDetails);
                  // alert("Tds% :"+this.CustomerSiteDetails.customerId.tdsPer);
                  this.amcEnrollmentForm.patchValue({
                    customerSiteId: this.CustomerSiteDetails.customerSiteId,
                    customerSiteAddress: this.CustomerSiteDetails.address1 + "," +
                      this.CustomerSiteDetails.address2 + "," +
                      this.CustomerSiteDetails.address3 + "," +
                      this.CustomerSiteDetails.location,
                    custCity: this.CustomerSiteDetails.city,
                    custState: this.CustomerSiteDetails.state,
                    custPincode: this.CustomerSiteDetails.pinCd,
                    customerGstNo: this.CustomerSiteDetails.gstNo,
                    customerPanNo: this.CustomerSiteDetails.panNo,
                    customerTanNo: this.CustomerSiteDetails.tanNo,
                    custPhone: this.CustomerSiteDetails.mobile1,
                    customerType: this.CustomerSiteDetails.customerId.custType,
                    custTaxCategoryName: this.CustomerSiteDetails.taxCategoryName,
                    custTdsPer: this.CustomerSiteDetails.customerId.tdsPer,
                  });

                }
              });
        }


       

        onSelectAmcScheme(schNo){
        this.service.AmcSchemeDetails(schNo)
        .subscribe(
          data => {
            this.lstAmcSchLineDetails = data.schCoupLst;
            console.log(this.lstAmcSchLineDetails);
            var len = this.lineDetailsArray().length;
              for (let i = 0; i < this.lstAmcSchLineDetails.length - len; i++) {
              var invLnGrp: FormGroup = this.lineDetailsGroup();
              this.lineDetailsArray().push(invLnGrp);

            }
            this.amcEnrollmentForm.get('amcItemList').patchValue(this.lstAmcSchLineDetails);
          });}

}
