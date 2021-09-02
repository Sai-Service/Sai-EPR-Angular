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
  currentKms:number;
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
  lstMcpEnquiryList: Array<any> = [];
  getVehRegDetails:any;
  getVehVinDetails:any;
  variantDetailsList:any;
  CustomerDetailsList:any;
  CustomerSiteDetails:any;
  vehicleItemDetails:any;
  // lstMcpEnquiryList:any[];
  getPkgDetails:any[];
  lstcomments: any;
  lstMcplines: any;
  lstMcpEnrolledEnq:any;
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
       emplId :number;
        // public emplId =6;
        userList1: any[] = [];
        lastkeydown1: number = 0;
     
        vehicleAgeDays:number;
        now = Date.now();
      
        regNo:string;
        vehicleId:string;
        custId:number;
       
        invoiceNo:string;
        // enrollmentDt:string;
        
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
        variantCode:string ;
        mainModel :string;
        chassisNo:string;
        engineNo:string;
        serviceModel:string;
        deliveryDate:string;
        dealerCode:string;
        currentKms:number;
        executive : number;


        searchRegno:string;
        searchEnrollNo:string;
        searchEnrollDate:Date;

        enqNo:string;
        enrollmentNo:string;
        // enqDate:Date;

        
        enrollDate = this.pipe.transform(Date.now(), 'y-MM-dd');
        // mcpStartDate= this.pipe.transform(this.now, 'dd-MM-y');
        pkgStartDate = this.pipe.transform(Date.now(), 'y-MM-dd');
        enrollmentDt = this.pipe.transform(Date.now(), 'y-MM-dd');
        // mcpStartDate:Date;
        pkgEndDate:string;

        packageId:number;
        packageNumber:string;
        packageDesc:string;
        pkgEndKms:number;
        validMonths:number;
        pkgSource:string;


        totLabAmt:number;
        totLabDisc:number;
        totLabGst:number;
        totMatAmt:number;
        totMatDisc:number;
        totMatGst:number;
        packageAmt:number;

        //////////////////////////////////
        displayInactive = true;
        Status1: any;
        inactiveDate: Date;
        display = true;
        displayButton = false;
        dispCustButton=false;
        showDetailsButton=false;
        searchStatus =false;
        isMcpActive=false;
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

            regNo:[],
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
            pkgSource:[],
            invoiceNo:[],
            invoiceDate:[],
            enrollmentNo:[],
            enrollmentDt:[],
            enqNo:[],
            enqDate:[],
            packageId:[],
            packageNumber:[],
            packageDesc:[],
            pkgStartDate:[],
            pkgEndDate:[],
            pkgEndKms:[],
            validMonths:[],

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

            totLabAmt:[],
            totLabDisc:[],
            totLabGst:[],
            totMatAmt:[],
            totMatDisc:[],
            totMatGst:[],
            packageAmt:[],
            

            searchRegno:[],
            searchEnrollNo:[],
            searchEnrollDate:[],

            enqDtls: this.fb.array([this.invLineDetails()]),
            // mcpEnrollList: this.fb.array([this.invLineDetails()]),

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
        return <FormArray>this.mcpEnrollmentForm.get('enqDtls')
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


          searchByEnrollNo(mEnrollNo) {
            alert ("Enrollment No : "+mEnrollNo);
            this.service.getMcpEnrollmentSearch(mEnrollNo)
              .subscribe(
                data => {
                  this.lstcomments = data;
                  console.log(this.lstcomments);
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

            // alert("REGNO : "+ mRegNo);
            this.service.getVehRegDetails(mRegNo)
            .subscribe(
              data => {
                this.getVehRegDetails = data;
                console.log(this.getVehRegDetails);
                if(this.getVehRegDetails !=null){
                  this.dispCustButton=true;
                  this.getMcpStatus(mRegNo);
              
                if(this.mcpStatusDetails===false) {
               
                this.mcpEnrollmentForm.patchValue({
                  fuelType: this.getVehRegDetails.fuelType,
                  variantCode: this.getVehRegDetails.variantCode,
                  mainModel: this.getVehRegDetails.mainModel,
                  chassisNo: this.getVehRegDetails.chassisNo,
                  engineNo: this.getVehRegDetails.engineNo,
                  deliveryDate: this.getVehRegDetails.vehicleDelvDate,
                  dealerCode: this.getVehRegDetails.dealerCode,
                  vehicleId: this.getVehRegDetails.vin,
                  variantItemId: this.getVehRegDetails.itemId.itemId,
                  vehicleItem: this.getVehRegDetails.itemId.segment,
                  customerId: this.getVehRegDetails.customerId, });
             
                  this.deliveryDate = this.pipe.transform(this.deliveryDate, 'y-MM-dd');
                  this.GetVariantDeatils(this.variantCode);
                  this.GetCustomerDetails(this.customerId);
                  this.GetCustomerSiteDetails(this.customerId);
        
                  var saleDate=new Date(this.deliveryDate);
                  var mToday   = new Date(Date.now());
                  this.getDiffDays(saleDate,mToday);
                  this.LoadMcpEnqList(mRegNo);
                }else {  alert("MCP is Active for the Vehicle : "+mRegNo ); this.resetMast();return;}
                  
                }else { alert("Vehicle Regno. Not Found...."); this.dispCustButton=false; this.mcpEnrollmentForm.reset();}
              } 
              
            );
           
          }

          getMcpStatus(mRegNo:any) {
               this.service.getMcpstatusVehcile(mRegNo)
            .subscribe(
              data => {
                this.mcpStatusDetails = data
                console.log(this.mcpStatusDetails);
                // alert ("this.mcpStatusDetails  >> "+this.mcpStatusDetails)
                if (this.mcpStatusDetails===true) { this.isMcpActive=true; } 
                else {this.isMcpActive=false; } 
     
            });}

        

        LoadMcpEnqList(mRegNo){
          this.service.getValidMcpEnqList(mRegNo)
           .subscribe(
            data => {
              this.lstMcpEnquiryList = data;
              console.log(this.lstMcpEnquiryList);
              //  alert("this.lstMcpEnquiryList.length : "+this.lstMcpEnquiryList.length);
              if (this.lstMcpEnquiryList.length>0) {
                 this.displayButton=true;
              } else {
                this.displayButton=false;
                alert ("No Valid Enquires Exists against Registration No : "+mRegNo);
              }
         } );
         }   

        LoadMcpEnrolledEnquiry(mEnqNo){
          // alert("Enroleld enq  :"+mEnqNo);
          this.lstMcpEnquiryList=[];
           this.service.getEnrolledMcpEnqList(mEnqNo)
           .subscribe(
            data => {
              // this.lstMcpEnquiryList = data;
              this.lstMcpEnquiryList.push(data);
              console.log(this.lstMcpEnquiryList);
                                 
        }
        ); }   

      
          serchByVin(mVin) {
            alert(mVin);
            this.service.getVehVinDetails(mVin)
            .subscribe(
              data => {
                this.getVehVinDetails = data;
                console.log(this.getVehVinDetails);
  
                this.mcpEnrollmentForm.patchValue({
                  fuelType: this.getVehVinDetails.fuelType,
                  variantCode: this.getVehVinDetails.variantCode,
                  mainModel: this.getVehVinDetails.mainModel,
                  chassisNo: this.getVehVinDetails.chassisNo,
                  engineNo: this.getVehVinDetails.engineNo,
                  deliveryDate: this.getVehVinDetails.vehicleDelvDate,
                  dealerCode: this.getVehVinDetails.dealerCode,
                  vehRegNo: this.getVehVinDetails.regNo,
                  itemDesc: this.getVehVinDetails.itemId.segment,
                  variantItemId: this.getVehVinDetails.itemId.itemId,
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
                  variantCode : this.variantDetailsList.serviceModel,

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
      // SearchByMcpEnrollNo(mEnrollmentNo){alert ("SearchBy.....in.. WIP")}
    
      updateMast(){alert ("Print Certificate.....in.. WIP")}
    

      resetMast() {
        window.location.reload();
      }
    
      closeMast() {
        this.router.navigate(['admin']);
      }

      ChoosePackage(e,index)  {
       alert("Package Selection ...wip- Line : "+index);
       if(e.target.checked) {alert("Selected");} else {alert("Not Selected ");}

      } 

     

   

      SelectPackage(mEnqNo) {
        alert("Package Selection ...wip- Line : " +mEnqNo+" , ");

        // // lstMcpEnquiryList

        // this.priceListMasterForm.reset();
        // this.display1= false;
        this.showDetailsButton=true;
     
        let select = this.lstMcpEnquiryList.find(d => d.enqNo === mEnqNo);
        console.log(select.enqDtls[0]);
        // alert(this.lineDetailsArray.length);
    
        // alert("lineDetailsArray Length=" +this.lineDetailsArray.length);
    
        for(let i=0; i<this.invLineArray.length; i++){ 
          this.invLineArray().removeAt(i);
        }
          
        alert("select.enqDtls.length >> "+select.enqDtls.length);
        if(select.enqDtls.length>0){
    
           this.invLineArray().clear();
    
          if (select) {
              this.currentKms = select.startKms;
              this.packageDesc = select.packageDesc;
              this.executive =select.executive;
              this.pkgEndKms =select.validKm;
              this.validMonths =select.validMonths;
              this.packageNumber=select.pkgEnquired;
              this.pkgSource=select.sourceDesc;
              this.totLabAmt=select.labAmt;
              this.totLabDisc=select.labDiscAmt;
              this.totLabGst=select.labTaxAmt;
              this.totMatAmt=select.matAmt;
              this.totMatDisc=select.matDiscAmt;
              this.totMatGst=select.matTaxAmt;
              this.packageAmt=select.packageAmt;
              // mcpEndDate

                // ------------Date-----------
              var stDate=new Date(this.pkgStartDate);
              var prd =(this.validMonths)/12;
              var ew2=this.addDays(stDate,prd*365);
              this.pkgEndDate=this.pipe.transform(ew2, 'y-MM-dd');
              // ------------Date-----------
      
              var control = this.mcpEnrollmentForm.get('enqDtls') as FormArray;
             
              for (let i=0; i<select.enqDtls.length;i++) 
                {
                  var enqDtls:FormGroup=this.invLineDetails();
                  control.push(enqDtls);
                }
              }}
                  this.mcpEnrollmentForm.patchValue(select);
                 this.mcpEnrollmentForm.get('enqDtls').patchValue(select);
          }

      
        


         addDays(date1: Date, days1: number): Date {
          date1.setDate(date1.getDate() + days1);
          return date1;
          }

          transeData(val) {
    
            delete val.loginArray;
            delete val.loginName;
            delete val.locName;
            delete val.ouName;
            // delete val.ouId;
            delete val.deptId;
            delete val.emplId;
            delete val.orgId;
            delete val.divisionId;
            delete val.searchRegno;
            delete val.searchEnrollNo;
            delete val.searchEnrollDate;
  
            // delete val.vehicleId;
            // delete val.vehicleItem;
            // delete val.serviceModel;
            // delete val.deliveryDate;
            // delete val.dealerCode;
            // delete val.packageType;
            // delete val.packageDesc;
            // delete val.lastRunKms;
            // delete val.totBaseAmt;
            // delete val.totTaxAmt;
            // delete val.totCessAmt;
            // delete val.matDiscAmt;
            // delete val.matCessAmt;
            // delete val.matNetAmt;
            // delete val.labDiscAmt;
            // delete val.labNetAmt;
            // delete val.labCessAmt;
            // delete val.consAmt;
            // delete val.consDiscAmt;
            // delete val.consGstAmt;
            // delete val.consNetAmt;
            // delete val.consCessAmt;
            // delete val.searchRegno;
            // delete val.searchEnqNo;
            // delete val.searchEnqDate;
            // delete val.custAccountNo; 
            // delete val.custName; 
            // delete val.customerSiteAddress;
            // delete val.custCity; 
            // delete val.custState; 
            // delete val.custPincode; 
            // delete val.customerGstNo; 
            // delete val.customerPanNo; 
            // delete val.billToSiteId; 
            // delete val.custPhone; 
            // delete val.customerType; 
            // delete val.custTaxCategoryName; 
  
            // delete val.enqDate;
            // delete val.packageId;
           
           return val;
          }

          viewAccounting(){
            alert ("View Accounting Details ..........WIP");
          }


          newMast() {
            alert("in save....")
      
            // this.checkHeaderValidations();
            // if (this.headerValidation==true ) { 
            //   alert("Header Validation Sucessfull...") 

           const formValue: IMcpEnrollment =this.transeData(this.mcpEnrollmentForm.value);
         
             this.service.McpEnrollmentMasterSubmit(formValue).subscribe((res: any) => {
             if (res.code === 200) {
               alert('RECORD INSERTED SUCCESSFUILY');
               this.displayButton=false;
               this.searchStatus=true;
               this.enrollmentNo=res.obj.enrollmentNo;
               this.invoiceNo=res.obj.InvoiceNo;
               this.mcpEnrollmentForm.disable();
               this.mcpEnrollmentForm.get('searchEnrollNo').enable();
               this.mcpEnrollmentForm.get('searchEnrollDate').enable();
               this.mcpEnrollmentForm.get('searchRegno').enable();
               // this.mcpEnquiryForm.reset();
             
               
             } else {
               if (res.code === 400) {
                 alert('ERROR WHILE INSERTING');
                 // this.resetMast();
               }
             }
           });
           //  else { alert("Header Validation Failed... Please Check");  return;   }
         }

       
         SearchByMcpRegNo(mRegNo:any){
           
          var mRegNo = mRegNo.toUpperCase();
         //  alert("Enrollment No :"+mEnrollNo);
           this.displayButton=false;
         // console.log(this.mcpEnrollmentForm.value);
        
         this.service.getMcpSearchByRegNo(mRegNo)
             .subscribe(
             data => {
               this.lstMcplines = data;
               console.log(this.lstMcplines);
               if(this.lstMcplines != null) {
               this.mcpEnrollmentForm.patchValue(this.lstMcplines);
             // ---------------------------Header Details--------------------------------
                   this.GetVehicleRegInfomation(this.lstMcplines.regNo);
                   this.GetVariantDeatils(this.lstMcplines.variantCode);
                   this.GetCustomerDetails(this.customerId);
                   this.GetCustomerSiteDetails(this.customerId)
                   this.LoadMcpEnrolledEnquiry(this.lstMcplines.enqNo)
                   this.getPackageInfo(this.lstMcplines.packageNumber,this.lstMcplines.fuelType)
             // ----------------------------LINE DETAILS----------------------------------------
                 for(let i=0; i<this.invLineArray.length; i++){ 
                   this.invLineArray().removeAt(i);
                 }

                 this.invLineArray().clear();
                 var control = this.mcpEnrollmentForm.get('enqDtls') as FormArray;
                 for (let i=0; i<this.lstMcplines.enqDtls.length;i++) 
                   {
                     var enqDtls:FormGroup=this.invLineDetails();
                     control.push(enqDtls);
                   }
                       
                 this.mcpEnrollmentForm.get('enqDtls').patchValue(this.lstMcplines.enqDtls);
                 this.showDetailsButton=true
                 // ----------------------------------------------------------------------------
                 } else {alert("Enrollment No :" +mRegNo + " Not Found");}
                } ); 
                this.mcpEnrollmentForm.get('regNo').disable();
                this.searchStatus=true;
         }


         SearchByMcpEnrollNo(mEnrollNo:any){
           
           var mEnrollNo = mEnrollNo.toUpperCase();
            this.displayButton=false;
          // console.log(this.mcpEnrollmentForm.value);
         
          this.service.getMcpSearchByEnrollNo(mEnrollNo)
            .subscribe(
              data => {
                this.lstMcplines = data;
                console.log(this.lstMcplines);
                if(this.lstMcplines != null) {
                this.mcpEnrollmentForm.patchValue(this.lstMcplines);
                // this.executive=this.lstMcplines.executive;
                // var z=this.pipe.transform(this.lstMcplines.invoiceDate, 'dd-MM-yy');
                // this.invoiceDate=z;
                // ---------------------------Header Details--------------------------------
                    this.GetVehicleRegInfomation(this.lstMcplines.regNo);
                    this.GetVariantDeatils(this.lstMcplines.variantCode);
                    this.GetCustomerDetails(this.customerId);
                    this.GetCustomerSiteDetails(this.customerId)
                    this.LoadMcpEnrolledEnquiry(this.lstMcplines.enqNo)
                    this.getPackageInfo(this.lstMcplines.packageNumber,this.lstMcplines.fuelType)
                 
                  // ----------------------------LINE DETAILS----------------------------------------
                  for(let i=0; i<this.invLineArray.length; i++){ 
                    this.invLineArray().removeAt(i);
                  }

                  this.invLineArray().clear();
                  var control = this.mcpEnrollmentForm.get('enqDtls') as FormArray;
                  for (let i=0; i<this.lstMcplines.enqDtls.length;i++) 
                    {
                      var enqDtls:FormGroup=this.invLineDetails();
                      control.push(enqDtls);
                    }
                        
                  this.mcpEnrollmentForm.get('enqDtls').patchValue(this.lstMcplines.enqDtls);
                  this.showDetailsButton=true


                  // this.mcpEnrollmentForm.get('executive').disable();

                  // ----------------------------------------------------------------------------
                  } else {alert("Enrollment No :" +mEnrollNo + " Not Found");}
                 } ); 
                 this.mcpEnrollmentForm.get('regNo').disable();
                 this.searchStatus=true;

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
               this.validMonths= this.getPkgDetails[0].validPeriod;

            }
          }); }


          GetVehicleRegInfomation(mRegNo){
            // alert("REGNO:"+mRegNo)
            this.service.getVehRegDetails(mRegNo)
    
              .subscribe(
                data => {
                  this.vehicleItemDetails = data;
                  console.log(this.vehicleItemDetails);
                  this.mcpEnrollmentForm.patchValue({
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
        
        
   


     

}


