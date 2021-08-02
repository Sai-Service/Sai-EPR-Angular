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
  public VehRegNoList       : Array<string> = [];
  accountNoSearch:any;
  getVehRegDetails:any;
  CustomerDetailsList:any;
  CustomerSiteDetails:any;

  userList1: any[] = [];
  lastkeydown1: number = 0;

  lstcomments: any[];
  lstinvoices: any[];
  lstCustomer: any[];
  ouId :number;
  deptId:number; 

  checkNo : string;
  // checkDate: Date;
  checkDate = this.pipe.transform(Date.now(), 'y-MM-dd');
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
  referenceNo:string ;
 
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
  receiptDate = this.pipe.transform(this.now, 'dd-MM-y');
  glDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  trxdate= this.pipe.transform(this.now, 'dd-MM-y');
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

  // public searchByRcptNo =1000024;
  // public searchByOrderNo =2111202148;
  // public searchByCustNo =1212;
  searchByRcptNo:number;
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

  enableCustAccount=true;
  checkValidation=false;
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
  insuranceFlag : string;
  refType: string;


  loginName:string;
  loginArray:string;
  name:string;
  ouName : string;
  locId: number;
  locName : string;
  // emplId :number;
  orgId:number;

  public emplId =26;
  // customerId:number;
  public billToSiteId=101;
  // public billToSiteId=107; 

  public applyTo='INVOICE'
  public applDate=this.pipe.transform(this.now, 'dd-MM-y h:mm:ss');
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
        applDate:[],
        billToCustId:[],
        billToSiteId:[],
        invCurrancyCode:[]

      })
    }

    invLineArray(): FormArray {
      return <FormArray>this.paymentArForm.get('invLine')
    }

      ngOnInit(): void {

          this.name=  sessionStorage.getItem('name');
          this.loginArray=sessionStorage.getItem('divisionName');
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


      }

       validateAmt(rcptAmt :any) {
           
            if(rcptAmt ===null ||rcptAmt ===undefined || rcptAmt<=0 ) {
              alert("RECEIPT AMOUNT :  Should be above Zero.");
              this.paymentAmt=null;
             return;}

          }

      onOuIdSelected(ouId : any ){
        // alert('ouId id =' +ouId );
          if (ouId > 0) {
            this.locIdList=null;
            // this.showOrg=false;
              this.service.getLocationSearch1(ouId)
              .subscribe(
                data => {
                  this.locIdList = data;
                  console.log(this.locIdList);
                }
              );
         }
          else { }
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
        );}

      

      Select(receiptNumber: any) {
        // alert ("Invoice Number,Receipt Number : " +receiptNumber +" ,"+trxNumber);
        // this.searchByRcptNo=receiptNumber;
        let select = this.lstcomments.find(d => d.receiptNumber === receiptNumber);
        if (select) {
               
          this.paymentArForm.patchValue(select);
          this.receiptNumber = select.receiptNumber;
          this.custSiteAddress = select.custAddress;
          this.customerId=select.customerId;
          this.receiptDate=this.pipe.transform(select.receiptDate, 'y-MM-dd');
          this.checkDate=this.pipe.transform(select.checkDate, 'y-MM-dd');
          this.glDate=this.pipe.transform(select.glDate, 'y-MM-dd');
          this.reversalReasonCode=Number(select.reversalReasonCode)
          this.reversalComment=select.reversalComment;
          // this.emplId=select.emplId;
          this.displayButton = false;
        
          this.display = false;
          this.CustAccountNoSearch(select.custAccountNo);

          if(Number(select.reversalReasonCode)>0) {
            this.showModalForm=false;
            this.enableApplyButton=false;
            this.enableCancelButton=false;
           this.paymentArForm.disable();} else {
            this.showModalForm=true;
            this.enableApplyButton=true;
            this.enableCancelButton=true;
            this.paymentArForm.disable()
            this.paymentArForm.get('receiptNumber').enable();
            this.paymentArForm.get('reversalReasonCode').enable();
            this.paymentArForm.get('reversalCategory').enable();
            this.paymentArForm.get('reversalComment').enable();
            this.paymentArForm.get('reversalDate').enable();
            this.paymentArForm.get('status').enable();
          }


          this.paymentArForm.get('searchByRcptNo').enable();   
          this.paymentArForm.get('searchByCustNo').enable();  
          this.paymentArForm.get('searchByDate').enable();  

          
        }
      }

      LoadValues(){

     
        this.invLineArray().clear(); 
        this.totUnAppliedtAmount=this.paymentAmt;
        this.totalUnappliedAmt=this.paymentAmt;
        this.onAccountAmt=0;

        this.totAppliedtAmount=0;
        // this.selectAllflag=true;
        this.applyRcptFlag1=true;
        this.customerSiteId=this.billToSiteId;
        this.custAddr=this.custSiteAddress;
        this.receiptAmount=this.paymentAmt;
        
        
      }

      applyReceiptFlagAll(e)
      {
      //  alert("e.target.checked :"  +e.target.checked);
        if ( e.target.checked === true) {this.selectAllflag1=true; }else { this.selectAllflag1=false; }
        //  alert("select All flag :"+this.selectAllflag1);
         var patch = this.paymentArForm.get('invLine') as FormArray;
         var invLineArr = this.paymentArForm.get('invLine').value;

       if(this.selectAllflag1===true) 
        {
    
          for (let i = 0; i < this.lstinvoices.length ; i++) 
            {
              
              if (invLineArr[i].applyrcptFlag===true) 
              
               { 
                 
                 patch.controls[i].patchValue({applyrcptFlag:''})
                 alert("inner loop");
                 this.applyReceiptFlag(e,i);
               }
                alert ("accessing Selact all  ELSE section. marking line applyto to true");
                patch.controls[i].patchValue({applyrcptFlag:true})
                this.applyReceiptFlag(e,i);
            }
        }
        else
        {
          alert("select All flag ELSE :"+this.selectAllflag1);

          for (let i = 0; i < this.lstinvoices.length ; i++) 
            {
              patch.controls[i].patchValue({applyrcptFlag:''})
              this.applyReceiptFlag(e,i);
            }
        }

      }


     
      applyReceiptFlag(e,index) 
      {
         alert("invoked fn from applyReceiptFlagAll");
        alert("e  ,index= "+ e +","+index);
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
  
          lineBalDueAmt = invLineArr[index].balance1;
          totUnAppAmt =this.totUnAppliedtAmount
  
        
  
          if (e.target.checked) 
          {
            alert("applyReceiptFlag-IF selected ");   
            alert("applyReceiptFlag>>> e.target.checked :"  +e.target.checked);
            // this.applyrcptFlag = 'Y'
            // alert("yes:"+this.applyrcptFlag);
         
          if(this.totAppliedtAmount>=0){ totAppAmt=this.totAppliedtAmount;} else {totAppAmt=0;}
          if(this.totUnAppliedtAmount<=0){alert("Unapplied Balance not availabe to apply to Invoice"); e.target.checked=false ;return}
         
                  if(totUnAppAmt>=lineBalDueAmt)
                  {
                    //  alert ("in if section")
                      xyz=LineinvAmt;
                      patch.controls[index].patchValue({applAmtNew:lineBalDueAmt})
                      LineApplAmount = invLineArr[index].applAmtNew;
                      invBalAmt =0;
                      patch.controls[index].patchValue({balDueAmt:invBalAmt})
                    }
                  else 
                  {
                      var appAmt =0
                      appAmt =Number(totUnAppAmt.toFixed(2));
                      patch.controls[index].patchValue({applAmtNew:appAmt})
                      LineApplAmount = invLineArr[index].applAmtNew;
                      var x=0;
                      invBalAmt =lineBalDueAmt-totUnAppAmt;
                      var newBal=0;
                      newBal=Number(invBalAmt.toFixed(2));
                      patch.controls[index].patchValue({balDueAmt:newBal})
                  }
          } 
          else 
          {
                  // this.applyrcptFlag = 'N';
                  // alert("no:"+this.applyrcptFlag);
                  alert("applyReceiptFlag-ELSE selected ");
                  xyz=LineinvAmt;
                  lineBalDueAmt=invLineArr[index].balance1;
                  LineApplAmount=invLineArr[index].applAmtNew;
                  invBalAmt =invLineArr[index].balDueAmt;
                  patch.controls[index].patchValue({balDueAmt:lineBalDueAmt})
                  patch.controls[index].patchValue({applAmtNew:0})
                  xyz=0;
                  invBalAmt=invBalAmt+LineApplAmount;
                  this.totAppliedtAmount= Number(this.totAppliedtAmount)-LineApplAmount;
                  this.totUnAppliedtAmount =Number(this.totUnAppliedtAmount)+LineApplAmount;
          } 
          
          /////////////// Applied total ////Unapplied Total///// calc///
          var patch = this.paymentArForm.get('invLine') as FormArray;
          var invLineArr = this.paymentArForm.get('invLine').value;
          var totAppAmt=0;
          var appCount=0;
          var len=this.invLineArray().length;
          var len1=this.lstinvoices.length;

         
          for (let i = 0; i < this.lstinvoices.length ; i++) 
          {
            totAppAmt=totAppAmt+Number(invLineArr[i].applAmtNew);
            if(invLineArr[i].applyrcptFlag ===true) { appCount=appCount+1;}
          }

                    // alert("len,len1,appcount :"+   len +","+len1 +","+appCount);
                    if(len1==appCount) 
                    {
                      // alert("1 this.selectAllflag :" + this.selectAllflag);
                      
                      // this.selectAllflag=true;

                      // alert("2 this.selectAllflag :" + this.selectAllflag);
                      this.paymentArForm.patchValue({selectAllflag1:true})
                      // alert ("Select All True now");
                    }

          this.totAppliedtAmount=totAppAmt;
          this.totUnAppliedtAmount=Number(this.totalUnappliedAmt)-totAppAmt;
          this.balanceAmount=  this.totUnAppliedtAmount;
      }
       ////////////////////////////////////////////////
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
            var lineApplAmt= invLineArr[index].applAmtNew;
            var applyReceiptFlag=invLineArr[index].applyrcptFlag;

            alert("Apply Flag : "+index+","+ applyReceiptFlag);

            if (applyReceiptFlag == true) {
              alert("true");

            var LineinvAmt = Number(invLineArr[index].invoiceAmount);
            var LineDueAmt = Number(invLineArr[index].balance1);
            var patch = this.paymentArForm.get('invLine') as FormArray;

            if(lineApplAmt > LineDueAmt || lineApplAmt <=0 ) 
              { 
                alert ("Line: "+ (index+1) + "\nInvoice Amt :"+LineDueAmt+"\nApplied Amt :"+ lineApplAmt+   "\nLine appiled Amt should be > 0 and <= Line balance Amt");
                patch.controls[index].patchValue({applAmtNew:''})
                patch.controls[index].patchValue({applyrcptFlag:''})

              } 
              else 
              {
                  // var xtotApplAmt =this.totApplAmt;
                  // var xtotUnAppAmt =this.totUnApplAmt;
                  // var newApplAmt =invLineArr[index].applAmt;
          

                  LineinvAmt=invLineArr[index].invoiceAmount;
                  LineApplAmount=invLineArr[index].applAmtNew;
                  invBalAmt =invLineArr[index].balance1;
                  var newBal=0;
                  newBal =invBalAmt-LineApplAmount;
                  newBal=Number(newBal.toFixed(2));
                  
                  patch.controls[index].patchValue({balDueAmt:newBal})
                  x=0;
                  patch.controls[index].patchValue({applAmt:LineApplAmount})
            }

              /////////////////////////////////////////////////////////
              var patch = this.paymentArForm.get('invLine') as FormArray;
              var invLineArr = this.paymentArForm.get('invLine').value;
              // var len=this.invLineArray().length;

              var totAppAmt=0;
              // var totUnappAmt=0;
              
              // alert("length:"+len);
            
              for (let i = 0; i < this.lstinvoices.length ; i++) 
              {
               totAppAmt=totAppAmt+Number(invLineArr[i].applAmtNew);
              //  alert("invLineArr[i].applAmt :" +i+","+ invLineArr[i].applAmt);
              }
              // alert("totAppAmt "+totAppAmt);
              this.totAppliedtAmount=totAppAmt;
              this.totUnAppliedtAmount=Number(this.totalUnappliedAmt)-totAppAmt;

              ///////////////////////////////////////////////////////
            }
            else {alert("Apply Falg not selected...Select Apply First...");}

          } 
          
     /////////////////////////////////////////     
           
        

      

      // ApplyRcpt(trxNumber:any,  receiptNumber: any) {

      //   if(this.applyrcptFlag==='Y'){
      //   alert ("Invoice Number,Receipt Number : " +trxNumber   +" ,"+receiptNumber);
      //    }
      //    else 
      //    {
      //    alert("APPLY flag not selected");
      //    }
     
      // }

    
      AppliedDetails(custActNo : any,billToSiteId : any,applyTp : any , rcptNo: any)
      {
        alert("Pending...........WIP");
        this.invLineArray().clear(); 
      }

      SearchInvoices(custActNo : any,billToSiteId : any,applyTp : any , rcptNo: any) {
      
       
         this.invLineArray().reset();
         if(applyTp==='INVOICE') {

           this.totUnAppliedtAmount=this.paymentAmt;
              this.totAppliedtAmount =0;

              this.service.getArReceiptSearchByInvoiceNo(custActNo,billToSiteId,rcptNo)
              .subscribe(
              data => {
                this.lstinvoices = data.obj.invLine;
                console.log(this.lstinvoices);
                    var len=this.invLineArray().length;
                   var y=0;
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
                     y=invLineArr[i].balDueAmt;
                     patch.controls[i].patchValue({balance1:y})
                    }
                    ///////////////////////////////////////////////////////

                    this.applyTo=applyTp;
                    this.applDate=this.pipe.transform(this.now, 'dd-MM-y h:mm:ss');
                  }
                  );
      
                  } else 
                  { 
                    this.invLineArray().clear(); 

                    this.invLineArray().push(this.invLineDetails());
                    this.applyTo=applyTp;
                    this.applDate=this.pipe.transform(this.now, 'dd-MM-y h:mm:ss');
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

          this.service.custAccountNoSearch(accountNo,this.ouId)
        .subscribe(
          data => {
            this.accountNoSearch = data.obj;  

            if(this.accountNoSearch===null)
            {
              this.custName=null;
              this.custSiteAddress=null;
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
        delete val.locId;
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
        delete val.emplId;
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


      SaveApplyReceipt() 
      {
        alert ("Posting data  to AR RECEIPT appl......")
        const formValue: IPaymentRcptAr =this.paymentArForm.value;

        var invLine= this.paymentArForm.get('invLine').value;

        console.log();
        // const formValue: IPaymentRcptAr =this.transeData1(this.paymentArForm.value);
        // debugger;
        this.service.ArReceipApplySubmit(invLine).subscribe((res: any) => {
          if (res.code === 200) {
            alert('RECORD INSERTED SUCCESSFUILY');
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

        // alert("Status :" +formValue.status);
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
        // alert("Reason id :"+mReasonId);
        if (mReasonId>0) { 
          this.reversalDate= this.pipe.transform(this.now, 'y-MM-dd');
          // glDate = this.pipe.transform(Date.now(), 'y-MM-dd');
          this.reversalCategory='Receipt Reversed'
          this.status='Reversed'
          // this.receiptStatus='Reversed'
          // this.emplId=26;
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
        // alert('applType =' +applType  );
        this.invLineArray().clear();

        this.applyTo=applType;

          // if (applType === 'INVOICE') {   
          //   // alert("checque seleected")   ;    
          //   this.applyTo=applType;
           
          //       }
              
          }



         

          CheckDataValidations(){

            const formValue: IPaymentRcptAr = this.paymentArForm.value;

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

    
                if(formValue.glDate===undefined || formValue.glDate===null ) 
                {
                    this.checkValidation=false;
                    alert ("GL DATE: Should not be null value");
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
            this.lstcomments=null;
          }
          
  
         

           
          
}
