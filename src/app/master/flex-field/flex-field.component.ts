import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from '../master.service';

interface IflexField {
  applicationId: number;
  title: string;
  descFlexConCode: string;
  descFlexFieldName: string;
  applicationColName: string;
  formLeftPrompt: string;
  formAbovePrompt: string;
  flexLineId: number;
  flexCodeDesc: string;
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'app-flex-field',
  templateUrl: './flex-field.component.html',
  styleUrls: ['./flex-field.component.css']
})

export class FlexFieldComponent implements OnInit {
  flexFieldForm: FormGroup;
  selectedIndex: number;
  public isViewable: boolean;
  applicationId: number;
  title: string;
  // descFlexConCode:string;
  // descFlexFieldName:string;
  applicationColName:string;
  formLeftPrompt:string;
  formAbovePrompt:string;
  language:string;
  // flexLineId:number;
  // applicationName:string;
  // flexCodeDesc:string;
  // startDate:Date;
  // endDate:Date;
   flexfields:any;
  // displayFlexLine:Array<boolean>=[];
  public applList: Array<string> = [];
  public titleList: Array<string> = [];
  display =true;
  displayButton=true;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.flexFieldForm = this.fb.group(
      {
        applicationId: ['',[Validators.required]],
        title: ['', [Validators.required]],
        flexCodeLn: this.fb.array([]),

      }
    );
    this.selectedIndex= -1;
  }

  flexCodeLn(): FormArray {
    return this.flexFieldForm.get("flexCodeLn") as FormArray
  }

  newflexCodeLn(): FormGroup {
    return this.fb.group({
      descFlexConCode: [],
      flexCodeDesc: [],
      startDate: [],
      endDate: [],
      flexLn: this.fb.array([]),
    });
  }

  addflexCodeLn() {

    this.flexCodeLn().push(this.newflexCodeLn());
  }

  removeflexCodeLn(flexCodeLnIndex: number) {
    this.flexCodeLn().removeAt(flexCodeLnIndex);
  }

 flexLn(flexCodeLnIndex: number): FormArray {
    return this.flexCodeLn().at(flexCodeLnIndex).get("flexLn") as FormArray

  }

  newflexLn(): FormGroup {
    return this.fb.group({
      applicationColName: [],
      language: [],
      formLeftPrompt: [],
      formAbovePrompt: [],
    }
    );
  }

  addflexLn(flexCodeLnIndex: number) {
    this.flexLn(flexCodeLnIndex).push(this.newflexLn());
  }

  removeflexLn(flexCodeLnIndex: number, flexLnIndex: number) {
    this.flexLn(flexCodeLnIndex).removeAt(flexLnIndex);
  }

  ngOnInit(): void {
    this.service.applList().subscribe(
      data => {
        this.applList = data;
        console.log(this.applList);
      }
    );


   this.addflexCodeLn();
   this.addflexLn(0);
  //  this.addflexLn(0);

  }
  flexField(flexField: any) { }
  newFlexField() {
    const formValue: IflexField = this.flexFieldForm.value;
    this.service.flexFieldSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert("Record inserted successfully");
        this.flexFieldForm.reset();
      }
      else {
        if (res.code === 400) {
          alert("Code already present in data base");

          this.flexFieldForm.reset();
        }
      }
    });
  }

  onOptionSelectedTitle(event: any) {

    var applId = this.flexFieldForm.get('applicationId').value;
    // alert(applId);
    this.service.getTitle(applId).subscribe(
      data => {
        this.titleList = data;
      }
    );
  }

  resetMast() {
    window.location.reload();
  }

  // closeMast() {
  //   this.router.navigate(['admin']);
  // }

  SearchMast() {
    var applid = this.flexFieldForm.get('applicationId').value;
    var titles = this.flexFieldForm.get('title').value;
    this.flexCodeLn().clear();
    this.service.getFlexField(applid, titles).subscribe(
      data => {
        this.flexfields = data;
        console.log(this.flexfields);
          data.flexCodeLn.forEach(f => {
          var fxCodeLn: FormGroup = this.newflexCodeLn();
          this.flexCodeLn().push(fxCodeLn);
          f.flexLn.forEach(fl => {
            var flxln = this.newflexLn();
            (fxCodeLn.get('flexLn') as FormArray).push(flxln);
          });
        });
        this.flexFieldForm.patchValue(this.flexfields);
        this.displayButton = false;
        this.display = false;
             });
      }
      closeMast(){}
      displayDiv(si){
        this.selectedIndex = si;
        this.isViewable= !this.isViewable;


      }
      dispDetails(flexCodeLnIndex,descFlexConCode){
        if(this.selectedIndex=== -1 && flexCodeLnIndex === 0){
          document.getElementById("flexCode"+flexCodeLnIndex).style.display="block";
          this.selectedIndex=flexCodeLnIndex;
          return;
        }

        if(this.selectedIndex===flexCodeLnIndex){
          document.getElementById("flexCode"+this.selectedIndex).style.display="none";
        }else{
        document.getElementById("flexCode"+this.selectedIndex).style.display="none";
        document.getElementById("flexCode"+flexCodeLnIndex).style.display="block";
        this.selectedIndex=flexCodeLnIndex;
      }}

}

