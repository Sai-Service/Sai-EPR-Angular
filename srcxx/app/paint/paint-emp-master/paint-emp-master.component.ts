import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';

import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from 'src/app/master/master.service';
import { DatePipe } from '@angular/common';


interface IPanel {
  cmnId:number;
  cmnTypeId:number;
  cmnType: string;
  cmnDesc: string;
  code:string;
  codeDesc:string;
  application: string;
  divisionId: number;
  startDate:string;
  endDate:string,
  status:string;
  attribute1:number;
  opUnitId:number;
}


@Component({
  selector: 'app-paint-emp-master',
  templateUrl: './paint-emp-master.component.html',
  styleUrls: ['./paint-emp-master.component.css']
})
export class PaintEmpMasterComponent implements OnInit {
 paintEmpMasterForm :FormGroup;

  pipe = new DatePipe('en-US');
  now = Date.now();
  public minDate = new Date();

  application:string ='ALL'
  cmnId:number;
  cmnTypeId:number;
  cmnType: string;
  cmnDesc: string;
  // startDate:Date;
  startDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  attribute1:number;
  endDate:string;
  status:string="Active";
  code:string;
  codeDesc:string;
  lstcomments: any[];
  submitted = false;
  public applicationList: Array<string> = [];
  public DivisionIDList: Array<string> = [];
  // public cmnTypeList: Array<string> = [];
  public statusList : Array<string> = [];
  public BillShipToList: Array<string> = [];

  public OuLocationList: Array<string> = [];
  public OpUnitList: Array<string> = [];

  

  cmnTypeList: any;

  loginName:string;
  loginArray:string;
  divisionId:number;
  name:string;
  ouName : string;
  locId: number;
  locationId:number;
  locName : string;
  orgId:number;
  ouId :number;
  deptId:number; 
  emplId :number;
  opUnitId :number;

  displayInactive = true;
  Status1: any;
  inactiveDate: Date;
  display = true;
  displayButton = true;
  checkValidation=false;
  saveButton=true;
  updButton=true;
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.paintEmpMasterForm = fb.group({
      // itemRows: this.fb.array([this.inItemRows()]),

      cmnId:[],
      cmnTypeId:[],
      cmnType: ['', [Validators.required]],
      cmnDesc: ['', [Validators.required]],
      application: ['', [Validators.required]],
      attribute1:[],

      code:[],
      codeDesc:[],
      startDate:[],
      endDate:[],
      status:[],

      loginArray:[''],
      loginName:[''],
      divisionId:[],
      ouName :[''],
      locId:[],
      locationId:[],
      locName :[''],
      ouId :[],
      deptId :[],
      emplId:[''],
      orgId:[''],
      opUnitId:[],

    });
  }

 



  // inItemRows() {
  //   return this.fb.group({
  //     cmnType: [''],
  //     cmnDesc: ['']
  //   });
  // }


  // addRow() {
  //   const control = <FormArray>this.paintPanelMasterForm.controls['itemRows'];
  //   control.push(this.inItemRows());
  // }

  get f() { return this.paintEmpMasterForm.controls; }

  ngOnInit(): void {

    $("#wrapper").toggleClass("toggled");
    this.name=  sessionStorage.getItem('name');
    this.loginArray=sessionStorage.getItem('divisionName');
    this.loginName=sessionStorage.getItem('name');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId=Number(sessionStorage.getItem('ouId'));
    this.locId=Number(sessionStorage.getItem('locId'));
    this.locName=(sessionStorage.getItem('locName'));
    this.deptId=Number(sessionStorage.getItem('dept'));
    this.emplId= Number(sessionStorage.getItem('emplId'));
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.orgId=this.ouId;
    console.log(this.loginArray);
    console.log(this.locId);

    this.service.OUIdListDiv(Number(sessionStorage.getItem('divisionId')))
      .subscribe(
        data => {
          this.OpUnitList = data;
          console.log(this.OpUnitList);
        });


    this.service.getLocationSearch1(sessionStorage.getItem('ouId'))
    .subscribe(
      data => {
        this.BillShipToList = data;
      }
    );

    this.service.DivisionIDList()
      .subscribe(
        data => {
          this.DivisionIDList = data;
          console.log(this.DivisionIDList);
        });

    this.service.applicationList()
      .subscribe(
        data => {
          this.applicationList = data;
          console.log(this.applicationList);
        });

    this.service.cmnTypeListNew(sessionStorage.getItem('divisionId'))
      .subscribe(
        data => {
          this.cmnTypeList = data;
          console.log(this.cmnTypeList);
        });

      this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        });

  }

  paintEmpMaster(paintEmpMasterForm: any) {

  }

  saveComnMast() {

    if (this.emplId !=2142 )  { alert ("You are Not Authorised to Add/Modify Employee Master...");return;}

    this.CheckDataValidations()
    
    if (this.checkValidation===true) {
       alert("Data Validation Sucessfull....") 

       var  resp=confirm("Do You Want to Save this Transaction ???");
       if(resp==false) { return;}

    const formValue: IPanel = this.paintEmpMasterForm.value;
    this.service.commonMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD SAVED SUCCESSFULLY');
        this.saveButton=false;
        this.paintEmpMasterForm.disable();
        
      } else {
        if (res.code === 400) {
          alert('ERROR : RECORD NOT SAVED.' + res.message);
          this.saveButton=true;
        }
      }
    });
  } else { alert ("Data Validation Failed....Save not done.")}
  }

  // updateComnMast(){alert ("Update ....WIP")}


  updateComnMast() {

    if (this.emplId !=2142 )  { alert ("You are Not Authorised to Add/Modify Panel Master...");return;}


    // this.CheckDataValidations();
    // if (this.checkValidation===true) {
    //     alert("Data Validation Sucessfull....\nPutting data to TAX REGIME MASTER  TABLE")
    // alert ("Cmn Id = "+this.cmnId)

        var  resp=confirm("Do You Want to Modify this Transaction ???");
        if(resp==false) { return;}

        const formValue: IPanel = this.paintEmpMasterForm.value;
        this.service.UpdateCommonMasterSubmit(formValue, this.cmnId).subscribe((res: any) => {
          if (res.code === 200) {
            alert('RECORD UPDATED SUCCESSFULLY');
            this.updButton=false;
          } else {
            if (res.code === 400) {
              alert('ERROR OCCOURED IN PROCEESS');
              this.updButton=true;
              // this.jaiRegimeMasterForm.reset();
            }
          }
          
        });
      // }else{ alert("Data Validation Not Sucessfull....\nData not Saved...")  }
  }

  onOptionsSelected(event: any) {
    this.Status1 = this.paintEmpMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      // this.endDate = new Date();
      this.endDate = this.pipe.transform(Date.now(), 'y-MM-dd');
    }
    else if (this.Status1 === 'Active') {
      this.paintEmpMasterForm.get('endDate').reset();
      this.displayInactive=true;
    }
  }



  searchCmnMst(){

    var searchText=this.paintEmpMasterForm.get('cmnType').value;
    var pntLoc=this.paintEmpMasterForm.get('attribute1').value;
    // alert ("Category,Location : "+searchText +","+pntLoc)

    // var searchText='PN-PAINTER'  //PN-ADVISOR' //
    // this.service.getCommonLookupSearchNew(searchText,sessionStorage.getItem('divisionId'),pntLoc)

    this.service.getCommonLookupSearchNewWithLocId(searchText,sessionStorage.getItem('divisionId'),pntLoc)
    .subscribe(
      data => {
        this.lstcomments = data;
        console.log(this.lstcomments);
        // this.displayButton=false;
        }
    );
  }




Select(cmId: number) {
  // alert ('cmnId='+cmId)
  let select = this.lstcomments.find(d => d.cmnId === cmId);
  if (select) {
    // alert ("Slect.cmntype :" +select.cmnType);
    this.paintEmpMasterForm.patchValue(select);
    this.paintEmpMasterForm.patchValue({locId :Number(select.attribute1)});
    this.cmnId=select.cmnId;
    this.cmnType=select.cmnType;
    
    this.displayButton = false;
    // this.updButton=true;
    // this.paintPanelMasterForm.disable();
    this.paintEmpMasterForm.get('status').enable();

    this.display = false;
  }
}

onSelectType(cmnTp){
  let select = this.cmnTypeList.find(d => d.CMNTYPE === cmnTp);
  if (select) {
     var cmnTypeId1=  select.CMNTYPEID+1;
    //  alert ("Desc :" +select.CMNDESC + " , id : "+select.CMNTYPEID + "," +cmnTypeId1);
    this.paintEmpMasterForm.patchValue({cmnDesc:select.CMNDESC ,cmnTypeId :cmnTypeId1 ,application :'ALL'})
  }
}

resetMast() {
  window.location.reload();
}

closeMast() {
  this.router.navigate(['admin']);
}


CheckDataValidations(){

  const formValue: IPanel = this.paintEmpMasterForm.value;

  formValue.code =this.code.toUpperCase();
  formValue.codeDesc=this.codeDesc.toUpperCase();
  // formValue.attribute1=this.attribute1.charAt(0).toUpperCase();
  // alert ("code, desc ,attribute1: "+this.code + " , "+this.codeDesc+ " , "+this.attribute1);

  if (formValue.divisionId===undefined || formValue.divisionId===null || formValue.divisionId<0)
  {
    this.checkValidation=false; 
    alert ("DIVISION : Should not be null....");
    return;
  } 

  if (formValue.cmnType===undefined || formValue.cmnType===null || formValue.cmnType.trim()==='')
  {
    this.checkValidation=false; 
    alert ("CATEGORY : Should not be null....");
    return;
  } 

  if (formValue.code===undefined || formValue.code===null || formValue.code.trim()==='' )
  {
    this.checkValidation=false; 
    alert ("TICKET NO : Should not be null....");
    return;
  } 

  if (formValue.codeDesc===undefined || formValue.codeDesc===null || formValue.codeDesc.trim()==='' )
  {
    this.checkValidation=false; 
    alert ("EMPLOYEE NAME : Should not be null....");
    return;
  } 

  if (formValue.attribute1===undefined || formValue.attribute1===null || formValue.attribute1<=0 )
  {
    this.checkValidation=false; 
    alert ("LOCATION ID: Enter Valid Location Id");
    return;
  } 

  

  if (formValue.status===undefined || formValue.status===null || formValue.status.trim()==='' )
  {
    this.checkValidation=false; 
    alert ("STATUS : Should not be null....");
    return;
  } 

  if (formValue.startDate===undefined || formValue.startDate===null || formValue.startDate.trim()==='' )
  {
    this.checkValidation=false; 
    alert ("START DATE : Enter Valid Start Date....");
    return;
  } 

    this.checkValidation=true;

}

// onOptionsLocation(event) {
//   alert("Location : "+ this.attribute1 );
//   this.paintEmpMasterForm.patchValue({ locId: event })
//   this.paintReportForm.patchValue({ fromLocId: event })

//   if(event>0){
//     var x=this.paintReportForm.get('locCode').value;
//     var y=this.paintReportForm.get('tolocCode').value;
//     if(x===y) {alert ("From/To Locations Should not be Same...");
//      this.paintReportForm.get('locCode').reset();
//     return;
//   }}

// }

onOUSelect(event){
  // alert("ou id : " +event)
  this.service.LocationListOu(event).subscribe
  (data => {
    this.OuLocationList = data;
    console.log(this.OuLocationList);
  });
}


}

