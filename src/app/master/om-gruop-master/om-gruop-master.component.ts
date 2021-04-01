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
  // status:string;
  lstcomments: any[];
  // public leadTicketNoList: Array<string>[];
  public leadTicketNoList:any;
  public status ="Active"; 

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) { 
  this.GroupMasterForm = fb.group({
    teamName:[],
    loginArray:[],
    ouName:[],
    locCode:[],
    deptName:[],
    leadTicketNo:[],
    description:[],
    status:[],
    // teamName:[],
  })
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
        // alert(data.description1);
        console.log(this.description);  
      }
    );
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
    this.service.GroupMasterSubmit(formValue).subscribe((res: any) => {
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



}
