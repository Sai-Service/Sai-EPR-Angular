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

interface IflexField{
  applicationId : number;
  title:string;
  descFlexConCode:string;
  descFlexFieldName:string;
  applicationColName:string;
  formLeftPrompt:string;
  formAbovePrompt:string;
  flexLineId:number;
}

@Component({
  selector: 'app-flex-field',
  templateUrl: './flex-field.component.html',
  styleUrls: ['./flex-field.component.css']
})
export class FlexFieldComponent implements OnInit {
  flexFieldForm:FormGroup;
  applicationId:number;
  title:string;
  descFlexConCode:string;
  descFlexFieldName:string;
  applicationColName:string;
  formLeftPrompt:string;
  formAbovePrompt:string;
  flexLineId:number;
  applicationName:string;
  displayFlexLine:Array<boolean>=[];
  public applList:Array<string>=[];
 

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService)
  {
    this.flexFieldForm=fb.group(
      {
        applicationId:[''],
        title:['',[Validators.required]],
        descFlexConCode:['',[Validators.required]],
        descFlexFieldName :['',[Validators.required]],
        // applicationColName:[''],
        formLeftPrompt:[''],
        formAbovePrompt:[''],
        flexLineId:[''],
        applicationName:[''],

        flexCodeLn: this.fb.array([this.lineDetailsGroup()]),

      }
    );
  }
  lineDetailsGroup(){
    return this.fb.group({
      descFlexConCode:[],
      descFlexFieldName:[],
      flexLn:this.fb.array([]),
    });
  }
  FlexLnDetailsGroup() {
    return this.fb.group({
      applicationColName:[],
      ATTRIBUTE6:[],
      formLeftPrompt:[],
      formAbovePrompt:[],
    }
    );
  }
  FlexLnDetailsArray(i: number): FormArray {
    return <FormArray>this.flexFieldForm.get('flexLn')
    // return this.lineDetailsArray.controls[i].get('flexLn') as FormArray
  }
  addRowSegment(index){
     
    this.FlexLnDetailsArray[index].controls.push(this.FlexLnDetailsGroup());
  
  }
  // RemoveRowSegment(index) {
  //   if (index === 0){
  
  //   }else{
  //     this.FlexLnDetailsArray.removeAt(index);
  //   }
  //   this.FlexLnDetailsArray.removeAt(index);
  // }
addRow(index){
  this.lineDetailsArray.push(this.FlexLnDetailsGroup());

}
RemoveRow(index) {
  if (index === 0){

  }else{
    this.lineDetailsArray.removeAt(index);
  }
  this.lineDetailsArray.removeAt(index);
}

get lineDetailsArray() {
    return <FormArray>this.flexFieldForm.get('flexCodeLn')
}

  ngOnInit(): void {
    this.service.applList().subscribe(
      data=>{
        this.applList=data;
        console.log(this.applList);
      }
      );
  }
  flexField(flexField:any){}
  newFlexField(){
  const formValue:IflexField=this.flexFieldForm.value;
  this.service.flexFieldSubmit(formValue).subscribe((res:any)=>{
    if(res.code===200)
    {
      alert("Record inserted successfully");
      this.flexFieldForm.reset();
    }
    else
    {
      if(res.code===400)
      {
        alert("Code already present in data base");
        this.flexFieldForm.reset();
      }
    }
    });
  }
 
}
