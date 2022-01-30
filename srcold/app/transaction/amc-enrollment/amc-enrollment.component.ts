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
import { ServiceService } from 'src/app/service/service.service';
import { trigger } from '@angular/animations';

interface IAmcEnroll {  
  enrollmentNo :string;
  enrollmentDate:Date;
  srvAdvisor:number;
  regNo:string;
  contactNo:string;
  custAddress:string;

  schemeGrp:string;
  schemeId:number;
  schemeNumber :string;
  schemeDesc:string;
  startDate:Date;
  endDate :Date;
  currentKms:number;
  schemeValidKm:number;
  discOnMatrl:number;
  discOnLabour:number;

  schemeValidYears:number;
  gracePeriod:number;
  totalPeriod:number;
}

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
  lstcomments:any;
  public srvAdvisorList: any[];
   
  lstAmcSchemeList:any[];
  lstAmcSchLineDetails:any[];
  lstAmcSchHeaderDetails:any;
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

  enrollmentNo :string;
  // enrollmentDate:Date;
  enrollmentDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  srvAdvisor:number;
  regNo:string;
  contactNo:string;
  custAddress:string;

  schemeGrp:string;
  schemeId:number;
  schemeNumber :string;
  schemeDesc:string;
  startDate:Date;
  endDate :Date;
  currentKms:number;
  schemeValidKm:number;
  discOnMatrl:number;
  discOnLabour:number;

  schemeValidYears:number;
  gracePeriod:number;
  totalPeriod:number;


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

  
  amcLabBasicAmt:number=0;
  amcLabDiscount:number=0;
  amcLabTax:number=0;
  amcLabTotal:number=0;
  amcMatBasicAmt:number=0;
  amcMatDiscount:number=0;
  amdMatTax:number=0;
  amcMatTotal:number=0;
  amcSchemeTotal:number=0;

  disAmount:number;
  totAmtlab:number;
  totAmtmat:number;

  
  amcHeaderValidation =false;
  displayButton=true;

  constructor(private service: MasterService,private orderManagementService:OrderManagementService,private transactionService: TransactionService ,private serviceService: ServiceService, private  fb: FormBuilder, private router: Router) {
    this.amcEnrollmentForm = fb.group({

    loginArray:[''],
    loginName:[''],
    divisionId:[],
    ouName :[''],
    locId:[],
    locationId:[],
    locName :[''],
    ouId :[],
    deptId :[],
    emplId:[''],
    orgId:[''],

    enrollmentNo :[],
    enrollmentDate:[],
    srvAdvisor:[],
    regNo:[],

    // custNo :[],
    contactNo:[],
    custAddress:[],

    schemeId:[],
    schemeGrp:[],
    schemeNumber :[],
    schemeDesc:[],
    startDate:[],
    endDate :[],
    currentKms:[],
    schemeValidKm:[],
    discOnMatrl:[],
    discOnLabour:[],

    schemeValidYears:[],
    gracePeriod:[],
    totalPeriod:[],


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

    amcLabBasicAmt:[],
    amcLabDiscount:[],
    amcLabTax:[],
    amcLabTotal:[],
    amcMatBasicAmt:[],
    amcMatDiscount:[],
    amdMatTax:[],
    amcMatTotal:[],
    amcSchemeTotal:[],

    disAmount:[],
    totAmtlab:[],
    totAmtmat:[],

    utilQty:[],
    balQty:[],
  
    amcItemList: this.fb.array([this.lineDetailsGroup()])   

  });
}

lineDetailsGroup() {
  return this.fb.group({ 
  itemId:[''],
  schCoupId:[],
  couponId:[''],
  couponNumber:[''],
  couponDesc :['', [Validators.required]],    
  quantity:['', [Validators.required]],
  unitPrice:['', [Validators.required]],
  amount:['', [Validators.required]],
  disc:[],
  net:[],
  tax:[],
  total:['', [Validators.required]],
  couponCode:[],
  gstpercentage:[],
  couponActualCode:[],
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

this.serviceService.srvAdvisorListFN((sessionStorage.getItem('locId')), 'Service')
.subscribe(
  data1 => {
    this.srvAdvisorList = data1;
    console.log(this.srvAdvisorList);
  }
);

}



resetMast() {
  window.location.reload();
}

closeMast() {
  this.router.navigate(['admin']);
}

      serchByRegNo(mreg) {
       
        var mRegNo=this.amcEnrollmentForm.get('regNo').value
        if(mRegNo ===null || mRegNo ===undefined || mRegNo.trim() ===''){
          alert ("Please Enter Vehicle Registration No...");return;
         }
         mRegNo=mRegNo.toUpperCase();

        //  alert ("Reg No :" +mRegNo)

        this.service.getVehRegDetails(mRegNo)
          .subscribe(
            data => {
              this.getVehRegDetails = data;

              if(this.getVehRegDetails !=null){
              console.log(this.getVehRegDetails);

              this.amcEnrollmentForm.patchValue({
                customerId: this.getVehRegDetails.customerId,
                regNo :mRegNo,
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
          if(this.displayButton) {          
          if(schNo !=null) {
            // alert (this.customerId)
          if(this.customerId >0) {

          let selectedValue = this.lstAmcSchemeList.find(v => v.schemeNumber === schNo);

          if( selectedValue != undefined){
             console.log(selectedValue);
         

        this.service.AmcSchemeDetails(schNo)
        .subscribe(
          data => {
            this.lstAmcSchLineDetails = data.amcItemList;
            this.lstAmcSchHeaderDetails=data;
            console.log(this.lstAmcSchLineDetails);
            console.log(this.lstAmcSchHeaderDetails);
            this.showAmcPaymentDetails()
            var len = this.lineDetailsArray().length;
              for (let i = 0; i < this.lstAmcSchLineDetails.length - len; i++) {
              var invLnGrp: FormGroup = this.lineDetailsGroup();
              this.lineDetailsArray().push(invLnGrp);
            }
            this.amcEnrollmentForm.get('amcItemList').patchValue(this.lstAmcSchLineDetails);
            
          });
         } else {alert ("Please Enter Customer Vehilcle Registration no. and proceed."); 
                this.amcEnrollmentForm.get('schemeNumber').reset();}
                this.schemeDesc=selectedValue.schemeDesc;
          } else {this.schemeDesc=null;}
        } 
        }
      }


          showAmcPaymentDetails(){

                // alert ("this.lstAmcSchHeaderDetails.amcLabBasicAmt : "+this.lstAmcSchHeaderDetails.amcLabBasicAmt)    
                this.amcEnrollmentForm.patchValue({

                  startDate: this.lstAmcSchHeaderDetails.startDate,
                  schemeValidKm: this.lstAmcSchHeaderDetails.schemeValidKm,

                  schemeValidYears: this.lstAmcSchHeaderDetails.schemeValidYears,
                  gracePeriod: this.lstAmcSchHeaderDetails.gracePeriod,
                  totalPeriod: this.lstAmcSchHeaderDetails.totalPeriod,
                  
                  discOnMatrl: Math.round((this.lstAmcSchHeaderDetails.discOnMaterial+Number.EPSILON)*100)/100,
                  discOnLabour: Math.round((this.lstAmcSchHeaderDetails.discOnLabour+Number.EPSILON)*100)/100,
                 

                  amcLabBasicAmt: Math.round((this.lstAmcSchHeaderDetails.amcLabBasicAmt+Number.EPSILON)*100)/100,
                  amcLabDiscount: Math.round((this.lstAmcSchHeaderDetails.amcLabDiscount+Number.EPSILON)*100)/100,
                 

                  amcLabTax: Math.round((this.lstAmcSchHeaderDetails.amcLabTax+Number.EPSILON)*100)/100,
                  amcLabTotal: Math.round((this.lstAmcSchHeaderDetails.amcLabTotal+Number.EPSILON)*100)/100,
                 
                  // amcLabBasicAmt: Math.round((this.lstAmcSchHeaderDetails.amcLabBasicAmt+Number.EPSILON)*100)/100,
                  // amcLabDiscount: Math.round((this.lstAmcSchHeaderDetails.amcLabDiscount+Number.EPSILON)*100)/100,
                 
                  // amcLabBasicAmt: Math.round((this.lstAmcSchHeaderDetails.amcLabBasicAmt+Number.EPSILON)*100)/100,
                  // amcLabDiscount: Math.round((this.lstAmcSchHeaderDetails.amcLabDiscount+Number.EPSILON)*100)/100,
                 
                  amdMatTax: Math.round((this.lstAmcSchHeaderDetails.amdMatTax+Number.EPSILON)*100)/100,
                  amcMatTotal: Math.round((this.lstAmcSchHeaderDetails.amcMatTotal+Number.EPSILON)*100)/100,
                  amcSchemeTotal: Math.round((this.lstAmcSchHeaderDetails.amcSchemeTotal+Number.EPSILON)*100)/100,
                 });
               
          }

                    
          transeData(val) {

            delete val.loginArray;
            delete val.loginName;
            delete val.locName;
            delete val.ouName;
            delete val.locationId;
            // delete val.ouId;
            delete val.deptId;
            // delete val.emplId;
            delete val.orgId;

          return val;
          }


          newMast() {
            const formValue: IAmcEnroll =this.transeData(this.amcEnrollmentForm.value);
              this.checkAmcHeaderValidations();
            if(this.amcHeaderValidation) {
            this.service.AmcEnrollMasterSubmit(formValue).subscribe((res: any) => {
              if (res.code === 200) {
                alert('RECORD INSERTED SUCCESSFUILY');
                // this.mcpPackageMasterForm.reset();
                 this.enrollmentNo=  res.obj.enrollmentNo
                this.displayButton=false;
                this.amcEnrollmentForm.disable();
              } else {
                if (res.code === 400) {
                  alert('ERROR WHILE INSERTING');
                  // this.amcSchemeMasterForm.reset();
                }
              }
            });
          }
          }


          validateStartKms(){
            var startKm =this.amcEnrollmentForm.get('currentKms').value;
            var endKm=this.amcEnrollmentForm.get('schemeValidKm').value;
            // alert (startKm +" ," + endKm);

            if(startKm >=endKm || startKm <=0) { alert ("Enter Valid Start Kilomoeter Reading...") ;
             this.amcEnrollmentForm.patchValue({currentKms:0});return;
             }

          }

          
  checkAmcHeaderValidations()
  {
       const formValue: IAmcEnroll = this.amcEnrollmentForm.value;
    
      if(formValue.regNo===undefined || formValue.regNo===null  || formValue.regNo.trim()==='' ) {
          this.amcHeaderValidation=false;
          alert ("VEHICLE REG NO: Should not be null value");
          return; 
      }

      if(formValue.schemeNumber===undefined || formValue.schemeNumber===null  || formValue.schemeNumber.trim()==='' ) {
        this.amcHeaderValidation=false;
        alert ("SCEHME NUMBER: Should not be null value");
        return; 
      }
     
     

      if(formValue.currentKms===undefined || formValue.currentKms===null  || formValue.currentKms<=0 ) {
        this.amcHeaderValidation=false;
        alert ("CURRENT KILOMETER READING: Should be above zero");
        return; 
      }

     

      if(formValue.srvAdvisor===undefined || formValue.srvAdvisor===null  || formValue.srvAdvisor <=0 ) {
        this.amcHeaderValidation=false;
        alert ("SERVICE ADVISOR: Should not be null value");
        return; 
      }

      this.amcHeaderValidation=true;

    }


    SearchByEnrollNo(x) {

      var enrollNum =this.amcEnrollmentForm.get('enrollmentNo').value
      if(enrollNum ===undefined || enrollNum===null || enrollNum.trim()==='') {
        alert ("Please enter valid Amc Enrollment Number and Proceed...");return;
      }
     
      this.displayButton=false;
      enrollNum=enrollNum.toUpperCase();
      this.service.AmcEnrollmentDetails(enrollNum)
      .subscribe(
        data => {
          this.lstcomments = data;
          if(data !=null) {
          console.log(this.lstcomments);
          var control = this.amcEnrollmentForm.get('amcItemList') as FormArray;
          this.lineDetailsArray().clear();
          
          for (let i=0; i<this.lstcomments.amcItemList.length;i++)
            {
              var amcItemList:FormGroup=this.lineDetailsGroup();
              control.push(amcItemList);
            }
            this.amcEnrollmentForm.patchValue(this.lstcomments);
            this.GetCustomerDetails(this.lstcomments.customerId);
            this.GetCustomerSiteDetails(this.lstcomments.customerId);
           
         }  else { alert ("No Data found....");}
        } ); 
    
    }


}
