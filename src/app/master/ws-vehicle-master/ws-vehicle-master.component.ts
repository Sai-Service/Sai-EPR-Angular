import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NumberValueAccessor, MaxLengthValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { MasterService } from '../../master/master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InteractionModeRegistry } from 'chart.js';
import { now } from 'jquery';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { ServiceService } from 'src/app/service/service.service';

interface IWsVehicleMaster {
  regNo: string;
  mainModel: string;
  variantCode: string;
  segment: string;
  colorCode: string;
  chassisNo: string;
  engineNo: string;
  fuelType: string;
  categoryId: number;
  itemId: number;
  custAccountNo: number;
  mobile1: number;
  custName: string;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  state: string;
  pinCd: string;
  custTaxCategoryName: string;
  divisionId:number;
  divisionName:string;
  dealerCode:string;
  itemTypeForCat:string;
}

@Component({
  selector: 'app-ws-vehicle-master',
  templateUrl: './ws-vehicle-master.component.html',
  styleUrls: ['./ws-vehicle-master.component.css']
})
export class WsVehicleMasterComponent implements OnInit {
  
  submitted = false;

  wsVehicleMasterForm: FormGroup;

  public PaymentModeList: Array<string> = [];
  public ReceiptMethodList: Array<string> = [];
  public EwTypeList: Array<string> = [];
  public OUIdList: Array<string> = [];
  public EwSourceList: Array<string> = [];
  public issueByList: Array<string> = [];
  public VehRegNoList: Array<string> = [];
  public VehVinList: Array<string> = [];
  public EwSchemeItemList: Array<string> = [];
  public ewInsNameList: Array<string> = [];

  public ItemEWList: Array<string> = [];
  // public mainModelList: Array<string> = [];
  public colorCodeList: Array<string> = [];
  public FuelTypeList: Array<string> = [];
  public statusList: Array<string> = [];
  // public dealerCodeList :Array<string>=[];
  dealerCodeList:any;
  mainModelList:any;

  pipe = new DatePipe('en-US');
  public minDate = new Date()  ;

  /////////////////////SEARCH/////
  mainModelName: string;
  // chassisNum: string;
  vehRegNo: string ;
  // = 'MH12EM6011';
  ///////////////////////////////
  categoryIdList: any;
  SSitemTypeList: any;
  VariantSearch: any;
  invItemListEw: any;
  VehicleRegDetails: any;
  EWItemList: any;
  ItemDetailList: any;
  CustomerDetailsList: any
  variantDetailsList: any;
  getVehRegDetails: any;
  getVehVinDetails: any;
  lstEwSchemeDetails: any;
  lstcomments: any;
  CustomerSiteDetails: any;

  userList1: any[] = [];
  lastkeydown1: number = 0;

  loginName: string;
  loginArray: string;
  name: string;
  ouName: string;
  locId: number;
  locName: string;
  orgId: number;
  ouId: number;
  deptId: number;
  divisionId: number;
  // emplId :number;
  public emplId = 6;
  public varAging: number;
  ddate = Date.now();



  ///////////////////////////

  ewregNo: string;
  ewId: number;
  ewSchemeId: number;
  ewBookletNo: string;

  ///////////////////////////////////////////////////
  regNo: string;
  vin: string;
  monthYrManf: string;
  segment: string;
  itemId: number;
  itemDesc: string;
  itemCatg: string;
  colorCode: string;
  mainModel: string;

  // rfId: string;
  govtVehicleYn: string;
  vipYn: string;
  dealerCode: string;
  dealerName: string;
  dealerSite: string;
  dlrInvoiceNo: string;
  dmsInvoiceNo: string;

  insuDate: string;
  policyNo: string;
  insurerCompId: string;
  insurerSiteId: string;
  insCompanyName: string;
  inscompanySite: string;

  ewStatus: string;
  mcpStatus: string;
  // ewBookletNo:string;
  ewInsurerId: number;
  ewInsurerSite: number;
  ewEndDate: Date;
  ewBalanceDays: number;

  mcpNo: string;
  mcpEndDate: string;
  mcpYN: string;
  mcpPackage: string;

  cngCylinderNo: string;
  cngKitNumber: string;
  cngExpDate: string;
  ////////////////////////////////////////////////////
  fuelType: string;
  variantDesc: string;
  variantCode: string;
  chassisNo: string;
  engineNo: string;
  vehicleDelvDate: Date;
  serviceModel: string;
  kmReading: string;
  soldByEmpId: string;
  customeId: number;
  custAccountNo: number;
  dmsCustNo: number;
  custName: string;
  address1: string;
  address2: string;
  address3: string;
  custAddress4: string;
  city: string;
  state: string;
  pinCd: string;
  mobile1: string;
  mobile2: string;
  contactNo: string;
  emailId1: string;
  custTaxCategoryName: string;
  customerSiteId: number;
  custType: string;
  billToAddress: string;
  shipToAddress: string;
  // contractEndDate:string;
  ewPeriod: number;
  warrantyDealer: string;
  vehicleAgeDays: number;
  paytmentSource: string;
  ewAmt: number;
  // ewDiscAmt: number;
  // ewTotalAmt: number;
  // ewSaleDate:Date;
  // segment: string;

  now = Date.now();
  deliveryDate : string;
  // = this.pipe.transform(this.now, 'y-MM-dd');
  oemWarrentyEndDate: string;
  regDate: string;
  contractEndDate = this.pipe.transform(this.now, 'y-MM-dd');
  ewStartDate: Date
  // payType: number;
  // receiptMethodId: number;
  // paymentAmt: number;
  // bankName: string;
  // bankBranch: string;
  // checkNo: string;
  // checkDate: string;

  displayInactive = true;
  Status1: any;
  inactiveDate: Date;
  display = true;
  displayButton = true;
  showBankDetails = false;
  showCancelDetails = false;
  displaySuccess = false;
  showTvDetails = false;
  showCreateItemButton = true;
  showCreateCustButton = true;
  checkValidation = false;

  variantItemId: number;

  // ewCancelDate:Date;
  ewCancelDate = this.pipe.transform(this.now, 'y-MM-dd');
  ewCancelReason: string;

  //////////////////true value
  tvStatus: string;
  tvReSaleDate: Date;
  tvWrExpDate: Date;
  tvWrExpMileage: number;
  tvCertificateNo: string;
  tvSaleDealer: string;
  tvSaleLocation: string;

  itemTypeForCat: string='SS_VEHICLE' ;
  categoryId: number;

 

  public ServiceModelList   :Array<string> = [];
  public insNameList: Array<string>[];
  public insSiteList: Array<string>[];

  get f() { return this.wsVehicleMasterForm.controls; }

  wsVehicleMaster(wsVehicleMasterForm: any) { }

  constructor(private service: MasterService,private serviceService: ServiceService, private fb: FormBuilder, private router: Router) {
    this.wsVehicleMasterForm = fb.group({

      loginArray: [''],
      loginName: [''],
      ouName: [''],
      locId: [''],
      locName: [''],
      ouId: [],
      deptId: [],
      emplId: [''],
      orgId: [],
      divisionId: [],

      insurerCompId:[],
      insurerSiteId:[],

      /////////////////////SEARCH/////
      mainModelName: [Validators.required],
      // chassisNum: [[Validators.required,Validators.pattern('[A-Z,0-9]*')]],
      // emailId1:['', [Validators.email,Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      vehRegNo: [[Validators.required,Validators.pattern('^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}')]],
      regNo: [],
      ewId: [],
      // ewSchemeId: [],
      // ewDate:[],
      // ewBookletNo:[],
      vin: [],
      monthYrManf: [],
      regDate: [],
      itemId: [],
      itemDesc: [],
      itemCatg: [],
      colorCode: [],
      mainModel: [],
      // rfId: [],
      govtVehicleYn: [],
      vipYn: [],

      dealerCode: [],
      dealerName: [],
      dealerSite: [],
      deliveryDate: [],
      vehicleDelvDate: [],

      oemWarrentyEndDate: [],
      dlrInvoiceNo: [],
      dmsInvoiceNo: [],

      insuDate: [],
      policyNo: [],
      insCompanyName: [],
      inscompanySite: [],

      mcpNo: [],
      mcpPackage: [],
      mcpEndDate: [],
      mcpYN: [],

      cngCylinderNo: [],
      cngKitNumber: [],
      cngExpDate: [],



      ///////////////////////////////

      fuelType: [],
      variant: [],
      variantCode: [],
      variantDesc: [],

      chassisNo: [],
      engineNo: [],
      serviceModel: [],


      warrantyDealer: [],

      customerId: [],
      custAccountNo: [],
      dmsCustNo: [],
      custName: [],
      address1: [],
      address2: [],
      address3: [],
      custAddress4: [],
      city: [],
      state: [],
      mobile1: [],
      mobile2: [],
      contactNo: [],
      pinCd: [],
      emailId1: [],
      custTaxCategoryName: [],
      customerSiteId: [],
      custType: [],
      contractEndDate: [],
      billToAddress: [],
      shipToAddress: [],
      // dealerCode:[],
      ewPeriod: [],

      paytmentSource: [],
      kmReading: [],
      soldByEmpId: [],

      ewType: [],
      ewStatus: [],
      ewBookletNo: [],
      ewInsurerId: [],
      ewInsurerSite: [],
      ewEndDate: [],
      ewBalanceDays: [],

      // itemId: [],

      // ewAmt: [],
      // ewDiscAmt: [],
      // ewTotalAmt: [],

      // ewSaleDate: [],
      // ewStartDate: [],


      // payType: [],
      // receiptMethodId: [],
      // paymentAmt: [],
      // bankName: [],
      // bankBranch: [],
      // checkNo: [],
      // checkDate: [],

      ewInvoiceNo: [],
      vehicleAgeDays: [],
      segment: [],

      variantItemId: [],



      // ewCancelDate: [],
      // ewCancelReason: [],

      mcpStatus: [],

      tvStatus: [],
      tvReSaleDate: [],
      tvWrExpDate: [],
      tvWrExpMileage: [],
      tvCertificateNo: [],
      tvSaleDealer: [],
      tvSaleLocation: [],

      itemTypeForCat: [],
      categoryId: [],

    });

  }

  ngOnInit(): void {

    this.name = sessionStorage.getItem('name');
    this.loginArray = sessionStorage.getItem('divisionName');
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.loginName = sessionStorage.getItem('name');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.locId = Number(sessionStorage.getItem('locId'));
    // this.locName=(sessionStorage.getItem('locName'));
    this.deptId = Number(sessionStorage.getItem('dept'));
    // this.emplId= Number(sessionStorage.getItem('emplId'));

    this.orgId = this.ouId;
    console.log(this.loginArray);
    console.log(this.locId);
    // console.log(this.orgId);
    // this.ewInsuranceId=this.ouId;

    this.service.serviceModelLst()
    .subscribe(
    data => {
      this.ServiceModelList = data;
      console.log(this.ServiceModelList);
    }
  );

  this.service.delearCodeList()
  .subscribe(
    data => {
      this.dealerCodeList = data;
      console.log(this.dealerCodeList);
    }
  );

  this.service.insNameList()
  .subscribe(
    data => {
      this.insNameList = data;
      console.log(this.insNameList);
    }
  );


    this.service.issueByList(this.locId, this.deptId, this.divisionId)
      .subscribe(
        data => {
          this.issueByList = data;
          console.log(this.issueByList);
        });

    // this.service.RegNoListFN()
    //   .subscribe(
    //     data1 => {
    //       this.VehRegNoList = data1;
    //       console.log(this.VehRegNoList);
    //     }
    //   );

    // this.service.VehVinList()
    //   .subscribe(
    //     data1 => {
    //       this.VehVinList = data1;
    //       console.log(this.VehVinList);
    //     }
    //   );

    // this.service.itemIdList()
    //   .subscribe(
    //     data => {
    //       this.ItemEWList = data;
    //       console.log(this.ItemEWList);
    //     }
    //   );

    this.service.mainModelListByDivisionId()
      .subscribe(
        data => {
          this.mainModelList = data;
          console.log(this.mainModelList);
        }
      );


    

    this.service.fuelTypeList()
      .subscribe(
        data => {
          this.FuelTypeList = data;
          console.log(this.FuelTypeList);
        }
      );

    // this.service.SSitemTypeListFn()
    //   .subscribe(
    //     data => {
    //       this.SSitemTypeList = data;
    //       console.log(this.SSitemTypeList);
    //     }
    //   );
    // this.service.getCategoryIdListByDivision(this.itemTypeForCat)
    this.service.getCategoryIdListByDivision(this.itemTypeForCat)
      .subscribe(
        data => {
          this.categoryIdList = data;
          console.log(this.categoryIdList);
        }
      );

    this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        }
      );


  }

  transeData(val) {

    delete val.loginArray;
    delete val.loginName;
    delete val.ouName;
    delete val.locName;

    delete val.custName;
    delete val.address1;
    delete val.address2;
    delete val.address3;
    delete val.city;
    delete val.state;
    delete val.mobile1;
    delete val.mobile2;
    delete val.contactNo;
    delete val.pinCd;
    delete val.emailId1;
    delete val.custType;
    delete val.contractEndDate;
    delete val.shipToAddress;
    delete val.ewPeriod;
    delete val.paytmentSource;
    delete val.kmReading;
    delete val.soldByEmpId;
    delete val.ewType;
    delete val.govtVehicleYn;
    delete val.vipYn;
    // delete val.invLine;

    return val;
  }

  newMast() {

    const formValue: IWsVehicleMaster =this.transeData( this.wsVehicleMasterForm.value);
    this.CreateItemCode();
    this.CheckDataValidations()

    if (this.checkValidation) {
      alert("Data Validation Sucessfully....\nPosting data  to WS Customer Master")

      // debugger;
      console.log(formValue);
      formValue.divisionId =Number(sessionStorage.getItem('divisionId'));
      formValue.divisionName =sessionStorage.getItem('divisionName');
      this.service.saveWSVehicle(formValue).subscribe((res: any) => {
        if (res.code === 200) {
          alert('RECORD INSERTED SUCCESSFUILY');
          this.displaySuccess = true;
           this.wsVehicleMasterForm.patchValue(res);
          
        } else {
          if (res.code === 400) {
            this.displaySuccess = false;
            alert('Code already present in the data base');
            
          }
        }
      });
    } else { alert("Data Validation Not Sucessfull....\nPosting Not Done...") }
  }

  updateMast() {
    // this.newMast();
   
  }

  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }

  SearchByModelChas(mdl, chas) {
    alert("Search Vehicle by Model+Chassis..... wip - " + mdl + "+" + chas);
  }

  

  SearchByRegNo(mReg: string) {
    // alert ("Search Vehicle by RegNo..... wip :"+mReg);
    mReg=mReg.toUpperCase();
    this.service.getVehRegDetails(mReg)
      .subscribe(
        data => {
          this.lstcomments = data;

          if (this.lstcomments === null) {
            alert("Registration No : [ " + mReg + " ] not Found...");
            this.displayButton = true;
            this.showCreateCustButton = true;

            this.showCreateItemButton = true;
            //  this.resetVehDet();this.resetCustDet();this.resetAddnl();this.resetTv();
            // this.wsVehicleMasterForm.reset();
            // this.VariantSearch=null;
            this.resetMast();

          }
          else {
            console.log(this.lstcomments);
            this.wsVehicleMasterForm.patchValue(data);
            this.GetItemDeatils(this.lstcomments.itemId.itemId);
            this.GetCustomerDetails(this.lstcomments.customerId);
            this.GetCustomerSiteDetails(this.lstcomments.customerId);

            this.displayButton = false;

          }
        });
  }
  GetItemDeatils(mItemId) {
    if (mItemId > 0) {
      this.showCreateItemButton = false;
      this.service.getItemDetail(mItemId)
        .subscribe(
          data => {
            this.ItemDetailList = data;
            console.log(this.ItemDetailList);
            this.wsVehicleMasterForm.patchValue({
              itemId: this.ItemDetailList.itemId,
              segment: this.ItemDetailList.segment,
              categoryId: this.ItemDetailList.categoryId.categoryId,

            });
          });
    } else { this.showCreateItemButton = true; }
  }

  GetCustomerDetails(mCustId: any) {
    if (mCustId > 0) {
      this.showCreateCustButton = false;

      this.service.ewInsSiteList(mCustId)
        .subscribe(
          data1 => {
            this.CustomerDetailsList = data1;
            console.log(this.CustomerDetailsList);
            this.wsVehicleMasterForm.patchValue({
              custAccountNo: this.CustomerDetailsList.custAccountNo,
              custName: this.CustomerDetailsList.custName,
              address1: this.CustomerDetailsList.address1,
              address2: this.CustomerDetailsList.address2,
              address3: this.CustomerDetailsList.address3,
              custAddress4: this.CustomerDetailsList.address4,
              city: this.CustomerDetailsList.city,
              state: this.CustomerDetailsList.state,
              pinCd: this.CustomerDetailsList.pinCd,
              mobile1: this.CustomerDetailsList.mobile1,
              mobile2: this.CustomerDetailsList.mobile2,
              contactNo: this.CustomerDetailsList.contactNo,
              emailId1: this.CustomerDetailsList.emailId,
              custType: this.CustomerDetailsList.custType,
              custTaxCategoryName:this.CustomerDetailsList.customerSiteMasterList.taxCategoryName,

            });
          }
        );
    } else { this.showCreateCustButton = true; }
  }

  GetCustomerSiteDetails(mCustId: any) {
    // alert("Customer Id: " + mCustId);
    this.service.GetCustomerSiteDetails(mCustId, this.ouId)
      .subscribe(
        data1 => {
          this.CustomerSiteDetails = data1;

          if (this.CustomerSiteDetails === null) { alert("Customer Site [" + this.ouId + "] Not Found in Site Master.....\nPlease check and try again...."); this.resetMast(); }
          else if (this.CustomerSiteDetails.taxCategoryName === null) { alert("Tax Category not attached to  this customer.Pls Update Tax category for this customer."); this.resetMast(); }
          else {
            // this.showCustModal=true;
            console.log(this.CustomerSiteDetails);
            this.wsVehicleMasterForm.patchValue({
              customerType: this.CustomerSiteDetails.customerId.custType,
              custTaxCategoryName: this.CustomerSiteDetails.taxCategoryName,
              customerSiteId: this.CustomerSiteDetails.customerSiteId,
              billToAddress: this.CustomerDetailsList.address1 + "," +
                this.CustomerDetailsList.address2 + "," +
                this.CustomerDetailsList.address3 + "," +
                this.CustomerDetailsList.city + "," +
                this.CustomerDetailsList.state + "-" +
                this.CustomerDetailsList.pinCd,



            });

          }
        });
  }

  GetCustomerSiteDetails1(mCustId: any) {
    // alert("Customer Id: "+mCustId);
    this.service.GetCustomerSiteDetails(mCustId, this.ouId)
      .subscribe(
        data1 => {
          this.CustomerSiteDetails = data1;

          if (this.CustomerSiteDetails === null) { alert("Customer Site [" + this.ouId + "] Not Found in Site Master.....\nPlease check and try again...."); this.resetMast(); }
          else if (this.CustomerSiteDetails.taxCategoryName === null) { alert("Tax Category not attached to  this customer.Pls Update Tax category for this customer."); this.resetMast(); }
          else {
            // this.showCustModal=true;
            console.log(this.CustomerSiteDetails);
            this.wsVehicleMasterForm.patchValue({
              customerSiteId: this.CustomerSiteDetails.customerSiteId,
              customerSiteAddress: this.CustomerSiteDetails.address1 + "," +
                this.CustomerSiteDetails.address2 + "," +
                this.CustomerSiteDetails.address3 + "," +
                this.CustomerSiteDetails.location,
              city: this.CustomerSiteDetails.city,
              state: this.CustomerSiteDetails.state,
              pinCd: this.CustomerSiteDetails.pinCd,
              customerGstNo: this.CustomerSiteDetails.gstNo,
              customerPanNo: this.CustomerSiteDetails.panNo,
              custPhone: this.CustomerSiteDetails.mobile1,
              customerType: this.CustomerSiteDetails.customerId.custType,
              custTaxCategoryName: this.CustomerSiteDetails.taxCategoryName,

            });

          }
        });
  }



  searchMast(regNo: string) {
    // regNo = 'MH12EM6011';
    this.service.getWsVehRegDetails(regNo)
      .subscribe(
        data => {
          this.lstcomments = data.obj;
          console.log(this.lstcomments);
          this.wsVehicleMasterForm.patchValue(data.obj);
        }
      );
  }

  SearchByCustPhone(contactNo) {
    // alert("Search by Cust Phone..... wip :" + contactNo);
    this.service.searchCustomerByContact(contactNo)
      .subscribe(
        data => {
          this.CustomerDetailsList = data.obj[0];
          console.log(this.CustomerDetailsList);
         // this.wsVehicleMasterForm.patchValue(this.lstcomments[0]);
          this.wsVehicleMasterForm.patchValue({
            customerId : this.CustomerDetailsList.  customerId,
            custAccountNo: this.CustomerDetailsList.custAccountNo,
            custName: this.CustomerDetailsList.custName,
            address1: this.CustomerDetailsList.address1,
            address2: this.CustomerDetailsList.address2,
            address3: this.CustomerDetailsList.address3,
            custAddress4: this.CustomerDetailsList.address4,
            city: this.CustomerDetailsList.city,
            state: this.CustomerDetailsList.state,
            pinCd: this.CustomerDetailsList.pinCd,
            custPhone1: this.CustomerDetailsList.mobile1,
            custPhone2: this.CustomerDetailsList.mobile2,
            custPhone3: this.CustomerDetailsList.mobile3,
            customerType: this.CustomerDetailsList.custType,
            custTaxCategoryName:this.CustomerDetailsList.customerSiteMasterList[0].taxCategoryName,
        
          });
        }
      );
  }

  SearchByCustNo(accountNo) {
       this.service.searchCustomerByAccount(accountNo)
      .subscribe(
        data => {
          this.CustomerDetailsList = data.obj;
          console.log(this.CustomerDetailsList);
          this.wsVehicleMasterForm.patchValue(this.CustomerDetailsList);
        
        });
  }

  SearchByCustName(mName) { alert("Search by Cust Name..... wip :" + mName); }

 

  CreateNewItem(mCode, mColor, mChassis) {
    alert("Creating new item code ....wip:" + mCode + "-" + mColor + "-" + mChassis);
  }

  CreateItemCode() {
  
    var colorCode1 = this.wsVehicleMasterForm.get('colorCode').value;
    this.segment = this.variantCode + "-" + colorCode1 + "-" + this.chassisNo
    this.wsVehicleMasterForm.patchValue({segment:this.segment});

  }

  SetToDefault(){
    // alert ("Model selected");
    // this.colorCode=''
    // this.variantCode='';
    this.wsVehicleMasterForm.patchValue({segment:''});
  }

  CreateNewCustomer() {
    alert("Creating new Customer  ....wip");
  }


  onOptionsSelectedModel(mainModel:any) {
    if (mainModel != null) {

      // let selectedValue = this.mainModelList.find(v => v.code === mainModel);
      // this.itemTypeForCat=selectedValue.attribute2;
      
      // this.categoryId=35;
      this.wsVehicleMasterForm.patchValue({categoryId:35});

      this.segment=null;
      this.variantDesc = null;
      this.service.VariantSearchFn(mainModel)
        .subscribe(
          data => {
            this.VariantSearch = data;
            console.log(this.VariantSearch);
          }
        );
        
    }
    else { }
    
  }


  onSelectedDealer(dlrCode) {
    // alert ("dlrCode:" +dlrCode);
    if(dlrCode != undefined){
      let select = this.dealerCodeList.find(d=>d.dealerCode === dlrCode);
      if (select) {
        this.dealerName=select.dealerDesc

      }
    }
  }





  onOptionsSelectedVariant(modelVariant) {
    if(modelVariant != undefined){
     
    this.service.variantDetailsList(modelVariant)
      .subscribe(
        data => {
          this.variantDetailsList = data;
          console.log(this.variantDetailsList);

          this.wsVehicleMasterForm.patchValue({
            variantDesc: this.variantDetailsList.varDescription,
            serviceModel: this.variantDetailsList.serviceModel,
            fuelType : this.variantDetailsList.fuelType,

          });
          this.service.colorCodeListByVariant(modelVariant)
          .subscribe(
            data => {
              this.colorCodeList = data;
              console.log(this.colorCodeList);
            }
          );
        });
      }
  }

  onChangeRegDate(mRegDate) {
    // alert ("Sale Date :"+this.deliveryDate);
    var currDate = new Date();
    var regDate =new Date(mRegDate);
    var delDate=new Date(this.deliveryDate);

    if(regDate < delDate || this.deliveryDate===undefined) {
      alert ("REGISTRATION DATE :" + "Should not be below Sale Date");
      this.regDate = this.deliveryDate;
      return;
    }

  }

  onChangeDelDate(mDelDate) {
    this.regDate=null;

    var currDate = new Date();
    var delDate =new Date(mDelDate);
    if(delDate >currDate) {
      alert ("SALE DATE :" + "Should not be above Today's Date");
      this.deliveryDate = this.pipe.transform(this.now, 'y-MM-dd');
      return;
    } else {
    // ------------Date-----------
    var stDate = new Date(mDelDate);
    var prd = 2;
    var date2 = this.addDays(stDate, prd * 365);
    this.oemWarrentyEndDate = this.pipe.transform(date2, 'y-MM-dd');
    // ------------Date-----------

  } }

  addDays(date1: Date, days1: number): Date {
    date1.setDate(date1.getDate() + days1);
    return date1;
  }


  tvFlag(e) {
    if (e.target.checked === true) { this.showTvDetails = true; }
    else { this.showTvDetails = false; }
  }

  GovtVehicle(e) {
    if (e.target.checked === true) { alert("Govt Vehicle"); }
    else { alert("non-Govt Vehicle"); }
  }
  VipVehicle(e) {
    if (e.target.checked === true) { alert("VIP Vehicle"); }
    else { alert("NON-VIP Vehicle"); }
  }

  resetVehDet() {
    this.regNo = null; this.regDate = null; this.monthYrManf = null;
    this.vin = null; this.segment = null;
    this.wsVehicleMasterForm.get('mainModel').reset();
    this.variantCode = null; this.variantDesc = null;
    this.wsVehicleMasterForm.get('colorCode').reset();
    this.wsVehicleMasterForm.get('fuelType').reset();
    this.chassisNo = null; this.engineNo = null;
    this.serviceModel = null; 
    // this.rfId = null;
    this.deliveryDate = null;
    this.dmsInvoiceNo = null; this.dlrInvoiceNo = null;
    this.dealerCode = null; this.dealerName = null; this.dealerSite = null;
    this.oemWarrentyEndDate = null;
    this.wsVehicleMasterForm.get('categoryId').reset();
    this.VariantSearch = null;
  }
  resetCustDet() {
    this.custAccountNo = null; this.custName = null; this.dmsCustNo = null;
    this.address1 = null; this.address2 = null;
    this.address3 = null; this.custAddress4 = null;
    this.city = null; this.state = null;
    this.pinCd = null; 
    // this.rfId = this.emailId1 = null;
    this.mobile1 = null; this.mobile2 = null; this.contactNo = null;
    this.dmsInvoiceNo = null; this.dlrInvoiceNo = null;

  }
  resetAddnl() {
    this.wsVehicleMasterForm.get('ewStatus').reset();
    this.wsVehicleMasterForm.get('mcpStatus').reset();
    this.policyNo = null; this.insuDate = null; this.insCompanyName = null;
    this.inscompanySite = null; this.ewBookletNo = null;
    this.ewInsurerId = null; this.ewEndDate = null;
    this.ewBalanceDays = null; this.ewInsurerSite = null;
    this.mcpNo = null; this.mcpEndDate = null;
    this.cngCylinderNo = null; this.cngKitNumber = null; this.cngExpDate = null;
  }

  resetTv() {
    this.tvReSaleDate = null; this.tvWrExpDate = null; this.tvWrExpMileage = null;
    this.tvCertificateNo = null; this.tvSaleDealer = null;
    this.tvSaleLocation = null; this.ewEndDate = null;
    this.tvStatus = null;

  }

  CheckDataValidations() {

    const formValue: IWsVehicleMaster = this.wsVehicleMasterForm.value;

    if (formValue.regNo === undefined || formValue.regNo === null || formValue.regNo.trim() === '') {
      this.checkValidation = false;
      alert("REGISTRATION NO : Should not be null....");
      return;
    }

    if (formValue.mainModel === undefined || formValue.mainModel === null || formValue.mainModel.trim() === '') {
      this.checkValidation = false;
      alert("MODEL: Should not be null....");
      return;
    }

    if (formValue.variantCode === undefined || formValue.variantCode === null || formValue.variantCode.trim() === '') {
      this.checkValidation = false;
      alert("VARIANT CODE : Should not be null....");
      return;
    }

    if (formValue.colorCode === undefined || formValue.colorCode === null || formValue.colorCode.trim() === '') {
      this.checkValidation = false;
      alert("COLOUR CODE : Should not be null....");
      return;
    }

    if (formValue.fuelType === undefined || formValue.fuelType === null || formValue.fuelType.trim() === '') {
      this.checkValidation = false;
      alert("FUEL TYPE : Should not be null....");
      return;
    }

    if (formValue.chassisNo === undefined || formValue.chassisNo === null || formValue.chassisNo.trim() === '') {
      this.checkValidation = false;
      alert("CHASSIS NO : Should not be null....");
      return;
    }

    if (formValue.engineNo === undefined || formValue.engineNo === null || formValue.engineNo.trim() === '') {
      this.checkValidation = false;
      alert("ENGINE NO : Should not be null....");
      return;
    }

    if (formValue.segment === undefined || formValue.segment === null || formValue.segment.trim() === '') {
      this.checkValidation = false;
      alert("ITEM CODE : Should not be null....");
      return;
    }

    if (formValue.categoryId < 0 || formValue.categoryId === undefined || formValue.categoryId === null) {
      this.checkValidation = false;
      alert("ITEM CATEGORY: Should not be null");
    }

    

    // if (formValue.itemTypeForCat === undefined || formValue.itemTypeForCat === null || formValue.itemTypeForCat.trim() === '') {
    //   this.checkValidation = false;
    //   alert("ITEM CATEGORY : Should not be null....");
    //   return;
    // }

    // if (formValue.itemId < 0 || formValue.itemId === undefined || formValue.itemId === null) {
    //   this.checkValidation = false;
    //   alert("ITEM Id: Should not be null");
    // }


    if (formValue.custAccountNo < 0 || formValue.custAccountNo === undefined || formValue.custAccountNo === null) {
      this.checkValidation = false;
      alert("CUSTOMER NO: Should not be null");
    }

    if (formValue.mobile1 < 0 || formValue.mobile1 === undefined || formValue.mobile1 === null) {
      this.checkValidation = false;
      alert("CUSTOMER PHONE1: Should not be null");
    }

    if (formValue.custName === undefined || formValue.custName === null || formValue.custName.trim() === '') {
      this.checkValidation = false;
      alert("CUSTOMER NAME : Should not be null....");
      return;
    }

    if (formValue.address1 === undefined || formValue.address1 === null || formValue.address1.trim() === '') {
      this.checkValidation = false;
      alert("ADDRESS1 : Should not be null....");
      return;
    }

    if (formValue.address2 === undefined || formValue.address2 === null || formValue.address2.trim() === '') {
      this.checkValidation = false;
      alert("ADDRESS2: Should not be null....");
      return;
    }

    // if (formValue.address3 === undefined || formValue.address3 === null || formValue.address3.trim() === '') {
    //   this.checkValidation = false;
    //   alert("ADDRESS3 : Should not be null....");
    //   return;
    // }

    if (formValue.city === undefined || formValue.city === null || formValue.city.trim() === '') {
      this.checkValidation = false;
      alert("CITY : Should not be null....");
      return;
    }
    if (formValue.state === undefined || formValue.state === null || formValue.state.trim() === '') {
      this.checkValidation = false;
      alert("STATE : Should not be null....");
      return;
    }
    if (formValue.pinCd === undefined || formValue.pinCd === null ) {
      this.checkValidation = false;
      alert("PIN : Should not be null....");
      return;
    }


    this.checkValidation = true

  }

  createCustomer(){
    this.router.navigate(['/admin/master/customerMaster']);
  }

  LoadCustDetails(){
    // alert ("Customer details....");
    // this.GetCustomerDetails(this.lstcomments.customerId);
    // this.GetCustomerSiteDetails(this.lstcomments.customerId);

  }

  onInsurerNameSelected(customerId: number) {
    // alert('in '+ customerId)
    if(customerId >0) {
    this.service.insSiteList(customerId)
      .subscribe(
        data => {
          this.insSiteList = data.customerSiteMasterList;
          console.log(this.insSiteList);
        }
      );
  } }


 

   
  vehHistory(){
  var vehRegNum=this.wsVehicleMasterForm.get('vehRegNo').value
  const fileName = 'download.pdf';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  this.serviceService.printVehicleHistory(vehRegNum)
    .subscribe(data => {
      var blob = new Blob([data], { type: 'application/pdf' });
      var url = URL.createObjectURL(blob);
      var printWindow = window.open(url, '', 'width=800,height=500');
      printWindow.open
      
    });
  }


  // vehNum(){
  //   var vreg=this.wsVehicleMasterForm.get('regNo').value
  //   alert (vreg);
  //   alert (vreg.toUpperCase());
  // }

  
  onInput(event) {
    event.target.value = event.target.value.toLocaleUpperCase();
  }

  jobCardForm(){
    this.router.navigate(['/admin/service/JobCard']);
  }

}
