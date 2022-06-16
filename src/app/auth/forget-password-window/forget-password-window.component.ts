import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

export interface IItem {
  username: string;
  password: string;
  cPassword:string;
  nPassword:string;
}


@Component({
  selector: 'app-forget-password-window',
  templateUrl: './forget-password-window.component.html',
  styleUrls: ['./forget-password-window.component.css']
})
export class ForgetPasswordWindowComponent implements OnInit {
  username: string;
  password: string;
  loginArray: any[];
  divisionId: any[];
  users: any[];
  cPassword:string;
  nPassword:string;
  lstcomments1: any[];
  divisionCode: string;
  ticketNo: string;

  currentDateList: any = [];

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }


  login() {

    if (this.username == undefined || this.username == "") {
      alert('Please enter valid Username !');
      return;
    }

    if (this.password == undefined || this.password == "") {
      alert('Please enter valid Password !');
      return;
    }
    this.loginService.resetPassword(this.username, this.password,this.nPassword,this.cPassword).subscribe((res: any) => {
      console.log('Res', res);
      if (res.code === 200) {
        this.router.navigate(['/login']);
        alert(res.message)
      }
      else if (res.code === 400){
        alert('Incorrect Username or Password');
      }
    })}

}
