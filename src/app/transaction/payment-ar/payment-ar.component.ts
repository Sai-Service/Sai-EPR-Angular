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
receiptStatus:number;

payType:string;
receiptMethodId:number;
paymentAmt:number;
bankName:string;
bankBranch:string;
checkNo:string;
checkDate:string;

}

@Component({
  selector: 'app-payment-ar',
  templateUrl: './payment-ar.component.html',
  styleUrls: ['./payment-ar.component.css']
})
export class PaymentArComponent implements OnInit {
  paymentArForm : FormGroup;
  applyRcptFlag1 :boolean

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

  userList1: any[] = [];
  lastkeydown1: number = 0;

  lstcomments: any[];
  lstinvoices: any[];
  lstCustomer: any[];
  ouId :number;
  deptId:number; 

  checkNo : string;
  checkDate: Date;
  bankName : string;
  bankBranch : string;
  paymentAmt : number;
  
  payType : string;
  rmStatus :string
  paymentMethod : string;
  receiptAmount:number;

  receiptMethodId : number;
  // paymentCollection: string;
  receiptMethodName:string;
  receiptNumber:number;
  orderNumber:string;
  referenceNo:string = null;
  custAccountNo :number;
  // customerId:number=8
  // custId:number;
  accountNo:number;
  vehRegNo : string;
  attribute1:string;
  custName:string;
 
  // billToSiteId:number;
  custAddr:string;
  custSiteAddress : string 
  mobileNo:string;
  
  glDate:Date;
  pipe = new DatePipe('en-US');
  now = Date.now();
  receiptDate = this.pipe.transform(this.now, 'dd-MM-y h:mm:ss');
  // glDate = this.pipe.transform(this.now, 'dd-MM-y h:mm:ss');
  trxdate= this.pipe.transform(this.now, 'dd-MM-y');
  reversalDate= this.pipe.transform(this.now, 'dd-MM-y');
  
  reversalComment: string;
  reversalReasonCode:string;
  // reversalDate:string;
  reversalCategory:string;

  cancelDate =null;
  receiptStatus : string;

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

  public emplId =6;
  customerId:number;
  public billToSiteId=101;
  // public billToSiteId=107; 
  customerSiteId:number;
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
      emplId:[''],
      
      receiptNumber:[],
      receiptDate: [],
      glDate:[],
      paymentAmt:[],
      payType:[],
      receiptMethodId :[],
      receiptMethodName: [],
      receiptStatus:[],
      insuranceFlag:[],
      receiptAmount:[],

      searchByRcptNo:[],
      searchByCustNo:[],
      searchByDate:[],

      orderNumber:[],
      referenceNo:[],
      custAccountNo :[],
      customerId:[],
      custAddr:[],
      accountNo:[],
      vehRegNo:[],
      attribute1:[],

      checkNo:[],
      checkDate: [],
      bankName : [],
      bankBranch : [],
      comments:[],

      srlNo:[],
      refType:[],
      custName:[],
      customerSite:[],
      customerSiteId:[],
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
          // this.emplId= Number(sessionStorage.getItem('emplId'));
         
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
         alert("customer Id:"+this.customerId);
         this.enableCustAccount =false;
         this.GetCustomerDetails(this.customerId);
         
       
       } );
      }

      GetCustomerDetails(mCustId :any){
        // alert("Customer Id: "+mCustId);
      this.service.ewInsSiteList(mCustId)
      .subscribe(
        data1 => {
          this.CustomerDetailsList = data1;
          console.log(this.CustomerDetailsList);
          this.paymentArForm.patchValue({
            custAccountNo:this.CustomerDetailsList.custAccountNo,
            // custName: this.CustomerDetailsList.custName,

        });
        this.CustAccountNoSearch(this.custAccountNo)
        }
      );  
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
       
    


      SearchByRcptNo(rcptNo : any , custActNo: any, rcptdate : any) {
        // alert("SearchByRcptNo-Receipt No : "+ rcptNo+","+custActNo +","+ rcptdate );
        this.service.getArReceiptSearchByRcptNo(rcptNo ,custActNo,rcptdate)
        .subscribe(
        data => {
          this.lstcomments = data.obj;
          console.log(this.lstcomments);
         }
        );
      }

      Select (receiptNumber: any) {
        // alert ("Invoice Number,Receipt Number : " +receiptNumber +" ,"+trxNumber);
        this.searchByRcptNo=receiptNumber;
        let select = this.lstcomments.find(d => d.receiptNumber === receiptNumber);
        if (select) {
               
          this.paymentArForm.patchValue(select);
          this.receiptNumber = select.receiptNumber;
          this.custSiteAddress = select.custAddress;
          this.displayButton = false;
          this.display = false;
          
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
                      patch.controls[index].patchValue({applAmt:lineBalDueAmt})
                      LineApplAmount = invLineArr[index].applAmt;
                      invBalAmt =0;
                      patch.controls[index].patchValue({balDueAmt:invBalAmt})
                    }
                  else 
                  {
                      var appAmt =0
                      appAmt =Number(totUnAppAmt.toFixed(2));
                      patch.controls[index].patchValue({applAmt:appAmt})
                      LineApplAmount = invLineArr[index].applAmt;
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
                  LineApplAmount=invLineArr[index].applAmt;
                  invBalAmt =invLineArr[index].balDueAmt;
                  patch.controls[index].patchValue({balDueAmt:lineBalDueAmt})
                  patch.controls[index].patchValue({applAmt:0})
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
            totAppAmt=totAppAmt+Number(invLineArr[i].applAmt);
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
            var lineApplAmt= invLineArr[index].applAmt;
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
                patch.controls[index].patchValue({applAmt:''})
                patch.controls[index].patchValue({applyrcptFlag:''})

              } 
              else 
              {
                  // var xtotApplAmt =this.totApplAmt;
                  // var xtotUnAppAmt =this.totUnApplAmt;
                  // var newApplAmt =invLineArr[index].applAmt;
          

                  LineinvAmt=invLineArr[index].invoiceAmount;
                  LineApplAmount=invLineArr[index].applAmt;
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
               totAppAmt=totAppAmt+Number(invLineArr[i].applAmt);
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
        // alert(custActNo+','+billToSiteId+','+applyTp);
         this.invLineArray().reset();

          // this.paymentArForm.get("totUnApplAmt").reset();
          // this.paymentArForm.get("onAccountAmt").reset();
          // this.paymentArForm.get("totApplAmt").reset();
      
         if(applyTp==='INVOICE') {

          // alert("INVOICE selected");

              this.totUnAppliedtAmount=this.paymentAmt;
              this.totAppliedtAmount =0;

              this.service.getArReceiptSearchByInvoiceNo(custActNo,billToSiteId,rcptNo)
              .subscribe(
              data => {
                // this.lstinvoices = data.obj;
                this.lstinvoices = data.obj.invLine;
                console.log(this.lstinvoices);
                    var len=this.invLineArray().length;
                    // alert(len);
                   

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
                  
                    // alert("INVOICE selected......"); 
                    
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
            this.accountNoSearch = data;  
           
            if(this.accountNoSearch===null)
            {
              this.custName=null;
              this.custSiteAddress=null;
            }
            else 
            {
                 console.log(this.accountNoSearch);
                 this.paymentArForm.patchValue({
                 custName: this.accountNoSearch.custName,
                 custSiteAddress: this.accountNoSearch.billToAddress,
                 billToSiteId :this.accountNoSearch.billToLocId,
            });
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
        delete val.receiptStatus;
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
       

        // const formValue: IPaymentRcpt =this.paymentReceiptForm.value;
        const formValue: IPaymentRcptAr =this.transeData1(this.paymentArForm.value);
        // debugger;
        this.service.ArReceipApplySubmit(formValue).subscribe((res: any) => {
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
            // this.paymentArForm.reset();
          } else {
            if (res.code === 400) {
              alert('Error While Saving Record:-'+res.obj);
              // this.paymentArForm.reset();
            }
          }
        });
      }else{ alert("Data Validation Not Sucessfull....\nPosting Not Done...")  }

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


          reverseReceipt(){ 
            this.showReason=true;
            
            alert("Cancel Receipt........wip");
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

                 if (formValue.receiptStatus===undefined || formValue.receiptStatus===null)
                 {
                    this.checkValidation=false; 
                    alert ("RECEIPT STATUS: Should not be null....");
                     return;
                  } 
              this.checkValidation=true

          }

           
          
}
