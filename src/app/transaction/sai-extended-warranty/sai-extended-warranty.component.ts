import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NumberValueAccessor, MaxLengthValidator, CheckboxControlValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators , FormArray } from '@angular/forms';
import { MasterService } from '../../master/master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InteractionModeRegistry } from 'chart.js';
// import { data, now } from 'jquery';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MAT_DIALOG_DATA } from "@angular/material/dialog";


interface IExtendedWarranty {
  custId:number;
  kmsEwSale: number;
  soldByEmpId : number;
  salesExecutiveName:string;
  // salesExecutiveId:number;
  variant:string;
  deliveryDate:Date;
  regDate:Date;
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
  lastRunKms:number;
  orderNumber:number;

  ewCancelReason:string;
  ewCancelDate :Date;
  ewClaimStatus1:string;
  bajajCwiNo:string;

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
  public EwTypeList         : Array<string>  =[];
  public ewCancelReasonList : Array<string>  =[];
  public OUIdList           : Array<string> = [];
  public EwSourceList       : Array<string> = [];
  public issueByList        : Array<string> = [];
  public VehRegNoList       : Array<string> = [];
  public VehVinList         : Array<string> = [];
  // public EwSchemeItemList   : Array<string> = [];
  public ewInsNameList      : Array<string> = [];

  public ItemEWList         : Array<string> = [];
  dealerCodeList:any;
  EwSchemeItemList:any;
  
  pipe = new DatePipe('en-US');
  resMsg : string;

  message:string="PleaseFixtheErrors!";
  msgType:string="Close";

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
  ewClaimStatusCheck:any;
  vehicleSaleOrderDetails:any;
  CustomerSiteDetails:any;
  CustomerSiteDetailsNew:any;
  lstcomments: any[];
  getLastRunKmsVeh:any;
  
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
 
  showOrderInputLine=false;
  pymntSource=true;

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
  
  orderNumber:number;
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
  regDate:Date;
  dealerCode:string;
  kmsEwSale:number;
  soldByEmpId : number;
  salesExecutiveName:string;
  // salesExecutiveId:number;

  custId:number; 
  dmsCustNo:number;
  custName:string;
  customerSiteId:number;
  customerSiteAddress:string;
  custCity:string;
  custState:String;
  custPincode:string;
  CustomerGstNo:string
  customerPanNo:string
  custAccountNo:number;
  billToSiteId:number;
  custPhone:string;
  customerType:string;
  custTaxCategoryName:string;
  

  ewPeriod:number;
  warrantyDealer:string;
  vehicleAgeDays:number;
  paytmentSource:string='SERVICE'
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
  oemWarrantyPeriod:number;
  oemWarrEndDate :string;

  receiptNumber:number;
  payType:string;
  receiptMethodId:number;
  paymentAmt:number;
  bankName:string;
  bankBranch:string;
  checkNo:string;
  checkDate:string;
  // checkDate = this.pipe.transform(Date.now(), 'y-MM-dd');

  lastRunKms:number;
  checkValidation=false;
  displayInactive = true;
  Status1: any;
  inactiveDate: Date;
  display = true;
  displayButton = true;
  showBankDetails=false;
  showCancelDetails=false;
  displaySuccess=false;
  displayReason=false;
  ewCancelFlag=false;
  cancelledFlag=false;
  dispCustButton=false;
  showCustModal=false;
  receiptDetails=false;
  showSchemeLov=true;
  ewGracePeriod =false;

  variantItemId : number;

  ewCancelDate:string;
 
  ewCancelReason:string;
  ewClaimStatus1:string;
  bajajCwiNo:string;
  ewSchemeName:string;

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

      orderNumber:[],
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
      regDate:[],
      dealerCode:[],
      warrantyDealer:[],
      lastRunKms:[],

      custId:[],
      customerSiteId:[],
      custAccountNo:[],
      dmsCustNo:['',Validators.required,  Validators.pattern('^[a-zA-Z0-9]')],
      custName:[],
      customerSiteAddress:[],
      custCity:[],
      custState:[],
      custPincode:[],
      CustomerGstNo:[],
      customerPanNo:[],
      billToSiteId:[],
      custPhone:[],
      customerType:[],
      custTaxCategoryName:[],
      // dealerCode:[],
      ewPeriod:[],

      paytmentSource :[],
      kmsEwSale:[],
      soldByEmpId:[],
      salesExecutiveName:[],
      // salesExecutiveId :[],


      ewType:[],
      ewInsurerId : [],
      ewInsurerSiteId:[],
      // itemId: [],

      ewSchemeAmt:[],
      ewDiscAmt:[],
      ewTotalAmt:[],
      ewSchemeName:[],

      ewSaleDate:[],
      ewStartDate:[],
      ewEndDate:[],
      oemWarrantyPeriod:[],
      oemWarrEndDate:[],

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
      ewClaimStatus1:[],
      bajajCwiNo:[],

      });

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
          // this.locName=(sessionStorage.getItem('locName'));
          this.deptId=Number(sessionStorage.getItem('dept'));
          // this.emplId= Number(sessionStorage.getItem('emplId'));
         
          this.orgId=this.ouId;
          console.log(this.loginArray);
          console.log(this.locId);
          // console.log(this.orgId);
          // this.ewInsuranceId=this.ouId;

          this.service.delearCodeList()
          .subscribe(
            data => {
              this.dealerCodeList = data;
              console.log(this.dealerCodeList);
            }
          );

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

          

          this.service.EwCancelReasonList()
          .subscribe(
            data => {
              this.ewCancelReasonList = data;
              console.log(this.ewCancelReasonList);
            }
          );
 
          this.service.EwTypeList(sessionStorage.getItem('divisionId'))
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

          // this.service.ewInsNameList()
          // .subscribe(
          //   data => {
          //     this.ewInsNameList = data;
          //     console.log(this.ewInsNameList);
          //   }
          // );

          this.service.insNameList()
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

            // this.service.RegNoListFN()
            // .subscribe(
            //   data1 => {
            //     this.VehRegNoList = data1;
            //     console.log(this.VehRegNoList);
            //   }
            // ); 

            // this.service.VehVinList()
            // .subscribe(
            //   data1 => {
            //     this.VehVinList = data1;
            //     console.log(this.VehVinList);
            //   }
            // ); 
            
        //     this.service.itemIdList()
        //     .subscribe(
        //       data => {
        //         this.ItemEWList = data;
        //         console.log(this.ItemEWList);
        // }
        // );


      }
            

        // ========================================================

        onSourceSelected(mSource:any) {
          if (mSource !=null){
          if (mSource==='SALES'){
            this.showOrderInputLine=true;  
           }
          else { 
            this.showOrderInputLine=false; 
                   
           }
           
           if(this.displayButton) {
            this.resetSection1();
            this.resetSection2();
            this.resetSection3();
          }
        
         
        }
      }

      onReasonSelected(reasonCode : any){
        // alert( "Cance Flag: "+ this.cancelledFlag + " Reaseon Code : "+reasonCode);
        // alert(reasonCode);
       
        if(this.cancelledFlag===false && reasonCode !=null && reasonCode != '--Select--'  ) {
          this.ewCancelDate = this.pipe.transform(this.now, 'y-MM-dd');
          this.ewCancelFlag=true; 
          alert("WARNIG!!! You are going to cancel this Extended Warranty ?.\nIf NO Please leave the Reason Code blank and Continue.")
        }

          if(reasonCode === '--Select--'  ) {
            this.ewCancelDate = null;
            this.ewCancelFlag=false; }
        
  
      }


        onEwInsurerSalected(mInsurerId : any){
          this.ewInsurerSiteId=mInsurerId;
          // alert("ins Site Id :" + this.ewInsurerSiteId);
        }

      

        onEnterKms(x : any)
        {
        
          var mVAriant =this.saiEwForm.get("variant").value;
          var mAging =this.saiEwForm.get("vehicleAgeDays").value;
          var mKms =this.saiEwForm.get("kmsEwSale").value;

          // alert (mVAriant +","+mAging+","+mKms);

          // alert("Last Run Km :" + this.lastRunKms);
          if(this.lastRunKms===null) {this.lastRunKms=0; 
            // alert("Last Run Km :" + this.lastRunKms);
          }

         if(mKms>0 && this.variant !=null && mKms >= this.lastRunKms ) 
         { this.LoadEWSchemeVariant(mVAriant,mAging,mKms);} 
         else 
         {
           alert("Invalid KM Reading Or\nKM Reading entered is lesser than Last Run Km("+ this.lastRunKms+") Or \nCheck Model Variant Deatils..") 
           this.resetSection2();
           return;
         }
        }

          resetSection1() {
            this.vehRegNo=null;
            this.vehicleId =null;
            this.orderNumber=null;
            this.itemDesc=null;
            this.variant=null;
            this.variantDesc=null;
            this.fuelType=null;
            this.chassisNo=null;
            this.engineNo=null;
            this.deliveryDate =null;
            this.orderNumber=null;
            this.dealerCode=null;
            this.serviceModel=null;
            this.lastRunKms=null;
            this.custAccountNo=null;
            this.custName=null;
            this.custPhone=null;
            this.customerSiteAddress =null;
            this.CustomerGstNo=null;
            this.customerPanNo=null;
            this.customerType=null;
            this.kmsEwSale=null;
            this.soldByEmpId=null;
            this.salesExecutiveName=null;
            }

            resetSection2() {
              this.EwSchemeItemList=null;
              this.invItemListEw =null;
              this.ewStartDate=null;
              this.ewEndDate=null;
              this.ewPeriod=null;
              this.ewSchemeAmt=null;
              this.ewBookletNo=null;
             }

              resetSection3() {
                this.paymentAmt=this.ewSchemeAmt;
                this.receiptMethodId =null;
                this.bankName=null;
                this.bankBranch=null;
                this.checkNo=null;
                this.checkDate = null;
              }

            


          validateAmt(rcptAmt :any) {
           
            if(rcptAmt ===null ||rcptAmt ===undefined || rcptAmt<=0 ) {
              alert("RECEIPT AMOUNT :  Should be above Zero.");
              this.paymentAmt=null;
             return;}

          }

        LoadEWSchemeVariant(mVariant,mAging,mKmsCurr){
          this.resetSection2();
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
                ewSchemeName:  this.lstEwSchemeDetails.ewSchemeNo,
                ewSchemeAmt: this.lstEwSchemeDetails.schemeAmount,
                ewPeriod :this.lstEwSchemeDetails.premiumPeriod,
                ewType:this.lstEwSchemeDetails.ewType,
                paymentAmt: this.lstEwSchemeDetails.schemeAmount,
                ewInsurerId: this.lstEwSchemeDetails.ewInsId,
                
           });
         
           this.GetEWitemList(this.ewType, this.variant,this.ewPeriod)

           var saleDate1=new Date(this.deliveryDate);
           var oemExpDate =new Date (this.oemWarrEndDate);
           var ew2;
           var ew3;
           var ew4;
           var yPeriod =this.ewPeriod;

            var currDate = new Date();
            ew2=this.addDays(oemExpDate,1);
           
         
           if(currDate <=oemExpDate) {ew4=ew2;} else { ew4=new Date (this.ewSaleDate);   }
          
           this.ewStartDate=this.pipe.transform(ew4, 'y-MM-dd');
           var ewStDate=new Date(this.ewStartDate);
           ew3=this.addDays(ewStDate,yPeriod*365);
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
              // this.oemWarrantyPeriod=data.oemWarrantyPeriod;
              this.saiEwForm.patchValue({
                serviceModel: this.variantDetailsList.serviceModel,
                oemWarrantyPeriod: this.variantDetailsList.oemWarrantyPeriod,
              });

              var saleDate1=new Date(this.deliveryDate);
              var oemEndDate =this.addDays(saleDate1,data.oemWarrantyPeriod*365);
              this.oemWarrEndDate=this.pipe.transform(oemEndDate, 'y-MM-dd'); 
            
            }
             );

             
        }

        GetEwReceiptDetails(mEwId){
         
          this.service.getEWCustomerSearchByEWNo(mEwId)
          .subscribe(
            data => {
              this.ewReceiptDeails = data;
              console.log(this.ewReceiptDeails);
              if(this.ewReceiptDeails !=null) {
              
              this.saiEwForm.patchValue({
                receiptNumber: this.ewReceiptDeails.receiptNumber,
                // paymentAmt: this.ewReceiptDeails.amount,
                payType: this.ewReceiptDeails.payType,
                receiptMethodId: this.ewReceiptDeails.receiptMethodId,
                bankName: this.ewReceiptDeails.bankName,
                bankBranch: this.ewReceiptDeails.bankBranch,
                checkNo: this.ewReceiptDeails.checkNo,
                checkDate: this.ewReceiptDeails.checkDate,
              }); } else { alert("Receipt Details not found....");}
              // alert("pay type ="+this.ewReceiptDeails.payType);
              // alert("BANK ="+this.ewReceiptDeails.bankName);
            });}
             
      
        GetLastRunKmsSearch(mRegNo){
           var z=0;
          this.service.getLastRunKms(mRegNo)
          .subscribe(
            data => {
              this.getLastRunKmsVeh = data;
              console.log(this.getLastRunKmsVeh);
             
              this.saiEwForm.patchValue({
                  lastRunKms: this.getLastRunKmsVeh.lastRunKms, });
            
            } );}
            
        

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
                deliveryDate : this.VehicleRegDetails.vehicleDelvDate,
                // itemDesc: this.VehicleRegDetails.itemId.segment,
        });
    
           this.GetItemDeatils1(this.variantItemId);
       
        
            }
             );
        }


        getEwStatus(mRegNo:any) {
          // alert (" ew status Reg No.....:"+mRegNo);
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
          //  ----------------------------------------------------
            var mreg=this.saiEwForm.get('vehRegNo').value
            if(mreg==null || mreg==undefined || mreg.trim()=='') {
              alert ("Enter Valid Vehicle Registration No."); return;
            }
            mreg=mreg.toUpperCase();
            mreg=mreg.trim();
            this.vehRegNo=mreg;
            //  ---------------------------------------------------
          this.service.getVehRegDetailsNew(mreg)
          .subscribe(
            data => {
              this.getVehRegDetails = data.obj;
              if(this.getVehRegDetails !=null){
                this.dispCustButton=true;
              
              console.log(this.getVehRegDetails);

              this.saiEwForm.patchValue({
                fuelType: this.getVehRegDetails.fuelType,
                variant: this.getVehRegDetails.variantCode,
                variantDesc: this.getVehRegDetails.mainModel,
                chassisNo: this.getVehRegDetails.chassisNo,
                engineNo: this.getVehRegDetails.engineNo,
                deliveryDate: this.getVehRegDetails.deliveryDate,
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

              if(this.getVehRegDetails.customerId ===undefined || this.getVehRegDetails.customerId===null || this.getVehRegDetails.customerId <=0) {
                alert ("Customer Id is Undefined  or Null. Please check.")
                this.resetMast();
              }
                this.GetCustomerDetails(this.custId);
                this.GetCustomerSiteDetails(this.custId);
                this.deliveryDate = this.pipe.transform(this.deliveryDate, 'y-MM-dd');
                this.getEwStatus(mreg);
                this.GetLastRunKmsSearch(mreg);
                //  this.GetVariantDeatils(this.variant);

                 //  ..................Oem Wr Period Check .........................
                this.service.variantDetailsList(this.variant) .subscribe(
                  data => { this.variantDetailsList = data;
                    console.log(this.variantDetailsList);
                    this.saiEwForm.patchValue({
                      serviceModel: data.serviceModel,
                      oemWarrantyPeriod: data.oemWarrantyPeriod,
                    });

                    var currentDate   = new Date(Date.now());
                    var saleDate1=new Date(this.deliveryDate);
                    var ewSalDate=new Date(this.ewSaleDate);
                    var oemEndDate =this.addDays(saleDate1,data.oemWarrantyPeriod*365);
                    this.oemWarrEndDate=this.pipe.transform(oemEndDate, 'y-MM-dd'); 
                    // alert ("OEM End Date :"+oemEndDate +"  CurrDate :"+currentDate);

                    if(currentDate<=oemEndDate) {this.ewGracePeriod=false;} else {this.ewGracePeriod=true;}

                    if(this.isEwActive ==false) {
                      var saleDate=new Date(this.deliveryDate);
                      var mToday   = new Date(Date.now());
                      this.getDiffDays(saleDate,ewSalDate,this.oemWarrantyPeriod);
                    } 


                  });

      // ........................................................................

         

         } else { alert("Vehicle Regno. Not Found...."); this.dispCustButton=false; this.saiEwForm.reset();}
        }
          );}
        
        


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
              // customerAddress:this.CustomerDetailsList.custName,
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
          if (this.CustomerSiteDetails===null ) 
             {alert("Customer Site [" + this.ouId + "] Not Found in Site Master.....\nPlease check and try again....");this.resetMast();}
          else if (this.CustomerSiteDetails.taxCategoryName===null)
             {alert("Tax Category not attached to  this customer.Pls Update Tax category for this customer.");this.resetMast();}
          else{
            this.showCustModal=true;
             console.log(this.CustomerSiteDetails);
             this.saiEwForm.patchValue({
              customerSiteId:this.CustomerSiteDetails.customerSiteId,
              customerSiteAddress:this.CustomerSiteDetails.address1+","+
                                    this.CustomerSiteDetails.address2+","+
                                    this.CustomerSiteDetails.address3+","+
                                    this.CustomerSiteDetails.location,
              custCity:this.CustomerSiteDetails.city,
              custState:this.CustomerSiteDetails.state,                 
              custPincode:this.CustomerSiteDetails.pinCd,                    
              customerGstNo:this.CustomerSiteDetails.gstNo,
              customerPanNo:this.CustomerSiteDetails.panNo,
              custPhone:this.CustomerSiteDetails.mobile1,
              customerType:this.CustomerSiteDetails.customerId.custType,
              custTaxCategoryName:this.CustomerSiteDetails.taxCategoryName,
             
        });

        }  });  }


         ////////////////// not in use//////////////////     
        CustAccountNoSearchSite(accountNo){
          alert("CustAccountNoSearch:"+accountNo);
         if(accountNo<=0)
          {
            this.custName=null;
            this.customerSiteAddress=null;
          }else {
  
            this.service.custAccountNoSearch(accountNo,this.ouId,this.divisionId)
          .subscribe(
            data => {
              this.CustomerSiteDetailsNew = data.obj;  
  
              if(this.CustomerSiteDetailsNew===null)
              {
                this.custName=null;
                this.customerSiteAddress=null;
                {alert("Customer Site [" + this.ouId + "] Not Found in Site Master.....\nPlease check and try again....");}
              }
              else 
              {
                
                   console.log(this.CustomerSiteDetailsNew);
                   this.saiEwForm.patchValue({
                   custName: this.CustomerSiteDetailsNew.custName,
                   customerSiteAddress: this.CustomerSiteDetailsNew.billToAddress,
                   billToSiteId :this.CustomerSiteDetailsNew.billToLocId,
              });
            }
          
            }
          );
          }
        }
      ////////////////// ////////// //////////////////////   
     
        getDiffDays(date1 ,date2,oPrd){
          // alert ("Delv Date :"+date1 +" ew Sale date :"+date2);
            date1 = new Date(date1);
            date2 = new Date(date2);
        //  date2 = this.pipe.transform(date2, 'y-MM-dd');
           var mDays1=date2.getTime()-date1.getTime();
           var mDays2=mDays1 / (1000 * 3600 * 24);
           var mDays3=Math.round(mDays2 - 0.5)
           this.vehicleAgeDays=mDays3;
 
           var oemPrd =this.saiEwForm.get('oemWarrantyPeriod').value;

          //  alert ("mdays3 :"+mDays3 +"....oemPrd :"+oemPrd);
        
          if(this.displayButton) {
          if(this.paytmentSource ==='SALES' && mDays3 >30 ) {
            alert("VEHICLE SALE DATE :"+this.pipe.transform(date1,'dd/MM/y') + " Aging : "+ mDays3 +" Days...Not Eligible To issue EW from SALES")
            this.resetMast();
          }

          if(this.paytmentSource ==='SERVICE' && mDays3 > 1095 ) {
            alert("VEHICLE SALE DATE :"+this.pipe.transform(date1,'dd/MM/y') + " Aging : "+ mDays3 +" Days...Not Eligible for availing Extended Warranty")   
            this.resetMast();
          }
        }

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

              this.getDiffDays(saleDate,mToday,0);
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
          if (payType !=undefined ) {
            if(this.displayButton===true) { this.receiptMethodId=null;}
          
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
                this.resetSection3();
                } else{
      
                this.checkDate = this.pipe.transform(Date.now(), 'y-MM-dd');
               
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
       

        GetOrderDetails(mOrderNumber:any) {
          // alert("Order Number : "+ mOrderNumber);

          this.service.getVehicleOrderDetailsNew(mOrderNumber)
          .subscribe(
            data => {
              // this.vehicleSaleOrderDetails = data.obj;
              this.vehicleSaleOrderDetails = data
              console.log(this.vehicleSaleOrderDetails);
              

              if (this.vehicleSaleOrderDetails===null) 
              {
                alert("Order Number : [" + mOrderNumber+ "]  Not Found/doesnot Exist....")
                return;
              } 

              this.saiEwForm.patchValue({
                vehRegNo: this.vehicleSaleOrderDetails.regNo,
                vehicleId: this.vehicleSaleOrderDetails.vin,
                variantDesc: this.vehicleSaleOrderDetails.mainModel,
                variant: this.vehicleSaleOrderDetails.variantCode,
                fuelType: this.vehicleSaleOrderDetails.fuelType,
                chassisNo: this.vehicleSaleOrderDetails.chassisNo,
                engineNo: this.vehicleSaleOrderDetails.engineNo,
                dealerCode: this.vehicleSaleOrderDetails.dealerCode,
                deliveryDate: this.vehicleSaleOrderDetails.vehicleDelvDate,
                regDate: this.vehicleSaleOrderDetails.regDate,
                itemDesc: this.vehicleSaleOrderDetails.itemId.segment,
                custId: this.vehicleSaleOrderDetails.customerId,
                salesExecutiveName:this.vehicleSaleOrderDetails.insuPeriod+"-"+this.vehicleSaleOrderDetails.batteryNumber,
                soldByEmpId :this.vehicleSaleOrderDetails.insuPeriod,              
           });

           this.getEwStatus(this.vehRegNo);
           this.GetVariantDeatils(this.variant);
           this.GetCustomerDetails(this.custId);
            
           if(this.isEwActive ==false) {
              this.GetCustomerSiteDetails(this.custId);
              var regnDate=new Date(this.regDate);
              // var mToday   = new Date(Date.now());
                var ewSalDate=new Date(this.ewSaleDate);

              if(regnDate ==null || regnDate ==undefined) {
               alert("Vehicle Registration Date not Available....EW Enrollment not allowed") ;return;
              } else {
              this.getDiffDays(regnDate,ewSalDate,0); }

            } 
         }
          ); }


          getEwClaimStatus(mVehReNo:any)
          {
            this.service.EwClaimedCheck(mVehReNo)
            .subscribe(
              data => {
                this.ewClaimStatusCheck = data.obj;
                console.log(this.ewClaimStatusCheck);
                // alert("Ew Claim Status :"+this.ewClaimStatusCheck);
                if(this.ewClaimStatusCheck===false) { this.ewClaimStatus1="Not Claimed"; this.displayReason=true;}
                else {this.ewClaimStatus1="Claimed"; this.displayReason=false; this.ewCancelDate=null;}
               }
            );
            
          }


   
         cancelEWValidation(){
          const formValue: IExtendedWarranty = this.saiEwForm.value;
          this.ewCancelDate = this.pipe.transform(this.now, 'y-MM-dd');
                   
          if (formValue.ewCancelReason===undefined || formValue.ewCancelReason===null)
            {
                this.checkValidation=false;
                alert ("CANCEL REASON: Please Select Reason....");
                return;
             } 

             if (formValue.ewCancelDate===undefined || formValue.ewCancelDate===null )
             {
                 this.checkValidation=false;
                 alert ("CANCEL DATE: should not be nulle...");
                 return;
              } 

             
              // this.ewCancelFlag=true; 
              // this.updateMast();

             }

      
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
        //  alert ("In Search...");
          let select = this.lstcomments.find(d => d.ewId === ewId);
          if (select) {
             this.ewId = select.ewId;
             var ewSchId= select.ewSchemeId;
            this.showSchemeLov=false;
             this.displayButton = false;
            this.showCancelDetails=false;
            if (this.displayButton===false) {
              this.ewCancelDate=select.ewCancelDate;
              this.ewCancelReason=select.ewCancelReason;   }

            
              if(this.ewCancelDate !=null ) {
                this.cancelledFlag=true; this.saiEwForm.disable();}
                else {
                  
                  this.cancelledFlag=false;
                  this.saiEwForm.disable();
                  this.saiEwForm.get('ewBookletNo').enable();
                  this.saiEwForm.get('ewCancelReason').enable();
                }

             
             this.saiEwForm.patchValue(select);
             this.GetVariantDeatils(this.variant);

            
            this.saiEwForm.patchValue({
              vehRegNo : select.vehRegNo,
              orderNumber : select.orderNo ,
              ewStartDate: select.ewStartDate ,
              ewEndDate :select.ewEndDate
            });

               
            this.service.getEWSchemeDetails(ewSchId) .subscribe(
              data => { 
                this.saiEwForm.patchValue({ 
                  ewSchemeName: (  data.ewSchemeId.toString() +"-" + data.ewSchemeNo) ,
                  ewSchemeAmt: data.schemeAmount,
                  ewPeriod :data.premiumPeriod,
                  ewType:data.ewType,
                  paymentAmt: data.schemeAmount,
                  // ewInsurerId: data.ewInsId,
                
                }); 

                this.GetEWitemList(this.ewType, this.variant,this.ewPeriod)
                
              });
               
            //  this.GetVehicleRegInfomation(this.vehRegNo);
             this.GetCustomerDetails(this.custId);
             this.GetCustomerSiteDetails(this.custId);

            // this.GetEwReceiptDetails(ewId);
            // this.GetItemDeatils2(select.itemId);
            // this.getDiffDays(this.deliveryDate,this.ewSaleDate,0);
            // this.LoadEWSchemeVariant(this.variant,this.vehicleAgeDays,this.kmsEwSale);

            this.getEwClaimStatus(this.vehRegNo);
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
          delete val.ewClaimStatus1;
          delete val.isEwActive;
          delete val.ewStatusBookletno;
          delete val.ewStatusStartDate;
          delete val.ewStatusPeriod;

          return val;
        }


        newMast() {
          this.CheckDataValidations();

          if (this.checkValidation===true) {

            var  resp=confirm("Save EW Enrollment ???");
            if(resp==true) {
            this.displayButton=false;
            // alert("Data Validation Sucessfull....\nPosting data  to EW CUSTOMER TABLE")
            const formValue: IExtendedWarranty =this.transeData(this.saiEwForm.value);
            console.log(formValue);
            this.service.SaiEwCustomerSubmit(formValue).subscribe((res: any) => {
            if (res.code === 200) {
              this.ewInvoiceNo=res.obj.ewInvoiceNo;
              this.ewId=res.obj.ewId;
              // this.receiptNumber=res.obj.receiptNumber;
              alert('RECORD INSERTED SUCCESSFUILY');
              // this.displayButton=false;
              // window.location.reload();
              this.saiEwForm.disable();
            } else {
              if (res.code === 400) {
                // this.displayButton=true;
                alert(res.message);
                this.displayButton=true;
                // this.displayButton=true;
               
                // alert('Code already present in the data base');
                // window.location.reload();
              }
            }
            });
          }

          } 
          // else{ alert("Data Validation Not Sucessfull....\nPosting Not Done...")  }
        }


  
        updateMast() {
          this.CheckDataValidations();
          if (this.ewCancelFlag) {this.cancelEWValidation();}

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

  onInput(event) {
    event.target.value = event.target.value.toLocaleUpperCase();
  }

   CheckDataValidations(){
       
     
        const formValue: IExtendedWarranty = this.saiEwForm.value;

         var msg1;
        if(formValue.variant===undefined || formValue.variant===null ) {
            this.checkValidation=false;
            // alert ("REGNO/MODEL/VARIANT: Should not be null value");
            msg1 ='REGNO/MODEL/VARIANT: Should not be null value';
            //  this.executeAlertMsg(msg1);
             alert(msg1);
            return; 
         }

         if(formValue.deliveryDate===undefined || formValue.deliveryDate===null ) {
          this.checkValidation=false;
          // alert ("SALE DATE: Should not be null value");
          msg1 ="SALE DATE: Should not be null value";
          // this.executeAlertMsg(msg1);
          alert(msg1);
         return; 
       }

         if(formValue.custId===undefined || formValue.custId===null) {
          this.checkValidation=false;
          msg1="CUSTOMER NO: Should not be null value";
          // this.executeAlertMsg(msg1);
          alert(msg1);
          return; 
       }

        if (formValue.kmsEwSale <=0 || formValue.kmsEwSale===undefined || formValue.kmsEwSale===null )
        {
            this.checkValidation=false;  
            msg1="MILEAGE: Should be above Zero";
            // this.executeAlertMsg(msg1);
            alert(msg1);
            return;
         } 

         if (formValue.bajajCwiNo===undefined || formValue.bajajCwiNo===null)
         {
            this.checkValidation=false; 
            msg1="REFERENCE NO(EW/CWI): Should not be null....";
            // this.executeAlertMsg(msg1);
            alert(msg1);
             return;
          } 

         if (formValue.soldByEmpId===undefined || formValue.soldByEmpId===null)
         {
            this.checkValidation=false; 
            msg1="SOLD BY: Please Select SoldBy Employee....";
            // this.executeAlertMsg(msg1);
            alert(msg1);
             return;
          } 
        
          if (formValue.ewSchemeId===undefined || formValue.ewSchemeId===null || formValue.ewSchemeId<=0)
          {
              this.checkValidation=false;
              msg1="EW SCHEME: Please Select EW Scheme....";
              // this.executeAlertMsg(msg1);
              alert(msg1);
              return;
           } 
          //  alert("item code :" +formValue.itemId);
           if (formValue.itemId===undefined || formValue.itemId===null || formValue.itemId<=0 )
           {
              this.checkValidation=false;   
              msg1="EW ITEM : Please Select EW ITEM CODE....";
              // this.executeAlertMsg(msg1);
              alert(msg1);
               return;
            } 

            if (formValue.ewBookletNo===undefined || formValue.ewBookletNo===null || formValue.ewBookletNo.trim()==='')
            {
                this.checkValidation=false;  
                msg1="EW BOOKLETNO : Please Select EW BOOKLETNO....";
                // this.executeAlertMsg(msg1);
                alert(msg1);
                return;
             } 

            if (formValue.ewInsurerId===undefined || formValue.ewInsurerId===null)
            {
                this.checkValidation=false;
                msg1="EW INSURANCE: Please Select ewInsurer....";
                // this.executeAlertMsg(msg1);
                alert(msg1);
                return;
             } 

             if (formValue.ewStartDate===undefined || formValue.ewStartDate===null || formValue.ewStartDate < formValue.ewSaleDate )
             {
                 this.checkValidation=false;
                 msg1="EW START DATE: should not be null / grater than EW Sales date...";
                //  this.executeAlertMsg(msg1);
                alert(msg1);
                 return;
              } 

              if (formValue.ewEndDate===undefined || formValue.ewEndDate===null || formValue.ewEndDate<=formValue.ewStartDate)
              {
                  this.checkValidation=false;  
                  msg1="EW END DATE: should not be null / grater than Start Date";
                  // this.executeAlertMsg(msg1);
                  alert(msg1);
                  return;
               } 

               

              //  if (formValue.paymentAmt <=0 || formValue.paymentAmt===undefined || formValue.paymentAmt===null )
              //  {
              //      this.checkValidation=false;  
              //      msg1="RECEIPT AMT: Should be above Zero";
              //      alert(msg1);
              //      return;
              //   } 


              //  if (formValue.payType===undefined || formValue.payType===null)
              //  {
              //     this.checkValidation=false;   
              //     msg1="PAY MODE: Please Select payment Type....";
              //      alert(msg1);
              //      return;
              //   } 
           
              //   if (formValue.receiptMethodId===undefined || formValue.receiptMethodId===null || formValue.receiptMethodId<=0)
              //   {
              //     this.checkValidation=false;  
              //     msg1="PAY METHOD: Please Select Receipt Method....";
              //     alert(msg1);
                  
              //     return;
              //    } 

              //    if (formValue.payType !==null) {
              //      if (formValue.payType != 'CASH') {

              //       if (formValue.bankName===undefined || formValue.bankName===null || formValue.bankName.trim()==='')
              //       {
              //           this.checkValidation=false;  
              //           msg1="BANK : Please Enter Bank Name....";
              //             alert(msg1);
              //           return;
              //        } 

              //        if (formValue.bankBranch===undefined || formValue.bankBranch===null || formValue.bankBranch.trim()==='')
              //        {
              //            this.checkValidation=false;  
              //            msg1="BANK BRANCH : Please Enter Bank Branch....";
              //           alert(msg1);
              //            return;
              //         } 

              //         if (formValue.checkNo===undefined || formValue.checkNo===null || formValue.checkNo.trim()==='')
              //         {
              //             this.checkValidation=false;  
              //             msg1="CHECK/DD/CRD/NEFT NO: Please Enter Cheq/dd no...";
              //               alert(msg1);
              //             return;
              //          } 

              //          if (formValue.checkDate===undefined || formValue.checkDate===null)
              //          {
              //              this.checkValidation=false;  
              //              msg1="CHECK/DD/CRD/NEF DATE: Please Select Chq/dd.. Date....";
              //              alert(msg1);
              //              return;
              //           } 
              //      }
                  
                  // }

                  this.checkValidation=true;
                 
      }


            executeAlertMsg(msg1) 
            {
              if (this.checkValidation==false){
                (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target','#confirmAlert');
                this.message=msg1;
              }
            }


            PrintDoc(){ alert ("Not Available...")}

            validateEwSaleDate(x) {
            //  alert ("Sale Date :"+x);
              var currDate = new Date();
              var ewSalDate =new Date(x);
              var delDate=new Date(this.deliveryDate);
              var oewExpDate =new Date(this.oemWarrEndDate);

              this.ewStartDate=this.pipe.transform(ewSalDate, 'y-MM-dd');
              
              if(ewSalDate < oewExpDate || ewSalDate>currDate  || this.ewSaleDate===undefined || this.ewSaleDate===null) {
                alert ("EW SALE DATE :" + "Should not be Null / Below OEM Expiry Date / Above Current Date");
                this.ewSaleDate = this.pipe.transform(currDate, 'y-MM-dd');
                this.ewStartDate=this.pipe.transform( this.ewSaleDate, 'y-MM-dd');
                // return;
              }

              var mAging =this.diffDays(this.ewSaleDate,delDate);
              // alert ("Aging :"+mAging + " ew Saledate : "+this.ewSaleDate + "  , delDate :"+delDate);

              var mVAriant =this.saiEwForm.get("variant").value;
              var mKms =this.saiEwForm.get("kmsEwSale").value;
               this.saiEwForm.patchValue({vehicleAgeDays : mAging})

              this.LoadEWSchemeVariant(mVAriant,mAging,mKms);

              // var yPeriod =this.saiEwForm.get('ewPeriod').value;
              // var ewStDate=new Date(this.ewStartDate);
              // var ew3=this.addDays(ewStDate,yPeriod*365);
              // this.ewEndDate=this.pipe.transform(ew3, 'y-MM-dd');
          
            }

            diffDays(currentDate ,dateSent){
              // let currentDate = new Date();

              currentDate = new Date(currentDate);
              dateSent = new Date(dateSent);
              return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
              }

          
 
}
