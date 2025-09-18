import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,HttpClientModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
username: string;
  password: string;
  loginArray: any[];
  divisionId: any[];
  users: any[];
  lstcomments1: any[];
  divisionCode: string;
  ticketNo: string;

  currentDateList: any = [];
  loginName:string;
  divName:string;
  deptName:string;
  locId:string;
  attribute1:string;
  constructor(private router: Router, private loginService:AuthService  ) { }

  ngOnInit(): void {
//  alert('hi') private loginService: AuthService
  }


  login() {
    alert('hiii'+this.username+'-----'+ this.password)
    // debugger;
    // this.router.navigate(['/admin']);,{ skipLocationChange: true }
    this.loginService.login(this.username, this.password).subscribe((res: any) => {
      console.log('Res', res);
      if (res.code === 200) {
       this.router.navigate(['/admin']);
          var users = res.obj;
          var divisionName = users.divisionName.split(" - ", 3);
          divisionName = divisionName[1];
          sessionStorage.setItem('logRes', JSON.stringify(res.obj));
          sessionStorage.setItem('CompName', users.divisionName);
          sessionStorage.setItem('divisionName', divisionName);
          sessionStorage.setItem('divisionId', users.divisionId);
          sessionStorage.setItem('roleId', users.roleId);
          sessionStorage.setItem('ticketNo', users.ticketNo);
          sessionStorage.setItem('emplId', users.emplId);
          sessionStorage.setItem('dept', users.deptId);
          sessionStorage.setItem('deptName', users.deptName);
          sessionStorage.setItem('name', users.fullName);
          sessionStorage.setItem('ouName', users.ouName);
          sessionStorage.setItem('ouId', users.ouId);
          sessionStorage.setItem('locId', users.locId);
          sessionStorage.setItem('divisionId', users.divisionId);
          sessionStorage.setItem('locCode', users.locCode);
          sessionStorage.setItem('deptId', users.deptId);
          sessionStorage.setItem('fullName', users.fullName);
          sessionStorage.setItem('locName', users.locName);
          sessionStorage.setItem('roleId', users.roleId);
         
      } 
      else if (res.code === 400) {
        alert('Incorrect Username or Password');
      } else {
        alert('Login Error - Application is not responsding properly!');
      }
    });

  }
}