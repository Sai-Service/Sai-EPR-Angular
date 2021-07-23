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


interface IMcpEnrollment { 
  regNo:string;
  startKms:number;
  }

@Component({
  selector: 'app-mcp-enrollment',
  templateUrl: './mcp-enrollment.component.html',
  styleUrls: ['./mcp-enrollment.component.css']
})
export class McpEnrollmentComponent implements OnInit {

  mcpEnrollmentForm : FormGroup;

  pipe = new DatePipe('en-US');
  

  public OUIdList           : Array<string> = [];
  public VehRegNoList       : Array<string> = [];
  public VehVinList         : Array<string> = [];
  public issueByList        : Array<string> = [];
  
  getVehRegDetails:any;
  getVehVinDetails:any;
  variantDetailsList:any;
  CustomerDetailsList:any;
  CustomerSiteDetails:any;

      loginName:string;
        loginArray:string;
        name:string;
        ouName : string;
        divisionId:number;
        locId: number;
        locName : string;
        orgId:number;
        ouId :number;
        deptId:number; 
       // emplId :number;
        public emplId =6;
        userList1: any[] = [];
        lastkeydown1: number = 0;
     
        vehicleAgeDays:number;
     
      
        vehRegNo:string;
        vehicleId:string;
        custId:number;
       

        customerId:number; 
        custName:string;
        dmsCustNo:number;
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

        vehicleItem:string;
        fuelType :string;
        variant:string ;
        variantDesc:string;
        chassisNo:string;
        engineNo:string;
        serviceModel:string;
        deliveryDate:string;
        dealerCode:string;
        kmReading:number;
        soldByEmpId : string;


        searchRegno:string;
        searchEnrollNo:string;
        searchEnrollDate:Date;

        enqNo:string;
        // enqDate:Date;

        now = Date.now();
        enqDate = this.pipe.transform(this.now, 'dd-MM-y h:mm:ss');

        packageId:number;
        packageNumber:string;
        packageDesc:string;
        mcpStartDate:Date;
        mcpEndDate:Date;
        uptoKm:number;
        uptoVehAge:number;

        //////////////////////////////////
        displayInactive = true;
        Status1: any;
        inactiveDate: Date;
        display = true;
        displayButton = true;
        dispCustButton=false;
        //////////////////////////////////
  

  get f() { return this.mcpEnrollmentForm.controls; }
  mcpEnrollment(mcpEnrollmentForm:any) {  }

        constructor(private service: MasterService,private orderManagementService:OrderManagementService,private  fb: FormBuilder, private router: Router) {
          this.mcpEnrollmentForm = fb.group({ 

            loginArray:[''],
            loginName:[''],
            ouName :[''],
            locId:[''],
            locName :[''],
            ouId :[],
            deptId :[],
            emplId:[''],
            orgId:[''],

            vehRegNo:[],
            vehicleId:[],
            vehicleItem:[],
            fuelType :[],
            variant:[],
            variantDesc:[],
            chassisNo:[],
            engineNo:[],
            serviceModel:[],
            deliveryDate:[],
            dealerCode:[],
            kmReading:[],
            soldByEmpId:[],
            custId:[],
           

            enqNo:[],
            enqDate:[],
            packageId:[],
            packageNumber:[],
            packageDesc:[],
            mcpStartDate:[],
            mcpEndDate:[],
            uptoKm:[],
            uptoVehAge:[],

            customerId:[],
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
            

            searchRegno:[],
            searchEnrollNo:[],
            searchEnrollDate:[],

            invLine: this.fb.array([this.invLineDetails()]),

          });
        }
        invLineDetails() {
          return this.fb.group({
            // selectAllflag: [],
          applyTo: [],
          applyrcptFlag: [],
          trxNumber: [],
          trxDate: [],
          invoiceAmount:[],
          balDueAmt:[],
          balance1: [],
          applAmt: [],
          applDate:[],
          billToCustId:[],
          billToSiteId:[],
          invCurrancyCode:[]
  
        })
      }
  
      invLineArray(): FormArray {
        return <FormArray>this.mcpEnrollmentForm.get('invLine')
      }

          ngOnInit(): void 
          {
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

          searchFromArray(arr, regex) {
            let matches = [], i;
            for (i = 0; i < arr.length; i++) {
              if (arr[i].match(regex)) {
                matches.push(arr[i]);
              }
            }
            return matches;
          };
          


          serchByRegNo(mRegNo) {

            alert("REGNO : "+ mRegNo);
            this.service.getVehRegDetails(mRegNo)
            .subscribe(
              data => {
                this.getVehRegDetails = data;
                console.log(this.getVehRegDetails);
                if(this.getVehRegDetails !=null){
                  this.dispCustButton=true;
               
  
                this.mcpEnrollmentForm.patchValue({
                  fuelType: this.getVehRegDetails.fuelType,
                  variant: this.getVehRegDetails.variantCode,
                  variantDesc: this.getVehRegDetails.mainModel,
                  chassisNo: this.getVehRegDetails.chassisNo,
                  engineNo: this.getVehRegDetails.engineNo,
                  deliveryDate: this.getVehRegDetails.vehicleDelvDate,
                  dealerCode: this.getVehRegDetails.dealerCode,
                  vehicleId: this.getVehRegDetails.vin,
                  variantItemId: this.getVehRegDetails.itemId.itemId,
                  vehicleItem: this.getVehRegDetails.itemId.segment,
                  custId: this.getVehRegDetails.customerId,
                  // ewStatus:this.getVehRegDetails.ewStatus,
     
             });
             this.deliveryDate = this.pipe.transform(this.deliveryDate, 'y-MM-dd');
      
         
             this.GetVariantDeatils(this.variant);
             this.GetCustomerDetails(this.custId);
             this.GetCustomerSiteDetails(this.custId);
  
              var saleDate=new Date(this.deliveryDate);
              var mToday   = new Date(Date.now());
  
              // if(this.ewStatus==='Active'){
              //   alert("Extended Warranty is Active for this Customer..."+mRegNo)
              //   this.resetMast();
              // }
          
               this.getDiffDays(saleDate,mToday);
            
           }else { alert("Vehicle Regno. Not Found...."); this.dispCustButton=false; this.mcpEnrollmentForm.reset();}
          }
            );
          }


        
  
          

          serchByVin(mVin) {
            alert(mVin);
            this.service.getVehVinDetails(mVin)
            .subscribe(
              data => {
                this.getVehVinDetails = data;
                console.log(this.getVehVinDetails);
  
                this.mcpEnrollmentForm.patchValue({
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
             });
             this.deliveryDate = this.pipe.transform(this.deliveryDate, 'y-MM-dd');
             alert(this.deliveryDate);
             this.GetVariantDeatils(this.variant);
             this.GetCustomerDetails(this.custId);
  
              var saleDate=new Date(this.deliveryDate);
              var mToday   = new Date(Date.now());
  
              // if(this.ewStatus==='Active'){
              //   alert("Extended Warranty is Active for this Customer..."+mVin+" / " +this.vehRegNo)
              //   this.resetMast(); }
  
                this.getDiffDays(saleDate,mToday);
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
                 console.log(this.CustomerSiteDetails);
                 this.mcpEnrollmentForm.patchValue({
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

          GetVariantDeatils(modelVariant){

            this.service.variantDetailsList(modelVariant)
            .subscribe(
              data => {
                this.variantDetailsList = data;
                console.log(this.variantDetailsList);
                
                this.mcpEnrollmentForm.patchValue({
                  serviceModel: this.variantDetailsList.serviceModel,
                });
              });
          }

          GetCustomerDetails(mCustId :any){
            alert("Customer Id: "+mCustId);
          this.service.ewInsSiteList(mCustId)
          .subscribe(
            data1 => {
              this.CustomerDetailsList = data1;
              console.log(this.CustomerDetailsList);
              this.mcpEnrollmentForm.patchValue({
                custAccountNo:this.CustomerDetailsList.custAccountNo,
                custName: this.CustomerDetailsList.custName,
            });
            }); 
        }

        getDiffDays(date1 ,date2){

          date1 = new Date(date1);
          date2 = new Date(date2);
      //  date2 = this.pipe.transform(date2, 'y-MM-dd');
         var mDays1=date2.getTime()-date1.getTime();
         var mDays2=mDays1 / (1000 * 3600 * 24);
         var mDays3=Math.round(mDays2 - 0.5)

        //  if (mDays3<=7)  {this.paytmentSource ='SALES'} 
        //  else if (mDays3<=730) {this.paytmentSource ='SERVICE'} 
        //  else {
        //    alert("VEHICLE SALE DATE :"+this.pipe.transform(date1,'dd/MM/y') + " AGING : "+ mDays3 +" DAYS...NOT ELIGIBLE FOR AVAILING EXTENDED WARRANTY")
        //    this.resetMast();
        //   }
        this.vehicleAgeDays=mDays3;
      }

      showPkgDetails(){alert ("Package Details......in.. WIP")}
      SearchByMcpEnrollNo(mEnrollmentNo){alert ("SearchBy.....in.. WIP")}
      newMast(){alert ("Save.....in.. WIP")}
      updateMast(){alert ("Update.....in.. WIP")}
      searchMast(){alert ("Search.....in.. WIP")}

      resetMast() {
        window.location.reload();
      }
    
      closeMast() {
        this.router.navigate(['admin']);
      }

}


