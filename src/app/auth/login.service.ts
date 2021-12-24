import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import{ AppConstants} from '../app-constants'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  headers: HttpHeaders;
  ServerUrl : string;
  constructor(private httpclient: HttpClient) {

    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.ServerUrl = AppConstants.ServerUrl;

  }
  public login(username: string, password: string) {
    const body = {
      'ticketNo': username,
      'loginPass': password,
    };
    let options = {
      headers: this.headers
    };
     const url = 'http://localhost:8081/loginpage';
    // const url='http://saihorizon.com:8051/ErpReplica/loginpage';
    // const url='http://saidev.horizon.org:8080/ErpReplica/loginpage';
    // const url= "http://saierp.horizon.org:8080/ErpReplica"; 
    console.log(body);
    return this.httpclient.post(url, body, options)
    
  }
  
}
