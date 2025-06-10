import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NumberValueAccessor, MaxLengthValidator,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators , FormArray } from '@angular/forms';
import { MasterService } from '../../master/master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InteractionModeRegistry } from 'chart.js';;

@Component({
  selector: 'app-variant-master-new',
  templateUrl: './variant-master-new.component.html',
  styleUrls: ['./variant-master-new.component.css'],
  
})
export class VariantMasterNewComponent implements OnInit {
variantMasterForm: FormGroup;
  orgId: number;
  ouId: number;
  deptId: number;
  divisionId: number;
name: string;
  ouName: string;
  locId: number;
  locName: string;
  loginName:string;
  loginArray:string;
  mainModelList:any=[];
  mainModel:string;
  mainmodelId:number;
  variant:string;
  variantId:number;
  colorList:any=[];
  colorCodeID:number;
  colorDesc:string;
  fuelTypeList:any=[];
  fueltype:string;
  servicemodel:string;
  bharatstagenorms:string;
  cylinder:string;
  chasprefix:string;
  engprefix:string;
  vardescription:string;
  cubiccapacity:string;
  grossweight:string;
  mfgyearprint:string;
  seating:string;
  unladenweight:string;
  variantclass:string;
  oemwarrantyPerion:number;
  typeOfBody:string;
  horsepower:string;
  basicPrice:number;
  gstPercentage:number;
  cessPer:number;
  tcsPer:number;
  csdPrice:number;
  regCharge:number;
  hypCharge:number;
  smartCarDfee:number;
  postalCharge:number;
  status:string;
  mdlClrId:number;
  mainModel1:string;
  varianList:any=[];
  variant1:string;
  colorListNew:any=[];
  varianListNew:any=[];
  colorCode:string;
 

   constructor(private service: MasterService,private  fb: FormBuilder, private router: Router) { 
        this.variantMasterForm = fb.group({
          mainModel:[],
          mainmodelId:[],
          variant:[],
          variantId:[],
          colorCodeID:[],
          colorDesc:[],
          fueltype:[],
          bharatstagenorms:[],
          servicemodel:[],
          cylinder:[],
          chasprefix:[],
          engprefix:[],
          vardescription:[],
          cubiccapacity:[],
          grossweight:[],
          mfgyearprint:[],
          seating:[],
          unladenweight:[],
          variantclass:[],
          oemwarrantyPerion:[],
          typeOfBody:[],
          horsepower:[],
           basicPrice:[],
  gstPercentage:[],
  cessPer:[],
  tcsPer:[],
  csdPrice:[],
  regCharge:[],
  hypCharge:[],
  smartCarDfee:[],
  postalCharge:[],
  status:[],
  mdlClrId:[],
  divisionId:[],
  ouId:[],
  mainModel1:[],
  variant1:[],
  colorCode:[]
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
        
          this.deptId=Number(sessionStorage.getItem('dept'));
       
    this.variantMasterForm.patchValue({divisionId:this.divisionId,ouId:this.ouId})

          this.orgId=this.ouId;

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
  variantMaster(variantMasterForm:any) {  }

  onClickMainModel(event){
    var model =event.target.value;
    // alert(model)
     var value = model.substr(model.indexOf(':') + 1, model.length);
    //  alert('---'+value+'----')
     var model1 = value.trim();
    let selectedValue = this.mainModelList.find(v => v.code == model1);
    var id = selectedValue.cmnId
    // alert(id)
    this.variantMasterForm.patchValue({mainmodelId:id})
  }

onClickcolor(event){
    var colorCode1 =event.target.value;
    // alert(colorCode1)
     var value = colorCode1.substr(colorCode1.indexOf(':') + 1, colorCode1.length);
    //  alert('---'+value+'----')
     var colorCode2 = value.trim();
    let selectedValue = this.colorList.find(v => v.code == colorCode2);
    var id = selectedValue.cmnId;
    // alert(id)
    this.variantMasterForm.patchValue({colorCodeID:id,colorDesc:selectedValue.codeDesc})
    // debugger;
    var varCode = this.variantMasterForm.get('variant').value;
    // alert(varCode)
   
  }

  serviceModelFn(event){
    this.variantMasterForm.patchValue({servicemodel:event.target.value})
  }


  onClickMainModel1(event){
    var model =event.target.value;
    // alert(model)
     var value = model.substr(model.indexOf(':') + 1, model.length);
    //  alert('---'+value+'----')
     var model1 = value.trim();
    let selectedValue = this.mainModelList.find(v => v.code == model1);
    var id = selectedValue.cmnId
     this.service.varianListFn(id)
          .subscribe(
            data => {
              this.varianListNew = data.obj;
            }
          );    
  }


variantIdFn(event){
   var variantName = event.target.value;
   var value = variantName.substr(variantName.indexOf(':') + 1, variantName.length);
   var model1 = value.trim();
   debugger;
    let selectedValue = this.varianListNew.find(v => v.variant == model1);
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

searchVariant(){
  var variant=this.variantMasterForm.get('variant1').value;

  var colorCode = this.variantMasterForm.get('colorCode').value;
        this.service.findByvariantAndColorFn(variant,Number(sessionStorage.getItem('ouId')),colorCode)
          .subscribe(
            data => {
              // debugger;
              if (data.code===200){
               this.variantMasterForm.patchValue(data.obj[0]);
              this.variantMasterForm.disable();
              }
              else{
                alert(data.message);
              }
            }
          );

        }

 resetMast() {
          window.location.reload();
        }
      
        closeMast() {
          this.router.navigate(['admin']);
        }

saveVariant(){
  var formValue = this.variantMasterForm.getRawValue();
    this.service.saveVariantMstFn(formValue).subscribe((res: any) => {
          if (res.code === 200) {
            alert(res.message);
            // this.saiEwSchemeMasterForm.reset();
          } else {
            if (res.code === 400) {
              alert(res.message);
              // this.saiEwSchemeMasterForm.reset();
            }
          }
        });
}

      }
