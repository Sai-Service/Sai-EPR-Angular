import { Component, OnInit, HostListener, ViewChild, ElementRef ,NgModule} from '@angular/core';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { MasterService } from 'src/app/master/master.service'
import { DatePipe ,Location} from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-gl-trial-balance',
  templateUrl: './gl-trial-balance.component.html',
  styleUrls: ['./gl-trial-balance.component.css']
})
export class GlTrialBalanceComponent implements OnInit {
  glTrialBalanceForm: FormGroup;
  pipe = new DatePipe('en-US');

  periodNameList: any=[];
  lstTBList :any;

  loginName: string;
  loginArray: string;
  name: string;
  ouId:number;
  ouName: string;
  locId: number;
  locName: string;
  deptId:number;
  emplId: number;
  roleId: number;
  orgId: number;
  divisionId: number;
  periodName:string;

  exportExcel=true;

  get f() { return this.glTrialBalanceForm.controls; }
  glTrialBalance(glTrialBalanceForm:any) {  }


  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private service: MasterService) { 
    this.glTrialBalanceForm = this.fb.group({
      divisionId: [],
      division: [],
      orgId: [],
      loginArray: [''],
      loginName: [''],
      ouId: [],
      ouName: [''],
      locId: [''],
      locName: [''],
      emplId: [],
      roleId: [],
      deptId: [],

      periodName:[],
    })
  }
  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.name=  sessionStorage.getItem('name');
    this.loginArray=sessionStorage.getItem('divisionName');
    this.divisionId=Number(sessionStorage.getItem('divisionId'));
    this.loginName=sessionStorage.getItem('name');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId=Number(sessionStorage.getItem('ouId'));
    this.locId=Number(sessionStorage.getItem('locId'));
    // this.locName=(sessionStorage.getItem('locName'));
    this.deptId=Number(sessionStorage.getItem('dept'));
    this.emplId= Number(sessionStorage.getItem('emplId'));
    this.orgId=this.ouId;
    console.log(this.loginArray);
    console.log(this.locId);


    this.service.FinancialPeriod()
      .subscribe(
      data => {
      this.periodNameList = data.obj;
  }
);
  }




  resetMast() {
    window.location.reload();
  }

  expExcel(){}

  SearchTB(){

    var prdName =this.glTrialBalanceForm.get("periodName").value;
    if(prdName==null || prdName==undefined || prdName.trim()=='') {
      alert ("Please Select Period..."); return;
    }
      //  alert ("Period Selected  : " +prdName);

    var ou='12MU'
    this.service.getGLTrialBalanceList(ou, prdName)
      .subscribe(
        data => {
          this.lstTBList = data;
          if(this.lstTBList.length==0) {
            alert (ou +" - " + "No Record Found.");return;
          }
          console.log(this.lstTBList);
    });
 }

}
