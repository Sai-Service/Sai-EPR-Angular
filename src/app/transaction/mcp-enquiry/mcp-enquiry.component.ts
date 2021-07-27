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


interface IMcpEnquiry { 
  regNo:string;
  startKms:number;
  pkgEnquired:string;
  executive:number;
  customerId:number;
  customerSiteId:number;
  sourceDesc:string;
  orderNumber:number;
  }

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
  getPkgDetails:any[];
  getPkgPriceDetails:any;
  getPkgLineDetails:any
  CustomerSiteDetails:any;
  mcpStatusDetails:any;
  vehicleSaleOrderDetails:any;
  lstMcplines: any;
  vehicleItemDetails:any;
  getVehRegDetails_fnd:any;


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
       emplId :number;
        // public emplId =6;

        userList1: any[] = [];
        lastkeydown1: number = 0;
     
        vehicleAgeDays:number;
     
        
        sourceDesc:string='SERVICE'
        regNo:string;itemId :number;
        vehicleId:string;
        orderNumber:number=2111242168;

        vehicleItem:string;
        fuelType :string;
        variantCode:string ;
        mainModel:string;
        chassisNo:string;
        engineNo:string;
        colorCode:string;
        serviceModel:string;
        deliveryDate:string;
        dealerCode:string;
        startKms:number;
        executive : number;
        lastRunKms:number;
       
        ///////////////////////////////
        searchRegno:string;
        searchEnqNo:string;
        searchEnqDate:Date;

        enqNo:string;
        // enqDate:Date;

        now = Date.now();
        enqDate = this.pipe.transform(this.now, 'dd-MM-y');
        startDate = this.pipe.transform(this.now, 'dd-MM-y');
        endDate:string;

        packageId:number;
        // packageNumber:string;
        pkgEnquired:string;
        packageType:string;
        packageDesc:string;
        // mcpStartDate:Date;
       
        validKms:number;
        validMonths:number;
     
        matAmt:number;
        matDiscAmt:number;
        matTaxAmt:number;
        matNetAmt:number;
        matCessAmt:number;

        labAmt:number;
        labDiscAmt:number;
        labTaxAmt:number;
        labNetAmt:number;
        labCessAmt:number;

        consAmt:number;
        consDiscAmt:number;
        consGstAmt:number;
        consNetAmt:number;
        consCessAmt:number;

        totBaseAmt:number;
        discAmt:number;
        totTaxAmt:number;
        totCessAmt:number;
        packageAmt:number;

        customerId:number; 
        custName:string;
        dmsCustNo:number;
        customerSiteId:number;
        customerSiteAddress:string;
        custCity:string;
        custState:String;
        custPincode:string;
        customerGstNo:string
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
          dispCustButton=false;
          showOrderInputLine=false;
          addFlag=true;
          headerValidation=false;
          lineValidation=false;
    
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

            regNo:[],
            itemId:[],
            vehicleId:[],
            orderNumber:[],

        
      
            sourceDesc:[],
            vehicleItem:[],
            fuelType :[],
            variantCode:[],
            mainModel:[],
            chassisNo:[],
            engineNo:[],
            colorCode:[],
            serviceModel:[],
            deliveryDate:[],
            dealerCode:[],
            startKms:[],
            executive:[],
           
            enqNo:[],
            enqDate:[],
            packageId:[],
            pkgEnquired:[],
            packageDesc:[],
            packageType:[],
            startDate:[],
            endDate:[],
            validKms:[],
            validMonths:[],

            packageAmt:[],
            totBaseAmt:[],
            discAmt:[],
            totTaxAmt:[],
            totCessAmt:[],

            lastRunKms:[],
          
            matAmt:[],
            matDiscAmt:[],
            matTaxAmt:[],
            matCessAmt:[],
            matNetAmt:[],

            labAmt:[],
            labDiscAmt:[],
            labTaxAmt:[],
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

            customerId:[],
            customerSiteId:[],
            custAccountNo:[],
            dmsCustNo:['',Validators.required,  Validators.pattern('^[a-zA-Z0-9]')],
            custName:[],
            customerSiteAddress:[],
            custCity:[],
            custState:[],
            custPincode:[],
            customerGstNo:[],
            customerPanNo:[],
            billToSiteId:[],
            custPhone:[],
            customerType:[],
            custTaxCategoryName:[],

            enqDtls: this.fb.array([this.invLineDetails()]),


          });
        }

        invLineDetails() {
          return this.fb.group({
            // selectAllflag: [],
         
          itemNumber: [],
          itemDesc: [],
          itemId: [],  
          itemType: [],
          erpCode: [],
          quantity:[],
          pkgQuantity: [],
          erpQuantity: [],
          rate:[],
          basicAmt:[],
          discPer:[],
          disAmt:[],
          netAmt:[],
          gstAmt:[],
      
        })
      }
  
      invLineArray(): FormArray {
        return <FormArray>this.mcpEnquiryForm.get('enqDtls')
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
            this.emplId= Number(sessionStorage.getItem('emplId'));
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

       resetSection1() {
            this.regNo=null;
            this.vehicleId =null;
            this.orderNumber=null;
            this.vehicleItem=null;
            this.variantCode=null;
            this.mainModel=null;
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
            this.custCity=null;
            this.custState=null;
            this.custPincode=null;
            this.customerGstNo=null;
            this.customerPanNo=null;
            this.customerType=null;
            this.startKms=null;
       
            }

            resetSection2() {
              this.enqNo=null;
              // this.enqDate=null;
              this.executive=null
              this.pkgEnquired=null;
              this.mcpPackageList=null
              this.packageDesc=null;
              this.packageType=null;
              this.validKms=null;
              this.validMonths=null;
              // this.startDate=null;
              this.endDate=null;
             }

             resetSection3() {
              this.matAmt=null;
              this.matDiscAmt=null;
              this.matTaxAmt=null;
              this.matNetAmt=null;
              this.matCessAmt=null;
              this.labAmt=null;
              this.labDiscAmt=null;
              this.labTaxAmt=null;
              this.labNetAmt=null;
              this.labCessAmt=null;
              this.consAmt=null;
              this.consDiscAmt=null;
              this.consGstAmt=null;
              this.consNetAmt=null;
              this.consCessAmt=null;
              this.totBaseAmt=null;
              this.discAmt=null;
              this.totTaxAmt=null;
              this.totCessAmt=null;
              this.packageAmt=null;
            
             }
           
            
        

            GetVehicleRegInfomation(mRegNo){
              // alert("REGNO:"+mRegNo)
              this.service.getVehRegDetails(mRegNo)
      
                .subscribe(
                  data => {
                    this.vehicleItemDetails = data;
                    console.log(this.vehicleItemDetails);
                    this.mcpEnquiryForm.patchValue({
                      vehicleId: this.vehicleItemDetails.vin,
                      variantItemId: this.vehicleItemDetails.itemId.itemId,
                      deliveryDate : this.vehicleItemDetails.vehicleDelvDate,
                      vehicleItem: this.vehicleItemDetails.itemId.segment,
                      dealerCode: this.vehicleItemDetails.dealerCode,
                      // itemDesc: this.VehicleRegDetails.itemId.segment,
              });
          
                //  this.GetItemDeatils1(this.variantItemId);
             
              
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

          GetOrderDetails(mOrderNumber:any) {
          // alert("order details...."+ mOrderNumber);

          this.service.getVehicleOrderDetails(mOrderNumber)
          .subscribe(
            data => {
              this.vehicleSaleOrderDetails = data;
              console.log(this.vehicleSaleOrderDetails);
              

              if (this.vehicleSaleOrderDetails===null) 
              {
                alert("Order Number : [" + mOrderNumber+ "]  Not Found/doesnot Exist....")
                this.resetSection1();
                this.resetSection2();
                this.resetSection3();
                this.showDetailsButton=false;
                return;
              } 

              this.mcpEnquiryForm.patchValue({
                regNo: this.vehicleSaleOrderDetails.regNo,
                vehicleId: this.vehicleSaleOrderDetails.vin,
                mainModel: this.vehicleSaleOrderDetails.mainModel,
                variantCode: this.vehicleSaleOrderDetails.variantCode,
                fuelType: this.vehicleSaleOrderDetails.fuelType,
                chassisNo: this.vehicleSaleOrderDetails.chassisNo,
                engineNo: this.vehicleSaleOrderDetails.engineNo,
                dealerCode: this.vehicleSaleOrderDetails.dealerCode,
                colorCode: this.vehicleSaleOrderDetails.colorCode,
                deliveryDate: this.vehicleSaleOrderDetails.vehicleDelvDate,
                vehicleItem: this.vehicleSaleOrderDetails.itemId.segment,
                customerId: this.vehicleSaleOrderDetails.customerId,
                
           });

            //  this.getMcpStatus(this.regNo);
             this.GetVariantDeatils(this.variantCode);
             this.GetCustomerDetails(this.customerId);
            
            //  this.GetLastRunKmsSearch(mRegNo)

               if(this.isMcpActive ==false) {
                this.GetCustomerSiteDetails(this.customerId);
                // this.CustAccountNoSearchSite(this.custAccountNo);
                var saleDate=new Date(this.deliveryDate);
                var mToday   = new Date(Date.now());
                this.getDiffDays(saleDate,mToday);
              }
          } ); }

          


          serchByRegNo(mRegNo) {

            // alert("REGNO : "+ mRegNo);
            this.service.getVehRegDetails(mRegNo)
            .subscribe(
              data => {
                this.getVehRegDetails = data;

                // alert(this.getVehRegDetails);

                if(this.getVehRegDetails !=null){
                  this.dispCustButton=true;
                console.log(this.getVehRegDetails);
  
                  this.mcpEnquiryForm.patchValue({
                  fuelType: this.getVehRegDetails.fuelType,
                  variantCode: this.getVehRegDetails.variantCode,
                  mainModel: this.getVehRegDetails.mainModel,
                  chassisNo: this.getVehRegDetails.chassisNo,
                  engineNo: this.getVehRegDetails.engineNo,
                  colorCode: this.getVehRegDetails.colorCode,
                  deliveryDate: this.getVehRegDetails.vehicleDelvDate,
                  dealerCode: this.getVehRegDetails.dealerCode,
                  vehicleId: this.getVehRegDetails.vin,
                  itemId : this.getVehRegDetails.itemId.itemId,
                  vehicleItem: this.getVehRegDetails.itemId.segment,
                  customerId: this.getVehRegDetails.customerId,
                  // ewStatus:this.getVehRegDetails.ewStatus,
     
             });
             this.deliveryDate = this.pipe.transform(this.deliveryDate, 'y-MM-dd');
      
            //  this.getMcpStatus(mRegNo);
             this.GetVariantDeatils(this.variantCode);
             this.GetCustomerDetails(this.customerId);
  
              var saleDate=new Date(this.deliveryDate);
              var mToday   = new Date(Date.now());
  
             
               this.GetLastRunKmsSearch(mRegNo)

               if(this.isMcpActive ==false) {
                this.GetCustomerSiteDetails(this.customerId);
                // this.CustAccountNoSearchSite(this.custAccountNo);
                var saleDate=new Date(this.deliveryDate);
                var mToday   = new Date(Date.now());
                this.getDiffDays(saleDate,mToday);
  
              } 
            
            } else { alert("Vehicle Regno. Not Found...."); 
                this.dispCustButton=false; this.showDetailsButton=false;
                this.resetSection1(); this.resetSection2();this.resetSection3();return;}
            } ); 
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
                  variantCode: this.getVehVinDetails.variantCode,
                  mainModel: this.getVehVinDetails.mainModel,
                  chassisNo: this.getVehVinDetails.chassisNo,
                  engineNo: this.getVehVinDetails.engineNo,
                  deliveryDate: this.getVehVinDetails.vehicleDelvDate,
                  dealerCode: this.getVehVinDetails.dealerCode,
                  regNo: this.getVehVinDetails.regNo,
                  itemDesc: this.getVehVinDetails.itemId.segment,
                  itemId: this.getVehVinDetails.itemId.itemId,
                  customerId: this.getVehVinDetails.customerId,
                  ewStatus:this.getVehVinDetails.ewStatus,
             });
             this.deliveryDate = this.pipe.transform(this.deliveryDate, 'y-MM-dd');
             alert(this.deliveryDate);
             this.GetVariantDeatils(this.variantCode);
             this.GetCustomerDetails(this.customerId);
  
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
            // if(this.sourceDesc==='SERVICE') {
             this.service.getMcpstatusVehcile(mRegNo)
            .subscribe(
              data => {
                this.mcpStatusDetails = data
                alert("this.mcpStatusDetails :"+this.mcpStatusDetails);
                if (this.mcpStatusDetails===false) 
                {
                  this.isMcpActive=false; 
                  alert("MCP is Not Active for the Vehicle : "+mRegNo );

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
     
          });}
        //  }

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
              this.dispCustButton=true;
               console.log(this.CustomerSiteDetails);
               this.mcpEnquiryForm.patchValue({
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

      LoadPackage(mRegNo,mKms){
        // alert(mVariant+","+mAging+","+mKmsCurr);
          this.service.mcpSchemeList(mRegNo,mKms)
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
     
          if(mKms<=0 || this.variantCode ===null   || mKms < this.lastRunKms ) {
          
            alert("Invalid KM Reading Or\nKM Reading entered is lesser than Last Run Km("+ this.lastRunKms+") Or \nCheck Model Variant Deatils..") 
            // alert("Invalid KM Reading ..") ;
            this.startKms=null;
            return;
          } else { this.LoadPackage(this.regNo,mKms);}
         }

       


         onSelectPackageNumber(pkgNo:any){

         if (this.addFlag) {

          if(pkgNo !='--Select--' && pkgNo != null) {
            this.service.getMcpPackageSearchNew2(pkgNo ,this.fuelType,this.ouId)
              .subscribe(
              data => {
                this.getPkgDetails = data;
                console.log(this.getPkgDetails);
                if(this.getPkgDetails !=null){
                   this.packageType=this.getPkgDetails[0].packageType;
                   this.packageDesc= this.getPkgDetails[0].packageDesc;
                   this.validKms= this.getPkgDetails[0].validKm;
                   this.validMonths= this.getPkgDetails[0].validPeriod;
                  //  this.startDate= this.getPkgDetails[0].startDate;
                  //  this.endDate= this.getPkgDetails[0].endDate;

                //  this.mcpEnquiryForm.patchValue({
                //   packageDesc: this.getPkgDetails.packageDesc, 
                //   packageType:this.getPkgDetails.packageType,});
                  this.getPackagePriceDetails(pkgNo,this.getPkgDetails[0].packageType,this.fuelType);
                  this.showPkgLineDetails();
                  this.showDetailsButton=true;

                  // ------------Date-----------
                  var stDate=new Date(this.startDate);
                  var ew2=this.addDays(stDate,1);
                  this.endDate=this.pipe.transform(ew2, 'y-MM-dd');
                 // ------------Date-----------
                
                } else {alert("Package Details Not Found....");this.showDetailsButton=false;}
              } );   } }
              
            }
            
           

            addDays(date1: Date, days1: number): Date {
              date1.setDate(date1.getDate() + days1);
              return date1;
              }

            getPackagePriceDetails(mpkgNo,mPkgType,fType) {
              // alert("inside price details ..." +mpkgNo+","+mPkgType);
              // getMcpPackagePriceDetails(mPkgNo,mFuelType,mType,mOuId,mVariant,mCustSite,mLocId)
              var mFuelType=this.fuelType;
              this.service.getMcpPackagePriceDetails(mpkgNo,fType,mPkgType,this.ouId,this.variantCode,this.customerSiteId,this.locId)
              .subscribe(
              data => {
                this.getPkgPriceDetails = data;
                console.log(this.getPkgPriceDetails);
                // alert(data.packageDesc);

                this.mcpEnquiryForm.patchValue({
                  labAmt: this.getPkgPriceDetails.totLabBasic,
                  labDiscAmt: this.getPkgPriceDetails.totLabDis,
                  labTaxAmt: this.getPkgPriceDetails.totLabGst,
                  labCessAmt: this.getPkgPriceDetails.totLabCess,
                  labNetAmt: this.getPkgPriceDetails.totLabNet,

                  matAmt: this.getPkgPriceDetails.totMatBasic,
                  matDiscAmt: this.getPkgPriceDetails.totMatDisc,
                  matTaxAmt: this.getPkgPriceDetails.totMatGst,
                  matCessAmt: this.getPkgPriceDetails.totMatCess,
                  matNetAmt: this.getPkgPriceDetails.totMatNet,

                  consAmt: 0,
                  consDiscAmt: 0,
                  consGstAmt: 0,
                  consCessAmt: 0,
                  consNetAmt: 0,

                    totBaseAmt: (this.getPkgPriceDetails.totMatBasic+this.getPkgPriceDetails.totLabBasic),
                    discAmt: (this.getPkgPriceDetails.totMatDisc+this.getPkgPriceDetails.totLabDis),
                    totTaxAmt: (this.getPkgPriceDetails.totMatGst+this.getPkgPriceDetails.totLabGst),
                    totCessAmt: 0,
                    packageAmt:this.getPkgPriceDetails.totPackageAmt,
                 });
      
              } );   


            }

        
            showPkgLineDetails(){

              this.invLineArray().reset();
              // alert ("Package Details......in.. WIP")
              this.service.getMcpPackageLineDetails(this.pkgEnquired,this.fuelType,this.ouId,this.variantCode,1,this.locId)
              .subscribe(
              data => {
                this.getPkgLineDetails = data;
                console.log(this.getPkgLineDetails);

                  var len=this.invLineArray().length;
                  alert( "Total Package Line Items :"+ this.getPkgLineDetails.length);
                  
                 

                    var y=0;
                    for (let i = 0; i < this.getPkgLineDetails.length - len; i++) 
                    {
                      var invLnGrp: FormGroup = this.invLineDetails();
                      this.invLineArray().push(invLnGrp);
                     
                    }
                    this.mcpEnquiryForm.get('enqDtls').patchValue(this.getPkgLineDetails);
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
         
        transeData(val) {
    
          delete val.loginArray;
          delete val.loginName;
          delete val.locName;
          delete val.ouName;
          // delete val.locId;
          delete val.ouId;
          delete val.deptId;
          delete val.emplId;
          delete val.orgId;
          delete val.divisionId;

          delete val.vehicleId;
          delete val.vehicleItem;
          delete val.serviceModel;
          delete val.deliveryDate;
          delete val.dealerCode;
          delete val.packageType;
          delete val.packageDesc;
          delete val.lastRunKms;
          delete val.totBaseAmt;
          delete val.totTaxAmt;
          delete val.totCessAmt;
          delete val.matDiscAmt;
          delete val.matCessAmt;
          delete val.matNetAmt;
          delete val.labDiscAmt;
          delete val.labNetAmt;
          delete val.labCessAmt;
          delete val.consAmt;
          delete val.consDiscAmt;
          delete val.consGstAmt;
          delete val.consNetAmt;
          delete val.consCessAmt;
          delete val.searchRegno;
          delete val.searchEnqNo;
          delete val.searchEnqDate;
          // delete val.customerSiteId; 
          delete val.custAccountNo; 
          delete val.custName; 
          delete val.customerSiteAddress;
          delete val.custCity; 
          delete val.custState; 
          delete val.custPincode; 
          delete val.customerGstNo; 
          delete val.customerPanNo; 
          delete val.billToSiteId; 
          delete val.custPhone; 
          delete val.customerType; 
          delete val.custTaxCategoryName; 

          // delete val.enqNo;
          delete val.enqDate;
          delete val.packageId;
         
         return val;
        }

      

        newMast() {
      
             this.checkHeaderValidations();
             if (this.headerValidation==true ) { 
               alert("Header Validation Sucessfull...") 

            const formValue: IMcpEnquiry =this.transeData(this.mcpEnquiryForm.value);
            // var pkId = formValue.packageNumber;
            // alert(pkId.substr(3, pkId.length));
            // formValue.packageId = Number (pkId.substr(3, pkId.length)); 

            this.service.McpEnquiryMasterSubmit(formValue).subscribe((res: any) => {
              if (res.code === 200) {
                alert('RECORD INSERTED SUCCESSFUILY');
                this.displayButton=false;
                // this.enqNo=res.obj;
                this.mcpEnquiryForm.disable();
                // this.mcpEnquiryForm.reset();
                
              } else {
                if (res.code === 400) {
                  alert('ERROR WHILE INSERTING');
                  // this.resetMast();
                }
              }
            });
          }
          else { alert("Header Validation Failed... Please Check");  return;   }
         
    } 


    
      //  SearchByMcpEnqNo1(mEnqNo:any){
      //   this.service.getsearchByEnqNo(mEnqNo)
      //     .subscribe(
      //       data => {
      //         this.lstMcplines = data;
      //         console.log(this.lstMcplines);
             
      //     } );   }



            SearchByMcpEnqNo(mEnqNo:any){
              // this.mcpEnquiryForm.reset();
              var xEnq = mEnqNo.toUpperCase();
              this.resetSection1(); this.resetSection3(); this.resetSection3();
              this.addFlag=false;
              this.displayButton=false;

              console.log(this.mcpEnquiryForm.value);
              this.service.getsearchByEnqNo(xEnq)
                .subscribe(
                  data => {
                    this.lstMcplines = data;
                    this.mcpEnquiryForm.patchValue(this.lstMcplines);
                    this.executive=this.lstMcplines.executive;
                    
                    // ---------------------------Header Details--------------------------------
                        this.GetVehicleRegInfomation(this.lstMcplines.regNo);
                        this.GetVariantDeatils(this.lstMcplines.variantCode);
                        this.GetCustomerDetails(this.customerId);
                        this.GetCustomerSiteDetails(this.customerId)
                        this.LoadPackage(this.lstMcplines.regNo,this.lstMcplines.startKms)
                        this.getPackageInfo(this.pkgEnquired,this.lstMcplines.fuelType)
                        
                        this.totBaseAmt= (this.lstMcplines.labAmt+this.lstMcplines.matAmt);
                        // this.discAmt= (this.lstMcplines.totMatDisc+this.lstMcplines.totLabDis),
                        this.totTaxAmt= (this.lstMcplines.labTaxAmt+this.lstMcplines.matTaxAmt);

                      // ----------------------------LINE DETAILS----------------------------------------
                      for(let i=0; i<this.invLineArray.length; i++){ 
                        this.invLineArray().removeAt(i);
                      }

                      this.invLineArray().clear();
                      var control = this.mcpEnquiryForm.get('enqDtls') as FormArray;
                      for (let i=0; i<this.lstMcplines.enqDtls.length;i++) 
                        {
                          var enqDtls:FormGroup=this.invLineDetails();
                          control.push(enqDtls);
                        }
                            
                      this.mcpEnquiryForm.get('enqDtls').patchValue(this.lstMcplines.enqDtls);
                      this.showDetailsButton=true
                      this.mcpEnquiryForm.get('executive').disable();

                      // ----------------------------------------------------------------------------
          
                     } ); 

              }

              getPackageInfo(pkgNo,fType,){
                // alert(pkgNo + ","+fType);
              this.service.getMcpPackageSearchNew2(pkgNo ,fType,this.ouId)
              .subscribe(
              data => {
                this.getPkgDetails = data;
                console.log(this.getPkgDetails);
                if(this.getPkgDetails !=null){

                   this.packageType=this.getPkgDetails[0].packageType;
                   this.packageDesc= this.getPkgDetails[0].packageDesc;
                   this.validKms= this.getPkgDetails[0].validKm;

                }
              }); }

           
          
         
     


      
      updateMast(){alert ("Update.....in.. WIP")}
      printMast(){alert ("Print Slip.....in.. WIP")}

      resetMast() {
        window.location.reload();
      }
    
      closeMast() {
        this.router.navigate(['admin']);
      }


      checkHeaderValidations()  {
        const formValue: IMcpEnquiry = this.mcpEnquiryForm.value

        // if(this.sourceDesc==='SERVICE') {

        if (formValue.regNo===undefined || formValue.regNo===null || formValue.regNo.trim()==='')
        {
           this.headerValidation=false; 
           alert ("VEHICLE REGISTRATION NUMBER : Should not be null....");
           
            return;
         } 
        // }

        if(this.sourceDesc==='SALES') {

          if (formValue.orderNumber===undefined || formValue.orderNumber===null || formValue.orderNumber<=0)
          {
             this.headerValidation=false; 
             alert ("VEHICLE SALE ORDER NUMBER : Should not be null....\nAttach Reg.Number to Order and Try again.");
             
              return;
           } 
          }


         if (formValue.customerId===undefined || formValue.customerId===null || formValue.customerId<=0)
         {
            this.headerValidation=false; 
            alert ("CUSTOMER DETAILS : Not Found....");
            
             return;
          } 

          
         if (formValue.customerSiteId===undefined || formValue.customerSiteId===null || formValue.customerSiteId<=0)
         {
            this.headerValidation=false; 
            alert ("CUSTOMER SITE DETAILS : Not Found...");
            
             return;
          } 

    
         if (formValue.startKms===undefined || formValue.startKms===null || formValue.startKms<=0)
         {
            this.headerValidation=false; 
            alert ("KM READING : Should not be null....");
           
             return;
          } 

        if (formValue.pkgEnquired===undefined || formValue.pkgEnquired===null)
        {
            alert ("PACKAGE : Select Package Name");
            return;
         } 

        if (formValue.executive===undefined || formValue.executive===null)
        {
            this.headerValidation=false;   
            alert ("SALES PERSON: Select Sales Person");
            return;
         } 
        
          this.headerValidation=true;
      }

}




