import { Component, OnInit,HostListener ,ViewChild } from '@angular/core';
// import * as $ from 'jquery';
import { Router } from '@angular/router';
import {formatDate } from '@angular/common';
import { MasterService } from 'src/app/master/master.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  F9_KEY=120

}

interface IAdmin {
  searchItemId  :number;
  searchItemCode: string;
  searchItemName: string;
  searchByItemDesc:string;
}

declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
// export class AdminComponent  {
  export class AdminComponent implements OnInit {
    adminForm1:FormGroup;

    // @ViewChild('partSearch') partSearch: any;

  public ItemIdList:any[];
  lstcomments: any;
  lstcomments1: any;
  ticketNo:string;
  today= new Date();
  todaysDataTime = '';
  divisionId:number;
  displayMaruti: boolean;
  isVisible1: boolean = true;
  isVisible2: boolean = true;
  fullName:string;
  deptName:string;
  locName:string;
  ouName:string;
  loginArray:string;
  locId:number;
  ouId:number;
  searchBy:string='ITEM NUMBER';
  searchItemId  :number;
  searchItemCode: string;
  searchItemName: string;
  searchByItemDesc:string;
  userList2: any[] = [];
  lastkeydown1: number = 0;
  displayMarutiMenu:Boolean;

  segment:string;
  desc:string;
  uom:string;
  hsnSacCode :string;
  gstPer:number;
  salePrice:number;
  purchPrice:number;
  mrp:number;
  principleItem:number;

  searchByItem =true;
  searchByDesc=false;



  constructor(private fb: FormBuilder, private router: Router, private service: MasterService){
  // constructor(private router: Router ) {
    this.todaysDataTime = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');

    this.adminForm1 = fb.group({
      searchBy:[],
      searchItemCode:[],
      searchItemName:[],
      searchByItemDesc:[],

      segment:[],
      onHandQty:[''],
      subInventoryCode:[''],
      description:[''],
      desc:[],
      uom:[],
      hsnSacCode:[],
      gstPer:[],
      salePrice:[],
      purchPrice:[],
      mrp:[],
      principleItem:[],

    });
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);


    if (event.keyCode === KEY_CODE.F9_KEY) {
      this.f9Key();
    }

  }


  get f() { return this.adminForm1.controls; }
  admin(adminForm1:any) {  }

  ngOnInit(): void {
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

    this.ticketNo=sessionStorage.getItem('ticketNo');
    this.divisionId=Number(sessionStorage.getItem('divisionId'));
    this.fullName=(sessionStorage.getItem('fullName'));
    this.deptName=(sessionStorage.getItem('deptName'));
    this.locName=(sessionStorage.getItem('locName'));
    this.ouName=(sessionStorage.getItem('ouName'));
   // 
   this.loginArray=sessionStorage.getItem('CompName');
   
    this.ouId=Number(sessionStorage.getItem('ouId'));
    this.locId=Number(sessionStorage.getItem('locId'));
    // $('[data-submenu]').submenupicker();
// alert('In admin');
    this.service.ItemIdDivisionList(this.divisionId).subscribe(
          data =>{ this.ItemIdList = data;
            console.log(this.ItemIdList);

      });

    $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
      if (!$(this).next().hasClass('show')) {
        $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
      }
      var $subMenu = $(this).next(".dropdown-menu");
      $subMenu.toggleClass('show');


      $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
        $('.dropdown-submenu .show').removeClass("show");
      });


      return false;
    });

    if (this.divisionId===1){
    
    }
   else if (this.divisionId===2){
      this.displayMaruti=false;
    }

if (Number(sessionStorage.getItem('divisionId'))===2){
this.isVisible1=false;
}
else if (Number(sessionStorage.getItem('divisionId'))===1){
this.isVisible1=true;
}

  }



 
  close(){
    this.router.navigate(['login']);
  }

  dashboard(){
    this.router.navigate(['/admin']);
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

  LoadModal(){
    this.adminForm1.get('searchItemCode').reset();
    this.resetDet();
    this.searchBy='ITEM NUMBER';
  }

  resetDet() {
    this.searchItemId=null;
    this.searchByItemDesc=null;
    this.searchItemName=null;
    this.segment=null;
    this.desc=null;
    this.uom=null;
    this.mrp=null;
    this.hsnSacCode=null;
    this.purchPrice=null;
    this.gstPer=null;
    this.principleItem =null;
    this.lstcomments=null;
    this.lstcomments1=null;
  }

  f9Key() {
    // alert( "Key F9 pressed");
    // this.router.navigate(['/admin/transaction/OnHandDetails']);
     // this.partSearch.open();
     this.LoadModal();
    $("#partSearch").modal('show');
  }

  F9Search() {
    var sType=this.adminForm1.get('searchBy').value
    if(sType =='ITEM NUMBER') { this.F9SearchItemCode()}
    if(sType =='ITEM DESCRIPTION') { this.F9SearchItemDesc()}
  }


  F9SearchItemCode() {

    // const formValue: IAdmin = this.adminForm1.value;
    // alert ("WIP...." + this.adminForm1.get('searchItemName').value);

    var segment1=this.adminForm1.get('searchItemCode').value
    segment1=segment1.toUpperCase();

    // alert("Segment :" +segment1);

    if(segment1 ==undefined || segment1==null) {
      alert ("Please select Item Code ....") ;return;
     }
    let select1=this.ItemIdList.find(d=>d.SEGMENT===segment1);

    if (select1==undefined) {
      alert ("Please select valid Item Code ....") ;return;
     }

    this.service.searchByItemf9(select1.itemId,this.locId, this.ouId,this.divisionId).subscribe(
      data =>{
        this.lstcomments= data;
        console.log(data);
        // alert("Length :"+this.lstcomments.length);
        // if(this.lstcomments !=null){
          if(this.lstcomments.length>0){
          this.segment=this.lstcomments[0].SEGMENT;
          this.desc=this.lstcomments[0].DESCRIPTION;
          this.uom=this.lstcomments[0].UOM;
          this.mrp=this.lstcomments[0].MRP;
          this.hsnSacCode=this.lstcomments[0].HSNSACCODE;
          this.purchPrice=this.lstcomments[0].NDP;
          this.gstPer=this.lstcomments[0].GSTPERCENTAGE;
          this.principleItem =this.lstcomments[0].PRINCPLEITEM;
          this.adminForm1.patchValue(data);
        }else { alert ( "Stock Details not availabe for item - "+segment1);}
      })

  }



  
  F9SearchItemDesc(){

    var itemDesc=this.adminForm1.get('searchByItemDesc').value
    itemDesc=itemDesc.toUpperCase();

    // alert("Segment :" +segment1);

    if(itemDesc ==undefined || itemDesc==null) {
      alert ("Enter Item Description ....") ;return;
     }
   
    this.service.searchByItemDescf9(this.divisionId,itemDesc).subscribe(
      data =>{
        this.lstcomments1= data;
        console.log(data);

      })

  }

  

    onOptioninvItemIdSelectedSingle(mItem) {
      // alert ("in fn onOptioninvItemIdSelectedSingle "+mItem);

      let selectedValue = this.ItemIdList.find(v => v.SEGMENT == mItem);
        if( selectedValue != undefined){
         console.log(selectedValue);
        this.searchItemId=selectedValue.itemId;
        this.searchItemName=selectedValue.DESCRIPTION;
        this.searchItemCode=selectedValue.SEGMENT;
      }
      // alert(selectedValue.itemId+","+selectedValue.DESCRIPTION+","+selectedValue.SEGMENT);

    }

    onSearchTypeSelected(evnt) {
      // alert ("in onSearchTypeSelected ")
    //  this.LoadModal();
    // this.resetDet();
    this.lstcomments=null;
    this.lstcomments1=null;
    this.searchByItemDesc=null;

      if(evnt=='ITEM NUMBER') {this.searchByItem=true;this.searchByDesc=false;}
      if(evnt=='ITEM DESCRIPTION') {this.searchByDesc=true; this.searchByItem=false;}
    }


    Select(itemNumber: any) {

      // alert ("Item Number :" +itemNumber);
     

      let select1=this.ItemIdList.find(d=>d.SEGMENT===itemNumber);
      // this.searchBy='ITEM DESCRIPTION';
      this.searchByItem=true;
      this.searchByDesc=true;
      // this.searchBy='ITEM NUMBER';
      // this.searchItemCode=itemNumber;
      this.searchItemName=select1.DESCRIPTION;
      this.adminForm1.patchValue({ searchItemCode: itemNumber,});

      if (select1==undefined) {
        alert ("Please select valid Item Code ....") ;return;
       }


       
      this.service.searchByItemf9(select1.itemId,this.locId, this.ouId,this.divisionId).subscribe(
        data =>{
          this.lstcomments= data;
          console.log(data);
          // alert("Length :"+this.lstcomments.length);
          if(this.lstcomments.length>0){
            this.segment=this.lstcomments[0].SEGMENT;
            this.desc=this.lstcomments[0].DESCRIPTION;
            this.uom=this.lstcomments[0].UOM;
            this.mrp=this.lstcomments[0].MRP;
            this.hsnSacCode=this.lstcomments[0].HSNSACCODE;
            this.purchPrice=this.lstcomments[0].NDP;
            this.gstPer=this.lstcomments[0].GSTPERCENTAGE;
            this.principleItem =this.lstcomments[0].PRINCPLEITEM;
            this.adminForm1.patchValue(data);
          } else { alert ( "Stock Details not availabe for item - "+itemNumber);}
         })


    }




}
