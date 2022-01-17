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
  title: string;
  fname: string
  mname: string
  lname: string
  fullName: string
  locId: number;
  deptId: string;
  designation: string;
  dob: string;
  panNo: string;
  emailId: string;
  contact1: number;
  contact2: number;
  loginPass: string;
  status:string;
  endDate:Date;
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
  deptId:string; 
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
  endDate:Date;
  public status = "Active";

  loginPass: string;
  loginAccess:string;
  roleId:number;
  teamRole:string;

  showLoginDetails = false;
  displayButton=true;

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
    deptId :[],
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
    emailId:[],
    contact1:[],
    contact2:[],
    panNo:[],
    startDate:[],
    status:[],

    loginPass:[''],
    endDate:[''],
    loginAccess:[''],
    roleId:[''],
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
  // this.deptId=Number(sessionStorage.getItem('dept'));
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
  // delete val.locId;
  delete val.ouId;
  // delete val.deptId;
  delete val.emplId;
  delete val.orgId;

 return val;
}
newMast() {
   

  const formValue: IEmplMaster = this.transData(this.employeesMasterForm.value);
  this.service.EmployeeMasterSubmit(formValue).subscribe((res: any) => {
    if (res.code === 200) {
      alert('RECORD INSERTED SUCCESSFULLY');    
      this.employeesMasterForm.reset();
    } else {
      if (res.code === 400) {
        alert('Error while data insertion');
        // this.employeeMasterForm.reset();
      }
    }
  });
}

updateMast() {
  // alert(this.divisionName);

  // let select = this.lstcomments.find(d => d.divisionName === this.divisionName);
  // console.log(select);
  // this.divisionId =select.divisionId;
  // this.locId=select.locId;

  const formValue: IEmplMaster = this.employeesMasterForm.value;
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
};


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
    this.deptId= select.deptId+'-'+select.deptName;
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


loginRights(e) {
  // alert (e.target.checked);
  if (e.target.checked === true) {
     this.showLoginDetails = true; 
     }
  else {
     this.showLoginDetails = false;
    //  this.employeesMasterForm.patchValue({roleId:null});
    //  this.employeesMasterForm.patchValue({teamRole:null});
    //  this.employeesMasterForm.patchValue({loginPass:null});
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
  const aaa = title + '.'+' ' + this.fname + ' ' + this.mname + ' ' + this.lname ;
  this.fullName = aaa;
}

onTitleSelected(mTitle: any) {
  if(mTitle !=null){
  var title =this.employeesMasterForm.get("title").value;
   const aaa = title + '.'+' ' + this.fname + ' ' + this.mname + ' ' + this.lname ;
  this.fullName = aaa;
  }
}

}
