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


interface IMcpCancel {   
  enrollmentNo :string;
  refundAmt:number;
  netRefAmt:number;
  cancelRsnId:number;
  // cancRemarksId:string;
  cancelRemarks:string;
  refundApprovedBy:string;
  refundIncludeGst:string;
  segmentName:string;
  segment1:string;
  segment2:string;
  segment3:string;
  segment4:string;
  segment5:string;
  
}

@Component({
  selector: 'app-mcp-cancellation',
  templateUrl: './mcp-cancellation.component.html',
  styleUrls: ['./mcp-cancellation.component.css']
})
export class McpCancellationComponent implements OnInit {

  mcpCancellationForm : FormGroup;

  pipe = new DatePipe('en-US');
  

  public OUIdList           :Array<string> = [];
  public VehRegNoList       :Array<string> = [];
  public VehVinList         :Array<string> = [];
  public issueByList        :Array<string> = [];
  public mcpReasonList      :Array<string>  = [];
  public mcpRemarkList      :Array<string>  = [];
  

public branchList:Array<string>=[];
public locationList:Array<string>=[];
public costCentre:Array<string>=[];
public naturalAccount:Array<string>=[];
public interBranch:any[];
public statusList:Array<string>=[];
  
  getVehRegDetails:any;
  getVehVinDetails:any;
  variantDetailsList:any;
  CustomerDetailsList:any;
  lstMcplines: any;
  CustomerSiteDetails:any;
  vehicleItemDetails:any;
  getPkgDetails:any[];
  naturalaccount :any;


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
        packageDescription:string;
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


        totLabDisc:number;
        totMatDisc:number;
        totLabGst:number;
        totMatGst:number;

        totLabUtilised:number;
        totMatUtilised:number;
        totLabBalanced:number;
        totMatBalanced:number;

        totMatBalTax:number;
        totLabBalTax:number;

        totAvailed:number;
        totBalance:number;
                

        consAmt:number;
        consDiscAmt:number;
        consGstAmt:number;
        consNetAmt:number;
        consCessAmt:number;

        discTotal:number;
        taxTotal:number;
        netTotal:number;

        refundIncludeGst:string;
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

        cancelRsnId:number;
        // cancRemarksId:string;
        cancelRemarks:string;
        refundApprovedBy:string;

          //////////////////////////////////
          displayInactive = true;
          Status1: any;
          inactiveDate: Date;
          display = true;
          displayButton = false;
          checkValidation=false;
          showDetailsButton=false;
          showCancelButton=false;
         
          //////////////////////////////////

          segmentName:string;
          segment1:string;
          segment2:string;
          segment3:string;
          segment4:string;
          segment5:string;
          lookupValueDesc4:string;
          lookupValueDesc1:string;
          lookupValueDesc2:string;
          lookupValueDesc3:string;
          lookupValueDesc5:string;
          accountType:string;
          branch:any;
  

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
            packageDescription:[],
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


            totLabDisc:[],
            totMatDisc:[],
            totLabGst:[],
            totMatGst:[],

            totLabUtilised:[],
            totMatUtilised:[],
            totLabBalanced:[],
            totMatBalanced:[],
            totMatBalTax:[],
            totLabBalTax:[],
            totAvailed:[],
            totBalance:[],
                

            searchRegno:[],
            searchEnrollNo:[],
            searchEnrollDate:[],


            refundIncludeGst:[],
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
            cancelRsnId:[],
            // cancRemarksId:[],
            cancelRemarks:[],
            refundApprovedBy:[],



            segmentName:['',[Validators.required]],
            segment1:['',[Validators.required]],
            segment2:['',[Validators.required]],
            segment3:['',[Validators.required]],
            segment4:['',[Validators.required]],
            segment5:['',[Validators.required]],
                  
            lookupValueDesc1:[],
            lookupValueDesc2:[],
            lookupValueDesc3:[],
            lookupValueDesc4:[],
            lookupValueDesc5:[],
            accountType:['',[Validators.required]],


            enqDtls: this.fb.array([this.invLineDetails()]),

          });
        }

        invLineDetails() {
          return this.fb.group({
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
        return <FormArray>this.mcpCancellationForm.get('enqDtls')
      }

          ngOnInit(): void 
          {
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

            this.service.mcpReasonLst()
            .subscribe(
              data => {
                this.mcpReasonList = data;
                console.log(this.mcpReasonList);
              }
            );
  
            this.service.mcpRemarkLst()
            .subscribe(
              data => {
                this.mcpRemarkList = data;
                console.log(this.mcpRemarkList);
              }
            );


            this.service.branchlist().subscribe(
              data=>{
                this.branchList=data;
              });
        
              this.service.locationlist().subscribe(
                data=>{
                  this.locationList=data;
                });
        
             this.service.costcentre().subscribe(
               data=>{this.costCentre=data;
              });     
              
            this.service.naturalaccount().subscribe(
              data=>{
                this.naturalAccount=data;
              });
        
            this.service.interbranch().subscribe(
              data=>{this.interBranch=data;
              });

            

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
            // alert(mVin);
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
            //  alert(this.deliveryDate);
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
            // alert("Customer Id: "+mCustId);
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

      transeData(val) {
        delete val.loginArray;
        delete val.loginName;
        delete val.ouName;
        delete val.divisionId;
        delete val.locId;
        delete val.locName;
        // delete val.ouId;
        delete val.deptId;
        delete val.orgId;

        delete val.searchRegno;
        delete val.searchEnrollDate;
        delete val.searchEnrollNo;
        // delete val.emplId;


 
        return val;
      }


      showPkgDetails(){alert ("Package Details......in.. WIP")}

      newMast(){

        // alert("Cancel Mcp...wip");
       
        this.CheckDataValidations();

        // return
      
        if (this.checkValidation) {
          alert("Data Validation Sucessfull....\nPosting Cancellation details.")
          this.displayButton=false;
          const formValue: IMcpCancel =this.transeData(this.mcpCancellationForm.value);
          this.showCancelButton=false;
         
          // this.service.McpCancelUpdate(formValue.enrollmentNo,this.cancRsnId,formValue.netRefAmt,formValue).subscribe((res: any) => {
            this.service.McpCancelUpdate(formValue).subscribe((res: any) => {
          if (res.code === 200) {
              alert('RECORD UPDATED SUCCESSFUILY');
            // window.location.reload();
            this.mcpCancellationForm.disable();
          } else {
            if (res.code === 400) {
              this.displayButton=true;
              this.showCancelButton=true;
              alert('ERROR OCCOURED IN PROCEESS');
              // this.mcpCancellationForm.reset();
            }
          }
        });
      }else{ alert("Data Validation Not Sucessfull....\nData not Saved...")  }
      }
      
       
     
    
    
      searchMast(){alert ("Search.....in.. WIP")}

      resetMast() {
        window.location.reload();
      }
    
      closeMast() {
        this.router.navigate(['admin']);
      }

    
      searchMcpByRegNo(mRegNo,mEnrollNo){

        if( (mRegNo===undefined || mRegNo.trim()==='') && (mEnrollNo===undefined || mEnrollNo.trim()==='') )
        { 
          alert ("Both Register No  and Enrollment No is blank.\nPlease enter REGNO or ENROLLMENT NO and  click on Search");
          return;
        } 
        console.log(this.mcpCancellationForm.value);
        this.service.mcpRegSearch(mRegNo,mEnrollNo)
          .subscribe(
            data => {
              this.lstMcplines = data.obj;
            
              if (this.lstMcplines =='MCP Enrollment Not found !! ') {
                alert ("MCP Enrollment Not found !!...\nRegistration No: " +mRegNo +"\nEnrollment No: " +mEnrollNo);
                return;
               }

                
               this.mcpCancellationForm.patchValue(this.lstMcplines);
             
              // ---------------------------Header Details--------------------------------
                  this.GetVehicleRegInfomation(this.lstMcplines.regNo);
                  this.GetVariantDeatils(this.lstMcplines.variantCode);
                  this.GetCustomerDetails(this.lstMcplines.customerId);
                  // this.getPackageInfo(this.lstMcplines.packageNumber,this.lstMcplines.fuelType)

                  for(let i=0; i<this.invLineArray.length; i++){ 
                    this.invLineArray().removeAt(i);
                  }
 
                  this.invLineArray().clear();
                  var control = this.mcpCancellationForm.get('enqDtls') as FormArray;
                  for (let i=0; i<this.lstMcplines.enqDtls.length;i++) 
                    {
                      var enqDtls:FormGroup=this.invLineDetails();
                      control.push(enqDtls);
                    }

                  this.showDetailsButton=true;

                  this.mcpCancellationForm.get('enqDtls').patchValue(this.lstMcplines.enqDtls);

                  if(this.lstMcplines.totLabBalanced >0)  {
                   this.showCancelButton=true;
                    this.mcpCancellationForm.get("refundIncludeGst").enable();
                    this.mcpCancellationForm.get("refundApprovedBy").enable();
                    this.mcpCancellationForm.get("cancelRsnId").enable();
                  } 
                  else {
                    this.showCancelButton=false;
                    this.mcpCancellationForm.get("refundIncludeGst").disable();
                    this.mcpCancellationForm.get("refundApprovedBy").disable();
                    this.mcpCancellationForm.get("cancelRsnId").disable();
                  }

                  // alert ("reftot1 :");

                  this.packageAmt=this.lstMcplines.packageAmt.toFixed(2);
                  this.totLabAmt=this.lstMcplines.totLabAmt.toFixed(2);
                  this.totMatAmt=this.lstMcplines.totMatAmt.toFixed(2);
                  this.totLabDisc=this.lstMcplines.totLabDisc.toFixed(2);
                  this.totMatDisc=this.lstMcplines.totMatDisc.toFixed(2);

                  // alert ("reftot12 :");

                  this.totLabUtilised=this.lstMcplines.totLabUtilised.toFixed(2);
                  this.totMatUtilised=this.lstMcplines.totMatUtilised.toFixed(2);
                  this.totLabBalanced=this.lstMcplines.totLabBalanced.toFixed(2);
                  this.totMatBalanced=this.lstMcplines.totMatBalanced.toFixed(2);
                  this.totMatBalTax=this.lstMcplines.totMatBalTax.toFixed(2);
                  this.totLabBalTax=this.lstMcplines.totLabBalTax.toFixed(2);

                  // alert ("reftot3 :");

                  // alert ("reftot2ax :"+this.lstMcplines.totMatBalTax+this.lstMcplines.totLabBalTax);


                  this.totAvailed= (this.lstMcplines.totLabUtilised+this.lstMcplines.totMatUtilised).toFixed(2);
                  this.totBalance= (this.lstMcplines.totLabBalanced+this.lstMcplines.totMatBalanced).toFixed(2);
                  this.refTotal1=(this.lstMcplines.totLabBalanced+this.lstMcplines.totMatBalanced).toFixed(2);
                  this.refTotal2=(this.lstMcplines.totMatBalTax+this.lstMcplines.totLabBalTax).toFixed(2);
                  var xy=this.lstMcplines.refundTaxableAmt +this.lstMcplines.totMatBalTax+this.lstMcplines.totLabBalTax;
                  this.netRefAmt=xy.toFixed(2);
                 
                 
                  // this.mcpCancellationForm.patchValue({refTotal1 :(this.lstMcplines.totLabBalanced+this.lstMcplines.totMatBalanced)})
                  // this.refundApprovedBy='SYSTEM';

                  // var eDate=new Date(this.lstMcplines.enrollmentDt);
                  // var cDate=new Date(this.mcpCancelDate);
                  this.mcpCancelDate = this.pipe.transform(Date.now(), 'y-MM-dd');
                  var eDate=this.lstMcplines.enrollmentDt;        
                  var cDate=this.mcpCancelDate;


                  var mTotAvailed=(this.lstMcplines.totLabUtilised+this.lstMcplines.totMatUtilised);
                  var mTotBalance = this.totBalance;
                  // var mTotAvailed=1000;
                  // alert(eDate +","+cDate  +","+mTotAvailed);

                  if(eDate==cDate && mTotAvailed==0  ) 
                  {
                    alert ("MCP Unutilized - Same day Cancellation");
                    this.refundIncludeGst='Y';
                    this.refundApprovedBy='SYSTEM';
                    this.cancelRemarks ='Unutilized MCP - Full Amt Refund with Taxes -Same day Cancellation';
                    // this.cancelDate = this.pipe.transform(Date.now(), 'y-MM-dd');
                    // this.mcpCancellationForm.get('refundApprovedBy').enable();
                    // this.mcpCancellationForm.get('mcpCancelCharges').enable();
                    this.refundAmt=this.netRefAmt;

                  }

                  if(eDate<cDate && mTotAvailed==0) 
                  {
                    alert ("MCP Unutilized-Enroll Date is below Cancel Date");
                    this.refundIncludeGst='N';
                    this.refundApprovedBy='SYSTEM';
                    this.cancelRemarks ='Unutilized MCP -  Full Amt Refund without Taxes';
                    var zz=0;
                   
                    this.totLabBalTax=0;
                    this.totMatBalTax=0.00;
                    this.refTotal2=0.00;
                    this.netRefAmt=this.lstMcplines.totLabBalanced+this.lstMcplines.totMatBalanced;
                    // this.cancelDate = this.pipe.transform(Date.now(), 'y-MM-dd');
                    this.refundAmt=this.netRefAmt;
                  }

                  if(eDate<cDate && mTotAvailed>0 ) 
                  {
                    if( mTotBalance >0) {
                    alert ("MCP Utilized-Partial Refund");
                    this.refundIncludeGst='N';
                    this.refundApprovedBy='SYSTEM';
                    this.cancelRemarks ='Utilized MCP -  Blance Amt Refund without Taxes';
                    } else{
                      alert ("MCP Fully Utilized.");
                      this.refundIncludeGst=null;
                      this.refundApprovedBy=null
                      this.cancelRemarks ='MCP Fully utilizied.';
                    }

                    this.totLabBalTax=0;
                    this.totMatBalTax=0;
                    this.refTotal2=0;
                    this.netRefAmt=this.lstMcplines.totLabBalanced+this.lstMcplines.totMatBalanced;
                    // this.cancelDate = this.pipe.transform(Date.now(), 'y-MM-dd');
                    this.refundAmt=this.netRefAmt;
                  }

                  this.displayButton=true;

                // } else {
                // alert("MCP Enrollment Not found !! ");
                
                // }
           
               } ); 

               }




              GetVehicleRegInfomation(mRegNo){
                // alert("REGNO:"+mRegNo)
                this.service.getVehRegDetailsNew(mRegNo)
        
                  .subscribe(
                    data => {
                      this.vehicleItemDetails = data.obj;
                      console.log(this.vehicleItemDetails);
                      this.mcpCancellationForm.patchValue({
                        vehRegNo: this.vehicleItemDetails.regNo,
                        vehicleId: this.vehicleItemDetails.vin,
                        variantItemId: this.vehicleItemDetails.itemId.itemId,
                        deliveryDate : this.vehicleItemDetails.deliveryDate,
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
                     this.packageDescription= this.getPkgDetails[0].packageDesc;
                    //  this.validMonths= this.getPkgDetails[0].validPeriod;
      
                  }
                }); }


                CalcNetRefund(cancCharges :number){
                  // this.netRefAmt=this.lstMcplines.refundAmt-this.mcpCancelValue;
                  this.netRefAmt=this.lstMcplines.refundAmt-cancCharges;
                }

                OnChargesSelected(xEvent:any){
                  // alert("Cancel Charges Applicable :" +xEvent );

                  // var eDate=new Date(this.lstMcplines.enrollmentDt);
                  // var cDate=new Date(this.mcpCancelDate);

                  var eDate=this.lstMcplines.enrollmentDt;        
                  var cDate=this.mcpCancelDate;
                  var mTotAvailed=(this.lstMcplines.totLabUtilised+this.lstMcplines.totMatUtilised);

                  // alert( "Enroll Date :" +eDate  +  "   Cancel Date "+cDate  + " Total Availed :" +mTotAvailed + " Cancel Chrg:"+this.mcpCancelCharges);

                  if(this.refundIncludeGst==='Y') {
                      this.totLabBalTax=this.lstMcplines.totLabBalTax.toFixed(2);
                      this.totMatBalTax=this.lstMcplines.totMatBalTax.toFixed(2);
                      this.refTotal2=(this.lstMcplines.totMatBalTax+this.lstMcplines.totLabBalTax).toFixed(2);
                      this.netRefAmt=(this.lstMcplines.totLabBalanced+this.lstMcplines.totMatBalanced+this.lstMcplines.totMatBalTax+this.lstMcplines.totLabBalTax).toFixed(2);
                      this.refundAmt=this.netRefAmt;
                      this.cancelRemarks ='Refund with Taxes';
                    
                    } 
                    if(this.refundIncludeGst==='N') {
                      this.totLabBalTax=0;
                      this.totMatBalTax=0;
                      this.refTotal2=0;;
                      this.netRefAmt=(this.lstMcplines.totLabBalanced+this.lstMcplines.totMatBalanced).toFixed(2);
                      this.refundAmt=this.netRefAmt;
                      this.cancelRemarks ='Refund without Taxes';
                    }


                  }


                CheckDataValidations(){
    
                  const formValue: IMcpCancel = this.mcpCancellationForm.value;
                  // alert("CheckDataValidations -" +formValue.mcpCancelCharges);
      
                   if (formValue.enrollmentNo===undefined || formValue.enrollmentNo===null || formValue.enrollmentNo.trim()==='') 
                  {
                     this.checkValidation=false; 
                     alert ("ENROLLMENT NO: Should not be null....");
                      return;
                   } 
                   if (formValue.refundIncludeGst===undefined || formValue.refundIncludeGst===null || formValue.refundIncludeGst.trim()==='')
                   {
                       this.checkValidation=false; 
                       alert ("MCP CANCEL CHARGES : Should not be null....");
                       return;
                     } 

                   if (formValue.refundApprovedBy===undefined || formValue.refundApprovedBy===null || formValue.refundApprovedBy.trim()==='')
                   {
                       this.checkValidation=false; 
                       alert ("APPROVED BY : Should not be null....");
                       return;
                     } 

                   if (formValue.refundAmt < 0 || formValue.refundAmt===undefined || formValue.refundAmt===null )
                   {
                       this.checkValidation=false;  
                       alert ("REFUND AMT: Should not be below Zero");
                       return;
                   } 

                   if (formValue.cancelRsnId < 0 || formValue.cancelRsnId===undefined || formValue.cancelRsnId===null )
                   {
                       this.checkValidation=false;  
                       alert ("REASON: Should not be null");
                       return;
                   } 


                   if(formValue.segment1===undefined || formValue.segment2===undefined || formValue.segment3===undefined ||formValue.segment4===undefined || formValue.segment5===undefined){
                    this.checkValidation=false;  
                    alert ("ACCOUNT CODE : Invalid GL Code combination... Please check");
                    return;
                   }
      
                   if ( formValue.segmentName===undefined || formValue.segmentName===null || formValue.segmentName.trim()=='' )
                   {
                       this.checkValidation=false;  
                       alert ("ACCOUNT: Should not be null");
                       return;
                   } 


                   
                    



                      // if (formValue.cancelRemarks===undefined || formValue.cancelRemarks===null || formValue.cancelRemarks.trim()==='')
                      // {
                      //     this.checkValidation=false; 
                      //     alert ("REMARKS : Should not be null....");
                      //     return;
                      //   } 
                     
                    this.checkValidation=true
      
                }

                GlCodeCombination(segment1,segment2,segment3,segment4,segment5)
                {
                  // alert(segment1);
                  
                  const combination=segment1+'.'+segment2+'.'+segment3+'.'+segment4+'.'+segment5;
                  this.segmentName=combination;
                  this.service.getnaturalaccount(segment4).subscribe(
                    data=>{this.naturalaccount=data;
                      console.log(this.naturalaccount);
                      this.mcpCancellationForm.patchValue(this.naturalaccount);
                    this.accountType=this.naturalaccount.accountType;
                    }
                  );
                }


                onOptionsSelectedBranch(segment:any, lType:string)
                {
                  // alert(segment);
                  // var InterBranch1=this.GlCodeCombinaionForm.get('segment1').value;
                  this.service.getInterBranch(segment, lType).subscribe(
                  data=>{this.branch=data;
                  console.log(this.branch);
                  if (this.branch != null) {
                  //          this.GlCodeCombinaionForm.patchValue(this.branch);
                  
              
                  
                  if(lType==='SS_Interbranch'){
                  this.lookupValueDesc5=this.branch.lookupValueDesc;
                  }
                   if(lType==='NaturalAccount'){      
                    this.lookupValueDesc4=this.branch.lookupValueDesc;
                    //  this.accountType=this.branch.naturalAccount.accountType;
                  //   // this.GlCodeCombinaionForm.patchValue(this.branch);
                    //  this.accountType=this.branch.accountType;
                    
                    
                   }
                  if(lType==='CostCentre'){
                    this.lookupValueDesc3=this.branch.lookupValueDesc;
                  }
                  if(lType==='SS_Location'){
                    this.lookupValueDesc2=this.branch.lookupValueDesc;
                  }
                  if(lType==='SS_Branch'){
                    this.lookupValueDesc1 =this.branch.lookupValueDesc;
                  }
                }
                 }); 
                 }

               

}




