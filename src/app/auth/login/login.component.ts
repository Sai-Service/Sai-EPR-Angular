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

  constructor(private router: Router, private loginService: LoginService ) { }

  ngOnInit(): void {
  }
  
  login() {
    this.loginService.login(this.username, this.password).subscribe((res: any) => {
      console.log('Res', res);
      if (res.code === 200) {
        this.router.navigate(['/admin']);
        var users=res.obj;
          sessionStorage.setItem('emplId',users.emplId);
          // sessionStorage.setItem('emplId',users.emplId);
       } //else if (res.code === 204) {
      //   console.log('Email and password does not match');
      //   alert('Email and password does not match');

      // }
       else if (res.code === 400) {
        alert('Incorrect username or password');
      }
    });
  }


  // login(){
  //   // alert();
  //   this.router.navigate(['/admin']);
  //   }
}
