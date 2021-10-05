import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent  {

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
  // constructor(private fb: FormBuilder, private router: Router, private service: MasterService)
  constructor(private router: Router ) { 
    this.todaysDataTime = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
  }

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
    // $('[data-submenu]').submenupicker();

    // this.service.ItemIdDivisionList(this.divisionId).subscribe(
    //       data =>{ this.ItemIdList = data;
    //         console.log(this.ItemIdList);

    //   });

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

  



  close(){
    this.router.navigate(['login']);
  }

  dashboard(){
    this.router.navigate(['/admin']);
  }
  F9Search() {

    alert ("WIP...."); }

    // var segment1=this.onhandDetailsForm.get('searchItemCode').value
    // let select1=this.ItemIdList.find(d=>d.SEGMENT===segment1);
    // this.service.searchByItemf9(select1.itemId,this.locId, this.ouId,this.divisionId).subscribe(
    //   data =>{
    //     this.lstcomments= data;
    //     console.log(data);
    //   })
    // }

    onOptioninvItemIdSelectedSingle(searchItemCode) {
      // alert ("in fn onOptioninvItemIdSelectedSingle "+searchItemCode);
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
