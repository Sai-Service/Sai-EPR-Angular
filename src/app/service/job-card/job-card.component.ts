import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';
import { ServiceService } from '../service.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { observable, Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
// import { DecimalPipe,formatNumber } from '@angular/common';
// import {  Inject, LOCALE_ID } from '@angular/core';
// import { of } from 'rxjs/observable/of';
// import 'rxjs/add/observable/of';

interface IjobCard {

  disTypeLab:string;
  labDiscountPer:number;
  labDiscount:number;
  

  disTypeMat:string;
  matDiscountPer:number;
  matDiscout:number;

  jobCardNum: string;
  taxCategoryName: string;
  matStatus: string;
  RegNo: string;
  regNo:string;
  jcType:string;
  srTypeId: number;
  srvAdvisor: string;
  groupId: number;
  pickupLoc: string;
  freePickup: string;
  pickupType: string;
  pickupRemark: string;
  driverName: string;
  chassisNo: string;
  billToAddress: string;
  engineNo: string;
  shipToAddress: string;
  emailId: string;
  contact1: string;
  contact2: string;
  custType: string;
  accountNo: number;
  custName: string;
  variantCode: string;
  colorCode: string;
  mainModel: string;
  dealerName: string;
  dealerSite: string;
  dmsCustId: number;
  ewStartDate: Date;
  ewStatus: string;
  insStatus: string;
  insurerCompId: number;
  insurerSiteId: number;
  insurerSite: string;
  insurerCompName: string;
  insurerCompNo: number;
  insuDate: Date
  oemWarrStatus: string;
  oemExpiryDate: Date;
  cngKitNumber: string;
  cngCylinderNo: string;
  divisionName: string;
  divisionId: number;
  jobStatus: string;
  jobCardDate: Date;
  vin: string;
  groupName: string;
  subTypeId: number;
  bayTyId: number;
  techId: number;
  regDate: Date;
  pickupDate: Date;
 
  promiseDate: Date;
  lastRunKms: number;
  itemId: number;
  ouId: number;
  deptId: number;
  locId: number;
  customerId: number;
  customerSiteId: number;
  // contact1: string;
  taxCategoryId: number;
  insTaxableAmt: number;
  insTotTaxAmt: number;
  insTotAmt: number;
  emplId:number;
  itemTypeLab: string;

  estLabor:number;
  estMaterial:number;
  estTotal:number;
}

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})



export class JobCardComponent implements OnInit {
  jobcardForm: FormGroup;

  pipe = new DatePipe('en-US');
  now = Date.now();
  public minDate = new Date();

  jobCardNum1: string;
  jobCardNum2: string  //='12PU.101-28';
  JobOpenDt:Date;
  // JobOpenDt=this.pipe.transform(Date.now(), 'y-MM-dd');
  regNo1:string   //='MH12EM6088';
  jobStatus1:string //='Invoiced';

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

  estLabor:number=0;
  estMaterial:number=0;
  estTotal:number=0;
  splitRatio :string
  techAdvisor:string;
  regNo: string;
  labTotTaxAmt: number;
  matTaxableAmt: number;
  billableTyId:number;
  matTotTaxAmt: number;
  matTotAmt: number;
  labTaxableAmt: number;
  labTotAmt: number;
  lineNum: number;
  billableTyName: string;
  description: string;
  RegNo: string;
  jobStatus: string;
  taxCategoryId: number;
  taxCategoryName: string;
  // public jobStatus : 'Opened';
  matStatus: string;
  // public matStatus :'No Material';
  

  // jobCardNum: string='0';
  contact1: string;
  jobCardNum: string;
  divisionName: string;
 
  lstcomments: any;
  RegNoList: any;
  RegNoList1: any[];
  RegNoList2: any;
  userList1: any[] = [];
  userList2: any[] = [];
  ecaAmt: number = 0;
  lastkeydown1: number = 0;
  itemTypeLab: string = 'Labor';
  itemTypeMat: string = 'Parts';
  splitFlag: string;
  displaySplit = true;
  displayModal = true;
  displayLabDiscount = true;
  displayMatDiscount = true;
  displayMatDiscount1 = true;
  subscription: any;
  showModal: boolean;
  content: number;
  title: string;
  dmsJcNo: string;
  dmsJCDate: Date;
  owner: string;
  validTillDt: Date;
  bCustAcct: string;
  bCustType: string;
  custType: string;
  bName: string;
  bGstNo: string;
  custserchByRegNoGstNo: string;
  bAdd: string;
  bEmail: string;
  billToAddress: string;
  emailId: string
  bContNo: string;
  bgstType: string;
  bcustomerId: string;
  customerId: string;

  matDiscountPerIns: number=0;
  labDiscountPerIns: number=0;
  labDiscountIns:number=0;
  matDiscoutIns:number=0;

  matDiscountPer: number=0;;
  labDiscountPer: number=0;;
  labDiscount:number=0;;
  matDiscout:number=0;
  accountNo: number;
  custName: string;
  displaylabMatTab = true;
  displaybilling = true;
  displayCustDetails = true;
  displayCustInsDetails = true;
  displayInslinedetails = true;
  displayInsheader = true;
  dispSplitRatio =false;

  showServiceCustomer =true;
  showBodyshopCustomer=false;

  insurerCompId: number;
  insurerSiteId: number;
  insurerSite: string;
  insurerCompName: string;
  insurerCompNo: number;
  demandJob:string;
  recomJob:string;

  lstJobcardList :any[];

  public labDiscountPerList: Array<string> = [];
  public matDiscountPerList: Array<string> = [];
  public jobCarStatusList: Array<string> = [];
  public pickupTypeList: Array<string> = [];
  public srTypeIdList: Array<string> = [];
  public SubSrTypeIdList: Array<string> = [];
  public matStatusList: Array<string> = [];
  public groupIdList: Array<string> = [];
  public billableTyIdList: any[];
  public disCategoryList: Array<string> = [];
  public jcTypeList = [
    { model: "Service" },
    { model: "BS" },
  ];
  public DisTypeMatList = [
    { model: "Percentage" },
    { model: "Amount" },
  ];


  freePickup='No';
  public TechnicianList: any[];
  public LaborItemList: any;
  public splitRatioList: any[];
  public srvAdvisorList: any[];
  public taxCategoryList: any;
  public LaborPriceList: any;
  public accountNoSearch: any;
  bayTypeList:any;
  public splitArr;

  // disTypeLab='Percentage';
  // disTypeMat='Percentage';

  insLabBasicAmt: number;
  insMatBasicAmt: number;
  actualInsAmt: number;

  insTaxableAmt: number;
  insTotTaxAmt: number;
  insTotAmt: number;

  trxLineId: number;
 
  deptName:string;
  serviceModel:string;
  jcOpenDate=this.pipe.transform(Date.now(), 'y-MM-dd');
  vehRegNo:string;
  jcStatus:string;
  pickupType: string=null;
  dispReadyInvoice = false;
  dispButtonStatus = true;
  dispfreezeDetail = true;
  saveBillValidation=false;
  jobHeaderValidation=false;
  labLineValidation =false;
  matLineValidation=false;
  preInvButton=false;
  printInvoiceButton=false;
  saveLabButton=true;
  saveMatButton=true;
  saveBillButton=false;
  genBillButton=false;
  reopenButton=false;
  cancelButton=false;
  cancellationStatus=false;
  showLabdisP=false;
  showMatDisCol=false;
  showMatDisP=false;
  showLabDisCol=false;
 
  

  // public minDatetime = new Date();
  // promiseDate = new Date();
 
  // minDate=new Date();
  // pipe = new DatePipe('en-US');
  // now = Date.now();
  // pickupDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  pickupDate=Date.now();
  jobCardDate = this.pipe.transform(Date.now(), 'dd-MM-y');
  // jobCardDate = Date.now();
  // jobCardDate = this.pipe.transform(this.now, 'y-MM-d');
  
  //public minDatetime=this.pipe.transform(this.promiseDate, 'yyyy-MM-ddThh:mm')
  public minDatetime = moment(new Date()).format('YYYY-MM-DDTHH:mm')
  promiseDate = this.minDatetime;
 
  @ViewChild("myinput") myInputField: ElementRef;
  arInvNum: string;
  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }
  unSaved: boolean = true;
  taxPer: number;
  // @ViewChild('jobcardForm') public createJobcardForm: NgForm;

  get f() { return this.jobcardForm.controls; }

  // jobcard(jobcardForm: any) { }


  constructor(private fb: FormBuilder, private router: Router, private orderManagementService: OrderManagementService, private service: MasterService, private serviceService: ServiceService) {
    this.jobcardForm = fb.group({
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

      jobCardNum1: [],
      jobCardNum2: [],
      JobOpenDt :[],
      regNo1:[],
      jobStatus1:[],

      jcOpenDate:[],
      vehRegNo:[],
      jcStatus:[],
      jobCardNum: [],
      jcType: [],
      jobCardId: [],
      matStatus: [],
      regNo: [],
      RegNo: [],
      srTypeId: [],
      srvAdvisor: [],
      techAdvisor:[],
      groupId: [],
      pickupLoc: [],
      freePickup: [],
      pickupType: [],
      pickupRemark: [],
      driverName: [],
      chassisNo: [],
      billToAddress: [],
      engineNo: [],
      shipToAddress: [],
      emailId: [],
      contact1: [],
      contact2: [],
      custType: [],
      accountNo: [],
      custName: [],
      variantCode: [],
      colorCode: [],
      mainModel: [],
      dealerName: [],
      dealerSite: [],

      demandJob:[],
      recomJob:[],
      
      dmsCustId: [],
      ewStartDate: [],
      ewStatus: [],
      insStatus: [],
      insurerCompId: [],
      insurerCompNo: [],
      insurerCompName: [],
      insurerSite: [],
      insurerSiteId: [],
      insuDate: [],
      oemWarrStatus: [],
      oemExpiryDate: [],
      cngKitNumber: [],
      cngCylinderNo: [],
      divisionName: [],
    
      jobStatus: [''],
      jobCardDate: [],
      vin: [],
      groupName: [],
      subTypeId: [],
      bayTyId: [],
      techId: [],
      regDate: [],
      pickupDate: [],
      promiseDate: [],
      lastRunKms: [],
      itemId: [],

      customerId: [],
      customerSiteId: [],
      dmsJcNo: [],
      dmsJCDate: [],
      validTillDt: [],
      owner: [],
      matDiscountPer: [],
      bCustAcct: [],
      bCustType: [],
      bName: [],
      bGstNo: [],
      bAdd: [],
      bEmail: [],
      bContNo: [],
      bgstType: [],
      bcustomerId: [],
      remark: [],
      estLabor: [],
      estMaterial: [],
      estTotal: [],

      labBasicAmt: [],
      matBasicAmt: [],
      actualBasicAmt: [],

      rountOffLab: [],
      rountOffMat: [],
      rountOffTotl: [],
      variReason: [],

      insLabBasicAmt: [],
      insMatBasicAmt: [],
      actualInsAmt: [],

      gTotLabEstAmt:[],
      gTotMatEstAmt:[],
      gTotEstAmt:[],

      insTaxableAmt: [],
      insTotTaxAmt: [],
      insTotAmt: [],

      disTypeLab: [],
      disTypeMat: [],
      itemTypeLab: [],
      itemTypeMat: [],
      labDiscount: [],
      matDiscout: [],
      labTaxableAmt: [],
      matTaxableAmt: [],
      labTotTaxAmt: [],
      matTotTaxAmt: [],
      labTotAmt: [],
      matTotAmt: [],
      totDis: [],
      totTaxableAmt:[],
      totTaxAmt: [],
      invTotAmt: [],
      ecaAmt: [],
      salvage: [],
      disCategory: [],
      disAuthBy: [],
      balanceAmt: [],
      advAmt: [],
      labDiscountPer: [],
      insLabTaxableAmt:[],
      insLabTotTaxAmt:[],
      insLabTotAmt:[],
      insMatTaxableAmt:[],
      insMatTotTaxAmt:[],
      insMatTotAmt:[],
      insInvTotAmt:[],
      deptName:[],
      serviceModel:[],

      matDiscountPerIns: [],
      labDiscountPerIns: [],
      labDiscountIns:[],
      matDiscoutIns:[],

      jobCardLabLines: this.fb.array([this.lineDetailsGroup()]),
      jobCardMatLines: this.fb.array([this.distLineDetails()]),
      splitAmounts: this.fb.array([this.splitDetailsGroup()])
    })

  }

  lineDetailsGroup() {
    return this.fb.group({
      lineId: [],
      lineNum: [],
      billableTyId: [],
      billableTyName: [],
      taxCategoryName: [],
      segment:[],
      itemId: [],
      uom:[],
      qty: [],
      description: [],
      unitPrice: [],
      basicAmt: [],
      custBasicAmt:[],
      insBasicAmt:[],
      taxAmt:[],
      taxCategoryId: [],
      splitRatio: [],
      custPer: [],
      insPer: [],
      dealerPer: [],
      oemPer: [],
      laborAmt: [],
      frtHrs: [],
      techName: [],
      splitFlag: [],
      splitAmtArr: [],
      taxPer: [],
    });
  }
  splitDetailsGroup() {
    return this.fb.group({
      type: [],
      techId: [],
      // tech2: [],
      // tech3: [],
      // tech4: [],
      // tech5: [],
      // tech6: [],
      // tech7: [],
      // tech8: [],
      techAmt: [],
      techPer: [],
      // tech2Per:[],
      // tech2Amt:[],
      // tech3Per:[],
      // tech3Amt:[],
      // tech4Per:[],
      // tech4Amt:[],
      // tech5Per:[],
      // tech5Amt:[],
      // tech6Per:[],
      // tech6Amt:[],
      // tech7Per:[],
      // tech7Amt:[],
      // tech8Per:[],
      // tech8Amt:[],
      // contr1:[],
      // contr2:[],
      // contr3:[],
      // contr4:[],
      // contr1Per:[],
      // contr2Per:[],
      // contr3Per:[],
      // contr4Per:[],
      // contr1Amt:[],
      // contr2Amt:[],
      // contr3Amt:[],
      // contr4Amt:[],
    });
  }
  // splitDetailsArray(i: number): FormArray {
  //     return this.lineDetailsArray.controls[i].get('splitAmounts') as FormArray
  //   }

  splitDetailsArray(): FormArray {
    return <FormArray>this.jobcardForm.get('splitAmounts')
  }
  get lineDetailsArray() {
    var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
    // (patch.controls[0]).patchValue(
    //   {
    //     lineNum: 1,
    //   }
    // );
    return <FormArray>this.jobcardForm.get('jobCardLabLines')
  }
  addTechRow(index) {
    this.splitDetailsArray().push(this.splitDetailsGroup());
  }
  RemoveTechRow(index) {
    this.splitDetailsArray().removeAt(index);
  }
  distLineDetails() {
    return this.fb.group({
      // invDistributionId: [],
      lineNum: [],
      trxLineId: [],
      billableTyId: [],
      billableTyName: [],
      taxCategoryName: [],
      itemId: [],
      segment: [],
      description: [],
      qty: [],
      unitPrice: [],
      basicAmt: [],
      custBasicAmt:[],
      insBasicAmt:[],
      splitRatio: [],
      custPer: [],
      insPer: [],
      dealerPer: [],
      oemPer: [],
      taxCategoryId: [],
      taxAmt: [],
      taxPer: [],
      totAmt: [],
    })
  }
  lineDistributionArray(): FormArray {
    return <FormArray>this.jobcardForm.get('jobCardMatLines')
  }
  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.owner = sessionStorage.getItem('name')
    this.divisionName = sessionStorage.getItem('divisionName');
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.jobStatus = 'Opened';
    this.emplId=Number(sessionStorage.getItem('emplId'));
    this.deptName=sessionStorage.getItem('deptName');
    this.ouId=Number(sessionStorage.getItem('ouId'));
    this.locId=Number(sessionStorage.getItem('locId'));

    // alert(this.emplId);
    // alert ("Location Id :" +Number(sessionStorage.getItem('locId')));
    // alert ("Location Code :" +sessionStorage.getItem('locCode'));
    // this.jobCardDate=Date.now();

    this.service.taxCategoryListForSALES()
      .subscribe(
        data1 => {
          this.taxCategoryList = data1;
          console.log(this.taxCategoryList);
          data1 = this.taxCategoryList;
        }
      );
    // this.serviceService.jobCarStatusListFn()
    //   .subscribe(
    //     data1 => {
    //       this.jobCarStatusList = data1;
    //       console.log(this.jobCarStatusList);
    //     }
    //   );comment by vinita
    this.serviceService.pickupTypeListFN()
      .subscribe(
        data1 => {
          this.pickupTypeList = data1;
          console.log(this.pickupTypeList);
        }
      );
    // this.serviceService.srTypeIdListFN()
    //   .subscribe(
    //     data1 => {
    //       this.srTypeIdList = data1;
    //       console.log(this.srTypeIdList);
    //     }
    //   );
    this.serviceService.matStatusListFN()
      .subscribe(
        data1 => {
          this.matStatusList = data1;
          console.log(this.matStatusList);
        }
      );

    this.serviceService.matDiscPerListFN()
      .subscribe(
        data1 => {
          this.matDiscountPerList = data1;
          console.log(this.matDiscountPerList);
        }
      );
    this.serviceService.labDiscPerListFN()
      .subscribe(
        data1 => {
          this.labDiscountPerList = data1;
          console.log(this.labDiscountPerList);
        }
      );
    // this.serviceService.srvAdvisorListtFN((sessionStorage.getItem('locId')), (sessionStorage.getItem('deptId')))
    //   .subscribe(
    //     data1 => {
    //       this.srvAdvisorList = data1;
    //       console.log(this.srvAdvisorList);
    //     }
    //   );
    this.serviceService.groupIdListFN((sessionStorage.getItem('locId')), (sessionStorage.getItem('deptId')))
      .subscribe(
        data1 => {
          this.groupIdList = data1;
          console.log(this.groupIdList);
        }
      );
    this.serviceService.RegNoListDividionwiseFN(this.divisionId)
      .subscribe(
        data1 => {
          this.RegNoList1 = data1;
          console.log(this.RegNoList1);
        }
      );
    // this.serviceService.billableTyIdListFN()
    //   .subscribe(
    //     data1 => {
    //       this.billableTyIdList = data1;
    //       console.log(this.billableTyIdList);
    //        let selectbilTy = this.billableTyIdList.find(d => d.billableTyName === 'Customer');
    //   this.lineDetailsGroup();
    //   var patch=this.jobcardForm.get('jobCardLabLines') as FormArray
    //   (patch.controls[0]).patchValue(
    //     {
    //       lineNum: 1,
    //       billableTyId:selectbilTy.billableTyId,
    //       // billableTyName:selectbilTy.billableTyName
    //       // billableTyId:selectbilTy.billableTyName
    //       // ,comment by vinita
    //     }
    //   );
    //     }
    //   );
    this.serviceService.LaborItemListDivisionFN(this.divisionId,this.deptName)
      .subscribe(
        data1 => {
          this.LaborItemList = data1;
          console.log(this.LaborItemList.itemId);
        }
      );
    this.serviceService.splitRatioListFN()
      .subscribe(
        data1 => {
          this.splitRatioList = data1;
          console.log(this.splitRatioList);
        }
      );
    this.serviceService.disCategoryListFn()
      .subscribe(
        data1 => {
          this.disCategoryList = data1;
          console.log(this.disCategoryList);
        }
      );
    this.serviceService.TechnicianListFN((sessionStorage.getItem('locId')))
      .subscribe(
        data1 => {
          this.TechnicianList = data1;
          console.log(this.TechnicianList);
        }
      );


      this.serviceService.bayTypeLst()
      .subscribe(
        data1 => {
          this.bayTypeList = data1;
          console.log(this.bayTypeList);
        }
      );

      




    this.matStatus = 'No Material';
    this.billableTyName = 'Customer';
    var laborLineArr = this.jobcardForm.get('jobCardLabLines') as FormArray;
    laborLineArr.controls[0].patchValue({ billableTyName: 'Customer' });
  }
  splitFlagFlagFn(e) {
    if (e.target.checked === true) {
      // alert('in true');
      this.splitFlag = 'Y'
      this.displaySplit = false;
    }
    if (e.target.checked === false) {
      // alert('in false');
      this.splitFlag = 'N'
      this.displaySplit = true;;
    }
  }

  //   canDeactivate(): Observable<boolean> | boolean {
  // if (this.unSaved) {
  //       const result = window.confirm('There are unsaved changes! Are you sure?');
  //        return Observable.of(result);
  //     }
  //     return true;
  // }

  LoadMatLines(jcn) {
  // alert ("Loading Material Lines...");
  // this.MatImptWip(jcn);
}

  MatImptWip(jobCardNum) {
    alert(jobCardNum);
    var len = this.lineDistributionArray().length;
    this.serviceService.MatImptWipFn(jobCardNum, sessionStorage.getItem('locId'))
      .subscribe(
        data1 => {
          console.log(data1);

          for (let i = 0; i < data1.length - len; i++) {
            // alert('in for')
            var invLnGrp: FormGroup = this.distLineDetails();
            this.lineDistributionArray().push(invLnGrp);
          }
          // data1.forEach(f => {
          //   var invLnGrp: FormGroup = this.distLineDetails();
          //   this.lineDistributionArray().push(invLnGrp);
          // });
          this.jobcardForm.get('jobCardMatLines').patchValue(data1);
          var patch = this.jobcardForm.get('jobCardMatLines') as FormArray;
          for (let i = 0; i <= data1.length; i++) {
            // this.jobcardForm.get('jobCardMatLines').patchValue({lineNum: i+1})change by vinita
            patch.controls[i].patchValue({ lineNum: i + 1 })
          }
          // this.jobCarStatusList = data1;
          // console.log(this.jobCarStatusList);  lineNum
        }
      );
  }

  serchitemId(index){ //// not in use
    var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
    var jclLineArr = this.jobcardForm.get('jobCardLabLines').value;
    var itemSeg=this.jobcardForm.get('segment').value;

    this.service.getItemDetailsByCode(itemSeg)
    .subscribe(
      data1 => {
        if (data1 ===null){
        alert ("Item segment not found in item master")
        } else {
        console.log(data1); }

      })
  }


  serchByitemId(event, i) {
    // alert ("event : "+event + " index :"+i);
    // let select = this.LaborItemList.find(d => d.itemId === event);
    var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
    var serModel=this.jobcardForm.get('serviceModel').value;
    let select = this.LaborItemList.find(d => d.segment === event);
    // alert ("event : "+event + " index :"+i + ","+select.description);
    if(select) {
   
   
    (patch.controls[i]).patchValue({ itemId: select.itemId });
    (patch.controls[i]).patchValue({ description: select.description });
    if(serModel===null)
      {
        serModel='';
      }
    // alert(select.taxCategoryName);
    // (patch.controls[i]).patchValue({ taxCategoryName: select.taxCategoryName})
    this.serviceService.priceListDivisionFN( select.segment,serModel,(sessionStorage.getItem('locId')),(sessionStorage.getItem('ouId')))
      .subscribe(
        data1 => {
          this.LaborPriceList = data1;
          console.log(this.LaborPriceList);
          (patch.controls[i]).patchValue({
            unitPrice: data1.price,
            frtHrs: data1.frtHrs,
            taxCategoryName: data1.taxCategoryName,
            taxCategoryId: data1.taxCategoryId,
            taxPer :data1.taxPer,
          })
          // alert(this.taxCategoryName);
        }
      );
    } else { 
      // alert (event + "-  Labor Item Not found...");
      (patch.controls[i]).patchValue({ itemId: '' });
      (patch.controls[i]).patchValue({ description:''});
      (patch.controls[i]).patchValue({ unitPrice: 0 });
      (patch.controls[i]).patchValue({ qty:0});
      (patch.controls[i]).patchValue({ basicAmt:''});
      (patch.controls[i]).patchValue({ taxCategoryName:''});
      (patch.controls[i]).patchValue({ laborAmt:''});
     return;
       }
  }




  getUserIdsFirstWay($event) {
    let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
    this.userList1 = [];

    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList1 = this.searchFromArray(this.RegNoList1, userId);
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

  jobcard(jobcardForm) {

  }
  technician(techId) {
    let select = this.TechnicianList.find(d => d.teamId === techId);
    // alert(select.description);
    if (select != undefined){
    var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
    (patch.controls[0]).patchValue({ techName: select.description })
  }
  }

 

  onOptionsplitRatioSelect(i, splitCateId) {
    let select = this.splitRatioList.find(d => d.splitCateId === splitCateId);
    var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
    // (patch.controls[i]).patchValue(select)
    (patch.controls[i]).patchValue(
      {
        custPer: select.custPer,
        insPer: select.insPer,
        dealerPer: select.dealerPer,
        oemPer: select.oemPer,
        // billableTyId:selectbilTy,
      }
    );
  }
  onOptionsplitRatioSelect1(i, splitCateId) {
    let select = this.splitRatioList.find(d => d.splitCateId === splitCateId);
    // alert(select.splitCateId);
    var patch = this.jobcardForm.get('jobCardMatLines') as FormArray;
    // (patch.controls[i]).patchValue(select)
    (patch.controls[i]).patchValue(
      {
        custPer: select.custPer,
        insPer: select.insPer,
        dealerPer: select.dealerPer,
        oemPer: select.oemPer,
        // billableTyId:selectbilTy,
      }
    );
  }
  onOptionsrvAdvisorSelected(srvAdvisor) {
    let select = this.srvAdvisorList.find(d => d.srvAdvisor === srvAdvisor);
    // alert(select.groupId);
    //  this.jobcardForm.patchValue(select)
    this.jobcardForm.patchValue({ groupId: select.groupId })
  }

  onOptionBillableSelected(event, jcStatus: string) {
    // alert ( "onOptionBillableSelected :" +event + " , "+jcStatus);
    if(event !=null) {

    if (event=='Service') { this.dispSplitRatio=false;}else {this.dispSplitRatio=true;}

    this.serviceService.srTypeIdstFN(event)
      .subscribe(
        data1 => {
          this.srTypeIdList = data1;
          console.log(this.srTypeIdList);
        }
      );
    var regno = this.jobcardForm.get('regNo').value;
    // alert(regno);

    // if (regno != undefined) {
      this.serviceService.billableTyIdLstFN(event, regno)
        .subscribe(
          data1 => {

            this.billableTyIdList = data1;
            console.log(data1);
            console.log(this.billableTyIdList);
            // alert("-----"+jcStatus);
            if (jcStatus === 'New') {
              let selectbilTy = this.billableTyIdList.find(d => d.billableTyName === 'Customer');
              this.lineDetailsGroup();
              var patch = this.jobcardForm.get('jobCardLabLines') as FormArray
              (patch.controls[0]).patchValue(
                {
                  lineNum: 1,
                  billableTyId: selectbilTy.billableTyId,
                  // billableTyName:selectbilTy.billableTyName
                  // billableTyId:selectbilTy.billableTyName
                  // ,comment by vinita
                }
              );
            }
          }
        );
    // }
    // else {
    //   alert('Please enter correct Registration number');
    // }

    this.serviceService.srvAdvisorListFN((sessionStorage.getItem('locId')), event)
      .subscribe(
        data1 => {
          this.srvAdvisorList = data1;
          console.log(this.srvAdvisorList);
        }
      );
  } }

  onSelectBillType(evnt,index) {

    // alert("Bill type :"+evnt +" , "+index);
  }


  addRow(index) {

    var arrayControl = this.jobcardForm.get('jobCardLabLines').value

    var invItemId = arrayControl[index].itemId;
    // alert("Item Id Jc lab line : "+invItemId +" , "+index);

    this.checkLabLineValidation(index);

    if(this.labLineValidation) {

    // if (invItemId != null ) {

      this.lineDetailsArray.push(this.lineDetailsGroup());
      var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
      var no = this.lineDetailsArray.length;
      let selectbilTy = this.billableTyIdList.find(d => d.billableTyName === 'Customer');
      
      
      (patch.controls[no - 1]).patchValue(
        {
          lineNum: no,
          billableTyId: selectbilTy.billableTyId,
          splitRatio: 1,
          custPer:100,
        }
      );
      
    } else { alert('Incomplete Line.Please update line details and proceed.'); }

    var index = index + 1
    var aa = index + 1;
    var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
    (patch.controls[index]).patchValue(
      {
        // polineNum: aa,
      }
    );

  }

  checkLabLineValidation(index){
    var arrayControl = this.jobcardForm.get('jobCardLabLines').value
    var invItemId = arrayControl[index].itemId;
    this.labLineValidation=false

    // alert ("arrayControl[index].billableTyId :"+arrayControl[index].billableTyId);

    if(Number(arrayControl[index].billableTyId)<=0)
    { this.labLineValidation=false;return; }

    if(invItemId===null || invItemId==undefined || invItemId<=0)
    { this.labLineValidation=false;return; }

    if(Number(arrayControl[index].qty)<=0 ||arrayControl[index].qty===null || arrayControl[index].qty===undefined )
     { this.labLineValidation=false;return; }

    //  if(Number(arrayControl[index].unitPrice)<=0 ||arrayControl[index].unitPrice===null || arrayControl[index].unitPrice===undefined )
    //  { this.labLineValidation=false;return; }

    //  if(Number(arrayControl[index].basicAmt)<=0 ||arrayControl[index].basicAmt===null || arrayControl[index].basicAmt===undefined )
    //  { this.labLineValidation=false;return; }

    //  if(Number(arrayControl[index].laborAmt)<=0 ||arrayControl[index].laborAmt===null || arrayControl[index].laborAmt===undefined )
    //  { this.labLineValidation=false;return; }

    if(this.dispSplitRatio) {
      if(Number(arrayControl[index].splitRatio)<=0 ||arrayControl[index].splitRatio===null || arrayControl[index].splitRatio===undefined )
      { this.matLineValidation=false;alert ("Check SPLIT RATIO");return; }
      }

    this.labLineValidation=true;

  }


  checkMatLineValidation(index){
    var arrayControl = this.jobcardForm.get('jobCardMatLines').value
    var invItemId = arrayControl[index].itemId;
    this.matLineValidation=false

    // alert ("arrayControl[index].billableTyId :"+arrayControl[index].billableTyId);

    if(Number(arrayControl[index].billableTyId)<=0)
    { this.matLineValidation=false; alert ("Check BILL TYPE");
      return;   }

    if(invItemId===null || invItemId==undefined || invItemId<=0)
    { this.matLineValidation=false;alert ("Check ITEMCODE");return; }

    if(Number(arrayControl[index].qty)<=0 ||arrayControl[index].qty===null || arrayControl[index].qty===undefined )
     { this.matLineValidation=false;alert ("Check QTY");return; }
     if(Number(arrayControl[index].unitPrice)<=0 ||arrayControl[index].unitPrice===null || arrayControl[index].unitPrice===undefined )
     { this.matLineValidation=false;alert ("Check UNIT PRICE");return; }

     if(Number(arrayControl[index].basicAmt)<=0 ||arrayControl[index].basicAmt===null || arrayControl[index].basicAmt===undefined )
     { this.matLineValidation=false;alert ("Check BASIC AMT");return; }

     if(Number(arrayControl[index].taxCategoryId)<=0 ||arrayControl[index].taxCategoryId===null || arrayControl[index].taxCategoryId===undefined )
     { this.matLineValidation=false;alert ("Check TAX CATEGORY");return; }

     if(Number(arrayControl[index].taxAmt)<=0 ||arrayControl[index].taxAmt===null || arrayControl[index].taxAmt===undefined )
     { this.matLineValidation=false;alert ("Check TAX AMT");return; }

     if(this.dispSplitRatio) {
     if(Number(arrayControl[index].splitRatio)<=0 ||arrayControl[index].splitRatio===null || arrayControl[index].splitRatio===undefined )
     { this.matLineValidation=false;alert ("Check SPLIT RATIO");return; }
     }

    this.matLineValidation=true;

  }



  // RemoveRow(index) {
  //   if (index === 0) {

  //   } else {
  //     this.lineDetailsArray.removeAt(index);
  //   }
  //   this.lineDetailsArray.removeAt(index);
  // }

  RemoveRow(index) {
    if (index===0){ }
    else {
       this.lineDetailsArray.removeAt(index);
    }
  
  }


  serchByRegNo(RegNo) {
    var jcType=this.jobcardForm.get('jcType').value;
    if(jcType ==='--Select--' || jcType ===null ) {alert ("Please Select Job Card Type...");return;}
 
    this.serviceService.getByRegNo(RegNo, sessionStorage.getItem('ouId'),jcType)
      .subscribe(
        data => {
          this.RegNoList = data.obj;
          if(data.code===400 && data.obj !=null) {alert(data.obj); this.jobcardForm.reset(); return;}
          if(data.code===400 && data.obj ===null) {alert("Please Enter valid Registration Number..."); this.jobcardForm.reset(); return;}
          console.log(this.RegNoList);
       
          this.jobcardForm.patchValue(this.RegNoList);
          this.jobcardForm.patchValue({
            itemId: this.RegNoList.regId,
            customerSiteId: this.RegNoList.customerSiteId,
            ouId: Number(sessionStorage.getItem('ouId')),
            customerId: this.RegNoList.customerId,
            deptId: Number(sessionStorage.getItem('deptId')),
            locId: Number(sessionStorage.getItem('locId')),
            status: 'Opened',
          });
        } 
      );
  }

 


  onOptionsSelectedsrTypeId(srTypeId) {
    // alert( "srTypeId :"+ srTypeId);
    if(srTypeId !=null){
    this.serviceService.getSubSrTypeIdList(srTypeId)
      .subscribe(
        data => {
          this.SubSrTypeIdList = data;
          console.log(this.SubSrTypeIdList);
        }
      );
    if (srTypeId == 5) {
      this.displayCustDetails = false;
      this.displayCustInsDetails = false;
      this.displayInsheader = false;
      this.displayInslinedetails = false;
    }
  }}

  totalActualLabMat() {
    var sum = 0;
    var arrayControl = this.jobcardForm.get('jobCardLabLines').value   // jobCardLabLines jobCardMatLines  lineDetailsArray lineDistributionArray
    for (let i = 0; i < this.lineDetailsArray.length; i++) {
      sum = sum + arrayControl[i].basicAmt;
    }
    var sumMat = 0;
    var arrayControl = this.jobcardForm.get('jobCardMatLines').value
    for (let i = 0; i < this.lineDistributionArray().length; i++) {
      sumMat = sumMat + arrayControl[i].basicAmt;
    }
    this.jobcardForm.patchValue({
      labBasicAmt: sum.toFixed(2),
      matBasicAmt: sumMat.toFixed(2),
      actualBasicAmt: (sum + sumMat).toFixed(2),
    })
  }
  
  Search(jobCardNo) {

    var  jcNum=jobCardNo.toUpperCase();

    this.jobcardForm.reset();
    // this.lineDetailsArray.clear();
    this.jobcardForm.get('jobCardLabLines').reset();
    this.jobcardForm.get('jobCardMatLines').reset();

    var lenLab = this.lineDetailsArray.length;
    var lenMat = this.lineDistributionArray().length;
    // alert("lenLab :" +lenLab + " lenMat :"+lenMat);

    if(lenLab>1) {for (let i = lenLab - 1; i > 0; i--) { this.lineDetailsArray.removeAt(i); }}
    if(lenMat>1) {for (let i = lenMat - 1; i > 0; i--) { this.lineDistributionArray().removeAt(i); }}

  
    
    this.jobCardNum1=jcNum;
   
    this.serviceService.getJonCardNoSearch(jcNum)
      .subscribe(
        data => {
          this.lstcomments = data.obj;
          if (data.code===200) {    
            console.log(this.lstcomments);
            this.dispButtonStatus = false; 
            this.jobStatus = data.obj.jobStatus;
            this.jobCardDate= data.obj.jobCardDate;
            this.jobCardNum1=data.obj.jobCardNum;
            this.arInvNum=data.obj.invoiceNumber;
          } else { alert (jcNum + " Job Card Not Found...");return;}


          // let mToday =this.pipe.transform(new Date(), 'yyyy-MM-dd');
          // let jobDate=this.pipe.transform(this.jobCardDate, 'yyyy-MM-dd');

          if(this.lstcomments.jcType=='Service') {
            this.dispSplitRatio=false; 
            this.showServiceCustomer=true;
            this.showBodyshopCustomer=false;
          }
           else {
             this.dispSplitRatio=true;
             this.showBodyshopCustomer=true;
             this.showServiceCustomer=false;
             }
            

          // this.jobcardForm.patchValue({jcType :  this.lstcomments.jcType});
          this.jobcardForm.get('regNo').disable();
          this.jobcardForm.get('jcType').disable();
        
          this.jobcardForm.patchValue({regNo : data.obj.regNo});
          // var promdate= this.pipe.transform(data.obj.promiseDate,  'yyyy-MM-ddThh:mm');
          var promdate=data.obj.promiseDate;
          this.jobcardForm.patchValue({promiseDate : promdate});
        
          var len = this.lineDistributionArray().length;
          
          for (let i = 0; i <this.lstcomments.jobCardMatLines.length - len; i++) {
            var payInvGrp: FormGroup = this.distLineDetails();
            this.lineDistributionArray().push(payInvGrp);
          }

          var len1 = this.lineDetailsArray.length;

          // alert("lineDetailsArray.length :"+len1);


          for (let i = 0; i < this.lstcomments.jobCardLabLines.length - len1; i++) {
            var payInvGrp: FormGroup = this.lineDetailsGroup();
            this.lineDetailsArray.push(payInvGrp);
          }
          
         

          if (this.lstcomments.lineCnt > 0) {
            this.dispReadyInvoice = true;
            this.dispButtonStatus = false; 
            
          }
         
          if (this.lstcomments.jobCardNum != undefined) {
            this.displaylabMatTab = false;
          }

        
          var tdate=new Date();
          var jdate=new Date(this.jobCardDate);
          var x =jdate.toDateString();
          var y=tdate.toDateString();
            if (this.lstcomments.jobStatus === 'Opened' ){
            this.dispReadyInvoice = true; this.dispButtonStatus=false;this.preInvButton=true; 
              if(x===y) { this.cancelButton=true;}else {this.cancelButton=false;}
          }
       
          if (this.lstcomments.jobStatus == 'Cancelled'  )
          {  this.dispReadyInvoice = false; this.dispButtonStatus=false;this.preInvButton=false;this.cancelButton=false; 
            this.jobcardForm.disable();
            this.jobcardForm.get('jobCardLabLines').disable();
            this.jobcardForm.get('jobCardMatLines').disable();
          }
         
         
          if (this.lstcomments.jobStatus == 'Invoiced' || this.lstcomments.matStatus == 'Compeleted') {
            this.jobcardForm.disable();
            this.jobcardForm.get('jobCardLabLines').disable();
            this.jobcardForm.get('jobCardMatLines').disable();
            this.displaybilling = false;
            this.dispButtonStatus = false;
            this.dispReadyInvoice = false;
            this.printInvoiceButton=true;
            this.genBillButton=false;
            this.saveBillButton=false;
            this.reopenButton=false;
            this.saveLabButton=false;
            this.saveMatButton=false;
            this.preInvButton=false;
            this.cancelButton=false;
              
          }
          if (this.lstcomments.matStatus == 'Compeleted' || this.lstcomments.jobStatus == 'Ready for Invoice') {
            this.jobcardForm.get('jobCardLabLines').disable();
            this.jobcardForm.get('jobCardMatLines').disable();
            this.displaybilling = false;
            this.dispButtonStatus = false;
            this.dispReadyInvoice = true;
            this.printInvoiceButton=false;
            this.saveBillButton=true;
            this.genBillButton=false;
            this.reopenButton=true;
            this.saveLabButton=false;
            this.saveMatButton=false;
            this.preInvButton=true;
            this.cancelButton=false;
           
          }

      

          this.jobcardForm.patchValue(this.lstcomments);
         
          var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
          // alert('jobCardLabLines length---'+data.jobCardLabLines.length)

          for (let ln=0; ln < data.obj.jobCardLabLines.length; ln++) {
            // alert('inside loop'+ln)
            // let selectbilTy = this.billableTyIdList.find(d => d.billableTyId === data.jobCardLabLines[ln].billableTyId);
            // patch.controls[ln].patchValue({ billableTyId: selectbilTy.billableTyName });
            this.onOptionsplitRatioSelect(ln,data.obj.jobCardLabLines[ln].splitCateId);
            var lbrAmt=(data.obj.jobCardLabLines[ln].totAmt).toFixed(2);
            patch.controls[ln].patchValue({laborAmt:lbrAmt});

          }

          this.jobcardForm.patchValue({labBasicAmt: this.lstcomments.labBasicAmt});
          this.jobcardForm.patchValue({matBasicAmt: this.lstcomments.matBasicAmt});
          this.jobcardForm.patchValue({actualBasicAmt: Math.round((Number(this.lstcomments.totBasicAmt)+Number.EPSILON)*100)/100});
   
          
          var gTotLabEstAmt1=this.lstcomments.labBasicAmt+this.lstcomments.insLabBasicAmt;
          var gTotMatEstAmt1=this.lstcomments.matBasicAmt+this.lstcomments.insMatBasicAmt;
          var gTotEstAmt1=this.lstcomments.totBasicAmt+this.lstcomments.insTotBasicAmt;


          this.jobcardForm.patchValue({

            gTotLabEstAmt:Math.round((gTotLabEstAmt1+Number.EPSILON)*100)/100, 
            gTotMatEstAmt:Math.round((gTotMatEstAmt1+Number.EPSILON)*100)/100, 
            gTotEstAmt:Math.round((gTotEstAmt1+Number.EPSILON)*100)/100, 

            labDiscount: Math.round((this.lstcomments.labDiscount+Number.EPSILON)*100)/100, 
            labTaxableAmt: Math.round((this.lstcomments.labTaxableAmt+Number.EPSILON)*100)/100, 
            labTotTaxAmt: Math.round((this.lstcomments.labTotTaxAmt+Number.EPSILON)*100)/100,
            labTotAmt: Math.round((this.lstcomments.labTotAmt+Number.EPSILON)*100)/100, 

            matDiscout: Math.round((this.lstcomments.matDiscout+Number.EPSILON)*100)/100,
            matTaxableAmt: Math.round((this.lstcomments.matTaxableAmt+Number.EPSILON)*100)/100, 
            matTotTaxAmt: Math.round((this.lstcomments.matTotTaxAmt+Number.EPSILON)*100)/100, 
            matTotAmt: Math.round((this.lstcomments.matTotAmt+Number.EPSILON)*100)/100, 
           
            actualInsAmt: Math.round((this.lstcomments.insTotBasicAmt+Number.EPSILON)*100)/100, 
            insTaxableAmt:Math.round(((this.lstcomments.insMatTaxableAmt + this.lstcomments.insLabTaxableAmt)+Number.EPSILON)*100)/100, 
            insTotTaxAmt: Math.round(((this.lstcomments.insLabTotTaxAmt + this.lstcomments.insMatTotTaxAmt)+Number.EPSILON)*100)/100, 
            insInvTotAmt: Math.round((this.lstcomments.insInvTotAmt+Number.EPSILON)*100)/100, 

            insLabTaxableAmt:Math.round((this.lstcomments.insLabTaxableAmt+Number.EPSILON)*100)/100,
            insLabTotTaxAmt:Math.round((this.lstcomments.insLabTotTaxAmt+Number.EPSILON)*100)/100,
            insLabTotAmt:Math.round((this.lstcomments.insLabTotAmt+Number.EPSILON)*100)/100,

            insMatTaxableAmt:Math.round((this.lstcomments.insMatTaxableAmt+Number.EPSILON)*100)/100,
            insMatTotTaxAmt:Math.round((this.lstcomments.insMatTotTaxAmt+Number.EPSILON)*100)/100,
            insMatTotAmt:Math.round((this.lstcomments.insMatTotAmt+Number.EPSILON)*100)/100,

          })

               
          // var control = this.jobcardForm.get('jobCardLabLines').value;
          // var totlabtaxamt = 0;
          // var totlabDiscAmt=0
          // for (var i = 0; i < control.length; i++) {
          //     totlabtaxamt = totlabtaxamt + (control[i].basicAmt * control[i].taxPer) / 100;
          //   }

          // this.labTotAmt=this.labTaxableAmt + totlabtaxamt
          // this.jobcardForm.patchValue({
          //   labTotTaxAmt: Math.round((totlabtaxamt+Number.EPSILON)*100)/100,
          //   labTotAmt: Math.round((this.labTotAmt+Number.EPSILON)*100)/100, 
          // })

        
          // var control = this.jobcardForm.get('jobCardMatLines').value;
          // var totmattaxamt = 0;var totMatDiscAmt=0
          //  for (var i = 0; i < control.length; i++) {
          //   totmattaxamt = totmattaxamt + (control[i].basicAmt * control[i].taxPer) / 100;
          //     }

          // this.matTotAmt= this.matTaxableAmt + totmattaxamt;
          // this.jobcardForm.patchValue({
          //   matTotTaxAmt: Math.round((this.matTotAmt+Number.EPSILON)*100)/100,
          //   matTotAmt: Math.round((this.matTotAmt+Number.EPSILON)*100)/100
          //  });


          var disTotal = Number(this.lstcomments.labDiscount)+Number(this.lstcomments.matDiscout);   
          var itotTxble=Number(this.lstcomments.matTaxableAmt)+Number(this.lstcomments.labTaxableAmt);
          var itotTaxAmt=Number(this.lstcomments.labTotTaxAmt)+Number(this.lstcomments.matTotTaxAmt)
          var totInvAmt=Number(this.lstcomments.labTotAmt)+Number(this.lstcomments.matTotAmt);

          this.jobcardForm.patchValue({totDis: Math.round((disTotal+Number.EPSILON)*100)/100}); 
          this.jobcardForm.patchValue({totTaxableAmt: Math.round((itotTxble+Number.EPSILON)*100)/100}); 
          this.jobcardForm.patchValue({totTaxAmt: Math.round((itotTaxAmt+Number.EPSILON)*100)/100});
          this.jobcardForm.patchValue({invTotAmt: Math.round((totInvAmt+Number.EPSILON)*100)/100}); 

               
        }
      );


    // this.totalActualLabMat();
  } 
  // onOptionTaxCatSelected(i, taxCategoryName) {
  //   let select = this.taxCategoryList.find(d => d.taxCategoryName === taxCategoryName);
  //   this.taxCategoryId= select.taxCategoryId;
  //  }
  //   onOptionTaxCatSelected(i, taxCategoryName) {
  //   var arrayControl = this.arInvoiceForm.get('invLines').value;
  //   var patchtaxDetail =this.arInvoiceForm.get('taxLines') as FormArray;
  //   let selectedValue = this.taxCategoryList.find(v => v.taxCategoryName == taxCategoryName);
  //   this.taxCategoryId = selectedValue.taxCategoryId
  //   var patch = this.arInvoiceForm.get('invLines') as FormArray;
  //   (patch.controls[i]).patchValue(
  //     {
  //       taxCategoryId: Number(this.taxCategoryId),
  //     });
  //   this.itemId= arrayControl[i].itemId;
  //   this.invLineNo =arrayControl[i].lineNum;
  //   var itemId = arrayControl[i].itemId;
  //   var diss = 0;
  //   var sum = 0;
  //   var baseAmount = arrayControl[i].basicAmt
  //   this.service.taxCalforItem(itemId, this.taxCategoryId, diss, baseAmount)
  //     .subscribe(
  //       (data: any[]) => {
  //         this.taxCalforItem = data;
  //         console.log(this.taxCalforItem);
  //         // alert(this.taxCalforItem.length);
  //         for (let i = 0; i < this.taxCalforItem.length; i++) {

  //           if (this.taxCalforItem[i].totTaxPer != 0) {
  //             sum = sum + this.taxCalforItem[i].totTaxAmt
  //           }
  //         }
  //         (patch.controls[i]).patchValue({
  //           baseAmtLineWise: arrayControl[i].baseAmtLineWise,
  //           taxAmtLineWise: sum,
  //           totAmtLineWise: arrayControl[i].baseAmtLineWise + sum,
  //         });

  //       });

  //       this.patchResultList(i, this.taxCalforItem);
  //       for(let i=0; i<this.TaxDetailsArray().length; i++){
  //       patchtaxDetail.controls[i].patchValue({taxItemId :this.itemId, invLineNo:this.invLineNo })}
  // }
  clearFormArray() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }

  tranceFun(val) {
    val.billToCust = {
      "customerId": this.bcustomerId,
      "accountNo": this.bCustAcct,
      "custName": this.bName,
      "custType": this.bCustType,
      "billToAddress": this.bAdd,
      // "shipToAddress": "Phugewadi Near Nshikphata null Pune-411022",
      // "billToLocId": null,
      // "shipToLocId": null,
      // "panNo": "AAACI7904G",
      "gstNo": this.bGstNo,
      // "tanNo": null,
      "emailId": this.bEmail,
    }
    return val
  }
  accountNoSearchfn1(accountNo) {
    this.orderManagementService.accountNoSearchFn1(accountNo, sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.accountNoSearch = data;
          console.log(this.accountNoSearch);
          this.jobcardForm.patchValue({
            bCustAcct: this.accountNoSearch.accountNo,
            bCustType: this.accountNoSearch.custType,
            bName: this.accountNoSearch.custName,
            bGstNo: this.accountNoSearch.gstNo,
            bAdd: this.accountNoSearch.billToAddress,
            bEmail: this.accountNoSearch.emailId,
            bContNo: this.accountNoSearch.contactNo,
            bgstType: this.accountNoSearch.gstType,
            bcustomerId: this.accountNoSearch.customerId,
          });
        }
      );
  }
  transData(val) {
    delete val.lineDetailsArray;
    return val;
  }

  // var prcLineArr = this.priceListMasterForm.get('priceListDetailList').value;
  // var len1=prcLineArr.length;
  
  // for (let i = 0; i < len1 ; i++) 
  //   {
  //     this.CheckLineValidations(i);
  //     if(this.lineValidation===false) {break;}
  //   }

  

  saveLine() {

    if( this.jobStatus != 'Opened') { alert (" JC status is 'Ready For Invoice'\nLabour add/update not allowed ...");return;}

  var jclArr = this.jobcardForm.get('jobCardLabLines').value;
  var len1=jclArr.length;
   
  for (let i = 0; i < len1 ; i++) 
    {
      this.checkLabLineValidation(i);
      if(this.labLineValidation===false) {break;}
    }

   if(this.labLineValidation) {

    const formValue: IjobCard = this.tranceFun(this.jobcardForm.value);
    formValue.emplId = Number(sessionStorage.getItem('emplId'));
    this.serviceService.lineWISESubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        // this.lineDetailsArray.clear();
        

        // alert('LINE WISE RECORD INSERTED SUCCESSFUILY');
       
        // alert(this.lineDetailsArray.length+ " length")
        //Following comment by vinita///
        // var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
        // console.log(res.obj.jobCardLinesList);
        // if(res.obj.jobCardLinesList.itemType='Labor')
        // {
        // for(let i=0 ; i<res.obj.jobCardLinesList.length; i++){
        //   var invLnGrp: FormGroup = this.lineDetailsGroup();
        //             this.lineDetailsArray.push(invLnGrp);
        //             // let select = this.splitRatioList.find(d => d.splitCateId === res.obj.jobCardLinesList[i].splitCateId);
        //             // this.onOptionsplitRatioSelect1(i,res.obj.jobCardLinesList[i].splitCateId)
        // //  patch.controls[i].patchValue({splitRatio:select.billingNature});
        //  let selectbilTy = this.billableTyIdList.find(d => d.billableTyId === res.obj.jobCardLinesList[i].billableTyId);
        //     patch.controls[i].patchValue({ billableTyId: selectbilTy.billableTyName });
        // }
        // this.jobcardForm.get('jobCardLabLines').patchValue(res.obj.jobCardLinesList);
        // }
        var jobNo = this.jobcardForm.get('jobCardNum').value;
        this.Search(jobNo);
        this.dispReadyInvoice = true;
        // patch.patchValue(res.obj.jobCardLinesList);
        // obj.jobCardLinesList
      } else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    });
    } else { alert ("Please add Labor details and Proceed...");}
 }

  saveMaterial() {

    var jcmArr = this.jobcardForm.get('jobCardMatLines').value;
    var len1=jcmArr.length;
     
    for (let i = 0; i < len1 ; i++) 
      {
        this.checkMatLineValidation(i);
        if(this.matLineValidation===false) {break;}
      }

      if(this.matLineValidation) {

    const formValue: IjobCard = this.tranceFun(this.jobcardForm.value);
    formValue.emplId = Number(sessionStorage.getItem('emplId'));
    this.serviceService.saveMaterialSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);   //
        // this.lineDistributionArray().clear();
        console.log(res.obj.jobCardLinesList);
        var patch = this.jobcardForm.get('jobCardMatLines') as FormArray;
        console.log(res.obj.jobCardLinesList.length);
        var jobNo = this.jobcardForm.get('jobCardNum').value;
        this.Search(jobNo);
        this.dispReadyInvoice = true;
        // for(let i=0 ; i<res.obj.jobCardLinesList.length; i++){
        //      var invLnGrp: FormGroup = this.distLineDetails();
        //         this.lineDistributionArray().push(invLnGrp);
        // }comment by vinita

        // for(let i=0 ; i<res.obj.jobCardLinesList.length; i++){
        //   var invLnGrp: FormGroup = this.distLineDetails();
        //             this.lineDistributionArray().push(invLnGrp);
        // }
        // this.jobcardForm.get('jobCardMatLines').patchValue(res.obj.jobCardLinesList);comment by vinita
      } else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    });
  } else  { alert ("Please add Material details and Proceed...");}
  }

  updateArInvoice() {
       const formValue: IjobCard = this.tranceFun(this.jobcardForm.value);
        formValue.emplId = Number(sessionStorage.getItem('emplId'));
        formValue.dmsCustId = Number(this.jobcardForm.get('dmsCustId').value);
      var matDis=this.jobcardForm.get('matDiscout').value;
      var labDis=this.jobcardForm.get('labDiscount').value;
        alert ( "matDis,labDis :" +matDis +","+labDis);
      if(this.dispReadyInvoice===false) {alert( "Updation Not allowed...");  return;}

        var jcId =this.jobcardForm.get("jobCardId").value
        var jtype =this.jobcardForm.get('jcType').value
             
      // {alert("Update Jcard....wip..."+jcId); 

      this.serviceService.jobcardUpdateSubmit(formValue).subscribe((res: any) => {
        if (res.code === 200) { alert(res.message);  } else  {
        if (res.code === 400) { alert(res.message); }
        }

      });
      } 

  CheckJobHraderValidation(){
    const formValue: IjobCard = this.tranceFun(this.jobcardForm.value);
    var msg1;
    if (formValue.regNo === undefined || formValue.regNo === null) {this.jobHeaderValidation = false;
      msg1="REGISTRATION NO: Should not be null....";alert(msg1);return;
    }

    if (formValue.vin === undefined || formValue.vin === null) {this.jobHeaderValidation = false;
      msg1="VIN: Should not be null....";alert(msg1);return;
    }

    if (formValue.lastRunKms === undefined || formValue.lastRunKms === null || formValue.lastRunKms <=0) {this.jobHeaderValidation = false;
      msg1="OMR: Should be above zero....";alert(msg1);return;
    }

    this.validateKm()

    if (formValue.jcType === undefined || formValue.jcType === null ) {this.jobHeaderValidation = false;
      msg1="JOB TYPE: Should not be null....";alert(msg1);return;
    }

    if (formValue.srTypeId === undefined || formValue.srTypeId === null ||formValue.srTypeId <=0) {this.jobHeaderValidation = false;
      msg1="SERVICE TYPE: Should not be null....";alert(msg1);return;
    }

    if (formValue.subTypeId === undefined || formValue.subTypeId === null ||formValue.subTypeId <=0) {this.jobHeaderValidation = false;
      msg1="SUB SERVICE TYPE: Should not be null....";alert(msg1);return;
    }

    if (formValue.srvAdvisor === undefined || formValue.srvAdvisor === null ) {this.jobHeaderValidation = false;
      msg1="SERVICE ADVISOR: Should not be null....";alert(msg1);return;
    }

    if (formValue.groupId === undefined || formValue.groupId === null ||formValue.groupId <=0 ) {this.jobHeaderValidation = false;
      msg1="SERVICE GROUP: Should not be null....";alert(msg1);return;
    }

    if (formValue.bayTyId === undefined || formValue.bayTyId === null ||formValue.bayTyId <=0 ) {this.jobHeaderValidation = false;
      msg1="SERVICE BAY: Should not be null....";alert(msg1);return;
    }

    if (formValue.techId === undefined || formValue.techId === null ||formValue.techId <=0 ) {this.jobHeaderValidation = false;
      msg1="SERVICE TECHNICIAN: Should not be null....";alert(msg1);return;
    }

    if(formValue.freePickup=='Yes' && (formValue.pickupType==null || formValue.pickupType==undefined)){this.jobHeaderValidation = false;
      msg1="PICKUP TYPE : Should not be null....";alert(msg1);return;}
    
      if(formValue.estLabor <0 ){this.jobHeaderValidation = false;
      msg1="ESTIMATED  LABOUR : Enter Valid Est.Labour Amt....";alert(msg1);return;}
    
      if(formValue.estMaterial <0 ){this.jobHeaderValidation = false;
        msg1="ESTIMATED  MATERIAL : Enter Valid Est.Material Amt....";alert(msg1);return;}
      
       
    
    
      this.jobHeaderValidation=true;

  }

  saveArInvoice() {
    const formValue: IjobCard = this.tranceFun(this.jobcardForm.value);
    this.CheckJobHraderValidation()
    if(this.jobHeaderValidation) {

    formValue.emplId = Number(sessionStorage.getItem('emplId'));
    formValue.dmsCustId = Number(this.jobcardForm.get('dmsCustId').value);
    //  this.jobStatus='Opened';
    formValue.jobStatus = 'Opened';
    formValue.matStatus = 'No Material';
    this.dispButtonStatus=false;
    //  formValue.matStatus= (this.jobcardForm.get('matStatus').value);
    this.serviceService.jobcardHeaderSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        this.preInvButton=true;
        this.dispButtonStatus=false
        this.cancelButton=true;
        this.saveMatButton=false;
        this.saveLabButton=false;
        this.jobcardForm.disable();
        alert(res.message);
        this.jobcardForm.patchValue({ jobCardNum: res.obj.jobCardNum, jobCardId: res.obj.jobCardId })
        if (res.obj.jobCardNum != undefined) {
          this.displaylabMatTab = false;
        }
        // this.dispfreezeDetail = false;
        // window.location.reload();
        // this.LocationMasterForm.reset();
      } else {
        if (res.code === 400) { this.dispButtonStatus=true;
          alert(res.message);
          // this.LocationMasterForm.reset();
          // window.location.reload();
        }
      }
    });
  } else {alert ("Please Update Job Header Details and Proceed...");}
  }


  openCodeComb(i) {
    this.displayModal = false;
    this.showModal = true; // Show-Hide Modal Check
    this.content = i; // Dynamic Data
    let a = i + 1
    this.title = a;
  }
  fnCancatination(content) {
    var jobCardLabLinesControl = this.jobcardForm.get('jobCardLabLines').value;
    var lineTotAmt = jobCardLabLinesControl[content].basicAmt;
    var splitControl = this.jobcardForm.get('splitAmounts').value;
    var techTotAmt = 0;
    for (let i = 0; i < this.splitDetailsArray().length; i++) {
      techTotAmt = techTotAmt + splitControl[i].techAmt;
    }
    if (techTotAmt == lineTotAmt) {
      this.splitArr = this.lineDetailsArray.value[0];
      console.log(this.splitDetailsArray());
      this.splitArr.splitArrObj = this.splitDetailsArray().value[0];
      console.log(this.splitArr);
      // this.lineDetailsArray.controls[0].splitAmtArr =this.splitArr;
      let variantFormGroup = <FormGroup>this.lineDetailsArray.controls[content];
      console.log(this.splitDetailsArray().length);
      variantFormGroup.addControl('splitArr', new FormControl(this.splitDetailsArray().value))
      console.log(this.lineDetailsArray);

      // this.lineDetailsArray.push(this.splitDetailsGroup());
      // splitDetailsArray
    } else {
      alert("Distribution amount mismatch")
    }
  }
  clearlabLineFormArray() {
    this.splitDetailsArray().clear();
    this.lineDetailsArray.reset();

  }
  clearMatLineFormArray() {
    // this.lineDetailsArray.clear();
    this.lineDetailsArray.reset();
  }

  onOptionsDisTypeMatSelected(event) {
   
    if(this.saveBillButton) {
    if (event === 'Percentage') {
        this.showMatDisCol=false;
        this.showMatDisP=true;
      this.jobcardForm.patchValue({matDiscout:0});
      
    }
    else if (event === 'Amount') {
      this.showMatDisP=false;
      this.showMatDisCol=true;
      this.jobcardForm.patchValue({matDiscountPer:0})
     
    }

    if (event === '--Select--') {
      this.displayMatDiscount = false;
      this.showMatDisCol=false;
      this.showMatDisP=false;
      this.showLabdisP=false;
      this.showLabDisCol=false;
      // this.jobcardForm.get('matDiscout').disable();
      // this.jobcardForm.get('matDiscountPer').disable();
      this.jobcardForm.patchValue({matDiscout:0})
      this.jobcardForm.patchValue({matDiscountPer:0})
    }
  }

    // if(this.lstcomments.jobStatus == 'Invoiced') {
    //   alert ("this.lstcomments.jobStatus :" +this.lstcomments.jobStatus);
  
    //   this.jobcardForm.get('matDiscountPer').disable();
    //   this.jobcardForm.get('labDiscountPer').disable();
    // }
  }

  onOptionsDisTypeLabSelected(event) {
    if(this.saveBillButton) {
    if (event === 'Percentage') {
      this.showLabDisCol=false;
      this.showLabdisP=true;
      this.jobcardForm.patchValue({labDiscount:0})
      this.jobcardForm.patchValue({labDiscountPer:0})
       this.labDiscountPerCal(0) ;
        
     
    }
    if (event === 'Amount') {
      this.showLabDisCol=true;
      this.showLabdisP=false;
      this.jobcardForm.patchValue({labDiscount:0})
      this.jobcardForm.patchValue({labDiscountPer:0})
      this.labDiscountAmtCal(0);
    }

    if (event === '--Select--') {
      this.displayLabDiscount = true;
      // this.jobcardForm.get('labDiscount').disable();
      // this.jobcardForm.get('labDiscountPer').disable();
      this.showLabDisCol=false;
      this.jobcardForm.patchValue({labDiscount:0})
      this.jobcardForm.patchValue({labDiscountPer:0})
    }


  
    var labBasicAmt = Number(this.jobcardForm.get('labBasicAmt').value);
    var matBasicAmt = Number(this.jobcardForm.get('matBasicAmt').value)
    this.jobcardForm.patchValue({ actualBasicAmt: Math.round(labBasicAmt + matBasicAmt) })
  }

    // if(this.lstcomments.jobStatus == 'Invoiced') {

    //   this.jobcardForm.get('matDiscountPer').disable();
    //   this.jobcardForm.get('labDiscountPer').disable();
    
    // }
  }

  ReopenMaterialIssue() {
    var matStatus = this.jobcardForm.get('matStatus').value;
    var jobcardNo = this.jobcardForm.get('jobCardNum').value;
    // alert(matStatus + ' ' + jobcardNo);
    if (matStatus == 'Compeleted') {
      this.serviceService.ReopenMaterialIssue(jobcardNo, matStatus).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          // this.jobcardForm.patchValue({jobCardNum:res.obj.jobCardNum})
        } else {
          if (res.code === 400) {
            alert(res.message);
          }
        }
      });
    } else {
      alert("Material status not completed")
    }
  }


  GenerateInvoice(jobCardNum) {
    this.genBillButton=false;

    this.saveBillButton=false;
    this.preInvButton=false;
    this.reopenButton=false;

    this.serviceService.GenerateInvoiceFN(jobCardNum).subscribe((res: any) => {
      if (res.code === 200) {
        this.printInvoiceButton=true;
        this.saveBillButton=false;
        this.preInvButton=false;
        this.reopenButton=false;
        alert(res.message);
        this.arInvNum = res.obj;
      } else {
        if (res.code === 400) {
          this.genBillButton=true;

          this.saveBillButton=true;
          this.preInvButton=true;
          this.reopenButton=true;
          alert(res.message);
        }
      }
    });
  }

  CheckSaveBillValidation() {
    const formValue: IjobCard = this.jobcardForm.value;
    var msg1;
    // alert ("formValue.labDiscountPer :"+formValue.labDiscountPer);
    // alert ("formValue.matDiscountPer :"+formValue.matDiscountPer);

    // var jtype =this.jobcardForm.get('jcType').value;
    // if(jtype==='Service') {
     
    if(formValue.disTypeLab=='Percentage' && (formValue.labDiscountPer <=0 )){this.saveBillValidation = false;
      msg1="DISCOUNT : Should not be null....";alert(msg1);return;}
    if(formValue.disTypeLab=='Amount' && (formValue.labDiscount<=0)){this.saveBillValidation = false;
        msg1="DISCOUNT AMT: Enter Valid Discount Amt...";alert(msg1);return;}

    if(formValue.disTypeMat=='Percentage' && (formValue.matDiscountPer<=0 )){this.saveBillValidation = false;
      msg1="DISCOUNT : Should not be null....";alert(msg1);return;}
    if(formValue.disTypeMat=='Amount' && (formValue.matDiscout<=0 )){this.saveBillValidation = false;
        msg1="DISCOUNT AMT: Enter Valid Discount Amt...";alert(msg1);return;}

    this.saveBillValidation=true;
  
  }


  BillingCal() {


   this.CheckSaveBillValidation()
    if(this.saveBillValidation) {
    // this.saveBillButton=false;
  
    const formValue: IjobCard = this.tranceFun(this.jobcardForm.value);
    this.serviceService.BillingCal(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        this.genBillButton=true;this.reopenButton=false;
        alert(res.message);
        this.jobcardForm.disable();
      } else {
        if (res.code === 400) {
          this.saveBillButton=true;this.reopenButton=true;
          alert(res.message);
        }
      }
    });
  }
  }

  applyDiscnt() {
     this.CheckSaveBillValidation()
     if(this.saveBillValidation) {
     const formValue: IjobCard = this.tranceFun(this.jobcardForm.value);
     this.serviceService.BillingCal(formValue).subscribe((res: any) => {
       if (res.code === 200) {
          alert(res.message);
         this.jobcardForm.disable();
       } else {
         if (res.code === 400) {
             alert(res.message);
         }
       }
     });
    }
   }

  jobCardStatusClose() {

    //  labDiscountPerCal
    // var matStatus= this.jobcardForm.get('matStatus').value;
    var status = 'Ready for Invoice';
    var jobcardNo = this.jobcardForm.get('jobCardNum').value;
    // this.jobcardForm.get('matDiscout').disable();
    // this.jobcardForm.get('labDiscount').disable();
    // alert(matStatus+' '+jobcardNo);
    // if(matStatus == 'Compeleted'){
      this.dispReadyInvoice=false;  this.saveBillButton=true;
      this.cancelButton=false;
    this.serviceService.jobCardStatusReadyInvoice(jobcardNo, status).subscribe((res: any) => {
      if (res.code === 200) {
        // alert(res.message);
        this.jobcardForm.patchValue({ jobStatus: 'Ready for Invoice' });
        this.displaybilling = false;  this.dispButtonStatus = false;this.reopenButton=true;
        this.saveLabButton=false;
        this.saveMatButton=false;
      
        // this.jobcardForm.patchValue({jobCardNum:res.obj.jobCardNum})
      } else {
        if (res.code === 400) {
          this.dispReadyInvoice=true; this.saveBillButton=false;this.reopenButton=false;
          alert(res.message);
        }
      }
    });
    // }else{
    //   alert("Material status not completed")
    // }
  }


  labDiscountPerCal(event) {
    // if(this.lstcomments.jobStatus == 'Invoiced') { return;}

    // alert("labDiscountPerCal :"+ event);
    if(event==='--Select--') {event=0;}

    var labBasicAmt = (this.jobcardForm.get('labBasicAmt').value)
    // var labtaxper=(this.jobcardForm.get('taxPer').value)
    var controlArr = this.jobcardForm.get('jobCardLabLines').value;
   
    var matTotAt = this.jobcardForm.get('matTotAmt').value;
    var totlabtaxamt = 0;
    var jct=this.jobcardForm.get('jcType').value;
    
    if(jct==='Service'){
    for (var i = 0; i < controlArr.length; i++) {
      var basictax = (controlArr[i].basicAmt * event) / 100;
      totlabtaxamt = totlabtaxamt + ((controlArr[i].basicAmt - basictax) * controlArr[i].taxPer) / 100;
      
    }}

    if(jct==='BS'){
      for (var i = 0; i < controlArr.length; i++) {
        var basictax = Number(controlArr[i].custBasicAmt * event) / 100;
        totlabtaxamt = totlabtaxamt + (Number((controlArr[i].custBasicAmt) - basictax) * controlArr[i].taxPer) / 100;
      }
    }

    var perValueLab = (labBasicAmt * event) / 100;
    var aaa = labBasicAmt - perValueLab;
    var netAmt=((totlabtaxamt + aaa) +matTotAt);
    netAmt=Math.round(netAmt);

    var labLineTot=totlabtaxamt + aaa;
   
    this.jobcardForm.patchValue({
      labDiscount: Math.round((perValueLab+Number.EPSILON)*100)/100, 
      labTaxableAmt: Math.round((labBasicAmt - perValueLab+Number.EPSILON)*100)/100, 
      labTotTaxAmt: Math.round((totlabtaxamt+Number.EPSILON)*100)/100, 
      labTotAmt:Math.round((labLineTot+Number.EPSILON)*100)/100, 
     });

     
    this.CalculateTotal();
  }

  labDiscountAmtCal(event) {
    // alert("labDiscountAmtCal :"+ event);
    // if(this.lstcomments.jobStatus == 'Invoiced') { return;}
    // alert(event);
    // var l=event;
    var labBasicAmt = (this.jobcardForm.get('labBasicAmt').value)
    var labDisAmt = (this.jobcardForm.get('labDiscount').value)

    if(labDisAmt>labBasicAmt || labDisAmt <0 ) {
      labDisAmt=0;  alert("Please Enter a Valid Discount Amt...");
      
      this.jobcardForm.patchValue({labDiscount :0});;
    }

    var control = this.jobcardForm.get('jobCardLabLines').value;
    var matTotAt = this.jobcardForm.get('matTotAmt').value;

    var perValueLab = (labDisAmt * 100) / labBasicAmt;
    var labTaxAmt = labBasicAmt - labDisAmt;
    var totlabtaxamt = 0;
      for (var i = 0; i < control.length; i++) {
        var perDisLab = (control[i].basicAmt * perValueLab) / 100;
        var pervalLab = control[i].basicAmt - perDisLab;
        totlabtaxamt = totlabtaxamt + (pervalLab * control[i].taxPer) / 100;
      }

      // alert("labDisAmt : "+labDisAmt);
      var netAmt=((totlabtaxamt + labTaxAmt) +matTotAt);
      netAmt=(netAmt);
      var labLineTot=totlabtaxamt + labTaxAmt;

      this.jobcardForm.patchValue({
      labDiscount: Math.round((labDisAmt+Number.EPSILON)*100)/100, 
      labTaxableAmt: Math.round((labTaxAmt+Number.EPSILON)*100)/100, 
      labTotTaxAmt:Math.round((totlabtaxamt+Number.EPSILON)*100)/100, 
      labTotAmt:Math.round((labLineTot+Number.EPSILON)*100)/100, 
       });
       this.CalculateTotal();
  }


 

  
  matDiscountPerCal(event) {
    // alert("matDiscountPerCal :"+ event);

  //  if(this.lstcomments.jobStatus == 'Invoiced') { return;}
    
    if(event==='--Select--') {event=0;}

    var matBasicAmt = (this.jobcardForm.get('matBasicAmt').value)
    var perValuePart = (matBasicAmt * event) / 100;
    
    var labTotAt = Number(this.jobcardForm.get('labTotAmt').value);

    var control = this.jobcardForm.get('jobCardMatLines').value;
    var totmattaxamt = 0;
    for (var i = 0; i < control.length; i++) {
      totmattaxamt = totmattaxamt + (control[i].basicAmt * control[i].taxPer) / 100;
    }

    // alert(perValueLab);
    var temp = (totmattaxamt * event) / 100;

    var netAmt=(matBasicAmt-perValuePart)+(totmattaxamt-temp)+labTotAt
    netAmt=netAmt;
      
    this.jobcardForm.patchValue({
      matDiscout: Math.round((perValuePart+Number.EPSILON)*100)/100, 
      matTaxableAmt: Math.round(((matBasicAmt - perValuePart)+Number.EPSILON)*100)/100, 
      matTotTaxAmt: Math.round(((totmattaxamt-temp)+Number.EPSILON)*100)/100, 
      matTotAmt:Math.round((((matBasicAmt - perValuePart)+(totmattaxamt-temp))+Number.EPSILON)*100)/100, 

    });
    this.CalculateTotal();
  }


  
  matDiscountAmtCal(event) {
    // alert("matDiscountAmtCal :"+ event);
    // if(this.lstcomments.jobStatus == 'Invoiced') { return;}
  
    var matBasicAmt = (this.jobcardForm.get('matBasicAmt').value)
    var matDisAmt = (this.jobcardForm.get('matDiscout').value)

    if(matDisAmt>matBasicAmt || matDisAmt <0 ) {
      matDisAmt=0;alert("Please Enter a Valid Discount Amt...");
      this.jobcardForm.patchValue({matDiscout :0});return;
    }

    var labTotAt = (this.jobcardForm.get('labTotAmt').value)
    var labTotTxble= (this.jobcardForm.get('labTaxableAmt').value)
    var labTotTx= (this.jobcardForm.get('labTotTaxAmt').value)
    
    var perValueMat = (matDisAmt * 100) / matBasicAmt;
    var control = this.jobcardForm.get('jobCardMatLines').value;
    var totmattaxamt = 0;
    var totalMatTaxableAmt = 0;
    for (var i = 0; i < control.length; i++) {
      var perDisMat = (control[i].basicAmt * perValueMat) / 100;
      var pervalMat = control[i].basicAmt - perDisMat;
      totmattaxamt = totmattaxamt + (pervalMat * control[i].taxPer) / 100;
      totalMatTaxableAmt = totalMatTaxableAmt + pervalMat;
    }
   
    var temp = (totmattaxamt * event) / 100;
    var txblTot=totalMatTaxableAmt+labTotTxble
    var txTot=totmattaxamt+labTotTx
    var netAmt=(totalMatTaxableAmt + totmattaxamt + labTotAt)

    this.jobcardForm.patchValue({
      matDiscout: Math.round(((matDisAmt)+Number.EPSILON)*100)/100,
      matTaxableAmt: Math.round(((totalMatTaxableAmt)+Number.EPSILON)*100)/100, 
      matTotTaxAmt: Math.round(((totmattaxamt)+Number.EPSILON)*100)/100,  
       matTotAmt: Math.round((((totalMatTaxableAmt + totmattaxamt))+Number.EPSILON)*100)/100,  
       });
    this.CalculateTotal();
  }

  CalculateTotal() {
    var ltot =Number (this.jobcardForm.get('labTotAmt').value);
    var ltaxable= Number(this.jobcardForm.get('labTaxableAmt').value)
    var ltax= Number(this.jobcardForm.get('labTotTaxAmt').value)
    var mtot = Number(this.jobcardForm.get('matTotAmt').value)
    var mtaxable= Number(this.jobcardForm.get('matTaxableAmt').value)
    var mtax= Number(this.jobcardForm.get('matTotTaxAmt').value);
    this.jobcardForm.patchValue({
      totTaxableAmt:Math.round(((ltaxable+mtaxable)+Number.EPSILON)*100)/100,
      totTaxAmt:Math.round(((ltax+mtax)+Number.EPSILON)*100)/100,
      invTotAmt:Math.round(((ltot+mtot)+Number.EPSILON)*100)/100,
    });

  }


  validateKm() {
    var vehRegno=this.jobcardForm.get('regNo').value;
    this.getLastRunKms(vehRegno);
    var storeKm = this.RegNoList2.lastRunKms;
    var kmEmtered=this.jobcardForm.get('lastRunKms').value;

    if (kmEmtered < storeKm || kmEmtered<=0) {
      alert("Please Enter a Valid KMR .It should not be less than Last run KMR.\nLst Run KMR :"+storeKm);
      this.jobcardForm.patchValue({ lastRunKms: this.RegNoList2.lastRunKms });
      this.jobHeaderValidation=false;
    }
  }

  getLastRunKms(RegNo) {
    // alert(RegNo);
    var jcType=this.jobcardForm.get('jcType').value;
    this.serviceService.getByRegNo(RegNo, sessionStorage.getItem('ouId'),jcType)
      .subscribe(
        data => {
          this.RegNoList2 = data;
          console.log(this.RegNoList2);
          // this.jobcardForm.patchValue(this.RegNoList);
        }
      );
  }

  cancelJobNo(){

   this.cancellationCheck();

   if(this.cancellationStatus) {
        var jobcardNo = this.jobcardForm.get('jobCardNum').value;
        this.serviceService.jobCardStatusCancel(jobcardNo).subscribe((res: any) => {
          if (res.code === 200) {
            alert(res.message);
            this.jobcardForm.patchValue({jobStatus:res.obj.status});
            this.displaylabMatTab = true;
            this.jobcardForm.disable();
            this.jobcardForm.get('jobCardLabLines').disable();
            this.jobcardForm.get('jobCardMatLines').disable();
      }
      else {
        if (res.code === 400) {
          alert(res.message);
        }
      }});
    } 
  }

cancellationCheck(){
  
    let mToday =this.pipe.transform(new Date(), 'yyyy-MM-dd');
    let jobDate=this.pipe.transform(this.jobCardDate, 'yyyy-MM-dd');

     if( jobDate !=mToday ||  this.lstcomments.jobCardMatLines.length>0 || this.lstcomments.jobCardLabLines.length>0){
        this.cancellationStatus=false; 
        // alert( this.pipe.transform(jobDate,"dd/MM/yyyy")+ " << JC Date :"+ "  Current Date :" +mToday + " Mat Lines : "+this.lstcomments.jobCardMatLines.length+" Lab Lines: "+this.lstcomments.jobCardLabLines.length);
        alert ("JobCard Date : "+this.pipe.transform(jobDate,"dd/MM/yyyy") + " Current Date : "+this.pipe.transform(new Date(), 'dd/MM/yyyy')
        + "\nCancellation Not Allowed for this JobCard.\nCancellation is allowed on the same day with No Labor/Material in JobCard.");
        return;}

    this.cancellationStatus=true;
}



onOptioninvItemIdSelectedNew(itemSeg,index){ 

  // alert ( "Datalist Labor :" +itemSeg + " index :"+index);
}

getInvItemId($event)
{
  // alert('in getInvItemId')
   let userId=(<HTMLInputElement>document.getElementById('invItemIdFirstWay')).value;
   this.userList2=[];
   if (userId.length > 2) {
    if ($event.timeStamp - this.lastkeydown1 > 200) {
      this.userList2 = this.searchFromArray1(this.LaborItemList, userId);
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
}

    validateEstAmt() {
        var estLab=this.jobcardForm.get('estLabor').value;
        var estMat=this.jobcardForm.get('estMaterial').value;
    
        if(estLab <0)
        { 
          alert ("Please Enter a Valid Estimated Labour value.");
          this.jobcardForm.patchValue({estLabor :0}); 
        }
        if(estMat <0)
        { 
          alert ("Please Enter a Valid Estimated Material value.");
          this.jobcardForm.patchValue({estMaterial :0});
        }

        this.estTotal=estLab+estMat;
      
      }


onKey(index) {
  
    console.log(index);
    var arrayControl = this.jobcardForm.get('jobCardLabLines').value
    var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;

    var mQty =arrayControl[index].qty;
    var taxP =arrayControl[index].taxPer;

    // alert ("Lab qty index ,qty:"+index + " , "+mQty);

    if(mQty <=0 || Number.isInteger(mQty)==false )
    { 
      alert ("Please Enter a Valid Qty.");
      (patch.controls[index]).patchValue({ qty:'',basicAmt:0,taxAmt:0,laborAmt:0});return;
    }

    var baseAmtLineWise = arrayControl[index].unitPrice * arrayControl[index].qty;
    var txAmt =baseAmtLineWise *taxP/100;
    (patch.controls[index]).patchValue({ basicAmt: baseAmtLineWise,taxAmt:txAmt, laborAmt: baseAmtLineWise+txAmt, })
}

validateLabQty(index: any){
  var arrayControl = this.jobcardForm.get('jobCardLabLines').value
  var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;

  var baseAmtLineWise = arrayControl[index].unitPrice * arrayControl[index].qty;

 var x= arrayControl[index].qty
 alert(x);

  (patch.controls[index]).patchValue({ basicAmt: baseAmtLineWise, laborAmt: baseAmtLineWise })

}



printPreInvoice(){
  var jcNum=this.jobcardForm.get('jobCardNum').value
  var jctype=this.jobcardForm.get('jcType').value

  
  const fileName = 'download.pdf';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  this.serviceService.printWsPreInvdocument(jcNum,jctype)
    .subscribe(data => {
      var blob = new Blob([data], { type: 'application/pdf' });
      var url = URL.createObjectURL(blob);
      var printWindow = window.open(url, '', 'width=800,height=500');
      printWindow.open
      
    });

}



printWSInvoice(){
  var jcNum=this.jobcardForm.get('jobCardNum').value
  var jctype=this.jobcardForm.get('jcType').value
  const fileName = 'download.pdf';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  this.serviceService.printWsInvoicedocument(jcNum,jctype)
    .subscribe(data => {
      var blob = new Blob([data], { type: 'application/pdf' });
      var url = URL.createObjectURL(blob);
      var printWindow = window.open(url, '', 'width=800,height=500');
      printWindow.open
      
    });
}

showReceiptScreen(){
  this.router.navigate(['/admin/transaction/PaymentAr']);
}

validatePickupDate() {
  var pDate=this.jobcardForm.get('pickupDate').value;
  var currDate = new Date();
  var pDt = new Date(pDate);
  if (pDt > currDate) {
    alert("PICKUP  DATE :" + "Should not be above Today's Date");
    // this.pickupDate = this.pipe.transform(this.now, 'y-MM-dd'); ///  comi old date
    this.pickupDate=null;
  }
}

validatePromisedDate() {
  var promDate=this.jobcardForm.get('promiseDate').value;
  var currDate = new Date();
  var pDt = new Date(promDate);
  if (pDt < currDate) {
    alert("PROMISED  DATE :" + "Should not be below Today's Date");
    this.promiseDate = this.pipe.transform(this.now, 'y-MM-dd');
  }
}



onFreePickupSelected(xyz){
  // alert(xyz);
  if(xyz=='No') {this.pickupType=null;}

}


message:string="PleaseFixtheErrors!";
msgType:string="Close";
getMessage(msgType:string){
  this.msgType=msgType;
  
  if(msgType.includes("Cancel")){
  
  (document.getElementById('cancBtn') as HTMLInputElement).setAttribute('data-target','#confirmAlert');
  
    this.message="Do you want to Cancel this Job Card (Yes/No)?"
  }
 
  }
  
  executeAction(){
  if(this.msgType.includes("Cancel")){ this.cancelJobNo();   }

  // alert ("Testing..."+this.jobcardForm.get('regNo1').value);
   }

   
      jobcardFindNew() {
        var jcNum=this.jobcardForm.get('jobCardNum2').value;
        var jRegNo=this.jobcardForm.get('regNo1').value;
        var jDate=this.jobcardForm.get('JobOpenDt').value;
        var jStatus=this.jobcardForm.get('jobStatus1').value;
        var jLocId=this.locId;

         

  

        if(jcNum==undefined || jcNum==null || jcNum.trim()=='') {jcNum=null;} else{jcNum=jcNum.toUpperCase();}
        if(jRegNo==undefined || jRegNo==null || jRegNo.trim()=='') {jRegNo=null} else {jRegNo=jRegNo.toUpperCase();}
        if(jDate==undefined || jDate==null || jDate=='' ) {jDate=null}
        if(jStatus==undefined || jStatus==null || jStatus.trim()=='') {jStatus=null}

        // this.jobcardForm.reset();
        // alert (jcNum +","+jRegNo +","+jDate +","+jStatus +","+jLocId);

        this.serviceService.getJonCardNoSearchLoc(jcNum,jDate,jStatus,jRegNo,jLocId)
        .subscribe(
          data => {
            this.lstJobcardList = data;
            console.log(this.lstJobcardList); 
           });
        
        }

        clearSearch() {
          this.jobcardForm.get('jobCardNum2').reset();
          this.jobcardForm.get('regNo1').reset();
          this.jobcardForm.get('JobOpenDt').reset();
          this.jobcardForm.get('jobStatus1').enable();
          
          this.lstJobcardList = null;
        }


        LoadSearchForm(){
          this.jobcardForm.get('jobCardNum2').enable();
          this.jobcardForm.get('regNo1').enable();
          this.jobcardForm.get('JobOpenDt').enable();
          this.jobcardForm.get('jobStatus1').enable();
          // this.lstJobcardList=null;
        }

       
      


}
