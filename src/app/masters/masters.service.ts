import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { AppConst } from '../app-const'

@Injectable({
  providedIn: 'root'
})
export class MastersService {
httpclient: any;
  headers: any;
  ServerUrl: string;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.ServerUrl = AppConst.ServerUrl;
  }


 DivisionIDList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/divMst');
  }

 getLocationId(orgCode:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/locListOuwise/${orgCode}`);
  }
  DesignationList(Department:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/Designation/${Department}`);
  }
 teamRoleListFN(deptName:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/TeamRole/${deptName}`);
  }

DepartmentList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/DeptList');
  }

   titleList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/TitleList');
  }

   public EmployeeMasterSubmit(EmpMasterRecord:any) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/empMst';
    return this.http.post(url, EmpMasterRecord, options);
  }
  UpdateEmpMasterById(EmpMasterRecord:any, emplId:any) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/empMst/${emplId}`);
    return this.http.put(url, EmpMasterRecord, options);
  }

    getEmpIdDetails1(fullName:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/empMst/EmpSearchByName?fullName=${fullName}`);
  }

  getEmpIdDetails(ticketNo:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/empMst/EmpTicket/${ticketNo}`);
  }

   statusList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus');
  }

  StateList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/States');
  }

  OUIdList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/opUnit');
  }
   
  cityList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/City');
  }

    regionList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/Region');
  }


   public LocationMasterSubmit(LocationMasterRecord:any) {
    const options = {
      headers: this.headers
    };
    // const url = this.ServerUrl + '/locationMst/postLoc';
    const url = this.ServerUrl + '/locationMst';
    return this.http.post(url, LocationMasterRecord, options);
  }


   UpdateLocationMasterById(LocationMasterRecord:any, locId:any) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/locationMst/${locId}`);
    return this.http.put(url, LocationMasterRecord, options);
  }

  getLocationSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/locationMst');
  }

   cityList1(city:any): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/lookup?codeDesc=${city}&cmnType=City`);
  }


   public CompanyMasterSubmit(companyMasterRecord:any) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/CompMst/ComanyMaster';
    return this.http.post(url, companyMasterRecord, options);
  }


    UpdateCompanyMasterById(ComMasterRecord:any, compId:any) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/CompMst/${compId}`);
    return this.http.put(url, ComMasterRecord, options);
  }

  getcompanySearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CompMst');

  }
}
