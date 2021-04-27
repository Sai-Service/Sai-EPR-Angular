import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';
import { ServiceService } from '../service.service';

interface IjobCard {
  jobCardNum: string ;
  matStatus: string;
  RegNo: string;
  srTypeId: number;
  srvAdvisor: string;
  groupId: number;
  pickupLoc: string;
  freePickup: string;
  pickupType: string;
  pickupRemark:string;
  driverName: string;
  chassisNo: string;
  billToAddress: string;
  engineNo: string;
  shipToAddress:string;
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
  insurerCompId:number;
  insurerSiteId: number;
  insuDate:Date
  oemWarrStatus: string;
  oemExpiryDate: Date;
  cngKitNumber:  string;
  cngCylinderNo:  string;
  divisionName : string;
  divisionId: number;
  jobStatus:string;
  jobCardDate: Date;
  vin: string;
  groupName: string;
  subTypeId: number;
  bayTyId:number;
  techId:number;
  regDate: Date;
  pickupDate:Date;
  promiseDate:Date;
  lastRunKms:string;
  itemId:number;
  ouId:number;
  deptId:number;
  locId:number;
  customerId:number;
  customerSiteId:number;
}

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent implements OnInit {
  jobcardForm: FormGroup;
  RegNo: string;
  jobStatus:string;
  jobCardNum: string='0';
  divisionName :string;
  divisionId:number;
  jobCardDate=new Date();
  lstcomments: any[];
  RegNoList: any;
  RegNoList1:any[];
  userList1: any[] = [];
  userList2: any[] = [];
  lastkeydown1: number = 0;
  subscription: any;
 public jobCarStatusList: Array<string> = [];
 public pickupTypeList:Array<string> = [];
 public srTypeIdList:Array<string> = []; 
 public SubSrTypeIdList:Array<string> = [];
 public matStatusList:Array<string> = [];
 public groupIdList:Array<string> = [];
 public  billableTyIdList:Array<string> = [];
 public  TechnicianList:Array<string> = [];
 public LaborItemList:any;
 public splitRatioList:any[];
 public srvAdvisorList:any[];
 public taxCategoryList: any;
  public LaborPriceList :any;
  @ViewChild("myinput") myInputField: ElementRef;
  ngAfterViewInit() {
  this.myInputField.nativeElement.focus();
  }
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private serviceService: ServiceService) {
    this.jobcardForm = fb.group({

      jobCardNum: [],
      matStatus: [],
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
      insurerSiteId: [],
      insuDate: [],
      oemWarrStatus: [],
      oemExpiryDate: [],
      cngKitNumber: [],
      cngCylinderNo: [],
      divisionName : [],
      divisionId: [],
      jobStatus: [],
      jobCardDate: [],
      vin: [],
      groupName: [],
      subTypeId: [],
      bayTyId: [],
      techId: [],
      regDate: [],
      pickupDate: [],
      promiseDate: [],
      lastRunKms:[],
      itemId:[],
      ouId:[],
      deptId:[],
      locId:[],
      customerId:[],
      customerSiteId:[],

      jobCardLabLines: this.fb.array([this.lineDetailsGroup()]),
      jobCardMatLines: this.fb.array([this.distLineDetails()]),
    })
  }
  lineDetailsGroup() {
    return this.fb.group({
      // poLineId: [];
      billableTyId: [],
      itemId: [],
      qty: [],
      description: [],
      unitPrice: [],
      basicAmt: [],
      taxCategoryName: [],
      splitRatio:[],
    });
  }

  get lineDetailsArray() {
    var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
    (patch.controls[0]).patchValue(
      {
        polineNum: 1,
      }
    );
    return <FormArray>this.jobcardForm.get('jobCardLabLines')
  }
  distLineDetails() {
    return this.fb.group({
      // invDistributionId: [],
      billableTyId: [],
      itemId: [],
      qty: [],
      unitPrice: [],
      basicAmt: [],

    })
  }
  lineDistributionArray(): FormArray {
    return <FormArray>this.jobcardForm.get('jobCardMatLines')
  }
  ngOnInit(): void {  
    this.divisionName=sessionStorage.getItem('divisionName'); 
    this.divisionId=Number(sessionStorage.getItem('divisionId'));
    this.service.taxCategoryListForSALES()
      .subscribe(
        data1 => {
          this.taxCategoryList = data1;
          console.log(this.taxCategoryList);
          data1 = this.taxCategoryList;
        }
      );  
      this.serviceService.jobCarStatusListFn()
      .subscribe(
        data1 => {
          this.jobCarStatusList = data1;
          console.log(this.jobCarStatusList);
        }
      ); 
      this.serviceService.pickupTypeListFN()
      .subscribe(
        data1 => {
          this.pickupTypeList = data1;
          console.log(this.pickupTypeList);
        }
      ); 
      this.serviceService.srTypeIdListFN()
      .subscribe(
        data1 => {
          this.srTypeIdList = data1;
          console.log(this.srTypeIdList);
        }
      ); 
      this.serviceService.matStatusListFN()
      .subscribe(
        data1 => {
          this.matStatusList = data1;
          console.log(this.matStatusList);
        }
      ); 
      this.serviceService.srvAdvisorListtFN((sessionStorage.getItem('locId')),(sessionStorage.getItem('deptId'))) 
      .subscribe(
        data1 => {
          this.srvAdvisorList = data1;
          console.log(this.srvAdvisorList);
        }
      );  
      this.serviceService.groupIdListFN((sessionStorage.getItem('locId')),(sessionStorage.getItem('deptId')))
      .subscribe(
        data1 => {
          this.groupIdList = data1;
          console.log(this.groupIdList); 
        }
      ); 
      this.serviceService.RegNoListFN()
      .subscribe(
        data1 => {
          this.RegNoList1 = data1;
          console.log(this.RegNoList1);
        }
      ); 
      this.serviceService.billableTyIdListFN()
      .subscribe(
        data1 => {
          this.billableTyIdList = data1;
          console.log(this.billableTyIdList);
        }
      );   
      this.serviceService.LaborItemListFN()
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
      this.serviceService.TechnicianListFN((sessionStorage.getItem('locId')))
      .subscribe(
        data1 => {
          this.TechnicianList = data1;
          console.log(this.TechnicianList);
        }
      ); 
  }
  serchByitemId(event, i){
    let select = this.LaborItemList.find(d => d.itemId === event);
    var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
(patch.controls[i]).patchValue({ description: select.description})
this.serviceService.priceListFN((sessionStorage.getItem('locId')), select.segment)
.subscribe(
  data1 => {
    this.LaborPriceList = data1;
    console.log(this.LaborPriceList);
    (patch.controls[i]).patchValue({ unitPrice: data1})
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
  onKey(index) {
    console.log(index);
    // alert(index+ ' index')
    var arrayControl = this.jobcardForm.get('jobCardLabLines').value
    var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
    var baseAmtLineWise = arrayControl[index].unitPrice * arrayControl[index].qty;
    alert(arrayControl[index].unitPrice);
    (patch.controls[index]).patchValue({ basicAmt: baseAmtLineWise})
  }
  onOptionsplitRatioSelect(i, splitCateId){
    let select = this.splitRatioList.find(d => d.splitCateId === splitCateId);
    alert(select.splitCateId);
    var patch = this.jobcardForm.get('jobCardLabLines') as FormArray;
    // (patch.controls[i]).patchValue({ description: select.billingNature})
  }
  // onOptionsrvAdvisorSelected(srvAdvisor){
  //   let select = this.srvAdvisorList.find(d => d.srvAdvisor === srvAdvisor);
  //   alert(select.srvAdvisor);
  //  this.jobcardForm.patchValue(select)
  // }
  addRow(index) {
    var arrayControl = this.jobcardForm.get('jobCardLabLines').value
    
    var invItemId = arrayControl[index].itemId;

    if (invItemId != null) {
      this.lineDetailsArray.push(this.lineDetailsGroup());
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
            itemId:this.RegNoList.regId,
            customerSiteId:this.RegNoList.customerSiteId,
            ouId:  Number(sessionStorage.getItem('ouId') ),
            customerId:this.RegNoList.customerId,
            deptId:(sessionStorage.getItem('deptId')),
            locId: (sessionStorage.getItem('locId')),
            status:'Opened',  
          })
        }
      );
  }
  onOptionsSelectedsrTypeId(srTypeId){
    this.serviceService.getSubSrTypeIdList(srTypeId)
    .subscribe(
      data => {
        this.SubSrTypeIdList = data;
        console.log(this.SubSrTypeIdList);
      }
    );
  }
  Search(jonCardNo) {
    this.serviceService.getJonCardNoSearch(jonCardNo)
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
          this.jobcardForm.patchValue(this.lstcomments);
        }
      );
  }
  onOptionTaxCatSelected(i, taxCategoryName) { }
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
  accountNoSearchfn(){
    // this.orderManagementService.accountNoSearchFn(accountNo,this.ouId)
    // .subscribe(
    //   data => {
    //     this.accountNoSearch = data;      
    //     console.log(this.accountNoSearch);
    //     this.arInvoiceForm.patchValue({
    //       billToCustName: this.accountNoSearch.custName,
    //       billToCustAdd: this.accountNoSearch.billToAddress,
    //       shipToCustNo: this.accountNoSearch.accountNo,
    //       shipToCustName:this.accountNoSearch.custName,
    //       shipToCustAdd:this.accountNoSearch.shipToAddress,
    //       shipToCustId :this.accountNoSearch.customerId,
    //       shipToSiteId  :this.accountNoSearch.shipToLocId,
    //       billToSiteId:this.accountNoSearch.billToLocId,   
    //       billToCustId :this.accountNoSearch.customerId,
    //     });
    //   }
    // );
  }
  transData(val) {
    delete val.lineDetailsArray;
    return val;
  }
  saveLine(){
    const formValue: IjobCard = this.transData(this.jobcardForm.value);
    this.serviceService.lineWISESubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('LINE WISE RECORD INSERTED SUCCESSFUILY');
      } else {
        if (res.code === 400) {
          alert('Data already present in the data base');
        }
      }
    });
  }
  saveArInvoice() {
    const formValue: IjobCard = this.transData(this.jobcardForm.value);
    this.serviceService.jobcardHeaderSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        this.jobcardForm.patchValue({jobCardNum:res.obj.jobCardNum})
        // window.location.reload();
        // this.LocationMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert('Data already present in the data base');
          // this.LocationMasterForm.reset();
          // window.location.reload();
        }
      }
    });
  }
  
}
