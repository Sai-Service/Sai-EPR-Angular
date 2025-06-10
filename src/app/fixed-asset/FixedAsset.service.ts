import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ AppConstants} from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class FixedAssetService {

  httpclient: any;
  headers: any;
  receiptNumber:number;
  ServerUrl : string;  
  lstcommentsUserSm = JSON.parse(sessionStorage.getItem('logRes'));
  token = this.lstcommentsUserSm.token;
 

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.headers = this.headers.append("Authorization", "Bearer " + this.token);
   }

   public getSearchfiscal(): Observable<any> {
    return this.http.get(this.ServerUrl + `/fiscalYr/FA%20Calendar`,{ headers: this.headers });
  }

  public getSearchConvention(): Observable<any> {
    return this.http.get(this.ServerUrl + `/faConnTy/DAILY`,{ headers: this.headers });
  }
  public getSearchCal(): Observable<any> {
    return this.http.get(this.ServerUrl + `/faCalTy/calTypeWise/Deprn%20Period`,{ headers: this.headers });
  }

  public getDepriciation(methodtyp): Observable<any> {
    return this.http.get(this.ServerUrl + `/faMethods/methodWise/${methodtyp}`,{ headers: this.headers });
  }

  /////////////////Book Control/////////////////////
  public getBookControl(booktyp): Observable<any> {
    return this.http.get(this.ServerUrl + `/faBookCtrl/bookTypeWise/${booktyp}`,{ headers: this.headers });
  }
  ////////////////Categories////////////////
 public getAssetCategories(catName): Observable<any> {
    return this.http.get(this.ServerUrl + `/faCate/categoryWise/${catName}`,{ headers: this.headers });
  }
  /////////////Retirement////////////

  public getAssetRetirementSearch(AssetNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/faAddtion/retire?assetId=${AssetNo}`,{ headers: this.headers });
  }
  public RetireTypeCode(): Observable<any> {
    return this.http.get(this.ServerUrl + '/faLookup/type/RETIRETYPECODE',{ headers: this.headers });
  }
  
  public assRetirePost(assRetValue)
  {
    const options={
      headers:this.headers
    };
    const url=this.ServerUrl+`/faAddtion/retirePost`;
    return this.http.post(url,assRetValue,options);
  }
  ////////////Addition/////////
  public getAssetSearch(assNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/faAddtion/${assNumber}`,{ headers: this.headers });
  }
  public MainCatList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_Assets_Major',{ headers: this.headers });
  }
  public MinorCatList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_Assets_Minor',{ headers: this.headers });
  }
  public categoryExist(category): Observable<any> {
    return this.http.get(this.ServerUrl + `/faCate/categoryName/${category}`,{ headers: this.headers });
  }
  public keyExist(key): Observable<any> {
    return this.http.get(this.ServerUrl + `/faLoc/assetKey/${key}`,{ headers: this.headers });
  }
  public locationExist(locname): Observable<any> {
    return this.http.get(this.ServerUrl + `/faLoc/locationName/${locname}`,{ headers: this.headers });
  }
  public companyCodeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_Company',{ headers: this.headers });
  }
  public ownershipList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/faLookup/type/OWNERSHIP',{ headers: this.headers });
  }
  public boughtList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/faLookup/type/BOUGHT',{ headers: this.headers });
  }
  public assTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/faLookup/type/ASSET%20TYPE',{ headers: this.headers });
  }
  public salTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/faLookup/type/SALVALTYPE',{ headers: this.headers });
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
  return this.http.get(this.ServerUrl + `/faAddtion/recovCost?cost=${cost}&catId=${catId}`,{ headers: this.headers });
}
public AssetTransfer(AssetTransferRecord) {
  const options = {
    headers: this.headers
  };
  const url = (this.ServerUrl + '/faAddtion/assetTransfer');
  return this.http.put(url, AssetTransferRecord, options);
}
}
