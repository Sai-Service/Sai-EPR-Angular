import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { MasterService } from 'src/app/master/master.service';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { Location,DatePipe } from "@angular/common";
import { saveAs } from 'file-saver';
import { data } from 'jquery';
// import { SalesOrderobj } from './sales-orderobj';

interface IOrderDetailUpdation {

}

@Component({
  selector: 'app-order-details-updation',
  templateUrl: './order-details-updation.component.html',
  styleUrls: ['./order-details-updation.component.css']
})



export class OrderDetailsUpdationComponent implements OnInit {
  orderDetailsUpdationForm: FormGroup;

  pipe = new DatePipe('en-US');
  now = Date.now();
  public minDate = new Date();
  public stateList: Array<string>[];
  public salesRepNameList: any;
  public ticketNoSearch: any;
  public mainModelList: Array<string>[];
  public VariantSearch: Array<string>[];
  public ColourSearch: any;
  public financeTypeList: any;
  public financerNameList: any = [];
  public YesNoList: Array<string> = [];
  truValueList: any;
  lstOrderHeader:any;
  brokerTypeList: any;
  brokerList: any;
  insTypeList: any = [];


  loginName:string;
  divisionId:number;
  loginArray:string;
  name:string;
  ouName : string;
  locId: number;
  locName : string;
  orgId:number;
  ouId :number;
  deptId:number; 
  emplId :number;

  custPoNumber:string;
  custPoDate:Date;

  csdPoNo:string;
  csdDate:Date;
  csdIndexNo:string;
  msRefType:string;
  msRefNo:string;
  msRefCustNo:string;
  orderNumber:number ;    //=222220210600194;  // INVOICED : 222220910400113
  // orderNumber:number
  orderedDate:Date;
  model:string;
  variant:string;
  color:string;
  fuelType:string;
  salesRepId:number;
  salesRepName:string;
  tlName:string;
  financeType:string;
  financerName:string;
  financeAmt:number;
  emi:number;
  tenure:number;
  downPayment:number;

  exchangeYN:string;
  loyaltyBonus:string;
  exRegNo:string;
  insCharges:number;
  offerPrice:number;
  tvBroker:string;

  accountNo:number;
  custName:string;

  address1:string;
  address2:string;
  address3:string;
  address4:string;
  city:string; 
  state:string;
  pinCd:string;
  title:string;
  contactPerson:string;
  mobile1:string;
  emailId:string;

  custGst:string;
  custPan:string;

  leadTicketNo:string;

  brokerType:string;
  insType:string;
  subDealerId: number;
  subDealerName: string;
  attribute17: string;    // RTO Location


  DisplayfinanceSelectionYes = false;
  DisplayfinanceSelectionYes1 = false;
  Displayexchange = false;
  Displayexchange1 = false;
  saveButton=false;
  DisplaySubDealName=true;
  subDealerDesc:string;
  orderDetailsUpdation(orderDetailsUpdationForm: any) {}
  get f() { return this.orderDetailsUpdationForm.controls }


  constructor(private fb: FormBuilder, private location1: Location, private service: MasterService, private router: Router, private orderManagementService: OrderManagementService) {
    this.orderDetailsUpdationForm = fb.group({ 

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

      custPoNumber:[],
      custPoDate:[],
      csdPoNo:[],
      csdDate:[],
      csdIndexNo:[],
      msRefType:[],
      msRefNo:[],
      msRefCustNo:[],

      orderNumber:[],
      orderedDate:[],
      salesRepId:[],
      salesRepName:[],
      tlName:[],
      leadTicketNo:[],

      model:[],
      variant:[],
      color:[],
      fuelType:[],

      financeType:[],
      financerName:[],
      financeAmt:[],
      emi:[],
      tenure:[],
      downPayment:[],

      exchangeYN:[],
      loyaltyBonus:[],
      exRegNo:[],
      insCharges:[],
      offerPrice:[],
      tvBroker:[],

      accountNo:[],
      custName:[],

      address1:[],
      address2:[],
      address3:[],
      address4:[],
      city:[],
      state:[],
      pinCd:[],
      mobile1:[],
      custGst:[],
      custPan:[],
      emailId:[],

      title:[],
      contactPerson:[],
      contactNum:[],

      brokerType:[],
      insType:[],
      subDealerId:[],
      subDealerName:[],
      attribute17:[],
      subDealerDesc:[],
    })


  }


  ngOnInit(): void {

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
    this.emplId= Number(sessionStorage.getItem('emplId'));
    this.orgId=this.ouId;
    console.log(this.loginArray);
    console.log(this.locId);

    this.service.StateList()
    .subscribe(
      data => {
        this.stateList = data;
        console.log(this.stateList);
      }
    );

    this.service.insTypeListFn()
    .subscribe(
      data => {
        this.insTypeList = data;
        console.log(this.insTypeList);
      }
    );

    this.service.brokerTypeListFn()
    .subscribe(
      data => {
        this.brokerTypeList = data;
        console.log(this.brokerTypeList);
      }
    );


    this.service.YesNoList()
    .subscribe(
      data => {
        this.YesNoList = data;
        console.log(this.YesNoList);
      }
    );

    this.service.salesRepNameList(this.ouId, this.locId, sessionStorage.getItem('deptId'))
    .subscribe(
      data => {
        this.salesRepNameList = data.obj;
        console.log(this.salesRepNameList);
      }
    );

    this.service.mainModelListDivisionWise(sessionStorage.getItem('divisionId'))
    .subscribe(
      data => {
        this.mainModelList = data;
        console.log(this.mainModelList);
      }
    );

    this.orderManagementService.getFinTypeSearch1()
      .subscribe(
        data => {
          this.financeTypeList = data;
          console.log(this.financeTypeList);
        }
      );
  }


  onOptionsSelectedBrokerType(event: any) {
    // alert(event.target.value);
    this.DisplaySubDealName=true;
    var brokerType = event.target.value;
    this.service.brokerListFnNew(brokerType)
      .subscribe(
        data => {
          this.brokerList = data;
          console.log(this.brokerList);
        }
      );
  }


  getPanFromGst(gstn)
  {
    // alert ("gstn :"+gstn);
    var pan1 = gstn.substr(2, 10);
    this.custPan = pan1;
  }

  onOptionsSelectedTL(ticketNo: any) {
    // alert ("ticket id :"+ticketNo);
    var dept1 = Number(sessionStorage.getItem('deptId'));
    if (ticketNo != null) {
      this.orderManagementService.ticketNoSearchFn(ticketNo, dept1)
        .subscribe(
          data => {
            this.ticketNoSearch = data.obj;
            console.log(this.ticketNoSearch);
            this.tlName = this.ticketNoSearch.leadTicketNo;
          }
        );
    }
  }

  onOptionsSelectedColor(variant) {
    this.orderManagementService.ColourSearchFn(variant)
      .subscribe(
        data => {
          this.ColourSearch = data;
          console.log(this.ColourSearch);
          let select = this.ColourSearch.find(d => d.variant === variant);
          this.fuelType = select.fuelType;
        }
      );
  }

  onOptionsSelectedVariant(mainModel) {
     this.orderManagementService.VariantSearchFn(mainModel)
      .subscribe(
        data => {
          this.VariantSearch = data;
          console.log(this.VariantSearch);
        }
      );
    }


    
  financeSelectionYes(event: any) {
    // alert(event.target.value)
    // alert(event)
    if (event.target.value != 'None') {
      this.DisplayfinanceSelectionYes = true;
      this.DisplayfinanceSelectionYes1 = true;
      this.orderManagementService.finananceList(event.target.value, sessionStorage.getItem('divisionId'))
        .subscribe(
          data => {
            this.financerNameList = data;
            console.log(this.financerNameList);
          }
        );
    }
    else {
      this.DisplayfinanceSelectionYes = false;
      this.DisplayfinanceSelectionYes1 = false;
    }
    if (event.target.value === 'None') {
      this.orderDetailsUpdationForm.get('financerName').reset();
      this.orderDetailsUpdationForm.get('financeAmt').reset();
      this.orderDetailsUpdationForm.get('emi').reset();
      this.orderDetailsUpdationForm.get('tenure').reset;
      this.orderDetailsUpdationForm.get('downPayment').reset();
      this.orderDetailsUpdationForm.get('tenure').reset();
    }
  }

  
  exchangeYes(event: any) {
    //  alert(event.target.value);
    if (event.target.value === 'Y') {
      this.Displayexchange = true;
      this.Displayexchange1 = true;
      this.service.truValueListFn()
        .subscribe(
          data1 => {
            this.truValueList = data1;
            console.log(this.truValueList);
          }
        );
    }
    else {
      this.Displayexchange = false;
      this.Displayexchange1 = false;
    }
    if (event.target.value === 'N') {
      this.orderDetailsUpdationForm.get('loyaltyBonus').reset();
      this.orderDetailsUpdationForm.get('exRegNo').reset();
      this.orderDetailsUpdationForm.get('insCharges').reset();
      this.orderDetailsUpdationForm.get('offerPrice').reset();
    }
  }

  serchByOrderNum(orderNumber) {

    this.orderManagementService.getsearchByOrderNoToUpdate(orderNumber)
      .subscribe(
        data => {

          if(data.code===400) {alert(data.obj + " " +data.message);this.saveButton=false; ;return;}
          this.saveButton=true;
          this.lstOrderHeader = data.obj;

          console.log(this.lstOrderHeader);
          this.DisplaySubDealName=false;
          this.orderDetailsUpdationForm.patchValue(this.lstOrderHeader);
          
          // var seldealerdata=this.brokerList.find(d=>d.customerId===this.lstOrderHeader.subDealerId)
          // this.orderDetailsUpdationForm.get('subDealerId').patchValue(seldealerdata.custName);
          
          if(this.lstOrderHeader.model==='CHETAK')
          {
            var name=this.lstOrderHeader.custName.split(' - ');
            this.orderDetailsUpdationForm.get('custName').patchValue(name[1]); 
            this.orderDetailsUpdationForm.get('custName').enable();
          }

          if(data.obj.financeType !='None') {
            var x=data.obj.financeType;
            this.DisplayfinanceSelectionYes=true;

          this.orderManagementService.finananceList(x, sessionStorage.getItem('divisionId'))
           .subscribe(
            data => {
            this.financerNameList = data;
            console.log(this.financerNameList);
          });
            
          } else {this.DisplayfinanceSelectionYes=false;}


          if(data.obj.exchangeYN ==='Y') {
            this.Displayexchange = true;


          } else {this.Displayexchange = false;}
        });
       
      }

      resetMast() {
        window.location.reload();
      }
    
      closeMast() {
        this.router.navigate(['admin']);
      }

      updateMast() {

        var  resp=confirm("Do You Want to Update Sale Order Details ???");

        if(resp==true) {
          this.saveButton=false;

        const formValue: IOrderDetailUpdation = this.orderDetailsUpdationForm.value;
        this.orderManagementService.UpdateOrderDetails(formValue).subscribe((res: any) => {
          if (res.code === 200) {
            alert('Record Updated Successfully');
            this.orderDetailsUpdationForm.disable();
          } else {
            if (res.code === 400) {
              alert('Error While updating Record');
              // this.orderDetailsUpdationForm.reset();
              this.saveButton=true;
            }
          }
        });
      }
    }
}
