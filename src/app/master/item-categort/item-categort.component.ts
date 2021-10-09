import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, RequiredValidator } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from '../master.service';

interface IItemCategory {
  description: string;
  divisionId: number;
  attribute1: string;
  status: string;
  divisionId1: string;
  subType: string;
  mainType: string;
  princpleItem: string;
  categoryId: number;

}


@Component({
  selector: 'app-item-categort',
  templateUrl: './item-categort.component.html',
  styleUrls: ['./item-categort.component.css']
})
export class ItemCategortComponent implements OnInit {
  itemCategoryMasterForm: FormGroup;
  description: string;
  submitted = false;
  divisionId: number;
  attribute1: string;
  divisionName: string;
  divisionId1: string;
  subType: string;
  mainType: string;
  princpleItem: string;
  categoryId: number;
  divisionCode: string;

  lstcomments: any;
  displayButton = true;
  public status = "Active";
  // public country = 'INDIA';
  public minDate = new Date();
  displayInactive = true;
  display = true;
  Status1: any;
  endDate: Date;

  public DivisionIDList: Array<string> = [];
  public subTypeList: Array<string> = [];
  public mainTypeList: Array<string> = [];
  public YesNoList: Array<string> = [];
  public statusList: Array<string> = [];
  public mainTypeNewList: Array<string> = [];
  public subTypeNewList: Array<string> = [];


  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.itemCategoryMasterForm = fb.group({
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9]*')]],
      divisionId: ['', [Validators.required]],
      attribute1: [''],
      princpleItem: ['', [Validators.required]],
      status: [''],
      subType: ['', [Validators.required]],
      mainType: ['', [Validators.required]],
      categoryId: [''],
      endDate: [],
      // divisionCode:[''],
    })

  }

  get f() { return this.itemCategoryMasterForm.controls; }

  ngOnInit(): void {
    this.service.DivisionIDList()
      .subscribe(
        data => {
          this.DivisionIDList = data;
          console.log(this.DivisionIDList);
        }
      );

    this.service.subTypeList()
      .subscribe(
        data => {
          this.subTypeList = data;
          console.log(this.subTypeList);
        }
      );

    this.service.mainTypeList()
      .subscribe(
        data => {
          this.mainTypeList = data;
          console.log(this.mainTypeList);
        }
      );

    this.service.mainTypeNewList((sessionStorage.getItem('divisionId')))
      .subscribe(
        data => {
          this.mainTypeNewList = data;
          console.log(this.mainTypeNewList);
        }
      );

    this.service.YesNoList()
      .subscribe(
        data => {
          this.YesNoList = data;
          console.log(this.YesNoList);
        }
      );

    this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        }
      );


    this.service.subTypeNewList((sessionStorage.getItem('divisionId')))
      .subscribe(
        data => {
          this.subTypeNewList = data;
          console.log(this.subTypeNewList);
        }
      );

  }


  itemCategory(itemCategoryMaster: any) {
  }

  fnItemCategory(mainType, subType) {
    const aaa = mainType + '.' + subType;
    this.attribute1 = aaa;
  }


  transData(val) {
    delete val.categoryId;

    return val;
  }

  newItemCatMast() {
  
    const formValue: IItemCategory = this.transData(this.itemCategoryMasterForm.value);
    formValue.attribute1 = formValue.mainType + '.' + formValue.subType;
    this.service.ItemCatMastSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        // this.itemCategoryMasterForm.reset();
     
           (document.getElementById('saveBtn') as HTMLInputElement).disabled = true;
           this.searchItemCatMast()
      } else {
        if (res.code === 400) {
          alert(res.message); 
          // this.itemCategoryMasterForm.reset();
        }
      }
    });
  }

  searchItemCatMast() {
    this.service.getItemCategorySearchbydivisionId((sessionStorage.getItem('divisionId')))
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
  }

  updateItemCatMast() {
    const formValue: IItemCategory = this.itemCategoryMasterForm.value;
    this.service.UpdateItemCatMastById(formValue, formValue.categoryId).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert(res.message);
          this.itemCategoryMasterForm.reset();
        }
      }
    });
  };

  resetItemCatMast() {
    window.location.reload();
  }

  closeItemCatMast() {
    this.router.navigate(['admin']);
  }
  Select(categoryId: number) {
    // alert(companyCode);
    let select = this.lstcomments.find(d => d.categoryId === categoryId);
    if (select) {
      this.itemCategoryMasterForm.patchValue(select);
      this.divisionId = select.divisionId.divisionId;
      this.divisionCode = select.divisionId.divisionCode;
      this.divisionName = select.divisionId.divisionName;
      // alert(this.divisionName)
      // this.divisionId= select.divisionId.divisionId;
      // this.compId= select.compId.compId;
      // this.mState =select.mState;
      this.displayButton = false;
      this.display = false;
    }
  }

  // onOptionsSelectedSubType(event: any){
  //   this.service.subTypeNewList((sessionStorage.getItem('divisionId')))
  //   .subscribe(
  //     data => {
  //       this.subTypeNewList = data;
  //       console.log(this.subTypeNewList);
  //     }
  //   );

  // }

  onOptionsSelected(event: any) {

    this.Status1 = this.itemCategoryMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.itemCategoryMasterForm.get('endDate').reset();
    }
  }


  onKey(event: any) {
    // alert(event);
    // alert( this.itemCategoryMasterForm.get('mainType').value + '.' +this.itemCategoryMasterForm.get('subType').value)
    const aaa = this.itemCategoryMasterForm.get('mainType').value + '.' + this.itemCategoryMasterForm.get('subType').value;
    this.attribute1 = aaa;
    console.log(this.itemCategoryMasterForm.get('mainType').value + '.' + this.itemCategoryMasterForm.get('subType').value);

  }
  message: string = "Please Fix the Errors !";
  msgType:string ="Close";
  
  getMessage(msgType: string) {
    this.msgType = msgType;
    if (msgType.includes("Save")) {
      this.submitted = true;
      (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
      if (this.itemCategoryMasterForm.invalid) {
        
        //this.submitted = false;
        (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '');
        return;
      }
      this.message = "Do you want to SAVE the changes(Yes/No)?"
      
    }

    if (msgType.includes("Reset")) {
      this.message = "Do you want to Reset the changes(Yes/No)?"
    }
    
    if (msgType.includes("Close")) {
      this.message = "Do you want to Close the Form(Yes/No)?"
    }
    return;
  }

 executeAction() {
    if(this.msgType.includes("Save")) {
     
      this.newItemCatMast();
    }

    if (this.msgType.includes("Reset")) {
      this.resetItemCatMast();
    }
    
    if (this.msgType.includes("Close")) {
      this.closeItemCatMast();
    }
    return;
  }

}


