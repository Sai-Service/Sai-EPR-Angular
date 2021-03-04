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

}


@Component({
  selector: 'app-om-gruop-master',
  templateUrl: './om-gruop-master.component.html',
  styleUrls: ['./om-gruop-master.component.css']
})
export class OmGruopMasterComponent implements OnInit {
  GroupMasterForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) { 
  this.GroupMasterForm = fb.group({})
}

get f() { return this.GroupMasterForm.controls; }
  ngOnInit(): void {
  }


  GroupMaster(GroupMasterForm: any) {

  }

  closeMast() {
    this.router.navigate(['admin']);
  }

}
