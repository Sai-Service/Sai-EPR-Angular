import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';
import { ServiceService } from '../service.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { DatePipe } from '@angular/common';
import { IFinanaceExchangeForm } from 'src/app/order-management/sales-order-form/sales-order-form.component';

interface IjobCard {

  disTypeLab:string;
  labDiscountPer:number;
  labDiscount:number;
  

  disTypeMat:string;
  matDiscountPer:number;
  matDiscout:number;

  disCategory:string;
  disAuthBy: string;

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
  ewEndDate:Date;
  ewStatus: string;
  insStatus: string;
  insurerCompId: number;
  insurerSiteId: number;
  insurerSite: string;
  insurerCompName: string;
  insurerCompNo: number;
  insuDate: Date
  oemWarrStatus: string;
  oemWarrentyEndDate: Date;
  cngKitNumber: string;
  cngCylinderNo: string;
  cngEndDate:string;
  mcpNo :string;
  mcpStartDate:string;
  mcpEndDate:string;
  govtVehicleYn:string;
  vipYn:string;

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
  storedKmr:number;
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

  type: string;
  techAmt:number;
}

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})



export class JobCardComponent implements OnInit {
  jobcardForm: FormGroup;
  @ViewChild('aForm') aForm: ElementRef;

  pipe = new DatePipe('en-US');
  now = Date.now();
  public minDate = new Date();

  jobCardNum1: string;
  jobCardNum2: string  //='12PU.101-28';
  // JobOpenDt:Date;
  JobOpenDt=this.pipe.transform(Date.now(), 'y-MM-dd');
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

  lstcomments: any;
  lstcomments1: any = [];
  searchBy: string = 'ITEM CODE';
  searchItemId: number;
  searchByItemCode: string;
  searchItemName: string;
  searchByItemDesc: string;
  searchByItem = true;
  searchByDesc = false;
  lineIndex :number;

  estLabor:number=0;
  estMaterial:number=0;
  estTotal:number=0;
  totBalance:number;
  splitRatio :string
  techAdvisor:string;
  regNo: string;
  labTotTaxAmt: number;
  matTaxableAmt: number;
  // billableTyId:number;
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
 
  // lstcomments: any;
  RegNoList: any;
  RegNoList1: any[];
  public RegNoList2: any;
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

  matDiscountPer: number=0;;
  labDiscountPer: number=0;;
  labDiscount:number=0;;
  matDiscout:number=0;

  labDiscountPer1:number=0;
  matDiscountPer1:number=0;

  matDiscountPerIns: number=0;
  labDiscountPerIns: number=0;
  labDiscountIns:number=0;
  matDiscoutIns:number=0;

  matDiscountPerAddon: number=0;
  labDiscountPerAddon: number=0;
  labDiscountAddon:number=0;
  matDiscoutAddon:number=0;

  addonLabDiscountPer: number=0;addonLabDiscountPer1:number=0;
  addonLabDiscount: number=0;
  addonMatDiscoutPer: number=0;addonMatDiscoutPer1:number=0;
  addonMatDiscout: number=0;

  cwiLabBasicAmt :number;
  cwiMatBasicAmt :number;
  cwiTotBasicAmt :number;
  cwiLabDiscountPer : number=0; cwiLabDiscountPer1 : number=0;
  cwiMatDiscoutPer : number=0; cwiMatDiscoutPer1 : number=0;
  cwiLabDiscount : number=0;
  cwiMatDiscout : number=0;
  cwiLabTaxableAmt :number;
  cwiMatTaxableAmt :number;
  cwiLabTotTaxAmt :number;
  cwiMatTotTaxAmt :number;
  cwiLabTotAmt :number;
  cwiMatTotAmt :number;
  cwiInvTotAmt :number;

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
  amcLabour=false;
  fscCouponStatus=false;

  cwiBillable=false;
  addonBillable=false;


  insurerCompId: number;
  insurerSiteId: number;
  insurerSite: string;
  insurerCompName: string;
  insurerCompNo: number;
  demandJob:string;
  recomJob:string;
  fscCoupon :string;

  lineBasicAmt:number;

  discountRemark:string;

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

  disTypeLab:string;
  disTypeMat:string;

  disTypeLabAdn:string;
  disTypeMatAdn:string;

  disTypeLabCwi:string;
  disTypeMatCwi:string;

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
 
  dispButtonStatus = true;
  dispfreezeDetail = true;
  saveBillValidation=false;
  jobHeaderValidation=false;
  labLineValidation =false;
  matLineValidation=false;

  preInvButton=false;
  dispReadyInvoice = false;
  printInvoiceButton=false;
  printAddonInvButton=false;
  printInsInvoiceButton=false;
  printCwiInvButton=false;
  saveLabButton=true;
  saveMatButton=false; 
  importMatButton=true;
  saveBillButton=false;
  genBillButton=false;
  reopenButton=false;
  cancelButton=false;
  openStatus=true;
  updateButton=false;

  cancellationStatus=false;
  showLabdisP=false;
  showMatDisP=false;
  showLabDisCol=false;
  showMatDisCol=false;

  addonLabDisCol=false;
  addonLabdisP=false;
  addonMatDisCol=false;
  addonMatdisP=false;

  
  cwiLabDisCol=false;
  cwiLabdisP=false;
  cwiMatDisCol=false;
  cwiMatdisP=false;
  
  techLineValidation=false;
  techTotalValidation=false;
  duplicateLabLineItem=false;
  genericItemLab=false;
  bajajDivision=false;
  bsJobCard=false;

  isDisabledDisc=true;

  labBasTotal:number;
  labDisTotal:number;
  labSubTotal:number;
  labTaxTotal:number;
  labNetTotal:number;

  matBasTotal:number;
  matDisTotal:number;
  matSubtotal:number;
  matTaxTotal:number;
  matNetTotal:number;


  labCustBasTotal:number;
  labCustDisTotal:number;
  labCustSubTotal:number;
  labCustTaxTotal:number;
  labCustNetTotal:number;
 
  labInsBasTotal:number;
  labInsDisTotal:number;
  labInsSubTotal:number;
  labInsTaxTotal:number;
  labInsNetTotal:number;

  matCustBasTotal:number;
  matCustDisTotal:number;
  matCustSubTotal:number;
  matCustTaxTotal:number;
  matCustNetTotal:number;
 
  matInsBasTotal:number;
  matInsDisTotal:number;
  matInsSubTotal:number;
  matInsTaxTotal:number;
  matInsNetTotal:number;

  custInvoiceNo:string;
  addonInvoiceNo:string;
  cwiInvoiceNo:string;
  insInvoiceNo:string;
  arInvNum: string;
  arInvDate:Date;

  cdmsInvoiceNo: string;
  cdmsInvoiceDate: Date;
  cdmsInvoiceNoDp:string;

  disCategory:string;
  disAuthBy: string;
 

  // public minDatetime = new Date();
  // promiseDate = new Date();
 
  // minDate=new Date();
  // pipe = new DatePipe('en-US');
  // now = Date.now();
  // pickupDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  pickupDate=Date.now();
  jobCardDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  // jobCardDate = Date.now();
  // jobCardDate = this.pipe.transform(this.now, 'y-MM-d');
  
  public minDatetime=this.pipe.transform(new Date(), 'yyyy-MM-ddThh:mm')
 // public minDatetime = moment(new Date()).format('YYYY-MM-DDTHH:mm')
  promiseDate = this.minDatetime;
 
  @ViewChild("myinput") myInputField: ElementRef;
 

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

      searchBy: [],
      searchByItemCode: [],
      searchItemName: [],
      searchByItemDesc: [],
      lineIndex :[],

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
      ewEndDate:[],
      ewStatus: [],
      insStatus: [],
      insurerCompId: [],
      insurerCompNo: [],
      insurerCompName: [],
      insurerSite: [],
      insurerSiteId: [],
      insuDate: [],
      oemWarrStatus: [],
      oemWarrentyEndDate: [],
      cngKitNumber: [],
      cngCylinderNo: [],
      cngEndDate:[],
      mcpNo:[],
      mcpStartDate:[],
      mcpEndDate:[],
      govtVehicleYn:[],
      vipYn:[],

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
      storedKmr:[],
      itemId: [],

      customerId: [],
      customerSiteId: [],
      dmsJcNo: [],
      dmsJCDate: [],
      validTillDt: [],
      owner: [],
      matDiscountPer: [],matDiscountPer1: [],
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
      fscCoupon :[],

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
      disTypeLabAdn: [],
      disTypeMatAdn: [],
      disTypeLabCwi: [],
      disTypeMatCwi: [],


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
      totBalance:[],
      advAmt: [],
      labDiscountPer: [], labDiscountPer1: [],
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


      addonLabDiscountPer:[],addonLabDiscountPer1:[],
      addonLabDiscount:[],
      addonMatDiscoutPer:[], addonMatDiscoutPer1:[],
      addonMatDiscout:[],
     
      lineBasicAmt:[],
      labBasTotal:[],
      labSubTotal:[],
      labDisTotal:[],
      labTaxTotal:[],
      labNetTotal:[],

      matBasTotal:[],
      matDisTotal:[],
      matSubtotal:[],
      matTaxTotal:[],
      matNetTotal:[],


      labCustBasTotal:[],
      labCustDisTotal:[],
      labCustSubTotal:[],
      labCustTaxTotal:[],
      labCustNetTotal:[],

      labInsBasTotal:[],
      labInsDisTotal:[],
      labInsSubTotal:[],
      labInsTaxTotal:[],
      labInsNetTotal:[],

      matCustBasTotal:[],
      matCustDisTotal:[],
      matCustSubTotal:[],
      matCustTaxTotal:[],
      matCustNetTotal:[],
     
      matInsBasTotal:[],
      matInsDisTotal:[],
      matInsSubTotal:[],
      matInsTaxTotal:[],
      matInsNetTotal:[],

      addonLabBasicAmt:[],
      addonMatBasicAmt:[],
      addonLabTaxableAmt:[],
      addonMatTaxableAmt:[],
      addonLabTotTaxAmt:[],
      addonMatTotTaxAmt:[],
      addonLabTotAmt:[],
      addonMatTotAmt:[],
      addonInvTotAmt:[],


      cwiLabBasicAmt :[],
      cwiMatBasicAmt :[],
      cwiTotBasicAmt :[],
      cwiLabDiscountPer :[], cwiLabDiscountPer1 :[],
      cwiMatDiscoutPer :[],  cwiMatDiscoutPer1 :[],
      cwiLabDiscount :[],
      cwiMatDiscout :[],
      cwiLabTaxableAmt :[],
      cwiMatTaxableAmt :[],
      cwiLabTotTaxAmt :[],
      cwiMatTotTaxAmt :[],
      cwiLabTotAmt :[],
      cwiMatTotAmt :[],
      cwiInvTotAmt :[],

      custInvoiceNo:[],
      addonInvoiceNo:[],
      cwiInvoiceNo:[],
      insInvoiceNo:[],
      arInvNum: [],

      cdmsInvoiceNo: [],
      cdmsInvoiceNoDp:[],
      cdmsInvoiceDate: [],
      discountRemark:[],



      jobCardLabLines: this.fb.array([this.lineDetailsGroup()]),
      jobCardMatLines: this.fb.array([this.distLineDetails()]),
      splitAmounts: this.fb.array([this.splitDetailsGroup()])
      // splitArr: this.fb.array([this.splitDetailsGroup()])
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
      genericItem:[],
    });
  }


  splitDetailsGroup() {
    return this.fb.group({
      type: [],
      techId: [],
      techAmt: [],
      techPer: [],
      lineBasicAmt:[],
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

  addTechRow(index,lbrIndex) {

    var jobCardLabLinesControl = this.jobcardForm.get('jobCardLabLines').value;
    var lineTotAmt = jobCardLabLinesControl[lbrIndex].basicAmt;
    var splitControl = this.jobcardForm.get('splitAmounts').value;
    var techTotAmt = 0;

    for (let i = 0; i < this.splitDetailsArray().length; i++) {
           techTotAmt = techTotAmt + splitControl[i].techAmt;
     } 

    //  alert ("Labor line ,amt :"+lbrIndex + ","+lineTotAmt + " tech line  ,techtotamt :" +index + ","+techTotAmt);

     if(techTotAmt >=lineTotAmt) {
       alert ("Labour Amount Fully alloted to Technicains....")
       this.techLineValidation = false;return;
      }


    var len1=this.splitDetailsArray().length-1
    if(len1===index){
    this.TechSplitValidation(index);
    if(this.techLineValidation && this.techTotalValidation===false) {
    this.splitDetailsArray().push(this.splitDetailsGroup()); 
    }
   }}


  // RemoveTechRow(index) {

  //   this.splitDetailsArray().removeAt(index);
  // }

  RemoveTechRow(index) {
    if (index===0){
    }
    else {
      this.splitDetailsArray().removeAt(index);
    }
  
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

    if(Number(sessionStorage.getItem('divisionId'))===2) {this.bajajDivision=true;} else {this.bajajDivision=false;}

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
    // this.serviceService.RegNoListDividionwiseFN(this.divisionId)
    //   .subscribe(
    //     data1 => {
    //       this.RegNoList1 = data1;
    //       console.log(this.RegNoList1);
    //     }
    //   );
   
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
    // laborLineArr.controls[0].patchValue({ billableTyId: 1 });

  }
  splitFlagFlagFn(e) {
    if (e.target.checked === true) {
      // alert('in true');
      this.splitFlag = 'Y'
      this.displaySplit = true
    }
    if (e.target.checked === false) {
      // alert('in false');
      this.splitFlag = 'N'
      this.displaySplit = false;;
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
    // alert(jobCardNum);
    this.importMatButton=false;
    this.saveMatButton=true;
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




  serchByitemId(x,index){
    var arrayControl = this.jobcardForm.get('jobCardLabLines').value
    // var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
    var billTp =arrayControl[index].billableTyId;
    var event = arrayControl[index].segment;
   
    event=event.toUpperCase();
    this.serchByitemIdPrice(event,index,billTp)
    }


  serchByitemIdPrice(event,i,billTp) {
    var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
    var vehNo =this.jobcardForm.get('regNo').value;
    var serModel=this.jobcardForm.get('serviceModel').value;
 
    //  ----------------------------AMC Labor Validation--------------------------------
    if (billTp===3) { 
      this.service.getDealerAMCLabStatus(vehNo,event)
      .subscribe(
        data1 => { if (data1.code===200) { this.amcLabour= true; } else {
          this.amcLabour=false; alert(data1.message);
          patch.controls[i].patchValue({ itemId: '' });
          patch.controls[i].patchValue({ segment: '' });
          patch.controls[i].patchValue({ description: '' });
          return;
        }  });
      } 
  //  --------------------------------------------------------------------------------------

    let select = this.LaborItemList.find(d => d.segment === event);
   
    if(select) {
    if(select.genericItem==='Y') {this.genericItemLab=true;} else {this.genericItemLab=false;}

    if(select.genericItem==='N') {
        this.CheckForDuplicateLineItem(select.itemId,i)
        if(this.duplicateLabLineItem) { return;}
    }
   
    (patch.controls[i]).patchValue({ itemId: select.itemId });
    (patch.controls[i]).patchValue({ segment: select.segment });
    (patch.controls[i]).patchValue({ description: select.description });
    (patch.controls[i]).patchValue({ genericItem: select.genericItem });
    (patch.controls[i]).patchValue({ qty: 0,unitPrice: 0,basicAmt: 0,taxAmt:0, laborAmt: 0, })

    
    if(select.genericItem==='Y'){ this.lineDetailsArray.controls[i].get('description').enable();} else
    {this.lineDetailsArray.controls[i].get('description').disable();} 

    var labArr = this.jobcardForm.get('jobCardLabLines').value

        // for(i=0;i< this.lineDetailsArray.length -1;i++) {
        //     if(labArr[i].genericItem==='Y') {
        //       this.lineDetailsArray.controls[i].get('description').enable();
        //     } else {this.lineDetailsArray.controls[i].get('description').disable(); }

        // }

        if(labArr[i].genericItem==='Y') {
          this.lineDetailsArray.controls[i].get('description').enable();
        } else {this.lineDetailsArray.controls[i].get('description').disable(); }

    if(serModel===null)  {  serModel=''; }

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
      alert (event + "-  Labor Item Not found...");
      (patch.controls[i]).patchValue({ itemId: '' });
      (patch.controls[i]).patchValue({ description:''});
      (patch.controls[i]).patchValue({ unitPrice: 0 });
      (patch.controls[i]).patchValue({ qty:0});
      (patch.controls[i]).patchValue({ basicAmt:''});
      (patch.controls[i]).patchValue({ taxCategoryName:''});
      (patch.controls[i]).patchValue({ laborAmt:''});
      (patch.controls[i]).patchValue({ taxPer:''});
     return;
       }
  }




  getUserIdsFirstWay($event) {
    // this.onInput($event);
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
    // alert( "Labor split catid : " + select.splitCateId);
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
    // alert( "Mateial split catid : " + select.splitCateId);
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
          data2 => {
            this.billableTyIdList = data2;
            //  alert ("Billable Type Found :"+ data2.length);
             console.log(this.billableTyIdList);
          
          
            if (jcStatus === 'New') {
              let selectbilTy = this.billableTyIdList.find(d => d.billableTyName === 'Customer');
              this.lineDetailsGroup();
              var patch = this.jobcardForm.get('jobCardLabLines') as FormArray
              (patch.controls[0]).patchValue(
                {
                  lineNum: 1,
                  // billableTyId: selectbilTy.billableTyId,

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
   
    var len1= this.lineDetailsArray.length-1;
     if(len1===index) {
     
    this.checkLabLineValidation(index);
   
    if(this.labLineValidation ) {
   
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

       
    }
  }


  checkLabLineValidation(index){
  
    var arrayControl = this.jobcardForm.get('jobCardLabLines').value
    var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
    var invItemId = arrayControl[index].itemId;
    var genItem =arrayControl[index].genericItem;
    var itemSeg=arrayControl[index].segment;
    var itemDesc=arrayControl[index].description;
    var billTypeId=arrayControl[index].billableTyId;
  

    this.labLineValidation=false

    if(billTypeId <=0 ||billTypeId==undefined || billTypeId===null) { this.labLineValidation=false; alert ("Line - " + (index+1) +": Please Check BILLABLE TYPE..." +arrayControl[index].billableTyId)  ;return; }
   
    if(invItemId===null || invItemId==undefined || invItemId<=0){ this.labLineValidation=false;alert("Line - " + (index+1) +": Please Check LABOR ITEM."); return; }
   
    if(itemSeg===null || itemSeg===undefined || itemSeg.trim()===''){this.labLineValidation=false;alert("Line - " + (index+1) +": Please Check LABOR ITEM NAME.") ;return;}

    if (genItem==='Y') {
        if(itemDesc===null || itemDesc===undefined || itemDesc.trim()===''){this.labLineValidation=false;alert("Line - " + (index+1) +": Please Check LABOR DESCRIPTION.") ;return;}
    }

    if(Number(arrayControl[index].qty)<=0 ||arrayControl[index].qty===null || arrayControl[index].qty===undefined )
    { this.labLineValidation=false;alert("Line - " + (index+1) +": Please Check QUANTITY.") ;return; }

    // if (genItem==='N') {
      // if(Number(arrayControl[index].qty)<=0 ||arrayControl[index].qty===null || arrayControl[index].qty===undefined )
      // { this.labLineValidation=false;return; }

      // if(Number(arrayControl[index].unitPrice)<=0 ||arrayControl[index].unitPrice===null || arrayControl[index].unitPrice===undefined )
      // { this.labLineValidation=false;return; }

      // if(Number(arrayControl[index].basicAmt)<=0 ||arrayControl[index].basicAmt===null || arrayControl[index].basicAmt===undefined )
      // { this.labLineValidation=false;return; }
 
      // if(Number(arrayControl[index].laborAmt)<=0 ||arrayControl[index].laborAmt===null || arrayControl[index].laborAmt===undefined )
      // { this.labLineValidation=false;return; }
    // }

   

    if(this.dispSplitRatio) {
      if(Number(arrayControl[index].splitRatio)<=0 ||arrayControl[index].splitRatio===null || arrayControl[index].splitRatio===undefined )
      { this.matLineValidation=false;alert ("Line - " + (index+1) +": Check SPLIT RATIO");return; }
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

  RemoveRowold(index) {
    if (index===0){ }
    else {
       this.lineDetailsArray.removeAt(index);
    }
  }

  RemoveRow(index) {
    var ordLineArr = this.jobcardForm.get('jobCardLabLines').value;
    var len1 = this.lineDetailsArray.length;
    // alert ("jobcard lines :" +len1);
    if(len1>1) {
      this.lineDetailsArray.removeAt(index);
    } else {
      alert("Not Allowed..... ");
    }
    
  }
  

  onInput(event) {
    event.target.value = event.target.value.toUpperCase();
  }

  serchByRegNo(RegNo) {

    // var mreg1=this.jobcardForm.get('regNo').value
    if(RegNo==null || RegNo==undefined || RegNo.trim()=='') {
      alert ("Enter Valid Vehicle Registration No."); return;
    }

    RegNo=RegNo.toUpperCase();
    RegNo=RegNo.trim();
    this.regNo=RegNo;
    // alert ("this.regno :"+this.regNo);

    var jcType=this.jobcardForm.get('jcType').value;
    if(jcType ==='--Select--' || jcType ===null || jcType ===undefined ) {
      alert ("Please Select Job Card Type...");
      this.jobcardForm.patchValue({regNo:''});
      return;
    }
 
    this.serviceService.getByRegNo(RegNo, sessionStorage.getItem('ouId'),jcType)
      .subscribe(
        data => {
          this.RegNoList = data.obj;
          // if(data.code===400 && data.obj !=null)  {alert(data.obj);this.jobcardForm.reset(); return;}
          // if(data.code===400 && data.obj ===null) {alert("Please Enter valid Registration Number..."); this.jobcardForm.reset(); return;}
          if(data.code===400 ) {alert (data.message); this.jobcardForm.reset(); return;}
          
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
            storedKmr : this.RegNoList.lastRunKms,
          });
        } 
      );
  }

 


  onOptionsSelectedsrTypeId(srTypeId) {
    // alert( "srTypeId :"+ srTypeId);
    if(srTypeId===1){ this.fscCouponStatus =true;} else {this.fscCouponStatus=false;}

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
  }
 }

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
  
  // JOBCARD SEARCH BY  JCNO

  Search(jobCardNo) {
    alert('jobCardNo------'+jobCardNo)
    //  ---------------------------For Account Login ------------------
      if (Number(sessionStorage.getItem('dept')) ===4)  {
            this.jobcardForm.disable();
            this.jobcardForm.get('jobCardLabLines').disable();
            this.jobcardForm.get('jobCardMatLines').disable();
            this.jobcardForm.get('splitAmounts').disable();
      }
    // --------------------------------------------------------------

    var  jcNum=jobCardNo.toUpperCase();
    this.saveLabButton=true;
    this.displaybilling=true;
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
  //  alert(this.jobCardNum1)
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
            this.jobcardForm.patchValue({arInvNum :data.obj.invoiceNumber});
            this.jobcardForm.patchValue({custInvoiceNo :data.obj.invoiceNumber});
            this.jobcardForm.patchValue({addonInvoiceNo :data.obj.addonInvoiceNumber});
            this.jobcardForm.patchValue({cwiInvoiceNo :data.obj.cwiInvoiceNumber});
            this.jobcardForm.patchValue({insInvoiceNo :data.obj.insInvoiceNumber});

           
            this.estTotal=data.obj.estMaterial+data.obj.estLabor;
            this.fscCoupon=data.obj.fscCoupon;
          } else { alert (jcNum + " Error In Job Card Search.."+ data.message);return;}

          // let mToday =this.pipe.transform(new Date(), 'yyyy-MM-dd');
          // let jobDate=this.pipe.transform(this.jobCardDate, 'yyyy-MM-dd');
          // this.printAddonInvButton=false;
          if(data.obj.cwiInvoiceNumber>0) { this.printCwiInvButton=true;} else {this.printCwiInvButton=false;}
          if(data.obj.addonInvoiceNumber>0) { this.printAddonInvButton=true;} else {this.printAddonInvButton=false;}
          if(data.obj.invoiceNumber>0)      { this.printInvoiceButton=true;} else { this.printInvoiceButton=false;}
          if(data.obj.insInvoiceNumber>0)      { this.printInsInvoiceButton=true;} else { this.printInsInvoiceButton=false;}
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

          for (let i = 0; i < this.lstcomments.jobCardLabLines.length - len1; i++) {
            var payInvGrp: FormGroup = this.lineDetailsGroup();
            this.lineDetailsArray.push(payInvGrp);
         
            }
    
          if (this.lstcomments.lineCnt > 0) {
            if (data.obj.classCodeType==='INSURER'){
            this.dispReadyInvoice = true;
          }
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
              // this.jobcardForm.get('jobCardLabLines').enable();
              // this.jobcardForm.get('jobCardMatLines').enable();

              if(data.obj.jobCardLabLines.length >0) {
                if (data.obj.classCodeType==='INSURER'){
                this.dispReadyInvoice = true; 
                }
                // this.preInvButton=true;
              } 
                else{
                this.dispReadyInvoice = false; 
                // this.preInvButton=false;
              }
              // alert(obj.custType)
                this.dispButtonStatus=false;
                this.updateButton=true;
                this.importMatButton=true;
            
                this.openStatus=true;
              if(x===y) { this.cancelButton=true;}else {this.cancelButton=false;}
          }
       
          if (this.lstcomments.jobStatus === 'Cancelled'  )
          {  this.dispReadyInvoice = false; this.dispButtonStatus=false;this.preInvButton=false;this.cancelButton=false; this.updateButton=false;
            this.jobcardForm.disable();
            this.jobcardForm.get('jobCardLabLines').disable();
            this.jobcardForm.get('jobCardMatLines').disable();
            this.jobcardForm.get('splitAmounts').disable();
            
          }
         
         
          // if (this.lstcomments.jobStatus === 'Invoiced' || this.lstcomments.matStatus === 'Compeleted' || this.lstcomments.jobStatus === 'Closed' ) {
          if (this.lstcomments.jobStatus === 'Invoiced' || this.lstcomments.jobStatus === 'Closed' ) {
           
            this.jobcardForm.disable();
            this.jobcardForm.get('jobCardLabLines').disable();
            this.jobcardForm.get('jobCardMatLines').disable();
            this.jobcardForm.get('splitAmounts').disable();
            this.displaybilling = false;
            this.dispButtonStatus = false;
            this.dispReadyInvoice = false;

            this.printInvoiceButton=true;
            this.printAddonInvButton=true;
            this.printCwiInvButton=true;
            this.printInsInvoiceButton=true;


            this.genBillButton=false;
            this.saveBillButton=false;
            this.reopenButton=false;
            this.saveLabButton=false;
            this.saveMatButton=false;
            this.preInvButton=false;
            this.cancelButton=false;
            this.openStatus=false;
            this.updateButton=false;
            this.importMatButton=false;
                         
          }

          // if (this.lstcomments.matStatus == 'Compeleted' || this.lstcomments.jobStatus == 'Ready for Invoice') {
          if ( this.lstcomments.jobStatus === 'Ready for Invoice') {
        
            this.jobcardForm.get('jobCardLabLines').disable();
            this.jobcardForm.get('jobCardMatLines').disable();
            this.jobcardForm.get('splitAmounts').disable();
            this.displaybilling = false;
            this.dispButtonStatus = false;
            this.dispReadyInvoice = false;
            this.printInvoiceButton=false;
            this.printAddonInvButton=false;
            this.printCwiInvButton=false;
            this.printInsInvoiceButton=false;
            
            this.saveBillButton=true;
            this.genBillButton=false;
            this.reopenButton=true;
            this.saveLabButton=false;
            this.saveMatButton=false;
            this.preInvButton=false;
            // ******* Pre Inv True here *********//
            this.cancelButton=false;
            this.openStatus=false;
            this.updateButton=false;
            this.importMatButton=false;
          }


        
        
          // debugger;
          this.jobcardForm.patchValue(this.lstcomments);

          this.addonLabDisCol=false;this.addonLabdisP=false;
          this.addonMatDisCol=false;this.addonMatdisP=false;
          this.showLabDisCol=false;this.showLabdisP=false;
          this.showMatDisCol=false;this.showMatDisP=false;
          // this.disTypeLab='';this.disTypeMat='';
          this.disTypeLabAdn='';this.disTypeMatAdn='';
          this.disTypeLabCwi='';this.disTypeMatCwi=''

          this.jobcardForm.patchValue({disTypeLab :''});
          this.jobcardForm.patchValue({disTypeMat :''});

          // this.jobcardForm.patchValue({disTypeLabAdn :''});
          // this.jobcardForm.patchValue({disTypeMatAdn :''});
          // this.jobcardForm.patchValue({disTypeLabCwi :''});
          // this.jobcardForm.patchValue({disTypeMatCwi :''});

         
          var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
          // alert('jobCardLabLines length---'+data.jobCardLabLines.length)
          
            var custLbr1=0;
            var custLbr2=0;
            var custLbr3=0;
            var custLbr4=0;
            var custLbr5=0;
            var lbCustTax=0
            var lbCustDisAmt=0;

            var insLbr1=0;
            var insLbr2=0;
            var insLbr3=0;
            var insLbr4=0;
            var insLbr5=0;
            var lbInsTax=0;
            var lbInsDisAmt=0;
            


          for (let ln=0; ln < data.obj.jobCardLabLines.length; ln++) {
            // alert('inside loop'+ln)
            // let selectbilTy = this.billableTyIdList.find(d => d.billableTyId === data.jobCardLabLines[ln].billableTyId);
          //  alert ("selectbilTy.billableTyId :"+data.jobCardLabLines[ln].billableTyId);
            // patch.controls[ln].patchValue({ billableTyId: data.jobCardLabLines[ln].billableTyId });
            
            this.onOptionsplitRatioSelect(ln,data.obj.jobCardLabLines[ln].splitCateId);
            var lbrAmt=(data.obj.jobCardLabLines[ln].totAmt).toFixed(2);
            patch.controls[ln].patchValue({laborAmt:lbrAmt});

            var xyz = data.obj.jobCardLabLines[ln].billableTyId;
            patch.controls[ln].patchValue({ billableTyId: xyz});

            custLbr1=custLbr1+data.obj.jobCardLabLines[ln].custBasicAmt;
            lbCustDisAmt=(data.obj.jobCardLabLines[ln].custBasicAmt*data.obj.jobCardLabLines[ln].disPer)/100;
            custLbr2=custLbr2+lbCustDisAmt;

            custLbr3=custLbr3+(data.obj.jobCardLabLines[ln].custBasicAmt-lbCustDisAmt);
            lbCustTax= ((data.obj.jobCardLabLines[ln].custBasicAmt-lbCustDisAmt) * (data.obj.jobCardLabLines[ln].taxPer))/100;
            custLbr4=custLbr4+lbCustTax;
            custLbr5=custLbr3+custLbr4;

            insLbr1=insLbr1+data.obj.jobCardLabLines[ln].insBasicAmt;
            lbInsDisAmt=(data.obj.jobCardLabLines[ln].insBasicAmt*data.obj.jobCardLabLines[ln].disPer)/100;
            insLbr2=insLbr2+ lbInsDisAmt

            insLbr3=insLbr3+(data.obj.jobCardLabLines[ln].insBasicAmt-lbInsDisAmt);
            lbInsTax= ((data.obj.jobCardLabLines[ln].insBasicAmt-lbInsDisAmt) * (data.obj.jobCardLabLines[ln].taxPer))/100;
            insLbr4=insLbr4+lbInsTax;
            insLbr5=insLbr3+insLbr4;
          }

          this.labCustBasTotal=Math.round((custLbr1+Number.EPSILON)*100)/100;
          this.labCustDisTotal=Math.round((custLbr2+Number.EPSILON)*100)/100;
          this.labCustSubTotal=Math.round((custLbr3+Number.EPSILON)*100)/100;
          this.labCustTaxTotal=Math.round((custLbr4+Number.EPSILON)*100)/100;
          this.labCustNetTotal=Math.round((custLbr5+Number.EPSILON)*100)/100;

          // Math.round((this.lstcomments.insTotBasicAmt+Number.EPSILON)*100)/100,

          this.labInsBasTotal=Math.round((insLbr1+Number.EPSILON)*100)/100 ;
          this.labInsDisTotal=Math.round((insLbr2+Number.EPSILON)*100)/100 ;
          this.labInsSubTotal=Math.round((insLbr3+Number.EPSILON)*100)/100 ;
          this.labInsTaxTotal=Math.round((insLbr4+Number.EPSILON)*100)/100 ;
          this.labInsNetTotal=Math.round((insLbr5+Number.EPSILON)*100)/100 ;



          var custMatr1=0;
          var custMatr2=0;
          var custMatr3=0;
          var custMatr4=0;
          var custMatr5=0;
          var matCustTax=0

          var insMat1=0;
          var insMat2=0;
          var insMat3=0;
          var insMat4=0;
          var insMat5=0;
          var matInsTax=0;

          for (let ln=0; ln < data.obj.jobCardMatLines.length; ln++) {

            this.onOptionsplitRatioSelect1(ln,data.obj.jobCardMatLines[ln].splitCateId);

            custMatr1=custMatr1+data.obj.jobCardMatLines[ln].custBasicAmt;
            custMatr2=custMatr2+data.obj.jobCardMatLines[ln].disAmt;
            custMatr3=custMatr3+(data.obj.jobCardMatLines[ln].custBasicAmt-data.obj.jobCardMatLines[ln].disAmt);
            matCustTax= ((data.obj.jobCardMatLines[ln].custBasicAmt-data.obj.jobCardMatLines[ln].disAmt) * (data.obj.jobCardMatLines[ln].taxPer))/100;
            custMatr4=custMatr4+matCustTax;
            custMatr5=custMatr3+custMatr4;

            insMat1=insMat1+data.obj.jobCardMatLines[ln].insBasicAmt;
            insMat2=insMat2+data.obj.jobCardMatLines[ln].disAmt;
            insMat3=insMat3+(data.obj.jobCardMatLines[ln].insBasicAmt-data.obj.jobCardMatLines[ln].disAmt);
            matInsTax= ((data.obj.jobCardMatLines[ln].insBasicAmt-data.obj.jobCardMatLines[ln].disAmt) * (data.obj.jobCardMatLines[ln].taxPer))/100;
            insMat4=insMat4+matInsTax;
            insMat5=insMat3+insMat4;
          }
            this.matCustBasTotal=Math.round((custMatr1+Number.EPSILON)*100)/100 ;
            this.matCustDisTotal=Math.round((custMatr2+Number.EPSILON)*100)/100 ;
            this.matCustSubTotal=Math.round((custMatr3+Number.EPSILON)*100)/100 ;
            this.matCustTaxTotal=Math.round((custMatr4+Number.EPSILON)*100)/100 ; 
            this.matCustNetTotal=Math.round((custMatr5+Number.EPSILON)*100)/100 ; 
          
            this.matInsBasTotal=Math.round((insMat1+Number.EPSILON)*100)/100 ;  
            this.matInsDisTotal=Math.round((insMat2+Number.EPSILON)*100)/100 ;  
            this.matInsSubTotal=Math.round((insMat3+Number.EPSILON)*100)/100 ;  
            this.matInsTaxTotal=Math.round((insMat4+Number.EPSILON)*100)/100 ;  
            this.matInsNetTotal=Math.round((insMat5+Number.EPSILON)*100)/100 ;  

          ///// disable/enable descreption column

          if (this.lstcomments.jobStatus === 'Opened' ){
            
           for(  let i=0;i< data.obj.jobCardLabLines.length;i++) {

            if(data.obj.jobCardLabLines[i].genericItem==='Y') {
              this.lineDetailsArray.controls[i].get('description').enable();
            } else 
            {this.lineDetailsArray.controls[i].get('description').disable(); }
          }}


          this.jobcardForm.patchValue({labBasicAmt: Math.round((this.lstcomments.labBasicAmt+Number.EPSILON)*100)/100});
          this.jobcardForm.patchValue({matBasicAmt: Math.round((this.lstcomments.matBasicAmt+Number.EPSILON)*100)/100});
          this.jobcardForm.patchValue({actualBasicAmt: Math.round((Number(this.lstcomments.totBasicAmt)+Number.EPSILON)*100)/100});
   
          this.jobcardForm.patchValue({addonLabBasicAmt: this.lstcomments.addonLabBasicAmt});
          this.jobcardForm.patchValue({addonMatBasicAmt: this.lstcomments.addonMatBasicAmt});

          this.jobcardForm.patchValue({cwiLabBasicAmt: this.lstcomments.cwiLabBasicAmt});
          this.jobcardForm.patchValue({cwiMatBasicAmt: this.lstcomments.cwiMatBasicAmt});
          
          var gTotLabEstAmt1=this.lstcomments.labBasicAmt+this.lstcomments.insLabBasicAmt;
          var gTotMatEstAmt1=this.lstcomments.matBasicAmt+this.lstcomments.insMatBasicAmt;
          var gTotEstAmt1=this.lstcomments.totBasicAmt+this.lstcomments.insTotBasicAmt;


        // alert ("addon disc %,amt : " + this.lstcomments.addonLabDiscountPer + ","+this.lstcomments.addonLabDiscount)

          // this.addonLabDiscount=this.lstcomments.addonLabDiscount;

          this.jobcardForm.patchValue({

            gTotLabEstAmt:Math.round((gTotLabEstAmt1+Number.EPSILON)*100)/100, 
            gTotMatEstAmt:Math.round((gTotMatEstAmt1+Number.EPSILON)*100)/100, 
            gTotEstAmt:Math.round((gTotEstAmt1+Number.EPSILON)*100)/100, 

            // labDiscountPer1: Math.round((this.lstcomments.labDiscountPer+Number.EPSILON)*100)/100,
            labDiscount: Math.round((this.lstcomments.labDiscount+Number.EPSILON)*100)/100, 
            labTaxableAmt: Math.round((this.lstcomments.labTaxableAmt+Number.EPSILON)*100)/100, 
            labTotTaxAmt: Math.round((this.lstcomments.labTotTaxAmt+Number.EPSILON)*100)/100,
            labTotAmt: Math.round((this.lstcomments.labTotAmt+Number.EPSILON)*100)/100,
            // matDiscountPer1: Math.round((this.lstcomments.matDiscountPer+Number.EPSILON)*100)/100,
            matDiscout: Math.round((this.lstcomments.matDiscout+Number.EPSILON)*100)/100, 
            matTaxableAmt: Math.round((this.lstcomments.matTaxableAmt+Number.EPSILON)*100)/100, 
            matTotTaxAmt: Math.round((this.lstcomments.matTotTaxAmt+Number.EPSILON)*100)/100, 
            matTotAmt: Math.round((this.lstcomments.matTotAmt+Number.EPSILON)*100)/100, 
            invTotAmt: Math.round(((this.lstcomments.labTotAmt + this.lstcomments.matTotAmt)+Number.EPSILON)*100)/100, 
           
            // addonLabDiscountPer1: Math.round((this.lstcomments.addonLabDiscountPer+Number.EPSILON)*100)/100,
            addonLabDiscount: Math.round((this.lstcomments.addonLabDiscount+Number.EPSILON)*100)/100, 
            addonLabTaxableAmt: Math.round((this.lstcomments.addonLabTaxableAmt+Number.EPSILON)*100)/100, 
            addonLabTotTaxAmt: Math.round((this.lstcomments.addonLabTotTaxAmt+Number.EPSILON)*100)/100,
            addonLabTotAmt: Math.round((this.lstcomments.addonLabTotAmt+Number.EPSILON)*100)/100, 
            // addonMatDiscoutPer1: Math.round((this.lstcomments.addonMatDiscoutPer+Number.EPSILON)*100)/100,
            addonMatDiscout: Math.round((this.lstcomments.addonMatDiscout+Number.EPSILON)*100)/100,
            addonMatTaxableAmt: Math.round((this.lstcomments.addonMatTaxableAmt+Number.EPSILON)*100)/100, 
            addonMatTotTaxAmt: Math.round((this.lstcomments.addonMatTotTaxAmt+Number.EPSILON)*100)/100, 
            addonMatTotAmt: Math.round((this.lstcomments.addonMatTotAmt+Number.EPSILON)*100)/100, 
            addonInvTotAmt: Math.round(((this.lstcomments.addonLabTotAmt + this.lstcomments.addonMatTotAmt)+Number.EPSILON)*100)/100, 
          
            // cwiLabDiscountPer1: Math.round((this.lstcomments.cwiLabDiscountPer+Number.EPSILON)*100)/100, 
            cwiLabDiscount: Math.round((this.lstcomments.cwiLabDiscount+Number.EPSILON)*100)/100, 
            cwiLabTaxableAmt: Math.round((this.lstcomments.cwiLabTaxableAmt+Number.EPSILON)*100)/100, 
            cwiLabTotTaxAmt: Math.round((this.lstcomments.cwiLabTotTaxAmt+Number.EPSILON)*100)/100,
            cwiLabTotAmt: Math.round((this.lstcomments.cwiLabTotAmt+Number.EPSILON)*100)/100, 
            // cwiMatDiscoutPer1: Math.round((this.lstcomments.cwiMatDiscoutPer+Number.EPSILON)*100)/100,
            cwiMatDiscout: Math.round((this.lstcomments.cwiMatDiscout+Number.EPSILON)*100)/100,
            cwiMatTaxableAmt: Math.round((this.lstcomments.cwiMatTaxableAmt+Number.EPSILON)*100)/100, 
            cwiMatTotTaxAmt: Math.round((this.lstcomments.cwiMatTotTaxAmt+Number.EPSILON)*100)/100, 
            cwiMatTotAmt: Math.round((this.lstcomments.cwiMatTotAmt+Number.EPSILON)*100)/100, 
            actualInsAmt: Math.round((this.lstcomments.insTotBasicAmt+Number.EPSILON)*100)/100, 
          
            insTaxableAmt:Math.round(((this.lstcomments.insMatTaxableAmt + this.lstcomments.insLabTaxableAmt)+Number.EPSILON)*100)/100, 
            insTotTaxAmt: Math.round(((this.lstcomments.insLabTotTaxAmt + this.lstcomments.insMatTotTaxAmt)+Number.EPSILON)*100)/100, 
            insLabTaxableAmt:Math.round((this.lstcomments.insLabTaxableAmt+Number.EPSILON)*100)/100,
            insLabTotTaxAmt:Math.round((this.lstcomments.insLabTotTaxAmt+Number.EPSILON)*100)/100,
            insLabTotAmt:Math.round((this.lstcomments.insLabTotAmt+Number.EPSILON)*100)/100,
            insMatTaxableAmt:Math.round((this.lstcomments.insMatTaxableAmt+Number.EPSILON)*100)/100,
            insMatTotTaxAmt:Math.round((this.lstcomments.insMatTotTaxAmt+Number.EPSILON)*100)/100,
            insMatTotAmt:Math.round((this.lstcomments.insMatTotAmt+Number.EPSILON)*100)/100,
            insInvTotAmt: Math.round(((this.lstcomments.insLabTotAmt + this.lstcomments.insMatTotAmt)+Number.EPSILON)*100)/100, 


            })

            // alert("this.lstcomments.addonLabDiscount :" +this.lstcomments.addonLabDiscount)

          
            var addonTotal =this.lstcomments.addonLabTotAmt +this.lstcomments.addonMatTotAmt
            var cwiTotal=this.lstcomments.cwiLabTotAmt+this.lstcomments.cwiMatTotAmt
            
            if(addonTotal >0) {this.addonBillable=true;} else {this.addonBillable=false;}
            if(cwiTotal >0) {this.cwiBillable=true;} else {this.cwiBillable=false;}
         
               
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


          // var disTotal = Number(this.lstcomments.labDiscount)+Number(this.lstcomments.matDiscout);   
          // var itotTxble=Number(this.lstcomments.matTaxableAmt)+Number(this.lstcomments.labTaxableAmt);
          // var itotTaxAmt=Number(this.lstcomments.labTotTaxAmt)+Number(this.lstcomments.matTotTaxAmt)
          // var totInvAmt=Number(this.lstcomments.labTotAmt)+Number(this.lstcomments.matTotAmt);

          // this.jobcardForm.patchValue({totDis: Math.round((disTotal+Number.EPSILON)*100)/100}); 
          // this.jobcardForm.patchValue({totTaxableAmt: Math.round((itotTxble+Number.EPSILON)*100)/100}); 
          // this.jobcardForm.patchValue({totTaxAmt: Math.round((itotTaxAmt+Number.EPSILON)*100)/100});
          // this.jobcardForm.patchValue({invTotAmt: Math.round((totInvAmt+Number.EPSILON)*100)/100}); 
         
               
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
       if(this.labLineValidation===false) { break;}
    }

    

   if(this.labLineValidation) {
     this.saveLabButton=false;

    const formValue: IjobCard = this.tranceFun(this.jobcardForm.value);

    formValue.emplId = Number(sessionStorage.getItem('emplId'));

    this.serviceService.lineWISESubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
       
        var jobNo = this.jobcardForm.get('jobCardNum').value;
        this.Search(jobNo);
        if (res.obj.classCodeType==='INSURER'){
        this.dispReadyInvoice = true;
        }
      } else {
        if (res.code === 400) {this.saveLabButton=true;
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
        this.saveMatButton=false;

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
        if (res.obj.classCodeType==='INSURER'){
        this.dispReadyInvoice = true;
        }
        this.importMatButton=true;
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
          this.saveMatButton=true;
          alert(res.message);
        }
      }
    });
  } else  { alert ("Please add Material details and Proceed...");}
  }

  updateArInvoice() {
       const formValue: IjobCard = this.tranceFun(this.jobcardForm.value);

      //  this.CheckJobHraderValidation()

      //  if(this.jobHeaderValidation) {
       
       var  resp=confirm("Do You Want to Update this Job Card Details ???");
       if(resp==true) {
   
        formValue.emplId = Number(sessionStorage.getItem('emplId'));
        formValue.dmsCustId = Number(this.jobcardForm.get('dmsCustId').value);
        var matDis=this.jobcardForm.get('matDiscout').value;
        var labDis=this.jobcardForm.get('labDiscount').value;
        // alert ( "matDis,labDis :" +matDis +","+labDis);

      // if(this.dispReadyInvoice===false) {alert( "Updation Not allowed...");  return;}

        var jcId =this.jobcardForm.get("jobCardId").value
        var jtype =this.jobcardForm.get('jcType').value
        this.serviceService.jobcardUpdateSubmit(formValue).subscribe((res: any) => {
        if (res.code === 200) { alert(res.message);  } else  {
        if (res.code === 400) { alert(res.message); }
        } });

      }
      // } 
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
    this.validateKm();

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

    if(formValue.promiseDate===null || formValue.promiseDate===undefined) {this.jobHeaderValidation = false;
      msg1="PROMISED DATE : Enter Promised Date....";alert(msg1);return;}
      
       
    
    
      this.jobHeaderValidation=true;

  }

  saveArInvoice() {

   
    const formValue: IjobCard = this.tranceFun(this.jobcardForm.value);
    this.CheckJobHraderValidation()

    if(this.jobHeaderValidation) {
    
    var  resp=confirm("Do You Want to Create this Job Card ???");
    if(resp==true) {

    formValue.emplId = Number(sessionStorage.getItem('emplId'));
    formValue.dmsCustId = Number(this.jobcardForm.get('dmsCustId').value);
    //  this.jobStatus='Opened';
    formValue.jobStatus = 'Opened';
    formValue.matStatus = 'No Material';
    this.dispButtonStatus=false;
    //  formValue.matStatus= (this.jobcardForm.get('matStatus').value);
    this.serviceService.jobcardHeaderSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        this.preInvButton=false;
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

  }
  } else {alert ("Please Update Job Header Details and Proceed...");}

}



  openCodeComb(i) {
    this.displayModal = false;
    this.showModal = true; // Show-Hide Modal Check
    this.content = i; // Dynamic Data
    let a = i + 1
    this.title = a;

      
      // var len2=this.lstcomments.jobCardLabLines[i].splitArr.length
// +     alert ("index :"+i );

      this.splitDetailsArray().clear();
      this.splitDetailsArray().push(this.splitDetailsGroup());
  
      var jobCardLabLinesControl = this.jobcardForm.get('jobCardLabLines').value;
      var lineTotAmt = jobCardLabLinesControl[i].basicAmt;
      this.lineBasicAmt=lineTotAmt;

      // var len1=this.splitDetailsArray().length;
      // var len2=this.lstcomments.jobCardLabLines[i].splitArr.length
      // alert ("splitDetailsArray().length :"+len1 + " ,this.lstcomments.jobCardLabLines[i].splitArr.length :" + len2);
    
      // if (len2==0){
      // var techId1=this.jobcardForm.get('techId').value;
      // var patch = this.jobcardForm.get('splitAmounts') as FormArray;
      // patch.controls[0].patchValue({ type: 'Technician' , techId: techId1, techAmt :lineTotAmt })
      // }

    for (let j = 0; j < this.lstcomments.jobCardLabLines[i].splitArr.length-1 ; j++) {
          var payInvGrp1: FormGroup = this.splitDetailsGroup();
          this.splitDetailsArray().push(payInvGrp1);
      }
    
     var tblDetails = this.lstcomments.jobCardLabLines[i].splitArr;   
     var splitLinesArr = this.jobcardForm.get('splitAmounts') as FormArray;
     
     for (let j = 0; j < this.lstcomments.jobCardLabLines[i].splitArr.length ; j++) {
    //   let selectTech = this.TechnicianList.find(d => d.teamId === tblDetails[j].techId);
       let tschType :string =  tblDetails[j].type;
       tschType = tschType.trim();
       (splitLinesArr.controls[j]).patchValue({ type: tschType, techId: tblDetails[j].techId,techAmt: tblDetails[j].techAmt,});
      }
    }


  validateTechAmt(t , i) {
    var jobCardLabLinesControl = this.jobcardForm.get('jobCardLabLines').value;
    var lineTotAmt = jobCardLabLinesControl[i].basicAmt;
    var patch = this.jobcardForm.get('splitAmounts') as FormArray;
   
    var splitControl = this.jobcardForm.get('splitAmounts').value;
    var techAmt =splitControl[t].techAmt;
    var len1=this.splitDetailsArray().length;
    var techTotAmt = 0;var techBalAmt=0

    for (let i = 0; i < this.splitDetailsArray().length; i++) {
        // if(i != t) {
          techTotAmt = techTotAmt + splitControl[i].techAmt;
        // }
    } 

      // alert ("array length :"+len1);
      // alert (" 1Line : " + i+" >> tech tot amt :"+techTotAmt  + "  , Linetotamt :"+lineTotAmt);

      if (techTotAmt > lineTotAmt) { 
        var excessAmt = techTotAmt-lineTotAmt
        // alert ("excessAmt  :"+excessAmt);
        var techLineAmt=techAmt-excessAmt;
        // alert ("techLinAmt  :"+techLineAmt);
        if(techLineAmt < 0) {techLineAmt=0}
        patch.controls[t].patchValue({techAmt:techLineAmt  });
      }

    
  }


  validateTechAmtOld(t , i) {
    var jobCardLabLinesControl = this.jobcardForm.get('jobCardLabLines').value;
    var lineTotAmt = jobCardLabLinesControl[i].basicAmt;
    var patch = this.jobcardForm.get('splitAmounts') as FormArray;
   
    var splitControl = this.jobcardForm.get('splitAmounts').value;
    var techAmt =splitControl[t].techAmt;
    var len1=this.splitDetailsArray().length;

   
    // alert (" 1Line : " + i+" >> tech tot amt :"+techTotAmt  + "  , Linetotamt :"+lineTotAmt);

    if(techAmt > lineTotAmt || techAmt <=0 && len1===1) { 
      this.techTotalValidation=true;
       patch.controls[0].patchValue({ techAmt: lineTotAmt });
      alert ("Distrubution Amount Mismatch...");return;
    } else {this.techTotalValidation=false;}

    var techTotAmt = 0;var techBalAmt=0
   
    for (let i = 0; i < this.splitDetailsArray().length-1; i++) {
      techTotAmt = techTotAmt + splitControl[i].techAmt;
    } 

      alert (" 2Line : " + i+" >> tech tot amt :"+techTotAmt  + "  , Linetotamt :"+lineTotAmt);


     techBalAmt=lineTotAmt-techTotAmt;
    if(techAmt>techBalAmt || techAmt <=0 || techAmt==null ||techAmt==undefined) {
      alert ("Distrubution Amount Mismatch...")
      patch.controls[t].patchValue({ techAmt: techBalAmt });
      this.techTotalValidation=true;
    }

  }

  TechSplitValidation (i) {

    const formValue: IjobCard = this.jobcardForm.value;
     var msg1;

     var splitControl = this.jobcardForm.get('splitAmounts').value;
     var lineValue1 = splitControl[i].type;
     var lineValue2 = splitControl[i].techId;
     var lineValue3 = splitControl[i].techAmt;

     var j = i + 1;
     

     if (lineValue1 === undefined || lineValue1 === null || lineValue1.trim()=='')  {
      this.techLineValidation = false;
      alert("Line-" + j +" TYPE: Should not be null....");
      return;
    }

    if (lineValue2 === undefined || lineValue2 === null || lineValue2 <= 0) {
      this.techLineValidation = false;
      msg1="Line-" + j +" TECHNICIAN: Should not be null....";
      alert(msg1);
      return;
    }

    if (lineValue3 === undefined || lineValue3 === null || lineValue3 <= 0) {
      this.techLineValidation = false;
      msg1="Line-" + j +" TECH AMT: Should be  above zero ....";
      alert(msg1);
      return;
    }

    this.techLineValidation=true;
    
  }



  fnCancatination(content) {
    
    var jobCardLabLinesControl = this.jobcardForm.get('jobCardLabLines').value;
    var lineTotAmt = jobCardLabLinesControl[content].basicAmt;
    var splitControl = this.jobcardForm.get('splitAmounts').value;
    var techTotAmt = 0;
    
    for (let i = 0; i < this.splitDetailsArray().length; i++) {
      techTotAmt = techTotAmt + splitControl[i].techAmt;
    }

    // alert (" Line : " + content+" >> tech tot amt :"+techTotAmt  + "  , Linetotamt :"+lineTotAmt);

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

  onOptionsDisTypeMatSelected(event,bType) {

    // alert(" EVENT :"+event);
   
    if(this.saveBillButton) {
    if(bType===1){

    if (event === 'Percentage') {
      this.showMatDisCol=false;this.showMatDisP=true;
      this.jobcardForm.patchValue({matDiscout:0});
      this.jobcardForm.patchValue({matDiscountPer1:0})
      this.matDiscountPerCal(0,bType) ;
    }

    if (event === 'Amount') {
      this.showMatDisP=false;this.showMatDisCol=true;
      this.jobcardForm.patchValue({matDiscout:0});
      this.jobcardForm.patchValue({matDiscountPer1:0})     
      this.matDiscountAmtCal(0,bType);
    }

   
      if (event === 'None') {
      // this.displayMatDiscount = false;
      this.showMatDisCol=false;this.showMatDisP=false;
      this.jobcardForm.patchValue({matDiscout:0})
      this.jobcardForm.patchValue({matDiscountPer1:0})
      this.matDiscountAmtCal(0,bType);
    }
    }

    if(bType===41){
      if (event === 'Percentage') {
        this.addonMatDisCol=false;this.addonMatdisP=true;
        this.jobcardForm.patchValue({addonMatDiscout:0});
        this.jobcardForm.patchValue({addonMatDiscoutPer1:0})
        this.matDiscountPerCal(0,bType) 
      }
      else if (event === 'Amount') {
        this.addonMatdisP=false;this.addonMatDisCol=true;
        this.jobcardForm.patchValue({addonMatDiscout:0});
        this.jobcardForm.patchValue({addonMatDiscoutPer1:0})
        this.matDiscountAmtCal(0,bType);
      }
  
      // if (event === '--Select--') {
        if (event === 'None') {
        // this.displayMatDiscount = false;
        this.addonMatDisCol=false;this.addonMatdisP=false;
        this.jobcardForm.patchValue({addonMatDiscout:0})
        this.jobcardForm.patchValue({addonMatDiscoutPer1:0})
        this.matDiscountAmtCal(0,bType);
      }


    }

    if(bType===21){
      if (event === 'Percentage') {
        this.cwiMatDisCol=false;this.cwiMatdisP=true;
        this.jobcardForm.patchValue({cwiMatDiscout:0});
        this.jobcardForm.patchValue({cwiMatDiscoutPer1:0})
        this.matDiscountPerCal(0,bType) 
      }
      else if (event === 'Amount') {
        this.cwiMatdisP=false;this.cwiMatDisCol=true;
        this.jobcardForm.patchValue({cwiMatDiscout:0});
        this.jobcardForm.patchValue({cwiMatDiscoutPer1:0})
        this.matDiscountAmtCal(0,bType);
      }
  
      // if (event === '--Select--') {
        if (event === 'None') {
        // this.displayMatDiscount = false;
        this.cwiMatDisCol=false;this.cwiMatdisP=false;
        this.jobcardForm.patchValue({cwiMatDiscout:0})
        this.jobcardForm.patchValue({cwiMatDiscoutPer1:0})
        this.matDiscountAmtCal(0,bType);
      }


    }

   }
  }

  onOptionsDisTypeLabSelected(event ,bType) {
    // alert ("Event , Billtype : "+event + " , "+bType);
    if(this.saveBillButton) {

    if(bType===1) {
    if (event === 'Percentage') {
      this.showLabDisCol=false;this.showLabdisP=true;
      this.jobcardForm.patchValue({labDiscount:0})
      this.jobcardForm.patchValue({labDiscountPer1:0})
       this.labDiscountPerCal(0,bType) ;
    }
    if (event === 'Amount') {
      this.showLabDisCol=true;this.showLabdisP=false;
      this.jobcardForm.patchValue({labDiscount:0})
      this.jobcardForm.patchValue({labDiscountPer1:0})
      this.labDiscountAmtCal(0,bType);
    }

    if (event === 'None'  || event ===undefined) {
      this.displayLabDiscount = false;this.showLabDisCol=false;this.showLabdisP=false;
      this.jobcardForm.patchValue({labDiscount:0})
      this.jobcardForm.patchValue({labDiscountPer1:0})
      this.labDiscountAmtCal(0,bType);
    }

    // var labBasicAmt = Number(this.jobcardForm.get('labBasicAmt').value);
    // var matBasicAmt = Number(this.jobcardForm.get('matBasicAmt').value)
    // this.jobcardForm.patchValue({ actualBasicAmt: Math.round(labBasicAmt + matBasicAmt) })
  }

  

  if(bType===41) {
    if (event === 'Percentage') {
      this.addonLabDisCol=false;this.addonLabdisP=true;
      this.jobcardForm.patchValue({addonLabDiscount:0})
      this.jobcardForm.patchValue({addonLabDiscountPer1:0})
       this.labDiscountPerCal(0,bType) ;
    }
    if (event === 'Amount') {
      this.addonLabDisCol=true;this.addonLabdisP=false;
      this.jobcardForm.patchValue({addonLabDiscount:0})
      this.jobcardForm.patchValue({addonLabDiscountPer1:0})
      this.labDiscountAmtCal(0,bType);
    }

    if (event === 'None' || event ===undefined) {
      this.displayLabDiscount = false;this.addonLabDisCol=false;this.addonLabdisP=false;
      this.jobcardForm.patchValue({addonLabDiscountPer1:0})
      this.jobcardForm.patchValue({addonLabDiscount:0})
      this.labDiscountAmtCal(0,bType);
    }

    // var addonlabBasicAmt = Number(this.jobcardForm.get('addonLabBasicAmt').value);
    // var addonmatBasicAmt = Number(this.jobcardForm.get('addonMatBasicAmt').value)
    // this.jobcardForm.patchValue({ actualBasicAmt: Math.round(addonlabBasicAmt + addonmatBasicAmt) })
  }

  if(bType===21) {
    if (event === 'Percentage') {
      this.cwiLabDisCol=false;this.cwiLabdisP=true;
      this.jobcardForm.patchValue({cwiLabDiscount:0})
      this.jobcardForm.patchValue({cwiLabDiscountPer1:0})
       this.labDiscountPerCal(0,bType) ;
    }
    if (event === 'Amount') {
      this.cwiLabDisCol=true;this.cwiLabdisP=false;
      this.jobcardForm.patchValue({cwiLabDiscount:0})
      this.jobcardForm.patchValue({cwiLabDiscountPer1:0})
      this.labDiscountAmtCal(0,bType);
    }

    if (event === 'None' || event ===undefined) {
      this.displayLabDiscount = false;this.cwiLabDisCol=false;this.cwiLabdisP=false;
      this.jobcardForm.patchValue({cwiLabDiscountPer1:0})
      this.jobcardForm.patchValue({cwiLabDiscount:0})
      this.labDiscountAmtCal(0,bType);
    }
  }



  }

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
    var  resp=confirm("Do You Want to Generate Invoice for this Vehicle ???");

    if(resp==true) {

    this.genBillButton=false;
    this.printAddonInvButton=false;
    this.saveBillButton=false;
    this.preInvButton=false;
    this.reopenButton=false;

    var jcTp =this.jobcardForm.get('jcType').value;

    this.serviceService.GenerateInvoiceFN(jobCardNum).subscribe((res: any) => {


      if (res.code === 200) {
        this.printInvoiceButton=true;
        this.saveBillButton=false;
        this.preInvButton=false;
        this.reopenButton=false;
        alert(res.message);

         if(jcTp==='Service') {
          this.arInvNum = res.obj.InvoiceNo;
          this.addonInvoiceNo=res.obj.AddonInvoiceNo;
          this.cwiInvoiceNo=res.obj.CWIInvoiceNo;
          if(res.obj.AddonInvoiceNo>0) {this.printAddonInvButton=true;}
          if(res.obj.cwiInvoiceNo>0) {this.printCwiInvButton=true;}
          
        }
        if(jcTp==='BS') {
          this.custInvoiceNo  = res.obj.CustomerInvoiceNo;
          this.insInvoiceNo   = res.obj.InsuranceInvoiceNo;
        }
    
      } else {
        // if (res.code === 400) {
          this.genBillButton=true;
          this.saveBillButton=true;
          this.preInvButton=true;
          this.reopenButton=true;
          alert(res.code+" - "+res.message);
        // }
      }

    });
  }
}

  CheckSaveBillValidation() {
    const formValue: IjobCard = this.jobcardForm.value;
    var msg1;
    // alert ("formValue.labDiscountPer :"+formValue.labDiscountPer);
    // alert ("formValue.matDiscountPer :"+formValue.matDiscountPer);

    // var jtype =this.jobcardForm.get('jcType').value;
    // if(jtype==='Service') {
     
    if(formValue.disTypeLab==='Percentage' && formValue.labDiscountPer >0 && formValue.labDiscount<=0 )  {this.saveBillValidation = false;
      msg1="LABOUR DISCOUNT : Should not be null....";alert(msg1);return;}

    if(formValue.disTypeLab==='Amount' && (formValue.labDiscount<=0)){this.saveBillValidation = false;
        msg1="LABOUR DISCOUNT AMT: Enter Valid Discount Amt...";alert(msg1);return;}

    if(formValue.disTypeMat==='Percentage' && formValue.matDiscountPer>0 && formValue.matDiscout<=0 ){this.saveBillValidation = false;
      msg1="MATERIAL DISCOUNT : Should not be null....";alert(msg1);return;}

    if(formValue.disTypeMat==='Amount' && (formValue.matDiscout<=0 )){this.saveBillValidation = false;
        msg1="MATERIAL DISCOUNT AMT: Enter Valid Discount Amt...";alert(msg1);return;}

      var custDisc= Number(this.jobcardForm.get("labDiscount").value) +Number(this.jobcardForm.get("matDiscout").value)
      var addonDisc= Number(this.jobcardForm.get("addonLabDiscount").value) +Number(this.jobcardForm.get("addonMatDiscout").value)
      var totDisc=custDisc+addonDisc;
     
      // alert("Total Discount  Applied  : " + totDisc + " , " +formValue.disCategory  + " , "+formValue.disAuthBy);

      if(totDisc>0) {
      if (formValue.disCategory == null || formValue.disCategory == undefined || formValue.disCategory.trim() == '') {
        alert("DISCOUNT  TYPE :  Please select Discount Type.");
        this.saveBillValidation=false;
        return;
      }

      if (formValue.disAuthBy == null || formValue.disAuthBy == undefined || formValue.disAuthBy.trim() == '') {
        alert("AUTHORISED BY :  Please select Discount Approved By.");
        this.saveBillValidation=false;
        return;
      }

    }
   
      this.saveBillValidation=true;
  
  }


  BillingCal() {

    var  resp=confirm("Do You Want to Save the Bill Details ???");

    if(resp==true) {

   this.CheckSaveBillValidation()
    if(this.saveBillValidation) {
    this.saveBillButton=false;
  
    const formValue: IjobCard = this.tranceFun(this.jobcardForm.value);
    this.serviceService.BillingCal(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        this.genBillButton=true;this.reopenButton=false;
        alert(res.message);
        // var jobNo = this.jobcardForm.get('jobCardNum').value;
        // this.Search(jobNo);

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

        var jobNo = this.jobcardForm.get('jobCardNum').value;
        this.Search(jobNo);

      
        // this.jobcardForm.patchValue({jobCardNum:res.obj.jobCardNum})
      } else {
        if (res.code === 400) {
          this.dispReadyInvoice=false;
           this.saveBillButton=false;
           this.reopenButton=false;
          alert(res.message);
        }
      }
    });
    // }else{
    //   alert("Material status not completed")
    // }
  }


  labDiscountPerCal(event :any,billTp) {

    // alert ("event ,billTp : "+ event + " , " +billTp)
  
    var totlabtaxamt = 0;
    var totAddonlabtaxamt = 0;
    var totCwilabTaxAmt=0;
    var x =Number(event);
    
    var labBasicAmt = (this.jobcardForm.get('labBasicAmt').value)
    var matTotAt = this.jobcardForm.get('matTotAmt').value;

    var labAddonBasicAmt = (this.jobcardForm.get('addonLabBasicAmt').value)
    var matAddonTot = (this.jobcardForm.get('addonMatTotAmt').value)

    var labCwiBasicAmt = (this.jobcardForm.get('cwiLabBasicAmt').value)
    var matCwiTot = (this.jobcardForm.get('cwiMatBasicAmt').value)



    var controlArr = this.jobcardForm.get('jobCardLabLines').value;
   
    var jct=this.jobcardForm.get('jcType').value;
   
    if(jct==='Service'){

        // alert ("Bill Type , % :" + billTp + " , "+event);
       

        for (var i = 0; i < controlArr.length; i++) {

          if(controlArr[i].billableTyId===1){
            var basicDisc = (controlArr[i].basicAmt * event) / 100;
            totlabtaxamt = totlabtaxamt + ((controlArr[i].basicAmt - basicDisc) * controlArr[i].taxPer) / 100;
            }

          if(controlArr[i].billableTyId===41){
            var basicDisc = (controlArr[i].basicAmt * event) / 100;
            totAddonlabtaxamt = totAddonlabtaxamt + ((controlArr[i].basicAmt - basicDisc) * controlArr[i].taxPer) / 100;
            }

            if(controlArr[i].billableTyId===21){
              var basicDisc = (controlArr[i].basicAmt * event) / 100;
              totCwilabTaxAmt = totCwilabTaxAmt + ((controlArr[i].basicAmt - basicDisc) * controlArr[i].taxPer) / 100;
              }
        }
      }
            // if(jct==='BS'){
            //   for (var i = 0; i < controlArr.length; i++) {
            //     var basictax = Number(controlArr[i].custBasicAmt * event) / 100;
            //     totlabtaxamt = totlabtaxamt + (Number((controlArr[i].custBasicAmt) - basictax) * controlArr[i].taxPer) / 100;
            //   }
            // }

      if(billTp===1) {
            var perValueLab = (labBasicAmt * event) / 100;
            // var aaa = labBasicAmt - perValueLab;
            // var netAmt=((totlabtaxamt + aaa) +matTotAt);
            // netAmt=Math.round(netAmt);
            // var labLineTot=totlabtaxamt + aaa;

            // alert ("lab basi , pervalLab ,event: "+labBasicAmt +" , " + perValueLab + "  , "+event);

          this.jobcardForm.patchValue({
            labDiscountPer:Math.round((x+Number.EPSILON)*100)/100, 
            labDiscount: Math.round((perValueLab+Number.EPSILON)*100)/100, 
            labTaxableAmt: Math.round((labBasicAmt - perValueLab+Number.EPSILON)*100)/100, 
            labTotTaxAmt: Math.round((totlabtaxamt+Number.EPSILON)*100)/100, 
            // labTotAmt:Math.round((labLineTot+Number.EPSILON)*100)/100, 
            labTotAmt:Math.round((((labBasicAmt - perValueLab)+(totlabtaxamt))+Number.EPSILON)*100)/100, 

           });
      }

      if(billTp===41) {
        var perValueLabAddon = (labAddonBasicAmt * event) / 100;
        // var bbb = labAddonBasicAmt - perValueLabAddon;
        // var netAmtAddon=((totAddonlabtaxamt + bbb) +matAddonTot);
        //     netAmtAddon=Math.round(netAmtAddon);
        // var labLineTotAddon=totAddonlabtaxamt + bbb;
      

        this.jobcardForm.patchValue({
        addonLabDiscountPer:Math.round((x+Number.EPSILON)*100)/100, 
        addonLabDiscount: Math.round((perValueLabAddon+Number.EPSILON)*100)/100, 
        addonLabTaxableAmt: Math.round((labAddonBasicAmt - perValueLabAddon+Number.EPSILON)*100)/100, 
        addonLabTotTaxAmt: Math.round((totAddonlabtaxamt+Number.EPSILON)*100)/100, 
        // addonLabTotAmt:Math.round((labLineTotAddon+Number.EPSILON)*100)/100, 
        addonLabTotAmt:Math.round((((labAddonBasicAmt - perValueLabAddon)+(totAddonlabtaxamt))+Number.EPSILON)*100)/100, 
      });
    }
    if(billTp===21) {
      var perValueLabCwi = (labCwiBasicAmt * event) / 100;
     
      this.jobcardForm.patchValue({
      cwiLabDiscountPer:Math.round((x+Number.EPSILON)*100)/100, 
      cwiLabDiscount: Math.round((perValueLabCwi+Number.EPSILON)*100)/100, 
      cwiLabTaxableAmt: Math.round((labCwiBasicAmt - perValueLabCwi+Number.EPSILON)*100)/100, 
      cwiLabTotTaxAmt: Math.round((totCwilabTaxAmt+Number.EPSILON)*100)/100, 
      // addonLabTotAmt:Math.round((labLineTotAddon+Number.EPSILON)*100)/100, 
      cwiLabTotAmt:Math.round((((labCwiBasicAmt - perValueLabCwi)+(totCwilabTaxAmt))+Number.EPSILON)*100)/100, 
    });
  }

    this.CalculateTotal();
  }
  

  matDiscountPerCal(event,billTp) {
    var matBasicAmt = (this.jobcardForm.get('matBasicAmt').value)
    var labTotAt = Number(this.jobcardForm.get('labTotAmt').value);

    var matBasicAmtAddon = (this.jobcardForm.get('addonMatBasicAmt').value)
    var labTotalAddon = Number(this.jobcardForm.get('addonLabTotAmt').value);

    var matBasicAmtCwi = (this.jobcardForm.get('cwiMatBasicAmt').value)
    var labTotalCwi = Number(this.jobcardForm.get('cwiLabTotAmt').value);


    var control = this.jobcardForm.get('jobCardMatLines').value;
    var totmattaxamt = 0;
    var totAddonMattaxamt = 0;
    var totCwiMatTaxAmt=0;
    var x=Number(event);

    // alert ("x=event,billTp= " +x+ "  , "+billTp);

    for (var i = 0; i < control.length; i++) {
      if(control[i].billableTyId===1){
        var basicDisc = (control[i].basicAmt * event) / 100;
        // totmattaxamt = totmattaxamt + (control[i].basicAmt * control[i].taxPer) / 100;
        totmattaxamt = totmattaxamt + ((control[i].basicAmt - basicDisc) * control[i].taxPer) / 100;
      }

      if(control[i].billableTyId===41){
        var basicDisc = (control[i].basicAmt * event) / 100;
        // totmattaxamt = totmattaxamt + (control[i].basicAmt * control[i].taxPer) / 100;
        totAddonMattaxamt = totAddonMattaxamt + ((control[i].basicAmt - basicDisc) * control[i].taxPer) / 100;
      }

      if(control[i].billableTyId===21){
        var basicDisc = (control[i].basicAmt * event) / 100;
        // totmattaxamt = totmattaxamt + (control[i].basicAmt * control[i].taxPer) / 100;
        totCwiMatTaxAmt = totCwiMatTaxAmt + ((control[i].basicAmt - basicDisc) * control[i].taxPer) / 100;
      }



    }

    if(billTp===1) {
      var perValuePart = (matBasicAmt * event) / 100;
      // var temp = (totmattaxamt * event) / 100;
      // var netAmt=(matBasicAmt-perValuePart)+(totmattaxamt-temp)+labTotAt
      // netAmt=netAmt;
      // alert("perValuePart,matBasicAmt,totmattaxamt :"+perValuePart+","+matBasicAmt+","+totmattaxamt);
        
      this.jobcardForm.patchValue({
      matDiscountPer:Math.round((x+Number.EPSILON)*100)/100,
      matDiscout: Math.round((perValuePart+Number.EPSILON)*100)/100, 
      matTaxableAmt: Math.round(((matBasicAmt - perValuePart)+Number.EPSILON)*100)/100, 
      // matTotTaxAmt: Math.round(((totmattaxamt-temp)+Number.EPSILON)*100)/100, 
      matTotTaxAmt: Math.round(((totmattaxamt)+Number.EPSILON)*100)/100, 
      matTotAmt:Math.round((((matBasicAmt - perValuePart)+(totmattaxamt))+Number.EPSILON)*100)/100, 

    });
  }

  if(billTp===41) {
    var perValuePart = (matBasicAmtAddon * event) / 100;
    // var temp = (totAddonMattaxamt * event) / 100;
    // var netAmt=(matBasicAmtAddon-perValuePart)+(totAddonMattaxamt-temp)+labTotalAddon
    // netAmt=netAmt;
    this.jobcardForm.patchValue({
    addonMatDiscoutPer : Math.round((x+Number.EPSILON)*100)/100, 
    addonMatDiscout: Math.round((perValuePart+Number.EPSILON)*100)/100, 
    addonMatTaxableAmt: Math.round(((matBasicAmtAddon - perValuePart)+Number.EPSILON)*100)/100, 
    addonMatTotTaxAmt: Math.round(((totAddonMattaxamt)+Number.EPSILON)*100)/100, 
    addonMatTotAmt:Math.round((((matBasicAmtAddon - perValuePart)+(totAddonMattaxamt))+Number.EPSILON)*100)/100, 

  });
 }

 if(billTp===21) {
  var perValuePart = (matBasicAmtCwi * event) / 100;
  // var temp = (totAddonMattaxamt * event) / 100;
  // var netAmt=(matBasicAmtAddon-perValuePart)+(totAddonMattaxamt-temp)+labTotalAddon
  // netAmt=netAmt;
  this.jobcardForm.patchValue({
  cwiMatDiscoutPer : Math.round((x+Number.EPSILON)*100)/100, 
  cwiMatDiscout: Math.round((perValuePart+Number.EPSILON)*100)/100, 
  cwiMatTaxableAmt: Math.round(((matBasicAmtCwi - perValuePart)+Number.EPSILON)*100)/100, 
  cwiMatTotTaxAmt: Math.round(((totCwiMatTaxAmt)+Number.EPSILON)*100)/100, 
  cwiMatTotAmt:Math.round((((matBasicAmtCwi - perValuePart)+(totCwiMatTaxAmt))+Number.EPSILON)*100)/100, 

});
}


    this.CalculateTotal();
  }

  labDiscountAmtCal(event,billTp){
    // alert ("Event,billtp: "+event+" ,"+billTp);
    var labBasicAmt = (this.jobcardForm.get('labBasicAmt').value)
    var labDisAmt = (this.jobcardForm.get('labDiscount').value)

    var labAddonBasic = (this.jobcardForm.get('addonLabBasicAmt').value)
    var labAddonDisAmt = (this.jobcardForm.get('addonLabDiscount').value)

    var labcwiBasic = (this.jobcardForm.get('cwiLabBasicAmt').value)
    var labcwiDisAmt = (this.jobcardForm.get('cwiLabDiscount').value)




    if(labDisAmt>labBasicAmt || labDisAmt <0 ) {
      labDisAmt=0;  alert("Customer:Please Enter a Valid Discount Amt...");
      this.jobcardForm.patchValue({labDiscount :0});;
    }

    if(labAddonDisAmt>labAddonBasic || labAddonDisAmt <0 ) {
      labAddonDisAmt=0;  alert("Addon:Please Enter a Valid Discount Amt...");
      this.jobcardForm.patchValue({addonLabDiscount :0});;
    }

    // if(billTp===1)  {  var discP = (labDisAmt * 100) / labBasicAmt;}
    // if(billTp===41) {  var discP = (labAddonDisAmt * 100) /labAddonBasic ;}
    // if(billTp===21) {  var discP = (labcwiDisAmt * 100) /labcwiBasic ;}


    if(billTp===1)  {  
      if(labBasicAmt <=0) { var discP=0; } else { var discP = (labDisAmt * 100) / labBasicAmt; ;}
     }

     if(billTp===41) {  
      if(labAddonBasic <=0) { var discP=0; } else {  var discP = (labAddonDisAmt * 100) /labAddonBasic ;}
     }

     if(billTp===21) {  
      if(labcwiBasic <=0) { var discP=0; } else {  var discP = (labcwiDisAmt * 100) /labcwiBasic ;}
     }

   
    if(discP===undefined || discP===null) {discP=0;}
    // alert ("discp ="+discP);
    this.labDiscountPerCal(discP,billTp)
  }



  matDiscountAmtCal(event,billTp) {
  
    var matBasicAmt    = (this.jobcardForm.get('matBasicAmt').value)
    var matDisAmt      = (this.jobcardForm.get('matDiscout').value)

    var matAddonBasic  = (this.jobcardForm.get('addonMatBasicAmt').value)
    var matAddonDisAmt = (this.jobcardForm.get('addonMatDiscout').value)

    var matCwiBasic  = (this.jobcardForm.get('cwiMatBasicAmt').value)
    var matCwiDisAmt = (this.jobcardForm.get('cwiMatDiscout').value)

    if(matDisAmt>matBasicAmt || matDisAmt <0 ) {
      matDisAmt=0;alert("Customer:Please Enter a Valid Discount Amt...");
      this.jobcardForm.patchValue({matDiscout :0});return;
    }

    if(matAddonDisAmt>matAddonBasic || matAddonDisAmt <0 ) {
      matDisAmt=0;alert("Addon:Please Enter a Valid Discount Amt...");
      this.jobcardForm.patchValue({addonMatDiscout :0});return;
    }

    

    if(billTp===1)  {  
      if(matBasicAmt <=0) { var discP=0; } else { var discP = (matDisAmt * 100) / matBasicAmt ;}
     }


    if(billTp===41) {  
      if(matAddonBasic<=0) { var discP=0; } else {var discP = (matAddonDisAmt * 100) /matAddonBasic ;}
    }
    if(billTp===21) {  
      if(matCwiBasic<=0) { var discP=0; } else {var discP = (matCwiDisAmt * 100) /matCwiBasic ;}
    }

    // alert("dsip= "+discP);

      if(discP===undefined || discP===null) {discP=0;}
      this.matDiscountPerCal (discP,billTp);
  }


  labDiscountAmtCalOld(event) {
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
        if(control[i].billableTyId===1) {
        var perDisLab = (control[i].basicAmt * perValueLab) / 100;
        var pervalLab = control[i].basicAmt - perDisLab;
        totlabtaxamt = totlabtaxamt + (pervalLab * control[i].taxPer) / 100;
        }

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


      //  this.CalculateTotal();
  }
  
  matDiscountAmtCalOld(event) {
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
      if(control[i].billableTyId===1) {
      var perDisMat = (control[i].basicAmt * perValueMat) / 100;
      var pervalMat = control[i].basicAmt - perDisMat;
      totmattaxamt = totmattaxamt + (pervalMat * control[i].taxPer) / 100;
      totalMatTaxableAmt = totalMatTaxableAmt + pervalMat;
      }
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
    // this.CalculateTotal();
  }

  CalculateTotal() {
    //   var ltot =Number (this.jobcardForm.get('labTotAmt').value);
    //   var ltaxable= Number(this.jobcardForm.get('labTaxableAmt').value)
    //   var ltax= Number(this.jobcardForm.get('labTotTaxAmt').value)
    //   var mtot = Number(this.jobcardForm.get('matTotAmt').value)
    //   var mtaxable= Number(this.jobcardForm.get('matTaxableAmt').value)
    //   var mtax= Number(this.jobcardForm.get('matTotTaxAmt').value);


      
    //   this.jobcardForm.patchValue({
    //     totTaxableAmt:Math.round(((ltaxable+mtaxable)+Number.EPSILON)*100)/100,
    //     totTaxAmt:Math.round(((ltax+mtax)+Number.EPSILON)*100)/100,
    //     invTotAmt:Math.round(((ltot+mtot)+Number.EPSILON)*100)/100,
    // });

    var custTotal=Number(this.jobcardForm.get('labTotAmt').value) +Number(this.jobcardForm.get('matTotAmt').value)
    var addonTotal=Number(this.jobcardForm.get('addonLabTotAmt').value) +Number(this.jobcardForm.get('addonMatTotAmt').value)
    var cwiTotal=Number(this.jobcardForm.get('cwiLabTotAmt').value) +Number(this.jobcardForm.get('cwiMatTotAmt').value)

     this.jobcardForm.patchValue({
          invTotAmt:Math.round(((custTotal)+Number.EPSILON)*100)/100,
          addonInvTotAmt:Math.round(((addonTotal)+Number.EPSILON)*100)/100,
          cwiInvTotAmt:Math.round(((cwiTotal)+Number.EPSILON)*100)/100,
    });

     }


  kmValidate(event: any) { this.validateKm() ; }

  validateKm() {
    var vehRegno=this.jobcardForm.get('regNo').value;
    var kmEmtered=this.jobcardForm.get('lastRunKms').value;

    // this.getLastRunKms(vehRegno);   
    // var storeKm = this.RegNoList2.lastRunKms;
     var storeKm =this.jobcardForm.get('storedKmr').value;;
    //  alert ("Last  km :"+storeKm + " , Entered km :"+kmEmtered);

    if (kmEmtered < storeKm || kmEmtered<=0) {
      alert("Please Enter a Valid KMR .It should not be less than Last run KMR.\nLst Run KMR :"+storeKm);
      this.jobcardForm.patchValue({ lastRunKms: storeKm });
      this.jobHeaderValidation=false;
    }
  }

  getLastRunKms(RegNo) {
    // alert(RegNo);
    var jcType=this.jobcardForm.get('jcType').value;
    this.serviceService.getByRegNo(RegNo, sessionStorage.getItem('ouId'),jcType)
      .subscribe(
        data => {
          this.RegNoList2 = data.obj;
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
  this.onInput($event)
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
  
    var arrayControl = this.jobcardForm.get('jobCardLabLines').value
    var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
    var genItem =arrayControl[index].genericItem;
   
     console.log(index);
    var mQty =arrayControl[index].qty;
    var taxP =arrayControl[index].taxPer;
    if(genItem==='N') {
    if(mQty <=0 )    // || Number.isInteger(mQty)==false 
      { 
        alert ("Please Enter a Valid Qty.");
        (patch.controls[index]).patchValue({ qty:'',basicAmt:0,taxAmt:0,laborAmt:0});return;
      }
     }
   
    var baseAmtLineWise = arrayControl[index].unitPrice * arrayControl[index].qty;
    var txAmt =baseAmtLineWise * taxP/100;
    (patch.controls[index]).patchValue({ basicAmt: baseAmtLineWise,taxAmt:txAmt, laborAmt: baseAmtLineWise+txAmt, })
  
}

validateLabQty(index: any){
  var arrayControl = this.jobcardForm.get('jobCardLabLines').value
  var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;

  var baseAmtLineWise = arrayControl[index].unitPrice * arrayControl[index].qty;

 var x= arrayControl[index].qty
//  alert(x);

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

printPreInvoiceDp(custTp){

  var jcNum=this.jobcardForm.get('jobCardNum').value
  var jctype=this.jobcardForm.get('jcType').value

  const fileName = 'download.pdf';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  this.serviceService.printWsPreInvdocumentDp(jcNum,jctype,custTp)
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


printWSAdnInvoice(){
  var jcNum=this.jobcardForm.get('jobCardNum').value
  var jctype=this.jobcardForm.get('jcType').value
  const fileName = 'download.pdf';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  this.serviceService.printWsAddonInvoicedocument(jcNum,jctype)
    .subscribe(data => {
      var blob = new Blob([data], { type: 'application/pdf' });
      var url = URL.createObjectURL(blob);
      var printWindow = window.open(url, '', 'width=800,height=500');
      printWindow.open
      
    });
}





printWSInvoiceDp(custtp){
  var jcNum=this.jobcardForm.get('jobCardNum').value
  var jctype=this.jobcardForm.get('jcType').value
  const fileName = 'download.pdf';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  this.serviceService.printWsInvoicedocumentDp(jcNum,jctype,custtp)
    .subscribe(data => {
      var blob = new Blob([data], { type: 'application/pdf' });
      var url = URL.createObjectURL(blob);
      var printWindow = window.open(url, '', 'width=800,height=500');
      printWindow.open
      
    });
}

printWSCwiInvoice(){alert ("Not Available...WIP");}


showReceiptScreen(){
  var mVehNo =this.jobcardForm.get('regNo').value;
  alert ("mVehNo :"+mVehNo);
  this.router.navigate(['/admin/transaction/PaymentAr' ,mVehNo]);
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
  pDt.setHours(0,0,0,0);
  currDate.setHours(0,0,0,0);

  // alert ("promdate,currdate :"+pDt +","+currDate);
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
        var jOuId =this.ouId;

        if(jcNum==undefined || jcNum==null || jcNum.trim()=='') {jcNum=null;} else{jcNum=jcNum.toUpperCase();}
        if(jRegNo==undefined || jRegNo==null || jRegNo.trim()=='') {jRegNo=null} else {jRegNo=jRegNo.toUpperCase();}
        if(jDate==undefined || jDate==null || jDate=='' ) {jDate=null}
        if(jStatus==undefined || jStatus==null || jStatus.trim()=='') {jStatus=null}


        if (Number(sessionStorage.getItem('dept')) ===4)  {
          this.serviceService.getJonCardNoSearchOu(jcNum,jDate,jStatus,jRegNo,jOuId)
          .subscribe(
            data => {
              if(data.length >0) {
              this.lstJobcardList = data;
              console.log(this.lstJobcardList); 
              } else {  alert("No Jobcard found for the given criteria...")}
            });
          } 
        else{
            this.serviceService.getJonCardNoSearchLoc(jcNum,jDate,jStatus,jRegNo,jLocId)
            .subscribe(
              data => {
                if(data.length >0) {
                this.lstJobcardList = data;
                console.log(this.lstJobcardList); 
                } else {  alert("No Jobcard found for the given criteria...")}
              });
          }
        
        }

        clearSearch() {
          this.jobcardForm.get('jobCardNum2').reset();
          this.jobcardForm.get('regNo1').reset();
          this.jobcardForm.get('JobOpenDt').reset();
          this.jobcardForm.get('jobStatus1').reset();
          
          this.lstJobcardList = null;
        }


        LoadSearchForm(){
          this.jobcardForm.get('jobCardNum2').enable();
          this.jobcardForm.get('regNo1').enable();
          this.jobcardForm.get('JobOpenDt').enable();
          this.jobcardForm.get('jobStatus1').enable();
          // this.lstJobcardList=null;
        }

       

        CheckForDuplicateLineItem(mCpnId,mIndex){
        var cpnLineArr = this.jobcardForm.get('jobCardLabLines').value;
        var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
        var len1=cpnLineArr.length;
        // alert("line item array length :"+len1 + "," +mItemId);

        for (let i = 0; i < len1 ; i++)
          {
            // alert("inside for loop");
            var lineItemId=cpnLineArr[i].itemId;
            if(mIndex != i) {
            if (lineItemId===mCpnId) {
              this.duplicateLabLineItem=true;
               alert(lineItemId+" DUPLICATE line item. Please check item in Line - " +(i+1));

               patch.controls[mIndex].patchValue({ itemId: '' });
               patch.controls[mIndex].patchValue({ segment: '' });
               patch.controls[mIndex].patchValue({ description: '' });
               break;
              }

              }else{this.duplicateLabLineItem=false;}

              this.duplicateLabLineItem=false;
          }

      }

      getTrans(i) {
        this.lineIndex=i;
        this.searchBy='ITEM CODE';
        this.lstcomments1=null;
        this.searchByItemCode=null;
        this.searchByItemDesc=null;
      }

    getItem(itemSeg, i){
      var arrayControl = this.jobcardForm.get('jobCardLabLines').value
      var billTp =arrayControl[i].billableTyId;
      this.serchByitemIdPrice(itemSeg,i,billTp)
  }

   
onSearchTypeSelected(evnt) {
  // alert ("in onSearchTypeSelected ")
  //  this.LoadModal();
  // this.resetDet();
  this.lstcomments = null;
  this.lstcomments1 = null;
  this.searchByItemDesc = null;

  if (evnt == 'ITEM CODE') {
    this.searchByItem = true;
    this.searchByDesc = false;
  }
  if (evnt == 'ITEM DESCRIPTION') {
    this.searchByDesc = true;
    this.searchByItem = false;
  }
}



SearchPartNum(){

  var  sType =this.jobcardForm.get('searchBy').value;
  // alert ("Search by :"+this.searchBy);
  if(sType ==='ITEM CODE') {
  var itmCd=this.jobcardForm.get('searchByItemCode').value;
 
  // alert (itmCd);
  if(itmCd ===null || itmCd ===undefined || itmCd.trim()==='') {this.lstcomments1=null;return;}
  itmCd=itmCd.toUpperCase();
      this.service.searchByItemCodeInclude(itmCd).subscribe(
        data =>{
          this.lstcomments1= data;
          console.log(this.lstcomments1);
    });
  }

  if(sType ==='ITEM DESCRIPTION') {
    var itmDesc=this.jobcardForm.get('searchByItemDesc').value;
    // alert (itmDesc);
    if(itmDesc ===null || itmDesc ===undefined || itmDesc.trim()==='') {this.lstcomments1=null;  return;}
    itmDesc=itmDesc.toUpperCase();    
    this.service.searchByItemDescInclude(itmDesc,sessionStorage.getItem('divisionId')).subscribe(
          data =>{
            this.lstcomments1= data;
            console.log(this.lstcomments1);
      });
    }
  }

  createNew() {
    this.router.navigate(['/admin/master/WsVehicleMaster']);
  }


  onBillableTypeSelect(evnt,index) {
    alert ("Billable Type :"+evnt +"  ,"+index);
  }

  enterKeyLock(i,fld) {
    // alert('Enter Not Allowed.!' +fld);
    this.setFocus(fld);
    return;
  }

  setFocus(name) {
    const ele = this.aForm.nativeElement[name];
    if (ele) {
      ele.focus();
    }
  }

}
