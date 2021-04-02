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

interface IPaymentRcpt {
    deptId : number;
    divisionId:number;
    ouId :number;
    receiptNumber: number;
    // receiptDate :Date;
    cancelDate:Date;
    ouName:string;
    locId:number;
    emplId:number;
    locName : string
    orderNumber:number;
       receiptMethodName:string;
    customerId:number;
      customerName:string;
      methodType:string;
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
    paymentMethod : string;
    receiptNumber:number;
       receiptMethodName:string;
    receiptMethodId : number;
     orderNumber:number;
     emplId:number;
    // paymentCollection: string;

    
    // refNumber:number;
   
       
    pipe = new DatePipe('en-US');
    now = Date.now();
    // receiptDate = this.pipe.transform(this.now, 'dd-MM-y h:mm:ss');
    cancelDate =null;

    comment : string

    searchBy : string
    searchValue : string;
    // public searchValue=2111242154;
    // public  searchBy ="ORDER NUMBER"

    // searchByRcptNo  : string;
    // searchByOrderNo  : string;
    // searchByCustNo  : string;
    
    // public searchByRcptNo =2111202105;
    // public searchByOrderNo =2111202148;
    // public searchByCustNo =1212;
    searchByOrderNo:number;
    searchByCustNo:number;
    searchByRcptNo:number;
    cancelReason:string;
    loginName:string;
    loginArray:string;
    name:string;
    ouName : string;
    locId: number;
    locName : string;
    customerId:number;
      customerName:string;

    displayInactive = true;
    Status1: any;
    inactiveDate: Date;
    display = true;
    displayButton = true;
    showOrg=false;
    showReason=false;
    showBankDetails=false;

    
   

 

    
    get f() { return this.paymentReceiptForm.controls; }

    paymentReceipt(paymentReceiptForm:any) {  }

    constructor(private fb: FormBuilder, private location: Location,private service: MasterService,private router: Router,private orderManagementService:OrderManagementService)  
    { 

    this.paymentReceiptForm = fb.group({ 
      divisionId:[],
      division:[],
      ouId :[],
      deptId :[],
      paymentAmt:[],
      // receiptDate: [],
      receiptMethodId :[],
      // paymentCollection: [],
      searchValue :[],
      searchBy :[],
      comment: ['', [Validators.required]],
      cancelReason:[],
      cancelDate:[],
      receiptNumber:[],
      // payType:[],
      methodType:[],
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
      customerName:['']
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

   

    this.service.DivisionIDList()
    .subscribe(
      data => {
        this.DivisionIDList = data;
        console.log(this.DivisionIDList);
      }
    );


    // this.service.statusList()
    // .subscribe(
    //   data => {
    //     this.statusList = data;
    //     console.log(this.statusList);
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


   
  }




  onPayTypeSelected(payType : any  , rmStatus : any){
    // alert('paytype =' +payType  + " LocId :"+ this.locId + " Ou Id :"+this.ouId + " Deptid : "+ this.deptId + " Status :"+rmStatus);

      if (payType === 'CHECK') {   
        // alert("checque seleected")   ;    
          this.orderManagementService.ReceiptMethodList(payType ,this.locId,rmStatus)
          .subscribe(
            data => {
              this.ReceiptMethodList = data.obj;
              console.log(this.ReceiptMethodList);
              this.showBankDetails=true;
            }
          );
          } else{

            // alert("cash selected");
          this.orderManagementService.ReceiptMethodList(payType ,this.locId,rmStatus)
          .subscribe(
            data => {
              this.ReceiptMethodList = data.obj;
              console.log(this.ReceiptMethodList);
              this.showBankDetails=false;
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
        this.paymentReceiptForm.reset();
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

 



}

