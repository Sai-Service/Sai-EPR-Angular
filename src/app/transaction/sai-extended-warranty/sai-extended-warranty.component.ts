import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NumberValueAccessor, MaxLengthValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators , FormArray } from '@angular/forms';
import { MasterService } from '../../master/master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InteractionModeRegistry } from 'chart.js';
import { now } from 'jquery';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MAT_DIALOG_DATA } from "@angular/material/dialog";


interface IExtendedWarranty {
  custId:number;
  kmsEwSale: number;
  soldByEmpId : number;
  variant:string;
  deliveryDate:Date;
  ewSchemeId:number;
  ewBookletNo:string;
  itemId:number;
  ewInsurerId:number;
  ewSaleDate:Date;
  ewStartDate :Date
  ewEndDate:Date
  payType:string;
  receiptMethodId:number;
  paymentAmt:number;
  bankName:string;
  bankBranch:string;
  checkNo:string;
  checkDate:string;
  customerSiteId:number;

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

  invItemListEw: any[];
  VehicleRegDetails:any;
  EWItemList: any;
  ItemDetailList:any;
  CustomerDetailsList:any;
  variantDetailsList:any;
  ewReceiptDeails:any
  getVehRegDetails:any;
  getVehVinDetails:any;
  lstEwSchemeDetails:any;
  EwStatusDetails:any;
  CustomerSiteDetails:any;
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
  isEwActive  = false;

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
  kmsEwSale:number;
  soldByEmpId : number;
  custId:number; customerSiteId:number;
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
  // ewStartDate = this.pipe.transform(this.now, 'y-MM-dd');
  // ewEndDate = this.pipe.transform(this.now, 'y-MM-dd');
  ewStartDate :string;
  ewEndDate:string;

  receiptNumber:number;
  payType:string;
  receiptMethodId:number;
  paymentAmt:number;
  bankName:string;
  bankBranch:string;
  checkNo:string;
  checkDate:string;

  checkValidation=false;
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
      customerSiteId:[],
      custAccountNo:[],
      dmsCustNo:['',Validators.required,  Validators.pattern('^[a-zA-Z0-9]')],
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

      receiptNumber:[],
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
      isEwActive:[],
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

      

        onEnterKms(mKms : any)
        {
         if(mKms>0 && this.variant !=null ) { this.LoadEWSchemeVariant(this.variant,this.vehicleAgeDays,mKms);} 
         else {alert("Invalid KM Readiing / Model Variant....Please check")  }
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
          if(mSchemeId !==null){
          this.service.getEWSchemeDetails(mSchemeId)
          .subscribe(
            data => {
              this.lstEwSchemeDetails = data;
              console.log(this.lstEwSchemeDetails);

              this.saiEwForm.patchValue({
                ewSchemeAmt: this.lstEwSchemeDetails.schemeAmount,
                ewPeriod :this.lstEwSchemeDetails.premiumPeriod,
                ewType:this.lstEwSchemeDetails.ewType,
                paymentAmt: this.lstEwSchemeDetails.schemeAmount,

                
           });
          //  alert(this.lstEwSchemeDetails.schemeAmount+","+this.lstEwSchemeDetails.premiumPeriod);

           this.GetEWitemList(this.ewType, this.variant,this.ewPeriod)

           var saleDate1=new Date(this.deliveryDate);
           var ew2;
           var ew3;
           var yPeriod =this.ewPeriod;
         
           ew2=this.addDays(saleDate1,730);
           this.ewStartDate=this.pipe.transform(ew2, 'y-MM-dd');

           var ewStDate=new Date(this.ewStartDate);
           ew3=this.addDays(ewStDate,yPeriod*365);
          //  alert("EW2 : "+ew2 + "   EW3: "+ew3);
           this.ewEndDate=this.pipe.transform(ew3, 'y-MM-dd');
          });
        } else {}

        }

        GetEWitemList(e,v,p) {
        // alert("evp= "+e +"," +v+","+p);
          this.service.invItemListEw( e, v,p)
          .subscribe(
            data => {
              this.invItemListEw = data;

              // alert("Length :"+  this.invItemListEw.length);
           
              if(this.invItemListEw.length>0 ) {
                console.log(this.invItemListEw);
              } 
              else 
              { 
                alert( "EW ITEM CODE Not Available for this Scheme-Model");
              }
            });
          }
        


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

        GetEwReceiptDetails(mEwId){
         
          this.service.getEWCustomerSearchByEWNo(mEwId)
          .subscribe(
            data => {
              this.ewReceiptDeails = data;
              console.log(this.ewReceiptDeails);
              
              this.saiEwForm.patchValue({
                receiptNumber: this.ewReceiptDeails.receiptNumber,
                payType: this.ewReceiptDeails.payType,
                receiptMethodId: this.ewReceiptDeails.receiptMethodId,
                bankName: this.ewReceiptDeails.bankName,
                bankBranch: this.ewReceiptDeails.bankBranch,
                checkNo: this.ewReceiptDeails.checkNo,
                checkDate: this.ewReceiptDeails.checkDate,

                

              });
              // alert("pay type ="+this.ewReceiptDeails.payType);
              // alert("BANK ="+this.ewReceiptDeails.bankName);
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


        getEwStatus(mRegNo:any) {
          // alert ("Reg No.....:"+mRegNo);
           this.service.getEWStatusVehcile(mRegNo)
          .subscribe(
            data => {
              this.EwStatusDetails = data
              // alert("this.EwStatusDetails :"+this.EwStatusDetails);
              if (this.EwStatusDetails===null) 
              {
                this.isEwActive=false; 
              } 
              else
              {
                console.log(this.EwStatusDetails);
                this.saiEwForm.patchValue({
                ewId:this.EwStatusDetails.ewId,
                ewInvoiceNo:this.EwStatusDetails.ewInvoiceNo,
                ewBookletNo:this.EwStatusDetails.ewBookletNo,
                ewSaleDate:this.EwStatusDetails.ewSaleDate,
                ewStartDate:this.EwStatusDetails.ewStartDate,
                ewEndDate:this.EwStatusDetails.ewEndDate,
                ewPeriod:this.EwStatusDetails.ewPeriod,
              });   
                this.isEwActive=true;
                alert("Extended Warranty is Active for the Vehicle : "+mRegNo +
                "\nEW Contract No  : "+this.ewId +
                "\nEW Invoice No  : "+this.ewInvoiceNo +
                "\nEW BookletNo  : "+this.ewBookletNo +
                "\nEW Start Date - End Date : "+this.pipe.transform(this.ewStartDate, 'dd-MM-y')+ " to "+this.pipe.transform(this.ewEndDate,'dd-MM-y')+
                "\nEW Term     : "+this.ewPeriod)
                this.resetMast();
                return;
                // this.pipe.transform(this.now, 'y-MM-dd');
            } 
              
            
         
        }); }


        serchByRegNo(mRegNo) {
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
                // ewStatus:this.getVehRegDetails.ewStatus,
                // ewStatusBookletno:this.getVehRegDetails.ewBookletNo,
                // ewStatusStartDate:this.getVehRegDetails.ewStartDate,
                // ewStatusPeriod:this.getVehRegDetails.ewPeriod,
         });
           this.deliveryDate = this.pipe.transform(this.deliveryDate, 'y-MM-dd');
           
           this.getEwStatus(mRegNo);
           this.GetVariantDeatils(this.variant);
           this.GetCustomerDetails(this.custId);
   
           if(this.isEwActive ==false) {
              this.GetCustomerSiteDetails(this.custId);
              var saleDate=new Date(this.deliveryDate);
              var mToday   = new Date(Date.now());
              this.getDiffDays(saleDate,mToday);

            } 
         }
          );
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


      GetCustomerSiteDetails(mCustId :any){
        // alert("Customer Id: "+mCustId);
      this.service.GetCustomerSiteDetails(mCustId,this.ouId)
      .subscribe(
        data1 => {
          this.CustomerSiteDetails = data1;

          if (this.CustomerSiteDetails===null) 
             {alert("Customer Site [" + this.ouId + "] Not Found in Site Master.....\nPlease check and try again....");this.resetMast();}
          else {
             console.log(this.CustomerSiteDetails);
             this.saiEwForm.patchValue({
              customerSiteId:this.CustomerSiteDetails.customerSiteId,
             });

            //  alert("Customer Site Found ...Site Id..."+this.customerSiteId)
          }

        }); 
       
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
          if (payType !==null) {
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

            this.GetEwReceiptDetails(ewId);
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
          this.CheckDataValidations();

          if (this.checkValidation===true) {
            alert("Data Validation Sucessfull....\nPosting data  to EW CUSTOMER TABLE")
            const formValue: IExtendedWarranty =this.transeData(this.saiEwForm.value);
            console.log(formValue);
            this.service.SaiEwCustomerSubmit(formValue).subscribe((res: any) => {
            if (res.code === 200) {
              alert('RECORD INSERTED SUCCESSFUILY');
              this.displaySuccess=true;
              window.location.reload();
            } else {
              if (res.code === 400) {
                this.displaySuccess=false;
                alert('Code already present in the data base');
                window.location.reload();
              }
            }
            });

          } else{ alert("Data Validation Not Sucessfull....\nPosting Not Done...")  }
        }


  
        updateMast() {
          this.CheckDataValidations();

          if (this.checkValidation===true) {
            alert("Data Validation Sucessfull....\nPutting data to EW CUSTOMER TABLE")
            const formValue: IExtendedWarranty =this.transeData(this.saiEwForm.value);
            this.service.UpdateSaiEwCustomer(formValue).subscribe((res: any) => {
            if (res.code === 200) {
              alert('RECORD UPDATED SUCCESSFUILY');
              window.location.reload();
            } else {
              if (res.code === 400) {
                alert('ERROR OCCOURED IN PROCEESS');
                window.location.reload();
              }
            }
          });

        }else{ alert("Data Validation Not Sucessfull....\nData not Saved...")  }
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

    addDays(date1: Date, days1: number): Date {
      date1.setDate(date1.getDate() + days1);
      return date1;
  }

   CheckDataValidations(){
       
     
        const formValue: IExtendedWarranty = this.saiEwForm.value;
       
        if(formValue.variant===undefined || formValue.variant===null ) {
            this.checkValidation=false;
            alert ("REGNO/MODEL/VARIANT: Should not be null value");
            return; 
         }

         if(formValue.deliveryDate===undefined || formValue.deliveryDate===null ) {
          this.checkValidation=false;
          alert ("SALE DATE: Should not be null value");
          return; 
       }

         if(formValue.custId===undefined || formValue.custId===null) {
          this.checkValidation=false;
          alert ("CUSTOMER NO: Should not be null value");
          return; 
       }

        if (formValue.kmsEwSale <=0 || formValue.kmsEwSale===undefined || formValue.kmsEwSale===null )
        {
            this.checkValidation=false;  
            alert ("MILEAGE: Should be above Zero");
            return;
         } 

         if (formValue.soldByEmpId===undefined || formValue.soldByEmpId===null)
         {
            this.checkValidation=false; 
            alert ("SOLD BY: Please Select SoldBy Employee....");
             return;
          } 
        
          if (formValue.ewSchemeId===undefined || formValue.ewSchemeId===null)
          {
              this.checkValidation=false;
              alert ("EW SCHEME: Please Select EW Scheme....");
              return;
           } 
          //  alert("item code :" +formValue.itemId);
           if (formValue.itemId===undefined || formValue.itemId===null || formValue.itemId<=0 )
           {
              this.checkValidation=false;   
              alert ("EW ITEM : Please Select EW ITEM CODE....");
               return;
            } 

            if (formValue.ewBookletNo===undefined || formValue.ewBookletNo===null || formValue.ewBookletNo.trim()==='')
            {
                this.checkValidation=false;  
                alert ("EW BOOKLETNO : Please Select EW BOOKLETNO....");
                return;
             } 

            if (formValue.ewInsurerId===undefined || formValue.ewInsurerId===null)
            {
                this.checkValidation=false;
                alert ("EW INSURANCE: Please Select ewInsurer....");
                return;
             } 

             if (formValue.ewStartDate===undefined || formValue.ewStartDate===null || formValue.ewStartDate < formValue.ewSaleDate )
             {
                 this.checkValidation=false;
                 alert ("EW START DATE: should not be null / grater than EW Sales date...");
                 return;
              } 

              if (formValue.ewEndDate===undefined || formValue.ewEndDate===null || formValue.ewEndDate<=formValue.ewStartDate)
              {
                  this.checkValidation=false;  
                  alert ("EW END DATE: should not be null / grater than Start Date");
                  return;
               } 

               

               if (formValue.paymentAmt <=0 || formValue.paymentAmt===undefined || formValue.paymentAmt===null )
               {
                   this.checkValidation=false;  
                   alert ("RECEIPT AMT: Should be above Zero");
                   return;
                } 


               if (formValue.payType===undefined || formValue.payType===null)
               {
                  this.checkValidation=false;   
                  alert ("PAY MODE: Please Select payment Type....");
                   return;
                } 
                alert( "receiptMethodId : "+formValue.receiptMethodId);

                if (formValue.receiptMethodId===undefined || formValue.receiptMethodId===null)
                {
                  this.checkValidation=false;  
                  alert ("PAY METHOD: Please Select Receipt Method....");
                  
                  return;
                 } 

                 if (formValue.payType !==null) {
                   if (formValue.payType != 'CASH') {

                    if (formValue.bankName===undefined || formValue.bankName===null || formValue.bankName.trim()==='')
                    {
                        this.checkValidation=false;  
                        alert ("BANK : Please Enter Bank Name....");
                        return;
                     } 

                     if (formValue.bankBranch===undefined || formValue.bankBranch===null || formValue.bankBranch.trim()==='')
                     {
                         this.checkValidation=false;  
                         alert ("BANK BRANCH : Please Enter Bank Branch....");
                         return;
                      } 

                      if (formValue.checkNo===undefined || formValue.checkNo===null || formValue.checkNo.trim()==='')
                      {
                          this.checkValidation=false;  
                          alert ("CHECK/DD/CRD/NEFT NO: Please Enter Cheq/dd no...");
                          return;
                       } 

                       if (formValue.checkDate===undefined || formValue.checkDate===null)
                       {
                           this.checkValidation=false;  
                           alert ("CHECK/DD/CRD/NEF DATE: Please Select Chq/dd.. Date....");
                           return;
                        } 
                   }
                  
                  }
                  this.checkValidation=true;
      }
 
}
