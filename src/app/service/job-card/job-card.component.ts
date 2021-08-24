import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';
import { ServiceService } from '../service.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { observable, Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
// import { of } from 'rxjs/observable/of';
// import 'rxjs/add/observable/of';

interface IjobCard {
  jobCardNum: string;
  taxCategoryName: string;
  matStatus: string;
  RegNo: string;
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
  lastRunKms: string;
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
}

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})



export class JobCardComponent implements OnInit {
  jobcardForm: FormGroup;
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
  jobCardNum1: string;
  // jobCardNum: string='0';
  contact1: string;
  jobCardNum: string;
  divisionName: string;
  divisionId: number;
  lstcomments: any;
  RegNoList: any;
  RegNoList1: any[];
  userList1: any[] = [];
  userList2: any[] = [];
  deductibles: number = 0;
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
  matDiscountPer: number;
  labDiscountPer: number;
  accountNo: number;
  custName: string;
  displaylabMatTab = true;
  displaybilling = true;
  displayCustDetails = true;
  displayCustInsDetails = true;
  displayInslinedetails = true;
  displayInsheader = true;
  insurerCompId: number;
  insurerSiteId: number;
  insurerSite: string;
  insurerCompName: string;
  insurerCompNo: number;
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

  public TechnicianList: any[];
  public LaborItemList: any;
  public splitRatioList: any[];
  public srvAdvisorList: any[];
  public taxCategoryList: any;
  public LaborPriceList: any;
  public accountNoSearch: any;
  public splitArr;

  insLabBasicAmt: number;
  insMatBasicAmt: number;
  actualInsAmt: number;

  insTaxableAmt: number;
  insTotTaxAmt: number;
  insTotAmt: number;

  trxLineId: number;
  emplId:number;

  dispReadyInvoice = false;
  dispButtonStatus = false;
  dispfreezeDetail = true;

  // public minDatetime = new Date();
  promiseDate = new Date();
  minDate=new Date();
  pipe = new DatePipe('en-US');
  now = Date.now();
  jobCardDate = this.pipe.transform(this.now, 'd-M-y h:mm:ss');
  //public minDatetime=this.pipe.transform(this.promiseDate, 'yyyy-MM-ddThh:mm')

  public minDatetime = moment(new Date()).format('YYYY-MM-DDTHH:mm')

  @ViewChild("myinput") myInputField: ElementRef;
  arInvNum: string;
  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }
  unSaved: boolean = true;
  taxPer: number;
  // @ViewChild('jobcardForm') public createJobcardForm: NgForm;
  constructor(private fb: FormBuilder, private router: Router, private orderManagementService: OrderManagementService, private service: MasterService, private serviceService: ServiceService) {
    this.jobcardForm = fb.group({
      jobCardNum: [],
      jobCardNum1: [],
      jcType: [],
      jobCardId: [],
      matStatus: [],
      regNo: [],
      RegNo: [],
      srTypeId: [],
      srvAdvisor: [],
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
      divisionId: [],
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
      ouId: [],
      deptId: [],
      locId: [],
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
      totTaxAmt: [],
      invTotAmt: [],
      deductibles: [],
      salvage: [],
      disCategory: [],
      disAuthBy: [],
      balanceAmt: [],
      advAmt: [],
      labDiscountPer: [],
      emplId:[],
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
      itemId: [],
      qty: [],
      description: [],
      unitPrice: [],
      basicAmt: [],
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

    this.owner = sessionStorage.getItem('name')
    this.divisionName = sessionStorage.getItem('divisionName');
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.jobStatus = 'Opened';
    this.emplId=Number(sessionStorage.getItem('emplId'));
    alert(this.emplId);
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
    this.serviceService.LaborItemListDivisionFN(this.divisionId)
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
  MatImptWip(jobCardNum) {
    // alert(jobCardNum);
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
  serchByitemId(event, i) {
    let select = this.LaborItemList.find(d => d.itemId === event);
    var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
    (patch.controls[i]).patchValue({ description: select.description });
    // alert(select.taxCategoryName);
    // (patch.controls[i]).patchValue({ taxCategoryName: select.taxCategoryName})
    this.serviceService.priceListFN((sessionStorage.getItem('locId')), select.segment)
      .subscribe(
        data1 => {
          this.LaborPriceList = data1;
          console.log(this.LaborPriceList);
          (patch.controls[i]).patchValue({
            unitPrice: data1.price,
            frtHrs: data1.frtHrs,
            taxCategoryName: data1.taxCategoryName,
            taxCategoryId: data1.taxCategoryId,
          })
          alert(this.taxCategoryName);
        }
      );
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
    var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
    (patch.controls[0]).patchValue({ techName: select.description })
  }
  onKey(index) {
    console.log(index);
    // alert(index+ ' index')
    var arrayControl = this.jobcardForm.get('jobCardLabLines').value
    var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
    var baseAmtLineWise = arrayControl[index].unitPrice * arrayControl[index].qty;
    // alert(arrayControl[index].unitPrice);
    (patch.controls[index]).patchValue({ basicAmt: baseAmtLineWise, laborAmt: baseAmtLineWise })
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
    this.serviceService.srTypeIdstFN(event)
      .subscribe(
        data1 => {
          this.srTypeIdList = data1;
          console.log(this.srTypeIdList);
        }
      );
    var regno = this.jobcardForm.get('regNo').value;
    alert(regno);
    if (regno != undefined) {
      this.serviceService.billableTyIdLstFN(event, regno)
        .subscribe(
          data1 => {
            this.billableTyIdList = data1;
            console.log(data1);
            console.log(this.billableTyIdList);
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
    }
    else {
      alert('Please enter correct Registration number');
    }
    this.serviceService.srvAdvisorListFN((sessionStorage.getItem('locId')), event)
      .subscribe(
        data1 => {
          this.srvAdvisorList = data1;
          console.log(this.srvAdvisorList);
        }
      );
  }
  addRow(index) {

    var arrayControl = this.jobcardForm.get('jobCardLabLines').value

    var invItemId = arrayControl[index].itemId;

    if (invItemId != null) {
      this.lineDetailsArray.push(this.lineDetailsGroup());
      var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
      var no = this.lineDetailsArray.length;
      let selectbilTy = this.billableTyIdList.find(d => d.billableTyName === 'Customer');


      (patch.controls[no - 1]).patchValue(
        {
          lineNum: no,
          billableTyId: selectbilTy,
        }
      );
      // arrayControl[index].itemType.focus();
      //  alert
    } else { ('Kindly Insert the line-Details first'); }
    var index = index + 1

    var aa = index + 1;
    var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
    (patch.controls[index]).patchValue(
      {
        // polineNum: aa,
      }
    );
  }

  RemoveRow(index) {
    if (index === 0) {

    } else {
      this.lineDetailsArray.removeAt(index);
    }
    this.lineDetailsArray.removeAt(index);
  }
  serchByRegNo(RegNo) {
    alert(RegNo);
    this.serviceService.getByRegNo(RegNo, sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.RegNoList = data;
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
          })
        }
      );
  }
  onOptionsSelectedsrTypeId(srTypeId) {
    // alert(srTypeId)
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
      labBasicAmt: sum,
      matBasicAmt: sumMat,
      actualBasicAmt: sum + sumMat,
    })
  }
  Search(jonCardNo) {
    this.jobcardForm.reset();
    this.serviceService.getJonCardNoSearch(jonCardNo)
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
          this.jobStatus = data.jobStatus;
          alert(this.jobStatus)
          // alert(this.lstcomments.jobCardNum);

          if (this.lstcomments.lineCnt > 0) {
            this.dispReadyInvoice = true;
          }
          alert('status' + ' ' + this.lstcomments.matStatus + ' ' + this.jobStatus)
          // // || this.lstcomments.matStatus === 'Compeleted'
          // if(this.jobStatus ==='Ready for Invoice'){
          //   alert('In If');
          //   alert( this.dispButtonStatus);
          //   this.dispButtonStatus=true;
          // }
          if (this.lstcomments.jobCardNum != undefined) {
            this.displaylabMatTab = false;
          }
          if (this.lstcomments.jobStatus == 'Invoiced' || this.lstcomments.matStatus == 'Compeleted') {
            this.jobcardForm.disable();
            this.jobcardForm.get('jobCardLabLines').disable();
            this.jobcardForm.get('jobCardMatLines').disable();
            this.displaybilling = false;
            this.dispButtonStatus = false;
          }
          if (this.lstcomments.matStatus == 'Compeleted' || this.lstcomments.jobStatus == 'Ready for Invoice') {

            this.displaybilling = false;
            this.dispButtonStatus = true;
          }
          var len = this.lineDistributionArray().length;
          // alert('len ' + len)
          // alert('anita' + data.jobCardMatLines.length)
          for (let i = 0; i < data.jobCardMatLines.length - len; i++) {
            var payInvGrp: FormGroup = this.distLineDetails();
            this.lineDistributionArray().push(payInvGrp);
          }
          // this.jobcardForm.get('jobCardMatLines').patchValue(data.jobCardMatLines);
          var len1 = this.lineDetailsArray.length;
          // alert('len1 ' + len1)
          for (let i = 0; i < data.jobCardLabLines.length - len1; i++) {
            var payInvGrp: FormGroup = this.lineDetailsGroup();
            this.lineDetailsArray.push(payInvGrp);
          }
          // var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
          // (patch.controls[0]).patchValue(
          //   {
          //     lineId: 1,
          //   }
          // );
          // this.jobcardForm.get('jobCardLabLines').patchValue(data.jobCardLabLines);
          this.jobcardForm.patchValue(this.lstcomments);
          this.onOptionBillableSelected(this.jobcardForm.get('jcType').value, 'Search');
          var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
          // let selectbillTy=this.billableTyIdList.find(d=> d.billableTyId=== this.billableTyId)
          // alert(this.billableTyIdList.length);
          for (let i = 0; i < data.jobCardLabLines.length; i++) {
            alert(data.jobCardLabLines[i].billableTyId + 'Labor' + i);
            // debugger;
            let selectbilTy = this.billableTyIdList.find(d => d.billableTyId === data.jobCardLabLines[i].billableTyId);
            patch.controls[i].patchValue({ billableTyId: selectbilTy.billableTyName });


          }

          this.jobcardForm.patchValue({
            // labTaxableAmt: this.lstcomments.labTaxableAmt,
            labTotTaxAmt: this.lstcomments.labTotTaxAmt,
            labTaxableAmt: this.lstcomments.labTaxableAmt,
            matTaxableAmt: this.lstcomments.matTaxableAmt,
            matTotTaxAmt: this.lstcomments.matTotTaxAmt,
            matTotAmt: this.lstcomments.matTotAmt,
            // billableTyId:selectbilTy.billableTyName,
            actualBasicAmt: this.lstcomments.totBasicAmt,
            actualInsAmt: this.lstcomments.insTotBasicAmt,

            insTaxableAmt: this.lstcomments.insMatTaxableAmt + this.lstcomments.insLabTaxableAmt,
            insTotTaxAmt: this.lstcomments.insLabTotTaxAmt + this.lstcomments.insMatTotTaxAmt,
            insTotAmt: this.lstcomments.insInvTotAmt,
          })
          // let select = this.billableTyIdList.find(d => d.billableTyId === this.billableTyId);
          // var labBasicAmt= (this.jobcardForm.get('labBasicAmt').value)
          var control = this.jobcardForm.get('jobCardLabLines').value;
          var totlabtaxamt = 0;
          for (var i = 0; i < control.length; i++) {
            // var labBasicAmt=control[i].get('basicAmt').value;
            totlabtaxamt = totlabtaxamt + (control[i].basicAmt * control[i].taxPer) / 100;
          }
          this.jobcardForm.patchValue({
            labTotTaxAmt: totlabtaxamt,
            labTotAmt: this.labTaxableAmt + totlabtaxamt
          })
          var control = this.jobcardForm.get('jobCardMatLines').value;
          var totmattaxamt = 0;
          for (var i = 0; i < control.length; i++) {
            totmattaxamt = totmattaxamt + (control[i].basicAmt * control[i].taxPer) / 100;
          }
          this.jobcardForm.patchValue({
            matTotTaxAmt: totmattaxamt,
            // labTotAmt:this.labTaxableAmt+totlabtaxamt
            matTotAmt: this.matTaxableAmt + totmattaxamt
          })

          // alert(perValueLab);

          // this.billableTyId= selectbilTy.billableTyName;

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
  saveLine() {
    const formValue: IjobCard = this.tranceFun(this.jobcardForm.value);
    this.serviceService.lineWISESubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        // alert('LINE WISE RECORD INSERTED SUCCESSFUILY');
        this.lineDetailsArray.clear();
        // alert(this.lineDetailsArray.length+ " length")
        var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
        console.log(res.obj.jobCardLinesList);
        if(res.obj.jobCardLinesList.itemType='Labor')
        {
        for(let i=0 ; i<res.obj.jobCardLinesList.length; i++){
          var invLnGrp: FormGroup = this.lineDetailsGroup();
                    this.lineDetailsArray.push(invLnGrp);
                    // let select = this.splitRatioList.find(d => d.splitCateId === res.obj.jobCardLinesList[i].splitCateId);
                    this.onOptionsplitRatioSelect1(i,res.obj.jobCardLinesList[i].splitCateId)
        //  patch.controls[i].patchValue({splitRatio:select.billingNature});
         let selectbilTy = this.billableTyIdList.find(d => d.billableTyId === res.obj.jobCardLinesList[i].billableTyId);
            patch.controls[i].patchValue({ billableTyId: selectbilTy.billableTyName });
        }
        this.jobcardForm.get('jobCardLabLines').patchValue(res.obj.jobCardLinesList);
        }
        // var jobNo = this.jobcardForm.get('jobCardNum').value;
        // this.Search(jobNo);comment by vinita
        this.dispReadyInvoice = true;
        // patch.patchValue(res.obj.jobCardLinesList);
        // obj.jobCardLinesList
      } else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    });
  }
  saveMaterial() {
    const formValue: IjobCard = this.tranceFun(this.jobcardForm.value);
    this.serviceService.saveMaterialSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);   //
        this.lineDistributionArray().clear();
        console.log(res.obj.jobCardLinesList);
        var patch = this.jobcardForm.get('jobCardMatLines') as FormArray;
        console.log(res.obj.jobCardLinesList.lenght);
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
  }
  saveArInvoice() {
    const formValue: IjobCard = this.tranceFun(this.jobcardForm.value);
    formValue.dmsCustId = Number(this.jobcardForm.get('dmsCustId').value);
    //  this.jobStatus='Opened';
    formValue.jobStatus = 'Opened';
    formValue.matStatus = 'No Material';
    //  formValue.matStatus= (this.jobcardForm.get('matStatus').value);
    this.serviceService.jobcardHeaderSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.jobcardForm.patchValue({ jobCardNum: res.obj.jobCardNum, jobCardId: res.obj.jobCardId })
        if (res.obj.jobCardNum != undefined) {
          this.displaylabMatTab = false;
        }
        this.dispfreezeDetail = false;
        // window.location.reload();
        // this.LocationMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert(res.message);
          // this.LocationMasterForm.reset();
          // window.location.reload();
        }
      }
    });
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
    this.lineDetailsArray.clear();

  }
  clearMatLineFormArray() {
    this.lineDetailsArray.clear();
  }

  onOptionsDisTypeMatSelected(event) {
    // alert(event);
    if (event === 'Percentage') {
      this.displayMatDiscount = false;
      this.displayMatDiscount1 = false;
      //   this.endDate = new Date();
    }
    else if (event === 'Amount') {
      this.displayMatDiscount = true;
      this.displayMatDiscount1 = true;
      //   this.LocationMasterForm.get('endDate').reset();
    }
  }
  onOptionsDisTypeLabSelected(event) {
    // alert(event);
    if (event === 'Percentage') {
      this.displayLabDiscount = false;
    }
    else if (event === 'Amount') {
      this.displayLabDiscount = true;
    }
    var labBasicAmt = Number(this.jobcardForm.get('labBasicAmt').value);
    var matBasicAmt = Number(this.jobcardForm.get('matBasicAmt').value)
    this.jobcardForm.patchValue({ actualBasicAmt: labBasicAmt + matBasicAmt })
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
    this.serviceService.GenerateInvoiceFN(jobCardNum).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.arInvNum = res.obj;

      } else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    });
  }
  BillingCal() {
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
    // }else{
    //   alert("Material status not completed")
    // }
  }
  jobCardStatusClose() {

    //  labDiscountPerCal
    // var matStatus= this.jobcardForm.get('matStatus').value;
    var status = 'Ready for Invoice';
    var jobcardNo = this.jobcardForm.get('jobCardNum').value;
    // alert(matStatus+' '+jobcardNo);
    // if(matStatus == 'Compeleted'){

    this.serviceService.jobCardStatusReadyInvoice(jobcardNo, status).subscribe((res: any) => {
      if (res.code === 200) {
        // alert(res.message);
        this.jobcardForm.patchValue({ jobStatus: 'Ready for Invoice' })
        this.displaybilling = false;
        this.dispButtonStatus = false;
        // this.jobcardForm.patchValue({jobCardNum:res.obj.jobCardNum})
      } else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    });
    // }else{
    //   alert("Material status not completed")
    // }
  }


  labDiscountPerCal(event) {
    // alert(event);

    var labBasicAmt = (this.jobcardForm.get('labBasicAmt').value)
    // var labtaxper=(this.jobcardForm.get('taxPer').value)
    var control = this.jobcardForm.get('jobCardLabLines').value;
    var totlabtaxamt = 0;
    for (var i = 0; i < control.length; i++) {
      var basictax = (control[i].basicAmt * event) / 100;
      totlabtaxamt = totlabtaxamt + ((control[i].basicAmt - basictax) * control[i].taxPer) / 100;
    }
    var perValueLab = (labBasicAmt * event) / 100;
    // var labTotTaxAmt =(labBasicAmt*labtaxper)/100
    var aaa = labBasicAmt - perValueLab;
    // var basictax=(aaa*event)/100;
    // alert(perValueLab);
    this.jobcardForm.patchValue({
      labDiscount: perValueLab,
      labTaxableAmt: labBasicAmt - perValueLab,
      labTotTaxAmt: totlabtaxamt,
      // labTotTaxAmt:basictax,
      labTotAmt: totlabtaxamt + aaa,
    })
  }
  labDiscountAmtCal(event) {
    alert(event);

    var labBasicAmt = (this.jobcardForm.get('labBasicAmt').value)
    var labDisAmt = (this.jobcardForm.get('labDiscount').value)
    // var labtaxper=(this.jobcardForm.get('taxPer').value)
    var control = this.jobcardForm.get('jobCardLabLines').value;
    var perValueLab = (labDisAmt * 100) / labBasicAmt;
    var labTaxAmt = labBasicAmt - labDisAmt;
    var totlabtaxamt = 0;
    for (var i = 0; i < control.length; i++) {
      // var basictax=(control[i].basicAmt*event)/100;
      // totlabtaxamt=totlabtaxamt+(control[i].basicAmt*control[i].taxPer)/100;
      // totlabtaxamt=totlabtaxamt+(labTaxAmt*control[i].taxPer)/100;
      var perDisLab = (control[i].basicAmt * perValueLab) / 100;
      var pervalLab = control[i].basicAmt - perDisLab;
      totlabtaxamt = totlabtaxamt + (pervalLab * control[i].taxPer) / 100;
      // totlabtaxamt=totlabtaxamt+pervalLab;
    }
    // var labTotTaxAmt =(labBasicAmt*labtaxper)/100
    // var aaa = labBasicAmt-perValueLab;
    this.jobcardForm.patchValue({
      labDiscount: labDisAmt,
      labTaxableAmt: labTaxAmt,
      labTotTaxAmt: totlabtaxamt,
      labTotAmt: totlabtaxamt + labTaxAmt,
    })
  }
  matDiscountPerCal(event) {
    // alert(event);
    var matBasicAmt = (this.jobcardForm.get('matBasicAmt').value)
    var perValueLab = (matBasicAmt * event) / 100;
    // var matTotTaxAmt= this.jobcardForm.get('matTotTaxAmt').value
    // var labDis =Number(this.jobcardForm.get('labDiscount').value);
    // var labTaxAmt = Number(this.jobcardForm.get('labTotTaxAmt').value);
    // var labTotAt = Number(this.jobcardForm.get('labTotAmt').value);COMMENT BY VINITA
    var control = this.jobcardForm.get('jobCardMatLines').value;
    var totmattaxamt = 0;
    for (var i = 0; i < control.length; i++) {
      totmattaxamt = totmattaxamt + (control[i].basicAmt * control[i].taxPer) / 100;
    }

    // alert(perValueLab);
    var temp = (totmattaxamt * event) / 100;

    this.jobcardForm.patchValue({
      matDiscout: perValueLab,
      matTaxableAmt: matBasicAmt - perValueLab,
      // matTotTaxAmt:matTotTaxAmt-temp,
      matTotTaxAmt: totmattaxamt - temp,
      // matTotAmt:(matTotTaxAmt-temp)+(matBasicAmt-perValueLab),
      // totDis:perValueLab+labDis,
      // totTaxAmt:(matTotTaxAmt-temp)+labTaxAmt,
      // invTotAmt:((matTotTaxAmt-temp)+(matBasicAmt-perValueLab))+labTotAt,

    })
  }
  matDiscountAmtCal(event) {
    // alert(event);
    var matBasicAmt = (this.jobcardForm.get('matBasicAmt').value)
    // var perValueLab= (matBasicAmt* event)/100;
    var matDisAmt = (this.jobcardForm.get('matDiscout').value)
    var labTotAt = (this.jobcardForm.get('labTotAmt').value)
    // var totalBasicAmt=matBasicAmt-matDisAmt;
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

    // alert(perValueLab);
    var temp = (totmattaxamt * event) / 100;

    this.jobcardForm.patchValue({
      // matDiscout: perValueLab,
      matTaxableAmt: totalMatTaxableAmt,
      // matTotTaxAmt:matTotTaxAmt-temp,
      matTotTaxAmt: totmattaxamt,
      matTotAmt: totalMatTaxableAmt + totmattaxamt,
      // totDis:perValueLab+labDis,
      // totTaxAmt:(matTotTaxAmt-temp)+labTaxAmt,
      invTotAmt: (totalMatTaxableAmt + totmattaxamt) + labTotAt,

    })
  }
  validateKm(event) {
    var storeKm = this.RegNoList.lastRunKms;
    if (event.target.value < storeKm) {
      alert("You can not enter Km less than Actual Km");
      this.jobcardForm.patchValue({ lastRunKms: this.RegNoList.lastRunKms });
    }
  }
  cancelJobNo(){
    var jobcardNo = this.jobcardForm.get('jobCardNum').value;
    this.serviceService.jobCardStatusCancel(jobcardNo).subscribe((res: any) => {
      if (res.code === 200) {
         alert(res.message);
         this.jobcardForm.patchValue({jobStatus:res.obj.status});
         this.displaylabMatTab = true;
   }
   else {
    if (res.code === 400) {
      alert(res.message);
    }
  }

});
}
}