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
  selector: 'app-variant-with-price-master',
  templateUrl: './variant-with-price-master.component.html',
  styleUrls: ['./variant-with-price-master.component.css']
})
export class VariantWithPriceMasterComponent implements OnInit {
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
  mainModel!: string;
  mainmodelId!: number;
  variant!: string;
  variantId!: number;
  colorList: any = [];
  colorCodeID!: number;
  colorDesc!: string;
  fuelTypeList: any = [];
  fueltype!: string;
  servicemodel!: string;
  bharatstagenorms!: string;
  cylinder!: string;
  chasprefix!: string;
  engprefix!: string;
  vardescription!: string;
  cubiccapacity!: string;
  grossweight!: string;
  mfgyearprint!: string;
  seating!: string;
  unladenweight!: string;
  variantclass!: string;
  oemwarrantyPerion!: number;
  typeOfBody!: string;
  horsepower!: string;
  basicPrice!: number;
  gstPercentage!: number;
  cessPer!: number;
  tcsPer!: number;
  csdPrice!: number;
  regCharge!: number;
  hypCharge!: number;
  smartCarDfee!: number;
  postalCharge!: number;
  pricelistheaderid!: Number;
  pricelistname!: String;
  pricelisttype!: string;
  status!: string;
  mdlClrId!: number;
  mainModel1!: string;
  varianList: any = [];
  variant1!: string;
  colorListNew: any = [];
  varianListNew: any = [];
  colorCode!: string;
  attribute4!: number;
  attribute5!: number;

  constructor(private service: MasterService, private fb: FormBuilder, private router: Router) {
    this.variantMasterForm = fb.group({
      mainModel: [],
      mainmodelId: [],
      variant: [],
      variantId: [],
      colorCodeID: [],
      colorDesc: [],
      fueltype: [],
      bharatstagenorms: [],
      servicemodel: [],
      cylinder: [],
      chasprefix: [],
      engprefix: [],
      vardescription: [],
      cubiccapacity: [],
      grossweight: [],
      mfgyearprint: [],
      seating: [],
      unladenweight: [],
      variantclass: [],
      oemwarrantyPerion: [],
      typeOfBody: [],
      horsepower: [],
      basicPrice: [],
      gstPercentage: [],
      cessPer: [],
      tcsPer: [],
      csdPrice: [],
      regCharge: [],
      hypCharge: [],
      smartCarDfee: [],
      postalCharge: [],
      pricelistheaderid: [12],
      pricelistname: ['April 2024 Price List'],
      pricelisttype: ['Vehicle'],
      status: [],
      mdlClrId: [],
      divisionId: [],
      ouId: [],
      mainModel1: [],
      variant1: [],
      colorCode: [],
      locId: [],
      attribute4: [],
      attribute5: []
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
    this.variantMasterForm.patchValue({ divisionId: this.divisionId, ouId: this.ouId, locId: this.locId })
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
    this.variantMasterForm.patchValue({ mainmodelId: id })
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
    this.variantMasterForm.patchValue({ servicemodel: event.target.value })
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

  // onVariantChange(event: any) {
  //   const value = event.target.value;
  //   const selectedVariant = this.varianListNew.find(
  //     (      v: { variant: any; }) => v.variant === value
  //   );

  //   if (selectedVariant) {
  //     this.variantMasterForm.patchValue({
  //       vardescription: selectedVariant.variantDesc,
  //       variantId: selectedVariant.variantId
  //     });
  //   } else {
  //     this.variantMasterForm.patchValue({
  //       vardescription: '',
  //       variantId: null
  //     });
  //   }
  // }

  // onVariantChange(event: any) {
  //   const value = event.target.value;
  //   const selectedVariant = this.varianListNew.find(
  //     (v: { variant: any }) => v.variant === value
  //   );
  //   if (!selectedVariant) {
  //     this.variantMasterForm.patchValue({
  //       vardescription: '',
  //       variantId: null
  //     });
  //     return;
  //   }
  //   const variantId = selectedVariant.variantId;
  //   // Patch basic variant fields
  //   this.variantMasterForm.patchValue({
  //     vardescription: selectedVariant.variantDesc,
  //     variantId: variantId
  //   });
  //   this.service.afterVariantSelect(variantId).subscribe((res: any) => {
  //     if (res.code === 200 && res.obj) {
  //       const variantData = res.obj;
  //       this.variantMasterForm.patchValue({
  //         fueltype: variantData.fueltype,
  //         servicemodel: variantData.serviceModel,
  //         bharatstagenorms: variantData.bharatStageNorms,
  //         cylinder: variantData.cylinder,
  //         chasprefix: variantData.chasPrefix,
  //         engprefix: variantData.engPrefix,
  //         cubiccapacity: variantData.cubicCapacity,
  //         grossweight: variantData.grossWeight,
  //         mfgyearprint: variantData.mfgYearPrint,
  //         seating: variantData.seating,
  //         unladenweight: variantData.unladenWeight,
  //         variantclass: variantData.variantClass,
  //         oemwarrantyPerion: variantData.oemWarrantyPeriod,
  //         typeOfBody: variantData.typeOfBody,
  //         horsepower: variantData.horsePower,
  //         basicPrice: variantData.basicPrice,
  //         gstPercentage: variantData.gstPercentage,
  //         cessPer: variantData.cessPer,
  //         tcsPer: variantData.tcsPer,
  //         csdPrice: variantData.csdPrice,
  //         regCharge: variantData.regCharge,
  //         hypCharge: variantData.hypCharge,
  //         smartCarDfee: variantData.smartCarDfee,
  //         postalCharge: variantData.postalCharge,
  //         status: variantData.status,
  //         mdlClrId: variantData.mdlClrId
  //       });
  //       this.variantMasterForm.get('servicemodel')?.disable();
  //       this.variantMasterForm.get('bharatstagenorms')?.disable();
  //       this.variantMasterForm.get('chasprefix')?.disable();
  //       this.variantMasterForm.get('cylinder')?.disable();
  //       this.variantMasterForm.get('engprefix')?.disable();
  //       this.variantMasterForm.get('horsepower')?.disable();
  //       this.variantMasterForm.get('typeOfBody')?.disable();
  //       this.variantMasterForm.get('cubiccapacity')?.disable();
  //       this.variantMasterForm.get('mfgyearprint')?.disable();
  //       this.variantMasterForm.get('grossweight')?.disable();
  //       this.variantMasterForm.get('unladenweight')?.disable();
  //       this.variantMasterForm.get('seating')?.disable();
  //       this.variantMasterForm.get('oemwarrantyPerion')?.disable();
  //       this.variantMasterForm.get('variantclass')?.disable();
  //     }
  //   });
  // }

  onVariantChange(event: any) {
    const variantCode = event.target.value;
    const selectedVariant = this.varianListNew.find(
      (v: any) => v.variant === variantCode
    );

    if (!selectedVariant) return;
    this.variantMasterForm.patchValue({
      variantId: selectedVariant.variantId,
      vardescription: selectedVariant.variantDesc
    });

    this.service.colorListFn(selectedVariant.variantId).subscribe(res => {
      this.colorListNew = res.obj;
      this.variantMasterForm.get('colorCodeID')?.enable();
    });
  }

  onColorSelect(event: any) {
    const variant = this.variantMasterForm.get('variant')?.value;
    const colorCode = this.variantMasterForm.get('colorCode')?.value;
    this.service
      .findByvariantAndColorFn(
        variant,
        Number(sessionStorage.getItem('ouId')),
        colorCode
      )
      .subscribe(data => {
        if (data.code === 200) {
          if (data.obj && data.obj.length > 0) {
            this.variantMasterForm.patchValue(data.obj[0]);
            this.variantMasterForm.get('servicemodel')?.disable();
            this.variantMasterForm.get('bharatstagenorms')?.disable();
            this.variantMasterForm.get('chasprefix')?.disable();
            this.variantMasterForm.get('cylinder')?.disable();
            this.variantMasterForm.get('engprefix')?.disable();
            this.variantMasterForm.get('horsepower')?.disable();
            this.variantMasterForm.get('typeOfBody')?.disable();
            this.variantMasterForm.get('cubiccapacity')?.disable();
            this.variantMasterForm.get('mfgyearprint')?.disable();
            this.variantMasterForm.get('grossweight')?.disable();
            this.variantMasterForm.get('unladenweight')?.disable();
            this.variantMasterForm.get('seating')?.disable();
            this.variantMasterForm.get('oemwarrantyPerion')?.disable();
            this.variantMasterForm.get('variantclass')?.disable();
            this.variantMasterForm.get('fueltype')?.disable();
            this.variantMasterForm.get('colorDesc')?.disable();
            this.variantMasterForm.get('vardescription')?.disable();
          } else {
            alert('Existing price not available, please enter new price.');
            this.variantMasterForm.patchValue({
              price: null
            });
          }
        } else {
          alert(data.message);
        }
      });
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

  // searchVariant() {
  //   var variant = this.variantMasterForm.get('variant1')?.value;
  //   var colorCode = this.variantMasterForm.get('colorCode')?.value;
  //   this.service.findByvariantAndColorFn(variant, Number(sessionStorage.getItem('ouId')), colorCode)
  //     .subscribe(
  //       data => {
  //         if (data.code === 200) {
  //           this.variantMasterForm.patchValue(data.obj[0]);
  //           this.variantMasterForm.disable();
  //         }
  //         else {
  //           alert(data.message);
  //         }
  //       }
  //     );
  // }

  searchVariant(variant?: string, colorCode?: string) {
    if (variant && colorCode) {
      this.variantMasterForm.patchValue({
        variant1: variant,
        variant: variant,
        colorCode: colorCode
      });
    }
    const v = this.variantMasterForm.get('variant1')?.value;
    const c = this.variantMasterForm.get('colorCode')?.value;

    this.service
      .findByvariantAndColorFn(v, Number(sessionStorage.getItem('ouId')), c)
      .subscribe(data => {
        if (data.code === 200 && data.obj?.length > 0) {
          this.variantMasterForm.patchValue(data.obj[0]);
          this.variantMasterForm.disable();
        } else {
          alert(data.message);
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
    this.service.saveVariantMstFn(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
      } else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    });
  }

  updateVariant() {
    const formValue = this.variantMasterForm.getRawValue();
    this.service.UpdateVariantPrice(formValue).subscribe(
      (res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.variantMasterForm.disable();
        } else {
          alert(res.message);
        }
      },
      error => {
        console.error(error);
        alert('Error while updating price');
      }
    );
  }

  historyList: any[] = [];
  showHistoryTable = false;

  searchHistory() {
    const modelCode = this.variantMasterForm.get('mainModel1')?.value;
    if (!modelCode) {
      alert('Please select Model');
      return;
    }
    const selectedModel = this.mainModelList.find(
      (m: any) => m.code === modelCode
    );
    if (!selectedModel) {
      alert('Invalid Model');
      return;
    }
    const modelId = selectedModel.cmnId;
    this.service.viewVariantHistory(modelId).subscribe(res => {
      if (res.code === 200) {
        this.historyList = res.obj;
        this.showHistoryTable = true;
      } else {
        this.historyList = [];
        this.showHistoryTable = false;
        alert(res.message);
      }
    });
  }

  searchResultList: any[] = [];
  showSearchTable = false;

  searchVariantList() {
    const modelCode = this.variantMasterForm.get('mainModel1')?.value;
    if (!modelCode) {
      alert('Please select Model');
      return;
    }
    const selectedModel = this.mainModelList.find(
      (m: any) => m.code === modelCode
    );
    if (!selectedModel) {
      alert('Invalid Model');
      return;
    }
    const modelId = selectedModel.cmnId;
    this.service.getVariantsByModel1(modelId).subscribe(res => {
      if (res.code === 200) {
        this.searchResultList = res.obj;
        this.showSearchTable = true;
      } else {
        this.searchResultList = [];
        this.showSearchTable = false;
        alert(res.message);
      }
    });
  }

}
