import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from '../master.service';
import { FormArray } from '@angular/forms';

interface IGroupMaster {
  teamName:string;
  deptName:string;
  locId:number;
  ouId:number;
  description:string;
  status:string;
}


@Component({
  selector: 'app-om-gruop-master',
  templateUrl: './om-gruop-master.component.html',
  styleUrls: ['./om-gruop-master.component.css']
})
export class OmGruopMasterComponent implements OnInit {
  GroupMasterForm: FormGroup;
  locId:number;
  ouId:number;
  teamName:string;
  loginArray:string;
  ouName:string;
  locCode:string;
  deptName:string;
  deptId:string;
  divisionId:string;
  leadTicketNo:string;
  name:string;
  description:string;
  teamName1:string;
  // status:string;
  lstcomments: any[];
  public minDate = new Date();
  // public leadTicketNoList: Array<string>[];
  public leadTicketNoList:any;
  public status ="Active";
  displayInactive = true;
  Status1: any; 
  endDate:Date;
  public statusList: Array<string> = [];
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) { 
  this.GroupMasterForm = fb.group({
    teamName1:[],
    teamName:[],
    loginArray:[],
    ouName:[],
    locCode:[],
    deptName:[],
    leadTicketNo:[],
    description:[],
    status:[],
    startDate:[],
    endDate:[],
    teamDetails: this.fb.array([this.lineDetailsGroup()]),
    // teamName:[],
  })
}
lineDetailsGroup() {
  return this.fb.group({
    lineNO:[''],
    ticketNo: [''],
    description:[''],
    startDate:[''],
    endDate:['',]
  });
}

get lineDetailsArray() {
  var patch = this.GroupMasterForm.get('teamDetails') as FormArray;
  (patch.controls[0]).patchValue(
    {
      lineNO: 1,
    }
  );
  return <FormArray>this.GroupMasterForm.get('teamDetails')
}
get f() { return this.GroupMasterForm.controls; }
  ngOnInit(): void {
    this.locId=Number(sessionStorage.getItem('locId'));
    this.ouId=Number(sessionStorage.getItem('ouId'));
    this.loginArray=sessionStorage.getItem('divisionName');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.locCode=(sessionStorage.getItem('locCode'));
    this.deptName=(sessionStorage.getItem('deptName'));
    this.deptId=(sessionStorage.getItem('deptId'));
    this.divisionId=(sessionStorage.getItem('divisionId'));

    this.service.statusList()
    .subscribe(
      data => {
        this.statusList = data;
        console.log(this.statusList);
      }
    );


    // this.service.leadTicketNoList(this.locId,this.divisionId,this.deptId)
    // .subscribe(
    //   data => {
    //     this.leadTicketNoList = data;
    //     console.log(this.leadTicketNoList);
    //     console.log(this.leadTicketNoList[0].name);
    //   }
    // );
  }

  onOptionsSelectedDescription (leadTicketNo: any){
    alert(leadTicketNo)
    this.service.leadTicketNoList(this.locId,this.divisionId,this.deptId)
    .subscribe(
      data => {
        this.leadTicketNoList = data;
        console.log(this.leadTicketNoList);   
        console.log(this.leadTicketNoList);
        this.description=this.leadTicketNoList[0].name;
        alert(data.name);
        console.log(this.description); 

      }
    );
  }

  addRow(){
    this.lineDetailsArray.push(this.lineDetailsGroup());
    var patch = this.GroupMasterForm.get('teamDetails') as FormArray;
    for(let i=0; i<this.lineDetailsArray.length; i++){
    (patch.controls[i]).patchValue(
      {
        lineNO: i+1,
      }
    );
    }
  }
   


  GroupMaster(GroupMasterForm: any) {

  }

  closeMast() {
    this.router.navigate(['admin']);
  }


  searchGrpMaster(teamName) {
    alert(teamName);
    this.service.getGruopSearch(teamName,this.ouId,this.locId)
      .subscribe(
        data => {
          this.lstcomments = data.obj;
          console.log(this.lstcomments);
        }
      );
  };

  // Select(teamId: number) {
  //   // alert(companyCode);
  //   let select = this.lstcomments.find(d => d.teamId === teamId);
  //   if (select) {
  //     console.log(select);
  //     this.GroupMasterForm.patchValue(select);
  //     // this.ouName=select.ouId.ouName;
  //     // this.compName= select.compId.compName;
  //     // this.displayButton = false;
  //     // this.display = false;
  //     // this.ouId = select.ouId.divisionId.ouId;
  //   }
  // }
  transData(val) {
    return val;
  }

  newMast() {
    const formValue: IGroupMaster = this.transData(this.GroupMasterForm.value);
    let variants = <FormArray>this.lineDetailsArray;
    var teamName =this.GroupMasterForm.get('teamName').value;
    var loginArray =this.GroupMasterForm.get('loginArray').value;
    var ouName =this.GroupMasterForm.get('ouName').value;
    var locCode =this.GroupMasterForm.get('locCode').value;
    var deptName =this.GroupMasterForm.get('deptName').value;  
    var leadTicketNo =this.GroupMasterForm.get('leadTicketNo').value;
    var description =this.GroupMasterForm.get('description').value;
    var status =this.GroupMasterForm.get('status').value;
    for (let i = 0; i < this.lineDetailsArray.length; i++) {
      let variantFormGroup = <FormGroup>variants.controls[i];
      variantFormGroup.addControl('teamName', new FormControl(teamName, Validators.required));
      variantFormGroup.addControl('loginArray', new FormControl(loginArray, Validators.required));
      variantFormGroup.addControl('ouName', new FormControl(ouName, Validators.required));
      variantFormGroup.addControl('locCode', new FormControl(locCode, Validators.required));
      variantFormGroup.addControl('deptName', new FormControl(deptName, Validators.required));
      variantFormGroup.addControl('leadTicketNo', new FormControl(leadTicketNo, Validators.required));
      variantFormGroup.addControl('description', new FormControl(description, Validators.required));
      variantFormGroup.addControl('status', new FormControl(status, Validators.required));
    }
    this.service.GroupMasterSubmit(variants.value).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        window.location.reload();
        // this.LocationMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert('Data already present in the data base');
          // this.LocationMasterForm.reset();
          window.location.reload();
        }
      }
    });
  }

  onOptionsSelected(event: any) {
    this.Status1 = this.GroupMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.GroupMasterForm.get('endDate').reset();
    }
  }

}
