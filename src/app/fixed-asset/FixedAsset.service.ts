import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FixedAssetService {

  httpclient: any;
  headers: any;
  receiptNumber:number;

  // ServerUrl='http://saireplica.horizon.org:8080/ErpReplica';  
  ServerUrl='http://localhost:8081'; 
  // ServerUrl='http://saihorizon.com:8080/ErpReplica'
   
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
   }

   public getSearchfiscal(): Observable<any> {
    return this.http.get(this.ServerUrl + `/fiscalYr/FA%20Calendar`);
  }

  public getSearchConvention(): Observable<any> {
    return this.http.get(this.ServerUrl + `/faConnTy/DAILY`);
  }
  public getSearchCal(): Observable<any> {
    return this.http.get(this.ServerUrl + `/faCalTy/calTypeWise/Deprn%20Period`);
  }

  public getDepriciation(methodtyp): Observable<any> {
    return this.http.get(this.ServerUrl + `/faMethods/methodWise/${methodtyp}`);
  }

  /////////////////Book Control/////////////////////
  public getBookControl(booktyp): Observable<any> {
    return this.http.get(this.ServerUrl + `/faBookCtrl/bookTypeWise/${booktyp}`);
  }
  ////////////////Categories////////////////
 public getAssetCategories(catName): Observable<any> {
    return this.http.get(this.ServerUrl + `/faCate/categoryWise/${catName}`);
  }
  ////////////Addition/////////
  public getAssetSearch(assNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/faAddtion/${assNumber}`);
  }
  public MainCatList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_Assets_Major');
  }
  public MinorCatList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_Assets_Minor');
  }
  public categoryExist(category): Observable<any> {
    return this.http.get(this.ServerUrl + `/faCate/categoryName/${category}`);
  }
  public keyExist(key): Observable<any> {
    return this.http.get(this.ServerUrl + `/faLoc/assetKey/${key}`);
  }
  public locationExist(locname): Observable<any> {
    return this.http.get(this.ServerUrl + `/faLoc/locationName/${locname}`);
  }
  public companyCodeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_Company');
  }
  public ownershipList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/faLookup/type/OWNERSHIP');
  }
  public boughtList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/faLookup/type/BOUGHT');
  }
  public assTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/faLookup/type/ASSET%20TYPE');
  }
  public salTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/faLookup/type/SALVALTYPE');
  }
  public assAddPost(assAddValue)
{
  const options={
    headers:this.headers
  };
  const url=this.ServerUrl+`/faAddtion`;
  return this.http.post(url,assAddValue,options);
}
public AmtCalc(cost,catId): Observable<any> {
  return this.http.get(this.ServerUrl + `/faAddtion/recovCost?cost=${cost}&catId=${catId}`);
}
}
  