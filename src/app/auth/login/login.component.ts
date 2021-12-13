import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LoginService } from '../login.service';


export interface IItem {
  username:string;
  password:string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loginArray: any[];
  divisionId:any[];
  users:any[];
  lstcomments1:any[];
  divisionCode:string;
  ticketNo:string;

  currentDateList:any=[];

  constructor(private router: Router, private loginService: LoginService ) { }

  ngOnInit(): void {
  }

  // login() {
  //   this.loginService.login(this.username, this.password).subscribe((res: any) => {
  //     console.log('Res', res);
  //     if (res.code === 200) {
  //       this.router.navigate(['/admin']);
  //       var users=res.obj;
  //         sessionStorage.setItem('emplId',users.emplId);
  //         sessionStorage.setItem('name',users.name);
  //         sessionStorage.setItem('divisionName',users.divisionId.divisionName);
  //         console.log(users.divisionId.divisionName);
  //         sessionStorage.setItem('ticketNo',users.ticketNo);
  //         console.log(users.ticketNo);


  //      }
  //      else if (res.code === 400) {
  //       alert('Incorrect username or password');
  //     }
  //   });
  // }

  login() {
    
    if(this.username == undefined || this.username =="" ){
      alert('Please enter valid Username !');
      return;
    }

    if(this.password == undefined || this.password ==""){
      alert('Please enter valid Password !');
      return;
    }
    this.loginService.login(this.username, this.password).subscribe((res: any) => {
      console.log('Res', res);
      if (res.code === 200) {
        this.router.navigate(['/admin']);
        var users=res.obj;
        var divisionName = users.divisionName.split(" - ", 3); 
        divisionName = divisionName[1];
       
        sessionStorage.setItem('CompName',users.divisionName);
        sessionStorage.setItem('divisionName',divisionName);
        sessionStorage.setItem('divisionId',users.divisionId);
        sessionStorage.setItem('roleId',users.roleId);
        console.log(users.divisionName);
        sessionStorage.setItem('ticketNo',users.ticketNo);
        console.log(users.ticketNo);
          sessionStorage.setItem('emplId',users.emplId);
          sessionStorage.setItem('dept',users.deptId);
          sessionStorage.setItem('deptName',users.deptName);
          sessionStorage.setItem('name',users.fullName);
          sessionStorage.setItem('ouName',users.ouName);
          sessionStorage.setItem('ouId',users.ouId);
          sessionStorage.setItem('locId',users.locId);
          sessionStorage.setItem('divisionId',users.divisionId);
          sessionStorage.setItem('locCode',users.locCode);
          sessionStorage.setItem('deptId',users.deptId);
          sessionStorage.setItem('fullName',users.fullName);
          sessionStorage.setItem('locName',users.locName);
          sessionStorage.setItem('roleId',users.roleId);

console.log(users.ouId);
console.log(users.locId);
console.log(users.ouName);
console.log(users.locCode);

       } //else if (res.code === 204) {
      //   console.log('Email and password does not match');
      //   alert('Email and password does not match');

      // }
       else if (res.code === 400) {
        alert('Incorrect Username or Password');
      }else {
        alert('Login Error - Application is not responsding properly!');
      }
    });
  
  }




  // login(){
  //   // alert();
  //   this.router.navigate(['/admin']);
  //   }
}
