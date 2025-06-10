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
  lstcommentsUserSm = JSON.parse(sessionStorage.getItem('logRes'));
  token = this.lstcommentsUserSm.token;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.headers = this.headers.append("Authorization", "Bearer " + this.token);
    this.ServerUrl = AppConstants.ServerUrl;
  }

  

  ////////////////////////////////////////Comman Lov//////////////////////////////////////////////////
  statusList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus',{ headers: this.headers });
  }

  taxCategoryNameList(ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/taxCtgHeader/${ouId}`,{ headers: this.headers });
  }
  taxCategoryList1(locId, state): Observable<any> {
    return this.http.get(this.ServerUrl + `/taxCtgHeader/taxCtgName?locId=${locId}&custState=${state}`,{ headers: this.headers });
  }
  taxCategorySiteList1(ouId, state): Observable<any> {
    return this.http.get(this.ServerUrl + `/taxCtgHeader/taxCtgNameSuppSitewise?ouId=${ouId}&custState=${state}`,{ headers: this.headers });
  }
  memberTicketNo(locCode, deptId, divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/empMst/teamMemberList?locId=${locCode}&deptId=${deptId}&divisionId=${divisionId}`,{ headers: this.headers });
  }
  teamRoleListFN(deptName): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/TeamRole/${deptName}`,{ headers: this.headers });
  }

  OUIdList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/opUnit',{ headers: this.headers });
  }

  OUIdListDiv(mDivId): Observable<any> {
    return this.http.get(this.ServerUrl + `/opUnit/divisionWise/${mDivId}`,{ headers: this.headers });
  }

  LocationListOu(mOuId): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/locListOuwise/${mOuId}`,{ headers: this.headers });
  }

  StateList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/States',{ headers: this.headers });
  }
  cityList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/City',{ headers: this.headers });
  }
  regionList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/Region',{ headers: this.headers });
  }

  DivisionIDList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/divMst',{ headers: this.headers });
  }

  poTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/PoTypes',{ headers: this.headers });
  }
  APiNVOICEtYPETypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/AP INVOICE TYPE',{ headers: this.headers });
  }
  APitemtYPEList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/AP Item TYPE',{ headers: this.headers });
  }
  invItemList1(): Observable<any> {
    return this.http.get(this.ServerUrl + '/itemMst',{ headers: this.headers });
  }

  invItemListNew(divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/itemDetails/${divisionId}`,{ headers: this.headers });
  }

  invItemListEw(mEwType, mVariant, mPeriod): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/ewItems?ewType=${mEwType}&variant=${mVariant}&ewPeriod=${mPeriod}`,{ headers: this.headers });
  }


  companyCodeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/CompMst',{ headers: this.headers });
  }
  YesNoList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/YesNo',{ headers: this.headers });
  }
  SSitemTypeListFn(): Observable<any> {
    return this.http.get(this.ServerUrl + '/itemCategory/type',{ headers: this.headers });
  }
  subTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/SubCtg',{ headers: this.headers });
  }
  mainTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/MainCtg',{ headers: this.headers });
  }

  mainTypeNewList(divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/Catgtype?cmnType=MainCtg&divisionId=${divisionId}`,{ headers: this.headers });
  }
  subTypeNewList(divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/Catgtype?cmnType=SubCtg&divisionId=${divisionId}`,{ headers: this.headers });
  }

  locationIdList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/locationMst',{ headers: this.headers });
  }

  locationIdList1(ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/locListOuwise/${ouId}`,{ headers: this.headers });
  }

  TolocationIdList(locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/shippingNetwork/shiptoloc/${locId}`,{ headers: this.headers });
  }
  locationCodeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_Location',{ headers: this.headers });
  }
  subinventoryIdList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/subInvMst',{ headers: this.headers });
  }

  subinventoryIdList1(divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/subInvMst/subInv/${divisionId}`,{ headers: this.headers });
  }
  titleList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/TitleList',{ headers: this.headers });
  }
  DepartmentList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/DeptList',{ headers: this.headers });
  }

  DepartmentListNew(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/CmnType/Dept',{ headers: this.headers });
  }
  DepartmentListNew1(divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/subInvMst/subInv/${divisionId}`,{ headers: this.headers });
  }

  empIdListFn(): Observable<any> {
    return this.http.get(this.ServerUrl + '/empMst/All',{ headers: this.headers });
  }
  DepartmentListById(dept): Observable<any> {
    return this.http.get(this.ServerUrl + `/divMst/${dept}`,{ headers: this.headers });
  }
  emplIdList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/empMst',{ headers: this.headers });
  }
  DesignationList(Department): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/Designation/${Department}`,{ headers: this.headers });
  }
  recvTypeIdList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/DeptList',{ headers: this.headers });
  }

  invItemList(itemType, deptName, divisionId): Observable<any> {
    const REQUEST_PARAMS = new HttpParams().set('itemType', itemType)
      .set('dept', deptName)
      .set('divisionId', divisionId)
    const REQUEST_URI = this.ServerUrl + '/itemMst/ItemType';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,
      headers: this.headers,
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
      headers: this.headers,
    });
  }


  invItemList2(itemType, deptName, divisionId): Observable<any> {
    const REQUEST_PARAMS = new HttpParams().set('itemType', itemType)
      .set('dept', deptName)
      .set('divisionId', divisionId)
    const REQUEST_URI = this.ServerUrl + '/itemMst/ItemType';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,
      headers: this.headers,
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
      headers: this.headers,
    });
  }
  supplierCodeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/supp',{ headers: this.headers });
  }


  supplierCodeListNew(): Observable<any> {
    return this.http.get(this.ServerUrl + '/supp/typewiseDet/Supplier',{ headers: this.headers });
  }

  supplierCodeWithEmplListNew(): Observable<any> {
    return this.http.get(this.ServerUrl + '/supp/getAllSupp',{ headers: this.headers });
  }

  pricelIstListFn(ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist/NDPPrc?ouId=${ouId}`,{ headers: this.headers });
  }

  getTdsType(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/SuppTdsType`,{ headers: this.headers });
  }

  supplierCodeList1(): Observable<any> {
    return this.http.get(this.ServerUrl + '/supp',{ headers: this.headers });
  }
  supplierName(supName): Observable<any> {
    return this.http.get(this.ServerUrl + `/supp/suppName?name=${supName}`,{ headers: this.headers });
  }

  taxCategoryList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/JaiTaxCatg/taxCate/PURCHASE',{ headers: this.headers });
  }

  createOrderTypeListFn(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/CmnType/AccOrderType',{ headers: this.headers });
  }

  issueCodeFunction(divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnTypeDivision?cmnType=IssueCode&divisionId=${divisionId}`,{ headers: this.headers });
  }

  taxCategoryListForSALES(): Observable<any> {
    return this.http.get(this.ServerUrl + '/JaiTaxCatg/taxCate/SALES',{ headers: this.headers });
  }
  taxCategoryIgstListForSALES(): Observable<any> {
    return this.http.get(this.ServerUrl + '/JaiTaxCatg/getByCateTypeIGST1/SALES',{ headers: this.headers });
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
      headers: this.headers,
    });
  }


  taxCategoryListHSN(mPer, mType): Observable<any> {
    return this.http.get(this.ServerUrl + `/JaiTaxCatg/taxCateGstPer?taxCatType=${mType}&gstPer=${mPer}`,{ headers: this.headers });
  }



  taxCategoryListPoInvoice(): Observable<any> {
    return this.http.get(this.ServerUrl + '/JaiTaxCatg/taxCate',{ headers: this.headers });
  }

  suppSiteList(suppId): Observable<any> {
    return this.http.get(this.ServerUrl + `/supp/sites/${suppId}`,{ headers: this.headers });
  }

  suppIdList(suppId, ouId) {
    const REQUEST_PARAMS = new HttpParams().set('suppId', suppId)
      .set('ouId', ouId)
    const REQUEST_URI = this.ServerUrl + '/supp/ouSites';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,
      headers: this.headers,
    });
  }

  suppIdList1(suppId, ouId) {
    const REQUEST_PARAMS = new HttpParams().set('suppId', suppId)
      .set('ouId', ouId)
    const REQUEST_URI = this.ServerUrl + '/supp/ouSites';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,
      headers: this.headers,
    });
  }
  siteIdList(siteId): Observable<any> {
    return this.http.get(this.ServerUrl + `/supp/site/${siteId}`,{ headers: this.headers });
  }

  chassisList(ouId, addonType): Observable<any> {
    return this.http.get(this.ServerUrl + `/arInv/chssisListOrder?orgId=${ouId}&addonType=${addonType}`,{ headers: this.headers });
  }

  segmentNameList(segmentName): Observable<any> {
    return this.http.get(this.ServerUrl + `/glCodeCmbn/codeComb/${segmentName}`,{ headers: this.headers });
  }

  custTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus',{ headers: this.headers });
  }
  classCodeTypeList1(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/classCode',{ headers: this.headers });
  }
  classCodeTypeList(divId): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnTypeDivision?cmnType=ClassCode&divisionId=${divId}`,{ headers: this.headers });
  }
  getTaxCat(ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/taxCtgHeader/${ouId}`,{ headers: this.headers });
  }
  BranchList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_Branch',{ headers: this.headers });
  }
  BranchListDiv(compId, divId): Observable<any> {
    return this.http.get(this.ServerUrl + `/fndAcctLookup/lookupTypeInfo?compId=${compId}&divisionId=${divId}&lookupType=SS_Branch`,{ headers: this.headers })
  }
  CostCenterList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/CostCentre',{ headers: this.headers });
  }
  NaturalAccountList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/NaturalAccount',{ headers: this.headers });
  }
  NaturalAccountList1(): Observable<any> {
    return this.http.get(this.ServerUrl + '/naturalAcc/Payable',{ headers: this.headers });
  }
  NaturalAccountListRec(): Observable<any> {
    return this.http.get(this.ServerUrl + `/naturalAcc/Receivable`,{ headers: this.headers });
  }
  NaturalAccountListJV(): Observable<any> {
    return this.http.get(this.ServerUrl + '/naturalAcc/JV',{ headers: this.headers });
  }
  InterBrancList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_Interbranch',{ headers: this.headers });
  }
  FutureList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_Future',{ headers: this.headers });
  }
  SubAccountList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_SubAccount',{ headers: this.headers });
  }
  /////////////IOT Transfer/////////////////////

  iotOrderTypeList1(ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/OrderTrnType/stkorder/${ouId}`,{ headers: this.headers });
  }
  iotOrderTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/OrderTrnType/stkorder1`,{ headers: this.headers });
  }
  getShiptoLoc(locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/shippingNetwork/shiptoInterState/${locId}`,{ headers: this.headers });
  }
  
  public divisionMasterSubmit(divMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/divMst/divPost';
    return this.http.post(url, divMasterRecord, options);
  }
  getDiviSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/divMst',{ headers: this.headers });

  }
  getDiviSearchPach(divisionCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/divMst/divCode/${divisionCode}`,{ headers: this.headers });
  }


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
    return this.http.get(this.ServerUrl + '/CompMst',{ headers: this.headers });

  }


  ///////////////////////////common look up //////////////////////////

  cmnTypeListNew(divId): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/AllCmnType/${divId}`,{ headers: this.headers });
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
  }


  getCommonLookupSearch(searchText): Observable<any> {
    return this.http.get(this.ServerUrl + `/CompMst/${searchText}`,{ headers: this.headers });
  }

  getCommonLookupSearchNew(cmnTp, divId ): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnTypeDivision?cmnType=${cmnTp}&divisionId=${divId}`,{ headers: this.headers })
  }

  getCommonLookupSearchNewWithLocId(cmnTp, divId,locCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnTypePaintEmpl?cmnType=${cmnTp}&divisionId=${divId}&attribute1=${locCode}`,{ headers: this.headers })
  }


  getDipScaleSearchByTankId(tankId): Observable<any> {
    return this.http.get(this.ServerUrl + `/DipMaster/tankId/${tankId}`,{ headers: this.headers });
  }

  getDipScaleSearchByTankIdAndVol(tankId,dipVol): Observable<any> {
    return this.http.get(this.ServerUrl + `/DipMaster/tankVol?tankId=${tankId}&vol=${dipVol}`,{ headers: this.headers })   
  }


  getDipScaleOpenReading(tnkid,dt1): Observable<any> {
    return this.http.get(this.ServerUrl + `/DipEntry/getClosDp?tankId=${tnkid}&shiftDate=${dt1}`,{ headers: this.headers })
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

  getoperatingUnitSearch(pageNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/opUnit?page=${pageNo}&size=5`,{ headers: this.headers });

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
    return this.http.get(this.ServerUrl + `/locationMst/locListOuwise/${ouId}`,{ headers: this.headers });
  }

  accountNameList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/receiptMethod/rcptMethod`,{ headers: this.headers });
  }

  accountNameListbank(): Observable<any> {
    return this.http.get(this.ServerUrl + `/receiptMethod/bankRcptMethod`,{ headers: this.headers });
  }

  getLocationSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/locationMst',{ headers: this.headers });
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
    return this.http.get(this.ServerUrl + `/teamMaster/Team?teamName=${teamName}&ouId=${ouId}&locId=${locId}`,{ headers: this.headers });
  }

  leadTicketNoList(locId, deptId): Observable<any> {
    return this.http.get(this.ServerUrl + `/empMst/teamList?locId=${locId}&deptId=${deptId}`,{ headers: this.headers });
  }

  public GroupMasterSubmit(LocationMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/teamMaster/post';
    return this.http.post(url, LocationMasterRecord, options);
  }



  ////////////////// Item Category Master /////////////////////////////////////////////////////////
  getItemCategorySearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/itemCategory',{ headers: this.headers });
  }

  getItemCategorySearchbydivisionId(divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemCategory/div/${divisionId}`,{ headers: this.headers });
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
    return this.http.get(this.ServerUrl + `/itemlctrmst/byLocSub?locId=${locId}&subInventoryId=${subId}`,{ headers: this.headers });
  }

  getItemLocatorMasterSearchNew(locId, subId, itemId): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemlctrmst/byLocSubItem?locId=${locId}&subInventoryId=${subId}&itemId=${itemId}`,{ headers: this.headers });
  }
  ////////////////////////////////Locator Master/////////////////////////////

  getLocatorMasterSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/lctrmst',{ headers: this.headers });
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
    return this.http.get(this.ServerUrl + `/itemCategory/typeDivision?itemType=${category}&divisionId=${divisionId}`,{ headers: this.headers });
  }

  categoryIdList(category): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemCategory/type/${category}`,{ headers: this.headers });
  }

  getCategoryIdListByDivision(category): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemCategory/type/` + sessionStorage.getItem('divisionId') + `/${category}`,{ headers: this.headers });
  }
  uomList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/UOM',{ headers: this.headers });
  }

  costingList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus',{ headers: this.headers });
  }

  stockableList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus',{ headers: this.headers });
  }

  purchasableList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus',{ headers: this.headers });
  }

  costCenterList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/CostCentre',{ headers: this.headers });
  }

  hsnSacCodeList(): Observable<any> {
    // return this.http.get(this.ServerUrl +'/hsnsacMst/HsnSacCode');
    return this.http.get(this.ServerUrl + '/hsnSacMst',{ headers: this.headers });
  }

  hsnSacCodeData(type): Observable<any> {
    // return this.http.get(this.ServerUrl +'/hsnsacMst/HsnSacCode');
    return this.http.get(this.ServerUrl + `/hsnSacMst/codeType/${type}`,{ headers: this.headers });
  }

  hsnSacCodeDet(mHsnCode): Observable<any> {
    // alert("ms >> "+mHsnCode);
    return this.http.get(this.ServerUrl + `/hsnSacMst/${mHsnCode}`,{ headers: this.headers });
  }

  hsnSacCodeDetNew(mHsnCode): Observable<any> {
    // alert("ms >> "+mHsnCode);
    return this.http.get(this.ServerUrl + `/hsnSacMst/ls/${mHsnCode}`,{ headers: this.headers });
  }

  internalOrderList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus',{ headers: this.headers });
  }

  marginCategoryList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus',{ headers: this.headers });
  }

  assetItemList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus',{ headers: this.headers });
  }

  itemStatusList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus',{ headers: this.headers });
  }

  typeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus',{ headers: this.headers });
  }

  mainModelList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/MulModel',{ headers: this.headers });
  }
colorList(): Observable<any> {
 return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/MulColour`,{ headers: this.headers });
}
  mainModelListByDivisionId(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/Catgtype?cmnType=Model&divisionId=' + sessionStorage.getItem('divisionId'),{ headers: this.headers });
  }


  mcpReasonLst(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/McpCancelRsn',{ headers: this.headers });
  }

  mcpRemarkLst(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/McpCancRemark',{ headers: this.headers });
  }



  VariantSearchFn(mainModel): Observable<any> {
    if (mainModel != null) {
      return this.http.get(this.ServerUrl + `/VariantMst/VariantList/${mainModel}`,{ headers: this.headers });
    }
  }

  colorCodeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/MulColour',{ headers: this.headers });
  }

  colorCodeListByVariant(variant): Observable<any> {
    return this.http.get(this.ServerUrl + `/VariantMst/ColorList/${variant}`,{ headers: this.headers });
  }

  transactionTypeNameList(deptId, locId, ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/OrderTrnType/otList?deptId=${deptId}&locId=${locId}&ouId=${ouId}`);
  }

  payTermDescList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/fndAcctLookup/lookupTypeWise/PaymentTerms`,{ headers: this.headers });
  }


  taxCategoryListForSALES1(orderNumber, segment) {
    const REQUEST_PARAMS = new HttpParams().set('orderNumber', orderNumber)
      .set('segment', segment)

    const REQUEST_URI = this.ServerUrl + `/orderHeader/deallotment?orderNumber=${orderNumber}&segment=${segment}`;
    return this.http.put(REQUEST_URI, {
      params: REQUEST_PARAMS,

    });
  }


  salesRepNameList(ouId, locId, dept): Observable<any> {
    return this.http.get(this.ServerUrl + `/teamMaster/StatusOuswise?ouId=${ouId}&locId=${locId}&dept=${dept}`,{ headers: this.headers });
  }

  mainModelListDivisionWise(divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/Catgtype?cmnType=Model&divisionId=${divisionId}`,{ headers: this.headers });
  }


  transactionTypeNameListNew(deptId, ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/OrderTrnType/otList?deptId=${deptId}&ouId=${ouId}`,{ headers: this.headers });
  }

  brokerListFn(): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/ClassCode/BROKER`,{ headers: this.headers });
  }

  insTypeListFn(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/insType`,{ headers: this.headers });
  }

  brokerListFnNew(classCodeType): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/ClassCode/${classCodeType}`,{ headers: this.headers });
  }

  brokerTypeListFn(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/ClassCodeSL`,{ headers: this.headers });
  }

  truValueListFn(): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/ClassCode/TRUE VALUE`,{ headers: this.headers });
  }



  variantCodeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus',{ headers: this.headers });
  }

  manYaerList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus',{ headers: this.headers });
  }

  octraiBillDateList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus',{ headers: this.headers });
  }

  octraiTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus',{ headers: this.headers });
  }

  warrantyStatusList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus',{ headers: this.headers });
  }

  ewStatusList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus',{ headers: this.headers });
  }

  ewPeriodList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus',{ headers: this.headers });
  }

  ewInsNameList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/Customer/ClassCode/EWINSURER',{ headers: this.headers });
  }

  ewInsSiteList(customerId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/${customerId}`,{ headers: this.headers });
  }

  itemTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ItemType',{ headers: this.headers });
  }

  fuelTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/FuelType',{ headers: this.headers });
  }

  findByvariantAndColorFn(varCode,ouId,ColoCd): Observable<any> {
    return this.http.get(this.ServerUrl + `/VariantMst/Variant?variant=${varCode}&ouId=${ouId}&code=${ColoCd}`,{ headers: this.headers });
  }

  serviceModelLst(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/ServModel',{ headers: this.headers });
  }




  McpPackageTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/McpPackageType',{ headers: this.headers });
  }

  McpPackageCategoryList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/McpPackageCatg',{ headers: this.headers });
  }


  AmcCouponList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/schHdr/couponLst',{ headers: this.headers });
  }

  AmcSchemeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/schHdr',{ headers: this.headers });
  }

  AmcSchemeDetails(schNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/schHdr/schemeName/${schNo}`,{ headers: this.headers });
  }

  AmcEnrollmentDetails(enrollNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/McpEnrollMst/amcEnrollNo/${enrollNo}`,{ headers: this.headers });
  }

  AmcEnrollmentDetailsRegNo(regNum): Observable<any> {
    return this.http.get(this.ServerUrl + `/McpEnrollMst/amcDtls/${regNum}`,{ headers: this.headers });
  }




  public AmcSchemeMasterSubmit(AmcSchemeMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/schHdr';
    return this.http.post(url, AmcSchemeMasterRecord, options);
  }

  public AmcEnrollMasterSubmit(AmcEnrollMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/McpEnrollMst/amcEnroll';
    return this.http.post(url, AmcEnrollMasterRecord, options);
  }


  insNameList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/Customer/ClassCode/INSURER',{ headers: this.headers });
  }

  insSiteList(customerId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/${customerId}`,{ headers: this.headers });

  }

  ripsList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus',{ headers: this.headers });
  }

  twoToneList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus',{ headers: this.headers });
  }

  holdList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus',{ headers: this.headers });
  }

  holdReasonList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/HoldReason',{ headers: this.headers });
  }
  getItemCodePach(segment): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/bySegment/${segment}`,{ headers: this.headers });
  }

  GetCustomerSiteDetails(mCustomerId, mOuId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/custsite?customerId=${mCustomerId}&ouId=${mOuId}`);
  }
  getTDSPercentage(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/TDSPer`,{ headers: this.headers })
  }

  ////////////////////////////////Supplier Master///////////////////////////

  
  getsupplierMastSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/supp',{ headers: this.headers });
  }
  getsearchBySuppCode(suppNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/supp/bycode/${suppNo}`,{ headers: this.headers });
  }
  taxCategoryListSupp(locId, state): Observable<any> {
    return this.http.get(this.ServerUrl + `/taxCtgHeader/taxCtgNameSupp?locId=${locId}&custState=${state}`,{ headers: this.headers })
  }
  supplierType(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/SuppType`,{ headers: this.headers });
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
    const url = (this.ServerUrl + '/supp/site');
    return this.http.put(url, SupliMasterRecord, options);
  }
  ///////////////////////////common Master///////////////////////
  cmnTypeList(): Observable<any> { return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus',{ headers: this.headers }); }
  applicationList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/ACStatus');
  }
  //////////////////////////////////////document sequence master//////////
  getdocSeqSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/docsrlmst',{ headers: this.headers });
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
    return this.http.get(this.ServerUrl + `/locationMst/locListOuwise/${orgCode}`,{ headers: this.headers });
  }

  getLocationById(locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/${locId}`,{ headers: this.headers });
  }


  getOrganizationId(divCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/docsrlmst/divName/${divCode}`,{ headers: this.headers });
  }
  FinancialYear(): Observable<any> {
    return this.http.get(this.ServerUrl + '/docsrlmst/getYear',{ headers: this.headers });
  }

  docTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/DocType',{ headers: this.headers });
  }
  getTransType(transType, OrgId): Observable<any> {
    return this.http.get(this.ServerUrl + `/docsrlmst/getTransTy?trnsType=${transType}&ouId=${OrgId}`,{ headers: this.headers })
  }
  getSrlNo(doctype, trantype): Observable<any> {
    return this.http.get(this.ServerUrl + `/docsrlmst/getTypeDtls?trnsType=${doctype}&TypeId=${trantype}`,{ headers: this.headers })
  }
  getcoCent(deptype): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/lookup?codeDesc=${deptype}&cmnType=Dept`,{ headers: this.headers })
  }
  /////////////////////////////EMPLOYEE MASTER////////////////////////////

  getEmpSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/empMst/All',{ headers: this.headers });
  }
  getEmpIdDetails(ticketNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/empMst/EmpTicket/${ticketNo}`,{ headers: this.headers });
  }


  getEmpIdDetails1(fullName): Observable<any> {
    return this.http.get(this.ServerUrl + `/empMst/EmpSearchByName?fullName=${fullName}`,{ headers: this.headers });
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
    return this.http.get(this.ServerUrl + `/Customer/getByAccountNo1/${customerId1}`,{ headers: this.headers });
  }
  Limitdata(ouId, custId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/getCrAmtHighAmt?ouId=${ouId}&customerId=${custId}`,{ headers: this.headers })
  }

  getsearchByAccountNo1(accountId, divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/getByAccountNo1?accountNo=${accountId}&divisionId=${divisionId}`,{ headers: this.headers });
  }

  searchCustomerByContact(contactNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/contactNo/${contactNo}`,{ headers: this.headers });
  }

  searchCustomerByAccount(accountNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/getByCustAcctNo?accountNo=${accountNo}`,{ headers: this.headers });
  }

  custAccountNoSearch(accountNo, ouId, divId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/getByAccountNo?accountNo=${accountNo}&ouId=${ouId}&divisionId=${divId}`,{ headers: this.headers });
  }

  exicutiveNameByCustName(accountNo, locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/empCust/exeDtls?accountNo=${accountNo}&locId=${locId}`,{ headers: this.headers });
  }


  crediteLimitFn(customerId, locId, customerSiteId): Observable<any> {
    return this.http.get(this.ServerUrl + `/Customer/getOutStandingDetails?billToCustId=${customerId}&locId=${locId}&customerSiteId=${customerSiteId}`,{ headers: this.headers });
  }
  /////////AccountEnquiry////////////////////
  public FinancialPeriod(): Observable<any> {
    return this.http.get(this.ServerUrl + '/glPeriod/periodName',{ headers: this.headers });
  }

  public glPeriodYear(): Observable<any> {
    return this.http.get(this.ServerUrl + '/glPeriod/periodYear',{ headers: this.headers });
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
    return this.http.get(this.ServerUrl + `/glHeader/receiptNoWise/${JVNO}`,{ headers: this.headers });
  }
  ////Receivable///////////
  public viewAccountingAR(tranNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/arInv/${tranNo}`,{ headers: this.headers });
  }

  viewAccountingMCP(tranNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/viewAccount/${tranNo}`,{ headers: this.headers });
  }


  viewApplyHistoryAR(tranNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/arInv/trxNumber/${tranNo}`,{ headers: this.headers });
  }

  ///Stock transfer////
  public viewAccountingST(tranNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/Invntory/${tranNo}`,{ headers: this.headers });
  }
  //stock taking////
  bulkstockTakinguploadCsv(formData: FormData) {

    const REQUEST_URI = this.ServerUrl + '/fileImport/uploadStkFile';
    return this.http.post(REQUEST_URI, formData);

  }
  public dataDisplay(locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/stockadj/stockList/${locId}`,{ headers: this.headers });
  }
  /////////////////////////////HSN-SAC CODE//////////////////////
  getHsnSacSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/hsnsacMst',{ headers: this.headers });
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
    return this.http.get(this.ServerUrl + '/cmnLookup/TranNature',{ headers: this.headers });
  }
  purchaseLocationList(temp): Observable<any> {
   
    return this.http.get(this.ServerUrl + `/fndAcctLookup/lookupTypeBrLoc?lookupType=SS_Branch&lookupValue=${temp}`,{ headers: this.headers });
  }

  getsearchByPOHeder(poNo, locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/poHdr/poNum?segment1=${poNo}&locId=${locId}`,{ headers: this.headers });
  }

  getsearchByPOHederPaint(poNo, locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/poHdr/paintPoNum?segment1=${poNo}&locId=${locId}`,{ headers: this.headers });
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
      headers: this.headers,
    });
  }

  taxCategoryListNew(taxCategoryName, hsnTaxPer): Observable<any> {
    return this.http.get(this.ServerUrl + `/JaiTaxCatg/taxCateDtls?taxCatType=PURCHASE&suppTaxCate=${taxCategoryName}&hsnTaxPer=${hsnTaxPer}`,{ headers: this.headers });
  }

  expenceItemDetailsList(invItemId): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/ItemDetailsExp/${invItemId}`,{ headers: this.headers });
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
      headers: this.headers,
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
      headers: this.headers,
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
      headers: this.headers,
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
      headers: this.headers,
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
      headers: this.headers,
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
      headers: this.headers,
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
    const url = '/taxDetails';
    console.log(body);
    return this.httpclient.post(url, body, options);
  }

  

  public completeInvoice(invoiceno) {
    const option = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/arInv/invComplete?invNum=${invoiceno}`;
    return this.http.put(url, option);
  }

  arInvoiceList(type): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvType/typeWise/${type}`,{ headers: this.headers });
  }
  ////////////Subinventory Transfer////////
  getsearchBySubInvTrfNo(subtrfNo, locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/mmtTrx/subInvTrf?shipmentNumber=${subtrfNo}&transferOrgId=${locId}`,{ headers: this.headers })
  }

  getPhysicalLoc(locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/physicalLoc/${locId}`,{ headers: this.headers })
  }

  public subInvTransferSubmit(subInvTransferRecord) {
    const option = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/mmtTrx/subtransfer';
    return this.http.post(url, subInvTransferRecord, option);
  }
  getsubTrfSubinventory(deptId, divId): Observable<any> {
    return this.http.get(this.ServerUrl + `/subInvMst/subIssue?deptId=${deptId}&divisionId=${divId}`,{ headers: this.headers })
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

 
  getsearchByShipmentNo(shipNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/mmtTrx/stktrf/${shipNo}`,{ headers: this.headers })
  }

  ItemIdListDept(deptId, locId, subId): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/itemDepartent1?deptId=${deptId}&locationId=${locId}&subInventoryId=${subId}`,{ headers: this.headers })
  }

  ItemIdListDeptPaint(deptId, locId, subId,clrCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/itemDepartent3?deptId=${deptId}&locationId=${locId}&subInventoryId=${subId}&colorCode=${clrCode}`,{ headers: this.headers })
  }

  ItemIdListDeptByCode(deptId, locId, subId, itemCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/itemDepartent?deptId=${deptId}&locationId=${locId}&subInventoryId=${subId}&segment=${itemCode}`,{ headers: this.headers })
  }


  Shipmentdue(frmLoc, toLoc, subInvCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvShipment/overDueList?fromLoc=${frmLoc}&toLoc=${toLoc}&subInventoryCode=${subInvCode}`,{ headers: this.headers })
  }
  viewStocknote(shipmentNumber) {
    const REQUEST_URI = this.ServerUrl + `/rcvShipment/StkTransferNote/${shipmentNumber}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }
  viewStockgatePass(shipmentNumber, empId) {
    const REQUEST_URI = this.ServerUrl + `/rcvShipment/postSTKGatepass?shipmentNumber=${shipmentNumber}&emplId=${empId}`;
    return this.http.get(REQUEST_URI, {
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
    return this.http.get(this.ServerUrl + `/itemMst/segment/${itemCd}`,{ headers: this.headers })
  }

  searchByItemDescInclude(itemDesc, divId): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/searchByLabdesc/${divId}?itemDesc=${itemDesc}`,{ headers: this.headers })
  }

  searchByItemByLoc(locId, itemid, ouId, divId): Observable<any> {
    if (ouId === 'ALL') {
      return this.http.get(this.ServerUrl + `/onhandqty/onhandItemListAll?itemId=${itemid}&divisionId=${divId}`,{ headers: this.headers })
    } else if (ouId > 0 && locId === 'ALL') {
      return this.http.get(this.ServerUrl + `/onhandqty/onhandItemListOUwise?itemId=${itemid}&ouId=${ouId}&divisionId=${divId}`,{ headers: this.headers })
    }
    else {
      return this.http.get(this.ServerUrl + `/onhandqty/onhandItemListOUwise?itemId=${itemid}&ouId=${ouId}&divisionId=${divId}&locationId=${locId}`,{ headers: this.headers })
    }
  }

  searchByItemf9(itemid, locId, ouId, divId, deptId): Observable<any> {
    if(divId===2) {
     return this.http.get(this.ServerUrl + `/itemMst/ItemDtlsF9?locId=${locId}&itemId=${itemid}&ouId=${ouId}&divisionId=${divId}&deptId=${deptId}`,{ headers: this.headers })
    } else {
      return this.http.get(this.ServerUrl + `/itemMst/PaintF9?locId=${locId}&itemId=${itemid}&ouId=${ouId}&divisionId=${divId}&deptId=${deptId}`,{ headers: this.headers })
    }

    }



    searchByItemSegmentPP( itemSeg): Observable<any> {
      return this.http.get(this.ServerUrl + `/itemMst/ByPPnonInv?segment=${itemSeg}`,{ headers: this.headers })
  }
 

  searchByItemSegmentDiv(divId, itemSeg): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/details/${divId}/${itemSeg}`,{ headers: this.headers })
  }

  searchByItemSegmentAR(itemSeg): Observable<any> {
    var divId = sessionStorage.getItem("divisionId");
    return this.http.get(this.ServerUrl + `/itemMst/${divId}/bycond?segment=${itemSeg}&isStock=N`,{ headers: this.headers })

  }
  searchByItemDescf9(divId, itemDesc): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/searchBydesc/${divId}?itemDesc=${itemDesc}`,{ headers: this.headers })
  }

  searchByItemBYSegment(divId, itemDesc): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/segment/${itemDesc}`,{ headers: this.headers })
  }


  viewReserveData(locId, invId) {
    return this.http.get(this.ServerUrl + `/reserveQty/reserveDtls?locId=${locId}&invItemId=${invId}`,{ headers: this.headers })
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
    return this.http.delete(this.ServerUrl + `/reserveQty/remove/?transactionNumber=${transno}&locId=${locId}`,{ headers: this.headers });
  }


  public reserveQtyDelete(itemCode, locId) {
    return this.http.delete(this.ServerUrl + `/reserveQty/removeSingle/?itemCode=${itemCode}&locId=${locId}`,{ headers: this.headers });
  }

  public reserveDeleteLine(transno, locId, itemId) {
    return this.http.delete(this.ServerUrl + `/reserveQty/removeItem/?transactionNumber=${transno}&locId=${locId}&invItemId=${itemId}`,{ headers: this.headers });
  }
  WorkShopIssue(locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/jobCard/jobNo?locId=${locId}`,{ headers: this.headers });
  }
  getPriceDetail(locId, itemid, subInv, repNo, divId): Observable<any> {
    return this.http.get(this.ServerUrl + `/onhandqty/onhandlocsubinv1?locId=${locId}&itemId=${itemid}&subInventoryId=${subInv}&repairNo=${repNo}&divisionId=${divId}`,{ headers: this.headers })
  }
  BillableType(): Observable<any> {
    return this.http.get(this.ServerUrl + `/billableTy`,{ headers: this.headers });
  }
  searchall(locId, divId, deptId): Observable<any> {
    return this.http.get(this.ServerUrl + `/mmtTrx/PendingRecMyloc?locationId=${locId}&divisionId=${divId}&deptId=${deptId}`,{ headers: this.headers });
  }
  searchallatother(locId, divId, deptId): Observable<any> {
    return this.http.get(this.ServerUrl + `/mmtTrx/PendingRecOthLoc?locationId=${locId}&divisionId=${divId}&deptId=${deptId}`,{ headers: this.headers });

  }
  getreserqty(locId, itemID): Observable<any> {
    return this.http.get(this.ServerUrl + `/reserveQty/locResQty?locId=${locId}&invItemId=${itemID}`,{ headers: this.headers })
  }

  getreserqtyNew(locId, itemID, locatorId, rate): Observable<any> {
    return this.http.get(this.ServerUrl + `/reserveQty/locResQty?locId=${locId}&invItemId=${itemID}&locatorId=${locatorId}&rate=${rate}`,{ headers: this.headers })
  }

  getreserqtyNew1(locId, itemID, locatorId, rate): Observable<any> {
    return this.http.get(this.ServerUrl + `/reserveQty/locResQtyPP?locId=${locId}&invItemId=${itemID}&locatorId=${locatorId}`,{ headers: this.headers })
  }



  transType(): Observable<any> {
    return this.http.get(this.ServerUrl + '/mtlTrxTypes/IPO',{ headers: this.headers });
  }
  getsearchByJob(jobno): Observable<any> {
    return this.http.get(this.ServerUrl + `/mtrlIssue/repair?repairNo=${jobno}`,{ headers: this.headers })
  }

  gettotalAmt(jobno): Observable<any> {
    return this.http.get(this.ServerUrl + `/mtrlIssue/repairAmt?repairNo=${jobno}`,{ headers: this.headers })
  }

  getsearchByIC(jobno): Observable<any> {
    return this.http.get(this.ServerUrl + `/stockadj/jobcard/${jobno}`,{ headers: this.headers })
  }

  getPaintSearchbyJc(jcNo,locId,issType){
    return this.http.get(this.ServerUrl + `/stockadj/locJobPaint?repairNo=${jcNo}&locId=${locId}&reason=${issType}`,{ headers: this.headers })
  }

  getPaintSearchbyDate(issDt,locId,issType){
    return this.http.get(this.ServerUrl + `/stockadj/locDtPaint?dte=${issDt}&locId=${locId}&reason=${issType}`,{ headers: this.headers })
    
  }

  getsearchByJCpaint(jobno): Observable<any> {
    return this.http.get(this.ServerUrl + `/stockadj/jobPaint/${jobno}`,{ headers: this.headers })
  }

  subInvCode(deptId): Observable<any> {
    return this.http.get(this.ServerUrl + `/subInvMst/wipissue/${deptId}`,{ headers: this.headers });
  }


  subInvCode2(deptId, divisionId) {
    const REQUEST_PARAMS = new HttpParams().set('deptId', deptId)
      .set('divisionId', divisionId)
    const REQUEST_URI = this.ServerUrl + '/subInvMst/wipissue/';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,
      headers: this.headers,
    });
  }
  subInvCode1(): Observable<any> {
    return this.http.get(this.ServerUrl + `/subInvMst/wipissue`,{ headers: this.headers });
  }

  issueByList(locId, deptId, divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/empMst/EmpLocDept?locId=${locId}&divisionId=${divisionId}&deptId=${deptId}`,{ headers: this.headers })
  }
  issueByListNew(deptId,locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/empMst/mangerEmplList?deptId=${deptId}&locId=${locId}`,{ headers: this.headers })
  }

  getAlterNetItem(itemId): Observable<any> {
    return this.http.get(this.ServerUrl + `/relateditems/relItems/${itemId}`,{ headers: this.headers })
  }

  paintColorCodeList(divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/onlyPn/${divisionId}`,{ headers: this.headers })
  }

  paintPanelCodeList(divisionId,cmtype): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnTypeDivision?cmnType=${cmtype}&divisionId=${divisionId}`,{ headers: this.headers })
  }

  ItemIdList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/itemMst/category',{ headers: this.headers });
  }
  ItemIdDivisionList(divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/SpAcItems/${divisionId}`,{ headers: this.headers });
  }
  getfrmSubLoc(locId, invItemId, subInventoryId): Observable<any> {
    return this.http.get(this.ServerUrl + `/onhandqty/onhandlocsubinv?locId=${locId}&itemId=${invItemId}&subInventoryId=${subInventoryId}`,{ headers: this.headers })
  }
  getWIPrice(locId, invItemId, subInventoryId, repNo, divId, deptId): Observable<any> {
    return this.http.get(this.ServerUrl + `/onhandqty/onhandlocsubinv3?locId=${locId}&itemId=${invItemId}&subInventoryId=${subInventoryId}&repairNo=${repNo}&divisionId=${divId}&deptId=${deptId}`,{ headers: this.headers })
  }
  getfrmSubLocPrice(locId, invItemId, subInventoryId): Observable<any> {
    return this.http.get(this.ServerUrl + `/onhandqty/onhandlocPrc?locId=${locId}&itemId=${invItemId}&subInventoryId=${subInventoryId}`,{ headers: this.headers })
  }
  getItemLoc(locId, subInventoryId, invItemId): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemlctrmst/byLocSubItem?locId=${locId}&subInventoryId=${subInventoryId}&itemId=${invItemId}`,{ headers: this.headers })
  }
  getSearchByTrans(reqNo): Observable<any> {

    return this.http.get(this.ServerUrl + `/mtrlIssue/reqNum/${reqNo}`,{ headers: this.headers })

  }

  getItemDetail(itemid): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/${itemid}`,{ headers: this.headers })
  }
  ////////////WorkShop Return/////////////////
  transTypereturn(): Observable<any> {
    return this.http.get(this.ServerUrl + '/mtlTrxTypes/IPOReturn',{ headers: this.headers });
  }
  issueReturn(locId1): Observable<any> {
    return this.http.get(this.ServerUrl + `/mtrlIssue/wipjob?locId=${locId1}`,{ headers: this.headers });
  }
  returnBillableType(repno): Observable<any> {
    return this.http.get(this.ServerUrl + `/mtrlIssue/jobBillable?repairNo=${repno}`,{ headers: this.headers });
  }
  itemLst(jobno, typ, subId): Observable<any> {
    return this.http.get(this.ServerUrl + `/mtrlIssue/wipItems?jobNo=${jobno}&billable=${typ}&subInventoryId=${subId}`,{ headers: this.headers });
  }
  getsubInv(subId): Observable<any> {
    return this.http.get(this.ServerUrl + `/subInvMst/subinvname/${subId}`,{ headers: this.headers });
  }
  getdivsubInv(subId, divId): Observable<any> {
    return this.http.get(this.ServerUrl + `/subInvMst/subinvname?subInventoryCode=${subId}&divisionId=${divId}`,{ headers: this.headers });
  }

  getSearchByWorkReturn(reqNo): Observable<any> {

    return this.http.get(this.ServerUrl + `/mtrlIssue/reqNumRet/${reqNo}`,{ headers: this.headers })

  }


  getretfrmSubLoc(locId, itemId, subId, jobno): Observable<any> {
    return this.http.get(this.ServerUrl + `/onhandqty/onhandJobNo/?locId=${locId}&itemId=${itemId}&subInventoryId=${subId}&jobNo=${jobno}`,{ headers: this.headers });
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
    return this.http.get(this.ServerUrl + '/subInvMst',{ headers: this.headers });
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
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/JVType',{ headers: this.headers });
  }
  SerchBydocseqval(docseqval): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/docSeqValueWise/${docseqval}`,{ headers: this.headers });
  }
  lineStatus(): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/glLinesStatus`,{ headers: this.headers });
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
    return this.http.get(this.ServerUrl + `/fndAppl`,{ headers: this.headers });
  }

  getTitle(applId): Observable<any> {
    return this.http.get(this.ServerUrl + `/FlexHeader/applWise/${applId}`,{ headers: this.headers });
  }
  getFlexField(applid, titles): Observable<any> {
    return this.http.get(this.ServerUrl + `/FlexHeader/titleAndApp?applicationId=${applid}&title=${titles}`,{ headers: this.headers });
  }

  //////////////////Jai Regime Master////////////////
  regimeTypeLisFunt(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/JaiRegimeType',{ headers: this.headers });
  }
  getJaiRegimeSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/jairegime',{ headers: this.headers });

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
    return this.http.get(this.ServerUrl + '/TaxAccounts',{ headers: this.headers });
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

  geActDetails1(mtaxTypeId): Observable<any> {
    return this.http.get(this.ServerUrl + `/taxType/taxTypeId/${mtaxTypeId}`,{ headers: this.headers });
  }
  getTaxCategorySearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/JaiTaxCatg',{ headers: this.headers });
  }

  selectTypewiseCategory(cateType): Observable<any> {
    return this.http.get(this.ServerUrl + `/JaiTaxCatg/taxCate/${cateType}`,{ headers: this.headers });
  }

  getsearchCategoryData(taxCategoryId): Observable<any> {
    return this.http.get(this.ServerUrl + `/JaiTaxCatg/${taxCategoryId}`,{ headers: this.headers });
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
    return this.http.get(this.ServerUrl + '/taxType',{ headers: this.headers });
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
    return this.http.get(this.ServerUrl + '/taxRates',{ headers: this.headers });
  }


  taxTypeIdList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/taxType',{ headers: this.headers });
  }

  // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\PRICE LIST MASTER\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  priceListIdList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/pricelist',{ headers: this.headers });
  }



  itemIdList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/itemMst',{ headers: this.headers });

  }

  itemNameList(itemId): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/${itemId}`,{ headers: this.headers });
  }


  priceDescList(priceListId): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist/${priceListId}`,{ headers: this.headers });
  }

  getItemDetailsByCode(itmCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/itemName/${itmCode}`,{ headers: this.headers });
  }

  getItemDetailsByCodeNew(itmCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/itemName1/${itmCode}`,{ headers: this.headers });
  }


  getDealerAMCLabStatus(regNo, labCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/jobCard/amcLabValidation?regNo=${regNo}&labCode=${labCode}`,{ headers: this.headers });
    
  }


  /////////////////////////////////////////////////////////
  taxTypeNameList(taxTypeId): Observable<any> {
    if (taxTypeId > 0) {
      return this.http.get(this.ServerUrl + `/taxType/${taxTypeId}`,{ headers: this.headers });
    }
  }

  locationNameList(locCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/LocationCode/${locCode}`,{ headers: this.headers });
  }

  locationNameList1(locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/locationMst/${locId}`,{ headers: this.headers });
  }

  regimeIdList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/jairegime',{ headers: this.headers });

  }

  thresholdTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/JAI_THRESHOLD_TYPE',{ headers: this.headers });

  }

  tdsVendorList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/JAI_TDS_VENDOR_TYPE',{ headers: this.headers });

  }

  tdsSectionList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/JAI_TDS_SECTION',{ headers: this.headers });
}

  tdsTaxCategoryList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/JaiTaxCatg/taxCate/TDS',{ headers: this.headers });
  }

  tdsTaxCategoryList1(): Observable<any> {
    return this.http.get(this.ServerUrl + '/JaiTaxCatg/taxCate/TDS',{ headers: this.headers });
  }


  public jaiTaxRatesMasterSubmit(JaiTaxRatesMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/JaiTaxRates/TaxRatesPost';
    return this.http.post(url, JaiTaxRatesMasterRecord, options);
  }


  getJaiTaxRateSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/taxRates',{ headers: this.headers });

  }
  
  ////////////////////////Jai Tax Category Line //////////////////

  getJaiTaxCategoryLineSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/jaiCateLines',{ headers: this.headers });
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
    if (regimeId > 0) {
      return this.http.get(this.ServerUrl + `/jairegime/${regimeId}`,{ headers: this.headers });
    }
  }



  LedgerList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/SSLedger',{ headers: this.headers });
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
    return this.http.get(this.ServerUrl + '/taxType',{ headers: this.headers });

  }

  ///////////GL CodeCombination//////////////
  branchlist(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_Branch',{ headers: this.headers });
  }

  locationlist(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_Location',{ headers: this.headers });
  }
  costcentre(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/CostCentre',{ headers: this.headers });
  }
  naturalaccount(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/NaturalAccount',{ headers: this.headers });
  }
  interbranch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/SS_Interbranch',{ headers: this.headers });
  }
  getnaturalaccount(naturalAccount1): Observable<any> {
    return this.http.get(this.ServerUrl + `/fndAcctLookup/lookupValueWise/${naturalAccount1}`,{ headers: this.headers });
  }
  getbranch(branch1): Observable<any> {
    return this.http.get(this.ServerUrl + `/fndAcctLookup/lookupValueWise/${branch1}`,{ headers: this.headers });
  }
  getloc(loc1): Observable<any> {
    return this.http.get(this.ServerUrl + `/fndAcctLookup/lookupValueWise/${loc1}`,{ headers: this.headers });
  }
  getcostCentre(costCentre1): Observable<any> {
    return this.http.get(this.ServerUrl + `/fndAcctLookup/lookupValueWise/${costCentre1}`,{ headers: this.headers });
  }
  
  glCodeCombinationSubmit(glcodecmbnmstRecord) {
    const comb = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/glCodeCmbn/GlCodeCombinations'
    return this.http.post(url, glcodecmbnmstRecord, comb)
  }
  getGlCodeCombinationSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/glCodeCmbn',{ headers: this.headers });
  }
  UpdateGlMasterById(GlMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/glCodeCmbn`);
    return this.http.put(url, GlMasterRecord, options);
  }

  cityList1(city): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/lookup?codeDesc=${city}&cmnType=City`,{ headers: this.headers });
  }
  
  getLocatorPoLines(locatorDesc, locId, subinventoryId): Observable<any> {
    return this.http.get(this.ServerUrl + `/lctrmst/nameandloc?segmentName=${locatorDesc}&locId=${locId}&subinventoryId=${subinventoryId}`,{ headers: this.headers })
  }


  getsearchByPOlines(segment1): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvShipment/rcv/${segment1}`,{ headers: this.headers });
  }

  receiptnotdonetaxDeatils(trxId, trxLineId): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvShipment/trxLineDet?trxId=${trxId}&trxLineId=${trxLineId}&updVenOnTransaction=PO_TRANSACTION`,{ headers: this.headers });
  }

  receiptdonetaxDeatils(trxId, trxLineId): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvShipment/trxLineDet?trxId=${trxId}&trxLineId=${trxLineId}&updVenOnTransaction=RCV_TRANSACTION`,{ headers: this.headers });
  }



  getsearchByReceiptNo(segment1, mLocId): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvShipment/receiptNoWise?receiptNo=${segment1}&billToLocId=${mLocId}`,{ headers: this.headers });
  }

  getsearchByGlReceiptNo(segment1): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvShipment/receiptNo?receiptNo=${segment1}`,{ headers: this.headers });
  }
  uploadVehBookings(formData: FormData) {
    return this.http.post(this.ServerUrl + `/Proforma/upload/bookings`, formData)
  }






  printRTVdocument(mRtnNumber) {
    const REQUEST_URI = this.ServerUrl + `/rcvShipment/printRTV/${mRtnNumber}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  printShortLandClaimdocument(mRtnNumber) {
    const REQUEST_URI = this.ServerUrl + `/rcvShipment/RTVPrint/${mRtnNumber}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  getsearchByReceiptNo1(segment1, mLocId): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvShipment/receiptNoWise?receiptNo=${segment1}&shipFromLocId=${mLocId}`,{ headers: this.headers });

  }


  getsearchByReceiptNoLine(mPoNumber, mRcptNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvShipment/rtvSearch?segment1=${mPoNumber}&receiptNo=${mRcptNumber}`,{ headers: this.headers });
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
    return this.http.post(url, PoReceiptRtnrRecord, options);
  }



  public poDateWiseFind(content) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/rcvShipment/DatewisePODto';
    return this.http.post(url, content, options);
  }


  POApproveDateWise(poDate, locId) {
    return this.http.get(this.ServerUrl + `/rcvShipment/rcvPoDate?poDate=${poDate}&billToLoc=${locId}`,{ headers: this.headers });
  }


  public receiptDateWiseFind(content) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/rcvShipment/DatewiseReceiptDto';
    return this.http.post(url, content, options);
  }

  getsearchByRcvSupp(rcvSupp1): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvShipment/rcvSupp1/${rcvSupp1}`,{ headers: this.headers });
  }

  viewAccounting1(receiptNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/receiptNoWise/${receiptNo}`,{ headers: this.headers });
  }



   viewAPAccounting(invoiceNum,suppId): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/apInv?invoiceNum=${invoiceNum}&suppId=${suppId}`,{ headers: this.headers });
  }



  viewPayAccounting(invoiceNum): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/docSequenceValue/${invoiceNum}`,{ headers: this.headers });
  }
  getsearchByshipmentNo(shipmentNo, locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvShipment/shipmentNo?shipmentNumber=${shipmentNo}&shipFromLocId=${locId}`,{ headers: this.headers });
  }


  viewAccountingCSRev(ordNum): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/arInv/${ordNum}`,{ headers: this.headers });
  }



  public poinvCre(segment1) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/apInv/inserDtls/${segment1}`;
    return this.http.post(url, segment1, options);
  }


  poAllRecFind(segment1, billToLoc): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvShipment/findByPONumber?segment1=${segment1}&billToLoc=${billToLoc}`,{ headers: this.headers });
  }




  downloadgrrPrint(receiptNo): Observable<any> {
    const REQUEST_URI = this.ServerUrl + `/rcvShipment/POReceipt/${receiptNo}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  delearCodeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/DealerMst',{ headers: this.headers });
  }

  getInterBranch(InterBranch1, lType): Observable<any> {

    const REQUEST_PARAMS = new HttpParams().set('lookupType', lType).set('lookupValue', InterBranch1)
    const REQUEST_URI = this.ServerUrl + '/fndAcctLookup/lookupTypeValueWise';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,
      headers: this.headers,
    });
  }

  getInterBranchNatural(): Observable<any> {
    return this.http.get(this.ServerUrl + '/naturalAcc/Payable',{ headers: this.headers });
  }

  getInterBranchNewApi(naturalAccout): Observable<any> {
    return this.http.get(this.ServerUrl + `/naturalAcc/interBranch/${naturalAccout}`,{ headers: this.headers });
  }


  lookupNameList(mlookupValue, mlookupType) {
    const REQUEST_PARAMS = new HttpParams().set('lookupType', mlookupType)
      .set('lookupValue', mlookupValue)
    const REQUEST_URI = this.ServerUrl + '/fndAcctLookup/lookupTypeValueWise';
    return this.http.get(REQUEST_URI, {
      params: REQUEST_PARAMS,
      headers: this.headers,
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
    return this.http.get(this.ServerUrl + '/cmnLookup/PriceListType',{ headers: this.headers });
  }

  PriceSubTypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/PriceListSubType',{ headers: this.headers });
  }


   PriceListIdList(mOuId, mDivId): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist/priceHdr?ouId=${mOuId}&divisionId=${mDivId}`,{ headers: this.headers });
  }


  public PriceListMasterSubmit(PriceListMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/pricelist';
    return this.http.post(url, PriceListMasterRecord, options);
  }

  UpdatePriceListById(PriceListMasterRecord, priceListHeaderId) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/pricelist`);
    return this.http.put(url, PriceListMasterRecord, options);
  }

  UpdatePriceListByIdHeader(PriceListMasterRecord, priceListHeaderId) {
    const options = {
      headers: this.headers
    };
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
    return this.http.get(this.ServerUrl + `/pricelist/prcListDto?ouId=${ouId}&divisionId=${divId}`,{ headers: this.headers });
  }

  getPriceListHistorySearch(priceListId, itemId): Observable<any> {
    return this.http.get(this.ServerUrl + `/priceHistory/itemhist?priceListHeaderId=${priceListId}&itemId=${itemId}`,{ headers: this.headers });
  }

  searchByItemDetails(segment): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/details/${segment}`,{ headers: this.headers });
  }

  getPriceListSearchNew(ouId, divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist/priceHdr?ouId=${ouId}&divisionId=${divisionId}`,{ headers: this.headers });
  }

  getLineDetails(priceListHeaderId): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist/priceDtl?priceListHeaderId=${priceListHeaderId}`,{ headers: this.headers });
  }

  getLineDetailsSingleItem(plName, itmId): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist/ItmPrcList/?priceListName=${plName}&itemId=${itmId}`,{ headers: this.headers });
  }

  getLineDetailsSingleItemNew(plName, mSeg): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist/ItmPrcListNew/?priceListName=${plName}&segment=${mSeg}`,{ headers: this.headers });
  }


  getLineDetailsWithItemBatchCode(plName, itmId, bCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist/ItmPrcBatch/?priceListName=${plName}&itemId=${itmId}&batchCode=${bCode}`,{ headers: this.headers });
  }


  public OrderGenNewItemSubmit(locId, itemCode, mths, ordNum, dlrCd, plHd) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/spareOrder/addCons?locId=${locId}&itemCode=${itemCode}&months=${mths}&p_order=${ordNum}&dlrCode=${dlrCd}&priceListHeaderId=${plHd}`;
    return this.http.post(url, options);
  }

  getNewLineConsDetails(itmId, orderNum): Observable<any> {
    return this.http.get(this.ServerUrl + `/spareOrder/ByOrderItem?&itemId=${itmId}&orderNumber=${orderNum}`,{ headers: this.headers });
  }

  ////////////////////////////OrderTypeMaster//////////////////
  UpdateOrderTypeMasterById1(OrderTypeMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/OrderTrnType`);
    return this.http.put(url, OrderTypeMasterRecord, options);
  }

  getOrderTypeSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/OrderTrnType',{ headers: this.headers });

  }
  InvSourceList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/InvoiceSource',{ headers: this.headers });
  }
  OrderCategoryList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/OrderCategory',{ headers: this.headers });
  }

  ///////////////////////// AR RECEIPT  //////////////////////////////////////

  CustomerList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/Customer',{ headers: this.headers });
  }


  ReceiptTypeArList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/ArReceiptType',{ headers: this.headers });
  }


  ReceiptStatusList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/ReceiptStatus',{ headers: this.headers });
  }

  ReceiptStateLst(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/CmnType/ReceiptState',{ headers: this.headers });
  }


  ReverseReasonList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/CmnType/ReversalReason',{ headers: this.headers });
  }

  RcptReverseReasonList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/CmnType/RcptRevReason',{ headers: this.headers });
  }

  RcptChqBounceReasonList(chqBncRsn): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/${chqBncRsn}`,{ headers: this.headers });
  }

  RcptChqBounceReasonListNew(ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/chqBounceReason/reasonList/${ouId}`,{ headers: this.headers });
  }


  RefReasonLst(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/CmnType/REFUND_REASON',{ headers: this.headers });
  }


  GLperiod(): Observable<any> {
    return this.http.get(this.ServerUrl + '/glPeriod/currentMonthPeriod',{ headers: this.headers });
  }

  public ArReceiptSubmit(ArReceiptRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/arCashReceipts/ArReceipt';
    return this.http.post(url, ArReceiptRecord, options);
  }

  

  ReverseArReceiptSubmit(ArReceiptReversalRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/arCashReceipts/ArReceiptReversal`);
    return this.http.put(url, ArReceiptReversalRecord, options);
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
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/arCashReceipts/unapplyRcptManNew/${mRcptNo}`);
    return this.http.put(url, ArReceiptUnApplyRecord, options);
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
      return this.http.get(this.ServerUrl + `/arCashReceipts/Search?receiptNumber=${rcptNumber}&orgId=${ouId}`,{ headers: this.headers });
    }

  }


  gatePassStatusCheck(soNumber): Observable<any> {
      return this.http.get(this.ServerUrl + `/orderHeader/getSaleOrder/${soNumber}`,{ headers: this.headers });
  }

  


  getArReceiptSearchByRcptNoByloc(rcptNumber, ouId, locId, deptId): Observable<any> {
    if (rcptNumber != undefined || rcptNumber != null) {
      return this.http.get(this.ServerUrl + `/arCashReceipts/Search/${deptId}?receiptNumber=${rcptNumber}&orgId=${ouId}&locId=${locId}`,{ headers: this.headers });
     
    }
  }

  SearchRcptByDate(rcptDate, ouId, locId, deptId): Observable<any> {
    
    return this.http.get(this.ServerUrl + `/arCashReceipts/Search/${deptId}?receiptDate='${rcptDate}'&orgId=${ouId}&locId=${locId}`,{ headers: this.headers })
  }


  SearchRcptByCustNo(custActNo, ouId, locId, deptId): Observable<any> {
    
    return this.http.get(this.ServerUrl + `/arCashReceipts/Search/${deptId}?accountNo=${custActNo}&orgId=${ouId}&locId=${locId}`,{ headers: this.headers });

  }

  getArReceiptDetailsByRcptNo(rcptNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/arCashReceipts/receipt/${rcptNumber}`,{ headers: this.headers });
  }

  getArReceiptDetailsByRcptNoAndloc(rcptNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/arCashReceipts/receipt/${rcptNumber}?locId=` + sessionStorage.getItem('locId'),{ headers: this.headers });
  }



  getArReceiptDetailsByRcptNoAndlocDeptIDAccou(rcptNumber, locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/arCashReceipts/receipt/${rcptNumber}?locId=` + locId,{ headers: this.headers });
  }


  getArReceiptAppliedHistory(rcptNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/arCashReceipts/receipt/${rcptNumber}`,{ headers: this.headers });
  }



  getArReceiptSearchByInvoiceNo(custAccountNo, billToSiteId, rcptNo, loginDeptId): Observable<any> {
   
    return this.http.get(this.ServerUrl + `/arCashReceipts/apply/inv?recepitNo=${rcptNo}&custAccountNo=${custAccountNo}&billToSiteId=${billToSiteId}&loginDeptId=${loginDeptId}`,{ headers: this.headers });

  }


  getCreditMemoSearchByInvoiceNo(custAccountNo, billToSiteId, crMemoNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/arCashReceipts/apply/cm?creditNo=${crMemoNo}&custAccountNo=${custAccountNo}&billToSiteId=${billToSiteId}`,{ headers: this.headers });
    
  }


  viewAccountingArReceipt(receiptNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/docSequenceValue/${receiptNo}`,{ headers: this.headers });
    
  }

  ////////////////////////// CREDIT MEMO APPLICATION /////////////////////
  public CreditMemmoApplySubmit(creditMemoApplyRecord, mCrmNo) {
   
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/arInv/apply/inv/${mCrmNo}`);
    return this.http.post(url, creditMemoApplyRecord, options);
  }
  ////////////////////////// ///////////////////////////////////////


  PaymentModeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/PayType',{ headers: this.headers });
  }

  PaymentModeListPP(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/PP_PayType',{ headers: this.headers });
  }

  ReceiptMethodList(mPaytype, mLocId, mStatus): Observable<any> {
    return this.http.get(this.ServerUrl + `/receiptMethod?methodType=${mPaytype}&locId=${mLocId}&status=${mStatus}`,{ headers: this.headers });
  }

  ReceiptMethodListNew(mPaytype, mStatus, deptId, mOrgId): Observable<any> {
    return this.http.get(this.ServerUrl + `/receiptMethod/rctMethodDeptwise?methodType=${mPaytype}&status=${mStatus}&attribute2=${deptId}&orgId=${mOrgId}`,{ headers: this.headers });
   
  }

  ///////////////////////////AVERAGE COST UPDATE//////////////////////////

  avgCurrentCost(mitemId, mLocId): Observable<any> {
    return this.http.get(this.ServerUrl + `/averageCost/avgLocItem?locationId=${mLocId}&itemId=${mitemId}`,{ headers: this.headers });
  }

  public AvgCostUpdateSubmit(AvgCostUpdateRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/averageCost';
    return this.http.post(url, AvgCostUpdateRecord, options);
  }

  
  getAvgHistoryList(mLocId, mitemId, frmDate, toDate): Observable<any> {
    return this.http.get(this.ServerUrl + `/averageCost/avghistory?locationId=${mLocId}&itemId=${mitemId}&startDate=${frmDate}&endDate=${toDate}`,{ headers: this.headers });
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
   
  }
  ////////////////////////////// Back order File upload /////////



  orderCancellationUpload(formData: FormData, emplId,receiptMethodName) {
    
    let headers1 = new HttpHeaders();
    formData.append('empId', emplId);
    formData.append('bankAc', receiptMethodName);
    return this.http.post(this.ServerUrl + `/Proforma/cancel/bookings`, formData)
   
  }

  public orderGenBajaj(ordeGenRecord, mLocId, mths, dlrCd, plHd, ordNum) {
   
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/spareOrder?locId=${mLocId}&months=${mths}&dlrCode=${dlrCd}&priceListHeaderId=${plHd}&p_order=${ordNum}`;
    return this.http.post(url, ordeGenRecord, options);
  }



  getOrderListBajaj(ordNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/spareOrder/ByOrderNumber/${ordNumber}`,{ headers: this.headers });
  
  }

  getOrderNumberLatest(mLocId): Observable<any> {
    return this.http.get(this.ServerUrl + `/spareOrder/Order?locId=${mLocId}`,{ headers: this.headers });
    
  }



  orderLineDelete(ordNumber, itemId) {
    return this.http.delete(this.ServerUrl + `/spareOrder/removeLine?OrderNumber=${ordNumber}&itemId=${itemId}`,{ headers: this.headers });
  }

  OrderLineAddUpdate(orderLineRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/spareOrder/addLine`);
    return this.http.post(url, orderLineRecord, options);

  }





  ///////////////////////////////////////////////////////////////////////////////////
 
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


  pendingPOList(emplId) {
    return this.http.get(this.ServerUrl + `/poHdr/user/All?userId=${emplId}`,{ headers: this.headers })
  }

  getPOByUser(emplId, startDt, endDt, locId) {
    return this.http.get(this.ServerUrl + `/poHdr/byDate?userId=${emplId}&startDt=${startDt}&endDt=${endDt}&locId=${locId}`,{ headers: this.headers })
  }

  getsearchApInvList(ouId, startDt, endDt) {
    return this.http.get(this.ServerUrl + `/apInv/SearchDateWise?orgId=${ouId}&frmInvoiceDate=${startDt}&toInvoiceDate=${endDt}`,{ headers: this.headers })
  }

  getPOByUserAccc(deptId, startDt, endDt, locId) {
    return this.http.get(this.ServerUrl + `/poHdr/Acc/byDate?deptId=${deptId}&startDt=${startDt}&endDt=${endDt}&locId=${locId}`,{ headers: this.headers })
  }

  getOrderByUser(locId, startDt, endDt, deptId) {
    return this.http.get(this.ServerUrl + `/orderHeader/getByDate?locId=${locId}&startDt=${startDt}&endDt=${endDt}&dept=${deptId}`,{ headers: this.headers })
  }

  getemwayBill(startDt, endDt, locId, deptId) {
    return this.http.get(this.ServerUrl + `/arRecvTrx/EwayInv?fromDate=${startDt}&toDate=${endDt}&locId=${locId}&deptId=${deptId}`,{ headers: this.headers })
  }

  getemwayBillcustNo(startDt, endDt, locId, deptId, custAccNo) {
    return this.http.get(this.ServerUrl + `/arRecvTrx/EwayList?fromDate=${startDt}&toDate=${endDt}&locId=${locId}&custAccountNo=${custAccNo}`,{ headers: this.headers })
  }

  EwayBill(trxNumber) {
    const REQUEST_URI = this.ServerUrl + `/SparesReports/EwayBillRep?trxNumber=${trxNumber}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  getLaborByUser(ouId) {
    return this.http.get(this.ServerUrl + `/pricelist/laborPrice/${ouId}`,{ headers: this.headers })
  }

  getClosingStock(ouId) {
    return this.http.get(this.ServerUrl + `/orderHeader/onHandList/${ouId}`,{ headers: this.headers })
  }

  getSalesOrderByUser(locId, startDt, endDt, deptId) {
    return this.http.get(this.ServerUrl + `/orderHeader/getByDateOM?startDt=${startDt}&endDt=${endDt}&locId=${locId}&dept=${deptId}`,{ headers: this.headers })
  }

  getRtoDataList(startDt, endDt, ouId, locId) {
    return this.http.get(this.ServerUrl + `/orderHeader/getRTOList?fromDate=${startDt}&toDate=${endDt}&ouId=${ouId}&locId=${locId}`,{ headers: this.headers })
  }


  getModelWisePrice(orgId) {
    return this.http.get(this.ServerUrl + `/orderHeader/priceModelwise/${orgId}`,{ headers: this.headers })
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
    return this.http.get<OPMasterDtoComponent[]>(this.ServerUrl + `/header/FileList?userId=` + userId1,{ headers: this.headers });
    
  }
  //////////////////////////EXTENDED WARRANTY/////////////////////////////


  EwSourceList(): Observable<any> {

    return this.http.get(this.ServerUrl + '/cmnLookup/type/EWSource',{ headers: this.headers });
  }

  EwSchemeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/EWScheme',{ headers: this.headers });
  }

  EWSlabList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/EWSlab',{ headers: this.headers });
  }


  EwTypeList(divId): Observable<any> {
   
    return this.http.get(this.ServerUrl + `/cmnLookup/Catgtype?cmnType=EWType&divisionId=${divId}`,{ headers: this.headers });
    

  }

  EwCancelReasonList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/EW CANCEL REASON',{ headers: this.headers });
  }


  ModelVariantList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/Variant',{ headers: this.headers });
  }

  varianListFn(id:number): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/mainModelWiseVariant?mainModel=${id}`,{ headers: this.headers });
  }

  colorListFn(id:number): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/variantWiseColor?variantid=${id}`,{ headers: this.headers });
  }


public saveVariantMstFn(variantMaster) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/VariantMst/AddVariant ';
    return this.http.post(url, variantMaster, options);
  }



  PremiumPeriodList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/EWPeriod',{ headers: this.headers });
  }

  getEWSchemeSearch(mOuId): Observable<any> {
   
    return this.http.get(this.ServerUrl + `/EwScheme/ouEwScheme?ouId=${mOuId}`,{ headers: this.headers });
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
    return this.http.get(this.ServerUrl + `/itemMst/regList/1`,{ headers: this.headers });
  }

  VehVinList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/vinList`,{ headers: this.headers });
  }

  getEWSlabDetailsByCodeDesc(mCode): Observable<any> {
   
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnTypeCode?code=${mCode}&cmnType=EWSlab`,{ headers: this.headers });
  }

  getSectionTdsDetailsByCode(mCode): Observable<any> {
   
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnTypeCode?code=${mCode}&cmnType=JAI_TDS_SECTION`,{ headers: this.headers });
  }

  EwSchemeItemList(mVariant, mOuId, mAging, mKms): Observable<any> {
 
    return this.http.get(this.ServerUrl + `/EwScheme/ewvariant?variant=${mVariant}&ouId=${mOuId}&aging=${mAging}&kms=${mKms}`,{ headers: this.headers });
  }

  getEWSchemeDetails(mSchemeId): Observable<any> {

    if (mSchemeId > 0) {
    
      return this.http.get(this.ServerUrl + `/EwScheme/${mSchemeId}`,{ headers: this.headers });
    }
  }

  variantDetailsList(mVariant): Observable<any> {

    return this.http.get(this.ServerUrl + `/VariantMst/VariantDesc/${mVariant}`,{ headers: this.headers });
  }

  getVariantList(): Observable<any> {

    return this.http.get(this.ServerUrl + `/VariantMst/Variants`,{ headers: this.headers });
  }


  getVehRegDetails(mRegNumber): Observable<any> {

    return this.http.get(this.ServerUrl + `/VehAddInfo/RegNo/${mRegNumber}`,{ headers: this.headers });
  }

  getVehRegDetailsNew(mRegNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/VehAddInfo/ws/RegNo/${mRegNumber}`,{ headers: this.headers });
    
  }

  getVehRegDetail(RegNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/VehAddInfo/valwarr/${RegNo}`,{ headers: this.headers });
  }
  getVehDetailsByModelChassis(mdl, chas): Observable<any> {
    return this.http.get(this.ServerUrl + `/VehAddInfo/ws/mdlChs?mainModel=${mdl}&chassisNo=${chas}`,{ headers: this.headers });
    
  }




  getWsVehRegDetails(mRegNumber): Observable<any> {
   
    return this.http.get(this.ServerUrl + `/VehAddInfo/ws/RegNo/${mRegNumber}`,{ headers: this.headers });
  }

  getVehVinDetails(mVin): Observable<any> {
   
    return this.http.get(this.ServerUrl + `/VehAddInfo/VinInfo/${mVin}`,{ headers: this.headers });
  }


  getEWCustomerSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + `/ewmaster`,{ headers: this.headers });
  }

  getEWCustomerSearchByEWNo(mEWNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/ewmaster/${mEWNo}`,{ headers: this.headers });
  }

  getVehicleOrderDetails(mOrderNumber): Observable<any> {
   
    return this.http.get(this.ServerUrl + `/SsMcpEnqMst/Sales/${mOrderNumber}`,{ headers: this.headers });
   
  }

  getVehicleOrderDetailsNew(mOrderNumber): Observable<any> {
   
    return this.http.get(this.ServerUrl + `/SsMcpEnqMst/SalesEW/${mOrderNumber}`,{ headers: this.headers });
   
  }


  getEWStatusVehcile(mRegno): Observable<any> {
    
    return this.http.get(this.ServerUrl + `/ewmaster/ewvehicle/${mRegno}`,{ headers: this.headers });
  }

  getLastRunKms(mRegno): Observable<any> {
    
    return this.http.get(this.ServerUrl + `/jobCard/lastKms?regNo=${mRegno}`,{ headers: this.headers });

  }


  EwClaimedCheck(mRegno): Observable<any> {
    
    return this.http.get(this.ServerUrl + `/jobCard/ewjobNo?regNo=${mRegno}&billableTyName=Extended Warranty`,{ headers: this.headers });

  }


  public saveWSVehicle(wsVehicleDetails) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/VehAddInfo/ws';
    return this.http.post(url, wsVehicleDetails, options);
  }


  UpdateWsVehicleMaster(wsVehMasterRecord) {
   
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/VehAddInfo/ws`);
    return this.http.put(url, wsVehMasterRecord, options);
   
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

    return this.http.get(this.ServerUrl + `/SsMcpEnqMst/McpRegCheck/${mRegno}`,{ headers: this.headers });

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
    return this.http.get(this.ServerUrl + '/McpItemMst',{ headers: this.headers });
  }

  getMcpPackageSearch(): Observable<any> {
    return this.http.get(this.ServerUrl + '/PackageMst',{ headers: this.headers });
  }

  getMcpPackageSearchNew1(mPkgType, mFuelType, mOuId): Observable<any> {
    
    return this.http.get(this.ServerUrl + `/PackageMst/PkgTypeAndFuelType?packageType=${mPkgType}&fuelType=${mFuelType}&ouId=${mOuId}`,{ headers: this.headers });

  }

  getMcpPackageSearchNew2(mPkgNo, mFuelType, mOuId): Observable<any> {
    
    return this.http.get(this.ServerUrl + `/PackageMst/PkgNoFuelOuId?packageNumber=${mPkgNo}&fuelType=${mFuelType}&ouId=${mOuId}`,{ headers: this.headers });
   
  }

  getMcpPackageSearchByPkgId(mPkgId): Observable<any> {
    return this.http.get(this.ServerUrl + `/PackageMst/${mPkgId}`,{ headers: this.headers });
  }

  getMcpPackagePriceDetails(mPkgNo, mFuelType, mPtype, mOuId, mVariant, mCustSite, mLocId): Observable<any> {
    
    return this.http.get(this.ServerUrl + `/SsMcpEnqMst/McpPrcDetails?packageNumber=${mPkgNo}&fuelType=${mFuelType}&packageType=${mPtype}&ouId=${mOuId}&variantCode=${mVariant}&customerSiteId=${mCustSite}&locId=${mLocId}`,{ headers: this.headers });
  }

  getMcpPackageLineDetails(mPkgNo, mFuelType, mOuId, mVariant, mCustSite, mLocId): Observable<any> {
    
    return this.http.get(this.ServerUrl + `/SsMcpEnqMst/PkgLineDtls?packageNumber=${mPkgNo}&fuelType=${mFuelType}&ouId=${mOuId}&variantCode=${mVariant}&customerSiteId=${mCustSite}&locId=${mLocId}`,{ headers: this.headers });
  }


  public McpPackageMasterSubmit(McpPkgMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/PackageMst';
    return this.http.post(url, McpPkgMasterRecord, options);
  }

 

  UpdateMcpPackageMaster(McpPkgMasterRecord) {
    const options = {
      headers: this.headers
    };
   
    const url = (this.ServerUrl + `/PackageMst`);
    return this.http.put(url, McpPkgMasterRecord, options);
  }


  mcpSchemeList(mRegNo, mKms): Observable<any> {
    
    return this.http.get(this.ServerUrl + `/SsMcpEnqMst/validPkgDtls?regNo=${mRegNo}&currKms=${mKms}`,{ headers: this.headers });
  }

  public McpEnquiryMasterSubmit(McpEnquiryMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/SsMcpEnqMst';
    return this.http.post(url, McpEnquiryMasterRecord, options);
  }





  getsearchByEnqNo(mEnqNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/SsMcpEnqMst/enqNo/${mEnqNo}`,{ headers: this.headers });
  }

  getsearchMcpEnqByRegNo(mRegNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/SsMcpEnqMst/enqRegNo/${mRegNo}`,{ headers: this.headers });
  }

  getValidMcpEnqList(mRegno): Observable<any> {
    
    return this.http.get(this.ServerUrl + `/McpEnrollMst/McpEnqList/${mRegno}`,{ headers: this.headers });
  }
  getEnrolledMcpEnqList(mEnqNo): Observable<any> {
   
    return this.http.get(this.ServerUrl + `/McpEnrollMst/McpEnqDtls/${mEnqNo}`,{ headers: this.headers });
   
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
    return this.http.get(this.ServerUrl + `/McpEnrollMst/enrollmentNo//${mEnrollNo}`,{ headers: this.headers });
  }

  getMcpSearchByEnrollNo(mEnrollNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/McpEnrollMst/enrollmentNo/${mEnrollNo}`,{ headers: this.headers });
  }

  getMcpSearchByRegNo(mRegNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/McpEnrollMst/enrollSearchBy/${mRegNo}`,{ headers: this.headers });
  }

  ////////////////////////MCP ITEM MAPPING////////////////////////
  mcpItemMappingSearch1(mItemNum, mFtype, mSrvModel, mOuId): Observable<any> {
    return this.http.get(this.ServerUrl + `/SsErpItemMst/ItemSearch?itemNumber=${mItemNum}&serviceModel=${mSrvModel}&fuelType=${mFtype}&ouId=${mOuId}`,{ headers: this.headers });
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
    if ((mEnrollNo == undefined || mEnrollNo == null) && (mRegNo != null)) {
      return this.http.get(this.ServerUrl + `/McpEnrollMst/mcpCancel?regNo=${mRegNo}`,{ headers: this.headers });
    }

    if ((mRegNo == undefined || mRegNo == null) && (mEnrollNo != null)) {
      return this.http.get(this.ServerUrl + `/McpEnrollMst/mcpCancel?enrollmentNo=${mEnrollNo}`,{ headers: this.headers });
    }

    if ((mRegNo != null) && (mEnrollNo != null)) {
      return this.http.get(this.ServerUrl + `/McpEnrollMst/mcpCancel?regNo=${mRegNo}&enrollmentNo=${mEnrollNo}`,{ headers: this.headers });
    }
  }


  mcpRegSearchByEnrollNo(mEnrollNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/McpEnrollMst/mcpCancel?enrollmentNo=${mEnrollNo}`,{ headers: this.headers });
  }


  McpCancelUpdate(McpCancelrRecord) {
    const options = {
      headers: this.headers
    };

    const url = (this.ServerUrl + `/McpEnrollMst/mcpCancByEnroll`);
    return this.http.put(url, McpCancelrRecord, options);
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
    return this.http.get(this.ServerUrl + '/McpItemMst',{ headers: this.headers });
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
    return this.http.get(this.ServerUrl + '/jaiApTdsHdr',{ headers: this.headers });

  }
// //////////////////   PAINT Miscell Transaction //////////////////////////

TransactionTypemiscpPaint(): Observable<any> {
  return this.http.get(this.ServerUrl + `/mtlTrxTypes/stockAdj/9`,{ headers: this.headers });
}

  // //////////////////   Miscell Transaction //////////////////////////

  TransactionType(): Observable<any> {
    return this.http.get(this.ServerUrl + '/mtlTrxTypes/9',{ headers: this.headers });
  }
  TransactionTypemisc(): Observable<any> {
    return this.http.get(this.ServerUrl + `/mtlTrxTypes/stockAdj/9`,{ headers: this.headers });
  }
  TransactionTypeIC(): Observable<any> {
    return this.http.get(this.ServerUrl + `/mtlTrxTypes/IC/9`,{ headers: this.headers });
  }

  ReasonList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/mtlTransReasons',{ headers: this.headers });
  }

  PaintReasonList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/mtlTransReasons/paint',{ headers: this.headers });
  }

  reasonaccCode(locId, reason, costCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/mtlTransReasons/reason?locId=${locId}&reasonName=${reason}&costCode=${costCode}`,{ headers: this.headers })
  }
  TypeList(): Observable<any> {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/StockAdjType',{ headers: this.headers });
  }


  WorkShopIcIssue(locId, type): Observable<any> {
    return this.http.get(this.ServerUrl + `/jobCard/icTypeJobList?locId=${locId}&icType=${type}`,{ headers: this.headers });
  }

  ItemIdList1(locationId, subInv): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/OnHandItemLst?locId= ${locationId}&subInvCode=${subInv}`,{ headers: this.headers })
  }
  getItemDetail11(locId, itemId, subInvCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/itemMst/OnHandItemDtls?locId=${locId}&subInvCode=${subInvCode}&itemId=${itemId}`,{ headers: this.headers })
  }
  LocatorNameList(LocName, LocId, subinventoryId): Observable<any> {
    return this.http.get(this.ServerUrl + `/lctrmst/nameandloc?segmentName=${LocName}&locId=${LocId}&subinventoryId=${subinventoryId}`,{ headers: this.headers })
  }
  getCostDetail(locId, ItemId): Observable<any> {
    return this.http.get(this.ServerUrl + `/averageCost/avgLocItem?locationId=${locId}&itemId=${ItemId}`,{ headers: this.headers })
  }

  getCostDetailforWarranty(locId, ItemId): Observable<any> {
    return this.http.get(this.ServerUrl + `/averageCost/item/mrp?locationId=${locId}&itemId=${ItemId}`,{ headers: this.headers })
  }


  viewMiscnote(stkAdjustNumber) {
   
    const REQUEST_URI = this.ServerUrl + `/stockadj/stockAdjustVoucher/${stkAdjustNumber}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }


  getonhandqtySubinvLoc(locId, subId, Itemid): Observable<any> {
    return this.http.get(this.ServerUrl + `/onhandqty/onhandlocsubinv2?locId=${locId}&itemId=${Itemid}&subInventoryId=${subId}`,{ headers: this.headers })
  }

  getonhandqty(locId, subId, locatorId, Itemid): Observable<any> {
    return this.http.get(this.ServerUrl + `/onhandqty/locator?locationId=${locId}&subInventoryId=${subId}&locatorId=${locatorId}&itemId=${Itemid}`,{ headers: this.headers })
  }


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
    return this.http.get(this.ServerUrl + `/stockadj/compileNo/${compNo}`,{ headers: this.headers });
  }
  getSearchViewBycompNo(compNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/stockadj/compileall/${compNo}`,{ headers: this.headers })
  }
  getSearchViewByIc(compNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/stockadj/IC/${compNo}`,{ headers: this.headers })
  }
  getSearchBycompNo(compNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/stockadj/compileadj/${compNo}`,{ headers: this.headers });
  }
  getsearchByCompId(compileId, itemId): Observable<any> {
    return this.http.get(this.ServerUrl + `/cycleline?compileId=${compileId}&invItemId=${itemId}`,{ headers: this.headers });
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
    return this.http.get(this.ServerUrl + `/apInv/apTdsDis?invId=${mInvoiceId}`,{ headers: this.headers });
  }

  cancelApInvoice(mInvoiceId, mEmplId): Observable<any> {
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
    return this.http.get(this.ServerUrl + `/poHdr/potaxcal?itemId=${mItemId}&baseAmt=${mBaseAmt}&taxCateId=${mTaxCatId}`,{ headers: this.headers });
  }

  getPOReceiptSearchByRcptNo(mReceiptNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvShipment/receiptNoWise/${mReceiptNo}`,{ headers: this.headers })
   
  }

  getPOReceiptSearchByPONo(mPoNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvShipment/findByPONumber/${mPoNumber}`,{ headers: this.headers })
  }


  
  ///////////////////////// CASH BANK TRANSFER //////////////////////

  TransferTypeLst(): Observable<any> {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/TranType',{ headers: this.headers });
  }

  PeriodLst(): Observable<any> {
    return this.http.get(this.ServerUrl + '/AccountTrf/glPayablePeriod',{ headers: this.headers });
   
  }


  fromAcctLst(mLocId): Observable<any> {
    return this.http.get(this.ServerUrl + `/AccountTrf/fromAcctList?locId=${mLocId}`,{ headers: this.headers });
    
  }

  toAcctLst(mLocId): Observable<any> {
    return this.http.get(this.ServerUrl + `/AccountTrf/toAcctList/${mLocId}`,{ headers: this.headers });
    
  }

  bnkHeaderList(mLocId): Observable<any> {
    return this.http.get(this.ServerUrl + `/cmnLookup/CmnType/BankTrfHeader`,{ headers: this.headers });
   
  }


  getFromAcList(trfType, ouId): Observable<any> {
   
    return this.http.get(this.ServerUrl + `/AccountTrf/AcctListNew?tranType=${trfType}&ouId=${ouId}`,{ headers: this.headers });
  }

  getPayRecAccountCode(methodId, ouId, divId, locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/AccountTrf/AcctCodeList?receiptMethodId=${methodId}&ouId=${ouId}&divisionId=${divId}&locId=${locId}`,{ headers: this.headers });
   

  }

  xxxgetGlAccountBalance(glCode, prdName): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/accGlBalances?segmentNameFrm=${glCode}&periodName=${prdName}`,{ headers: this.headers });
  }

  public getGlAccountBalance(glCode, prdName) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/glHeader/accGlBalances?segmentNameFrm=${glCode}&periodName=${prdName}`);
    return this.http.post(url, options);
    
  }

  getGlAccountBalanceNew(glCode, prdName): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/accGlBalances?segmentNameFrm=${glCode}&periodName=${prdName}`,{ headers: this.headers });
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
  }


  arRcptUpdate(ArRcptUpdateRecord, docTrfNum) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/AccountTrf/ArSaveUpdate?docTrfNo=${docTrfNum}`);
    return this.http.put(url, ArRcptUpdateRecord, options);
  }


  public CashBankTrfPostSubmit(CashBankTrfRecord, mEmplId) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/AccountTrf/AcctTrfPost?emplId=${mEmplId}`;
    return this.http.post(url, CashBankTrfRecord, options);

  }


  public CashBankTrfReversalSubmit(docTrfNo, mEmplId,reversalPeriod,reversalDate,reversalLocId) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/AccountTrf/Reversed?docTrfNo=${docTrfNo}&emplId=${mEmplId}&reversalPeriod=${reversalPeriod}&reversalDate=${reversalDate}&reversalLocId=${reversalLocId}`;
    return this.http.post(url, options);
  }

  getBnkTrfSearchByDocNum(docNo, ouId): Observable<any> {
   
    return this.http.get(this.ServerUrl + `/AccountTrf/trfDocSearch?docTrfNo=${docNo}&ouId=${ouId}`,{ headers: this.headers });
  }

  getBnkTrfSearchByDate(fDate, tDate, ouId): Observable<any> {
    return this.http.get(this.ServerUrl + `/AccountTrf/TrfDtList?frmDate=${fDate}&toDate=${tDate}&ouId=${ouId}`,{ headers: this.headers });
   
  }

  getBnkChqListPosted(docNumber): Observable<any> {
    return this.http.get(this.ServerUrl + `/AccountTrf/trfRcptSearch/${docNumber}`,{ headers: this.headers });
   
  }

  getBnkChqList(bankId, rcptMthId, locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/AccountTrf/CounterList?bankId=${bankId}&receiptMethodId=${rcptMthId}&locId=${locId}`,{ headers: this.headers });
   
  }

  getBnkChqListDocNum(locId, rcptMthId, docTrf): Observable<any> {
    return this.http.get(this.ServerUrl + `/AccountTrf/trfRcptUpdate?locId=${locId}&receiptMethodId=${rcptMthId}&docTrfNo=${docTrf}`,{ headers: this.headers });
   
  }

  viewAccountingBankTransfer(trfNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/AccountTrf/${trfNo}`,{ headers: this.headers });
   
  }


  ////////////////////////// Pending Shipment Lis///////////

  getShipmentList(locId, deptId, divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/rcvShipment/shipmentList?billToLoc=${locId}&deptId=${deptId}&divisionId=${divisionId}`,{ headers: this.headers });
  }

  /////////////////////////RECEIVABLE TRANSACTION TYPE MASTER ///////////////////////

  recTypeClass() {
    return this.http.get(this.ServerUrl + '/cmnLookup/type/RcvClass',{ headers: this.headers });
  }

  recCategoryBase() {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/AccountingBase',{ headers: this.headers });
  }

  recRecAcList() {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/NaturalAccount',{ headers: this.headers });
  }

  recRevAcList() {
    return this.http.get(this.ServerUrl + '/fndAcctLookup/lookupTypeWise/NaturalAccount',{ headers: this.headers });
  }


  recCreditMemoType(classType) {
    return this.http.get(this.ServerUrl + `/rcvType/typeWise/${classType}`,{ headers: this.headers });
   
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
   
    return this.http.get(this.ServerUrl + `/ceBankAccounts/BankList?methodType=${methodType}&ouId=${mouId}`,{ headers: this.headers });
  }



  getBankReconStatement1(bnkId, ouId): Observable<any> {
   
    return this.http.get(this.ServerUrl + `/ceStateHdr/accoutWiseHdrList?bankAccountId=${bnkId}&orgId=${ouId}`,{ headers: this.headers });
  }

  getAvlBankReconLines(bnkNo, vchNo, dt1, dt2, amt1, amt2, refType, bnkId): Observable<any> {
   
    if (refType === 'PAYMENT') {
      return this.http.get(this.ServerUrl + `/apInvPayment/apPaymentDetails?bankAccNo=${bnkNo}&vouNo=${vchNo}&frmDt=${dt1}&toDate1=${dt2}&frmAmt=${amt1}&toAmt=${amt2}`,{ headers: this.headers });
    }

    if (refType === 'RECEIPT') {
      return this.http.get(this.ServerUrl + `/arCashReceipts/arReceiptDetails?bankAccNo=${bnkNo}&vouNo=${vchNo}&frmDt=${dt1}&toDate1=${dt2}&frmAmt=${amt1}&toAmt=${amt2}`,{ headers: this.headers });
    }

    if (refType === 'CASHFLOW') {
      return this.http.get(this.ServerUrl + `/AccountTrf/cashBankTrf?bankAccountId=${bnkId}&frmDt=${dt1}&toDate1=${dt2}&frmAmt=${amt1}&toAmt=${amt2}`,{ headers: this.headers });
    }

  }


  getReconciledDetails(sLineId): Observable<any> {
   
    return this.http.get(this.ServerUrl + `/ceStateHdr/recoDetails/${sLineId}`,{ headers: this.headers });
    
  }

  getBankStatementDetails(sHeaderId): Observable<any> {
   
    return this.http.get(this.ServerUrl + `/ceStateHdr/${sHeaderId}`,{ headers: this.headers });
    
  }

  viewAccountingApReceipt(paymentNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/docSequenceValue/${paymentNo}`,{ headers: this.headers });

  }
  viewAccountingbyApReceipt(paymentNo, invoiceId): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/docSequenceValue?receiptNo=${paymentNo}&invoiceId=${invoiceId}`,{ headers: this.headers });

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
 
    let headers1 = new HttpHeaders();
    var userId1 = sessionStorage.getItem('userId');
    console.log(docType);
    var docType1 = formData.get('docType');
    formData.append('orgId', mouId);
    formData.append('bankAccountId', bnkAcccountId);
    formData.append('statementNumber', stNumber);
    
    return this.http.post(this.ServerUrl + `/fileImport/uploadBankStmt`, formData)
    
  }

  /////////////////////////////////GL TRIAL BALANCE //////////////
  getGLTrialBalanceList(ou, prdName): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/drillDownHeader?segment1=${ou}&periodName=${prdName}`,{ headers: this.headers });
  }

  getGLTrialBalanceActSelect(ou, prdName, natAc): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/drillDownGLWise?segment1=${ou}&naturalAccount=${natAc}&periodName=${prdName}`,{ headers: this.headers });
  }

  getGLTrialBalanceActSelect1(seg, docNum, refNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/glHeader/drillDownTypeWise?segment1=${seg}&docSeqValue=${docNum}&docSequenceValue=${refNo}`,{ headers: this.headers });
    
  }



  ////////////////////customer relation manager master //////////////////////
  employeeLst(locId, divId, deptId): Observable<any> {
    return this.http.get(this.ServerUrl + `/empMst/EmpLocDept?locId=${locId}&divisionId=${divId}&deptId=${deptId}`,{ headers: this.headers });
   
  }

  getCustomerEmpMapList(empId, p1, s1): Observable<any> {
    return this.http.get(this.ServerUrl + `/empCust?emplId=${empId}&page=${p1}&size=${s1}`,{ headers: this.headers });
   
  }

  customerEmpMapSearch(custNo, locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/empCust/exeDtls?accountNo=${custNo}&locId=${locId}`,{ headers: this.headers });
   
  }

  customerEmpMapSearchNew(custNo, locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/empCust/custDtls?custAccountNo=${custNo}&locId=${locId}`,{ headers: this.headers });
    
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
   
  }


  //////////////////////////// ORDER GENERATION /

  priceListData(ouId, divId, deptId, plType): Observable<any> {
    return this.http.get(this.ServerUrl + `/pricelist/priceHdrOu?ouId=${ouId}&divisionId=${divId}&deptId=${deptId}&priceSubType=${plType}`,{ headers: this.headers });
   
  }


  clearBakcOrder(locId) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/SparesBackOrder/clearBackOrder?locId=${locId}`);
    return this.http.delete(url, options);
  }


  getBackOrderStatusBajaj(locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/SparesBackOrder/location?locId=${locId}`,{ headers: this.headers });
   
  }


  ///////////////////////////shipping network /////////////////////

  getShipNetFromDetails(locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/shippingNetwork/shipfrom/${locId}`,{ headers: this.headers });
   
  }

  getShipNetToDetails(locId): Observable<any> {
    return this.http.get(this.ServerUrl + `/shippingNetwork/shipto/${locId}`,{ headers: this.headers });
    
  }

  /////////////////////////DEAD STOCK /////////////////////
  getDeadStockList(mOuId, mFlag): Observable<any> {
    return this.http.get(this.ServerUrl + `/DedStock/listProcess?ouId=${mOuId}`,{ headers: this.headers });
  }


  public deadFlg(mOu, dDays) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/DedStock?ouId=${mOu}&days=${dDays}`;
    return this.http.post(url, options);

  }

  public deadLineAddUpdate(deadLineRecord) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/DedStock/addLine`);
    return this.http.post(url, deadLineRecord, options);
  
  }

  // //////////////AR Invoice////////////////////
  viewInvnote(trxNumber) {
    const REQUEST_URI = this.ServerUrl + `/arInv/ManualInvPrint/${trxNumber}`;
    return this.http.get(REQUEST_URI, {
    
      responseType: 'arraybuffer',
      headers: this.headers,
    });
  }

  getJonCardNoSearch(jonCardNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/jobCard/jobDtls/${jonCardNo}`,{ headers: this.headers });
  }


  printAmcDoc(amcNum) {
    
    const REQUEST_URI = this.ServerUrl + `/McpEnrollMst/amcInvoicePrint/${amcNum}`;
    return this.http.get(REQUEST_URI, {
      responseType: 'arraybuffer',
      headers: this.headers,
    });
   
  }

  //////////////////////////////////////////RELATED ITEM MASTER /////////////////
  public RelatedItemMasterSubmit(RelMasterRecord) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + '/relateditems/relatedItemInsert';
    return this.http.post(url, RelMasterRecord, options);
   
  }

  public DeleteItemRelation(relationId) {
    const options = {
      headers: this.headers
    };
    const url = (this.ServerUrl + `/relateditems/removeSingle?relationId=${relationId}`);
    return this.http.delete(url, options);
  }

  getRelatedItem(itemCode): Observable<any> {
    return this.http.get(this.ServerUrl + `/relateditems/${itemCode}`,{ headers: this.headers });
   
  }


  //////////////////// RECEIPT WRITE OFF///////////////////////////////////////////////////////////

  getEmpWriteOffLimit(ouId, tktNum): Observable<any> {
    return this.http.get(this.ServerUrl + `/empMst/EmpWriteOfDtls?ticketNo=${tktNum}&ouId=${ouId}`,{ headers: this.headers });
   
  }

  getWriteOffListReceipt(locId, frmDate, tDate, wAmt): Observable<any> {
    return this.http.get(this.ServerUrl + `/arCashReceipts/receiptWriteOff?locId=${locId}&frmDt=${frmDate}&toDate1=${tDate}&toAmt=${wAmt}`,{ headers: this.headers });
    
  }

  getWriteOffListInvoice(locId, frmDate, tDate, wAmt): Observable<any> {
    return this.http.get(this.ServerUrl + `/arInv/invoiceWriteOff?locId=${locId}&fromDate=${frmDate}&toDate=${tDate}&toAmt=${wAmt}`,{ headers: this.headers });
    
  }


  public ReceiptWriteOffSubmit(locId, frmDt, toDt, wAmt, tktNum) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/arCashReceipts/arReceiptWriteOff?locId=${locId}&frmDt=${frmDt}&toDate1=${toDt}&toAmt=${wAmt}&ticketNo=${tktNum}`;
    return this.http.post(url, options);
   
  }

  public InvoiceWriteOffSubmit(locId, frmDt, toDt, wAmt, tktNum) {
    const options = {
      headers: this.headers
    };
    const url = this.ServerUrl + `/arInv/raInvoiceWriteOff?locId=${locId}&fromDate=${frmDt}&toDate=${toDt}&toAmt=${wAmt}&ticketNo=${tktNum}`;
    return this.http.post(url, options);
   
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
   
    return this.http.get(this.ServerUrl + `/NozzelMaster/NozleLov?shiftType=${shiftTp}&shiftDate=${dt1}&shiftDate1=${dt2}`);
  
  }


  FuelTypeList(fueltype,divId): Observable<any> {
   
    return this.http.get(this.ServerUrl + `/itemMst/ByItemCategory?itemCatType=${fueltype}&divId=${divId}`);
  }

  ShiftList(): Observable<any> {
   
    return this.http.get(this.ServerUrl + '/cmnLookup/CmnType/ShiftType');

  }

  PPEmplIdList(locId, divisionId): Observable<any> {
    return this.http.get(this.ServerUrl + `/empMst/EmpLocDiv?locId=${locId}&divisionId=${divisionId}`)
  
  }



  NozzleIslandPick(mNozzle): Observable<any> {

    return this.http.get(this.ServerUrl + `/ppIslandMaster/ByNozleId/${mNozzle}`);
  }

  NozzleFuelTypePick(mNozzleCd): Observable<any> {
 
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
   
  }


  getTankList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/TankMaster`);

  }

  getIslandList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/ppIslandMaster`);

  }

  getNozzleList(): Observable<any> {
    return this.http.get(this.ServerUrl + `/NozzelMaster`);

  }


  getDipEntryDetails(dipEmtryNum): Observable<any> {
    return this.http.get(this.ServerUrl + `/DipEntry/DipNumber/${dipEmtryNum}`);
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
    const url = (this.ServerUrl + `/relateditems/relatedItemUpd`);
    return this.http.put(url, PaintMixMasterRecord, options);
  }

  suppInvDetailFn(suppInvNo): Observable<any> {
    return this.http.get(this.ServerUrl + `/poHdr/suppInvDet/${suppInvNo}`,{ headers: this.headers });
  }

}





