import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators , FormArray } from '@angular/forms';
// import { MasterService } from '../master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InteractionModeRegistry } from 'chart.js';
import { from } from 'rxjs';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { MasterService } from 'src/app/master/master.service';
import { Location } from "@angular/common";
import { ActivatedRoute, ParamMap } from '@angular/router';


interface IPaymentRcpt {
    deptId : number;
    customerId: number;
    orderNumber:number;
    ayType:string;
    receiptMethodId:number;
    paymentAmt:number;
    bankName:string;
    bankBranch:string;
    checkNo:string;
    checkDate:string;

   
  }


@Component({
    selector: 'app-payment-receipt',
    templateUrl: './payment-receipt.component.html',
    styleUrls: ['./payment-receipt.component.css']
  })
export class PaymentReceiptComponent implements OnInit  {
  paymentReceiptForm : FormGroup;

    public DivisionIDList : Array<string>=[];
    public OUIdList: Array<string> = [];
    public DepartmentList: Array<string> = [];
    public statusList: Array<string> = [];
    public locIdList: Array<string> = [];
    public PaymentModeList : Array<string> = [];
    public ReceiptMethodList: Array<string> = [];
    public ReverseReasonList: Array<string> = [];
    lstcomments: any[];
  
    ouId :number;  
    deptId:number; 
    checkNo : string;
    checkDate: Date;
    bankName : string;
    bankBranch : string;
    paymentAmt : number;
    methodType:string;
    // payType : string; 
    rmStatus :string
    payType:string;
    // paymentMethod : string;
    receiptNumber:number;
       receiptMethodName:string;
    receiptMethodId : number;
     orderNumber:number;
     emplId:number;
     custName:string;
     customerId:number;
    // paymentCollection: string;

    
    // refNumber:number;
   
       
    pipe = new DatePipe('en-US');
    now = Date.now();
    receiptDate = this.pipe.transform(this.now, 'dd-MM-y h:mm:ss');
    cancelDate =null;

    comment : string

    searchBy : string
    searchValue : string;
    // public searchValue=2111242154;
    // public  searchBy ="ORDER NUMBER"

    // searchByRcptNo  : string;
    // searchByOrderNo  : string;
    // searchByCustNo  : string;
    
    public searchByRcptNo =2111202105;
    public searchByOrderNo =2111202148;
    public searchByCustNo =1212;

    // searchByOrderNo:number;
    // searchByCustNo:number;
    // searchByRcptNo:number;

    cancelReason:string;
    loginName:string;
    loginArray:string;
    name:string;
    ouName : string;
    locId: number;
    locName : string;
      customerName:string;

    displayInactive = true;
    Status1: any;
    inactiveDate: Date;
    display = true;
    displayButton = true;
    showOrg=false;
    showReason=false;
    showBankDetails=false;
    private sub: any;
    
   

 

    
    get f() { return this.paymentReceiptForm.controls; }

    paymentReceipt(paymentReceiptForm:any) {  }

    constructor(private fb: FormBuilder, private location: Location,private service: MasterService,private router: Router,private orderManagementService:OrderManagementService,private router1: ActivatedRoute)  
    { 

    this.paymentReceiptForm = fb.group({ 
      divisionId:[],
      division:[],
      ouId :[],
      deptId :[],
      paymentAmt:[],
      receiptDate: [],
      receiptMethodId :[],
      // paymentCollection: [],
      searchValue :[],
      searchBy :[],
      comment: ['', [Validators.required]],
      cancelReason:[],
      cancelDate:[],
      receiptNumber:[],
      payType:[],
      // methodType:[],
      bankName :[],
      bankBranch :[],
      checkNo :[],
      checkDate:[],
      searchByRcptNo  : [],
      searchByOrderNo  : [],
      searchByCustNo  : [],
      loginArray:[''],
      loginName:[''],
      ouName :[''],
      locId:[''],
      locName :[''],
      emplId:[''],
         // refNumber:[''],
      orderNumber:[''],
      receiptMethodName:[''],
      customerId:[''],
      // customerName:['']
      custName:[''],
    });


   }

  ngOnInit(): void {
    this.name=  sessionStorage.getItem('name');
    this.loginArray=sessionStorage.getItem('divisionName');
    this.loginName=sessionStorage.getItem('name')
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId=Number(sessionStorage.getItem('ouId'));
    this.locId=Number(sessionStorage.getItem('locId'));
    this.deptId=Number(sessionStorage.getItem('dept'))
    // this.locName=(sessionStorage.getItem('locName'));

    this.emplId= Number(sessionStorage.getItem('emplId'));

    console.log(this.loginArray);
    console.log(this.locId);
    console.log(this.emplId);


      this.service.OUIdList()
    .subscribe(
      data => {
        this.OUIdList = data;
        console.log(this.OUIdList);
      }
    );

    this.service.getLocationSearch()
    .subscribe(
      data => {
        this.locIdList = data;
        console.log(this.locIdList);
      }
    );

   

    // this.service.DivisionIDList()
    // .subscribe(
    //   data => {
    //     this.DivisionIDList = data;
    //     console.log(this.DivisionIDList);
    //   }
    // );


        
    this.service.DepartmentList()
    .subscribe(
      data => {
        this.DepartmentList = data;
        console.log(this.DepartmentList);
        // this.displayButton=true;
      }
    );


    this.orderManagementService.PaymentModeList()
    .subscribe(
      data => {
        this.PaymentModeList = data;
        console.log(this.PaymentModeList);
      }
    );

    this.service.ReverseReasonList()
    .subscribe(
      data => {
        this.ReverseReasonList = data;
        console.log(this.ReverseReasonList);
      }
    );

    this.sub = this.router1.params.subscribe(params => {
      this.orderNumber = params['orderNumber'];
      // alert(this.orderNumber);
      this.orderManagementService.getOmReceiptSearchByOrdNo(this.orderNumber)
      .subscribe(
      data => {
        this.lstcomments = data.obj.oePayList;
        this.custName=data.obj.custName;
        this.customerId=data.obj.customerId;
        // this.lstcomments = data.obj;
        // this.lstcomments = data;
        console.log(this.lstcomments);
       }
       
      );
      // this.paymentReceiptForm.patchValue( this.lstcomments );
      });

   
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

  searchMastNew(rcptNo : any,ordNo: any,custNo: any) {
    alert("Receipt No : "+ rcptNo + " Order no :"+ordNo + " Cust Ac No :" + custNo);
    this.orderManagementService.getOmReceiptSearchBy(rcptNo,ordNo,custNo)
    .subscribe(
    data => {
      this.lstcomments = data.obj;
      console.log(this.lstcomments);
     }
    );
  }


  searchMast(refNumber : any , searchBy : any)
  {
      alert("Search Value: " +refNumber + "  Search Type : "+ searchBy);
      
      if (searchBy === 'ORDER NUMBER') {
        this.orderManagementService.getOmReceiptSearchByOrdNo(refNumber)
        .subscribe(
        data => {
          this.lstcomments = data.obj.oePayList;
          console.log(this.lstcomments);
         }
        );
      }

      if (searchBy === 'RECEIPT NUMBER') {
        this.orderManagementService.getOmReceiptSearchByRcptNo(refNumber)
        .subscribe(
        data => {
          this.lstcomments = data.obj.oePayList;
          console.log(this.lstcomments);
         }
        );
      }

      if (searchBy === 'CUSTOMER NUMBER') {
        this.orderManagementService.getOmReceiptSearchByCustAcNo(refNumber)
        .subscribe(
        data => {
          this.lstcomments = data.obj.oePayList;
          console.log(this.lstcomments);
         }
        );
      }

  }


  Select(receiptNumber: number) {
    // alert ("receipt Number :" +receiptNumber);
    
    let select = this.lstcomments.find(d => d.receiptNumber === receiptNumber);
    if (select) {
           
      this.paymentReceiptForm.patchValue(select);
      this.receiptNumber = select.receiptNumber;
      this.displayButton = false;
      this.display = false;
      
    }
  }

  transeData(val) {
    delete val.searchValue;
    delete val.searchBy;
    delete val.division;
    delete val.divisionId;
    // delete val.locId;
    delete val.ouId;
    // delete val.paymentCollection;
    delete val.cancelReason;
    delete val.cancelDate;
    // delete val.emplId;
    delete val.locName;
    delete val.loginArray;
    delete val.loginName;
    delete val.ouName;

    delete val.searchByCustNo;
    delete val.searchByOrderNo;
    delete val.searchByRcptNo;


    return val;
  }

  newMast() {
    // alert ("Posting data  to PL mater......")
    // const formValue: IPaymentRcpt =this.paymentReceiptForm.value;
    const formValue: IPaymentRcpt =this.transeData(this.paymentReceiptForm.value);
    // debugger;
    this.orderManagementService.OrderReceiptSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        // this.paymentReceiptForm.reset();
        this.paymentReceiptForm.disable();
      } else {
        if (res.code === 400) {
          alert('Code already present in the data base');
          this.paymentReceiptForm.reset();
        }
      }
    });
  }

  updateMast(){}
  
  resetMast() {
    window.location.reload();
  }

  closeMast() {
    // this.router.navigate(['admin']);
    this.location.back();
  }

  reverseReceipt(){

    
    this.cancelDate=this.pipe.transform(this.now, 'dd-MM-y h:mm:ss');
    this.showReason=true;
    
  }


  // ------------------------Validatiopns------------------------------------

  // CheckDataValidations(){

  //   const formValue: IPaymentRcpt = this.paymentReceiptForm.value;

  //   if (formValue.ouId===undefined || formValue.ouId===null)
  //   {
  //      this.checkValidation=false; 
  //      alert ("OPERATING UNIT: Should not be null....");
  //       return;
  //    } 

  //   if (formValue.ouId===undefined || formValue.ouId===null)
  //   {
  //      this.checkValidation=false; 
  //      alert ("LOCATION: Should not be null....");
  //       return;
  //    } 

  //    if (formValue.ouId===undefined || formValue.ouId===null)
  //   {
  //      this.checkValidation=false; 
  //      alert ("DEPT: Should not be null....");
  //       return;
  //    } 


  //    if (formValue.custAccountNo===undefined || formValue.custAccountNo===null)
  //    {
  //       this.checkValidation=false; 
  //       alert ("CUST NO : Should not be null....");
  //        return;
  //     } 


  //     if (formValue.billToSiteId===undefined || formValue.billToSiteId===null)
  //     {
  //         this.checkValidation=false; 
  //         alert ("BILL TO SITE : Should not be null....");
  //         return;
  //       } 


  //       if(formValue.glDate===undefined || formValue.glDate===null ) 
  //       {
  //           this.checkValidation=false;
  //           alert ("GL DATE: Should not be null value");
  //           return; 
  //        }

  //       if (formValue.paymentAmt <=0 || formValue.paymentAmt===undefined || formValue.paymentAmt===null )
  //       {
  //           this.checkValidation=false;  
  //           alert ("RECEIPT AMT: Should be above Zero");
  //           return;
  //       } 

  //     if (formValue.refType===undefined || formValue.refType===null)
  //     {
  //         this.checkValidation=false; 
  //         alert ("REF TYPE: Should not be null....");
  //         return;
  //       } 

  //     if(formValue.refType !='Advance' && (formValue.referenceNo==null || formValue.referenceNo.trim()=='' ))
  //     {
  //       alert("REFERENCE NO\nRef.number to be entered for Non-Advance Receipts");
  //       return;
  //     }

  //     if (formValue.payType===undefined || formValue.payType===null)
  //     {
  //        this.checkValidation=false;   
  //        alert ("PAY MODE: Please Select payment Type....");
  //         return;
  //      } 

  //      if (formValue.receiptMethodId===undefined || formValue.receiptMethodId===null)
  //      {
  //        this.checkValidation=false;  
  //        alert ("PAY METHOD: Please Select Receipt Method....");
         
  //        return;
  //       } 

  //       if (formValue.payType !==null) {
  //         if (formValue.payType != 'CASH') {

  //          if (formValue.bankName===undefined || formValue.bankName===null)
  //          {
  //              this.checkValidation=false;  
  //              alert ("BANK : Please Enter Bank Name....");
  //              return;
  //           } 

  //           if (formValue.bankBranch===undefined || formValue.bankBranch===null)
  //           {
  //               this.checkValidation=false;  
  //               alert ("BANK BRANCH : Please Enter Bank Branch....");
  //               return;
  //            } 

  //            if (formValue.checkNo===undefined || formValue.checkNo===null)
  //            {
  //                this.checkValidation=false;  
  //                alert ("CHECK/DD/CRD/NEFT NO: Please Enter Cheq/dd no...");
  //                return;
  //             } 

  //             if (formValue.checkDate===undefined || formValue.checkDate===null)
  //             {
  //                 this.checkValidation=false;  
  //                 alert ("CHECK/DD/CRD/NEF DATE: Please Select Chq/dd.. Date....");
  //                 return;
  //              } 
  //         }
         
  //        }

  //        if (formValue.receiptStatus===undefined || formValue.receiptStatus===null)
  //        {
  //           this.checkValidation=false; 
  //           alert ("RECEIPT STATUS: Should not be null....");
  //            return;
  //         } 
  //     this.checkValidation=true

  // }




}

