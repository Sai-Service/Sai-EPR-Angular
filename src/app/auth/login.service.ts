import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

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
    // const url = 'http://saireplica.horizon.org:8080/ErpReplica/loginpage';
    const url = 'http://localhost:8081/loginpage';
    // const url='http://saihorizon.com:8080/ErpReplica/loginpage'
    console.log(body);
    return this.httpclient.post(url, body, options)
    // .pipe(
    //   retry(1),
    //   catchError(this.handleError)
    // );
  }
  // handleError(error) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }

}
