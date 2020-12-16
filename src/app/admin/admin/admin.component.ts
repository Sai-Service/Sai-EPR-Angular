import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent  {
  ticketNo:string;
  constructor(private router: Router) { }

  ngOnInit(): void {
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

    this.ticketNo=sessionStorage.getItem('ticketNo');
  }

  // displayform1(){
  //   document.getElementById("form_1").style.display = "block";
  //   //  document.getElementById("form_2").style.display = "none";
  // }

  close(){
    this.router.navigate(['login']);
  }
}
