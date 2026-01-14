import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, PatternValidator, FormArray } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from '../master.service';
import { CommonModule, DatePipe } from '@angular/common';
import { data } from 'jquery';
@Component({
  selector: 'app-variant-creation-master',
  templateUrl: './variant-creation-master.component.html',
  styleUrls: ['./variant-creation-master.component.css']
})
export class VariantCreationMasterComponent implements OnInit {
 variantMasterForm: FormGroup;
  orgId!: number;
  ouId!: number;
  deptId!: number;
  divisionId!: number;
  name!: string | null;
  ouName!: string | null;
  locId!: number;
  locName!: string;
  loginName!: string | null;
  loginArray!: string | null;
  mainModelList: any = [];
  mainModel!: number;
  variant!: string;
  varDescription!: string;
  mainModel1!: string;
  variantId!: number;
  colorList: any = [];
  colorCodeID!: number;
  colorDesc!: string;
  fuelTypeList: any = [];
  fuelType!: string;
  serviceModel!: string;
  bharatStageNorms!: string;
  cylinder!: string;
  chasPrefix!: string;
  engPrefix!: string;
  
  cubicCapacity!: string;
  grossWeight!: string;
  mfgYearPrint!: string;
  seating!: string;
  unladenWeight!: string;
  variantClass!: string;
  oemWarrantyPeriod!: number;
  typeOfBody!: string;
  horsePower!: string;
  smartCarDfee!: number;
  postalCharge!: number;
  status!: string;
  mdlClrId!: number;
  varianList: any = [];
  variant1!: string;
  colorListNew: any = [];
  varianListNew: any = [];
  colorCode!: string;

  isSaveDisabled = false;
  isUpdateDisabled = true;

  variantTableList: any[] = [];
showVariantTable = false;


  constructor(private service: MasterService, private fb: FormBuilder, private router: Router) {
    this.variantMasterForm = fb.group({
      variant: [],
      varDescription: [],
      mainModel1: [],
      mainModel: [],
      variantId: [],
      fuelType: [],
      bharatStageNorms: [],
      serviceModel: [],
      cylinder: [],
      chasPrefix: [],
      engPrefix: [],
      cubicCapacity: [],
      grossWeight: [],
      mfgYearPrint: [],
      seating: [],
      unladenWeight: [],
      variantClass: [],
      oemWarrantyPeriod: [],
      typeOfBody: [],
      horsePower: [],
      status: ['Active'],
      divisionId: [],
      ouId: []
    })
  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.name = sessionStorage.getItem('name');
    this.loginArray = sessionStorage.getItem('divisionName');
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.loginName = sessionStorage.getItem('name');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.locId = Number(sessionStorage.getItem('locId'));
    this.deptId = Number(sessionStorage.getItem('dept'));
    this.variantMasterForm.patchValue({ divisionId: this.divisionId, ouId: this.ouId })
    this.orgId = this.ouId;

    this.service.mainModelList()
      .subscribe(
        data => {
          this.mainModelList = data;
          console.log(this.mainModelList);
        }
      );

    this.service.colorList()
      .subscribe(
        data => {
          this.colorList = data;
        }
      );

    this.service.fuelTypeList()
      .subscribe(
        data => {
          this.fuelTypeList = data;
        }
      );
  }

  get f() { return this.variantMasterForm.controls; }

  variantMaster(variantMasterForm: any) { }

  onClickMainModel(event: any) {
    var model = event.target.value;
    var value = model.substr(model.indexOf(':') + 1, model.length);
    var model1 = value.trim();
    let selectedValue = this.mainModelList.find((v: { code: any; }) => v.code == model1);
    var id = selectedValue.cmnId
    this.variantMasterForm.patchValue({ mainModel: id })
    this.service.varianListFn(id)
      .subscribe(
        data => {
          this.varianListNew = data.obj;
        }
      );
  }

  onClickcolor(event: any) {
    var colorCode1 = event.target.value;
    var value = colorCode1.substr(colorCode1.indexOf(':') + 1, colorCode1.length);
    var colorCode2 = value.trim();
    let selectedValue = this.colorList.find((v: { code: any; }) => v.code == colorCode2);
    var id = selectedValue.cmnId;
    this.variantMasterForm.patchValue({ colorCodeID: id, colorDesc: selectedValue.codeDesc })
    var varCode = this.variantMasterForm.get('variant')?.value;
  }

  serviceModelFn(event: any) {
    this.variantMasterForm.patchValue({ serviceModel: event.target.value })
  }

  onClickMainModel1(event: any) {
    var model = event.target.value;
    var value = model.substr(model.indexOf(':') + 1, model.length);
    var model1 = value.trim();
    let selectedValue = this.mainModelList.find((v: { code: any; }) => v.code == model1);
    var id = selectedValue.cmnId
    this.service.varianListFn(id)
      .subscribe(
        data => {
          this.varianListNew = data.obj;
        }
      );
  }
  
  variantIdFn(event: any) {
    var variantName = event.target.value;
    var value = variantName.substr(variantName.indexOf(':') + 1, variantName.length);
    var model1 = value.trim();
    let selectedValue = this.varianListNew.find((v: { variant: any; }) => v.variant == model1);
    console.log(selectedValue);
    var id = selectedValue.variantId;
    console.log(id);

    this.service.colorListFn(id)
      .subscribe(
        data => {
          this.colorListNew = data.obj;
        }
      );
  }

  searchVariant() {
    var variant = this.variantMasterForm.get('variant1')?.value;
    var colorCode = this.variantMasterForm.get('colorCode')?.value;
    this.service.findByvariantAndColorFn(variant, Number(sessionStorage.getItem('ouId')), colorCode)
      .subscribe(
        data => {
          if (data.code === 200) {
            this.variantMasterForm.patchValue(data.obj[0]);
            this.variantMasterForm.disable();
          }
          else {
            alert(data.message);
          }
        }
      );
  }

  // searchByVariant() {
  //   const variantCode = this.variantMasterForm.get('variant')?.value;
  //   if (!variantCode) {
  //     alert('Please select Variant');
  //     return;
  //   }
  
  //   this.service.getByVariant(variantCode).subscribe({
  //     next: (res) => {
  //       const obj = res.obj;
  
  //       const modelObj = this.mainModelList.find(
  //         (m: any) => m.cmnId === obj.mainModel
  //       );
  
  //       this.variantMasterForm.patchValue({
  //         ...obj,
  //         mainModel1: modelObj ? modelObj.code : null   
  //       });
  //       this.variantMasterForm.get('mainModel1')?.disable();
  //       this.isSaveDisabled = true;
  //       this.isUpdateDisabled = false;
  //     },
  //     error: () => {
  //       alert('Variant not found');
  //     }
  //   });
  // }

  searchByVariant() {
    const modelId = this.variantMasterForm.get('mainModel')?.value;
    const variant = this.variantMasterForm.get('variant')?.value;
  
    if (!modelId) {
      alert('Please select Model');
      return;
    }
    if (modelId && !variant) {
      this.service.varianListFn(modelId).subscribe({
        next: (res) => {
          this.variantTableList = res.obj;
          this.showVariantTable = true;
        },
        error: () => alert('No variants found')
      });
      return;
    }
  
    if (modelId && variant) {
      this.service.getByVariant(variant).subscribe({
        next: (res) => {
          this.variantTableList = [res.obj]; 
          this.showVariantTable = true;
        },
        error: () => alert('Variant not found')
      });
    }
  }
  
  loadVariantDetails(variantCode: any) {
    this.service.getByVariant(variantCode).subscribe({
      next: (res) => {
        const obj = res.obj;
  
        const modelObj = this.mainModelList.find(
          (m: any) => m.cmnId === obj.mainModel
        );
  
        this.variantMasterForm.patchValue({
          ...obj,
          mainModel1: modelObj ? modelObj.code : null
        });
        this.variantMasterForm.get('mainModel1')?.disable();
        this.variantMasterForm.get('variant')?.disable();
        this.variantMasterForm.get('varDescription')?.disable();
        this.variantMasterForm.get('fuelType')?.disable();
        this.isSaveDisabled = true;
        this.isUpdateDisabled = false; 
        this.showVariantTable = true; 
      },
      error: () => alert('Error loading variant')
    });
  }
  
  

  updateVariant() {
    const formValue = this.variantMasterForm.getRawValue();
  
    if (!formValue.variant) {
      alert('Variant is required for update');
      return;
    }
  
    this.service.updateVariantMstCreation(formValue)
      .subscribe({
        next: (res: any) => {
          if (res.code === 200) {
            alert(res.message);
            this.isSaveDisabled = true;
            this.isUpdateDisabled = true;
            this.variantMasterForm.disable();
          } else {
            alert(res.message);
          }
        },
        error: () => {
          alert('Update failed');
        }
      });
  }  
  
  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }

  saveVariant() {
    var formValue = this.variantMasterForm.getRawValue();
    this.service.saveVariantMstCreation(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
      } else {
        if (res.code === 400) {
          alert(res.message);

          this.isSaveDisabled = true;
          this.isUpdateDisabled = false;
          this.variantMasterForm.disable();
        }
      }
    });
  }
}


