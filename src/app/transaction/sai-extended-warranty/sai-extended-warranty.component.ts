import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NumberValueAccessor, MaxLengthValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators , FormArray } from '@angular/forms';
import { MasterService } from '../../master/master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InteractionModeRegistry } from 'chart.js';
import { now } from 'jquery';
// import { OrderManagementService } from 'src/app/order-management/order-management.service';


interface IExtendedWarranty {
  regNo: string;

}

@Component({
  selector: 'app-sai-extended-warranty',
  templateUrl: './sai-extended-warranty.component.html',
  styleUrls: ['./sai-extended-warranty.component.css']
})
export class SaiExtendedWarrantyComponent implements OnInit {
  saiEwForm : FormGroup;

  public PaymentModeList    : Array<string> = [];
  public ReceiptMethodList  : Array<string> = [];
  public EwTypeList         : Array<string>=[];
  public OUIdList           : Array<string> = [];
  public EwSourceList       : Array<string> = [];
  public issueByList        : Array<string> = [];
  public VehRegNoList       : Array<string> = [];
  public VehVinList         : Array<string> = [];
  public EwSchemeItemList   : Array<string> = [];
  public ewInsNameList      : Array<string> = [];

  public ItemEWList         : Array<string> = [];
  
  pipe = new DatePipe('en-US');

  invItemListEw: any;
  VehicleRegDetails:any;
  EWItemList: any;
  ItemDetailList:any;
  CustomerDetailsList:any;
  variantDetailsList:any;
  getVehRegDetails:any;
  getVehVinDetails:any;
  lstEwSchemeDetails:any;
  lstcomments: any[];
  
  userList1: any[] = [];
  lastkeydown1: number = 0;

  loginName:string;
  loginArray:string;
  name:string;
  ouName : string;
  locId: number;
  locName : string;
  orgId:number;
  ouId :number;
  deptId:number; 
  divisionId:number;
 // emplId :number;
  public emplId =6;
  public varAging : number;
  ddate= Date.now();
  

  ///////////////////////////
  ewStatus:string;
  ewStatusBookletno:string;
  ewStatusStartDate: string;
  ewStatusPeriod:number;

  ewInvoiceNo:string;
  regNo: string;
  ewId:number;
  ewSchemeId:number;
  ewBookletNo:string;
  
  vehRegNo:string;
  vehicleId:string;
  ewItemCode:string;
  itemId:number;
  itemDesc:string;

  fuelType :string;
  variant:string ;
  variantDesc:string;
  chassisNo:string;
  engineNo:string;
  serviceModel:string;
  deliveryDate:string;
  dealerCode:string;
  kmsEwSale:string;
  soldByEmpId : string;
  custId:number;
  custAccountNo:number;
  dmsCustNo:number;
  custName:string;

  ewPeriod:number;
  warrantyDealer:string;
  vehicleAgeDays:number;
  paytmentSource:string;
  ewType:string;
  ewInsurerId : number;
  ewInsurerSiteId:number;

  ewSchemeAmt:number;
  ewDiscAmt:number;
  ewTotalAmt:number;

  // ewSaleDate:Date;
  segment: string;
  
  
  now = Date.now();
  ewSaleDate = this.pipe.transform(this.now, 'y-MM-dd');

  ewStartDate :Date
  ewEndDate:Date

  payType:number;
  receiptMethodId:number;
  paymentAmt:number;
  bankName:string;
  bankBranch:string;
  checkNo:string;
  checkDate:string;

  displayInactive = true;
  Status1: any;
  inactiveDate: Date;
  display = true;
  displayButton = true;
  showBankDetails=false;
  showCancelDetails=false;
  displaySuccess=false;

  variantItemId : number;

  // ewCancelDate:Date;
  ewCancelDate = this.pipe.transform(this.now, 'y-MM-dd');
  ewCancelReason:string;


  get f() { return this.saiEwForm.controls; }

  saiEw(saiEwForm:any) {  }

      constructor(private service: MasterService,private  fb: FormBuilder, private router: Router) { 
        this.saiEwForm = fb.group({ 

      loginArray:[''],
      loginName:[''],
      ouName :[''],
      locId:[''],
      locName :[''],
      ouId :[],
      deptId :[],
      emplId:[''],
      orgId:[],
      divisionId:[],

      
      regNo:[],
      ewId:[],
      ewSchemeId:[],
      // ewDate:[],
      ewBookletNo:[],

      vehRegNo:[],
      vehicleId:[],
      itemId:[],
      itemDesc:[],

      fuelType :[],
      variant:[],
      variantDesc:[],

      chassisNo:[],
      engineNo:[],
      serviceModel:[],

      deliveryDate:[],
      dealerCode:[],
      warrantyDealer:[],

      custId:[],
      custAccountNo:[],
      dmsCustNo:[],
      custName:[],
      // dealerCode:[],
      ewPeriod:[],

      paytmentSource :[],
      kmsEwSale:[],
      soldByEmpId:[],

      ewType:[],
      ewInsurerId : [],
      ewInsurerSiteId:[],
      // itemId: [],

      ewSchemeAmt:[],
      ewDiscAmt:[],
      ewTotalAmt:[],

      ewSaleDate:[],
      ewStartDate:[],
      ewEndDate:[],

      payType:[],
      receiptMethodId:[],
      paymentAmt:[],
      bankName:[],
      bankBranch:[],
      checkNo:[],
      checkDate:[],

      ewInvoiceNo:[],
      vehicleAgeDays:[],
      ewItemCode:[],

      variantItemId:[],
      segment :[],
      ewStatus:[],
      ewStatusBookletno:[],
      ewStatusStartDate:[],
      ewStatusPeriod:[],

      ewCancelDate:[],
      ewCancelReason:[],

      });

      }

        ngOnInit(): void {

          this.name=  sessionStorage.getItem('name');
          this.loginArray=sessionStorage.getItem('divisionName');
          this.divisionId=Number(sessionStorage.getItem('divisionId'));
          this.loginName=sessionStorage.getItem('name');
          this.ouName = (sessionStorage.getItem('ouName'));
          this.ouId=Number(sessionStorage.getItem('ouId'));
          this.locId=Number(sessionStorage.getItem('locId'));
          // this.locName=(sessionStorage.getItem('locName'));
          this.deptId=Number(sessionStorage.getItem('dept'));
          // this.emplId= Number(sessionStorage.getItem('emplId'));
         
          this.orgId=this.ouId;
          console.log(this.loginArray);
          console.log(this.locId);
          // console.log(this.orgId);
          // this.ewInsuranceId=this.ouId;

          
          this.service.PaymentModeList()
          .subscribe(
            data => {
              this.PaymentModeList = data;
              console.log(this.PaymentModeList);
            }
          );

          this.service.OUIdList()
          .subscribe(
            data => {
              this.OUIdList = data;
              console.log(this.OUIdList);
            }
          );

          this.service.EwTypeList()
          .subscribe(
            data => {
              this.EwTypeList = data;
              console.log(this.EwTypeList);
            }
          );

          this.service.EwSourceList()
          .subscribe(
            data => {
              this.EwSourceList = data;
              console.log(this.EwSourceList);
            }
          );

          this.service.ewInsNameList()
          .subscribe(
            data => {
              this.ewInsNameList = data;
              console.log(this.ewInsNameList);
            }
          );


          this.service.issueByList(this.locId,this.deptId,this.divisionId)
           .subscribe(
           data => {
              this.issueByList = data;
              console.log(this.issueByList);
            });

            this.service.RegNoListFN()
            .subscribe(
              data1 => {
                this.VehRegNoList = data1;
                console.log(this.VehRegNoList);
              }
            ); 

            this.service.VehVinList()
            .subscribe(
              data1 => {
                this.VehVinList = data1;
                console.log(this.VehVinList);
              }
            ); 
            
            this.service.itemIdList()
            .subscribe(
              data => {
                this.ItemEWList = data;
                console.log(this.ItemEWList);
        }
        );


      }
            

        // ========================================================

            

        onEwInsurerSalected(mInsurerId : any){
          this.ewInsurerSiteId=mInsurerId;
          // alert("ins Site Id :" + this.ewInsurerSiteId);
        }

        GetCustomerDetails(mCustId :any){
              // alert("Customer Id: "+mCustId);
            this.service.ewInsSiteList(mCustId)
            .subscribe(
              data1 => {
                this.CustomerDetailsList = data1;
                console.log(this.CustomerDetailsList);
                this.saiEwForm.patchValue({
                  custAccountNo:this.CustomerDetailsList.custAccountNo,
                  custName: this.CustomerDetailsList.custName,
              });
              }
            );  
          }

        onEnterKms(mKms : any)
        {
          // alert(this.variant +","+this.vehicleAgeDays+","+mKms);

          if(mKms<0) {
            alert("Please Enter valid KM Readiing value")
          } else {
          this.LoadEWSchemeVariant(this.variant,this.vehicleAgeDays,mKms);
          }
        }

        LoadEWSchemeVariant(mVariant,mAging,mKmsCurr){
          // alert(mVariant+","+mAging+","+mKmsCurr);
            this.service.EwSchemeItemList(mVariant, this.ouId,mAging,mKmsCurr)
            .subscribe(
              data1 => {
                this.EwSchemeItemList = data1;
                console.log(this.EwSchemeItemList);

              }
            );  
        }

        GetSchemeDetails(mSchemeId){
          // alert("mscheme id :" + mSchemeId);
          if(mSchemeId !=null) {
          this.service.getEWSchemeDetails(mSchemeId)
          .subscribe(
            data => {
              this.lstEwSchemeDetails = data;
              console.log(this.lstEwSchemeDetails);

              this.saiEwForm.patchValue({
                ewSchemeAmt: this.lstEwSchemeDetails.schemeAmount,
                ewPeriod :this.lstEwSchemeDetails.premiumPeriod,
                ewType:this.lstEwSchemeDetails.ewType,
           });

           this.GetEWitemList(this.ewType, this.variant,this.ewPeriod)
           
         }
          );
        } else{}
        }

        GetEWitemList(e,v,p) {
        // alert("evp= "+e +"," +v+","+p);

          this.service.invItemListEw( e, v,p)
          .subscribe(
            data => {
              this.invItemListEw = data;
              console.log(this.invItemListEw);
            }
          );}


        GetVariantDeatils(modelVariant){

          this.service.variantDetailsList(modelVariant)
          .subscribe(
            data => {
              this.variantDetailsList = data;
              console.log(this.variantDetailsList);
              
              this.saiEwForm.patchValue({
                serviceModel: this.variantDetailsList.serviceModel,

              });
            }
             );

        }

        GetItemDeatils1(mItemId){

          this.service.getItemDetail(mItemId)
          .subscribe(
            data => {
              this.ItemDetailList = data;
              console.log(this.ItemDetailList);
              
              this.saiEwForm.patchValue({
                // variantItemId: this.ItemDetailList.itemId,
                itemDesc: this.ItemDetailList.segment,
  
              });
            }
             );

        }

        GetItemDeatils2(mItemId){

          this.service.getItemDetail(mItemId)
          .subscribe(
            data => {
              this.ItemDetailList = data;
              console.log(this.ItemDetailList);
              
              this.saiEwForm.patchValue({
                   segment: this.ItemDetailList.segment,

              });
            }
             );

        }

        GetVehicleRegInfomation(mRegNo){
        this.service.getVehRegDetails(mRegNo)
          .subscribe(
            data => {
              this.VehicleRegDetails = data;
              console.log(this.VehicleRegDetails);
              this.saiEwForm.patchValue({
                vehicleId: this.VehicleRegDetails.vin,
                variantItemId: this.VehicleRegDetails.itemId.itemId,
        });
    
           this.GetItemDeatils1(this.variantItemId);
       
        
            }
             );
        }

        serchByRegNo(mRegNo) {

          // alert(mRegNo);
          this.service.getVehRegDetails(mRegNo)
          .subscribe(
            data => {
              this.getVehRegDetails = data;
              console.log(this.getVehRegDetails);

              this.saiEwForm.patchValue({
                fuelType: this.getVehRegDetails.fuelType,
                variant: this.getVehRegDetails.variantCode,
                variantDesc: this.getVehRegDetails.mainModel,
                chassisNo: this.getVehRegDetails.chassisNo,
                engineNo: this.getVehRegDetails.engineNo,
                deliveryDate: this.getVehRegDetails.vehicleDelvDate,
                dealerCode: this.getVehRegDetails.dealerCode,
                vehicleId: this.getVehRegDetails.vin,
                variantItemId: this.getVehRegDetails.itemId.itemId,
                itemDesc: this.getVehRegDetails.itemId.segment,
                custId: this.getVehRegDetails.customerId,
                ewStatus:this.getVehRegDetails.ewStatus,
                ewStatusBookletno:this.getVehRegDetails.ewBookletNo,
                ewStatusStartDate:this.getVehRegDetails.ewStartDate,
                ewStatusPeriod:this.getVehRegDetails.ewPeriod,
   
           });
           this.deliveryDate = this.pipe.transform(this.deliveryDate, 'y-MM-dd');
          //  this.LoadEWSchemeVariant(this.variant);
       
           this.GetVariantDeatils(this.variant);
           this.GetCustomerDetails(this.custId);

            var saleDate=new Date(this.deliveryDate);
            var mToday   = new Date(Date.now());

            if(this.ewStatus==='Active'){
              alert("Extended Warranty is Active for the Vehicle : "+mRegNo +
              "\nEW BookletNo  : "+this.ewStatusBookletno +
              "\nEW Start Date : "+this.ewStatusStartDate+
              "\nEW Period     : "+this.ewStatusPeriod)
              this.resetMast();
            }
        
             this.getDiffDays(saleDate,mToday);
          
         }
          );

        }

        getDiffDays(date1 ,date2){

            date1 = new Date(date1);
            date2 = new Date(date2);
        //  date2 = this.pipe.transform(date2, 'y-MM-dd');
           var mDays1=date2.getTime()-date1.getTime();
           var mDays2=mDays1 / (1000 * 3600 * 24);
           var mDays3=Math.round(mDays2 - 0.5)

           if (mDays3<=7)  {this.paytmentSource ='SALES'} 
           else if (mDays3<=730) {this.paytmentSource ='SERVICE'} 
           else {
             alert("VEHICLE SALE DATE :"+this.pipe.transform(date1,'dd/MM/y') + " AGING : "+ mDays3 +" DAYS...NOT ELIGIBLE FOR AVAILING EXTENDED WARRANTY")
             this.resetMast();
            }
          this.vehicleAgeDays=mDays3;
        }


        serchByVin(mVin) {
          // alert(mVin);
          this.service.getVehVinDetails(mVin)
          .subscribe(
            data => {
              this.getVehVinDetails = data;
              console.log(this.getVehVinDetails);

              this.saiEwForm.patchValue({
                fuelType: this.getVehVinDetails.fuelType,
                variant: this.getVehVinDetails.variantCode,
                variantDesc: this.getVehVinDetails.mainModel,
                chassisNo: this.getVehVinDetails.chassisNo,
                engineNo: this.getVehVinDetails.engineNo,
                deliveryDate: this.getVehVinDetails.vehicleDelvDate,
                dealerCode: this.getVehVinDetails.dealerCode,
                vehRegNo: this.getVehVinDetails.regNo,
                itemDesc: this.getVehVinDetails.itemId.segment,
                variantItemId: this.getVehVinDetails.itemId.itemId,
                custId: this.getVehVinDetails.customerId,
                ewStatus:this.getVehVinDetails.ewStatus,
                ewStatusBookletno:this.getVehVinDetails.ewBookletNo,
                ewStatusStartDate:this.getVehVinDetails.ewStartDate,
                ewStatusPeriod:this.getVehVinDetails.ewPeriod,
           });
           this.deliveryDate = this.pipe.transform(this.deliveryDate, 'y-MM-dd');
          //  alert(this.deliveryDate);
           this.GetVariantDeatils(this.variant);
           this.GetCustomerDetails(this.custId);

            var saleDate=new Date(this.deliveryDate);
            var mToday   = new Date(Date.now());

            if(this.ewStatus==='Active'){
              alert("Extended Warranty is Active for the Vehicle : "+mVin+" ("+this.vehRegNo +")"+
              "\nEW BookletNo  : "+this.ewStatusBookletno +
              "\nEW Start Date : "+this.ewStatusStartDate+
              "\nEW Period     : "+this.ewStatusPeriod)
              this.resetMast();
            }

              this.getDiffDays(saleDate,mToday);
         } );
        }

        
        getUserIdsFirstWayVin($event) {
        
          let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
          this.userList1 = [];
      
          if (userId.length > 2) {
            if ($event.timeStamp - this.lastkeydown1 > 200) {
              this.userList1 = this.searchFromArray(this.VehVinList, userId);
            }
          }
        }


        getUserIdsFirstWay($event) {
          let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
          this.userList1 = [];
      
          if (userId.length > 2) {
            if ($event.timeStamp - this.lastkeydown1 > 200) {
              this.userList1 = this.searchFromArray(this.VehRegNoList, userId);
            }
          }
        }

       

        onPayTypeSelected(payType : any  , rmStatus : any){
          // alert('paytype =' +payType  + " LocId :"+ this.locId + " Ou Id :"+this.ouId + " Deptid : "+ this.deptId + " Status :"+rmStatus);
      
            if (payType === 'CASH') {   
              // alert("checque seleected")   ;    
                this.service.ReceiptMethodList(payType ,this.locId,rmStatus)
                .subscribe(
                  data => {
                    this.ReceiptMethodList = data.obj;
                    console.log(this.ReceiptMethodList);
                    this.showBankDetails=false;
                  }
                );
                } else{
      
                  // alert("cash selected");
                this.service.ReceiptMethodList(payType ,this.ouId,rmStatus)
                .subscribe(
                  data => {
                    this.ReceiptMethodList = data.obj;
                    console.log(this.ReceiptMethodList);
                    this.showBankDetails=true;
              });
            }
          
        }

        cancelEW(){alert("Cancel ....Selected...in.wip");}

      
        searchMast() {
          this.service.getEWCustomerSearch()
            .subscribe(
              data => {
                this.lstcomments = data;
                console.log(this.lstcomments);
              }
            );
           }




        Select(ewId: number) {
       
          this.saiEwForm.reset();
         
          let select = this.lstcomments.find(d => d.ewId === ewId);
          if (select) {
            this.saiEwForm.patchValue(select);
            // this.ewId = select.ewId;

            this.GetVariantDeatils(this.variant);
            this.GetCustomerDetails(this.custId);
            this.GetVehicleRegInfomation(this.vehRegNo);
            this.GetItemDeatils2(select.itemId);
            this.getDiffDays(this.deliveryDate,this.ewSaleDate);
            this.LoadEWSchemeVariant(this.variant,this.vehicleAgeDays,this.kmsEwSale);

            this.ewId = select.ewId;
            this.deliveryDate = this.pipe.transform(this.deliveryDate, 'y-MM-dd');

            this.displayButton = false;
            this.showCancelDetails=true;

            // this.premiumPeriod=select.premiumPeriod;
         }
         
        }

        transeData(val) 
        {
 
          delete val.divisionId;
          delete val.division;
          delete val.loginArray;
          delete val.loginName;
          delete val.ouName;
          delete val.locName;
          delete val.deptId;
          delete val.orgId;
          delete val.emplId;
          delete val.regNo;
          delete val.vehicleId;
          delete val.serviceModel;
          delete val.warrantyDealer;
          delete val.custAccountNo;
          delete val.ewDiscAmt;
          delete val.ewTotalAmt;
          delete val.itemDesc;
          delete val.variantItemId;
          delete val.segment;
          delete val.vehicleAgeDays;
          delete val.ewItemCode;
          delete val.ewStatus;

          return val;
        }


        newMast() {
          alert ("Posting data  to EW SCHEME TABLE......")
         
  
          // const formValue: IPaymentRcpt =this.paymentReceiptForm.value;
        
          const formValue: IExtendedWarranty =this.transeData(this.saiEwForm.value);
         
         
          // debugger;
          console.log(formValue);
          this.service.SaiEwCustomerSubmit(formValue).subscribe((res: any) => {
            if (res.code === 200) {
              alert('RECORD INSERTED SUCCESSFUILY');
              this.displaySuccess=true;
              // this.saiEwSchemeMasterForm.reset();
              window.location.reload();
            } else {
              if (res.code === 400) {
                this.displaySuccess=false;
                alert('Code already present in the data base');
                this.saiEwForm.reset();
              }
            }
          });
        }
  
        updateMast() {
          alert ("Putting data  to EW SCHEME......")
          const formValue: IExtendedWarranty =this.transeData(this.saiEwForm.value);
          
            this.service.UpdateSaiEwCustomer(formValue).subscribe((res: any) => {
            if (res.code === 200) {
              alert('RECORD UPDATED SUCCESSFUILY');
              window.location.reload();
            } else {
              if (res.code === 400) {
                alert('ERROR OCCOURED IN PROCEESS');
                this.saiEwForm.reset();
              }
            }
          });
        }

        resetMast() {
          window.location.reload();
        }
      
        closeMast() {
          this.router.navigate(['admin']);
        }



 onOptioninvItemIdSelectedSingle(itemId) {
 
    //  alert('item function');
      let selectedValue = this.invItemListEw.find(v => v.segment == itemId);
      if( selectedValue != undefined){
      alert(selectedValue.itemId);
      console.log(selectedValue);
      this.itemId = selectedValue.itemId;
      // this.itemName=selectedValue.description;
      this.segment=selectedValue.segment;
    }
  }

getInvItemId($event) {
    let userId = (<HTMLInputElement>document.getElementById('invItemIdFirstWay')).value;
    this.userList1 = [];

    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList1 = this.searchFromArray(this.invItemListEw, userId);
      }
    }
  }
        
        
  searchFromArray(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };
  
  

}
