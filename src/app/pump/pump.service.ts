
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ AppConstants} from '../app-constants';




@Injectable({
  providedIn: 'root'
})
export class PumpService {
  httpclient: any;
  headers: any;
  ServerUrl: string;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.ServerUrl = AppConstants.ServerUrl;
   }


   
   segmentListFn(): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/ByItemCategory?itemCatType=PP.FUEL&divId=3`);
  }

  locatorFn(locId,itemId,subinventoryId): Observable<any> {
    return this.http.get(this.ServerUrl + `/onhandqty/onhandPP?locId=${locId}&itemId=${itemId}&subInventoryId=${subinventoryId}`);
  }

  priceListFn(priceListName,itemId): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist/ItmPrcList/?priceListName=Petrol Pump 12PU.2501 - MRP&itemId=${itemId}`);
  }

  segmentListFn1(nozzFuelType): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/ByPPItem?segment=${nozzFuelType}`);
  }
  

  public savePetrolPump(orderSave) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/ShiftEntry';
    return this.http.post(url, orderSave, options);
  }

  getSearchShiftNo(shiftNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/ShiftEntry/${shiftNo}`);
  }


  updatePumDet(UpdatePetrolUpdateRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/ShiftEntry/shiftUpdate`);
    return this.http.post(url, UpdatePetrolUpdateRecord, options);
  }


  shipFinalConfirmFn(UpdatePetrolUpdateRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/ShiftEntry/shiftFinalCnfrm`);
    return this.http.post(url, UpdatePetrolUpdateRecord, options);
  }


}
