import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormArray,  FormBuilder,  FormControl,  FormGroup,  Validators,} from '@angular/forms';
import { formatDate } from '@angular/common';
import { RouterModule } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
    today = new Date();
  todaysDataTime = '';
    ticketNo: string|null;
      fullName: string|null;
  deptName: string|null;
  locCode: string|null;
  locName: string|null;
  ouName: string|null;
  loginArray: string|null;
  divisionId: number;
  deptId:number;
  ouId:number;
  locId:number;
 constructor( private fb: FormBuilder, private router: Router) {
    
    this.todaysDataTime = formatDate(
      this.today,
      'dd-MM-yyyy hh:mm:ss a',
      'en-US',
      '+0530'
    );
 }

  close() {
    this.router.navigate(['login']);
  }

  dashboard() {
    this.router.navigate(['/admin']);
  }

    ngOnInit(): void {
         $('#menu-toggle').click(function (e:any) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });



    $('.dropdown-menu a.dropdown-toggle').on('click', function (this: HTMLElement, e: any) {
  if (!$(this).next().hasClass('show')) {
    $(this)
      .parents('.dropdown-menu')
      .first()
      .find('.show')
      .removeClass('show');
  }
  const $subMenu = $(this).next('.dropdown-menu');
  $subMenu.toggleClass('show');

  $(this)
    .parents('li.nav-item.dropdown.show')
    .on('hidden.bs.dropdown', function () {
      $('.dropdown-submenu .show').removeClass('show');
    });

  return false;
});

      this.ticketNo = sessionStorage.getItem('ticketNo');
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.fullName = sessionStorage.getItem('fullName');
    this.deptName = sessionStorage.getItem('deptName');
    this.locName = sessionStorage.getItem('locName');
    this.ouName = sessionStorage.getItem('ouName');
    this.deptId=Number(sessionStorage.getItem('deptId'));
    //
    this.loginArray = sessionStorage.getItem('CompName');

    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.locId = Number(sessionStorage.getItem('locId'));
    this.locCode = sessionStorage.getItem('locCode');
    }

}
