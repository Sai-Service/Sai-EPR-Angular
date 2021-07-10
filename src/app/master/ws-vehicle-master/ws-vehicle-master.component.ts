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

interface IWsVehicleMaster {
  regNo: string;

}
@Component({
  selector: 'app-ws-vehicle-master',
  templateUrl: './ws-vehicle-master.component.html',
  styleUrls: ['./ws-vehicle-master.component.css']
})
export class WsVehicleMasterComponent implements OnInit {

  wsVehicleMasterForm: FormGroup;

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
 
  ewregNo: string;
  ewId:number;
  ewSchemeId:number;
  ewBookletNo:string;

  ///////////////////////////////////////////////////
  regNo:string;
  vin:string;
  ewItemCode:string;
  itemId:number;
  itemDesc:string;
  itemCatg:string;
  colorCode:string;
  mainModel:string;
 
  rfId:string;
  govtVehicleYn:string;
  vipYn:string;
  dealerCode:string;
  
  dealerName:string;
  dealerSite:string;
  deliveryDate:string;

  oemWarrentyEndDate:Date;
  dlrInvoiceNo:string;
  dmsInvoiceNo:string;

  insuDate:string;
  policyNo:string;
  insCompanyName:string;
  inscompanySite:string;

  ewStatus:string;
  // ewBookletNo:string;
  ewInsurerId : number;
  ewInsurerSite:number;
  ewEndDate: Date;
  ewBalanceDays:number;

  mcpNo:string;
  validity:string;
  mcpYN:string;
  mcpPackage:string;
  
  cngCylinderNo:string;
  cngKitNumber:string;
  cngExpDate:string;


  ////////////////////////////////////////////////////


  fuelType :string;
  variant:string ;
  variantCode:string;
  chassisNo:string;
  engineNo:string;
  vehicleDelvDate : Date;
  serviceModel:string;
 
  kmReading:string;
  soldByEmpId : string;
  custId:number;
  custAccountNo:number;
  dmsCustNo:number;
  custName:string;

  ewPeriod:number;
  warrantyDealer:string;
  vehicleAgeDays:number;
  paytmentSource:string;
  

  ewAmt:number;
  ewDiscAmt:number;
  ewTotalAmt:number;

  // ewSaleDate:Date;
  segment: string;
  
  
  now = Date.now();
  ewSaleDate = this.pipe.transform(this.now, 'y-MM-dd');

  ewStartDate :Date
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


  get f() { return this.wsVehicleMasterForm.controls; }

  wsVehicleMaster(wsVehicleMasterForm:any) {  }

      constructor(private service: MasterService,private  fb: FormBuilder, private router: Router) { 
        this.wsVehicleMasterForm = fb.group({ 

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

      ////////////////////////////////////
      regNo:[],
      ewId:[],
      ewSchemeId:[],
      // ewDate:[],
      // ewBookletNo:[],

      itemId:[],
      itemDesc:[],
      itemCatg:[],
      colorCode:[],
      mainModel:[],
      rfId:[],
      govtVehicleYn:[],
      vipYn:[],

      dealerCode:[],
      dealerName:[],
      dealerSite:[],
      deliveryDate:[],
      vehicleDelvDate:[],

      oemWarrentyEndDate:[],
      dlrInvoiceNo:[],
      dmsInvoiceNo:[],

      insuDate:[],
      policyNo:[],
      insCompanyName:[],
      inscompanySite:[],

      mcpNo:[],
      mcpPackage:[],
      validity:[],
      mcpYN:[],

      cngCylinderNo:[],
      cngKitNumber:[],
      cngExpDate:[],
    
    

      ///////////////////////////////

      fuelType :[],
      variant:[],
      variantCode:[],
      variantDesc:[],

      chassisNo:[],
      engineNo:[],
      serviceModel:[],

      
      warrantyDealer:[],

      custId:[],
      custAccountNo:[],
      dmsCustNo:[],
      custName:[],
      // dealerCode:[],
      ewPeriod:[],

      paytmentSource :[],
      kmReading:[],
      soldByEmpId:[],

      ewType:[],
      ewStatus:[],
      ewBookletNo:[],
      ewInsurerId : [],
      ewInsurerSite:[],
      ewEndDate: [],
      ewBalanceDays:[],

      // itemId: [],

      ewAmt:[],
      ewDiscAmt:[],
      ewTotalAmt:[],

      ewSaleDate:[],
      ewStartDate:[],
     

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
       
        searchMast(regNo: string ){
          regNo = 'MH12EM6011';
          
          this.service.getWsVehRegDetails(regNo)
            .subscribe(
              data => {
                this.lstcomments = data.obj;
                console.log(this.lstcomments);
                this.wsVehicleMasterForm.patchValue(data.obj);
              }
            );
           }





        transeData(formValue) 
        {
 
         // delete formValue.regNo;
         

          return formValue;
        }


        newMast() {
          alert ("Posting data  to EW SCHEME TABLE......")
         
  
          // const formValue: IPaymentRcpt =this.paymentReceiptForm.value;
        
          const formValue: IWsVehicleMaster =this.transeData(this.wsVehicleMasterForm.value);
         
         
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
                this.wsVehicleMasterForm.reset();
              }
            }
          });
        }
  
        updateMast() {
          alert ("Putting data  to EW SCHEME......")
          const formValue: IWsVehicleMaster =this.transeData(this.wsVehicleMasterForm.value);
          
            this.service.UpdateSaiEwCustomer(formValue).subscribe((res: any) => {
            if (res.code === 200) {
              alert('RECORD UPDATED SUCCESSFUILY');
              window.location.reload();
            } else {
              if (res.code === 400) {
                alert('ERROR OCCOURED IN PROCEESS');
                this.wsVehicleMasterForm.reset();
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

  

}
