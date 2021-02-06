import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  headers: HttpHeaders;
  constructor(private httpclient: HttpClient) {

    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');

  }
  public login(username: string, password: string) {
    const body = {
      'ticketNo': username, 
      'loginPass': password, 
    };
    let options = {
      headers: this.headers
    };
    const url = 'http://saireplica.horizon.org:8080/ErpReplica/loginpage';
    // const url = 'http://localhost:8081/loginpage';
    console.log(body);
    return this.httpclient.post(url, body, options);

  }

  
}
