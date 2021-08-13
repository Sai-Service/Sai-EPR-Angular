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


interface IMcpCancel {   }

@Component({
  selector: 'app-mcp-cancellation',
  templateUrl: './mcp-cancellation.component.html',
  styleUrls: ['./mcp-cancellation.component.css']
})
export class McpCancellationComponent implements OnInit {

  mcpCancellationForm : FormGroup;

  pipe = new DatePipe('en-US');
  

  public OUIdList           : Array<string> = [];
  public VehRegNoList       : Array<string> = [];
  public VehVinList         : Array<string> = [];
  public issueByList        : Array<string> = [];
  
  getVehRegDetails:any;
  getVehVinDetails:any;
  variantDetailsList:any;
  CustomerDetailsList:any;
  lstMcplines: any;
  CustomerSiteDetails:any;
  vehicleItemDetails:any;
  getPkgDetails:any[];

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
        custAccountNo:number;
        dmsCustNo:number;
        custName:string;

        vehicleItem:string;
        fuelType :string;
        variantCode:string ;
        mainModel:string;
        chassisNo:string;
        engineNo:string;
        serviceModel:string;
        deliveryDate:string;
        dealerCode:string;
        currentKms:number;
        executive : string;
        invoiceNo:string;
        invoiceDate:Date;
       
        ///////////////////////////////
        searchRegno:string;
        searchEnrollNo:string;
        searchEnrollDate:Date;

        enrollmentNo:string;
        enrollmentDt:Date;
        // enqDate:Date;

        now = Date.now();
        // enrollmentDate = this.pipe.transform(this.now, 'dd-MM-y h:mm:ss');
       
        mcpCancelDate = this.pipe.transform(Date.now(), 'y-MM-dd');
        packageId:number;
        packageNumber:string;
        packageDesc:string;
        pkgStartDate:Date;
        pkgEndDate:Date;
        uptoKm:number;
        uptoVehAge:number;

        packageAmt:number;
        refundAmt:number;

        totMatAmt:number;
        matDiscAmt:number;
        matGstAmt:number;
        matNetAmt:number;
        matCessAmt:number;

        totLabAmt:number;
        labDiscAmt:number;
        labGstAmt:number;
        labNetAmt:number;
        labCessAmt:number;

        consAmt:number;
        consDiscAmt:number;
        consGstAmt:number;
        consNetAmt:number;
        consCessAmt:number;

        discTotal:number;
        taxTotal:number;
        netTotal:number;

        mcpCancelCharges:string;
        mcpCancelValue:number;
        // mcpCancelDate:Date;
        mcpCancelReason:string;

        refPartAmt:number;
        refLbrAmt:number;
        refConsAmt:number;

        refPartTaxAmt:number;
        refLbrTaxAmt:number;
        refConsTaxAmt:number;
        
        refTotal1:number;
        refTotal2:number;
        netRefAmt:number;

        labAmt:number;
        matAmt:number;

          //////////////////////////////////
          displayInactive = true;
          Status1: any;
          inactiveDate: Date;
          display = true;
          displayButton = true;
          //////////////////////////////////
  

  get f() { return this.mcpCancellationForm.controls; }
  mcpCancellation(mcpCancellationForm:any) {  }

        constructor(private service: MasterService,private orderManagementService:OrderManagementService,private  fb: FormBuilder, private router: Router) {
          this.mcpCancellationForm = fb.group({ 

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
            variantCode:[],
            mainModel:[],
            chassisNo:[],
            engineNo:[],
            serviceModel:[],
            deliveryDate:[],
            dealerCode:[],
            currentKms:[],
            executive:[],
            custId:[],
            custAccountNo:[],
            custName:[],

            invoiceNo:[],
            invoiceDate:[],



            enrollmentNo:[],
            enrollmentDt:[],
            packageId:[],
            packageNumber:[],
            packageDesc:[],
            pkgStartDate:[],
            pkgEndDate:[],
            uptoKm:[],
            uptoVehAge:[],

            packageAmt:[],
            refundAmt:[],
          
            totMatAmt:[],
            matDiscAmt:[],
            matGstAmt:[],
            matCessAmt:[],
            matNetAmt:[],

            totLabAmt:[],
            labDiscAmt:[],
            gstLabAmt:[],
            labNetAmt:[],
            labCessAmt:[],

            consAmt:[],
            consDiscAmt:[],
            consGstAmt:[],
            consNetAmt:[],
            consCessAmt:[],

            discTotal:[],
            taxTotal:[],
            netTotal:[],
    

            searchRegno:[],
            searchEnrollNo:[],
            searchEnrollDate:[],


            mcpCancelCharges:[],
            mcpCancelValue:[],
            mcpCancelDate:[],
            mcpCancelReason:[],
    
            refPartAmt:[],
            refLbrAmt:[],
            refConsAmt:[],
            refTotal1:[],

            refPartTaxAmt:[],
            refLbrTaxAmt:[],
            refConsTaxAmt:[],
            refTotal2:[],
            netRefAmt:[],

            labAmt:[],
            matAmt:[],


          });
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

            alert("REGNO : "+ mRegNo);
            this.service.getVehRegDetails(mRegNo)
            .subscribe(
              data => {
                this.getVehRegDetails = data;
                console.log(this.getVehRegDetails);
  
                this.mcpCancellationForm.patchValue({
                  
                  fuelType: this.getVehRegDetails.fuelType,
                  variantCode: this.getVehRegDetails.variantCode,
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
      
         
             this.GetVariantDeatils(this.variantCode);
             this.GetCustomerDetails(this.custId);
  
              var saleDate=new Date(this.deliveryDate);
              var mToday   = new Date(Date.now());
  
              // if(this.ewStatus==='Active'){
              //   alert("Extended Warranty is Active for this Customer..."+mRegNo)
              //   this.resetMast();
              // }
          
               this.getDiffDays(saleDate,mToday);
            
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
  
                this.mcpCancellationForm.patchValue({
                  fuelType: this.getVehVinDetails.fuelType,
                  variantCode: this.getVehVinDetails.variantCode,
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
             this.GetVariantDeatils(this.variantCode);
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

          GetVariantDeatils(modelVariant){

            this.service.variantDetailsList(modelVariant)
            .subscribe(
              data => {
                this.variantDetailsList = data;
                console.log(this.variantDetailsList);
                
                this.mcpCancellationForm.patchValue({
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
              this.mcpCancellationForm.patchValue({
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

      newMast(){alert ("Save.....in.. WIP")}
      updateMast(){alert ("Update.....in.. WIP")}
      searchMast(){alert ("Search.....in.. WIP")}

      resetMast() {
        window.location.reload();
      }
    
      closeMast() {
        this.router.navigate(['admin']);
      }

      SearchMcpByRegNo1() {
        alert ("Search.....in.. WIP");


      }


      SearchMcpByRegNo(mRegNo:any){
        // this.mcpEnquiryForm.reset();
        var xEnq = mRegNo.toUpperCase();
        // this.resetSection1(); this.resetSection3(); this.resetSection3();
        // this.addFlag=false;
        this.displayButton=false;

        console.log(this.mcpCancellationForm.value);
        this.service.mcpRegSearch(xEnq)
          .subscribe(
            data => {
              this.lstMcplines = data;
              this.mcpCancellationForm.patchValue(this.lstMcplines);
              // this.executive=this.lstMcplines.executive;
              
              // ---------------------------Header Details--------------------------------
                  this.GetVehicleRegInfomation(this.lstMcplines.regNo);
                  this.GetVariantDeatils(this.lstMcplines.variantCode);
                  this.GetCustomerDetails(this.lstMcplines.customerId);
                //   this.GetCustomerSiteDetails(this.customerId)
                //   this.LoadPackage(this.lstMcplines.regNo,this.lstMcplines.startKms)
                  this.getPackageInfo(this.lstMcplines.packageNumber,this.lstMcplines.fuelType)
                  
                  this.discTotal= (this.lstMcplines.totLabDisc+this.lstMcplines.totMatDisc);
                  this.taxTotal= (this.lstMcplines.totLabGst+this.lstMcplines.totMatGst);
                  // this.mcpCancelValue=this.lstMcplines.refundAmt;
                  this.netRefAmt=this.lstMcplines.refundAmt;

              
    
               } ); 
               }

               GetVehicleRegInfomation(mRegNo){
                // alert("REGNO:"+mRegNo)
                this.service.getVehRegDetails(mRegNo)
        
                  .subscribe(
                    data => {
                      this.vehicleItemDetails = data;
                      console.log(this.vehicleItemDetails);
                      this.mcpCancellationForm.patchValue({
                        vehRegNo: this.vehicleItemDetails.regNo,
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


                getPackageInfo(pkgNo,fType,){
                  // alert(pkgNo + ","+fType);
                this.service.getMcpPackageSearchNew2(pkgNo ,fType,this.ouId)
                .subscribe(
                data => {
                  this.getPkgDetails = data;
                  console.log(this.getPkgDetails);
                  if(this.getPkgDetails !=null){
      
                    //  this.packageType=this.getPkgDetails[0].packageType;
                     this.packageDesc= this.getPkgDetails[0].packageDesc;
                    //  this.validMonths= this.getPkgDetails[0].validPeriod;
      
                  }
                }); }


                CalcNetRefund(cancCharges :number){
                  // this.netRefAmt=this.lstMcplines.refundAmt-this.mcpCancelValue;
                  this.netRefAmt=this.lstMcplines.refundAmt-cancCharges;
                }

               

}




