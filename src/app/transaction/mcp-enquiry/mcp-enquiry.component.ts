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


interface IMcpEnquiry {   }

@Component({
  selector: 'app-mcp-enquiry',
  templateUrl: './mcp-enquiry.component.html',
  styleUrls: ['./mcp-enquiry.component.css']
})
export class McpEnquiryComponent implements OnInit {
  
  mcpEnquiryForm : FormGroup;

  pipe = new DatePipe('en-US');
  

  public OUIdList           : Array<string> = [];
  public VehRegNoList       : Array<string> = [];
  public VehVinList         : Array<string> = [];
  public issueByList        : Array<string> = [];
  public mcpPackageList     : Array<string> = [];
  
  getVehRegDetails:any;
  getVehVinDetails:any;
  variantDetailsList:any;
  CustomerDetailsList:any;
  getLastRunKmsVeh:any;
  getPkgDetails:any;
  getPkgPriceDetails:any;
  getPkgLineDetails:any
  CustomerSiteDetails:any;
  mcpStatusDetails:any;


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
        lastRunKms:number;
       
        ///////////////////////////////
        searchRegno:string;
        searchEnqNo:string;
        searchEnqDate:Date;

        enqNo:string;
        // enqDate:Date;

        now = Date.now();
        enqDate = this.pipe.transform(this.now, 'dd-MM-y h:mm:ss');

        packageId:number;
        packageNumber:string;
        packageType:string;
        packageDesc:string;
        // mcpStartDate:Date;
        mcpStartDate = this.pipe.transform(this.now, 'y-MM-dd');
        mcpEndDate:Date;
        uptoKm:number;
        uptoVehAge:number;
        

        packageAmt:number;
        matAmt:number;
        matDiscAmt:number;
        matGstAmt:number;
        matNetAmt:number;
        matCessAmt:number;

        labAmt:number;
        labDiscAmt:number;
        labGstAmt:number;
        labNetAmt:number;
        labCessAmt:number;

        consAmt:number;
        consDiscAmt:number;
        consGstAmt:number;
        consNetAmt:number;
        consCessAmt:number;


        custId:number; 
        dmsCustNo:number;
        custName:string;
        customerSiteId:number;
        customerSiteAddress:string;
        CustomerGstNo:string
        customerPanNo:string
        custAccountNo:number;
        billToSiteId:number;
        custPhone:string;
        customerType:string;
        custTaxCategoryName:string;


          //////////////////////////////////
          displayInactive = true;
          Status1: any;
          inactiveDate: Date;
          display = true;
          displayButton = true;
          showDetailsButton=false;
          isMcpActive=false;
          //////////////////////////////////
  

  get f() { return this.mcpEnquiryForm.controls; }
  mcpEnquiry(mcpEnquiryForm:any) {  }

        constructor(private service: MasterService,private orderManagementService:OrderManagementService,private  fb: FormBuilder, private router: Router) {
          this.mcpEnquiryForm = fb.group({ 

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
           
            enqNo:[],
            enqDate:[],
            packageId:[],
            packageNumber:[],
            packageDesc:[],
            packageType:[],
            mcpStartDate:[],
            mcpEndDate:[],
            uptoKm:[],
            uptoVehAge:[],

            packageAmt:[],
            lastRunKms:[],
          
            matAmt:[],
            matDiscAmt:[],
            matGstAmt:[],
            matCessAmt:[],
            matNetAmt:[],

            labAmt:[],
            labDiscAmt:[],
            labGstAmt:[],
            labNetAmt:[],
            labCessAmt:[],

            consAmt:[],
            consDiscAmt:[],
            consGstAmt:[],
            consNetAmt:[],
            consCessAmt:[],

            searchRegno:[],
            searchEnqNo:[],
            searchEnqDate:[],

            custId:[],
            customerSiteId:[],
            custAccountNo:[],
            dmsCustNo:['',Validators.required,  Validators.pattern('^[a-zA-Z0-9]')],
            custName:[],
            customerSiteAddress:[],
            CustomerGstNo:[],
            customerPanNo:[],
            billToSiteId:[],
            custPhone:[],
            customerType:[],
            custTaxCategoryName:[],

            invLine: this.fb.array([this.invLineDetails()]),


          });
        }

        invLineDetails() {
          return this.fb.group({
            // selectAllflag: [],
          itemNumber: [],
          itemDesc: [],
          itemType: [],
          erpCode: [],
          quantity:[],
          priceValue:[],
          pkgQuantity: [],
          erpQuantity: [],
          basicAmount:[],
          discount:[],
          disAmount:[],
          gstAmount:[],
          netAmount:[],
  
        })
      }
  
      invLineArray(): FormArray {
        return <FormArray>this.mcpEnquiryForm.get('invLine')
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

          SearchByMcpEnqNo(mEnqNo){
            alert("Search by Enquiry no........WIP " +mEnqNo);
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

            // alert("REGNO : "+ mRegNo);
            this.service.getVehRegDetails(mRegNo)
            .subscribe(
              data => {
                this.getVehRegDetails = data;
                console.log(this.getVehRegDetails);
  
                this.mcpEnquiryForm.patchValue({
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
      
             this.getMcpStatus(mRegNo);
             this.GetVariantDeatils(this.variant);
             this.GetCustomerDetails(this.custId);
  
              var saleDate=new Date(this.deliveryDate);
              var mToday   = new Date(Date.now());
  
               this.LoadPackage(mRegNo)
               this.GetLastRunKmsSearch(mRegNo)

               if(this.isMcpActive ==false) {
                this.GetCustomerSiteDetails(this.custId);
                // this.CustAccountNoSearchSite(this.custAccountNo);
                var saleDate=new Date(this.deliveryDate);
                var mToday   = new Date(Date.now());
                this.getDiffDays(saleDate,mToday);
  
              } 
            
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
  
                this.mcpEnquiryForm.patchValue({
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
          
          getMcpStatus(mRegNo:any) {
            // alert (" ew status Reg No.....:"+mRegNo);
             this.service.getMcpstatusVehcile(mRegNo)
            .subscribe(
              data => {
                this.mcpStatusDetails = data
                alert("this.mcpStatusDetails :"+this.mcpStatusDetails);
                if (this.mcpStatusDetails===null) 
                {
                  this.isMcpActive=false; 
                } 
                else
                {
                  console.log(this.mcpStatusDetails);
                //   this.mcpEnquiryForm.patchValue({
                //   ewId:this.mcpStatusDetails.ewId,
                //   ewInvoiceNo:this.mcpStatusDetails.ewInvoiceNo,
                //   ewBookletNo:this.mcpStatusDetails.ewBookletNo,
                //   ewSaleDate:this.mcpStatusDetails.ewSaleDate,
                //   ewStartDate:this.mcpStatusDetails.ewStartDate,
                //   ewEndDate:this.mcpStatusDetails.ewEndDate,
                //   ewPeriod:this.mcpStatusDetails.ewPeriod,
                // });   
                  this.isMcpActive=true;
                  alert("MCP is Active for the Vehicle : "+mRegNo );

                  // "\nEW Contract No  : "+this.ewId +
                  // "\nEW Invoice No  : "+this.ewInvoiceNo +
                  // "\nEW BookletNo  : "+this.ewBookletNo +
                  // "\nEW Start Date - End Date : "+this.pipe.transform(this.ewStartDate, 'dd-MM-y')+ " to "+this.pipe.transform(this.ewEndDate,'dd-MM-y')+
                  // "\nEW Term     : "+this.ewPeriod)

                  this.resetMast();
                  return;
              
              } 
     
          }); }
          GetVariantDeatils(modelVariant){

            this.service.variantDetailsList(modelVariant)
            .subscribe(
              data => {
                this.variantDetailsList = data;
                console.log(this.variantDetailsList);
                
                this.mcpEnquiryForm.patchValue({
                  serviceModel: this.variantDetailsList.serviceModel,
                });
              });
          }

          GetCustomerDetails(mCustId :any){
            // alert("Customer Id: "+mCustId);
          this.service.ewInsSiteList(mCustId)
          .subscribe(
            data1 => {
              this.CustomerDetailsList = data1;
              console.log(this.CustomerDetailsList);
              this.mcpEnquiryForm.patchValue({
                custAccountNo:this.CustomerDetailsList.custAccountNo,
                custName: this.CustomerDetailsList.custName,
            });
            }); 
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
               this.mcpEnquiryForm.patchValue({
                customerSiteId:this.CustomerSiteDetails.customerSiteId,
                customerSiteAddress:this.CustomerSiteDetails.address1+","+
                                    this.CustomerSiteDetails.address2+","+
                                    this.CustomerSiteDetails.address3+","+
                                    this.CustomerSiteDetails.location+","+
                                    this.CustomerSiteDetails.city+","+
                                    this.CustomerSiteDetails.state+"-"+
                                    this.CustomerSiteDetails.pinCd,
              CustomerGstNo:this.CustomerSiteDetails.gstNo,
              customerPanNo:this.CustomerSiteDetails.panNo,
              custPhone:this.CustomerSiteDetails.mobile1,
              customerType:this.CustomerSiteDetails.customerId.custType,
              custTaxCategoryName:this.CustomerSiteDetails.taxCategoryName,
               
          });
  
          }  });  }


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

      LoadPackage(mRegNo){
        // alert(mVariant+","+mAging+","+mKmsCurr);
          this.service.mcpSchemeList(mRegNo)
          .subscribe(
            data1 => {
              this.mcpPackageList = data1;
              console.log(this.mcpPackageList);

            }
          );  
      }

      GetLastRunKmsSearch(mRegNo){
        var z=0;
       this.service.getLastRunKms(mRegNo)
       .subscribe(
         data => {
           this.getLastRunKmsVeh = data;
           console.log(this.getLastRunKmsVeh);
          
           this.mcpEnquiryForm.patchValue({
               lastRunKms: this.getLastRunKmsVeh.lastRunKms, });
         
         } );}


         onEnterKms(mKms : any)
         {
         
           alert("Last Run Km :" + this.lastRunKms +" curr Reading :"+mKms);
           if(this.lastRunKms===null) {this.lastRunKms=0;   }
             // alert("Last Run Km :" + this.lastRunKms);
         
 
          if(mKms<=0 || this.variant ===null || mKms < this.lastRunKms ) {
            alert("Invalid KM Reading Or\nKM Reading entered is lesser than Last Run Km("+ this.lastRunKms+") Or \nCheck Model Variant Deatils..") 
            this.kmReading=null;
            return;
          }
         }


         onSelectPackageNumber(pkgNo:any){

          if(pkgNo !='--Select--' && pkgNo != null) {
            this.service.getMcpPackageSearchNew2(pkgNo ,this.fuelType)
              .subscribe(
              data => {
                this.getPkgDetails = data;
                console.log(this.getPkgDetails);
                if(this.getPkgDetails !=null){
                 this.mcpEnquiryForm.patchValue({
                  packageDesc: this.getPkgDetails.packageDesc, 
                  packageType:this.getPkgDetails.packageType,});

                  this.getPackagePriceDetails(pkgNo,this.packageType,this.getPkgDetails.fuelType);
                  this.showPkgLineDetails();
                  this.showDetailsButton=true;
                
                } else {alert("Package Details Not Found....");this.showDetailsButton=false;}
              } );  
              
            }
            
            }

            getPackagePriceDetails(mpkgNo,mPkgType,fType) {
              // alert("inside price details ..." +mpkgNo+","+mPkgType);
              // getMcpPackagePriceDetails(mPkgNo,mFuelType,mType,mOuId,mVariant,mCustSite,mLocId)
              var mFuelType=this.fuelType;
              this.service.getMcpPackagePriceDetails(mpkgNo,fType,mPkgType,this.ouId,this.variant,this.customerSiteId,this.locId)
              .subscribe(
              data => {
                this.getPkgPriceDetails = data;
                console.log(this.getPkgPriceDetails);
                // alert(data.packageDesc);

                this.mcpEnquiryForm.patchValue({
                  labAmt: this.getPkgPriceDetails.totLabBasic,
                  labDiscAmt: this.getPkgPriceDetails.totLabDis,
                  labGstAmt: this.getPkgPriceDetails.totLabGst,
                  labCessAmt: this.getPkgPriceDetails.totLabCess,
                  labNetAmt: this.getPkgPriceDetails.totLabNet,

                  matAmt: this.getPkgPriceDetails.totMatBasic,
                  matDiscAmt: this.getPkgPriceDetails.totMatDisc,
                  matGstAmt: this.getPkgPriceDetails.totMatGst,
                  matCessAmt: this.getPkgPriceDetails.totMatCess,
                  matNetAmt: this.getPkgPriceDetails.totMatNet,

                  // consAmt: this.getPkgPriceDetails.totLabBasic,
                  // consDiscAmt: this.getPkgPriceDetails.totLabDis,
                  // consGstAmt: this.getPkgPriceDetails.totLabGst,
                  // consCessAmt: this.getPkgPriceDetails.totLabCess,
                  // consNetAmt: this.getPkgPriceDetails.totLabNet,

                  packageAmt:this.getPkgPriceDetails.totPackageAmt,
                 });
      
              } );   


            }

        
            showPkgLineDetails(){

              this.invLineArray().reset();
              // alert ("Package Details......in.. WIP")
              this.service.getMcpPackageLineDetails(this.packageNumber,this.fuelType,this.ouId,this.variant,1,this.locId)
              .subscribe(
              data => {
                this.getPkgLineDetails = data;
                console.log(this.getPkgLineDetails);

                var len=this.invLineArray().length;
                    // alert(len);
                   

                    var y=0;
                    for (let i = 0; i < this.getPkgLineDetails.length - len; i++) 
                    {
                      var invLnGrp: FormGroup = this.invLineDetails();
                      this.invLineArray().push(invLnGrp);
                     
                    }
                    this.mcpEnquiryForm.get('invLine').patchValue(this.getPkgLineDetails);
          } );   

            }


        // searchByPackageId(mPkgId) {
        //   alert ("Package No : "+mPkgId);
        //   this.service.getMcpPackageSearchByPkgId(mPkgId)
        //       .subscribe(
        //       data => {
        //         this.getPkgDetails = data;
        //         alert("Records Found : "+ this.getPkgDetails.length);
        //         console.log(this.getPkgDetails);

        //         this.mcpEnquiryForm.patchValue({
        //           packageDesc: this.getPkgDetails.packageDesc, });
      
        //       } ); 


        // }
         


      

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




