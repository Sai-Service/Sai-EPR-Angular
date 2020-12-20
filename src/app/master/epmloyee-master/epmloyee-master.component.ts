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
  name: string
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
  title: string;
  fname: string
  mname: string
  lname: string
  name: string
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
  
  public minDate = new Date();
  public maxDate = new Date();
  public statusList: Array<string> = [];
  public DesignationList: Array<string> = [];
  public DepartmentList: Array<string> = [];
  public locIdList: Array<string> = [];
  public titleList: Array<string> = [];
  public DivisionIDList: Array<string> = [];
  status1:any;


  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.employeeMasterForm = fb.group({
      emplId: [],
      ticketNo: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(10)]],
      divisionId: ['', [Validators.required,]],
      title: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(10)]],
      fname: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(35)]],
      mname: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(35)]],
      lname: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(35)]],
      name: ['', [Validators.required,Validators.maxLength(100)]],
      locId: ['', [Validators.required]],
      deptId: ['', [Validators.required]],
      designation: [''],
      dob: ['', [Validators.required]],
      panNo: ['', [Validators.required, Validators.pattern("^[A-Za-z]{5}[0-9]{4}[A-Za-z]$"), Validators.maxLength(10)]],
      emailId: ['', [Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      contact1: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10),Validators.maxLength(10)]],
      contact2: ['', [Validators.pattern('[0-9]*'), Validators.minLength(10),Validators.maxLength(10)]],
      loginPass: [''],
      status: ['', [Validators.required]],
      endDate:[''],
      loginAccess:[''],
      roleId:[''],
      startDate:[],
      divisionName:[],
      locCode:[],
    });
  }

  get f() { return this.employeeMasterForm.controls; }

  ngOnInit(): void {
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
      this.service.DesignationList()
      .subscribe(
        data => {
          this.DesignationList = data;
          console.log(this.DesignationList);
        }
      );
      this.service.locationIdList()
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
        alert('RECORD INSERTED SUCCESSFUILY');    
        this.employeeMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert('Data already present in the data base');
          this.employeeMasterForm.reset();
        }
      }
    });
  }

  updateMast() {
    let select = this.lstcomments.find(d => d.divisionId.divisionName === this.divisionName);
    this.divisionId =select.divisionId.divisionId;
    this.locId=select.locId.locId;
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

  Select(emplId: number) {
    let select = this.lstcomments.find(d => d.emplId === emplId);
    if (select) {
      this.employeeMasterForm.patchValue(select);
      this.divisionId = select.divisionId.divisionId;
      this.divisionName=select.divisionId.divisionName;
      this.locCode=select.locId.locCode;
      this.locId = select.locId.locId;
      this.displayButton = false;
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
    const aaa = this.title + ' ' + this.fname + ' ' + this.mname + ' ' + this.lname ;
    this.name = aaa;
  }



  // getlocHeadDashbordSearch(status){
  //  this.service.urlTest(this.status1).subscribe((res: any) => {
  //   this.lstcomments=status;
  //  });
  //  }
}
