import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
// import * as $ from 'jquery';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { MasterService } from 'src/app/master/master.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { identifierModuleUrl } from '@angular/compiler';
import { contains } from 'jquery';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  F9_KEY = 120,
}

interface IAdmin {
  searchItemId: number;
  searchItemCode: string;
  searchItemName: string;
  searchByItemDesc: string;
  itemDescreption : string;
  itemSegment :string;
  invItemId:number;

  subInventory: string;
  subInventoryId: number;
  subInventoryCode: string;
  itemLineCount :number; 

}

declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
// export class AdminComponent  {
export class AdminComponent implements OnInit {
  adminForm1: FormGroup;

  // @ViewChild('partSearch') partSearch: any;

  public itemMap = new Map<string, any[]>();
  public itemMap2 = new Map<number, any[]>();
  itemSeg: string = '';

  public ItemIdList: any[];
  public subInvCode: any;

  lstcomments: any;
  lstcomments1: any = [];
  ticketNo: string;
  today = new Date();
  todaysDataTime = '';
  divisionId: number;
  displayMaruti: boolean;
  isVisible1: boolean = true;
  isVisible2: boolean = true;
  isVisible3: boolean = true;
  isVisible5: boolean = true;
  isVisible11:boolean=true;
  isVisible12:boolean=true;
  isVisible13:boolean=true;
  isVisible14:boolean=true;
  isVisible15:boolean=true;
  isVisible16:boolean=true;
  isVisible17:boolean=true;
  isVisible18:boolean=true;
  isVisible19:boolean=true;
  isVisible20:boolean=true;
  isVisible21:boolean=true;
  isVisible22:boolean=true;
  isVisible23:boolean=true;
  isVisible24:boolean=true;
  isVisible25:boolean=true;
  isVisible26:boolean=true;
  isVisible27:boolean=true;
  isVisible28:boolean=true;
  isVisible29:boolean=true;
  isVisibleSparesReport:boolean=true;
  isVisible31:boolean=true;
  isVisible32:boolean=true;
  isVisible33:boolean=true;
  isVisible34:boolean=true;
  isVisibleServiceReport:boolean=true;
  isVisibleSalesReport:boolean=true;
  isVisible37:boolean=true;
  isVisibleSaleStockAdju:boolean=true;
  isVisibleServerReport:boolean=true;
  isVisibleAccessories:boolean=true;
  isVisibleShellReport:boolean=true;
  isVisibleAccountsRepor:boolean=true;
  isVisibleMaster:boolean=true;
  isVisibleCustMaster:boolean=true;
  public show: boolean = false;
  isShown: boolean = false;
  isVisibleGL:boolean=false;
  displayUserIdwiseAccess: boolean = true;
  isVisibleSubInventoryTransfer:boolean=false;
  isVisibleWsVehicleMaster:boolean=false; 
  isVisibilePaintSystem:boolean=false;
  isVisibilePetrolPumpSystem:boolean=false;
  isVisibleReturnToVendor:boolean=true;
  isVisibleShortLanded:boolean=true;
  isVisibleSearchPaint:boolean=false;

  isVisiblePaintMaster:boolean=true;
  isVisiblePaintTrans:boolean=true;
  isVisiblePaintPurchase:boolean=true;
  isVisiblePaintReport:boolean=true;
  isVisiblePaintReportAuditor:boolean=true;
  isVisibileToolsSystem:boolean=true;
  isVisibleToolsMaster:boolean=true;


  fullName: string;
  deptName: string;
  locCode: string;
  locName: string;
  ouName: string;
  loginArray: string;
  locId: number;
  ouId: number;
  searchBy: string = 'ITEM NUMBER';
  searchItemId: number;
  searchItemCode: string;
  searchItemName: string;
  searchByItemDesc: string;
  userList2: any[] = [];
  lastkeydown1: number = 0;
  displayMarutiMenu: Boolean;

  segment: string;
  itemSegment:string;
  invItemId:number;
  desc: string;
  uom: string;
  hsnSacCode: string;
  gstPer: number;
  salePrice: number;
  purchPrice: number;
  mrp: number;
  principleItem: number;

  searchByItem = true;
  searchByDesc = false;
  deptId:string;
  itemDescreption : string;

  subInventory: string;
  subInventoryId: number;
  subInventoryCode: string;
  itemLineCount :number; 



  @ViewChild('myinput') myInputField: ElementRef;
  emplId: number;
  // @ViewChild("segment") segment: ElementRef;
  // ngAfterViewInit() {
  //   this.myInputField.nativeElement.focus();
  // }
  @ViewChild('input2') input2: ElementRef;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: MasterService
  ) {
    
    this.todaysDataTime = formatDate(
      this.today,
      'dd-MM-yyyy hh:mm:ss a',
      'en-US',
      '+0530'
    );

    this.adminForm1 = fb.group({
      searchBy: [],
      searchItemCode: [],
      searchItemName: [],
      searchByItemDesc: [],
      itemDescreption :[],

      itemSegment:[],
      invItemId:[],

      subInventoryId: [],
      subInventory: [],
      itemLineCount :[],

      segment: [],
      onHandQty: [''],
      subInventoryCode: [''],
      description: [''],
      desc: [],
      uom: [],
      hsnSacCode: [],
      gstPer: [],
      salePrice: [],
      purchPrice: [],
      mrp: [],
      principleItem: [],
      deptId:[],
    });
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);

    if (event.keyCode === KEY_CODE.F9_KEY) {
      this.f9Key();
    }
  }

  @HostListener('window:unload', ['$event'])
  keyEvent1(event: KeyboardEvent) {
    // console.log(event);
  }

  get f() {
    return this.adminForm1.controls;
  }
  admin(adminForm1: any) {}

  ngOnInit(): void {
    // alert('in admin page')
    $('#menu-toggle').click(function (e) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });

    this.ticketNo = sessionStorage.getItem('ticketNo');
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.fullName = sessionStorage.getItem('fullName');
    this.deptName = sessionStorage.getItem('deptName');
    this.locName = sessionStorage.getItem('locName');
    this.ouName = sessionStorage.getItem('ouName');
    this.deptId=sessionStorage.getItem('deptId');
    //
    this.loginArray = sessionStorage.getItem('CompName');

    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.locId = Number(sessionStorage.getItem('locId'));
    this.locCode = sessionStorage.getItem('locCode');

    $('.dropdown-menu a.dropdown-toggle').on('click', function (e) {
      if (!$(this).next().hasClass('show')) {
        $(this)
          .parents('.dropdown-menu')
          .first()
          .find('.show')
          .removeClass('show');
      }
      var $subMenu = $(this).next('.dropdown-menu');
      $subMenu.toggleClass('show');

      $(this)
        .parents('li.nav-item.dropdown.show')
        .on('hidden.bs.dropdown', function (e) {
          $('.dropdown-submenu .show').removeClass('show');
        });

      return false;
    });

    if (this.divisionId === 1) {
    } else if (this.divisionId === 2) {
      this.displayMaruti = false;
    }

    // if (Number(sessionStorage.getItem('divisionId')) === 2) {
    //   this.isVisible1 = false;
    //   this.isVisible2 = false;
    // } else if (Number(sessionStorage.getItem('divisionId')) === 1) {
    //   this.isVisible1 = true;
    //   this.isVisible2 = false;
    // }

    // if (
    //   Number(sessionStorage.getItem('divisionId')) === 2 &&
    //   Number(sessionStorage.getItem('roleId')) === 1
    // ) {
    //   this.isVisible2 = true;
    // }
    // && ((sessionStorage.getItem('roleId'))==='NaN'|| (sessionStorage.getItem('roleId'))===undefined || (sessionStorage.getItem('roleId'))===null|| (sessionStorage.getItem('roleId'))==='')
   
    // if (Number(sessionStorage.getItem('divisionId')) === 1 && Number(sessionStorage.getItem('roleId'))===1 && sessionStorage.getItem('deptName')==='DP' && sessionStorage.getItem('ticketNo') ==='P5678')
    // if (Number(sessionStorage.getItem('divisionId')) === 1 && Number(sessionStorage.getItem('roleId'))===1  && sessionStorage.getItem('ticketNo') ==='P5678')
   
if (Number(sessionStorage.getItem('divisionId')) === 1 && sessionStorage.getItem('deptName')==='Spares' && (sessionStorage.getItem('roleId')) == 'PAINT' ) 
   
    {
      this.isVisibleSearchPaint=true;
      this.isVisibleMaster=false;
      this.isVisible11=false;
      this.isVisible12=false;
      this.isVisible13=false
      this.isVisibleWsVehicleMaster=false;
      this.isVisibleCustMaster=false;
      this.isVisible14=false;
      this.isVisible15=false;
      this.isVisible16=false;
      this.isVisible17=false;
      this.isVisible18=false;
      this.isVisible19=false;
      this.isVisible20=false;
      this.isVisible21=false;
      this.isVisible22=false;
      this.isVisible23=false;
      this.isVisible24=false;
      this.isVisible25=false;
      this.isVisible26=false;
      this.isVisibleSubInventoryTransfer=false;
      this.isVisible27=false;
      this.isVisible28=false;
      this.isVisible29=false;
      this.isVisibleSparesReport=false;
      this.isVisible31=false;
      this.isVisible32=false;
      this.isVisibleServiceReport=false;
      this.isVisibleSalesReport=false;
      this.isVisible37=false;
      this.isVisibleSaleStockAdju=false;
      this.isVisibleAccountsRepor=false;
      this.isVisibleAccessories=false;
      this.isVisibilePetrolPumpSystem=false;
      this.isVisibilePaintSystem=true;
      this.isVisiblePaintMaster=true;
      this.isVisiblePaintTrans=true;
      this.isVisiblePaintPurchase=true;
      this.isVisiblePaintReport=true;
      this.isVisiblePaintReportAuditor=false;
    }


    if (Number(sessionStorage.getItem('divisionId')) === 1 && sessionStorage.getItem('deptName')==='DP' && (sessionStorage.getItem('roleId')) !== 'AUDITOR' ) 
    // && sessionStorage.getItem('ticketNo') ==='GM01733')
    // Paint Login -----
    // alert("role Id :" + (sessionStorage.getItem('roleId')))

    {
      this.isVisibleSearchPaint=true;
      this.isVisibleMaster=false;
      this.isVisible11=false;
      this.isVisible12=false;
      this.isVisible13=false
      this.isVisibleWsVehicleMaster=false;
      this.isVisibleCustMaster=false;
      this.isVisible14=false;
      this.isVisible15=false;
      this.isVisible16=false;
      this.isVisible17=false;
      this.isVisible18=false;
      this.isVisible19=false;
      this.isVisible20=false;
      this.isVisible21=false;
      this.isVisible22=false;
      this.isVisible23=false;
      this.isVisible24=false;
      this.isVisible25=false;
      this.isVisible26=false;
      this.isVisibleSubInventoryTransfer=false;
      this.isVisible27=false;
      this.isVisible28=false;
      this.isVisible29=false;
      this.isVisibleSparesReport=false;
      this.isVisible31=false;
      this.isVisible32=false;
      this.isVisibleServiceReport=false;
      this.isVisibleSalesReport=false;
      this.isVisible37=false;
      this.isVisibleSaleStockAdju=false;
      this.isVisibleAccountsRepor=false;
      this.isVisibleAccessories=false;
      this.isVisibilePetrolPumpSystem=false;
      this.isVisibilePaintSystem=true;
      this.isVisiblePaintMaster=true;
      this.isVisiblePaintTrans=true;
      this.isVisiblePaintPurchase=true;
      this.isVisiblePaintReport=true;
      this.isVisiblePaintReportAuditor=false;
      this.isVisibleToolsMaster=false;
      // this.isVisibleShellReport=false;

    }
    
    if (Number(sessionStorage.getItem('divisionId')) === 1 && sessionStorage.getItem('deptName')==='DP' && (sessionStorage.getItem('roleId'))==='AUDITOR' ) 
      {
        this.isVisibleSearchPaint=true;
        this.isVisibleMaster=false;
        this.isVisible11=false;
        this.isVisible12=false;
        this.isVisible13=false
        this.isVisibleWsVehicleMaster=false;
        this.isVisibleCustMaster=false;
        this.isVisible14=false;
        this.isVisible15=false;
        this.isVisible16=false;
        this.isVisible17=false;
        this.isVisible18=false;
        this.isVisible19=false;
        this.isVisible20=false;
        this.isVisible21=false;
        this.isVisible22=false;
        this.isVisible23=false;
        this.isVisible24=false;
        this.isVisible25=false;
        this.isVisible26=false;
        this.isVisibleSubInventoryTransfer=false;
        this.isVisible27=false;
        this.isVisible28=false;
        this.isVisible29=false;
        this.isVisibleSparesReport=false;
        this.isVisible31=false;
        this.isVisible32=false;
        this.isVisibleServiceReport=false;
        this.isVisibleSalesReport=false;
        this.isVisible37=false;
        this.isVisibleSaleStockAdju=false;
        this.isVisibleAccountsRepor=false;
        this.isVisibleAccessories=false;
        this.isVisibilePetrolPumpSystem=false;
        this.isVisibilePaintSystem=true;
        this.isVisiblePaintMaster=false;
        this.isVisiblePaintTrans=false;
        this.isVisiblePaintPurchase=false;
        this.isVisiblePaintReport=false;
        this.isVisiblePaintReportAuditor=true;
        this.isVisibleToolsMaster=false;
      }

    // && sessionStorage.getItem('ticketNo') ==='P5678'

    if (Number(sessionStorage.getItem('divisionId')) === 3 && Number(sessionStorage.getItem('roleId'))===1  )
    {
      this.isVisible11=false;
      this.isVisibleCustMaster=false;
      this.isVisible12=false;
      this.isVisibleMaster=false;
      this.isVisibleReturnToVendor=false;
      this.isVisibleShortLanded=false;
      this.isVisibilePetrolPumpSystem=true;
      this.isVisible13=false
      this.isVisibleWsVehicleMaster=false;
      this.isVisible14=false;
      this.isVisible15=false;
      this.isVisible16=false;
      this.isVisible17=false;
      this.isVisible18=false;
      this.isVisible19=false;
      this.isVisible20=false;
      this.isVisible21=false;
      this.isVisible22=false;
      this.isVisible23=false;
      this.isVisible24=false;
      this.isVisible25=false;
      this.isVisible26=false;
      this.isVisibleSubInventoryTransfer=false;
      this.isVisible27=false;
      this.isVisible28=false;
      this.isVisible29=false;
      this.isVisibleSparesReport=false;
      this.isVisible31=false;
      this.isVisible32=false;
      this.isVisibleServiceReport=false;
      this.isVisibleSalesReport=false;
      this.isVisible37=false;
      this.isVisibleSaleStockAdju=false;
      this.isVisibleAccountsRepor=true;
      this.isVisibleAccessories=false;
      this.isVisibilePaintSystem=false
      this.isVisibleSearchPaint=false;
      this.isVisibleToolsMaster=false;
      // this.isVisibilePetrolPumpSystem=true;
      // this.isVisibleShellReport=false;
    }

    if (Number(sessionStorage.getItem('divisionId')) === 2 && Number(sessionStorage.getItem('roleId'))===3 && sessionStorage.getItem('deptName')==='Sales'){
      this.isVisible11=false;
      this.isVisible12=true;
      this.isVisible13=false
      this.isVisibleWsVehicleMaster=true;
      this.isVisible14=true;
      this.isVisible15=true;
      this.isVisible16=true;
      this.isVisible17=true;
      this.isVisible18=true;
      this.isVisible19=false;
      this.isVisible20=false;
      this.isVisible21=false;
      this.isVisible22=false;
      this.isVisible23=true;
      this.isVisible24=true;
      this.isVisible25=true;
      this.isVisible26=true;
      this.isVisibleSubInventoryTransfer=true;
      this.isVisible27=true;
      this.isVisible28=true;
      this.isVisible29=true;
      this.isVisibleSparesReport=false;
      this.isVisible31=true;
      this.isVisible32=true;
      this.isVisibleServiceReport=false;
      this.isVisibleSalesReport=true;
      this.isVisible37=true;
      this.isVisibleSaleStockAdju=true;
      this.isVisibleAccountsRepor=false;
      this.isVisibleAccessories=false;
      this.isVisibilePaintSystem=false;
      this.isVisibleShellReport=false;
      this.isVisibleSearchPaint=false;
      this.isVisibleToolsMaster=false;
      // if (sessionStorage.getItem('deptName')==='Account'){

      // }
    }

    if (Number(sessionStorage.getItem('divisionId')) === 2 && Number(sessionStorage.getItem('roleId'))===9 && sessionStorage.getItem('deptName')==='Account'){
      this.isVisible11=false; 
      this.isVisible12=false;
      this.isVisible13=false
      this.isVisibleWsVehicleMaster=false;
      this.isVisible14=false;
      this.isVisible15=false;
      this.isVisible16=false;
      this.isVisible17=false;
      this.isVisible18=false;
      this.isVisible19=false;
      this.isVisible20=false;
      this.isVisible21=false;
      this.isVisible22=false;
      this.isVisible23=false;
      this.isVisible24=false;
      this.isVisible25=false;
      this.isVisible26=false;
      this.isVisibleSubInventoryTransfer=false;
      this.isVisible27=false;
      this.isVisible28=false;
      this.isVisible29=true;
      this.isVisibleSparesReport=true;
      this.isVisible31=false;
      this.isVisible32=false;
      this.isVisibleServiceReport=true;
      this.isVisibleSalesReport=true;
      this.isVisible37=false;
      this.isVisibleSaleStockAdju=false;
      this.isVisibleAccountsRepor=true;
      this.isVisibleAccessories=false;
      this.isVisibleMaster=false;
      this.isVisibleGL=true;
      this.isVisibleCustMaster=false;
      this.isVisibilePaintSystem=false;
      this.isVisibleShellReport=false;
      this.isVisibleSearchPaint=false;
      this.isVisibleToolsMaster=false;

    }
    if (Number(sessionStorage.getItem('divisionId')) === 2 && Number(sessionStorage.getItem('roleId'))===2 && sessionStorage.getItem('deptName')==='Service'){
      this.isVisible11=false;
      this.isVisible12=false;
      this.isVisibleWsVehicleMaster=false;
      this.isVisible13=true; 
      this.isVisible14=false;
      this.isVisible37=false;
      this.isVisibleSaleStockAdju=false;
      this.isVisible15=false;
      this.isVisible16=true;
      this.isVisible17=false;
      this.isVisible18=false;
      this.isVisibleSubInventoryTransfer=false;
      this.isVisible19=false;
      this.isVisible20=false;
      this.isVisible21=true;
      this.isVisible22=true;
      this.isVisible23=true;
      this.isVisible24=true;
      this.isVisible25=false;
      this.isVisible26=true;
      this.isVisible27=true;
      this.isVisible28=false;
      this.isVisible29=true;
      this.isVisibleSparesReport=false;
      this.isVisible31=false;
      this.isVisible32=true;
      this.isVisibleServiceReport=true;
      this.isVisibleSalesReport=false;
      this.isVisibleAccountsRepor=false;
      this.isVisibleAccessories=false;
      this.isVisibilePaintSystem=false;
      this.isVisibleShellReport=false;
      this.isVisibleSearchPaint=false;
      this.isVisibleToolsMaster=false;

    }


    if (Number(sessionStorage.getItem('divisionId')) === 2 && sessionStorage.getItem('deptName')==='Spares' && Number(sessionStorage.getItem('roleId'))===1){
      // alert('roleId  1' + this.isVisible20)
      this.isVisible11=true;
      this.isVisible12=false;
      this.isVisible37=true;
      this.isVisibleSaleStockAdju=false;
      this.isVisibleSubInventoryTransfer=false;
      this.isVisible13=false;
      this.isVisibleWsVehicleMaster=false;
      this.isVisible14=true;
      this.isVisible15=true;
      this.isVisible16=true;
      this.isVisible17=true;
      this.isVisible18=true;
      this.isVisible19=true;
      this.isVisible20=true;
      this.isVisible21=false;
      this.isVisible22=false;
      this.isVisible23=false;
      this.isVisible24=true;
      this.isVisible25=true;
      this.isVisible26=true;
      this.isVisible27=true;
      this.isVisible28=true;
      this.isVisible29=true;
      this.isVisibleSparesReport=true;
      this.isVisible31=true;
      this.isVisible32=false;
      this.isVisibleServiceReport=false;
      this.isVisibleSalesReport=false;
      this.isVisibleAccountsRepor=false;
      this.isVisibleAccessories=true;
      this.isVisibilePaintSystem=false;
      this.isVisibleSearchPaint=false;

      // this.isVisibleShellReport=false;
      // alert((sessionStorage.getItem('deptName')))
      if ((sessionStorage.getItem('deptName'))==='Shell'){
        this.isVisibleShellReport=true;
        this.isVisibleSparesReport=false;
        this.isVisibleServiceReport=false;
       this.isVisibleSalesReport=false;
       this.isVisibleAccountsRepor=false;
        this.isVisibleAccessories=false;
        this.isVisibleServerReport=false;
      }
      this.isVisibleToolsMaster=false;
    }

    if (Number(sessionStorage.getItem('divisionId')) === 2 && sessionStorage.getItem('deptName')==='Spares' && Number(sessionStorage.getItem('roleId'))===4){
      // alert((sessionStorage.getItem('roleId')))
      this.isVisible11=true;
      this.isVisible12=false;
      this.isVisibleWsVehicleMaster=false;
      this.isVisible13=false;
      this.isVisibleSubInventoryTransfer=false;
      this.isVisible14=true;
      this.isVisible15=true;
      this.isVisible16=true;
      this.isVisible17=true;
      this.isVisible18=true;
      this.isVisible19=true;
      this.isVisible20=false;
      this.isVisible21=false;
      this.isVisible37=true;
      this.isVisibleSaleStockAdju=false;
      this.isVisible22=false;
      this.isVisible23=false;
      this.isVisible24=true;
      this.isVisible25=true;
      this.isVisible26=true;
      this.isVisible27=true;
      this.isVisible28=true;
      this.isVisible29=true;
      this.isVisibleSparesReport=true;
      this.isVisible31=true;
      this.isVisible32=false;
      this.isVisibleServiceReport=false;
      this.isVisibleSalesReport=false;
      this.isVisibleAccountsRepor=false;
      this.isVisibleAccessories=false;
      this.isVisibilePaintSystem=false;
      this.isVisibleShellReport=false;
      this.isVisibleSearchPaint=false;
      this.isVisibleToolsMaster=false;

    }

    if (Number(sessionStorage.getItem('divisionId')) === 2 && sessionStorage.getItem('deptName')==='Accessories' && Number(sessionStorage.getItem('roleId'))===4){
      // alert((sessionStorage.getItem('roleId')))
      this.isVisible11=true;
      this.isVisible12=false;
      this.isVisibleSubInventoryTransfer=true;
      this.isVisibleWsVehicleMaster=false;
      // this.isVisibleSubInventoryTransfer=false;
      this.isVisible13=false;
      this.isVisible14=true;
      this.isVisible15=true;
      this.isVisible16=true;
      this.isVisible17=true;
      this.isVisible18=true;
      this.isVisible19=true;
      this.isVisible20=false;
      this.isVisible21=false;
      this.isVisible37=true;
      this.isVisibleSaleStockAdju=false;
      this.isVisible22=false;
      this.isVisible23=false;
      this.isVisible24=true;
      this.isVisible25=true;
      this.isVisible26=true;
      this.isVisible27=true;
      this.isVisible28=true;
      this.isVisible29=true;
      this.isVisibleSparesReport=true;
      this.isVisible31=true;
      this.isVisible32=false;
      this.isVisibleServiceReport=false;
      this.isVisibleSalesReport=false;
      this.isVisibleAccountsRepor=false;
      this.isVisibleAccessories=true;
      this.isVisibilePaintSystem=false;
      this.isVisibleShellReport=false;
      this.isVisibleSearchPaint=false;
      this.isVisibleToolsMaster=false;

    }



    if (Number(sessionStorage.getItem('divisionId')) === 2 && sessionStorage.getItem('deptName')==='Accessories' && Number(sessionStorage.getItem('roleId'))===1){
      // alert('roleId  1' + this.isVisible20)
      this.isVisible11=true;
      this.isVisible12=false;
      this.isVisible37=true;
      this.isVisibleSaleStockAdju=false;
      this.isVisibleWsVehicleMaster=false;
      this.isVisibleSubInventoryTransfer=false;
      this.isVisible13=false;
      this.isVisible14=true;
      this.isVisible15=true;
      this.isVisible16=true;
      this.isVisible17=true;
      this.isVisible18=true;
      this.isVisible19=true;
      this.isVisible20=true;
      this.isVisible21=false;
      this.isVisible22=false;
      this.isVisible23=false;
      this.isVisible24=true;
      this.isVisible25=true;
      this.isVisible26=true;
      this.isVisible27=true;
      this.isVisible28=true;
      this.isVisible29=true;
      this.isVisibleSparesReport=true;
      this.isVisible31=true;
      this.isVisible32=false;
      this.isVisibleServiceReport=false;
      this.isVisibleSalesReport=false;
      this.isVisibleAccountsRepor=false;
      this.isVisibleAccessories=true;
      this.isVisibilePaintSystem=false;
      this.isVisibleShellReport=false;
      this.isVisibleSearchPaint=false;
      this.isVisibleToolsMaster=false;
    }
    if (Number(sessionStorage.getItem('deptId'))===4){
      this.isVisibleAccountsRepor=true;
      // this.isVisibleAccessories=true;
    }



    if (Number(sessionStorage.getItem('divisionId')) === 2 && sessionStorage.getItem('deptName')==='Shell' && Number(sessionStorage.getItem('roleId'))===1){
      // alert('roleId  1' + this.isVisible20)
      this.isVisible11=true;
      this.isVisible12=false;
      this.isVisible37=true;
      this.isVisibleSaleStockAdju=false;
      this.isVisibleSubInventoryTransfer=false;
      this.isVisible13=false;
      this.isVisibleWsVehicleMaster=false;
      this.isVisible14=true;
      this.isVisible15=true;
      this.isVisible16=true;
      this.isVisible17=true;
      this.isVisible18=true;
      this.isVisible19=true;
      this.isVisible20=true;
      this.isVisible21=false;
      this.isVisible22=false;
      this.isVisible23=false;
      this.isVisible24=true;
      this.isVisible25=true;
      this.isVisible26=true;
      this.isVisible27=true;
      this.isVisible28=true;
      this.isVisible29=true;
      this.isVisibleSparesReport=false;
      this.isVisible31=true;
      this.isVisible32=false;
      this.isVisibleServiceReport=false;
      this.isVisibleSalesReport=false;
      this.isVisibleAccountsRepor=false;
      this.isVisibleServerReport=false;
      this.isVisibleAccessories=false;
      this.isVisibilePaintSystem=false;
      // this.isVisibleShellReport=false;
        this.isVisibleShellReport=true;
        this.isVisibleSearchPaint=false;
        this.isVisibleToolsMaster=false;
    }

    if (Number(sessionStorage.getItem('divisionId')) === 1 && Number(sessionStorage.getItem('deptId'))===5){
      this.isVisible11=false;
      this.isVisible12=false;
      this.isVisible13=false
      this.isVisibleWsVehicleMaster=false;
      this.isVisible14=true;
      this.isVisible15=false;
      this.isVisible16=false;
      this.isVisible17=false;
      this.isVisible18=false;
      this.isVisible19=false;
      this.isVisible20=false;
      this.isVisibleMaster=false;
      this.isVisible21=false;
      this.isVisible22=false;
      this.isVisible23=false;
      this.isVisible24=true;
      this.isVisible25=true;
      this.isVisible26=true;
      this.isVisibleSubInventoryTransfer=false;
      this.isVisible27=false;
      this.isVisible28=false;
      this.isVisible29=true;
      this.isVisibleToolsMaster=true;
      this.isVisibleSparesReport=true;
      this.isVisible31=false;
      this.isVisible32=false;
      this.isVisibleServiceReport=false;
      this.isVisibleSalesReport=false;
      this.isVisible37=false;
      this.isVisibleSaleStockAdju=true;
      this.isVisibleAccountsRepor=false;
      this.isVisibleAccessories=false;
      this.isVisibilePaintSystem=false;
      this.isVisibleShellReport=false;
      this.isVisibleSearchPaint=false;
      this.isVisibleCustMaster=false;
      // if (sessionStorage.getItem('deptName')==='Account'){

      // }
    }



    if (
      sessionStorage.getItem('ticketNo') === undefined ||
      sessionStorage.getItem('ticketNo') === null ||
      sessionStorage.getItem('ticketNo') === ''
    ) {
      this.router.navigate(['login']);
    }

    //     if (Number(sessionStorage.getItem('divisionId')) === 2 && Number(sessionStorage.getItem('roleId')) === 2){
    //     this.isVisible1 = true;
    //     this.isVisible2 = false;
    //   }

    //   if (Number(sessionStorage.getItem('divisionId')) === 2 && Number(sessionStorage.getItem('roleId')) === 3){
    //   this.isVisible1 = true;
    //   this.isVisible2 = false;
    // }

    this.service.subInvCode2(this.deptId, this.divisionId).subscribe(
      data => {
        this.subInvCode = data;
        // console.log(data);
        this.subInventory = this.subInvCode.subInventoryCode;
      });
   
    this.service
      .searchByItemSegmentDiv(this.divisionId, '36DH1601')
      .subscribe((data) => {
        this.ItemIdList = data;
      });

  

    // const ele = this.adminForm1.controls.nativeElement['searchItemCode'];
    // this.searchItemCode..Focus();
    // this.input2.nativeElement.Focus();
    // partSearch.on('shown', function () {
    //   $('searchItemCode', this).focus();
    //   });
  }

  close() {
    this.router.navigate(['login']);
  }

  dashboard() {
    this.router.navigate(['/admin']);
  }

  getInvItemId($event) {
    // alert('in getInvItemId')
    let userId = (<HTMLInputElement>(
      document.getElementById('invItemIdFirstWay')
    )).value;
    this.userList2 = [];
    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList2 = this.searchFromArray1(this.ItemIdList, userId);
      }
    }
  }
  searchFromArray1(arr, regex) {
    let matches = [],
      i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  }

  LoadModal() {
    this.adminForm1.get('searchItemCode').reset();
    this.resetDet();
    this.searchBy = 'ITEM NUMBER';

    // this.service.ItemIdListDept(this.deptId, Number(sessionStorage.getItem('locId')), this.subInvCode.subInventoryId).subscribe(
    //   data => {
    //     this.ItemIdList = data;
    //   });

  } 

  LoadModalpnt() {
    this.adminForm1.get('itemSegment').reset();
    this.resetDet();
    this.searchBy = 'ITEM NUMBER';

    // this.service.ItemIdListDept(this.deptId, Number(sessionStorage.getItem('locId')), 49)
    //     .subscribe(data => {
    //     this.ItemIdList = data; 
    // });

    this.service.ItemIdListDept(this.deptId, Number(sessionStorage.getItem('locId')), this.subInvCode.subInventoryId).subscribe(
      data => {
        this.ItemIdList = data;
        this.itemLineCount=data.length
        // alert ("data.length " +data.length)
      });
   
       
  } 


  resetDet() {
    this.searchItemId = null;
    this.searchByItemDesc = null;
    this.searchItemName = null;
    this.segment = null;
    this.itemSegment=null;
    this.desc = null;
    this.uom = null;
    this.mrp = null;
    this.hsnSacCode = null;
    this.purchPrice = null;
    this.gstPer = null;
    this.principleItem = null;
    this.lstcomments = null;
    this.lstcomments1 = null;
    this.ItemIdList=null;
  }

  f9Key() {
    // alert( "Key F9 pressed");
    // this.router.navigate(['/admin/transaction/OnHandDetails']);
    // this.partSearch.open();

    if (this.isVisibleSearchPaint) {
        this.LoadModalpnt();
        $('#partSearchPnt').modal('show');
        $('#partSearchPnt').on('shown.bs.modal', function () {
          $('#invItemIdFirstWay').focus();
        });
    } else 
    { 
        this.LoadModal(); 
        $('#partSearch').modal('show');
        $('#partSearch').on('shown.bs.modal', function () {
          $('#invItemIdFirstWay').focus();
        });
      }

  }

  F9Search(itemDesc) {
    var sType = this.adminForm1.get('searchBy').value;

    //  if (sType == 'ITEM NUMBER') { this.F9SearchItemCode('itm') }
    if (sType == 'ITEM DESCRIPTION') {
      this.F9SearchItemDesc(itemDesc);
    }
  }

 
  
  F9SearchPaint(event1: any) {
    this.itemDescreption=event1;

    if (event1 != null) {
     var event = event1.substr(0,event1.indexOf(':'));
    } 
    event =event.toUpperCase();

    let select1 = this.ItemIdList.find(d => d.SEGMENT === event);
    if (select1 != undefined) {
     this.getF9DataPaint(select1.itemId);
    }
    // alert ("event1 ,event,itemid: "+event1+","+event + ","+select1.itemId);
}

getF9DataPaint(itemId){
  this.service
  .searchByItemf9(
    itemId,
    this.locId,
    this.ouId,
    this.divisionId,
    this.deptId,
  )
  .subscribe((data) => {
    this.lstcomments = data;
    // console.log(data);
    if (this.lstcomments.length > 0) {
      this.segment = this.lstcomments[0].SEGMENT;
      this.desc = this.lstcomments[0].DESCRIPTION;
      this.uom = this.lstcomments[0].UOM;
      this.mrp = this.lstcomments[0].MRP;
      this.hsnSacCode = this.lstcomments[0].HSNSACCODE;
      this.purchPrice = this.lstcomments[0].NDP;
      this.gstPer = this.lstcomments[0].GSTPERCENTAGE;
      this.principleItem = this.lstcomments[0].PRINCPLEITEM;
      this.adminForm1.patchValue(data);
    
    } else {
      alert('Stock Details not availabe for item - ' + itemId);
     
    }
  //  this.ItemIdList =[]; 
  //  this.adminForm1.get('searchItemCode').setValue('') ;
  });
}





  F9SearchItemCode(abc) {
    // const formValue: IAdmin = this.adminForm1.value;
    // alert ("WIP...." + this.adminForm1.get('searchItemName').value);
  //  alert ("Tsting...f9")
    var segment1 = this.adminForm1.get('searchItemCode').value;
    segment1 = segment1.toUpperCase();

    // alert("Segment :" +segment1);

    if (segment1 == undefined || segment1 == null) {
      alert('Please select Item Code ....');
      return;
    }

    // let select1 = this.ItemIdList.find(d => d.SEGMENT === segment1);

    // if (select1 == undefined) {
    //   alert("Please select valid Item Code ...."); return;
    // }

    this.service.getItemDetailsByCode(segment1).subscribe((data1) => {
      if (data1 != null) {
        this.service
          .searchByItemf9(data1.itemId, this.locId, this.ouId, this.divisionId,sessionStorage.getItem('deptId'))
          .subscribe((data) => {
            this.lstcomments = data;
            // console.log(data);
            if (this.lstcomments.length > 0) {
              this.segment = this.lstcomments[0].SEGMENT;
              this.desc = this.lstcomments[0].DESCRIPTION;
              this.uom = this.lstcomments[0].UOM;
              this.mrp = this.lstcomments[0].MRP;
              this.hsnSacCode = this.lstcomments[0].HSNSACCODE;
              this.purchPrice = this.lstcomments[0].NDP;
              this.gstPer = this.lstcomments[0].GSTPERCENTAGE;
              this.principleItem = this.lstcomments[0].PRINCPLEITEM;
              this.adminForm1.patchValue(data);
            } else {
              alert('Stock Details not availabe for item - ' + segment1);
            }
          });
      }
      // else {alert ("Item Code not found/Invalid Item Code")}
    });
  }



  F9SearchItemDesc(itemDesc) {
    //var itemDesc=this.adminForm1.get('searchByItemDesc').value
    itemDesc = itemDesc.toUpperCase();
    //alert("Segment :" +itemDesc);

    if (itemDesc == undefined || itemDesc == null) {
      alert('Enter Item Description ....');
      return;
    }

    this.service
      .searchByItemDescf9(this.divisionId, itemDesc)
      .subscribe((data) => {
        this.lstcomments1 = data;
        // console.log(data);
      });
  }

  onOptioninvItemIdSelectedSingle(mItem) {
    // alert ("in fn onOptioninvItemIdSelectedSingle "+mItem);

    let selectedValue = this.ItemIdList.find((v) => v.SEGMENT == mItem);
    if (selectedValue != undefined) {
      // console.log(selectedValue);
      this.searchItemId = selectedValue.itemId;
      this.searchItemName = selectedValue.DESCRIPTION;
      this.searchItemCode = selectedValue.SEGMENT;
    }
    // alert(selectedValue.itemId+","+selectedValue.DESCRIPTION+","+selectedValue.SEGMENT);
  }

  onSearchTypeSelected(evnt) {
    // alert ("in onSearchTypeSelected ")
    //  this.LoadModal();
    // this.resetDet();
    this.lstcomments = null;
    this.lstcomments1 = null;
    this.searchByItemDesc = null;

    if (evnt == 'ITEM NUMBER') {
      this.searchByItem = true;
      this.searchByDesc = false;
    }
    if (evnt == 'ITEM DESCRIPTION') {
      this.searchByDesc = true;
      this.searchByItem = false;
    }
  }

  Select(itemNumber: any) {
    // alert ("Item Number :" +itemNumber);

    //   let select1=this.ItemIdList.find(d=>d.segment===itemNumber);
    //   // this.searchBy='ITEM DESCRIPTION';
    this.searchByItem = true;
    this.searchByDesc = true;
    //   // this.searchBy='ITEM NUMBER';
    //   // this.searchItemCode=itemNumber;
    //  // this.searchItemName=select1.DESCRIPTION;
    //   this.adminForm1.patchValue({ searchItemCode: itemNumber,});

    //   if (select1==undefined) {
    //     alert ("Please select valid Item Code ....") ;return;
    //    }

    this.service
      .searchByItemf9(itemNumber, this.locId, this.ouId, this.divisionId,sessionStorage.getItem('deptId'))
      .subscribe((data) => {
        this.lstcomments = data;
        // console.log(data);
        // alert("Length :"+this.lstcomments.length);
        if (this.lstcomments.length > 0) {
          this.segment = this.lstcomments[0].SEGMENT;
          this.desc = this.lstcomments[0].DESCRIPTION;
          this.uom = this.lstcomments[0].UOM;
          this.mrp = this.lstcomments[0].MRP;
          this.hsnSacCode = this.lstcomments[0].HSNSACCODE;
          this.purchPrice = this.lstcomments[0].NDP;
          this.gstPer = this.lstcomments[0].GSTPERCENTAGE;
          this.principleItem = this.lstcomments[0].PRINCPLEITEM;
          this.adminForm1.patchValue(data);
        } else {
          alert('Stock Details not availabe for item - ' + itemNumber);
        }
      });
  }

  searchByItemSegmentDiv(itemDesc: string) {
    if (itemDesc.length == 8) {
      this.service
        .searchByItemSegmentDiv(this.divisionId, itemDesc.toUpperCase())
        .subscribe((data) => {
          var desc = data[0].description;
          this.ItemIdList = data;
          this.Select(data[0].itemId);
        });
    } else {
      alert('Please Enter full item number!!');
      return;
    }
  }



  filterRecordNew(event) {
    var itemCode1 = event.target.value;

    if (itemCode1==null || itemCode1 ==undefined || itemCode1.trim()=='')
    {
      alert ("Please Enter Valid ItemCode..."); return;
    }

    var itemCode = '';

    if (itemCode1.includes(':')) {
      var itemCode2 = itemCode1.split(':');
       itemCode = itemCode2[0];
    } else {
       itemCode = itemCode1;
      // alert ("in else..itemCode.length..."+itemCode.length + ","+this.ItemIdList.length);
    }
    

    this.itemDescreption=itemCode
    if (event.keyCode == 13) { 
      // alert ("in filter record... "+ itemCode)

      this.service
      .searchByItemSegmentDiv(this.divisionId, itemCode.toUpperCase())
      .subscribe((data) => {
        this.ItemIdList = data;
      });
    }

    let select1 = this.ItemIdList.find((d) => d.segment === itemCode.toUpperCase());
    if (select1 != undefined) {
      this.getF9Data(select1.itemId);}
  }



  
  filterRecordNew1(event) {
    // var itemCode1 = event.target.value;
    var itemCode1 = this.adminForm1.get('searchItemCode').value;

    if (itemCode1==null || itemCode1 ==undefined || itemCode1.trim()=='')
    {
      alert ("Please Enter Valid ItemCode..."); return;
    }

    // alert ("in filter record... "+ itemCode1)
    this.itemDescreption=itemCode1
    
      this.service
      .searchByItemSegmentDiv(this.divisionId, itemCode1.toUpperCase())
      .subscribe((data) => {
        this.ItemIdList = data;

        let select1 = this.ItemIdList.find((d) => d.segment === itemCode1.toUpperCase());
        if (select1 != undefined) {
          this.getF9Data(select1.itemId);}

    });

  }





  filterRecord(event) {
    var itemCode1 = event.target.value;
   alert ("in filter record... "+ itemCode1)
   this.itemDescreption=itemCode1
    
    if (event.keyCode == 13) {
      alert ("in filter record... in 13" + event.keyCode )

      var itemCode = '';
      if (itemCode1.includes('--')) {
        alert ("in if");
        var itemCode2 = itemCode1.split('--');
        itemCode = itemCode2[0];
      } else {

        itemCode = itemCode1;
        alert ("in else..itemCode.length..."+itemCode.length + ","+this.ItemIdList.length);

      }

     alert(itemCode.length + " length : "+this.ItemIdList.length);
     
      // enter keycode

      if (itemCode.length >= 4 && this.ItemIdList.length <= 1) {
        this.service
          .searchByItemSegmentDiv(this.divisionId, itemCode.toUpperCase())
          .subscribe((data) => {
            this.ItemIdList = data;
            
            // this.Select(data[0].itemId);
          });
      } else {
        if(this.ItemIdList.length<=1){
        alert('Please Enter 4 characters of item number!!');
       
        return;
        }
      }

      if (itemCode.length === 8 ) {
        // alert('in len if' + itemCode.toUpperCase());
        // console.log(this.ItemIdList);
        let select1 = this.ItemIdList.find((d) => d.segment === itemCode.toUpperCase());
        // alert(select1.itemId + 'In len');
        if (select1 != undefined) {
          this.getF9Data(select1.itemId);
        }else{
          this.service
          .searchByItemSegmentDiv(this.divisionId, itemCode.toUpperCase())
          .subscribe((data) => {
            this.ItemIdList = data;
            this.getF9Data(select1.itemId);
          });

        }
      }  
      
      else {

      if (itemCode.length >= 4 ) {
        // console.log(this.ItemIdList);
        let select1 = this.ItemIdList.find((d) => d.segment === itemCode.toUpperCase());
        if (select1 != undefined) {
          this.getF9Data(select1.itemId);
        }else{
          this.service
          .searchByItemSegmentDiv(this.divisionId, itemCode.toUpperCase())
          .subscribe((data) => {
            this.ItemIdList = data;
            this.getF9Data(select1.itemId);
          });

        }
      }
    }
    }
  }



  getF9Data(itemId){
    this.service
    .searchByItemf9(
      itemId,
      this.locId,
      this.ouId,
      this.divisionId,
      this.deptId,
    )
    .subscribe((data) => {
      this.lstcomments = data;
      // console.log(data);
      if (this.lstcomments.length > 0) {
        this.segment = this.lstcomments[0].SEGMENT;
        this.desc = this.lstcomments[0].DESCRIPTION;
        this.uom = this.lstcomments[0].UOM;
        this.mrp = this.lstcomments[0].MRP;
        this.hsnSacCode = this.lstcomments[0].HSNSACCODE;
        this.purchPrice = this.lstcomments[0].NDP;
        this.gstPer = this.lstcomments[0].GSTPERCENTAGE;
        this.principleItem = this.lstcomments[0].PRINCPLEITEM;
        this.adminForm1.patchValue(data);
      
      } else {
        alert('Stock Details not availabe for item - ' + itemId);
       
      }
     this.ItemIdList =[]; 
     this.adminForm1.get('searchItemCode').setValue('') ;
    });
  }


  userCheck(roleId: number): boolean {
    //alert(sessionStorage.getItem('roleId') +'--'+roleId );
    if (sessionStorage.getItem('roleId') === 'undefined') {
      // this.isVisible1 = false;
      return true;
    } else {
      //alert("else");
      if (Number(sessionStorage.getItem('roleId')) === roleId) {
        //  alert("role -true");
        return false;
      }

      if (Number(sessionStorage.getItem('roleId')) != roleId) {
        //  alert("role -false");
        return true;
      }
    }
  }

  /************ Sales Order************************ */

  vehiclePriceUpload(){
    this.router.navigate(['/admin/OrderManagement/VehicleAndAddonPriceUpload'],{ skipLocationChange: true });
  }

  modelWisePriceList(){
    this.router.navigate(['/admin/OrderManagement/modelWisePrice'],{ skipLocationChange: true });
  }

  proformaInv(){
    this.router.navigate(['/admin/OrderManagement/SalesProforma'],{ skipLocationChange: true });
  }

  closingStock(){
    this.router.navigate(['/admin/OrderManagement/ClosingStock'],{ skipLocationChange: true });
  }

  allotment(){
    this.router.navigate(['/admin/OrderManagement/allotment'],{ skipLocationChange: true });
  }

  deAllotment(){
    this.router.navigate(['/admin/OrderManagement/Deallotment'],{ skipLocationChange: true });
  }

  salesOrderList(){
    this.router.navigate(['/admin/OrderManagement/SalesOrderList'],{ skipLocationChange: true });
  }

  salesOrder(){
    this.router.navigate(['/admin/OrderManagement/SalesOrderForm'],{ skipLocationChange: true });
  }

  orderCancel(){
    this.router.navigate(['/admin/OrderManagement/orderCancellationUpload'],{ skipLocationChange: true });
  }

  reversalOrder(){
    this.router.navigate(['/admin/OrderManagement/ReversalOrder'],{ skipLocationChange: true });
  }

  salesGatePass(){
    this.router.navigate(['/admin/OrderManagement/GatePass'],{ skipLocationChange: true });
  }

  rtoReport(){
    this.router.navigate(['/admin/OrderManagement/rtoLineItemReport'],{ skipLocationChange: true });
  }

  proformaChetak(){
    this.router.navigate(['/admin/OrderManagement/SalesOrderProformaChetak'],{ skipLocationChange: true });
  }

  vehicleBookingUploadCSV(){
    this.router.navigate(['/admin/transaction/VehicleBookUpload'],{ skipLocationChange: true });
  }

  orderDetailUpdation(){
    this.router.navigate(['/admin/OrderManagement/OrderDetailsUpdation'],{ skipLocationChange: true });
  }

/************************Purchase******************** */

poList(){
    this.router.navigate(['/admin/transaction/pendingPoList'],{ skipLocationChange: true });
  }
  purchaseOrder(){
    this.router.navigate(['/admin/master/OPMasterDto'],{ skipLocationChange: true });
  }
  bulkUploadPO(){
    this.router.navigate(['/admin/transaction/BulkUploadWithCsv'],{ skipLocationChange: true });
  }
  poReceipt(){
    this.router.navigate(['/admin/master/PoReceiptForm'],{ skipLocationChange: true });
  }
  returnToVendor(){
    this.router.navigate(['/admin/transaction/ReturnToVendor'],{ skipLocationChange: true });
  }
  shortLandedGrrClaim(){
    this.router.navigate(['/admin/transaction/ShortLandedGrr'],{ skipLocationChange: true });
  }


/********************** Payable Invoice************************* */


apInvoiceList(){
  this.router.navigate(['/admin/transaction/poInvList'],{ skipLocationChange: true });
}

apInvoice(){
  this.router.navigate(['/admin/transaction/payableInvoice'],{ skipLocationChange: true });
}

payment(){
  this.router.navigate(['/admin/transaction/Payment'],{ skipLocationChange: true });
}

/***********************Receivable ***************** */

arInvoice(){
  this.router.navigate(['/admin/transaction/ARInvoice'],{ skipLocationChange: true });
}


arPayment(){
  this.router.navigate(['/admin/transaction/PaymentAr'],{ skipLocationChange: true });
}

omPaymentReceipt(){
  this.router.navigate(['/admin/transaction/PaymentReceipt'],{ skipLocationChange: true });
}

/*********************General Ledger */
journalVoucer(){
  this.router.navigate(['/admin/transaction/JournalVoucher'],{ skipLocationChange: true });
}

accountEnquiry(){
  this.router.navigate(['/admin/transaction/AccountEnquiry'],{ skipLocationChange: true });
}

casBankTransfer(){
  this.router.navigate(['/admin/transaction/CashBankTransfer'],{ skipLocationChange: true });
}

bankReconcillation(){
  this.router.navigate(['/admin/transaction/BankReconcillation'],{ skipLocationChange: true });
}

glTrailBalance(){
  this.router.navigate(['/admin/transaction/glTrialBalance'],{ skipLocationChange: true });
}

jvupload(){
  this.router.navigate(['/admin/transaction/JvUpload'],{ skipLocationChange: true });
}

writeOff(){
  this.router.navigate(['/admin/transaction/ReceiptWriteoff'],{ skipLocationChange: true });
}

/******************Workshop */

jobCard(){
  this.router.navigate(['/admin/service/JobCard'],{ skipLocationChange: true });
}

gatePass(){
  this.router.navigate(['/admin/service/ServiceGatepass'],{ skipLocationChange: true });
}

vehicleMasterWs(){
  this.router.navigate(['/admin/master/WsVehicleMaster'],{ skipLocationChange: true });
}

laborList(){
  this.router.navigate(['/admin/service/laborList'],{ skipLocationChange: true });
}
/******************Inventory Transactions */

averageCostUpdate(){
  this.router.navigate(['/admin/transaction/AvgCostUpadte'],{ skipLocationChange: true });
}

stockTaking(){
  this.router.navigate(['/admin/transaction/StockTaking'],{ skipLocationChange: true });
}

stockDetails(){
  this.router.navigate(['/admin/transaction/OnHandDetails'],{ skipLocationChange: true });
}

workshopIssue(){
  this.router.navigate(['/admin/transaction/MoveOrder'],{ skipLocationChange: true });
}

workshopReturn(){
  this.router.navigate(['/admin/transaction/WorkshopReturn'],{ skipLocationChange: true });
}

stockAdjustment(){
  this.router.navigate(['/admin/transaction/miscTransaction'],{ skipLocationChange: true });
}

interstateAdjustment(){
  this.router.navigate(['/admin/transaction/InterState'],{ skipLocationChange: true });
}

internalConsuptiop(){
  this.router.navigate(['/admin/transaction/InternalConsumption'],{ skipLocationChange: true });
}

subInventoryTransfer(){
  this.router.navigate(['/admin/transaction/SubInventoryTransfer'],{ skipLocationChange: true });
}

deadStockDetails(){
  this.router.navigate(['/admin/transaction/DeadStock'],{ skipLocationChange: true });
}

stockTransfer1(){
  this.router.navigate(['/admin/transaction/stockTransfer'],{ skipLocationChange: true });
}

stockAdjustment1(){
  this.router.navigate(['/admin/transaction/miscTransaction'],{ skipLocationChange: true });
}

amcSchemeMaster(){
  this.router.navigate(['/admin/transaction/AmcSchemeMaster'],{ skipLocationChange: true });
}
amcEntrollment(){
  this.router.navigate(['/admin/transaction/AmcEnrollment'],{ skipLocationChange: true });
}

mcpItemMaster(){
  this.router.navigate(['/admin/transaction/McpItemMaster'],{ skipLocationChange: true });
}

mcpItemMapping(){
  this.router.navigate(['/admin/transaction/McpItemMapping'],{ skipLocationChange: true });
}

mcpPackageMaster(){
  this.router.navigate(['/admin/transaction/McpPackageMaster'],{ skipLocationChange: true });
}

mcpEnquiryGeneration(){
  this.router.navigate(['/admin/transaction/McpEnquiry'],{ skipLocationChange: true });
}

mcpEnrollmentForm(){
  this.router.navigate(['/admin/transaction/McpEnrollment'],{ skipLocationChange: true });
}

mcpTermination(){
  this.router.navigate(['/admin/transaction/McpCancellation'],{ skipLocationChange: true });
}

saiEWSchemeMaster(){
  this.router.navigate(['/admin/transaction/SaiEwSchemeMaster'],{ skipLocationChange: true });
}

saiEWEnrollment(){
  this.router.navigate(['/admin/transaction/SaiExtendedWarranty'],{ skipLocationChange: true });
}

warrantyClaimForm(){
  this.router.navigate(['/admin/transaction/WarrantyClaim'],{ skipLocationChange: true });
}


itemCategoryMaster(){
  this.router.navigate(['/admin/master/ItemCategory'],{ skipLocationChange: true });
}

locatorMaster(){
  this.router.navigate(['/admin/master/LocatorMaster'],{ skipLocationChange: true });
}

itemMasterLocator(){
  this.router.navigate(['/admin/master/ItemMasterLocator'],{ skipLocationChange: true });
}

itemMaster(){
  this.router.navigate(['/admin/master/itemMasterNew'],{ skipLocationChange: true });
}

relatedItemMaster(){
  this.router.navigate(['/admin/master/ItemRelatedMaster'],{ skipLocationChange: true });
}

bulkUploadItem(){
  this.router.navigate(['/admin/transaction/BulkItemUploadCSV'],{ skipLocationChange: true });
}

priceListMaster(){
  this.router.navigate(['/admin/master/pricelistMaster'],{ skipLocationChange: true });
}

builUploadPriceList(){
  this.router.navigate(['/admin/transaction/BulkUploadPricelist'],{ skipLocationChange: true });
}

pendingShipmentList1(){
  this.router.navigate(['/admin/master/PendingShipmentList'],{ skipLocationChange: true });
}

subInventoryTransfer1(){
  this.router.navigate(['/admin/transaction/SubInventoryTransfer'],{ skipLocationChange: true });
}

customerMaster(){
  this.router.navigate(['/admin/master/customerMaster'],{ skipLocationChange: true });
}

vehicleMasterWSIns(){
  this.router.navigate(['/admin/master/WsVehicleMaster'],{ skipLocationChange: true });
}

/************************8Counter Sale Order */

orderList1(){
  this.router.navigate(['/admin/OrderManagement/orderList'],{ skipLocationChange: true });
}

counterSaleOrder(){
  this.router.navigate(['/admin/OrderManagement/CounterSaleOrder'],{ skipLocationChange: true });
}

counterSaleWithCSV(){
  this.router.navigate(['/admin/OrderManagement/CounterSaleWithCSV'],{ skipLocationChange: true });
}

counterSaleReturn(){
  this.router.navigate(['/admin/OrderManagement/CounterSaleReturn'],{ skipLocationChange: true });
}

orderGeneration(){
  this.router.navigate(['/admin/OrderManagement/OrderGeneration'],{ skipLocationChange: true });
}

backOrderImport(){
  this.router.navigate(['/admin/OrderManagement/BackorderSparesImportBajaj'],{ skipLocationChange: true });
}

csProformaInv(){
  this.router.navigate(['/admin/OrderManagement/CSPerformaINV'],{ skipLocationChange: true });
}

shippingNetwork(){
  this.router.navigate(['/admin/OrderManagement/ShippingNetwork'],{ skipLocationChange: true });
}

priceUpdation(){
  this.router.navigate(['/admin/OrderManagement/priceUpdation'],{ skipLocationChange: true });
}

ewayBillInvoiceData(){
  this.router.navigate(['/admin/OrderManagement/EwayBillInvoiceData'],{ skipLocationChange: true });
}

ewayBillList(){
  this.router.navigate(['/admin/OrderManagement/EwayBillCustomerNoWise'],{ skipLocationChange: true });
}

reserveQtyClear(){
  this.router.navigate(['/admin/OrderManagement/ReserveQtyClear'],{ skipLocationChange: true });
}


sparesReport(){
  this.router.navigate(['/admin/Report/SparesReportsNew'],{ skipLocationChange: true });
}

serviceReport(){
  this.router.navigate(['/admin/Report/ServiceReport'],{ skipLocationChange: true });
}

salesReport(){
  this.router.navigate(['/admin/Report/SalesReports'],{ skipLocationChange: true });
}

accountReport(){
  this.router.navigate(['/admin/Report/AccountsRepor'],{ skipLocationChange: true });
}

accessoryReport(){
  this.router.navigate(['/admin/Report/AccessoriesReport'],{ skipLocationChange: true });
}

serverReport(){
  this.router.navigate(['/admin/Report/ServerReport'],{ skipLocationChange: true });
}

templateDownload(){
  this.router.navigate(['/admin/Report/templateDownload'],{ skipLocationChange: true });
}


shellReport(){
  this.router.navigate(['/admin/Report/ShellReport'],{ skipLocationChange: true });
}



divisionMaster(){
  this.router.navigate(['/admin/master/division'],{ skipLocationChange: true });
}

operatingUnitMaster(){
  this.router.navigate(['/admin/master/orgMaster'],{ skipLocationChange: true });
}

locationMaster(){
  this.router.navigate(['/admin/master/locatioMaster'],{ skipLocationChange: true });
}

compnayMaster(){
  this.router.navigate(['/admin/master/companyMaster'],{ skipLocationChange: true });
}

commonLookupMaster(){
  this.router.navigate(['/admin/master/CommonMaster'],{ skipLocationChange: true });
}

hsnSacMaster(){
  this.router.navigate(['/admin/master/HsnSacMaster'],{ skipLocationChange: true });
}

flexfiledMaster(){
  this.router.navigate(['/admin/master/FlexField'],{ skipLocationChange: true });
}

documentSequenceMaster(){
  this.router.navigate(['/admin/master/DocumentSequenceMaster'],{ skipLocationChange: true });
}

employeeMaster(){
  this.router.navigate(['/admin/master/EmployeesMaster'],{ skipLocationChange: true });
}

orderTypeMaster(){
  this.router.navigate(['/admin/master/orderType'],{ skipLocationChange: true });
}

vehicleMasterWorkshop(){
  this.router.navigate(['/admin/master/WsVehicleMaster'],{ skipLocationChange: true });
}

variantMaster(){
  this.router.navigate(['/admin/master/VariantMaster'],{ skipLocationChange: true });
}

receivableTransTypeMaster(){
  this.router.navigate(['/admin/master/ReceivableTranstypeMaster'],{ skipLocationChange: true });
}

customerRelationMaster(){
  this.router.navigate(['/admin/master/CustomerRelationMaster'],{ skipLocationChange: true });
}

supplierEntry(){
  this.router.navigate(['/admin/master/SupplierMaster'],{ skipLocationChange: true });
}

glCodeCombination(){
  this.router.navigate(['/admin/master/GlCodeCombination'],{ skipLocationChange: true });
}

groupMaster(){
  this.router.navigate(['/admin/master/OMGRP'],{ skipLocationChange: true });
}

bankAccountCreation(){
  this.router.navigate(['/admin/bank/newBank'],{ skipLocationChange: true });
}

bankBranchCreation(){
  this.router.navigate(['/admin/bank/bankBranch'],{ skipLocationChange: true });
}

createBankAccountUse(){
  this.router.navigate(['/admin/bank/BankAccUses'],{ skipLocationChange: true });
}

taxRegimeMaster(){
  this.router.navigate(['/admin/master/JaiRegimeMaster'],{ skipLocationChange: true });
}

taxCategoryMaster(){
  this.router.navigate(['/admin/master/taxCategoryMaster'],{ skipLocationChange: true });
}

taxTypeMaster(){
  this.router.navigate(['/admin/master/JaiTaxType'],{ skipLocationChange: true });
}

taxRatesMaster(){
  this.router.navigate(['/admin/master/jaiTaxRatesMaster'],{ skipLocationChange: true });
}

taxThresholdSetup(){
  this.router.navigate(['/admin/master/TaxThresholdSetup'],{ skipLocationChange: true });
}


paintItemMaster(){
  this.router.navigate(['/admin/paint/PaintItemMaster'],{ skipLocationChange: true });
}

paintMixingMaster(){
  this.router.navigate(['/admin/paint/PaintMixingMaster'],{ skipLocationChange: true });
}

paintPanelMaster(){
  this.router.navigate(['/admin/paint/PaintPanelMaster'],{ skipLocationChange: true });
}

paintEmployeeMaster(){
  this.router.navigate(['/admin/paint/PaintEmpMaster'],{ skipLocationChange: true });
}

paintMixingIssue(){
  this.router.navigate(['/admin/paint/PaintCreationNew'],{ skipLocationChange: true });
}

bodyshopIssue(){
  this.router.navigate(['/admin/paint/PaintIssueDp'],{ skipLocationChange: true });
}

internalConsuption(){
  this.router.navigate(['/admin/transaction/InternalConsumption'],{ skipLocationChange: true });
}

poList1(){
  this.router.navigate(['/admin/paint/PaintPoList'],{ skipLocationChange: true });
}

purchaseOrder1(){
  this.router.navigate(['/admin/paint/PaintPurchaseOrder'],{ skipLocationChange: true });
}

poStockTransferReceipt(){
  this.router.navigate(['/admin/paint/PaintPoReceipt'],{ skipLocationChange: true });
}

paintStockTransfer(){
  this.router.navigate(['/admin/paint/PaintStockTransfer'],{ skipLocationChange: true });
}

stockAdjustment2(){
  this.router.navigate(['/admin/paint/PaintMiscTransaction'],{ skipLocationChange: true });
}

vaverageCost(){
  this.router.navigate(['/admin/paint/PaintAvgCost'],{ skipLocationChange: true });
}

bjReport(){
  this.router.navigate(['/admin/Report/PaintReports'],{ skipLocationChange: true });
}

paintReport(){
  this.router.navigate(['/admin/Report/PaintReportsNew'],{ skipLocationChange: true });
}

variantMasterNew(){
  this.router.navigate(['/admin/master/VariantMst'],{ skipLocationChange: true });
}
}
