import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators , FormArray } from '@angular/forms';
import { MasterService } from '../../master/master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InteractionModeRegistry } from 'chart.js';
// import { OrderManagementService } from 'src/app/order-management/order-management.service';


interface IRcptArApplication {
insuranceFlag : string;
srlNo: number;
refType :string;
referenceNo:string;

}

@Component({
  selector: 'app-receipt-ar-application',
  templateUrl: './receipt-ar-application.component.html',
  styleUrls: ['./receipt-ar-application.component.css']
})
export class ReceiptArApplicationComponent implements OnInit {
  receiptArApplicationForm : FormGroup;
  // public DivisionIDList : Array<string>=[];
  // public OUIdList: Array<string> = [];
  
  public DepartmentList: Array<string> = [];
  public statusList: Array<string> = [];
  public locIdList: Array<string> = [];
  public PaymentModeList : Array<string> = [];
  public ReceiptMethodList: Array<string> = [];
  public ReceiptStatusList: Array<string> = [];
  public ReverseReasonList: Array<string> = [];
  public ReceiptTypeArList: Array<string> = [];
  accountNoSearch:any;
  public receiptSearch:any;

  public invoiceDetails: any;

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


  receiptMethodId : number;
  // paymentCollection: string;
  receiptMethodName:string;
  
  orderNumber:string;
  referenceNo:string = null;
  
  accountNo:number;
  vehNo : string;
  custName:string;
  customerId : number; 
  // billToSiteId:number;
  custSiteAddress : string 
  mobileNo:string;
 
  
  pipe = new DatePipe('en-US');
  now = Date.now();
  receiptDate = this.pipe.transform(this.now, 'dd-MM-y h:mm:ss');
  glDate = this.pipe.transform(this.now, 'dd-MM-y h:mm:ss');
  cancelDate =null;
  receiptStatus : string;

  comments : string

  searchBy : string
  searchValue : string;
 
  public srlNo =1;

  // custAccountNo :number
  // receiptNumber:number;
  public custAccountNo=1212;
  public receiptNumber=1000012;
  public emplId =6;
  public billToSiteId=107;

  public searchByRcptNo =1000012;
  // public searchByOrderNo =2111202148;
  public searchByCustNo =1212;
  searchByDate :Date;
  ordNumber : number;
  cancelReason:string;

  applAmt:number;
  unApplAmt:number;
  onAccountAmt:number;
  applyrcptFlag:string;


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

  public applyTo ='INVOICE';

  lineDetailsGroupInvoice() {
    return this.fb.group({

      applType: ['', [Validators.required]],
      applFlag: ['', [Validators.required]],
      trxNumber : ['', [Validators.required]],
      trxDate : ['', [Validators.required]],
      invoiceAmount : ['', [Validators.required]],
      appliedAmt: ['', [Validators.required]],
      blanceAmt : ['', [Validators.required]],

    });
  }

    get f() { return this.receiptArApplicationForm.controls; }

    get lineDetailsArrayInvoice() {
      return <FormArray>this.receiptArApplicationForm.get('invoiceLines')
    }

    receiptArApplication(receiptArApplicationForm:any) {  }


  constructor(private service: MasterService, private fb: FormBuilder, private router: Router) { 
    this.receiptArApplicationForm = fb.group({ 

      divisionId:[],
      division:[],
      ouId :[],
      orgId:[],
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

      searchByRcptNo:[],
      searchByCustNo:[],
      searchByDate:[],

      orderNumber:[],
      referenceNo:[],
      custAccountNo :[],
      accountNo:[],
      vehNo:[],

      checkNo:[],
      checkDate: [],
      bankName : [],
      bankBranch : [],
      comments:[],

      srlNo:[],
      refType:[],
      custName:[],
      customerSite:[],
      mobileNo:[],
      searchBy:[],
      searchValue:[],
      billToSiteId:[],
      custSiteAddress:[],
      applyTo:[],

      applyrcptFlag: ['', [Validators.required]],
      savercptFlag: ['', [Validators.required]],

      invoiceLines: this.fb.array([this.lineDetailsGroupInvoice()])

    });
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

      onPayTypeSelected(payType : any  , rmStatus : any){
        // alert('paytype =' +payType  + " LocId :"+ this.locId + " Ou Id :"+this.ouId + " Deptid : "+ this.deptId + " Status :"+rmStatus);
    
          if (payType === 'CASH') {   
            // alert("checque seleected")   ;    
              this.service.ReceiptMethodList(payType ,this.locId,rmStatus)
              .subscribe(
                data => {
                  this.ReceiptMethodList = data.obj;
                  console.log(this.ReceiptMethodList);
                  this.showBankDetails=false;
                }
              );
              } else{
    
                // alert("cash selected");
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
    
      resetMast() {
        window.location.reload();
      }
    
      closeMast() {
        this.router.navigate(['admin']);
      }

      SearchByRcptNo1(rcptNo : any , custActNo: any, rcptdate : any) {
        alert("SearchByRcptNo-Receipt No : "+ rcptNo+","+custActNo +","+ rcptdate );
        this.service.getArReceiptSearchByRcptNo(rcptNo ,custActNo,rcptdate)
        .subscribe(
        data => {
          this.lstcomments = data.obj;
          console.log(this.lstcomments);
         }
        );
      }
    
    SearchByRcptNo(rcptNo : any , custActNo: any, rcptdate : any) {
      alert("SearchByRcptNo-Receipt No : "+ rcptNo+","+custActNo +","+ rcptdate );
      this.service.getArReceiptSearchByRcptNo(rcptNo ,custActNo,rcptdate)
      .subscribe(
      data => {
        this.lstcomments = data.obj;
        console.log(this.lstcomments);
        
          // this.receiptArApplicationForm.patchValue(data.obj);

    //       this.receiptArApplicationForm.patchValue({
    //       receiptNumber: this.receiptSearch.receiptNumber,
    //       receiptDate: this.receiptSearch.receiptDate,
    //       paymentAmt :this.receiptSearch.paymentAmt,
    //  });
          // alert(this.receiptNumber);
       }
      );
    }

      Select (receiptNumber: any) {
        // alert ("Invoice Number,Receipt Number : " +receiptNumber +" ,"+trxNumber);

        let select = this.lstcomments.find(d => d.receiptNumber === receiptNumber);
        if (select) {
               
          this.receiptArApplicationForm.patchValue(select);
          this.receiptNumber = select.receiptNumber;
          this.displayButton = false;
          this.display = false;
          
        }
      }


      applyReceiptFlag(e) {
        if (e.target.checked) {
           this.applyrcptFlag = 'Y'
          //  alert("flag selected Y")
        }else 
        {
          this.applyrcptFlag = 'N'
          //  alert("flag selected N")
        }

      }

      ApplyRcpt(trxNumber:any,  receiptNumber: any) {

        if(this.applyrcptFlag==='Y'){
        alert ("Invoice Number,Receipt Number : " +trxNumber   +" ,"+receiptNumber);
         }
         else 
         {
         alert("APPLY flag not selected");
         }
        // let select = this.lstcomments.find(d => d.receiptNumber === receiptNumber);
        // if (select) {
               
        //   this.paymentArForm.patchValue(select);
        //   this.receiptNumber = select.receiptNumber;
        //   this.displayButton = false;
        //   this.display = false;
          
        // }
      }
    

      SearchInvoices(custActNo : any,billToSiteId : any,rcptNo : any) {
        // alert("Receipt No : "+ rcptNo );
        this.service.getArReceiptSearchByInvoiceNo(custActNo,billToSiteId,rcptNo)
        .subscribe(
        data => {
          this.lstinvoices = data.obj;
          console.log(this.lstinvoices);
         }
        );
      }

      loadInvoiceDetails(custActNo : any,billToSiteId : any ,rcptNo : any){

        // var taxTypeCode = this.receiptArApplicationForm.get('taxTypeCode').value;
        // alert('taxtypecode='+taxTypeCode);

        
        alert(custActNo+","+billToSiteId);
        this.service.getArReceiptSearchByInvoiceNo(custActNo,billToSiteId,rcptNo)
        .subscribe(
          data => {
            this.invoiceDetails = data;
            console.log(this.invoiceDetails);
            let cont=this.receiptArApplicationForm.get('invoiceLines') as FormArray;
            var invoiceLines:FormGroup=this.lineDetailsGroupInvoice();
            var length1=this.invoiceDetails.length-1;

            alert(length1);
            this.lineDetailsArrayInvoice.removeAt(length1);
            cont.push(invoiceLines);
            this.receiptArApplicationForm.get('invoiceLines').patchValue(this.invoiceDetails);
            
          }
        );

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
        alert("Searchparam :" +searchBy +","+searchValue);
        // this.service.custAccountNoSearch(searchValue,this.ouId)
        this.service.insSiteList(searchValue)
        .subscribe(
        data => {
          this.lstCustomer = data;
          console.log(this.lstCustomer);
         }
        );
        alert(this.lstCustomer);
      }

      ReceiptNoSearch(rcptNo){
        alert('Receipt no entered for search   '+rcptNo);
        if(rcptNo<=0)
         {
           this.receiptDate=null;
           this.paymentAmt=null;
         }else {
 
          this.service.getArReceiptSearchByRcptNo(rcptNo, '', undefined)
         .subscribe(
           data => {
             this.receiptSearch = data.obj;  
            
             if(this.receiptSearch===null)
             {
              this.receiptDate=null;
              this.paymentAmt=null;
              alert("null")
             }
             else 
             {
                  console.log(this.receiptSearch);
                  // this.receiptArApplicationForm.patchValue({
                  // receiptDate: this.receiptSearch.receiptDate,
                  // paymentAmt: this.receiptSearch.paymentAmt,
                  // custName:this.receiptSearch.custName,
                  // custAccountNo:this.receiptSearch.custAccountNo,
                  // payType:this.receiptSearch.payType,
                // });

                  this.receiptArApplicationForm.patchValue(this.receiptSearch.receiptDate);
                  this.receiptArApplicationForm.patchValue(this.receiptSearch.paymentAmt);
                  this.receiptArApplicationForm.patchValue(this.receiptSearch.custName);
                  this.receiptArApplicationForm.patchValue(this.receiptSearch.custAccountNo);
                  this.receiptArApplicationForm.patchValue(this.receiptSearch.payType);

                  this.receiptDate=this.receiptSearch.receiptDate;
                  this.paymentAmt=this.receiptSearch.paymentAmt;
                  this.custName=this.receiptSearch.custName;
                  this.custAccountNo=this.receiptSearch.custAccountNo;
                  this.payType=this.receiptSearch.payType;
        
           }
            alert(this.receiptSearch.paymentAmt);
           }
         );
         }
       }


      CustAccountNoSearch(accountNo){
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
                 this.receiptArApplicationForm.patchValue({
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

        return val;
      }


      CheckDataValidations(){
        const formValue: IRcptArApplication = this.receiptArApplicationForm.value;
        alert('refType ='+formValue.refType+' '+'referenceNo='+formValue.referenceNo);  // refType undefined null referenceNo
       
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



      newMast() {
        alert ("Posting data  to AR RECEIPT APPLICATION ....WIP......")
       

     
        // const formValue: IRcptArApplication =this.transeData(this.receiptArApplicationForm.value);
    
        // this.service.ArReceiptSubmit(formValue).subscribe((res: any) => {
        //   if (res.code === 200) {
        //     alert('RECORD INSERTED SUCCESSFUILY');
        //     this.receiptArApplicationForm.reset();
        //   } else {
        //     if (res.code === 400) {
        //       alert('Code already present in the data base');
        //       this.receiptArApplicationForm.reset();
        //     }
        //   }
        // });
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
      
      

}
