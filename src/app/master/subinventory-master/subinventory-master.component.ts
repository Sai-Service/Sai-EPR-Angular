import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators , FormArray } from '@angular/forms';
import { MasterService } from '../master.service';

interface ISubinventory
{
  divisionId:Number;
  deptId:number;
  subInventoryCode:string;
  description:string;
  startdate:Date;
  status:string;
  subInventoryId:number;
}

@Component({
  selector: 'app-subinventory-master',
  templateUrl: './subinventory-master.component.html',
  styleUrls: ['./subinventory-master.component.css']
})
export class SubinventoryMasterComponent implements OnInit {
SubinventoryMasterForm:FormGroup;
 
divisionId:number;
deptId:number;
subInventoryCode:string;
description:string;
startdate:Date;
public status = "Active";
subInventoryId:number;

 public DivisionList : Array<string>=[];
 public DepartmentIdList: Array<string> = [];
 public statusList: Array<string> = [];
 lstcomments:any;
 
 display = true;
 displayButton=true;

constructor(private service: MasterService, private fb: FormBuilder, private router: Router) { 
  this.SubinventoryMasterForm=fb.group({
    divisionId:[''],
    deptId:[''],
    subInventoryCode:[''],
    description:[''],
    startdate:[''],
    status:[''],
    subInventoryId:['']
  })
}
subinventoryMaster(SubinventoryMasterForm:any){
  
}
  ngOnInit(): void {

    this.service.DivisionIDList()
    .subscribe(
      data => {
        this.DivisionList = data;
        console.log(this.DivisionList);
  }
    );

    this.service.DepartmentList()
    .subscribe(
      data => {
        this.DepartmentIdList = data;
        console.log(this.DepartmentIdList);
      }
    );

    this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        }
      );
}

resetMast() {
  window.location.reload();
}

closeMast() {
  this.router.navigate(['admin']);
}

SaveMast()
{
  const formValue:ISubinventory=this.SubinventoryMasterForm.value;
  this.service.saveSubinventory(formValue).subscribe((res:any)=>{
    if (res.code === 200) {
      alert('RECORD INSERTED SUCCESSFULLY');
      this.SubinventoryMasterForm.reset();
    } else {
      if (res.code === 400) {
        alert('ERROR WHILE INSERTING');
        this.SubinventoryMasterForm.reset();
      }
    }
  });
}
SearchMast()
{
  this.service.getSubInvSearch()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
}

Update()
{
  const formValue:ISubinventory=this.SubinventoryMasterForm.value;
  this.service.UpdateSubInventory(formValue).subscribe((res:any)=>
  {
    if (res.code === 200) {
      alert('RECORD UPDATED SUCCESSFULLY');
      window.location.reload();
    } else {
      if (res.code === 400) {
        alert('ERROR OCCOURED IN PROCEESS');
        this.SubinventoryMasterForm.reset();
      }
    }
  })
}

Select(subInventoryCode: string) {
  let select = this.lstcomments.find(d => d.subInventoryCode === subInventoryCode);
  if (select) {
    this.SubinventoryMasterForm.patchValue(select);
    this.displayButton = false;
    this.display = false;
  }
}
}