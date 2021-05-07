import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { MasterService } from '../master.service';

interface IEmployeeMaster {
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
  selector: 'app-epmloyee-master',
  templateUrl: './epmloyee-master.component.html',
  styleUrls: ['./epmloyee-master.component.css']
})
export class EpmloyeeMasterComponent implements OnInit {
  employeeMasterForm: FormGroup;
  submitted = false;
  emplId: number;
  ticketNo: string;
  divisionId: number;
  title: string= '';
  fname: string= '';
  mname: string= '';
  lname: string= '';
  fullName: string= '';
  locId: number;
  deptId: string;
  designation: string;
  dob: string;
  panNo: string;
  emailId: string;
  contact1: number;
  contact2: number;
  loginPass: string;
  endDate:Date;
  loginAccess:string;
  roleId:number;
  startDate:Date;
  teamRole:string;
  public status = "Active";
  displayInactive = true;
  Status1: any;
  inactiveDate: Date;
  lstcomments: any[];
  display = true;
  displayButton = true;
  displayRolePass: boolean;
  divisionName:string;
  locCode:string;
  deptName:string;
  public minDate = new Date();
  public maxDate = new Date();
  public statusList: Array<string> = [];
  public DesignationList: Array<string> = [];
  public DepartmentList: any;
  public locIdList: Array<string> = [];
  public titleList: Array<string> = [];
  public DivisionIDList: Array<string> = [];
  public teamRoleList : Array<string>=[];
  public empIdList:Array<string>=[];
  status1:any;
  empId:string;
  userList1: any[] = [];
  // userList2: any[] = [];

  lastkeydown1: number = 0;
  subscription: any;
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.employeeMasterForm = fb.group({
      emplId: [],
      ticketNo: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(10)]],
      divisionId: ['', [Validators.required,]],
      title: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(10)]],
      fname: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(35)]],
      mname: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(35)]],
      lname: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(35)]],
      fullName: ['', [Validators.required,Validators.maxLength(100)]],
      locId: ['', [Validators.required]],
      deptId: ['', [Validators.required]],
      designation: [''],
      dob: ['', [Validators.required]],
      panNo: ['', [Validators.required, Validators.pattern("^[A-Za-z]{5}[0-9]{4}[A-Za-z]$"), Validators.maxLength(10)]],
      emailId: ['', [Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      contact1: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]*'), ]],
      contact2: ['', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*'), ]],
      loginPass: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(10)]],
      status: ['', [Validators.required]],
      endDate:[''],
      loginAccess:[''],
      roleId:[''],
      startDate:[],
      divisionName:[],
      locCode:[],
      teamRole:[],
      empId:[],
    });

  }

  get f() { return this.employeeMasterForm.controls; }

  ngOnInit(): void {
    this.deptName=(sessionStorage.getItem('deptName'));
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
    //   this.service.teamRoleListFN(this.deptName)
    // .subscribe(
    //   data => {
    //     this.teamRoleList = data;
    //     console.log(this.teamRoleList);
    //   }
    // );
  }
  employeeMaster(employeeMasterForm: any) {

  }
  onOptionsSelected(event: any) {
    this.Status1 = this.employeeMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.employeeMasterForm.get('endDate').reset();
    }
  }
  transData(val) {
    delete val.emplId;
    return val;
  }

  newMast() {
    const formValue: IEmployeeMaster = this.transData(this.employeeMasterForm.value);
    this.service.EmployeeMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFULLY');    
        this.employeeMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert('Error while data insertion');
          this.employeeMasterForm.reset();
        }
      }
    });
  }

  updateMast() {
    alert(this.divisionName);
    let select = this.lstcomments.find(d => d.divisionName === this.divisionName);
   console.log(select);
   
    this.divisionId =select.divisionId;
    this.locId=select.locId;
    const formValue: IEmployeeMaster = this.employeeMasterForm.value;
    formValue.divisionId=this.divisionId;
    formValue.locId=this.locId;
    this.service.UpdateEmpMasterById(formValue, formValue.emplId).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFUILY');
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.employeeMasterForm.reset();
        }
      }
    });
  };

  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }

  searchMast() {
    this.service.getEmpSearch()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
  };
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
  Select(emplId: number) {
    let select = this.lstcomments.find(d => d.emplId === emplId);
    if (select) {
      this.employeeMasterForm.patchValue(select);
      // this.divisionId = select.divisionId.divisionId;
      // this.divisionName=select.divisionId.divisionName;
      // this.locCode=select.locId.locCode;
      // this.locId = select.locId.locId;
      // this.deptId= select.deptId+'-'
      this.displayButton = false;
      this.deptId= select.deptId+'-'+select.deptName;
      alert(this.deptId);
      this.display = false;
    }
  }
  AccessChange(e) {
    if (e.target.checked) {
      this.loginAccess='Y'
    this.displayRolePass = true;
    }
    else{
      this.loginAccess='N'
      this.displayRolePass = false;
    }
  }
  onKey(event: any) {
    const aaa = this.title + '.'+' ' + this.fname + ' ' + this.mname + ' ' + this.lname ;
    this.fullName = aaa;
  }

  onOptionsDEPTSelected(event){   
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

  // getlocHeadDashbordSearch(status){
  //  this.service.urlTest(this.status1).subscribe((res: any) => {
  //   this.lstcomments=status;
  //  });
  //  }
  getUserIdsFirstWay($event) {
    let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
    this.userList1 = [];

    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList1 = this.searchFromArray(this.empIdList, userId);
      }
    }
  }

  searchFromArray(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };
}
