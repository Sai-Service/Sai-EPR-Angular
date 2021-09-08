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
  ticketNo:string;
  today= new Date();
  todaysDataTime = '';
  divisionId:number;
  displayMaruti: boolean;
  constructor(private router: Router) { 
    this.todaysDataTime = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
  }

  ngOnInit(): void {
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

    this.ticketNo=sessionStorage.getItem('ticketNo');
    this.divisionId=Number(sessionStorage.getItem('divisionId'));

    // $('[data-submenu]').submenupicker();



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
}
