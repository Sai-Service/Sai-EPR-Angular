import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { controllers } from 'chart.js';
import { data } from 'jquery';
import { MasterService } from 'src/app/master/master.service';
// import { TransactionService } from 'src/app/transaction/transaction.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { DatePipe } from '@angular/common';


interface IinterState{
  InterStateNo:number;
  orderNumber:number;
  transactionTypeName:number;
  BillLocName:string;
  paymentType:string;
  paymentTermId: number;
  priceListName:string;
  priceListId:number;
  issuedBy:string;
  orderStatus:string;
  remarks:string;
  custAccountNo:number;
}
@Component({
  selector: 'app-inter-state',
  templateUrl: './inter-state.component.html',
  styleUrls: ['./inter-state.component.css']
})
export class InterStateComponent implements OnInit {
InterStateForm:FormGroup;
InterStateNo:number;
orderNumber:number;
transactionTypeName:number;
public orderTypeList:any;
public priceListNameList: any;
createOrderTypeList:any=[];
createOrderType:string='Direct Invoice'
BillLocName:string;
paymentType:string;
paymentTermId: number;
priceListName:string;
priceListId:number;
issuedBy:string;
orderStatus:string;
remarks:string;
trxNumber:number;
orderedDate= new Date();
subtotal:number;
totTax:number;
totAmt:number;
custAccountNo:number;
custName:string;
mobile1:number;
custAddress:string;
state:string;
gstNo:string;
allDatastore:any;
poLineTax: number;
userList2: any[] = [];
lastkeydown1: number = 0;
locId :number;
deptId:number;
divisionId:number;
ouId:number;
deptName:string;
public ItemIdList:any= [];
itemId:number;
public subInvCode: any;
taxCategoryId:number;
  baseAmt: number;
  public taxCalforItem:any;
  public addonDescList: any[];
  indexVal: number;
  public taxCategoryList: any[];
  lstInvLineDeatails1: any[];
  taxCategoryName:string;
  segment:string;
  selectedLine = 0;
  orderedItem: string;
  billLocName: string;
  subInventoryId:number;
  public minDate = new Date();
  getshiplist: any=[];
  frmLocatorId:number;
  locData =[ {
    "locatorId": 999,
    "segmentName": "D.U.01.D.01",
    "id": 7,
    "onHandQty": 40
  }];
  Avalqty:number;
  onhand1: any;
  resveQty:number;
  onHandQty:number;
  id:number;
  emplId: number;
  validday:number;
  invType:string;
  locationId:number;
  locCode:string;
  public op:string;
  lstgetOrderLineDetails: any[];
  lstgetOrderTaxDetails: any[];
  displayLineflowStatusCode:Array<boolean>=[];
  displayCounterSaleLine: Array<boolean> = [];
  resrveqty: any;
  getItemDetail: any;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService,private orderManagementService: OrderManagementService) {
    this.InterStateForm=fb.group({
      orderNumber:[],
      InterStateNo:[],
      subInventoryId:[],
      transactionTypeName:[],
      paymentType:[],
      paymentTermId: [],
      priceListName:[],
      priceListId:[],
      BillLocName: [''],
      issuedBy:[],
      orderStatus:[],
      remarks:[],
      trxNumber:[],
      orderedDate:[],
      subtotal:[],
      totTax:[],
      totAmt:[],
      custAccountNo:[],
      custName:[],
      mobile1:[],
      custAddress:[],
      state:[],
      gstNo:[],
      validday:[],
      ouId:[],
      emplId:[],
      locationId:[],
      createOrderType:[],
      locCode:[],
      oeOrderLinesAllList: this.fb.array([this.orderlineDetailsGroup()]),
      taxAmounts: this.fb.array([this.TaxDetailsGroup()]),
    })
   }
   orderlineDetailsGroup() {
    return this.fb.group({
      // lineNumber:[''],
      // segment:[''],
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
      frmLocatorId:['',[Validators.required]],
      Avalqty:[],
      resveQty:[],
      onHandQty:[],
      id:[],
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
  orderlineDetailsArray(): FormArray {
    return <FormArray>this.InterStateForm.get('oeOrderLinesAllList')
  }
  TaxDetailsArray(): FormArray {
    return <FormArray>this.InterStateForm.get('taxAmounts')
  }
   InterState(InterStateForm:any){}
  ngOnInit(): void {
    this.issuedBy=(sessionStorage.getItem('ticketNo'));
    this.locId = Number(sessionStorage.getItem('locId'));
    this.deptId = Number(sessionStorage.getItem('dept'));
    this.locationId=Number(sessionStorage.getItem('locId'));
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.deptName=(sessionStorage.getItem('deptName'));
    this.ouId=Number(sessionStorage.getItem('ouId'));
    this.locCode=(sessionStorage.getItem('locCode'));
    this.paymentType='IMMEDIATE';
    this.emplId = Number(sessionStorage.getItem('emplId'));

  
     this.service.iotOrderTypeList(this.ouId)
    .subscribe(
      data1 => {
        this.createOrderTypeList = data1;
        console.log(this.createOrderTypeList);
        // data1 = this.createOrderTypeList;
        // this.InterStateForm.patchValue({transactionTypeName:this.createOrderTypeList.transactionTypeName});
        this.transactionTypeName=this.createOrderTypeList[0].transactionTypeName;

      }
    );
    this.service.getShiptoLoc(this.locId)
      .subscribe(
        data => {
          this.getshiplist = data;
          // this.custAccountNo=this.getshiplist[0].custAccountNo;
      // this.custName=this.getshiplist[0].custName;
      // this.mobile1=this.getshiplist[0].mobile1;
      // this.custAddress=this.getshiplist[0].address1+this.getshiplist[0].address2+this.getshiplist[0].address3;
      // this.state=this.getshiplist[0].state;
      // this.gstNo=this.getshiplist[0].gstNo
        });

    this.orderManagementService.priceListNameList()
    .subscribe(
      data => {
        this.priceListNameList = data;
        console.log(this.priceListNameList);
      }
    );
    this.service.subInvCode(this.deptId).subscribe(
      data => {
        this.subInvCode = data;
        console.log(this.subInventoryId);
         this.subInventoryId=this.subInvCode.subInventoryId;
        alert(this.subInventoryId);
      });

      this.service.taxCategoryIgstListForSALES()
    .subscribe(
      data1 => {
        this.taxCategoryList = data1;
        console.log(this.taxCategoryList);
        data1 = this.taxCategoryList;
      }
    );
    this.orderlineDetailsGroup();
    var patch=this.InterStateForm.get('oeOrderLinesAllList') as FormArray
     (patch.controls[0]).patchValue(
      {
        lineNumber: 1,
      }
    );

  }
  getInvItemId($event)
  {
    // alert('in getInvItemId')
     let userId=(<HTMLInputElement>document.getElementById('invItemIdFirstWay')).value;
     this.userList2=[];
     if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList2 = this.searchFromArray1(this.ItemIdList, userId);
      }
    }
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
  addRow(i){
    if(i>-1)
    {
    this.reservePos(i);
    }
    this.orderlineDetailsArray().push(this. orderlineDetailsGroup());
    var len=this.orderlineDetailsArray().length;
    alert(len);
    var patch=this.InterStateForm.get('oeOrderLinesAllList') as FormArray
    (patch.controls[len-1]).patchValue(
     {
      lineNumber: len,
     }
   );
    }
  
    RemoveRow(OrderLineIndex){
      this.orderlineDetailsArray().removeAt(OrderLineIndex);
    }
  
  
  onOptiongetItem(event){
    alert(event);
    this.service.ItemIdListDept(this.deptName,this.locId,this.subInventoryId).subscribe(
      data => {
        this.ItemIdList = data;
        console.log(this.ItemIdList);
      });
      var select1=this.getshiplist.find(d=>d.toLocation===event);
      alert(select1.custAccountNo);
      this.custAccountNo=select1.custAccountNo;
      this.custName=select1.custName;
      this.mobile1=select1.mobile1;
      this.custAddress=select1.address1+select1.address2+select1.address3;
      this.state=select1.state;
      this.gstNo=select1.gstNo;
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
      alert('Hi');
    this.poLineTax = i;
    // var itemId = this.invItemList1[i].itemId;
      var taxCategoryId = taxCategoryId;
      this.taxCategoryId = taxCategoryId;
      // var diss = 0;
      var arrayControl = this.InterStateForm.get('oeOrderLinesAllList').value
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
            this.InterStateForm.get('taxAmounts').patchValue(this.taxCalforItem);
          }

        });
      }
    }
    onOptionsSelectedDescription(event: any, k) {
      alert(event)
    //let select = this.invItemList1.find(d => d.segment === segment);
      let controlinv = this.InterStateForm.get('oeOrderLinesAllList') as FormArray;
      // var itemType = (controlinv.controls[k]).get('invType').value;
      let select=this.ItemIdList.find(d=>d.SEGMENT===event);
      alert(select.itemId)
      this.InterStateForm.patchValue({itemId:select.itemId})
      // this.itemId = select.itemId;
      this.service.getItemDetail(select.itemId).subscribe
      (data => {this.getItemDetail = data;
        // alert("this.getItemDetail.description" + this.getItemDetail.description);
        controlinv.controls[k].patchValue({orderedItem: this.getItemDetail.description});
        // controlinv.controls[k].patchValue({uom:this.getItemDetail.uom});
        // controlinv.controls[k].patchValue({segment:this.getItemDetail.segment});
        // trxLnArr1.controls[i].patchValue({frmSubInvCode:this.subInvCode.subInventoryCode});
      }
      );
      this.orderManagementService.addonDescList(event)
        .subscribe(
          data => {
            console.log(data);
            this.addonDescList = data;
            // controlinv.controls[k].patchValue(data);

            for(let i=0; i <data.length; i++){
              var taxCatNm : string = data[i].taxCategoryName;
              alert(taxCatNm);
              if(taxCatNm.includes('Sale')){
                alert('sale' + '-'+k);
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
              alert(getfrmSubLoc.segmentName+'SegmentName')


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
      AvailQty(event:any,i)
{
  var trxLnArr =this.InterStateForm.get('oeOrderLinesAllList').value;
  var itemid=trxLnArr[i].itemId;
  var locId=trxLnArr[i].frmLocatorId;
  var onhandid=trxLnArr[i].id;
  this.service.getonhandqty(Number(sessionStorage.getItem('locId')),this.subInventoryId,locId,itemid).subscribe
      (data =>{
      this.onhand1 = data;
      console.log(this.onhand1);
      var trxLnArr1=this.InterStateForm.get('oeOrderLinesAllList')as FormArray;
      trxLnArr1.controls[i].patchValue({onHandQty:data.obj});
    // var trxLnArr=this.moveOrderForm.get('trxLinesList').value;
  let onHand=data.obj;
  alert(onHand+'ONHAND');
  let reserve=trxLnArr[i].resveQty;
  alert(reserve+'Reserve');
  // alert(onHand+'OnHand');
  // alert(reserve+'reserve');
  let avlqty1=0;
  avlqty1= onHand-reserve;
  alert(avlqty1+'avail');
  var trxLnArr1=this.InterStateForm.get('oeOrderLinesAllList')as FormArray;
  trxLnArr1.controls[i].patchValue({Avalqty: avlqty1});
    })
}
      onKey(index) {
        console.log(index);

        var arrayControl = this.InterStateForm.get('oeOrderLinesAllList').value
        var patch = this.InterStateForm.get('oeOrderLinesAllList') as FormArray;
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
              let controlinv1 = this.InterStateForm.get('taxAmounts') as FormArray;
              this.TaxDetailsArray().clear();
              // alert(data.length);
              for (let i = 0; i < data.length; i++) {
                var invLnGrp: FormGroup = this.TaxDetailsGroup();
                // this.TaxDetailsArray().push(invLnGrp);
                controlinv1.push(invLnGrp);
              }
              this.InterStateForm.get('taxAmounts').patchValue(data);
            });

      }
      onOptionTaxCatSelected(taxCategoryName, i) {
        //  alert('******** ITEM *******');
          // var taxCategoryName = taxCategory.taxCategoryName;
          // var taxCategoryId = taxCategoryId;
          this.indexVal = i;
          var arrayControl = this.InterStateForm.get('oeOrderLinesAllList').value;

          var amount = arrayControl[i].unitSellingPrice;

          let select = this.taxCategoryList.find(d => d.taxCategoryName === taxCategoryName);

          this.taxCategoryId= select.taxCategoryId;
        console.log(this.taxCategoryId);

          let controlinv = this.InterStateForm.get('taxAmounts') as FormArray;
          var diss = 0;
          if (this.baseAmt !=undefined){
          this.service.taxCalforItem(this.itemId, this.taxCategoryId, diss, this.baseAmt)
            .subscribe(
              (data: any[])  => {
                this.lstInvLineDeatails1 = data;
                console.log(this.lstInvLineDeatails1);
                let controlinv1 = this.InterStateForm.get('taxAmounts') as FormArray;
                this.TaxDetailsArray().clear();
                // alert(data.length);
                for (let i = 0; i < data.length; i++) {
                  var invLnGrp: FormGroup = this.TaxDetailsGroup();
                  controlinv1.push(invLnGrp);
                }
                this.InterStateForm.get('taxAmounts').patchValue(data);
              }
            )
          }
        }
        validateNum(index, j) {
          var arrayControl = this.InterStateForm.get('taxAmounts').value
          // this.TaxDetailsArray().controls[index].get('taxAmounts').value;
          // this.poMasterDtoForm.get('poLines').value
          var value = arrayControl[index].totTaxAmt
          if (value.charAt(0) === '-') {
            alert('Valid Number: ' + value);
          } else {
            alert('Invalid Number: ' + value + ' ' + 'Kindly enter negetive value');
          }
        }
        addDiscount(i) {
          var invLine = this.InterStateForm.get('oeOrderLinesAllList').value
          var arrayControl = this.InterStateForm.get('taxAmounts').value
          const invItemId = arrayControl[0].taxItemId
          const lineNo = arrayControl[0].invLineNo
          this.taxCategoryName = this.taxCategoryList.find(d => d.taxCategoryName === this.taxCategoryName);
          alert(this.taxCategoryId);
          var arrayControltaxAmounts = this.InterStateForm.get('taxAmounts').value;
          // var diss = arrayControltaxAmounts[0].taxAmt;
          var diss = 0;
          // this.baseAmt =0;
          this.segment=this.ItemIdList.find(d => d.SEGMENT === this.segment);
          this.itemId;
          alert(this.itemId);
          let control = this.InterStateForm.get('taxAmounts') as FormArray;
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
                  this.InterStateForm.get('taxAmounts').patchValue(this.taxCalforItem);
                }
                // this.patchResultList(this.poLineTax, this.taxCalforItem);
              });
        }
        transData(val) {
          return val;
        }
        IntterstateSaleOrderSave(){
          const formValue:IinterState = this.transData(this.InterStateForm.value);
          // formValue.flowStatusCode = 'BOOKED';
          this.ouId = Number(sessionStorage.getItem('ouId'));
          // this.emplId = Number(sessionStorage.getItem('emplId'));
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

        OrderFind(orderNumber){
          // alert(orderNumber+'Hi')
          this.op = 'Search';
          this.emplId = Number(sessionStorage.getItem('emplId'))
          this.orderlineDetailsArray().clear();
          this.TaxDetailsArray().clear();
          // this.displaycustAccountNo=false;
          // // this.displaysegment=false;
          // this.displaycreateOrderType=false;
      
          // this.displaysegmentInvType[0]=false;
          this.orderManagementService.counterSaleOrderSearch(orderNumber)
          .subscribe(
            data => {
              this.lstgetOrderLineDetails = data.obj.oeOrderLinesAllList;
              this.lstgetOrderTaxDetails = data.obj.taxAmounts;
              this.allDatastore=data.obj;
              // console.log(this.lstgetOrderLineDetails[0].taxAmounts);
              let control = this.InterStateForm.get('oeOrderLinesAllList') as FormArray;
              let control1 = this.InterStateForm.get('taxAmounts') as FormArray;
              for (let i = 0; i <= this.lstgetOrderLineDetails.length - 1; i++) {
                var oeOrderLinesAllList1: FormGroup = this.orderlineDetailsGroup();
                control.push(oeOrderLinesAllList1);
                // this.displaysegmentInvType[i]=false;
                // this.displaysegmentInvType[i]=false;
                this.displayLineflowStatusCode.push(true);
                this.displayCounterSaleLine.push(false);
            }
            for (let j = 0; j <= this.lstgetOrderTaxDetails.length-1 ; j++) {
              var orderTaxLinesList: FormGroup=this.TaxDetailsGroup();
              control1.push(orderTaxLinesList);
          }
          this.InterStateForm.patchValue(data.obj);
          // this.salesRepName=data.obj.salesRepName;
          this.createOrderType=data.obj.createOrderType;
          this.priceListName=data.obj.priceListName;
          this.transactionTypeName=data.obj.transactionTypeName;
          // for (let k=0; k<this.lstgetOrderLineDetails.length; k++){
          //   let selectTaxCate = this.taxCategoryList.find(d => d.taxCategoryName === this.lstgetOrderLineDetails[k].taxCategoryName);
          //   this.CounterSaleOrderBookingForm.patchValue({taxCategoryName:selectTaxCate.taxCategoryName})
          //   let selectInvType = this.categoryList.find(d => d.type === data.obj.oeOrderLinesAllList[k].invType);
          //   this.CounterSaleOrderBookingForm.patchValue({invType:selectInvType.invType});
          //   var curInvType=selectInvType.invType;
      
          // }
      
          for (let k=0; k<this.lstgetOrderLineDetails.length; k++){
            // alert(this.lstgetOrderLineDetails[k].baseAmt);
            this.InterStateForm.patchValue({baseAmt:this.lstgetOrderLineDetails[k].baseAmt});
          }
          this.InterStateForm.patchValue({orderedDate:data.obj.orderedDate});
          this.InterStateForm.get('orderedDate').disable();
          this.InterStateForm.controls['emplId'].patchValue(Number(sessionStorage.getItem('emplId')));
      
      
      
         if (this.allDatastore.createOrderType === 'Pick Ticket Invoice' || this.allDatastore.createOrderType === 'Direct Invoice' || this.allDatastore.createOrderType === 'Sales Order') {
          // alert('Pick to Invoice');
          // this.displaycounterSaleOrderSave=false;
          // // this.displaycounterSaleOrderSave=false;
          // this.displaycounterSaleAllButtons=false;
          // this.displayaddRow=false;
          // this.displaypickTicketUpdate=false;
          this.InterStateForm.disable();
          this.TaxDetailsArray().disable();
          // alert(this.allDatastore.flowStatusCode);
        //   if (this.allDatastore.flowStatusCode==='BOOKED' && this.allDatastore.paymentType==='IMMEDIATE'){
        //     alert('Hi..')
        //     this.PaymentButton=false;
        //   }
        // }
        // else{
        //   this.CounterSaleOrderBookingForm.enable();
        //   this.displaycounterSaleOrderSave=true;
        //   this.displayaddRow=true;
        //   // this.displayRemoveRow=true;
        //   this.displaysalesRepName=true;
        //   // this.displaytaxCategoryName=true;
        //     this.CounterSaleOrderBookingForm.get('custName').disable();
        //   this.CounterSaleOrderBookingForm.get('mobile1').disable();
        //   this.CounterSaleOrderBookingForm.get('custAccountNo').disable();
        //   this.CounterSaleOrderBookingForm.get('custAddress').disable();
        //   if (this.createOrderType==='Sales Order'){
        //     this.displaysalesRepName=false;
        //   }
        //   else{
        //     this.displaysalesRepName=true;
        //   }
        // }
        // if (this.allDatastore.flowStatusCode==='BOOKED' && this.allDatastore.paymentType==='IMMEDIATE'){
        //   this.PaymentButton=false;
        // }
            }});
      
      }
      
      reservePos(i)
{
  // alert("Hello");
var trxLnArr1 = this.InterStateForm.get('oeOrderLinesAllList').value;
  // var trxLnArr2 = this.moveOrderForm.get('trxLinesList') as FormArray;
  const formValue:IinterState = this.InterStateForm.value;
    let variants = <FormArray>this.orderlineDetailsArray();
    var transtypeid = this.InterStateForm.get('transactionTypeName').value
    var toloc=this.InterStateForm.get('BillLocName').value;
    var locId1=this.locId;
   
      let variantFormGroup = <FormGroup>variants.controls[i];
      variantFormGroup.addControl('transactionType', new FormControl(transtypeid, Validators.required));
      variantFormGroup.addControl('locId', new FormControl(locId1, Validators.required));
      variantFormGroup.addControl('invItemId', new FormControl(trxLnArr1[i].itemId, Validators.required));
      variantFormGroup.addControl('reservedQty', new FormControl(trxLnArr1[i].pricingQty, Validators.required));
      variantFormGroup.addControl('onHandId', new FormControl(trxLnArr1[i].id, Validators.required));
      variantFormGroup.addControl('transactionNumber', new FormControl(toloc, Validators.required));
   
  // var reserveinfo=formValue[0];

  this.service.reservePost(variants.value[i]).subscribe((res:any)=>{
  //  var obj=res.obj;
   if(res.code===200)
   {
    // alert("Record inserted Successfully");
   }
   else{
    if(res.code === 400) {
      // alert("Code already present in data base");
      this.InterStateForm.reset();
    }
   }
  }
  );
}
}
