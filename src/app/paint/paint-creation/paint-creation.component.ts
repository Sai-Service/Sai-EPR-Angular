import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';
import { PaintService } from 'src/app/paint/paint.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { DatePipe } from '@angular/common';
import { IFinanaceExchangeForm } from 'src/app/order-management/sales-order-form/sales-order-form.component';

interface IPaintMixing {}

@Component({
  selector: 'app-paint-creation',
  templateUrl: './paint-creation.component.html',
  styleUrls: ['./paint-creation.component.css']
})
export class PaintCreationComponent implements OnInit {

  paintCreationForm: FormGroup;

  pipe = new DatePipe('en-US');
  now = Date.now();
  public minDate = new Date();

  loginName:string;
  divisionId:number;
  loginArray:string;
  name:string;
  ouName : string;
  locId: number;
  locName : string;
  orgId:number;
  ouId :number;
  deptId:number; 
  emplId :number;

  constructor(private fb: FormBuilder, private router: Router, private orderManagementService: OrderManagementService, private service: MasterService, private PaintService: PaintService) {
    this.paintCreationForm = fb.group({

      loginArray:[''],
      loginName:[''],
      ouName :[''],
      divisionId:[],
      locId:[''],
      locName :[''],
      ouId :[],
      deptId :[],
      emplId:[''],
      orgId:[''],
    })
  }

  get f() { return this.paintCreationForm.controls; }
  paintCreation(paintCreationForm:any) {  }


  ngOnInit(): void {
  }

}
