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


interface IPaymentRcptAr {

referenceNo:string;
refType :string;
ouId:number;
locId:number;
deptId:number;
custAccountNo:number;
billToSiteId:number;
glDate :Date;
// glDateLine:Date
receiptNumber:number;
receiptDate:Date;
receiptStatus:string;

payType:string;
receiptMethodId:number;
paymentAmt:number;
bankName:string;
bankBranch:string;
checkNo:string;
checkDate:string;

  reversalDate :string;
  reversalComment: string;
  reversalReasonCode:number;
  reversalCategory:string;
  status : string;

  

}

@Component({
  selector: 'app-payment-ar',
  templateUrl: './payment-ar.component.html',
  styleUrls: ['./payment-ar.component.css']
})
export class PaymentArComponent implements OnInit {
  paymentArForm : FormGroup;
  applyRcptFlag1 :boolean
  pipe = new DatePipe('en-US');

  // public DivisionIDList : Array<string>=[];
  // public OUIdList: Array<string> = [];
  
  public OUIdList: Array<string> = [];
  public DepartmentList: Array<string> = [];
  public statusList: Array<string> = [];
  public locIdList: Array<string> = [];
  public PaymentModeList : Array<string> = [];
  public ReceiptMethodList: Array<string> = [];
  public ReceiptStatusList: Array<string> = [];
  public ReverseReasonList: Array<string> = [];
  public ReceiptTypeArList: Array<string> = [];
  public VehRegNoList     : Array<string> = [];
  public RefReasonList    : Array<string> = [];

  receiptDetails:Array<string> = [];
  accountNoSearch:any;
  getVehRegDetails:any;
  CustomerDetailsList:any;
  CustomerSiteDetails:any;
  GLPeriodCheck:any;

  userList1: any[] = [];
  lastkeydown1: number = 0;
 
  lstcomments: any[];
  lstinvoices: any[];
  lstCustomer: any[];

  glPrdStartDate :string;
  glPrdEndDate:string;

  ouId :number;
  deptId:number; 

  checkNo : string;
  // checkDate: Date;
 
 
  bankName : string;
  bankBranch : string;
  paymentAmt : number;
  
  payType : string;
  rmStatus :string
  paymentMethod : string;
  receiptAmount:number;
  receiptStatus:string;

  receiptMethodId : number;
  // paymentCollection: string;
  receiptMethodName:string;
  receiptNumber:number;
  orderNumber:string;
  // referenceNo:string ;
  // referenceDate:Date;

  referenceNo=null;
  referenceDate=null;
 
  // customerId:number=8
  // custId:number;
  customerId:number; 
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
  custPhone:string;
  customerType:string;
  custTaxCategoryName:string;

  accountNo:number;
  vehRegNo : string;
  attribute1:string;
  
  // billToSiteId:number;
  custAddr:string;
  custSiteAddress : string 
  mobileNo:string;
  
  // glDate:Date;
  now = Date.now();
  checkDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  receiptDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  glDate = this.pipe.transform(this.now, 'y-MM-dd');
  // trxDate= this.pipe.transform(this.now, 'dd-MM-y');
  // trxDate=this.pipe.transform(this.now, 'y-MM-dd');
  // trxDate :Date;
  // applDate:string;
  glDateLine = this.pipe.transform(this.now, 'y-MM-dd');
  applDate=this.pipe.transform(this.now, 'y-MM-dd');
  // reversalDate= this.pipe.transform(this.now, 'dd-MM-y');
  reversalDate :string;
  reversalComment: string;
  reversalReasonCode:number;
  reversalCategory:string;
  status : string;
  cancelDate =null;
 

  comments : string

  searchBy : string
  searchValue : string;
 
  public srlNo =1;

  public searchByRcptNo =211100020000017;
  // public searchByOrderNo =2111202148;
  // public searchByCustNo =1212;
  // searchByRcptNo:number;
  searchByCustNo:number;
  
  searchByDate :Date;
  ordNumber : number;
  cancelReason:string;

  totApplAmt:number;
  totUnApplAmt:number;
  onAccountAmt:number;
  // applyrcptFlag:string;  
  selectAllflag1 =false;

  // newBal:number;
  prePayment:number;
  totalUnappliedAmt : number;
  totalAppliedAmt : number;
  totalOnAccountAmt:number;
  // invoiceBalnaceAmt : number;
  balanceAmount:number;
  totAppliedtAmount:number;
  totUnAppliedtAmount:number;

  tApplAmt:number;
  tUapplAmt:number;

  enableCustAccount=true;
  checkValidation=false;
  applLineValidation=false;
  displayInactive = true;
  Status1: any;
  inactiveDate: Date;
  display = true;
  displayButton = true;
  showOrg=false;
  showReason=false;
  showBankDetails=false;
  showModalForm=true;
  enableCancelButton=true;
  enableApplyButton=true;
  cancelValidation=false;
  applySaveButton =true;
  showRefYellow =false;

  showInvoiceGrid=false;
  showRefundGrid=false;
  showOnAcGrid=false;
  insuranceFlag : string;
  refType: string;


  loginName:string;
  loginArray:string;
  name:string;
  ouName : string;
  locId: number; 
  locationId:Number;
  locName : string;
  emplId :number;
  orgId:number;
  divisionId:number;

  // public emplId =26;
  // customerId:number;
  public billToSiteId=101;
  // public billToSiteId=107; 

  public applyTo='INVOICE'
 
  
  
  // applyTo: string;
      
    get f() { return this.paymentArForm.controls; }

    paymentAr(paymentArForm:any) {  }


  constructor(private service: MasterService,private orderManagementService: OrderManagementService, private fb: FormBuilder, private router: Router) { 
   
    
    this.paymentArForm = fb.group({ 

      divisionId:[],
      division:[],
      orgId:[],
      ouId :[],
      deptId :[],

      loginArray:[''],
      loginName:[''],
      ouName :[''],
      locId:[''],
      locationId:[],
      locName :[''],
      emplId:[],
      
      receiptNumber:[],
      receiptDate:[],
      glDate:[],
      paymentAmt:[],
      payType:[],
      receiptMethodId :[],
      receiptMethodName: [],
      receiptStatus:[],
      status:[],
      insuranceFlag:[],
      receiptAmount:[],

      searchByRcptNo:[],
      searchByCustNo:[],
      searchByDate:[],

      orderNumber:[],
      referenceNo:[],
      referenceDate:[],
      custAddr:[],
      accountNo:[],
      vehRegNo:[],
      attribute1:[],

      checkNo:[],
      checkDate: [],
      bankName : [],
      bankBranch : [],
      comments:[],

      customerId:[],
      dmsCustNo:[],
      custName:[],
      customerSiteId:[],
      customerSiteAddress:[],
      custCity:[],
      custState:[],
      custPincode:[],
      CustomerGstNo:[],
      customerPanNo:[],
      custAccountNo:[],
      custPhone:[],
      customerType:[],
      custTaxCategoryName:[],

      srlNo:[],
      refType:[],
      customerSite:[],
      mobileNo:[],
      searchBy:[],
      searchValue:[],
      billToSiteId:[],
      custSiteAddress:[],
      applyTo:[],

      totApplAmt:[],
      totUnApplAmt:[],
      onAccountAmt:[],

      reversalComment: [],
      reversalReasonCode:[],
      reversalDate:[],
      reversalCategory:[],

      cancelReason:[],
      cancelDate:[],
      prePayment:[],
      totalUnappliedAmt : [],
      totalAppliedAmt : [],
      totalOnAccountAmt:[],
      invoiceBalnaceAmt : [],
      selectAllflag1: [],
      applyrcptFlag1: ['', [Validators.required]],

      
      balanceAmount:[],
      totAppliedtAmount:[],
      totUnAppliedtAmount:[],

      tApplAmt:[],
      tUapplAmt:[],

      glPrdStartDate :[],
      glPrdEndDate:[],

      // applyrcptFlag: ['', [Validators.required]],

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
        applAmt: [],
        balDueAmt:[],
        balance1: [],
        applAmtNew:[],
        paymentAmt:[],
        applDate:[],
        glDate:[],
        glDateLine:[],
        billToCustId:[],
        billToSiteId:[],
        invCurrancyCode:[],
        refReasonCode:[],
        // emplId:[],

      })
    }

    invLineArray(): FormArray {
      return <FormArray>this.paymentArForm.get('invLine')
    }

      ngOnInit(): void {

          this.name=  sessionStorage.getItem('name');
          this.loginArray=sessionStorage.getItem('divisionName');
          this.divisionId=Number(sessionStorage.getItem('divisionId'));
          this.loginName=sessionStorage.getItem('name');
          this.ouName = (sessionStorage.getItem('ouName'));
          this.ouId=Number(sessionStorage.getItem('ouId'));
          this.locId=Number(sessionStorage.getItem('locId'));

          this.locationId=Number(sessionStorage.getItem('locId'));
          // this.locName=(sessionStorage.getItem('locName'));
          this.deptId=Number(sessionStorage.getItem('dept'));
          this.emplId= Number(sessionStorage.getItem('emplId'));
         
          this.orgId=this.ouId;
          console.log(this.loginArray);
          console.log(this.locId);
          // console.log(this.emplId);

          //  alert("Org Id :"+ this.orgId);

          this.service.RegNoListFN()
          .subscribe(
            data1 => {
              this.VehRegNoList = data1;
              console.log(this.VehRegNoList);
            }
          ); 


        this.service.OUIdList()
            .subscribe(
              data => {
                this.OUIdList = data;
                console.log(this.OUIdList);
              }
            );

          this.service.locationIdList()
          .subscribe(
            data => {
              this.locIdList = data;
              console.log(this.locIdList);
            }
          );


          this.service.DepartmentList()
          .subscribe(
            data => {
              this.DepartmentList = data;
              console.log(this.DepartmentList);
          
            }
          );

          this.service.PaymentModeList()
          .subscribe(
            data => {
              this.PaymentModeList = data;
              console.log(this.PaymentModeList);
            }
          );

          this.service.ReceiptStatusList()
          .subscribe(
            data => {
              this.ReceiptStatusList = data;
              console.log(this.ReceiptStatusList);
            }
          );

          this.service.ReceiptTypeArList()
          .subscribe(
            data => {
              this.ReceiptTypeArList = data;
              console.log(this.ReceiptTypeArList);
            }
          );


          

          this.service.ReverseReasonList()
          .subscribe(
            data => {
              this.ReverseReasonList = data;
              console.log(this.ReverseReasonList);
            }
          );

          this.service.RefReasonLst()
          .subscribe(
            data => {
              this.RefReasonList = data;
              console.log(this.RefReasonList);
            }
          );

          this.service.GLperiod()
          .subscribe(
            data => {
              this.GLPeriodCheck = data.obj;
              console.log(this.GLPeriodCheck);
            }
          );

          this.glPrdStartDate=this.GLPeriodCheck.startDate;
          this.glPrdEndDate=this.GLPeriodCheck.endDate


      }

       validateAmt(rcptAmt :any) {
           
            if(rcptAmt ===null ||rcptAmt ===undefined || rcptAmt<=0 ) {
              alert("RECEIPT AMOUNT :  Should be above Zero.");
              this.paymentAmt=null;
             return;}

          }

          glPrdValidate(glDt :any) {
          
            var tglDate=new Date(glDt);
            var sDate=new Date(this.GLPeriodCheck.startDate);
            var tDate=new Date(this.GLPeriodCheck.endDate);
            // alert("GlDate :"+glDt +" GL Period : "+this.GLPeriodCheck.startDate +" - "+ this.GLPeriodCheck.endDate);
            // alert("GlDate :"+tglDate +" GL Period : "+sDate +" - "+ tDate);

            if(tglDate<sDate || tglDate >tDate) {
              alert ("GL date is not valid.. should be within GL period.\nGL Period : "+this.GLPeriodCheck.startDate +" - "+ this.GLPeriodCheck.endDate);
              this.glDate = this.pipe.transform(this.now, 'y-MM-dd');
              return;
            } 

          }

          glPrdValidateLine(i:any) {
           
            var patch = this.paymentArForm.get('invLine') as FormArray;
            var applLineArr = this.paymentArForm.get('invLine').value;
            var gld=applLineArr[i].glDateLine;
            // alert("index :"+i + "  gl date - " +gld);
            var tglDate=new Date(gld);
            var sDate=new Date(this.GLPeriodCheck.startDate);
            var tDate=new Date(this.GLPeriodCheck.endDate);
            if(tglDate<sDate || tglDate >tDate) {
              alert ("Line :"+ (i+1)+ " GL date is not valid.. should be within GL period\nGL Period : "+this.pipe.transform(this.GLPeriodCheck.startDate,'dd-MM-y') +" - "+ this.pipe.transform(this.GLPeriodCheck.endDate,'dd-MM-y'));
              var z=this.pipe.transform(this.now, 'y-MM-dd');
              patch.controls[i].patchValue({glDateLine:z})
              patch.controls[i].patchValue({glDate:z})
              return;
            } 
          }




      onOuIdSelected(ouId : any ){
        // alert('ouId id =' +ouId );
          if (ouId > 0) {
            // this.locIdList=null;
            // this.showOrg=false;
              this.service.getLocationSearch1(ouId)
              .subscribe(
                data => {
                  this.locIdList = data;
                  console.log(this.locIdList);
                }
              );
         }else { }
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

        // alert(mRegNo);
        this.service.getVehRegDetails(mRegNo)
        .subscribe(
          data => {
            this.getVehRegDetails = data;
            console.log(this.getVehRegDetails);

            this.paymentArForm.patchValue({
              
              customerId: this.getVehRegDetails.customerId,
           });

        //  alert("customer Id:"+this.customerId);
         this.enableCustAccount =false;
         this.GetCustomerDetails(this.customerId);
         this.GetCustomerSiteDetails(this.customerId);
         
       
       } );
      }



    //   GetCustomerDetails(mCustId :any){
    //     // alert("Customer Id: "+mCustId);
    //   this.service.ewInsSiteList(mCustId)
    //   .subscribe(
    //     data1 => {
    //       this.CustomerDetailsList = data1;
    //       console.log(this.CustomerDetailsList);
    //       this.paymentArForm.patchValue({
    //         custAccountNo:this.CustomerDetailsList.custAccountNo,
    //         // custName: this.CustomerDetailsList.custName,

    //     });
    //     this.CustAccountNoSearch(this.custAccountNo)
    //     }
    //   );  
    // }

    GetCustomerDetails(mCustId :any){
      // alert("Customer Id: "+mCustId);
    this.service.ewInsSiteList(mCustId)
    .subscribe(
      data1 => {
        this.CustomerDetailsList = data1;
        console.log(this.CustomerDetailsList);
        this.paymentArForm.patchValue({
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
          // this.dispCustButton=true;
           console.log(this.CustomerSiteDetails);
           this.paymentArForm.patchValue({
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

      onRefTypeSelected(mRefType){
          if(mRefType ==='Advance'  || mRefType===undefined)
        { this.showRefYellow=false;} 
        else { this.showRefYellow=true;}
        }



      onPayTypeSelected(payType : any  , rmStatus : any){
        // alert('paytype =' +payType  + " LocId :"+ this.locId + " Ou Id :"+this.ouId + " Deptid : "+ this.deptId + " Status :"+rmStatus);
    
       if (payType==='--Select--' || payType==='undefined') {
        // alert("null selected");
         return;
       } else if (payType === 'CASH') {  
        // alert("cash selected");
             this.service.ReceiptMethodList(payType ,this.locId,rmStatus)
              .subscribe(
                data => {
                  this.ReceiptMethodList = data.obj;
                  console.log(this.ReceiptMethodList);
                  this.showBankDetails=false;
                }
              );
              } else{
    
                // alert("Chq/dd/neft/... selected");
              this.service.ReceiptMethodList(payType ,this.ouId,rmStatus)
              .subscribe(
                data => {
                  this.ReceiptMethodList = data.obj;
                  console.log(this.ReceiptMethodList);
                  this.showBankDetails=true;
            });
          }
        
      }

     

      insuranceFlag1(e) {
        if (e.target.checked=== true) {
          this.insuranceFlag = 'Y'
       } 
       if (e.target.checked=== false) {
         this.insuranceFlag='N' 
       }
        
        // alert ('Insurance flag =' + this.insuranceFlag);
      }

      resetModalMast() {
      // this.invLineArray().clear(); 
      window.location.reload();
      }
    
      resetMast() {
        window.location.reload();
      }
    
      closeMast() {
        this.router.navigate(['admin']);
      }

      // resetForm(){
      //   this.modalForm = new FormGroup();
      //  }
       
      resetSection1(){}
        
    


      SearchByRcptNo(rcptNo : any , custActNo: any, rcptdate : any) {
        // alert("SearchByRcptNo-Receipt No : "+ rcptNo+","+custActNo +","+ rcptdate );
        this.status=null;
        var mDate= this.pipe.transform(rcptdate, 'dd-MMM-y');
         this.service.getArReceiptSearchByRcptNo(rcptNo ,custActNo,mDate)
        .subscribe(
        data => {
          this.lstcomments = data.obj;
          console.log(this.lstcomments);
         }
        );
      }

          

      
      Select(receiptNumber: any) {
        // alert ("Receipt Number : " +receiptNumber );
        this.displayButton = false;
        this.display = false;

        this.service.getArReceiptDetailsByRcptNo(receiptNumber)
        .subscribe(
        data => {
          this.receiptDetails = data.obj.oePayList[0];
          console.log(this.receiptDetails);
          this.paymentArForm.patchValue(this.receiptDetails);
          // this.locId=Number(this.locationId);
          //  alert("this.status  "+this.status);
          this.totAppliedtAmount=data.obj.oePayList[0].totAppliedtAmount.toFixed(2);
          this.totUnAppliedtAmount=data.obj.oePayList[0].totUnAppliedtAmount.toFixed(2);
          this.balanceAmount=data.obj.oePayList[0].balanceAmount.toFixed(2);
        
          this.GetCustomerDetails(data.obj.oePayList[0].customerId)
          this.GetCustomerSiteDetails(data.obj.oePayList[0].customerId)

          // alert("Receipt reversalReasonCode " + data.obj.oePayList[0].reversalReasonCode);

        
          // var rAmt=data.obj.oePayList[0].paymentAmt
          // var bAmt=data.obj.oePayList[0].balanceAmount
          // alert ("Payment Amt :"+rAmt  + "\nBalance Amt :" +bAmt) ;
      
          // && data.obj.oePayList[0].paymentAmt === data.obj.oePayList[0].balanceAmount

          if(data.obj.oePayList[0].reversalReasonCode===null ) 
          {
          
          this.showModalForm=true;
          this.enableApplyButton=true;

         // this.paymentArForm.disable()
          this.paymentArForm.get('bankName').disable();
          this.paymentArForm.get('bankBranch').disable();
          this.paymentArForm.get('checkNo').disable();
          this.paymentArForm.get('checkDate').disable();
          // this.paymentArForm.get('status').disable();
          this.paymentArForm.get('comments').disable();

          this.paymentArForm.get('reversalReasonCode').enable();
          this.paymentArForm.get('reversalCategory').enable();
          this.paymentArForm.get('reversalComment').enable();
          // this.paymentArForm.get('reversalDate').enable();
          // this.paymentArForm.get('status').enable();
          this.paymentArForm.get('selectAllflag1').enable();

                  if(data.obj.oePayList[0].paymentAmt === data.obj.oePayList[0].balanceAmount) {
                    this.enableCancelButton=true; }
                else {
                  this.enableCancelButton=false; 
                  this.paymentArForm.get('reversalReasonCode').disable();
                  this.paymentArForm.get('reversalCategory').disable();
                  this.paymentArForm.get('reversalComment').disable();
                  }
          
        }  else {

          this.showModalForm=false;
          this.enableApplyButton=false;
          this.enableCancelButton=false;
          this.paymentArForm.disable();
        }



      }
      );

          this.paymentArForm.get('searchByRcptNo').enable();   
          this.paymentArForm.get('searchByCustNo').enable();  
          this.paymentArForm.get('searchByDate').enable();  
          this.paymentArForm.get('applyTo').enable(); 
      }



      LoadValues(){

        this.paymentArForm.get('applyTo').enable();
        this.invLineArray().clear(); 
        
        this.onAccountAmt=0;

        // this.totAppliedtAmount=0;
        // this.selectAllflag=true;
        this.applyRcptFlag1=true;
        this.customerSiteId=this.billToSiteId;
        this.custAddr=this.custSiteAddress;
        this.receiptAmount=this.paymentAmt;
        this.tApplAmt=this.totAppliedtAmount;
        this.tUapplAmt=this.totUnAppliedtAmount;

        this.paymentArForm.get('selectAllflag1').disable(); 
        
        
      }

      applyReceiptFlagAll(e)
      {
      //  alert("e.target.checked :"  +e.target.checked);
        if ( e.target.checked === true) {this.selectAllflag1=true; }else { this.selectAllflag1=false; }
        var patch = this.paymentArForm.get('invLine') as FormArray;
         var invLineArr = this.paymentArForm.get('invLine').value;

       if(this.selectAllflag1===true) 
        {
    
                for (let i = 0; i < this.lstinvoices.length ; i++) 
                  {
                    
                    if (invLineArr[i].applyrcptFlag===true) 
                    
                    { 
                      
                      patch.controls[i].patchValue({applyrcptFlag:''})
                      //  alert("inner loop");
                      this.applyReceiptFlag(e,i);
                    } else {
                      // alert ("accessing Selact all  ELSE section. marking line applyto to true");
                      patch.controls[i].patchValue({applyrcptFlag:true})
                      this.applyReceiptFlag(e,i); }
                  }
        }
        else
        {
          // alert ( "in...else apply all");
         for (let i = 0; i < this.lstinvoices.length ; i++) 
            {
              patch.controls[i].patchValue({applyrcptFlag:''})
              this.applyReceiptFlag(e,i);
            }
        }

      }

      applyReceiptFlagAll101()
      {

            var patch = this.paymentArForm.get('invLine') as FormArray;
            var invLineArr = this.paymentArForm.get('invLine').value;
              var e=true;
              alert("this.lstinvoices.length :"+this.lstinvoices.length);

                for (let i = 0; i < this.lstinvoices.length ; i++) 
                  {
                    alert ("i1="+i)
                    if (invLineArr[i].applyrcptFlag===true) {
                      patch.controls[i].patchValue({applyrcptFlag:''})
                        this.applyReceiptFlag(e,i);}
                    else {
                      patch.controls[i].patchValue({applyrcptFlag:true})
                      this.applyReceiptFlag(e,i);
                    }
                  } 
                
     }




      applyReceiptFlagRefund(e,index) 
      {
        // alert (".....in Refund fn");
          var patch = this.paymentArForm.get('invLine') as FormArray;
          var invLineArr = this.paymentArForm.get('invLine').value;
          var totUnAppAmt=this.tUapplAmt;
          var totAppAmt=this.tApplAmt;
          
        
          if (e.target.checked) 
          {
          
            if(this.tApplAmt>=0){ totAppAmt=this.tApplAmt;} else {totAppAmt=0;}
            if(this.tUapplAmt<=0){alert("Unapplied Balance not availabe to Refund"); e.target.checked=false ;return}
             patch.controls[index].patchValue({applAmtNew:totUnAppAmt}) 
             }  
          else  
          {  
            patch.controls[index].patchValue({applAmtNew:''})
            var ttl=0;
          }

          this.CalculateRefBalance();
        
        }

        CalculateRefBalance() {
        // var patch = this.paymentArForm.get('invLine') as FormArray;
          var invLineArr = this.paymentArForm.get('invLine').value;
       
          var appCount=0;
          var len=this.invLineArray().length;
          // var len1=this.lstinvoices.length;
          var ttl=0;
          this.tApplAmt =this.totAppliedtAmount;
          this.tUapplAmt=this.totUnAppliedtAmount;
          // alert("this.invLineArray().length  :"+this.invLineArray().length);

          for (let i = 0; i < this.invLineArray().length ; i++) 
          {
            ttl=ttl+Number(invLineArr[i].applAmtNew);
            // alert("ttl :" +ttl);

            if(invLineArr[i].applyrcptFlag ===true) { appCount=appCount+1;}
      
          }

                 this.paymentArForm.patchValue({selectAllflag1:true})
        
                  // alert("Total Applied Amt :"  +ttl);
                  this.tApplAmt=Number(this.tApplAmt)+ttl;
                  this.tUapplAmt=Number(this.tUapplAmt)-ttl;
                  // this.balanceAmount=   this.tUapplAmt;
                 
         }



        validateLineRefAmt(index) 
        {

          var x=0;

          if (x==0) {

         var totUnAppAmt=0;
         var totAppAmt=0;
         var patch = this.paymentArForm.get('invLine') as FormArray;
         var invLineArr = this.paymentArForm.get('invLine').value;
         var lineApplAmt= invLineArr[index].applAmtNew;
         var  ytotUnAppAmt =this.totUnAppliedtAmount;
         var  ytotAppAmt = this.totAppliedtAmount;
        //  alert ("line appl amt : "+lineApplAmt);
         if(lineApplAmt > ytotUnAppAmt || lineApplAmt <=0 ) 
           { 
             alert ("Line: "+ (index+1) + "\nUnApplied  Amt :"+ytotUnAppAmt+"\n Refund Amt :"+ lineApplAmt+   "\nLine Refund Amt should be > 0 and <= Total Unapplied Amt");
           
             patch.controls[index].patchValue({applAmtNew:''})
             patch.controls[index].patchValue({applyrcptFlag:''})
             totUnAppAmt=this.totUnAppliedtAmount;
             totAppAmt=this.totAppliedtAmount;
             
           } 
          else {

            // alert ("line appl amt : "+invLineArr[index].applAmtNew);
            totUnAppAmt=Number(this.totUnAppliedtAmount)-Number(invLineArr[index].applAmtNew);
            totAppAmt=Number(this.totAppliedtAmount)+Number(invLineArr[index].applAmtNew);
            patch.controls[index].patchValue({applyrcptFlag:true})

          } 

            this.tUapplAmt=totUnAppAmt;
            this.tApplAmt=totAppAmt;
        }
        }

          
      applyReceiptFlag(e,index) 
      {
        //  alert("invoked fn from applyReceiptFlagAll");
        // alert("e  ,index= "+ e +","+index);
          var xyz;
          var tApplAmt; 
          var tUappAmt;
  
          var totUnAppAmt=0;
          var totAppAmt=0;
          var LineinvAmt=0;
          var LineApplAmount=0;
          var invBalAmt=0;
          var lineBalDueAmt=0
  
          var invLineArr = this.paymentArForm.get('invLine').value;
          var patch = this.paymentArForm.get('invLine') as FormArray;
  
           lineBalDueAmt = Number(invLineArr[index].balance1);
           totUnAppAmt=Number(this.tUapplAmt);
           totAppAmt=Number(this.tApplAmt);
        
        
  
          if (e.target.checked) 
          {
            // alert("applyReceiptFlag-IF selected ");   
            // alert("applyReceiptFlag>>> e.target.checked :"  +e.target.checked);
          
          
            if(this.tApplAmt>=0){ totAppAmt=this.tApplAmt;} else {totAppAmt=0;}
            if(this.tUapplAmt<=0){alert("Unapplied Balance not availabe to apply to Invoice");
             e.target.checked=false ;
             patch.controls[index].patchValue({applyrcptFlag:false})
             this.invLineArray().controls[index].get('applAmtNew').disable();
             this.invLineArray().controls[index].get('glDateLine').disable();
             return;
            }
                   this.invLineArray().controls[index].get('applAmtNew').enable();
                   this.invLineArray().controls[index].get('glDateLine').enable();
                  if(totUnAppAmt>=lineBalDueAmt)
                  {
                    //  alert ("in if section")

                      // this.invLineArray().controls[index].get('applAmtNew').enable();
                      xyz=LineinvAmt;
                      var lbDueAmt=lineBalDueAmt.toFixed(2)
                      patch.controls[index].patchValue({applAmtNew:lbDueAmt})
                      LineApplAmount = Number(invLineArr[index].applAmtNew);
                      invBalAmt =0;
                      var ibalAmt=invBalAmt.toFixed(2);
                      patch.controls[index].patchValue({balDueAmt:ibalAmt})

                        var z1=this.pipe.transform(this.now, 'y-MM-dd');
                        patch.controls[index].patchValue({glDateLine:z1})
                        // patch.controls[i].patchValue({glDate:z1})
                    }
                  else 
                  {
                      
                      var appAmt =Number(totUnAppAmt.toFixed(2));
                      patch.controls[index].patchValue({applAmtNew:appAmt})
                      LineApplAmount = Number(invLineArr[index].applAmtNew);
                      
                      invBalAmt =lineBalDueAmt-totUnAppAmt;
                      var newBal=Number(invBalAmt.toFixed(2));
                      patch.controls[index].patchValue({balDueAmt:newBal})

                      var z1=this.pipe.transform(this.now, 'y-MM-dd');
                      patch.controls[index].patchValue({glDateLine:z1})
                  }
                  this.CalculateBalance();
          } 
          else 
          {
                  // this.applyrcptFlag = 'N';
                  // alert("no:"+this.applyrcptFlag);
                  // alert("applyReceiptFlag-ELSE selected ");
                  this.invLineArray().controls[index].get('applAmtNew').disable();
                  this.invLineArray().controls[index].get('glDateLine').disable();
                  xyz=LineinvAmt;
                  lineBalDueAmt=Number(invLineArr[index].balance1);
                  LineApplAmount=Number(invLineArr[index].applAmtNew);
                  invBalAmt =Number(invLineArr[index].balDueAmt);
                  var b1=lineBalDueAmt.toFixed(2);
                  patch.controls[index].patchValue({balDueAmt:b1})
                  patch.controls[index].patchValue({applAmtNew:0})
                  xyz=0;
                  invBalAmt=invBalAmt+LineApplAmount;
                  
                  var tApp=Number(this.tApplAmt)-LineApplAmount;
                  this.tApplAmt= tApp;
                  this.tApplAmt.toFixed(2);
                  this.tUapplAmt =Number(this.tUapplAmt)+LineApplAmount;

                  this.tUapplAmt.toFixed(2);
                  this.paymentArForm.patchValue({selectAllflag1:''});
          } 
      }
       ////////////////////////////////////////////////

       CalculateBalance() {

          var patch = this.paymentArForm.get('invLine') as FormArray;
          var invLineArr = this.paymentArForm.get('invLine').value;
       
          var appCount=0;
          var len=this.invLineArray().length;
          var len1=this.lstinvoices.length;
          var ttl=0;
          this.tApplAmt =this.totAppliedtAmount;
          this.tUapplAmt=this.totUnAppliedtAmount;
          for (let i = 0; i < this.lstinvoices.length ; i++) 
          {
            ttl=ttl+Number(invLineArr[i].applAmtNew);
            if(invLineArr[i].applyrcptFlag ===true) { appCount=appCount+1;}
      
          }

          if(len1==appCount) {this.paymentArForm.patchValue({selectAllflag1:true}) }
        
                  // alert("Total Applied Amt :"  +ttl);
                  this.tApplAmt=Number(this.tApplAmt)+ttl;
                  this.tUapplAmt=Number(this.tUapplAmt)-ttl;
                  // this.balanceAmount=   this.tUapplAmt;
                 
         }

      


      validateLineApplAmt(index)
      {
            var x=0;
            var totUnAppAmt=0;
            var totAppAmt=0;
            var LineinvAmt=0;
            var LineApplAmount=0;
            var invBalAmt=0;
            var applyReceiptFlag;
            var invLineArr = this.paymentArForm.get('invLine').value;
            var patch = this.paymentArForm.get('invLine') as FormArray;

            var lineApplAmt= Number(invLineArr[index].applAmtNew);
            var applyReceiptFlag=invLineArr[index].applyrcptFlag;
            var  ytotUnAppAmt =Number(this.totUnAppliedtAmount);
            var  ytotAppAmt =Number(this.totAppliedtAmount);

            // alert("Apply Flag : "+index+","+ applyReceiptFlag);

            if (applyReceiptFlag === true) {
              // alert("true");

                var LineinvAmt = Number(invLineArr[index].invoiceAmount);
                var LineDueAmt = Number(invLineArr[index].balance1);
                // var patch = this.paymentArForm.get('invLine') as FormArray;

                if(lineApplAmt > LineDueAmt || lineApplAmt <=0  || lineApplAmt >ytotUnAppAmt  ) 
              { 
                alert ("Line: "+ (index+1) + "\nInvoice Amt :"+LineDueAmt+"\nApplied Amt :"+ lineApplAmt+   "\nLine appiled Amt should be > 0 and <= Line balance Amt and  <=Unapplied Amt");
                patch.controls[index].patchValue({applAmtNew:''})
                patch.controls[index].patchValue({applyrcptFlag:''})
              } 
              else 
              {
                // alert("else part");

                  LineinvAmt=invLineArr[index].invoiceAmount;
                  LineApplAmount=invLineArr[index].applAmtNew;
                  invBalAmt =invLineArr[index].balance1;
                  var newBal=0;
                  newBal =invBalAmt-LineApplAmount;
                  newBal=Number(newBal.toFixed(2));
                  
                  patch.controls[index].patchValue({balDueAmt:newBal})
                  x=0;
                  // patch.controls[index].patchValue({applAmt:LineApplAmount})
             }

              /////////////////////////////////////////////////////////
              // var patch = this.paymentArForm.get('invLine') as FormArray;
              // var invLineArr = this.paymentArForm.get('invLine').value;

              // alert ("Summary....calc...invLineArray.length :"+this.invLineArray().length );
              var totAppAmt=0;
              
              // for (let i = 0; i < this.lstinvoices.length ; i++) 
              for (let i = 0; i < this.invLineArray().length ; i++) 
              {
               totAppAmt=totAppAmt+Number(invLineArr[i].applAmtNew);
              }

              // alert ( "totAppAmt :"+totAppAmt+". ytotAppAmt  :"+ytotAppAmt + "  ytotUnAppAmt : "+ytotUnAppAmt);
              this.tApplAmt=(totAppAmt+ytotAppAmt);
              this.tApplAmt=Number(this.tApplAmt.toFixed(2));
              this.tUapplAmt=ytotUnAppAmt-totAppAmt;
              this.tUapplAmt=Number(this.tUapplAmt.toFixed(2));
              ///////////////////////////////////////////////////////
            }
            else {alert("Line-" +index+" : Apply Flag not selected...Select Apply Flag First.");
               patch.controls[index].patchValue({applAmtNew:''})
               }

          } 
          
    
    
      AppliedDetails(custActNo : any,billToSiteId : any,applyTp : any , rcptNo: any)
      {
        alert("Pending...........WIP");
        this.invLineArray().clear(); 
      }

      SearchInvoices(custActNo : any,billToSiteId : any,applyTp : any , rcptNo: any) {
        this.paymentArForm.get('applyTo').disable();
         
         this.invLineArray().reset();

         if(applyTp==='INVOICE') {

          //  this.totUnAppliedtAmount=this.paymentAmt;
              // this.totAppliedtAmount =0;

              this.service.getArReceiptSearchByInvoiceNo(custActNo,billToSiteId,rcptNo)
              .subscribe(
              data => {
                this.lstinvoices = data.obj.invLine;
                console.log(this.lstinvoices);
                    var len=this.invLineArray().length;
                   var y=0;
                  // alert("this.lstinvoices.length  >>" +this.lstinvoices.length);
                   if(this.lstinvoices.length >0) {
                    this.paymentArForm.get('selectAllflag1').disable(); 
                   } else { this.paymentArForm.get('selectAllflag1').disable(); }

                    for (let i = 0; i < this.lstinvoices.length - len; i++) 
                    {
                      var invLnGrp: FormGroup = this.invLineDetails();
                      this.invLineArray().push(invLnGrp);
                     
                    }
                    this.paymentArForm.get('invLine').patchValue(this.lstinvoices);

                    /////////////////////////////////////////////////////////
                    var patch = this.paymentArForm.get('invLine') as FormArray;
                    var invLineArr = this.paymentArForm.get('invLine').value;
            
                    for (let i = 0; i < this.lstinvoices.length - len; i++) 
                    {


                     y=invLineArr[i].balDueAmt.toFixed(2);
                     patch.controls[i].patchValue({balDueAmt:y})
                     patch.controls[i].patchValue({balance1:y})
                     var x=invLineArr[i].applAmt.toFixed(2);
                     patch.controls[i].patchValue({applAmt:x})
                   
                     var invAmt=invLineArr[i].invoiceAmount.toFixed(2);
                     patch.controls[i].patchValue({invoiceAmount:invAmt})
                  
                    //  var z=this.pipe.transform(invLineArr[i].trxDate, 'y-MM-dd');
                    //  var z1=this.pipe.transform(this.now, 'y-MM-dd');
                      // alert(invLineArr[i].trxDate);
                    
                    //  patch.controls[i].patchValue({trxDate:z})
                    //  patch.controls[i].patchValue({glDateLine:z1})
                    //  patch.controls[i].patchValue({glDate:z1})
                    }
                    ///////////////////////////////////////////////////////

                    this.applyTo=applyTp;
                    // this.applDate=this.pipe.transform(this.now, 'dd-MM-y h:mm:ss');
                  //  this.applDate=this.pipe.transform(this.now, 'y-MM-dd');

                  //  alert("glDate : "+z1);
                  //  alert("trxdate : "+z);
                  //  alert("trxdate : "+this.applDate);
                  } 
                  );
      
                  } else 
                  { 
                    // alert ("in Else part....")
                    this.paymentArForm.get('selectAllflag1').disable(); 
                    this.invLineArray().clear(); 

                    this.invLineArray().push(this.invLineDetails());
                    this.applyTo=applyTp;
                    this.applDate=this.pipe.transform(this.now, 'y-MM-dd');
                    // this.glDateLine=this.pipe.transform(this.now, 'y-MM-dd');

                      /////////////////////////////////////////////////////////
                      var patch = this.paymentArForm.get('invLine') as FormArray;
                      var invLineArr = this.paymentArForm.get('invLine').value;

                      // alert("this.invLineArray().length  >>"+this.invLineArray().length);
              
                      for (let i = 0; i < this.invLineArray().length; i++) 
                      {
                    
                      var z1=this.pipe.transform(this.now, 'y-MM-dd');
                      //  patch.controls[i].patchValue({applDate:z1})
                       patch.controls[i].patchValue({glDateLine:z1})
                      }
                      ///////////////////////////////////////////////////////


                  }
               
          }


      SearchCustomerAll() {
        // alert("Receipt No : "+ rcptNo );
        // this.lstCustomer = [];
        var data : any=[] ;
        this.service.CustomerList()
        .subscribe(
        data => {
          this.lstCustomer = data;
          console.log(this.lstCustomer);
         }
        );
      }

       searchCustomer(searchBy : any,searchValue: any) {
        // alert("Searchparam :" +searchBy +","+searchValue);
 
        this.service.insSiteList(searchValue)
        .subscribe(
        data => {
          this.lstCustomer = data;
          console.log(this.lstCustomer);
         }
        );
        alert(this.lstCustomer);
      }




      CustAccountNoSearch(accountNo){
        // alert("CustAccountNoSearch:"+accountNo);
       if(accountNo<=0)
        {
          this.custName=null;
          this.custSiteAddress=null;
        }else {

          this.service.custAccountNoSearch(accountNo,this.ouId ,this.divisionId)
        .subscribe(
          data => {
            this.accountNoSearch = data.obj;  

            if(this.accountNoSearch===null)
            {
              this.custName=null;
              this.custSiteAddress=null;
              alert("Customer Account no doesn't Exists.\nDivision/OpUnit -"+this.loginArray+"("+this.divisionId+") / "+this.ouName+"("+this.ouId+")")
            }
            else 
            {
         
                 console.log(this.accountNoSearch);
                 this.paymentArForm.patchValue({
                 customerId:this.accountNoSearch.customerId,
                 custName: this.accountNoSearch.custName,
                //  custSiteAddress: this.accountNoSearch.billToAddress,
                 billToSiteId :this.accountNoSearch.billToLocId,
            });
              this.GetCustomerSiteDetails(this.accountNoSearch.customerId);
          }
        
          }
        );
        }
      }



      findSearchByValue(searchBy,searchValue){
        alert("Not Ready....");
        
      }


      transeData(val) {
        
        delete val.searchByCustNo;
        delete val.searchByRcptNo;
        delete val.searchByDate;
        delete val.divisionId;
        delete val.division;
        delete val.ouId;
        delete val.loginArray;
        delete val.loginName;
        delete val.ouName;
        delete val.locName;
        // delete val.receiptMethodId;
        delete val.receiptDate;
        
        // delete val.glDate;
        // delete val.receiptStatus;
        // delete val.checkDate;
        delete val.locationId;
        delete val.srlNo;
        delete val.custName;
        delete val.customerSite;
        delete val.accountNo;
        delete val.orderNumber;
        delete val.mobileNo;

        delete val.totalUnappliedAmt;
        delete val.totalAppliedAmt;
        delete val.totalOnAccountAmt;
        delete val.invoiceBalnaceAmt;

        delete val.receiptMethodName;
        delete val.receiptAmount;
        delete val.custAddr;
        delete val.customerSiteId;
        delete val.custSiteAddress;
        delete val.cancelReason;
        delete val.cancelDate;
        delete val.prePayment;
        delete val.selectAllflag1;
        delete val.applyrcptFlag1;
        delete val.applyTo;
        delete val.totApplAmt;
        delete val.totUnApplAmt;
        delete val.tApplAmt;
        delete val.tUapplAmt;
        delete val.glPrdStartDate;
        delete val.glPrdEndDate;
        delete val.vehRegNo;
        delete val.insuranceFlag;
        delete val.reversalComment;
        delete val.reversalReasonCode;
        delete val.reversalDate;
        delete val.reversalCategory;



        delete val.invLine;

        return val;
      }

      transeData1(val) {
        
        delete val.searchByCustNo;
        delete val.searchByRcptNo;
        delete val.searchByDate;
        delete val.divisionId;
        delete val.division;
        delete val.ouId;
        delete val.loginArray;
        delete val.loginName;
        delete val.ouName;
        delete val.locName;
        delete val.receiptMethodId;
        delete val.receiptMethodName;
        delete val.comments;
        delete val.billToSiteId;
        delete val.receiptDate;
        delete val.paymentAmt;
        delete val.customerSite;
        
        delete val.glDate;
        delete val.status;
        delete val.checkDate;
        delete val.locId;
        delete val.srlNo;
        delete val.customerSiteAddress;
        delete val.custSiteAddress;
        delete val.accountNo;
        delete val.orderNumber;
        delete val.mobileNo;
        delete val.totalUnappliedAmt;
        delete val.totalAppliedAmt;
        delete val.totalOnAccountAmt;
        delete val.invoiceBalnaceAmt;
        delete val.balance1;
        delete val.selectAllflag1;
        delete val.applyrcptFlag1;
        delete val.orgId;
        delete val.deptId;
        // delete val.emplId;
        delete val.payType;
        delete val.referenceNo;
        delete val.checkNo;
        delete val.vehNo;
        delete val.bankName;
        delete val.bankBranch;
        delete val.bankBranch;
        delete val.refType;
        delete val.cancelDate;
        delete val.totApplAmt;
        delete val.totUnApplAmt;
        delete val.onAccountAmt;
        delete val.vehRegNo;
        delete val.custCity;
        delete val.custState;
        delete val.custPincode;
        delete val.customerPanNo;
        delete val.custPhone;
        delete val.customerType;
        delete val.custTaxCategoryName;
        delete val.reversalComment;
        delete val.reversalReasonCode;
        delete val.reversalDate;
        delete val.reversalCategory;
        delete val.cancelReason;
        delete val.prePayment;
        delete val.tApplAmt;
        delete val.tUapplAmt;
        delete val.glPrdStartDate;
        delete val.glPrdEndDate;
        delete val.receiptStatus;
        delete val.insuranceFlag;
        delete val.custAddr;

        return val;
      }

      transeData2(val) {
        
       
        delete val.invLine.applyTo;
        delete val.invLine.applyrcptFlag;
        delete val.invLine.trxNumber;
        delete val.invLine.trxDate;
        delete val.invLine.invoiceAmount;
        delete val.invLine.applAmt;

      

        return val;
      }




      CheckDataValidations1(){
        const formValue: IPaymentRcptAr = this.paymentArForm.value;
        // alert('refType ='+formValue.refType+' '+'referenceNo='+formValue.referenceNo);  // refType undefined null referenceNo
       
        if (formValue.refType == undefined)
        {
            alert ("REFERENCE TYPE\nRef.Type Not Selected....");
            return;
         }

        if(formValue.refType !='Advance' && (formValue.referenceNo==null || formValue.referenceNo.trim()=='' ))
       {
        alert("REFERENCE NO\nRef.number to be entered for Non-Advance Receipts");
        return;
       }

       if(formValue.refType =='Advance')
       {
        alert("Advance Selected....")
        return;
       }
        

        // alert("RefNo:"+this.paymentArForm.controls['rfNo'].value);
        // alert("RefType:"+this.paymentArForm.controls['rfType'].value);

        // var refType = this.paymentArForm.get('refType').value;
        // var referenceNo =this.paymentArForm.get('referenceNo: ').value;

        // if(rfType != 'Advance' && (rfNo.trim() == '' || rfNo==null || rfNo== undefined) )
        // {
        //   alert("Ref.number to be entered for Non-Advance Receipts");
        // }
        // if (rfType == undefined){
        //   alert (" Ref.Type Not Selected....")
        // }
     
      }

      SaveApply(applType){

       
        if(applType ==='INVOICE') {
          // alert("Application type :"+applType +" ....wip");
        
         
          this.SaveApplyReceipt() ;
          }
        if(applType ==='REFUND') {
          // alert("Application type :"+applType + " ....wip");
          // this.disableApplySave =false;
          this.SaveRefReceipt();


        }
        if(applType ==='ON ACCOUNT') {
          alert("Application type :"+applType +" ....wip");
          // this.disableApplySave =false;
        }

      }

      CalculateRcptBalances(){
        alert ("Calculating balances....")
        this.totUnAppliedtAmount=this.tUapplAmt;
        this.totAppliedtAmount=this.tApplAmt;
        this.balanceAmount=this.tUapplAmt;
      }

      validateSave(mType){

        if(mType ==='INVOICE'){
      
        var applLineArr = this.paymentArForm.get('invLine').value;
        var len1=applLineArr.length;
        // alert ( "Array Length :" +len1);
       // for (let i = 0; i < len1 ; i++) 
       for (let i=len1-1; i >= 0 ; i--) 
        {

          // alert("index :"+i + " Apply RctFalg : " + applLineArr[i].applyrcptFlag);
          
          if(this.invLineArray().controls[i].get('applyrcptFlag').value !=true) {
          //  alert(i + applLineArr[i].applyrcptFlag);
            this.invLineArray().removeAt(i);
          }
        }
      }
      }


      SaveApplyReceipt() 
      {
        // alert ("Posting data  to AR RECEIPT appl......")
       
        var patch = this.paymentArForm.get('invLine') as FormArray;
        var applLineArr = this.paymentArForm.get('invLine').value;

        this.applLineValidation=false;
        var len1=applLineArr.length;
        // alert ("this.invLineArray().length b4 removing unchecked lines  :" +len1);

        
        for (let i = 0; i < len1 ; i++) 
          {
        
            if(applLineArr[i].applyrcptFlag===true) {
                  this.CheckLineValidations(i);
            }
          }

          if(this.applLineValidation===false ) { 
            alert("Apply Validation Failed... \nPosting not done....")
            return;
          }
          this.CalculateRcptBalances();
          this.applySaveButton =false;;
       
        const formValue: IPaymentRcptAr =this.transeData1(this.paymentArForm.value);

      
        // alert ("this.invLineArray().length after removing unchecked lines  :" +this.invLineArray().length);

        let variants = <FormArray>this.invLineArray();
        var receiptNumber = this.paymentArForm.get('receiptNumber').value;
        var receiptDate = this.paymentArForm.get('receiptDate').value;
        var customerId = this.paymentArForm.get('customerId').value;
        var custAccountNo= this.paymentArForm.get('custAccountNo').value;
        var customerSiteId= this.paymentArForm.get('customerSiteId').value;
        var custName= this.paymentArForm.get('custName').value;
         
        for (let i = 0; i < this.invLineArray().length; i++) {
          //  let variants = <FormArray>this.invLineArray();
         
          let variantFormGroup = <FormGroup>variants.controls[i];
          variantFormGroup.addControl('receiptNumber', new FormControl(receiptNumber, Validators.required));
          variantFormGroup.addControl('receiptDate', new FormControl(receiptDate, Validators.required));
          variantFormGroup.addControl('customerId', new FormControl(customerId, Validators.required));
          variantFormGroup.addControl('custAccountNo', new FormControl(custAccountNo, Validators.required));
          variantFormGroup.addControl('customerSiteId', new FormControl(customerSiteId, Validators.required));
          variantFormGroup.addControl('custName', new FormControl(custName, Validators.required));
          patch.controls[i].patchValue({applAmt:applLineArr[i].applAmtNew});
          patch.controls[i].patchValue({glDate:applLineArr[i].glDateLine});
          // patch.controls[i].patchValue({trxDate: this.pipe.transform(applLineArr[i].trxDate,'y-MM-dd')});
         
        }

        console.log(variants.value);

          this.service.ArReceipApplySubmit(variants.value,receiptNumber).subscribe((res: any) => {  
          if (res.code === 200) {
            alert('RECORD INSERTED SUCCESSFUILY');
            
            this.paymentArForm.disable();
         
          } else {
            if (res.code === 400) {
              alert('Error While Saving Record:-'+res.obj);
 
            }
          }
        });
        }


      
      SaveRefReceipt() 
      {
        // alert ("Posting data  to AR RECEIPT appl......")

        var patch = this.paymentArForm.get('invLine') as FormArray;
        var applLineArr = this.paymentArForm.get('invLine').value;
              

        this.applLineValidation=false;
        var len1=applLineArr.length;
        
        for (let i = 0; i < len1 ; i++) 
          {
            this.CheckLineValidationsRef(i);
          }

          if(this.applLineValidation===false ) { 
            alert("Validation Failed... \nPosting not done....")
            return;
          }
          this.applySaveButton =false;
          const formValue: IPaymentRcptAr =this.transeData2(this.paymentArForm.value);

        // var invLine= this.paymentArForm.get('invLine').value;

        let variants = <FormArray>this.invLineArray();
        var receiptNumber = this.paymentArForm.get('receiptNumber').value;
        var receiptDate = this.paymentArForm.get('receiptDate').value;
        var payType = this.paymentArForm.get('payType').value;
        var receiptMethodId= this.paymentArForm.get('receiptMethodId').value;
        var receiptMethodName= this.paymentArForm.get('receiptMethodName').value;
        var empId= this.paymentArForm.get('emplId').value;
        // var empId= 26;
        // alert ("Empid =" +empId);
         // var glDate= this.paymentArForm.get('glDateLine').value;

        for (let i = 0; i < this.invLineArray().length; i++) {
          let variantFormGroup = <FormGroup>variants.controls[i];
          variantFormGroup.addControl('receiptNumber', new FormControl(receiptNumber, Validators.required));
          variantFormGroup.addControl('receiptDate', new FormControl(receiptDate, Validators.required));
          variantFormGroup.addControl('payType', new FormControl(payType, Validators.required));
          variantFormGroup.addControl('receiptMethodId', new FormControl(receiptMethodId, Validators.required));
          variantFormGroup.addControl('receiptMethodName', new FormControl(receiptMethodName, Validators.required));
          variantFormGroup.addControl('emplId', new FormControl(empId, Validators.required));

          patch.controls[i].patchValue({paymentAmt:applLineArr[i].applAmtNew});
          patch.controls[i].patchValue({glDate:applLineArr[i].glDateLine});

        }
        console.log(variants.value);

        // console.log();
          // this.service.ArReceiptRefundSubmit(formValue).subscribe((res: any) => {
            this.service.ArReceiptRefundSubmit(variants.value).subscribe((res: any) => {
          if (res.code === 200) {
            alert('RECORD INSERTED SUCCESSFUILY -' +res.obj);
            // this.paymentArForm.reset();
          } else {
            if (res.code === 400) {
              alert('Error While Saving Record:-'+res.obj);
              // this.paymentArForm.reset();
            }
          }
        });
      }



      newMast() {

        this.CheckDataValidations();

          if (this.checkValidation===true) {
            alert("Data Validation Sucessfull....\nPosting data  to AR PAYMENT TABLE")

        const formValue: IPaymentRcptAr =this.transeData(this.paymentArForm.value);
        this.service.ArReceiptSubmit(formValue).subscribe((res: any) => {
          if (res.code === 200) {
            alert('RECORD INSERTED SUCCESSFUILY');
            this.receiptNumber=res.obj;
            this.paymentArForm.disable();
             this.paymentArForm.get('searchByRcptNo').enable();   
             this.paymentArForm.get('searchByCustNo').enable();  
              this.paymentArForm.get('searchByDate').enable();  
              this.totUnAppliedtAmount=this.paymentAmt;

            // this.paymentArForm.reset();
            this.displayButton=false;
          } else {
            if (res.code === 400) {
              alert('Error While Saving Record:-'+res.obj);
              // this.paymentArForm.reset();
            }
          }
        });
      }else{ alert("Data Validation Not Sucessfull....\nPosting Not Done...")  }

      }

      CheckCancelValidation(){

        const formValue: IPaymentRcptAr = this.paymentArForm.value;


        if (formValue.reversalReasonCode===undefined || formValue.reversalReasonCode===null || formValue.reversalReasonCode<=0)
        {
           this.cancelValidation=false; 
           alert ("REVERSE REASON: Should not be null....");
            return;
         } 

         alert("formValue.reversalDate :"+formValue.reversalDate);

         if (formValue.reversalDate===undefined || formValue.reversalDate===null)
        {
           this.cancelValidation=false; 
           alert ("REVERSAL DATE: Should not be null....");
            return;
         } 


         if (formValue.reversalCategory===undefined || formValue.reversalCategory===null )
         {
            this.cancelValidation=false; 
            alert ("REVERSAL CATEGORY : Should not be null");
             return;
          } 
          
          if (formValue.reversalComment===undefined || formValue.reversalComment===null || formValue.reversalComment.trim()=='')
          {
             this.cancelValidation=false; 
             alert ("REVERSAL REMARKS : Should not be null");
              return;
           } 

        alert("Status :" +formValue.status);
        if (formValue.status===undefined || formValue.status===null)
        {
          alert ("STATUS: Should not be null....");
          this.cancelValidation=false
          return;
          } 

          this.cancelValidation=true;
      }


      reverseReceipt() {

            this.CheckCancelValidation();
            if (this.cancelValidation) {
              alert("Data Validation Sucessfull....\nCancelling Receipt.")
              this.enableCancelButton=false;

              // const formValue: IPaymentRcptAr =this.transeData(this.paymentArForm.value);
              const formValue: IPaymentRcptAr =this.paymentArForm.value;
              // debugger;
              this.service.ReverseArReceiptSubmit(formValue).subscribe((res: any) => {
              if (res.code === 200) {
                alert('RECORD UPDATED SUCCESSFUILY');
                this.paymentArForm.disable()
                // this.paymentArForm.get('receiptNumber').disable();
               
                this.paymentArForm.get('searchByRcptNo').enable();   
                this.paymentArForm.get('searchByCustNo').enable();  
                this.paymentArForm.get('searchByDate').enable();  
                // window.location.reload();
              } else {
                if (res.code === 400) {
                  alert('ERROR OCCOURED IN PROCEESS');
                  // this.paymentArForm.reset();
                }
              }
            });
          }else{ alert("Data Validation Not Sucessfull....\nCancellation not done...")  }
        }


     
      onReasonSelected (mReasonId) {
       if (mReasonId !=null) { 
          this.reversalDate= this.pipe.transform(this.now, 'y-MM-dd');
          // glDate = this.pipe.transform(Date.now(), 'y-MM-dd');
          this.reversalCategory='Receipt Reversed'
          this.status='REVERSED'
          this.enableApplyButton=false;
        }

      }


      ReceiptArApplication(rcptNumber:any,custActNo:any,rcptDate:any){
        alert(this.receiptNumber) ;
        this.service.getArReceiptSearchByRcptNo(rcptNumber,custActNo,rcptDate)
         .subscribe(
        data => {
          this.lstcomments = data.obj;
          console.log(this.lstcomments);
         }
        );
      }


      OnApplyTypeSelected(applType : any ){
    
        this.invLineArray().clear();
        this.applyTo=applType;
          if (applType === 'INVOICE') {   
            // alert ("in INVOICE  ...");
             this.showInvoiceGrid =true;  this.showRefundGrid =false;  this.showOnAcGrid =false; }
          else if (applType === 'REFUND') {
            // alert ("in REFUND  ...");
            this.showInvoiceGrid =false;  this.showRefundGrid =true;  this.showOnAcGrid =false; }
          else if (applType === 'ON ACCOUNT') {
            // alert ("in ON ACCOUNT  ...");
            this.showInvoiceGrid =false;  this.showRefundGrid =false;  this.showOnAcGrid =true; }
           
          } 
       

          CheckDataValidations(){

            const formValue: IPaymentRcptAr = this.paymentArForm.value;

            alert ("OPERATING UNIT :" +formValue.ouId);

            if (formValue.ouId===undefined || formValue.ouId===null)
            {
               this.checkValidation=false; 
               alert ("OPERATING UNIT: Should not be null....");
                return;
             } 

            if (formValue.locId===undefined || formValue.locId===null)
            {
               this.checkValidation=false; 
               alert ("LOCATION: Should not be null....");
                return;
             } 

             if (formValue.deptId===undefined || formValue.deptId===null)
            {
               this.checkValidation=false; 
               alert ("DEPT: Should not be null....");
                return;
             } 


             if (formValue.custAccountNo===undefined || formValue.custAccountNo===null || formValue.custAccountNo<=0)
             {
                this.checkValidation=false; 
                alert ("CUST NO : Should not be null / Enter valid Customer No");
                 return;
              } 


              if (formValue.billToSiteId===undefined || formValue.billToSiteId===null)
              {
                  this.checkValidation=false; 
                  alert ("BILL TO SITE : Should not be null....");
                  return;
                } 

                var tglDate=new Date(formValue.glDate);
                var sDate=new Date(this.GLPeriodCheck.startDate);
                var tDate=new Date(this.GLPeriodCheck.endDate);

              //  alert("Gl date :"+tglDate +"\nGl prd startdate :"+sDate+"\nGl prd enddate :"+tDate);
               
              // if(formValue.glDate===undefined || formValue.glDate===null || formValue.glDate<this.GLPeriodCheck.startDate || formValue.glDate >this.GLPeriodCheck.endDate ) 
              if(formValue.glDate===undefined || formValue.glDate===null || tglDate<sDate || tglDate >tDate ) 
                {
                    this.checkValidation=false;
                    alert ("GL DATE: " + this.pipe.transform(tglDate, 'y-MM-dd')+" Should not be null / Should be within GL period.\nGL Period : "+this.GLPeriodCheck.startDate +" - "+ this.GLPeriodCheck.endDate);
                    this.glDate = this.pipe.transform(this.now, 'y-MM-dd');
                    return; 
                 }


                if (formValue.paymentAmt <=0 || formValue.paymentAmt===undefined || formValue.paymentAmt===null )
                {
                    this.checkValidation=false;  
                    alert ("RECEIPT AMT: Should be above Zero");
                    return;
                } 
    
              if (formValue.refType===undefined || formValue.refType===null)
              {
                  this.checkValidation=false; 
                  alert ("REF TYPE: Should not be null....");
                  return;
                } 

              if(formValue.refType !='Advance' && (formValue.referenceNo==null || formValue.referenceNo.trim()=='' ))
              {
                alert("REFERENCE NO\nRef.number to be entered for Non-Advance Receipts");
                return;
              }

              if (formValue.payType===undefined || formValue.payType===null)
              {
                 this.checkValidation=false;   
                 alert ("PAY MODE: Please Select payment Type....");
                  return;
               } 

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

                 if (formValue.status===undefined || formValue.status===null)
                 {
                    this.checkValidation=false; 
                    alert ("RECEIPT STATUS: Should not be null....");
                     return;
                  } 
              this.checkValidation=true

          }

          clearSearch() {
            this.paymentArForm.get('searchByRcptNo').reset();
            this.paymentArForm.get('searchByCustNo').reset();
            this.paymentArForm.get('searchByDate').reset();
            this.paymentArForm.get('searchByRcptNo').enable();
            this.paymentArForm.get('searchByCustNo').enable();
            this.paymentArForm.get('searchByDate').enable();
            this.lstcomments=null;
          }

          CheckLineValidations(i) {

            // alert('addrow index '+i);
          
            var applLineArr = this.paymentArForm.get('invLine').value;
            var lineValue1=applLineArr[i].applAmtNew;
            var tglDate=new Date(applLineArr[i].glDateLine);
            var chkFlag =applLineArr[i].applyrcptFlag;
            var j=i+1;
    
       
            if(lineValue1===undefined || lineValue1===null || lineValue1<=0){
              alert("Line-"+j+ " APPL AMT :  Should  be grater than Zero");
              this.applLineValidation=false;
              return;
            } 

       
            var sDate=new Date(this.GLPeriodCheck.startDate);
            var tDate=new Date(this.GLPeriodCheck.endDate);
            if(tglDate===undefined || tglDate===null || tglDate<sDate || tglDate >tDate ) 
            {
                this.checkValidation=false;
                alert ("GL DATE: Should not be null / Should be within GL period.\nGL Period : "+this.GLPeriodCheck.startDate +" - "+ this.GLPeriodCheck.endDate);
                this.glDate = this.pipe.transform(this.now, 'y-MM-dd');
                return; 
             }


            if(chkFlag ===false || chkFlag ===null ||chkFlag ===undefined) {
              alert("Line-"+j+ " : Line not Selected.Pls Check Mark the Line");
              this.applLineValidation=false;
              return;
            }
            
             this.applLineValidation =true;
            }


            CheckLineValidationsRef(i) {
              
              var applLineArr = this.paymentArForm.get('invLine').value;
              var lineValue1=applLineArr[i].applAmtNew;
              var lineValue2=applLineArr[i].refReasonCode;
              var tglDate=new Date(applLineArr[i].glDateLine);
              var chkFlag =applLineArr[i].applyrcptFlag;
              var j=i+1;
      
            
              if(lineValue1===undefined || lineValue1===null || lineValue1<=0){
                alert("Line-"+j+ " REFUND AMT :  Should  be grater than Zero");
                this.applLineValidation=false;
                return;
              } 

              if(lineValue2===undefined || lineValue2===null ){
                alert("Line-"+j+ " REFUND REASON :  Should  not be null");
                this.applLineValidation=false;
                return;
              } 

              var sDate=new Date(this.GLPeriodCheck.startDate);
              var tDate=new Date(this.GLPeriodCheck.endDate);
              if(tglDate===undefined || tglDate===null || tglDate<sDate || tglDate >tDate ) 
              {
                  this.checkValidation=false;
                  alert ("GL DATE: Should not be null / Should be within GL period.\nGL Period : "+this.GLPeriodCheck.startDate +" - "+ this.GLPeriodCheck.endDate);
                  this.glDate = this.pipe.transform(this.now, 'y-MM-dd');
                  return; 
               }
  
              if(chkFlag ===false || chkFlag ===null ||chkFlag ===undefined) {
                alert("Line-"+j+ " : Line not Selected.Pls Check Mark the Line");
                this.applLineValidation=false;
                return;
              }
              
               this.applLineValidation =true;
              }
          
  
         

           
          
}
