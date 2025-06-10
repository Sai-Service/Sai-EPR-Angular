import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { OPMasterDtoComponent } from './opmaster-dto/opmaster-dto.component';
import { } from 'src/app/transaction/bulk-upload-with-csv/bulk-upload-with-csv.component'
import { AppConstants } from '../app-constants'
import { invalid } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  httpclient: any;
  headers: any;
  ServerUrl: string;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.ServerUrl = AppConstants.ServerUrl;
  }

  //  public  getCurrentDate(): Date {
  //   var res  : any = this.http.get('http://worldtimeapi.org/api/timezone/Asia/Kolkata');
  //   var cDate=res.datetime.substr(0,res.datetime.indexOf('T'));
  //   return new Date(cDate);
  // }


  ////////////////////////////////////////Comman Lov//////////////////////////////////////////////////
  statusList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus');
  }

  taxCategoryNameList(ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/taxCtgHeader/${ouId}`);
  }
  taxCategoryList1(locId, state): Observable<any> {
    return this.http.get(this.ServerUrl + `/taxCtgHeader/taxCtgName?locId=${locId}&custState=${state}`);
  }
  taxCategorySiteList1(ouId, state): Observable<any> {
    return this.http.get(this.ServerUrl + `/taxCtgHeader/taxCtgNameSuppSitewise?ouId=${ouId}&custState=${state}`);
  }
  memberTicketNo(locCode, deptId, divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/empMst/teamMemberList?locId=${locCode}&deptId=${deptId}&divisionId=${divisionId}`);
  }
  teamRoleListFN(deptName): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/TeamRole/${deptName}`);
  }

  OUIdList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/opUnit');
  }

  OUIdListDiv(mDivId): Observable<any> {
    return this.http.get(this.ServerUrl + `/opUnit/divisionWise/${mDivId}`);
  }

  LocationListOu(mOuId): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/locListOuwise/${mOuId}`);
    // http://saihorizon.com:8051/ErpReplica/locationMst/locListOuwise/15
  }

  StateList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/States');
  }
  cityList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/City');
  }
  regionList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/Region');
  }

  DivisionIDList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/divMst');
  }

  poTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/PoTypes');
  }
  APiNVOICEtYPETypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/AP INVOICE TYPE');
  }
  APitemtYPEList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/AP Item TYPE');
  }
  invItemList1(): Observable<any> {
    return this.http.get(this.ServerUrl + '/itemMst');
  }

  invItemListNew(divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/itemDetails/${divisionId}`);
  }

  invItemListEw(mEwType, mVariant, mPeriod): Observable<any> {
    // alert("type,varinat,period   "+ mEwType +","+mVariant +","+mPeriod)
    return this.http.get(this.ServerUrl + `/itemMst/ewItems?ewType=${mEwType}&variant=${mVariant}&ewPeriod=${mPeriod} `);
  }


  companyCodeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CompMst');
  }
  YesNoList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/YesNo');
  }
  SSitemTypeListFn(): Observable<any> {
    return this.http.get(this.ServerUrl + '/itemCategory/type');
  }
  subTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/SubCtg');
  }
  mainTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/MainCtg');
  }

  mainTypeNewList(divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/Catgtype?cmnType=MainCtg&divisionId=${divisionId}`);
  }
  subTypeNewList(divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/Catgtype?cmnType=SubCtg&divisionId=${divisionId}`);
  }

  locationIdList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/locationMst');
  }

  locationIdList1(ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/locListOuwise/${ouId}`);
  }

  TolocationIdList(locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/shippingNetwork/shiptoloc/${locId}`);
  }
  locationCodeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_Location');
  }
  subinventoryIdList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/subInvMst');
  }

  subinventoryIdList1(divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/subInvMst/subInv/${divisionId}`);
  }
  titleList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/TitleList');
  }
  DepartmentList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/DeptList');
  }

  DepartmentListNew(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/CmnType/Dept');
  }
  DepartmentListNew1(divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/subInvMst/subInv/${divisionId}`);
  }

  empIdListFn(): Observable<any> {
    return this.http.get(this.ServerUrl + '/empMst/All');
  }
  DepartmentListById(dept): Observable<any> {
    return this.http.get(this.ServerUrl + `/divMst/${dept}`);
  }
  emplIdList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/empMst');
  }
  DesignationList(Department): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/Designation/${Department}`);
  }
  recvTypeIdList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/DeptList');
  }

  invItemList(itemType, deptName, divisionId): Observable<any> {
    const REQUEST_PARAMS = new HttpParams().set('itemType', itemType)
      .set('dept', deptName)
      .set('divisionId', divisionId)
    const REQUEST_URI = this.ServerUrl + '/itemMst/ItemType';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,
    });
  }



  invItemListExpence(itemType, deptName, divisionId, segment): Observable<any> {
    const REQUEST_PARAMS = new HttpParams().set('itemType', itemType)
      .set('dept', deptName)
      .set('divisionId', divisionId)
      .set('segment', segment)
    const REQUEST_URI = this.ServerUrl + '/itemMst/ItemType';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,
    });
  }


  invItemList2(itemType, deptName, divisionId): Observable<any> {
    const REQUEST_PARAMS = new HttpParams().set('itemType', itemType)
      .set('dept', deptName)
      .set('divisionId', divisionId)
    const REQUEST_URI = this.ServerUrl + '/itemMst/ItemType';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,
    });
  }


  invItemList2New(itemType, deptName, divisionId, segment): Observable<any> {
    const REQUEST_PARAMS = new HttpParams().set('itemType', itemType)
      .set('dept', deptName)
      .set('divisionId', divisionId)
      .set('segment', segment)
    const REQUEST_URI = this.ServerUrl + '/itemMst/ItemType';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,
    });
  }
  supplierCodeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/supp');
  }


  supplierCodeListNew(): Observable<any> {
    return this.http.get(this.ServerUrl + '/supp/typewiseDet/Supplier');
  }

  supplierCodeWithEmplListNew(): Observable<any> {
    return this.http.get(this.ServerUrl + '/supp/getAllSupp');
  }

  pricelIstListFn(ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist/NDPPrc?ouId=${ouId}`);
  }

  getTdsType(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/SuppTdsType`);
  }

  supplierCodeList1(): Observable<any> {
    return this.http.get(this.ServerUrl + '/supp');
  }
  supplierName(supName): Observable<any> {
    return this.http.get(this.ServerUrl + `/supp/suppName?name=${supName}`);
  }

  taxCategoryList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/JaiTaxCatg/taxCate/PURCHASE');
  }

  createOrderTypeListFn(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/CmnType/AccOrderType');
  }

  issueCodeFunction(divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnTypeDivision?cmnType=IssueCode&divisionId=${divisionId}`);
  }

  taxCategoryListForSALES(): Observable<any> {
    return this.http.get(this.ServerUrl + '/JaiTaxCatg/taxCate/SALES');
  }
  taxCategoryIgstListForSALES(): Observable<any> {
    return this.http.get(this.ServerUrl + '/JaiTaxCatg/getByCateTypeIGST1/SALES');
  }



  taxCategoryListForSALESwithstatetcs(customerId, loginOuId1, itemId, custOuId, deptName, tcs): Observable<any> {
    const REQUEST_PARAMS = new HttpParams().set('customerId', customerId)
      .set('loginOuId1', loginOuId1)
      .set('itemId', itemId)
      .set('custOuId', custOuId)
      .set('deptName', deptName)
      .set('tcs', tcs)
    const REQUEST_URI = this.ServerUrl + '/poHdr/potaxcal';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,

    });
  }


  taxCategoryListHSN(mPer, mType): Observable<any> {
    // alert("MTYPE= "+mType + "  MPER= " + mPer);
    return this.http.get(this.ServerUrl + `/JaiTaxCatg/taxCateGstPer?taxCatType=${mType}&gstPer=${mPer}`);
  }



  taxCategoryListPoInvoice(): Observable<any> {
    return this.http.get(this.ServerUrl + '/JaiTaxCatg/taxCate');
    // return this.http.get(this.ServerUrl +'/JaiTaxCatg/taxCate/Purchase');
  }

  suppSiteList(suppId): Observable<any> {
    return this.http.get(this.ServerUrl + `/supp/sites/${suppId}`);
  }

  suppIdList(suppId, ouId) {
    const REQUEST_PARAMS = new HttpParams().set('suppId', suppId)
      .set('ouId', ouId)

    const REQUEST_URI = this.ServerUrl + '/supp/ouSites';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,

    });
  }

  suppIdList1(suppId, ouId) {
    const REQUEST_PARAMS = new HttpParams().set('suppId', suppId)
      .set('ouId', ouId)

    const REQUEST_URI = this.ServerUrl + '/supp/ouSites';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,

    });
  }
  siteIdList(siteId): Observable<any> {
    return this.http.get(this.ServerUrl + `/supp/site/${siteId}`);
  }

  chassisList(ouId, addonType): Observable<any> {
    return this.http.get(this.ServerUrl + `/arInv/chssisListOrder?orgId=${ouId}&addonType=${addonType}`);
  }

  // http://localhost:8081/arInv/chssisListOrder?orgId=21&addonType=SS_ADDON_RTO


  segmentNameList(segmentName): Observable<any> {
    return this.http.get(this.ServerUrl + `/glCodeCmbn/codeComb/${segmentName}`);
  }



  //   taxCategoryList(): Observable<any> {
  //   return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
  // }
  custTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus');
  }
  classCodeTypeList1(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/classCode');
  }
  classCodeTypeList(divId): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnTypeDivision?cmnType=ClassCode&divisionId=${divId}`);
  }
  getTaxCat(ouId): Observable<any> {
    // return this.http.get(this.ServerUrl + `/JaiTaxCatg/${ouId}`);
    return this.http.get(this.ServerUrl + `/taxCtgHeader/${ouId}`);
  }
  BranchList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_Branch');
  }
  BranchListDiv(compId, divId): Observable<any> {
    return this.http.get(this.ServerUrl + `/fndAcctLookup/lookupTypeInfo?compId=${compId}&divisionId=${divId}&lookupType=SS_Branch`)
  }
  CostCenterList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/CostCentre');
  }
  NaturalAccountList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/NaturalAccount');
  }
  NaturalAccountList1(): Observable<any> {
    return this.http.get(this.ServerUrl + '/naturalAcc/Payable');
  }
  NaturalAccountListRec(): Observable<any> {
    return this.http.get(this.ServerUrl + `/naturalAcc/Receivable`);
  }
  NaturalAccountListJV(): Observable<any> {
    return this.http.get(this.ServerUrl + '/naturalAcc/JV');
  }
  InterBrancList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_Interbranch');
  }
  FutureList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_Future');
  }
  SubAccountList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_SubAccount');
  }
  /////////////IOT Transfer/////////////////////

  iotOrderTypeList1(ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/OrderTrnType/stkorder/${ouId}`);
  }
  iotOrderTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/OrderTrnType/stkorder1`);
  }
  getShiptoLoc(locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/shippingNetwork/shiptoInterState/${locId}`);
  }
  /////////////////////////////////////////Division Master////////////////////////////////////////////
  public divisionMasterSubmit(divMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/divMst/divPost';
    return this.http.post(url, divMasterRecord, options);
  }
  getDiviSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/divMst');

  }
  getDiviSearchPach(divisionCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/divMst/divCode/${divisionCode}`);
  }
  // statusList(): Observable<any> {
  //   return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
  // }  OUIdList StateList

  UpdateDivMasterById(DivMasterRecord, divisionId) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/divMst/${divisionId}`);
    return this.http.put(url, DivMasterRecord, options);
  }

  getcommentsById(companyCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/ssCompanies/${companyCode}`, { headers: this.headers });
  }
  //////////////////////////Company Master//////////////////////////////////////////////////////////

  public CompanyMasterSubmit(companyMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/CompMst/ComanyMaster';
    return this.http.post(url, companyMasterRecord, options);
  }

  getcompanySearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CompMst');

  }


  ///////////////////////////common look up //////////////////////////

  cmnTypeListNew(divId): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/AllCmnType/${divId}`);
    // http://localhost:8081/cmnLookup/AllCmnType/2
  }

  public commonMasterSubmit(commonMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/cmnLookup';
    return this.http.post(url, commonMasterRecord, options);
  }


  UpdateCommonMasterSubmit(commnMasterRecord, cmnId) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/cmnLookup/${cmnId}`);
    return this.http.put(url, commnMasterRecord, options);
    // http://localhost:8081/cmnLookup/732
  }


  getCommonLookupSearch(searchText): Observable<any> {
    return this.http.get(this.ServerUrl + `/CompMst/${searchText}`);
  }

  getCommonLookupSearchNew(cmnTp, divId ): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnTypeDivision?cmnType=${cmnTp}&divisionId=${divId}`)
    // http://localhost:8081/cmnLookup/CmnTypeDivision?cmnType=PhysicalLocation&divisionId=2
  }

  getCommonLookupSearchNewWithLocId(cmnTp, divId,locCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnTypePaintEmpl?cmnType=${cmnTp}&divisionId=${divId}&attribute1=${locCode}`)
    // http://localhost:8081/cmnLookup/CmnTypePaintEmpl?cmnType=PN-ADVISOR&divisionId=1&attribute1=1602
 
  }


  getDipScaleSearchByTankId(tankId): Observable<any> {
    return this.http.get(this.ServerUrl + `/DipMaster/tankId/${tankId}`);
    // http://localhost:8081/DipMaster/tankId/1
  }

  getDipScaleSearchByTankIdAndVol(tankId,dipVol): Observable<any> {
    return this.http.get(this.ServerUrl + `/DipMaster/tankVol?tankId=${tankId}&vol=${dipVol}`)
    // http://localhost:8081/DipMaster/tankVol?tankId=1&vol=169.0    
  }


  getDipScaleOpenReading(tnkid,dt1): Observable<any> {
    return this.http.get(this.ServerUrl + `/DipEntry/getClosDp?tankId=${tnkid}&shiftDate=${dt1}`)
    // http://localhost:8081/DipEntry/getClosDp?tankId=1&shiftDate=18-DEC-2024

  }



  UpdateCompanyMasterById(ComMasterRecord, compId) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/CompMst/${compId}`);
    return this.http.put(url, ComMasterRecord, options);
  }
  //////////////////////////Operating Unit Master////////////////////////////////////////////////////

  public operatingUnitMasterSubmit(operatingUnitMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/opUnit/hrOperatingUnits';
    return this.http.post(url, operatingUnitMasterRecord, options);
  }
  // getoperatingUnitSearch(): Observable<any> {
  //   return this.http.get(this.ServerUrl + '/opUnit');

  // }
  getoperatingUnitSearch(pageNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/opUnit?page=${pageNo}&size=5`);

  }

  UpdateoperatingUnitMasterById(operatingUnitMasterRecord, ouId) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/opUnit/${ouId}`);
    return this.http.put(url, operatingUnitMasterRecord, options);
  }
  ///////////////////////////////////// Location Master///////////////////////////////////////////
  public LocationMasterSubmit(LocationMasterRecord) {
    const options = {
      headers: this.headers
    };
    // const url = this.ServerUrl + '/locationMst/postLoc';
    const url = this.ServerUrl + '/locationMst';
    return this.http.post(url, LocationMasterRecord, options);
  }


  getLocationSearch1(ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/locListOuwise/${ouId}`);
  }

  accountNameList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/receiptMethod/rcptMethod`);
  }

  accountNameListbank(): Observable<any> {
    return this.http.get(this.ServerUrl + `/receiptMethod/bankRcptMethod`);
  }

  getLocationSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/locationMst');
  }
  UpdateLocationMasterById(LocationMasterRecord, locId) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/locationMst/${locId}`);
    return this.http.put(url, LocationMasterRecord, options);
  }

  ///////////////////////////////// Sales Order Gruop Master ////////

  getGruopSearch(teamName, ouId, locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/teamMaster/Team?teamName=${teamName}&ouId=${ouId}&locId=${locId}`);
  }

  leadTicketNoList(locId, deptId): Observable<any> {
    // return this.http.get(this.ServerUrl + `/empMst/EmpLocDept?locId=${locId}&divisionId=${divisionId}&deptId=${deptId}`);
    return this.http.get(this.ServerUrl + `/empMst/teamList?locId=${locId}&deptId=${deptId}`);
  }
  public GroupMasterSubmit(LocationMasterRecord) {
    const options = {
      headers: this.headers
    };
    // const url = this.ServerUrl + '/locationMst/postLoc';
    const url = this.ServerUrl + '/teamMaster/post';
    return this.http.post(url, LocationMasterRecord, options);
  }



  // public GroupMasterSubmit(LocationMasterRecord) {
  //   const options = {
  //     headers: this.headers
  //   };
  //   // const url = this.ServerUrl + '/locationMst/postLoc';
  //   const url = this.ServerUrl + '/teamMaster/post';
  //   return this.http.post(url, LocationMasterRecord, options);
  // }


  ////////////////// Item Category Master /////////////////////////////////////////////////////////
  getItemCategorySearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/itemCategory');
  }

  getItemCategorySearchbydivisionId(divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemCategory/div/${divisionId}`);
  }
  public ItemCatMastSubmit(ItemCategoryRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/itemCategory';
    return this.http.post(url, ItemCategoryRecord, options);
  }
  UpdateItemCatMastById(ItemCategoryRecord, categoryId) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/itemCategory/${categoryId}`);
    return this.http.put(url, ItemCategoryRecord, options);
  }
  ///////////////Item Locator Master///////////////////////
  public ItemLocatorMasterSubmit(ItemLocatorMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/itemlctrmst';
    return this.http.post(url, ItemLocatorMasterRecord, options);
  }
  UpdateItemLocatorMaster(LocatorMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/itemlctrmst`);
    return this.http.put(url, LocatorMasterRecord, options);
  }
  getItemLocatorMasterSearch(locId, subId): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemlctrmst/byLocSub?locId=${locId}&subInventoryId=${subId}`);
  }

  getItemLocatorMasterSearchNew(locId, subId, itemId): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemlctrmst/byLocSubItem?locId=${locId}&subInventoryId=${subId}&itemId=${itemId}`);
  }
  ////////////////////////////////Locator Master/////////////////////////////

  getLocatorMasterSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/lctrmst');
  }
  public LocatorMasterSubmit(LocatorMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/lctrmst/locatormaster';
    return this.http.post(url, LocatorMasterRecord, options);
  }

  UpdateItemMasterById(itemMasterRecord,) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/itemMst/withInfo1`);
    return this.http.put(url, itemMasterRecord, options);
  }

  UpdateLocatorMasterById(LocatorMasterRecord, locatorId) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/lctrmst/${locatorId}`);
    return this.http.put(url, LocatorMasterRecord, options);
  }

  //////////////////////// Item Master/////////////////

  public VehItemSubmit(VehItemRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/itemMst/withInfo1';
    return this.http.post(url, VehItemRecord, options);
  }

  categoryIdList1(category, divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemCategory/typeDivision?itemType=${category}&divisionId=${divisionId}`);
  }

  categoryIdList(category): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemCategory/type/${category}`);
  }

  getCategoryIdListByDivision(category): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemCategory/type/` + sessionStorage.getItem('divisionId') + `/${category}`);
  }
  uomList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/UOM');
  }

  costingList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus');
  }

  stockableList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus');
  }

  purchasableList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus');
  }

  costCenterList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/CostCentre');
  }

  hsnSacCodeList(): Observable<any> {
    // return this.http.get(this.ServerUrl +'/hsnsacMst/HsnSacCode');
    return this.http.get(this.ServerUrl + '/hsnSacMst');
  }

  hsnSacCodeData(type): Observable<any> {
    // return this.http.get(this.ServerUrl +'/hsnsacMst/HsnSacCode');
    return this.http.get(this.ServerUrl + `/hsnSacMst/codeType/${type}`);
  }

  hsnSacCodeDet(mHsnCode): Observable<any> {
    // alert("ms >> "+mHsnCode);
    return this.http.get(this.ServerUrl + `/hsnSacMst/${mHsnCode}`);
  }

  hsnSacCodeDetNew(mHsnCode): Observable<any> {
    // alert("ms >> "+mHsnCode);
    return this.http.get(this.ServerUrl + `/hsnSacMst/ls/${mHsnCode}`);
  }

  internalOrderList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus');
  }

  marginCategoryList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus');
  }

  assetItemList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus');
  }

  itemStatusList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus');
  }

  typeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus');
  }

  mainModelList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/MulModel');
  }

  mainModelListByDivisionId(): Observable<any> {

    //http://localhost:8081/cmnLookup/Catgtype?cmnType=Model&divisionId=2
    return this.http.get(this.ServerUrl + '/cmnLookup/Catgtype?cmnType=Model&divisionId=' + sessionStorage.getItem('divisionId'));
  }


  mcpReasonLst(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/McpCancelRsn');
  }

  mcpRemarkLst(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/McpCancRemark');
  }



  VariantSearchFn(mainModel): Observable<any> {
    // alert("MS>> "+mainModel);
    if (mainModel != null) {
      return this.http.get(this.ServerUrl + `/VariantMst/VariantList/${mainModel}`);
    }
  }

  colorCodeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/MulColour');
  }

  colorCodeListByVariant(variant): Observable<any> {
    return this.http.get(this.ServerUrl + `/VariantMst/ColorList/${variant}`);
  }

  transactionTypeNameList(deptId, locId, ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/OrderTrnType/otList?deptId=${deptId}&locId=${locId}&ouId=${ouId}`);
  }

  payTermDescList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/fndAcctLookup/lookupTypeWise/PaymentTerms`);
  }

  // taxCategoryListForSALES1(){}


  taxCategoryListForSALES1(orderNumber, segment) {
    const REQUEST_PARAMS = new HttpParams().set('orderNumber', orderNumber)
      .set('segment', segment)

    const REQUEST_URI = this.ServerUrl + `/orderHeader/deallotment?orderNumber=${orderNumber}&segment=${segment}`;
    return this.http.put(REQUEST_URI, {
      params: REQUEST_PARAMS,

    });
  }


  salesRepNameList(ouId, locId, dept): Observable<any> {
    return this.http.get(this.ServerUrl + `/teamMaster/StatusOuswise?ouId=${ouId}&locId=${locId}&dept=${dept}`);
  }

  mainModelListDivisionWise(divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/Catgtype?cmnType=Model&divisionId=${divisionId}`);
  }


  transactionTypeNameListNew(deptId, ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/OrderTrnType/otList?deptId=${deptId}&ouId=${ouId}`);
  }

  brokerListFn(): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/ClassCode/BROKER`);
  }

  insTypeListFn(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/insType`);
  }

  brokerListFnNew(classCodeType): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/ClassCode/${classCodeType}`);
  }

  brokerTypeListFn(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/ClassCodeSL`);
  }

  truValueListFn(): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/ClassCode/TRUE VALUE`);
  }



  variantCodeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus');
  }

  manYaerList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus');
  }

  octraiBillDateList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus');
  }

  octraiTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus');
  }

  warrantyStatusList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus');
  }

  ewStatusList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus');
  }

  ewPeriodList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus');
  }

  ewInsNameList(): Observable<any> {
    // return this.http.get(this.ServerUrl +'/Customer/ClassCode/INSURER');
    return this.http.get(this.ServerUrl + '/Customer/ClassCode/EWINSURER');
  }

  ewInsSiteList(customerId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/${customerId}`);
  }

  itemTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ItemType');
  }

  fuelTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/FuelType');
  }

  serviceModelLst(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/ServModel');
  }




  McpPackageTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/McpPackageType');
  }

  McpPackageCategoryList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/McpPackageCatg');
  }


  AmcCouponList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/schHdr/couponLst');
    // http://localhost:8081/schHdr/couponLst
  }

  AmcSchemeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/schHdr');
    // http://localhost:8081/schHdr
  }

  AmcSchemeDetails(schNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/schHdr/schemeName/${schNo}`);
    // http://localhost:8081/schHdr/schemeName/AM10
  }

  AmcEnrollmentDetails(enrollNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/McpEnrollMst/amcEnrollNo/${enrollNo}`);
    // http://localhost:8081/McpEnrollMst/amcEnrollNo/AMC2209-2
  }

  AmcEnrollmentDetailsRegNo(regNum): Observable<any> {
    return this.http.get(this.ServerUrl + `/McpEnrollMst/amcDtls/${regNum}`);
    // http://localhost:8081/McpEnrollMst/amcDtls/MH01DC0007
  }




  public AmcSchemeMasterSubmit(AmcSchemeMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/schHdr';
    return this.http.post(url, AmcSchemeMasterRecord, options);
    // http://localhost:8081/schHdr
  }

  public AmcEnrollMasterSubmit(AmcEnrollMasterRecord) {
    // alert ("in amc enrollment");
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/McpEnrollMst/amcEnroll';
    return this.http.post(url, AmcEnrollMasterRecord, options);
  }


  insNameList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/Customer/ClassCode/INSURER');
  }

  insSiteList(customerId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/${customerId}`);

  }

  ripsList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus');
  }

  twoToneList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus');
  }

  holdList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus');
  }

  holdReasonList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/HoldReason');
  }
  getItemCodePach(segment): Observable<any> {
    // return this.http.get(this.ServerUrl +`/itemMst/${segment}`);
    return this.http.get(this.ServerUrl + `/itemMst/bySegment/${segment}`);
  }

  GetCustomerSiteDetails(mCustomerId, mOuId): Observable<any> {
    // alert("customerId ,OuId :" +mCustomerId +" ,"+mOuId);
    return this.http.get(this.ServerUrl + `/Customer/custsite?customerId=${mCustomerId}&ouId=${mOuId}`);
  }
  getTDSPercentage(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/TDSPer`)
  }

  ////////////////////////////////Supplier Master///////////////////////////

  // cityList(): Observable<any> {
  //   return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
  // }

  // pinCodeList(): Observable<any> {
  //   return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
  // }

  // stateList(): Observable<any> {
  //   return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
  // }



  // ouList(): Observable<any> {
  //   return this.http.get(this.ServerUrl +'/cmnLookup/ACStatus');
  // }


  getsupplierMastSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/supp');
  }
  getsearchBySuppCode(suppNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/supp/bycode/${suppNo}`);
  }
  taxCategoryListSupp(locId, state): Observable<any> {
    return this.http.get(this.ServerUrl + `/taxCtgHeader/taxCtgNameSupp?locId=${locId}&custState=${state}`)
  }
  supplierType(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/SuppType`);
  }

  public SupliMasterSubmit(SupliMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/supp';
    return this.http.post(url, SupliMasterRecord, options);
  }
  SupliMasterSubmitForSite(SupliMasterRecord) {
    const options = {
      headers: this.headers
    };
    // const url = this.ServerUrl + '/supp/withSite';
    const url = this.ServerUrl + '/supp/site';
    return this.http.post(url, SupliMasterRecord, options);
  }
  UpdateSupliMasterById(SupliMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + '/supp');
    return this.http.put(url, SupliMasterRecord, options);
  }
  UpdateSiteSupliMasterById(SupliMasterRecord) {
    const options = {
      headers: this.headers
    };
    // const url = (this.ServerUrl + `/supp/${suppId}`);
    const url = (this.ServerUrl + '/supp/site');
    return this.http.put(url, SupliMasterRecord, options);
  }
  ///////////////////////////common Master///////////////////////
  cmnTypeList(): Observable<any> { return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus'); }
  applicationList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus');
  }
  //////////////////////////////////////document sequence master//////////
  getdocSeqSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/docsrlmst');
  }
  public docSeqMasterSubmit(docSeqMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/docsrlmst/docsrlmaster';
    return this.http.post(url, docSeqMasterRecord, options);
  }
  UpdatedocSeqMasterById(docSeqMasterRecord, docSrlId) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/docsrlmst/${docSrlId}`);
    return this.http.put(url, docSeqMasterRecord, options);
  }

  getLocationId(orgCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/locListOuwise/${orgCode}`);
  }

  getLocationById(locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/${locId}`);
  }


  getOrganizationId(divCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/docsrlmst/divName/${divCode}`);
  }
  FinancialYear(): Observable<any> {
    return this.http.get(this.ServerUrl + '/docsrlmst/getYear');
  }

  docTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/DocType');
  }
  getTransType(transType, OrgId): Observable<any> {
    return this.http.get(this.ServerUrl + `/docsrlmst/getTransTy?trnsType=${transType}&ouId=${OrgId}`)
  }
  getSrlNo(doctype, trantype): Observable<any> {
    return this.http.get(this.ServerUrl + `/docsrlmst/getTypeDtls?trnsType=${doctype}&TypeId=${trantype}`)
  }
  getcoCent(deptype): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/lookup?codeDesc=${deptype}&cmnType=Dept`)
  }
  /////////////////////////////EMPLOYEE MASTER////////////////////////////

  getEmpSearch(): Observable<any> {
    // return this.http.get(this.ServerUrl + '/empMst');
    return this.http.get(this.ServerUrl + '/empMst/All ');
  }
  getEmpIdDetails(ticketNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/empMst/EmpTicket/${ticketNo}`);
  }


  getEmpIdDetails1(fullName): Observable<any> {
    return this.http.get(this.ServerUrl + `/empMst/EmpSearchByName?fullName=${fullName}`);
  }


  public EmployeeMasterSubmit(EmpMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/empMst';
    return this.http.post(url, EmpMasterRecord, options);
  }
  UpdateEmpMasterById(EmpMasterRecord, emplId) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/empMst/${emplId}`);
    return this.http.put(url, EmpMasterRecord, options);
  }
  //////////////////////////////Document Sequence master///////////////////////
  // getdocSeqSearch(): Observable<any> {
  //   return this.http.get(this.ServerUrl + '/docsrlmst');
  // }
  // public docSeqMasterSubmit(docSeqMasterRecord) {
  //   const options = {
  //     headers: this.headers
  //   };
  //   const url = this.ServerUrl + '/docsrlmst/docsrlmaster';
  //   return this.http.post(url, docSeqMasterRecord, options);
  // }
  // UpdatedocSeqMasterById(docSeqMasterRecord,docSrlId) {
  //   const options = {
  //     headers: this.headers
  //   };
  //   const url = (this.ServerUrl + `/docsrlmst/${docSrlId}`);
  //   return this.http.put(url, docSeqMasterRecord, options);
  // }
  ////////////////////////Customer master//////////////////
  UpdateCustMasterById(CustMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + '/Customer');
    return this.http.put(url, CustMasterRecord, options);
  }
  UpdateCustExeSiteMasterById(CustMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + '/Customer/site');
    return this.http.put(url, CustMasterRecord, options);
  }
  public CustMasterOnlySitSubmit(CustMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/Customer/site';
    return this.http.post(url, CustMasterRecord, options);
  }
  public CustMasterSubmit(CustMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/Customer/withSite';
    return this.http.post(url, CustMasterRecord, options);
  }
  getsearchByAccountNo(customerId1): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/getByAccountNo1/${customerId1}`);
  }
  Limitdata(ouId, custId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/getCrAmtHighAmt?ouId=${ouId}&customerId=${custId}`)
  }

  getsearchByAccountNo1(accountId, divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/getByAccountNo1?accountNo=${accountId}&divisionId=${divisionId}`);
  }

  searchCustomerByContact(contactNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/contactNo/${contactNo}`);
  }

  searchCustomerByAccount(accountNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/getByCustAcctNo?accountNo=${accountNo}`);
  }

  custAccountNoSearch(accountNo, ouId, divId): Observable<any> {
    // alert("ms >>account no:"+accountNo+","+ouId +","+divId);
    return this.http.get(this.ServerUrl + `/Customer/getByAccountNo?accountNo=${accountNo}&ouId=${ouId}&divisionId=${divId}`);
  }

  exicutiveNameByCustName(accountNo, locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/empCust/exeDtls?accountNo=${accountNo}&locId=${locId}`);
  }

  // crediteLimitFn(customerId,customerSiteId): Observable<any>{
  //   return this.http.get(this.ServerUrl+`/Customer/getCreditAmt?customerId=${customerId}&customerSiteId=${customerSiteId}`);
  // }

  crediteLimitFn(customerId, locId, customerSiteId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/getOutStandingDetails?billToCustId=${customerId}&locId=${locId}&customerSiteId=${customerSiteId}`);
  }
  /////////AccountEnquiry////////////////////
  public FinancialPeriod(): Observable<any> {
    return this.http.get(this.ServerUrl + '/glPeriod/periodName');
  }

  public glPeriodYear(): Observable<any> {
    return this.http.get(this.ServerUrl + '/glPeriod/periodYear');
  }

  public AccountEnquirySearch(AccountEnquiryRecord): Observable<any> {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/glHeader/glEnquiry';
    return this.http.post(url, AccountEnquiryRecord, options);
  }
  public AccountBalSearch(AccountGlRecord): Observable<any> {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/glHeader/glBalances';
    return this.http.post(url, AccountGlRecord, options);
  }
  public viewAccountingjv(JVNO): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/receiptNoWise/${JVNO}`);
  }
  ////Receivable///////////
  public viewAccountingAR(tranNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/arInv/${tranNo}`);
  }

  viewAccountingMCP(tranNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/viewAccount/${tranNo}`);
  }


  viewApplyHistoryAR(tranNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/arInv/trxNumber/${tranNo}`);
  }

  ///Stock transfer////
  public viewAccountingST(tranNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/Invntory/${tranNo}`);
  }
  //stock taking////
  bulkstockTakinguploadCsv(formData: FormData) {

    const REQUEST_URI = this.ServerUrl + '/fileImport/uploadStkFile';
    return this.http.post(REQUEST_URI, formData);

  }
  public dataDisplay(locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/stockadj/stockList/${locId}`);
  }
  /////////////////////////////HSN-SAC CODE//////////////////////
  getHsnSacSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/hsnsacMst');
  }

  public HSNSACMasterSubmit(HsnSacMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/hsnsacMst';
    return this.http.post(url, HsnSacMasterRecord, options);
  }

  UpdateHSNMasterById(HsnMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + '/hsnsacMst');
    return this.http.put(url, HsnMasterRecord, options);
  }
  ///////////////////////////Purchese order/////////////////

  TransactionNatureList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/TranNature');
  }
  purchaseLocationList(temp): Observable<any> {
    // return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_Location');
    return this.http.get(this.ServerUrl + `/fndAcctLookup/lookupTypeBrLoc?lookupType=SS_Branch&lookupValue=${temp}`);
    // http://localhost:8081/fndAcctLookup/lookupTypeBrLoc?lookupType=SS_Branch&lookupValue=${temp}

  }

  getsearchByPOHeder(poNo, locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/poHdr/poNum?segment1=${poNo}&locId=${locId}`);
  }

  getsearchByPOHederPaint(poNo, locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/poHdr/paintPoNum?segment1=${poNo}&locId=${locId}`);
    // http://localhost:8081/poHdr/paintPoNum?segment1=2221205802099&locId=1207
  }




  cancelledPO(poNo) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/poHdr/poCancel/${poNo}`);
    return this.http.put(url, poNo, options);
  }


  public poSubmit(poMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/poHdr';
    return this.http.post(url, poMasterRecord, options);
  }

  public applyPOTax(poMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/poHdr/apply';
    return this.http.post(url, poMasterRecord, options);
  }

  ApprovePo(ApprovePoRecord, segment1) {
    // alert ("ApprovePo-ponum : "+segment1);
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/poHdr/poApprove/${segment1}`);
    return this.http.put(url, ApprovePoRecord, options);
  }

  UpdatePoDetails(ApprovePoRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + '/poHdr');
    return this.http.put(url, ApprovePoRecord, options);
  }

  ItemDetailsList(invItemId, taxCat, billTo): Observable<any> {
    const REQUEST_PARAMS = new HttpParams().set('itemId', invItemId)
      .set('taxCategoryName', taxCat)
      .set('locId', billTo)
    const REQUEST_URI = this.ServerUrl + '/itemMst/ItemDetails';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,

    });
  }

  taxCategoryListNew(taxCategoryName, hsnTaxPer): Observable<any> {
    return this.http.get(this.ServerUrl + `/JaiTaxCatg/taxCateDtls?taxCatType=PURCHASE&suppTaxCate=${taxCategoryName}&hsnTaxPer=${hsnTaxPer}`);
  }

  expenceItemDetailsList(invItemId): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/ItemDetailsExp/${invItemId}`);
  }


  taxCalforItemWithVOR(itemId, taxCatId, diss1, baseAmount, vorAmt, drfAmt) {
    const REQUEST_PARAMS = new HttpParams().set('itemId', itemId)
      .set('baseAmt', baseAmount)
      .set('taxCateId', taxCatId)
      .set('disAmt1', diss1)
      .set('vorAmt', vorAmt)
      .set('drfAmt', drfAmt)
    const REQUEST_URI = this.ServerUrl + '/poHdr/potaxcal';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,

    });
  }

  taxCalforItem(itemId, taxCatId, disAmt1, baseAmount) {
    const REQUEST_PARAMS = new HttpParams().set('itemId', itemId)
      .set('baseAmt', baseAmount)
      .set('taxCateId', taxCatId)
      .set('disAmt1', disAmt1)
    const REQUEST_URI = this.ServerUrl + '/poHdr/potaxcal';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,
    });
  }


  taxCalforItemwithMulDisc(itemId, taxCatId, baseAmount, diss1, diss2, diss3, diss4, diss5) {
    const REQUEST_PARAMS = new HttpParams().set('itemId', itemId)
      .set('baseAmt', baseAmount)
      .set('taxCateId', taxCatId)
      .set('disAmt1', diss1)
      .set('disAmt2', diss2)
      .set('disAmt3', diss3)
      .set('disAmt4', diss4)
      .set('disAmt5', diss5)
    const REQUEST_URI = this.ServerUrl + '/poHdr/potaxcal';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,

    });
  }


  calTaxWithDisc(itemId, taxCatId, baseAmount, diss1, diss2, diss3, diss4, diss5) {
    const REQUEST_PARAMS = new HttpParams().set('itemId', itemId)
      .set('baseAmt', baseAmount)
      .set('taxCateId', taxCatId)
      .set('disAmt1', diss1)
      .set('disAmt2', diss2)
      .set('disAmt3', diss3)
      .set('disAmt4', diss4)
      .set('disAmt5', diss5)
    const REQUEST_URI = this.ServerUrl + '/orderHeader/sotaxcal';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,

    });
  }

  taxCalforItem1(ouId, locId, baseAmount, taxCategoryId, diss) {
    const REQUEST_PARAMS = new HttpParams().set('ouId', ouId)
      .set('locId', locId)
      .set('baseAmt', baseAmount)
      .set('taxCateId', taxCategoryId)
      .set('disAmt1', diss)

    const REQUEST_URI = this.ServerUrl + '/arInv/arTaxcal';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,

    });
  }
  distributionApi1(custTrxTypeId, ouId, locId, basicAmt, extendedAmount) {
    const REQUEST_PARAMS = new HttpParams().set('custTrxTypeId', custTrxTypeId)
      .set('ouId', ouId)
      .set('locId', locId)
      .set('invAmount', extendedAmount)
      .set('taxableAmt', basicAmt)

    const REQUEST_URI = this.ServerUrl + '/arInv/invLnDis';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,

    });
  }
  // addDiscount(totTaxAmt,taxTypeName)
  public addDiscountM(poMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/poHdr/taxDetails';
    return this.http.post(url, poMasterRecord, options);
  }
  public addDiscount(totTaxAmt: number, taxTypeName: string) {
    const body = {
      'totTaxAmt': totTaxAmt,
      'taxTypeName': taxTypeName,
    };
    let options = {
      headers: this.headers
    };
    // const url = 'http://saireplica.horizon.org:8080/ErpReplica/loginpage';
    const url = '/taxDetails';
    // const url = 'http://localhost:8081/taxDetails';
    console.log(body);
    return this.httpclient.post(url, body, options);
  }

  // distributionApi1(custTrxTypeId, ouId, locId,basicAmt,extendedAmount){
  //   const REQUEST_PARAMS = new HttpParams().set('custTrxTypeId', custTrxTypeId)
  //   .set('ouId',ouId)
  //   .set('locId', locId)
  //   .set('invAmount', basicAmt)
  //   .set('taxableAmt', extendedAmount)

  //   const REQUEST_URI = this.ServerUrl +'/arInv/invLnDis';
  //   return this.http.get(REQUEST_URI, {
  //     params: REQUEST_PARAMS,

  //   });
  // }

  public completeInvoice(invoiceno) {
    const option = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/arInv/invComplete?invNum=${invoiceno}`;
    return this.http.put(url, option);
  }

  arInvoiceList(type): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvType/typeWise/${type}`);
  }
  ////////////Subinventory Transfer////////
  getsearchBySubInvTrfNo(subtrfNo, locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/mmtTrx/subInvTrf?shipmentNumber=${subtrfNo}&transferOrgId=${locId}`)
  }

   getsearchBySubInvTrfNoForPaint(subtrfNo, locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/mmtTrx/subInvTrfPN?shipmentNumber=${subtrfNo}&transferOrgId=${locId}`)
  // http://localhost:8081/mmtTrx/subInvTrfPN?shipmentNumber=11MU.1206-2512062600001&transferOrgId=1206
  }

  getPhysicalLoc(locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/physicalLoc/${locId}`)
  }

  public subInvTransferSubmit(subInvTransferRecord) {
    const option = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/mmtTrx/subtransfer';
    return this.http.post(url, subInvTransferRecord, option);
  }

  getsubTrfSubinventory(deptId, divId): Observable<any> {
    return this.http.get(this.ServerUrl + `/subInvMst/subIssue?deptId=${deptId}&divisionId=${divId}`)
  }

  
  getsubTrfSubinventoryPaint(deptId, divId): Observable<any> {
    return this.http.get(this.ServerUrl + `/subInvMst/PnWIPIss?deptId=${deptId}&divisionId=${divId}`)
//  http://localhost:8081/subInvMst/PnWIPIss?deptId=5&divisionId=1
 
  }

  downloadSubGatePassSaslesFn(shipNo) {
    const REQUEST_URI = this.ServerUrl + `/rcvShipment/ssSubInvTrf/${shipNo}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  downloadSubGatePassFn(shipNo) {
    const REQUEST_URI = this.ServerUrl + `/SparesReports/SubInvTrfSpToAcc?shipNo=${shipNo}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  ////////////Stock Transfer////////
  public stockTransferSubmit(stockTransferRecord) {
    const option = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/mmtTrx';
    return this.http.post(url, stockTransferRecord, option);
  }

  UpdateStkEway(EwayRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + '/mmtTrx');
    return this.http.put(url, EwayRecord, options);
  }

  // UpdateStkEway(EwayRecord) {
  //   const REQUEST_PARAMS = new HttpParams().set('shipmentNumber', EwayRecord.shipmentNumber)
  //                                          .set('transferOrgId', EwayRecord.transferOrgId)
  //                                          .set('ewayBill', EwayRecord.ewayBill)
  //                                          .set('ewayBillDate', EwayRecord.ewayBillDate)
  //   const REQUEST_URI = this.ServerUrl +'/mmtTrx/EwayUpdate';
  //   return this.http.put(REQUEST_URI,null, {
  //     params: REQUEST_PARAMS,
  //   });
  // }
  getsearchByShipmentNo(shipNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/mmtTrx/stktrf/${shipNo}`)
  }

  ItemIdListDept(deptId, locId, subId): Observable<any> {
    // alert (deptId +","+locId+","+subId)
    return this.http.get(this.ServerUrl + `/itemMst/itemDepartent1?deptId=${deptId}&locationId=${locId}&subInventoryId=${subId}`)
  }

  ItemIdListDeptPaint(deptId, locId, subId,clrCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/itemDepartent3?deptId=${deptId}&locationId=${locId}&subInventoryId=${subId}&colorCode=${clrCode}`)
  }

  ItemIdListDeptByCode(deptId, locId, subId, itemCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/itemDepartent?deptId=${deptId}&locationId=${locId}&subInventoryId=${subId}&segment=${itemCode}`)
  }


  Shipmentdue(frmLoc, toLoc, subInvCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvShipment/overDueList?fromLoc=${frmLoc}&toLoc=${toLoc}&subInventoryCode=${subInvCode}`)
  }
  viewStocknote(shipmentNumber) {
    // const REQUEST_URI = `http://saihorizon.com:8080/ErpReplica/rcvShipment/StkTransferNote/${shipmentNumber}`;
    // local
    const REQUEST_URI = this.ServerUrl + `/rcvShipment/StkTransferNote/${shipmentNumber}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }
  viewStockgatePass(shipmentNumber, empId) {
    //  const REQUEST_URI = `http://saihorizon.com:8080/ErpReplica/rcvShipment/SS_Stk_Gatepass/${shipmentNumber}`;
    // local
    const REQUEST_URI = this.ServerUrl + `/rcvShipment/postSTKGatepass?shipmentNumber=${shipmentNumber}&emplId=${empId}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }
  StockgatePassSubmit(stkGatePass) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/rcvShipment/SS_Stk_Gatepass/`);
    return this.http.post(url, stkGatePass, options);
  }
  ///////////OnHand////////////


  searchByItemCodeInclude(itemCd): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/segment/${itemCd}`)
    // http://localhost:8081/itemMst/segment/DH
  }

  searchByItemDescInclude(itemDesc, divId): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/searchByLabdesc/${divId}?itemDesc=${itemDesc}`)
    // http://localhost:8081/itemMst/searchBydesc/2?itemDesc=ring
    //  http://localhost:8081/itemMst/searchByLabdesc/2?itemDesc=ring
  }

  searchByItemByLoc(locId, itemid, ouId, divId): Observable<any> {
    //  alert("MS>>> "+ itemid+","+locId+","+ouId+","+divId);
    if (ouId === 'ALL') {
      return this.http.get(this.ServerUrl + `/onhandqty/onhandItemListAll?itemId=${itemid}&divisionId=${divId}`)
    } else if (ouId > 0 && locId === 'ALL') {
      return this.http.get(this.ServerUrl + `/onhandqty/onhandItemListOUwise?itemId=${itemid}&ouId=${ouId}&divisionId=${divId}`)
    }
    else {
      return this.http.get(this.ServerUrl + `/onhandqty/onhandItemListOUwise?itemId=${itemid}&ouId=${ouId}&divisionId=${divId}&locationId=${locId}`)
    }
  }

  searchByItemf9(itemid, locId, ouId, divId, deptId): Observable<any> {
    if(divId===2) {
     return this.http.get(this.ServerUrl + `/itemMst/ItemDtlsF9?locId=${locId}&itemId=${itemid}&ouId=${ouId}&divisionId=${divId}&deptId=${deptId}`)
    } else {
      return this.http.get(this.ServerUrl + `/itemMst/PaintF9?locId=${locId}&itemId=${itemid}&ouId=${ouId}&divisionId=${divId}&deptId=${deptId}`)
    }

    }



    searchByItemSegmentPP( itemSeg): Observable<any> {
      return this.http.get(this.ServerUrl + `/itemMst/ByPPnonInv?segment=${itemSeg}`)

  
    // http://localhost:8081/itemMst/ByPPnonInv?segment=PP
  }
 

  searchByItemSegmentDiv(divId, itemSeg): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/details/${divId}/${itemSeg}`)

    // http://localhost:8081/itemMst/searchBydesc/2/ring
  }

  searchByItemSegmentAR(itemSeg): Observable<any> {
    var divId = sessionStorage.getItem("divisionId");
    return this.http.get(this.ServerUrl + `/itemMst/${divId}/bycond?segment=${itemSeg}&isStock=N`)

  }
  searchByItemDescf9(divId, itemDesc): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/searchBydesc/${divId}?itemDesc=${itemDesc}`)

    // http://localhost:8081/itemMst/searchBydesc/2/ring
  }

  searchByItemBYSegment(divId, itemDesc): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/segment/${itemDesc}`)

    // http://localhost:8081/itemMst/searchBydesc/2/ring
  }

  // viewReserveData(locId,invId):Observable<any>
  // {
  //   return this.http.get(this.ServerUrl+`/reserveQty/reserveDtls?locId=${locId}&invItemId=${invId}`)
  // }


  viewReserveData(locId, invId) {
    return this.http.get(this.ServerUrl + `/reserveQty/reserveDtls?locId=${locId}&invItemId=${invId}`)
  }

  //////////Move Order//////////////
  public moveOrderSubmit(MoveOrderRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/mtrlIssue';
    return this.http.post(url, MoveOrderRecord, options);
  }
  
  public reservePost(reserverecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/reserveQty/insResrv`;
    return this.http.post(url, reserverecord, options);
  }

 
  public reservePostNew(formData: FormData, transtypeid, locId, prqty, itemId) {
    formData.append('transtypeid', transtypeid);
    formData.append('locId', locId);
    formData.append('prqty', prqty);
    formData.append('itemId', itemId);
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/reserveQty/insResrv`;
    return this.http.post(url, formData, options);
  }

  public reserveDelete(transno, locId) {
    return this.http.delete(this.ServerUrl + `/reserveQty/remove/?transactionNumber=${transno}&locId=${locId}`);
  }


  public reserveQtyDelete(itemCode, locId) {
    return this.http.delete(this.ServerUrl + `/reserveQty/removeSingle/?itemCode=${itemCode}&locId=${locId}`);
  }

  public reserveDeleteLine(transno, locId, itemId) {
    return this.http.delete(this.ServerUrl + `/reserveQty/removeItem/?transactionNumber=${transno}&locId=${locId}&invItemId=${itemId}`);
  }
  WorkShopIssue(locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/jobCard/jobNo?locId=${locId}`);
  }
  getPriceDetail(locId, itemid, subInv, repNo, divId): Observable<any> {
    return this.http.get(this.ServerUrl + `/onhandqty/onhandlocsubinv1?locId=${locId}&itemId=${itemid}&subInventoryId=${subInv}&repairNo=${repNo}&divisionId=${divId}`)
  }
  BillableType(): Observable<any> {
    return this.http.get(this.ServerUrl + `/billableTy`);
  }
  searchall(locId, divId, deptId): Observable<any> {
    return this.http.get(this.ServerUrl + `/mmtTrx/PendingRecMyloc?locationId=${locId}&divisionId=${divId}&deptId=${deptId}`);
  }
  searchallatother(locId, divId, deptId): Observable<any> {
    return this.http.get(this.ServerUrl + `/mmtTrx/PendingRecOthLoc?locationId=${locId}&divisionId=${divId}&deptId=${deptId}`);

  }
  getreserqty(locId, itemID): Observable<any> {
    return this.http.get(this.ServerUrl + `/reserveQty/locResQty?locId=${locId}&invItemId=${itemID}`)
  }

  getreserqtyNew(locId, itemID, locatorId, rate): Observable<any> {
    return this.http.get(this.ServerUrl + `/reserveQty/locResQty?locId=${locId}&invItemId=${itemID}&locatorId=${locatorId}&rate=${rate}`)
  }

  getreserqtyNew1(locId, itemID, locatorId, rate): Observable<any> {
    return this.http.get(this.ServerUrl + `/reserveQty/locResQtyPP?locId=${locId}&invItemId=${itemID}&locatorId=${locatorId}`)
    // http://localhost:8081/reserveQty/locResQtyPP?locId=2501&invItemId=89891&locatorId=63953
  }



  transType(): Observable<any> {
    return this.http.get(this.ServerUrl + '/mtlTrxTypes/IPO');
  }
  getsearchByJob(jobno): Observable<any> {
    return this.http.get(this.ServerUrl + `/mtrlIssue/repair?repairNo=${jobno}`)
  }

  gettotalAmt(jobno): Observable<any> {
    return this.http.get(this.ServerUrl + `/mtrlIssue/repairAmt?repairNo=${jobno}`)
  }

  getsearchByIC(jobno): Observable<any> {
    return this.http.get(this.ServerUrl + `/stockadj/jobcard/${jobno}`)
  }

  getPaintSearchbyJc(jcNo,locId,issType){
    return this.http.get(this.ServerUrl + `/stockadj/locJobPaint?repairNo=${jcNo}&locId=${locId}&reason=${issType}`)
    // http://localhost:8081/stockadj/locJobPaint?repairNo=JC24001193&locId=1633&reason=PN001
  }

  getPaintSearchbyDate(issDt,locId,issType){
    return this.http.get(this.ServerUrl + `/stockadj/locDtPaint?dte=${issDt}&locId=${locId}&reason=${issType}`)
    // http://localhost:8081/stockadj/locDtPaint?dte=24-jul-2024&locId=1633&reason=PN001
  }

  getsearchByJCpaint(jobno): Observable<any> {
    return this.http.get(this.ServerUrl + `/stockadj/jobPaint/${jobno}`)
    // http://localhost:8081/stockadj/jobPaint/JC-1
  }

  subInvCode(deptId): Observable<any> {
    return this.http.get(this.ServerUrl + `/subInvMst/wipissue/${deptId}`);
  }


  subInvCode2(deptId, divisionId) {
    const REQUEST_PARAMS = new HttpParams().set('deptId', deptId)
      .set('divisionId', divisionId)
    const REQUEST_URI = this.ServerUrl + '/subInvMst/wipissue/';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,

    });
  }
  subInvCode1(): Observable<any> {
    return this.http.get(this.ServerUrl + `/subInvMst/wipissue`);
  }

  issueByList(locId, deptId, divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/empMst/EmpLocDept?locId=${locId}&divisionId=${divisionId}&deptId=${deptId}`)
  }
  issueByListNew(deptId,locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/empMst/mangerEmplList?deptId=${deptId}&locId=${locId}`)
  }

  getAlterNetItem(itemId): Observable<any> {
    return this.http.get(this.ServerUrl + `/relateditems/relItems/${itemId}`)
  }

  paintColorCodeList(divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/onlyPn/${divisionId}`)
  }

  paintPanelCodeList(divisionId,cmtype): Observable<any> {
    // http://localhost:8081/cmnLookup/CmnTypeDivision?cmnType=Panel&divisionId=1
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnTypeDivision?cmnType=${cmtype}&divisionId=${divisionId}`)
  }

  ItemIdList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/itemMst/category');
  }
  ItemIdDivisionList(divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/SpAcItems/${divisionId}`);
  }
  getfrmSubLoc(locId, invItemId, subInventoryId): Observable<any> {
    // alert ("ms >> subInventoryId :" +subInventoryId);
    return this.http.get(this.ServerUrl + `/onhandqty/onhandlocsubinv?locId=${locId}&itemId=${invItemId}&subInventoryId=${subInventoryId}`)
  }
  getWIPrice(locId, invItemId, subInventoryId, repNo, divId, deptId): Observable<any> {
    // alert ("ms >> subInventoryId :" +subInventoryId);
    return this.http.get(this.ServerUrl + `/onhandqty/onhandlocsubinv3?locId=${locId}&itemId=${invItemId}&subInventoryId=${subInventoryId}&repairNo=${repNo}&divisionId=${divId}&deptId=${deptId}`)
  }
  getfrmSubLocPrice(locId, invItemId, subInventoryId): Observable<any> {
    return this.http.get(this.ServerUrl + `/onhandqty/onhandlocPrc?locId=${locId}&itemId=${invItemId}&subInventoryId=${subInventoryId}`)
  }
  getItemLoc(locId, subInventoryId, invItemId): Observable<any> {
    // alert ("ms >> subInventoryId :" +subInventoryId);
    return this.http.get(this.ServerUrl + `/itemlctrmst/byLocSubItem?locId=${locId}&subInventoryId=${subInventoryId}&itemId=${invItemId}`)
  }
  getSearchByTrans(reqNo): Observable<any> {

    return this.http.get(this.ServerUrl + `/mtrlIssue/reqNum/${reqNo}`)

  }

  getItemDetail(itemid): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/${itemid}`)
  }
  ////////////WorkShop Return/////////////////
  transTypereturn(): Observable<any> {
    return this.http.get(this.ServerUrl + '/mtlTrxTypes/IPOReturn');
  }
  issueReturn(locId1): Observable<any> {
    return this.http.get(this.ServerUrl + `/mtrlIssue/wipjob?locId=${locId1}`);
  }
  returnBillableType(repno): Observable<any> {
    return this.http.get(this.ServerUrl + `/mtrlIssue/jobBillable?repairNo=${repno}`);
  }
  itemLst(jobno, typ, subId): Observable<any> {
    return this.http.get(this.ServerUrl + `/mtrlIssue/wipItems?jobNo=${jobno}&billable=${typ}&subInventoryId=${subId}`);
  }
  getsubInv(subId): Observable<any> {
    return this.http.get(this.ServerUrl + `/subInvMst/subinvname/${subId}`);
  }
  getdivsubInv(subId, divId): Observable<any> {
    return this.http.get(this.ServerUrl + `/subInvMst/subinvname?subInventoryCode=${subId}&divisionId=${divId}`);
  }

  getSearchByWorkReturn(reqNo): Observable<any> {

    return this.http.get(this.ServerUrl + `/mtrlIssue/reqNumRet/${reqNo}`)

  }


  getretfrmSubLoc(locId, itemId, subId, jobno): Observable<any> {
    return this.http.get(this.ServerUrl + `/onhandqty/onhandJobNo/?locId=${locId}&itemId=${itemId}&subInventoryId=${subId}&jobNo=${jobno}`);
  }
  /////////Subinventory/////////////
  public saveSubinventory(subInvRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/subInvMst';
    return this.http.post(url, subInvRecord, options);
  }

  public getSubInvSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/subInvMst');
  }

  UpdateSubInventory(SubinvRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + '/subInvMst');
    return this.http.put(url, SubinvRecord, options);
  }
  //////////Journal Voucher/////////////
  public glPost(glPostValue) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/glHeader';
    return this.http.post(url, glPostValue, options);
  }

  public glSave(glSaveValue) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/glHeader/Save';
    return this.http.post(url, glSaveValue, options);
  }

  public glUpdate(glUpdateValue) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/glHeader/putGlHeader';
    return this.http.put(url, glUpdateValue, options);
  }
  public glUpdateStatus(glUpdateStaValue, docSeqValue) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/glHeader/updateHeaderStatus?docSeqValue=${docSeqValue}`;
    return this.http.put(url, glUpdateStaValue, options);
  }

  public glCopy(glCopyValue) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/glHeader/Copy';
    return this.http.post(url, glCopyValue, options);
  }
  public glReverse(glReverseValue) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/glHeader/Reverse';
    return this.http.post(url, glReverseValue, options);
  }
  JournalType(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/JVType');
  }
  SerchBydocseqval(docseqval): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/docSeqValueWise/${docseqval}`);
  }
  lineStatus(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/glLinesStatus`);
  }


  //////////////////FlexField////////////////

  public flexFieldSubmit(FlexFieldRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/FlexHeader';
    return this.http.post(url, FlexFieldRecord, options);
  }



  applList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/fndAppl`);
  }

  getTitle(applId): Observable<any> {
    return this.http.get(this.ServerUrl + `/FlexHeader/applWise/${applId}`);
  }
  getFlexField(applid, titles): Observable<any> {
    return this.http.get(this.ServerUrl + `/FlexHeader/titleAndApp?applicationId=${applid}&title=${titles}`);
  }

  //////////////////Jai Regime Master////////////////
  regimeTypeLisFunt(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/JaiRegimeType');
  }
  getJaiRegimeSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/jairegime');

  }

  public JaiRegimeMasterSubmit(JaiRegimeMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/jairegime';
    return this.http.post(url, JaiRegimeMasterRecord, options);
  }

  UpdateJaiRegimeById(JaiRegimeMasterRecord, regimeId) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/jairegime/${regimeId}`);
    return this.http.put(url, JaiRegimeMasterRecord, options);
  }

  //////////////////////////TaxAccountMaster/////////////
  getTaxAccountSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/TaxAccounts');
  }

  public taxAccountMasterSubmit(taxAccountMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/TaxAccounts//TaxAcctIdPost';
    return this.http.post(url, taxAccountMasterRecord, options);
  }


  UpdatetaxAccountMasterById(taxAccountMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + '/TaxAccounts/TaxAcctIdPut');
    return this.http.put(url, taxAccountMasterRecord, options);
  }
  //////////////////////Tax Category Master //////////////////////
  // geActDetails(taxTypeCode): Observable<any> {
  //   return this.http.get(this.ServerUrl + `/taxType/acInfo/${taxTypeCode}`);
  //  }

  geActDetails1(mtaxTypeId): Observable<any> {
    return this.http.get(this.ServerUrl + `/taxType/taxTypeId/${mtaxTypeId}`);
  }
  getTaxCategorySearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/JaiTaxCatg');
  }

  selectTypewiseCategory(cateType): Observable<any> {
    return this.http.get(this.ServerUrl + `/JaiTaxCatg/taxCate/${cateType}`);
  }

  getsearchCategoryData(taxCategoryId): Observable<any> {
    return this.http.get(this.ServerUrl + `/JaiTaxCatg/${taxCategoryId}`);
  }

  public TaxCategoryMasterSubmit(TaxCategoryMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/JaiTaxCatg/TaxCatgPost';
    return this.http.post(url, TaxCategoryMasterRecord, options);
  }

  UpdateTaxCategoryMasterById(TaxCategoryMasterRecord, taxCategoryId) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/JaiTaxCatg/${taxCategoryId}`);
    return this.http.put(url, TaxCategoryMasterRecord, options);
  }
  ///////////////////////JAI TAX TYPE MASTER ///////////////////////
  getTaxTypeSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/taxType');
  }

  public jaiTaxTypeMasterSubmit(JaiTaxTypeMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/taxType';
    return this.http.post(url, JaiTaxTypeMasterRecord, options);
  }

  UpdateJaiTaxTypeMasterById(JaiTaxTypeMasterRecord, taxTypeId) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/taxType/${taxTypeId}`);
    return this.http.put(url, JaiTaxTypeMasterRecord, options);
  }

  //////  JAI TAX RATE       ///////
  getTaxRateSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/taxRates');
  }


  taxTypeIdList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/taxType');
  }

  // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\PRICE LIST MASTER\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  priceListIdList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/pricelist');
  }



  itemIdList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/itemMst');

  }

  itemNameList(itemId): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/${itemId}`);
  }


  priceDescList(priceListId): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist/${priceListId}`);
  }

  // http://localhost:8081/itemMst/itemName/HCL



  getItemDetailsByCode(itmCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/itemName/${itmCode}`);
  }

  getItemDetailsByCodeNew(itmCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/itemName1/${itmCode}`);
  }


  getDealerAMCLabStatus(regNo, labCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/jobCard/amcLabValidation?regNo=${regNo}&labCode=${labCode}`);
    // http://localhost:8081/jobCard/amcLabValidation?regNo=MH01DC0007&labCode=AMSR
  }


  /////////////////////////////////////////////////////////
  taxTypeNameList(taxTypeId): Observable<any> {
    if (taxTypeId > 0) {
      return this.http.get(this.ServerUrl + `/taxType/${taxTypeId}`);
    }
  }

  locationNameList(locCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/LocationCode/${locCode}`);
  }

  locationNameList1(locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/${locId}`);
  }

  regimeIdList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/jairegime');

  }

  thresholdTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/JAI_THRESHOLD_TYPE');

  }

  tdsVendorList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/JAI_TDS_VENDOR_TYPE');

  }

  tdsSectionList(): Observable<any> {
    // return this.http.get(this.ServerUrl +'/cmnLookup/type/JAI_TDS_SECTION');
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/JAI_TDS_SECTION');



  }

  tdsTaxCategoryList(): Observable<any> {
    // return this.http.get(this.ServerUrl +'/JaiTaxCatg');
    return this.http.get(this.ServerUrl + '/JaiTaxCatg/taxCate/TDS');
  }

  tdsTaxCategoryList1(): Observable<any> {
    // return this.http.get(this.ServerUrl +'/JaiTaxCatg');
    return this.http.get(this.ServerUrl + '/JaiTaxCatg/taxCate/TDS');
  }


  public jaiTaxRatesMasterSubmit(JaiTaxRatesMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/JaiTaxRates/TaxRatesPost';
    return this.http.post(url, JaiTaxRatesMasterRecord, options);
  }


  getJaiTaxRateSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/taxRates');

  }
  // UpdateJaiTaxRatesMasterById(JaiTaxRatesMasterRecord) {
  //   const options = {
  //     headers: this.headers
  //   };
  //   const url = (this.ServerUrl + '/JaiTaxRates/TaxRatesPut');
  //   return this.http.put(url, JaiTaxRatesMasterRecord, options);
  // }

  ////////////////////////Jai Tax Category Line //////////////////

  getJaiTaxCategoryLineSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/jaiCateLines');
  }

  public JaiTaxCategoryLineMasterSubmit(JaiTaxCategoryLineMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/jaiCateLines';
    return this.http.post(url, JaiTaxCategoryLineMasterRecord, options);
  }

  UpdateJaiTaxCategoryLineMasterById(JaiTaxCategoryLineMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/jaiCateLines`);
    return this.http.put(url, JaiTaxCategoryLineMasterRecord, options);
  }
  //////////////////////////////
  regimNameList(regimeId): Observable<any> {
    // alert("Regime Id: "+regimeId);
    if (regimeId > 0) {
      return this.http.get(this.ServerUrl + `/jairegime/${regimeId}`);
    }
  }



  LedgerList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/SSLedger');
  }

  UpdateJaiTaxRatesMasterById(JaiTaxRatesMasterRecord, taxRateId) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + '/JaiTaxRates/TaxRatesPut');
    return this.http.put(url, JaiTaxRatesMasterRecord, options);
  }

  public JaiTaxtypeMasterSubmit(JaiTaxtypeMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/jaiTaxType';
    return this.http.post(url, JaiTaxtypeMasterRecord, options);
  }


  getJaiTaxTypeSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/taxType');

  }

  ///////////GL CodeCombination//////////////
  branchlist(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_Branch');
  }

  locationlist(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_Location');
  }
  costcentre(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/CostCentre');
  }
  naturalaccount(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/NaturalAccount');
  }
  interbranch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_Interbranch');
  }
  getnaturalaccount(naturalAccount1): Observable<any> {
    return this.http.get(this.ServerUrl + `/fndAcctLookup/lookupValueWise/${naturalAccount1}`);
  }
  getbranch(branch1): Observable<any> {
    return this.http.get(this.ServerUrl + `/fndAcctLookup/lookupValueWise/${branch1}`);
  }
  getloc(loc1): Observable<any> {
    return this.http.get(this.ServerUrl + `/fndAcctLookup/lookupValueWise/${loc1}`);
  }
  getcostCentre(costCentre1): Observable<any> {
    return this.http.get(this.ServerUrl + `/fndAcctLookup/lookupValueWise/${costCentre1}`);
  }
  // getInterBranch(InterBranch1):Observable<any>{
  //   return this.http.get(this.ServerUrl + `/fndAcctLookup/lookupTypeValueWise?lookupType=SS_InterBranch& +${InterBranch1}`);
  // }
  glCodeCombinationSubmit(glcodecmbnmstRecord) {
    const comb = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/glCodeCmbn/GlCodeCombinations'
    return this.http.post(url, glcodecmbnmstRecord, comb)
  }
  getGlCodeCombinationSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/glCodeCmbn');
  }
  UpdateGlMasterById(GlMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/glCodeCmbn`);
    return this.http.put(url, GlMasterRecord, options);
  }

  cityList1(city): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/lookup?codeDesc=${city}&cmnType=City`);
  }
  // receipt service

  getLocatorPoLines(locatorDesc, locId, subinventoryId): Observable<any> {
    // return this.http.get(this.ServerUrl + `/lctrmst/nameandloc?segmentName=${locatorDesc}&locId=${locId}`);
    return this.http.get(this.ServerUrl + `/lctrmst/nameandloc?segmentName=${locatorDesc}&locId=${locId}&subinventoryId=${subinventoryId}`)
  }


  getsearchByPOlines(segment1): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvShipment/rcv/${segment1}`);
  }

  receiptnotdonetaxDeatils(trxId, trxLineId): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvShipment/trxLineDet?trxId=${trxId}&trxLineId=${trxLineId}&updVenOnTransaction=PO_TRANSACTION`);
  }

  receiptdonetaxDeatils(trxId, trxLineId): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvShipment/trxLineDet?trxId=${trxId}&trxLineId=${trxLineId}&updVenOnTransaction=RCV_TRANSACTION`);
  }



  getsearchByReceiptNo(segment1, mLocId): Observable<any> {
    // alert ("Receipt/Rtn No :"+segment1  +","+mLocId);
    return this.http.get(this.ServerUrl + `/rcvShipment/receiptNoWise?receiptNo=${segment1}&billToLocId=${mLocId}`);
    // http://localhost:8081/rcvShipment/rtvReceiptNoWise?receiptNo=52121101119&shipFromLocId=121
  }

  getsearchByGlReceiptNo(segment1): Observable<any> {
    // alert ("Receipt/Rtn No :"+segment1  +","+mLocId);
    return this.http.get(this.ServerUrl + `/rcvShipment/receiptNo?receiptNo=${segment1}`);
    // http://localhost:8081/rcvShipment/rtvReceiptNoWise?receiptNo=52121101119&shipFromLocId=121
  }
  uploadVehBookings(formData: FormData) {
    return this.http.post(this.ServerUrl + `/Proforma/upload/bookings`, formData)
  }






  printRTVdocument(mRtnNumber) {
    const REQUEST_URI = this.ServerUrl + `/rcvShipment/printRTV/${mRtnNumber}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  printShortLandClaimdocument(mRtnNumber) {
    const REQUEST_URI = this.ServerUrl + `/rcvShipment/RTVPrint/${mRtnNumber}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });

    // http://localhost:8081/rcvShipment/RTVPrint/22221024400558
  }

  getsearchByReceiptNo1(segment1, mLocId): Observable<any> {
    // return this.http.get(this.ServerUrl + `/rcvShipment/receiptNoWise/${segment1}`);
    return this.http.get(this.ServerUrl + `/rcvShipment/receiptNoWise?receiptNo=${segment1}&shipFromLocId=${mLocId}`);

  }


  getsearchByReceiptNoLine(mPoNumber, mRcptNumber): Observable<any> {
    // alert("Po/Rct :"+mPoNumber +","+mRcptNumber);
    return this.http.get(this.ServerUrl + `/rcvShipment/rtvSearch?segment1=${mPoNumber}&receiptNo=${mRcptNumber}`);
  }

  
//////////////////////////////////SHORT LANDED CLAIM SAVE///////////////////////////////////////////////////////////

public shortLandedClaimSave(rtvRecord) {
  const options = {
    headers: this.headers
  };
  const url = this.ServerUrl + '/rcvShipment/ShortLanded';
  return this.http.post(url, rtvRecord, options);
}
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\PRICE LIST MASTER\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\




  public PoReceiptReturnSubmit(PoReceiptRtnrRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/rcvShipment/rtvPost';
    // http://localhost:8081/rcvShipment/rtvPost
    return this.http.post(url, PoReceiptRtnrRecord, options);
  }



  public poDateWiseFind(content) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/rcvShipment/DatewisePODto';
    // const url = this.ServerUrl + '/rcvShipment/rcvPoDate';
    return this.http.post(url, content, options);
  }


  POApproveDateWise(poDate, locId) {
    return this.http.get(this.ServerUrl + `/rcvShipment/rcvPoDate?poDate=${poDate}&billToLoc=${locId}`);
  }


  public receiptDateWiseFind(content) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/rcvShipment/DatewiseReceiptDto';
    return this.http.post(url, content, options);
  }

  getsearchByRcvSupp(rcvSupp1): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvShipment/rcvSupp1/${rcvSupp1}`);
  }

  viewAccounting1(receiptNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/receiptNoWise/${receiptNo}`);
  }

  // viewAPAccounting(invoiceNum): Observable<any> {
  //   return this.http.get(this.ServerUrl + `/glHeader/apInv?invoiceNum=${invoiceNum}`);
  // }

   viewAPAccounting(invoiceNum,suppId): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/apInv?invoiceNum=${invoiceNum}&suppId=${suppId}`);
  }



  viewPayAccounting(invoiceNum): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/docSequenceValue/${invoiceNum}`);
  }
  getsearchByshipmentNo(shipmentNo, locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvShipment/shipmentNo?shipmentNumber=${shipmentNo}&shipFromLocId=${locId}`);
  }


  viewAccountingCSRev(ordNum): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/arInv/${ordNum}`);
    // http://localhost:8081/glHeader/arInv/202110112239
  }



  public poinvCre(segment1) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/apInv/inserDtls/${segment1}`;
    return this.http.post(url, segment1, options);
  }


  poAllRecFind(segment1, billToLoc): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvShipment/findByPONumber?segment1=${segment1}&billToLoc=${billToLoc}`);
  }




  downloadgrrPrint(receiptNo): Observable<any> {
    //  const REQUEST_URI = `http://saihorizon.com:8080/ErpReplica//rcvShipment/POReceipt/${receiptNo}`;
    // local
    const REQUEST_URI = this.ServerUrl + `/rcvShipment/POReceipt/${receiptNo}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  delearCodeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/DealerMst');
  }

  getInterBranch(InterBranch1, lType): Observable<any> {

    const REQUEST_PARAMS = new HttpParams().set('lookupType', lType).set('lookupValue', InterBranch1)
    const REQUEST_URI = this.ServerUrl + '/fndAcctLookup/lookupTypeValueWise';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,

    });
  }

  getInterBranchNatural(): Observable<any> {
    return this.http.get(this.ServerUrl + '/naturalAcc/Payable');
  }

  getInterBranchNewApi(naturalAccout): Observable<any> {
    return this.http.get(this.ServerUrl + `/naturalAcc/interBranch/${naturalAccout}`);
  }


  lookupNameList(mlookupValue, mlookupType) {
    // alert('servie=call');
    const REQUEST_PARAMS = new HttpParams().set('lookupType', mlookupType)
      .set('lookupValue', mlookupValue)

    const REQUEST_URI = this.ServerUrl + '/fndAcctLookup/lookupTypeValueWise';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,

    });
  }

  public poSaveSubmit(poRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/rcvShipment';
    return this.http.post(url, poRecord, options);

  }

  //////////////////////////////////RTV///////////////////////////////////////////////////////////

  public rtvSaveSubmit(rtvRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/rcvShipment/rtvPost';
    return this.http.post(url, rtvRecord, options);
  }
  // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\PRICE LIST MASTER\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  PriceTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/PriceListType');
  }

  PriceSubTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/PriceListSubType');
  }


  // PriceListIdList(): Observable<any> {
  //   return this.http.get(this.ServerUrl +'/pricelist');

  // }


  PriceListIdList(mOuId, mDivId): Observable<any> {
    // return this.http.get(this.ServerUrl +'/pricelist');
    return this.http.get(this.ServerUrl + `/pricelist/priceHdr?ouId=${mOuId}&divisionId=${mDivId}`);
    // http://localhost:8081/pricelist/priceHdr?ouId=101&divisionId=2
  }






  // getPriceListSearch(): Observable<any> {
  //   return this.http.get(this.ServerUrl +`/pricelist/prcline/${priceListHeaderId}`);
  //  }

  public PriceListMasterSubmit(PriceListMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/pricelist';
    return this.http.post(url, PriceListMasterRecord, options);
  }

  UpdatePriceListById(PriceListMasterRecord, priceListHeaderId) {
    // alert("PL HEADER ID : "+priceListHeaderId);
    const options = {
      headers: this.headers
    };
    // const url = (this.ServerUrl + `/pricelist/${priceListHeaderId}`);
    const url = (this.ServerUrl + `/pricelist`);
    return this.http.put(url, PriceListMasterRecord, options);
  }

  UpdatePriceListByIdHeader(PriceListMasterRecord, priceListHeaderId) {
    // alert("PL HEADER ID : "+priceListHeaderId);
    const options = {
      headers: this.headers
    };
    // const url = (this.ServerUrl + `/pricelist/${priceListHeaderId}`);
    // URL - http://localhost:8081/pricelist/prcheader
    const url = (this.ServerUrl + `/pricelist/prcheader`);
    return this.http.put(url, PriceListMasterRecord, options);
  }


  public OrderTypeMasterSubmit(OrderTypeMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/OrderTrnType';
    return this.http.post(url, OrderTypeMasterRecord, options);
  }

  UpdateOrderTypeMasterById(OrderTypeMasterRecord, transactionTypeId) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/OrderTrnType/${transactionTypeId}`);
    return this.http.put(url, OrderTypeMasterRecord, options);
  }

  getPriceListSearch(ouId, divId): Observable<any> {
    // return this.http.get(this.ServerUrl + '/pricelist');
    return this.http.get(this.ServerUrl + `/pricelist/prcListDto?ouId=${ouId}&divisionId=${divId}`);
  }

  getPriceListHistorySearch(priceListId, itemId): Observable<any> {
    // alert("MS>>PL ID="+priceListId + " item id="+itemId);
    return this.http.get(this.ServerUrl + `/priceHistory/itemhist?priceListHeaderId=${priceListId}&itemId=${itemId}`);
  }

  searchByItemDetails(segment): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/details/${segment}`);
  }

  getPriceListSearchNew(ouId, divisionId): Observable<any> {
    // alert("MS>>PL ID="+priceListId + " item id="+itemId);
    return this.http.get(this.ServerUrl + `/pricelist/priceHdr?ouId=${ouId}&divisionId=${divisionId}`);
  }

  getLineDetails(priceListHeaderId): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist/priceDtl?priceListHeaderId=${priceListHeaderId}`);
  }

  getLineDetailsSingleItem(plName, itmId): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist/ItmPrcList/?priceListName=${plName}&itemId=${itmId}`);
    // http://localhost:8081/pricelist/ItmPrcList/?priceListName=Bajaj Regular MRP&itemId=544
  }

  getLineDetailsSingleItemNew(plName, mSeg): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist/ItmPrcListNew/?priceListName=${plName}&segment=${mSeg}`);

    //  http://localhost:8081/pricelist/ItmPrcListNew?priceListName=Bajaj Regular MRP&segment=JX402222
  }


  getLineDetailsWithItemBatchCode(plName, itmId, bCode): Observable<any> {
    // alert("Pl,itmid,bcode : "+plName+" , "+itmId +" , "+bCode);
    return this.http.get(this.ServerUrl + `/pricelist/ItmPrcBatch/?priceListName=${plName}&itemId=${itmId}&batchCode=${bCode}`);
    // http://localhost:8081/pricelist/ItmPrcBatch/?priceListName=Bajaj%20Regular%20MRP&itemId=3382&batchCode=
  }


  public OrderGenNewItemSubmit(locId, itemCode, mths, ordNum, dlrCd, plHd) {
    // alert ("in  OrderGenNewItemSubmit -"+itemCode);
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/spareOrder/addCons?locId=${locId}&itemCode=${itemCode}&months=${mths}&p_order=${ordNum}&dlrCode=${dlrCd}&priceListHeaderId=${plHd}`;
    return this.http.post(url, options);
  }

  getNewLineConsDetails(itmId, orderNum): Observable<any> {
    return this.http.get(this.ServerUrl + `/spareOrder/ByOrderItem?&itemId=${itmId}&orderNumber=${orderNum}`);
  }

  // POST - http://localhost:8081/spareOrder/addCons?locId=2102&itemCode=DK73012V&months=3&orderNumber=BJ-2102100022

  //  GET - http://localhost:8081/spareOrder/ByOrderItem?itemId=29649&orderNumber=BJ-2102100022


  ////////////////////////////OrderTypeMaster//////////////////
  UpdateOrderTypeMasterById1(OrderTypeMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/OrderTrnType`);
    return this.http.put(url, OrderTypeMasterRecord, options);
  }

  getOrderTypeSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/OrderTrnType');

  }
  InvSourceList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/InvoiceSource');
  }
  OrderCategoryList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/OrderCategory');
  }

  ///////////////////////// AR RECEIPT  //////////////////////////////////////

  CustomerList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/Customer');
  }

  // CustomerSiteList(customerId: any): Observable<any> {
  //   return this.http.get(this.ServerUrl +`/Customer/${customerId}`);
  // }



  ReceiptTypeArList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/ArReceiptType');
    // cmnLookup/type/ReceiptStatus
  }


  ReceiptStatusList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/ReceiptStatus');
    // cmnLookup/type/ReceiptStatus
  }

  ReceiptStateLst(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/CmnType/ReceiptState');
    // http://localhost:8081/cmnLookup/CmnType/ReceiptState
  }


  ReverseReasonList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/CmnType/ReversalReason');
  }

  RcptReverseReasonList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/CmnType/RcptRevReason');
  }

  RcptChqBounceReasonList(chqBncRsn): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/${chqBncRsn}`);
    // http://localhost:8081/cmnLookup/CmnType/ChqBncRsn
  }

  RcptChqBounceReasonListNew(ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/chqBounceReason/reasonList/${ouId}`);
    //  http://localhost:8081/chqBounceReason/reasonList/21

  }


  RefReasonLst(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/CmnType/REFUND_REASON');
  }


  GLperiod(): Observable<any> {
    return this.http.get(this.ServerUrl + '/glPeriod/currentMonthPeriod');
  }

  public ArReceiptSubmit(ArReceiptRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/arCashReceipts/ArReceipt';
    return this.http.post(url, ArReceiptRecord, options);
  }

  // ReverseArReceipt

  ReverseArReceiptSubmit(ArReceiptReversalRecord) {
    // alert( "MS >> AR RECEIPT REVERSAL" +ArReceiptReversalRecord);
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/arCashReceipts/ArReceiptReversal`);
    return this.http.put(url, ArReceiptReversalRecord, options);
    // http://localhost:8081/arCashReceipts/ArReceiptReversal

    // http://localhost:8081/arCashReceipts/ArReceiptReversal--PUT METHOD
  }


  ////////////////////////// RECEIPT APPLICATION /////////////////////
  public ArReceipApplySubmit(ArReceiptApplyRecord, mRcptNo) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/arCashReceipts/apply/inv/${mRcptNo}`);
    return this.http.post(url, ArReceiptApplyRecord, options);
  }
  ////////////////////////// UNAPPLY///////////////////////////////////////

  UnApplyArReceiptSubmit(ArReceiptUnApplyRecord, mRcptNo) {
    // alert( "MS >> AR RECEIPT REVERSAL" +ArReceiptReversalRecord);
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/arCashReceipts/unapplyRcptManNew/${mRcptNo}`);
    return this.http.put(url, ArReceiptUnApplyRecord, options);
    // http://localhost:8081/arCashReceipts/unapplyRcptManNew/{receiptNumber}
  }


  public ArPaymentOtherDetPost(arPayOthRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/arCashReceipts/arOthReceiptDet';
    return this.http.post(url, arPayOthRecord, options); 
  }




  ////////////////////////// RECEIPT REFUND SUBMIT /////////////////////
  public ArReceiptRefundSubmit(ArReceiptRefundRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/arCashReceipts/ArReceiptRef';
    return this.http.post(url, ArReceiptRefundRecord, options);
  }
  ////////////////////////// ///////////////////////////////////////





  getArReceiptSearchByRcptNo(rcptNumber, ouId): Observable<any> {
    if (rcptNumber != undefined || rcptNumber != null) {
      return this.http.get(this.ServerUrl + `/arCashReceipts/Search?receiptNumber=${rcptNumber}&orgId=${ouId}`);
    }

  }


  gatePassStatusCheck(soNumber): Observable<any> {
      return this.http.get(this.ServerUrl + `/orderHeader/getSaleOrder/${soNumber}`);
     // http://localhost:8081/orderHeader/getSaleOrder/222220910400034
  }

  


  getArReceiptSearchByRcptNoByloc(rcptNumber, ouId, locId, deptId): Observable<any> {
    // alert ("MS >> dept Id : " +deptId)
    if (rcptNumber != undefined || rcptNumber != null) {
      return this.http.get(this.ServerUrl + `/arCashReceipts/Search/${deptId}?receiptNumber=${rcptNumber}&orgId=${ouId}&locId=${locId}`);
      //  return this.http.get(this.ServerUrl + `/arCashReceipts/Search?receiptNumber=${rcptNumber}&orgId=${ouId}&locId=${locId}`);
    }
  }

  SearchRcptByDate(rcptDate, ouId, locId, deptId): Observable<any> {
    // old >> return this.http.get(this.ServerUrl + `/arCashReceipts/Search?receiptDate='${rcptDate}'&orgId=${ouId}&locId=${locId}`)
    return this.http.get(this.ServerUrl + `/arCashReceipts/Search/${deptId}?receiptDate='${rcptDate}'&orgId=${ouId}&locId=${locId}`)
  }


  SearchRcptByCustNo(custActNo, ouId, locId, deptId): Observable<any> {
    //old>> return this.http.get(this.ServerUrl + `/arCashReceipts/Search?accountNo=${custActNo}&orgId=${ouId}&locId=${locId}`);
    return this.http.get(this.ServerUrl + `/arCashReceipts/Search/${deptId}?accountNo=${custActNo}&orgId=${ouId}&locId=${locId}`);

  }

  getArReceiptDetailsByRcptNo(rcptNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/arCashReceipts/receipt/${rcptNumber}`);
  }

  getArReceiptDetailsByRcptNoAndloc(rcptNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/arCashReceipts/receipt/${rcptNumber}?locId=` + sessionStorage.getItem('locId'));
  }



  getArReceiptDetailsByRcptNoAndlocDeptIDAccou(rcptNumber, locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/arCashReceipts/receipt/${rcptNumber}?locId=` + locId);
  }


  getArReceiptAppliedHistory(rcptNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/arCashReceipts/receipt/${rcptNumber}`);
  }



  getArReceiptSearchByInvoiceNo(custAccountNo, billToSiteId, rcptNo, loginDeptId): Observable<any> {
    // alert("MS>>RCPT NO -getArReceiptSearchByRcptNo: CustActNo " +custAccountNo +'billToSiteId:'+billToSiteId );
    return this.http.get(this.ServerUrl + `/arCashReceipts/apply/inv?recepitNo=${rcptNo}&custAccountNo=${custAccountNo}&billToSiteId=${billToSiteId}&loginDeptId=${loginDeptId} `);

  }


  getCreditMemoSearchByInvoiceNo(custAccountNo, billToSiteId, crMemoNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/arCashReceipts/apply/cm?creditNo=${crMemoNo}&custAccountNo=${custAccountNo}&billToSiteId=${billToSiteId}`);
    // http://localhost:8081/arCashReceipts/apply/cm?creditNo=12121101817&custAccountNo=1212&billToSiteId=101
  }


  viewAccountingArReceipt(receiptNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/docSequenceValue/${receiptNo}`);
    // http://localhost:8081/glHeader/docSequenceValue/212121110100075
  }

  ////////////////////////// CREDIT MEMO APPLICATION /////////////////////
  public CreditMemmoApplySubmit(creditMemoApplyRecord, mCrmNo) {
    // alert("MS >> " + mCrmNo);
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/arInv/apply/inv/${mCrmNo}`);
    return this.http.post(url, creditMemoApplyRecord, options);

    // http://localhost:8081/arInv/apply/inv/12121101820
  }
  ////////////////////////// ///////////////////////////////////////


  PaymentModeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/PayType');
  }

  PaymentModeListPP(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/PP_PayType');
  }

  ReceiptMethodList(mPaytype, mLocId, mStatus): Observable<any> {
    // alert("Master Service :"+ mPaytype+" "+mLocId+" " +mStatus);
    return this.http.get(this.ServerUrl + `/receiptMethod?methodType=${mPaytype}&locId=${mLocId}&status=${mStatus}`);
  }

  ReceiptMethodListNew(mPaytype, mStatus, deptId, mOrgId): Observable<any> {
    return this.http.get(this.ServerUrl + `/receiptMethod/rctMethodDeptwise?methodType=${mPaytype}&status=${mStatus}&attribute2=${deptId}&orgId=${mOrgId}`);
    // http://localhost:8081/receiptMethod/rctMethodDeptwise?methodType=CASH&status=Active&attribute2=1&orgId=22

    // http://saihorizon.com:8051/ErpReplica/receiptMethod/rctMethodDeptwise?methodType=CHEQUE&status=5&attribute2=21&orgId=Active
  }

  ///////////////////////////AVERAGE COST UPDATE//////////////////////////

  avgCurrentCost(mitemId, mLocId): Observable<any> {
    // alert("Master Service :"+ mitemId+" ,"+mLocId);
    return this.http.get(this.ServerUrl + `/averageCost/avgLocItem?locationId=${mLocId}&itemId=${mitemId}`);
  }

  public AvgCostUpdateSubmit(AvgCostUpdateRecord) {
    // alert('in service')
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/averageCost';
    return this.http.post(url, AvgCostUpdateRecord, options);
  }

  // getAvgHistoryList
  getAvgHistoryList(mLocId, mitemId, frmDate, toDate): Observable<any> {
    // alert("Master Service :"+ mLocId+","+mitemId+" ,"+frmDate+","+toDate);
    return this.http.get(this.ServerUrl + `/averageCost/avghistory?locationId=${mLocId}&itemId=${mitemId}&startDate=${frmDate}&endDate=${toDate}`);
  }

  ///////////////////Price list File upload/////////////////////
  UploadExcel(formData: FormData, docType: string, uploadPlName: string) {
    let headers1 = new HttpHeaders();
    var userId1 = sessionStorage.getItem('userId');
    console.log(docType);
    var docType1 = formData.get('docType');
    formData.append('priceListName', uploadPlName);
    return this.http.post(this.ServerUrl + `/fileImport/uploadBJprc`, formData)
  }

  ////////////////////////////// Price list File upload /////////

  ///////////////////Back order File upload/////////////////////
  UploadExcelBackOrderBajaj(formData: FormData, docType: string, mlocId) {
    let headers1 = new HttpHeaders();
    var userId1 = sessionStorage.getItem('userId');
    console.log(docType);
    var docType1 = formData.get('docType');
    formData.append('locId', mlocId);
    return this.http.post(this.ServerUrl + `/fileImport/uploadbkord`, formData)
    // http://localhost:8081/fileImport/uploadbkord
  }
  ////////////////////////////// Back order File upload /////////



  orderCancellationUpload(formData: FormData, emplId,receiptMethodName) {
    // alert(emplId);
    // alert ("Org Id :"+mouId + "  BankAccountId :"+bnkAcccountId);
    let headers1 = new HttpHeaders();
    formData.append('empId', emplId);
    formData.append('bankAc', receiptMethodName);
    return this.http.post(this.ServerUrl + `/Proforma/cancel/bookings`, formData)
    // http://localhost:8081/fileImport/uploadBankStmt/
  }

  public orderGenBajaj(ordeGenRecord, mLocId, mths, dlrCd, plHd, ordNum) {
    // alert (  "MS>> Loc Id :" +mLocId + " ," +mths);
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/spareOrder?locId=${mLocId}&months=${mths}&dlrCode=${dlrCd}&priceListHeaderId=${plHd}&p_order=${ordNum}`;
    return this.http.post(url, ordeGenRecord, options);
  }



  getOrderListBajaj(ordNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/spareOrder/ByOrderNumber/${ordNumber}`);
    // http://localhost:8081/spareOrder/ByOrderNumber/BJ-2102100035
  }

  getOrderNumberLatest(mLocId): Observable<any> {
    return this.http.get(this.ServerUrl + `/spareOrder/Order?locId=${mLocId}`);
    // http://localhost:8081/spareOrder/Order?locId=2102
  }



  orderLineDelete(ordNumber, itemId) {
    return this.http.delete(this.ServerUrl + `/spareOrder/removeLine?OrderNumber=${ordNumber}&itemId=${itemId}`);
  }

  OrderLineAddUpdate(orderLineRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/spareOrder/addLine`);
    return this.http.post(url, orderLineRecord, options);

    // http://localhost:8081/spareOrder/addLine
  }





  ///////////////////////////////////////////////////////////////////////////////////
  // bulkpouploadSales(formData: FormData) {
  //     return this.http.post(this.ServerUrl + `/fileImport/uploadVhPO`, formData)
  //   }

  bulkpouploadSales(formData: FormData, locCode, suppNo, supplierSite, username) {
    formData.append('location', locCode);
    formData.append('supplierNo', suppNo);
    formData.append('suppSite', supplierSite);
    formData.append('userName', username);
    const REQUEST_URI = this.ServerUrl + '/fileImport/uploadVhPO';
    return this.http.post(REQUEST_URI, formData);
  }


  bulkpouploadSalesVhiecleAndAddonItem(formData: FormData,file, addonFile,emplId,priceListName) {
    formData.append('file', file);
    formData.append('addonFile', addonFile);
    formData.append('emplId', emplId);
    formData.append('priceListName', priceListName);
    const REQUEST_URI = this.ServerUrl + `/orderHeader/uploadVehiclePriceList`;
    return this.http.post(REQUEST_URI, formData);
  }


  // bulkpouploadSalesVhiecleAndAddonItem(file,addonfile,empId,priceListName) {
  //   return this.http.get(this.ServerUrl + `/orderHeader/uploadVehiclePriceList?file=${file}&addonfile=${addonfile}&empId=${empId}&priceListName=${priceListName}`)
  // }

  pendingPOList(emplId) {
    return this.http.get(this.ServerUrl + `/poHdr/user/All?userId=${emplId}`)
  }

  getPOByUser(emplId, startDt, endDt, locId) {
    return this.http.get(this.ServerUrl + `/poHdr/byDate?userId=${emplId}&startDt=${startDt}&endDt=${endDt}&locId=${locId}`)
  }

  getsearchApInvList(ouId, startDt, endDt) {
    return this.http.get(this.ServerUrl + `/apInv/SearchDateWise?orgId=${ouId}&frmInvoiceDate=${startDt}&toInvoiceDate=${endDt}`)
  }

  getPOByUserAccc(deptId, startDt, endDt, locId) {
    return this.http.get(this.ServerUrl + `/poHdr/Acc/byDate?deptId=${deptId}&startDt=${startDt}&endDt=${endDt}&locId=${locId}`)
  }

  getOrderByUser(locId, startDt, endDt, deptId) {
    return this.http.get(this.ServerUrl + `/orderHeader/getByDate?locId=${locId}&startDt=${startDt}&endDt=${endDt}&dept=${deptId}`)
  }

  getemwayBill(startDt, endDt, locId, deptId) {
    return this.http.get(this.ServerUrl + `/arRecvTrx/EwayInv?fromDate=${startDt}&toDate=${endDt}&locId=${locId}&deptId=${deptId}`)
  }

  getemwayBillcustNo(startDt, endDt, locId, deptId, custAccNo) {
    return this.http.get(this.ServerUrl + `/arRecvTrx/EwayList?fromDate=${startDt}&toDate=${endDt}&locId=${locId}&custAccountNo=${custAccNo}`)
  }

  EwayBill(trxNumber) {
    const REQUEST_URI = this.ServerUrl + `/SparesReports/EwayBillRep?trxNumber=${trxNumber}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  getLaborByUser(ouId) {
    return this.http.get(this.ServerUrl + `/pricelist/laborPrice/${ouId}`)
  }

  getClosingStock(ouId) {
    return this.http.get(this.ServerUrl + `/orderHeader/onHandList/${ouId}`)
  }

  getSalesOrderByUser(locId, startDt, endDt, deptId) {
    return this.http.get(this.ServerUrl + `/orderHeader/getByDateOM?startDt=${startDt}&endDt=${endDt}&locId=${locId}&dept=${deptId}`)
  }

  getRtoDataList(startDt, endDt, ouId, locId) {
    return this.http.get(this.ServerUrl + `/orderHeader/getRTOList?fromDate=${startDt}&toDate=${endDt}&ouId=${ouId}&locId=${locId}`)
  }


  getModelWisePrice(orgId) {
    return this.http.get(this.ServerUrl + `/orderHeader/priceModelwise/${orgId}`)
  }

  bulkpouploadSpares(formData: FormData) {
    return this.http.post(this.ServerUrl + `/fileImport/uploadSpAcPO`, formData)
  }

  bulkpouploadSalesNew(formData: FormData) {
    return this.http.post(this.ServerUrl + `/fileImport/uploadNewItem`, formData)
  }
  bulkjvuploadCsv(formData: FormData, orgId, jeSrc, periodName, glDate) {
    formData.append('orgId', orgId);
    formData.append('jeSource', jeSrc);
    formData.append('period', periodName);
    formData.append('glDate', glDate);
    const REQUEST_URI = this.ServerUrl + '/fileImport/uploadSalJV';
    return this.http.post(REQUEST_URI, formData);

  }

  bulkPickTickCSVold(formData: FormData) {
    return this.http.post(this.ServerUrl + `/fileImport/uploadCS`, formData)
  }


  bulkPickTickCSV(formData: FormData, priceListName: string, taxCategoryName: string, subInventoryId, locationId, selSite) {
    formData.append('priceListName', priceListName);
    formData.append('taxCategoryName', taxCategoryName);
    formData.append('subInventoryId', subInventoryId);
    formData.append('locationId', locationId);
    formData.append('custInfo', selSite);
    const REQUEST_URI = this.ServerUrl + `/fileImport/uploadCS`;
    return this.http.post(REQUEST_URI, formData);
  }

  bulkpouploadSparesBajaj(formData: FormData, location: string, invcNo: string, supplierNo: string, suppSite: string, userName: string, invcDt1, priceListName: string) {
    formData.append('location', location);
    formData.append('invcNo', invcNo);
    formData.append('supplierNo', supplierNo);
    formData.append('suppSite', suppSite);
    formData.append('userName', userName);
    formData.append('invcDt1', invcDt1);
    formData.append('priceListName', priceListName);
    const REQUEST_URI = this.ServerUrl + '/fileImport/uploadBjSpPO';
    return this.http.post(REQUEST_URI, formData);
  }


  bulkpouploadPetrol(formData: FormData, location: string, invcNo: string, supplierNo: string, suppSite: string, userName: string, invcDt1, priceListName: string) {
    formData.append('location', location);
    formData.append('invcNo', invcNo);
    formData.append('supplierNo', supplierNo);
    formData.append('suppSite', suppSite);
    formData.append('userName', userName);
    formData.append('invcDt1', invcDt1);
    formData.append('priceListName', priceListName);
    const REQUEST_URI = this.ServerUrl + '/fileImport/uploadPetolPO';
    return this.http.post(REQUEST_URI, formData);
  }



  BindUser(): Observable<OPMasterDtoComponent[]> {
    var userId1 = sessionStorage.getItem('userId');
    return this.http.get<OPMasterDtoComponent[]>(this.ServerUrl + `/header/FileList?userId=` + userId1);
    // return this.http.get<HomePageComponent[]>(this.ServerUrl + `/header/FileList`);
  }
  //////////////////////////EXTENDED WARRANTY/////////////////////////////


  EwSourceList(): Observable<any> {
    //////
    return this.http.get(this.ServerUrl + '/cmnLookup/type/EWSource');
  }

  EwSchemeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/EWScheme');
  }

  EWSlabList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/EWSlab');
  }


  EwTypeList(divId): Observable<any> {
    // return this.http.get(this.ServerUrl +'/cmnLookup/type/EWType');
    return this.http.get(this.ServerUrl + `/cmnLookup/Catgtype?cmnType=EWType&divisionId=${divId}`);
    // http://localhost:8081/cmnLookup/Catgtype?cmnType=EWType&divisionId=2

  }

  EwCancelReasonList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/EW CANCEL REASON');
  }


  ModelVariantList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/Variant');
  }

  PremiumPeriodList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/EWPeriod');
  }

  getEWSchemeSearch(mOuId): Observable<any> {
    // alert("OUID ="+mOuId);
    return this.http.get(this.ServerUrl + `/EwScheme/ouEwScheme?ouId=${mOuId}`);
  }

  public SaiEwSchemeSubmit(EwSchemeMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/EwScheme/newscheme';
    return this.http.post(url, EwSchemeMasterRecord, options);
  }

  UpdateSaiEwScheme(EwSchemeMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/EwScheme`);
    return this.http.put(url, EwSchemeMasterRecord, options);
  }



  RegNoListFN(): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/regList/1`);
  }

  VehVinList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/vinList`);
  }

  getEWSlabDetailsByCodeDesc(mCode): Observable<any> {
    // alert("MS >> "+mCodeDesc);
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnTypeCode?code=${mCode}&cmnType=EWSlab`);
  }

  getSectionTdsDetailsByCode(mCode): Observable<any> {
    // alert("MS >> "+mCodeDesc);
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnTypeCode?code=${mCode}&cmnType=JAI_TDS_SECTION`);
  }

  EwSchemeItemList(mVariant, mOuId, mAging, mKms): Observable<any> {
    // alert(  "ms>>> "+ mVariant+","+mAging+","+mKms+","+mOuId);
    return this.http.get(this.ServerUrl + `/EwScheme/ewvariant?variant=${mVariant}&ouId=${mOuId}&aging=${mAging}&kms=${mKms}`);
  }

  getEWSchemeDetails(mSchemeId): Observable<any> {

    if (mSchemeId > 0) {
      // alert(mSchemeId );
      return this.http.get(this.ServerUrl + `/EwScheme/${mSchemeId}`);
    }
  }

  variantDetailsList(mVariant): Observable<any> {
    // alert(mVariant );
    return this.http.get(this.ServerUrl + `/VariantMst/VariantDesc/${mVariant}`);
  }

  getVariantList(): Observable<any> {
    // alert(mVariant );
    return this.http.get(this.ServerUrl + `/VariantMst/Variants`);
  }


  getVehRegDetails(mRegNumber): Observable<any> {
    // alert(mRegNumber );
    return this.http.get(this.ServerUrl + `/VehAddInfo/RegNo/${mRegNumber}`);
  }

  getVehRegDetailsNew(mRegNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/VehAddInfo/ws/RegNo/${mRegNumber}`);
    // http://localhost:8081/VehAddInfo/ws/RegNo/KL07BV4680
  }

  getVehRegDetail(RegNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/VehAddInfo/valwarr/${RegNo}`);
  }
  getVehDetailsByModelChassis(mdl, chas): Observable<any> {
    return this.http.get(this.ServerUrl + `/VehAddInfo/ws/mdlChs?mainModel=${mdl}&chassisNo=${chas}`);
    //http://localhost:8081/VehAddInfo/ws/mdlChs?mainModel=AVENGER&chassisNo=234568

  }




  getWsVehRegDetails(mRegNumber): Observable<any> {
    // alert("MS:>> " +mRegNumber );
    return this.http.get(this.ServerUrl + `/VehAddInfo/ws/RegNo/${mRegNumber}`);
  }

  getVehVinDetails(mVin): Observable<any> {
    // alert("master >> " +mVin );
    return this.http.get(this.ServerUrl + `/VehAddInfo/VinInfo/${mVin}`);
  }


  getEWCustomerSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + `/ewmaster`);
  }

  getEWCustomerSearchByEWNo(mEWNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/ewmaster/${mEWNo}`);
  }

  getVehicleOrderDetails(mOrderNumber): Observable<any> {
    // alert("ms order number>>"+mOrderNumber);
    return this.http.get(this.ServerUrl + `/SsMcpEnqMst/Sales/${mOrderNumber}`);
    // http://localhost:8081/SsMcpEnqMst/Sales/2111242168

  }

  getVehicleOrderDetailsNew(mOrderNumber): Observable<any> {
    // alert("ms order number>>"+mOrderNumber);
    return this.http.get(this.ServerUrl + `/SsMcpEnqMst/SalesEW/${mOrderNumber}`);
    //   http://localhost:8081/SsMcpEnqMst/SalesEW/21221014600015
  }


  getEWStatusVehcile(mRegno): Observable<any> {
    // alert("ms>>"+mRegno);
    return this.http.get(this.ServerUrl + `/ewmaster/ewvehicle/${mRegno}`);
  }

  getLastRunKms(mRegno): Observable<any> {
    // alert("ms>>"+mRegno);
    return this.http.get(this.ServerUrl + `/jobCard/lastKms?regNo=${mRegno}`);

  }

  // EwClaimedCheck(mRegno): Observable<any> {
  //   alert("ms>>"+mRegno);
  //   return this.http.get(this.ServerUrl + `/jobCard/ewjobNo?regNo=${mRegno}&billableTyName=Extended Warranty`);
  //    // http://localhost:8081/jobCard/ewjobNo?regNo=MH12EM6011&billableTyName=Extended Warranty

  // }
  EwClaimedCheck(mRegno): Observable<any> {
    // alert("ms>>"+mRegno);
    return this.http.get(this.ServerUrl + `/jobCard/ewjobNo?regNo=${mRegno}&billableTyName=Extended Warranty`);

  }


  public saveWSVehicle(wsVehicleDetails) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/VehAddInfo/ws';
    return this.http.post(url, wsVehicleDetails, options);
  }


  UpdateWsVehicleMaster(wsVehMasterRecord) {
    // alert ("in update...")
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/VehAddInfo/ws`);
    return this.http.put(url, wsVehMasterRecord, options);
    // const url = (this.ServerUrl + `/AccountTrf/ArSaveUpdate?docTrfNo=${docTrfNum}`);
  }



  public SaiEwCustomerSubmit(EwCustomerMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/ewmaster';
    return this.http.post(url, EwCustomerMasterRecord, options);
  }

  UpdateSaiEwCustomer(EwCustomerMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/ewmaster`);
    return this.http.put(url, EwCustomerMasterRecord, options);
  }

  ///////////////////////////// MCP /////////////////////////////////

  getMcpstatusVehcile(mRegno): Observable<any> {
    // alert("ms>>MCP status checking"+mRegno);
    return this.http.get(this.ServerUrl + `/SsMcpEnqMst/McpRegCheck/${mRegno}`);

    // http://localhost:8081/SsMcpEnqMst/McpRegCheck/MH12EM6011

  }


  public McpItemMasterSubmit(McpItemMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/McpItemMst';
    return this.http.post(url, McpItemMasterRecord, options);
  }

  UpdateMcpItemMaster(McpItemMasterRecord, mcpItemId) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/McpItemMst/${mcpItemId}`);
    return this.http.put(url, McpItemMasterRecord, options);
  }



  getMcpItemSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/McpItemMst');
  }

  getMcpPackageSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/PackageMst');
  }

  getMcpPackageSearchNew1(mPkgType, mFuelType, mOuId): Observable<any> {
    // alert("MS>>RCPT NO -getArReceiptSearchByRcptNo: RcptNo ,CustNo,RcptDate :" +rcptNumber +','+custActNo +','+rcptDate  );
    return this.http.get(this.ServerUrl + `/PackageMst/PkgTypeAndFuelType?packageType=${mPkgType}&fuelType=${mFuelType}&ouId=${mOuId}`);

  }

  getMcpPackageSearchNew2(mPkgNo, mFuelType, mOuId): Observable<any> {
    //  alert("MS>> " + mPkgNo +","+mFuelType+","+mOuId);
    return this.http.get(this.ServerUrl + `/PackageMst/PkgNoFuelOuId?packageNumber=${mPkgNo}&fuelType=${mFuelType}&ouId=${mOuId}`);
    //  http://localhost:8081//PackageMst/PkgNoFuelOuId?packageNumber=PKG00018&fuelType=Petrol&ouId=81
  }

  getMcpPackageSearchByPkgId(mPkgId): Observable<any> {
    return this.http.get(this.ServerUrl + `/PackageMst/${mPkgId}`);
  }

  getMcpPackagePriceDetails(mPkgNo, mFuelType, mPtype, mOuId, mVariant, mCustSite, mLocId): Observable<any> {
    // alert(mPkgNo +","+mFuelType+","+mPtype+","+mOuId+","+mVariant+","+mCustSite+","+mLocId);
    return this.http.get(this.ServerUrl + `/SsMcpEnqMst/McpPrcDetails?packageNumber=${mPkgNo}&fuelType=${mFuelType}&packageType=${mPtype}&ouId=${mOuId}&variantCode=${mVariant}&customerSiteId=${mCustSite}&locId=${mLocId} `);
  }

  getMcpPackageLineDetails(mPkgNo, mFuelType, mOuId, mVariant, mCustSite, mLocId): Observable<any> {
    // alert(mPkgNo +","+mFuelType+","+mOuId+","+mVariant+","+mCustSite+","+mLocId);
    return this.http.get(this.ServerUrl + `/SsMcpEnqMst/PkgLineDtls?packageNumber=${mPkgNo}&fuelType=${mFuelType}&ouId=${mOuId}&variantCode=${mVariant}&customerSiteId=${mCustSite}&locId=${mLocId} `);
  }


  public McpPackageMasterSubmit(McpPkgMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/PackageMst';
    return this.http.post(url, McpPkgMasterRecord, options);
  }

  // UpdatePriceListByIdMCP(PriceListMasterRecord,priceListHeaderId) {
  //   const options = {
  //     headers: this.headers
  //   };
  //   const url = (this.ServerUrl + `/pricelist`);
  //   return this.http.put(url, PriceListMasterRecord, options);
  // }

  UpdateMcpPackageMaster(McpPkgMasterRecord) {
    const options = {
      headers: this.headers
    };
    // const url = (this.ServerUrl + `/PackageMst/${mcpPkgId}`);
    const url = (this.ServerUrl + `/PackageMst`);
    return this.http.put(url, McpPkgMasterRecord, options);
  }


  mcpSchemeList(mRegNo, mKms): Observable<any> {
    // http://localhost:8081/SsMcpEnqMst/validPkgDtls?regNo=MH12EM6011
    return this.http.get(this.ServerUrl + `/SsMcpEnqMst/validPkgDtls?regNo=${mRegNo}&currKms=${mKms}`);
  }

  public McpEnquiryMasterSubmit(McpEnquiryMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/SsMcpEnqMst';
    return this.http.post(url, McpEnquiryMasterRecord, options);
  }





  getsearchByEnqNo(mEnqNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/SsMcpEnqMst/enqNo/${mEnqNo}`);
  }

  getsearchMcpEnqByRegNo(mRegNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/SsMcpEnqMst/enqRegNo/${mRegNo}`);
  }

  getValidMcpEnqList(mRegno): Observable<any> {
    // alert("ms>>MCP Enq No"+mEnqNo);
    return this.http.get(this.ServerUrl + `/McpEnrollMst/McpEnqList/${mRegno}`);
    // /McpEnrollMst/McpEnqList/MH12EM6011

  }
  getEnrolledMcpEnqList(mEnqNo): Observable<any> {
    // alert("ms>>MCP Enq No"+mEnqNo);
    return this.http.get(this.ServerUrl + `/McpEnrollMst/McpEnqDtls/${mEnqNo}`);
    // /McpEnrollMst/McpEnqList/MH12EM6011

  }


  ///////////// MCP ENROLLMENT POSTING
  public McpEnrollmentMasterSubmit(McpEnrollmentMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/McpEnrollMst';
    return this.http.post(url, McpEnrollmentMasterRecord, options);
  }

  getMcpEnrollmentSearch(mEnrollNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/McpEnrollMst/enrollmentNo//${mEnrollNo}`);
  }

  getMcpSearchByEnrollNo(mEnrollNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/McpEnrollMst/enrollmentNo/${mEnrollNo}`);
  }

  getMcpSearchByRegNo(mRegNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/McpEnrollMst/enrollSearchBy/${mRegNo}`);
  }

  ////////////////////////MCP ITEM MAPPING////////////////////////
  mcpItemMappingSearch1(mItemNum, mFtype, mSrvModel, mOuId): Observable<any> {
    return this.http.get(this.ServerUrl + `/SsErpItemMst/ItemSearch?itemNumber=${mItemNum}&serviceModel=${mSrvModel}&fuelType=${mFtype}&ouId=${mOuId}`);
  }

  public McpItemMappingSubmitLbr(McpItemMappingrRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/SsErpItemMst/ErpRelatedLabPost';
    return this.http.post(url, McpItemMappingrRecord, options);
  }

  public McpItemMappingSubmitMatrl(McpItemMappingrRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/SsErpItemMst/ErpRelatedMatPost';
    return this.http.post(url, McpItemMappingrRecord, options);
  }


  //  ------------------------MCP TERMINATION--------------------------

  mcpRegSearch(mRegNo, mEnrollNo): Observable<any> {
    // alert ("MS>> Registration No :"+mRegNo +"\nEnrollment No :"+mEnrollNo);
    if ((mEnrollNo == undefined || mEnrollNo == null) && (mRegNo != null)) {
      return this.http.get(this.ServerUrl + `/McpEnrollMst/mcpCancel?regNo=${mRegNo}`);
    }

    if ((mRegNo == undefined || mRegNo == null) && (mEnrollNo != null)) {
      return this.http.get(this.ServerUrl + `/McpEnrollMst/mcpCancel?enrollmentNo=${mEnrollNo}`);
    }

    if ((mRegNo != null) && (mEnrollNo != null)) {
      return this.http.get(this.ServerUrl + `/McpEnrollMst/mcpCancel?regNo=${mRegNo}&enrollmentNo=${mEnrollNo}`);
    }
  }


  mcpRegSearchByEnrollNo(mEnrollNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/McpEnrollMst/mcpCancel?enrollmentNo=${mEnrollNo}`);
  }


  McpCancelUpdate(McpCancelrRecord) {
    const options = {
      headers: this.headers
    };

    const url = (this.ServerUrl + `/McpEnrollMst/mcpCancByEnroll`);
    return this.http.put(url, McpCancelrRecord, options);

    // http://localhost:8081/McpEnrollMst/mcpCancByEnroll?enrollmentNo=ENR201-2&cancRsnId=461&refundAmt=6500
  }

  //////////////////////VARIANT MASTER////////////////////////////
  public VariantMasterSubmit(VariantMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/VariantMst';
    return this.http.post(url, VariantMasterRecord, options);
  }

  UpdateVariantMaster(VariantMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/VariantMst`);
    return this.http.put(url, VariantMasterRecord, options);
  }

  unappliedReceipt(rcptNumber): Observable<any> {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/arCashReceipts/unapplyRcptManually?receiptNumber=${rcptNumber}`);
    return this.http.put(url, rcptNumber, options);
  }

  mcpItemList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/McpItemMst');
  }

  //////////////////////// TAX THRESHOLD SETUP //////////////////

  public taxThresholdSetupSubmit(ThresholdSetupRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/jaiApTdsHdr';
    return this.http.post(url, ThresholdSetupRecord, options);
  }

  getThresholdSetup(): Observable<any> {
    return this.http.get(this.ServerUrl + '/jaiApTdsHdr');

  }
// //////////////////   PAINT Miscell Transaction //////////////////////////

TransactionTypemiscpPaint(): Observable<any> {
  return this.http.get(this.ServerUrl + `/mtlTrxTypes/stockAdj/9`);
}

  // //////////////////   Miscell Transaction //////////////////////////

  TransactionType(): Observable<any> {
    return this.http.get(this.ServerUrl + '/mtlTrxTypes/9');
  }
  TransactionTypemisc(): Observable<any> {
    return this.http.get(this.ServerUrl + `/mtlTrxTypes/stockAdj/9`);
  }
  TransactionTypeIC(): Observable<any> {
    return this.http.get(this.ServerUrl + `/mtlTrxTypes/IC/9`);
  }

  ReasonList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/mtlTransReasons');
  }

  PaintReasonList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/mtlTransReasons/paint');
  }

  reasonaccCode(locId, reason, costCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/mtlTransReasons/reason?locId=${locId}&reasonName=${reason}&costCode=${costCode}`)
  }
  TypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/StockAdjType');
  }


  WorkShopIcIssue(locId, type): Observable<any> {
    return this.http.get(this.ServerUrl + `/jobCard/icTypeJobList?locId=${locId}&icType=${type}`);
  }

  ItemIdList1(locationId, subInv): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/OnHandItemLst?locId= ${locationId}&subInvCode=${subInv}`)
  }
  getItemDetail11(locId, itemId, subInvCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/OnHandItemDtls?locId=${locId}&subInvCode=${subInvCode}&itemId=${itemId}`)
  }
  LocatorNameList(LocName, LocId, subinventoryId): Observable<any> {
    return this.http.get(this.ServerUrl + `/lctrmst/nameandloc?segmentName=${LocName}&locId=${LocId}&subinventoryId=${subinventoryId}`)
  }
  getCostDetail(locId, ItemId): Observable<any> {
    return this.http.get(this.ServerUrl + `/averageCost/avgLocItem?locationId=${locId}&itemId=${ItemId}`)
  }

  getCostDetailforWarranty(locId, ItemId): Observable<any> {
    return this.http.get(this.ServerUrl + `/averageCost/item/mrp?locationId=${locId}&itemId=${ItemId}`)
  }


  viewMiscnote(stkAdjustNumber) {
    // const REQUEST_URI = `http://saihorizon.com:8080/ErpReplica/rcvShipment/StkTransferNote/${shipmentNumber}`;
    // local
    const REQUEST_URI = this.ServerUrl + `/stockadj/stockAdjustVoucher/${stkAdjustNumber}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  getonhandqtySubinvLoc(locId, subId, Itemid): Observable<any> {
    return this.http.get(this.ServerUrl + `/onhandqty/onhandlocsubinv2?locId=${locId}&itemId=${Itemid}&subInventoryId=${subId}`)
    // http://localhost:8081/onhandqty/onhandlocsubinv2?locId=121&itemId=544&subInventoryId=42

  }

  getonhandqty(locId, subId, locatorId, Itemid): Observable<any> {
    // alert ("Locator Id :" +locatorId);
    return this.http.get(this.ServerUrl + `/onhandqty/locator?locationId=${locId}&subInventoryId=${subId}&locatorId=${locatorId}&itemId=${Itemid}`)
  }


  // getonhandqty(locatorId):Observable<any>
  // {
  //   return this.http.get(this.ServerUrl+`/onhandqty/locator?id=${locatorId}`)
  // }
  miscellaneousSubmit(miscRecord): Observable<any> {
    const options = {
      headers: this.headers
    }
    const url = this.ServerUrl + '/stockadj';
    return this.http.post(url, miscRecord, options);
  }

  miscSubmit(miscelRecord): Observable<any> {
    const options = {
      headers: this.headers
    }
    const url = this.ServerUrl + '/stockadj/misc';
    return this.http.post(url, miscelRecord, options);
  }

  paintMixingSaveSubmit(miscelRecord): Observable<any> {
    const options = {
      headers: this.headers
    }
    const url = this.ServerUrl + '/stockadj/PaintMixing';
    return this.http.post(url, miscelRecord, options);
  }




  approve(appmiscRecord): Observable<any> {
    const options = {
      headers: this.headers
    }
    const url = this.ServerUrl + '/stockadj/stkapprove';
    return this.http.post(url, appmiscRecord, options);
  }
  updateData(poRecord): Observable<any> {
    const options = {
      headers: this.headers
    }
    const url = this.ServerUrl + '/poHdr/updateBillHndOv';
    if (poRecord != undefined) {
      return this.http.put(url, poRecord, options);
    }
  }

  getSearchByNo(compNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/stockadj/compileNo/${compNo}`);
  }
  getSearchViewBycompNo(compNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/stockadj/compileall/${compNo}`)
  }
  getSearchViewByIc(compNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/stockadj/IC/${compNo}`)
  }
  getSearchBycompNo(compNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/stockadj/compileadj/${compNo}`);
  }
  getsearchByCompId(compileId, itemId): Observable<any> {
    return this.http.get(this.ServerUrl + `/cycleline?compileId=${compileId}&invItemId=${itemId}`);
  }
  miscellaneousUpdate(comId, cyclelinerecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/cycleline/${comId}`);
    return this.http.put(url, cyclelinerecord, options);
  }


  /////////////////////////////// PO INVOICE -TDS LINE /////////////////////////
  getTdsDetails(mInvoiceId): Observable<any> {
    // alert("MS>> "+mInvoiceId);
    return this.http.get(this.ServerUrl + `/apInv/apTdsDis?invId=${mInvoiceId}`);
    // http://localhost:8081/apInv/apTdsDis?invId=27
  }

  cancelApInvoice(mInvoiceId, mEmplId): Observable<any> {
    // return this.http.get(this.ServerUrl+`/apInv/apInvCancel?invNum=${mInvoiceId}&emplId=${mEmplId}`);
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/apInv/apInvCancel?invNum=${mInvoiceId}&emplId=${mEmplId}`);
    return this.http.put(url, options);

  }

  distributionLinesIn(invoiceNumber,suppNo,invoiceStatus): Observable<any> {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/apInv/distLinesBySuppNo?invNum=${invoiceNumber}&suppNo=${suppNo}&invoiceStatus=${invoiceStatus}`);
    return this.http.get(url, options);

  }


  openTDSTabFn(invNum,suppNo,status): Observable<any> {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/apInv/tdsLines?invNum=${invNum}&suppNo=${suppNo}&invoiceStatus=${status}`);
    return this.http.get(url, options);

  }

  getTdsTaxDetails(mItemId, mBaseAmt, mTaxCatId): Observable<any> {
    return this.http.get(this.ServerUrl + `/poHdr/potaxcal?itemId=${mItemId}&baseAmt=${mBaseAmt}&taxCateId=${mTaxCatId}`);
    // http://localhost:8081/poHdr/potaxcal?itemId=1&baseAmt=1000&taxCateId=14071
  }

  getPOReceiptSearchByRcptNo(mReceiptNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvShipment/receiptNoWise/${mReceiptNo}`)
    // return this.http.get(this.ServerUrl+`/rcvShipment/findByReceiptNum/${mReceiptNo}`)
    // http://localhost:8081/rcvShipment/findByReceiptNum/1000155
  }

  getPOReceiptSearchByPONo(mPoNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvShipment/findByPONumber/${mPoNumber}`)
  }





  //////////////////////////EXTENDED WARRANTY/////////////////////////////


  // EwSourceList(): Observable<any> {
  //   return this.http.get(this.ServerUrl +'/cmnLookup/type/EWSource');
  // }

  // EwTypeList(): Observable<any> {
  //   return this.http.get(this.ServerUrl +'/cmnLookup/type/EWType');
  // }

  // ModelVariantList(): Observable<any> {
  //   return this.http.get(this.ServerUrl +'/cmnLookup/type/Variant');
  // }

  // PremiumPeriodList(): Observable<any> {
  //   return this.http.get(this.ServerUrl +'/cmnLookup/type/EWPeriod');
  // }

  // getEWSchemeSearch(): Observable<any> {
  //    return this.http.get(this.ServerUrl + '/EwScheme');
  // }

  // public SaiEwSchemeSubmit(EwSchemeMasterRecord) {
  //   const options = {
  //     headers: this.headers
  //   };
  //   const url = this.ServerUrl + '/EwScheme/newscheme';
  //   return this.http.post(url, EwSchemeMasterRecord, options);
  // }

  // UpdateSaiEwScheme(EwSchemeMasterRecord) {
  //   const options = {
  //     headers: this.headers
  //   };
  //   const url = (this.ServerUrl + `/EwScheme`);
  //   return this.http.put(url, EwSchemeMasterRecord, options);
  // }


  // PaymentModeList(): Observable<any> {
  //   return this.http.get(this.ServerUrl +'/fndAcctLookup/lookupTypeWise/PayType');
  // }

  // ReceiptStatusList(): Observable<any> {
  //   return this.http.get(this.ServerUrl +'/cmnLookup/type/ReceiptStatus');
  //   // cmnLookup/type/ReceiptStatus
  // }

  // ReceiptTypeArList(): Observable<any> {
  //   return this.http.get(this.ServerUrl +'/cmnLookup/type/arReceiptType');
  //   // cmnLookup/type/ReceiptStatus
  // }

  // ReverseReasonList(): Observable<any> {
  //   return this.http.get(this.ServerUrl +'/cmnLookup/type/RvslReson');
  // }


  // getArReceiptSearchByRcptNo(rcptNumber,custActNo,rcptDate): Observable<any>
  // {
  //   // alert("MS>>RCPT NO -getArReceiptSearchByRcptNo: RcptNo ,CustNo,RcptDate :" +rcptNumber +','+custActNo +','+rcptDate  );
  //   if(rcptDate===undefined)
  //   {
  //     return this.http.get(this.ServerUrl + `/arCashReceipts/Search?receiptNumber=${rcptNumber}&accountNo=${custActNo}`);
  //   }else
  //   {
  //   return this.http.get(this.ServerUrl + `/arCashReceipts/Search?receiptNumber=${rcptNumber}&accountNo=${custActNo}&receiptDate='${rcptDate}'`);
  //   }
  // }

  // getArReceiptSearchByInvoiceNo(custAccountNo,billToSiteId,rcptNo): Observable<any> {
  //   // alert("MS>>RCPT NO -getArReceiptSearchByRcptNo: CustActNo " +custAccountNo +'billToSiteId:'+billToSiteId );
  //   return this.http.get(this.ServerUrl + `/arCashReceipts/apply/inv?recepitNo=${rcptNo}&custAccountNo=${custAccountNo}&billToSiteId=${billToSiteId}`);


  // }


  // CustomerList(): Observable<any> {
  //   return this.http.get(this.ServerUrl +'/Customer');
  // }


  // custAccountNoSearch(accountNo,ouId): Observable<any> {
  //   alert("ms >>account no:"+accountNo+","+ouId);
  //   // return this.http.get(this.ServerUrl + `/Customer/getByAccountNo?accountNo=${accountNo}&ouId=${ouId}`);
  //   return this.http.get(this.ServerUrl + `/Customer/getByAccountNo?accountNo=${accountNo}&ouId=${ouId}`);
  // }

  // public ArReceipApplySubmit(ArReceiptApplyRecord) {
  //   const options = {
  //     headers: this.headers
  //   };
  //   const url = this.ServerUrl + '/arCashReceipts/apply/inv';
  //   return this.http.post(url, ArReceiptApplyRecord, options);
  // }


  // public ArReceiptSubmit(ArReceiptRecord) {
  //   const options = {
  //     headers: this.headers
  //   };
  //   const url = this.ServerUrl + '/arCashReceipts/ArReceipt';
  //   return this.http.post(url, ArReceiptRecord, options);
  // }

  // ReceiptMethodList(mPaytype ,mLocId,mStatus): Observable<any> {
  //   // alert("Master Service :"+ mPaytype+" "+mLocId+" " +mStatus);
  //   return this.http.get(this.ServerUrl + `/receiptMethod?methodType=${mPaytype}&locId=${mLocId}&status=${mStatus}`);
  // }

  ///////////////////////// CASH BANK TRANSFER //////////////////////

  TransferTypeLst(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/TranType');
    // http://localhost:8081/fndAcctLookup/lookupTypeWise/TranType
  }

  PeriodLst(): Observable<any> {
    return this.http.get(this.ServerUrl + '/AccountTrf/glPayablePeriod');
    // http://localhost:8081/AccountTrf/glPayablePeriod
  }


  fromAcctLst(mLocId): Observable<any> {
    return this.http.get(this.ServerUrl + `/AccountTrf/fromAcctList?locId=${mLocId}`);
    // http://localhost:8081/AccountTrf/fromAcctList?locId=124
  }

  toAcctLst(mLocId): Observable<any> {
    return this.http.get(this.ServerUrl + `/AccountTrf/toAcctList/${mLocId}`);
    // http://localhost:8081/AccountTrf/toAcctList/124
  }

  bnkHeaderList(mLocId): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/BankTrfHeader`);
    // http://localhost:8081/cmnLookup/CmnType/BankTrfHeader
  }


  getFromAcList(trfType, ouId): Observable<any> {
    //  return this.http.get(this.ServerUrl +`/AccountTrf/AcctList/${trfType}`);
    return this.http.get(this.ServerUrl + `/AccountTrf/AcctListNew?tranType=${trfType}&ouId=${ouId}`);

    //  http://localhost:8081/AccountTrf/AcctList/CT

    // http://localhost:8081/AccountTrf/AcctListNew?tranType=BT&ouId=21
  }

  getPayRecAccountCode(methodId, ouId, divId, locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/AccountTrf/AcctCodeList?receiptMethodId=${methodId}&ouId=${ouId}&divisionId=${divId}&locId=${locId}`);
    //  http://localhost:8081/AccountTrf/AcctCodeList/?receiptMethodId=41&ouId=110&divisionId=2&locId=121

  }

  xxxgetGlAccountBalance(glCode, prdName): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/accGlBalances?segmentNameFrm=${glCode}&periodName=${prdName}`);
    // http://localhost:8081/glHeader/accGlBalances?segmentNameFrm=12MU.2102.21.21701.0000&periodName=Jan-21-22
  }

  public getGlAccountBalance(glCode, prdName) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/glHeader/accGlBalances?segmentNameFrm=${glCode}&periodName=${prdName}`;
    return this.http.post(url, options);
    // http://localhost:8081/AccountTrf/AcctTrfPost?emplId=216
  }

  getGlAccountBalanceNew(glCode, prdName): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/accGlBalances?segmentNameFrm=${glCode}&periodName=${prdName}`);
    // http://localhost:8081/glHeader/accGlBalances?segmentNameFrm=12MU.2103.00.21751.0000&periodName=Jan-21-22
  }


  public CashBankTrfSaveSubmit(CashBankTrfRecord, mEmplId) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/AccountTrf/AcctTrfSave?emplId=${mEmplId}`;
    return this.http.post(url, CashBankTrfRecord, options);
  }



  UpdateCashBankTrf(CashBankTrfRecord, docNum) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/AccountTrf/CounterListUpd?docTrfNo=${docNum}`);
    return this.http.put(url, CashBankTrfRecord, options);

    // http://localhost:8081/AccountTrf/CounterListUpd?docTrfNo=2125210510009

  }


  arRcptUpdate(ArRcptUpdateRecord, docTrfNum) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/AccountTrf/ArSaveUpdate?docTrfNo=${docTrfNum}`);
    return this.http.put(url, ArRcptUpdateRecord, options);

    // new - http://localhost:8081/AccountTrf/ArSaveUpdate?docTrfNo=2125210510003

    // http://localhost:8081/AccountTrf/ArSaveUpdate  Parameter <Your Rcptline Array> , String docTrfNo
  }


  public CashBankTrfPostSubmit(CashBankTrfRecord, mEmplId) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/AccountTrf/AcctTrfPost?emplId=${mEmplId}`;
    return this.http.post(url, CashBankTrfRecord, options);

    // http://localhost:8081/AccountTrf/AcctTrfPost?emplId=216

  }





  // public CashBankTrfReversalSubmit(CashBankTrfRecord, mEmplId, docTrfNo) {
  //   const options = {
  //     headers: this.headers
  //   };
  //   const url = this.ServerUrl + `/AccountTrf/Reversed?docTrfNo=${docTrfNo}&emplId=${mEmplId}`;
  //   return this.http.post(url, CashBankTrfRecord, options);

  // }


  // CashBankTrfReversalSubmit(formData, docTrfNo, mEmplId,reversalPeriod,reversalDate) {
  //   let headers1 = new HttpHeaders();
  //   formData.append('docTrfNo', docTrfNo);
  //   formData.append('mEmplId', mEmplId);
  //   formData.append('reversalPeriod', reversalPeriod);
  //   formData.append('reversalDate', reversalDate);
  //   return this.http.post(this.ServerUrl + `/AccountTrf/Reversed?`, formData)
  // }


  public CashBankTrfReversalSubmit(docTrfNo, mEmplId,reversalPeriod,reversalDate,reversalLocId) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/AccountTrf/Reversed?docTrfNo=${docTrfNo}&emplId=${mEmplId}&reversalPeriod=${reversalPeriod}&reversalDate=${reversalDate}&reversalLocId=${reversalLocId}`;
    return this.http.post(url, options);

    // http://localhost:8081/DedStock?ouId=21&months=10
  }

  getBnkTrfSearchByDocNum(docNo, ouId): Observable<any> {
    // return this.http.get(this.ServerUrl+`/AccountTrf/trfDocSearch/${docNo}`);
    return this.http.get(this.ServerUrl + `/AccountTrf/trfDocSearch?docTrfNo=${docNo}&ouId=${ouId}`);

    // http://localhost:8081/AccountTrf/trfDocSearch/2125210210009
    // http://localhost:8081/AccountTrf/trfDocSearch?docTrfNo=22221027000064&ouId=21
  }

  getBnkTrfSearchByDate(fDate, tDate, ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/AccountTrf/TrfDtList?frmDate=${fDate}&toDate=${tDate}&ouId=${ouId}`);
    // http://localhost:8081/AccountTrf/TrfDtList?frmDate=2021-10-25&toDate=2021-10-25
    // http://localhost:8081/AccountTrf/TrfDtList?frmDate=2022-04-01&toDate=2022-06-10&ouId=21

  }

  getBnkChqListPosted(docNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/AccountTrf/trfRcptSearch/${docNumber}`);
    // http://localhost:8081/AccountTrf/trfRcptSearch/2125210210010
  }

  getBnkChqList(bankId, rcptMthId, locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/AccountTrf/CounterList?bankId=${bankId}&receiptMethodId=${rcptMthId}&locId=${locId}`);
    // http://localhost:8081/AccountTrf/CounterList?bankId=902&receiptMethodId=58&locId=2102
  }

  getBnkChqListDocNum(locId, rcptMthId, docTrf): Observable<any> {
    return this.http.get(this.ServerUrl + `/AccountTrf/trfRcptUpdate?locId=${locId}&receiptMethodId=${rcptMthId}&docTrfNo=${docTrf}`);
    // http://localhost:8081/AccountTrf/trfRcptUpdate?locId=2102&receiptMethodId=58&docTrfNo=2125210210010
  }

  viewAccountingBankTransfer(trfNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/AccountTrf/${trfNo}`);
    // http://localhost:8081/glHeader/AccountTrf/2125210510008
  }


  ////////////////////////// Pending Shipment Lis///////////

  getShipmentList(locId, deptId, divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvShipment/shipmentList?billToLoc=${locId}&deptId=${deptId}&divisionId=${divisionId}`);
  }

  /////////////////////////RECEIVABLE TRANSACTION TYPE MASTER ///////////////////////

  recTypeClass() {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/RcvClass');
  }

  recCategoryBase() {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/AccountingBase');
  }

  recRecAcList() {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/NaturalAccount');
  }

  recRevAcList() {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/NaturalAccount');
  }


  recCreditMemoType(classType) {
    return this.http.get(this.ServerUrl + `/rcvType/typeWise/${classType}`);
    // http://localhost:8081/rcvType/typeWise/Credit%20Memo
  }

  public RecTransTypeMasterSubmit(RecTransTypeMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/rcvType';
    return this.http.post(url, RecTransTypeMasterRecord, options);
  }


  //////////////////////bank recon/////////////////////

  bankList(methodType, mouId): Observable<any> {
    // alert ("OU Id :"+mouId);
    // return this.http.get(this.ServerUrl+`/ceBankAccounts/BankList/${mouId}`);
    return this.http.get(this.ServerUrl + `/ceBankAccounts/BankList?methodType=${methodType}&ouId=${mouId}`);
    // http://localhost:8081/ceBankAccounts/BankList/101
    // http://localhost:8081/ceBankAccounts/BankList?methodType=RTGS/NEFT&ouId=21
  }



  getBankReconStatement1(bnkId, ouId): Observable<any> {
    // alert("ms >>account no:"+bnkId+","+ouId );
    return this.http.get(this.ServerUrl + `/ceStateHdr/accoutWiseHdrList?bankAccountId=${bnkId}&orgId=${ouId}`);
  }

  getAvlBankReconLines(bnkNo, vchNo, dt1, dt2, amt1, amt2, refType, bnkId): Observable<any> {
    // alert("ms >>refType  :" + refType );
    if (refType === 'PAYMENT') {
      return this.http.get(this.ServerUrl + `/apInvPayment/apPaymentDetails?bankAccNo=${bnkNo}&vouNo=${vchNo}&frmDt=${dt1}&toDate1=${dt2}&frmAmt=${amt1}&toAmt=${amt2}`);
    }

    if (refType === 'RECEIPT') {
      return this.http.get(this.ServerUrl + `/arCashReceipts/arReceiptDetails?bankAccNo=${bnkNo}&vouNo=${vchNo}&frmDt=${dt1}&toDate1=${dt2}&frmAmt=${amt1}&toAmt=${amt2}`);
    }

    if (refType === 'CASHFLOW') {
      return this.http.get(this.ServerUrl + `/AccountTrf/cashBankTrf?bankAccountId=${bnkId}&frmDt=${dt1}&toDate1=${dt2}&frmAmt=${amt1}&toAmt=${amt2}`);
    }

  }


  getReconciledDetails(sLineId): Observable<any> {
    // alert("ms >>account no:"+bnkId+","+ouId );
    return this.http.get(this.ServerUrl + `/ceStateHdr/recoDetails/${sLineId}`);
    // http://localhost:8081/ceStateHdr/recoDetails/103772
  }

  getBankStatementDetails(sHeaderId): Observable<any> {
    // alert("ms >>account no:"+bnkId+","+ouId );
    return this.http.get(this.ServerUrl + `/ceStateHdr/${sHeaderId}`);
    // http://localhost:8081/ceStateHdr/161273
  }

  viewAccountingApReceipt(paymentNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/docSequenceValue/${paymentNo}`);

  }
  viewAccountingbyApReceipt(paymentNo, invoiceId): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/docSequenceValue?receiptNo=${paymentNo}&invoiceId=${invoiceId}`);

  }


  public bankReconPostSubmit(BankReconRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/ceStateHdr';
    return this.http.post(url, BankReconRecord, options);
  }


  ///////////////////Back order File upload/////////////////////
  UploadExcelBankStatement(formData: FormData, docType: string, mouId, bnkAcccountId, stNumber, glDt) {
    // alert ("Org Id :"+mouId + "  BankAccountId :"+bnkAcccountId);
    let headers1 = new HttpHeaders();
    var userId1 = sessionStorage.getItem('userId');
    console.log(docType);
    var docType1 = formData.get('docType');
    formData.append('orgId', mouId);
    formData.append('bankAccountId', bnkAcccountId);
    formData.append('statementNumber', stNumber);
    // formData.append('glDate', glDt);
    return this.http.post(this.ServerUrl + `/fileImport/uploadBankStmt`, formData)
    // http://localhost:8081/fileImport/uploadBankStmt/
  }

  /////////////////////////////////GL TRIAL BALANCE //////////////
  getGLTrialBalanceList(ou, prdName): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/drillDownHeader?segment1=${ou}&periodName=${prdName}`);
  }

  getGLTrialBalanceActSelect(ou, prdName, natAc): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/drillDownGLWise?segment1=${ou}&naturalAccount=${natAc}&periodName=${prdName}`);
  }

  getGLTrialBalanceActSelect1(seg, docNum, refNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/drillDownTypeWise?segment1=${seg}&docSeqValue=${docNum}&docSequenceValue=${refNo}`);
    // http://localhost:8081/glHeader/drillDownTypeWise?segment1=Receipts Reversal&docSeqValue=2222205700070&docSequenceValue=222210210901133
  }



  ////////////////////customer relation manager master //////////////////////
  employeeLst(locId, divId, deptId): Observable<any> {
    return this.http.get(this.ServerUrl + `/empMst/EmpLocDept?locId=${locId}&divisionId=${divId}&deptId=${deptId}`);
    // http://localhost:8081/empMst/EmpLocDept?locId=2103&divisionId=2&deptId=5
  }

  getCustomerEmpMapList(empId, p1, s1): Observable<any> {
    return this.http.get(this.ServerUrl + `/empCust?emplId=${empId}&page=${p1}&size=${s1}`);
    // http://localhost:8081/empCust?emplId=334&page=0&size=1
  }

  customerEmpMapSearch(custNo, locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/empCust/exeDtls?accountNo=${custNo}&locId=${locId}`);
    // http://localhost:8081/empCust/exeDtls?accountNo=1931&locId=2102
  }

  customerEmpMapSearchNew(custNo, locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/empCust/custDtls?custAccountNo=${custNo}&locId=${locId}`);
    // http://localhost:8081/empCust/custDtls?custAccountNo=1833&locId=2102
  }





  public custRelationPostSubmit(custRelationRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/empCust';
    return this.http.post(url, custRelationRecord, options);
  }


  public custRelationPutSubmit(custRelationRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/empCust';
    return this.http.put(url, custRelationRecord, options);
    // http://localhost:8081/empCust
  }


  //////////////////////////// ORDER GENERATION /

  priceListData(ouId, divId, deptId, plType): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist/priceHdrOu?ouId=${ouId}&divisionId=${divId}&deptId=${deptId}&priceSubType=${plType}`);
    // http://localhost:8081/pricelist/priceHdrOu?ouId=22&divisionId=2&deptId=5&priceSubType=MRP
  }


  clearBakcOrder(locId) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/SparesBackOrder/clearBackOrder?locId=${locId}`);
    return this.http.delete(url, options);
  }


  getBackOrderStatusBajaj(locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/SparesBackOrder/location?locId=${locId}`);
    // http://localhost:8081/SparesBackOrder/location?locId=2102
  }


  ///////////////////////////shipping network /////////////////////

  getShipNetFromDetails(locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/shippingNetwork/shipfrom/${locId}`);
    // http://localhost:8081/shippingNetwork/shipfrom/2102
  }

  getShipNetToDetails(locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/shippingNetwork/shipto/${locId}`);
    // http://localhost:8081/shippingNetwork/shipto/2102
  }

  /////////////////////////DEAD STOCK /////////////////////
  getDeadStockList(mOuId, mFlag): Observable<any> {
    return this.http.get(this.ServerUrl + `/DedStock/listProcess?ouId=${mOuId}`);
  }


  public deadFlg(mOu, dDays) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/DedStock?ouId=${mOu}&days=${dDays}`;
    return this.http.post(url, options);

    // http://localhost:8081/DedStock?ouId=21&months=10
  }

  public deadLineAddUpdate(deadLineRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/DedStock/addLine`);
    return this.http.post(url, deadLineRecord, options);
    // http://localhost:8081/DedStock/addLine
  }

  // //////////////AR Invoice////////////////////
  viewInvnote(trxNumber) {
    const REQUEST_URI = this.ServerUrl + `/arInv/ManualInvPrint/${trxNumber}`;
    return this.http.get(REQUEST_URI, {
      // params: REQUEST_PARAMS,
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  getJonCardNoSearch(jonCardNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/jobCard/jobDtls/${jonCardNo}`);
  }


  printAmcDoc(amcNum) {
    // const REQUEST_URI = this.ServerUrl +`/SRGatepass/print/${jcNumber}`;  
    const REQUEST_URI = this.ServerUrl + `/McpEnrollMst/amcInvoicePrint/${amcNum}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
    // http://localhost:8081/McpEnrollMst/amcInvoicePrint/AMC2202-8
  }

  //////////////////////////////////////////RELATED ITEM MASTER /////////////////
  public RelatedItemMasterSubmit(RelMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/relateditems/relatedItemInsert';
    return this.http.post(url, RelMasterRecord, options);
    // http://localhost:8081/relateditems/relatedItemInsert

  }

  public DeleteItemRelation(relationId) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/relateditems/removeSingle?relationId=${relationId}`);
    return this.http.delete(url, options);

    // http://localhost:8081/relateditems/removeSingle?relationId=2
  }

  getRelatedItem(itemCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/relateditems/${itemCode}`);
    // http://localhost:8081/relateditems/6950 
  }


  //////////////////// RECEIPT WRITE OFF///////////////////////////////////////////////////////////

  getEmpWriteOffLimit(ouId, tktNum): Observable<any> {
    return this.http.get(this.ServerUrl + `/empMst/EmpWriteOfDtls?ticketNo=${tktNum}&ouId=${ouId}`);
    // http://localhost:8081/empMst/EmpWriteOfDtls?ticketNo=M28152&ouId=21

  }

  getWriteOffListReceipt(locId, frmDate, tDate, wAmt): Observable<any> {
    return this.http.get(this.ServerUrl + `/arCashReceipts/receiptWriteOff?locId=${locId}&frmDt=${frmDate}&toDate1=${tDate}&toAmt=${wAmt}`);
    //http://localhost:8081/arCashReceipts/receiptWriteOff?locId=2101&frmDt=01-MAY-2022&toDate1=31-MAY-2022&toAmt=10
  }

  getWriteOffListInvoice(locId, frmDate, tDate, wAmt): Observable<any> {
    return this.http.get(this.ServerUrl + `/arInv/invoiceWriteOff?locId=${locId}&fromDate=${frmDate}&toDate=${tDate}&toAmt=${wAmt}`);
    // http://localhost:8081/arInv/invoiceWriteOff?locId=2209&fromDate=01-APR-2022&toDate=26-NOV-2022&toAmt=5
  }


  public ReceiptWriteOffSubmit(locId, frmDt, toDt, wAmt, tktNum) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/arCashReceipts/arReceiptWriteOff?locId=${locId}&frmDt=${frmDt}&toDate1=${toDt}&toAmt=${wAmt}&ticketNo=${tktNum}`;
    return this.http.post(url, options);
    // http://localhost:8081/arCashReceipts/arReceiptWriteOff?locId=2101&frmDt=01-MAY-2022&toDate1=05-MAY-2022&toAmt=5&ticketNo=M28152

  }

  public InvoiceWriteOffSubmit(locId, frmDt, toDt, wAmt, tktNum) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/arInv/raInvoiceWriteOff?locId=${locId}&fromDate=${frmDt}&toDate=${toDt}&toAmt=${wAmt}&ticketNo=${tktNum}`;
    return this.http.post(url, options);
    // http://localhost:8081/arInv/raInvoiceWriteOff?locId=2209&fromDate=26-MAY-2022&toDate=26-MAY-2022&toAmt=5&ticketNo=P06659

  }

   ////////////////////////////////////////Petrol Pump//////////////////////////////////////////////////
   TankList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/TankMaster');
  }

  IslandList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/ppIslandMaster');
  }

  NozzleList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/NozzelMaster');
  }

  NozzleListShift(shiftTp,dt1,dt2): Observable<any> {
    // alert("SHIFT TYPE = "+shiftTp+" ,DATE1= "+dt1+" ,DATE2= "+dt2);
    // return this.http.get(this.ServerUrl + '/NozzelMaster');
    return this.http.get(this.ServerUrl + `/NozzelMaster/NozleLov?shiftType=${shiftTp}&shiftDate=${dt1}&shiftDate1=${dt2}`);
  // http://localhost:8081/NozzelMaster/NozleLov?shiftType=I&shiftDate=01-Feb-2024&shiftDate1=02-Feb-2024

  }


  FuelTypeList(fueltype,divId): Observable<any> {
    // alert ("Ftype:"+fueltype + " , div :"+divId);
    return this.http.get(this.ServerUrl + `/itemMst/ByItemCategory?itemCatType=${fueltype}&divId=${divId}`);
  }

  ShiftList(): Observable<any> {
    // return this.http.get(this.ServerUrl + `/itemMst/ByItemCategory?itemCatType=${fueltype}&divId=${divId}`);
    return this.http.get(this.ServerUrl + '/cmnLookup/CmnType/ShiftType');

  }

  PPEmplIdList(locId, divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/empMst/EmpLocDiv?locId=${locId}&divisionId=${divisionId}`)
  
    // http://localhost:8081/empMst/EmpLocDiv?locId=2501&divisionId=3
  }



  NozzleIslandPick(mNozzle): Observable<any> {
    // alert(mNozzle );
    return this.http.get(this.ServerUrl + `/ppIslandMaster/ByNozleId/${mNozzle}`);
  }

  NozzleFuelTypePick(mNozzleCd): Observable<any> {
    // http://localhost:8081/NozzelMaster/NZ01
    return this.http.get(this.ServerUrl + `/NozzelMaster/${mNozzleCd}`);
  }

  nozzleBalaCheck(segmentList,shiftCode,tDate): Observable<any> {
    return this.http.get(this.ServerUrl + `/NozzelMaster/assignNozle?nozzleCode=${segmentList}&shiftType=${shiftCode}&shiftDate=${tDate}`);
  }

  public PumpSaleAddSubmit(PumpSaleRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/ShiftEntry';
    return this.http.post(url, PumpSaleRecord, options);
    // http://localhost:8081/ShiftEntry
  }


  getTankList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/TankMaster`);

    // http://localhost:8081/TankMaster
  }

  getIslandList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/ppIslandMaster`);

    // http://localhost:8081/TankMaster
  }

  getNozzleList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/NozzelMaster`);

    // http://localhost:8081/TankMaster
  }


  getDipEntryDetails(dipEmtryNum): Observable<any> {
    return this.http.get(this.ServerUrl + `/DipEntry/DipNumber/${dipEmtryNum}`);

    // http://localhost:8081/DipEntry/DipNumber/12PP.2501-2325001  
  }




  public tankMasterSubmit(tankMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/TankMaster';
    return this.http.post(url, tankMasterRecord, options);
  }

  public islandMasterSubmit(islandMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/ppIslandMaster';
    return this.http.post(url, islandMasterRecord, options);
  }

  public nozzleMasterSubmit(nozzleMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/NozzelMaster';
    return this.http.post(url, nozzleMasterRecord, options);
  }

  public dipEntrySubmit(dipEntryRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/DipEntry';
    return this.http.post(url, dipEntryRecord, options);
  }

 UpdatePaintMixMaster(PaintMixMasterRecord) {
    const options = {
      headers: this.headers
    };
    // http://localhost:8081/relateditems/relatedItemUpd
    const url = (this.ServerUrl + `/relateditems/relatedItemUpd`);
    return this.http.put(url, PaintMixMasterRecord, options);
  }



}





