import { Component, OnInit,HostListener ,ViewChild } from '@angular/core';
// import * as $ from 'jquery';
import { Router } from '@angular/router';
import {formatDate } from '@angular/common';
import { MasterService } from 'src/app/master/master.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  F9_KEY=120

}

interface IAdmin {
  searchItemCode: string;
  searchItemName: string;
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
  ticketNo:string;
  today= new Date();
  todaysDataTime = '';
  divisionId:number;
  displayMaruti: boolean;
  fullName:string;
  deptName:string;
  locName:string;
  ouName:string;
  loginArray:string;
  locId:number;
  ouId:number;
  searchItemCode: string;
  searchItemName: string;
  userList2: any[] = [];
  lastkeydown1: number = 0;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService){
  // constructor(private router: Router ) { 
    this.todaysDataTime = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');

    this.adminForm1 = fb.group({ 
      searchItemCode:[],
      searchItemName:[],

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
    this.loginArray=sessionStorage.getItem('divisionName');
    this.ouId=Number(sessionStorage.getItem('ouId'));
    this.locId=Number(sessionStorage.getItem('locId'));
    // $('[data-submenu]').submenupicker();

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
      this.displayMaruti=true;
    }
   else if (this.divisionId===2){
      this.displayMaruti=false;
    }
  }


   
  f9Key() {
    // alert( "Key F9 pressed");
    // this.router.navigate(['/admin/transaction/OnHandDetails']);
    // this.partSearch.open();
    $("#partSearch").modal('show');
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

  F9Search(mName) {

    // const formValue: IAdmin = this.adminForm1.value;

    alert ("WIP...." + mName); 
  
  }

    // var segment1=this.onhandDetailsForm.get('searchItemCode').value
    // let select1=this.ItemIdList.find(d=>d.SEGMENT===segment1);
    // this.service.searchByItemf9(select1.itemId,this.locId, this.ouId,this.divisionId).subscribe(
    //   data =>{
    //     this.lstcomments= data;
    //     console.log(data);
    //   })
    // }

    onOptioninvItemIdSelectedSingle(searchItemCode) {
      alert ("in fn onOptioninvItemIdSelectedSingle "+searchItemCode);
        let selectedValue = this.ItemIdList.find(v => v.SEGMENT == searchItemCode);
        if( selectedValue != undefined){
         console.log(selectedValue);
        // alert(selectedValue.itemId+","+selectedValue.DESCRIPTION+","+selectedValue.SEGMENT);
        
        // this.searchItemId = selectedValue.itemId;
        // this.searchItemName=selectedValue.DESCRIPTION;
        // this.searchItemCode=selectedValue.SEGMENT;
      }
    }




}
