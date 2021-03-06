import { Component, OnInit,HostListener ,ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from 'src/app/master/master.service';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { data } from 'jquery';
import { DatePipe } from '@angular/common';
import { Location } from "@angular/common";
import { escapeRegExp } from '@angular/compiler/src/util';
import { saveAs } from 'file-saver';


const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};


interface ISalesBookingForm {
emplId:number;
headerId: number;
ouId: number;
orderTypeId: string;
transactionTypeName: string;
createOrderType: string;
 custPoNumber: number;
// orderedDate: Date;
priceListId: number;
priceListName: string;
paymentTermId: number;
payTermDesc: string;
locationId: number;
billToLocId: number;
shipToLocId: number;
billLocName: string;
shipLocName: string;
locCode: string;
customerId: number,
custType: string;
custAccountNo: number;
custName: string;
custAddress: string;
 salesRepName: string;
flowStatusCode: string;
tlName: string;
remarks: string;
subtotal: number;
totTax: number;
totAmt: number;
othRefNo: number;
orderNumber:number;
itemId:number;
taxCategoryId:number;
mobile1:number;
paymentType:string;
issuedBy:string;
}

interface CustomerCreationInterface {
  ouName:string;
  loginArray:string;
  custType:string;
  classCodeType:string;
  custAccountNo:number;
  title:string;
  fName:string;
  mName:string;
  lName:string;
  custName:string;
  customerId1: number;
  address1:string;
  address2:string;
  cmnTypeId:number;
  address3:string;
  address4:string;
  city:string;
  pinCd:number;
  state:string;
  mobile1:number;
  mobile2:number;
  mobile3:number;
  emailId:string;
  emailId1:string;
  contactPerson:string;
  contactNo:number;
  birthDate:Date;
  weddingDate:Date;
  startDate:Date;
  gstNo:string;
  panNo:string;
  tanNo:string;
  location:string;
}





@Component({
  selector: 'app-counter-sale',
  templateUrl: './counter-sale.component.html',
  styleUrls: ['./counter-sale.component.css'],

  template: `
  <pdf-viewer [src]="pdfSrc"
              [render-text]="true"
              style="display: block;"
  ></pdf-viewer>
  `
})
export class CounterSaleComponent implements OnInit {
  CounterSaleOrderBookingForm: FormGroup;
  
  // Customer Form
  locData =[ {
    "locatorId": 999,
    "segmentName": "D.U.01.D.01",
    "id": 7,
    "onHandQty": 40
  }];
  deptName:string;
  resveQty:number;
  resrveqty: any;
  loginArray:string;
  frmLocatorName:string;
  userList2: any[] = [];
  lastkeydown1: number = 0;
  public ItemIdList:any= [];
  subInventoryId:number;
  public subInvCode: any;
  onhand1: any;
  Avalqty:number;

  displayPerson: boolean;
  public minDate = new Date();
  public cityList: Array<string>[];
  public status = "Active";
  public titleList: Array<string>[];
  displayOrgnization: boolean;
  PersonType: any;
  classCodeType:string;
  public cityList1: any;
  location:string;



  trxNumber:number;
  orderStatus:string;
  public currentCS: string;
  customerNameSearch:any[];
  public op:string;
  // divisionName: string;
  submitted = false;
  poLineTax: number;
  hsnSacCode:string;
  displayorderHedaerDetails=true;
  displaypickTicketUpdate=true;
  displaysegmentInvType:Array<boolean>=[];
  displayRemoveRow:Array<boolean>=[];
  displayLineflowStatusCode:Array<boolean>=[];
  // displaysegmentInvType=true;
  displaycounterSaleAllButtons=true;
  displaypickTicketInvoice=true;
  displaycreateOrderType=true;
  selectedLine = 0;
  categoryList: any[];
  orderedDate = new Date();
  diss: number ;
  InvoiceNumber:number;
  locId:number;
  contactNoSearchData:any;
  othRefNoSearchFnData:any;
  taxCat1: number;
  cntLineTax:number;
  invType:string;
  mobile1:number;
  segment:string;
  dept:number;
  baseAmt:number;
  issuedBy:string;
  orderedItem: string;
  emplId:number;
  taxCategoryId:number;
headerId: number;
ouId: number;
orderTypeId: string;
transactionTypeName: string;
createOrderType: string;
 custPoNumber: number;
// orderedDate: Date;
priceListId: number;
priceListName: string;
paymentTermId: number;
payTermDesc: string;
locationId: number;
billToLocId: number;
shipToLocId: number;
billLocName: string;
shipLocName: string;
locCode: string;
customerId: number;
custType: string;
custAccountNo: number;
custName: string;
custAddress: string;
 salesRepName: string;
flowStatusCode: string;
tlName: string;
remarks: string;
subtotal: number;
totTax: number;
totAmt: number;
othRefNo: number;
itemId:number;
indexVal:number;
orderNumber:number;
  adhocDiscount: number;
  adhocConsu: number;
  additionalDisc: number;
  adhocExchBonus: number;
  adhocFinanceOffer: number;
  billToAddress:string;
  adhocISL: number;
  state:string;
  paymentType:string;
  // transactionTypeName:string;
  deptId:number;
  // createOrderType:string;
  ticketNo:string;
  // locId:number;
  panNo:string;
  SelectCustType:string;
  ouName:string;
  gstNo:string;
  taxCategoryName:string;
  public taxCategoryList: any[];
  lstgetOrderLineDetails: any[];
  lstgetOrderTaxDetails: any[];
  newCustomerButton=true;
  PaymentButton=true;
  displaysegment=true;
  lstInvLineDeatails1: any[];
  createOrderTypeList:any;
  allDatastore:any;
  displayorderLineDetailsPart = true;
  public payTermDescList: any;
  public orderTypeList:any;
  public ticketNoSearch: any;
  public taxCalforItem:any;
  public salesRepNameList: any;
  public priceListNameList: any;
  invItemList1: any[];
  public addonDescList: any[];
  displaycustAccountNo=true;
  displaycounterSaleOrderSave=true;
  displayaddRow=true;
  // displayRemoveRow=true;
  displaysalesRepName=true;
  // displaytaxCategoryName=true;
  displaycreateCustomer=true;
  displayCounterSaleLine: Array<boolean> = [];

  // @ViewChild("myinput") myInputField: ElementRef;
  // @ViewChild("suppCode1") suppCode1: ElementRef;

  // ngAfterViewInit() {
  //   // this.myInputField.nativeElement.focus();
  // }


// customer Master
// custType: string;
  // customerId:number;




  title: string;
  customerId1: number;
  fName: string;
  mName: string;
  lName: string;
  // custName: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  city: string;
  pinCd: number;
  // state: string;
  // mobile1: number;
  mobile2: number;
  mobile3: number;
  emailId: string;
  emailId1: string;
  contactPerson: string;
  contactNo: number;
  birthDate: Date;
  weddingDate: Date;
  startDate: Date;
  endDate: Date;
  // gstNo: string;
  // panNo: string;
  tanNo: string;
  divisionName: string;

  public itemMap=new Map <string,any[]>();

  @ViewChild("myinput") myInputField: ElementRef;
  @ViewChild("othRefNo") othRefNo1: ElementRef;
  ngAfterViewInit() {
    // this.myInputField.nativeElement.focus();
  }


  constructor(private fb: FormBuilder, private location1: Location, private router: Router, private service: MasterService, private orderManagementService: OrderManagementService, private transactionService: TransactionService) {
    this.CounterSaleOrderBookingForm = fb.group({
      emplId:[''],
      InvoiceNumber:[''],
      trxNumber:[''],
      headerId: [''],
      orderStatus:[''],
      ouId: [''],
      issuedBy:[''],
      orderTypeId: [''],
      transactionTypeName: [''],
      createOrderType: [''],
       custPoNumber: [''],
      orderedDate: [''],
      priceListId: [''],
      priceListName: [''],
      paymentTermId: [''],
      payTermDesc: [''],
      locationId: [''],
      billToLocId: [''],
      locId:[''],
      mobile1:['', [Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]*')]],
      paymentType:[''],
      shipToLocId: [''],
      billLocName: [''],
      shipLocName: [''],
      locCode: [''],
      customerId: [''],
      custType: [''],
      custAccountNo: [''],
      custName: [''],
      custAddress: [''],
       salesRepName: [''],
      flowStatusCode:[''],
      tlName: [''],
      remarks: [''],
      subtotal: [''],
      totTax: [''],
      totAmt: [''],
      othRefNo: [''],
      orderNumber:[''],
      state:[''],
      gstNo:['',[Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{2}$"),Validators.minLength(15), Validators.maxLength(15)]],
      panNo:['', [Validators.required, Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]{1}$"), Validators.minLength(10),Validators.maxLength(10)]],
      // orderType:[''],
      // createOrderType:[''],
      billToAddress:[''],
      oeOrderLinesAllList: this.fb.array([this.orderlineDetailsGroup()]),
      taxAmounts: this.fb.array([this.TaxDetailsGroup()]),
      ouName:[''],
      loginArray:[''],
      classCodeType:[''],
      title:[''],
      fName:[''],
      mName:[''],
      lName:[],
      customerId1: [''],
      address1:['', [Validators.minLength(10),Validators.maxLength(100),Validators.pattern('[a-zA-Z 0-9/-]*')]],
      address2:[''],
      address3:[''],
      address4:[''],
      city:[''],
      pinCd:[''],
      mobile2:['', [Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]*')]],
      mobile3:['', [Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]*')]],
      emailId:['', [ Validators.email,Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      emailId1:['', [ Validators.email,Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      contactPerson:[''],
      contactNo: ['', [Validators.pattern('[0-9]*'), Validators.minLength(10),Validators.maxLength(10)]],
      birthDate:[''],
      weddingDate:[''],
      startDate:[''],
      tanNo:[''],
      location:[''],
      status:[''],
    })
   }


   orderlineDetailsArray(): FormArray {
    return <FormArray>this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList')
  }

   orderlineDetailsGroup() {
    return this.fb.group({
      frmLocatorId:[],
      onHandQty:[],
      Avalqty:[],
      resveQty:[],
      frmLocatorName:[],
      itemId:[],
      orderedItem: [''],
      pricingQty:[''],
      unitSellingPrice: [''],
      taxCategoryName: [''],
      baseAmt:[],
      taxAmt:[''],
      totAmt:[''],
      flowStatusCode:[''],
      category:[''],
      invType:[''],
      hsnSacCode:[''],
      // invType:[''],
      taxCategoryId:[''],
      displaysegment: false,
      lineNumber: [''],
      orderNumber: [''],
      segment: [''],
      orgId: [''],
      adhocDiscount: [''],
      adhocConsu: [''],
      additionalDisc: [''],
      adhocExchBonus: [''],
      adhocFinanceOffer: [''],
      adhocISL: [''],
    })
  }

  TaxDetailsGroup() {
    return this.fb.group({
      totTaxAmt: [],
      lineNumber: [],
      taxRateName: [],
      taxTypeName: [],
      taxPointBasis: [],
      precedence1: [],
      precedence2: [],
      precedence3: [],
      precedence4: [],
      precedence5: [],
      precedence6: [],
      precedence7: [],
      precedence8: [],
      precedence9: [],
      precedence10: [],
      currencyCode: [],
      totTaxPer: [],
      recoverableFlag: [],
      selfAssesedFlag: [],
      inclusiveFlag: [],
      itemId: [],
      invLineNo: [],
    });
  }

  TaxDetailsArray(): FormArray {
    return <FormArray>this.CounterSaleOrderBookingForm.get('taxAmounts')
  }


  ngOnInit(): void {
    // this.currentCS = 'insert';
    this.op = 'insert';
    this.startDate = new Date();
    this.displaypickTicketInvoice=true;
    // this.divisionName = sessionStorage.getItem('divisionName');
    this.dept=Number(sessionStorage.getItem('deptId'));
    this.loginArray=sessionStorage.getItem('divisionName');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.locCode = (sessionStorage.getItem('locCode'));
    this.ticketNo = (sessionStorage.getItem('ticketNo'));
    this.issuedBy=(sessionStorage.getItem('ticketNo'));
    // this.salesRepName=(sessionStorage.getItem('ticketNo'))
    this.emplId = Number(sessionStorage.getItem('emplId'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.deptId = Number(sessionStorage.getItem('deptId'));
    this.locId = Number(sessionStorage.getItem('locId'));
    this.locationId=Number(sessionStorage.getItem('locId'));
    this.deptName=(sessionStorage.getItem('deptName'));
    this.invType ='SS_SPARES';
    this.service.payTermDescList()
    .subscribe(
      data => {
        this.payTermDescList = data;
        console.log(this.payTermDescList);
      }
    );

    this.service.taxCategoryListForSALES()
    .subscribe(
      data1 => {
        this.taxCategoryList = data1;
        console.log(this.taxCategoryList);
        data1 = this.taxCategoryList;
      }
    );


    this.orderManagementService.categoryList()
    .subscribe(
      data1 => {
        this.categoryList = data1;
        console.log(this.categoryList);
        data1 = this.categoryList;
      }
    );

    this.service.createOrderTypeListFn()
    .subscribe(
      data1 => {
        this.createOrderTypeList = data1;
        console.log(this.createOrderTypeList);
        // data1 = this.createOrderTypeList;
      }
    );

    this.service.titleList()
      .subscribe(
        data => {
          this.titleList = data;
          console.log(this.titleList);
        }
      );

    this.orderManagementService.orderTypeList(this.deptId, this.locId, this.ouId)
    .subscribe(
      data => {
        this.orderTypeList = data;
        console.log(this.orderTypeList);
      }
    );




    this.service.cityList()
    .subscribe(
      data => {
        this.cityList = data;
        console.log(this.cityList);
      }
    );

    this.service.salesRepNameList(this.ouId, this.locId, this.deptId)
    .subscribe(
      data => {
        this.salesRepNameList = data.obj;
        console.log(this.salesRepNameList);
      }
    );

    this.orderManagementService.priceListNameList()
    .subscribe(
      data => {
        this.priceListNameList = data;
        console.log(this.priceListNameList);
      }
    );



    this.orderlineDetailsGroup();
    var patch=this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray
     (patch.controls[0]).patchValue(
      {
        lineNumber: 1,
      }
    );

    this.service.subInvCode(this.deptId).subscribe(
      data => {
        this.subInvCode = data;
        console.log(this.subInventoryId);
         this.subInventoryId=this.subInvCode.subInventoryId;
        // alert(this.subInventoryId);
      });


this.displaysegmentInvType[0]=true;
// this.displayRemoveRow[0]=true;
this.displayLineflowStatusCode[0]=true;
for ( let i=0;this.lstgetOrderLineDetails.length;i++){
this.displayCounterSaleLine[i]=true;
if (this.lstgetOrderLineDetails[i].flowStatusCode != null){
  this.displayRemoveRow[i]=true;
}
}

// customer creation function///////




}


  CounterSaleOrderBooking(CounterSaleOrderBookingForm: any) {
  }


  // onOptionsSelecteddisablesdirectInvForm(createOrderType){
  //   if(createOrderType==='Pick Ticket' || createOrderType==='Pick Ticket Invoice'){
  //     this.CounterSaleOrderBookingForm.enable();
  //   }
  //   else{
  //     this.CounterSaleOrderBookingForm.disable();
  //     alert('This Order Not able to do Direct Invoice')
  //   }
  // }


  OrderFind(orderNumber){
    this.op = 'Search';
    this.emplId = Number(sessionStorage.getItem('emplId'))
    this.orderlineDetailsArray().clear();
    this.TaxDetailsArray().clear();
    this.displaycustAccountNo=false;
    this.displaycreateOrderType=false;
 
    this.orderManagementService.counterSaleOrderSearch(orderNumber)
    .subscribe(
      data => {
        this.lstgetOrderLineDetails = data.obj.oeOrderLinesAllList;
        this.lstgetOrderTaxDetails = data.obj.taxAmounts;
        this.allDatastore=data.obj;
        let control = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
        let control1 = this.CounterSaleOrderBookingForm.get('taxAmounts') as FormArray;
        for (let i = 0; i <= this.lstgetOrderLineDetails.length - 1; i++) {
          var oeOrderLinesAllList1: FormGroup = this.orderlineDetailsGroup();
          control.push(oeOrderLinesAllList1);
          this.displaysegmentInvType[i]=false;
          this.displayLineflowStatusCode.push(true);
          this.displayCounterSaleLine.push(false);
      }
      for (let j = 0; j <= this.lstgetOrderTaxDetails.length-1 ; j++) {
        var orderTaxLinesList: FormGroup=this.TaxDetailsGroup();
        control1.push(orderTaxLinesList);
    }
    this.CounterSaleOrderBookingForm.patchValue(data.obj);
    this.salesRepName=data.obj.salesRepName;
    this.createOrderType=data.obj.createOrderType;
    this.priceListName=data.obj.priceListName;
    this.transactionTypeName=data.obj.transactionTypeName;
    for (let k=0; k<this.lstgetOrderLineDetails.length; k++){
      this.CounterSaleOrderBookingForm.patchValue({baseAmt:this.lstgetOrderLineDetails[k].baseAmt});
      // this.CounterSaleOrderBookingForm.patchValue({frmLocatorId:this.lstgetOrderLineDetails[k].frmLocatorName});
    }
    this.CounterSaleOrderBookingForm.patchValue({orderedDate:data.obj.orderedDate});
    this.CounterSaleOrderBookingForm.get('orderedDate').disable();
    this.CounterSaleOrderBookingForm.controls['emplId'].patchValue(Number(sessionStorage.getItem('emplId')));



  if(this.allDatastore.createOrderType === 'Pick Ticket' && this.allDatastore.flowStatusCode === 'BOOKED'){
  this.CounterSaleOrderBookingForm.get('custName').disable();
  this.CounterSaleOrderBookingForm.get('mobile1').disable();
    this.displayorderHedaerDetails=false;
    this.displaycounterSaleOrderSave=false;
    this.displaypickTicketInvoice=false;
    this.displaypickTicketUpdate=false;
    this.displaycounterSaleOrderSave=false;
    for (let i=0; this.allDatastore.oeOrderLinesAllList.length;i++){
     if (this.allDatastore.oeOrderLinesAllList[i].flowStatusCode==='BOOKED'){
      this.displayLineflowStatusCode[i]=false;
      this.PaymentButton=false;
    }
    else  if
      (this.allDatastore.oeOrderLinesAllList[i].flowStatusCode==='CANCELLED' && this.allDatastore.oeOrderLinesAllList[i].flowStatusCode==='Invoiced'){
        this.displayLineflowStatusCode[i]=true;
      }
    }

  }
  else   if (this.allDatastore.createOrderType === 'Pick Ticket Invoice' || this.allDatastore.createOrderType === 'Direct Invoice' || this.allDatastore.createOrderType === 'Sales Order') {
    // alert('Pick to Invoice');
    this.displaycounterSaleOrderSave=false;
    // this.displaycounterSaleOrderSave=false;
    this.displaycounterSaleAllButtons=false;
    this.displayaddRow=false;
    this.displaypickTicketUpdate=false;
    this.CounterSaleOrderBookingForm.disable();
    this.TaxDetailsArray().disable();
    // alert(this.allDatastore.flowStatusCode);
    if (this.allDatastore.flowStatusCode==='BOOKED' && this.allDatastore.paymentType==='IMMEDIATE'){
      // alert('Hi..')
      this.PaymentButton=false;
    }
  }
  else{
    this.CounterSaleOrderBookingForm.enable();
    this.displaycounterSaleOrderSave=true;
    this.displayaddRow=true;
    // this.displayRemoveRow=true;
    this.displaysalesRepName=true;
    // this.displaytaxCategoryName=true;
      this.CounterSaleOrderBookingForm.get('custName').disable();
    this.CounterSaleOrderBookingForm.get('mobile1').disable();
    this.CounterSaleOrderBookingForm.get('custAccountNo').disable();
    this.CounterSaleOrderBookingForm.get('custAddress').disable();
    if (this.createOrderType==='Sales Order'){
      this.displaysalesRepName=false;
    }
    else{
      this.displaysalesRepName=true;
    }
  }
  if (this.allDatastore.flowStatusCode==='BOOKED' && this.allDatastore.paymentType==='IMMEDIATE'){
    this.PaymentButton=false;
  }
});


}

transeData(val)
{}

downloadPickTicket(){
  const fileName = 'download.pdf';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  this.orderManagementService.downloadCSPreINV(this.orderNumber)
  .subscribe(data => {
    saveAs(new Blob([data], { type: MIME_TYPES[EXT] }));
  });
}


open() {
  this.orderManagementService.downloadCSPreINV(this.orderNumber).subscribe(data => {
    // this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

// downloadCSINV(){
//   const fileName = 'download.pdf';
//   const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
//   this.orderManagementService.downloadCSINV(this.orderNumber)
//   .subscribe(data => {
//     saveAs(new Blob([data], { type: MIME_TYPES[EXT] }));
//   });
// }

downloadCSINV(){
  const fileName = 'download.pdf';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  this.orderManagementService.downloadCSINV(this.orderNumber)
  .subscribe(data => {
    saveAs(new Blob([data], { type: MIME_TYPES[EXT] }));
  });
}


pickTicketupdateFunction(){
  const formValue: ISalesBookingForm =this.CounterSaleOrderBookingForm.value;
  this.orderManagementService.UpdateCounterSaleInv(formValue).subscribe((res: any) => {
  if (res.code === 200) {
    alert(res.message);
    this.OrderFind(this.orderNumber);
    // window.location.reload();
  } else {
    if (res.code === 400) {
      alert(res.message);
      this.CounterSaleOrderBookingForm.reset();
    }
  }
});
}



  onOptionsSelectedCustomerType(SelectCustType:any){
    if(SelectCustType == 'New Customer'){
      this.newCustomerButton = true;
  }
  else{
    this.newCustomerButton = false;
    // (<any>this.CounterSaleOrderBookingForm.get('accountNo')).nativeElement.focus();
  }
}

// onKeyPaymentTerm(payTermDesc){
//   alert(payTermDesc);
//   let select = this.payTermDescList.find(d => d.cmnDesc === payTermDesc);
//   this.paymentTermId = select.cmnTypeId;
// }

// onOptionsSelectedpaymentOption(payTermDesc){
//   alert(payTermDesc);
//   let select = this.payTermDescList.find(d => d.codeDesc === payTermDesc);
//   alert(select);
//   this.paymentTermId = select.cmnTypeId;
//   if(payTermDesc==='IMMEDIATE'){
//     this.PaymentButton=false;
//   }
//   else{
//     this.PaymentButton=true;
//   }

// }

close() {
  this.router.navigate(['admin']);
}

refresh() {
  window.location.reload();
}


onOptionsSelectedTL(createOrderType) {
  // alert(createOrderType);
   if (createOrderType==='Pick Ticket'){
    // Sales Order
    this.displaysalesRepName=true;
  }
  else{
    if (createOrderType==='Sales Order'){
    this.displaysalesRepName=false;
  }
  }
}



onOptionsSelectedPriceListID(priceListName) {
  // alert(priceListName);
    let select = this.priceListNameList.find(d => d.priceListName === priceListName);
    // alert(select);
    this.priceListId = select.priceListHeaderId
}


// onOptionsSelectedlncategoryType(){
//   this.service.taxCategoryListForSALES()
//   .subscribe(
//     data1 => {
//       this.taxCategoryList = data1;
//       console.log(this.taxCategoryList);
//       data1 = this.taxCategoryList;
//     }
//   );

// }
public itemMap2= new Map<number, any[]>();


onOptionsSelectedCategory(orderType :string, lnNo :number) {
 this.invType = orderType;
 if(this.itemMap.has(orderType)){
   var itemsList = this.itemMap.get(orderType);
   this.itemMap2.set(lnNo , this.itemMap.get(orderType) );
 }else{
 }
 this.invItemList1 = this.itemMap.get(orderType);
   this.orderManagementService.getItemByCatType(orderType,1 )
  .subscribe(
    data => {
            this.orderedItem=data.description;
      this.itemMap.set(orderType , data );
      this.itemMap2.set(lnNo , this.itemMap.get(orderType) );
    }
  );
 
}
searchFromArray1(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };

accountNoSearch(custAccountNo){
  this.orderManagementService.accountNoSearchFn(custAccountNo, this.ouId)
  .subscribe(
    data => {
      if (data.code===200){
      this.accountNoSearch = data.obj;
      console.log(this.accountNoSearch);
      this.CounterSaleOrderBookingForm.patchValue(this.accountNoSearch);
      this.custAddress=data.obj.billToAddress;
      this.paymentTermId=data.obj.termId;
      this.CounterSaleOrderBookingForm.get('custName').disable();
      this.CounterSaleOrderBookingForm.get('mobile1').disable();
    }
    else {
      if (data.code===400){
        alert(data.message);
      this.displaycreateCustomer=false;
      }
    }
  });

}


othRefNoSearch(othRefNo){
  // alert(othRefNo);
  this.orderManagementService.othRefNoSearchFn(othRefNo)
  .subscribe(
    data => {
      this.othRefNoSearchFnData = data.obj;
      this.othRefNo=data.obj.orderNumber1;
      this.salesRepName=data.obj.salesRepName1;
      this.tlName=data.obj.tlName1;
      this.CounterSaleOrderBookingForm.patchValue(this.othRefNoSearchFnData);
      if (this.custAccountNo !=this.othRefNoSearchFnData.custAccountNo1){
        alert('Sales Order Customer & Counter Sale Order Customer Not Match')
        }
          else{}
    })

}


contactNoSearch(mobile1){
  // alert(mobile1)
  this.orderManagementService.contactNoSearchFn(mobile1, this.ouId)
  .subscribe(
    data => {
      if (data.code===200){
      this.contactNoSearchData = data.obj;
      console.log(this.contactNoSearchData);
      this.CounterSaleOrderBookingForm.patchValue(this.contactNoSearchData);
      // this.CounterSaleOrderBookingForm.get('custAccountNo').disable();
      // this.CounterSaleOrderBookingForm.get('custName').disable();
      // this.CounterSaleOrderBookingForm.get('mobile1').disable();
      this.custAddress=data.obj.billToAddress;
      this.custAccountNo=data.obj.accountNo;
    }
    else{
      if(data.code===400){
        alert(data.message);
      this.displaycreateCustomer=false;
      // this.CounterSaleOrderBookingForm.get('custAccountNo').disable();
        // this.CounterSaleOrderBookingForm.get('custName').disable();
        // this.CounterSaleOrderBookingForm.get('mobile1').disable();
      }
    }
    //   for (let i=0; i <= this.contactNoSearchData.length ; i++){
    //     // alert(this.contactNoSearchData.length );
    //   if (this.contactNoSearchData.length >= 1){
    //   this.CounterSaleOrderBookingForm.patchValue(this.contactNoSearchData);
    //   this.custAddress=data.obj.billToAddress;
    //   console.log( this.custAddress);

    //   this.custAccountNo=this.contactNoSearchData[i].accountNo;
    //   this.CounterSaleOrderBookingForm.get('custAccountNo').disable();
    //   this.CounterSaleOrderBookingForm.get('custName').disable();
    // }
    // else{
    //   if (this.contactNoSearchData.length <= 1){
    //   alert('Customer Not Found! Please create New Customer.')
    //   this.displaycreateCustomer=false;
    //   this.CounterSaleOrderBookingForm.get('custAccountNo').disable();
    //   this.CounterSaleOrderBookingForm.get('custName').disable();
    //   this.CounterSaleOrderBookingForm.get('mobile1').disable();
    //   }
    //   else{
    //   alert('Multiple Customer Available please contact to IT.')
    // }
    // }
    // }
    }
  );
}

get f() { return this.CounterSaleOrderBookingForm.controls; }

createNewCust(){
  this.displaycreateCustomer=true;
  this.accountNoSearch(this.custAccountNo);
}

custNameSearch(custName){
  // alert(custName)
  this.orderManagementService.custNameSearchFn(custName, this.ouId)
  .subscribe(
    data => {
      if(data.code===200){
      this.customerNameSearch = data.obj;
      console.log(this.accountNoSearch);
      // alert(data.obj.length);
      for (let i=0;data.obj.length;i++){
        // alert(data.obj.length);
      this.CounterSaleOrderBookingForm.patchValue(data.obj[i]);
      this.custAddress=data.obj[i].billToAddress;
      this.custAccountNo=data.obj[i].accountNo;
      this.CounterSaleOrderBookingForm.get('custAccountNo').disable();
      this.CounterSaleOrderBookingForm.get('mobile1').disable();
    }

    }
    else{
      if(data.code===400){
        alert(data.message);
        this.displaycreateCustomer=false;
        this.CounterSaleOrderBookingForm.get('custAccountNo').disable();
        this.CounterSaleOrderBookingForm.get('custName').disable();
        this.CounterSaleOrderBookingForm.get('mobile1').disable();
      }
    }
    }
  );
}

onKey(index) {
  console.log(index);

  var arrayControl = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value
  var patch = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
  console.log(arrayControl);
  var itemId=arrayControl[index].itemId;
 var baseAmt = arrayControl[index].unitSellingPrice * arrayControl[index].pricingQty;
  // alert(arrayControl[index].baseAmtLineWise);
     var diss = 0;
  var sum = 0;
  // var baseAmount = this.sum;
  this.service.taxCalforItem(itemId, this.taxCategoryId, diss, baseAmt)
    .subscribe(
      (data: any[]) => {
        this.taxCalforItem = data;
        console.log(this.taxCalforItem);

        for (let i = 0; i < this.taxCalforItem.length; i++) {

          if (this.taxCalforItem[i].totTaxPer != 0) {
            sum = sum + this.taxCalforItem[i].totTaxAmt
          }
        }
        (patch.controls[index]).patchValue({
          baseAmt: baseAmt,
          // baseAmtLineWise: arrayControl[index].baseAmtLineWise,
          taxAmt: sum,
          totAmt: baseAmt + sum,
        });
        let controlinv1 = this.CounterSaleOrderBookingForm.get('taxAmounts') as FormArray;
        this.TaxDetailsArray().clear();
        // alert(data.length);
        for (let i = 0; i < data.length; i++) {
          var invLnGrp: FormGroup = this.TaxDetailsGroup();
          // this.TaxDetailsArray().push(invLnGrp);
          controlinv1.push(invLnGrp);
        }
        this.CounterSaleOrderBookingForm.get('taxAmounts').patchValue(data);
      });

}



onOptionsSelectedDescription(segment: any, k) {
  if (this.CounterSaleOrderBookingForm.get('createOrderType').value === 'Sales Order' && this.CounterSaleOrderBookingForm.get('othRefNo').value === undefined ){
    alert('Please Enter Reference Number First !');
    this.CounterSaleOrderBookingForm.get('segment').disable();
    this.orderlineDetailsArray().get('segment').disable();
    (<any>this.CounterSaleOrderBookingForm.get('othRefNo')).nativeElement.focus();

  }

  else{
  //let select = this.invItemList1.find(d => d.segment === segment);
  let controlinv = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
  var itemType = (controlinv.controls[k]).get('invType').value;
  let select = (this.itemMap.get(itemType)).find(d => d.segment === segment);
  this.CounterSaleOrderBookingForm.patchValue({itemId:select.itemId})
  this.itemId = select.itemId;
  this.orderManagementService.addonDescList(segment)
    .subscribe(
      data => {
        this.addonDescList = data;

        for(let i=0; i <data.length; i++){
          var taxCatNm : string = data[i].taxCategoryName;
          // alert(taxCatNm);
          if(taxCatNm.includes('Sale')){
            // alert('sale' + '-'+k);
            (controlinv.controls[k]).patchValue({
              itemId: data[i].itemId,
              orderedItem: data[i].description,
              hsnSacCode: data[i].hsnSacCode,
              taxCategoryId: data[i].taxCategoryId,
              taxCategoryName: data[i].taxCategoryName,
              unitSellingPrice:data[i].priceValue,
              });
          }
        //   const hsnSacCode1 = data[i].hsnSacCode.substr(0, 8);
        //  if (this.hsnSacCode ===null || hsnSacCode1.length <8){
        //    alert('please confirm HSN/SAC Code!');
        //  return;
        //  }f
        }
    }
    );
    this.service.getfrmSubLoc(this.locId,select.itemId,this.subInventoryId).subscribe(
      data =>{
        //  this.getfrmSubLoc = data;
        console.log(data);
        var getfrmSubLoc =data;
          // alert(getfrmSubLoc.segmentName+'SegmentName')


          // alert(i +'i');
          this.locData[k] = data;
          if(getfrmSubLoc.length==1)
          {
          // this.displayLocator[i]=false;
          controlinv.controls[k].patchValue({onHandId:getfrmSubLoc[0].segmentName});
          controlinv.controls[k].patchValue({locatorId:getfrmSubLoc[0].locatorId});
          controlinv.controls[k].patchValue({frmLocator:getfrmSubLoc[0].segmentName});
          controlinv.controls[k].patchValue({onHandQty:getfrmSubLoc[0].onHandQty});
          controlinv.controls[k].patchValue({id:getfrmSubLoc[0].id});
          }
          else
          {
           // this.getfrmSubLoc=data;;
         //  trxLnArr2.controls[i].patchValue({onHandId:getfrmSubLoc});
         controlinv.controls[k].patchValue({frmLocator:getfrmSubLoc[0].segmentName});
         controlinv.controls[k].patchValue({onHandQty:getfrmSubLoc[0].onHandQty})
         controlinv.controls[k].patchValue({id:getfrmSubLoc[0].id});
          }

      });
      if(this.deptName=='Spares')
      {
        controlinv.controls[k].patchValue({invType:'SS_SPARES'});
      }
      this.service.getreserqty(this.locId,select.itemId).subscribe
      (data=>{
        this.resrveqty=data;
        controlinv.controls[k].patchValue({resveQty:this.resrveqty});
      });
      
  }
}




AvailQty(event:any,i)
{
  // alert('Hi***')
  var trxLnArr =this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
  var itemid=trxLnArr[i].itemId;
  var locId=trxLnArr[i].frmLocatorId;
  var onhandid=trxLnArr[i].id;
  this.service.getonhandqty(Number(sessionStorage.getItem('locId')),this.subInventoryId,locId,itemid).subscribe
      (data =>{
      this.onhand1 = data;
      console.log(this.onhand1);
      var trxLnArr1=this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList')as FormArray;
      trxLnArr1.controls[i].patchValue({onHandQty:data.obj});
    // var trxLnArr=this.moveOrderForm.get('trxLinesList').value;
  let onHand=data.obj;
  // alert(onHand+'ONHAND');
  let reserve=trxLnArr[i].resveQty;
  // alert(reserve+'Reserve');
  // alert(onHand+'OnHand');
  // alert(reserve+'reserve');
  let avlqty1=0;
  avlqty1= onHand-reserve;
  // alert(avlqty1+'avail');
  var trxLnArr1=this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList')as FormArray;
  trxLnArr1.controls[i].patchValue({Avalqty: avlqty1});
  // alert(trxLnArr1 +' '+'Hi');
    })
}


onOptionTaxCatSelected(taxCategoryName, i) {
//  alert('******** ITEM *******');
  // var taxCategoryName = taxCategory.taxCategoryName;
  // var taxCategoryId = taxCategoryId;
  this.indexVal = i;
  var arrayControl = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;

  var amount = arrayControl[i].unitSellingPrice;

  let select = this.taxCategoryList.find(d => d.taxCategoryName === taxCategoryName);

  this.taxCategoryId= select.taxCategoryId;
console.log(this.taxCategoryId);

  let controlinv = this.CounterSaleOrderBookingForm.get('taxAmounts') as FormArray;
  var diss = 0;
  if (this.baseAmt !=undefined){
  this.service.taxCalforItem(this.itemId, this.taxCategoryId, diss, this.baseAmt)
    .subscribe(
      (data: any[])  => {
        this.lstInvLineDeatails1 = data;
        console.log(this.lstInvLineDeatails1);
        let controlinv1 = this.CounterSaleOrderBookingForm.get('taxAmounts') as FormArray;
        this.TaxDetailsArray().clear();
        // alert(data.length);
        for (let i = 0; i < data.length; i++) {
          var invLnGrp: FormGroup = this.TaxDetailsGroup();
          controlinv1.push(invLnGrp);
        }
        this.CounterSaleOrderBookingForm.get('taxAmounts').patchValue(data);
      }
    )
  }
}



// counterSaleOrderSave(){}


transData(val) {
  return val;
}


pickTicketInvoiceFunction(){
  const formValue: ISalesBookingForm = this.transData(this.CounterSaleOrderBookingForm.value);
  // formValue.flowStatusCode = 'BOOKED';
  this.ouId = Number(sessionStorage.getItem('ouId'));
  this.emplId = Number(sessionStorage.getItem('emplId'));
  this.orderManagementService.pickTicketInvoiceFun(formValue).subscribe((res: any) => {
    if (res.code === 200) {
      this.InvoiceNumber = res.obj;
      console.log(this.orderNumber);
      alert(res.message);
      this.OrderFind(this.orderNumber);
      this.CounterSaleOrderBookingForm.disable();
      // this.orderNumber = res.obj;
      // this.orderNumber=this.CounterSaleOrderBookingForm.get('orderNumber').value;
      // console.log(this.orderNumber);
      // this.OrderFind(this.orderNumber);
    } else {
      if (res.code === 400) {
        alert(res.message);
        // this.SalesOrderBookingForm.reset();
      }
    }
  });
}


counterSaleOrderSave(){
  const formValue: ISalesBookingForm = this.transData(this.CounterSaleOrderBookingForm.value);
  // formValue.flowStatusCode = 'BOOKED';
  this.ouId = Number(sessionStorage.getItem('ouId'));
  this.emplId = Number(sessionStorage.getItem('emplId'));
  this.orderManagementService.SaveCounterSaleOrder(formValue).subscribe((res: any) => {
    if (res.code === 200) {
      this.orderNumber = res.obj;
      console.log(this.orderNumber);
      alert(res.message);
      this.orderNumber = res.obj;
      // this.orderNumber=this.CounterSaleOrderBookingForm.get('orderNumber').value;
      console.log(this.orderNumber);
      this.OrderFind(this.orderNumber);
    } else {
      if (res.code === 400) {
        alert(res.message);
        // this.SalesOrderBookingForm.reset();
      }
    }
  });
}


addRow(){
  this.displaysegmentInvType.push(true);
  this.displayRemoveRow.push(true);
  this.displayCounterSaleLine.push(true);
  this.displayLineflowStatusCode.push(true);
  this.orderlineDetailsArray().push(this. orderlineDetailsGroup());
  var len=this.orderlineDetailsArray().length;
  // alert(len);
  var patch=this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray
  (patch.controls[len-1]).patchValue(
   {
    lineNumber: len,
   }
 );
  this.displaysegmentInvType.push(true);
  this.displayRemoveRow.push(true);
  this.displayCounterSaleLine.push(true);
  this.displayLineflowStatusCode.push(true);
  }

  RemoveRow(OrderLineIndex){
    this.orderlineDetailsArray().removeAt(OrderLineIndex);
  }



  addDiscount(i) {
    var invLine = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value
    var arrayControl = this.CounterSaleOrderBookingForm.get('taxAmounts').value
    const invItemId = arrayControl[0].taxItemId
    const lineNo = arrayControl[0].invLineNo
    this.taxCategoryName = this.taxCategoryList.find(d => d.taxCategoryName === this.taxCategoryName);
    // alert(this.taxCategoryId);
    var arrayControltaxAmounts = this.CounterSaleOrderBookingForm.get('taxAmounts').value;
    // var diss = arrayControltaxAmounts[0].taxAmt;
    var diss = 0;
    // this.baseAmt =0;
    this.segment=this.invItemList1.find(d => d.segment === this.segment);
    this.itemId;
    // alert(this.itemId);
    let control = this.CounterSaleOrderBookingForm.get('taxAmounts') as FormArray;
    control.clear();
    this.service.taxCalforItem(this.itemId, this.taxCategoryId, diss, this.baseAmt)
      .subscribe(
        (data: any[]) => {
          this.taxCalforItem = data;
          // this.patchResultList(this.poLineTax, this.taxCalforItem);
          var sum = 0;

          for (i = 0; i < this.taxCalforItem.length; i++) {

            if (this.taxCalforItem[i].totTaxPer != 0) {
              sum = sum + this.taxCalforItem[i].totTaxAmt
            }
          }
          // const TotAmtLineWise1 = arrayControl[this.cntLineTax].baseAmtLineWise
          // var tolAmoutLine = sum + TotAmtLineWise1;
          this.TaxDetailsArray().clear()
          for (let i = 0; i < this.taxCalforItem.length; i++) {
            var invLnGrp: FormGroup = this.TaxDetailsGroup();
            this.TaxDetailsArray().push(invLnGrp);
            this.CounterSaleOrderBookingForm.get('taxAmounts').patchValue(this.taxCalforItem);
          }
          // this.patchResultList(this.poLineTax, this.taxCalforItem);
        });
  }


  validateNum(index, j) {
    var arrayControl = this.CounterSaleOrderBookingForm.get('taxAmounts').value
    // this.TaxDetailsArray().controls[index].get('taxAmounts').value;
    // this.poMasterDtoForm.get('poLines').value
    var value = arrayControl[index].totTaxAmt
    if (value.charAt(0) === '-') {
      alert('Valid Number: ' + value);
    } else {
      alert('Invalid Number: ' + value + ' ' + 'Kindly enter negetive value');
    }
  }


  taxDetails(op, i, taxCategoryId) {
    // alert('hi'+' ' +op+'-' +i);
    // alert(this.displayCounterSaleLine[i]);
    if (op === 'Search' ) {
      // alert('Serach Of item Category')
      // .controls[i].get('taxAmounts')
      let taxControl = this.TaxDetailsArray() as FormArray
     if (taxControl !=undefined){
      taxControl.clear();
    }
        var taxItems: any[] = this.allDatastore.taxAmounts;
        var k=Number(i)+1

      taxItems.forEach(x => {
        // alert(x.invLineNo +'--'+k);
        if (x.invLineNo===k){
        console.log('in patch' + taxItems);
        console.log(x.totTaxAmt);
        taxControl.push(this.fb.group({
          totTaxAmt: x.totTaxAmt,
          lineNumber: x.lineNumber,
          taxRateName: x.taxRateName,
          taxTypeName: x.taxTypeName,
          taxPointBasis: x.taxPointBasis,
          precedence1: x.precedence1,
          precedence2: x.precedence2,
          precedence3: x.precedence3,
          precedence4: x.precedence4,
          precedence5: x.precedence5,
          precedence6: x.precedence6,
          precedence7: x.precedence7,
          precedence8: x.precedence8,
          precedence9: x.precedence9,
          precedence10: x.precedence10,
          currencyCode: x.currencyCode,
          totTaxPer: x.totTaxPer,
          recoverableFlag: x.recoverableFlag,
          selfAssesedFlag: x.selfAssesedFlag,
          inclusiveFlag: x.inclusiveFlag,

        }));
      }});
    }
    else{
      // alert('Hi');
    this.poLineTax = i;
    var itemId = this.invItemList1[i].itemId;
      var taxCategoryId = taxCategoryId;
      this.taxCategoryId = taxCategoryId;
      // var diss = 0;
      var arrayControl = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value
      var diss = arrayControl[i].diss1;
      var baseAmount = arrayControl[this.poLineTax].baseAmtLineWise;
      // this.service.taxCalforItem(itemId, taxCategoryId, diss, baseAmount)
      //   .subscribe(
      //     (data: any[]) => {
      //       this.taxCalforItem = data;

      //       console.log(this.taxCalforItem);
      //       this.patchResultList(i, this.taxCalforItem);

      //     }
      //   );
      // }
      this.service.taxCalforItem(this.itemId, this.taxCategoryId, diss, this.baseAmt)
      .subscribe(
        (data: any[]) => {
          this.taxCalforItem = data;

          var sum = 0;

          for (i = 0; i < this.taxCalforItem.length; i++) {

            if (this.taxCalforItem[i].totTaxPer != 0) {
              sum = sum + this.taxCalforItem[i].totTaxAmt
            }
          }

          this.TaxDetailsArray().clear()
          for (let i = 0; i < this.taxCalforItem.length; i++) {
            var invLnGrp: FormGroup = this.TaxDetailsGroup();
            this.TaxDetailsArray().push(invLnGrp);
            this.CounterSaleOrderBookingForm.get('taxAmounts').patchValue(this.taxCalforItem);
          }

        });
      }
    }


    patchResultList(i, taxCalforItem) {

      let control = this.TaxDetailsArray().controls[i].get('taxAmounts') as FormArray
      control.clear();
      taxCalforItem.forEach(x => {
        console.log('in patch' + taxCalforItem);
        console.log(x.taxRateName);
        control.push(this.fb.group({
          totTaxAmt: x.totTaxAmt,
          lineNumber: x.lineNumber,
          taxRateName: x.taxRateName,
          taxTypeName: x.taxTypeName,
          taxPointBasis: x.taxPointBasis,
          precedence1: x.precedence1,
          precedence2: x.precedence2,
          precedence3: x.precedence3,
          precedence4: x.precedence4,
          precedence5: x.precedence5,
          precedence6: x.precedence6,
          precedence7: x.precedence7,
          precedence8: x.precedence8,
          precedence9: x.precedence9,
          precedence10: x.precedence10,
          currencyCode: x.currencyCode,
          totTaxPer: x.totTaxPer,
          recoverableFlag: x.recoverableFlag,
          selfAssesedFlag: x.selfAssesedFlag,
          inclusiveFlag: x.inclusiveFlag,
        }));
      });
      console.log(control);
    }


// Customer form Function /////////////
onOptioncustTypeSelected(event: any) {
  this.PersonType = this.CounterSaleOrderBookingForm.get('custType').value;
  // alert(this.StatusPickUp);
  if (this.custType === 'Person') {
    this.displayPerson = true;
    this.displayOrgnization = false;
  } if (this.custType === 'Orgnization') {
    this.displayOrgnization = true;
    this.displayPerson = false;
  }
}

onKey1(event: any) {
  const aaa = this.title + '. ' + this.fName + ' ' + this.mName + ' ' + this.lName;
var person = this.CounterSaleOrderBookingForm.get('custType').value;
// alert(person);
if (person === 'Person'){
this.custName = aaa;
}

}
mergeCustName(fName, mName, lName) {
  const aaa = fName + ' ' + mName + ' ' + lName;
  this.custName = aaa;
}



onOptionsSelectedCity (city: any){
  // alert(city);
  this.service.cityList1(city)
  .subscribe(
    data => {
      this.cityList1 = data;
      console.log(this.cityList1);
      this.state=this.cityList1.attribute1;
      console.log(this.cityList1.attribute1);
      // this.country = 'INDIA';
    }
  );
//   this.cityList1.ouId=106;
//   if (this.ouId != 106){
//     alert(this.ouId)
//     alert('This Is IGST Customer')
//   }
// else{
//   var ouId1=104;
//   if(this.ouId===ouId1){
//   alert('This Is SGST Customer')
// }
// }
}
transDataWithSite(val) {}




newMast() {
  // const formValue: CustomerCreationInterface = this.transDataWithSite(this.CounterSaleOrderBookingForm.value);
  const formValue: CustomerCreationInterface = this.transData(this.CounterSaleOrderBookingForm.value);
  formValue.customerId1=this.custAccountNo;
  this.service.CustMasterSubmit(formValue).subscribe((res: any) => {
    if (res.code === 200) {
      alert(res.message);
      if (this.custAccountNo!=null){
      this.accountNoSearch1(this.custAccountNo);
    }
     else if (this.mobile1 !=null){
       this.contactNoSearch(this.mobile1);
    }
    else{
      this.custNameSearch(this.custName);
    }
     
      // this.CounterSaleOrderBookingForm.reset();
    } else {
      if (res.code === 400) {
        alert(res.message);
        // this.CounterSaleOrderBookingForm.reset();
      }
    }
  });
}



accountNoSearch1(custAccountNo){
  // alert(this.custAccountNo);
  this.orderManagementService.accountNoSearchFn(this.custAccountNo, this.ouId)
  .subscribe(
    data => {
      if (data.code===200){
      this.accountNoSearch = data.obj;
      this.displaycreateCustomer=true;
      console.log(this.accountNoSearch);
      this.CounterSaleOrderBookingForm.patchValue(this.accountNoSearch);
      this.custAddress=data.obj.billToAddress;
      this.paymentTermId=data.obj.termId;
      this.CounterSaleOrderBookingForm.get('custName').disable();
      this.CounterSaleOrderBookingForm.get('mobile1').disable();
    }
    else {
      if (data.code===400){
        alert(data.message);
      this.displaycreateCustomer=false;
      }
    }
  });

}

// getGroupControl(index,arrayname, fieldName) {
//   return (<FormArray>this.CounterSaleOrderBookingForm.get(arrayname)).at(index).get(fieldName);
// }


  
  
}





