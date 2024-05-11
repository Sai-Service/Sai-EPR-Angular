
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


  shipEntryInvGenFn(startDate,endDate,locId,custId): Observable<any> {
    return this.http.get(this.ServerUrl + `/ShiftEntry/custList?startDate=${startDate}&endDate=${endDate}&locId=${locId}&customerId=${custId}`);
      // http://localhost:8081/ShiftEntry/custList?startDate=11-03-2024&endDate=20-03-2024&locId=2501&customerId=73628
  }


  shipEntryInvGenFnPost(startDate,endDate,locId,custId){
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/ShiftEntry/custList?startDate=${startDate}&endDate=${endDate}&locId=${locId}&customerId=${custId}`
    return this.http.post(url, options);
  
  }



  getEntryListFn(startDate,endDate,locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/ShiftEntry/shiftList?fromDate=${startDate}&toDate=${endDate}&locId=${locId}`);
  }



  shipEntryInvGenSaerchFn(startDate,endDate,locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/arInv/petrolInvList?startDate=${startDate}&endDate=${endDate}&locId=${locId}`);
  }

  shipEntryInvGenSaerchCustFn(startDate,endDate,locId,custId): Observable<any> {
    return this.http.get(this.ServerUrl + `/arInv/petrolInvoice?startDate=${startDate}&endDate=${endDate}&locId=${locId}&customerId=${custId}`);
  }

  SearchByEntryDate(entDate) {
    // old >> return this.http.get(this.ServerUrl + `/arCashReceipts/Search?receiptDate='${rcptDate}'&orgId=${ouId}&locId=${locId}`)
    return this.http.get(this.ServerUrl + `/DipEntry/date?dipentrydate=${entDate}`);
    // http://localhost:8081/DipEntry/date?dipentrydate=01-03-2024
    }
}
