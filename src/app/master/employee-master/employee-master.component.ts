import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { MasterService } from '../master.service';
import { style } from '@angular/animations';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as xlsx from 'xlsx';

interface IEmplMaster {
  emplId: number;
  ticketNo: string;
  divisionId: number;
  locId: number;
  deptId: number;

  title: string;
  fname: string
  mname: string
  lname: string
  fullName: string
 
  designation: string;
  dob: string;
  panNo: string;
  emailId: string;
  contact1: number;
  contact2: number;
  loginPass: string;
  status:string;
  endDate:string;
  loginAccess:string;
  roleId:number;
  startDate:Date;
  teamRole:string;
}

@Component({
  selector: 'app-employee-master',
  templateUrl: './employee-master.component.html',
  styleUrls: ['./employee-master.component.css']
})
export class EmployeeMasterComponent implements OnInit {
  employeesMasterForm: FormGroup;
  @ViewChild('epltable1', { static: false }) epltable1: ElementRef;
  pipe = new DatePipe('en-US');
  public minDate = new Date();
  submitted = false;
  public statusList: Array<string> = [];
  public DesignationList: Array<string> = [];
  public DepartmentList: any;
  public locIdList: Array<string> = [];
  public titleList: Array<string> = [];
  public DivisionIDList: Array<string> = [];
  public teamRoleList : Array<string>=[];
  public empIdList:Array<string>=[];
  public fullNameList:Array<string>=[];
  lstcomments: any[];

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

  locCode:string;
  deptName:string;

  ticketNo:string;
  title:string;
  designation:string;
  fname:string;
  mname:string;
  lname:string;
  fullName:string;
  dob:string;
  emailId:string;
  contact1:string;
  contact2:string;
  panNo:string;

  startDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  endDate:string;
  public status = "Active";

  loginPass: string;
  loginAccess:string='N';
  roleId:number;
  teamRole:string;

  displayInactive = true;
  Status1: any;
  inactiveDate: Date;

  showLoginDetails = false;
  displayButton=true;
  checkValidation=false;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.employeesMasterForm = fb.group({
     
    loginArray:[''],
    loginName:[''],
    divisionId:[],
    ouName :[''],
    locId:[''],
    locationId:[],
    locName :[''],
    ouId :[],
    deptId :[''],
    emplId:[''],
    orgId:[''],
    locCode:[],
    deptName:[],

    ticketNo:[],
    title:[],
    designation:[],

    fname:[],
    mname:[],
    lname:[],
    fullName:[],
    dob:[],
     // emailId: ['', [Validators.required,Validators.email]],
    emailId: ['', [Validators.required, Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
    
    contact1:[],
    contact2:[],
    panNo:[],
    startDate:[],
    endDate:[''],
    status:[],

    loginPass:[],
    loginAccess:[''],
    roleId:[],
    teamRole:[],
  


    });

  }

 
get f() { return this.employeesMasterForm.controls; }

employeesMaster(employeesMasterForm:any) {  }


ngOnInit(): void {
  $("#wrapper").toggleClass("toggled");
  this.name=  sessionStorage.getItem('name');
  this.loginArray=sessionStorage.getItem('divisionName');
  this.loginName=sessionStorage.getItem('name');
  this.ouName = (sessionStorage.getItem('ouName'));
  this.ouId=Number(sessionStorage.getItem('ouId'));
  this.locId=Number(sessionStorage.getItem('locId'));
  this.locName=(sessionStorage.getItem('locName'));
  // this.deptId=Number(sessionStorage.getItem('deptId'));
  this.emplId= Number(sessionStorage.getItem('emplId'));
  this.divisionId = Number(sessionStorage.getItem('divisionId'));
  this.orgId=this.ouId;
  console.log(this.loginArray);
  console.log(this.locId);

  // this.deptName=(sessionStorage.getItem('deptName'));

  this.service.statusList()
    .subscribe(
      data => {
        this.statusList = data;
        console.log(this.statusList);
      }
    );
    this.service.titleList()
    .subscribe(
      data => {
        this.titleList = data;
        console.log(this.titleList);
      }
    );
    this.service.DepartmentList()
    .subscribe(
      data => {
        this.DepartmentList = data;
        console.log(this.DepartmentList);
      }
    );  
    this.service.empIdListFn()
    .subscribe(
      data => {
        this.empIdList = data;
        console.log(this.empIdList);
      }
    );
    // this.service.locationIdList()
    this.service.getLocationId(sessionStorage.getItem('ouId'))
    .subscribe(
      data => {
        this.locIdList = data;
        console.log(this.locIdList);
      }
    ); 
    this.service.DivisionIDList()
    .subscribe(
      data => {
        this.DivisionIDList = data;
        console.log(this.DivisionIDList);
      }
    );


}

onOptionsSelected(event: any) {

  this.Status1 = this.employeesMasterForm.get('status').value;
  alert(this.Status1);
  if (this.Status1 === 'Inactive') {
    this.displayInactive = false;
    // this.endDate = new Date();
    this.endDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  }
  else if (this.Status1 === 'Active') {
    this.employeesMasterForm.get('endDate').reset();
    this.displayInactive=true;
  }
}



resetMast() {
  window.location.reload();
}

closeMast() {
  this.router.navigate(['admin']);
}

transData(val) {

  delete val.loginArray;
  delete val.loginName;
  delete val.locName;
  delete val.ouName;
  delete val.locCode;
  delete val.deptName;
  delete val.locationId;
  // delete val.deptId;
  // delete val.emplId;
  delete val.orgId;

 return val;
}
newMast() {
   
  const formValue: IEmplMaster = this.transData(this.employeesMasterForm.value);
  this.CheckDataValidations();

  if (this.checkValidation === true) {

  this.service.EmployeeMasterSubmit(formValue).subscribe((res: any) => {
    if (res.code === 200) {
      alert('RECORD INSERTED SUCCESSFULLY');    
      // this.employeesMasterForm.reset();
    } else {
      if (res.code === 400) {
        alert('Error while data insertion');
        // this.employeeMasterForm.reset();
      }
    }
  });
}
}

updateMast() {
  // alert(this.divisionName);

  // let select = this.lstcomments.find(d => d.divisionName === this.divisionName);
  // console.log(select);
  // this.divisionId =select.divisionId;
  // this.locId=select.locId;

  const formValue: IEmplMaster = this.employeesMasterForm.value;
  this.CheckDataValidations();
  if (this.checkValidation === true) {

  formValue.divisionId=this.divisionId;
  formValue.locId=this.locId;
  this.service.UpdateEmpMasterById(formValue, formValue.emplId).subscribe((res: any) => {
    if (res.code === 200) {
      alert('RECORD UPDATED SUCCESSFULLY');
      window.location.reload();
    } else {
      if (res.code === 400) {
        alert('ERROR OCCOURED IN PROCEESS');
        this.employeesMasterForm.reset();
      }
    }
   });
 }
 }


searchMast() {
  this.service.getEmpSearch()
    .subscribe(
      data => {
        this.lstcomments = data;
        console.log(this.lstcomments);
      }
    );
}

Select(emplId: number) {
    
  let select = this.lstcomments.find(d => d.emplId === emplId);
  if (select) {
    this.employeesMasterForm.patchValue(select);
     this.displayButton = false;
    this.deptId= select.deptId;   //+'-'+select.deptName;
    this.deptName = select.deptName;
     this.employeesMasterForm.patchValue({title:select.title});
  }
}


SearchByEmpId(empId){
  alert(empId);
  this.service.getEmpIdDetails(empId)
  .subscribe(
    data => {
      this.lstcomments = data;
      console.log(this.lstcomments);
    }
  );
}



onOptionsDEPTSelected(event){  
  // alert ("Dept :"+event) ;

  var dept =this.employeesMasterForm.get('deptId').value;
  // alert (dept);

  let select = this.DepartmentList.find(d => d.cmnTypeId === event);
  this.service.DesignationList(select.code)
    .subscribe(
      data => {
        this.DesignationList = data;
        console.log(this.DesignationList);
      }
    ); 
    this.service.teamRoleListFN(select.code)
    .subscribe(
      data => {
        this.teamRoleList = data;
        console.log(this.teamRoleList);
      }
    );
}


loginRightschkbox(e) {
  // alert (e.target.checked);
  if (e.target.checked === true) {
     this.showLoginDetails = true; 
     this.loginAccess='Y';
     }
  else {
     this.showLoginDetails = false;
     this.loginAccess='N';
    //  this.employeesMasterForm.patchValue({roleId:null});
    //  this.employeesMasterForm.patchValue({teamRole:null});
    //  this.employeesMasterForm.patchValue({loginPass:null});
     this.employeesMasterForm.get('roleId').reset();
     this.employeesMasterForm.get('teamRole').reset();
     this.employeesMasterForm.get('loginPass').reset();
     }
}


loginRights(event) {
  // alert (e.target.checked);
  var loga=this.employeesMasterForm.get('loginAccess').value;
  if (loga === 'Y') {
     this.showLoginDetails = true; 
     this.loginAccess='Y';
     }
  else {
     this.showLoginDetails = false;
     this.loginAccess='N';
     this.employeesMasterForm.get('roleId').reset();
     this.employeesMasterForm.get('teamRole').reset();
     this.employeesMasterForm.get('loginPass').reset();
     }
}




exportToExcel1() {
  const ws: xlsx.WorkSheet =   
  xlsx.utils.table_to_sheet(this.epltable1.nativeElement);
  const wb: xlsx.WorkBook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  xlsx.writeFile(wb, 'epltable1.xlsx');
 }


 onKey(event: any) {
  var title =this.employeesMasterForm.get("title").value;
  // const aaa = this.title + '.'+' ' + this.fname + ' ' + this.mname + ' ' + this.lname ;
  if(this.mname===null || this.mname===undefined || this.mname.trim()===''){this.mname=''; }
  // const aaa = title + '.'+' ' + this.fname + ' ' + this.mname + ' ' + this.lname ;
  const aaa =  this.fname.trim() + ' ' + this.mname.trim() + ' ' + this.lname.trim() ;
 
  this.fullName = aaa;
}

onTitleSelected(mTitle: any) {
  // if(mTitle !=null){
  // var title =this.employeesMasterForm.get("title").value;
  // if(this.mname===null || this.mname===undefined || this.mname.trim()===''){this.mname=''; }
  //  const aaa = title + '.'+' ' + this.fname + ' ' + this.mname + ' ' + this.lname ;
  // this.fullName = aaa;
  // }
}


CheckDataValidations() {

  const formValue: IEmplMaster = this.employeesMasterForm.value;

  var msg1;
  
  if (formValue.divisionId === undefined || formValue.divisionId === null) {
    this.checkValidation = false;
    msg1="DIVISION: Should not be null....";
    alert(msg1);
    return;
  }

  if (formValue.locId === undefined || formValue.locId === null) {
    this.checkValidation = false;
    alert("LOCATION: Should not be null....");
    return;
  }

  // alert ("Dept Id :" +formValue.deptId);
  if (formValue.deptId === undefined || formValue.deptId === null) {
    this.checkValidation = false;
    alert("DEPT: Should not be null....");
    return;
  }


  if (formValue.ticketNo === undefined || formValue.ticketNo === null || formValue.ticketNo.trim()=='') {
    this.checkValidation = false;
    alert("TICKET NO : Should not be null.");
    return;
  }

  

  if (formValue.designation === undefined || formValue.designation === null) {
    this.checkValidation = false;
    alert("DESIGNATION : Should not be null....");
    return;
  }

  if (formValue.title === undefined || formValue.title === null) {
    this.checkValidation = false;
    alert("TITLE: Should not be null....");
    return;
  }

  
  if (formValue.fname == null  || formValue.fname == undefined || formValue.fname.trim() == '') {
    alert("FIRST NAME: Should not be null....");
    return;
  }

  if (formValue.lname == null  || formValue.lname == undefined || formValue.lname.trim() == '') {
    alert("LAST NAME: Should not be null....");
    return;
  }

  if (formValue.fullName == null  || formValue.fullName == undefined || formValue.fullName.trim() == '') {
    alert("FULL NAME: Should not be null....");
    return;
  }

  
  var empdob = new Date(formValue.dob);
  var cDate = new Date();
 
 
  if (formValue.dob === undefined || formValue.dob === null || empdob >=cDate ) {
    this.checkValidation = false;
    alert("EMPLOYEE DOB: enter valid Date of Birth" );
    this.dob = this.pipe.transform(cDate, 'y-MM-dd');
    return;
  }

   
  if (formValue.contact1 === undefined || formValue.contact1 === null || formValue.contact1<=0) {
    this.checkValidation = false;
    alert("CONTACT NO1: Should not be null....");
    return;
  }
  
   
  
  if (formValue.emailId === undefined || formValue.emailId === null || formValue.emailId.trim() == '') {
    this.checkValidation = false;
    alert("EMAIL ID: Should not be null....");
    return;
  } else {
     if(formValue.emailId.includes('@')===false) {alert("EMAIL ID: Enter Valid Email Id....");return; }
  }

  if (formValue.panNo === undefined || formValue.panNo === null || formValue.panNo.trim() == '' || formValue.panNo.trim().length !=10) {
    this.checkValidation = false;
    alert("PAN: Should not be null / Enter Valid PAN....");
    return;
  }

 
  if (formValue.status === undefined || formValue.status === null) {
    this.checkValidation = false;
    alert("RECEIPT STATUS: Should not be null....");
    return;
  }

  
 if( formValue.loginAccess==='Y' ) {
   
  if (formValue.roleId === undefined || formValue.roleId === null || formValue.roleId <0 ) {
    this.checkValidation = false;
    alert("ROLE ID : Should not be null");
    return;
  }

  if (formValue.teamRole === undefined || formValue.teamRole === null  ) {
    this.checkValidation = false;
    alert("TEAM ROLE  : Should not be null");
    return;
  }

  if (formValue.loginPass === undefined || formValue.loginPass === null || formValue.loginPass.trim() === '' ) {
    this.checkValidation = false;
    alert("LOGIN PASSWORD  : Should not be null");
    return;
  }

 }

  this.checkValidation = true

}

  validateStartDate(stDate) {
    var currDate = new Date();
    var sDate = new Date(stDate);
    if (sDate > currDate) {
      alert("START DATE :" + "Should not be above Today's Date");
      this.startDate = this.pipe.transform(Date.now(), 'y-MM-dd');
    }
  }

  validateDob(dDate) {
    var currDate = new Date();
    var sDate = new Date(dDate);
    if (sDate >= currDate) {
      alert("DOB:" + "Should  be below Today's Date");
      this.dob = this.pipe.transform(Date.now(), 'y-MM-dd');
    }
  }


  

}
